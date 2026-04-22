import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RevealSection, SectionHeading } from '../components/ui'

/* ─── Article Data ─── */
const ARTICLES: {
  title: string
  slug: string
  category: string
  description: string
}[] = [
  {
    title: "Es buen momento para vender una vivienda en L'Hospitalet?",
    slug: 'buen-momento-vender',
    category: 'Entender el mercado',
    description:
      "Factores que influyen en el momento de venta, tendencias actuales del mercado y claves para tomar una buena decisión en L'Hospitalet.",
  },
  {
    title: "Cómo saber cuánto vale mi piso en L'Hospitalet?",
    slug: 'cuanto-vale-piso-hospitalet',
    category: 'Entender el valor',
    description:
      'Los métodos de valoración más fiables, que factores afectan al precio y cómo evitar errores al calcular el valor de tu vivienda.',
  },
  {
    title: 'Errores al vender una vivienda',
    slug: 'errores-vender-vivienda',
    category: 'Entender los errores',
    description:
      'Los errores más comunes que cometen los propietarios al vender y cómo puedes evitarlos para conseguir un mejor resultado.',
  },
  {
    title: 'Cómo preparar una vivienda antes de venderla',
    slug: 'preparar-vivienda-vender',
    category: 'Preparar la vivienda',
    description:
      'Qué ajustes realmente aportan valor antes de poner tu vivienda en el mercado y cuales son innecesarios.',
  },
  {
    title: "Cuánto tarda vender un piso en L'Hospitalet",
    slug: 'cuanto-tarda-vender-piso',
    category: 'Entender los tiempos',
    description:
      'Plazos realistas según la zona, el tipo de propiedad y las condiciones del mercado actual en el area metropolitana de Barcelona.',
  },
  {
    title: 'Comprar antes o vender primero?',
    slug: 'comprar-o-vender-primero',
    category: 'Tomar decisiones estratégicas',
    description:
      'Las ventajas e inconvenientes de cada opción y cómo planificar un cambio de vivienda sin riesgos innecesarios.',
  },
  {
    title: 'Cuánto dinero necesito para comprar una vivienda',
    slug: 'cuanto-dinero-comprar-vivienda',
    category: 'Entender el presupuesto',
    description:
      'Entrada, impuestos, gastos de notaría, hipoteca. Desglose completo de todo lo que necesitas tener en cuenta antes de comprar.',
  },
  {
    title: 'Herencias, divorcios y cambios de vida',
    slug: 'herencia-divorcio-cambio-vida',
    category: 'Situaciones personales',
    description:
      'Cómo gestionar una vivienda cuando la situación personal cambia y qué opciones tienes según tu caso concreto.',
  },
  {
    title: 'Errores habituales al comprar una vivienda',
    slug: 'errores-comprar-vivienda',
    category: 'Errores al comprar',
    description:
      'Desde no revisar bien la documentación hasta subestimar los gastos. Los fallos más frecuentes de los compradores.',
  },
  {
    title: "Impuestos al vender un piso en L'Hospitalet",
    slug: 'impuestos-vender',
    category: 'Impuestos y costes',
    description:
      'IRPF, plusvalía municipal, IBI proporcional y otros gastos fiscales que debes conocer antes de vender tu vivienda.',
  },
]

/* ─── Situation Cards ─── */
const SITUATIONS = [
  {
    title: 'Cambio de vivienda',
    description: 'Quieres vender para comprar otra propiedad que se ajuste mejor a tu situación actual.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    link: '/entender-mi-situacion?tipo=vender',
  },
  {
    title: 'Herencia',
    description: 'Has heredado una propiedad y necesitas entender las opciones y los pasos a seguir.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    link: '/entender-mi-situacion?tipo=vender',
  },
  {
    title: 'Divorcio o separación',
    description: 'La situación personal ha cambiado y necesitas tomar una decisión sobre la vivienda.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="17" y1="11" x2="22" y2="11" />
      </svg>
    ),
    link: '/entender-mi-situacion?tipo=vender',
  },
  {
    title: 'Inversion',
    description: 'Buscas una oportunidad de inversión inmobiliaria con criterio y datos reales.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    link: '/entender-mi-situacion?tipo=comprar',
  },
]

