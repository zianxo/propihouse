import { Link } from 'react-router-dom'
import { RevealSection, SectionHeading } from '../components/ui'

/* ─── Method Steps ─── */
const METHOD_STEPS = [
  {
    num: '01',
    title: 'Entender tu situacion',
    desc: 'Analizamos tu contexto financiero, tus ingresos, tus compromisos y tu capacidad de ahorro. No para juzgar, sino para tener un punto de partida real.',
  },
  {
    num: '02',
    title: 'Definir tu capacidad real',
    desc: 'Calculamos cuanto puedes destinar a una cuota sin comprometer tu estabilidad. No es lo mismo lo que un banco te prestaria que lo que realmente puedes pagar con tranquilidad.',
  },
  {
    num: '03',
    title: 'Analizar las opciones disponibles',
    desc: 'Revisamos tipos de hipoteca, condiciones, plazos y entidades. No buscamos la mejor oferta del mercado, buscamos la que mejor encaja contigo.',
  },
  {
    num: '04',
    title: 'Acompanar la decision',
    desc: 'Una vez tienes claridad, te acompanamos en el proceso. Pero la decision es tuya, siempre.',
  },
]

/* ─── Hidden Cost Items ─── */
const HIDDEN_COSTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Gastos de compra',
    desc: 'Impuestos, notaria, registro y gestoria. Un porcentaje significativo que muchas veces no se tiene en cuenta al principio.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Ahorro previo',
    desc: 'Lo habitual es necesitar entre un 20% y un 30% del valor del inmueble como entrada y gastos asociados.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    title: 'Porcentaje de financiacion',
    desc: 'Los bancos financian habitualmente hasta el 80% de la tasacion. Hay excepciones, pero conviene planificar con el escenario mas realista.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Situacion personal',
    desc: 'Tu estabilidad laboral, tus deudas existentes y tu perfil crediticio influyen directamente en las condiciones que puedes obtener.',
  },
]

/* ─── Order Aspects ─── */
const ORDER_ASPECTS = [
  {
    num: '01',
    title: 'Cuanto puedes pagar realmente',
    desc: 'No cuanto te prestaria un banco, sino cuanto puedes asumir sin que tu dia a dia se resienta.',
  },
  {
    num: '02',
    title: 'Tu nivel de endeudamiento',
    desc: 'Hay limites legales y hay limites personales. Ambos importan.',
  },
  {
    num: '03',
    title: 'Que tipo de decision es esta para ti',
    desc: 'Comprar una primera vivienda no es lo mismo que invertir. Cada escenario tiene sus propias condiciones.',
  },
]

/* ─── Guide Articles ─── */
const GUIDE_ARTICLES = [
  { n: '01', cat: 'Presupuesto', title: 'Cuanto dinero necesitas para comprar una vivienda', slug: '/guia/cuanto-dinero-comprar-vivienda' },
  { n: '02', cat: 'Errores', title: 'Errores habituales al comprar una vivienda', slug: '/guia/errores-comprar-vivienda' },
  { n: '03', cat: 'Estrategia', title: 'Comprar antes o vender primero?', slug: '/guia/comprar-o-vender-primero' },
]

