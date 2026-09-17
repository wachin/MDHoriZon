/**
 * Reading the YAML envelope at the top of a document.
 *
 * ## Why this is not a remark plugin
 *
 * `remark-frontmatter` would also work, by recognising the block and then deleting the node. This
 * module takes the other route — split the envelope off *before* the Markdown is handed to the
 * renderer — because that keeps **one** implementation of what frontmatter is. With a plugin, the
 * pipeline would strip the block while the content layer separately had to find the same block to read
 * the metadata, and the two would eventually disagree about edge cases. See
 * `docs/architecture/0009-content-model.md`.
 *
 * ## The rules, exactly
 *
 * - A block is recognised only at the **very start** of the file. A `---` further down is a thematic
 *   break, which is what Markdown says it is.
 * - A leading byte-order mark is ignored: an editor that writes one must not turn an article's
 *   metadata into body text.
 * - The opening delimiter must be a line containing exactly `---`, and the closing delimiter another.
 * - **An unterminated block is not frontmatter.** The document renders as written and an issue records
 *   it. The alternative — swallowing the rest of the document as metadata — loses content silently,
 *   which is the worst possible outcome for a reading engine.
 */

import { parse as parseYaml } from 'yaml'
import type { ContentIssue } from './issues'
import { error, warning } from './issues'

export type FrontmatterResult = {
  /** The parsed mapping, or an empty object when there is none or it could not be read. */
  data: Record<string, unknown>
  /** The document with the envelope removed, ready to render. */
  body: string
  /** Whether a block was found at all, which is what tells a fallback title from a missing one. */
  found: boolean
  issues: ContentIssue[]
}

const BOM = '\uFEFF'
const OPENING = /^---[ \t]*\r?\n/
const CLOSING = /^---[ \t]*$/

export function parseFrontmatter(markdown: string): FrontmatterResult {
  const text = markdown.startsWith(BOM) ? markdown.slice(BOM.length) : markdown

  if (!OPENING.test(text)) {
    return { data: {}, body: text, found: false, issues: [] }
  }

  const lines = text.split('\n')
  // `lines[0]` is the opening delimiter; both `\n` and `\r\n` were consumed by the pattern above.
  const closing = lines.findIndex(
    (line, index) =>
      index > 0 && CLOSING.test(line.trimEnd().replace(/\r$/, '')),
  )

  if (closing === -1) {
    return {
      data: {},
      body: text,
      found: false,
      issues: [
        error(
          'The frontmatter block is never closed. Add a line containing only `---` after the metadata; the block was left in the document rather than swallowing the rest of it.',
        ),
      ],
    }
  }

  // Carriage returns are stripped from the metadata only: a value ending in an invisible `\r` breaks
  // date comparison and sorting, which is how this was found. The body keeps its own line endings.
  const yaml = lines
    .slice(1, closing)
    .map((line) => line.replace(/\r$/, ''))
    .join('\n')
  const body = lines
    .slice(closing + 1)
    .join('\n')
    // Only the blank line that usually follows the envelope is removed: the body keeps its own shape.
    .replace(/^\r?\n/, '')

  return { ...readYaml(yaml), body, found: true }
}

function readYaml(yaml: string): {
  data: Record<string, unknown>
  issues: ContentIssue[]
} {
  if (yaml.trim() === '') {
    return { data: {}, issues: [] }
  }

  let parsed: unknown

  try {
    parsed = parseYaml(yaml)
  } catch (cause) {
    const detail =
      cause instanceof Error ? cause.message.split('\n')[0] : 'unknown error'

    return {
      data: {},
      issues: [error(`The frontmatter is not valid YAML: ${detail}`)],
    }
  }

  if (parsed === null || parsed === undefined) {
    return { data: {}, issues: [] }
  }

  if (typeof parsed !== 'object' || Array.isArray(parsed)) {
    return {
      data: {},
      issues: [
        error(
          'The frontmatter must be a set of `key: value` pairs, not a list or a single value.',
        ),
      ],
    }
  }

  // A YAML key that is not a string (`2026: x`) would otherwise reach the metadata reader as a number.
  const data: Record<string, unknown> = {}
  const issues: ContentIssue[] = []

  for (const [key, value] of Object.entries(
    parsed as Record<string, unknown>,
  )) {
    if (typeof key === 'string') {
      data[key] = value
    } else {
      issues.push(
        warning(
          `The frontmatter key \`${key}\` is not a name and was ignored.`,
        ),
      )
    }
  }

  return { data, issues }
}
