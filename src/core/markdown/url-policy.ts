/**
 * Layer 3 of the sanitization policy: the URL policy.
 *
 * See `docs/architecture/0003-sanitization-policy.md`. It is enforced in two places on purpose —
 * here (through the renderer's `urlTransform`) and by the sanitize schema's `protocols` — so a
 * component cannot quietly accept what the schema would reject.
 */

/** Schemes allowed in `href`. Narrower than the sanitize schema default, which also allows irc, ircs and xmpp. */
export const ALLOWED_LINK_PROTOCOLS = ['http:', 'https:', 'mailto:'] as const

/** Schemes allowed in `src`. `data:` is deliberately absent, so `data:` images cannot survive. */
export const ALLOWED_IMAGE_PROTOCOLS = ['http:', 'https:'] as const

const SCHEME = /^([a-z][a-z0-9+.-]*):/i

/**
 * Removes the characters a URL parser ignores before the scheme, so that obfuscated forms
 * (`  javascript:`, `java<TAB>script:`, `JaVaScRiPt:`) are judged by their normalised shape instead
 * of by a naive prefix comparison. The original string is never modified — this is only for the check.
 *
 * `\s` covers the whitespace a parser skips and `\p{Cc}` the control characters, without embedding
 * control characters in a regex literal.
 */
function normalizeForSchemeCheck(value: string): string {
  return value.replace(/[\s\p{Cc}]+/gu, '')
}

/**
 * Applies the policy to a URL.
 *
 * @param value The URL as it appears in the document.
 * @param allowedProtocols Schemes to accept, including the trailing colon.
 * @returns The URL to keep, trimmed, or `null` when the policy rejects it.
 */
export function applyUrlPolicy(
  value: string,
  allowedProtocols: readonly string[],
): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  const match = SCHEME.exec(normalizeForSchemeCheck(trimmed))

  // No scheme means a relative URL, a fragment or a query. Those are kept: resolving them against
  // the document is content-loading work (Phases 8 and 10), not a security decision.
  if (!match) return trimmed

  return allowedProtocols.includes(`${match[1].toLowerCase()}:`)
    ? trimmed
    : null
}
