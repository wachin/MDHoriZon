/**
 * What can go wrong in a document's envelope.
 *
 * Frontmatter is authored by hand, in YAML, by whoever wrote the article — so the useful failure mode
 * is not an exception, it is a list of things a person can fix. Every function in this module returns
 * issues alongside its result rather than throwing: one bad document must not stop a library from
 * being indexed.
 */

export type IssueSeverity =
  /** The document is still readable, but something was ignored or coerced. */
  | 'warning'
  /** Metadata could not be read at all; the document falls back to its defaults. */
  | 'error'

export type ContentIssue = {
  severity: IssueSeverity
  /** What went wrong, phrased for the author of the document. */
  message: string
  /** The document it belongs to, when the caller knows: `manual/intro/uso.md`. */
  source?: string
  /** The metadata key involved, when one is. */
  field?: string
}

export function warning(message: string, field?: string): ContentIssue {
  return { severity: 'warning', message, field }
}

export function error(message: string, field?: string): ContentIssue {
  return { severity: 'error', message, field }
}

/** Attaches the document path to every issue that does not have one yet. */
export function attributeTo(
  issues: ContentIssue[],
  source: string,
): ContentIssue[] {
  return issues.map((issue) => (issue.source === undefined ? { ...issue, source } : issue))
}
