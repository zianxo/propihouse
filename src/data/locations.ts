/*
 * ═══════════════════════════════════════════════════════════════════════
 *  L'Hospitalet — search suggestions for the Valorador address field
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  Three input flavors are unified into one suggestion list:
 *    1. Barrios (zone.displayName) — the canonical labels
 *    2. Postal codes + alias variants from zones.ts
 *    3. Curated streets / avenues / plazas, each tagged with a zoneSlug
 *
 *  The autocomplete in ValoradorPage calls searchLocations(query) and
 *  renders the result. When a user picks an entry the input is filled
 *  with the canonical `label`, and matchZone() (which already scans
 *  zone aliases) routes the engine via the zoneSlug.
 *
 *  The streets list is intentionally curated rather than exhaustive —
 *  better to have well-known main arteries with confident barrio
 *  attribution than thousands of low-confidence entries. Pau can
 *  extend it any time; nothing in the engine depends on completeness.
 */

import { ZONES, type Zone } from './zones'

export type LocationCategory =
  | 'barrio'
  | 'codigo-postal'
  | 'calle'
  | 'avenida'
  | 'plaza'
  | 'rambla'

export interface LocationSuggestion {
  /** What gets written into the input + shown in the result. */
  label: string
  /** Subtitle in the dropdown row — usually "<barrio> · <distrito>". */
  description: string
  /** Routes the engine to the right zone via matchZone aliases. */
  zoneSlug: string
  /** Lowercase, diacritic-stripped concatenation used for substring search. */
  searchText: string
  category: LocationCategory
}

/* ─── Curated streets / avenues / plazas ──────────────────────────────── */

interface StreetSeed {
  label: string
  zoneSlug: string
  category: LocationCategory
  /** Optional extra search aliases (common shortenings, alt spellings). */
  aliases?: string[]
}

