/**
 * One document in the content library: its identity, its metadata and its body.
 *
 * ## Identity comes from the path
 *
 * An article's `id` is derived from where the file lives, never invented: `manual/intro/uso.md` becomes
 * `manual/intro/uso`. That makes it deterministic — the same library produces the same ids every time,
 * on every platform — and it means an author never has to keep an id and a path in agreement. Paths are
 * normalised (separators, `.` segments, a leading slash) before the id is taken, so the same document
 * cannot produce two identities.
 *
 * The two rules that are *not* part of the model are a URL and a route: turning an id into something a
 * router understands belongs to the loader (Phase 10), which is the layer that knows how the library is
 * being served.
 */

import type { ContentIssue } from './issues'
import { attributeTo } from './issues'
import { parseFrontmatter } from './frontmatter'
import { readMetadata } from './metadata'
import type { ArticleMetadata } from './metadata'

export type ContentSource = {
  /** Path inside the content root, e.g. `manual/intro/uso.md`. */
  path: string
  /** The document as written. */
  text: string
}

export type Article = ArticleMetadata & {
  /** Deterministic identity derived from `path`. */
  id: string
  /** Normalised path inside the content root, extension included. */
  path: string
  /** The folder the document lives in, `''` at the root. Derived from the path. */
  section: string
  /** Always present: resolved from the metadata, the first heading, or the file name. */
  title: string
  /** The document with its frontmatter removed — what gets rendered. */
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

export function readArticle(source: ContentSource): Article {
  const path = normalizeContentPath(source.path)
  const frontmatter = parseFrontmatter(source.text)
  const { metadata, issues: metadataIssues } = readMetadata(frontmatter.data)
  const issues = attributeTo(
    [...frontmatter.issues, ...metadataIssues],
    path,
  )

  return {
    ...metadata,
    id: articleId(path),
    path,
    section: sectionOf(path),
    title: metadata.title ?? firstHeading(frontmatter.body) ?? fromFileName(path),
    body: frontmatter.body,
    issues,
  }
}

function sectionOf(path: string): string {
  const separator = path.lastIndexOf('/')

  return separator === -1 ? '' : path.slice(0, separator)
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
    const opening = /^\s*(`{3,}|~{3,})/.exec(line)

    if (opening !== null) {
      if (fence === null) {
        fence = opening[1][0]
        continue
      }

      if (opening[1][0] === fence) {
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
function fromFileName(path: string): string {
  const name = path.split('/').pop() ?? path

  return (
    name
      .replace(/\.(?:md|markdown)$/i, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() || name
  )
}
