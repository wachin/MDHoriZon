/**
 * One document in the content library: where it lives, what it is, and how to show it.
 *
 * ## The real library is a folder tree, not a metadata block
 *
 * MDHoriZon's content is stored the way its author already works:
 *
 * ```text
 * content/ES/Android-Studio/20260414.2-Instalar-Android-Studio-en-MX-Linux-23/Android-Studio-en-MX-23.md
 *         │  │              │                                                       │
 *         │  │              └─ date folder: the first eight digits are the date ─────┘
 *         │  └─ program
 *         └─ language
 * ```
 *
 * So the model reads identity out of the path rather than asking the author to repeat it: the language,
 * the program, the section and the date all come from the folders. Frontmatter is supported and, when
 * present, wins over anything derived — but **none of the 122 documents in the real library has one**,
 * and the engine has to work for the library that exists rather than for the one that would be tidier.
 *
 * ## The date rule
 *
 * A folder whose name begins with eight digits is a date folder: `20260414.2-Instalar-…` is 2026-04-14.
 * What follows the eight digits is free — `.`, `-`, `_`, numbers, words — because that is how the author
 * names them. Eight digits that are not a real calendar date are ignored and reported, since a typo there
 * would otherwise reorder an index silently.
 *
 * An article's `id` is its path, and paths vary in depth (three to five segments in the real library), so
 * nothing here assumes a fixed shape: sections are whatever folders exist.
 */

import type { ContentIssue } from './issues'
import { attributeTo, warning } from './issues'
import { parseFrontmatter } from './frontmatter'
import { readMetadata } from './metadata'
import type { ArticleMetadata } from './metadata'
import type { Cover } from './media'
import { firstMedia, rescueLegacyMarkup } from './media'

export type ContentSource = {
  /** Path inside the content root, e.g. `ES/Android-Studio/20260414.2-…/Android-Studio-en-MX-23.md`. */
  path: string
  /** The document as written. */
  text: string
}

export type Article = ArticleMetadata & {
  /** Deterministic identity derived from `path`. */
  id: string
  /** Normalised path inside the content root, extension included. */
  path: string
  /** The folder the document lives in, `''` at the root. */
  section: string
  /**
   * Where the entry belongs in a tree: the section with its date folder removed, when it has one.
   *
   * `ES/Go/20260101-uno/uno.md` belongs to `ES/Go`, not to a group named after its own date folder —
   * the date folder is where an entry is *stored*, not what it is *about*. Without this, every entry
   * would be a category of its own and an index would be a list of folders.
   */
  collection: string
  /** Always present: metadata, then the first heading, then the file name. */
  title: string
  /** From the first path segment, lowercased (`es`, `en`), when it looks like a language. */
  language?: string
  /** From the second path segment: the program the tutorial is about. */
  program?: string
  /** The first image or video in the document. `null` when it shows none. */
  cover: Cover | null
  /** The document with frontmatter removed and legacy embeds rescued — what gets rendered. */
  body: string
  issues: ContentIssue[]
}

/** `a//b/./c.md` and `\a\b\c.md` are the same document, and must give the same id. */
export function normalizeContentPath(path: string): string {
  return path
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .split('/')
    .filter((segment) => segment !== '' && segment !== '.')
    .join('/')
}

/** The id for a path: the path without a Markdown extension. */
export function articleId(path: string): string {
  return normalizeContentPath(path).replace(/\.(?:md|markdown)$/i, '')
}

/** A path segment that names a language: `ES`, `en`, `pt-BR`. */
const LANGUAGE_SEGMENT = /^([a-z]{2}(?:-[a-z0-9]{2,8})?)$/i

