import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MethodTimeline, RevealSection, SectionHeading } from '../components/ui'

/* ─── Pricing Tiers ─── */
const PACKS = [
  {
    name: 'Cumple',
    price: '49',
    tagline: 'Para quien solo necesita hacer las cosas correctamente',
    features: [
      'Ingreso de fianza en INCASOL',
      'Justificante oficial en 48h',
    ],
    includes: null,
    cta: 'Solo necesito esto',
    accent: false,
  },
  {
    name: 'Cuadra',
    price: '79',
    tagline: 'Para quien quiere hacerlo con criterio y evitar errores',
    features: [
      'Revisión del contrato de alquiler',
      'Consultoría en dudas legales',
      'Consultoría en zonas tensionadas',
      'Soporte durante 7 días',
    ],
    includes: 'Incluye todo lo de Cumple',
    cta: 'Quiero hacerlo bien',
    accent: false,
  },
  {
    name: 'Blinda',
    price: '249',
    tagline: 'Para quien quiere hacerlo bien y sin improvisar',
    features: [
      'Redacción contrato personalizado Propi House',
      'Inventario fotografico',
      'Consultoría personalizada',
      'Soporte durante 15 días',
    ],
    includes: 'Incluye Cumple + Cuadra',
    cta: 'Quiero hacerlo seguro',
    accent: false,
  },
  {
    name: 'Resuelve',
    price: null,
    priceLabel: 'Gestión completa',
    tagline: 'Para quien quiere delegar todo el proceso con tranquilidad',
    features: [
      'Búsqueda de inquilino y gestión de visitas',
      'Estudio de solvencia documentado',
      'Acompañamiento durante todo el proceso',
      'Seguro de impagos incluido (1 año, sujeto a aprobación)',
      'Opción sin seguro de impagos',
    ],
    includes: 'Incluye Cumple + Cuadra + Blinda',
    note: 'Honorarios vinculados al alquiler realizado',
    cta: 'Quiero olvidarme de todo',
    accent: true,
  },
] as const

/* ─── Fear Items ─── */
const FEARS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    text: 'Inquilinos que dejan de pagar',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    text: 'Problemas que se alargan sin solución',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    text: 'Situaciones incomodas que nadie te había explicado',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </svg>
    ),
    text: 'La sensación de haber perdido el control',
  },
]

/* ─── Order Aspects ─── */
const ASPECTS = [
  {
    num: '1',
    title: 'Precio',
    desc: 'Saber cuánto pedir, con datos reales y normativa actualizada.',
  },
  {
    num: '2',
    title: 'Tipo de inquilino',
    desc: 'Definir qué perfil encaja con tu situación y tu propiedad.',
  },
  {
    num: '3',
    title: 'Nivel de implicación',
    desc: 'Decidir cuánto quieres gestionar tu y cuánto quieres delegar.',
  },
]

/* ─── Valorador Factors ─── */
const VALORADOR_FACTORS = [
  { label: 'Normativa vigente', icon: '/' },
  { label: 'Estado del inmueble', icon: '/' },
  { label: 'Perfil de inquilino', icon: '/' },
  { label: 'Tu nivel de implicación', icon: '/' },
]

/* ─── Guide Articles ─── */
const GUIDE_ARTICLES = [
  { n: '01', cat: 'Preparación', title: 'Cómo preparar una vivienda antes de ponerla en el mercado', slug: '/guia/preparar-vivienda-vender' },
  { n: '02', cat: 'Situaciones', title: 'Herencias, divorcios y cambios de vida', slug: '/guia/herencia-divorcio-cambio-vida' },
  { n: '03', cat: 'Estrategia', title: 'Comprar antes o vender primero?', slug: '/guia/comprar-o-vender-primero' },
]

/* ─── Check icon for feature lists ─── */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

