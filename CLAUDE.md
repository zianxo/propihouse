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
- **jsPDF** for downloadable PDF reports (lazy-loaded, ~130 KB gzip on demand)

## Build & Run

```bash
pnpm dev          # Dev server on localhost:5173
pnpm build        # tsc -b && vite build (type-checks then builds)
pnpm tsc -b       # Type-check only — fast smoke test before commit
vercel ls         # Check deployment status
gh pr checks <#>  # Vercel deploy + preview comments
```

Workflow: feature branch → PR → wait for Vercel preview pass → squash-merge `--delete-branch`. Production redeploys automatically from `main`.

## Project Structure

```
src/
  components/
    Header.tsx          # Global nav, transparent over dark heroes, blur vignette
    Footer.tsx          # Social links, legal links
    Layout.tsx          # Wraps all routes (Header + Outlet + Footer + WhatsApp button)
    WhatsAppButton.tsx  # Floating green button, bottom-right
    EntenderSituacionForm.tsx  # Reusable multi-step form
    ui.tsx              # RevealSection, SectionHeading, ReviewCard, CTASection, MethodTimeline
  lib/
    valorador.ts        # V1 pricing engine — coefficient pipeline + bands + special-case detection
    pdf.ts              # Shared jsPDF helpers (header, footer, sections, rows, dividers, brand palette)
  data/
    zones.ts            # L'Hospitalet barrios + matchZone() + lastReviewedLabel()
    zones.data.json     # Generated weekly by api/cron-zones.ts (Fotocasa scrape)
  pages/
    HomePage.tsx        # Scroll-linked video hero (145 WebP frames), services, Pau bio, embedded form
    ComprarPage.tsx     # Blue accent
    VenderPage.tsx      # Olive accent + StrikeGrid scroll animation
    AlquilarPage.tsx    # Beige accent + 4-tier pricing packs + post-rental management
    FinanciarPage.tsx   # Mortgage calc with ITP selector + PDF report
    ComoTrabajamosPage.tsx   # Dark warm hero (#2A3328) + 6-step scroll timeline + DontDoList strike
    CuantoValePage.tsx  # /cuanto-vale-mi-vivienda landing → Valorador
    ValoradorPage.tsx   # Multi-step form → 2-col result (Datos + Precio) → 7-step refinement
    EntenderSituacionPage.tsx  # Standalone wrapper for EntenderSituacionForm
    GuiaPage.tsx        # Blog hub with article cards + situation cards
    ArticlePage.tsx     # Dynamic /guia/:slug
    ContactoPage.tsx    # Contact form + map
    NotFoundPage.tsx    # Custom 404
    Privacidad/AvisoLegal/CookiesPage.tsx  # Legal pages
api/
  subscribe.ts    # Email capture for coming-soon page (Resend)
  unlock.ts       # Preview code validator, sets cookie
  cron-zones.ts   # Weekly Fotocasa scrape → zones.data.json
public/
  frames-webp/    # 145 WebP frames for hero scroll animation (~19MB)
  logos/          # Logo PNG (transparent background) — embedded in PDF reports
  images/, reviews/, sitemap.xml, robots.txt, manifest.json
  coming-soon.html # Preview-gated landing page
```

## Design System

Hammered out across feedback rounds 1–2 with Pau. **Adhere to these patterns** when adding pages or refactoring — Pau notices when they drift.

### Hero pattern (Comprar / Vender / Alquilar / Financiar / CuantoVale)

All five service-page heroes share **one** shell:

```jsx
<section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-cream via-warm-white to-cream-light" />
  <div className="absolute inset-0 opacity-[0.03]" style={{
    backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-olive) 0.5px, transparent 0)',
    backgroundSize: '24px 24px',
  }} />
  <div className="max-w-4xl mx-auto px-6 relative z-10">
    <RevealSection>
      <span className="inline-block text-[#B8A88A] text-xs font-bold tracking-[0.2em] uppercase mb-5">
        {/* Eyebrow — plain uppercase span, NEVER a rounded-full chip */}
      </span>
      <h1 className="font-[Playfair_Display] text-[clamp(2rem,5.5vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-dark mb-8 max-w-3xl">
        {/* Page-specific headline */}
      </h1>
      <div className="max-w-2xl space-y-5">
        <p className="text-text-light text-lg leading-relaxed">
          {/* Multi-paragraph body, with space-y-5 between paragraphs */}
        </p>
      </div>
    </RevealSection>
  </div>
</section>
```

