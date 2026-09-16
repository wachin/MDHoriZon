// @vitest-environment node
import { describe, expect, it } from 'vitest'
import {
  ALLOWED_IMAGE_PROTOCOLS,
  ALLOWED_LINK_PROTOCOLS,
  applyUrlPolicy,
} from './url-policy'

describe('applyUrlPolicy', () => {
  it('keeps the schemes the policy allows', () => {
    expect(
      applyUrlPolicy('https://example.com/a?b=1#c', ALLOWED_LINK_PROTOCOLS),
    ).toBe('https://example.com/a?b=1#c')
    expect(applyUrlPolicy('http://example.com', ALLOWED_LINK_PROTOCOLS)).toBe(
      'http://example.com',
    )
    expect(
      applyUrlPolicy('mailto:example@example.com', ALLOWED_LINK_PROTOCOLS),
    ).toBe('mailto:example@example.com')
  })

  it('rejects every scheme outside the policy', () => {
    const rejected = [
      'javascript:alert(1)',
      'data:text/html,<script>alert(1)</script>',
      'vbscript:msgbox(1)',
      'file:///etc/passwd',
      // Allowed by the sanitize schema default, deliberately not by ours.
      'irc://example.com',
      'xmpp:user@example.com',
    ]

    for (const url of rejected) {
      expect(applyUrlPolicy(url, ALLOWED_LINK_PROTOCOLS), url).toBeNull()
    }
  })

  it('rejects obfuscated forms of a blocked scheme', () => {
    const obfuscated = [
      'JaVaScRiPt:alert(1)',
      '  javascript:alert(1)',
      'java\tscript:alert(1)',
      'java\u0000script:alert(1)',
      '\njavascript:alert(1)',
      ' javascript\n:alert(1)',
    ]

    for (const url of obfuscated) {
      expect(applyUrlPolicy(url, ALLOWED_LINK_PROTOCOLS), url).toBeNull()
    }
  })

  it('keeps relative URLs, fragments and queries: resolving them is not a security decision', () => {
    for (const url of [
      '../assets/example.png',
      './example.png',
      'articles/a.md',
      '#12-mermaid',
      '?page=2',
    ]) {
      expect(applyUrlPolicy(url, ALLOWED_LINK_PROTOCOLS), url).toBe(url)
    }
  })

  it('applies the narrower image policy', () => {
    expect(
      applyUrlPolicy(
        'https://placehold.co/640x240.png',
        ALLOWED_IMAGE_PROTOCOLS,
      ),
    ).toBe('https://placehold.co/640x240.png')
    expect(
      applyUrlPolicy('data:image/png;base64,AAAA', ALLOWED_IMAGE_PROTOCOLS),
    ).toBeNull()
    expect(
      applyUrlPolicy('mailto:example@example.com', ALLOWED_IMAGE_PROTOCOLS),
    ).toBeNull()
  })

  it('trims surrounding whitespace and rejects empty values', () => {
    expect(
      applyUrlPolicy('  https://example.com  ', ALLOWED_LINK_PROTOCOLS),
    ).toBe('https://example.com')
    expect(applyUrlPolicy('   ', ALLOWED_LINK_PROTOCOLS)).toBeNull()
    expect(applyUrlPolicy('', ALLOWED_LINK_PROTOCOLS)).toBeNull()
  })

  it('does not rewrite the URL it keeps', () => {
    const url = 'https://example.com/A%20Path/With%20Spaces?q=a+b#Fragment'
    expect(applyUrlPolicy(` ${url} `, ALLOWED_LINK_PROTOCOLS)).toBe(url)
  })
})
