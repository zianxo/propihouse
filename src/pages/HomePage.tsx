import { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { RevealSection, SectionHeading, ReviewCard } from '../components/ui'
import { EntenderSituacionForm } from '../components/EntenderSituacionForm'

/* ─── Constants ─── */
const TOTAL_FRAMES = 145
const FRAME_WIDTH = 1764
const FRAME_HEIGHT = 1176

/* ─── Hero with Scroll Video Background ─── */
function HeroScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number>(0)
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  const getFramePath = useCallback((index: number) => {
    const num = String(index + 1).padStart(3, '0')
    return `/frames-webp/frame-${num}.webp`
  }, [])

  /* Preload all frames */
  useEffect(() => {
    let cancelled = false
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES)
    let loadedCount = 0

    const onLoad = () => {
      loadedCount++
      if (loadedCount >= TOTAL_FRAMES && !cancelled) {
        framesRef.current = images
        setLoaded(true)
      }
    }

    // Priority: every 4th frame first for fast coverage
    const priority: number[] = []
    const secondary: number[] = []
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (i % 4 === 0) priority.push(i)
      else secondary.push(i)
    }
    for (const i of [...priority, ...secondary]) {
      const img = new Image()
      img.src = getFramePath(i)
      img.onload = onLoad
      img.onerror = onLoad
      images[i] = img
    }

    return () => { cancelled = true }
  }, [getFramePath])

  /* Draw frame to canvas with cover-fill */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = framesRef.current[index]
    if (!canvas || !ctx || !img) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    const cw = Math.round(rect.width * dpr)
    const ch = Math.round(rect.height * dpr)

    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw
      canvas.height = ch
    }

    const imgAspect = FRAME_WIDTH / FRAME_HEIGHT
    const canvasAspect = cw / ch
    let sx = 0, sy = 0, sw = FRAME_WIDTH, sh = FRAME_HEIGHT
    if (canvasAspect > imgAspect) {
      sh = FRAME_WIDTH / canvasAspect
      sy = (FRAME_HEIGHT - sh) / 2
    } else {
      sw = FRAME_HEIGHT * canvasAspect
      sx = (FRAME_WIDTH - sw) / 2
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
  }, [])

  /* Scroll handler */
  useEffect(() => {
    if (!loaded) return
    drawFrame(0)

    const onScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current
        if (!container) return

        const scrollableDistance = container.offsetHeight - window.innerHeight
        const scrolled = -container.getBoundingClientRect().top
        const rawProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance))
        setProgress(rawProgress)

        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(rawProgress * (TOTAL_FRAMES - 1)))
        )

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex
          drawFrame(frameIndex)
        }
      })
    }

    const onResize = () => drawFrame(currentFrameRef.current)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [loaded, drawFrame])

  /* Hero text opacity: visible at start, fades out as scroll begins */
  const heroTextOpacity = Math.max(0, 1 - progress * 4)
  /* Overlay content that appears mid-scroll as camera moves through office */
  const overlays: { start: number; end: number; content: React.ReactNode; position?: 'center' | 'left' | 'right' }[] = [
    {
      start: 0.2, end: 0.42,
      position: 'left',
      content: (
        <div className="space-y-4">
          <span className="text-cream/60 text-xs font-bold tracking-[0.25em] uppercase">Nuestro enfoque</span>
          <h3 className="font-serif text-3xl md:text-5xl text-white leading-tight font-medium">
            Primero entendemos.<br/>
            <span className="text-cream/70">Después actuamos.</span>
          </h3>
        </div>
      ),
    },
    {
      start: 0.48, end: 0.68,
      position: 'center',
      content: (
        <div className="text-center space-y-5">
          <span className="text-cream/60 text-xs font-bold tracking-[0.25em] uppercase">Cómo empezamos</span>
          <div className="font-serif text-2xl md:text-4xl lg:text-[2.75rem] text-white leading-[1.25] font-medium space-y-1">
            <div className="text-cream/45">No empezamos por el mercado.</div>
            <div className="text-cream/45">No empezamos por los portales.</div>
            <div className="text-white pt-2">Empezamos por <em className="italic text-cream">entender</em>.</div>
          </div>
        </div>
      ),
    },
    {
      start: 0.74, end: 0.92,
      position: 'center',
      content: (
        <div className="text-center space-y-3">
          <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white leading-tight font-medium">
            Cada vivienda tiene una historia.<br/>
            <span className="text-cream/70">Te ayudamos a escribir el siguiente capítulo.</span>
          </h3>
        </div>
      ),
    },
  ]

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Fallback static image while frames load */}
        {!loaded && (
          <div className="absolute inset-0">
            <img src="/frames-webp/frame-001.webp" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/50 to-dark/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/10" />
          </div>
        )}

        {/* Canvas with video frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: loaded ? 1 : 0 }}
        />

        {/* Gradient overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-dark/20 pointer-events-none" />
        {/* Top vignette for navbar/logo contrast — blur fades out gradually */}
        <div
          className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-[1]"
          style={{
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 100%)',
            background: 'linear-gradient(to bottom, rgba(26,26,26,0.5) 0%, rgba(26,26,26,0.2) 50%, transparent 100%)',
          }}
        />

        {/* ── Hero content (visible at top, fades on scroll) ── */}
        <div
          className="absolute inset-0 z-10 flex items-center"
          style={{
            opacity: heroTextOpacity,
            transform: `translateY(${(1 - heroTextOpacity) * -30}px)`,
            pointerEvents: heroTextOpacity < 0.1 ? 'none' : 'auto',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <span
                className="inline-block text-cream/80 text-xs font-bold tracking-[0.25em] uppercase mb-6 animate-fade-up"
                style={{ animationDelay: '0.1s' }}
              >
                Inmobiliaria en L'Hospitalet de Llobregat
              </span>

              <h1
                className="font-serif text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-white leading-[1.15] mb-7 animate-fade-up"
                style={{ animationDelay: '0.25s' }}
              >
                Entender bien tu situación es el primer paso para{' '}
                <em className="italic text-cream">decidir con criterio</em>
              </h1>

              <p
                className="text-white/65 text-lg md:text-xl leading-relaxed mb-10 max-w-xl animate-fade-up"
                style={{ animationDelay: '0.4s' }}
              >
                En PropiHouse te ayudamos a tomar decisiones inmobiliarias con claridad en L'Hospitalet de Llobregat.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.55s' }}>
                <Link
                  to="/entender-mi-situacion"
                  className="group inline-flex items-center gap-2.5 bg-blue hover:bg-blue-dark text-white text-sm font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue/25"
                >
                  Entender mi situación
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
                <Link
                  to="/como-trabajamos"
                  className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm hover:bg-white/20 text-white text-sm font-bold px-7 py-4 rounded-lg border border-white/15 transition-all duration-300"
                >
                  Cómo trabajamos
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll overlay content (appears mid-scroll) ── */}
        {overlays.map((overlay, i) => {
          const fadeIn = overlay.start
          const fadeInEnd = overlay.start + 0.05
          const fadeOutStart = overlay.end - 0.05
          const fadeOut = overlay.end

          let opacity = 0
          if (progress >= fadeIn && progress <= fadeInEnd) {
            opacity = (progress - fadeIn) / (fadeInEnd - fadeIn)
          } else if (progress > fadeInEnd && progress < fadeOutStart) {
            opacity = 1
          } else if (progress >= fadeOutStart && progress <= fadeOut) {
            opacity = 1 - (progress - fadeOutStart) / (fadeOut - fadeOutStart)
          }

          const pos = overlay.position || 'center'
          const posClass = pos === 'left'
            ? 'items-center justify-start pl-8 md:pl-16 lg:pl-24'
            : pos === 'right'
            ? 'items-center justify-end pr-8 md:pr-16 lg:pr-24'
            : 'items-center justify-center'

          return (
            <div
              key={i}
              className={`absolute inset-0 flex ${posClass} pointer-events-none z-10 px-6`}
              style={{
                opacity,
                transform: `translateY(${(1 - opacity) * 20}px)`,
              }}
            >
              <div className="max-w-4xl drop-shadow-lg">
                {overlay.content}
              </div>
            </div>
          )
        })}

        {/* ── Scroll indicator ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
          style={{ opacity: heroTextOpacity > 0.5 ? 1 : 0, transition: 'opacity 0.3s' }}
        >
          <span className="text-cream/50 text-xs tracking-widest uppercase font-sans">Scroll</span>
          <div className="w-px h-8 bg-cream/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-cream/70" style={{ height: '40%', animation: 'scrollPulse 1.8s ease-in-out infinite' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Services Data ─── */
const SERVICES = [
  {
    title: 'Comprar',
    description: 'Te ayudamos a encontrar la propiedad ideal. Analizamos tu situación, filtramos opciones reales y te acompañamos hasta la entrega de llaves.',
    link: '/comprar',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    title: 'Vender',
    description: 'Valoramos tu propiedad, diseñamos una estrategia de venta personalizada y gestiónamos todo el proceso por ti.',
    link: '/vender',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  },
  {
    title: 'Alquilar',
    description: 'Gestionamos tu alquiler con criterio. Desde encontrar inquilino hasta la firma del contrato y el seguimiento posterior.',
    link: '/alquilar',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  },
  {
    title: 'Financiar',
    description: 'Te ayudamos a entender tu capacidad real y a encontrar la financiación que tiene sentido para tu situación.',
    link: '/financiar',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-8-2.5 3-5 5.24-5 8Z"/><path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-8-2.5 3-5 5.24-5 8Z"/></svg>,
  },
]

/* ─── Review Data ─── */
const REVIEWS = [
  { name: 'Maria Garcia', text: 'Desde el primer momento nos sentimos acompañados. Encontramos nuestro piso ideal en menos de un mes. Un trato increíblemente cercano y profesional.', image: '/reviews/2026-02-04.webp' },
  { name: 'Carlos Rodriguez', text: 'Vendimos nuestro piso con PropiHouse y el proceso fue impecable. Nos guiaron en cada paso y consiguieron un precio por encima de lo esperado.', image: '/reviews/2026-02-04 (1).webp' },
  { name: 'Ana Martinez', text: 'Buscabamos alquiler y pensábamos que seria imposible. PropiHouse nos encontro una opción perfecta en nuestra zona preferida. Muy agradecidos.', image: '/reviews/2026-02-04 (2).webp' },
  { name: 'Jordi Puig', text: 'El equipo financiero nos ayudo a conseguir la mejor hipoteca. Sin ellos, no habríamos podido comprar nuestra primera vivienda. Totalmente recomendable.', image: '/reviews/2026-02-04 (3).webp' },
]

/* ─── HomePage ─── */
export default function HomePage() {
  useEffect(() => {
    document.title = "PropiHouse — Inmobiliaria en L'Hospitalet de Llobregat"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', "Tu inmobiliaria de confianza en L'Hospitalet de Llobregat. Entender bien tu situación es el primer paso para tomar decisiones inmobiliarias con criterio.")
    // JSON-LD structured data
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'ld-json-business'
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "PropiHouse",
      "url": "https://www.propihouse.es",
      "telephone": "+34637863678",
      "email": "hola@propihouse.es",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Carrer d'Enric Prat de la Riba, 187",
        "addressLocality": "L'Hospitalet de Llobregat",
        "postalCode": "08901",
        "addressRegion": "Barcelona",
        "addressCountry": "ES"
      },
      "areaServed": "L'Hospitalet de Llobregat",
      "slogan": "Lo que ves es lo que es"
    })
    document.head.appendChild(script)
    return () => { document.getElementById('ld-json-business')?.remove() }
  }, [])

  return (
    <>
      {/* Hero = scroll video animation as background */}
      <HeroScrollVideo />

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              eyebrow="Nuestros servicios"
              title="Te acompañamos en cada decisión"
              subtitle="Comprar, vender, alquilar o financiar. Sea cual sea tu situación, estamos aquí para ayudarte a entenderla y actuar con criterio."
            />
          </RevealSection>
          <RevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
              {SERVICES.map((service) => (
                <Link
                  key={service.title}
                  to={service.link}
                  className="group relative bg-cream/50 hover:bg-cream rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-card flex flex-col gap-5 border border-cream-dark/0 hover:border-cream-dark/20"
                >
                  <div className="w-14 h-14 rounded-xl bg-olive/10 flex items-center justify-center text-olive-dark group-hover:bg-olive group-hover:text-white transition-all duration-400">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-dark group-hover:text-olive-dark transition-colors duration-300">{service.title}</h3>
                  <p className="text-text-light text-[15px] leading-relaxed flex-1">{service.description}</p>
                  <span className="inline-flex items-center gap-2 text-olive-dark font-bold text-sm group-hover:gap-3 transition-all duration-300">
                    Saber mas
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </Link>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ ENTENDER MI SITUACION (embedded form) ═══════════ */}
      <section
        id="entender-mi-situación"
        className="relative py-24 md:py-32 bg-gradient-to-b from-warm-white via-cream/20 to-cream/40 overflow-hidden scroll-mt-24"
      >
        {/* Decorative accents */}
        <div
          aria-hidden
          className="absolute -top-20 -left-20 w-[520px] h-[520px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--color-blue) 0%, transparent 65%)' }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-20 w-[480px] h-[480px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--color-olive) 0%, transparent 65%)' }}
        />

        <div className="relative max-w-4xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-12 md:mb-14">
              <span className="inline-block text-olive text-xs font-bold tracking-[0.25em] uppercase mb-5">
                El primer paso
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-dark leading-tight tracking-tight mb-5">
                Vamos a entender tu situaci&oacute;n
              </h2>
              <p className="text-text-light text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                No es un formulario. Es el primer paso para tomar decisiones con criterio. Sin compromiso.
              </p>
            </div>
          </RevealSection>

          {/* Form card with depth */}
          <RevealSection>
            <div className="relative">
              {/* Offset depth frame */}
              <div
                aria-hidden
                className="absolute -top-3 -right-3 w-full h-full rounded-3xl bg-olive/[0.18]"
              />

              <div className="relative bg-white rounded-3xl border border-cream-dark/15 shadow-[0_20px_60px_-20px_rgba(26,26,26,0.18)] p-6 sm:p-8 md:p-10">
                <EntenderSituacionForm embedded />
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ QUIEN ESTA DETRAS — PAU MANOVEL ═══════════ */}
      <section className="relative py-24 md:py-32 bg-cream/30 overflow-hidden">
        {/* Soft accent glow */}
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--color-olive) 0%, transparent 65%)' }}
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* LEFT — Portrait card with depth */}
            <div className="md:col-span-5">
              <RevealSection>
                <div className="relative max-w-sm mx-auto md:mx-0">
                  {/* Offset frame for depth */}
                  <div
                    aria-hidden
                    className="absolute -top-3 -left-3 w-full h-full rounded-2xl bg-olive/[0.18]"
                  />

                  <div className="relative bg-white rounded-2xl border border-cream-dark/20 shadow-[0_20px_60px_-20px_rgba(26,26,26,0.18)] p-8 md:p-9">
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-gradient-to-r from-olive/60 via-blue/40 to-transparent" />

                    {/* Monogram */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-olive/[0.15] to-blue/[0.08] border border-olive/20 flex items-center justify-center mb-6">
                      <span className="font-serif text-3xl text-olive-dark font-medium tracking-tight">PM</span>
                    </div>

                    {/* Name */}
                    <h3 className="font-serif text-2xl md:text-[1.7rem] font-medium text-dark leading-tight mb-2">
                      Pau Manovel
                    </h3>

                    {/* Role + location */}
                    <p className="text-text-light text-sm font-medium leading-snug">
                      Asesor inmobiliario
                    </p>
                    <p className="text-text-muted text-sm">
                      L&apos;Hospitalet de Llobregat
                    </p>

                    {/* Decorative divider */}
                    <div className="flex items-center gap-3 mt-7 pt-6 border-t border-cream-dark/30">
                      <span className="block w-7 h-px bg-olive/50" />
                      <span className="text-[10px] tracking-[0.18em] uppercase text-text-muted font-bold">
                        +10 a&ntilde;os acompa&ntilde;ando decisiones
                      </span>
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* RIGHT — Editorial text + button */}
            <div className="md:col-span-7">
              <RevealSection>
                <span className="inline-block text-olive text-xs font-bold tracking-[0.25em] uppercase mb-5">
                  Qui&eacute;n est&aacute; detr&aacute;s
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.5rem] font-medium text-dark leading-tight tracking-tight mb-8">
                  Qui&eacute;n est&aacute; detr&aacute;s de PropiHouse
                </h2>
              </RevealSection>

              <RevealSection>
                <div className="space-y-6">
                  {/* Lead paragraph */}
                  <p className="font-serif text-xl md:text-[1.45rem] leading-[1.55] text-dark/85">
                    PropiHouse nace de una idea muy sencilla: que las decisiones inmobiliarias importantes merecen tiempo, informaci&oacute;n clara y alguien que escuche antes de proponer.
                  </p>

                  {/* Identification */}
                  <p className="text-base md:text-lg leading-[1.75] text-text-light pt-2">
                    <span className="font-semibold text-dark">Soy Pau Manovel</span>, asesor inmobiliario en L&apos;Hospitalet de Llobregat.
                  </p>

                  {/* Body */}
                  <p className="text-base md:text-lg leading-[1.75] text-text-light">
                    Desde hace m&aacute;s de una d&eacute;cada acompa&ntilde;o a personas que quieren vender, comprar o alquilar una vivienda entendiendo primero su situaci&oacute;n y despu&eacute;s el mercado.
                  </p>

                  {/* Closing pull-quote */}
                  <p className="font-serif italic text-lg md:text-xl text-dark/80 pl-5 border-l-2 border-olive/45">
                    Porque cuando se entiende todo, decidir es mucho m&aacute;s f&aacute;cil.
                  </p>
                </div>
              </RevealSection>

              <RevealSection>
                <Link
                  to="/como-trabajamos"
                  className="group mt-10 inline-flex items-center gap-2.5 bg-olive-dark hover:bg-olive text-white text-sm font-bold px-7 py-3.5 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  Conocer c&oacute;mo trabajamos
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS ═══════════ */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <SectionHeading eyebrow="Opiniones reales" title="Lo que dicen nuestros clientes" subtitle="Mas de 250 familias ya confian en nosotros." />
          </RevealSection>
          <RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {REVIEWS.map((r) => <ReviewCard key={r.name} {...r} />)}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A3328] via-[#344030] to-[#2A3328]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full opacity-[0.07] pointer-events-none" style={{ background: 'radial-gradient(ellipse, #2A79A9 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(ellipse, #868C4D 0%, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center z-10">
          <RevealSection>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="block w-12 h-px bg-white/20" />
              <span className="text-cream/40 text-[10px] font-bold tracking-[0.25em] uppercase">El primer paso</span>
              <span className="block w-12 h-px bg-white/20" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">Antes de tomar una decisión, conviene entender bien la situación</h2>
            <p className="text-white/65 text-lg mb-10 max-w-xl mx-auto leading-relaxed">Te escuchamos, analizamos tu caso y te damos la información qué necesitas. Sin compromiso, sin presiones.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/entender-mi-situacion" className="group inline-flex items-center gap-2.5 bg-white hover:bg-cream text-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg text-sm">
                Entender mi situación
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <a href="https://wa.me/34637863678" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/15 text-white/80 hover:text-white font-bold px-7 py-4 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                Escríbenos por WhatsApp
              </a>
            </div>

            <p className="text-white/35 text-sm mt-8">Sin compromiso. Analizamos tu caso y vemos que tiene sentido para ti.</p>
          </RevealSection>
        </div>
      </section>

      <style>{`@keyframes scrollPulse { 0%, 100% { transform: translateY(-100%); } 50% { transform: translateY(150%); } }`}</style>
    </>
  )
}