Exceptions (intentional):
- **ComoTrabajamosPage**: dark hero (gradient `from-[#2A3328] via-[#344030] to-[#2A3328]`) with white text and a custom decorative bottom edge SVG. Pau likes this one being different.
- **GuiaPage**: same gradient family but smaller h1 size (`text-3xl md:text-4xl lg:text-[2.75rem]`).
- **HomePage**: full canvas-driven scroll hero, totally separate.
- **ValoradorPage**: intentionally a "unicorn" — multi-step form, no editorial hero.

### Border radius hierarchy

iOS-style radii. Pau wanted "less rounding."

| Token | Use for |
|---|---|
| `rounded-lg` (8 px) | **Primary CTA buttons** (Empezar, Calcular, Continuar, Ver resultado, etc.) |
| `rounded-xl` (12 px) | Cards, info panels, container blocks |
| `rounded-full` | Circles only — avatars, slider thumbs, dots, indicators, glow blobs |

Earlier passes used `rounded-2xl` (16 px) and `rounded-3xl` (24 px) — those were collapsed to `rounded-xl` and `rounded-lg` site-wide. **Don't reintroduce them.**

### Typography & color tokens

- **Headings**: `font-[Playfair_Display]` with `font-normal` (NOT font-light or font-medium)
- **Body**: `text-text-light text-lg leading-relaxed` for hero, `text-base leading-relaxed text-text-light` for inline
- Use **named tokens** (`text-dark`, `text-text-light`, `text-text-muted`, `text-olive`) over raw hex like `text-[#1A1A1A]/65` whenever possible — earlier hex-heavy code is being phased out.
- Brand palette: Cream `#EFE8CD`, Blue `#2A79A9`, Olive `#868C4D`, Dark `#1A1A1A`, eyebrow gold `#B8A88A`.

### Step numbers

Always `'1'`, `'2'`, `'3'` — **never `'01'`, `'02'`**. Pau explicitly asked for the leading zero gone. Applies to MethodTimeline, StrikeGrid, any numbered list.

### Closing CTA copy

Each service page has a unique closing phrase — they used to all duplicate "Sin compromiso. Analizamos tu caso..." which Pau flagged. Current set:

| Page | Closing |
|---|---|
| ComoTrabajamos | "Cada vivienda es única, cada momento también" |
| Alquilar | "Cada propietario es diferente / Queremos saber qué tiene sentido en tu caso" (no "sin compromiso") |
| Financiar | "Solo una conversación para entender tu momento / Diseñamos contigo el plan que tiene sentido para tu vivienda" |
| Vender | "Una conversación para entender tu momento y diseñar el mejor plan para tu vivienda. Sin compromiso, sin prisa." |

When picking copy: never use "hemos escrito X artículos" — say "te compartimos X artículos" instead. Pau swapped this everywhere.

## Valorador (pricing engine)

Implemented in `src/lib/valorador.ts`. Pau treats this as the most-scrutinized feature on the site.

### Inputs (form collects all of these)

| Param | Source | Engine effect |
|---|---|---|
| `tipo` | Step 1 — piso / planta-baja / casa / atico / duplex | `coef_tipo` 0.90–1.20 |
| `ubicacion` | Step 2 — free text matched against zones.data.json | `zone.mult` (e.g. Santa Eulàlia 1.24) |
| `metros` | Step 3 — slider 20–500, number 10–1000 | `coef_tamano` smoothed piecewise-linear |
| `estado` | Step 4 — reformar / buen-estado / reformada / obra-nueva | `coef_estado` 0.80–1.30 |
| `planta` + `ascensor` | Step 5 (NEW in round 2) — auto-skipped for casa / planta-baja | `coef_ascensor_planta` joint table |
| `extras` | Step 6 — parking / terraza / balcón / trastero / ninguno | additive bonuses (+1 to +5%) and trastero (+1%) |

Refinement form (steps 1–7) collects extra context (habitaciones, luminosidad, situación, timing, contacto) but does **not** feed back into the engine — it's a lead-capture flow.

### Output

- `midValue` = `metros × basePerM² × zoneMult × coefComercial × coefPropiedadClamped` (clamp 0.75–1.25 on property coef only)
- **Asymmetric band**: `highValue = midValue × 1.12` always; `lowValue × 0.93/0.91/0.88` by confidence (alta/media/baja). Pau's call — real comparables have wider upside.
- `confidenceScore` 0–100 from input completeness (zone 20, m² 15, estado 15, ascensor 10, exterior 10, planta 5, etc.) → label `alta`/`media`/`baja`
- `specialCase` flagged for m² < 25, m² > 250, áticos > 150 m² or with terraza → result-screen + PDF banner "valoración manual recomendada"

