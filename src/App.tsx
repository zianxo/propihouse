import { useState } from 'react'
import './index.css'

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error desconocido')
      setStatus('sent')
      setMessage('Gracias. Te avisaremos en cuanto abramos.')
      setEmail('')
    } catch (err: unknown) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Algo salió mal. Inténtalo de nuevo.')
    }
  }

  const isSent = status === 'sent'
  const isLoading = status === 'loading'

  return (
    <>
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="page">
        {/* Brand */}
        <div className="brand">
          {/* <img
            src="/logo.png"
            alt="PropiHouse"
            className="brand-icon"
          /> */}
          {/* <span className="brand-name"><img
            src="/logo.png"
            alt="PropiHouse"
            className="brand-icon"
          /></span> */}
        </div>

        {/* Badge */}
        <div className="badge">
          <span className="badge-dot" />
          Próximamente
        </div>

        {/* Headline */}
        <h1 className="headline">
          Tu hogar ideal,<br />
          <em>muy pronto.</em>
        </h1>

        {/* Sub */}
        <p className="subheadline">
          Estamos preparando algo especial. Una experiencia inmobiliaria
          diseñada con detalle, pensada para quienes buscan{' '}
          lo mejor.
        </p>

        {/* Email capture */}
        <form className="notify-form" onSubmit={handleSubmit}>
          <input
            className="notify-input"
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isSent || isLoading}
          />
          <button
            className={`notify-btn${isSent ? ' sent' : ''}`}
            type="submit"
            disabled={isSent || isLoading}
          >
            {isSent ? 'Listo ✓' : isLoading ? '...' : 'Notifícame'}
          </button>
        </form>

        {/* Status message */}
        {message && (
          <p className={`success-msg${status === 'error' ? ' error' : ''}`}>{message}</p>
        )}

        {/* Divider */}
        <div className="divider" />

        {/* Meta info */}
        <div className="meta">
          <div className="meta-item">
            <span className="meta-label">Teléfono</span>
            <span className="meta-value">637 86 36 78</span>
          </div>
          <div className="meta-sep" />
          <div className="meta-item">
            <span className="meta-label">Especialidad</span>
            <span className="meta-value">Propiedades Premium</span>
          </div>
          <div className="meta-sep" />
          <div className="meta-item">
            <span className="meta-label">Barcelona</span>
            <span className="meta-value">L'Hospitalet de Llobregat</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <footer className="bottom-bar">
        <span className="bottom-copy">
          © 2026 PropiHouse. Todos los derechos reservados.
        </span>
        <nav className="bottom-links">
          <a href="tel:+34637863678">637 86 36 78</a>
          <a
            href="https://maps.google.com/?q=Carrer+d'Enric+Prat+de+la+Riba,+187,+08901+L'Hospitalet+de+Llobregat,+Barcelona"
            target="_blank"
            rel="noopener noreferrer"
          >
            L'Hospitalet, Barcelona
          </a>
          <a href="#">Privacidad</a>
        </nav>
      </footer>
    </>
  )
}

export default App
