import { useEffect } from 'react'

export default function AvisoLegalPage() {
  useEffect(() => {
    document.title = "Aviso Legal — PropiHouse"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Aviso legal de PropiHouse. Información sobre los datos identificativos del titular, propiedad intelectual y condiciones de uso del sitio web.')
  }, [])

  return (
    <main className="min-h-screen bg-[#FDFBF5]">
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-dark mb-8">Aviso Legal</h1>
          <div className="prose prose-lg text-text-light space-y-6 text-base leading-[1.8]">

            <p className="text-text-light text-base leading-[1.8]">
              En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan a continuación los datos identificativos del titular del presente sitio web.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">1. Datos identificativos del titular</h2>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li><strong>Denominación:</strong> PropiHouse</li>
              <li><strong>Titular:</strong> Pau Manovel</li>
              <li><strong>Domicilio:</strong> Carrer d'Enric Prat de la Riba, 187, 08901 L'Hospitalet de Llobregat, Barcelona</li>
              <li><strong>Correo electrónico:</strong> hola@propihouse.es</li>
              <li><strong>Teléfono:</strong> 637 86 36 78</li>
              <li><strong>Sitio web:</strong> www.propihouse.es</li>
            </ul>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">2. Objeto del sitio web</h2>
            <p className="text-text-light text-base leading-[1.8]">
              El presente sitio web tiene como finalidad ofrecer información sobre los servicios inmobiliarios de PropiHouse, incluyendo la compra, venta, alquiler y financiación de viviendas en L'Hospitalet de Llobregat y alrededores, así como facilitar a los usuarios un medio de contacto y consulta.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">3. Propiedad intelectual e industrial</h2>
            <p className="text-text-light text-base leading-[1.8]">
              Todos los contenidos del sitio web, incluyendo a título enunciativo pero no limitativo los textos, fotografías, gráficos, imágenes, iconos, diseño, código fuente, marcas y logotipos, son propiedad de PropiHouse o de terceros que han autorizado su uso, y están protegidos por las leyes de propiedad intelectual e industrial vigentes.
            </p>
            <p className="text-text-light text-base leading-[1.8]">
              Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación, total o parcial, de los contenidos de este sitio web sin la autorización expresa y por escrito de PropiHouse. El uso no autorizado de los contenidos podrá dar lugar a las responsabilidades legalmente establecidas.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">4. Condiciones de uso</h2>
            <p className="text-text-light text-base leading-[1.8]">
              El usuario se compromete a hacer un uso adecuado y lícito del sitio web, de conformidad con la legislación aplicable, el presente aviso legal y las buenas costumbres. El usuario se abstendrá de utilizar el sitio web con fines ilícitos, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar o deteriorar el sitio web.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">5. Limitación de responsabilidad</h2>
            <p className="text-text-light text-base leading-[1.8]">
              PropiHouse no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran derivarse del uso del sitio web, incluyendo, sin limitación:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li>Errores u omisiones en los contenidos del sitio web.</li>
              <li>La falta de disponibilidad o accesibilidad del sitio web o de los servicios prestados a través del mismo.</li>
              <li>La transmisión de virus o programas maliciosos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.</li>
              <li>Los daños derivados del uso indebido o ilícito del sitio web por parte de los usuarios.</li>
            </ul>
            <p className="text-text-light text-base leading-[1.8]">
              La información proporcionada en este sitio web tiene carácter meramente orientativo y no constituye asesoramiento legal, fiscal o financiero. Se recomienda consultar con un profesional antes de tomar decisiones basadas en los contenidos publicados.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">6. Enlaces a terceros</h2>
            <p className="text-text-light text-base leading-[1.8]">
              El sitio web puede contener enlaces a sitios web de terceros. PropiHouse no se responsabiliza del contenido, las políticas de privacidad ni las prácticas de sitios web de terceros. La inclusión de estos enlaces no implica aprobación o asociación alguna con sus operadores.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">7. Legislación aplicable y jurisdicción</h2>
            <p className="text-text-light text-base leading-[1.8]">
              El presente aviso legal se rige por la legislación española vigente. Para la resolución de cualquier controversia que pudiera derivarse del acceso o uso de este sitio web, ambas partes se someten expresamente a la jurisdicción de los juzgados y tribunales de Barcelona, con renuncia a cualquier otro fuero que pudiera corresponderles.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">8. Modificaciones</h2>
            <p className="text-text-light text-base leading-[1.8]">
              PropiHouse se reserva el derecho de modificar el presente aviso legal en cualquier momento, siendo responsabilidad del usuario revisar periódicamente su contenido. El uso continuado del sitio web tras la publicación de cambios supone la aceptación de los mismos.
            </p>

            <p className="text-text-light text-sm mt-12 text-text-light/60">
              Última actualización: abril 2026
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