### Three engineering choices vs Pau's literal V1 spec

(Worth flagging if he asks why outputs differ from a hand calc.)

1. **Smoothed size correction** — Pau's anchor table jumped at 65↔66 m² (a 65 m² priced higher than 66 m²). Anchors preserved, interpolated between them.
2. **Property-only clamp** — the `[0.75, 1.25]` clamp applies only to the property coefficient stack, not zone × commercial. Otherwise zones like Santa Eulàlia (×1.24) would be flattened.
3. **`coef_comercial`** lives in `zones.data.json` (default 1.00) so Pau can shift every valuation up/down without a code change.

### Shareable URL + result page

- Result inputs encode into URL params (`?t=&u=&m=&e=&p=&a=&x=`) — `encodeShareablePayload` / `decodeShareablePayload` in `ValoradorPage.tsx`.
- Decoder **whitelists** `tipo` / `estado` / `extras` against the known sets and **clamps** `metros` to 10–1000, `planta` to 0–20 (defensive against URL tampering — see "Safety notes" below).
- Recipient lands directly on the result phase with the same valuation.
- **WhatsApp share message** is brand-led (NOT first-person) — Pau rejected "Acabo de calcular mi vivienda…" framing:
  > "Valoración orientativa de vivienda en L'Hospitalet de Llobregat: 278.080 € – 353.920 €. Calcula la tuya en Propi House: {url}"
- Result screen is a **2-column layout on lg+**: left card "Datos de la vivienda" (with a "Modificar" link that returns to the form with state intact), right card with the price band. Stacks on mobile.

### Safety notes

The Valorador is fully client-side (no backend, no DB writes, no auth boundary). React's JSX auto-escaping prevents XSS via `?u=<script>`. The decoder validates everything else to prevent NaN renders or fake billion-euro valuations from crafted URLs.

## PDF Reports

Two reports, both generated client-side via lazy-imported jsPDF:

- **Financiar** → "Guardar PDF" on the calculator → `propihouse-simulacion-hipoteca-{ts}.pdf`
- **Valorador** → "Descargar informe" in the result share row → `propihouse-valoracion-{ts}.pdf`

Both share the template helpers in `src/lib/pdf.ts`:
- `loadLogoDataUrl()` — fetches `/logos/logo.png` and base64-encodes
- `drawHeader(doc, logoDataUrl)` — logo top-left + date top-right + divider
- `drawFooter(doc, disclaimer)` — disclaimer + propihouse.es + Pau's contact
- `drawSectionTitle(doc, text, atY, accent)` — accent block + uppercase label
- `drawRow(doc, label, value, atY, opts)` — label-left / value-right with bold/muted variants
- `drawDivider(doc, atY)` — thin horizontal rule