/* ─── Article Card Component ─── */
function ArticleCard({
  title,
  slug,
  category,
  description,
}: (typeof ARTICLES)[number]) {
  return (
    <Link
      to={`/guia/${slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
    >
      <div className="p-7 md:p-8">
        {/* Category tag */}
        <span className="inline-block text-[11px] font-bold tracking-[0.12em] uppercase text-olive bg-olive/10 px-3 py-1 rounded-full mb-5">
          {category}
        </span>
        <h3 className="font-serif text-xl md:text-[1.35rem] font-medium text-dark leading-snug mb-3 group-hover:text-blue transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-light text-sm leading-relaxed mb-5">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 text-blue font-bold text-sm group-hover:gap-3 transition-all duration-300">
          Leer artículo
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function GuiaPage() {
  useEffect(() => {
    document.title = "Guía inmobiliaria — Propi House"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Artículos prácticos sobre comprar, vender y alquilar vivienda en L\'Hospitalet de Llobregat.')
    return () => { document.title = "Propi House — Inmobiliaria en L'Hospitalet de Llobregat" }
  }, [])

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream-light to-warm-white" />
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-olive) 0.5px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />
        {/* Decorative element */}
        <div
          className="absolute -top-20 right-0 w-[500px] h-[500px] opacity-[0.08] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #2A79A9 0%, transparent 70%)' }}
        />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <RevealSection>
            <span className="inline-block text-olive text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Guía inmobiliaria
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-dark leading-[1.15] mb-5">
              Guía para entender el mercado inmobiliario{' '}
              <span className="block mt-1">
                en <em className="italic text-blue">L'Hospitalet de Llobregat</em>
              </span>
            </h1>
            <p className="text-text-light text-base md:text-lg leading-relaxed max-w-2xl mb-4">
              El proceso que suelen recorrer las personas antes de tomar una decisión inmobiliaria.
            </p>
            <p className="text-text-muted text-base leading-relaxed max-w-2xl mb-6">
              Si estás pensando en vender, comprar o cambiar de vivienda en L'Hospitalet de Llobregat, es normal que aparezcan muchas preguntas. En este espacio compartimos artículos pensados para entender mejor cómo funciona el mercado inmobiliario.
            </p>
            <p className="text-olive font-serif italic text-lg">
              Porque cuando se entiende bien la situación, es mucho más fácil decidir con criterio.
            </p>
          </RevealSection>
        </div>

        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" className="w-full">
            <path d="M0 48V20C360 0 720 8 1080 20C1260 28 1380 36 1440 40V48H0Z" fill="var(--color-warm-white)" />
          </svg>
        </div>
      </section>

      {/* ═══════════ ARTICLES GRID ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              eyebrow="Artículos"
              title="Temas que conviene entender antes de tomar una decisión"
            />
          </RevealSection>

          <RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {ARTICLES.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ SITUATION SECTION ═══════════ */}
      <section className="py-20 md:py-28 bg-cream/30">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <SectionHeading
              eyebrow="Tu situación"
              title="Qué está pasando ahora mismo con tu vivienda?"
            />
          </RevealSection>

          <RevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
              {SITUATIONS.map(({ title, description, icon, link }) => (
                <Link
                  key={title}
                  to={link}
                  className="group relative bg-white rounded-xl p-7 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-blue to-olive opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="w-14 h-14 rounded-xl bg-cream flex items-center justify-center text-olive-dark mb-5 group-hover:bg-olive group-hover:text-white transition-colors duration-300">
                    {icon}
                  </div>
                  <h3 className="font-sans font-bold text-dark text-lg mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-text-light text-sm leading-relaxed flex-1 mb-5">
                    {description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-blue font-bold text-sm group-hover:gap-3 transition-all duration-300">
                    Entender mi caso
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ CTA FINAL ═══════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A3328] via-[#344030] to-[#2A3328]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full opacity-[0.07] pointer-events-none" style={{ background: 'radial-gradient(ellipse, #2A79A9 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(ellipse, #868C4D 0%, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center z-10">
          <RevealSection>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="block w-12 h-px bg-white/20" />
              <span className="text-cream/40 text-[10px] font-bold tracking-[0.25em] uppercase">La guía</span>
              <span className="block w-12 h-px bg-white/20" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
              Antes de tomar una decisión inmobiliaria
            </h2>
            <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Cuanto mejor entiendes tu situación, mejores decisiones puedes tomar.
            </p>

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
