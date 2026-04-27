/*
 * ═══════════════════════════════════════════════════════════════════════
 *  Valorador V1 engine — pricing math for L'Hospitalet baremos
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  Implements Pau's V1 spec with three engineering fixes flagged in the
 *  meeting prep:
 *    1. The size-correction table is converted from a step function to
 *       a smooth piecewise-linear interpolation (no 65↔66 m² jump).
 *    2. The total-coefficient clamp [0.75, 1.25] applies only to the
 *       PROPERTY-specific coefficients, not the zone — otherwise zones
 *       like Santa Eulàlia (mult 1.24) would be flattened.
 *    3. coef_comercial is sourced from zones.data.json (default 1.00),
 *       so Pau can shift every valuation up/down without a code change.
 *
 *  The formula:
 *
 *      pricePerM²_zona = basePerM² × zone.mult × coef_comercial
 *
 *      coef_propiedad = clamp(
 *        coef_estado × coef_tipo × coef_ascensor_planta
 *          × coef_finca × coef_exterior × coef_baños
 *          × coef_tamaño × coef_alquilado
 *          × (1 + Σ extras_aditivos)
 *          × coef_trastero,
 *        0.75, 1.25
 *      )
 *
 *      valor_probable = m² × pricePerM²_zona × coef_propiedad
 *      [low, high] = valor_probable × bandFor(confianza)
 *
 *  Confidence score follows Pau's spec verbatim (zone 20, m² 15, etc.)
 *  with band widths ±7% / ±9% / ±12% by tier.
 *
 *  Defaults: when an input isn't provided, its coefficient is 1.00 (no
 *  effect on price). This lets Pass A swap the engine without changing
 *  the live user experience — coefficients only kick in once Pass B
 *  surfaces the new form fields.
 */

import { matchZone, BASE_PRICE_M2, COEF_COMERCIAL, type Zone } from '../data/zones'

/* ─── Inputs ─────────────────────────────────────────────────────────── */

export type Estado = 'reformar' | 'buen-estado' | 'reformada' | 'obra-nueva'
export type Tipo = 'piso' | 'planta-baja' | 'casa' | 'atico' | 'duplex'
export type Exterior = 'interior' | 'semi-exterior' | 'exterior'

export interface ValuationInput {
  /** Free-text address / barrio / postal code. */
  ubicacion: string
  /** Built m². */
  metros: number
  /** Property condition. */
  estado?: Estado
  /** Property type. Defaults to 'piso'. */
  tipo?: Tipo
  /** Number of bedrooms (informational, no coefficient yet). */
  habitaciones?: number
  /** Number of bathrooms. */
  banos?: number
  /** Floor number (0 = ground floor). */
  planta?: number
  /** Whether the building has a lift. */
  ascensor?: boolean
  /** Window orientation. */
  exterior?: Exterior
  /** Has storage room (trastero). */
  trastero?: boolean
  /** Approximate construction year of the building. */
  anoConstruccion?: number
  /** Sitting tenant in place — discounts the price. */
  alquilado?: boolean
  /**
   * Legacy "extras" array carried over from the current 5-step form.
   * Today this collects {ascensor, parking, terraza, balcon, ninguno}.
   * Pass A keeps these working as additive bonuses, with one exception:
   * if `ascensor` AND `planta` are explicitly provided as top-level
   * fields, they take over and the legacy 'ascensor' string is ignored.
   */
  extras?: string[]
}

export interface ValuationOutput {
  pricePerM2: number
  midValue: number
  lowValue: number
  highValue: number
  zone: Zone | null
  confidenceScore: number
  confidenceLabel: 'baja' | 'media' | 'alta'
  /** Coefficients applied, exposed for debugging / future UI tooltip. */
  breakdown: {
    basePerM2: number
    zoneMult: number
    coefComercial: number
    coefEstado: number
    coefTipo: number
    coefAscensorPlanta: number
    coefFinca: number
    coefExterior: number
    coefBanos: number
    coefTamano: number
    coefAlquilado: number
    coefTrastero: number
    extrasBonus: number
    coefPropiedadRaw: number
    coefPropiedadClamped: number
    clamped: boolean
  }
  /** True when m² or other inputs land outside V1's safe range. */
  specialCase: boolean
  specialReason?: string
}

/* ─── Coefficient tables ─────────────────────────────────────────────── */

const ESTADO_COEF: Record<Estado, number> = {
  reformar: 0.80,
  'buen-estado': 1.00,
  reformada: 1.15,
  'obra-nueva': 1.30,
}

