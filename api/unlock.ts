import type { VercelRequest, VercelResponse } from '@vercel/node'

const PREVIEW_CODE = process.env.PREVIEW_CODE || 'PROPIHOUSE2026'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { code } = req.body as { code?: string }

  if (!code || code.trim().toUpperCase() !== PREVIEW_CODE.toUpperCase()) {
    return res.status(403).json({ error: 'Código incorrecto' })
  }

  // Set a cookie that lasts 90 days
  res.setHeader(
    'Set-Cookie',
    `propihouse_preview=true; Path=/; Max-Age=${60 * 60 * 24 * 90}; SameSite=Lax; Secure`
  )

  return res.json({ ok: true })
}
