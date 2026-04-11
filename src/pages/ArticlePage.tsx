import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { RevealSection } from '../components/ui'

/* ─── Types ─── */

interface FAQ {
  q: string
  a: string
}

interface Article {
  slug: string
  title: string
  category: string
  readingTime: string
  body: () => React.JSX.Element
  faqs: FAQ[]
  related: string[]
}

/* ─── FAQ Accordion Item ─── */

function FAQItem({ q, a }: FAQ) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-cream-dark/30 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group cursor-pointer"
      >
        <span className="font-sans font-bold text-dark text-[15px] leading-snug group-hover:text-blue transition-colors duration-200">
          {q}
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
          className={`flex-shrink-0 mt-0.5 text-text-muted transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ease-out ${
          open ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-text-light text-[15px] leading-relaxed pr-8">{a}</p>
      </div>
    </div>
  )
}

/* ─── Related Article Card ─── */

function RelatedCard({ slug }: { slug: string }) {
  const article = ARTICLES[slug]
  if (!article) return null

  return (
    <Link
      to={`/guia/${slug}`}
      className="group block bg-white rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
    >
      <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-olive mb-3">
        {article.category}
      </span>
      <h3 className="font-serif text-lg font-medium text-dark leading-snug mb-3 group-hover:text-blue transition-colors duration-200">
        {article.title}
      </h3>
      <span className="inline-flex items-center gap-2 text-blue font-bold text-sm group-hover:gap-3 transition-all duration-300">
        Leer artículo
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </Link>
  )
}

/* ─── Reusable body components ─── */

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-text-light text-[16px] leading-[1.8] mb-6">{children}</p>
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-2xl md:text-[1.75rem] font-medium text-dark mt-12 mb-5 leading-tight">{children}</h2>
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="mb-6 space-y-2.5 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-text-light text-[15px] leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-olive flex-shrink-0 mt-2.5" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 pl-6 border-l-3 border-olive/40 text-text text-[16px] italic leading-relaxed">
      {children}
    </blockquote>
  )
}

function ArticleLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 text-blue font-bold text-[15px] hover:gap-2.5 transition-all duration-300"
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
      </svg>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════
   ARTICLE DATA — 10 articles
   ═══════════════════════════════════════════════════════════ */

const ARTICLES: Record<string, Article> = {

  /* ── 1. Cuánto vale tu piso ── */
  'cuanto-vale-piso-hospitalet': {
    slug: 'cuanto-vale-piso-hospitalet',
    title: 'Cómo saber cuánto vale tu piso en L\'Hospitalet de Llobregat',
    category: 'Entender el valor',
    readingTime: '8 min',
    body: () => (
      <>
        <P>
          Saber cuánto vale tu piso es el primer paso antes de tomar cualquier decisión. Ya sea que estes pensando en vender, en reorganizar tu patrimonio o simplemente en entender tu situación, el valor de tu vivienda es el punto de partida. En L'Hospitalet de Llobregat, ese valor puede variar mucho en función del barrio, el estado de la vivienda y la demanda del momento.
        </P>

        <H2>Qué factores influyen en el valor de tu piso</H2>
        <P>
          El valor de una vivienda no depende de un solo factor. Es una combinacion de elementos que el mercado pondera de forma diferente según el momento y el tipo de comprador.
        </P>
        <UL items={[
          'Ubicacion: no es lo mismo un piso en Sant Josep que en Santa Eulalia o Collblanc. Cada barrio tiene su propia dinámica de precios, su demanda y su perfil de comprador.',
          'Estado de la vivienda: una vivienda reformada, lista para entrar, se percibe de forma muy diferente a una que necesita obras. El estado influye directamente en lo que un comprador está dispuesto a pagar.',
          'Altura y luminosidad: los pisos altos, exteriores y bien orientados se valoran más. La luz natural y las vistas son factores que el comprador nota desde el primer momento.',
          'Edificio y elementos comúnes: el estado del portal, la existencia de ascensor, la antigüedad de las instalaciones y la comúnidad de vecinos son aspectos que también pesan en la valoración.',
          'Demanda del mercado: en un momento de alta demanda y poca oferta, los precios suben. Cuando hay mucha oferta y la demanda se frena, los precios se ajustan. Entender está dinámica es clave.',
        ]} />

        <H2>El error más común al valorar un piso</H2>
        <P>
          Muchos propietarios valoran su vivienda comparando solo con los anuncios que ven publicados en los portales inmobiliarios. Es comprensible, porque es lo más accesible. Pero esos precios son precios de salida, no precios de venta. Es decir, reflejan lo que alguien pide, no lo que alguien ha pagado.
        </P>
        <Quote>
          La diferencia entre el precio de anuncio y el precio real de venta puede ser significativa. Basar tu estrategia solo en precios publicados puede llevar a decisiones equivocadas.
        </Quote>

        <H2>La diferencia entre precio de anuncio y precio de venta</H2>
        <P>
          Cuando un propietario pone un piso a la venta, fija un precio inicial. Si el precio está ajustado al mercado, recibe visitas e interés. Si el precio está por encima del mercado, recibe visitas pero no ofertas. Con el tiempo, el precio se ajusta — a veces una o varias veces — hasta que se acerca al valor que el mercado realmente está dispuesto a pagar.
        </P>
        <P>
          Este proceso puede durar semanas o meses, y mientras tanto la vivienda pierde frescura en los portales. Los compradores que la vieron al principio ya no vuelven, y los nuevos la perciben como una vivienda que "no se vende".
        </P>

        <H2>Es fiable comparar precios en Idealista o Fotocasa?</H2>
        <P>
          Los portales inmobiliarios son una herramienta útil para hacerse una idea general, pero no reflejan la realidad del mercado. Los precios publicados no coinciden con los precios finales de venta. No se tiene en cuenta el estado real de cada vivienda, ni las condiciones de la operación. Además, hay viviendas que se venden sin pasar por portales, y otras que permanecen meses publicadas porque estan fuera de mercado.
        </P>

        <H2>Como analizar el mercado inmobiliario en L'Hospitalet</H2>
        <P>
          Para entender realmente cuánto vale tu piso, es necesario analizar datos reales del mercado:
        </P>
        <UL items={[
          'Viviendas vendidas recientemente en tu zona, no solo las que estan en venta.',
          'Precios medios por zona, ajustados al tipo de vivienda y estado.',
          'Tipologias con más demanda: que buscan los compradores activos en tu barrio.',
          'Comportamiento del mercado: si los precios estan subiendo, estabilizados o bajando.',
        ]} />

        <H2>Antes de vender, conviene entender la estrategia</H2>
        <P>
          Saber cuánto vale tu piso no es solo un número. Es entender qué tipo de comprador puede estar interesado, a que precio tiene sentido salir al mercado y cual es la mejor estrategia para conseguir una venta en buenas condiciones.
        </P>
        <P>
          En PropiHouse analizamos cada propiedad teniendo en cuenta el mercado real, la tipología, el perfil de comprador y las condiciones actuales. No damos un número al azar: explicamos por que tu vivienda vale lo que vale y como podemos ayudarte a conseguir el mejor resultado posible.
        </P>
        <ArticleLink to="/entender-mi-situacion">Entender mi situación y el valor de mi vivienda</ArticleLink>
      </>
    ),
    faqs: [
      {
        q: 'Cuánto cuestá hacer una tasación de un piso?',
        a: 'Una tasación oficial realizada por una sociedad de tasación homologada suele costar entre 300 y 500 euros, dependiendo de la vivienda y la empresa. Es un requisito habitual cuando se solicita una hipoteca. Sin embargo, una valoración inmobiliaria orientativa — como la que hacemos en PropiHouse — no tiene coste.',
      },
      {
        q: 'Es lo mismo una tasación bancaria que una valoración inmobiliaria?',
        a: 'No. La tasación bancaria es un informe oficial con valor legal, utilizado por los bancos para conceder hipotecas. La valoración inmobiliaria es un analisis de mercado que tiene en cuenta la demanda, la oferta, el estado de la vivienda y las ventas recientes. Ambas son útiles, pero sirven para cosas diferentes.',
      },
      {
        q: 'Puedo saber cuánto vale mi piso sin querer venderlo?',
        a: 'Por supuesto. Muchos propietarios quieren conocer el valor de su vivienda simplemente para tener información actualizada, sin intención inmediata de vender. Es una consulta muy habitual y perfectamente razonable.',
      },
    ],
    related: ['errores-vender-vivienda', 'buen-momento-vender', 'impuestos-vender'],
  },

  /* ── 2. Errores al vender ── */
  'errores-vender-vivienda': {
    slug: 'errores-vender-vivienda',
    title: 'Los errores más comúnes al vender una vivienda en L\'Hospitalet de Llobregat',
    category: 'Errores habituales',
    readingTime: '7 min',
    body: () => (
      <>
        <P>
          Vender una vivienda es una de las decisiones económicas más importantes que puedes tomar. Sin embargo, muchos propietarios cometen errores que podrían evitarse con un poco de información y una buena estrategia. Estos son los cinco errores más habituales que vemos en L'Hospitalet de Llobregat.
        </P>

        <H2>1. Fijar el precio basándose solo en anuncios de internet</H2>
        <P>
          Es el error más frecuente. Muchos propietarios miran lo que piden otros vendedores en los portales y fijan su precio en función de eso. Pero los precios publicados son precios de salida, no de cierre. No reflejan lo que realmente se ha pagado por una vivienda. Un piso puede estar anunciado a un precio durante meses sin recibir ninguna oferta, y eso no aparece en el portal.
        </P>
        <P>
          Para fijar un precio realista, es necesario analizar ventas reales recientes en la misma zona, tener en cuenta el estado de la vivienda y entender la demanda actual.
        </P>

        <H2>2. Pensar que más visitas significa vender mejor</H2>
        <P>
          Hay quien cree que cuantas más visitas reciba, mejor irá la venta. Pero un volumen alto de visitas sin ofertas es, en realidad, una señal de que algo no funciona. Puede ser el precio, la presentación o las expectativas que genera el anuncio.
        </P>
        <P>
          Lo importante no es la cantidad de visitas, sino la calidad: atraer al perfil de comprador adecuado con información clara y expectativas realistas.
        </P>

        <H2>3. No escuchar lo que opinan los compradores</H2>
        <P>
          Cuando un comprador visita una vivienda y no hace una oferta, suele haber una razon. Quiza el precio le parece alto, quiza la vivienda no le transmite lo que esperaba, quiza hay algún detalle que le genera dudas.
        </P>
        <P>
          Escuchar las impresiónes de los compradores — especialmente los que no hacen oferta — es una fuente de información muy valiosa. Permite ajustar la estrategia a tiempo y evitar que la vivienda permanezca meses sin venderse.
        </P>

        <H2>4. Intentar esconder los puntos débiles de la vivienda</H2>
        <P>
          Todas las viviendas tienen puntos fuertes y puntos débiles. Intentar disimular u ocultar los aspectos menos atractivos puede generar desconfianza en el comprador. Y la desconfianza mata operaciones.
        </P>
        <P>
          Es mejor ser transparente, reconocer las limitaciones de la vivienda y poner en valor lo que realmente ofrece. Un comprador que compra con información clara es un comprador que cierra la operación con seguridad.
        </P>

        <H2>5. No tener una estrategia clara desde el principio</H2>
        <P>
          Vender sin un plan es como salir a navegar sin rumbo. Muchos propietarios publican su vivienda sin haber pensado en el precio adecuado, la presentación, el tipo de comprador al que se dirigen ni los pasos legales y fiscales que implica la venta.
        </P>
        <P>
          Una estrategia clara desde el principio permite evitar errores, ahorrar tiempo y conseguir un mejor resultado. Eso incluye entender el mercado, preparar la vivienda, definir un precio con criterio y saber como gestionar las visitas y las ofertas.
        </P>
        <Quote>
          Vender bien no es cuestión de suerte. Es cuestión de preparación, estrategia y conocimiento del mercado.
        </Quote>
        <ArticleLink to="/guia/preparar-vivienda-vender">Cómo preparar tu vivienda antes de venderla</ArticleLink>
      </>
    ),
    faqs: [
      {
        q: 'Es mejor vender con una inmobiliaria o por mi cuenta?',
        a: 'Depende de tu situación. Vender por cuenta propia puede ahorrarte la comisión, pero también implica gestionar visitas, negociaciones, documentación legal y aspectos fiscales. Una inmobiliaria con experiencia en la zona puede ayudarte a fijar el precio correcto, llegar a más compradores y evitar errores que pueden salir mucho más caros que la comisión.',
      },
      {
        q: 'Cuánto tarda normalmente en venderse un piso?',
        a: 'En L\'Hospitalet de Llobregat, una vivienda bien posicionada en precio y presentación puede venderse en pocas semanas. Pero si el precio está por encima del mercado o la estrategia no es la adecuada, puede tardar meses. El factor que más influye en el tiempo de venta es el precio de salida.',
      },
      {
        q: 'Como se si el precio de mi piso es correcto?',
        a: 'Un precio correcto se basa en ventas reales recientes en tu zona, no en precios de anuncios. Tambien tiene en cuenta el estado de la vivienda, la demanda del momento y el tipo de comprador. Si tras varias visitas no recibes ninguna oferta, es muy probable que el precio este por encima del mercado.',
      },
    ],
    related: ['cuanto-vale-piso-hospitalet', 'cuanto-tarda-vender-piso', 'preparar-vivienda-vender'],
  },

  /* ── 3. Cuánto tarda vender ── */
  'cuanto-tarda-vender-piso': {
    slug: 'cuanto-tarda-vender-piso',
    title: 'Cuánto tarda vender un piso en L\'Hospitalet de Llobregat?',
    category: 'Tiempos del mercado',
    readingTime: '6 min',
    body: () => (
      <>
        <P>
          Una de las preguntas más habituales de los propietarios que quieren vender es: "Cuánto tiempo voy a tardar?" La respuestá depende de varios factores, pero hay uno que destaca por encima de todos: el precio de salida.
        </P>

        <H2>El precio de salida es el factor que más influye</H2>
        <P>
          Un piso que sale al mercado con un precio ajustado a la realidad genera interés desde el primer dia. Aparece en las búsquedas de los compradores activos, recibe visitas de personas realmente interesadas y, con frecuencia, recibe ofertas en poco tiempo.
        </P>
        <P>
          En cambio, un piso que sale con un precio por encima del mercado puede pasar semanas o meses sin generar ofertas. Y cuanto más tiempo pasa publicado, más pierde credibilidad. Los compradores lo perciben como un piso que "no se vende" y dejan de prestarle atención.
        </P>

        <H2>La demanda en la zona también influye</H2>
        <P>
          No todos los barrios de L'Hospitalet tienen la misma dinámica. Hay zonas con alta demanda donde los pisos se venden rápido, y otras donde el proceso es más lento. Conocer la demanda real de tu barrio es fundamental para fijar expectativas realistas.
        </P>
        <P>
          Factores como la proximidad al metro, los servicios disponibles, la oferta educativa y la calidad del entorno influyen en lo rápido que se mueve el mercado en cada zona.
        </P>

        <H2>La presentación de la vivienda marca la diferencia</H2>
        <P>
          Una vivienda ordenada, limpia, luminosa y bien presentada genera una primera impresión mucho más positiva. Los compradores deciden en los primeros minutos de visita si una vivienda les interesa o no. Cuidar la presentación no significa hacer una gran reforma, sino asegurar que el piso transmite lo mejor de si mismo.
        </P>
        <ArticleLink to="/guia/preparar-vivienda-vender">Cómo preparar tu vivienda antes de venderla</ArticleLink>

        <H2>Escuchar las visitas ayuda a ajustar a tiempo</H2>
        <P>
          Si después de varias visitas no llegan ofertas, algo está pasando. Puede ser el precio, puede ser la presentación, puede ser un detalle concreto que genera dudas. Escuchar lo que dicen los compradores — y lo que no dicen — permite ajustar la estrategia a tiempo, antes de que la vivienda se "queme" en el mercado.
        </P>

        <H2>Entonces, cuánto tarda realmente?</H2>
        <P>
          Una vivienda bien posicionada en precio, bien presentada y con una estrategia clara puede venderse en pocas semanas en L'Hospitalet de Llobregat. Si el precio no es el adecuado, el proceso puede alargarse meses.
        </P>
        <P>
          Lo más importante no es tener prisa, sino tener claridad. Entender el mercado, fijar un precio con criterio y estar preparado para escuchar y ajustar si hace falta.
        </P>
        <Quote>
          El tiempo de venta no depende de la suerte. Depende de la estrategia.
        </Quote>
      </>
    ),
    faqs: [
      {
        q: 'Es normal que un piso tarde meses en venderse?',
        a: 'Puede pasar, pero no deberia ser lo habitual si la estrategia es correcta. Un tiempo excesivo en el mercado suele indicar que el precio de salida está por encima de lo que los compradores estan dispuestos a pagar, o que la presentación no es la adecuada.',
      },
      {
        q: 'Influye el barrio en el tiempo de venta?',
        a: 'Si, mucho. Hay barrios en L\'Hospitalet con una demanda muy alta donde los pisos se venden en pocas semanas, y otros donde el proceso puede ser más lento. Conocer la dinámica de tu barrio es clave para fijar expectativas realistas.',
      },
      {
        q: 'Una buena estrategia de venta puede reducir el tiempo?',
        a: 'Sin duda. Un precio ajustado, una buena presentación, fotografias profesionales y una difusion adecuada son factores que aceleran la venta. Tambien es importante saber interpretar las visitas y ajustar si es necesario.',
      },
    ],
    related: ['errores-vender-vivienda', 'cuanto-vale-piso-hospitalet', 'buen-momento-vender'],
  },

  /* ── 4. Cuánto dinero para comprar ── */
  'cuanto-dinero-comprar-vivienda': {
    slug: 'cuanto-dinero-comprar-vivienda',
    title: 'Cuánto dinero necesito para comprar una vivienda en L\'Hospitalet de Llobregat?',
    category: 'Presupuesto de compra',
    readingTime: '7 min',
    body: () => (
      <>
        <P>
          Comprar una vivienda es probablemente la decisión económica más importante que tomarás. Y una de las primeras preguntas que surge es: cuánto dinero necesito realmente? No solo el precio de la vivienda, sino todo lo que implica la operación.
        </P>

        <H2>El ahorro inicial qué necesitas</H2>
        <P>
          La mayoría de los bancos financian hasta un 80% del valor de tasación de la vivienda. Eso significa qué necesitas tener ahorrado al menos el 20% restante, más los gastos asociados a la compra. En la práctica, para una vivienda de 200.000 euros, necesitaras entre 40.000 y 50.000 euros de ahorro propio.
        </P>
        <P>
          Este es el punto que más sorprende a muchos compradores: no basta con tener para la entrada, también hay que cubrir una serie de gastos obligatorios.
        </P>

        <H2>Gastos de compra en Cataluña</H2>
        <P>
          Además de la entrada, al comprar una vivienda en Cataluña debes contar con los siguientes gastos:
        </P>
        <UL items={[
          'Impuesto de Transmisiones Patrimoniales (ITP): en Cataluña es del 10% para viviendas de segúnda mano. Es el gasto más importante.',
          'Notaría: los honorarios notaríales dependen del precio de la vivienda, pero suelen rondar entre 600 y 1.000 euros.',
          'Registro de la Propiedad: la inscripcion de la compra tiene un coste similar al de la notaría.',
          'Gestoría: se encarga de tramitar la liquidacion de impuestos y la inscripcion. Suele costar entre 300 y 500 euros.',
          'Tasacion: necesaria si solicitas hipoteca. El coste está entre 300 y 500 euros.',
          'Gastos de hipoteca: apertura, comisiones y otros gastos bancarios, aunque desde la Ley Hipotecaria de 2019 muchos los asume el banco.',
        ]} />
        <P>
          En total, los gastos de compra suelen representar entre el 10% y el 12% del precio de la vivienda.
        </P>

        <H2>La importancia de entender tu capacidad de financiación</H2>
        <P>
          Antes de empezar a buscar vivienda, es fundamental saber cuánto puedes permitirte. Esto depende de varios factores:
        </P>
        <UL items={[
          'Ingresos mensuales netos: los bancos aplican la regla general de que la cuota hipotecaria no deberia superar el 30-35% de tus ingresos.',
          'Estabilidad laboral: un contrato indefinido, la antigüedad y el sector en el que trabajas influyen en lo que el banco está dispuesto a ofrecerte.',
          'Nivel de endeudamiento actual: si ya tienes prestamos, el banco los tendra en cuenta al calcular tu capacidad.',
          'Ahorro disponible: cuanto más ahorro aportes, mejores condiciones podrás negociar.',
          'Situación personal: si compras en pareja, los ingresos conjuntos y la situación de ambos son relevantes.',
        ]} />

        <H2>Es posible comprar con menos ahorro?</H2>
        <P>
          En algunos casos, es posible obtener financiación superior al 80%. Depende del perfil del comprador, del tipo de vivienda y de la entidad bancaria. Pero no es lo habitual, y las condiciones suelen ser más exigentes.
        </P>
        <P>
          Tambien existen ayudas públicas y programas específicos para determinados colectivos — como jóvenes menores de 35 años — que pueden facilitar el acceso a la vivienda con menos ahorro inicial.
        </P>

        <H2>Empieza la búsqueda con claridad</H2>
        <P>
          El error más habitual es empezar a visitar viviendas sin saber realmente cuánto puedes gastar. Eso lleva a frustraciones, a enamorarse de viviendas inalcanzables o a tomar decisiones precipitadas.
        </P>
        <P>
          Lo más inteligente es entender primero tu situación financiera: cuanto tienes ahorrado, cuánto puedes pagar al mes y que tipo de hipoteca puedes conseguir. A partir de ahi, la búsqueda se convierte en un proceso mucho más eficiente y realista.
        </P>
        <ArticleLink to="/guia/errores-comprar-vivienda">Errores habituales al comprar una vivienda</ArticleLink>
      </>
    ),
    faqs: [
      {
        q: 'Cuanto ahorro es recomendable para comprar una vivienda?',
        a: 'Como regla general, se recomienda tener ahorrado al menos el 30% del precio de la vivienda: un 20% para la entrada y un 10% para gastos. Para una vivienda de 200.000 euros, eso supone unos 60.000 euros.',
      },
      {
        q: 'Es posible comprar con poco ahorro?',
        a: 'En algunos casos, si. Hay entidades que financian más del 80%, especialmente para perfiles con ingresos estables y buen historial crediticio. Tambien hay programas de ayuda publica. Pero lo habitual es necesitar al menos el 20% de entrada más gastos.',
      },
      {
        q: 'Es mejor saber cuánto me daran de hipoteca antes de buscar vivienda?',
        a: 'Absolutamente. Conocer tu capacidad de financiación antes de empezar a buscar te permite centrar la búsqueda en viviendas que realmente puedes comprar. Evita frustraciones y te da seguridad a la hora de hacer una oferta.',
      },
    ],
    related: ['errores-comprar-vivienda', 'comprar-o-vender-primero', 'impuestos-vender'],
  },

  /* ── 5. Preparar vivienda ── */
  'preparar-vivienda-vender': {
    slug: 'preparar-vivienda-vender',
    title: 'Cómo preparar una vivienda antes de venderla en L\'Hospitalet de Llobregat',
    category: 'Preparar la vivienda',
    readingTime: '6 min',
    body: () => (
      <>
        <P>
          La forma en que un comprador percibe tu vivienda durante los primeros minutos de visita puede determinar si hace una oferta o no. Preparar tu piso antes de venderlo no significa reformarlo por completo, sino presentarlo de la mejor forma posible para que transmita su potencial.
        </P>

        <H2>Entender como percibe tu vivienda el comprador</H2>
        <P>
          Cuando un comprador visita una vivienda, no ve lo mismo que tu. Tu ves tu hogar, con recuerdos y costumbres. El comprador ve un espacio que tiene que imaginar como suyo. Todo lo que le dificulte esa proyeccion — desorden, personalizacion excesiva, falta de luz — juega en tu contra.
        </P>
        <P>
          La clave es crear un entorno neutro, limpio y luminoso donde el comprador pueda verse viviendo.
        </P>

        <H2>Pequeños cambios que marcan la diferencia</H2>
        <P>
          No hace falta una gran inversión para mejorar la presentación de tu vivienda. Hay cambios sencillos y económicos que pueden tener un impacto enorme:
        </P>
        <UL items={[
          'Iluminacion: abre todas las persianas, enciende las luces, sustituye bombillas fundidas. La luz es el factor número uno en la percepción de un espacio.',
          'Orden y limpieza: retirá objetos personales, despeja superficies, organiza armarios. Un piso ordenado parece más grande y más cuidado.',
          'Pequeño mantenimiento: arregla grifos que gotean, puertas que chirrían, enchufes que no funcionan. Los detalles importan porque generan confianza o desconfianza.',
          'Mobiliario: si el piso está muy cargado de muebles, retirar algunos puede hacer que los espacios respiren y se vean más amplios.',
        ]} />

        <H2>Detecta los puntos fuertes de tu vivienda</H2>
        <P>
          Toda vivienda tiene algo que la hace atractiva. Puede ser la luminosidad, la distribución, una terraza, la orientación, la ubicación o la tranquilidad. Identificar esos puntos fuertes y asegurarse de que el comprador los percibe es parte de la preparación.
        </P>
        <P>
          Si tu piso tiene buena luz, asegurate de que nada la bloquea. Si tiene una buena distribución, que los muebles no la oculten. Si tiene terraza, que este limpia y presentable.
        </P>

        <H2>Entiende también los puntos débiles</H2>
        <P>
          Igual que conoces los puntos fuertes, es importante ser consciente de las limitaciones. Un piso interior, una cocina antigua, un bano pequeño... son aspectos que el comprador va a notar. No se trata de ocultarlos — eso genera desconfianza — sino de tener una estrategia para gestionarlos.
        </P>
        <P>
          En algunos casos, una pequeña mejora puede minimizar el impacto de un punto debil. En otros, basta con ajustar el precio o la comunicación para que el comprador lo entienda y lo acepte.
        </P>

        <H2>Preparar la vivienda forma parte de la estrategia</H2>
        <P>
          La presentación de una vivienda no es un paso cosmético. Es parte de la estrategia de venta. Una vivienda bien preparada se vende más rápido, genera mejores ofertas y transmite profesionalidad.
        </P>
        <P>
          En PropiHouse, antes de poner una vivienda a la venta, la analizamos junto al propietario para identificar qué mejoras conviene hacer, que puntos fuertes potenciar y como presentarla de la forma más atractiva posible.
        </P>
        <ArticleLink to="/guia/errores-vender-vivienda">Errores habituales que conviene evitar al vender</ArticleLink>
      </>
    ),
    faqs: [
      {
        q: 'Es necesario reformar la vivienda antes de venderla?',
        a: 'No siempre. Depende del estado de la vivienda y del tipo de comprador al que te diriges. En muchos casos, pequeños cambios de presentación, limpieza y orden son suficientes. Una reforma solo tiene sentido si va a suponer un retorno claro en el precio de venta.',
      },
      {
        q: 'Influye la presentación en el precio que puedo conseguir?',
        a: 'Si, directamente. Una vivienda bien presentada genera una primera impresión más positiva, atrae a más compradores y suele recibir mejores ofertas. Los compradores estan dispuestos a pagar más por un piso que les transmite confianza y les permite proyectarse.',
      },
      {
        q: 'Cómo puedo saber si mi vivienda necesita algún cambio antes de venderla?',
        a: 'Lo mejor es que alguien con experiencia la vea con ojos de comprador. Nosotros hacemos esa valoración como parte de nuestro servicio: analizamos la vivienda, identificamos que conviene mejorar y damos recomendaciones concretas y realistas.',
      },
    ],
    related: ['errores-vender-vivienda', 'cuanto-vale-piso-hospitalet', 'cuanto-tarda-vender-piso'],
  },

  /* ── 6. Herencia, divorcio, cambio de vida ── */
  'herencia-divorcio-cambio-vida': {
    slug: 'herencia-divorcio-cambio-vida',
    title: 'Qué hacer con una vivienda tras una herencia, un divorcio o un cambio de vida',
    category: 'Situaciones personales',
    readingTime: '8 min',
    body: () => (
      <>
        <P>
          No siempre la decisión de vender una vivienda nace de una planificación tranquila. A veces, la vida te pone en una situación en la que tienes que decidir qué hacer con una propiedad sin haberlo buscado: una herencia, una separación o un cambio en tu vida personal.
        </P>

        <H2>Cuando recibes una vivienda por herencia</H2>
        <P>
          Heredar una vivienda puede parecer una buena noticia, pero también plantea preguntas importantes. Qué hago con ella? La vendo, la alquilo, me quedo con ella? Y si hay más herederos?
        </P>
        <P>
          Lo primero es entender qué opciones tienes y qué implica cada una:
        </P>
        <UL items={[
          'Vender la vivienda: es la opción más habitual cuando los herederos no necesitan la vivienda o cuando necesitan liquidez. Implica aceptar la herencia, liquidar el impuesto de sucesiones, inscribir la vivienda a nombre de los herederos y después vender.',
          'Mantener la vivienda: tiene sentido si quieres usarla o alquilarla. Pero implica asumir los gastos de mantenimiento, comúnidad, IBI y posibles reparaciones.',
          'Conocer el valor real: antes de tomar cualquier decisión, necesitas saber cuánto vale la vivienda en el mercado actual. No lo que se pago hace años ni lo que crees que vale, sino lo que realmente pagaria un comprador hoy.',
          'Coordinar con otros herederos: si hay varios propietarios, todas las decisiones deben tomarse de forma conjunta. Esto puede generar conflictos, por lo que conviene asesorarse bien desde el principio.',
        ]} />

        <H2>Cuando una separación te obliga a decidir</H2>
        <P>
          En una separación o divorcio, la vivienda familiar suele ser uno de los temas más delicados. Las opciones más habituales son:
        </P>
        <UL items={[
          'Vender y repartir: es la solución más limpia. Se vende la vivienda, se liquida la hipoteca si la hay y se reparte el resultado.',
          'Una parte compra la otra: uno de los dos se queda con la vivienda y compensa económicamente al otro. Requiere una valoración justa y, en muchos casos, un nuevo acuerdo hipotecario.',
          'Alquilar temporalmente: en algunos casos, se opta por alquilar la vivienda hasta que la situación se estabilice. Es una solución intermedia que puede funcionar, pero requiere acuerdo entre ambas partes.',
        ]} />
        <P>
          En cualquier caso, tomar decisiones con información real — no con emociones — es clave para llegar a un acuerdo justo.
        </P>

        <H2>Cuando tu vivienda ya no encaja con tu vida</H2>
        <P>
          A veces no hay ni herencia ni separación. Simplemente, tu vida ha cambiado. La familia ha crecido y el piso se queda pequeño. Los hijos se han ido y el piso es demasiado grande. Has cambiado de ciudad por trabajo. Te jubilas y quieres vivir en otro sitio.
        </P>
        <P>
          En estos casos, vender la vivienda actual para comprar otra más adecuada es una decisión lógica. Pero implica coordinar dos operaciones — venta y compra — y eso requiere planificación.
        </P>
        <ArticleLink to="/guia/comprar-o-vender-primero">Comprar primero o vender antes?</ArticleLink>

        <H2>Entender primero, decidir después</H2>
        <P>
          Lo que tienen en común todas estás situaciones es que requieren información antes de decidir. Cuánto vale la vivienda? Que gastos e impuestos implica vender? Cuánto tiempo puede tardar? Qué opciones tengo realmente?
        </P>
        <P>
          En PropiHouse, entendemos que detrás de cada vivienda hay una historia y unas circunstancias personales. Por eso, nuestro primer paso siempre es escuchar y entender tu situación antes de proponer nada.
        </P>
      </>
    ),
    faqs: [
      {
        q: 'Si heredo una vivienda con varios propietarios, qué opciones tengo?',
        a: 'Lo ideal es llegar a un acuerdo entre todos los herederos. Las opciones más habituales son vender y repartir el resultado, que uno de los herederos compre la parte de los demas, o mantener la vivienda en copropiedad y alquilarla. Si no hay acuerdo, existe la posibilidad legal de solicitar la division judicial, pero es un proceso lento y costoso.',
      },
      {
        q: 'Puedo vender una vivienda heredada inmediatamente?',
        a: 'No inmediatamente. Primero hay que aceptar la herencia, liquidar el impuesto de sucesiones y registrar la vivienda a nombre de los herederos. Solo entonces se puede vender. El proceso puede tardar semanas o meses, dependiendo de la complejidad del caso.',
      },
      {
        q: 'En caso de divorcio, quien decide qué hacer con la vivienda?',
        a: 'Depende del acuerdo entre las partes. Si es un divorcio de mutuo acuerdo, se negocia como parte del convenio regulador. Si no hay acuerdo, sera el juez quien decida. En cualquier caso, contar con una valoración profesional de la vivienda facilita enormemente la negociación.',
      },
      {
        q: 'Conviene vender la vivienda o mantenerla y alquilar?',
        a: 'Depende de tu situación financiera, tus necesidades de liquidez y el estado de la vivienda. Alquilar puede generar ingresos recurrentes, pero también implica gastos de mantenimiento y gestión. Vender te da liquidez inmediata. No hay una respuestá universal: depende de cada caso.',
      },
    ],
    related: ['comprar-o-vender-primero', 'impuestos-vender', 'buen-momento-vender'],
  },

  /* ── 7. Comprar o vender primero ── */
  'comprar-o-vender-primero': {
    slug: 'comprar-o-vender-primero',
    title: 'Comprar primero o vender antes? Cómo tomar la decisión correcta',
    category: 'Decisiones estratégicas',
    readingTime: '7 min',
    body: () => (
      <>
        <P>
          Si tienes una vivienda y quieres cambiar a otra, te enfrentas a una de las decisiones más delicadas del proceso inmobiliario: vendo primero y luego compro? O compro primero para no quedarme sin casa? No hay una respuestá única, pero entender las implicaciones de cada opción te ayudará a decidir con criterio.
        </P>

        <H2>Vender primero: seguridad económica</H2>
        <P>
          La principal ventaja de vender antes de comprar es que sabes exactamente con cuánto dinero cuentas. Conoces el resultado de la venta, puedes liquidar tu hipoteca si la tienes y partes de una posicion financiera clara.
        </P>
        <P>
          El inconveniente es que, una vez vendida tu vivienda, necesitas encontrar una nueva en un plazo razonable. Eso puede generar presion, especialmente si el mercado está activo y hay poca oferta en la zona que te interesa.
        </P>
        <P>
          En algunos casos, es posible negociar con el comprador un plazo más amplio para la entrega de llaves, lo que te da un margen extra para encontrar tu nueva vivienda.
        </P>

        <H2>Comprar primero: asegurar tu nueva vivienda</H2>
        <P>
          Si encuentras la vivienda perfecta y no quieres perderla, puedes optar por comprar antes de vender. Pero esto implica financiar dos viviendas simultáneamente — al menos temporalmente — y eso no siempre es posible ni recomendable.
        </P>
        <P>
          Necesitas tener claro que tu capacidad financiera lo permite, que el banco está dispuesto a concederte la financiación necesaria y que tienes un plan realista para vender tu vivienda actual en un plazo razonable.
        </P>

        <H2>Conocer el valor real de tu vivienda actual</H2>
        <P>
          Sea cual sea el camino que elijas, lo primero es saber cuánto vale tu vivienda. Si no conoces el precio real de venta, no puedes planificar la compra de la nueva. Y si sobrevaloras tu piso, puedes encontrarte con un desfase entre lo que esperas recibir y lo que el mercado realmente te ofrece.
        </P>
        <ArticleLink to="/guia/cuanto-vale-piso-hospitalet">Cómo saber cuánto vale tu piso</ArticleLink>

        <H2>El tiempo de venta influye en tu decisión</H2>
        <P>
          Si tu vivienda está en una zona con alta demanda y al precio correcto, probablemente se venda rápido. Eso te da más flexibilidad para coordinar ambas operaciones. Pero si la venta puede tardar, necesitas un plan B.
        </P>
        <P>
          Conocer el tiempo medio de venta en tu barrio y tener expectativas realistas es fundamental para planificar bien.
        </P>

        <H2>La tercera opción: coordinar ambas operaciones</H2>
        <P>
          En muchos casos, la mejor solución no es ni vender primero ni comprar primero, sino coordinar ambas operaciones. Esto requiere experiencia, planificación y capacidad de negociación, pero es perfectamente posible.
        </P>
        <UL items={[
          'Negociar plazos: se pueden acordar plazos de entrega tanto en la venta como en la compra para que coincidan.',
          'Contratos de arras: las arras permiten reservar una vivienda mientras se cierra la venta de la tuya, dando un marco legal a ambas operaciones.',
          'Financiacion puente: algunos bancos ofrecen hipotecas puente que te permiten financiar la compra antes de que se formalice la venta.',
        ]} />

        <H2>Cada situación es diferente</H2>
        <P>
          No hay una receta universal. La mejor opción depende de tu situación financiera, de la demanda en tu zona, del mercado en general y de tus prioridades personales. Lo importante es tomar la decisión con información real, no con suposiciones.
        </P>
        <P>
          En PropiHouse, analizamos cada caso de forma individual. Estudiamos tu vivienda actual, tu capacidad financiera y el mercado para ayudarte a elegir el camino que mejor se adapta a tu situación.
        </P>
      </>
    ),
    faqs: [
      {
        q: 'Es mejor vender primero mi vivienda?',
        a: 'Vender primero te da seguridad económica: sabes con cuánto dinero cuentas. Pero implica buscar una nueva vivienda con cierta urgencia. Es la opción más segura desde el punto de vista financiero, especialmente si no tienes capacidad para mantener dos viviendas a la vez.',
      },
      {
        q: 'Puedo comprar una vivienda antes de haber vendido la mia?',
        a: 'Si, pero necesitas tener capacidad financiera para asumir dos operaciones simultáneamente. Algunos bancos ofrecen hipotecas puente para estos casos. Es importante analizar bien los números antes de dar el paso.',
      },
      {
        q: 'Se pueden coordinar la venta y la compra a la vez?',
        a: 'Si, y es la opción más habitual. Con buena planificación, se pueden negociar plazos en ambas operaciones para que coincidan. Es lo que hacemos habitualmente con nuestros clientes, coordinando tiempos, contratos y financiación.',
      },
    ],
    related: ['cuanto-vale-piso-hospitalet', 'herencia-divorcio-cambio-vida', 'cuanto-dinero-comprar-vivienda'],
  },

  /* ── 8. Buen momento para vender ── */
  'buen-momento-vender': {
    slug: 'buen-momento-vender',
    title: 'Es buen momento para vender una vivienda en L\'Hospitalet de Llobregat?',
    category: 'Mercado inmobiliario',
    readingTime: '6 min',
    body: () => (
      <>
        <P>
          Es una de las preguntas que más nos hacen: "Es buen momento para vender?" La respuestá corta es que depende. No del momento del ano ni de las noticias, sino de tu situación personal y de las condiciones reales del mercado en tu zona.
        </P>

        <H2>El mercado no es igual en todos los momentos</H2>
        <P>
          El mercado inmobiliario está influenciado por muchos factores que cambian con el tiempo:
        </P>
        <UL items={[
          'Condiciones de financiación: cuando los tipos de interés son bajos, más compradores pueden acceder a hipotecas y la demanda crece. Cuando suben, la capacidad de compra se reduce.',
          'Tipos de interes: tienen un impacto directo en las cuotas hipotecarias y, por tanto, en lo que los compradores pueden pagar.',
          'Oferta disponible: si hay pocas viviendas en venta en tu zona, tienes más capacidad de negociación. Si hay mucha oferta, la competencia entre vendedores aumenta.',
        ]} />
        <P>
          Estos factores crean un contexto general, pero lo que realmente importa es como se traduce ese contexto en tu barrio y para tu vivienda concreta.
        </P>

        <H2>El valor real de tu vivienda es clave</H2>
        <P>
          Independientemente del momento del mercado, lo más importante es conocer el valor real de tu vivienda. Un piso bien posicionado en precio se vende bien en cualquier contexto. Un piso sobrevalorado no se vende ni en el mejor momento del mercado.
        </P>
        <P>
          Muchos propietarios esperan a que "el mercado suba" para vender. Pero si el precio ya está por encima de lo que el mercado acepta, esperar no cambia nada. Y mientras esperas, asumes costes de mantenimiento, comúnidad e impuestos.
        </P>

        <H2>La demanda en tu barrio influye más de lo que crees</H2>
        <P>
          En L'Hospitalet de Llobregat, la demanda varia mucho de un barrio a otro. Hay zonas donde la demanda supera la oferta y los pisos se venden rápido. Hay otras donde el proceso es más lento. Conocer la dinámica de tu barrio es más útil que seguir las noticias generales sobre el mercado inmobiliario.
        </P>

        <H2>Tu momento personal importa</H2>
        <P>
          El "mejor momento" para vender no siempre es un momento del mercado. A menudo es un momento de tu vida:
        </P>
        <UL items={[
          'Has recibido una herencia y necesitas tomar una decisión sobre la vivienda.',
          'Estas pasando por una separación y hay que resolver la situación de la vivienda familiar.',
          'Tu familia ha crecido o tus circunstancias han cambiado y necesitas otra vivienda.',
          'Quieres iniciar una nueva etapa en otro lugar o simplemente necesitas liquidez.',
        ]} />
        <P>
          En todos estos casos, el momento personal es el que manda. Y tener información real sobre el mercado te permite tomar la decisión con criterio.
        </P>

        <H2>Vender empieza por entender tu situación</H2>
        <P>
          Antes de decidir si es buen momento, necesitas saber cuánto vale tu vivienda en el mercado actual, cuánto tardaras en venderla, qué gastos e impuestos tendrás y qué opciones tienes según tu situación personal.
        </P>
        <P>
          En PropiHouse te ayudamos a responder todas estás preguntas antes de dar ningún paso. Sin presion, sin compromiso. Porque entender tu situación es siempre el mejor primer paso.
        </P>
        <ArticleLink to="/entender-mi-situacion">Entender mi situación</ArticleLink>
      </>
    ),
    faqs: [
      {
        q: 'Cómo puedo saber si es buen momento para vender mi piso?',
        a: 'El mejor indicador no es el momento del mercado en general, sino la demanda real en tu zona, el valor actual de tu vivienda y tu situación personal. Un piso bien posicionado en precio se vende bien en casí cualquier contexto.',
      },
      {
        q: 'Influye mucho el barrio en la facilidad de venta?',
        a: 'Si, enormemente. Dentro de L\'Hospitalet hay barrios con mucha demanda donde los pisos se venden en pocas semanas, y otros donde el proceso puede ser más lento. Conocer la dinámica de tu barrio es fundamental.',
      },
      {
        q: 'Es mejor esperar a que suban los precios para vender?',
        a: 'No necesariamente. Si tu vivienda ya tiene un buen posicionamiento en precio y hay demanda, esperar puede suponer costes innecesarios de mantenimiento e impuestos. Además, nadie puede garantizar que los precios vayan a subir.',
      },
    ],
    related: ['cuanto-vale-piso-hospitalet', 'cuanto-tarda-vender-piso', 'impuestos-vender'],
  },

  /* ── 9. Errores al comprar ── */
  'errores-comprar-vivienda': {
    slug: 'errores-comprar-vivienda',
    title: 'Errores habituales al comprar una vivienda en L\'Hospitalet de Llobregat',
    category: 'Errores al comprar',
    readingTime: '8 min',
    body: () => (
      <>
        <P>
          Comprar una vivienda es una decisión importante, y es normal sentir dudas. Pero hay errores que se repiten una y otra vez entre los compradores, y que pueden evitarse con un poco de información y reflexion previa. Estos son los siete más habituales.
        </P>

        <H2>1. Empezar a buscar sin tener claro qué necesitas</H2>
        <P>
          Muchos compradores empiezan a visitar pisos sin haber definido bien que buscan: cuantas habitaciones necesitan, que zona prefieren, si necesitan ascensor, que presupuesto tienen. Esa falta de claridad lleva a visitar decenas de viviendas sin avanzar, a comparar cosas que no son comparables y a sentirse perdido.
        </P>
        <P>
          Antes de empezar la búsqueda, dedica tiempo a definir tus necesidades reales — no las ideales — y a priorizar lo que es importante de verdad.
        </P>

        <H2>2. No entender tu presupuesto real</H2>
        <P>
          El presupuesto no es solo el precio de la vivienda. Incluye los gastos de compra — impuestos, notaría, registro, gestoría — que en Cataluña suponen entre el 10% y el 12% del precio. Muchos compradores se sorprenden cuando descubren que necesitan mucho más ahorro del que pensaban.
        </P>
        <P>
          Saber exactamente cuánto puedes gastar — incluyendo todos los gastos — te permite buscar con realismo y evitar frustraciones.
        </P>
        <ArticleLink to="/guia/cuanto-dinero-comprar-vivienda">Cuánto dinero necesitas para comprar una vivienda</ArticleLink>

        <H2>3. Comparar viviendas solo por precio</H2>
        <P>
          No todas las viviendas con el mismo precio son iguales. Un piso más barato puede necesitar una reforma costosa, estar en una zona con menos servicios o tener una comúnidad con problemas. Y un piso más caro puede ser una mejor inversión a largo plazo.
        </P>
        <P>
          Es importante valorar cada vivienda en su contexto: estado, ubicación, comúnidad, potencial de revalorizacion y coste total de la operación.
        </P>

        <H2>4. Tomar decisiones con prisa o por presion</H2>
        <P>
          El mercado puede generar urgencia: "si no te decides hoy, la pierdes". Y aunque a veces eso es cierto, tomar una decisión de está magnitud bajo presion rara vez acaba bien. Es mejor perder una vivienda que comprar la equivocada.
        </P>
        <P>
          Ten claro lo que buscas, tu presupuesto y tus prioridades. Así, cuando aparezca la vivienda adecuada, podrás decidir con rapidez pero sin precipitarte.
        </P>

        <H2>5. No interpretar bien el estado de la vivienda</H2>
        <P>
          Un piso puede parecer bonito en las fotos y tener problemas ocultos: humedades, instalaciones antiguas, problemas de vecinos, derramas pendientes. Visitar con atención, hacer las preguntas correctas y, si es necesario, pedir la opinion de un profesional puede ahorrarte muchos disgustos — y mucho dinero.
        </P>

        <H2>6. No tener en cuenta el contexto del mercado</H2>
        <P>
          El mercado inmobiliario tiene ciclos. Los tipos de interés, la oferta disponible, la demanda en la zona... todo influye en lo que es un buen precio y en lo que no. Comprar sin entender el contexto puede llevarte a pagar de más o a dejar pasar buenas oportunidades.
        </P>

        <H2>7. No tener una estrategia clara</H2>
        <P>
          Comprar una vivienda no es solo encontrarla y firmar. Implica financiación, negociación, documentación legal y una serie de pasos que conviene tener claros desde el principio. Improvisar en cada fase del proceso aumenta el riesgo de errores y de tomar decisiones que luego lamentas.
        </P>
        <Quote>
          Comprar bien no es cuestión de encontrar la vivienda perfecta. Es cuestión de saber lo que necesitas, entender el mercado y tener un plan claro.
        </Quote>
      </>
    ),
    faqs: [
      {
        q: 'Cual es el error más habitual al comprar una vivienda?',
        a: 'Empezar a buscar sin tener claro el presupuesto real ni las necesidades concretas. Eso lleva a visitar muchas viviendas sin avanzar y a tomar decisiones poco fundamentadas.',
      },
      {
        q: 'Es recomendable visitar muchas viviendas antes de decidir?',
        a: 'Es recomendable visitar las suficientes para entender el mercado, pero no tantas como para perderte. Si has definido bien lo que buscas y tu presupuesto, unas pocas visitas bien seleccionadas suelen ser más útiles que decenas de visitas sin criterio.',
      },
      {
        q: 'Como se si un precio es adecuado para una vivienda?',
        a: 'Comparando con ventas reales recientes de viviendas similares en la misma zona, teniendo en cuenta el estado, la ubicación y los gastos adicionales que puede implicar. Un asesor inmobiliario con experiencia en la zona puede ayudarte a valorarlo.',
      },
      {
        q: 'Es mejor decidir rápido para no perder una vivienda?',
        a: 'Hay que saber distinguir entre rapidez y precipitación. Si tienes claro lo que buscas, tu presupuesto y tus prioridades, puedes decidir rápido con seguridad. Pero decidir por presion sin tener esa claridad suele llevar a arrepentimientos.',
      },
      {
        q: 'Que deberia tener en cuenta antes de hacer una oferta?',
        a: 'El precio respecto al mercado, el estado real de la vivienda, los gastos de compra, tu capacidad de financiación y los plazos de la operación. Tambien es importante entender la motivacion del vendedor, ya que puede influir en la negociación.',
      },
      {
        q: 'Es recomendable contar con asesoramiento profesional?',
        a: 'Si, especialmente si es tu primera compra o si no conoces bien el mercado de la zona. Un buen asesor te ayuda a evitar errores, a negociar mejor y a gestionar todo el proceso con seguridad.',
      },
    ],
    related: ['cuanto-dinero-comprar-vivienda', 'comprar-o-vender-primero', 'cuanto-vale-piso-hospitalet'],
  },

  /* ── 10. Impuestos al vender ── */
  'impuestos-vender': {
    slug: 'impuestos-vender',
    title: 'Que impuestos se pagan al vender un piso en L\'Hospitalet de Llobregat',
    category: 'Impuestos y costes',
    readingTime: '7 min',
    body: () => (
      <>
        <P>
          Vender un piso no es solo cobrar el precio acordado. Hay impuestos y costes que debes conocer antes de firmar, para que no te lleves sorpresas y puedas calcular con precision cuanto vas a recibir realmente.
        </P>

        <H2>No todo el precio de venta es beneficio</H2>
        <P>
          Cuando vendes un piso, el dinero que recibes no es todo tuyo. Hay que descontar la hipoteca pendiente si la hay, los gastos de la operación y los impuestos. Entender estos conceptos antes de vender te permite planificar mejor y evitar sorpresas desagradables.
        </P>

        <H2>IRPF: la ganancia patrimonial</H2>
        <P>
          Cuando vendes un inmueble por más de lo que te costo, la diferencia se considera ganancia patrimonial y está sujeta al IRPF. Los tipos impositivos actuales son progresivos:
        </P>
        <UL items={[
          'Hasta 6.000 euros de ganancia: 19%',
          'De 6.000 a 50.000 euros: 21%',
          'De 50.000 a 200.000 euros: 23%',
          'De 200.000 a 300.000 euros: 27%',
          'Mas de 300.000 euros: 28%',
        ]} />
        <P>
          La ganancia se calcula restando al precio de venta el precio de compra, más los gastos deducibles — como la comisión de la inmobiliaria, los gastos de notaría de la compra original, el coste de reformas justificadas y el importe del ITP o IVA pagado en su dia.
        </P>

        <H2>Plusvalia municipal</H2>
        <P>
          La plusvalía municipal — oficialmente "Impuesto sobre el Incremento del Valor de los Terrenos de Naturaleza Urbana" — es un impuesto que cobra el ayuntamiento. Se calcula en función de:
        </P>
        <UL items={[
          'Los años que has sido propietario del inmueble.',
          'El valor catastral del suelo.',
          'Unos coeficientes establecidos por el ayuntamiento.',
        ]} />
        <P>
          Desde la reforma de 2021, existe un método de cálculo alternativo basado en la diferencia entre el precio de compra y el de venta. El contribuyente puede elegir el que le resulte más favorable.
        </P>

        <H2>Factores que influyen en lo que pagaras</H2>
        <P>
          Cada operación es diferente, y el importe final de impuestos depende de varios factores:
        </P>
        <UL items={[
          'El precio al que compraste y el precio al que vendes: cuanto mayor sea la diferencia, mayor sera la ganancia patrimonial.',
          'Los años de propiedad: influyen en la plusvalía municipal y pueden afectar a posibles exenciones en el IRPF.',
          'Los gastos y reformas realizados: los gastos de la compra original, las reformas justificadas y las comisiones pagadas se pueden deducir de la ganancia patrimonial.',
          'La hipoteca pendiente: no es un impuesto, pero se descuenta del importe que recibes al vender.',
        ]} />

        <H2>Existen casos de exencion?</H2>
        <P>
          Si. Hay dos supuestos principales en los que puedes estar exento — total o parcialmente — del IRPF por la venta de tu vivienda:
        </P>
        <UL items={[
          'Mayores de 65 anos: si vendes tu vivienda habitual y tienes 65 años o más, la ganancia patrimonial está exenta de IRPF.',
          'Reinversión en vivienda habitual: si vendes tu vivienda habitual y destinas el importe obtenido a la compra de otra vivienda habitual en un plazo de dos años, puedes quedar exento de tributar por la ganancia. Se aplica proporcionalmente si reinviertes solo una parte.',
        ]} />

        <H2>El error más habitual: pensar que todo es beneficio</H2>
        <P>
          Muchos propietarios calculan cuanto van a recibir restando solo la hipoteca pendiente. Pero se olvidan de los impuestos, las comisiones y los gastos de la operación. El resultado es que esperan recibir más de lo que realmente les queda.
        </P>
        <P>
          Antes de vender, es fundamental hacer números con todos los conceptos sobre la mesa: precio de venta, hipoteca, IRPF, plusvalía, gastos de notaría, comisiones y cualquier otro coste. Solo así sabrás con certeza cuanto vas a recibir.
        </P>
        <P>
          En PropiHouse, como parte del proceso de venta, te ayudamos a calcular estos conceptos para que tengas una imagen clara y realista antes de tomar cualquier decisión.
        </P>
        <ArticleLink to="/entender-mi-situacion">Entender mi situación y planificar la venta</ArticleLink>
      </>
    ),
    faqs: [
      {
        q: 'Siempre se paga IRPF al vender un piso?',
        a: 'No siempre. Si vendes por un precio igual o inferior al de compra — es decir, no hay ganancia patrimonial — no pagas IRPF. Tambien hay exenciones para mayores de 65 años que venden su vivienda habitual y para quienes reinvierten en vivienda habitual.',
      },
      {
        q: 'Que gastos puedo deducir del IRPF al vender?',
        a: 'Puedes deducir los gastos de la compra original — notaría, registro, ITP o IVA — las reformas que hayas realizado y que puedas justificar con facturas, y la comisión de la inmobiliaria. Todo esto reduce la ganancia patrimonial y, por tanto, el importe del impuesto.',
      },
      {
        q: 'La plusvalía municipal se paga siempre?',
        a: 'No. Si el valor del suelo no ha aumentado desde que compraste — por ejemplo, si vendes por menos de lo que pagaste — no tienes que pagar plusvalía municipal. Desde la reforma de 2021, puedes elegir el método de cálculo que te resulte más favorable.',
      },
      {
        q: 'Cuando se pagan estos impuestos?',
        a: 'El IRPF se declara en la declaracion de la renta del ano siguiente a la venta. Es decir, si vendes en 2026, lo declaras en la renta de 2027. La plusvalía municipal debe liquidarse en los 30 dias habiles siguientes a la firma ante notario.',
      },
    ],
    related: ['cuanto-vale-piso-hospitalet', 'errores-vender-vivienda', 'buen-momento-vender'],
  },
}

/* ═══════════════════════════════════════════════════════════
   ARTICLE PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? ARTICLES[slug] : null

  useEffect(() => {
    if (!article) return
    document.title = article.title + " — PropiHouse"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', article.title + " — Guía inmobiliaria de PropiHouse en L'Hospitalet de Llobregat.")
    return () => { document.title = "PropiHouse — Inmobiliaria en L'Hospitalet de Llobregat" }
  }, [article?.title])

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-dark mb-4">
          Artículo no encontrado
        </h1>
        <p className="text-text-light text-lg mb-8 text-center max-w-md">
          Lo sentimos, el artículo que buscas no existe o ha sido movido.
        </p>
        <Link
          to="/guia"
          className="inline-flex items-center gap-2 bg-blue hover:bg-blue-dark text-white text-sm font-bold px-6 py-3 rounded-lg transition-all duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
          </svg>
          Volver a la guía
        </Link>
      </div>
    )
  }

  const Body = article.body

  return (
    <>
      {/* ── Hero / Header ── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-cream/40">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-olive/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <RevealSection>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
              <Link to="/" className="hover:text-blue transition-colors">Inicio</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <Link to="/guia" className="hover:text-blue transition-colors">Guia</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-text-light truncate">{article.title}</span>
            </nav>

            {/* Category pill */}
            <span className="inline-block bg-olive/15 text-olive-dark text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-6">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-dark leading-tight mb-6">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {article.readingTime} de lectura
              </span>
              <span className="w-1 h-1 rounded-full bg-text-muted" />
              <span>PropiHouse</span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Article Body ── */}
      <article className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <RevealSection>
            <div className="article-body">
              <Body />
            </div>
          </RevealSection>
        </div>
      </article>

      {/* ── FAQ Section ── */}
      {article.faqs.length > 0 && (
        <section className="py-12 md:py-16 bg-cream/30">
          <div className="max-w-3xl mx-auto px-6">
            <RevealSection>
              <div className="mb-10">
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-olive mb-3">
                  Preguntas frecuentes
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-dark">
                  Dudas habituales
                </h2>
              </div>
              <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
                {article.faqs.map((faq, i) => (
                  <FAQItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* ── CTA Section ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <RevealSection>
            <div className="bg-cream/60 border border-cream-dark/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-olive/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue/5 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-dark mb-4">
                  Necesitas orientación?
                </h2>
                <p className="text-text-light text-lg max-w-md mx-auto leading-relaxed mb-8">
                  Entender tu situación es el primer paso para tomar buenas decisiones. Sin compromiso.
                </p>
                <Link
                  to="/entender-mi-situacion"
                  className="inline-flex items-center gap-2 bg-olive-dark hover:bg-olive text-white text-sm font-bold px-7 py-3.5 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  Entender mi situación
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Related Articles ── */}
      {article.related.length > 0 && (
        <section className="py-12 md:py-16 bg-cream/20">
          <div className="max-w-5xl mx-auto px-6">
            <RevealSection>
              <div className="mb-10 text-center">
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-olive mb-3">
                  Sigue leyendo
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-dark">
                  Artículos relacionados
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {article.related.slice(0, 3).map((relSlug) => (
                  <RelatedCard key={relSlug} slug={relSlug} />
                ))}
              </div>
            </RevealSection>
          </div>
        </section>
      )}
    </>
  )
}
