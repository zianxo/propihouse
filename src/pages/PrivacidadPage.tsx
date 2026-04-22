import { useEffect } from 'react'

export default function PrivacidadPage() {
  useEffect(() => {
    document.title = "Política de Privacidad — Propi House"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Política de privacidad de Propi House. Información sobre el tratamiento de datos personales según el RGPD y la LOPD-GDD.')
  }, [])

  return (
    <main className="min-h-screen bg-[#FDFBF5]">
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-dark mb-8">Política de Privacidad</h1>
          <div className="prose prose-lg text-text-light space-y-6 text-base leading-[1.8]">

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">1. Responsable del tratamiento</h2>
            <p className="text-text-light text-base leading-[1.8]">
              En cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPD-GDD), le informamos de que el responsable del tratamiento de sus datos personales es:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li><strong>Titular:</strong> Gabinete Punto L&apos;Hospitalet SL (Propi House)</li>
              <li><strong>Dirección:</strong> Carrer d'Enric Prat de la Riba, 187, 08901 L'Hospitalet de Llobregat, Barcelona</li>
              <li><strong>Correo electrónico:</strong> hola@propihouse.es</li>
              <li><strong>Teléfono:</strong> 637 86 36 78</li>
              <li><strong>Sitio web:</strong> www.propihouse.es</li>
            </ul>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">2. Datos que recogemos</h2>
            <p className="text-text-light text-base leading-[1.8]">
              A través de los formularios disponibles en nuestro sitio web, podemos recoger los siguientes datos personales:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li>Nombre y apellidos</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
            </ul>
            <p className="text-text-light text-base leading-[1.8]">
              Estos datos se recogen únicamente cuando usted los facilita de forma voluntaria a través de los formularios de contacto, valoración o solicitud de información.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">3. Finalidad del tratamiento</h2>
            <p className="text-text-light text-base leading-[1.8]">
              Los datos personales que nos facilite serán tratados con las siguientes finalidades:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li>Gestionar y responder a sus consultas, solicitudes de información o peticiones de contacto.</li>
              <li>Enviarle información relacionada con los servicios inmobiliarios de Propi House que haya solicitado.</li>
              <li>Mantener la comunicación necesaria derivada de la relación comercial o precontractual.</li>
            </ul>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">4. Base legal del tratamiento</h2>
            <p className="text-text-light text-base leading-[1.8]">
              La base legal para el tratamiento de sus datos es el <strong>consentimiento del usuario</strong>, que usted otorga al enviar voluntariamente sus datos a través de nuestros formularios. En el caso de consultas comerciales, la base legal también puede ser la ejecución de medidas precontractuales o contractuales.
            </p>
            <p className="text-text-light text-base leading-[1.8]">
              Usted tiene derecho a retirar su consentimiento en cualquier momento, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">5. Duración del tratamiento</h2>
            <p className="text-text-light text-base leading-[1.8]">
              Sus datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos, y mientras no solicite su supresión. Una vez finalizada la relación, los datos se mantendrán bloqueados durante los plazos legales de prescripción aplicables, tras lo cual serán eliminados definitivamente.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">6. Derechos del usuario</h2>
            <p className="text-text-light text-base leading-[1.8]">
              De acuerdo con el RGPD y la LOPD-GDD, usted tiene los siguientes derechos:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li><strong>Derecho de acceso:</strong> conocer qué datos personales suyos estamos tratando.</li>
              <li><strong>Derecho de rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
              <li><strong>Derecho de supresión:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
              <li><strong>Derecho de portabilidad:</strong> recibir sus datos en un formato estructurado y de uso común.</li>
              <li><strong>Derecho de oposición:</strong> oponerse al tratamiento de sus datos en determinadas circunstancias.</li>
              <li><strong>Derecho a la limitación del tratamiento:</strong> solicitar la restricción del tratamiento en los casos previstos por la normativa.</li>
            </ul>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">7. Cómo ejercer sus derechos</h2>
            <p className="text-text-light text-base leading-[1.8]">
              Para ejercer cualquiera de los derechos mencionados, puede ponerse en contacto con nosotros enviando un correo electrónico a <a href="mailto:hola@propihouse.es" className="text-blue underline hover:text-blue/80">hola@propihouse.es</a>, indicando el derecho que desea ejercer y acompañando, si fuera necesario, una copia de su documento de identidad.
            </p>
            <p className="text-text-light text-base leading-[1.8]">
              Asimismo, le informamos de que tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si considera que el tratamiento de sus datos no se ajusta a la normativa vigente. Más información en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-blue underline hover:text-blue/80">www.aepd.es</a>.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">8. Terceros y encargados del tratamiento</h2>
            <p className="text-text-light text-base leading-[1.8]">
              Para el correcto funcionamiento de nuestro sitio web y nuestros servicios, utilizamos los siguientes proveedores externos que pueden tener acceso a datos personales en calidad de encargados del tratamiento:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li><strong>Resend:</strong> servicio de envío de correos electrónicos transaccionales. Puede consultar su política de privacidad en <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue underline hover:text-blue/80">resend.com</a>.</li>
              <li><strong>Vercel:</strong> servicio de alojamiento web (hosting). Puede consultar su política de privacidad en <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue underline hover:text-blue/80">vercel.com</a>.</li>
            </ul>
            <p className="text-text-light text-base leading-[1.8]">
              Estos proveedores se comprometen a tratar los datos conforme al RGPD y únicamente para las finalidades indicadas.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">9. Seguridad de los datos</h2>
            <p className="text-text-light text-base leading-[1.8]">
              Propi House adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad de sus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, conforme al estado de la tecnología y la naturaleza de los datos almacenados.
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
