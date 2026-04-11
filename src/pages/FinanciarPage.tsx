import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { RevealSection, SectionHeading } from '../components/ui'

/* ─── Scroll-Linked Timeline ─── */
function AnimatedTimeline({
  steps,
  color = 'blue',
}: {
  steps: { num: string; title: string; desc: string }[]
  color?: 'blue' | 'olive'
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
      const raw = (triggerY - rect.top) / (rect.bottom - rect.top)
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

  const isBlue = color === 'blue'
  const fillGradient = isBlue
    ? 'from-[#2A79A9] via-[#2A79A9]/85 to-[#2A79A9]/40'
    : 'from-[#868C4D] via-[#868C4D]/85 to-[#868C4D]/40'
  const glowColor = isBlue ? 'rgba(42,121,169,0.32)' : 'rgba(134,140,77,0.3)'
  const activeBg = isBlue ? 'bg-blue' : 'bg-olive'
  const activeBorder = isBlue ? 'border-blue' : 'border-olive'
  const activeGlow = isBlue
    ? '0 0 0 6px rgba(42,121,169,0.12), 0 4px 14px rgba(42,121,169,0.22)'
    : '0 0 0 6px rgba(134,140,77,0.12), 0 4px 14px rgba(134,140,77,0.22)'
  const inactiveBorder = isBlue ? 'border-blue/30' : 'border-cream-dark/40'
  const textActive = isBlue ? 'text-blue' : 'text-dark'

  return (
    <div ref={containerRef} className="relative mt-12 md:mt-14">
      {/* Gray base line */}
      <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-cream-dark/30 rounded-full" />
      {/* Animated fill line */}
      <div
        className={`absolute left-[23px] top-0 w-[2px] rounded-full bg-gradient-to-b ${fillGradient}`}
        style={{ height: `${progress * 100}%`, transition: 'height 120ms linear', boxShadow: `0 0 12px ${glowColor}` }}
      />
      <div className="space-y-10 md:space-y-12">
        {steps.map((step, i) => {
          const active = reached[i]
          return (
            <div key={step.num} className="flex gap-6 items-start relative">
              <div className="relative z-10 flex-shrink-0">
                <div
                  ref={(el) => { dotRefs.current[i] = el }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg font-bold transition-all duration-500 ${
                    active
                      ? `${activeBg} ${activeBorder} border-2 text-white scale-110`
                      : `bg-white border-2 ${inactiveBorder} shadow-soft ${textActive}`
                  }`}
                  style={active ? { boxShadow: activeGlow } : undefined}
                >
                  {step.num}
                </div>
              </div>
              <div className={`pt-2 transition-all duration-500 ${active ? 'opacity-100 translate-x-0' : 'opacity-60 -translate-x-1'}`}>
                <h3 className="font-sans font-bold text-dark text-lg mb-1">{step.title}</h3>
                <p className="text-text-light text-base leading-relaxed">{step.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Method Steps ─── */
const METHOD_STEPS = [
  {
    num: '01',
    title: 'Entender tu situación',
    desc: 'Analizamos tu contexto financiero, tus ingresos, tus compromisos y tu capacidad de ahorro. No para juzgar, sino para tener un punto de partida real.',
  },
  {
    num: '02',
    title: 'Definir tu capacidad real',
    desc: 'Calculamos cuánto puedes destinar a una cuota sin comprometer tu estabilidad. No es lo mismo lo que un banco te prestaría que lo que realmente puedes pagar con tranquilidad.',
  },
  {
    num: '03',
    title: 'Analizar las opciones disponibles',
    desc: 'Revisamos tipos de hipoteca, condiciones, plazos y entidades. No buscamos la mejor oferta del mercado, buscamos la que mejor encaja contigo.',
  },
  {
    num: '04',
    title: 'Acompañar la decisión',
    desc: 'Una vez tienes claridad, te acompañamos en el proceso. Pero la decisión es tuya, siempre.',
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
    desc: 'Impuestos, notaría, registro y gestoría. Un porcentaje significativo que muchas veces no se tiene en cuenta al principio.',
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
    title: 'Porcentaje de financiación',
    desc: 'Los bancos financian habitualmente hasta el 80% de la tasación. Hay excepciones, pero conviene planificar con el escenario más realista.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Situación personal',
    desc: 'Tu estabilidad laboral, tus deudas existentes y tu perfil crediticio influyen directamente en las condiciones que puedes obtener.',
  },
]

/* ─── Order Aspects ─── */
const ORDER_ASPECTS = [
  {
    num: '01',
    title: 'Cuánto puedes pagar realmente',
    desc: 'No cuanto te prestaría un banco, sino cuánto puedes asumir sin que tu día a día se resienta.',
  },
  {
    num: '02',
    title: 'Tu nivel de endeudamiento',
    desc: 'Hay limites legales y hay limites personales. Ambos importan.',
  },
  {
    num: '03',
    title: 'Qué tipo de decisión es está para ti',
    desc: 'Comprar una primera vivienda no es lo mismo que invertir. Cada escenario tiene sus propias condiciones.',
  },
]

/* ─── Guide Articles ─── */
const GUIDE_ARTICLES = [
  { n: '01', cat: 'Presupuesto', title: 'Cuánto dinero necesitas para comprar una vivienda', slug: '/guia/cuanto-dinero-comprar-vivienda' },
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

/* ─── Currency formatter ─── */
const fmtEUR = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

/* ─── Slider input component ─── */
function SliderInput({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  id,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
  id: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label htmlFor={id} className="text-sm font-bold text-dark">{label}</label>
        <span className="font-serif text-lg text-blue font-medium tabular-nums">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-input w-full"
        style={{ '--slider-pct': `${pct}%` } as React.CSSProperties}
      />
      <div className="flex justify-between text-xs text-text-muted mt-1">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

/* ─── Mortgage Calculator Section ─── */
function MortgageCalculator() {
  const [precio, setPrecio] = useState(200000)
  const [ahorros, setAhorros] = useState(40000)
  const [interes, setInteres] = useState(3)
  const [plazo, setPlazo] = useState(25)
  const [ingresos, setIngresos] = useState(2500)

  const capital = Math.max(0, precio - ahorros)
  const noFinancing = ahorros >= precio
  const totalMonths = plazo * 12
  const monthlyRate = interes / 100 / 12

  let monthlyPayment = 0
  let totalCost = 0
  let totalInterest = 0
  if (!noFinancing && capital > 0 && totalMonths > 0) {
    if (interes === 0) {
      monthlyPayment = capital / totalMonths
    } else {
      monthlyPayment =
        (capital * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths))
    }
    totalCost = monthlyPayment * totalMonths
    totalInterest = totalCost - capital
  }

  const debtRatio = ingresos > 0 ? (monthlyPayment / ingresos) * 100 : 0
  const gastosCompra = precio * 0.1

  const debtColor =
    debtRatio <= 30 ? 'bg-emerald-100 text-emerald-700' :
    debtRatio <= 35 ? 'bg-amber-100 text-amber-700' :
    'bg-red-100 text-red-700'

  const debtLabel =
    debtRatio <= 30 ? 'Saludable' :
    debtRatio <= 35 ? 'Ajustado' :
    'Riesgo elevado'

  const fmtPct = (v: number) => `${v}%`
  const fmtYears = (v: number) => `${v} anos`

  return (
    <section className="py-20 md:py-28 bg-cream/40 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-olive) 0.5px, transparent 0)',
        backgroundSize: '20px 20px',
      }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <RevealSection>
          <SectionHeading
            eyebrow="Simulador"
            title="Calcula tu capacidad de compra"
            subtitle="Ajusta los parámetros para explorar distintos escenarios. Los resultados se actualizan en tiempo real."
            center={false}
          />
        </RevealSection>

        <RevealSection delay={150}>
          <div className="grid lg:grid-cols-[1fr,1fr] gap-8 lg:gap-12 items-start">
            {/* ── Left: Inputs ── */}
            <div className="space-y-7 bg-white rounded-2xl p-7 md:p-9 shadow-soft border border-cream-dark/15">
              <SliderInput
                id="calc-precio"
                label="Precio de la vivienda"
                value={precio}
                min={50000}
                max={800000}
                step={5000}
                format={fmtEUR.format}
                onChange={setPrecio}
              />
              <SliderInput
                id="calc-ahorros"
                label="Ahorros disponibles"
                value={ahorros}
                min={0}
                max={300000}
                step={1000}
                format={fmtEUR.format}
                onChange={setAhorros}
              />
              <SliderInput
                id="calc-interes"
                label="Tipo de interes anual"
                value={interes}
                min={1}
                max={6}
                step={0.1}
                format={fmtPct}
                onChange={setInteres}
              />
              <SliderInput
                id="calc-plazo"
                label="Plazo"
                value={plazo}
                min={5}
                max={35}
                step={1}
                format={fmtYears}
                onChange={setPlazo}
              />

              {/* Income input */}
              <div>
                <label htmlFor="calc-ingresos" className="text-sm font-bold text-dark block mb-2">
                  Ingresos mensuales netos
                </label>
                <div className="relative">
                  <input
                    id="calc-ingresos"
                    type="number"
                    min={0}
                    step={100}
                    value={ingresos}
                    onChange={(e) => setIngresos(Math.max(0, Number(e.target.value)))}
                    className="w-full border border-cream-dark/30 rounded-lg px-4 py-3 text-dark font-serif text-lg focus:outline-none focus:ring-2 focus:ring-blue/40 focus:border-blue transition-all bg-warm-white"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-sm pointer-events-none">EUR/mes</span>
                </div>
              </div>
            </div>

            {/* ── Right: Results ── */}
            <div className="relative">
              {/* Offset frame decoration */}
              <div className="hidden lg:block absolute -top-3 -right-3 w-full h-full rounded-2xl border-2 border-blue/15" />

              <div className="relative bg-white rounded-2xl p-7 md:p-9 shadow-card border border-cream-dark/10">
                {noFinancing ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-2xl text-dark mb-2">No necesitas financiación</h3>
                    <p className="text-text-light text-base">Tus ahorros cubren el precio de la vivienda. Aun así, recuerda los gastos asociados a la compra.</p>
                    <div className="mt-6 bg-cream/50 rounded-xl p-5">
                      <span className="text-sm text-text-muted block mb-1">Gastos estimados de compra (~10%)</span>
                      <span className="font-serif text-xl text-dark font-medium">{fmtEUR.format(gastosCompra)}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Capital */}
                    <div className="mb-6 pb-6 border-b border-cream-dark/15">
                      <span className="text-xs font-bold tracking-[0.15em] uppercase text-text-muted">Capital a financiar</span>
                      <p className="font-serif text-2xl text-dark font-medium mt-1">{fmtEUR.format(capital)}</p>
                    </div>

                    {/* Monthly Payment - Hero number */}
                    <div className="mb-8 text-center">
                      <span className="text-xs font-bold tracking-[0.15em] uppercase text-blue">Cuota mensual</span>
                      <p className="font-serif text-4xl md:text-5xl text-dark font-medium mt-2 tabular-nums">
                        {fmtEUR.format(Math.round(monthlyPayment))}
                      </p>
                      <span className="text-text-muted text-sm mt-1 block">/mes durante {plazo} anos</span>
                    </div>

                    {/* Grid of details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-cream/40 rounded-xl p-4">
                        <span className="text-xs text-text-muted block mb-1">Total a pagar</span>
                        <span className="font-serif text-lg text-dark font-medium">{fmtEUR.format(Math.round(totalCost))}</span>
                      </div>
                      <div className="bg-cream/40 rounded-xl p-4">
                        <span className="text-xs text-text-muted block mb-1">Total intereses</span>
                        <span className="font-serif text-lg text-dark font-medium">{fmtEUR.format(Math.round(totalInterest))}</span>
                      </div>
                      <div className="bg-cream/40 rounded-xl p-4">
                        <span className="text-xs text-text-muted block mb-1">Gastos de compra (~10%)</span>
                        <span className="font-serif text-lg text-dark font-medium">{fmtEUR.format(gastosCompra)}</span>
                      </div>
                      <div className="bg-cream/40 rounded-xl p-4">
                        <span className="text-xs text-text-muted block mb-1">Endeudamiento</span>
                        <span className="font-serif text-lg text-dark font-medium">{debtRatio.toFixed(1)}%</span>
                        <span className={`inline-block mt-1.5 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${debtColor}`}>
                          {debtLabel}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Disclaimer & CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-text-muted text-sm leading-relaxed max-w-xl italic">
              Esta simulación es orientativa. Las condiciones reales dependen de cada entidad bancaria y de tu perfil financiero.
            </p>
            <Link
              to="/entender-mi-situacion"
              className="inline-flex items-center gap-2 bg-blue hover:bg-blue-dark text-white font-bold px-7 py-3.5 rounded-lg transition-all duration-300 text-sm whitespace-nowrap flex-shrink-0"
            >
              Quiero entender mi caso
              <ArrowIcon />
            </Link>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

export default function FinanciarPage() {
  useEffect(() => {
    document.title = "Financiar vivienda en L'Hospitalet — PropiHouse"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Entiende tu capacidad de compra antes de buscar hipoteca. Analizamos tu situación financiera con criterio.')
    return () => { document.title = "PropiHouse — Inmobiliaria en L'Hospitalet de Llobregat" }
  }, [])

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
              Entender la financiación es el primer paso antes de comprar una vivienda
            </h1>
            <div className="max-w-2xl space-y-5">
              <p className="text-text-light text-lg leading-relaxed">
                Cuando alguien piensa en comprar, lo primero que suele buscar son pisos. Pero antes de mirar propiedades, hay una pregunta que conviene responder: cuanto puedo pagar realmente?
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                No es solo una cuestión de hipoteca. Es entender tu situación financiera, los plazos que puedes asumir, los riesgos que estás dispuesto a correr y las condiciones que puedes negociar.
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
              title="La información sobre financiación suele ser confusa"
              center={false}
            />
            <div className="mt-6 space-y-5 max-w-2xl">
              <p className="text-text-light text-lg leading-relaxed">
                Tipos de interes, bonificaciones, seguros vinculados, comisiones ocultas. Es fácil perderse. Y cuando no entiendes bien lo que estás firmando, es difícil tomar buenas decisiones.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Por eso antes de hablar de hipotecas, preferimos hablar de números reales: cuánto necesitas ahorrar, cuánto puedes destinar a la cuota, y que margen te queda para imprevistos.
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
                    Cuánto dinero necesitas realmente para comprar una vivienda
                  </span>
                  <span className="text-text-muted text-xs">Leer artículo en la guía</span>
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
            <AnimatedTimeline steps={ORDER_ASPECTS} color="olive" />

            <div className="mt-12">
              <Link
                to="/guia"
                className="inline-flex items-center gap-2 text-blue hover:text-blue-dark font-bold text-sm transition-colors group"
              >
                Ver guía inmobiliaria
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
              title="Hay aspectos de la financiación que no siempre se explican"
              center={false}
            />
            <p className="text-text-light text-lg leading-relaxed mt-4 mb-10 max-w-2xl">
              No se trata de asustarte, sino de que tengas toda la información antes de comprometerte con una decisión a 20 o 30 años.
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
                Entender mi situación
                <ArrowIcon />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ BLOCK 4b: MORTGAGE CALCULATOR ═══════════ */}
      <MortgageCalculator />

      {/* ═══════════ BLOCK 5: PROPIHOUSE APPROACH ═══════════ */}
      <section className="py-20 md:py-28 bg-cream/40">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              title="Entender la financiación cambia completamente la forma de comprar"
              center={false}
            />
            <div className="mt-6 space-y-5 max-w-2xl">
              <p className="text-text-light text-lg leading-relaxed">
                Cuando sabes exactamente cuánto puedes pagar, dejas de buscar a ciegas. Empiezas a filtrar con criterio, a negociar con seguridad y a tomar decisiones con calma.
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
                Nuestro objetivo no es ofrecerte una hipoteca. Es ayudarte a entender qué tipo de decisión tiene sentido en tu caso.
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
              eyebrow="Nuestro método"
              title="Cómo trabajamos la financiación"
              center={false}
            />
          </RevealSection>

          <AnimatedTimeline steps={METHOD_STEPS} color="blue" />
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
                  Entender la financiación también es parte de la decisión
                </h2>
                <p className="text-text-light text-base md:text-lg leading-relaxed mt-5 max-w-xl">
                  Hemos escrito una serie de artículos para compradores que quieren tener claridad antes de dar el paso.
                </p>
              </div>
              <Link
                to="/guia"
                className="group inline-flex items-center gap-2 text-sm font-bold text-blue hover:text-blue-dark transition-colors whitespace-nowrap pb-2"
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

      {/* ═══════════ BLOCK 8: CTA FINAL ═══════════ */}
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
              <span className="text-cream/40 text-[10px] font-bold tracking-[0.25em] uppercase">Tu financiación</span>
              <span className="block w-12 h-px bg-white/20" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
              Antes de avanzar, conviene entender bien tu situación
            </h2>
            <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Sin compromiso. Analizamos tu caso y vemos que tiene sentido para ti.
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
              Sin compromiso. Analizamos tu caso y vemos que tiene sentido para ti.
            </p>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
