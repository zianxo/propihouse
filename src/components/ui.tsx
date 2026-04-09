import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

/* ─── Scroll reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

export function RevealSection({
  children,
  className = '',
  delay,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

/* ─── Section heading ─── */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
}) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 ${
            light ? 'text-cream/70' : 'text-olive'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-tight ${
          light ? 'text-white' : 'text-dark'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg max-w-2xl leading-relaxed ${
            center ? 'mx-auto' : ''
          } ${light ? 'text-cream/60' : 'text-text-light'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ─── CTA Section ─── */
export function CTASection({
  title,
  subtitle,
  buttonText = 'Entender mi situacion',
  buttonTo = '/entender-mi-situacion',
  light = true,
}: {
  title: string
  subtitle?: string
  buttonText?: string
  buttonTo?: string
  light?: boolean
}) {
  return (
    <RevealSection>
      <section className={`py-20 md:py-28 ${light ? 'bg-blue' : 'bg-dark'}`}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-white leading-tight mb-6">{title}</h2>
          {subtitle && <p className="text-white/70 text-lg mb-8 leading-relaxed">{subtitle}</p>}
          <Link to={buttonTo} className="inline-flex items-center gap-2 bg-white text-blue font-bold px-8 py-4 rounded-lg text-lg hover:bg-cream transition-all duration-300 hover:shadow-lg">
            {buttonText}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
          <p className="text-white/50 text-sm mt-4">Sin compromiso. Analizamos tu caso y vemos que tiene sentido para ti.</p>
        </div>
      </section>
    </RevealSection>
  )
}

/* ─── Review Card ─── */
export function ReviewCard({
  name,
  text,
  image,
  rating = 5,
}: {
  name: string
  text: string
  image: string
  rating?: number
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-soft flex flex-col gap-4">
      <div className="flex gap-0.5">
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#E8B931" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <p className="text-text-light text-sm leading-relaxed flex-1">"{text}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-cream-dark/20">
        <img
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <span className="font-bold text-sm text-dark">{name}</span>
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google Review
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Service Card ─── */
export function ServiceCard({
  icon,
  title,
  description,
  link,
}: {
  icon: ReactNode
  title: string
  description: string
  link: string
}) {
  return (
    <Link
      to={link}
      className="group bg-white rounded-xl p-7 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 flex flex-col gap-4"
    >
      <div className="w-14 h-14 rounded-xl bg-cream flex items-center justify-center text-olive-dark group-hover:bg-olive group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-sans font-bold text-lg text-dark">{title}</h3>
      <p className="text-text-light text-sm leading-relaxed flex-1">{description}</p>
      <span className="inline-flex items-center gap-2 text-blue font-bold text-sm group-hover:gap-3 transition-all duration-300">
        Saber más
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </Link>
  )
}
