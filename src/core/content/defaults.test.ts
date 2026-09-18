// @vitest-environment node
//
// The default cover is not an edge case: **56 of the 122 real entries** have no image of their own and use it. A
// path that is wrong, or a file that was deleted, would leave almost half the library with a broken image, and
// nothing else in the suite would notice.
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { readArticle } from './article'
import { DEFAULT_COVER, DEFAULT_COVER_PATH, coverFor } from './defaults'

const repoRoot = resolve(import.meta.dirname, '../../..')
const onDisk = join(repoRoot, 'public', DEFAULT_COVER_PATH)

describe('the default cover', () => {
  it('is a file that exists in public/, where it is served from', () => {
    expect(existsSync(onDisk), DEFAULT_COVER_PATH).toBe(true)
    expect(statSync(onDisk).size).toBeGreaterThan(0)
  })

  it('is a WebP, because it is a photograph and PNG was 88 % heavier', () => {
    // Measured: the same picture as a PNG was 1 173 694 bytes; as WebP at quality 82 it is 146 064 — and it is
    // shown on an entry card, on a phone, on mobile data.
    const header = readFileSync(onDisk).subarray(0, 12)

    expect(header.subarray(0, 4).toString('ascii')).toBe('RIFF')
    expect(header.subarray(8, 12).toString('ascii')).toBe('WEBP')
  })

  it('is what an entry with no media gets', () => {
    const article = readArticle({ path: 'ES/AppImage/20260916-x/AppImage.md', text: '# AppImage\n' })

    expect(article.cover).toBeNull()
    expect(coverFor(article)).toEqual(DEFAULT_COVER)
    expect(coverFor(article).src).toBe(DEFAULT_COVER_PATH)
  })

  it('steps aside when the entry has an image of its own', () => {
    const article = readArticle({
      path: 'ES/AV-Linux/20260806-x/x.md',
      text: '# Konsole\n\n![](images/Portada.jpg)\n',
    })

    expect(coverFor(article).src).toBe('images/Portada.jpg')
  })

  it('is a path relative to the site root, so the caller owns the base', () => {
    // The model must not know about `/MDHoriZon/`: the same model serves a WebView loading from a local scheme.
    expect(DEFAULT_COVER_PATH.startsWith('/')).toBe(false)
    expect(DEFAULT_COVER_PATH.startsWith('http')).toBe(false)
  })
})
