/**
 * The metadata an article may declare, and what happens when it declares something else.
 *
 * ## Nothing is required
 *
 * A valid content document needs no frontmatter at all. This is not leniency for its own sake: the
 * Golden Test Document has none, and a reading engine whose own contract document could not be loaded
 * as content would be a strange engine. Every field therefore has a defined fallback, and the
 * *resolution order* for a title is part of the model rather than a detail of the UI.
 *
 * ## Unknown keys are reported, not swallowed
 *
 * `tag:` instead of `tags:` is a typo that would otherwise be invisible — the article would simply
 * have no tags, and nobody would know why. Unknown keys become warnings naming the field.
 *
 * See `docs/architecture/0009-content-model.md` for the reference and optional fields.
 */

import type { ContentIssue } from './issues'
import { warning } from './issues'

export type ArticleMetadata = {
  /** Displayed title. Falls back to the first heading, then the file name. */
  title?: string
  /** One-line summary, for an index or a preview card. */
  description?: string
  /**
   * Publication date, as written (`2026-09-13`). Kept as a string on purpose: a YAML date parses to a
   * string in the core schema, ISO dates sort correctly as text, and turning it into a `Date` would
   * invent a time zone the author never wrote.
   */
  date?: string
  /** Free-form labels, for grouping and search. Order and spelling are the author's. */
  tags: string[]
  /** Manual position in an index. Lower comes first; documents without one follow. */
  order?: number
  /** Kept out of the index unless drafts are explicitly included. */
  draft: boolean
}

export const EMPTY_METADATA: ArticleMetadata = { tags: [], draft: false }

/** Every key the model understands. Anything else is reported as a typo. */
const KNOWN_KEYS = new Set([
  'title',
  'description',
  'date',
  'tags',
  'order',
  'draft',
])

export type MetadataResult = {
  metadata: ArticleMetadata
  issues: ContentIssue[]
}

export function readMetadata(data: Record<string, unknown>): MetadataResult {
  const issues: ContentIssue[] = []
  const metadata: ArticleMetadata = { tags: [], draft: false }

  for (const key of Object.keys(data)) {
    if (!KNOWN_KEYS.has(key)) {
      issues.push(
        warning(
          `\`${key}\` is not a known frontmatter field and was ignored. Known fields: ${[...KNOWN_KEYS].join(', ')}.`,
          key,
        ),
      )
    }
  }

  const title = readString(data.title, 'title', issues)
  if (title !== undefined) metadata.title = title

  const description = readString(data.description, 'description', issues)
  if (description !== undefined) metadata.description = description

  const date = readDate(data.date, issues)
  if (date !== undefined) metadata.date = date

  metadata.tags = readTags(data.tags, issues)

  const order = readNumber(data.order, 'order', issues)
  if (order !== undefined) metadata.order = order

  const draft = readBoolean(data.draft, 'draft', issues)
  if (draft !== undefined) metadata.draft = draft

  return { metadata, issues }
}

function readString(
  value: unknown,
  field: string,
  issues: ContentIssue[],
): string | undefined {
  if (value === undefined || value === null) return undefined

  if (typeof value === 'string') {
    const trimmed = value.trim()

    if (trimmed === '') {
      issues.push(warning(`\`${field}\` is empty and was ignored.`, field))
      return undefined
    }

    return trimmed
  }

  issues.push(
    warning(
      `\`${field}\` must be text; \`${describe(value)}\` was ignored.`,
      field,
    ),
  )
  return undefined
}

function readDate(value: unknown, issues: ContentIssue[]): string | undefined {
  if (value === undefined || value === null) return undefined

  if (typeof value === 'string' && value.trim() !== '') {
    // Validated rather than trusted: `2026-13-45` sorts fine and means nothing.
    if (!/^\d{4}-\d{2}-\d{2}(?:[T ].*)?$/.test(value.trim())) {
      issues.push(
        warning(
          `\`date\` should look like \`2026-09-13\`; \`${value.trim()}\` was kept but will not sort as a date.`,
          'date',
        ),
      )
    }

    return value.trim()
  }

  // A YAML timestamp that some schema parsed into a `Date`: keep the date part, drop the invented time.
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }

  issues.push(
    warning(
      `\`date\` must be text; \`${describe(value)}\` was ignored.`,
      'date',
    ),
  )
  return undefined
}

function readTags(value: unknown, issues: ContentIssue[]): string[] {
  if (value === undefined || value === null) return []

  const list = typeof value === 'string' ? [value] : value

  if (!Array.isArray(list)) {
    issues.push(
      warning(
        `\`tags\` must be a list, or a single tag as text; \`${describe(value)}\` was ignored.`,
        'tags',
      ),
    )
    return []
  }

  const tags: string[] = []
  const seen = new Set<string>()

  for (const entry of list) {
    if (typeof entry !== 'string') {
      issues.push(
        warning(
          `A tag must be text; \`${describe(entry)}\` was ignored.`,
          'tags',
        ),
      )
      continue
    }

    const tag = entry.trim()
    const key = tag.toLowerCase()

    if (tag === '') continue
    // Case-insensitive duplicates collapse; the first spelling wins, because that is the author's.
    if (seen.has(key)) continue

    seen.add(key)
    tags.push(tag)
  }

  return tags
}

function readNumber(
  value: unknown,
  field: string,
  issues: ContentIssue[],
): number | undefined {
  if (value === undefined || value === null) return undefined

  if (typeof value === 'number' && Number.isFinite(value)) return value

  if (
    typeof value === 'string' &&
    value.trim() !== '' &&
    Number.isFinite(Number(value))
  ) {
    issues.push(
      warning(
        `\`${field}\` was written as text; \`${value.trim()}\` was read as a number.`,
        field,
      ),
    )
    return Number(value)
  }

  issues.push(
    warning(
      `\`${field}\` must be a number; \`${describe(value)}\` was ignored.`,
      field,
    ),
  )
  return undefined
}

function readBoolean(
  value: unknown,
  field: string,
  issues: ContentIssue[],
): boolean | undefined {
  if (value === undefined || value === null) return undefined

  if (typeof value === 'boolean') return value

  if (value === 'true' || value === 'false') {
    issues.push(
      warning(
        `\`${field}\` was written as text; \`${value}\` was read as \`${value === 'true'}\`.`,
        field,
      ),
    )
    return value === 'true'
  }

  issues.push(
    warning(
      `\`${field}\` must be \`true\` or \`false\`; \`${describe(value)}\` was ignored.`,
      field,
    ),
  )
  return undefined
}

/** Describes a value for an author-facing message without dumping its contents. */
function describe(value: unknown): string {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'a list'
  if (typeof value === 'object') return 'a mapping'

  return `${typeof value} ${JSON.stringify(value)}`
}
