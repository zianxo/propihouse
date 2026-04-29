import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RevealSection, SectionHeading } from '../components/ui'

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */
const FACTORS = [
  {
    title: 'Estado del inmueble',
    text: 'Una reforma reciente puede cambiar completamente la percepción de valor. No es solo estética -- es lo que el comprador imagina al entrar.',
    icon: '◈',
  },
  {
    title: 'Demanda del barrio',
    text: 'Cada zona de L\'Hospitalet tiene su ritmo. Hay barrios donde las viviendas vuelan y otros donde se necesita más estrategia.',
    icon: '◎',
  },
  {
    title: 'Tipo de comprador',
    text: 'No es lo mismo vender a una familia que busca su primer hogar que a un inversor. El perfil cambia la negociación.',
    icon: '⟡',
  },
  {
    title: 'Momento del mercado',
    text: 'El contexto económico, los tipos de interés y la oferta disponible afectan directamente al precio final de cierre.',
    icon: '◇',
  },
]

const BEYOND_PRICE = [
  {
    title: 'Percepción del comprador',
    text: 'Cómo se siente alguien al entrar en la vivienda importa más de lo que parece. La primera impresión marca la negociación.',
  },
  {
    title: 'Tipo de comprador',
    text: 'Familias, inversores, parejas jóvenes -- cada perfil tiene prioridades distintas y disposición de pago diferente.',
  },
  {
    title: 'Presentación de la vivienda',
    text: 'Una vivienda bien presentada puede venderse por más y en menos tiempo. No hablamos de Home Staging caro, sino de criterio.',
  },
  {
    title: 'Feedback de las visitas',
    text: 'Las primeras visitas dan información real. Si nadie hace oferta, algo falla -- y no siempre es el precio.',
  },
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Analizamos en profundidad',
    text: 'Visitamos tu vivienda, evaluamos su estado real y recopilamos datos del mercado en tu zona concreta.',
  },
  {
    number: '02',
    title: 'Estudiamos el encaje',
    text: 'Cruzamos el perfil de tu vivienda con la demanda actual. No todas las viviendas compiten en el mismo segmento.',
  },
  {
    number: '03',
    title: 'Definimos la estrategia',
    text: 'Precio, posicionamiento, presentación. Trazamos un plan coherente que maximice el resultado.',
  },
  {
    number: '04',
    title: 'Acompañamos el proceso',
    text: 'Desde la primera visita hasta la firma. Cada paso con transparencia y comunicación constante.',
  },
]

