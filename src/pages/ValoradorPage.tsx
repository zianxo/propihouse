import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { lastReviewedLabel, zoneLabel } from '../data/zones'
import { computeValuation, type Estado, type Tipo } from '../lib/valorador'

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
  { label: 'Planta baja', value: 'planta-baja', icon: '▬' },
  { label: 'Casa', value: 'casa', icon: '⌂' },
  { label: 'Ático', value: 'atico', icon: '△' },
  { label: 'Dúplex', value: 'duplex', icon: '▥' },
]

const CONDITION_OPTIONS: CardOption[] = [
  { label: 'A reformar', value: 'reformar', icon: '◇' },
  { label: 'Buen estado', value: 'buen-estado', icon: '◈' },
  { label: 'Reformada', value: 'reformada', icon: '◆' },
  { label: 'Obra nueva', value: 'obra-nueva', icon: '✦' },
]

const EXTRAS_OPTIONS = [
  { label: 'Parking', value: 'parking' },
  { label: 'Terraza', value: 'terraza' },
  { label: 'Balcón', value: 'balcon' },
  { label: 'Trastero', value: 'trastero' },
  { label: 'Ninguno', value: 'ninguno' },
]

const PLANTA_OPTIONS: Array<{ label: string; value: number }> = [
  { label: 'Planta baja', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4+', value: 4 },
]

const TOTAL_STEPS = 6
const REFINE_TOTAL_STEPS = 7

/* All pricing math (condition / extra / size / etc. coefficients) lives
 * in src/lib/valorador.ts. This page only collects user input and hands
 * it to computeValuation(). */

/* ────────────────────────────────────────────
   Progress bar
   ──────────────────────────────────────────── */
function ProgressBar({ step, total, label }: { step: number; total: number; label?: string }) {
  const pct = ((step - 1) / (total - 1)) * 100
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs tracking-widest uppercase text-[#1A1A1A]/35 font-medium font-[Lato]">
          {label || `Paso ${step} de ${total}`}
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
        Estamos analizando los datos según el comportamiento actual del mercado en L'Hospitalet de Llobregat...
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
  ubicacion,
  tipo,
  planta,
  ascensor,
  onRefine,
}: {
  metros: number
  condition: string
  extras: string[]
  ubicacion: string
  tipo: string
  planta: number | null
  ascensor: boolean | null
  onRefine: () => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  /* Calculate price via the V1 engine. The form now collects tipo, planta
   * and ascensor on top of ubicacion/metros/estado/extras. trastero is
   * captured via the extras list (toggled separately for engine) so the
   * +1% kicks in there too. */
  const valuation = computeValuation({
    ubicacion,
    metros,
    estado: condition as Estado,
    extras: extras.filter((e) => e !== 'trastero'),
    tipo: (tipo || undefined) as Tipo | undefined,
    planta: planta ?? undefined,
    ascensor: ascensor ?? undefined,
    trastero: extras.includes('trastero') || undefined,
  })
  const {
    zone,
    pricePerM2,
    lowValue,
    highValue,
    confidenceLabel,
    confidenceScore,
    specialCase,
    specialReason,
  } = valuation

  const formatEur = (n: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

  /* Build the shareable URL once so WhatsApp + Copy use the same link.
   * Falls back to the plain /valorador URL if the hosting environment
   * isn't a browser (SSR-safe). */
  const buildShareUrl = () => {
    if (typeof window === 'undefined') return 'https://propihouse.es/valorador'
    const qs = encodeShareablePayload({
      tipo,
      ubicacion,
      metros,
      estado: condition,
      planta,
      ascensor,
      extras,
    })
    const base = `${window.location.origin}/valorador`
    return qs ? `${base}?${qs}` : base
  }

  const handleShareWhatsApp = () => {
    const url = buildShareUrl()
    const text =
      `Valoración orientativa de vivienda en L'Hospitalet de Llobregat: ${formatEur(lowValue)} – ${formatEur(highValue)}.\n\n` +
      `Calcula la tuya en Propi House:\n${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const [linkCopied, setLinkCopied] = useState(false)
  const handleCopyLink = () => {
    const url = buildShareUrl()
    navigator.clipboard?.writeText(url)
    setLinkCopied(true)
    window.setTimeout(() => setLinkCopied(false), 2200)
  }

  return (
    <div
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-20">
        {/* Title */}
        <h2 className="font-[Playfair_Display] text-2xl md:text-3xl font-light text-[#1A1A1A] tracking-tight text-center mb-3">
          Valor estimado de tu vivienda
        </h2>

        {/* Zone + confidence (centered together) */}
        <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-2 text-[13px] text-[#1A1A1A]/50 font-[Lato] mb-10">
          <span className="inline-flex items-center">
            <svg className="w-3.5 h-3.5 mr-1.5 text-[#868C4D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {zoneLabel(zone)}
          </span>
          <span className="text-[#1A1A1A]/15">|</span>
          <span
            className="inline-flex items-center gap-1.5"
            title={`Confianza ${confidenceScore}/100`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                confidenceLabel === 'alta'
                  ? 'bg-[#868C4D]'
                  : confidenceLabel === 'media'
                  ? 'bg-[#C9A227]'
                  : 'bg-[#1A1A1A]/30'
              }`}
            />
            Confianza {confidenceLabel}
          </span>
        </div>

        {/* Big price */}
        <div className="text-center mb-6">
          <div className="inline-block rounded-xl bg-white border-2 border-[#1A1A1A]/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.04)] px-10 md:px-16 py-10">
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

        {/* Baremos freshness caption */}
        <p className="text-center text-[11px] text-[#1A1A1A]/30 tracking-wide font-[Lato] mb-8">
          {lastReviewedLabel()}
        </p>

        {/* Special-case banner — only shown when the engine flags the input
         * as outside its safe range (very small / very large m², singular ático). */}
        {specialCase && (
          <div className="mb-12 rounded-xl border border-[#C9A227]/30 bg-[#FFF7E0]/60 px-6 py-5 text-center">
            <p className="text-[13px] tracking-widest uppercase text-[#8A6D17] font-medium font-[Lato] mb-1">
              Valoración manual recomendada
            </p>
            <p className="text-[14px] text-[#1A1A1A]/65 font-[Lato] leading-relaxed">
              {specialReason === 'metros_muy_bajos' && 'Las viviendas de menos de 25 m² suelen valorarse caso a caso.'}
              {specialReason === 'metros_muy_altos' && 'Las viviendas de más de 250 m² requieren un análisis más detallado.'}
              {specialReason === 'atico_singular' && 'Los áticos grandes o con terraza tienen un valor muy variable según la finca.'}
              {' '}Te recomendamos pedir un análisis personalizado.
            </p>
          </div>
        )}

        {/* Explanation */}
        <div className="max-w-xl mx-auto mb-12">
          <p className="text-[#1A1A1A]/55 text-[15px] leading-relaxed font-light font-[Lato] mb-5">
            Este resultado es una buena referencia para empezar a entender el valor de tu vivienda.
            Sin embargo, el resultado final depende de cómo se plantee la vivienda en el mercado:
          </p>
          <ul className="space-y-2 pl-1">
            {[
              'cómo se presenta la vivienda',
              'el tipo de comprador',
              'la estrategia de salida al mercado',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#1A1A1A]/55 text-[15px] font-light font-[Lato]">
                <span className="mt-[9px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#868C4D]/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA — emphasized "afinar" block */}
        <div className="rounded-xl border-2 border-[#2A79A9]/15 bg-gradient-to-br from-[#2A79A9]/[0.04] via-white/60 to-[#868C4D]/[0.04] p-9 md:p-12 text-center mb-10 shadow-[0_4px_30px_rgba(42,121,169,0.06)]">
          <p className="text-[#868C4D] text-xs font-semibold tracking-[0.2em] uppercase mb-4 font-[Lato]">
            ¿Te ha sorprendido el resultado?
          </p>
          <h3 className="font-[Playfair_Display] text-3xl md:text-4xl font-normal text-[#1A1A1A] tracking-tight leading-tight mb-3">
            ¿Quieres afinar el valor?
          </h3>
          <p className="text-[#1A1A1A]/55 text-base md:text-[17px] font-light mb-7 font-[Lato] max-w-md mx-auto leading-relaxed">
            Podemos analizar tu vivienda en detalle y darte una valoración precisa.
          </p>
          <button
            type="button"
            onClick={onRefine}
            className="inline-flex items-center gap-3 bg-[#2A79A9] text-white px-8 py-4 rounded-xl text-base font-medium tracking-wide hover:bg-[#236891] transition-all duration-300 group font-[Lato] cursor-pointer hover:shadow-lg hover:shadow-[#2A79A9]/25"
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
          </button>
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
            {linkCopied ? 'Enlace copiado' : 'Copiar enlace'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   Refinement success screen
   ──────────────────────────────────────────── */
function RefineSuccessScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  return (
    <div
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-20">
        {/* Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#868C4D]/10">
            <svg className="w-7 h-7 text-[#868C4D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-[Playfair_Display] text-2xl md:text-3xl font-light text-[#1A1A1A] tracking-tight text-center mb-8">
          Ya estamos analizando tu vivienda
        </h2>

        {/* Body */}
        <div className="max-w-lg mx-auto space-y-5 mb-12">
          <p className="text-[#1A1A1A]/55 text-[15px] leading-relaxed font-light font-[Lato]">
            Hemos recibido la información correctamente y estamos revisando los datos para darte una orientación más ajustada.
          </p>
          <p className="text-[#1A1A1A]/55 text-[15px] leading-relaxed font-light font-[Lato]">
            En breve recibirás una primera valoración teniendo en cuenta el mercado actual en L'Hospitalet de Llobregat.
          </p>
          <p className="text-[#1A1A1A]/55 text-[15px] leading-relaxed font-light font-[Lato]">
            Además, analizaremos algunos aspectos que pueden influir directamente en el resultado, como la percepción de la vivienda o el tipo de comprador que puede encajar.
          </p>
          <p className="text-[#1A1A1A]/55 text-[15px] leading-relaxed font-light font-[Lato]">
            Si es necesario, nos pondremos en contacto contigo para comentarlo contigo de forma clara y sin compromiso.
          </p>
          <p className="text-[#1A1A1A]/40 text-sm font-[Lato] italic">
            En la mayoría de casos respondemos en menos de 24h.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mb-16">
          <Link
            to="/guia"
            className="inline-flex items-center gap-3 bg-[#2A79A9] text-white px-7 py-4 rounded-xl text-base font-medium tracking-wide hover:bg-[#236891] transition-all duration-300 group font-[Lato]"
          >
            Volver a la guía inmobiliaria
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

        {/* Retention block */}
        <div className="rounded-xl border border-[#1A1A1A]/[0.06] bg-white/50 p-8 md:p-10">
          <p className="text-[#1A1A1A]/50 text-[15px] leading-relaxed font-light font-[Lato] mb-6">
            Mientras tanto, si quieres entender mejor cómo funciona el mercado en L'Hospitalet de Llobregat, puedes consultar algunos de nuestros artículos:
          </p>

          <div className="space-y-3 mb-8">
            <Link
              to="/guia/cuanto-vale-piso-hospitalet"
              className="flex items-center gap-3 rounded-xl border border-[#1A1A1A]/[0.06] bg-white px-5 py-4 text-[15px] text-[#1A1A1A]/70 hover:border-[#2A79A9]/30 hover:text-[#2A79A9] transition-all duration-300 font-[Lato] group"
            >
              <svg className="w-4 h-4 text-[#2A79A9]/40 group-hover:text-[#2A79A9] transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
              Cómo saber cuánto vale mi piso en L'Hospitalet
            </Link>
            <Link
              to="/guia/cuanto-tarda-vender-piso"
              className="flex items-center gap-3 rounded-xl border border-[#1A1A1A]/[0.06] bg-white px-5 py-4 text-[15px] text-[#1A1A1A]/70 hover:border-[#2A79A9]/30 hover:text-[#2A79A9] transition-all duration-300 font-[Lato] group"
            >
              <svg className="w-4 h-4 text-[#2A79A9]/40 group-hover:text-[#2A79A9] transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
              Cuánto tarda vender un piso en L'Hospitalet
            </Link>
            <Link
              to="/guia/errores-vender-vivienda"
              className="flex items-center gap-3 rounded-xl border border-[#1A1A1A]/[0.06] bg-white px-5 py-4 text-[15px] text-[#1A1A1A]/70 hover:border-[#2A79A9]/30 hover:text-[#2A79A9] transition-all duration-300 font-[Lato] group"
            >
              <svg className="w-4 h-4 text-[#2A79A9]/40 group-hover:text-[#2A79A9] transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
              Errores al vender una vivienda
            </Link>
          </div>

          <div className="text-center mb-6">
            <Link
              to="/guia"
              className="inline-flex items-center gap-2 text-sm text-[#2A79A9] hover:text-[#236891] transition-colors font-medium font-[Lato]"
            >
              Ver guía inmobiliaria
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <p className="text-center text-[#1A1A1A]/30 text-sm font-[Lato] italic">
            Cada vivienda es diferente, y cada decisión también.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   Shared layout shell
   ──────────────────────────────────────────── */
function PageShell({ children, headerRight }: { children: React.ReactNode; headerRight?: React.ReactNode }) {
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
          Propi House
        </Link>
        {headerRight}
      </header>
      <div className="relative z-10">{children}</div>
    </main>
  )
}

/* ────────────────────────────────────────────
   Option card (reusable for refine steps)
   ──────────────────────────────────────────── */
function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-4 rounded-xl border-2 py-5 px-6 transition-all duration-300 cursor-pointer text-left
        ${
          selected
            ? 'border-[#2A79A9] bg-[#2A79A9]/[0.06] shadow-[0_0_0_1px_rgba(42,121,169,0.15)]'
            : 'border-[#1A1A1A]/[0.08] bg-white hover:border-[#2A79A9]/40 hover:bg-[#2A79A9]/[0.02] hover:shadow-sm'
        }`}
    >
      <span
        className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-300 ${
          selected ? 'border-[#2A79A9] bg-[#2A79A9]' : 'border-[#1A1A1A]/20'
        }`}
      >
        {selected && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span
        className={`text-[15px] transition-colors font-[Lato] ${
          selected ? 'text-[#1A1A1A] font-medium' : 'text-[#1A1A1A]/60'
        }`}
      >
        {label}
      </span>
    </button>
  )
}

/* ────────────────────────────────────────────
   Count selector (for rooms / bathrooms)
   ──────────────────────────────────────────── */
function CountSelector({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <p className="text-sm text-[#1A1A1A]/45 font-medium font-[Lato] mb-3">{label}</p>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 py-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-300 cursor-pointer font-[Lato]
              ${
                value === opt
                  ? 'border-[#2A79A9] bg-[#2A79A9]/[0.06] text-[#1A1A1A] shadow-[0_0_0_1px_rgba(42,121,169,0.15)]'
                  : 'border-[#1A1A1A]/[0.08] bg-white text-[#1A1A1A]/50 hover:border-[#2A79A9]/40 hover:bg-[#2A79A9]/[0.02]'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   Shareable-URL encoding
   ────────────────────────────────────────────
   Encode the form inputs into URL params so the WhatsApp / Copy link
   actually reproduces the result for the recipient. Compact keys keep
   the URL short enough to paste comfortably.

      t = tipo (piso | planta-baja | casa | atico | duplex)
      u = ubicacion (free text)
      m = metros (number)
      e = estado (reformar | buen-estado | reformada | obra-nueva)
      p = planta (0..4 or empty)
      a = ascensor (1 | 0 or empty)
      x = extras CSV
*/
interface ShareablePayload {
  tipo: string
  ubicacion: string
  metros: number
  estado: string
  planta: number | null
  ascensor: boolean | null
  extras: string[]
}

function encodeShareablePayload(p: ShareablePayload): string {
  const params = new URLSearchParams()
  if (p.tipo) params.set('t', p.tipo)
  if (p.ubicacion) params.set('u', p.ubicacion)
  if (p.metros) params.set('m', String(p.metros))
  if (p.estado) params.set('e', p.estado)
  if (p.planta !== null) params.set('p', String(p.planta))
  if (p.ascensor !== null) params.set('a', p.ascensor ? '1' : '0')
  if (p.extras.length) params.set('x', p.extras.join(','))
  return params.toString()
}

function decodeShareablePayload(search: string): Partial<ShareablePayload> | null {
  const params = new URLSearchParams(search)
  if (!params.has('m') || !params.has('e')) return null // need at least metros+estado
  const m = Number(params.get('m'))
  if (!Number.isFinite(m) || m <= 0) return null
  const pStr = params.get('p')
  const aStr = params.get('a')
  return {
    tipo: params.get('t') ?? '',
    ubicacion: params.get('u') ?? '',
    metros: m,
    estado: params.get('e') ?? '',
    planta: pStr === null ? null : Number(pStr),
    ascensor: aStr === null ? null : aStr === '1',
    extras: (params.get('x') ?? '').split(',').filter(Boolean),
  }
}

/* ────────────────────────────────────────────
   Main component
   ──────────────────────────────────────────── */
export default function ValoradorPage() {
  useEffect(() => {
    document.title = "Valorador de vivienda en L'Hospitalet de Llobregat — Propi House"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', "Calcula el valor orientativo de tu vivienda en L'Hospitalet de Llobregat. Herramienta gratuita sin necesidad de registro.")
    return () => { document.title = "Propi House — Inmobiliaria en L'Hospitalet de Llobregat" }
  }, [])

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [phase, setPhase] = useState<'form' | 'calculating' | 'result' | 'refine' | 'refine-success'>('form')

  /* Initial form data */
  const [tipoVivienda, setTipoVivienda] = useState('')
  const [ubicación, setUbicacion] = useState('')
  const [metros, setMetros] = useState(80)
  const [estado, setEstado] = useState('')
  const [planta, setPlanta] = useState<number | null>(null)
  const [ascensor, setAscensor] = useState<boolean | null>(null)
  const [extras, setExtras] = useState<string[]>([])

  /* Hydrate from a shareable URL (?m=...&e=...). When the recipient
   * lands on the link we skip straight to the result so they see the
   * same valuation the sender saw. */
  useEffect(() => {
    if (typeof window === 'undefined') return
    const decoded = decodeShareablePayload(window.location.search)
    if (!decoded) return
    if (decoded.tipo) setTipoVivienda(decoded.tipo)
    if (decoded.ubicacion) setUbicacion(decoded.ubicacion)
    if (decoded.metros) setMetros(decoded.metros)
    if (decoded.estado) setEstado(decoded.estado)
    if (decoded.planta !== undefined && decoded.planta !== null) setPlanta(decoded.planta)
    if (decoded.ascensor !== undefined && decoded.ascensor !== null) setAscensor(decoded.ascensor)
    if (decoded.extras?.length) setExtras(decoded.extras)
    setPhase('result')
  }, [])

  /* Refinement form data */
  const [refineStep, setRefineStep] = useState(1)
  const [refineDirection, setRefineDirection] = useState<'forward' | 'back'>('forward')
  const [refDireccion, setRefDireccion] = useState('')
  const [refCatastral, setRefCatastral] = useState('')
  const [refHabitaciones, setRefHabitaciones] = useState('')
  const [refBanos, setRefBanos] = useState('')
  const [refLuz, setRefLuz] = useState('')
  const [refPlanta, setRefPlanta] = useState('')
  const [refSituacion, setRefSituacion] = useState('')
  const [refTiming, setRefTiming] = useState('')
  const [refNombre, setRefNombre] = useState('')
  const [refTeléfono, setRefTeléfono] = useState('')
  const [refEmail, setRefEmail] = useState('')
  const [refPhotos, setRefPhotos] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  /* Step 5 (planta + ascensor) doesn't apply to single-family houses or
   * ground floors. We auto-skip it and use the natural defaults so the
   * engine's coef_ascensor_planta stays at 1.0. */
  const skipPlantaStep = tipoVivienda === 'casa' || tipoVivienda === 'planta-baja'

  const goForward = useCallback(() => {
    setDirection('forward')
    setStep((s) => {
      let next = s + 1
      if (next === 5 && skipPlantaStep) next = 6
      return Math.min(next, TOTAL_STEPS)
    })
  }, [skipPlantaStep])

  const goBack = useCallback(() => {
    setDirection('back')
    setStep((s) => {
      let prev = s - 1
      if (prev === 5 && skipPlantaStep) prev = 4
      return Math.max(prev, 1)
    })
  }, [skipPlantaStep])

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

  /* Refinement navigation */
  const refineGoForward = useCallback(() => {
    setRefineDirection('forward')
    setRefineStep((s) => Math.min(s + 1, REFINE_TOTAL_STEPS))
  }, [])

  const refineGoBack = useCallback(() => {
    setRefineDirection('back')
    setRefineStep((s) => Math.max(s - 1, 1))
  }, [])

  const refineSelectAndAdvance = (setter: (v: string) => void, value: string) => {
    setter(value)
    setTimeout(() => refineGoForward(), 350)
  }

  const handleRefineSubmit = () => {
    setPhase('refine-success')
  }

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setRefPhotos(Array.from(e.target.files))
    }
  }

  /* ─── Calculating ─── */
  if (phase === 'calculating') {
    return (
      <PageShell>
        <CalculatingScreen onDone={handleCalcDone} />
      </PageShell>
    )
  }

  /* ─── Result ─── */
  if (phase === 'result') {
    return (
      <PageShell
        headerRight={
          <Link
            to="/cuanto-vale-mi-vivienda"
            className="text-sm text-[#1A1A1A]/40 hover:text-[#1A1A1A]/60 transition-colors font-[Lato]"
          >
            Más sobre valoración
          </Link>
        }
      >
        <ResultScreen
          metros={metros}
          condition={estado}
          extras={extras}
          ubicacion={ubicación}
          tipo={tipoVivienda}
          planta={planta}
          ascensor={ascensor}
          onRefine={() => setPhase('refine')}
        />
      </PageShell>
    )
  }

  /* ─── Refine success ─── */
  if (phase === 'refine-success') {
    return (
      <PageShell>
        <RefineSuccessScreen />
      </PageShell>
    )
  }

  /* ─── Refinement form ─── */
  if (phase === 'refine') {
    const refineStepTitles: Record<number, string> = {
      1: '¿Dónde se encuentra exactamente la vivienda?',
      2: 'Cuéntanos un poco más sobre la vivienda',
      3: '¿Cómo es la luz natural en la vivienda?',
      4: '¿En qué planta se encuentra?',
      5: '¿En qué momento estás con tu vivienda?',
      6: '¿Cuándo te gustaría tomar una decisión?',
      7: '¿Dónde te podemos enviar el análisis?',
    }

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
            Propi House
          </Link>
          <span className="hidden sm:block text-xs text-[#1A1A1A]/30 tracking-widest uppercase font-[Lato]">
            Analisis detallado
          </span>
        </header>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-6 md:pt-12 pb-20">
          {/* Progress */}
          <ProgressBar step={refineStep} total={REFINE_TOTAL_STEPS} label={`Paso ${refineStep} de ${REFINE_TOTAL_STEPS}`} />

          {/* Step heading */}
          <div className="mt-10 mb-8 text-center max-w-xl mx-auto">
            <h2 className="font-[Playfair_Display] text-xl md:text-2xl font-light text-[#1A1A1A] tracking-tight">
              {refineStepTitles[refineStep]}
            </h2>
          </div>

          {/* Steps */}
          <div className="w-full max-w-2xl mx-auto">
            {/* REFINE STEP 1 — Ubicacion real */}
            <StepWrapper active={refineStep === 1} direction={refineDirection}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-[#1A1A1A]/45 font-medium font-[Lato] mb-2">
                    Direccion o zona exacta
                  </label>
                  <input
                    type="text"
                    value={refDireccion}
                    onChange={(e) => setRefDireccion(e.target.value)}
                    placeholder="Ej: Calle Major 15, Santa Eulalia..."
                    autoFocus
                    className="w-full rounded-xl border-2 border-[#1A1A1A]/[0.08] bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#2A79A9]/40 focus:outline-none focus:ring-2 focus:ring-[#2A79A9]/10 transition-all font-[Lato]"
                  />
                </div>

                {/* Optional catastral */}
                <div className="rounded-xl border border-[#1A1A1A]/[0.06] bg-white/60 p-5">
                  <p className="text-sm text-[#1A1A1A]/40 font-[Lato] mb-3">
                    ¿Quieres ayudarnos a afinar más el análisis?
                  </p>
                  <label className="block text-sm text-[#1A1A1A]/45 font-medium font-[Lato] mb-2">
                    Referencia catastral
                  </label>
                  <input
                    type="text"
                    value={refCatastral}
                    onChange={(e) => setRefCatastral(e.target.value)}
                    placeholder="Ej: 1234567AB1234C0001XY"
                    className="w-full rounded-xl border-2 border-[#1A1A1A]/[0.08] bg-white px-5 py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#2A79A9]/40 focus:outline-none focus:ring-2 focus:ring-[#2A79A9]/10 transition-all font-[Lato]"
                  />
                  <p className="mt-2 text-xs text-[#1A1A1A]/30 font-[Lato]">
                    Solo lo usamos para hacer un análisis más preciso
                  </p>
                </div>

                <button
                  type="button"
                  onClick={refineGoForward}
                  disabled={!refDireccion.trim()}
                  className="w-full rounded-xl bg-[#2A79A9] text-white py-4 text-base font-medium tracking-wide transition-all duration-300 hover:bg-[#236891] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-[Lato]"
                >
                  Continuar
                </button>
              </div>
            </StepWrapper>

            {/* REFINE STEP 2 — Caracteristicas clave */}
            <StepWrapper active={refineStep === 2} direction={refineDirection}>
              <div className="space-y-8">
                <CountSelector
                  label="Habitaciones"
                  options={['1', '2', '3', '4', '5+']}
                  value={refHabitaciones}
                  onChange={setRefHabitaciones}
                />
                <CountSelector
                  label="Baños"
                  options={['1', '2', '3+']}
                  value={refBanos}
                  onChange={setRefBanos}
                />

                <button
                  type="button"
                  onClick={refineGoForward}
                  disabled={!refHabitaciones || !refBanos}
                  className="w-full rounded-xl bg-[#2A79A9] text-white py-4 text-base font-medium tracking-wide transition-all duration-300 hover:bg-[#236891] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-[Lato]"
                >
                  Continuar
                </button>
              </div>
            </StepWrapper>

            {/* REFINE STEP 3 — Luminosidad (auto-advance) */}
            <StepWrapper active={refineStep === 3} direction={refineDirection}>
              <div className="space-y-3">
                {['Muy luminosa', 'Normal', 'Poco luminosa', 'No estoy seguro'].map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={refLuz === opt}
                    onClick={() => refineSelectAndAdvance(setRefLuz, opt)}
                  />
                ))}
              </div>
            </StepWrapper>

            {/* REFINE STEP 4 — Altura / planta (auto-advance) */}
            <StepWrapper active={refineStep === 4} direction={refineDirection}>
              <div className="space-y-3">
                {['Bajo', 'Intermedio', 'Alto', 'Ático', 'No lo se'].map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={refPlanta === opt}
                    onClick={() => refineSelectAndAdvance(setRefPlanta, opt)}
                  />
                ))}
              </div>
            </StepWrapper>

            {/* REFINE STEP 5 — Situacion del propietario (auto-advance) */}
            <StepWrapper active={refineStep === 5} direction={refineDirection}>
              <div className="space-y-3">
                {[
                  'Quiero vender mi vivienda',
                  'Estoy valorando vender',
                  'Es una herencia',
                  'Es una separación o cambio personal',
                  'Solo quiero saber el valor',
                ].map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={refSituacion === opt}
                    onClick={() => refineSelectAndAdvance(setRefSituacion, opt)}
                  />
                ))}
              </div>
            </StepWrapper>

            {/* REFINE STEP 6 — Timing (auto-advance) */}
            <StepWrapper active={refineStep === 6} direction={refineDirection}>
              <div className="space-y-3">
                {['Lo antes posible', 'En los proximos meses', 'Solo estoy informandome'].map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={refTiming === opt}
                    onClick={() => refineSelectAndAdvance(setRefTiming, opt)}
                  />
                ))}
              </div>
            </StepWrapper>

            {/* REFINE STEP 7 — Contacto */}
            <StepWrapper active={refineStep === 7} direction={refineDirection}>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-[#1A1A1A]/45 font-medium font-[Lato] mb-2">Nombre</label>
                  <input
                    type="text"
                    value={refNombre}
                    onChange={(e) => setRefNombre(e.target.value)}
                    placeholder="Tu nombre"
                    autoFocus
                    className="w-full rounded-xl border-2 border-[#1A1A1A]/[0.08] bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#2A79A9]/40 focus:outline-none focus:ring-2 focus:ring-[#2A79A9]/10 transition-all font-[Lato]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#1A1A1A]/45 font-medium font-[Lato] mb-2">Teléfono (WhatsApp)</label>
                  <input
                    type="tel"
                    value={refTeléfono}
                    onChange={(e) => setRefTeléfono(e.target.value)}
                    placeholder="Ej: 612 345 678"
                    className="w-full rounded-xl border-2 border-[#1A1A1A]/[0.08] bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#2A79A9]/40 focus:outline-none focus:ring-2 focus:ring-[#2A79A9]/10 transition-all font-[Lato]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#1A1A1A]/45 font-medium font-[Lato] mb-2">Email</label>
                  <input
                    type="email"
                    value={refEmail}
                    onChange={(e) => setRefEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full rounded-xl border-2 border-[#1A1A1A]/[0.08] bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#2A79A9]/40 focus:outline-none focus:ring-2 focus:ring-[#2A79A9]/10 transition-all font-[Lato]"
                  />
                </div>

                <p className="text-sm text-[#1A1A1A]/35 font-[Lato] leading-relaxed">
                  Te enviaremos el análisis y, si quieres, te ayudaremos a interpretarlo.
                </p>

                {/* Photo upload section */}
                <div className="rounded-xl border border-[#1A1A1A]/[0.06] bg-white/60 p-5">
                  <p className="text-sm text-[#1A1A1A]/40 font-[Lato] mb-3">
                    ¿Quieres que el análisis sea más preciso? Puedes añadir algunas fotos de la vivienda.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotosChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-[#1A1A1A]/[0.12] bg-white px-5 py-3.5 text-sm text-[#1A1A1A]/50 hover:border-[#2A79A9]/40 hover:text-[#2A79A9] transition-all duration-300 cursor-pointer font-[Lato]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    Anadir fotos de la vivienda
                  </button>
                  {refPhotos.length > 0 && (
                    <p className="mt-2 text-xs text-[#868C4D] font-[Lato]">
                      {refPhotos.length} {refPhotos.length === 1 ? 'foto seleccionada' : 'fotos seleccionadas'}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleRefineSubmit}
                  disabled={!refNombre.trim() || !refTeléfono.trim() || !refEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(refEmail.trim())}
                  className="w-full rounded-xl bg-[#2A79A9] text-white py-4 text-base font-medium tracking-wide transition-all duration-300 hover:bg-[#236891] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-[Lato]"
                >
                  Recibir mi análisis
                </button>
              </div>
            </StepWrapper>
          </div>

          {/* Back button */}
          {refineStep > 1 && (
            <button
              type="button"
              onClick={refineGoBack}
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

  /* ─── Multi-step form (initial calculator) ─── */
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
          Propi House
        </Link>
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
            En menos de un minuto podrás obtener una estimación basada en el mercado actual.
          </p>
          <p className="mt-2 text-[#1A1A1A]/30 text-sm font-[Lato]">
            Sin necesidad de dejar tus datos. Resultado inmediato.
          </p>
        </div>

        {/* Step titles for 2+ */}
        {step > 1 && (
          <div className="mt-10 mb-8 text-center max-w-xl mx-auto">
            <h2 className="font-[Playfair_Display] text-xl md:text-2xl font-light text-[#1A1A1A] tracking-tight">
              {step === 2 && '¿Dónde se encuentra la vivienda?'}
              {step === 3 && '¿Cuántos metros tiene la vivienda?'}
              {step === 4 && '¿Cómo describirías el estado de la vivienda?'}
              {step === 5 && '¿En qué planta se encuentra?'}
              {step === 6 && '¿Tiene alguno de estos elementos?'}
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
              ¿Qué tipo de vivienda quieres valorar?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {HOUSING_TYPES.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => selectAndAdvance(setTipoVivienda, opt.value)}
                  className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 py-7 px-4 transition-all duration-300 cursor-pointer
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
                value={ubicación}
                onChange={(e) => setUbicacion(e.target.value)}
                placeholder="Zona, calle o código postal..."
                autoFocus
                className="w-full rounded-xl border-2 border-[#1A1A1A]/[0.08] bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#2A79A9]/40 focus:outline-none focus:ring-2 focus:ring-[#2A79A9]/10 transition-all font-[Lato]"
              />
              <button
                type="button"
                onClick={goForward}
                disabled={!ubicación.trim()}
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
                  max={500}
                  step={5}
                  value={metros}
                  onChange={(e) => setMetros(Number(e.target.value))}
                  className="w-full h-[3px] rounded-full appearance-none bg-[#1A1A1A]/[0.08] outline-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2A79A9] [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(42,121,169,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:hover:shadow-[0_2px_12px_rgba(42,121,169,0.5)]
                    [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#2A79A9] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-[0_2px_8px_rgba(42,121,169,0.3)] [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-xs text-[#1A1A1A]/25 font-[Lato]">
                  <span>20 m2</span>
                  <span>500 m2</span>
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
                  className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 py-7 px-4 transition-all duration-300 cursor-pointer
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

          {/* STEP 5 - Planta + Ascensor */}
          <StepWrapper active={step === 5} direction={direction}>
            <div className="space-y-8">
              {/* Planta */}
              <div>
                <p className="text-sm text-[#1A1A1A]/45 font-medium font-[Lato] mb-3 text-center">
                  Altura del piso
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {PLANTA_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setPlanta(opt.value)}
                      className={`py-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-300 cursor-pointer font-[Lato]
                        ${
                          planta === opt.value
                            ? 'border-[#2A79A9] bg-[#2A79A9]/[0.06] text-[#1A1A1A] shadow-[0_0_0_1px_rgba(42,121,169,0.15)]'
                            : 'border-[#1A1A1A]/[0.08] bg-white text-[#1A1A1A]/55 hover:border-[#2A79A9]/40 hover:bg-[#2A79A9]/[0.02]'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ascensor — only ask when not on PB */}
              {planta !== null && planta > 0 && (
                <div>
                  <p className="text-sm text-[#1A1A1A]/45 font-medium font-[Lato] mb-3 text-center">
                    ¿Tiene ascensor?
                  </p>
                  <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                    {[
                      { label: 'Sí', value: true },
                      { label: 'No', value: false },
                    ].map((opt) => (
                      <button
                        key={String(opt.value)}
                        type="button"
                        onClick={() => setAscensor(opt.value)}
                        className={`py-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-300 cursor-pointer font-[Lato]
                          ${
                            ascensor === opt.value
                              ? 'border-[#2A79A9] bg-[#2A79A9]/[0.06] text-[#1A1A1A] shadow-[0_0_0_1px_rgba(42,121,169,0.15)]'
                              : 'border-[#1A1A1A]/[0.08] bg-white text-[#1A1A1A]/55 hover:border-[#2A79A9]/40 hover:bg-[#2A79A9]/[0.02]'
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={goForward}
                disabled={planta === null || (planta > 0 && ascensor === null)}
                className="w-full rounded-xl bg-[#2A79A9] text-white py-4 text-base font-medium tracking-wide transition-all duration-300 hover:bg-[#236891] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-[Lato]"
              >
                Continuar
              </button>
            </div>
          </StepWrapper>

          {/* STEP 6 - Extras */}
          <StepWrapper active={step === 6} direction={direction}>
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