`LOGO_HEIGHT_MM = 18.9` (5% bigger than the original 18 mm — Pau's request). Bumping it once updates both reports.

When adding a third PDF report: import from `../lib/pdf`, follow the same vertical rhythm (header → title → sections → footer). Don't fork the helpers.

## Preview Gate (Coming Soon)

The site is behind a cookie-based gate for preview access:
- `index.html` has an inline `<script>` that redirects to `/coming-soon.html` unless `propihouse_preview=true` cookie exists
- Code: `PROPIHOUSE2026` (or env var `PREVIEW_CODE`)
- `api/unlock.ts` validates and sets the cookie (90 days)
- `coming-soon.html` has client-side fallback for localhost
- **To go live**: remove the `<script>` block from `index.html` (Pau will tell us when)

## Forms Status

| Form | Submission status |
|---|---|
| `EntenderSituacionForm` | Shows success UI but does NOT POST data |
| `ContactoPage` form | Same — no backend |
| `ValoradorPage` refinement form (7-step) | Same — no backend |
| `subscribe.ts` (coming-soon email capture) | **Works** via Resend |

All non-working forms need `/api/` endpoints wired before launch.

## SEO

- Per-page `document.title` + `meta description` on all 16 pages
- Open Graph + Twitter cards in `index.html`
- JSON-LD `RealEstateAgent` schema on HomePage
- `sitemap.xml` with 24 URLs, `robots.txt`, canonical URL, `<html lang="es">`

## Client Info

- **Owner**: Pau Manovel
- **Business**: Propi House (real estate agency)
- **Legal entity**: Gabinete Punto L'Hospitalet SL
- **Location**: Carrer d'Enric Prat de la Riba, 187, 08901 L'Hospitalet de Llobregat, Barcelona
- **Phone**: 637 86 36 78
- **Email**: hola@propihouse.es
- **Tagline**: "Lo que ves es lo que es"
- **Social**: Instagram `@propihouse.es` · Facebook `propihouse.bcn` · WhatsApp `34637863678`

## Content Sources

Client PDFs are in `resources_shared/` (gitignored). Page copy and the financing calculator formulas (financing.xlsx) come from there.

## Recent Work (post-launch-prep)

| PR | What |
|---|---|
| #5 | Feedback round 2 — Valorador inputs + asymmetric band + confidence UI; financiar gastos breakdown (ITP selector + escritura); copy edits + closing-phrase deduplication; site-wide radius pass; step number 01→1; header transparency fix |
| #6 | Real PDF reports (jsPDF), shareable Valorador URL, hero unification (Comprar + Vender → Alquilar pattern) |
| #7 | Brand-led WhatsApp share message (dropped first-person framing) |
| #8 | Valorador result as 2-column (Datos + Precio) with "Modificar" affordance |
| #9 | CuantoVale hero unified (was a different shell with a chip eyebrow) + primary CTA radii xl→lg |
| #10 | Alquilar hero body rhythm — split back into two paragraphs to match other heroes |
| #11 | Validate + clamp shared-URL params (defensive against NaN renders / fake huge valuations) |
| #12 | Valorador PDF report + shared `src/lib/pdf.ts` helpers + logo +5% |

## Pending Items (deferred — needs Pau input or external asset)

These were on Pau's feedback list but not shipped because they need a design choice, an asset, or a discussion:

1. **"Errores habituales al comprar" article** → reformat as press/blog-style layout (rectangular, narrower). Skipped — needs a design pass.
2. **White-logo test on dark heroes** → A/B the white logo over `#2A3328` heroes. Needs Pau's eye on a side-by-side.
3. **FI ligature** → custom font's "fi" ligature is inconsistent. Font-engineering, not a quick CSS fix.
4. **Real photo of Pau** for the "quien está detrás" section. Currently uses PM monogram — needs an asset from him.
5. **Google Analytics** — only if Pau confirms he wants tracking.
6. **Article video** — Pau hadn't sent the asset yet.
7. **Wire up form submissions** → ContactoPage / EntenderSituacionForm / Valorador refinement → Resend or similar API endpoint.
8. **Lawyer review** of legal pages.
9. **Remove preview gate** (`<script>` in `index.html`) when ready to go live.
10. **Delete `public/frames/` and `public/video/`** (old assets, ~MB savings).

## Common Gotchas

- **JSX entities and unicode escapes** — some files (notably ComprarPage.tsx, VenderPage.tsx) use `&oacute;` and `é` style escapes inline rather than literal characters. The Edit tool tries swapping but if surrounding whitespace/layout differs, the match fails. **Read the file first** with line numbers and copy the exact bytes when edits don't match.
- **Non-breaking spaces in JSX** — old `{' '}` strings sometimes contain a literal `\xa0` instead of a regular space (`\x20`). Use a unique nearby substring as your search anchor instead of trying to match the whole `{' '}` block.
- **File modifications during edits** — the file watcher / linter occasionally rewrites a file between a `Read` and an `Edit`, causing "File has been modified since read". Re-read and retry — don't fight it.
- **Border radius in HTML/CSS-in-JS** — `rounded-full` on slider thumbs is intentional and uses `[&::-webkit-slider-thumb]:rounded-full` — leave those alone.
- **Don't add `rounded-2xl` / `rounded-3xl`** — site-wide pass collapsed them. New code should use the radius hierarchy above.
- **Engine defaults** — `computeValuation()` defaults every coefficient to 1.0 when its input is missing, so adding a new field is safe to ship without UI updates. But _silently using a default_ when the form _was_ supposed to send the value is a bug — the round-2 PR fixed exactly this for `tipo`, which was being collected but never passed.
- **Print CSS is gone** — the old `@media print` block in `index.css` was removed when we shipped real jsPDF. Don't try to re-add a `window.print()` flow; use the shared PDF helpers.
- **Build verification is fast** — `pnpm tsc -b` finishes in <2 s and catches most issues before you commit. Use it as a smoke test between edits.