const ARTICLES = [
  { n: '01', cat: 'Valoración', title: 'Cómo saber cuánto vale mi piso en L\'Hospitalet', href: '/guia/cuanto-vale-piso-hospitalet' },
  { n: '02', cat: 'Preparación', title: 'Cómo preparar una vivienda antes de venderla', href: '/guia/preparar-vivienda-vender' },
  { n: '03', cat: 'Mercado', title: 'Es buen momento para vender en L\'Hospitalet?', href: '/guia/buen-momento-vender' },
  { n: '04', cat: 'Errores', title: 'Errores habituales al vender una vivienda', href: '/guia/errores-vender-vivienda' },
]

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */
export default function CuantoValePage() {
  useEffect(() => {
    document.title = "Cuánto vale mi vivienda en L'Hospitalet — Propi House"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Descubre el valor orientativo de tu vivienda en L\'Hospitalet de Llobregat con nuestro valorador online.')
    return () => { document.title = "Propi House — Inmobiliaria en L'Hospitalet de Llobregat" }
  }, [])

  return (
    <main className="bg-[#FDFBF5] min-h-screen relative overflow-hidden">
      {/* Grain */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* ─── BLOCK 1: HERO ─── */}
      {/* Same shell as Alquilar / Financiar / Comprar / Vender so the
       * whole service-page family feels like one design. */}
      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-warm-white to-cream-light" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-olive) 0.5px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <RevealSection>
            <span className="inline-block text-[#B8A88A] text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Valoración inmobiliaria
            </span>
            <h1 className="font-[Playfair_Display] text-[clamp(2rem,5.5vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-dark mb-8 max-w-3xl">
              Cuánto vale realmente tu vivienda en L'Hospitalet de Llobregat?
            </h1>
            <div className="max-w-2xl">
              <p className="text-text-light text-lg leading-relaxed">
                Conoce una referencia real del valor de tu vivienda y entiende cómo encaja en el mercado actual antes de tomar una decisión.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={150} className="mt-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/valorador"
                className="inline-flex items-center gap-2.5 bg-blue hover:bg-blue-dark text-white text-sm font-bold px-7 py-3.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue/20 group"
              >
                Calcular el valor de mi vivienda
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
              <span className="text-sm text-text-muted">
                Resultado inmediato. No necesitas dejar tus datos.
              </span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── BLOCK 2: CONTEXT ─── */}
      <section className="relative z-10 py-20 md:py-28 px-6 border-t border-[#1A1A1A]/[0.05]">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <SectionHeading
              title="Saber cuánto vale una vivienda no es tan simple"
              subtitle="El precio de una vivienda depende de factores que no aparecen en los portales. Estos son algunos de los más relevantes."
            />
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {FACTORS.map((f, i) => (
              <RevealSection key={f.title} delay={i * 100}>
                <div className="rounded-xl border border-[#1A1A1A]/[0.06] bg-white/50 p-7 hover:bg-white hover:shadow-[0_2px_24px_rgba(0,0,0,0.04)] transition-all duration-500 h-full">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#EFE8CD]/50 text-[#868C4D] text-lg mb-4">
                    {f.icon}
                  </span>
                  <h3 className="text-lg font-medium text-[#1A1A1A] mb-2 font-[Lato]">{f.title}</h3>
                  <p className="text-[#1A1A1A]/65 text-[15px] leading-relaxed font-light font-[Lato]">
                    {f.text}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOCK 3: VALORADOR CTA ─── */}
      <section className="relative z-10 py-16 md:py-20 px-6">
        <RevealSection>
          <div className="max-w-3xl mx-auto rounded-xl bg-[#2A79A9] p-10 md:p-14 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/[0.05]" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/[0.04]" />

            <h2 className="relative font-[Playfair_Display] text-2xl md:text-3xl font-light text-white tracking-tight mb-4">
              Calcula el valor de tu vivienda
            </h2>
            <p className="relative text-white/80 text-base font-light mb-8 max-w-lg mx-auto font-[Lato]">
              Herramienta gratuita. En menos de un minuto tendrás una estimación basada en datos reales del mercado.
            </p>
            <Link
              to="/valorador"
              className="relative inline-flex items-center gap-3 bg-white text-[#2A79A9] px-7 py-4 rounded-lg text-base font-medium tracking-wide hover:bg-[#EFE8CD] transition-all duration-300 group font-[Lato]"
            >
              Calcular el valor de mi vivienda
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
        </RevealSection>
      </section>

      {/* ─── BLOCK 4: DIFFERENTIATION ─── */}
      <section className="relative z-10 py-20 md:py-28 px-6 border-t border-[#1A1A1A]/[0.05]">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <SectionHeading
              title="El valor de una vivienda es solo el punto de partida"
              subtitle="Hay factores que no se miden en euros pero que determinan el resultado final de una operación."
            />
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-10 mt-14">
            {BEYOND_PRICE.map((item, i) => (
              <RevealSection key={item.title} delay={i * 80}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-px bg-[#2A79A9]/20 mt-1 self-stretch" />
                  <div>
                    <h3 className="text-base font-medium text-[#1A1A1A] mb-2 font-[Lato]">
                      {item.title}
                    </h3>
                    <p className="text-[#1A1A1A]/65 text-[15px] leading-relaxed font-light font-[Lato]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOCK 5: PROPIHOUSE PROCESS ─── */}
      <section className="relative z-10 py-20 md:py-28 px-6 bg-[#3D4A2E]">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#2A79A9]/40 to-transparent" />

        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="mb-14">
              <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-light text-white tracking-tight leading-[1.15] mb-4">
                Qué hacemos en Propi House después de conocer el valor?
              </h2>
              <p className="text-white/70 text-lg font-light max-w-2xl font-[Lato]">
                Un número no es suficiente. Esto es lo que hacemos para que tomes la mejor decisión posible.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-6">
            {PROCESS_STEPS.map((s, i) => (
              <RevealSection key={s.number} delay={i * 100}>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-7 hover:bg-white/[0.05] transition-all duration-500 h-full">
                  <span className="font-[Playfair_Display] text-3xl font-light text-[#EFE8CD]/50 mb-3 block">
                    {s.number}
                  </span>
                  <h3 className="text-lg font-medium text-white mb-2 font-[Lato]">{s.title}</h3>
                  <p className="text-white/65 text-[15px] leading-relaxed font-light font-[Lato]">
                    {s.text}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOCK 6: CTA INTERMEDIO ─── */}
      <section className="relative z-10 py-16 md:py-20 px-6 border-b border-[#1A1A1A]/[0.05]">
        <RevealSection>
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-[Playfair_Display] text-2xl md:text-3xl font-light text-[#1A1A1A] tracking-tight leading-snug mb-8">
              El valor de una vivienda es solo una parte de la decisión.
            </p>
            <Link
              to="/entender-mi-situacion"
              className="inline-flex items-center gap-3 bg-[#1A1A1A] text-[#EFE8CD] px-7 py-4 rounded-lg text-base font-medium tracking-wide hover:bg-[#2A2A2A] transition-all duration-300 group font-[Lato]"
            >
              Ver mi situación
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
        </RevealSection>
      </section>

      {/* ─── BLOCK 7: BLOG LINKS ─── */}
      <section className="relative z-10 py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="flex items-end justify-between gap-6 mb-12 md:mb-14 flex-wrap">
              <div>
                <span className="inline-block font-[Lato] text-xs font-semibold tracking-[0.2em] uppercase text-[#868C4D] mb-5">
                  Guia
                </span>
                <h2 className="font-[Playfair_Display] text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#1A1A1A] max-w-2xl">
                  Artículos para entender el mercado
                </h2>
                <p className="mt-4 text-base md:text-lg text-[#1A1A1A]/55 max-w-xl font-[Lato] font-light leading-relaxed">
                  Lecturas prácticas para tomar decisiones informadas sobre tu vivienda.
                </p>
              </div>
              <Link
                to="/guia"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2A79A9] hover:text-[#2A79A9]/80 transition-colors whitespace-nowrap pb-2 font-[Lato]"
              >
                Ver guía inmobiliaria
                <svg
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
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
          </RevealSection>

          <RevealSection delay={120}>
            <div className="grid gap-px bg-[#1A1A1A]/[0.07] rounded-xl overflow-hidden md:grid-cols-2">
              {ARTICLES.map((art) => (
                <Link
                  key={art.href}
                  to={art.href}
                  className="group relative block bg-white hover:bg-[#FDFBF5] p-7 md:p-9 transition-colors min-h-[180px]"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <span className="font-[Playfair_Display] text-3xl text-[#1A1A1A]/15 leading-none">
                      {art.n}
                    </span>
                    <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#868C4D] mt-2 font-[Lato]">
                      {art.cat}
                    </span>
                  </div>
                  <h3 className="font-[Playfair_Display] text-xl md:text-[1.4rem] leading-[1.3] text-[#1A1A1A] group-hover:text-[#2A79A9] transition-colors mb-5">
                    {art.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A79A9] tracking-wide font-[Lato]">
                    Leer artículo
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-7 md:left-9 w-0 h-[2px] bg-[#2A79A9] group-hover:w-12 transition-all duration-500"
                  />
                </Link>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── BLOCK 8: CTA FINAL ─── */}
      <section className="relative z-10 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E2D38] via-[#253846] to-[#1E2D38]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full opacity-[0.10] pointer-events-none" style={{ background: 'radial-gradient(ellipse, #2A79A9 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(ellipse, #868C4D 0%, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center z-10">
          <RevealSection>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="block w-12 h-px bg-white/20" />
              <span className="text-cream/40 text-[10px] font-bold tracking-[0.25em] uppercase">Tu vivienda</span>
              <span className="block w-12 h-px bg-white/20" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
              Antes de tomar una decisión, conviene entender bien la{' '}situación
            </h2>
            <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Te ayudamos a ver tu caso con perspectiva. Sin prisa, sin compromiso.
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
    </main>
  )
}
