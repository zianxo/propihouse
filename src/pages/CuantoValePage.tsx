import { Link } from 'react-router-dom'
import { RevealSection, SectionHeading } from '../components/ui'

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */
const FACTORS = [
  {
    title: 'Estado del inmueble',
    text: 'Una reforma reciente puede cambiar completamente la percepcion de valor. No es solo estetica -- es lo que el comprador imagina al entrar.',
    icon: '◈',
  },
  {
    title: 'Demanda del barrio',
    text: 'Cada zona de L\'Hospitalet tiene su ritmo. Hay barrios donde las viviendas vuelan y otros donde se necesita mas estrategia.',
    icon: '◎',
  },
  {
    title: 'Tipo de comprador',
    text: 'No es lo mismo vender a una familia que busca su primer hogar que a un inversor. El perfil cambia la negociacion.',
    icon: '⟡',
  },
  {
    title: 'Momento del mercado',
    text: 'El contexto economico, los tipos de interes y la oferta disponible afectan directamente al precio final de cierre.',
    icon: '◇',
  },
]

const BEYOND_PRICE = [
  {
    title: 'Percepcion del comprador',
    text: 'Como se siente alguien al entrar en la vivienda importa mas de lo que parece. La primera impresion marca la negociacion.',
  },
  {
    title: 'Tipo de comprador',
    text: 'Familias, inversores, parejas jovenes -- cada perfil tiene prioridades distintas y disposicion de pago diferente.',
  },
  {
    title: 'Presentacion de la vivienda',
    text: 'Una vivienda bien presentada puede venderse por mas y en menos tiempo. No hablamos de Home Staging caro, sino de criterio.',
  },
  {
    title: 'Feedback de las visitas',
    text: 'Las primeras visitas dan informacion real. Si nadie hace oferta, algo falla -- y no siempre es el precio.',
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
    text: 'Precio, posicionamiento, presentacion. Trazamos un plan coherente que maximice el resultado.',
  },
  {
    number: '04',
    title: 'Acompanamos el proceso',
    text: 'Desde la primera visita hasta la firma. Cada paso con transparencia y comunicacion constante.',
  },
]