/** Property type. Pau didn't give numbers in his V1 doc — these are my
 *  recommended starting values from common Spanish market patterns. */
const TIPO_COEF: Record<Tipo, number> = {
  'planta-baja': 0.90,
  piso: 1.00,
  duplex: 1.02,
  atico: 1.07,
  casa: 1.20,
}

const EXTERIOR_COEF: Record<Exterior, number> = {
  interior: 0.96,
  'semi-exterior': 0.99,
  exterior: 1.03,
}

/* Additive bonuses used in (1 + Σ). Ascensor is intentionally NOT here
 * in the new model — it's handled by coef_ascensor_planta. The legacy
 * code path treats 'ascensor' in extras as +3% only when planta isn't
 * provided as a top-level field. */
const EXTRA_BONUS: Record<string, number> = {
  ascensor: 0.03, // legacy fallback only
  parking: 0.05,
  terraza: 0.04,
  balcon: 0.02,
  ninguno: 0,
}

const ALQUILADO_DISCOUNT = 0.85 // sitting tenant → harder to sell
const TRASTERO_BONUS = 1.01

const COEF_PROP_MIN = 0.75
const COEF_PROP_MAX = 1.25

/* ─── Coefficient functions ──────────────────────────────────────────── */

function coefAscensorPlanta(planta: number, ascensor: boolean): number {
  if (ascensor) return 1.0
  if (planta <= 1) return 0.98
  if (planta <= 3) return 0.94
  return 0.88
}

function coefFinca(ano: number | undefined): number {
  if (ano === undefined) return 1.0
  if (ano < 1950) return 0.97 // anterior a 1950 sin actualizar (heuristic)
  if (ano < 2005) return 1.0  // antigua conservada / estándar
  return 1.04                 // seminueva o moderna
}

function coefBanos(n: number | undefined): number {
  if (n === undefined || n <= 1) return 1.0
  if (n === 2) return 1.03
  return 1.05
}

/**
 * Smooth piecewise-linear size correction. Pau's V1 spec is a step
 * function with an absurd jump at the 65/66 m² boundary (a 65 m² flat
 * would price higher than a 66 m² flat). We keep his anchor values but
 * interpolate between them so the curve is monotone-ish.
 *
 *   anchor m²:  25     55     78     105    135
 *   coefficient: 0.97  1.02   1.00   0.98   0.95
 */
function coefTamano(m2: number): number {
  const points: ReadonlyArray<readonly [number, number]> = [
    [25, 0.97],
    [55, 1.02],
    [78, 1.0],
    [105, 0.98],
    [135, 0.95],
  ]
  if (m2 <= points[0][0]) return points[0][1]
  if (m2 >= points[points.length - 1][0]) return points[points.length - 1][1]
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i]
    const [x2, y2] = points[i + 1]
    if (m2 >= x1 && m2 <= x2) {
      const t = (m2 - x1) / (x2 - x1)
      return y1 + t * (y2 - y1)
    }
  }
  return 1.0
}

/* ─── Confidence scoring (Pau's spec) ────────────────────────────────── */

function scoreInput(input: ValuationInput, zone: Zone | null): number {
  let s = 0
  if (zone) s += 20
  if (input.metros > 0) s += 15
  if (input.habitaciones !== undefined) s += 5
  if (input.banos !== undefined) s += 5
  if (input.planta !== undefined) s += 5
  if (input.ascensor !== undefined || input.extras?.includes('ascensor')) s += 10
  if (input.estado) s += 15
  if (input.exterior) s += 10
  if (input.extras?.includes('terraza') || input.extras?.includes('balcon')) s += 5
  if (input.extras?.includes('parking') || input.trastero !== undefined) s += 5
  if (input.anoConstruccion !== undefined) s += 5
  return Math.min(100, s)
}

function bandFor(score: number): { low: number; high: number; label: 'baja' | 'media' | 'alta' } {
  if (score >= 70) return { low: 0.93, high: 1.07, label: 'alta' }
  if (score >= 40) return { low: 0.91, high: 1.09, label: 'media' }
  return { low: 0.88, high: 1.12, label: 'baja' }
}

/* ─── Public API ────────────────────────────────────────────────────── */

