/*
 * ═══════════════════════════════════════════════════════════════════════
 *  L'Hospitalet de Llobregat — zone baremos for the Valorador
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  STATIC (this file): barrio list, slugs, aliases, Fotocasa URLs.
 *  Rarely changes. Edit only when a new barrio is added or an alias
 *  should be tweaked.
 *
 *  DYNAMIC (zones.data.json): base price, multipliers, last-reviewed.
 *  Updated automatically by the `api/cron/update-zones` Vercel cron,
 *  which scrapes Fotocasa's barrio price-index pages weekly and
 *  commits a fresh JSON. That commit triggers an auto-redeploy.
 *
 *  Formula the Valorador applies:
 *     pricePerM²  =  basePriceM²  ×  zone.mult  ×  conditionMult  ×  (1 + extras)
 *
 *  mult: 1.0 = L'Hospitalet baseline. Above 1 is pricier than baseline,
 *  below 1 is cheaper. The cron recomputes the baseline from the median
 *  of all scraped barrios, so mult stays a relative indicator.
 *
 *  The matcher below is case-insensitive, diacritic-insensitive, and
 *  uses longest-alias-first so explicit barrio names beat bare postal
 *  codes.
 */

import zonesData from './zones.data.json' with { type: 'json' }

export interface ZoneMeta {
  slug: string
  displayName: string
  district: string
  aliases: string[]
  /** Fotocasa barrio slug — null if this barrio doesn't have a dedicated
   *  Fotocasa page (the cron will skip it and keep the previous mult). */
  fotocasaSlug: string | null
}

export interface Zone extends ZoneMeta {
  mult: number
}

/* ─── Static metadata ────────────────────────────────────────────────── */
const ZONE_META: ZoneMeta[] = [
  /* ─── Distrito I — Centre ─────────────────────────────────────────── */
  {
    slug: 'centre',
    displayName: 'Centre',
    district: 'Distrito I',
    aliases: ['centre', 'centro', '08901'],
    fotocasaSlug: 'centre',
  },
  {
    slug: 'sant-josep',
    displayName: 'Sant Josep',
    district: 'Distrito I',
    aliases: [
      'sant josep',
      'san jose',
      'pl. europa',
      'plaza europa',
      'plaça europa',
      "plaça d'europa",
      'fira',
      "l'illa",
      '08908',
    ],
    fotocasaSlug: 'sant-josep',
  },
  {
    slug: 'sanfeliu',
    displayName: 'Sanfeliu',
    district: 'Distrito I',
    aliases: ['sanfeliu', 'san feliu', 'sant feliu'],
    fotocasaSlug: 'sanfeliu',
  },

  /* ─── Distrito II — Collblanc-La Torrassa ────────────────────────── */
  {
    slug: 'collblanc',
    displayName: 'Collblanc',
    district: 'Distrito II',
    aliases: ['collblanc', 'coll blanc', 'coll-blanc'],
    fotocasaSlug: 'collblanc',
  },
  {
    slug: 'la-torrassa',
    displayName: 'La Torrassa',
    district: 'Distrito II',
    aliases: ['torrassa', 'la torrassa', '08903'],
    fotocasaSlug: 'torrassa',
  },

  /* ─── Distrito III — Santa Eulàlia-Granvia Sud ──────────────────── */
  {
    slug: 'santa-eulalia',
    displayName: 'Santa Eulàlia',
    district: 'Distrito III',
    aliases: [
      'santa eulalia',
      'santa eulàlia',
      'sta eulalia',
      'sta. eulalia',
      'santa eulalia de provençana',
      '08902',
    ],
    fotocasaSlug: 'santa-eulalia',
  },
  {
    slug: 'granvia-sud',
    displayName: 'Granvia Sud',
    district: 'Distrito III',
    aliases: [
      'granvia sud',
      'gran via sud',
      'granvia lh',
      "gran via l'hospitalet",
      'granvia l hospitalet',
    ],
    // Fotocasa groups this with Bellvitge / El Gornal under "Granvia LH".
    // No standalone per-barrio page exists, so we leave the multiplier
    // manual here and the cron skips this slug.
    fotocasaSlug: null,
  },

  /* ─── Distrito IV — La Florida-Les Planes ───────────────────────── */
  {
    slug: 'la-florida',
    displayName: 'La Florida',
    district: 'Distrito IV',
    aliases: ['florida', 'la florida'],
    fotocasaSlug: 'la-florida',
  },
  {
    slug: 'les-planes',
    displayName: 'Les Planes',
    district: 'Distrito IV',
    aliases: ['planes', 'les planes', 'las planas', '08905'],
    fotocasaSlug: 'les-planes',
  },

  /* ─── Distrito V — Pubilla Cases-Can Serra ──────────────────────── */
  {
    slug: 'pubilla-cases',
    displayName: 'Pubilla Cases',
    district: 'Distrito V',
    aliases: ['pubilla cases', 'pubilla', '08906'],
    fotocasaSlug: 'pubilla-cases',
  },
  {
    slug: 'can-serra',
    displayName: 'Can Serra',
    district: 'Distrito V',
    aliases: ['can serra', 'ca serra'],
    fotocasaSlug: 'can-serra',
  },

  /* ─── Distrito VI — Bellvitge-El Gornal ─────────────────────────── */
  {
    slug: 'bellvitge',
    displayName: 'Bellvitge',
    district: 'Distrito VI',
    aliases: ['bellvitge', 'bellvítge', '08907'],
    fotocasaSlug: 'bellvitge',
  },
  {
    slug: 'el-gornal',
    displayName: 'El Gornal',
    district: 'Distrito VI',
    aliases: ['gornal', 'el gornal'],
    // Fotocasa has no standalone page — only the grouped district.
    // Kept manual; cron skips.
    fotocasaSlug: null,
  },
]