const STREET_SEEDS: StreetSeed[] = [
  /* ─── Centre ─────────────────────────────────────────────────────── */
  { label: 'Carrer Major', zoneSlug: 'centre', category: 'calle' },
  { label: 'Avinguda del Carrilet', zoneSlug: 'centre', category: 'avenida', aliases: ['avenida carrilet', 'av carrilet'] },
  { label: 'Carrer d’Enric Prat de la Riba', zoneSlug: 'centre', category: 'calle', aliases: ['prat de la riba', 'enric prat'] },
  { label: 'Carrer del Xipreret', zoneSlug: 'centre', category: 'calle', aliases: ['xipreret'] },
  { label: 'Carrer del Migdia', zoneSlug: 'centre', category: 'calle' },
  { label: 'Carrer del Bruc', zoneSlug: 'centre', category: 'calle' },
  { label: 'Plaça de l’Ajuntament', zoneSlug: 'centre', category: 'plaza', aliases: ['plaza ayuntamiento'] },
  { label: 'Plaça Espanyola', zoneSlug: 'centre', category: 'plaza', aliases: ['plaza espanyola'] },
  { label: 'Rambla de Just Oliveras', zoneSlug: 'centre', category: 'rambla', aliases: ['just oliveras', 'rambla just oliveras'] },

  /* ─── Sant Josep ─────────────────────────────────────────────────── */
  { label: 'Plaça d’Europa', zoneSlug: 'sant-josep', category: 'plaza', aliases: ['plaza europa', 'plaça europa', 'pl europa'] },
  { label: 'Avinguda de la Granvia', zoneSlug: 'sant-josep', category: 'avenida', aliases: ['gran via', 'granvia', 'avenida gran via'] },
  { label: 'Avinguda d’Isabel la Catòlica', zoneSlug: 'sant-josep', category: 'avenida', aliases: ['isabel la catolica'] },
  { label: 'Carrer del Cobalt', zoneSlug: 'sant-josep', category: 'calle', aliases: ['cobalt'] },
  { label: 'Carrer de la Ciència', zoneSlug: 'sant-josep', category: 'calle' },
  { label: 'Carrer del Foc', zoneSlug: 'sant-josep', category: 'calle' },
  { label: 'L’Illa', zoneSlug: 'sant-josep', category: 'plaza', aliases: ['lilla', 'illa'] },
  { label: 'Fira de Barcelona — Granvia', zoneSlug: 'sant-josep', category: 'plaza', aliases: ['fira', 'fira barcelona'] },

  /* ─── Sanfeliu ───────────────────────────────────────────────────── */
  { label: 'Carrer de la Riera Blanca', zoneSlug: 'sanfeliu', category: 'calle', aliases: ['riera blanca'] },
  { label: 'Carrer del Llobregat', zoneSlug: 'sanfeliu', category: 'calle' },
  { label: 'Avinguda dels Països Catalans', zoneSlug: 'sanfeliu', category: 'avenida', aliases: ['paises catalanes'] },

  /* ─── Collblanc ──────────────────────────────────────────────────── */
  { label: 'Carrer del Doctor Martí i Julià', zoneSlug: 'collblanc', category: 'calle', aliases: ['marti i julia', 'martí julià'] },
  { label: 'Avinguda d’Amèrica', zoneSlug: 'collblanc', category: 'avenida', aliases: ['avenida america'] },
  { label: 'Carrer de la Riera Blanca', zoneSlug: 'collblanc', category: 'calle', aliases: ['riera blanca collblanc'] },
  { label: 'Travessera de Collblanc', zoneSlug: 'collblanc', category: 'calle' },
  { label: 'Carrer del Pareto', zoneSlug: 'collblanc', category: 'calle' },

  /* ─── La Torrassa ─────────────────────────────────────────────────── */
  { label: 'Carrer del Progrés', zoneSlug: 'la-torrassa', category: 'calle' },
  { label: 'Carrer de Pujós', zoneSlug: 'la-torrassa', category: 'calle', aliases: ['pujos'] },
  { label: 'Carrer de Roselló', zoneSlug: 'la-torrassa', category: 'calle' },
  { label: 'Plaça d’Espanya Industrial', zoneSlug: 'la-torrassa', category: 'plaza', aliases: ['espanya industrial'] },

  /* ─── Santa Eulàlia ──────────────────────────────────────────────── */
  { label: 'Carrer de Santa Eulàlia', zoneSlug: 'santa-eulalia', category: 'calle' },
  { label: 'Carrer de Castelao', zoneSlug: 'santa-eulalia', category: 'calle', aliases: ['castelao'] },
  { label: 'Carrer de Pi i Margall', zoneSlug: 'santa-eulalia', category: 'calle', aliases: ['pi margall', 'pi i margall'] },
  { label: 'Avinguda d’Esplugues', zoneSlug: 'santa-eulalia', category: 'avenida', aliases: ['esplugues'] },

  /* ─── Granvia Sud ────────────────────────────────────────────────── */
  { label: 'Avinguda de la Granvia (Sud)', zoneSlug: 'granvia-sud', category: 'avenida', aliases: ['granvia sud', 'gran via sud'] },
  { label: 'Carrer dels Joglars', zoneSlug: 'granvia-sud', category: 'calle', aliases: ['joglars'] },

  /* ─── La Florida ─────────────────────────────────────────────────── */
  { label: 'Carrer de la Florida', zoneSlug: 'la-florida', category: 'calle' },
  { label: 'Avinguda de Catalunya', zoneSlug: 'la-florida', category: 'avenida', aliases: ['avenida catalunya'] },
  { label: 'Carrer de Joaquim Costa', zoneSlug: 'la-florida', category: 'calle', aliases: ['joaquim costa'] },

  /* ─── Les Planes ─────────────────────────────────────────────────── */
  { label: 'Avinguda del Masnou', zoneSlug: 'les-planes', category: 'avenida' },
  { label: 'Carrer de Provença', zoneSlug: 'les-planes', category: 'calle', aliases: ['provenca'] },

  /* ─── Pubilla Cases ──────────────────────────────────────────────── */
  { label: 'Carrer de Pubilla Casas', zoneSlug: 'pubilla-cases', category: 'calle', aliases: ['pubilla casas'] },
  { label: 'Avinguda d’Oriol Martorell', zoneSlug: 'pubilla-cases', category: 'avenida', aliases: ['oriol martorell'] },

  /* ─── Can Serra ──────────────────────────────────────────────────── */
  { label: 'Carrer de Can Serra', zoneSlug: 'can-serra', category: 'calle' },
  { label: 'Plaça de Can Serra', zoneSlug: 'can-serra', category: 'plaza' },

  /* ─── Bellvitge ──────────────────────────────────────────────────── */
  { label: 'Avinguda de Severo Ochoa', zoneSlug: 'bellvitge', category: 'avenida', aliases: ['severo ochoa'] },
  { label: 'Avinguda d’Europa', zoneSlug: 'bellvitge', category: 'avenida', aliases: ['avenida europa'] },
  { label: 'Rambla Marina', zoneSlug: 'bellvitge', category: 'rambla', aliases: ['marina'] },
  { label: 'Carrer del Mossèn Anton Romeu', zoneSlug: 'bellvitge', category: 'calle', aliases: ['anton romeu', 'mossen anton'] },

  /* ─── El Gornal ──────────────────────────────────────────────────── */
  { label: 'Carrer de l’Ebre', zoneSlug: 'el-gornal', category: 'calle', aliases: ['ebre', 'ebro'] },
  { label: 'Avinguda dels Joglars', zoneSlug: 'el-gornal', category: 'avenida' },
]

