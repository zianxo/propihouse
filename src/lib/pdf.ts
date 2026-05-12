/*
 * ═══════════════════════════════════════════════════════════════════════
 *  Shared jsPDF utilities for Propi House reports
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  Both the financiar simulation report and the valorador valuation
 *  report use the same A4 template: Propi House logo top-left, date
 *  top-right, divider, sections separated by olive/blue accent ticks,
 *  rows in label/value pairs, and a contact footer.
 *
 *  These helpers keep the two reports visually consistent and let us
 *  tweak shared concerns (logo size, brand colors, footer copy) once.
 *
 *  jsPDF itself is dynamically imported by the call sites so the
 *  ~130 KB cost only lands when a user clicks Download.
 */
import type { jsPDF } from 'jspdf'

export const PDF_COLORS = {
  dark: [26, 26, 26] as [number, number, number],
  blue: [42, 121, 169] as [number, number, number],
  olive: [134, 140, 77] as [number, number, number],
  muted: [82, 82, 72] as [number, number, number],
  divider: [220, 215, 195] as [number, number, number],
  rowDivider: [235, 230, 215] as [number, number, number],
  warmCream: [247, 243, 232] as [number, number, number], // matches --color-cream-light
} as const

/* Logo height in millimetres. Started at 18; +5 % → 18.9; +15 % →
 * 21.74; another +10 % per Pau pushes it to 23.91 mm. Both reports
 * source this constant; the header divider position is derived from
 * it so the line never crosses the wordmark. */
export const LOGO_HEIGHT_MM = 23.91

export const PAGE_MARGIN_MM = 18

