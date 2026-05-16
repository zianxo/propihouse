import { Link } from 'react-router-dom'
import { RevealSection, SectionHeading } from './ui'

export interface FAQItem {
  q: string
  a: string
}

export interface FAQCTA {
  intro: string
  buttonLabel: string
  buttonTo: string
}

export function FAQSection({
  eyebrow = 'Preguntas frecuentes',
  title = 'Resolvemos tus dudas',
  items,
  cta,
}: {
  eyebrow?: string
  title?: string
  items: FAQItem[]
  cta?: FAQCTA
}) {
  return (
    <section className="py-20 md:py-28 bg-warm-white">
      <div className="max-w-3xl mx-auto px-6">
        <RevealSection>
          <SectionHeading eyebrow={eyebrow} title={title} center={false} />
        </RevealSection>

        <RevealSection delay={120}>
          <div className="space-y-3">
            {items.map((item, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-cream-dark/20 hover:border-cream-dark/40 transition-colors overflow-hidden [&[open]>summary>svg]:rotate-180"
              >
                <summary className="list-none cursor-pointer flex items-start justify-between gap-4 px-5 py-4 md:px-6 md:py-5">
                  <span className="font-serif text-base md:text-[1.05rem] text-dark leading-snug font-medium pr-2">
                    {item.q}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 mt-1 text-text-muted transition-transform duration-300"
                    aria-hidden
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 md:px-6 md:pb-6 -mt-1">
                  <p className="text-text-light text-[15px] md:text-base leading-relaxed whitespace-pre-line">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </RevealSection>

        {cta && (
          <RevealSection delay={200}>
            <div className="mt-14 rounded-xl border border-blue/15 bg-cream/50 p-8 md:p-10">
              <p className="font-serif text-xl md:text-2xl text-dark leading-snug mb-6 whitespace-pre-line">
                {cta.intro}
              </p>
              <Link
                to={cta.buttonTo}
                className="inline-flex items-center gap-2 bg-blue hover:bg-blue-dark text-white font-bold px-7 py-3.5 rounded-lg transition-all duration-300 text-sm"
              >
                {cta.buttonLabel}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </RevealSection>
        )}
      </div>
    </section>
  )
}
