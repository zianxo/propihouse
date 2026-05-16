import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'hola@propihouse.es'
const FROM_EMAIL = process.env.FROM_EMAIL || 'Propi House <noreply@propihouse.es>'

type Summary = {
  precio?: number
  ahorros?: number
  gastosPct?: number
  interes?: number
  plazo?: number
  ingresos?: number
  gastosCompra?: number
  capital?: number
  monthlyPayment?: number
  totalCost?: number
  totalInterest?: number
  pctFinanciacion?: number
  debtRatio?: number
  debtLabel?: string
  noFinancing?: boolean
}

const fmtEUR = (n: number | undefined) =>
  typeof n === 'number'
    ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
    : '—'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, pdfBase64, summary } = (req.body || {}) as {
    email?: string
    pdfBase64?: string
    summary?: Summary
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido.' })
  }
  if (!pdfBase64 || typeof pdfBase64 !== 'string' || pdfBase64.length < 100) {
    return res.status(400).json({ error: 'PDF no recibido.' })
  }

  if (!RESEND_API_KEY) {
    console.warn('[send-financiar-pdf] RESEND_API_KEY not set — skipping send for:', email)
    return res.json({ ok: true })
  }

  const s = summary || {}
  const cuotaLine = s.noFinancing
    ? 'Sin necesidad de financiación'
    : `Cuota mensual de ${fmtEUR(s.monthlyPayment)} a ${s.plazo ?? '—'} años`

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;background:#EFE8CD;padding:48px 32px;max-width:560px;margin:0 auto;color:#1A1A1A;border-radius:12px;">
      <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:400;letter-spacing:-0.01em;margin:0 0 12px;">Tu simulación de hipoteca</h1>
      <p style="font-size:14px;line-height:1.65;color:#1A1A1A;opacity:0.7;margin:0 0 24px;">
        Adjuntamos el PDF con todos los datos de la simulación realizada en propihouse.es/financiar.
      </p>
      <div style="background:#FFFFFF;border-radius:8px;padding:20px;font-size:13px;line-height:1.7;color:#1A1A1A;">
        <p style="margin:0 0 8px;"><strong>${cuotaLine}</strong></p>
        <p style="margin:0 0 4px;opacity:0.7;">Precio de la vivienda: ${fmtEUR(s.precio)}</p>
        <p style="margin:0 0 4px;opacity:0.7;">Capital a financiar: ${fmtEUR(s.capital)}</p>
        <p style="margin:0 0 4px;opacity:0.7;">Gastos de compra: ${fmtEUR(s.gastosCompra)}</p>
        ${s.debtLabel ? `<p style="margin:0;opacity:0.7;">Endeudamiento: ${s.debtRatio ?? '—'}% (${s.debtLabel})</p>` : ''}
      </div>
      <p style="font-size:12px;color:#1A1A1A;opacity:0.5;margin:24px 0 0;line-height:1.6;">
        Esta simulación es orientativa. Las condiciones reales dependen de cada entidad bancaria y de tu perfil financiero.
      </p>
      <hr style="border:none;border-top:1px solid rgba(26,26,26,0.08);margin:24px 0;" />
      <p style="font-size:11px;color:#1A1A1A;opacity:0.4;margin:0;line-height:1.6;">
        Propi House · Pau Manovel · 637 86 36 78 · hola@propihouse.es<br/>
        Carrer d'Enric Prat de la Riba 187 · 08901 L'Hospitalet de Llobregat
      </p>
    </div>
  `

  const attachment = {
    filename: `propihouse-simulacion-hipoteca.pdf`,
    content: pdfBase64,
  }

  try {
    const resend = new Resend(RESEND_API_KEY)

    /* Send the PDF to the recipient. */
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Tu simulación de hipoteca — Propi House',
      html,
      attachments: [attachment],
    })

    /* Notify the agency that someone requested the PDF. */
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `Simulación enviada: ${email}`,
      html: `
        <div style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#1A1A1A;">
          <p>El usuario <strong>${email}</strong> ha solicitado el PDF de la simulación de hipoteca.</p>
          <p style="margin:12px 0 0;">${cuotaLine}.</p>
          <p style="margin:4px 0 0;color:#666;font-size:12px;">
            Precio ${fmtEUR(s.precio)} · Capital ${fmtEUR(s.capital)} · Endeudamiento ${s.debtRatio ?? '—'}%.
          </p>
        </div>
      `,
    })

    return res.json({ ok: true })
  } catch (err) {
    console.error('[send-financiar-pdf] Resend error:', err)
    return res.status(500).json({ error: 'No pudimos enviar el email. Inténtalo de nuevo más tarde.' })
  }
}
