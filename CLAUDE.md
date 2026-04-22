# Propi House Website

Real estate agency website for **Propi House** (Pau Manovel), located in L'Hospitalet de Llobregat, Barcelona.

## Tech Stack

- **Vite 8 beta** + **React 19** + **TypeScript 5.9**
- **Tailwind CSS 4** (using `@theme` CSS variables in `src/index.css`)
- **React Router 7** for client-side routing
- **React Compiler** via babel plugin
- Deployed on **Vercel** at `propihouse.es` (auto-deploys from `main` branch)
- Domain managed via **Cloudflare**
- API routes: Vercel serverless functions in `api/`
- Email: **Resend** API (env var `RESEND_API_KEY`)

## Build & Run

```bash
pnpm dev          # Dev server on localhost:5173
npm run build     # tsc -b && vite build (type-checks then builds)
vercel ls         # Check deployment status
```

## Project Structure

```
src/
  components/
    Header.tsx          # Global nav, transparent over dark heroes, blur vignette
    Footer.tsx          # Social links (Instagram, Facebook, WhatsApp), legal links
    Layout.tsx          # Wraps all routes (Header + Outlet + Footer + WhatsApp button)
    WhatsAppButton.tsx  # Floating green button, bottom-right
    EntenderSituacionForm.tsx  # Reusable multi-step form (used on HomePage + standalone page)
    ui.tsx              # RevealSection, SectionHeading, ReviewCard, CTASection
  pages/
    HomePage.tsx        # Scroll-linked video hero (145 WebP frames), services, Pau bio, embedded form
    ComprarPage.tsx     # Blue accent color
    VenderPage.tsx      # Green/olive accent color, scroll-animated method timeline
    AlquilarPage.tsx    # Beige accent color, 4-tier pricing packs, post-rental management
    FinanciarPage.tsx   # Mortgage calculator (interactive sliders), scroll-animated timelines
    ComoTrabajamosPage.tsx  # Warm dark sections (#2A3328), 6-step scroll timeline
    CuantoValePage.tsx  # "Cuanto vale mi vivienda" landing + links to Valorador
    ValoradorPage.tsx   # 5-step calculator + 7-step refinement form + success/retention
    EntenderSituacionPage.tsx  # Standalone wrapper for the multi-step form
    GuiaPage.tsx        # Blog hub with 10 article cards + situation cards
    ArticlePage.tsx     # Dynamic /guia/:slug with 10 articles, FAQs, related links
    ContactoPage.tsx    # Contact form + map + info
    NotFoundPage.tsx    # Custom 404
    PrivacidadPage.tsx  # Privacy policy (RGPD/LOPD)
    AvisoLegalPage.tsx  # Legal notice (LSSI)
    CookiesPage.tsx     # Cookie policy
api/
  subscribe.ts    # Email capture for coming-soon page (Resend)
  unlock.ts       # Preview code validator, sets cookie
public/
  frames-webp/    # 145 WebP frames for hero scroll animation (19MB)
  frames/         # Old JPEG frames (can be deleted)
  video/          # Unused video experiment (can be deleted)
  images/         # Hero fallback, property images
  logos/           # Logo PNG (transparent background)
  reviews/        # Google review avatars
  sitemap.xml     # All 24 pages listed
  robots.txt      # Allow all, disallow /api/
  manifest.json   # PWA manifest
  coming-soon.html # Preview-gated landing page
```

## Key Design Decisions

- **Color identity per page**: Comprar=blue, Vender=green/olive, Alquilar=beige, Financiar=blue
- **Design tokens** in `src/index.css`: Cream #EFE8CD, Blue #2A79A9, Olive #868C4D, Dark #1A1A1A
- **Typography**: Playfair Display (serif headings), Lato (sans body)
- **Scroll animations**: RevealSection (IntersectionObserver), scroll-linked timelines (rAF + progress tracking)
- **Hero video**: 145 WebP frames drawn to canvas on scroll, NOT actual video (video seeking was too janky)
- **CTA sections**: Layered gradient backgrounds with ambient glows + dual buttons (primary + WhatsApp)

## Preview Gate (Coming Soon)

The site is behind a cookie-based gate for preview access:
- `index.html` has an inline `<script>` that redirects to `/coming-soon.html` unless `propihouse_preview=true` cookie exists
- Code: `PROPIHOUSE2026` (or env var `PREVIEW_CODE`)
- `api/unlock.ts` validates and sets the cookie (90 days)
- `coming-soon.html` has client-side fallback for localhost
- **To go live**: remove the `<script>` block from `index.html`

## Forms Status

- **EntenderSituacionForm**: Shows success UI but does NOT POST data (needs backend wiring)
- **ContactoPage form**: Same — no backend
- **ValoradorPage refinement form**: Same — no backend
- **subscribe.ts**: DOES work (Resend API for email capture on coming-soon page)
- All forms need `/api/` endpoints wired up before launch

## SEO

- Per-page `document.title` + `meta description` on all 16 pages
- Open Graph + Twitter cards in `index.html`
- JSON-LD `RealEstateAgent` schema on HomePage
- `sitemap.xml` with 24 URLs
- `robots.txt`
- Canonical URL
- `<html lang="es">`

## Client Info

- **Owner**: Pau Manovel
- **Business**: Propi House (real estate agency)
- **Location**: Carrer d'Enric Prat de la Riba, 187, 08901 L'Hospitalet de Llobregat, Barcelona
- **Phone**: 637 86 36 78
- **Email**: hola@propihouse.es
- **Tagline**: "Lo que ves es lo que es"
- **Social**: [Instagram](https://www.instagram.com/propihouse.es/) | [Facebook](https://www.facebook.com/propihouse.bcn/) | [WhatsApp](https://wa.me/34637863678)

## Content Sources

Client PDFs are in `resources_shared/` (gitignored). These contain the page copy for all service pages and blog articles. The financing calculator formulas came from `resources_shared/financing.xlsx`.

## Pending Items

1. Wire up form submissions to actual API endpoints (Resend or similar)
2. Remove preview gate when ready to go live
3. Delete `public/frames/` and `public/video/` to save space
4. Google Analytics (if Pau wants tracking)
5. Have a lawyer review the legal pages
6. Real photo of Pau for the "Quien esta detras" section (currently uses PM monogram)
