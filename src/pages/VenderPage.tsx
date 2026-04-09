import { Link } from 'react-router-dom'
import { RevealSection } from '../components/ui'

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

/* ── Main page ────────────────────────────────────────────────── */

export default function VenderPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF5] font-[Lato]">
      {/* ╔══════════════════════════════════════════════════════╗
          ║  INTRO HERO                                         ║
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
              Vender vivienda
            </span>
          </RevealSection>

          <RevealSection delay={80}>
            <h1 className="font-[Playfair_Display] text-[clamp(2rem,5.5vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[#1A1A1A] mb-8">
              Vender una vivienda no siempre empieza queriendo vender
            </h1>
          </RevealSection>

          <RevealSection delay={160}>
            <div className="space-y-5 text-lg md:text-xl leading-[1.75] text-[#1A1A1A]/65 max-w-2xl">
              <p>
                A veces se trata de un cambio de vivienda. Otras, de una herencia que hay que gestionar.
                En algunos casos, es una separaci&oacute;n o un cambio de ciudad. Y a veces, simplemente,
                ha llegado el momento.
              </p>
              <p>
                Sea cual sea la raz&oacute;n, vender una vivienda en L'Hospitalet de Llobregat es una
                decisi&oacute;n importante. Y tomarla bien empieza mucho antes de publicar un anuncio.
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[
                { n: '01', label: 'Pide las llaves' },
                { n: '02', label: 'Publica un anuncio' },
                { n: '03', label: 'Espera que llamen' },
                { n: '04', label: 'Baja el precio' },
              ].map((step, i) => (
                <div key={step.n} className="relative">
                  <div className="relative bg-white/70 border border-[#1A1A1A]/[0.08] rounded-lg p-4 md:p-5 backdrop-blur-sm">
                    {/* Diagonal strike-through line */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden rounded-lg"
                    >
                      <div className="w-[150%] h-px bg-[#1A1A1A]/15 -rotate-[10deg]" />
                    </div>
                    <span className="font-[Playfair_Display] text-xs text-[#1A1A1A]/30">
                      {step.n}
                    </span>
                    <p className="mt-2 text-sm font-medium text-[#1A1A1A]/55 line-through decoration-[#1A1A1A]/25 decoration-1">
                      {step.label}
                    </p>
                  </div>

                  {/* Arrow connector (hidden on last) */}
                  {i < 3 && (
                    <div className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-[#1A1A1A]/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Body text in editorial layout */}
          <RevealSection delay={180} className="mt-16 md:mt-20">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
              {/* Pull-quote */}
              <div className="md:col-span-5">
                <p className="font-[Playfair_Display] text-xl md:text-[1.55rem] leading-[1.4] italic text-[#1A1A1A]/85 border-l-2 border-[#868C4D]/50 pl-6">
                  Ese enfoque no funciona porque ignora lo que realmente importa: entender la vivienda, entender al comprador potencial y dise&ntilde;ar una estrategia que conecte ambos.
                </p>
              </div>

              {/* Body paragraphs */}
              <div className="md:col-span-7 space-y-5 text-base md:text-lg leading-[1.8] text-[#1A1A1A]/65">
                <p>
                  Lo habitual es que una agencia te pida las llaves, publique un anuncio y espere
                  a que alguien llame. Y cuando no hay resultados, baje el precio.
                </p>
                <p>
                  Sin esa base, el proceso se alarga, se pierden oportunidades y el resultado
                  rara vez es el que el propietario esperaba.
                </p>
              </div>
            </div>
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
                  className="absolute -top-3 -right-3 w-full h-full rounded-2xl bg-[#868C4D]/[0.18]"
                />

                <div className="relative bg-white rounded-2xl border border-[#1A1A1A]/[0.08] shadow-[0_20px_60px_-20px_rgba(26,26,26,0.18)] p-7 md:p-8">
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
              Saber cu&aacute;nto vale tu vivienda es &uacute;til, pero no suficiente.
              El resultado final de una venta depende de c&oacute;mo se gestiona el proceso completo.
            </p>
          </RevealSection>

          <RevealSection delay={180} className="mt-14">
            <div className="grid gap-8 sm:grid-cols-2">
              {[
                {
                  title: 'Tipo de comprador',
                  desc: 'No todos los compradores buscan lo mismo. Entender qui\u00e9n es el comprador ideal de tu vivienda permite enfocar la estrategia.',
                },
                {
                  title: 'Presentaci\u00f3n del inmueble',
                  desc: 'La primera impresi\u00f3n condiciona la decisi\u00f3n. C\u00f3mo se muestra una vivienda puede cambiar completamente la percepci\u00f3n de su valor.',
                },
                {
                  title: 'Estrategia de venta',
                  desc: 'Precio de salida, canales, ritmo de visitas, negociaci\u00f3n. Cada decisi\u00f3n forma parte de una estrategia que debe tener sentido.',
                },
                {
                  title: 'Informaci\u00f3n de las visitas',
                  desc: 'Cada visita es una fuente de informaci\u00f3n. Saber qu\u00e9 piensan los compradores permite ajustar y mejorar el proceso.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="mt-1.5 flex-shrink-0 block w-2 h-2 rounded-full border-2 border-[#868C4D]/50" />
                  <div>
                    <h4 className="font-semibold text-[#1A1A1A] text-base mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-[1.75] text-[#1A1A1A]/55">
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

          <div className="mt-16 md:mt-20">
            {[
              {
                step: 1,
                title: 'Entender la situaci\u00f3n',
                desc: 'Escuchamos tu momento, tus plazos y tus prioridades. El primer paso siempre es entender qu\u00e9 necesitas y por qu\u00e9 quieres vender.',
              },
              {
                step: 2,
                title: 'Analizar la vivienda y el mercado',
                desc: 'Estudiamos las caracter\u00edsticas de tu vivienda, su estado real, la demanda en la zona y los precios de referencia para establecer una valoraci\u00f3n con fundamento.',
              },
              {
                step: 3,
                title: 'Dise\u00f1ar la estrategia de venta',
                desc: 'Definimos el precio de salida, la presentaci\u00f3n del inmueble, los canales de difusi\u00f3n y el ritmo de visitas. Cada pieza del plan tiene un prop\u00f3sito claro.',
              },
              {
                step: 4,
                title: 'Acompa\u00f1ar todo el proceso',
                desc: 'Desde la primera visita hasta la firma en notar\u00eda. Gestionamos las visitas, la negociaci\u00f3n, la documentaci\u00f3n legal y todos los pasos intermedios.',
              },
            ].map((item, i) => (
              <RevealSection key={item.step} delay={i * 100} className="relative">
                <div className="flex gap-6 md:gap-10 pb-14 last:pb-0">
                  {/* Timeline rail */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-10 h-10 rounded-full border-2 border-[#868C4D] bg-[#FDFBF5] flex items-center justify-center">
                      <span className="font-[Playfair_Display] text-sm text-[#868C4D]">
                        {item.step}
                      </span>
                    </div>
                    {item.step < 4 && (
                      <div className="flex-1 w-px bg-gradient-to-b from-[#868C4D]/40 to-[#868C4D]/10 mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pt-1.5">
                    <h3 className="font-[Playfair_Display] text-xl md:text-2xl text-[#1A1A1A] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-base leading-[1.75] text-[#1A1A1A]/60 max-w-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════╗
          ║  CONTENT / SEO — GUIDE LINKS                        ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className="bg-[#EFE8CD]/40">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <RevealSection>
            <div className="flex items-end justify-between gap-6 mb-12 md:mb-14 flex-wrap">
              <div>
                <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-5">
                  Gu&iacute;a
                </span>
                <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A] max-w-2xl">
                  Entender el mercado antes de vender
                </h2>
              </div>
              <Link
                to="/guia"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2A79A9] hover:text-[#2A79A9]/80 transition-colors whitespace-nowrap pb-2"
              >
                Ir a la gu&iacute;a inmobiliaria
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
                  <h3 className="font-[Playfair_Display] text-xl md:text-[1.4rem] leading-[1.3] text-[#1A1A1A] group-hover:text-[#2A79A9] transition-colors mb-5">
                    {art.label}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A79A9] tracking-wide">
                    Leer art&iacute;culo
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>

                  {/* Underline accent that grows on hover */}
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
          ║  CTA FINAL                                          ║
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
              Antes de vender, conviene entender bien la situaci&oacute;n
            </h2>
          </RevealSection>

          <RevealSection delay={120}>
            <p className="mt-6 text-base md:text-lg leading-[1.75] text-white/65 max-w-xl mx-auto">
              Sin compromiso, sin prisa. Solo una conversaci&oacute;n para entender tu momento
              y dise&ntilde;ar el mejor plan para tu vivienda.
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
