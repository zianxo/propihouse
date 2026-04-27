/*
 * ═══════════════════════════════════════════════════════════════════════
 *  Weekly cron — refresh L'Hospitalet zone baremos from Fotocasa
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  Runs weekly (see vercel.json). For each barrio that has a
 *  `fotocasaSlug` in src/data/zones.ts, fetch Fotocasa's price-index
 *  page, extract €/m², recompute multipliers, and commit the new
 *  src/data/zones.data.json to git via the GitHub REST API. The commit
 *  triggers a Vercel redeploy so the new numbers ship without any
 *  human in the loop.
 *
 *  Env vars required (set these in Vercel → project → settings → env):
 *    CRON_SECRET      — Vercel auto-sends this as a bearer token on
 *                       /api/cron/* routes. We verify so random HTTP
 *                       calls can't trigger a git commit.
 *    GITHUB_TOKEN     — fine-grained PAT with Contents: Read & Write
 *                       on zianxo/propihouse. Only.
 *    GITHUB_REPO      — "owner/name" (default: zianxo/propihouse).
 *    GITHUB_BRANCH    — branch to commit to (default: main).
 *
 *  Safety rails baked in:
 *    - if fewer than 6 barrios produce a valid €/m², abort (don't
 *      commit a gutted dataset)
 *    - each multiplier change is clamped to ±15% vs the previous run
 *    - if Fotocasa returns no change at all, the cron is a no-op
 *    - barrios without a fotocasaSlug keep their previous multiplier
 *
 *  Adding Idealista later: write a `scrapeIdealista(slug)` function
 *  that returns `{ pricePerM2: number } | null` and push its result
 *  into the `observations` array inside `scrapeBarrio`. The median
 *  logic downstream handles multi-source blending automatically.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ZONE_METADATA, type ZoneMeta } from '../../src/data/zones'
import zonesData from '../../src/data/zones.data.json'

/** Vercel Hobby default is 10s. 30s is plenty for 13 concurrent fetches
 *  + GitHub API round-trip; still well under the Hobby 60s ceiling. */
export const config = { maxDuration: 30 }

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0 Safari/537.36'

const ACCEPT_LANG = 'es-ES,es;q=0.9,en;q=0.8'

const MIN_BARRIOS_FOR_COMMIT = 6
const MAX_CHANGE_PER_RUN = 0.15 // ±15%

type Observation = {
  source: 'fotocasa' | 'idealista'
  pricePerM2: number
}

type BarrioResult = {
  slug: string
  observations: Observation[]
  /** Median of all observations (or null if empty). */
  pricePerM2: number | null
  /** Set only if all sources failed for this barrio. */
  error?: string
}

/* ─── Scrapers ──────────────────────────────────────────────────────── */

/** Extracts the buy-side €/m² figure from a Fotocasa price-index page.
 *
 *  Page structure (April 2026):
 *    <h2>Precio de compra de pisos</h2>
 *      <div class="text-big">2.913 €</div>        ← what we want
 *      <h3>Precio medio por m² en 2025</h3>
 *    <h2>Precio del alquiler</h2>
 *      <div class="text-big">16 €/m²</div>        ← rental, not this
 *      ...
 *      <div class="text-big">228.922 €</div>      ← total price, not this
 *
 *  Strategy: anchor on the "Precio de compra" H2, take the FIRST
 *  <div class="text-big"> after it. Falls back to a loose "<value> €/m²"
 *  match for pages where the structure differs. Both paths narrow to
 *  the realistic barrio €/m² band [800, 20000] — rejects rent (~20 €)
 *  and total-property prices (100k+). */
function parseEurPerM2(html: string): number | null {
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')

  const toInt = (raw: string): number => parseInt(raw.replace(/\D+/g, ''), 10)
  const inBand = (n: number) => Number.isFinite(n) && n > 800 && n < 20000

  // Primary: anchored on the "Precio de compra" section header.
  const anchored = clean.match(
    /Precio\s+de\s+compra[^<]*<\/h2>[\s\S]*?<div[^>]*class="[^"]*text-big[^"]*"[^>]*>([^<]+)</i,
  )
  if (anchored) {
    const n = toInt(anchored[1])
    if (inBand(n)) return n
  }

  // Fallback: first loose "<value> €/m²" match — works on pages where
  // the unit is written next to the number.
  const loose = /([\d][\d.,\s]{2,10})\s*€\s*\/\s*m[²2]/gi
  let m: RegExpExecArray | null
  while ((m = loose.exec(clean)) !== null) {
    const n = toInt(m[1])
    if (inBand(n)) return n
  }

  return null
}

