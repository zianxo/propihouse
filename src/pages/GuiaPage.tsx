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
      "Factores que influyen en el momento de venta, tendencias actuales del mercado y claves para tomar una buena decision en L'Hospitalet.",
  },
  {
    title: "Como saber cuanto vale mi piso en L'Hospitalet?",
    slug: 'cuanto-vale-piso-hospitalet',
    category: 'Entender el valor',
    description:
      'Los metodos de valoracion mas fiables, que factores afectan al precio y como evitar errores al calcular el valor de tu vivienda.',
  },
  {
    title: 'Errores al vender una vivienda',
    slug: 'errores-vender-vivienda',
    category: 'Entender los errores',
    description:
      'Los errores mas comunes que cometen los propietarios al vender y como puedes evitarlos para conseguir un mejor resultado.',
  },
  {
    title: 'Como preparar una vivienda antes de venderla',
    slug: 'preparar-vivienda-vender',
    category: 'Preparar la vivienda',
    description:
      'Que ajustes realmente aportan valor antes de poner tu vivienda en el mercado y cuales son innecesarios.',
  },
  {
    title: "Cuanto tarda vender un piso en L'Hospitalet",
    slug: 'cuanto-tarda-vender-piso',
    category: 'Entender los tiempos',
    description:
      'Plazos realistas segun la zona, el tipo de propiedad y las condiciones del mercado actual en el area metropolitana de Barcelona.',
  },
  {
    title: 'Comprar antes o vender primero?',
    slug: 'comprar-o-vender-primero',
    category: 'Tomar decisiones estrategicas',
    description:
      'Las ventajas e inconvenientes de cada opcion y como planificar un cambio de vivienda sin riesgos innecesarios.',
  },
  {
    title: 'Cuanto dinero necesito para comprar una vivienda',
    slug: 'cuanto-dinero-comprar-vivienda',
    category: 'Entender el presupuesto',
    description:
      'Entrada, impuestos, gastos de notaria, hipoteca. Desglose completo de todo lo que necesitas tener en cuenta antes de comprar.',
  },
  {
    title: 'Herencias, divorcios y cambios de vida',
    slug: 'herencia-divorcio-cambio-vida',
    category: 'Situaciones personales',
    description:
      'Como gestionar una vivienda cuando la situacion personal cambia y que opciones tienes segun tu caso concreto.',
  },
  {
    title: 'Errores habituales al comprar una vivienda',
    slug: 'errores-comprar-vivienda',
    category: 'Errores al comprar',
    description:
      'Desde no revisar bien la documentacion hasta subestimar los gastos. Los fallos mas frecuentes de los compradores.',
  },
  {
    title: "Impuestos al vender un piso en L'Hospitalet",
    slug: 'impuestos-vender',
    category: 'Impuestos y costes',
    description:
      'IRPF, plusvalia municipal, IBI proporcional y otros gastos fiscales que debes conocer antes de vender tu vivienda.',
  },
]

/* ─── Situation Cards ─── */
const SITUATIONS = [
  {
    title: 'Cambio de vivienda',
    description: 'Quieres vender para comprar otra propiedad que se ajuste mejor a tu situacion actual.',
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
    title: 'Divorcio o separacion',
    description: 'La situacion personal ha cambiado y necesitas tomar una decision sobre la vivienda.',
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
    description: 'Buscas una oportunidad de inversion inmobiliaria con criterio y datos reales.',
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
          Leer articulo
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
              Guia inmobiliaria
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-dark leading-[1.15] mb-5">
              Guia para entender el mercado inmobiliario{' '}
              <span className="block mt-1">
                en <em className="italic text-blue">L'Hospitalet de Llobregat</em>
              </span>
            </h1>
            <p className="text-text-light text-base md:text-lg leading-relaxed max-w-2xl mb-4">
              El proceso que suelen recorrer las personas antes de tomar una decision inmobiliaria.
            </p>
            <p className="text-text-muted text-base leading-relaxed max-w-2xl mb-6">
              Si estas pensando en vender, comprar o cambiar de vivienda en L'Hospitalet de Llobregat, es normal que aparezcan muchas preguntas. En este espacio compartimos articulos pensados para entender mejor como funciona el mercado inmobiliario.
            </p>
            <p className="text-olive font-serif italic text-lg">
              Porque cuando se entiende bien la situacion, es mucho mas facil decidir con criterio.
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
              eyebrow="Articulos"
              title="Temas que conviene entender antes de tomar una decision"
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
              eyebrow="Tu situacion"
              title="Que esta pasando ahora mismo con tu vivienda?"
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
      <section className="py-20 md:py-28 bg-dark relative overflow-hidden">
        {/* Texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }} />
        {/* Warm glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #EFE8CD 0%, transparent 70%)' }}
        />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <RevealSection>
            <span className="inline-block text-cream/50 text-xs font-bold tracking-[0.2em] uppercase mb-5">
              El primer paso
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-8">
              Antes de tomar una decision inmobiliaria
            </h2>
            <Link
              to="/entender-mi-situacion"
              className="inline-flex items-center gap-2.5 bg-cream hover:bg-cream-dark text-dark text-sm font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Entender mi situacion
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <p className="text-white/35 text-sm mt-6 max-w-md mx-auto">
              Sin compromiso. Analizamos tu caso y vemos que tiene sentido para ti.
            </p>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
