import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

/* ────────────────────────────────────────────
   Types & data
   ──────────────────────────────────────────── */
interface CardOption {
  label: string
  value: string
  icon: string
}

const HOUSING_TYPES: CardOption[] = [
  { label: 'Piso', value: 'piso', icon: '▦' },
  { label: 'Casa', value: 'casa', icon: '⌂' },
  { label: 'Atico', value: 'atico', icon: '△' },
  { label: 'Duplex', value: 'duplex', icon: '▥' },
]

const CONDITION_OPTIONS: CardOption[] = [
  { label: 'A reformar', value: 'reformar', icon: '◇' },
  { label: 'Buen estado', value: 'buen-estado', icon: '◈' },
  { label: 'Reformada', value: 'reformada', icon: '◆' },
  { label: 'Obra nueva', value: 'obra-nueva', icon: '✦' },
]

const EXTRAS_OPTIONS = [
  { label: 'Ascensor', value: 'ascensor' },
  { label: 'Parking', value: 'parking' },
  { label: 'Terraza', value: 'terraza' },
  { label: 'Balcon', value: 'balcon' },
  { label: 'Ninguno', value: 'ninguno' },
]

const TOTAL_STEPS = 5

/* Price multipliers */
const CONDITION_MULTIPLIER: Record<string, number> = {
  reformar: 0.8,
  'buen-estado': 1.0,
  reformada: 1.15,
  'obra-nueva': 1.3,
}

const EXTRA_BONUS: Record<string, number> = {
  ascensor: 0.03,
  parking: 0.05,
  terraza: 0.04,
  balcon: 0.02,
  ninguno: 0,
}

const BASE_PRICE_M2 = 2800 // EUR/m2 base for L'Hospitalet

/* ────────────────────────────────────────────
   Progress bar
   ──────────────────────────────────────────── */
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = ((step - 1) / (total - 1)) * 100
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs tracking-widest uppercase text-[#1A1A1A]/35 font-medium font-[Lato]">
          Paso {step} de {total}
        </span>
        <span className="text-xs text-[#1A1A1A]/25 font-[Lato]">{Math.round(pct)}%</span>
      </div>
      <div className="h-[3px] w-full bg-[#1A1A1A]/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#2A79A9] rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   Animated step wrapper
   ──────────────────────────────────────────── */
function StepWrapper({
  active,
  direction,
  children,
}: {
  active: boolean
  direction: 'forward' | 'back'
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (active) {
      const t = requestAnimationFrame(() => setMounted(true))
      return () => cancelAnimationFrame(t)
    }
    setMounted(false)
  }, [active])

  if (!active) return null

  const enterFrom =
    direction === 'forward' ? 'translate-x-12 opacity-0' : '-translate-x-12 opacity-0'

  return (
    <div
      className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        mounted ? 'translate-x-0 opacity-100' : enterFrom
      }`}
    >
      {children}
    </div>
  )
}

/* ────────────────────────────────────────────
   Calculating animation
   ──────────────────────────────────────────── */
function CalculatingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1500)
    const t2 = setTimeout(() => onDone(), 3500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onDone])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      {/* Animated spinner */}
      <div className="relative mb-10">
        <div className="w-16 h-16 rounded-full border-[3px] border-[#2A79A9]/15 border-t-[#2A79A9] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-[#2A79A9]/[0.06]" />
        </div>
      </div>

      <p
        className={`font-[Playfair_Display] text-xl md:text-2xl font-light text-[#1A1A1A] tracking-tight transition-all duration-700 ${
          phase === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 absolute'
        }`}
      >
        Calculando el valor de tu vivienda...
      </p>

      <p
        className={`font-[Lato] text-base text-[#1A1A1A]/50 font-light max-w-md transition-all duration-700 ${
          phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        Estamos analizando los datos segun el comportamiento actual del mercado en L'Hospitalet de Llobregat...
      </p>
    </div>
  )
}

/* ────────────────────────────────────────────
   Result screen
   ──────────────────────────────────────────── */