const ARTICLES = [
  { n: '01', cat: 'Valoracion', title: 'Como saber cuanto vale mi piso en L\'Hospitalet', href: '/guia/cuanto-vale-piso-hospitalet' },
  { n: '02', cat: 'Preparacion', title: 'Como preparar una vivienda antes de venderla', href: '/guia/preparar-vivienda-vender' },
  { n: '03', cat: 'Mercado', title: 'Es buen momento para vender en L\'Hospitalet?', href: '/guia/buen-momento-vender' },
  { n: '04', cat: 'Errores', title: 'Errores habituales al vender una vivienda', href: '/guia/errores-vender-vivienda' },
]

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */
export default function CuantoValePage() {
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
      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        {/* Decorative accent */}
        <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-[#2A79A9]/[0.03] blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1A1A1A]/[0.08] bg-white/60 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2A79A9]" />
              <span className="text-[11px] tracking-widest uppercase text-[#1A1A1A]/40 font-medium font-[Lato]">
                Valoracion inmobiliaria
              </span>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <h1 className="font-[Playfair_Display] text-4xl md:text-5xl lg:text-[3.5rem] font-light text-[#1A1A1A] tracking-tight leading-[1.1] mb-6">
              Cuanto vale realmente tu vivienda en L'Hospitalet de Llobregat?
            </h1>
          </RevealSection>

          <RevealSection delay={200}>
            <p className="text-lg md:text-xl text-[#1A1A1A]/55 font-light leading-relaxed max-w-2xl mb-10 font-[Lato]">
              Conoce una referencia real del valor de tu vivienda y entiende como encaja en el mercado actual antes de tomar una decision.
            </p>
          </RevealSection>

          <RevealSection delay={300}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/valorador"
                className="inline-flex items-center gap-3 bg-[#2A79A9] text-white px-7 py-4 rounded-xl text-base font-medium tracking-wide hover:bg-[#236891] transition-all duration-300 group font-[Lato]"
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
              <span className="text-sm text-[#1A1A1A]/35 font-[Lato]">
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
              title="Saber cuanto vale una vivienda no es tan simple"
              subtitle="El precio de una vivienda depende de factores que no aparecen en los portales. Estos son algunos de los mas relevantes."
            />
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {FACTORS.map((f, i) => (
              <RevealSection key={f.title} delay={i * 100}>
                <div className="rounded-2xl border border-[#1A1A1A]/[0.06] bg-white/50 p-7 hover:bg-white hover:shadow-[0_2px_24px_rgba(0,0,0,0.04)] transition-all duration-500 h-full">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#EFE8CD]/50 text-[#868C4D] text-lg mb-4">
                    {f.icon}
                  </span>
                  <h3 className="text-lg font-medium text-[#1A1A1A] mb-2 font-[Lato]">{f.title}</h3>
                  <p className="text-[#1A1A1A]/50 text-[15px] leading-relaxed font-light font-[Lato]">
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
          <div className="max-w-3xl mx-auto rounded-3xl bg-[#2A79A9] p-10 md:p-14 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/[0.05]" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/[0.04]" />

            <h2 className="relative font-[Playfair_Display] text-2xl md:text-3xl font-light text-white tracking-tight mb-4">
              Calcula el valor de tu vivienda
            </h2>
            <p className="relative text-white/60 text-base font-light mb-8 max-w-lg mx-auto font-[Lato]">
              Herramienta gratuita. En menos de un minuto tendras una estimacion basada en datos reales del mercado.
            </p>
            <Link
              to="/valorador"
              className="relative inline-flex items-center gap-3 bg-white text-[#2A79A9] px-7 py-4 rounded-xl text-base font-medium tracking-wide hover:bg-[#EFE8CD] transition-all duration-300 group font-[Lato]"
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
              subtitle="Hay factores que no se miden en euros pero que determinan el resultado final de una operacion."
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
                    <p className="text-[#1A1A1A]/50 text-[15px] leading-relaxed font-light font-[Lato]">
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
      <section className="relative z-10 py-20 md:py-28 px-6 bg-[#1A1A1A]">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#2A79A9]/40 to-transparent" />

        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="mb-14">
              <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-light text-white tracking-tight leading-[1.15] mb-4">
                Que hacemos en PropiHouse despues de conocer el valor?
              </h2>
              <p className="text-white/40 text-lg font-light max-w-2xl font-[Lato]">
                Un numero no es suficiente. Esto es lo que hacemos para que tomes la mejor decision posible.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-6">
            {PROCESS_STEPS.map((s, i) => (
              <RevealSection key={s.number} delay={i * 100}>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 hover:bg-white/[0.05] transition-all duration-500 h-full">
                  <span className="font-[Playfair_Display] text-3xl font-light text-[#2A79A9]/50 mb-3 block">
                    {s.number}
                  </span>
                  <h3 className="text-lg font-medium text-white mb-2 font-[Lato]">{s.title}</h3>
                  <p className="text-white/40 text-[15px] leading-relaxed font-light font-[Lato]">
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
              El valor de una vivienda es solo una parte de la decision.
            </p>
            <Link
              to="/entender-mi-situacion"
              className="inline-flex items-center gap-3 bg-[#1A1A1A] text-[#EFE8CD] px-7 py-4 rounded-xl text-base font-medium tracking-wide hover:bg-[#2A2A2A] transition-all duration-300 group font-[Lato]"
            >
              Ver mi situacion
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
                  Articulos para entender el mercado
                </h2>
                <p className="mt-4 text-base md:text-lg text-[#1A1A1A]/55 max-w-xl font-[Lato] font-light leading-relaxed">
                  Lecturas practicas para tomar decisiones informadas sobre tu vivienda.
                </p>
              </div>
              <Link
                to="/guia"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2A79A9] hover:text-[#2A79A9]/80 transition-colors whitespace-nowrap pb-2 font-[Lato]"
              >
                Ver guia inmobiliaria
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
                    Leer articulo
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
      <section className="relative z-10 py-20 md:py-28 px-6 bg-[#EFE8CD]/30">
        <RevealSection>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-light text-[#1A1A1A] tracking-tight leading-[1.15] mb-4">
              Antes de tomar una decision, conviene entender bien la situacion
            </h2>
            <p className="text-[#1A1A1A]/50 text-base font-light mb-10 font-[Lato]">
              Te ayudamos a ver tu caso con perspectiva. Sin prisa, sin compromiso.
            </p>
            <Link
              to="/entender-mi-situacion"
              className="inline-flex items-center gap-3 bg-[#2A79A9] text-white px-7 py-4 rounded-xl text-base font-medium tracking-wide hover:bg-[#236891] transition-all duration-300 group font-[Lato]"
            >
              Quiero entender mi situacion
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
    </main>
  )
}
