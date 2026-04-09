import { Link } from 'react-router-dom'
import { RevealSection, SectionHeading } from '../components/ui'

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
      'Revision del contrato de alquiler',
      'Consultoria en dudas legales',
      'Consultoria en zonas tensionadas',
      'Soporte durante 7 dias',
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
      'Redaccion contrato personalizado PropiHouse',
      'Inventario fotografico',
      'Consultoria personalizada',
      'Soporte durante 15 dias',
    ],
    includes: 'Incluye Cumple + Cuadra',
    cta: 'Quiero hacerlo seguro',
    accent: false,
  },
  {
    name: 'Resuelve',
    price: null,
    priceLabel: 'Gestion completa',
    tagline: 'Para quien quiere delegar todo el proceso con tranquilidad',
    features: [
      'Busqueda de inquilino y gestion de visitas',
      'Estudio de solvencia documentado',
      'Acompanamiento durante todo el proceso',
      'Seguro de impagos incluido (1 ano, sujeto a aprobacion)',
      'Opcion sin seguro de impagos',
    ],
    includes: 'Incluye Cumple + Cuadra + Blinda',
    note: 'Honorarios vinculados al alquiler realizado',
    cta: 'Quiero olvidarme de todo',
    accent: true,
    postService: {
      title: 'Y despues del alquiler... tambien puedes olvidarte de todo',
      features: [
        'Seguimiento del arrendamiento',
        'Comunicacion con el inquilino',
        'Gestion de incidencias',
      ],
    },
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
    text: 'Problemas que se alargan sin solucion',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    text: 'Situaciones incomodas que nadie te habia explicado',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </svg>
    ),
    text: 'La sensacion de haber perdido el control',
  },
]

/* ─── Order Aspects ─── */
const ASPECTS = [
  {
    num: '01',
    title: 'Precio',
    desc: 'Saber cuanto pedir, con datos reales y normativa actualizada.',
  },
  {
    num: '02',
    title: 'Tipo de inquilino',
    desc: 'Definir que perfil encaja con tu situacion y tu propiedad.',
  },
  {
    num: '03',
    title: 'Nivel de implicacion',
    desc: 'Decidir cuanto quieres gestionar tu y cuanto quieres delegar.',
  },
]

/* ─── Valorador Factors ─── */
const VALORADOR_FACTORS = [
  { label: 'Normativa vigente', icon: '/' },
  { label: 'Estado del inmueble', icon: '/' },
  { label: 'Demanda real de la zona', icon: '/' },
  { label: 'Tipo de inquilino', icon: '/' },
]