async function scrapeFotocasa(slug: string): Promise<Observation | null> {
  const url = `https://www.fotocasa.es/indice-precio-vivienda/l-hospitalet-de-llobregat/${slug}/`
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': ACCEPT_LANG,
        'Cache-Control': 'no-cache',
      },
      redirect: 'follow',
    })
    if (!res.ok) {
      console.warn(`[fotocasa] ${slug}: HTTP ${res.status}`)
      return null
    }
    const html = await res.text()
    const price = parseEurPerM2(html)
    if (price === null) {
      console.warn(`[fotocasa] ${slug}: no price found in HTML`)
      return null
    }
    return { source: 'fotocasa', pricePerM2: price }
  } catch (err) {
    console.warn(`[fotocasa] ${slug}:`, err)
    return null
  }
}

async function scrapeBarrio(meta: ZoneMeta): Promise<BarrioResult> {
  const observations: Observation[] = []

  if (meta.fotocasaSlug) {
    const obs = await scrapeFotocasa(meta.fotocasaSlug)
    if (obs) observations.push(obs)
  }

  // Hook for Idealista / other sources:
  //   const obsI = await scrapeIdealista(meta.idealistaSlug)
  //   if (obsI) observations.push(obsI)

  if (observations.length === 0) {
    return {
      slug: meta.slug,
      observations: [],
      pricePerM2: null,
      error: 'no_sources_responded',
    }
  }

  // Median across sources for this barrio (robust to one bad reading).
  const sorted = observations.map((o) => o.pricePerM2).sort((a, b) => a - b)
  const mid = sorted.length / 2
  const median =
    sorted.length % 2
      ? sorted[Math.floor(mid)]
      : (sorted[mid - 1] + sorted[mid]) / 2

  return { slug: meta.slug, observations, pricePerM2: median }
}

/* ─── Clamps & composition ──────────────────────────────────────────── */

function clampRatio(nextMult: number, prevMult: number): number {
  const maxUp = prevMult * (1 + MAX_CHANGE_PER_RUN)
  const maxDown = prevMult * (1 - MAX_CHANGE_PER_RUN)
  return Math.max(maxDown, Math.min(maxUp, nextMult))
}

function round(n: number, dp: number): number {
  const f = 10 ** dp
  return Math.round(n * f) / f
}

/* ─── Git commit via GitHub API ─────────────────────────────────────── */

