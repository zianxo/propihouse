import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'hola@propihouse.es'
const FROM_EMAIL = process.env.FROM_EMAIL || 'Propi House <noreply@propihouse.es>'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body as { email?: string }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido.' })
  }

  // ── If no API key is configured, silently succeed ──────────────────────
  // This lets the site work on Vercel without Resend set up.
  // When you add RESEND_API_KEY to Vercel env vars, emails will start sending.
  if (!RESEND_API_KEY) {
    console.warn('[subscribe] RESEND_API_KEY not set — skipping email send for:', email)
    return res.json({ ok: true })
  }

  try {
    const resend = new Resend(RESEND_API_KEY)

    // 1. Confirmation to subscriber
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Te avisaremos en cuanto abramos — Propi House',
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;background:#000;color:#f5f5f7;padding:48px 32px;max-width:520px;margin:0 auto;border-radius:16px;">
          <h1 style="font-size:24px;font-weight:300;letter-spacing:-0.02em;margin:0 0 16px;">Estás en la lista.</h1>
          <p style="font-size:15px;line-height:1.65;color:rgba(245,245,247,0.6);margin:0 0 32px;">
            Gracias por tu interés en Propi House. Cuando abramos, serás de los primeros en saberlo.
          </p>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:0 0 24px;" />
          <p style="font-size:12px;color:rgba(245,245,247,0.3);margin:0;">
            Propi House · Carrer d'Enric Prat de la Riba, 187 · 08901 L'Hospitalet de Llobregat, Barcelona
          </p>
        </div>
      `,
    })

    // 2. Notify the agency
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `Nuevo suscriptor: ${email}`,
      html: `<p style="font-family:sans-serif;font-size:14px;">Nuevo correo registrado: <strong>${email}</strong></p>`,
    })

    return res.json({ ok: true })
  } catch (err) {
    console.error('[subscribe] Resend error:', err)
    return res.status(500).json({ error: 'Error al enviar el correo. Inténtalo de nuevo.' })
  }
}
