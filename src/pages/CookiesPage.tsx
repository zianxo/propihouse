import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookiesPage() {
  useEffect(() => {
    document.title = "Política de Cookies — PropiHouse"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Política de cookies de PropiHouse. Información sobre las cookies que utilizamos y cómo gestionarlas.')
  }, [])

  return (
    <main className="min-h-screen bg-[#FDFBF5]">
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-dark mb-8">Política de Cookies</h1>
          <div className="prose prose-lg text-text-light space-y-6 text-base leading-[1.8]">

            <p className="text-text-light text-base leading-[1.8]">
              En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), y del Reglamento General de Protección de Datos (RGPD), le informamos sobre el uso de cookies en el sitio web <strong>www.propihouse.es</strong>.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">1. ¿Qué son las cookies?</h2>
            <p className="text-text-light text-base leading-[1.8]">
              Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo (ordenador, teléfono móvil o tableta) cuando los visita. Se utilizan para hacer que los sitios web funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">2. Cookies que utilizamos</h2>
            <p className="text-text-light text-base leading-[1.8]">
              Actualmente, este sitio web utiliza únicamente cookies técnicas y funcionales, que son estrictamente necesarias para el correcto funcionamiento del sitio:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li>
                <strong>Cookie de verificación de vista previa (preview gate):</strong> cookie técnica que se utiliza para gestionar el acceso a secciones de vista previa del sitio web. Se almacena en su navegador y es necesaria para el funcionamiento del sitio. No recoge datos personales.
              </li>
            </ul>
            <p className="text-text-light text-base leading-[1.8]">
              Actualmente <strong>no utilizamos cookies de análisis, publicitarias ni de seguimiento</strong>. No se instalan cookies de terceros con fines de rastreo o publicidad comportamental.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">3. Tipos de cookies según su finalidad</h2>
            <p className="text-text-light text-base leading-[1.8]">
              A título informativo, los tipos de cookies más habituales son:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li><strong>Cookies técnicas:</strong> permiten la navegación y el uso de las funciones básicas del sitio web. Son esenciales y no requieren consentimiento.</li>
              <li><strong>Cookies de personalización:</strong> permiten recordar las preferencias del usuario (idioma, región, etc.).</li>
              <li><strong>Cookies de análisis:</strong> recopilan información sobre el uso del sitio web de forma anónima con fines estadísticos.</li>
              <li><strong>Cookies publicitarias:</strong> almacenan información sobre el comportamiento del usuario para mostrar publicidad personalizada.</li>
            </ul>
            <p className="text-text-light text-base leading-[1.8]">
              En este sitio web solo se utilizan <strong>cookies técnicas</strong>, por lo que no es necesario su consentimiento previo para su instalación.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">4. Cómo gestionar las cookies</h2>
            <p className="text-text-light text-base leading-[1.8]">
              Usted puede configurar su navegador para aceptar, rechazar o eliminar cookies en cualquier momento. A continuación, le proporcionamos los enlaces a las instrucciones de los navegadores más utilizados:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-light">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue underline hover:text-blue/80">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-blue underline hover:text-blue/80">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue underline hover:text-blue/80">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/windows/administrar-cookies-en-microsoft-edge-ver-permitir-bloquear-eliminar-y-usar-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-blue underline hover:text-blue/80">Microsoft Edge</a></li>
            </ul>
            <p className="text-text-light text-base leading-[1.8]">
              Tenga en cuenta que la desactivación de las cookies técnicas puede afectar al correcto funcionamiento del sitio web.
            </p>

            <h2 className="font-serif text-xl font-medium text-dark mt-10 mb-4">5. Actualización de esta política</h2>
            <p className="text-text-light text-base leading-[1.8]">
              PropiHouse se reserva el derecho de actualizar esta política de cookies en cualquier momento, por ejemplo, si se incorporan nuevas funcionalidades o herramientas de análisis al sitio web. Le recomendamos revisarla periódicamente para estar informado sobre cómo utilizamos las cookies.
            </p>
            <p className="text-text-light text-base leading-[1.8]">
              Para más información sobre el tratamiento de sus datos personales, puede consultar nuestra <Link to="/privacidad" className="text-blue underline hover:text-blue/80">Política de Privacidad</Link>.
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
