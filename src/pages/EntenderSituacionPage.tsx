import { Link } from 'react-router-dom'
import { EntenderSituacionForm } from '../components/EntenderSituacionForm'

export default function EntenderSituacionPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF5] relative overflow-hidden">
      {/* Subtle grain */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Top bar (sits below the global header) */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-10 pt-28 pb-5">
        <Link
          to="/"
          className="font-[Playfair_Display] text-lg tracking-tight text-[#1A1A1A] hover:opacity-70 transition-opacity"
        >
          PropiHouse
        </Link>
        <span className="hidden sm:block text-xs text-[#1A1A1A]/30 tracking-widest uppercase font-[Lato]">
          Consulta personalizada
        </span>
      </header>

      {/* Form */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-6 md:pt-12 pb-20">
        <EntenderSituacionForm />
      </div>

      {/* Decorative bottom gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDFBF5] to-transparent pointer-events-none z-[5]" />
    </main>
  )
}