/* ─── Arrow icon ─── */
function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export default function FinanciarPage() {
  return (
    <>
      {/* ═══════════ BLOCK 1: INTRO ═══════════ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-warm-white to-cream-light" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-olive) 0.5px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <RevealSection>
            <span className="inline-block text-olive text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Financiacion
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-dark leading-tight mb-8 max-w-3xl">
              Entender la financiacion es el primer paso antes de comprar una vivienda
            </h1>
            <div className="max-w-2xl space-y-5">
              <p className="text-text-light text-lg leading-relaxed">
                Cuando alguien piensa en comprar, lo primero que suele buscar son pisos. Pero antes de mirar propiedades, hay una pregunta que conviene responder: cuanto puedo pagar realmente?
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                No es solo una cuestion de hipoteca. Es entender tu situacion financiera, los plazos que puedes asumir, los riesgos que estas dispuesto a correr y las condiciones que puedes negociar.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 2: PROBLEM ═══════════ */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              title="La informacion sobre financiacion suele ser confusa"
              center={false}
            />
            <div className="mt-6 space-y-5 max-w-2xl">
              <p className="text-text-light text-lg leading-relaxed">
                Tipos de interes, bonificaciones, seguros vinculados, comisiones ocultas. Es facil perderse. Y cuando no entiendes bien lo que estas firmando, es dificil tomar buenas decisiones.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Por eso antes de hablar de hipotecas, preferimos hablar de numeros reales: cuanto necesitas ahorrar, cuanto puedes destinar a la cuota, y que margen te queda para imprevistos.
              </p>
            </div>

            <div className="mt-8">
              <Link
                to="/guia/cuanto-dinero-comprar-vivienda"
                className="group inline-flex items-center gap-3 bg-cream/70 hover:bg-cream rounded-xl px-6 py-4 transition-all duration-300 border border-cream-dark/20"
              >
                <div className="w-10 h-10 rounded-lg bg-olive/15 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-olive-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <div>
                  <span className="font-bold text-dark text-sm block group-hover:text-blue transition-colors">
                    Cuanto dinero necesitas realmente para comprar una vivienda
                  </span>
                  <span className="text-text-muted text-xs">Leer articulo en la guia</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted group-hover:text-blue group-hover:translate-x-1 transition-all flex-shrink-0 ml-auto">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 3: ORDER ═══════════ */}
      <section className="py-20 md:py-28 bg-cream/40">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              title="Antes de mirar hipotecas, hay algo que conviene tener claro"
              center={false}
            />
            <div className="mt-12 space-y-0 relative">
              {/* Vertical connector line */}
              <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-cream-dark/30 rounded-full hidden md:block" />

              {ORDER_ASPECTS.map(({ num, title, desc }, i) => (
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
                to="/guia"
                className="inline-flex items-center gap-2 text-blue hover:text-blue-dark font-bold text-sm transition-colors group"
              >
                Ver guia inmobiliaria
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 4: REALITY (Hidden Costs) ═══════════ */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              title="Hay aspectos de la financiacion que no siempre se explican"
              center={false}
            />
            <p className="text-text-light text-lg leading-relaxed mt-4 mb-10 max-w-2xl">
              No se trata de asustarte, sino de que tengas toda la informacion antes de comprometerte con una decision a 20 o 30 anos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {HIDDEN_COSTS.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl p-6 shadow-soft border border-cream-dark/15 transition-all duration-300 hover:shadow-card hover:-translate-y-0.5"
                >
                  <div className="w-11 h-11 rounded-lg bg-cream flex items-center justify-center text-olive-dark mb-4">
                    {icon}
                  </div>
                  <h3 className="font-sans font-bold text-dark text-base mb-2">{title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
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

      {/* ═══════════ BLOCK 5: PROPIHOUSE APPROACH ═══════════ */}
      <section className="py-20 md:py-28 bg-cream/40">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              title="Entender la financiacion cambia completamente la forma de comprar"
              center={false}
            />
            <div className="mt-6 space-y-5 max-w-2xl">
              <p className="text-text-light text-lg leading-relaxed">
                Cuando sabes exactamente cuanto puedes pagar, dejas de buscar a ciegas. Empiezas a filtrar con criterio, a negociar con seguridad y a tomar decisiones con calma.
              </p>
            </div>

            {/* Bold statement */}
            <div className="mt-10 bg-white rounded-2xl p-8 md:p-10 shadow-card border-l-4 border-blue relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.04]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="font-serif text-xl md:text-2xl text-dark leading-snug font-medium relative z-10">
                Nuestro objetivo no es ofrecerte una hipoteca. Es ayudarte a entender que tipo de decision tiene sentido en tu caso.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-[2px] bg-blue rounded-full" />
                <span className="text-text-muted text-sm font-medium">PropiHouse</span>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 6: METHOD (Timeline) ═══════════ */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              eyebrow="Nuestro metodo"
              title="Como trabajamos la financiacion"
              center={false}
            />
          </RevealSection>

          <RevealSection>
            <div className="mt-14 relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue via-blue/50 to-cream-dark/20 rounded-full" />

              <div className="space-y-12">
                {METHOD_STEPS.map(({ num, title, desc }, i) => (
                  <div key={num} className="flex gap-6 items-start relative">
                    {/* Timeline node */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg font-bold transition-all duration-500 ${
                        i === 0
                          ? 'bg-blue text-white shadow-lg shadow-blue/20'
                          : 'bg-white text-dark border-2 border-blue/30 shadow-soft'
                      }`}>
                        {num}
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="bg-white rounded-xl p-6 shadow-soft border border-cream-dark/15 flex-1 transition-all duration-300 hover:shadow-card hover:-translate-y-0.5">
                      <h3 className="font-sans font-bold text-dark text-lg mb-2">{title}</h3>
                      <p className="text-text-light text-[15px] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 7: GUIDE ═══════════ */}
      <section className="py-24 md:py-32 bg-cream/40">
        <div className="max-w-5xl mx-auto px-6">
          <RevealSection>
            <div className="flex items-end justify-between gap-6 mb-12 md:mb-14 flex-wrap">
              <div className="max-w-2xl">
                <span className="inline-block text-olive text-xs font-bold tracking-[0.2em] uppercase mb-5">
                  Guia
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-dark leading-tight tracking-tight">
                  Entender la financiacion tambien es parte de la decision
                </h2>
                <p className="text-text-light text-base md:text-lg leading-relaxed mt-5 max-w-xl">
                  Hemos escrito una serie de articulos para compradores que quieren tener claridad antes de dar el paso.
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

      {/* ═══════════ BLOCK 8: CTA FINAL ═══════════ */}
      <section className="py-20 md:py-28 bg-blue relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <RevealSection>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-white leading-tight mb-6">
              Antes de avanzar, conviene entender bien tu situacion
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
