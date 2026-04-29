import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MethodTimeline, RevealSection, SectionHeading } from '../components/ui'

/* ─── Method Steps ─── */
const METHOD_STEPS = [
  {
    num: '1',
    title: 'Entender tu situación',
    desc: 'Analizamos tu contexto financiero, tus ingresos, tus compromisos y tu capacidad de ahorro. No para juzgar, sino para tener un punto de partida real.',
  },
  {
    num: '2',
    title: 'Definir tu capacidad real',
    desc: 'Calculamos cuánto puedes destinar a una cuota sin comprometer tu estabilidad. No es lo mismo lo que un banco te prestaría que lo que realmente puedes pagar con tranquilidad.',
  },
  {
    num: '3',
    title: 'Analizar las opciones disponibles',
    desc: 'Revisamos tipos de hipoteca, condiciones, plazos y entidades. No buscamos la mejor oferta del mercado, buscamos la que mejor encaja contigo.',
  },
  {
    num: '4',
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
    desc: 'Lo habitual es necesitar entre un 20% y un 30% del valor del inmueble como entrada para impuestos y gastos asociados.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    title: 'Tasación bancaria',
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
    num: '1',
    title: 'Cuánto puedes pagar realmente',
    desc: 'No cuánto te prestaría un banco, sino cuánto puedes asumir sin que tu día a día se resienta.',
  },
  {
    num: '2',
    title: 'Tu nivel de endeudamiento',
    desc: 'Hay limites legales y hay limites personales. Ambos importan.',
  },
  {
    num: '3',
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

/* Buying-cost percentages, all shown as ITP-rate options.
 * 10% is the standard ITP in Catalunya for second-hand.
 * 7.5% and 5% reflect bonificaciones (joven, vivienda habitual, etc.).
 * Gastos de escritura are a fixed ~2500€ for notaría / registro / gestoría. */
const GASTOS_PCT_OPTIONS = [10, 7.5, 5] as const
const GASTOS_ESCRITURA_FIJO = 2500

function MortgageCalculator() {
  const [precio, setPrecio] = useState(200000)
  const [ahorros, setAhorros] = useState(40000)
  const [gastosPct, setGastosPct] = useState<10 | 7.5 | 5>(10)
  const [interes, setInteres] = useState(3)
  const [plazo, setPlazo] = useState(25)
  const [ingresos, setIngresos] = useState(2500)

  /* Gastos de compra:
   *   ITP variable (10/7.5/5% según bonificaciones)
   *   + gastos escritura fijos (notaría, registro, gestoría)
   * Pau quiere que el capital a financiar incluya estos gastos. */
  const itp = precio * (gastosPct / 100)
  const gastosCompra = itp + GASTOS_ESCRITURA_FIJO
  const totalNecesario = precio + gastosCompra
  const capital = Math.max(0, totalNecesario - ahorros)
  const noFinancing = ahorros >= totalNecesario
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

  const debtColor =
    debtRatio <= 30 ? 'bg-emerald-100 text-emerald-700' :
    debtRatio <= 35 ? 'bg-amber-100 text-amber-700' :
    'bg-red-100 text-red-700'

  const debtLabel =
    debtRatio <= 30 ? 'Saludable' :
    debtRatio <= 35 ? 'Ajustado' :
    'Riesgo elevado'

  const fmtPct2 = (v: number) => {
    const s = v.toFixed(2).replace(/\.?0+$/, '')
    return `${s}%`
  }
  const fmtYears = (v: number) => `${v} años`

  const pctFinanciacion = totalNecesario > 0 ? Math.min(100, (capital / totalNecesario) * 100) : 0

  const handlePrint = () => {
    document.body.classList.add('calc-printing')
    window.print()
    window.setTimeout(() => document.body.classList.remove('calc-printing'), 500)
  }

  const handleSendEmail = () => {
    const body = [
      'Resultados del simulador de hipoteca — Propi House',
      '',
      `Precio de la vivienda: ${fmtEUR.format(precio)}`,
      `Ahorros disponibles: ${fmtEUR.format(ahorros)}`,
      `Tipo de interés: ${fmtPct2(interes)}`,
      `Plazo: ${plazo} años`,
      `Ingresos netos: ${fmtEUR.format(ingresos)}/mes`,
      '',
      `Gastos de compra: ${fmtEUR.format(gastosCompra)}`,
      `  - ITP (${fmtPct2(gastosPct)}): ${fmtEUR.format(itp)}`,
      `  - Gastos de escritura: ${fmtEUR.format(GASTOS_ESCRITURA_FIJO)}`,
      `Capital a financiar: ${fmtEUR.format(capital)}`,
      `Cuota mensual: ${fmtEUR.format(Math.round(monthlyPayment))}`,
      `Total a pagar: ${fmtEUR.format(Math.round(totalCost))}`,
      `Total intereses: ${fmtEUR.format(Math.round(totalInterest))}`,
      `Financiación / total: ${pctFinanciacion.toFixed(1)}%`,
      `Endeudamiento: ${debtRatio.toFixed(1)}% (${debtLabel})`,
      '',
      'Generado en https://www.propihouse.es/financiar',
    ].join('\n')
    const subject = 'Simulación de hipoteca — Propi House'
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

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
          <div className="calc-print-area grid lg:grid-cols-[1fr,1fr] gap-8 lg:gap-12 items-start">
            {/* ── Left: Inputs ── */}
            <div className="space-y-7 bg-white rounded-xl p-7 md:p-9 shadow-soft border border-cream-dark/15">
              <SliderInput
                id="calc-precio"
                label="Precio de la vivienda"
                value={precio}
                min={50000}
                max={800000}
                step={500}
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

              {/* Gastos de compra — selectable ITP percentage. 10% is the
               * default ITP in Catalunya for second-hand; 7.5% / 5% reflect
               * common bonificaciones (joven, vivienda habitual). */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-bold text-dark">Impuesto de transmisión (ITP)</span>
                  <span className="font-serif text-lg text-blue font-medium tabular-nums">{fmtPct2(gastosPct)}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {GASTOS_PCT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setGastosPct(opt)}
                      className={`py-2.5 rounded-lg border text-sm font-bold transition-all duration-200 cursor-pointer ${
                        gastosPct === opt
                          ? 'bg-blue text-white border-blue shadow-sm'
                          : 'bg-warm-white text-dark/60 border-cream-dark/40 hover:border-blue/40 hover:text-blue'
                      }`}
                    >
                      {fmtPct2(opt)}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-text-muted leading-relaxed">
                  10% es el ITP estándar en Catalunya para segunda mano. 7,5% y 5% aplican con bonificaciones (joven, vivienda habitual).
                </p>
              </div>

              <SliderInput
                id="calc-interes"
                label="Tipo de interés anual"
                value={interes}
                min={1}
                max={6}
                step={0.05}
                format={fmtPct2}
                onChange={setInteres}
              />
              <SliderInput
                id="calc-plazo"
                label="Plazo"
                value={plazo}
                min={5}
                max={40}
                step={1}
                format={fmtYears}
                onChange={setPlazo}
              />

              {/* Income input */}
              <div>
                <label htmlFor="calc-ingresos" className="text-sm font-bold text-dark block mb-2">
                  Ingresos mensuales netos
                </label>
                <div className="relative flex items-center">
                  <input
                    id="calc-ingresos"
                    type="number"
                    min={0}
                    step={100}
                    value={ingresos}
                    onChange={(e) => setIngresos(Math.max(0, Number(e.target.value)))}
                    className="calc-number-input flex-1 w-0 border border-cream-dark/30 rounded-l-lg rounded-r-none border-r-0 px-4 py-3 text-dark font-serif text-lg focus:outline-none focus:ring-2 focus:ring-blue/40 focus:border-blue focus:z-10 transition-all bg-warm-white"
                  />
                  <span className="inline-flex items-center px-4 py-3 rounded-r-lg border border-cream-dark/30 bg-cream/60 text-text-muted text-sm font-medium select-none">
                    EUR/mes
                  </span>
                </div>
              </div>
            </div>

            {/* ── Right: Results ── */}
            <div className="relative">
              {/* Offset frame decoration */}
              <div className="hidden lg:block absolute -top-3 -right-3 w-full h-full rounded-xl border-2 border-blue/15" />

              <div className="relative bg-white rounded-xl p-7 md:p-9 shadow-card border border-cream-dark/10">
                {noFinancing ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-2xl text-dark mb-2">No necesitas financiación</h3>
                    <p className="text-text-light text-base">Tus ahorros cubren el precio y los gastos de compra.</p>
                    <div className="mt-6 bg-cream/50 rounded-xl p-5 text-left">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-text-muted">Gastos de compra</span>
                        <span className="font-serif text-xl text-dark font-medium">{fmtEUR.format(gastosCompra)}</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-text-muted">ITP ({fmtPct2(gastosPct)})</span>
                          <span className="text-dark/80 font-medium tabular-nums">{fmtEUR.format(itp)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-text-muted">Gastos de escritura</span>
                          <span className="text-dark/80 font-medium tabular-nums">{fmtEUR.format(GASTOS_ESCRITURA_FIJO)}</span>
                        </div>
                      </div>
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
                      <span className="text-text-muted text-sm mt-1 block">/mes durante {plazo} años</span>
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

                      {/* Gastos de compra breakdown — ITP (variable, modificable
                       * via los botones de la izquierda) + gastos de escritura
                       * fijos (notaría, registro, gestoría). */}
                      <div className="bg-cream/40 rounded-xl p-4 col-span-2">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-text-muted">Gastos de compra</span>
                          <span className="font-serif text-lg text-dark font-medium">{fmtEUR.format(gastosCompra)}</span>
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-text-muted">ITP ({fmtPct2(gastosPct)})</span>
                            <span className="text-dark/80 font-medium tabular-nums">{fmtEUR.format(itp)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-text-muted">Gastos de escritura<span className="text-text-muted/70"> · notaría, registro, gestoría</span></span>
                            <span className="text-dark/80 font-medium tabular-nums">{fmtEUR.format(GASTOS_ESCRITURA_FIJO)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-cream/40 rounded-xl p-4">
                        <span className="text-xs text-text-muted block mb-1">Financiación / total</span>
                        <span className="font-serif text-lg text-dark font-medium">{pctFinanciacion.toFixed(1)}%</span>
                        <div className="mt-1.5 relative h-1 bg-cream-dark/40 rounded-full overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-blue rounded-full transition-all duration-300"
                            style={{ width: `${pctFinanciacion}%` }}
                          />
                        </div>
                      </div>
                      <div className="bg-cream/40 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-text-muted">Endeudamiento</span>
                          <span className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${debtColor}`}>
                            {debtLabel}
                          </span>
                        </div>
                        <span className="font-serif text-lg text-dark font-medium mt-1 block">{debtRatio.toFixed(1)}%</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Action row — print / save PDF / send */}
                <div className="no-print mt-6 pt-6 border-t border-cream-dark/15 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 bg-blue/10 hover:bg-blue hover:text-white text-blue text-xs font-bold tracking-wide uppercase px-3.5 py-2.5 rounded-lg transition-colors border border-blue/20 hover:border-blue cursor-pointer"
                    aria-label="Guardar como PDF"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Guardar PDF
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 bg-cream-dark/30 hover:bg-cream-dark/60 text-dark text-xs font-bold tracking-wide uppercase px-3.5 py-2.5 rounded-lg transition-colors border border-cream-dark/30 cursor-pointer"
                    aria-label="Imprimir resultados"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 6 2 18 2 18 9" />
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                      <rect x="6" y="14" width="12" height="8" />
                    </svg>
                    Imprimir
                  </button>
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="inline-flex items-center gap-2 bg-olive/15 hover:bg-olive hover:text-white text-olive-dark text-xs font-bold tracking-wide uppercase px-3.5 py-2.5 rounded-lg transition-colors border border-olive/30 hover:border-olive cursor-pointer"
                    aria-label="Enviar resultados por email"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer & CTA */}
          <div className="no-print mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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
    document.title = "Financiar vivienda en L'Hospitalet — Propi House"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Entiende tu capacidad de compra antes de buscar hipoteca. Analizamos tu situación financiera con criterio.')
    return () => { document.title = "Propi House — Inmobiliaria en L'Hospitalet de Llobregat" }
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
              Financiación
            </span>
            <h1 className="font-[Playfair_Display] text-[clamp(2rem,5.5vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-dark mb-8 max-w-3xl">
              Entender la financiación es el primer paso antes de comprar una vivienda
            </h1>
            <div className="max-w-2xl space-y-5">
              <p className="text-text-light text-lg leading-relaxed">
                Cuando alguien piensa en comprar, lo primero que suele buscar es la vivienda. Pero antes de mirar propiedades, hay una pregunta que conviene responder:
              </p>
              <p className="font-serif italic text-xl md:text-2xl text-dark leading-snug">
                ¿Cuánto puedo pagar realmente?
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
                Tipos de interés, bonificaciones, seguros vinculados, comisiones ocultas.
              </p>
              <p className="font-serif italic text-xl md:text-2xl text-dark leading-snug">
                Es fácil perderse.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Y cuando no entiendes bien lo que estás firmando, es difícil tomar buenas decisiones.
              </p>
              <p className="text-text-light text-lg leading-relaxed">
                Por eso antes de hablar de hipotecas, preferimos hablar de números reales:
              </p>
              <ul className="space-y-3 pl-1">
                {[
                  '¿Cuánto necesitas ahorrar?',
                  '¿Cuánto puedes destinar a la cuota?',
                  '¿Qué margen te queda para imprevistos?',
                ].map((q) => (
                  <li key={q} className="flex items-start gap-3 text-text-light text-lg leading-relaxed">
                    <span className="mt-[11px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-olive/70" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
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
              title={
                <>
                  Antes de mirar hipotecas,
                  <br className="hidden md:inline" />
                  {' '}hay algo que conviene tener claro
                </>
              }
              center={false}
            />
            <MethodTimeline steps={ORDER_ASPECTS} color="olive" />

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
              No se trata de asustarte, sino de que tengas toda la información antes de comprometerte con un banco.
            </p>

            <p className="inline-block text-olive text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Aspectos a tener en cuenta
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {HIDDEN_COSTS.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="group bg-white hover:bg-cream rounded-xl p-6 shadow-soft border border-cream-dark/15 hover:border-cream-dark/40 transition-all duration-400 hover:shadow-card hover:-translate-y-0.5"
                >
                  <div className="w-11 h-11 rounded-lg bg-cream group-hover:bg-white flex items-center justify-center text-olive-dark mb-4 transition-colors duration-400">
                    {icon}
                  </div>
                  <h3 className="font-sans font-bold text-dark group-hover:text-olive-dark text-base mb-2 transition-colors duration-400">{title}</h3>
                  <p className="text-text-light group-hover:text-olive-dark text-sm leading-relaxed transition-colors duration-400">{desc}</p>
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
              title="Entender la financiación te ayuda a comprar mejor"
              center={false}
            />
            <div className="mt-6 space-y-5 max-w-2xl">
              <p className="text-text-light text-lg leading-relaxed">
                Cuando sabes exactamente cuánto puedes pagar, dejas de buscar a ciegas. Empiezas a filtrar con criterio, a negociar con seguridad y a tomar decisiones con calma.
              </p>
            </div>

            {/* Bold statement */}
            <div className="mt-10 bg-white rounded-xl p-8 md:p-10 shadow-card border-l-4 border-blue relative overflow-hidden">
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
                <span className="text-text-muted text-sm font-medium">Propi House</span>
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

          <MethodTimeline steps={METHOD_STEPS} color="blue" />
        </div>
      </section>

      {/* ═══════════ BLOCK 7: GUIDE ═══════════ */}
      <section className="py-24 md:py-32 bg-cream/40">
        <div className="max-w-5xl mx-auto px-6">
          <RevealSection>
            <div className="mb-12 md:mb-14 max-w-2xl">
              <span className="inline-block text-olive text-xs font-bold tracking-[0.2em] uppercase mb-5">
                Guía
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-dark leading-tight tracking-tight">
                Entender la financiación también es parte de la decisión
              </h2>
              <p className="text-text-light text-base md:text-lg leading-relaxed mt-5 max-w-xl">
                Te compartimos una serie de artículos para compradores que quieren tener claridad antes de dar el paso.
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
              Solo una conversación para entender tu momento
            </h2>
            <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Diseñamos contigo el plan que tiene sentido para tu vivienda.
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
    </>
  )
}
