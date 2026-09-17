/**
 * The content manifest: every article, in one deterministic order, plus the groupings an index needs.
 *
 * ## Order is part of the model
 *
 * "The same library always produces the same order" is what makes a manifest testable and what stops a
 * reading position, a previous/next link or an index from shuffling between two loads. The order is:
 *
 * 1. `order` from the frontmatter, ascending, when the author gave one;
 * 2. then by `date`, newest first, when the author gave one;
 * 3. then by title, alphabetically;
 * 4. then by id, so two articles with the same title still have one fixed order.
 *
 * ## Sections come from the folders, tags come from the frontmatter
 *
 * The roadmap asks whether categories and tags are useful. Both are, but they are not the same thing:
 * tags are labels an author chooses, while the *section* of an article is where it lives
 * (`manual/intro/uso.md` is in `manual/intro`). Deriving sections from paths means the folder structure
 * an author already has organises the library, with no second field to keep in agreement — and it is
 * what the real content tree will look like.
 *
 * Search is built here too, as data and a query; its interface belongs to Phase 17.
 */

import type { Article, ContentSource } from './article'
import { readArticle } from './article'
import type { ContentIssue } from './issues'

export type ContentManifest = {
  articles: Article[]
  issues: ContentIssue[]
}

export type BuildManifestOptions = {
  /** Drafts are left out unless asked for. */
  includeDrafts?: boolean
}

export function buildManifest(
  sources: ContentSource[],
  options: BuildManifestOptions = {},
): ContentManifest {
  const articles = sources.map(readArticle)
  const issues: ContentIssue[] = articles.flatMap((article) => article.issues)

  for (const duplicate of duplicateIds(articles)) {
    issues.push({
      severity: 'error',
      message: `Two documents share the id \`${duplicate}\`. One of them will be unreachable; give them different paths.`,
      source: duplicate,
    })
  }

  const kept = options.includeDrafts === true
    ? articles
    : articles.filter((article) => !article.draft)

  return { articles: sortArticles(kept), issues }
}

function duplicateIds(articles: Article[]): string[] {
  const seen = new Set<string>()
  const duplicates = new Set<string>()

  for (const article of articles) {
    if (seen.has(article.id)) duplicates.add(article.id)
    seen.add(article.id)
  }

  return [...duplicates]
}

/** Exported so an index built from a filtered list keeps the manifest's order. */
export function sortArticles(articles: Article[]): Article[] {
  return [...articles].sort((left, right) => {
    const order = compareOrders(left.order, right.order)
    if (order !== 0) return order

    const date = compareDates(left.date, right.date)
    if (date !== 0) return date

    const title = left.title.localeCompare(right.title)
    if (title !== 0) return title

    return left.id.localeCompare(right.id)
  })
}

/** Lower numbers first; documents without an order come after those with one. */
function compareOrders(left?: number, right?: number): number {
  if (left === undefined && right === undefined) return 0
  if (left === undefined) return 1
  if (right === undefined) return -1

  return left - right
}

/** Newest first; documents without a date come last. ISO dates compare correctly as text. */
function compareDates(left?: string, right?: string): number {
  if (left === undefined && right === undefined) return 0
  if (left === undefined) return 1
  if (right === undefined) return -1

  return right.localeCompare(left)
}

export type TagIndexEntry = {
  tag: string
  articles: Article[]
}

/** Every tag in use, most used first, then alphabetically. */
export function buildTagIndex(articles: Article[]): TagIndexEntry[] {
  const byTag = new Map<string, { tag: string; articles: Article[] }>()

  for (const article of articles) {
    for (const tag of article.tags) {
      const key = tag.toLowerCase()
      const entry = byTag.get(key) ?? { tag, articles: [] }

      entry.articles.push(article)
      byTag.set(key, entry)
    }
  }

  return [...byTag.values()].sort(
    (left, right) =>
      right.articles.length - left.articles.length ||
      left.tag.localeCompare(right.tag),
  )
}

export type SectionNode = {
  /** The last path segment: `intro`. Empty at the root. */
  name: string
  /** The full section path: `manual/intro`. */
  path: string
  /** Articles directly in this section, in manifest order. */
  articles: Article[]
  children: SectionNode[]
}

/**
 * Nests articles by the folders they live in.
 *
 * A section with no articles of its own is still created for its children, so a tree never loses a
 * document because its parent folder happened to contain none.
 */
export function buildSectionTree(articles: Article[]): SectionNode[] {
  const root: SectionNode = { name: '', path: '', articles: [], children: [] }

  for (const article of articles) {
    const segments = article.section === '' ? [] : article.section.split('/')
    let node = root

    for (const segment of segments) {
      const path = node.path === '' ? segment : `${node.path}/${segment}`
      let child = node.children.find((candidate) => candidate.name === segment)

      if (child === undefined) {
        child = { name: segment, path, articles: [], children: [] }
        node.children.push(child)
      }

      node = child
    }

    node.articles.push(article)
  }

  sortTree(root)

  return root.children
}

function sortTree(node: SectionNode): void {
  node.children.sort((left, right) => left.name.localeCompare(right.name))

  for (const child of node.children) sortTree(child)
}

export type NavigationLink = {
  id: string
  title: string
}

export type NavigationEntry = {
  id: string
  previous: NavigationLink | null
  next: NavigationLink | null
}

/**
 * Previous and next for every article, in the manifest's order.
 *
 * Derived rather than declared: an author who reorders an index must not also have to fix a dozen
 * `next:` fields, and a wrong one is invisible until a reader follows it.
 */
export function readNavigation(articles: Article[]): NavigationEntry[] {
  return articles.map((article, index) => {
    const previous = articles[index - 1]
    const next = articles[index + 1]

    return {
      id: article.id,
      previous: previous === undefined ? null : link(previous),
      next: next === undefined ? null : link(next),
    }
  })
}

function link(article: Article): NavigationLink {
  return { id: article.id, title: article.title }
}