/* ─── Merged view ────────────────────────────────────────────────────── */

export const BASE_PRICE_M2: number = zonesData.basePriceM2
export const LAST_REVIEWED: string = zonesData.lastReviewed
/** 'seed' for the hand-written initial values, 'fotocasa' once the cron
 *  has run at least once. Shown subtly in the footer caption. */
export const ZONES_SOURCE: string = zonesData.source ?? 'seed'

const multipliers: Record<string, number> = zonesData.multipliers as Record<
  string,
  number
>

export const ZONES: Zone[] = ZONE_META.map((z) => ({
  ...z,
  mult: multipliers[z.slug] ?? 1,
}))

/** Exposed for the cron so it can iterate and build update payloads
 *  without re-importing the module itself. */
export const ZONE_METADATA: ZoneMeta[] = ZONE_META

/* ─── Matching ──────────────────────────────────────────────────────── */

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics
    .replace(/\s+/g, ' ')
    .trim()
}

/** Longest-alias-first match across all zones. Explicit barrio names
 *  beat bare postal codes; unknown inputs return null (caller falls
 *  back to the baseline 1.0 multiplier). */
export function matchZone(input: string): Zone | null {
  if (!input) return null
  const n = normalize(input)
  let best: { zone: Zone; aliasLen: number } | null = null
  for (const zone of ZONES) {
    for (const alias of zone.aliases) {
      const a = normalize(alias)
      if (n.includes(a)) {
        if (!best || a.length > best.aliasLen) {
          best = { zone, aliasLen: a.length }
        }
      }
    }
  }
  return best?.zone ?? null
}

/** Human-readable label for the UI. */
export function zoneLabel(zone: Zone | null): string {
  return zone ? `${zone.displayName} · L'Hospitalet` : "L'Hospitalet de Llobregat"
}

/** "Baremos actualizados en abril de 2026" style caption. */
const SPANISH_MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]
export function lastReviewedLabel(): string {
  const [y, m] = LAST_REVIEWED.split('-').map(Number)
  const month = SPANISH_MONTHS[(m ?? 1) - 1] ?? ''
  const suffix = ZONES_SOURCE === 'fotocasa' ? ' · datos Fotocasa' : ''
  return `Baremos actualizados en ${month} de ${y}${suffix}`
}