/* ─── Guide Articles ─── */
const GUIDE_ARTICLES = [
  { n: '01', cat: 'Preparacion', title: 'Como preparar una vivienda antes de ponerla en el mercado', slug: '/guia/preparar-vivienda-vender' },
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
            <span className="inline-block text-olive text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Alquilar en L'Hospitalet
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-dark leading-tight mb-8 max-w-3xl">
              Alquilar una vivienda en L'Hospitalet de Llobregat no siempre es una decision sencilla
            </h1>
            <div className="max-w-2xl space-y-5">
              <p className="text-text-light text-lg leading-relaxed">
                Muchas personas tienen una propiedad que podrian alquilar, pero no lo hacen. O lo hacen con dudas.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Dudas sobre el precio, sobre quien entra en tu vivienda, sobre que pasa si algo sale mal. Preguntas normales que, sin una respuesta clara, acaban frenando una decision que podria tener mucho sentido.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 2: RENT VALORADOR ═══════════ */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 border border-cream-dark/20 relative overflow-hidden">
              {/* Decorative accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-olive via-blue to-olive" />

              <h2 className="font-serif text-2xl md:text-3xl font-medium text-dark leading-snug mb-6">
                Cuanto podrias pedir por tu alquiler en L'Hospitalet de Llobregat?
              </h2>
              <p className="text-text-light text-base leading-relaxed mb-8 max-w-xl">
                Analizamos tu caso teniendo en cuenta los factores que realmente afectan al precio de un alquiler:
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
                  to="/valorador"
                  className="inline-flex items-center justify-center gap-2 bg-blue hover:bg-blue-dark text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue/20 text-sm"
                >
                  Calcular el precio de mi alquiler
                  <ArrowIcon />
                </Link>
              </div>

              <p className="mt-5 text-text-muted text-sm italic">
                Obtendras una referencia orientativa inmediata. No es necesario dejar tus datos.
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
              title="El problema no es alquilar la vivienda, es todo lo que puede pasar despues"
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
            <div className="mt-12 space-y-0 relative">
              {/* Vertical connector line */}
              <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-cream-dark/30 rounded-full hidden md:block" />

              {ASPECTS.map(({ num, title, desc }, i) => (
                <div key={num} className="flex gap-6 items-start relative pb-10 last:pb-0">
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg font-bold shadow-soft ${
                      i === 0 ? 'bg-olive text-white' : 'bg-white text-dark border-2 border-cream-dark/40'
                    }`}>
                      {num}
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-sans font-bold text-dark text-lg mb-1">{title}</h3>
                    <p className="text-text-light text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                to="/entender-mi-situacion"
                className="inline-flex items-center gap-2 bg-olive-dark hover:bg-olive text-white font-bold px-7 py-3.5 rounded-lg transition-all duration-300 text-sm"
              >
                Entender mi situacion
                <ArrowIcon />
              </Link>
            </div>
          </RevealSection>
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
                <span className="inline-block text-olive text-xs font-bold tracking-[0.2em] uppercase mb-5">
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
                    Lo importante no es elegir el servicio mas completo, sino el que encaje con tu situacion. Por eso trabajamos con un modelo flexible:{' '}
                    <em className="not-italic font-semibold text-dark/85">tu decides cuanto quieres implicarte, y nosotros nos adaptamos.</em>
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
              <span className="inline-block text-olive text-xs font-bold tracking-[0.2em] uppercase mb-3">
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
                  className={`relative rounded-2xl flex flex-col transition-all duration-500 hover:-translate-y-1 ${
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

                    {/* Post-service sub-section for Resuelve */}
                    {'postService' in pack && pack.postService && (
                      <div className="mt-6 pt-6 border-t border-white/15">
                        <p className="text-sm font-bold text-cream/80 mb-3">
                          {pack.postService.title}
                        </p>
                        <ul className="space-y-2">
                          {pack.postService.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5">
                              <span className="text-cream/50">
                                <CheckIcon />
                              </span>
                              <span className="text-white/60 text-xs leading-snug">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
                Firmar el contrato no es el final, es el principio. A partir de ahi empieza la convivencia real con un inquilino, la gestion del dia a dia y las decisiones que no siempre son faciles.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Hay propietarios que prefieren gestionar ellos mismos. Y hay otros que quieren tener a alguien de confianza al otro lado del telefono. Para eso tambien estamos.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { title: 'Seguimiento', desc: 'Control periodico del estado del arrendamiento y cumplimiento del contrato.' },
                { title: 'Comunicacion', desc: 'Hacemos de intermediarios con el inquilino para que no tengas que gestionar directamente.' },
                { title: 'Incidencias', desc: 'Gestionamos reparaciones, reclamaciones y cualquier situacion que surja.' },
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
                  title="Alquilar con tranquilidad tambien es una decision"
                  center={false}
                />
                <div className="mt-6 space-y-5">
                  <p className="text-text-light text-lg leading-relaxed">
                    Elegir bien al inquilino no es solo una cuestion de intuicion. Hay herramientas concretas que reducen el riesgo: analisis de solvencia, referencias verificables, seguros de impago.
                  </p>
                  <p className="text-text-light text-lg leading-relaxed">
                    No eliminan el riesgo al cien por cien, pero lo reducen significativamente. Y sobre todo, te permiten tomar una decision informada en lugar de una decision a ciegas.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-cream/60 rounded-2xl p-7 space-y-5 border border-cream-dark/20">
                  {[
                    { label: 'Seleccion de inquilino', desc: 'Perfil verificado y compatible con tu propiedad.' },
                    { label: 'Analisis de solvencia', desc: 'Documentacion financiera revisada antes de firmar.' },
                    { label: 'Proteccion legal', desc: 'Contratos blindados y opciones de seguro de impago.' },
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
            <div className="flex items-end justify-between gap-6 mb-12 md:mb-14 flex-wrap">
              <div className="max-w-2xl">
                <span className="inline-block text-olive text-xs font-bold tracking-[0.2em] uppercase mb-5">
                  Guia
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-dark leading-tight tracking-tight">
                  Entender el alquiler tambien es parte de la decision
                </h2>
                <p className="text-text-light text-base md:text-lg leading-relaxed mt-5 max-w-xl">
                  Hemos escrito una serie de articulos para propietarios que quieren entender bien el proceso antes de dar el paso.
                </p>
              </div>
              <Link
                to="/guia"
                className="group inline-flex items-center gap-2 text-sm font-bold text-blue hover:text-blue-dark transition-colors whitespace-nowrap pb-2"
              >
                Ver guia inmobiliaria
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
                    Leer articulo
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
      <section className="py-20 md:py-28 bg-blue relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <RevealSection>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-white leading-tight mb-6">
              Antes de tomar una decision, conviene entender bien tu situacion
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Sin compromiso. Analizamos tu caso y vemos que tiene sentido para ti.
            </p>
            <Link
              to="/entender-mi-situacion"
              className="inline-flex items-center gap-2 bg-cream hover:bg-cream-dark text-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg text-sm"
            >
              Entender mi situacion
              <ArrowIcon />
            </Link>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