async function commitUpdatedJson(params: {
  token: string
  repo: string
  branch: string
  newJson: object
  commitMessage: string
}): Promise<{ ok: boolean; sha?: string; error?: string }> {
  const path = 'src/data/zones.data.json'
  const base = `https://api.github.com/repos/${params.repo}/contents/${path}`
  const headers: Record<string, string> = {
    Authorization: `Bearer ${params.token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'propihouse-cron',
  }

  // 1. Get current file SHA.
  const getRes = await fetch(`${base}?ref=${params.branch}`, { headers })
  if (!getRes.ok) {
    return { ok: false, error: `GET contents failed: HTTP ${getRes.status}` }
  }
  const getBody = (await getRes.json()) as { sha?: string; content?: string }
  const prevSha = getBody.sha
  if (!prevSha) return { ok: false, error: 'no sha on current file' }

  // 2. PUT new content.
  const content = Buffer.from(
    JSON.stringify(params.newJson, null, 2) + '\n',
    'utf8',
  ).toString('base64')

  const putRes = await fetch(base, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: params.commitMessage,
      content,
      sha: prevSha,
      branch: params.branch,
    }),
  })
  if (!putRes.ok) {
    const text = await putRes.text()
    return {
      ok: false,
      error: `PUT contents failed: HTTP ${putRes.status} ${text.slice(0, 200)}`,
    }
  }
  const putBody = (await putRes.json()) as {
    commit?: { sha?: string }
  }
  return { ok: true, sha: putBody.commit?.sha }
}

/* ─── Handler ───────────────────────────────────────────────────────── */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Vercel cron auth: when CRON_SECRET is set in env, Vercel sends
  //   Authorization: Bearer <secret>
  // on its scheduled calls. Reject everything else.
  const expected = process.env.CRON_SECRET
  if (expected) {
    const auth = req.headers.authorization
    if (auth !== `Bearer ${expected}`) {
      return res.status(401).json({ error: 'unauthorized' })
    }
  }

  const dryRun =
    req.query.dryRun === '1' || req.query.dryRun === 'true' ? true : false

  // 1. Scrape every barrio in parallel. 13 requests total — well within
  //    what Fotocasa serves without complaint at this cadence.
  const results: BarrioResult[] = await Promise.all(
    ZONE_METADATA.map((meta) => scrapeBarrio(meta)),
  )

  const scraped = results.filter((r) => r.pricePerM2 !== null)
  if (scraped.length < MIN_BARRIOS_FOR_COMMIT) {
    return res.status(200).json({
      ok: false,
      reason: 'insufficient_data',
      scrapedCount: scraped.length,
      required: MIN_BARRIOS_FOR_COMMIT,
      results,
    })
  }

  // 2. Compute new base (median of all scraped barrios — robust to outliers).
  const prices = scraped
    .map((r) => r.pricePerM2 as number)
    .sort((a, b) => a - b)
  const midIdx = prices.length / 2
  const newBase =
    prices.length % 2
      ? prices[Math.floor(midIdx)]
      : (prices[midIdx - 1] + prices[midIdx]) / 2

  // 3. Build new multipliers with safety clamps.
  const prevMults = zonesData.multipliers as Record<string, number>
  const newMults: Record<string, number> = {}

  for (const meta of ZONE_METADATA) {
    const prev = prevMults[meta.slug] ?? 1
    const obs = results.find((r) => r.slug === meta.slug)
    if (!obs || obs.pricePerM2 === null) {
      // No data for this barrio — keep previous.
      newMults[meta.slug] = prev
      continue
    }
    const rawMult = obs.pricePerM2 / newBase
    const clamped = clampRatio(rawMult, prev)
    newMults[meta.slug] = round(clamped, 3)
  }

  // 4. Detect changes.
  const diffs: { slug: string; from: number; to: number; price: number }[] = []
  for (const [slug, next] of Object.entries(newMults)) {
    const prev = prevMults[slug] ?? 1
    if (Math.abs(next - prev) >= 0.005) {
      const obs = results.find((r) => r.slug === slug)
      diffs.push({
        slug,
        from: prev,
        to: next,
        price: obs?.pricePerM2 ?? 0,
      })
    }
  }
  const baseChanged = Math.abs(round(newBase, 0) - zonesData.basePriceM2) >= 5

  if (diffs.length === 0 && !baseChanged) {
    return res.status(200).json({
      ok: true,
      action: 'no_op',
      reason: 'no_significant_changes',
      basePriceM2: zonesData.basePriceM2,
      scrapedCount: scraped.length,
    })
  }

  const now = new Date()
  const yyyy = now.getUTCFullYear()
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  const newJson = {
    lastReviewed: `${yyyy}-${mm}`,
    source: 'fotocasa',
    basePriceM2: Math.round(newBase),
    multipliers: newMults,
  }

  // 5. Dry run — just echo.
  if (dryRun) {
    return res.status(200).json({
      ok: true,
      action: 'dry_run',
      newJson,
      diffs,
      results,
    })
  }

  // 6. Commit.
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO || 'zianxo/propihouse'
  const branch = process.env.GITHUB_BRANCH || 'main'
  if (!token) {
    return res.status(500).json({
      ok: false,
      reason: 'missing_GITHUB_TOKEN',
      newJson,
    })
  }

  const summary = diffs
    .map(
      (d) =>
        `  ${d.slug.padEnd(14)} ${d.from.toFixed(2)} → ${d.to.toFixed(2)}  (${Math.round(d.price).toLocaleString('es-ES')} €/m²)`,
    )
    .join('\n')
  const commitMessage =
    `chore(data): weekly zone refresh from Fotocasa (${yyyy}-${mm}-${String(now.getUTCDate()).padStart(2, '0')})\n\n` +
    `Base price: ${zonesData.basePriceM2} → ${Math.round(newBase)} €/m²\n` +
    (diffs.length ? `Updated ${diffs.length} barrio(s):\n${summary}\n` : '') +
    `\nScraped ${scraped.length}/${ZONE_METADATA.length} barrios.`

  const commit = await commitUpdatedJson({
    token,
    repo,
    branch,
    newJson,
    commitMessage,
  })

  if (!commit.ok) {
    return res.status(500).json({ ok: false, reason: commit.error, newJson })
  }

  return res.status(200).json({
    ok: true,
    action: 'committed',
    commitSha: commit.sha,
    basePriceM2: newJson.basePriceM2,
    diffs,
    scrapedCount: scraped.length,
  })
}