/* ─── Arrow icon for buttons ─── */
function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export default function AlquilarPage() {
  useEffect(() => {
    document.title = "Alquilar vivienda en L'Hospitalet de Llobregat — Propi House"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Gestión de alquileres en L\'Hospitalet. Contratos, inquilinos solventes y acompañamiento completo.')
    return () => { document.title = "Propi House — Inmobiliaria en L'Hospitalet de Llobregat" }
  }, [])

  return (
    <>
      {/* ═══════════ BLOCK 1: INTRO ═══════════ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Subtle olive gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-warm-white to-cream-light" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-olive) 0.5px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <RevealSection>
            <span className="inline-block text-[#B8A88A] text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Alquilar vivienda
            </span>
            <h1 className="font-[Playfair_Display] text-[clamp(2rem,5.5vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-dark mb-8 max-w-3xl">
              Alquilar una vivienda en L'Hospitalet de Llobregat no siempre es una decisión sencilla
            </h1>
            <div className="max-w-2xl space-y-5">
              <p className="text-text-light text-lg leading-relaxed">
                Muchas personas tienen una propiedad que podrían alquilar, pero no lo hacen, o lo hacen con dudas.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Dudas sobre el precio, sobre quién entra en tu vivienda, sobre qué pasa si algo sale mal. Preguntas normales que, sin una respuesta clara, acaban frenando una decisión que podría tener mucho sentido.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 2: RENT VALORADOR ═══════════ */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <div className="bg-white rounded-xl shadow-card p-8 md:p-12 border border-cream-dark/20 relative overflow-hidden">
              {/* Decorative accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-olive via-blue to-olive" />

              <h2 className="font-serif text-2xl md:text-3xl font-medium text-dark leading-snug mb-6">
                Quieres saber qué opciones tienes con tu alquiler en L'Hospitalet de Llobregat?
              </h2>
              <p className="text-text-light text-base leading-relaxed mb-8 max-w-xl">
                Analizamos tu caso teniendo en cuenta los factores que realmente importan en un alquiler:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {VALORADOR_FACTORS.map(({ label }) => (
                  <div key={label} className="bg-cream/60 rounded-xl px-4 py-4 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-olive/10 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-olive-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-text text-sm font-medium leading-snug block">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Link
                  to="/entender-mi-situacion"
                  className="inline-flex items-center justify-center gap-2 bg-blue hover:bg-blue-dark text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue/20 text-sm"
                >
                  Consultar sobre mi alquiler
                  <ArrowIcon />
                </Link>
              </div>

              <p className="mt-5 text-text-muted text-sm italic">
                Sin compromiso. Te ayudamos a entender tu situación antes de tomar decisiones.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 3: PROBLEM (FEAR) ═══════════ */}
      <section className="py-20 md:py-28 bg-cream/40">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              title="El problema no es alquilar la vivienda, es todo lo que puede pasar después"
              center={false}
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FEARS.map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-soft border border-cream-dark/15 transition-all duration-300 hover:shadow-card hover:-translate-y-0.5"
                >
                  <div className="w-11 h-11 rounded-lg bg-red-50 flex items-center justify-center text-red-400 flex-shrink-0">
                    {icon}
                  </div>
                  <p className="text-text text-[15px] leading-relaxed font-medium pt-1.5">
                    {text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-text-light text-base leading-relaxed max-w-2xl">
              Son miedos reales. Y la respuesta no es dejar de alquilar, sino hacerlo de una forma que minimice esos riesgos desde el principio.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 4: ORDER ═══════════ */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              title="Antes de alquilar, hay algo que conviene tener claro"
              center={false}
            />
          </RevealSection>

          <MethodTimeline steps={ASPECTS} color="olive" />

          <div className="mt-12">
            <Link
              to="/entender-mi-situacion"
              className="inline-flex items-center gap-2 bg-olive-dark hover:bg-olive text-white font-bold px-7 py-3.5 rounded-lg transition-all duration-300 text-sm"
            >
              Entender mi situación
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ BLOCK 5: MODEL ═══════════ */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-cream/40">
        {/* Soft accent glow */}
        <div
          aria-hidden
          className="absolute -top-24 right-0 w-[480px] h-[480px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--color-olive) 0%, transparent 65%)' }}
        />

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
            {/* LEFT — heading + lead */}
            <div className="md:col-span-5">
              <RevealSection>
                <span className="inline-block text-[#B8A88A] text-xs font-bold tracking-[0.2em] uppercase mb-5">
                  Nuestro modelo
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.5rem] font-medium text-dark leading-tight tracking-tight">
                  No todos los propietarios necesitan lo mismo
                </h2>
              </RevealSection>
            </div>

            {/* RIGHT — body + pull quote */}
            <div className="md:col-span-7">
              <RevealSection delay={120}>
                <p className="font-serif text-xl md:text-[1.5rem] leading-[1.45] text-dark/85 mb-8">
                  Hay quien solo necesita un contrato bien hecho. Hay quien quiere asegurarse de que el inquilino es solvente. Y hay quien prefiere no ocuparse de nada.
                </p>
              </RevealSection>

              <RevealSection delay={200}>
                <div className="relative pl-6 border-l-2 border-blue/40">
                  <p className="text-base md:text-lg leading-[1.8] text-text-light">
                    Lo importante no es elegir el servicio más completo, sino el que encaje con tu situación. Por eso trabajamos con un modelo flexible:{' '}
                    <em className="not-italic font-semibold text-dark/85">tu decides cuánto quieres implicarte, y nosotros nos adaptamos.</em>
                  </p>
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ BLOCK 6: PRICING PACKS ═══════════ */}
      <section className="py-20 md:py-32 bg-warm-white relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-dark) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <RevealSection>
            <div className="text-center mb-16">
              <span className="inline-block text-[#B8A88A] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                Servicios de alquiler
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-dark leading-tight">
                Tu decides hasta donde quieres implicarte en tu alquiler
              </h2>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PACKS.map((pack) => (
                <div
                  key={pack.name}
                  className={`relative rounded-xl flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                    pack.accent
                      ? 'bg-gradient-to-b from-blue to-blue-dark text-white shadow-elevated ring-1 ring-blue/30 lg:-mt-4 lg:mb-[-16px]'
                      : 'bg-white shadow-card border border-cream-dark/20'
                  }`}
                >
                  {/* Recommended badge for Resuelve */}
                  {pack.accent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cream text-dark text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-soft whitespace-nowrap">
                      Recomendado
                    </div>
                  )}

                  <div className="p-7 flex flex-col flex-1">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className={`font-serif text-2xl font-semibold mb-2 ${
                        pack.accent ? 'text-white' : 'text-dark'
                      }`}>
                        {pack.name}
                      </h3>
                      <div className="flex items-baseline gap-1 mb-3">
                        {pack.price ? (
                          <>
                            <span className={`text-3xl font-bold ${pack.accent ? 'text-white' : 'text-dark'}`}>
                              {pack.price}&euro;
                            </span>
                            <span className={`text-sm ${pack.accent ? 'text-white/60' : 'text-text-muted'}`}>
                              IVA incl.
                            </span>
                          </>
                        ) : (
                          <span className={`text-lg font-bold ${pack.accent ? 'text-cream' : 'text-blue'}`}>
                            {(pack as typeof PACKS[3]).priceLabel}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        pack.accent ? 'text-white/70' : 'text-text-light'
                      }`}>
                        {pack.tagline}
                      </p>
                    </div>

                    {/* Includes note */}
                    {pack.includes && (
                      <div className={`text-xs font-bold uppercase tracking-wider mb-4 pb-4 border-b ${
                        pack.accent
                          ? 'text-cream/60 border-white/15'
                          : 'text-olive border-cream-dark/30'
                      }`}>
                        {pack.includes}
                      </div>
                    )}

                    {/* Features */}
                    <ul className="space-y-3 flex-1 mb-6">
                      {pack.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className={`${pack.accent ? 'text-cream' : 'text-olive'}`}>
                            <CheckIcon />
                          </span>
                          <span className={`text-sm leading-snug ${
                            pack.accent ? 'text-white/85' : 'text-text-light'
                          }`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Note for Resuelve */}
                    {'note' in pack && pack.note && (
                      <p className={`text-xs italic mb-5 ${
                        pack.accent ? 'text-white/50' : 'text-text-muted'
                      }`}>
                        {pack.note}
                      </p>
                    )}

                    {/* CTA Button */}
                    <Link
                      to="/entender-mi-situacion"
                      className={`w-full text-center py-3 px-5 rounded-lg font-bold text-sm transition-all duration-300 ${
                        pack.accent
                          ? 'bg-cream hover:bg-cream-dark text-dark hover:shadow-lg'
                          : 'bg-blue/10 hover:bg-blue hover:text-white text-blue border border-blue/20 hover:border-blue'
                      }`}
                    >
                      {pack.cta}
                    </Link>

                  </div>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* ── Standalone post-rental management ── */}
          <RevealSection>
            <div className="mt-16 md:mt-20 relative">
              {/* Decorative offset depth frame */}
              <div
                aria-hidden
                className="absolute -top-3 -right-3 w-full h-full rounded-xl bg-olive/[0.2]"
              />

              <div className="relative rounded-xl overflow-hidden bg-white border border-cream-dark/20 shadow-[0_20px_60px_-20px_rgba(26,26,26,0.12)]">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-olive/60 via-blue/30 to-transparent" />

                <div className="relative grid md:grid-cols-12 gap-8 md:gap-12 p-8 md:p-12 lg:p-14 items-center">
                  {/* Left — text content */}
                  <div className="md:col-span-7">
                    <span className="inline-block text-olive text-xs font-bold tracking-[0.2em] uppercase mb-5">
                      Gestión post-alquiler
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-[2rem] font-medium text-dark leading-snug mb-5">
                      Y después del alquiler... también puedes olvidarte de todo
                    </h3>
                    <p className="text-text-light text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                      También puedes contar con nosotros para gestionar tu alquiler en el día a día.{' '}
                      <span className="text-text-muted">Para que no tengas que ocuparte de nada.</span>
                    </p>

                    <Link
                      to="/entender-mi-situacion"
                      className="group inline-flex items-center gap-2.5 bg-olive-dark hover:bg-olive text-white font-bold px-7 py-3.5 rounded-lg transition-all duration-300 hover:shadow-lg text-sm"
                    >
                      Quiero saber más
                      <ArrowIcon />
                    </Link>
                  </div>

                  {/* Right — 2 service cards stacked (Comunicación lifted out) */}
                  <div className="md:col-span-5 space-y-3">
                    {[
                      {
                        title: 'Seguimiento',
                        desc: 'Control del arrendamiento y cumplimiento del contrato.',
                        icon: (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                          </svg>
                        ),
                      },
                      {
                        title: 'Incidencias',
                        desc: 'Reparaciones, reclamaciones y cualquier situación que surja.',
                        icon: (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                          </svg>
                        ),
                      },
                    ].map((s) => (
                      <div
                        key={s.title}
                        className="flex items-start gap-4 bg-cream/40 border border-cream-dark/15 rounded-xl p-5 hover:bg-cream/60 transition-colors duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg bg-olive/15 flex items-center justify-center flex-shrink-0 text-olive-dark">
                          {s.icon}
                        </div>
                        <div>
                          <span className="font-bold text-dark text-sm block mb-1">{s.title}</span>
                          <span className="text-text-light text-xs leading-relaxed">{s.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Standalone Comunicación highlight */}
                <div className="border-t border-cream-dark/20 px-8 md:px-12 lg:px-14 py-8 md:py-10 bg-cream/30">
                  <div className="flex items-start gap-5 md:gap-6">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-olive/15 flex items-center justify-center flex-shrink-0 text-olive-dark">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-xl md:text-2xl font-medium text-dark mb-2 leading-snug">
                        Comunicación
                      </h4>
                      <p className="text-text-light text-base md:text-lg leading-relaxed max-w-2xl">
                        Intermediamos con el inquilino para que no tengas que gestionar directamente.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom tagline bar */}
                <div className="border-t border-cream-dark/20 px-8 md:px-12 lg:px-14 py-6 md:py-7">
                  <p className="font-serif italic text-dark/70 text-base md:text-lg leading-snug">
                    Porque no se trata de elegir un servicio. Se trata de decidir cómo quieres vivir el proceso.
                  </p>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 7: ONGOING MANAGEMENT ═══════════ */}
      <section className="py-20 md:py-28 bg-cream/40">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              title="Cuando el alquiler empieza de verdad"
              center={false}
            />
            <div className="mt-6 space-y-5 max-w-2xl">
              <p className="text-text-light text-lg leading-relaxed">
                Firmar el contrato no es el final, es el principio. A partir de ahí empieza la convivencia real con un inquilino, la gestión del día a día y las decisiones que no siempre son fáciles.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Hay propietarios que prefieren gestionar ellos mismos. Y hay otros que quieren tener a alguien de confianza al otro lado del teléfono. Para eso también estamos.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { title: 'Seguimiento', desc: 'Control periódico del estado del arrendamiento y cumplimiento del contrato.' },
                { title: 'Comunicación', desc: 'Hacemos de intermediarios con el inquilino para que no tengas que gestionar directamente.' },
                { title: 'Incidencias', desc: 'Gestionamos reparaciones, reclamaciones y cualquier situación que surja.' },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-white rounded-xl p-6 shadow-soft border border-cream-dark/15">
                  <h3 className="font-sans font-bold text-dark text-base mb-2">{title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 8: SECURITY ═══════════ */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3">
                <SectionHeading
                  title="Alquilar con tranquilidad también es una decisión"
                  center={false}
                />
                <div className="mt-6 space-y-5">
                  <p className="text-text-light text-lg leading-relaxed">
                    Elegir bien al inquilino no es solo una cuestión de intuición. Hay herramientas concretas que reducen el riesgo: análisis de solvencia, referencias verificables, seguros de impago.
                  </p>
                  <p className="text-text-light text-lg leading-relaxed">
                    No eliminan el riesgo al cien por cien, pero lo reducen significativamente. Y sobre todo, te permiten tomar una decisión informada en lugar de una decisión a ciegas.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-cream/60 rounded-xl p-7 space-y-5 border border-cream-dark/20">
                  {[
                    { label: 'Selección de inquilino', desc: 'Perfil verificado y compatible con tu propiedad.' },
                    { label: 'Análisis de solvencia', desc: 'Documentación financiera revisada antes de firmar.' },
                    { label: 'Protección legal', desc: 'Contratos blindados y, además, seguro de impago.' },
                  ].map(({ label, desc }) => (
                    <div key={label} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-olive/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-olive-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-bold text-dark text-sm block">{label}</span>
                        <span className="text-text-light text-sm">{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 9: GUIDE ═══════════ */}
      <section className="py-24 md:py-32 bg-cream/40">
        <div className="max-w-5xl mx-auto px-6">
          <RevealSection>
            <div className="mb-12 md:mb-14 max-w-2xl">
              <span className="inline-block text-[#B8A88A] text-xs font-bold tracking-[0.2em] uppercase mb-5">
                Guía
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-dark leading-tight tracking-tight">
                Entender el alquiler también es parte de la decisión
              </h2>
              <p className="text-text-light text-base md:text-lg leading-relaxed mt-5 max-w-xl">
                Te compartimos una serie de artículos para propietarios que quieren entender bien el proceso antes de dar el paso.
              </p>
              <Link
                to="/guia"
                className="group inline-flex items-center gap-2 text-sm font-bold text-blue hover:text-blue-dark transition-colors mt-6"
              >
                Ver guía inmobiliaria
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="grid gap-px bg-dark/[0.07] rounded-xl overflow-hidden md:grid-cols-3">
              {GUIDE_ARTICLES.map((art) => (
                <Link
                  key={art.slug}
                  to={art.slug}
                  className="group relative block bg-warm-white hover:bg-white p-7 md:p-8 transition-colors min-h-[200px]"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <span className="font-serif text-3xl text-dark/15 leading-none">
                      {art.n}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-olive mt-2">
                      {art.cat}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg md:text-[1.25rem] leading-snug text-dark group-hover:text-blue transition-colors mb-5">
                    {art.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue tracking-wide">
                    Leer artículo
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-7 md:left-8 w-0 h-[2px] bg-blue group-hover:w-12 transition-all duration-500"
                  />
                </Link>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 10: CTA FINAL ═══════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E2E26] via-[#3A3830] to-[#2E2E26]" />

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
              <span className="text-cream/40 text-[10px] font-bold tracking-[0.25em] uppercase">Tu alquiler</span>
              <span className="block w-12 h-px bg-white/20" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
              Cada propietario es diferente
            </h2>
            <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Queremos saber qué tiene sentido en tu caso.
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
              Analizamos tu caso y vemos qué tiene sentido para ti.
            </p>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
