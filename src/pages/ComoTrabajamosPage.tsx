import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MethodTimeline, RevealSection, SectionHeading } from '../components/ui'

/* ─── Three Pillars ─── */
const PILLARS = [
  {
    num: '01',
    title: 'Entender antes de actuar',
    body: 'Porque cada decisión parte de una situación concreta, no de una fórmula estándar.',
  },
  {
    num: '02',
    title: 'Dar contexto, no solo respuestas',
    body: 'Para que entiendas por qué se toma cada decisión, no solo que hacer.',
  },
  {
    num: '03',
    title: 'Acompañar sin sustituir',
    body: 'Para que tengas apoyo en todo momento, pero sin perder el control de la decisión.',
  },
]

/* ─── Method Steps ─── */
const STEPS = [
  {
    num: '01',
    title: 'Primero entendemos la situación',
    desc: 'Antes de hablar de precios o portales, analizamos el contexto. Cada vivienda tiene una historia detrás, y cada propietario una situación diferente.',
  },
  {
    num: '02',
    title: 'Analizamos el mercado con perspectiva',
    desc: "Estudiamos el mercado de L'Hospitalet, las propiedades comparables, los tipos de compradores y las tendencias que afectan a tu zona.",
  },
  {
    num: '03',
    title: 'Preparamos la vivienda para el mercado',
    desc: 'Identificamos el valor real de tu vivienda, qué aspectos potenciar y qué ajustes pueden ayudar a presentarla de la mejor forma posible.',
  },
  {
    num: '04',
    title: 'Cuidamos al comprador',
    desc: 'Un comprador informado toma mejores decisiones. En cada visita explicamos la propiedad, la documentación y el contexto de la operación.',
  },
  {
    num: '05',
    title: 'Te mantenemos informado durante todo el proceso',
    desc: 'Comunicación constante: visitas realizadas, opiniones de compradores, ajustes de estrategia. Sin silencios ni sorpresas.',
  },
  {
    num: '06',
    title: 'Acompañamos la negociación y el cierre',
    desc: 'Análisis de ofertas, negociación de condiciones, depósito y arras, coordinación de documentación hasta la firma ante notario.',
  },
]

/* ─── What We Don't Do ─── */
const DONT_DO = [
  'No forzamos decisiones para cerrar operaciones',
  'No hacemos visitas sin una base clara',
  'No prometemos resultados que el mercado no puede sostener',
  'No trabajamos con información poco clara',
  'No tratamos todas las situaciones de la misma manera',
]

