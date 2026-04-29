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
  muted: [115, 115, 100] as [number, number, number],
  divider: [220, 215, 195] as [number, number, number],
  rowDivider: [235, 230, 215] as [number, number, number],
  warmCream: [247, 243, 232] as [number, number, number], // matches --color-cream-light
} as const

/* Logo height in millimetres. 18 was the original value; +5 % per Pau's
 * note bumps it to 18.9 mm. Both reports source this constant. */
export const LOGO_HEIGHT_MM = 18.9

export const PAGE_MARGIN_MM = 18

/* Async loader for the brand logo. The PDF embeds a base64 PNG; if the
 * fetch fails we fall back to a wordmark drawn with the default font so
 * the report still ships. */
export async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const res = await fetch('/logos/logo.png')
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

  doc.setDrawColor(...PDF_COLORS.divider)
  doc.setLineWidth(0.3)
  doc.line(margin, margin + 16, pageW - margin, margin + 16)
}

/* Footer: thin divider, italic disclaimer, brand line + contact info.
 * Anchored to the bottom of the page using internal.pageSize. */
export function drawFooter(doc: jsPDF, disclaimer: string) {
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

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(...PDF_COLORS.dark)
  doc.text('propihouse.es', margin, footerY)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...PDF_COLORS.muted)
  doc.text(
    'Pau Manovel · 637 86 36 78 · hola@propihouse.es',
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
