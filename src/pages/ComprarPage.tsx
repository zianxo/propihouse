import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { RevealSection } from '../components/ui'

/* ─── Scroll-Linked Method Timeline ─── */
function MethodTimeline({
  steps,
}: {
  steps: { step: number; title: string; desc: string }[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const [progress, setProgress] = useState(0)
  const [reached, setReached] = useState<boolean[]>(() => steps.map(() => false))
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const update = () => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const triggerY = window.innerHeight * 0.55
      const total = rect.bottom - rect.top
      const raw = (triggerY - rect.top) / total
      setProgress(Math.max(0, Math.min(1, raw)))

      const next = dotRefs.current.map((dot) => {
        if (!dot) return false
        const r = dot.getBoundingClientRect()
        return r.top + r.height / 2 <= triggerY
      })
      setReached((prev) =>
        prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next
      )
    }
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className="mt-16 md:mt-20 relative">
      {/* Gray base line */}
      <div className="absolute left-[19px] md:left-[19px] top-0 bottom-0 w-[2px] bg-[#1A1A1A]/[0.08] rounded-full" />

      {/* Animated filled line */}
      <div
        className="absolute left-[19px] md:left-[19px] top-0 w-[2px] rounded-full bg-gradient-to-b from-[#2A79A9] via-[#2A79A9]/85 to-[#868C4D]/40"
        style={{
          height: `${progress * 100}%`,
          transition: 'height 120ms linear',
          boxShadow: '0 0 12px rgba(42, 121, 169, 0.32)',
        }}
      />

      <div className="space-y-12 md:space-y-14">
        {steps.map((item, i) => {
          const active = reached[i]
          return (
            <div key={item.step} className="relative flex gap-6 md:gap-10">
              <div className="relative z-10 flex-shrink-0">
                <div
                  ref={(el) => { dotRefs.current[i] = el }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    active
                      ? 'bg-[#2A79A9] border-2 border-[#2A79A9] scale-110'
                      : 'bg-[#FDFBF5] border-2 border-[#868C4D]/60'
                  }`}
                  style={
                    active
                      ? { boxShadow: '0 0 0 6px rgba(42,121,169,0.10), 0 4px 14px rgba(42,121,169,0.22)' }
                      : undefined
                  }
                >
                  <span
                    className={`font-[Playfair_Display] text-sm font-bold transition-colors duration-500 ${
                      active ? 'text-white' : 'text-[#868C4D]'
                    }`}
                  >
                    {item.step}
                  </span>
                </div>
              </div>
              <div
                className={`pt-1 pb-2 transition-all duration-500 ${
                  active ? 'opacity-100 translate-x-0' : 'opacity-60 -translate-x-1'
                }`}
              >
                <h3 className="font-[Playfair_Display] text-xl md:text-2xl text-[#1A1A1A] mb-3">
                  {item.title}
                </h3>
                <p className="text-base leading-[1.75] text-[#1A1A1A]/60 max-w-lg">
                  {item.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ComprarPage
   Long-form editorial service page for property buyers.
   ═══════════════════════════════════════════════════════════════ */

/* ── Tiny reusable pieces ─────────────────────────────────────── */

function ArrowRight({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638l-3.96-3.96a.75.75 0 1 1 1.06-1.06l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06l3.96-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <span className="block h-px w-16 bg-[#868C4D]/25" />
    </div>
  )
}

/* ── Main page ────────────────────────────────────────────────── */

export default function ComprarPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF5] font-[Lato]">
      {/* ╔══════════════════════════════════════════════════════╗
          ║  BLOCK 1 — INTRO HERO                               ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#868C4D]/[0.07] via-[#868C4D]/[0.03] to-transparent pointer-events-none" />

        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 pt-32 pb-24 md:pt-44 md:pb-32">
          <RevealSection>
            <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-8">
              Comprar vivienda
            </span>
          </RevealSection>

          <RevealSection delay={80}>
            <h1 className="font-[Playfair_Display] text-[clamp(2rem,5.5vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[#1A1A1A] mb-8">
              Comprar una vivienda en L'Hospitalet empieza por entender tu situaci&oacute;n
            </h1>
          </RevealSection>

          <RevealSection delay={160}>
            <p className="text-lg md:text-xl leading-[1.75] text-[#1A1A1A]/65 max-w-2xl">
              Comprar una vivienda en L'Hospitalet de Llobregat no siempre empieza buscando pisos.
              Muchas personas llegan a este momento porque est&aacute;n viviendo un cambio importante:
              independizarse, formar una familia, cambiar de vivienda o simplemente encontrar un lugar
              que encaje mejor con su situaci&oacute;n actual.
            </p>
          </RevealSection>

          {/* Three key questions */}
          <RevealSection delay={260} className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                'Qu\u00e9 tipo de vivienda encaja contigo',
                'Qu\u00e9 presupuesto tiene sentido',
                'Qu\u00e9 decisiones son realmente importantes',
              ].map((q, i) => (
                <div
                  key={i}
                  className="relative pl-5 border-l-2 border-[#868C4D]/30"
                >
                  <p className="font-[Playfair_Display] text-base md:text-lg text-[#1A1A1A]/80 leading-snug">
                    {q}
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={340} className="mt-14">
            <p className="text-base leading-[1.8] text-[#1A1A1A]/55 max-w-2xl italic">
              Porque comprar una vivienda no consiste solo en visitar pisos.
              Consiste en entender bien tu situaci&oacute;n y tomar decisiones con criterio desde el principio.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  BLOCK 2 — PROBLEM                                  ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="relative overflow-hidden bg-[#EFE8CD]/40">
        {/* Soft ambient accent */}
        <div
          aria-hidden
          className="absolute top-1/3 -left-32 w-[480px] h-[480px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #1A1A1A 0%, transparent 65%)' }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
            {/* LEFT — heading + closing copy */}
            <div className="md:col-span-5">
              <RevealSection>
                <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-6">
                  El problema
                </span>
                <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A]">
                  El problema no es la vivienda, es c&oacute;mo se empieza la b&uacute;squeda
                </h2>
              </RevealSection>

              <RevealSection delay={120} className="mt-8">
                <p className="font-[Playfair_Display] text-lg md:text-xl leading-[1.5] italic text-[#1A1A1A]/85 border-l-2 border-[#868C4D]/50 pl-5 max-w-md">
                  En muchos casos, el problema no es la vivienda. Es c&oacute;mo se est&aacute; planteando la b&uacute;squeda desde el inicio.
                </p>
              </RevealSection>

              <RevealSection delay={200} className="mt-8">
                <Link
                  to="/guia/errores-comprar-vivienda"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2A79A9] hover:text-[#2A79A9]/80 transition-colors group"
                >
                  Errores habituales al comprar
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </RevealSection>
            </div>

            {/* RIGHT — stacked symptom cards */}
            <div className="md:col-span-7">
              <RevealSection delay={80}>
                <p className="font-[Lato] text-[11px] font-semibold tracking-[0.18em] uppercase text-[#1A1A1A]/40 mb-6">
                  Lo que solemos ver
                </p>
              </RevealSection>

              <div className="space-y-4">
                {[
                  {
                    n: '01',
                    text: 'Visitan muchas viviendas sin criterio claro ni prioridades definidas.',
                  },
                  {
                    n: '02',
                    text: 'Dudan constantemente sobre si est\u00e1n tomando la decisi\u00f3n correcta.',
                  },
                  {
                    n: '03',
                    text: 'Sienten que pueden equivocarse y que el proceso se les escapa.',
                  },
                ].map((sym, i) => (
                  <RevealSection key={sym.n} delay={120 + i * 80}>
                    <div
                      className="group relative flex gap-5 md:gap-6 bg-white/70 backdrop-blur-sm border border-[#1A1A1A]/[0.07] rounded-xl p-5 md:p-6 hover:bg-white hover:border-[#1A1A1A]/[0.12] transition-all duration-500"
                      style={{ marginLeft: `${i * 12}px` }}
                    >
                      {/* Index */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-[#EFE8CD]/60 border border-[#868C4D]/20 flex items-center justify-center group-hover:bg-[#868C4D]/[0.12] transition-colors">
                          <span className="font-[Playfair_Display] text-sm md:text-base text-[#868C4D]">
                            {sym.n}
                          </span>
                        </div>
                      </div>
                      {/* Body */}
                      <p className="pt-1.5 md:pt-2 text-base md:text-[1.05rem] leading-[1.6] text-[#1A1A1A]/70">
                        {sym.text}
                      </p>
                      {/* Right edge accent */}
                      <span
                        aria-hidden
                        className="absolute top-1/2 -translate-y-1/2 right-0 h-8 w-[3px] rounded-l-full bg-[#868C4D]/0 group-hover:bg-[#868C4D]/40 transition-colors duration-500"
                      />
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ╔══════════════════════════════════════════════════════╗
          ║  BLOCK 3 — ORDER                                    ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="bg-[#FDFBF5]">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
          <RevealSection>
            <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-6">
              Antes de buscar
            </span>
            <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A]">
              Antes de buscar, hay algo que conviene tener claro
            </h2>
          </RevealSection>

          <RevealSection delay={120} className="mt-14">
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                {
                  num: '01',
                  title: 'Qu\u00e9 necesitas realmente',
                  desc: 'Separar lo urgente de lo importante. Definir qu\u00e9 buscas y por qu\u00e9.',
                },
                {
                  num: '02',
                  title: 'Qu\u00e9 presupuesto tiene sentido',
                  desc: 'Entender tu capacidad real, no solo el precio de la vivienda.',
                },
                {
                  num: '03',
                  title: 'Qu\u00e9 tipo de vivienda encaja',
                  desc: 'Zona, tipolog\u00eda, estado del inmueble y posibilidades de reforma.',
                },
              ].map((item) => (
                <div key={item.num} className="group">
                  <span className="block font-[Playfair_Display] text-3xl text-[#868C4D]/40 mb-3">
                    {item.num}
                  </span>
                  <h3 className="font-[Playfair_Display] text-lg text-[#1A1A1A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-[1.7] text-[#1A1A1A]/55">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={200} className="mt-12">
            <Link
              to="/guia/cuanto-dinero-comprar-vivienda"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2A79A9] hover:text-[#2A79A9]/80 transition-colors group"
            >
              Cu&aacute;nto dinero necesitas para comprar
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </RevealSection>

          <RevealSection delay={260} className="mt-14">
            <Link
              to="/entender-mi-situacion"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg bg-[#2A79A9] text-white text-sm font-semibold tracking-wide hover:bg-[#2A79A9]/90 transition-all hover:shadow-lg hover:shadow-[#2A79A9]/15 active:scale-[0.98]"
            >
              Entender mi situaci&oacute;n
              <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  BLOCK 4 — FINANCING                                ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="bg-[#EFE8CD]/40">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
          <RevealSection>
            <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-6">
              Capacidad de compra
            </span>
            <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A]">
              Tu capacidad de compra va m&aacute;s all&aacute; del precio
            </h2>
            <p className="mt-6 text-base md:text-lg leading-[1.8] text-[#1A1A1A]/60 max-w-2xl">
              El precio de una vivienda es solo una parte de la ecuaci&oacute;n. Antes de buscar, conviene tener una visi&oacute;n completa de tu capacidad de compra.
            </p>
          </RevealSection>

          <RevealSection delay={140} className="mt-14">
            <div className="grid gap-y-8 gap-x-12 sm:grid-cols-2">
              {[
                {
                  title: 'Ahorros disponibles',
                  desc: 'La entrada, los gastos de escritura e impuestos requieren una parte importante de capital propio.',
                },
                {
                  title: 'Financiaci\u00f3n accesible',
                  desc: 'Cu\u00e1nto puede financiar un banco depende de tus ingresos, estabilidad y compromiso actual.',
                },
                {
                  title: 'Gastos asociados',
                  desc: 'Impuestos, notar\u00eda, registro, gestor\u00eda. Muchas veces se subestiman y aparecen al final.',
                },
                {
                  title: 'Estabilidad econ\u00f3mica',
                  desc: 'No solo tus ingresos actuales, sino la solidez de tu situaci\u00f3n a medio y largo plazo.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="mt-1.5 flex-shrink-0 block w-2 h-2 rounded-full border-2 border-[#868C4D]/50" />
                  <div>
                    <h4 className="font-semibold text-[#1A1A1A] text-base mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-[1.7] text-[#1A1A1A]/55">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <SectionDivider />

      {/* ╔══════════════════════════════════════════════════════╗
          ║  BLOCK 5 — PROPIHOUSE APPROACH                      ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="relative overflow-hidden bg-[#FDFBF5]">
        {/* Soft top accent */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#868C4D]/35 to-transparent"
        />
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="absolute -top-20 right-0 w-[420px] h-[420px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #2A79A9 0%, transparent 65%)' }}
        />

        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
          <RevealSection>
            <div className="text-center md:text-left max-w-3xl">
              <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-6">
                Nuestro enfoque
              </span>
              <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A]">
                Comprar con criterio cambia completamente el proceso
              </h2>
            </div>
          </RevealSection>

          {/* Lead paragraph */}
          <RevealSection delay={120} className="mt-12">
            <p className="font-[Playfair_Display] text-xl md:text-2xl lg:text-[1.65rem] leading-[1.45] text-[#1A1A1A]/85 max-w-3xl">
              Cuando una persona tiene clara su situaci&oacute;n, su presupuesto y sus prioridades, el proceso de b&uacute;squeda cambia por completo. Las visitas dejan de ser una exploraci&oacute;n desordenada y se convierten en decisiones informadas.
            </p>
          </RevealSection>

          {/* Pull quote + closing in 12-col grid */}
          <RevealSection delay={200} className="mt-14 md:mt-16">
            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
              {/* Pull quote */}
              <div className="md:col-span-6 relative">
                {/* Big serif quote mark */}
                <span
                  aria-hidden
                  className="absolute -top-6 -left-2 font-[Playfair_Display] text-[6rem] leading-none text-[#868C4D]/15 select-none pointer-events-none"
                >
                  &ldquo;
                </span>
                <div className="relative pl-6 border-l-2 border-[#2A79A9]/40">
                  <p className="font-[Playfair_Display] text-lg md:text-xl leading-[1.55] italic text-[#1A1A1A]/85">
                    En PropiHouse, no empezamos ense&ntilde;ando pisos. Empezamos entendiendo a la persona. Su momento vital, sus posibilidades reales y lo que necesita de verdad. A partir de ah&iacute;, todo tiene m&aacute;s sentido.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="block w-8 h-px bg-[#2A79A9]/50" />
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#1A1A1A]/40">
                      PropiHouse
                    </span>
                  </div>
                </div>
              </div>

              {/* Closing paragraph */}
              <div className="md:col-span-6">
                <p className="text-base md:text-lg leading-[1.8] text-[#1A1A1A]/65">
                  Ese primer paso &mdash;<em className="not-italic font-semibold text-[#1A1A1A]/85">entender antes de buscar</em>&mdash; marca la diferencia entre un proceso largo y confuso, y un proceso claro, eficiente y con sentido.
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  BLOCK 6 — METHOD (timeline)                        ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="bg-[#EFE8CD]/40">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-36">
          <RevealSection>
            <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-6">
              Nuestro m&eacute;todo
            </span>
            <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A]">
              C&oacute;mo trabajamos contigo, paso a paso
            </h2>
          </RevealSection>

          <MethodTimeline
            steps={[
              {
                step: 1,
                title: 'Entender tu situaci\u00f3n',
                desc: 'Escuchamos tu momento vital, tus necesidades y tus dudas. Sin prisa, sin compromiso. El objetivo es tener una foto clara de d\u00f3nde est\u00e1s y hacia d\u00f3nde quieres ir.',
              },
              {
                step: 2,
                title: 'Definir un marco claro',
                desc: 'Trabajamos juntos para establecer un presupuesto realista, prioridades claras y criterios de b\u00fasqueda que tengan sentido con tu situaci\u00f3n.',
              },
              {
                step: 3,
                title: 'Filtrar y enfocar la b\u00fasqueda',
                desc: 'En lugar de visitar decenas de viviendas, seleccionamos las que realmente encajan. Cada visita tiene un prop\u00f3sito claro.',
              },
              {
                step: 4,
                title: 'Analizar cada oportunidad',
                desc: 'Estudiamos cada vivienda con criterio: estado real, posibilidades de reforma, valoraci\u00f3n de mercado y condiciones de la operaci\u00f3n.',
              },
              {
                step: 5,
                title: 'Acompa\u00f1ar la decisi\u00f3n',
                desc: 'Negociaci\u00f3n, financiaci\u00f3n, documentaci\u00f3n legal y cierre. Te acompa\u00f1amos en cada paso hasta que las llaves est\u00e9n en tu mano.',
              },
            ]}
          />
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  BLOCK 7 — GUIDE LINKS                              ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="bg-[#FDFBF5]">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <RevealSection>
            <div className="flex items-end justify-between gap-6 mb-12 md:mb-14 flex-wrap">
              <div>
                <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-5">
                  Gu&iacute;a
                </span>
                <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A] max-w-2xl">
                  Entender el mercado es parte de la decisi&oacute;n
                </h2>
              </div>
              <Link
                to="/guia"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2A79A9] hover:text-[#2A79A9]/80 transition-colors whitespace-nowrap pb-2"
              >
                Ver gu&iacute;a inmobiliaria
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </RevealSection>

          <RevealSection delay={120}>
            <div className="grid gap-px bg-[#1A1A1A]/[0.07] rounded-xl overflow-hidden md:grid-cols-2">
              {[
                {
                  n: '01',
                  cat: 'Errores',
                  label: 'Errores habituales al comprar vivienda',
                  href: '/guia/errores-comprar-vivienda',
                },
                {
                  n: '02',
                  cat: 'Presupuesto',
                  label: 'Cu\u00e1nto dinero necesitas para comprar',
                  href: '/guia/cuanto-dinero-comprar-vivienda',
                },
                {
                  n: '03',
                  cat: 'Estrategia',
                  label: 'Comprar antes o vender primero?',
                  href: '/guia/comprar-o-vender-primero',
                },
                {
                  n: '04',
                  cat: 'Valoraci\u00f3n',
                  label: 'C\u00f3mo saber cu\u00e1nto vale un piso',
                  href: '/guia/cuanto-vale-piso-hospitalet',
                },
              ].map((art) => (
                <Link
                  key={art.href}
                  to={art.href}
                  className="group relative block bg-white hover:bg-[#FDFBF5] p-7 md:p-9 transition-colors min-h-[180px]"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <span className="font-[Playfair_Display] text-3xl text-[#1A1A1A]/15 leading-none">
                      {art.n}
                    </span>
                    <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#868C4D] mt-2">
                      {art.cat}
                    </span>
                  </div>
                  <h3 className="font-[Playfair_Display] text-xl md:text-[1.4rem] leading-[1.3] text-[#1A1A1A] group-hover:text-[#2A79A9] transition-colors mb-5">
                    {art.label}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A79A9] tracking-wide">
                    Leer art&iacute;culo
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-7 md:left-9 w-0 h-[2px] bg-[#2A79A9] group-hover:w-12 transition-all duration-500"
                  />
                </Link>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  BLOCK 8 — CTA FINAL                                ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="relative overflow-hidden bg-[#2A79A9]">
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />

        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <RevealSection>
            <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-white">
              Antes de avanzar, conviene entender bien tu situaci&oacute;n
            </h2>
          </RevealSection>

          <RevealSection delay={120}>
            <p className="mt-6 text-base md:text-lg leading-[1.75] text-white/65 max-w-xl mx-auto">
              Sin compromiso, sin prisa. Solo una conversaci&oacute;n para entender tu momento
              y ver si podemos ayudarte.
            </p>
          </RevealSection>

          <RevealSection delay={200} className="mt-10">
            <Link
              to="/entender-mi-situacion"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg bg-white text-[#2A79A9] text-sm font-semibold tracking-wide hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-black/10 active:scale-[0.98]"
            >
              Entender mi situaci&oacute;n
              <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealSection>
        </div>
      </section>
    </main>
  )
}
