import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-warm-white">
      <p className="text-[10rem] leading-none font-serif font-bold text-blue/10 select-none sm:text-[14rem]">
        404
      </p>

      <h1 className="mt-2 text-3xl font-serif font-semibold text-dark sm:text-4xl">
        Página no encontrada
      </h1>

      <p className="mt-4 max-w-md text-lg text-dark/60">
        Lo sentimos, la página qué buscas no existe o ha sido movida.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-blue px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue/90"
        >
          Volver al inicio
        </Link>
        <Link
          to="/guia"
          className="inline-flex items-center justify-center rounded-lg border border-blue px-8 py-3 text-sm font-semibold text-blue transition hover:bg-blue/5"
        >
          Ver guía inmobiliaria
        </Link>
      </div>
    </section>
  )
}