/* ─── Scroll-animated strikethrough list ─── */
function DontDoList({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<boolean[]>(() => items.map(() => false))

  useEffect(() => {
    const update = () => {
      const container = containerRef.current
      if (!container) return
      const rows = Array.from(container.querySelectorAll('[data-dont-row]')) as HTMLElement[]
      const triggerY = window.innerHeight * 0.72
      const next = rows.map((r) => r.getBoundingClientRect().top <= triggerY)
      setActive((prev) =>
        prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next
      )
    }
    let raf = 0
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={containerRef} className="space-y-4">
      {items.map((item, i) => {
        const on = active[i]
        return (
          <div
            key={item}
            data-dont-row
            className={`flex items-center gap-4 border rounded-xl px-6 py-5 backdrop-blur-sm transition-all duration-500 ${
              on
                ? 'bg-white/[0.08] border-[#C94A4A]/30'
                : 'bg-white/[0.03] border-white/[0.05]'
            }`}
          >
            {/* X icon */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                on ? 'bg-[#C94A4A]/20 scale-110' : 'bg-white/[0.06] scale-90'
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-colors duration-500 ${on ? 'text-[#E88]' : 'text-cream/50'}`}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            {/* Text with animated strike */}
            <span className="relative flex-1 text-white/85 text-sm md:text-base leading-relaxed">
              <span className={`transition-colors duration-500 ${on ? 'text-white/55' : 'text-white/90'}`}>
                {item}
              </span>
              <span
                aria-hidden
                className="absolute left-0 right-0 top-1/2 h-px bg-[#E88]/70 origin-left"
                style={{
                  transform: `translateY(-50%) scaleX(${on ? 1 : 0})`,
                  transition: `transform 700ms cubic-bezier(0.16,1,0.3,1) ${i * 140}ms`,
                }}
              />
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ─── What You Receive ─── */
const RECEIVE = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    text: 'Sabes qué está pasando en todo momento',
    detail: 'Sabes en qué punto estamos, qué se está haciendo y qué viene después.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    text: 'Una estrategia adaptada a tu caso',
    detail: 'No aplicamos la misma fórmula a todas las viviendas. Cada decisión parte de tu situación, tu objetivo y el momento del inmueble.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    text: 'Apoyo en las decisiones clave',
    detail: 'No te dejamos solo cuando toca valorar opciones, ajustar la estrategia o tomar una decisión que puede cambiar el resultado.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    text: 'Información real, no intuiciones',
    detail: 'Te mantenemos al día para que entiendas cómo está respondiendo el mercado y puedas decidir con información real.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    text: 'Un proceso ordenado y sin desgaste',
    detail: 'Filtramos, organizamos y damos contexto para que el proceso no dependa de la improvisación ni te cargue con más de lo necesario.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    text: 'Acompañamiento hasta el cierre',
    detail: 'Nuestro trabajo no acaba cuando aparece interés. Seguimos contigo hasta que la operación puede cerrarse con sentido y con seguridad.',
  },
]

/* ─── Expandable receive grid ─── */
function ReceiveGrid({ items }: { items: { icon: React.ReactNode; text: string; detail: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {items.map(({ icon, text, detail }, i) => {
        const isOpen = open === i
        return (
          <button
            type="button"
            key={text}
            onClick={() => setOpen(isOpen ? null : i)}
            aria-expanded={isOpen}
            className={`text-left flex items-start gap-4 rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-500 cursor-pointer border ${
              isOpen
                ? 'bg-cream border-cream-dark/40 shadow-card'
                : 'bg-white border-transparent hover:-translate-y-0.5'
            }`}
          >
            <div
              className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                isOpen ? 'bg-olive-dark text-cream' : 'bg-cream text-olive-dark'
              }`}
            >
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`font-medium text-[15px] leading-snug pt-1.5 transition-colors duration-500 ${
                  isOpen ? 'text-olive-dark' : 'text-dark'
                }`}
              >
                {text}
              </p>
              <div
                className="grid transition-all duration-500 ease-out"
                style={{
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  opacity: isOpen ? 1 : 0,
                  marginTop: isOpen ? 12 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <p className="text-sm leading-relaxed text-olive-dark/85">
                    {detail}
                  </p>
                </div>
              </div>
            </div>
            <span
              aria-hidden
              className={`flex-shrink-0 mt-2 text-xs transition-all duration-500 ${
                isOpen ? 'text-olive-dark rotate-180' : 'text-dark/30'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* ─── Testimonial Quotes ─── */
const QUOTES = [
  'Por primera vez entendí realmente el proceso',
  'No sentí presión en ningún momento',
  'Todo estaba claro, sin sorpresas',
  'Cada decisión tenía una explicación',
]

export default function ComoTrabajamosPage() {
  useEffect(() => {
    document.title = "Cómo trabajamos en Propi House — Inmobiliaria L'Hospitalet"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Conoce nuestra forma de trabajar. Primero entendemos, después actuamos. Sin presiones, con criterio.')
    return () => { document.title = "Propi House — Inmobiliaria en L'Hospitalet de Llobregat" }
  }, [])

  return (
    <>
      {/* ═══════════ BLOCK 1 — INTRO HERO ═══════════ */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-gradient-to-br from-[#2A3328] via-[#344030] to-[#2A3328]">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }} />
        {/* Warm ambient glow */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #EFE8CD 0%, transparent 70%)' }}
        />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <RevealSection>
            <span className="inline-block text-cream/60 text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Cómo trabajamos
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-white leading-[1.12] mb-5">
              Cómo trabajamos tu vivienda{' '}
              <span className="block mt-1">
                en <em className="italic text-cream">L'Hospitalet de Llobregat</em>
              </span>
            </h1>
            <p className="text-cream/70 text-2xl md:text-3xl lg:text-[2rem] font-serif italic mb-6 tracking-wide leading-snug">
              Lo que ves es lo que es
            </p>
            <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
              Te enseñamos cómo analizamos cada caso, cómo tomamos decisiones y qué puedes esperar en cada fase del proceso.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/entender-mi-situacion"
                className="inline-flex items-center gap-2.5 bg-blue hover:bg-blue-dark text-white text-sm font-bold px-7 py-3.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue/25"
              >
                Quiero entender mi caso
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#metodo"
                className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/14 text-white/80 hover:text-white text-sm font-bold px-7 py-3.5 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                Ver el proceso paso a paso
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
                </svg>
              </a>
            </div>
          </RevealSection>
        </div>

        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" className="w-full">
            <path d="M0 48V20C360 0 720 8 1080 20C1260 28 1380 36 1440 40V48H0Z" fill="var(--color-warm-white)" />
          </svg>
        </div>
      </section>

      {/* ═══════════ BLOCK 2 — CORE IDEA ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-10">
              <span className="inline-block text-olive text-xs font-bold tracking-[0.2em] uppercase mb-4">
                Nuestra filosofía
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-dark leading-tight">
                Tomar decisiones inmobiliarias con criterio
              </h2>
            </div>
          </RevealSection>
          <RevealSection>
            <div className="space-y-5 text-text-light text-base md:text-[17px] leading-relaxed">
              <p>
                En Propi House creemos que las decisiones importantes sobre una vivienda no deberían tomarse con prisas ni con información incompleta. Nuestro trabajo no consiste simplemente en enseñar viviendas o publicarlas en portales.
              </p>
              <p className="font-medium text-dark">
                Consiste en analizar cada situación y ayudar a tomar decisiones con sentido desde el principio.
              </p>
              <p>
                Empezamos por entender el contexto. El objetivo que se quiere conseguir. La situación personal. Las necesidades reales.
              </p>
            </div>
          </RevealSection>
          {/* Decorative rule */}
          <RevealSection>
            <div className="flex items-center gap-4 mt-12">
              <div className="flex-1 h-px bg-cream-dark/40" />
              <div className="w-2 h-2 rounded-full bg-olive/40" />
              <div className="flex-1 h-px bg-cream-dark/40" />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 3 — THREE PILLARS ═══════════ */}
      <section className="py-20 md:py-28 bg-cream/30">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              eyebrow="Principios"
              title="Tres ideas que definen cómo trabajamos"
            />
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {PILLARS.map(({ num, title, body }, i) => (
              <RevealSection key={num} delay={120 + i * 140}>
                <div className="relative bg-white rounded-xl p-8 shadow-soft group hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 h-full">
                  {/* Accent top bar */}
                  <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-gradient-to-r from-blue/60 via-olive/40 to-transparent" />
                  <span className="inline-block font-serif text-3xl font-bold text-cream-dark mb-4 group-hover:text-blue/70 transition-colors duration-500">
                    {num}
                  </span>
                  <h3 className="font-sans font-bold text-dark text-lg mb-3 leading-snug">
                    {title}
                  </h3>
                  <p className="text-text-light text-sm leading-relaxed">
                    {body}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BLOCK 4 — METHOD (TIMELINE) ═══════════ */}
      <section id="metodo" className="py-20 md:py-28 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              eyebrow="El proceso"
              title="Así trabajamos, paso a paso"
            />
          </RevealSection>

          {/* Timeline */}
          <MethodTimeline steps={STEPS} color="blue" />

          {/* Mid-page CTA */}
          <RevealSection className="text-center mt-16">
            <Link
              to="/entender-mi-situacion"
              className="inline-flex items-center gap-2.5 bg-blue hover:bg-blue-dark text-white text-sm font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue/20"
            >
              Entender mi situación
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 5 — WHAT WE DON'T DO ═══════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#2A3328] via-[#344030] to-[#2A3328] relative overflow-hidden">
        {/* Texture */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />
        {/* Ambient glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #EFE8CD 0%, transparent 70%)' }}
        />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <RevealSection>
            <div className="text-center mb-12">
              <span className="inline-block text-cream/50 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                Lo que decidimos no hacer
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-white leading-tight">
                Decisiones que definen cómo trabajamos
              </h2>
              <p className="mt-5 text-white/45 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Nuestra forma de trabajar no solo se basa en lo que hacemos. También en lo que decidimos no hacer.
              </p>
            </div>
          </RevealSection>

          <RevealSection>
            <DontDoList items={DONT_DO} />
          </RevealSection>

          <RevealSection>
            <p className="text-center text-cream text-2xl md:text-3xl lg:text-[2rem] font-serif italic mt-16 leading-snug max-w-2xl mx-auto">
              Porque no se trata de hacer más. Se trata de hacer lo que tiene sentido.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 6 — WHAT CLIENT RECEIVES ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              eyebrow="Lo que recibes"
              title="Lo que recibes cuando trabajamos tu vivienda"
            />
          </RevealSection>
          <RevealSection>
            <ReceiveGrid items={RECEIVE} />
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 7 — VALIDATION ═══════════ */}
      <section className="py-20 md:py-28 bg-cream/30">
        <div className="max-w-5xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              eyebrow="Experiencias"
              title="Cuando el proceso tiene sentido, se nota"
            />
          </RevealSection>
          <RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {QUOTES.map((quote) => (
                <div
                  key={quote}
                  className="relative bg-white rounded-xl p-8 shadow-soft"
                >
                  {/* Quote mark */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-cream-dark/60 mb-4">
                    <path
                      d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                      fill="currentColor"
                    />
                    <path
                      d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                      fill="currentColor"
                    />
                  </svg>
                  <p className="font-serif text-dark text-lg md:text-xl leading-snug italic">
                    {quote}
                  </p>
                  <div className="mt-5 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#E8B931" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
          <RevealSection className="text-center mt-12">
            <Link
              to="/entender-mi-situacion"
              className="inline-flex items-center gap-2.5 bg-olive-dark hover:bg-olive text-white text-sm font-bold px-7 py-3.5 rounded-lg transition-all duration-300"
            >
              Entender mi situación
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 8 — CTA FINAL ═══════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A3328] via-[#344030] to-[#2A3328]" />

        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />

        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full opacity-[0.07] pointer-events-none" style={{ background: 'radial-gradient(ellipse, #2A79A9 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(ellipse, #868C4D 0%, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center z-10">
          <RevealSection>
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="block w-12 h-px bg-white/20" />
              <span className="text-cream/40 text-[10px] font-bold tracking-[0.25em] uppercase">El primer paso</span>
              <span className="block w-12 h-px bg-white/20" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
              Antes de tomar una decisión, conviene entender bien la{' '}situación
            </h2>
            <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Sin compromiso. Analizamos tu caso y vemos qué tiene sentido para ti.
            </p>

            {/* Two buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/entender-mi-situacion"
                className="group inline-flex items-center gap-2.5 bg-white hover:bg-cream text-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg text-sm"
              >
                Entender mi situación
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <a
                href="https://wa.me/34637863678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/15 text-white/80 hover:text-white font-bold px-7 py-4 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                Escríbenos por WhatsApp
              </a>
            </div>

            <p className="text-white/35 text-sm mt-8">
              Sin compromiso. Analizamos tu caso y vemos qué tiene sentido para ti.
            </p>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
