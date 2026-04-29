import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MethodTimeline, RevealSection } from '../components/ui'

/* ═══════════════════════════════════════════════════════════════
   VenderPage
   Long-form editorial service page for property sellers.
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

/* ── Scroll-triggered strike-through grid ─────────────────────── */

function StrikeGrid({ steps }: { steps: { n: string; label: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<boolean[]>(() => steps.map(() => false))

  useEffect(() => {
    const update = () => {
      const container = containerRef.current
      if (!container) return
      const cards = Array.from(container.querySelectorAll('[data-strike-card]')) as HTMLElement[]
      const triggerY = window.innerHeight * 0.75
      const next = cards.map((c) => c.getBoundingClientRect().top <= triggerY)
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
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
      {steps.map((step, i) => (
        <div key={step.n} className="relative" data-strike-card>
          <div className="relative bg-white/70 border border-[#1A1A1A]/[0.08] rounded-lg p-5 md:p-6 backdrop-blur-sm min-h-[120px] flex flex-col justify-center items-center text-center">
            <span
              aria-hidden
              className="absolute left-[8%] right-[8%] top-1/2 h-0.5 bg-[#1A1A1A]/45 origin-left"
              style={{
                transform: `translateY(-50%) rotate(-8deg) scaleX(${active[i] ? 1 : 0})`,
                transition: `transform 700ms cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
              }}
            />
            <span className="font-[Playfair_Display] text-xs text-[#1A1A1A]/30 mb-2 block">
              {step.n}
            </span>
            <p
              className={`text-sm font-medium transition-colors duration-500 ${
                active[i] ? 'text-[#1A1A1A]/45' : 'text-[#1A1A1A]/75'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {step.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Main page ────────────────────────────────────────────────── */

export default function VenderPage() {
  useEffect(() => {
    document.title = "Vender vivienda en L'Hospitalet de Llobregat — Propi House"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Vende tu vivienda en L\'Hospitalet con una estrategia clara. Valoración, preparación y acompañamiento profesional.')
    return () => { document.title = "Propi House — Inmobiliaria en L'Hospitalet de Llobregat" }
  }, [])

  return (
    <main className="min-h-screen bg-[#FDFBF5] font-[Lato]">
      {/* ╔══════════════════════════════════════════════════════╗
          ║  INTRO HERO                                         ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-warm-white to-cream-light" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-olive) 0.5px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <RevealSection>
            <span className="inline-block text-[#B8A88A] text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Vender vivienda
            </span>
            <h1 className="font-[Playfair_Display] text-[clamp(2rem,5.5vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-dark mb-8 max-w-3xl">
              Vender una vivienda no siempre empieza queriendo vender
            </h1>
            <div className="max-w-2xl space-y-5">
              <p className="text-text-light text-lg leading-relaxed">
                A veces se trata de un cambio de vivienda. Otras, de una herencia que hay que
                gestionar. En algunos casos, es una separaci&oacute;n o un cambio de ciudad. Y a
                veces, simplemente, ha llegado el momento.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Sea cual sea la raz&oacute;n, vender una vivienda en L'Hospitalet de Llobregat es
                una decisi&oacute;n importante. Y tomarla bien empieza mucho antes de publicar un
                anuncio.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  PROBLEM                                            ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="relative overflow-hidden bg-[#EFE8CD]/40">
        {/* Soft diagonal accent stripe */}
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #1A1A1A 0%, transparent 65%)' }}
        />

        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
          {/* Editorial heading */}
          <RevealSection>
            <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-6">
              El problema
            </span>
            <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A] max-w-3xl">
              El problema es que muchas veces el proceso empieza al rev&eacute;s
            </h2>
          </RevealSection>

          {/* Visual: broken sequence of 4 steps */}
          <RevealSection delay={120} className="mt-14 md:mt-16">
            <p className="font-[Lato] text-[11px] font-semibold tracking-[0.18em] uppercase text-[#1A1A1A]/40 mb-5">
              Lo habitual / lo que solemos ver
            </p>

            <StrikeGrid
              steps={[
                { n: '1', label: 'No entender la vivienda' },
                { n: '2', label: 'Prometer muchas visitas' },
                { n: '3', label: 'Esperar que llamen' },
                { n: '4', label: 'No conocer al comprador' },
              ]}
            />
          </RevealSection>

          {/* Body text in editorial layout */}
          <RevealSection delay={180} className="mt-16 md:mt-20">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
              {/* Pull-quote */}
              <div className="md:col-span-5">
                <p className="font-[Playfair_Display] text-xl md:text-[1.55rem] leading-[1.4] italic text-[#1A1A1A]/85 border-l-2 border-[#868C4D]/50 pl-6">
                  <strong className="font-semibold">Ese enfoque no funciona porque ignora lo que realmente importa</strong>: entender la vivienda, entender al comprador potencial y dise&ntilde;ar una estrategia que conecte ambos.
                </p>
              </div>

              {/* Body paragraphs */}
              <div className="md:col-span-7 space-y-5 text-base md:text-lg leading-[1.8] text-[#1A1A1A]/65">
                <p>
                  Muchas inmobiliarias empiezan la conversaci&oacute;n hablando de cu&aacute;nto vale la vivienda o prometiendo muchas visitas. Pero vender una vivienda no consiste en ense&ntilde;ar el piso a muchas personas.
                </p>
                <p>
                  Consiste en entender bien el inmueble, el mercado y el tipo de comprador que realmente puede encajar. Solo as&iacute; se puede construir una estrategia de venta coherente y obtener un buen resultado.
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <SectionDivider />

      {/* ╔══════════════════════════════════════════════════════╗
          ║  CONTEXTO                                           ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="bg-[#FDFBF5]">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
          <RevealSection>
            <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-6">
              Contexto
            </span>
            <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A]">
              Saber cu&aacute;nto vale una vivienda no es tan simple
            </h2>
          </RevealSection>

          <RevealSection delay={100} className="mt-6">
            <p className="text-base md:text-lg leading-[1.8] text-[#1A1A1A]/60 max-w-2xl">
              Muchas personas piensan que el valor de una vivienda depende solo de los metros cuadrados o de la zona. Pero en realidad, hay otros factores que influyen directamente en el precio:
            </p>
          </RevealSection>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              'El estado del inmueble',
              'La demanda en el barrio',
              'El tipo de comprador que puede encajar',
              'El momento del mercado inmobiliario',
            ].map((item, i) => (
              <RevealSection key={i} delay={180 + i * 110}>
                <div className="group flex items-center gap-4 bg-white/70 border border-[#1A1A1A]/[0.08] rounded-lg p-5 backdrop-blur-sm transition-all duration-500 hover:bg-white hover:border-[#868C4D]/35 hover:shadow-[0_6px_24px_-10px_rgba(134,140,77,0.25)] hover:-translate-y-0.5">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#868C4D]/50 group-hover:bg-[#868C4D] transition-colors" />
                  <p className="text-sm md:text-base font-medium text-[#1A1A1A]/70 group-hover:text-[#1A1A1A]/90 transition-colors">{item}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={240} className="mt-10">
            <p className="text-base md:text-lg leading-[1.8] text-[#1A1A1A]/60 max-w-2xl">
              Y no todos tienen el mismo peso en cada vivienda. Por eso, conviene entender qu&eacute; factores est&aacute;n influyendo en ese valor y c&oacute;mo pueden afectar al resultado.
            </p>
          </RevealSection>
        </div>
      </section>

      <SectionDivider />

      {/* ╔══════════════════════════════════════════════════════╗
          ║  VALORADOR BLOCK                                    ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="bg-[#FDFBF5]">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* LEFT: heading + content + CTA */}
            <div>
              <RevealSection>
                <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-6">
                  Valorador
                </span>
                <h2 className="font-[Playfair_Display] text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A] mb-6">
                  Cu&aacute;nto vale realmente tu vivienda en L'Hospitalet de Llobregat?
                </h2>
                <p className="text-base md:text-lg leading-[1.8] text-[#1A1A1A]/60 mb-6">
                  El precio de una vivienda depende de muchos factores: ubicaci&oacute;n, estado, superficie, orientaci&oacute;n, planta, demanda actual en la zona y condiciones de la operaci&oacute;n. Tener una primera referencia te ayuda a empezar con los pies en el suelo.
                </p>
                <p className="text-base leading-[1.8] text-[#1A1A1A]/55 mb-8 max-w-lg">
                  Obt&eacute;n una estimaci&oacute;n orientativa del valor de tu vivienda en funci&oacute;n de los datos actuales del mercado. Es un primer paso &uacute;til para situarte.
                </p>
                <Link
                  to="/valorador"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#2A79A9] text-white text-sm font-semibold tracking-wide hover:bg-[#2A79A9]/90 transition-all hover:shadow-lg hover:shadow-[#2A79A9]/15 active:scale-[0.98]"
                >
                  Calcular el valor de mi vivienda
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="mt-4 text-xs text-[#1A1A1A]/40 leading-relaxed">
                  Obtendr&aacute;s una estimaci&oacute;n inmediata. No es necesario dejar tus datos.
                </p>
              </RevealSection>
            </div>

            {/* RIGHT: stylized calculator preview */}
            <RevealSection delay={120}>
              <div className="relative">
                {/* Offset frame for depth */}
                <div
                  aria-hidden
                  className="absolute -top-3 -right-3 w-full h-full rounded-xl bg-[#868C4D]/[0.18]"
                />

                <div className="relative bg-white rounded-xl border border-[#1A1A1A]/[0.08] shadow-[0_20px_60px_-20px_rgba(26,26,26,0.18)] p-7 md:p-8">
                  {/* Window dots */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]/10" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#1A1A1A]/30">
                      Vista previa
                    </span>
                  </div>

                  {/* Mock fields */}
                  <div className="space-y-5">
                    <div>
                      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#1A1A1A]/40">
                        Tipo de vivienda
                      </span>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {['Piso', 'Casa', '\u00c1tico'].map((t, i) => (
                          <div
                            key={t}
                            className={`text-center text-xs py-2 rounded-md border ${
                              i === 0
                                ? 'border-[#2A79A9] bg-[#2A79A9]/[0.06] text-[#2A79A9] font-semibold'
                                : 'border-[#1A1A1A]/10 text-[#1A1A1A]/45'
                            }`}
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#1A1A1A]/40">
                          Superficie
                        </span>
                        <span className="text-xs text-[#1A1A1A]/60 font-medium">
                          82 m&sup2;
                        </span>
                      </div>
                      <div className="mt-3 relative h-1 bg-[#1A1A1A]/[0.06] rounded-full overflow-hidden">
                        <div className="absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-[#2A79A9] to-[#868C4D] rounded-full" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#1A1A1A]/40">
                        Estado
                      </span>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {['Buen estado', 'Reformada'].map((s, i) => (
                          <div
                            key={s}
                            className={`text-center text-xs py-2 rounded-md border ${
                              i === 0
                                ? 'border-[#2A79A9] bg-[#2A79A9]/[0.06] text-[#2A79A9] font-semibold'
                                : 'border-[#1A1A1A]/10 text-[#1A1A1A]/45'
                            }`}
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Estimated range */}
                  <div className="mt-7 pt-6 border-t border-[#1A1A1A]/[0.06]">
                    <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#1A1A1A]/40 mb-2">
                      Estimaci&oacute;n orientativa
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-[Playfair_Display] text-2xl md:text-[1.85rem] text-[#1A1A1A]">
                        240.000 &euro;
                      </span>
                      <span className="text-sm text-[#1A1A1A]/40">— 285.000 &euro;</span>
                    </div>
                    <div className="mt-3 relative h-1.5 bg-[#1A1A1A]/[0.05] rounded-full">
                      <div className="absolute inset-y-0 left-[18%] right-[18%] bg-gradient-to-r from-[#2A79A9]/85 to-[#868C4D]/85 rounded-full" />
                      <div className="absolute -top-1 left-[18%] w-3.5 h-3.5 -translate-x-1/2 rounded-full bg-white border-2 border-[#2A79A9] shadow-sm" />
                      <div className="absolute -top-1 right-[18%] w-3.5 h-3.5 translate-x-1/2 rounded-full bg-white border-2 border-[#868C4D] shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  STRATEGIC BLOCK                                    ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="bg-[#EFE8CD]/40">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
          <RevealSection>
            <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-6">
              Estrategia
            </span>
            <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A]">
              El valor de una vivienda es solo el punto de partida
            </h2>
          </RevealSection>

          <RevealSection delay={100} className="mt-6">
            <p className="text-base md:text-lg leading-[1.8] text-[#1A1A1A]/60 max-w-2xl">
              Conocer el precio de una vivienda es importante, pero no es lo &uacute;nico que determina el resultado de una venta.
            </p>
          </RevealSection>

          <RevealSection delay={180} className="mt-14">
            <div className="grid gap-4 sm:grid-cols-2 [&>div]:transition-all [&>div]:duration-500 [&>div:hover]:bg-white [&>div:hover]:border-[#868C4D]/35 [&>div:hover]:shadow-[0_6px_24px_-10px_rgba(134,140,77,0.25)] [&>div:hover]:-translate-y-0.5">
              {[
                'C\u00f3mo se percibe la vivienda en el mercado',
                'Qu\u00e9 tipo de comprador puede encajar',
                'C\u00f3mo se presenta el inmueble',
                'C\u00f3mo se interpreta la informaci\u00f3n que dejan las visitas',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/70 border border-[#1A1A1A]/[0.08] rounded-lg p-5 backdrop-blur-sm"
                >
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#868C4D]/50" />
                  <p className="text-sm md:text-base font-medium text-[#1A1A1A]/70">{item}</p>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={240} className="mt-10">
            <p className="text-base md:text-lg leading-[1.8] text-[#1A1A1A]/60 max-w-2xl">
              Cuando estos elementos se entienden bien, vender una vivienda se convierte en un proceso mucho m&aacute;s claro y f&aacute;cil de interpretar.
            </p>
          </RevealSection>
        </div>
      </section>

      <SectionDivider />

      {/* ╔══════════════════════════════════════════════════════╗
          ║  METHOD (timeline, 4 steps)                         ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="bg-[#FDFBF5]">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-36">
          <RevealSection>
            <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-6">
              Nuestro m&eacute;todo
            </span>
            <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A]">
              C&oacute;mo trabajamos contigo para vender tu vivienda
            </h2>
          </RevealSection>

          <MethodTimeline
            color="olive"
            steps={[
              {
                num: '1',
                title: 'Entender la situaci\u00f3n',
                desc: 'Antes de hablar de precios, analizamos el contexto del propietario, su momento personal y el objetivo real de la operaci\u00f3n. No todas las decisiones pasan por vender inmediatamente. A veces lo importante es entender qu\u00e9 opciones existen y cu\u00e1l tiene m\u00e1s sentido.',
              },
              {
                num: '2',
                title: 'Analizar la vivienda y el mercado',
                desc: "Estudiamos el valor real del inmueble, la demanda en L'Hospitalet de Llobregat y c\u00f3mo encaja la vivienda dentro del mercado actual. Tambi\u00e9n analizamos c\u00f3mo se percibe la vivienda y qu\u00e9 aspectos pueden trabajarse para que el comprador entienda mejor su potencial.",
              },
              {
                num: '3',
                title: 'Dise\u00f1ar la estrategia de venta',
                desc: 'Definimos el posicionamiento, el precio y el tipo de comprador que puede encajar. Cuando tiene sentido, planteamos mejoras en la vivienda \u2014desde peque\u00f1os ajustes hasta una adecuaci\u00f3n m\u00e1s completa\u2014 para aumentar su atractivo y facilitar la decisi\u00f3n del comprador. No se trata de ocultar lo que no gusta, sino de entenderlo y saber c\u00f3mo trabajarlo.',
              },
              {
                num: '4',
                title: 'Acompa\u00f1ar todo el proceso',
                desc: 'Acompa\u00f1amos al propietario durante todo el proceso con comunicaci\u00f3n constante y criterio en cada decisi\u00f3n. Analizamos cada visita, interpretamos la informaci\u00f3n del mercado y ajustamos la estrategia cuando es necesario. Porque vender una vivienda no es solo recibir ofertas, es saber leer lo que est\u00e1 pasando para tomar mejores decisiones.',
              },
            ]}
          />
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  CONTENT / SEO — GUIDE LINKS                        ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="bg-[#EFE8CD]/40">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <RevealSection>
            <div className="mb-12 md:mb-14">
              <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-5">
                Gu&iacute;a
              </span>
              <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A] max-w-2xl">
                Entender el mercado antes de vender
              </h2>
              <Link
                to="/guia"
                className="group inline-flex items-center gap-2.5 mt-7 bg-[#868C4D] hover:bg-[#767D42] text-white px-6 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-[#868C4D]/15 active:scale-[0.98]"
              >
                Ir a la gu&iacute;a inmobiliaria
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </RevealSection>

          <RevealSection delay={120}>
            <div className="grid gap-px bg-[#1A1A1A]/[0.07] rounded-xl overflow-hidden md:grid-cols-2">
              {[
                {
                  n: '01',
                  cat: 'Mercado',
                  label: 'Es buen momento para vender en L\'Hospitalet?',
                  href: '/guia/buen-momento-vender',
                },
                {
                  n: '02',
                  cat: 'Errores',
                  label: 'Errores habituales al vender vivienda',
                  href: '/guia/errores-vender-vivienda',
                },
                {
                  n: '03',
                  cat: 'Valoraci\u00f3n',
                  label: 'Cu\u00e1nto vale tu vivienda realmente',
                  href: '/guia/cuanto-vale-piso-hospitalet',
                },
                {
                  n: '04',
                  cat: 'Impuestos',
                  label: 'Impuestos al vender un piso en L\'Hospitalet',
                  href: '/guia/impuestos-vender',
                },
              ].map((art) => (
                <Link
                  key={art.href}
                  to={art.href}
                  className="group relative block bg-[#FDFBF5] hover:bg-white p-7 md:p-9 transition-colors min-h-[180px]"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <span className="font-[Playfair_Display] text-3xl text-[#1A1A1A]/15 leading-none">
                      {art.n}
                    </span>
                    <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#868C4D] mt-2">
                      {art.cat}
                    </span>
                  </div>
                  <h3 className="font-[Playfair_Display] text-xl md:text-[1.4rem] leading-[1.3] text-[#1A1A1A] group-hover:text-[#868C4D] transition-colors mb-5">
                    {art.label}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#868C4D] tracking-wide">
                    Leer art&iacute;culo
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>

                  {/* Underline accent that grows on hover */}
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-7 md:left-9 w-0 h-[2px] bg-[#868C4D] group-hover:w-12 transition-all duration-500"
                  />
                </Link>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  CTA FINAL                                          ║
          ╚══════════════════════════════════════════════════════╝ */}
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
              <span className="text-cream/40 text-[10px] font-bold tracking-[0.25em] uppercase">Tu vivienda</span>
              <span className="block w-12 h-px bg-white/20" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
              Antes de vender, conviene entender bien la{' '}situación
            </h2>
            <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Una conversación para entender tu momento y diseñar el mejor plan para tu vivienda. Sin compromiso, sin prisa.
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