export function computeValuation(input: ValuationInput): ValuationOutput {
  const zone = matchZone(input.ubicacion)
  const zoneMult = zone?.mult ?? 1
  const basePerM2 = BASE_PRICE_M2

  /* Per-input coefficients. Defaults of 1.0 keep the price stable for
   * fields the form doesn't yet collect, so this engine is a drop-in
   * replacement until Pass B adds the missing inputs. */
  const coefEstado = input.estado ? ESTADO_COEF[input.estado] : 1.0
  const coefTipo = input.tipo ? TIPO_COEF[input.tipo] : 1.0
  const coefFincaVal = coefFinca(input.anoConstruccion)
  const coefExteriorVal = input.exterior ? EXTERIOR_COEF[input.exterior] : 1.0
  const coefBanosVal = coefBanos(input.banos)
  const coefTamanoVal = coefTamano(input.metros)
  const coefAlquiladoVal = input.alquilado ? ALQUILADO_DISCOUNT : 1.0

  /* Trastero — separate from the legacy extras list since the form
   * doesn't ask it yet. */
  const coefTrasteroVal = input.trastero ? TRASTERO_BONUS : 1.0

  /* Ascensor + planta. Three modes:
   *   - Both `planta` and `ascensor` provided → use coef_ascensor_planta
   *     (new model)
   *   - Neither provided but legacy 'ascensor' in extras → fall back to
   *     a +3% additive bonus via the extras path (handled below)
   *   - Otherwise → coefficient 1.0 (no effect)
   */
  let coefAscensorPlantaVal = 1.0
  let useLegacyAscensorBonus = false
  if (input.planta !== undefined && input.ascensor !== undefined) {
    coefAscensorPlantaVal = coefAscensorPlanta(input.planta, input.ascensor)
  } else if (input.extras?.includes('ascensor')) {
    useLegacyAscensorBonus = true
  }

  /* Additive extras (terraza/balcón/parking, plus legacy ascensor when
   * the new fields aren't provided). */
  const extrasBonus = (input.extras ?? [])
    .filter((e) => e !== 'ninguno')
    .filter((e) => e !== 'ascensor' || useLegacyAscensorBonus)
    .reduce((sum, e) => sum + (EXTRA_BONUS[e] ?? 0), 0)

  /* Combine into the property-specific coefficient. */
  const coefPropiedadRaw =
    coefEstado *
    coefTipo *
    coefAscensorPlantaVal *
    coefFincaVal *
    coefExteriorVal *
    coefBanosVal *
    coefTamanoVal *
    coefAlquiladoVal *
    coefTrasteroVal *
    (1 + extrasBonus)

  const coefPropiedadClamped = Math.max(
    COEF_PROP_MIN,
    Math.min(COEF_PROP_MAX, coefPropiedadRaw),
  )
  const clamped = coefPropiedadClamped !== coefPropiedadRaw

  const pricePerM2_zona = basePerM2 * zoneMult * COEF_COMERCIAL
  const pricePerM2 = pricePerM2_zona * coefPropiedadClamped
  const midValue = Math.round(input.metros * pricePerM2)

  /* Confidence-driven band width. */
  const score = scoreInput(input, zone)
  const band = bandFor(score)
  const lowValue = Math.round(midValue * band.low)
  const highValue = Math.round(midValue * band.high)

  /* Special-case detection — flag for manual review. */
  let specialCase = false
  let specialReason: string | undefined
  if (input.metros < 25) {
    specialCase = true
    specialReason = 'metros_muy_bajos'
  } else if (input.metros > 250) {
    specialCase = true
    specialReason = 'metros_muy_altos'
  } else if (input.tipo === 'atico' && (input.metros > 150 || input.extras?.includes('terraza'))) {
    specialCase = true
    specialReason = 'atico_singular'
  }

  return {
    pricePerM2: Math.round(pricePerM2),
    midValue,
    lowValue,
    highValue,
    zone,
    confidenceScore: score,
    confidenceLabel: band.label,
    breakdown: {
      basePerM2,
      zoneMult,
      coefComercial: COEF_COMERCIAL,
      coefEstado,
      coefTipo,
      coefAscensorPlanta: coefAscensorPlantaVal,
      coefFinca: coefFincaVal,
      coefExterior: coefExteriorVal,
      coefBanos: coefBanosVal,
      coefTamano: Number(coefTamanoVal.toFixed(4)),
      coefAlquilado: coefAlquiladoVal,
      coefTrastero: coefTrasteroVal,
      extrasBonus,
      coefPropiedadRaw,
      coefPropiedadClamped,
      clamped,
    },
    specialCase,
    specialReason,
  }
}