function ResultScreen({
  metros,
  condition,
  extras,
}: {
  metros: number
  condition: string
  extras: string[]
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  /* Calculate price */
  const condMult = CONDITION_MULTIPLIER[condition] ?? 1
  const extraBonus = extras
    .filter((e) => e !== 'ninguno')
    .reduce((sum, e) => sum + (EXTRA_BONUS[e] ?? 0), 0)
  const pricePerM2 = BASE_PRICE_M2 * condMult * (1 + extraBonus)
  const midValue = Math.round(metros * pricePerM2)
  const lowValue = Math.round(midValue * 0.9)
  const highValue = Math.round(midValue * 1.1)

  const formatEur = (n: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

  const handleShareWhatsApp = () => {
    const text = `He valorado mi vivienda en L'Hospitalet con PropiHouse: entre ${formatEur(lowValue)} y ${formatEur(highValue)}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
  }

  return (
    <div
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-20">
        {/* Label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#868C4D]/20 bg-[#868C4D]/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#868C4D]" />
            <span className="text-[11px] tracking-widest uppercase text-[#868C4D] font-medium font-[Lato]">
              Resultado
            </span>
          </span>
        </div>

        {/* Title */}
        <h2 className="font-[Playfair_Display] text-2xl md:text-3xl font-light text-[#1A1A1A] tracking-tight text-center mb-10">
          Valor estimado de tu vivienda
        </h2>

        {/* Big price */}
        <div className="text-center mb-12">
          <div className="inline-block rounded-3xl bg-white border-2 border-[#1A1A1A]/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.04)] px-10 md:px-16 py-10">
            <p className="text-sm text-[#1A1A1A]/35 mb-2 tracking-widest uppercase font-[Lato]">
              Entre
            </p>
            <p className="font-[Playfair_Display] text-4xl md:text-5xl lg:text-[3.5rem] font-light text-[#1A1A1A] tracking-tight leading-none">
              {formatEur(lowValue)}
              <span className="text-[#1A1A1A]/20 mx-3">-</span>
              {formatEur(highValue)}
            </p>
            <p className="mt-4 text-sm text-[#1A1A1A]/30 font-[Lato]">
              ~{formatEur(Math.round(pricePerM2))}/m2 &middot; {metros} m2
            </p>
          </div>
        </div>

        {/* Explanation */}
        <div className="max-w-lg mx-auto text-center mb-12">
          <p className="text-[#1A1A1A]/50 text-[15px] leading-relaxed font-light font-[Lato]">
            Esta estimacion se basa en datos generales del mercado en L'Hospitalet de Llobregat. El valor final depende
            de factores como la presentacion de la vivienda, el tipo de comprador, la estrategia de venta y el momento
            concreto del mercado.
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-[#1A1A1A]/[0.06] bg-white/50 p-8 md:p-10 text-center mb-10">
          <h3 className="font-[Playfair_Display] text-xl md:text-2xl font-light text-[#1A1A1A] tracking-tight mb-2">
            Quieres afinar este valor?
          </h3>
          <p className="text-[#1A1A1A]/45 text-[15px] font-light mb-6 font-[Lato]">
            Podemos analizar tu vivienda en detalle y darte una valoracion precisa.
          </p>
          <Link
            to="/entender-mi-situacion?tipo=vender"
            className="inline-flex items-center gap-3 bg-[#2A79A9] text-white px-7 py-4 rounded-xl text-base font-medium tracking-wide hover:bg-[#236891] transition-all duration-300 group font-[Lato]"
          >
            Analizar mi vivienda
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Share */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-2 text-sm text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors cursor-pointer font-[Lato]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Compartir por WhatsApp
          </button>
          <span className="text-[#1A1A1A]/10">|</span>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 text-sm text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors cursor-pointer font-[Lato]"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Copiar enlace
          </button>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   Main component
   ──────────────────────────────────────────── */
export default function ValoradorPage() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [phase, setPhase] = useState<'form' | 'calculating' | 'result'>('form')

  /* Form data */
  const [tipoVivienda, setTipoVivienda] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [metros, setMetros] = useState(80)
  const [estado, setEstado] = useState('')
  const [extras, setExtras] = useState<string[]>([])

  const goForward = useCallback(() => {
    setDirection('forward')
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }, [])

  const goBack = useCallback(() => {
    setDirection('back')
    setStep((s) => Math.max(s - 1, 1))
  }, [])

  const selectAndAdvance = (setter: (v: string) => void, value: string) => {
    setter(value)
    setTimeout(() => goForward(), 350)
  }

  const toggleExtra = (value: string) => {
    if (value === 'ninguno') {
      setExtras(['ninguno'])
      return
    }
    setExtras((prev) => {
      const without = prev.filter((e) => e !== 'ninguno')
      return without.includes(value) ? without.filter((e) => e !== value) : [...without, value]
    })
  }

  const handleFinish = () => {
    setPhase('calculating')
  }

  const handleCalcDone = useCallback(() => {
    setPhase('result')
  }, [])

  /* ─── Calculating ─── */
  if (phase === 'calculating') {
    return (
      <main className="min-h-screen bg-[#FDFBF5] relative">
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
        <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5">
          <Link
            to="/"
            className="font-[Playfair_Display] text-lg tracking-tight text-[#1A1A1A] hover:opacity-70 transition-opacity"
          >
            PropiHouse
          </Link>
        </header>
        <div className="relative z-10">
          <CalculatingScreen onDone={handleCalcDone} />
        </div>
      </main>
    )
  }

  /* ─── Result ─── */
  if (phase === 'result') {
    return (
      <main className="min-h-screen bg-[#FDFBF5] relative">
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
        <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5">
          <Link
            to="/"
            className="font-[Playfair_Display] text-lg tracking-tight text-[#1A1A1A] hover:opacity-70 transition-opacity"
          >
            PropiHouse
          </Link>
          <Link
            to="/cuanto-vale-mi-vivienda"
            className="text-sm text-[#1A1A1A]/40 hover:text-[#1A1A1A]/60 transition-colors font-[Lato]"
          >
            Mas sobre valoracion
          </Link>
        </header>
        <div className="relative z-10">
          <ResultScreen metros={metros} condition={estado} extras={extras} />
        </div>
      </main>
    )
  }

  /* ─── Multi-step form ─── */
  return (
    <main className="min-h-screen bg-[#FDFBF5] relative overflow-hidden">
      {/* Grain */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5">
        <Link
          to="/"
          className="font-[Playfair_Display] text-lg tracking-tight text-[#1A1A1A] hover:opacity-70 transition-opacity"
        >
          PropiHouse
        </Link>
        <span className="hidden sm:block text-xs text-[#1A1A1A]/30 tracking-widest uppercase font-[Lato]">
          Valorador gratuito
        </span>
      </header>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-6 md:pt-12 pb-20">
        {/* Progress */}
        <ProgressBar step={step} total={TOTAL_STEPS} />

        {/* Hero intro (step 1 only) */}
        <div
          className={`text-center mt-10 mb-10 max-w-xl mx-auto transition-all duration-500 ${
            step === 1 ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0 overflow-hidden mb-0 mt-6'
          }`}
        >
          <h1 className="font-[Playfair_Display] text-2xl md:text-3xl lg:text-[2.25rem] font-light text-[#1A1A1A] tracking-tight leading-tight">
            Calcula el valor de tu vivienda en L'Hospitalet de Llobregat
          </h1>
          <p className="mt-3 text-[#1A1A1A]/50 text-base font-light font-[Lato] leading-relaxed">
            En menos de un minuto podras obtener una estimacion basada en el mercado actual.
          </p>
          <p className="mt-2 text-[#1A1A1A]/30 text-sm font-[Lato]">
            Sin necesidad de dejar tus datos. Resultado inmediato.
          </p>
        </div>

        {/* Step titles for 2+ */}
        {step > 1 && (
          <div className="mt-10 mb-8 text-center max-w-xl mx-auto">
            <h2 className="font-[Playfair_Display] text-xl md:text-2xl font-light text-[#1A1A1A] tracking-tight">
              {step === 2 && 'Donde se encuentra la vivienda?'}
              {step === 3 && 'Cuantos metros tiene la vivienda?'}
              {step === 4 && 'Como describirias el estado de la vivienda?'}
              {step === 5 && 'Tiene alguno de estos elementos?'}
            </h2>
            {step === 3 && (
              <p className="mt-2 text-[#1A1A1A]/35 text-sm font-[Lato]">Superficie aproximada</p>
            )}
          </div>
        )}

        {/* Steps */}
        <div className="w-full max-w-2xl mx-auto">
          {/* STEP 1 - Housing type */}
          <StepWrapper active={step === 1} direction={direction}>
            <p className="text-xs tracking-widest uppercase text-[#1A1A1A]/35 mb-4 font-medium font-[Lato] text-center">
              Que tipo de vivienda quieres valorar?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {HOUSING_TYPES.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => selectAndAdvance(setTipoVivienda, opt.value)}
                  className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 py-7 px-4 transition-all duration-300 cursor-pointer
                    ${
                      tipoVivienda === opt.value
                        ? 'border-[#2A79A9] bg-[#2A79A9]/[0.06] shadow-[0_0_0_1px_rgba(42,121,169,0.15)]'
                        : 'border-[#1A1A1A]/[0.08] bg-white hover:border-[#2A79A9]/40 hover:bg-[#2A79A9]/[0.02] hover:shadow-sm'
                    }`}
                >
                  <span
                    className={`text-2xl transition-colors ${
                      tipoVivienda === opt.value ? 'text-[#2A79A9]' : 'text-[#1A1A1A]/25'
                    }`}
                  >
                    {opt.icon}
                  </span>
                  <span
                    className={`text-sm font-normal transition-colors ${
                      tipoVivienda === opt.value ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/60'
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </StepWrapper>

          {/* STEP 2 - Location */}
          <StepWrapper active={step === 2} direction={direction}>
            <div className="space-y-6">
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                placeholder="Zona, calle o codigo postal..."
                autoFocus
                className="w-full rounded-xl border-2 border-[#1A1A1A]/[0.08] bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#2A79A9]/40 focus:outline-none focus:ring-2 focus:ring-[#2A79A9]/10 transition-all font-[Lato]"
              />
              <button
                type="button"
                onClick={goForward}
                disabled={!ubicacion.trim()}
                className="w-full rounded-xl bg-[#2A79A9] text-white py-4 text-base font-medium tracking-wide transition-all duration-300 hover:bg-[#236891] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-[Lato]"
              >
                Continuar
              </button>
            </div>
          </StepWrapper>

          {/* STEP 3 - Size */}
          <StepWrapper active={step === 3} direction={direction}>
            <div className="space-y-8">
              {/* Big number display */}
              <div className="text-center">
                <span className="font-[Playfair_Display] text-5xl md:text-6xl font-light text-[#1A1A1A] tracking-tight">
                  {metros}
                </span>
                <span className="text-xl text-[#1A1A1A]/30 ml-2 font-[Lato]">m2</span>
              </div>

              {/* Slider */}
              <div className="relative px-2">
                <input
                  type="range"
                  min={20}
                  max={300}
                  step={5}
                  value={metros}
                  onChange={(e) => setMetros(Number(e.target.value))}
                  className="w-full h-[3px] rounded-full appearance-none bg-[#1A1A1A]/[0.08] outline-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2A79A9] [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(42,121,169,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:hover:shadow-[0_2px_12px_rgba(42,121,169,0.5)]
                    [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#2A79A9] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-[0_2px_8px_rgba(42,121,169,0.3)] [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-xs text-[#1A1A1A]/25 font-[Lato]">
                  <span>20 m2</span>
                  <span>300 m2</span>
                </div>
              </div>

              {/* Or type directly */}
              <div className="flex items-center gap-3 max-w-xs mx-auto">
                <span className="text-sm text-[#1A1A1A]/30 font-[Lato]">o escribe:</span>
                <input
                  type="number"
                  min={10}
                  max={1000}
                  value={metros}
                  onChange={(e) => setMetros(Math.max(10, Math.min(1000, Number(e.target.value))))}
                  className="w-24 rounded-lg border border-[#1A1A1A]/[0.08] bg-white px-3 py-2 text-center text-sm text-[#1A1A1A] focus:border-[#2A79A9]/40 focus:outline-none transition-all font-[Lato]"
                />
                <span className="text-sm text-[#1A1A1A]/30 font-[Lato]">m2</span>
              </div>

              <button
                type="button"
                onClick={goForward}
                className="w-full rounded-xl bg-[#2A79A9] text-white py-4 text-base font-medium tracking-wide transition-all duration-300 hover:bg-[#236891] cursor-pointer font-[Lato]"
              >
                Continuar
              </button>
            </div>
          </StepWrapper>

          {/* STEP 4 - Condition */}
          <StepWrapper active={step === 4} direction={direction}>
            <div className="grid grid-cols-2 gap-3">
              {CONDITION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => selectAndAdvance(setEstado, opt.value)}
                  className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 py-7 px-4 transition-all duration-300 cursor-pointer
                    ${
                      estado === opt.value
                        ? 'border-[#2A79A9] bg-[#2A79A9]/[0.06] shadow-[0_0_0_1px_rgba(42,121,169,0.15)]'
                        : 'border-[#1A1A1A]/[0.08] bg-white hover:border-[#2A79A9]/40 hover:bg-[#2A79A9]/[0.02] hover:shadow-sm'
                    }`}
                >
                  <span
                    className={`text-xl transition-colors ${
                      estado === opt.value ? 'text-[#2A79A9]' : 'text-[#1A1A1A]/25'
                    }`}
                  >
                    {opt.icon}
                  </span>
                  <span
                    className={`text-sm font-normal transition-colors ${
                      estado === opt.value ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/60'
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </StepWrapper>

          {/* STEP 5 - Extras */}
          <StepWrapper active={step === 5} direction={direction}>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {EXTRAS_OPTIONS.map((opt) => {
                  const active = extras.includes(opt.value)
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleExtra(opt.value)}
                      className={`px-5 py-3 rounded-xl border-2 text-sm font-normal transition-all duration-300 cursor-pointer
                        ${
                          active
                            ? 'border-[#2A79A9] bg-[#2A79A9]/[0.06] text-[#1A1A1A] shadow-[0_0_0_1px_rgba(42,121,169,0.15)]'
                            : 'border-[#1A1A1A]/[0.08] bg-white text-[#1A1A1A]/60 hover:border-[#2A79A9]/40 hover:bg-[#2A79A9]/[0.02]'
                        } font-[Lato]`}
                    >
                      {active && opt.value !== 'ninguno' && (
                        <span className="mr-1.5 text-[#2A79A9]">&#10003;</span>
                      )}
                      {opt.label}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={handleFinish}
                disabled={extras.length === 0}
                className="w-full rounded-xl bg-[#2A79A9] text-white py-4 text-base font-medium tracking-wide transition-all duration-300 hover:bg-[#236891] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-[Lato]"
              >
                Ver resultado
              </button>
            </div>
          </StepWrapper>
        </div>

        {/* Back button */}
        {step > 1 && (
          <button
            type="button"
            onClick={goBack}
            className="mt-8 inline-flex items-center gap-2 text-sm text-[#1A1A1A]/35 hover:text-[#1A1A1A]/60 transition-colors cursor-pointer font-[Lato]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Paso anterior
          </button>
        )}
      </div>

      {/* Bottom gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDFBF5] to-transparent pointer-events-none z-[5]" />
    </main>
  )
}
