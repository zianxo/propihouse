import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

const HomePage = lazy(() => import('./pages/HomePage'))
const ComprarPage = lazy(() => import('./pages/ComprarPage'))
const AlquilarPage = lazy(() => import('./pages/AlquilarPage'))
const VenderPage = lazy(() => import('./pages/VenderPage'))
const FinanciarPage = lazy(() => import('./pages/FinanciarPage'))
const ComoTrabajamosPage = lazy(() => import('./pages/ComoTrabajamosPage'))
const ContactoPage = lazy(() => import('./pages/ContactoPage'))
const EntenderSituacionPage = lazy(() => import('./pages/EntenderSituacionPage'))
const CuantoValePage = lazy(() => import('./pages/CuantoValePage'))
const ValoradorPage = lazy(() => import('./pages/ValoradorPage'))
const GuiaPage = lazy(() => import('./pages/GuiaPage'))
const ArticlePage = lazy(() => import('./pages/ArticlePage'))
const PrivacidadPage = lazy(() => import('./pages/PrivacidadPage'))
const AvisoLegalPage = lazy(() => import('./pages/AvisoLegalPage'))
const CookiesPage = lazy(() => import('./pages/CookiesPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="comprar" element={<ComprarPage />} />
          <Route path="alquilar" element={<AlquilarPage />} />
          <Route path="vender" element={<VenderPage />} />
          <Route path="financiar" element={<FinanciarPage />} />
          <Route path="como-trabajamos" element={<ComoTrabajamosPage />} />
          <Route path="contacto" element={<ContactoPage />} />
          <Route path="entender-mi-situacion" element={<EntenderSituacionPage />} />
          <Route path="cuanto-vale-mi-vivienda" element={<CuantoValePage />} />
          <Route path="valorador" element={<ValoradorPage />} />
          <Route path="guia" element={<GuiaPage />} />
          <Route path="guia/:slug" element={<ArticlePage />} />
          <Route path="privacidad" element={<PrivacidadPage />} />
          <Route path="aviso-legal" element={<AvisoLegalPage />} />
          <Route path="cookies" element={<CookiesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
