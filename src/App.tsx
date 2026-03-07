import { useState } from 'react'
import './index.css'

function App() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setSent(true)
    setSuccessMsg('Gracias. Te avisaremos en cuanto abramos.')
    setEmail('')
  }

  return (
    <>
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="page">
        {/* Brand */}
        <div className="brand">
          <img
            src="/logo.png"
            alt="PropiHouse"
            className="brand-icon"
          />
          <span className="brand-name">PropiHouse</span>
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
          lo mejor en España.
        </p>

        {/* Email capture */}
        <form className="notify-form" onSubmit={handleSubmit}>
          <input
            className="notify-input"
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={sent}
          />
          <button
            className={`notify-btn${sent ? ' sent' : ''}`}
            type="submit"
            disabled={sent}
          >
            {sent ? 'Listo ✓' : 'Notifícame'}
          </button>
        </form>

        {/* Success */}
        {successMsg && (
          <p className="success-msg">{successMsg}</p>
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
          © 2025 PropiHouse. Todos los derechos reservados.
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
