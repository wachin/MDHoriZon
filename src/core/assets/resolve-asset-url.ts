/**
 * Resolving a document's relative asset paths against where the document actually lives.
 *
 * A Markdown file that says `![diagram](../assets/diagram.png)` means "next to me", not "next to the
 * page that happens to be rendering me". Without this, every relative image or link in a document is
 * resolved against the *page* URL, which is why the preview showed a broken image: the fixture asked
 * for `./../assets/example.png` and the browser looked for it beside `index.html`.
 *
 * The base is supplied by the caller — the content loader (Phase 10) knows where a document came
 * from — and it is applied **before** the URL policy, so what the policy judges is the resolved URL
 * rather than the relative one.
 *
 * ## What is left alone, and why
 *
 * An absolute URL already says where it points, a root-relative path starts at the site root by
 * definition, a protocol-relative URL (`//host/x`) is absolute in every way but the scheme, and a
 * fragment points inside the current document. None of them is relative to the document's directory,
 * so rewriting any of them would be wrong.
 *
 * See `docs/architecture/0008-assets-and-the-content-package.md`.
 */

/**
 * A host that can never resolve, used to borrow `URL`'s path normalisation for document URLs that
 * have no origin of their own — `/tests/fixtures/doc.md`, which is what a test or an in-page preview
 * supplies. It is stripped from the result, so it is never part of a URL anyone sees.
 *
 * `.invalid` is reserved by RFC 2606 precisely so that this cannot reach a network.
 */
const PLACEHOLDER_ORIGIN = 'https://mdhorizon.invalid'

/** A URL that already points somewhere absolute, or inside the current document. */
function isAlreadyAbsolute(value: string): boolean {
  return (
    // A scheme: `https:`, `mailto:`, `data:` … The policy decides whether it is allowed, not this.
    /^[a-z][a-z0-9+.-]*:/i.test(value) ||
    // Protocol-relative: `//host/path`.
    value.startsWith('//') ||
    // Root-relative: `/path`.
    value.startsWith('/') ||
    // A fragment or a query: inside the current document.
    value.startsWith('#') ||
    value.startsWith('?')
  )
}

/**
 * Resolves `url` as if it appeared in a document at `documentUrl`.
 *
 * @param url The URL as written in the document.
 * @param documentUrl Where that document lives, absolute (`https://host/dir/doc.md`) or a path
 *   (`/dir/doc.md`). `undefined` means "unknown", and then nothing is resolved: guessing a base would
 *   be worse than leaving the URL as the document wrote it.
 * @returns The resolved URL, or the original one when there is nothing to resolve against.
 */
export function resolveAssetUrl(
  url: string,
  documentUrl: string | undefined,
): string {
  const trimmed = url.trim()

  if (!trimmed || documentUrl === undefined || documentUrl === '')
    return trimmed
  if (isAlreadyAbsolute(trimmed)) return trimmed

  try {
    const base = new URL(documentUrl)

    return new URL(trimmed, base).href
  } catch {
    // The document URL has no origin. `URL` still knows how to normalise `..` and `.` segments given
    // one, so it borrows a placeholder and the placeholder is removed again.
    try {
      const path = documentUrl.startsWith('/') ? documentUrl : `/${documentUrl}`
      const base = new URL(path, PLACEHOLDER_ORIGIN)
      const resolved = new URL(trimmed, base).href

      return resolved.startsWith(PLACEHOLDER_ORIGIN)
        ? resolved.slice(PLACEHOLDER_ORIGIN.length)
        : resolved
    } catch {
      // An unparseable base (or a relative URL that cannot be resolved at all): leave it alone rather
      // than dropping the image.
      return trimmed
    }
  }
}
