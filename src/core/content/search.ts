/**
 * Search over the manifest.
 *
 * This is the *query*, not the interface: Phase 17 owns the search screen and result highlighting. What
 * is fixed here is the behaviour a reader can rely on, so that a later interface cannot quietly change
 * what "found" means.
 *
 * ## The rules
 *
 * - Every word in the query must match somewhere (AND, not OR). A search that widens with every word
 *   typed is how a reader ends up scrolling a list of everything.
 * - Matching ignores case and accents, because a Spanish library is searched by people who type
 *   `guia` as often as `guía`.
 * - Fields are weighted: a title match beats a tag, a tag beats the summary, the summary beats the body.
 * - Results keep the manifest's order when scores tie, so the same search always returns the same list.
 */

import type { Article } from './article'

export type SearchField = 'title' | 'tag' | 'description' | 'body'

export type SearchResult = {
  article: Article
  score: number
  /** The fields at least one query word was found in, in weighting order. */
  matchedIn: SearchField[]
}

/** Weights are relative, not absolute: only their order matters. */
const WEIGHTS: Record<SearchField, number> = {
  title: 10,
  tag: 6,
  description: 3,
  body: 1,
}

/** Lowercases and removes accents, so `guía` and `guia` are the same word. */
export function normalizeForSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

export function searchArticles(
  articles: Article[],
  query: string,
  options: { limit?: number } = {},
): SearchResult[] {
  const words = normalizeForSearch(query)
    .split(/\s+/)
    .filter((word) => word !== '')

  if (words.length === 0) return []

  const results: SearchResult[] = []

  for (const article of articles) {
    const fields = fieldsOf(article)
    let score = 0
    const matchedIn = new Set<SearchField>()
    let matchedEveryWord = true

    for (const word of words) {
      let best: { field: SearchField; score: number } | null = null

      for (const [field, text] of fields) {
        const points = scoreField(text, word, field)

        if (points > 0 && (best === null || points > best.score)) {
          best = { field, score: points }
        }
      }

      if (best === null) {
        matchedEveryWord = false
        break
      }

      score += best.score
      matchedIn.add(best.field)
    }

    if (!matchedEveryWord) continue

    results.push({
      article,
      score,
      matchedIn: (['title', 'tag', 'description', 'body'] as const).filter(
        (field) => matchedIn.has(field),
      ),
    })
  }

  // A stable sort keeps the manifest's order for equal scores.
  results.sort((left, right) => right.score - left.score)

  return options.limit === undefined ? results : results.slice(0, options.limit)
}

function fieldsOf(article: Article): Array<[SearchField, string]> {
  return [
    ['title', normalizeForSearch(article.title)],
    ['tag', normalizeForSearch(article.tags.join(' '))],
    ['description', normalizeForSearch(article.description ?? '')],
    ['body', normalizeForSearch(article.body)],
  ]
}

/** How well one word matches one field: a whole word beats a prefix, which beats a substring. */
function scoreField(text: string, word: string, field: SearchField): number {
  if (text === '') return 0

  const weight = WEIGHTS[field]

  if (text === word) return weight * 3
  if (new RegExp(`(?:^|\\s)${escapeRegExp(word)}`).test(text)) return weight * 2
  if (text.includes(word)) return weight

  return 0
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