/* ─── Postal-code suggestions ─────────────────────────────────────────── */

interface PostalSeed {
  cp: string
  zoneSlug: string
}

const POSTAL_CODES: PostalSeed[] = [
  { cp: '08901', zoneSlug: 'centre' },
  { cp: '08902', zoneSlug: 'santa-eulalia' },
  { cp: '08903', zoneSlug: 'la-torrassa' },
  { cp: '08904', zoneSlug: 'collblanc' },
  { cp: '08905', zoneSlug: 'les-planes' },
  { cp: '08906', zoneSlug: 'pubilla-cases' },
  { cp: '08907', zoneSlug: 'bellvitge' },
  { cp: '08908', zoneSlug: 'sant-josep' },
]

/* ─── Build the unified suggestion list ───────────────────────────────── */

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function describeZone(zone: Zone | undefined, fallback: string): string {
  if (!zone) return fallback
  return `${zone.displayName} · ${zone.district}`
}

function buildSuggestions(): LocationSuggestion[] {
  const list: LocationSuggestion[] = []
  const zoneBySlug = new Map(ZONES.map((z) => [z.slug, z]))

  /* 1. Barrios — top priority results. */
  for (const z of ZONES) {
    list.push({
      label: z.displayName,
      description: z.district,
      zoneSlug: z.slug,
      searchText: normalize(`${z.displayName} ${z.aliases.join(' ')}`),
      category: 'barrio',
    })
  }

  /* 2. Postal codes — discovered through postal-code typing. */
  for (const p of POSTAL_CODES) {
    const z = zoneBySlug.get(p.zoneSlug)
    list.push({
      label: p.cp,
      description: describeZone(z, p.cp),
      zoneSlug: p.zoneSlug,
      searchText: normalize(p.cp),
      category: 'codigo-postal',
    })
  }

  /* 3. Streets / avenues / plazas. */
  for (const s of STREET_SEEDS) {
    const z = zoneBySlug.get(s.zoneSlug)
    list.push({
      label: s.label,
      description: describeZone(z, s.zoneSlug),
      zoneSlug: s.zoneSlug,
      searchText: normalize([s.label, ...(s.aliases ?? [])].join(' ')),
      category: s.category,
    })
  }

  return list
}

const ALL_LOCATIONS: LocationSuggestion[] = buildSuggestions()

/* ─── Public API ──────────────────────────────────────────────────────── */

/**
 * Substring + prefix-ranked search across barrios, postal codes, and
 * curated streets. Returns up to `limit` results. Empty queries return
 * an empty list (the autocomplete hides itself).
 */
export function searchLocations(query: string, limit = 8): LocationSuggestion[] {
  const n = normalize(query)
  if (!n) return []

  const scored: Array<{ entry: LocationSuggestion; rank: number }> = []
  for (const entry of ALL_LOCATIONS) {
    if (!entry.searchText.includes(n)) continue
    /* Rank: prefix matches (rank 0) beat substring matches (rank 1).
     * Within same rank, barrios beat postal codes beat streets. */
    const prefixMatch = entry.searchText.startsWith(n)
    const categoryRank =
      entry.category === 'barrio' ? 0 : entry.category === 'codigo-postal' ? 1 : 2
    scored.push({ entry, rank: (prefixMatch ? 0 : 10) + categoryRank })
  }

  return scored
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit)
    .map((s) => s.entry)
}

/**
 * Resolve a free-text location to its zoneSlug if we can. First tries an
 * exact label match (the user picked from autocomplete), then falls back
 * to substring scan over the same data. Returns null if nothing matches —
 * caller should defer to matchZone() in zones.ts.
 */
export function resolveLocationToZoneSlug(input: string): string | null {
  const n = normalize(input)
  if (!n) return null
  /* Prefer exact label match — autocomplete-picked entries always match
   * their own searchText exactly. */
  const exact = ALL_LOCATIONS.find((loc) => loc.searchText === n)
  if (exact) return exact.zoneSlug
  /* Otherwise, find the longest substring match — biggest match wins. */
  let best: { slug: string; len: number } | null = null
  for (const loc of ALL_LOCATIONS) {
    if (n.includes(loc.searchText) || loc.searchText.includes(n)) {
      const len = Math.min(n.length, loc.searchText.length)
      if (!best || len > best.len) best = { slug: loc.zoneSlug, len }
    }
  }
  return best?.slug ?? null
}
