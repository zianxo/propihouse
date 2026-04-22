import { useState, useEffect } from 'react'
import { RevealSection, SectionHeading } from '../components/ui'

export default function ContactoPage() {
  useEffect(() => {
    document.title = "Contacto — Propi House"
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Contacta con Propi House en L\'Hospitalet de Llobregat. Estamos en Carrer d\'Enric Prat de la Riba, 187.')
    return () => { document.title = "Propi House — Inmobiliaria en L'Hospitalet de Llobregat" }
  }, [])
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', service: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const ic = 'w-full px-4 py-3 rounded-xl border border-cream-dark/30 bg-white text-dark text-sm font-sans outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all placeholder:text-text-muted'

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-cream/50">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <span className="inline-block text-olive text-xs font-bold tracking-[0.2em] uppercase mb-4">Contacto</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-dark leading-tight mb-6 max-w-3xl">
              Estamos aquí <em className="italic text-blue">para ayudarte</em>
            </h1>
            <p className="text-text-light text-lg max-w-2xl leading-relaxed">
              ¿Tienes alguna pregunta? ¿Quieres una valoración? Cuéntanos y te respondemos pronto.
            </p>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <RevealSection>
                <div className="bg-white rounded-2xl shadow-card p-8 md:p-10">
                  {sent ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-olive/20 flex items-center justify-center mx-auto mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-olive-dark)" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <h3 className="font-serif text-2xl text-dark mb-2">¡Mensaje enviado!</h3>
                      <p className="text-text-light">Te responderemos lo antes posible.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <SectionHeading title="Escríbenos" subtitle="Rellena el formulario y te contactamos sin compromiso." center={false} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" placeholder="Tu nombre" required className={ic} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        <input type="email" placeholder="Email" required className={ic} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="tel" placeholder="Teléfono" className={ic} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                        <select className={`${ic} appearance-none`} value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                          <option value="">¿En qué te ayudamos?</option>
                          <option value="comprar">Quiero comprar</option>
                          <option value="vender">Quiero vender</option>
                          <option value="alquilar">Quiero alquilar</option>
                          <option value="financiar">Necesito financiación</option>
                          <option value="valoracion">Valoración gratuita</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                      <textarea placeholder="Tu mensaje..." rows={5} className={`${ic} resize-none`} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                      <button type="submit" className="w-full sm:w-auto bg-blue hover:bg-blue-dark text-white font-bold px-8 py-3.5 rounded-lg transition-all duration-300">Enviar mensaje</button>
                    </form>
                  )}
                </div>
              </RevealSection>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <RevealSection>
                <ContactInfoCard icon="📍" title="Dirección" lines={["C/ Enric Prat de la Riba, 187", "08901 L'Hospitalet de Llobregat"]} />
                <div className="mt-6"><ContactInfoCard icon="📞" title="Teléfono" lines={["637 86 36 78"]} href="tel:+34637863678" /></div>
                <div className="mt-6"><ContactInfoCard icon="✉️" title="Email" lines={["hola@propihouse.es"]} href="mailto:hola@propihouse.es" /></div>
                <div className="mt-6"><ContactInfoCard icon="🕐" title="Horario" lines={["L-V: 9:30–14:00 / 16:00–19:30", "Sáb: 10:00–13:00"]} /></div>
              </RevealSection>
              <RevealSection>
                <div className="rounded-xl overflow-hidden shadow-soft h-64">
                  <iframe title="Propi House" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.5!2d2.099!3d41.359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1ses!2ses!4v1" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" />
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ContactInfoCard({ icon, title, lines, href }: { icon: string; title: string; lines: string[]; href?: string }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-soft flex gap-4">
      <div className="w-11 h-11 rounded-xl bg-cream flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
      <div>
        <h4 className="font-sans font-bold text-dark text-sm mb-1">{title}</h4>
        {lines.map(l => href ? <a key={l} href={href} className="block text-text-light text-sm hover:text-blue transition-colors">{l}</a> : <p key={l} className="text-text-light text-sm">{l}</p>)}
      </div>
    </div>
  )
}
