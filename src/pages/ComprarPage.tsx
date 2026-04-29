import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MethodTimeline, RevealSection } from '../components/ui'

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
  useEffect(() => {
    document.title = "Comprar vivienda en L'Hospitalet de Llobregat — Propi House"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Te ayudamos a comprar vivienda en L\'Hospitalet con criterio. Analizamos tu situación, tu presupuesto y te acompañamos en cada paso.')
    return () => { document.title = "Propi House — Inmobiliaria en L'Hospitalet de Llobregat" }
  }, [])

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
            <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#2A79A9] mb-8">
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

          {/* Three key questions — staggered bottom-up reveal */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
                'Qu\u00e9 tipo de vivienda encaja contigo',
                'Qu\u00e9 presupuesto tiene sentido',
                'Qu\u00e9 decisiones son realmente importantes',
            ].map((q, i) => (
              <RevealSection key={i} delay={260 + i * 140}>
                <div className="relative pl-5 border-l-2 border-[#868C4D]/30">
                  <p className="font-[Playfair_Display] text-base md:text-lg text-[#1A1A1A]/80 leading-snug">
                    {q}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>

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
                <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#2A79A9] mb-6">
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
                  className="group inline-flex items-center gap-3 bg-white hover:bg-[#2A79A9]/[0.06] border border-[#2A79A9]/20 hover:border-[#2A79A9]/45 rounded-xl px-5 py-3.5 transition-all duration-300 hover:shadow-sm"
                >
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#2A79A9]/[0.08] group-hover:bg-white text-[#2A79A9] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </span>
                  <span className="flex flex-col text-left">
                    <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#2A79A9]/70">
                      Gu&iacute;a inmobiliaria
                    </span>
                    <span className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#2A79A9] transition-colors">
                      Errores habituales al comprar
                    </span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#2A79A9] transition-transform group-hover:translate-x-1" />
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
                      className="group relative flex gap-5 md:gap-6 bg-white/70 backdrop-blur-sm border border-[#1A1A1A]/[0.07] rounded-xl p-5 md:p-6 hover:bg-[#2A79A9]/[0.08] hover:border-[#2A79A9]/30 transition-all duration-500"
                      style={{ marginLeft: `${i * 12}px` }}
                    >
                      {/* Index */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-[#2A79A9]/[0.06] border border-[#2A79A9]/20 flex items-center justify-center group-hover:bg-white group-hover:border-[#2A79A9]/50 group-hover:shadow-sm transition-all duration-500">
                          <span className="font-[Playfair_Display] text-sm md:text-base text-[#2A79A9]">
                            {sym.n}
                          </span>
                        </div>
                      </div>
                      {/* Body */}
                      <p className="pt-1.5 md:pt-2 text-base md:text-[1.05rem] leading-[1.6] text-[#1A1A1A]/70 group-hover:text-[#1A1A1A]/85 transition-colors duration-500">
                        {sym.text}
                      </p>
                      {/* Right edge accent */}
                      <span
                        aria-hidden
                        className="absolute top-1/2 -translate-y-1/2 right-0 h-8 w-[3px] rounded-l-full bg-[#2A79A9]/0 group-hover:bg-[#2A79A9]/60 transition-colors duration-500"
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
            <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#2A79A9] mb-6">
              Antes de buscar
            </span>
            <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A]">
              Antes de buscar, hay algo que conviene tener claro
            </h2>
          </RevealSection>

          <RevealSection delay={120} className="mt-14">
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  num: '1',
                  title: 'Qu\u00e9 necesitas realmente',
                  desc: 'Separar lo urgente de lo importante. Definir qu\u00e9 buscas y por qu\u00e9.',
                },
                {
                  num: '2',
                  title: 'Qu\u00e9 presupuesto tiene sentido',
                  desc: 'Entender tu capacidad real, no solo el precio de la vivienda.',
                },
                {
                  num: '3',
                  title: 'Qu\u00e9 tipo de vivienda encaja',
                  desc: 'Zona, tipolog\u00eda, estado del inmueble y posibilidades de reforma.',
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="group rounded-xl bg-white border border-[#1A1A1A]/[0.06] p-6 transition-all duration-400 hover:bg-[#2A79A9] hover:border-[#2A79A9] hover:-translate-y-0.5 hover:shadow-card cursor-default"
                >
                  <span className="block font-[Playfair_Display] text-3xl text-[#868C4D]/40 group-hover:text-[#868C4D] transition-colors duration-400 mb-3">
                    {item.num}
                  </span>
                  <h3 className="font-[Playfair_Display] text-lg text-[#1A1A1A] group-hover:text-[#A0A667] transition-colors duration-400 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-[1.7] text-[#1A1A1A]/55 group-hover:text-white/80 transition-colors duration-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={200} className="mt-12">
            <Link
              to="/guia/cuanto-dinero-comprar-vivienda"
              className="group inline-flex items-center gap-3 bg-white hover:bg-[#2A79A9]/[0.06] border border-[#2A79A9]/20 hover:border-[#2A79A9]/45 rounded-xl px-5 py-3.5 transition-all duration-300 hover:shadow-sm"
            >
              <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#2A79A9]/[0.08] group-hover:bg-white text-[#2A79A9] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </span>
              <span className="flex flex-col text-left">
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#2A79A9]/70">
                  Gu&iacute;a inmobiliaria
                </span>
                <span className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#2A79A9] transition-colors">
                  Cu&aacute;nto dinero necesitas para comprar
                </span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#2A79A9] transition-transform group-hover:translate-x-1" />
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
            <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#2A79A9] mb-6">
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
                  desc: 'La entrada, los impuestos y los gastos de escritura requieren una parte importante de capital propio.',
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
                <div
                  key={i}
                  className="group relative flex items-start gap-4 rounded-xl p-5 -mx-1 border border-transparent transition-all duration-400 hover:border-[#2A79A9]/35 hover:bg-white hover:shadow-[0_8px_30px_-12px_rgba(42,121,169,0.18)]"
                >
                  <span className="mt-1.5 flex-shrink-0 block w-2 h-2 rounded-full border-2 border-[#868C4D]/50 group-hover:border-[#2A79A9] group-hover:bg-[#2A79A9]/30 transition-colors duration-400" />
                  <div>
                    <h4 className="font-semibold text-[#1A1A1A] text-base mb-1 group-hover:text-[#2A79A9] transition-colors duration-400">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-[1.7] text-[#1A1A1A]/55 group-hover:text-[#1A1A1A]/80 transition-colors duration-400">
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
              <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#2A79A9] mb-6">
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
                    En Propi House, no empezamos ense&ntilde;ando pisos. Empezamos entendiendo a la persona. Su momento vital, sus posibilidades reales y lo que necesita de verdad. A partir de ah&iacute;, todo tiene m&aacute;s sentido.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="block w-8 h-px bg-[#2A79A9]/50" />
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#1A1A1A]/40">
                      Propi House
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
            <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#2A79A9] mb-6">
              Nuestro m&eacute;todo
            </span>
            <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A]">
              C&oacute;mo trabajamos contigo, paso a paso
            </h2>
          </RevealSection>

          <MethodTimeline
            color="blue"
            steps={[
              {
                num: '1',
                title: 'Entender tu situaci\u00f3n',
                desc: 'Escuchamos tu momento vital, tus necesidades y tus dudas. Sin prisa, sin compromiso. El objetivo es tener una foto clara de d\u00f3nde est\u00e1s y hacia d\u00f3nde quieres ir.',
              },
              {
                num: '2',
                title: 'Definir un marco claro',
                desc: 'Trabajamos juntos para establecer un presupuesto realista, prioridades claras y criterios de b\u00fasqueda que tengan sentido con tu situaci\u00f3n.',
              },
              {
                num: '3',
                title: 'Filtrar y enfocar la b\u00fasqueda',
                desc: 'En lugar de visitar decenas de viviendas, seleccionamos las que realmente encajan. Cada visita tiene un prop\u00f3sito claro.',
              },
              {
                num: '4',
                title: 'Analizar cada oportunidad',
                desc: 'Estudiamos cada vivienda con criterio: estado real, posibilidades de reforma, valoraci\u00f3n de mercado y condiciones de la operaci\u00f3n.',
              },
              {
                num: '5',
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
                <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#2A79A9] mb-5">
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
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E2D38] via-[#253846] to-[#1E2D38]" />

        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />

        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full opacity-[0.10] pointer-events-none" style={{ background: 'radial-gradient(ellipse, #2A79A9 0%, transparent 70%)' }} />
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
              Antes de avanzar, conviene entender bien tu situación
            </h2>
            <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Sin compromiso, sin prisa. Solo una conversación para entender tu momento y ver si podemos ayudarte.
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
              Escríbenos y te contactaremos en 24-48h.
            </p>
          </RevealSection>
        </div>
      </section>
    </main>
  )
}
