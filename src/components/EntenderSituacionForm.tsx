import { useState, useEffect, useCallback, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

/* ────────────────────────────────────────────
   Step option types
   ──────────────────────────────────────────── */
interface StepOption {
  label: string
  value: string
  icon: string
}

const STEP_1_OPTIONS: StepOption[] = [
  { label: 'Vender mi vivienda', value: 'vender', icon: '↗' },
  { label: 'Alquilar mi vivienda', value: 'alquilar', icon: '⟳' },
  { label: 'Comprar una vivienda', value: 'comprar', icon: '⌂' },
  { label: 'Estoy valorando opciones', value: 'valorando', icon: '…' },
]

const STEP_2_OPTIONS: StepOption[] = [
  { label: 'Lo necesito con urgencia', value: 'urgente', icon: '!' },
  { label: 'Estoy explorando opciones', value: 'explorando', icon: '◇' },
  { label: 'Estoy bloqueado/a y necesito orientación', value: 'bloqueado', icon: '?' },
]

const STEP_3_OPTIONS: StepOption[] = [
  { label: 'Cambio de vivienda', value: 'cambio', icon: '⇄' },
  { label: 'Herencia', value: 'herencia', icon: '∗' },
  { label: 'Divorcio o separación', value: 'divorcio', icon: '∥' },
  { label: 'Inversión', value: 'inversion', icon: '△' },
  { label: 'Otra situación', value: 'otra', icon: '○' },
]

const HOUSING_TYPES: StepOption[] = [
  { label: 'Piso', value: 'piso', icon: '▦' },
  { label: 'Casa', value: 'casa', icon: '⌂' },
  { label: 'Ático', value: 'atico', icon: '△' },
  { label: 'Dúplex', value: 'duplex', icon: '▥' },
]

const TOTAL_STEPS = 5

/* ────────────────────────────────────────────
   Card component for clickable options
   ──────────────────────────────────────────── */
function OptionCard({
  option,
  selected,
  onClick,
}: {
  option: StepOption
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full text-left rounded-2xl border-2 px-6 py-5 transition-all duration-300 cursor-pointer
        ${
          selected
            ? 'border-[#2A79A9] bg-[#2A79A9]/[0.06] shadow-[0_0_0_1px_rgba(42,121,169,0.15)]'
            : 'border-[#1A1A1A]/[0.08] bg-white hover:border-[#2A79A9]/40 hover:bg-[#2A79A9]/[0.02] hover:shadow-sm'
        }`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`flex items-center justify-center w-10 h-10 rounded-xl text-base font-light transition-colors duration-300
            ${
              selected
                ? 'bg-[#2A79A9]/10 text-[#2A79A9]'
                : 'bg-[#1A1A1A]/[0.04] text-[#1A1A1A]/40 group-hover:bg-[#2A79A9]/[0.06] group-hover:text-[#2A79A9]/60'
            }`}
        >
          {option.icon}
        </span>
        <span
          className={`text-base font-normal transition-colors duration-300
            ${selected ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/70 group-hover:text-[#1A1A1A]'}`}
        >
          {option.label}
        </span>
      </div>
      {/* Selection indicator */}
      <div
        className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 transition-all duration-300
          ${
            selected
              ? 'border-[#2A79A9] bg-[#2A79A9] shadow-[inset_0_0_0_2.5px_white]'
              : 'border-[#1A1A1A]/15 group-hover:border-[#2A79A9]/30'
          }`}
      />
    </button>
  )
}

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
        <span className="text-xs text-[#1A1A1A]/45 font-[Lato]">{Math.round(pct)}%</span>
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
   Reusable multi-step form
   ──────────────────────────────────────────── */
export function EntenderSituacionForm({
  embedded = false,
}: {
  embedded?: boolean
}) {
  const [searchParams] = useSearchParams()

  /* Form state */
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [submitted, setSubmitted] = useState(false)

  /* Step data */
  const [tipo, setTipo] = useState('')
  const [punto, setPunto] = useState('')
  const [situación, setSituacion] = useState('')
  const [tipoVivienda, setTipoVivienda] = useState('')
  const [ubicación, setUbicacion] = useState('')
  const [nombre, setNombre] = useState('')
  const [teléfono, setTeléfono] = useState('')
  const [email, setEmail] = useState('')

  /* Pre-select tipo from query param (only used on the standalone page) */
  useEffect(() => {
    if (embedded) return
    const tipoParam = searchParams.get('tipo')
    if (tipoParam && STEP_1_OPTIONS.some((o) => o.value === tipoParam)) {
      setTipo(tipoParam)
      setStep(2)
    }
  }, [searchParams, embedded])

  const goForward = useCallback(() => {
    setDirection('forward')
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }, [])

  const goBack = useCallback(() => {
    setDirection('back')
    setStep((s) => Math.max(s - 1, 1))
  }, [])

  /* Auto-advance helper */
  const selectAndAdvance = (setter: (v: string) => void, value: string) => {
    setter(value)
    setTimeout(() => goForward(), 350)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!nombre.trim() || !teléfono.trim()) return
    // In production, POST to /api/contact here
    setSubmitted(true)
  }

  /* ─── Success screen ─── */
  if (submitted) {
    return (
      <div className="text-center max-w-lg mx-auto py-6">
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{ animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both' }}>
          <div className="mx-auto mb-8 w-16 h-16 rounded-full bg-[#868C4D]/10 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#868C4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-light text-[#1A1A1A] tracking-tight mb-4">
            Te ayudamos a entender tu caso sin compromiso
          </h2>
          <p className="text-[#1A1A1A]/60 text-lg font-light leading-relaxed mb-3 font-[Lato]">
            Hemos recibido tu información. En breve nos pondremos en contacto contigo.
          </p>
          <p className="text-[#1A1A1A]/40 text-sm font-[Lato]">
            En la mayoría de casos respondemos en menos de 24h.
          </p>

          {!embedded && (
            <div className="mt-10 pt-8 border-t border-[#1A1A1A]/[0.06]">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-[#2A79A9] hover:text-[#2A79A9]/70 transition-colors font-[Lato]"
              >
                <span>&larr;</span> Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  /* ─── Multi-step form ─── */
  return (
    <div className="w-full">
      <ProgressBar step={step} total={TOTAL_STEPS} />

      {/* Big intro on step 1 — only on the standalone page */}
      {!embedded && (
        <div
          className={`text-center mt-10 mb-10 max-w-xl mx-auto transition-all duration-500 ${
            step === 1 ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden mb-0 mt-6'
          }`}
        >
          <h1 className="font-[Playfair_Display] text-2xl md:text-3xl lg:text-[2.25rem] font-light text-[#1A1A1A] tracking-tight leading-tight">
            Vamos a entender tu situación
          </h1>
          <p className="mt-3 text-[#1A1A1A]/50 text-base font-light font-[Lato] leading-relaxed">
            No es un formulario. Es el primer paso para tomar decisiones con criterio.
          </p>
        </div>
      )}

      {/* Step title for steps 2+ */}
      {step > 1 && (
        <div className="mt-10 mb-8 text-center max-w-xl mx-auto">
          <h2 className="font-[Playfair_Display] text-xl md:text-2xl font-light text-[#1A1A1A] tracking-tight">
            {step === 2 && 'En qué punto estas?'}
            {step === 3 && 'Situación personal'}
            {step === 4 && 'Ubicacion y tipo de vivienda'}
            {step === 5 && 'Datos de contacto'}
          </h2>
        </div>
      )}

      {/* When embedded, give step 1 some breathing room without the intro block */}
      {embedded && step === 1 && <div className="mt-8" />}

      {/* Steps container */}
      <div className="w-full max-w-2xl mx-auto">
        {/* STEP 1 */}
        <StepWrapper active={step === 1} direction={direction}>
          <div className="grid gap-3">
            {STEP_1_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                option={opt}
                selected={tipo === opt.value}
                onClick={() => selectAndAdvance(setTipo, opt.value)}
              />
            ))}
          </div>
        </StepWrapper>

        {/* STEP 2 */}
        <StepWrapper active={step === 2} direction={direction}>
          <div className="grid gap-3">
            {STEP_2_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                option={opt}
                selected={punto === opt.value}
                onClick={() => selectAndAdvance(setPunto, opt.value)}
              />
            ))}
          </div>
        </StepWrapper>

        {/* STEP 3 */}
        <StepWrapper active={step === 3} direction={direction}>
          <div className="grid gap-3">
            {STEP_3_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                option={opt}
                selected={situación === opt.value}
                onClick={() => selectAndAdvance(setSituacion, opt.value)}
              />
            ))}
          </div>
        </StepWrapper>

        {/* STEP 4 */}
        <StepWrapper active={step === 4} direction={direction}>
          <div className="space-y-6">
            {/* Housing type cards */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/35 mb-3 font-medium font-[Lato]">
                Tipo de vivienda
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {HOUSING_TYPES.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTipoVivienda(opt.value)}
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 py-5 px-4 transition-all duration-300 cursor-pointer
                      ${
                        tipoVivienda === opt.value
                          ? 'border-[#2A79A9] bg-[#2A79A9]/[0.06] shadow-[0_0_0_1px_rgba(42,121,169,0.15)]'
                          : 'border-[#1A1A1A]/[0.08] bg-white hover:border-[#2A79A9]/40 hover:bg-[#2A79A9]/[0.02]'
                      }`}
                  >
                    <span
                      className={`text-xl transition-colors ${
                        tipoVivienda === opt.value ? 'text-[#2A79A9]' : 'text-[#1A1A1A]/45'
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
            </div>

            {/* Location input */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/35 mb-3 font-medium font-[Lato]">
                Ubicacion
              </label>
              <input
                type="text"
                value={ubicación}
                onChange={(e) => setUbicacion(e.target.value)}
                placeholder="Zona, calle o código postal en L'Hospitalet..."
                className="w-full rounded-xl border-2 border-[#1A1A1A]/[0.08] bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/45 focus:border-[#2A79A9]/40 focus:outline-none focus:ring-2 focus:ring-[#2A79A9]/10 transition-all font-[Lato]"
              />
            </div>

            {/* Continue */}
            <button
              type="button"
              onClick={goForward}
              disabled={!tipoVivienda || !ubicación.trim()}
              className="w-full mt-2 rounded-xl bg-[#2A79A9] text-white py-4 text-base font-medium tracking-wide transition-all duration-300 hover:bg-[#236891] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-[Lato]"
            >
              Continuar
            </button>
          </div>
        </StepWrapper>

        {/* STEP 5 */}
        <StepWrapper active={step === 5} direction={direction}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/35 mb-2 font-medium font-[Lato]">
                Nombre *
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full rounded-xl border-2 border-[#1A1A1A]/[0.08] bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/45 focus:border-[#2A79A9]/40 focus:outline-none focus:ring-2 focus:ring-[#2A79A9]/10 transition-all font-[Lato]"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/35 mb-2 font-medium font-[Lato]">
                Teléfono *
              </label>
              <input
                type="tel"
                value={teléfono}
                onChange={(e) => setTeléfono(e.target.value)}
                required
                className="w-full rounded-xl border-2 border-[#1A1A1A]/[0.08] bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/45 focus:border-[#2A79A9]/40 focus:outline-none focus:ring-2 focus:ring-[#2A79A9]/10 transition-all font-[Lato]"
                placeholder="637 00 00 00"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-[#1A1A1A]/35 mb-2 font-medium font-[Lato]">
                Email <span className="normal-case tracking-normal text-[#1A1A1A]/40">(opcional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border-2 border-[#1A1A1A]/[0.08] bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/45 focus:border-[#2A79A9]/40 focus:outline-none focus:ring-2 focus:ring-[#2A79A9]/10 transition-all font-[Lato]"
                placeholder="tu@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={!nombre.trim() || !teléfono.trim()}
              className="w-full mt-4 rounded-xl bg-[#2A79A9] text-white py-4 text-base font-medium tracking-wide transition-all duration-300 hover:bg-[#236891] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-[Lato]"
            >
              Quiero entender mi caso
            </button>

            <p className="text-center text-xs text-[#1A1A1A]/45 font-[Lato]">
              Sin compromiso. Tu información es confidencial.
            </p>
          </form>
        </StepWrapper>
      </div>

      {/* Back button */}
      {step > 1 && (
        <div className="text-center">
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
        </div>
      )}
    </div>
  )
}