/* Generic fetch → base64 dataURL helper. */
async function fetchAsDataUrl(path: string): Promise<string | null> {
  try {
    const res = await fetch(path)
    if (!res.ok) return null
    const blob = await res.blob()
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

/* Async loader for the brand logo. The PDF embeds a base64 PNG; if the
 * fetch fails we fall back to a wordmark drawn with the default font so
 * the report still ships. */
export async function loadLogoDataUrl(): Promise<string | null> {
  return fetchAsDataUrl('/logos/logo.png')
}

/* Per-report background loaders. Each report has its own office-shot
 * photo: the valorador uses the lamp + pink-sofa view, the financiar
 * uses the green wall + green-armchair view. Both are portrait JPEGs
 * pre-compressed to ~300–450 KB. Returns null on fetch failure — the
 * caller skips the background and ships a clean white report instead. */
export async function loadValoradorBgDataUrl(): Promise<string | null> {
  return fetchAsDataUrl('/images/valorador-bg.jpg')
}
export async function loadFinanciarBgDataUrl(): Promise<string | null> {
  return fetchAsDataUrl('/images/financiar-bg.jpg')
}

/* Fetch a Mapbox Static Images PNG showing the given query's location
 * with a single pin. Two network round-trips: forward-geocode to get
 * lat/lng, then download the rendered map. Returns null on any failure
 * (missing token, no geocoding hit, bad response) so the caller can
 * skip the map cleanly without breaking the report.
 *
 * Uses Mapbox's light-v11 style — grayscale and uncluttered, matches
 * the editorial tone of the rest of the report. */
export async function loadLocationMapDataUrl(
  query: string,
  signal?: AbortSignal,
): Promise<string | null> {
  const token = import.meta.env.VITE_MAPBOX_API_KEY as string | undefined
  const q = query.trim()
  if (!token || !q) return null

  /* 1) Geocode → first feature's coordinates. */
  const gc = new URL('https://api.mapbox.com/search/geocode/v6/forward')
  gc.searchParams.set('q', q)
  gc.searchParams.set('access_token', token)
  gc.searchParams.set('country', 'es')
  gc.searchParams.set('proximity', '2.0996,41.3596')
  gc.searchParams.set('limit', '1')
  gc.searchParams.set('language', 'es')

  let coords: [number, number] | null = null
  try {
    const r = await fetch(gc.toString(), { signal })
    if (!r.ok) return null
    const json = (await r.json().catch(() => null)) as
      | { features?: Array<{ geometry?: { coordinates?: number[] } }> }
      | null
    const c = json?.features?.[0]?.geometry?.coordinates
    if (!c || c.length < 2) return null
    coords = [c[0], c[1]]
  } catch {
    return null
  }
  const [lng, lat] = coords

  /* 2) Static map — 5:1 strip (matches the PDF render aspect so the
   * image doesn't squish), retina, blue pin at the pinpoint.
   * logo+attribution disabled at the API level for a cleaner image;
   * Mapbox ToS require attribution to appear next to the map, so the
   * caller renders a tiny "Mapa: Mapbox · OpenStreetMap" caption
   * below the embed in the PDF. */
  const pin = `pin-l+2a79a9(${lng.toFixed(5)},${lat.toFixed(5)})`
  const center = `${lng.toFixed(5)},${lat.toFixed(5)},14.5,0`
  const size = '1000x200@2x'
  const mapUrl =
    `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/` +
    `${pin}/${center}/${size}?access_token=${token}` +
    `&logo=false&attribution=false`

  try {
    const r = await fetch(mapUrl, { signal })
    if (!r.ok) return null
    const blob = await r.blob()
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

/* Draws the office photo full-bleed, then lays a "frosted glass" panel
 * over most of the page: a translucent white-ish rectangle that lets
 * the photo bleed through softly while keeping black text crisply
 * readable. The photo is fully visible at the page edges (12 mm
 * border) and faintly visible through the panel itself.
 *
 * The Valorador's inner Resultado card stays solid warm-cream so it
 * still pops against the frosted panel.
 *
 * Call BEFORE drawHeader. Pass null for bgDataUrl to skip the photo
 * (e.g. if the asset fetch failed) — the panel still renders so the
 * layout is identical either way. */
export function drawBackground(doc: jsPDF, bgDataUrl: string | null) {
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()

  if (bgDataUrl) {
    /* Source is portrait ~2:3 (slightly narrower than A4's 0.71). Scale
     * to width=pageW; the minor vertical stretch is invisible at this
     * scale and any crop would clip the sofa or the lamp. */
    doc.addImage(bgDataUrl, 'JPEG', 0, 0, pageW, pageH, undefined, 'FAST')
  }

  /* One translucent white panel — no stroke, no concentric layers
   * (those produced visible rings against the photo). Moderate opacity
   * keeps text crisp; the photo stays visible as a thin frame at the
   * page edges and faintly through the panel itself.
   *
   * jsPDF exposes PDF graphics-state opacity via doc.GState. */
  const docAny = doc as unknown as {
    GState: new (opts: { opacity: number }) => unknown
    setGState: (gs: unknown) => void
  }

  const inset = 10
  const radius = 6
  docAny.setGState(new docAny.GState({ opacity: 0.82 }))
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(
    inset,
    inset,
    pageW - inset * 2,
    pageH - inset * 2,
    radius,
    radius,
    'F',
  )
  /* Reset to full opacity so subsequent draws aren't faded. */
  docAny.setGState(new docAny.GState({ opacity: 1 }))
}

/* Header: brand mark on the left, formatted date on the right, divider
 * across the page. The divider is positioned just below the logo's
 * baseline so additional content can start at margin + 28 mm. */
export function drawHeader(doc: jsPDF, logoDataUrl: string | null) {
  const pageW = doc.internal.pageSize.getWidth()
  const margin = PAGE_MARGIN_MM

  if (logoDataUrl) {
    // Auto-detect width by passing 0 — jsPDF preserves aspect ratio.
    doc.addImage(logoDataUrl, 'PNG', margin, margin - 2, 0, LOGO_HEIGHT_MM, undefined, 'FAST')
  } else {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(...PDF_COLORS.dark)
    doc.text('PROPI HOUSE', margin, margin + 4)
  }

  const fechaStr = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...PDF_COLORS.muted)
  doc.text(fechaStr, pageW - margin, margin + 4, { align: 'right' })

  /* Divider sits 2 mm below the logo so the line doesn't cross into
   * the wordmark when LOGO_HEIGHT_MM is bumped. Both call sites start
   * their first y at margin + 28 (= 46 mm), which leaves >6 mm of
   * breathing room below the divider for the section title. */
  const dividerY = margin - 2 + LOGO_HEIGHT_MM + 2
  doc.setDrawColor(...PDF_COLORS.divider)
  doc.setLineWidth(0.3)
  doc.line(margin, dividerY, pageW - margin, dividerY)
}

/* Footer: thin divider, italic disclaimer, then a compact brand line.
 * Pass { omitBrandRow: true } to render only the divider + disclaimer
 * (the Financiar report uses this — its body Contacto carries the
 * brand info, so the duplicated bottom strip felt noisy). */
export function drawFooter(
  doc: jsPDF,
  disclaimer: string,
  opts?: { omitBrandRow?: boolean },
) {
  const pageW = doc.internal.pageSize.getWidth()
  const margin = PAGE_MARGIN_MM
  const footerY = doc.internal.pageSize.getHeight() - margin

  doc.setDrawColor(...PDF_COLORS.divider)
  doc.setLineWidth(0.3)
  doc.line(margin, footerY - 10, pageW - margin, footerY - 10)

  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8)
  doc.setTextColor(...PDF_COLORS.muted)
  doc.text(disclaimer, margin, footerY - 5, { maxWidth: pageW - margin * 2 })

  if (opts?.omitBrandRow) return

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(...PDF_COLORS.dark)
  doc.text('propihouse.es', margin, footerY)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...PDF_COLORS.muted)
  doc.text(
    '@propihouse.es · facebook.com/propihouse.bcn',
    pageW - margin,
    footerY,
    { align: 'right' },
  )
}

/* Section heading: small accent block + uppercase label. accent='blue'
 * for "Resultado"-flavoured blocks, 'olive' for input/data blocks. */
export function drawSectionTitle(
  doc: jsPDF,
  text: string,
  atY: number,
  accent: 'blue' | 'olive' = 'olive',
) {
  const margin = PAGE_MARGIN_MM
  const accentColor = accent === 'blue' ? PDF_COLORS.blue : PDF_COLORS.olive
  doc.setFillColor(...accentColor)
  doc.rect(margin, atY - 3, 1.2, 4, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(...accentColor)
  doc.text(text.toUpperCase(), margin + 4, atY)
}

export function drawRow(
  doc: jsPDF,
  label: string,
  value: string,
  atY: number,
  opts?: { bold?: boolean; muted?: boolean },
) {
  const pageW = doc.internal.pageSize.getWidth()
  const margin = PAGE_MARGIN_MM
  doc.setFont('helvetica', opts?.bold ? 'bold' : 'normal')
  doc.setFontSize(opts?.muted ? 9 : 10)
  doc.setTextColor(...(opts?.muted ? PDF_COLORS.muted : PDF_COLORS.dark))
  doc.text(label, margin + 2, atY)
  doc.setFont('helvetica', opts?.bold ? 'bold' : 'normal')
  doc.text(value, pageW - margin - 2, atY, { align: 'right' })
}

export function drawDivider(doc: jsPDF, atY: number) {
  const pageW = doc.internal.pageSize.getWidth()
  const margin = PAGE_MARGIN_MM
  doc.setDrawColor(...PDF_COLORS.rowDivider)
  doc.setLineWidth(0.2)
  doc.line(margin, atY, pageW - margin, atY)
}

/* Multi-line paragraph. Auto-wraps to the content width, returns the Y
 * position where the next element should start (= atY + lines × line
 * height). Default 10pt body, 5 mm line height, dark color. */
export function drawParagraph(
  doc: jsPDF,
  text: string,
  atY: number,
  opts?: { fontSize?: number; lineHeight?: number; muted?: boolean },
): number {
  const pageW = doc.internal.pageSize.getWidth()
  const margin = PAGE_MARGIN_MM
  const fontSize = opts?.fontSize ?? 10
  const lineHeight = opts?.lineHeight ?? 5
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(fontSize)
  doc.setTextColor(...(opts?.muted ? PDF_COLORS.muted : PDF_COLORS.dark))
  const lines = doc.splitTextToSize(text, pageW - margin * 2 - 2) as string[]
  doc.text(lines, margin + 2, atY)
  return atY + lines.length * lineHeight
}

/* Open a new page and re-render the background + header so every page
 * has the same visual treatment. Returns the Y where content can
 * start, matching the first-page convention (margin + 32). */
export function nextPage(
  doc: jsPDF,
  bgDataUrl: string | null,
  logoDataUrl: string | null,
): number {
  doc.addPage()
  drawBackground(doc, bgDataUrl)
  drawHeader(doc, logoDataUrl)
  return PAGE_MARGIN_MM + 32
}
