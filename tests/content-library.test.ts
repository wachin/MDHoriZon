// @vitest-environment node
//
// The content model against the **real library**, not against samples.
//
// This is the test that would catch the engine drifting away from the content it actually has to
// read: 122 documents in 46 program folders, in two languages, with three path depths, some with
// date folders and some without, some with no images at all, and three legacy video embeds.
//
// It asserts what the *engine* must guarantee. What it finds in the content — broken references
// among them — is reported rather than asserted, because those are the author's to fix, and a test
// that freezes today's typos in place would be worse than useless.
import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { buildManifest } from '../src/core/content/manifest'
import type { Article } from '../src/core/content/article'

const repoRoot = resolve(import.meta.dirname, '..')
const contentRoot = join(repoRoot, 'content')

function markdownFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) return markdownFiles(path)

    return entry.name.endsWith('.md') ? [path] : []
  })
}

const documents = markdownFiles(contentRoot).map((path) => ({
  path: path.slice(contentRoot.length + 1),
  text: readFileSync(path, 'utf8'),
}))

const manifest = buildManifest(documents)

const DATE_FOLDER = /^\d{8}/

describe('the real content library', () => {
  it('indexes every document', () => {
    expect(documents.length).toBeGreaterThan(100)
    expect(manifest.articles).toHaveLength(documents.length)
  })

  it('has no document the engine cannot make sense of', () => {
    // Warnings are the author's business (a typo in a field, a folder that is not a date); an error
    // means the engine could not read something it must.
    expect(
      manifest.issues.filter((issue) => issue.severity === 'error'),
    ).toEqual([])
  })

  it('gives every article a title', () => {
    const untitled = manifest.articles.filter(
      (article) => article.title.trim() === '',
    )

    expect(untitled.map((article) => article.path)).toEqual([])
  })

  it('gives every article a unique, path-derived id', () => {
    const ids = manifest.articles.map((article) => article.id)

    expect(new Set(ids).size).toBe(ids.length)
    for (const article of manifest.articles) {
      expect(article.id, article.path).toBe(
        article.path.replace(/\.(?:md|markdown)$/i, ''),
      )
    }
  })

  it('reads the language of every document that is filed under one', () => {
    const language = (article: Article) => article.language

    expect(
      manifest.articles
        .filter((a) => a.path.startsWith('ES/'))
        .every((a) => language(a) === 'es'),
    ).toBe(true)
    expect(
      manifest.articles
        .filter((a) => a.path.startsWith('EN/'))
        .every((a) => language(a) === 'en'),
    ).toBe(true)
  })

  it('keeps identity and grouping separate: a collection is never a date folder', () => {
    for (const article of manifest.articles) {
      const last = article.collection.split('/').at(-1) ?? ''

      expect(
        DATE_FOLDER.test(last),
        `${article.path} → ${article.collection}`,
      ).toBe(false)
    }
  })

  it('turns a date folder into a real calendar date', () => {
    for (const article of manifest.articles) {
      const dated = article.section
        .split('/')
        .some((segment) => DATE_FOLDER.test(segment))

      if (!dated) continue
      // An invalid date folder is reported instead of guessed at, so it may legitimately be absent.
      if (article.date === undefined) continue

      expect(article.date, article.path).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(Number.isNaN(Date.parse(article.date)), article.path).toBe(false)
    }
  })

  it('leaves no legacy iframe in anything it will render', () => {
    // The Blogger-era embeds are rewritten into links by the content layer, because raw HTML never
    // reaches the tree (ADR 0003).
    const withIframes = manifest.articles.filter((article) =>
      article.body.includes('<iframe'),
    )

    expect(withIframes.map((article) => article.path)).toEqual([])
  })

  it('takes every cover from the document it belongs to', () => {
    // Non-circular on purpose: whatever the rule picks must be something the document actually
    // contains, so a cover can never be invented.
    for (const article of manifest.articles) {
      if (article.cover === null) continue

      const identity = article.cover.videoId ?? article.cover.src

      expect(article.body, article.path).toContain(identity)
    }
  })

  it('leaves the cover empty only when the document shows no media', () => {
    // Deliberately a second implementation of "what the page shows": a test that reused the engine's
    // helper would agree with the engine even when the engine was wrong.
    const prose = (body: string): string =>
      body
        .replace(/^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^[ \t]*\1[ \t]*$/gm, '\n')
        .replace(/(`+)[^`]*?\1/g, ' ')

    const wrong = manifest.articles
      .filter((article) => article.cover === null)
      .filter((article) => {
        const body = prose(article.body)

        // A bare Markdown destination cannot contain a space, so `![x](a b.jpg)` is not an image at
        // all — the renderer shows it as source. Counting it here would flag content the engine is
        // right to ignore, which is what the real library's Blogger exports do.
        const parsableImage = /!\[[^\]]*\]\(\s*(?:<[^>]*>|[^\s)]+)\s*\)/

        return (
          parsableImage.test(body) || /(?:youtube\.com|youtu\.be)\//.test(body)
        )
      })

    expect(wrong.map((article) => article.path)).toEqual([])
  })

  it('reports what the library looks like, so a change in it is visible', () => {
    const withCover = manifest.articles.filter(
      (article) => article.cover !== null,
    )
    const dated = manifest.articles.filter((article) =>
      article.section.split('/').some((segment) => DATE_FOLDER.test(segment)),
    )
    const languages = new Map<string, number>()
    const programs = new Set<string>()

    for (const article of manifest.articles) {
      if (article.language !== undefined) {
        languages.set(
          article.language,
          (languages.get(article.language) ?? 0) + 1,
        )
      }
      if (article.program !== undefined) programs.add(article.program)
    }

    console.log(
      [
        '',
        `  documents          ${manifest.articles.length}`,
        `  languages          ${[...languages].map(([code, count]) => `${code}=${count}`).join(' ')}`,
        `  programs           ${programs.size}`,
        `  with a date folder ${dated.length}`,
        `  with a cover       ${withCover.length} (${manifest.articles.length - withCover.length} will use the default)`,
        `  warnings           ${manifest.issues.length}`,
        '',
      ].join('\n'),
    )

    // The library is not empty and not uniform: if this ever becomes one document, the numbers above
    // are worthless as evidence.
    expect(manifest.articles.length).toBeGreaterThan(100)
    expect(programs.size).toBeGreaterThan(20)
  })
})
