import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/comprar', label: 'Comprar' },
  { to: '/vender', label: 'Vender' },
  { to: '/alquilar', label: 'Alquilar' },
  { to: '/financiar', label: 'Financiar' },
  { to: '/cuanto-vale-mi-vivienda', label: 'Valorador' },
  { to: '/como-trabajamos', label: 'Cómo trabajamos' },
  { to: '/guia', label: 'Guía' },
]

export default function Header() {
  /* Per Pau: the navbar always shows the brand cream background on
   * every page (including the dark-hero homepage). `scrolled` only
   * toggles a subtle shadow + slightly tighter padding now — the
   * background colour is constant. */
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-cream transition-all duration-300 ${
        scrolled ? 'shadow-soft py-1.5' : 'py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0" onClick={() => setMenuOpen(false)}>
          <img
            src="/logos/logo.png"
            alt="Propi House"
            className="h-[5.4rem] md:h-[6.6rem] w-auto transition-all duration-300"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-[14px] font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-blue bg-blue/5'
                    : 'text-text hover:text-blue hover:bg-cream-dark/40'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/entender-mi-situacion"
            className="hidden md:inline-flex items-center gap-2 bg-blue hover:bg-blue-dark text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            Empezar
          </Link>

          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-cream-dark/40"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5 relative">
              <span
                className={`w-full h-[2px] rounded-full bg-dark transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[5px]' : ''
                }`}
              />
              <span
                className={`w-full h-[2px] rounded-full bg-dark transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span
                className={`w-full h-[2px] rounded-full bg-dark transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-[5px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>

    <div
      className={`lg:hidden fixed inset-0 bg-cream z-40 transition-all duration-500 overflow-y-auto overscroll-contain ${
        menuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="min-h-full flex flex-col items-center justify-center gap-2 px-8 pt-28 pb-12">
        {NAV_LINKS.map(({ to, label }, i) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-2xl font-serif font-medium py-3 px-6 rounded-xl transition-all duration-300 ${
                isActive ? 'text-blue bg-cream' : 'text-dark hover:text-blue hover:bg-cream/40'
              }`
            }
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {label}
          </NavLink>
        ))}
        <Link
          to="/entender-mi-situacion"
          onClick={() => setMenuOpen(false)}
          className="mt-6 bg-blue hover:bg-blue-dark text-white text-lg font-bold px-8 py-3.5 rounded-lg transition-all duration-300"
        >
          Entender mi situación
        </Link>
      </div>
    </div>
    </>
  )
}