export function readArticle(source: ContentSource): Article {
  const path = normalizeContentPath(source.path)
  const segments = path.split('/')
  const fileName = segments.pop() ?? path

  const frontmatter = parseFrontmatter(source.text)
  const { metadata, issues: metadataIssues } = readMetadata(frontmatter.data)
  const issues: ContentIssue[] = [...frontmatter.issues, ...metadataIssues]

  const language = readLanguage(segments[0])
  const program = language === undefined ? segments[0] : segments[1]
  const folderDate = readFolderDate(segments)

  if (folderDate.issue !== undefined) issues.push(folderDate.issue)

  if (
    metadata.date !== undefined &&
    folderDate.date !== undefined &&
    metadata.date !== folderDate.date
  ) {
    issues.push(
      warning(
        `The frontmatter says \`${metadata.date}\` but the folder says \`${folderDate.date}\`; the frontmatter wins.`,
        'date',
      ),
    )
  }

  // The renderer never sees the legacy forms — Blogger's embedded players and its image size hints —
  // because they are rewritten here, in the text, so the sanitization policy keeps rejecting raw HTML
  // and no image falls back to being shown as its own source (see `media.ts`).
  const body = rescueLegacyMarkup(frontmatter.body)

  return {
    ...metadata,
    // The folder's date is a fallback, never an override: what the author wrote wins.
    ...(metadata.date === undefined && folderDate.date !== undefined
      ? { date: folderDate.date }
      : {}),
    id: articleId(path),
    path,
    section: segments.join('/'),
    collection: collectionOf(segments),
    title: metadata.title ?? firstHeading(body) ?? fromFileName(fileName),
    ...(language === undefined ? {} : { language }),
    ...(program === undefined ? {} : { program }),
    cover: firstMedia(body) ?? null,
    body,
    issues: attributeTo(issues, path),
  }
}

function readLanguage(segment: string | undefined): string | undefined {
  return segment === undefined
    ? undefined
    : LANGUAGE_SEGMENT.exec(segment)?.[1].toLowerCase()
}

/** Whether a folder is named after a date: eight digits, and a real calendar date. */
function isDateFolder(segment: string): boolean {
  const digits = /^(\d{8})/.exec(segment)

  if (digits === null) return false

  return isValidDate(digits[1])
}

function isValidDate(digits: string): boolean {
  const year = Number(digits.slice(0, 4))
  const month = Number(digits.slice(4, 6))
  const day = Number(digits.slice(6, 8))
  const parsed = new Date(Date.UTC(year, month - 1, day))

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  )
}

/**
 * The grouping path: the folders that say what an entry is about.
 *
 * The entry's own date folder is dropped when it has one, because it holds a single entry and grouping
 * by it would produce one category per article. A folder that is not named after a date is kept: it is
 * a grouping the author made on purpose (`…/Inteligencia-Artificial/hermes`).
 */
function collectionOf(segments: string[]): string {
  const last = segments.at(-1)

  if (last !== undefined && isDateFolder(last))
    return segments.slice(0, -1).join('/')

  return segments.join('/')
}

/**
 * The first folder named after a date.
 *
 * Searched from the top so a nested folder named after a date cannot override the entry's own, and so
 * the deeper AI folders — named after programs, not dates — are simply skipped.
 */
function readFolderDate(segments: string[]): {
  date?: string
  issue?: ContentIssue
} {
  for (const segment of segments) {
    const digits = /^(\d{8})/.exec(segment)

    if (digits === null) continue

    if (!isValidDate(digits[1])) {
      return {
        issue: warning(
          `The folder \`${segment}\` starts with eight digits but \`${digits[1]}\` is not a date. The entry has no date.`,
          'date',
        ),
      }
    }

    return { date: digits[1].replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3') }
  }

  return {}
}

/**
 * The first level-one heading, skipping fenced code.
 *
 * A `# ` inside a fence is an example, not the document's title — the golden document is full of them,
 * which is exactly why this skips fences instead of matching the first line that looks right.
 */
export function firstHeading(body: string): string | undefined {
  let fence: string | null = null

  for (const line of body.split('\n')) {
    const marker = /^\s*(`{3,}|~{3,})/.exec(line)

    if (marker !== null) {
      if (fence === null) {
        fence = marker[1][0]
        continue
      }

      if (marker[1][0] === fence) {
        fence = null
        continue
      }
    }

    if (fence !== null) continue

    const heading = /^#[ \t]+(.+?)[ \t]*#*[ \t]*$/.exec(line)

    if (heading !== null) {
      const text = heading[1].replace(/\s+#+\s*$/, '').trim()

      if (text !== '') return text
    }
  }

  return undefined
}

/** Last resort for a title: the file name, with separators turned into spaces. */
function fromFileName(name: string): string {
  return (
    name
      .replace(/\.(?:md|markdown)$/i, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() || name
  )
}
