// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { readArticle } from './article'
import type { Article } from './article'
import {
  buildManifest,
  buildSectionTree,
  buildTagIndex,
  readNavigation,
  sortArticles,
} from './manifest'
import { searchArticles } from './search'

/**
 * The manifest: one deterministic order, the groupings an index needs, and the navigation derived from
 * that order. Search lives here too because it is the same data, queried.
 */

const source = (path: string, text = '# Title\n') => ({ path, text })

const article = (path: string, frontmatter = ''): Article =>
  readArticle({
    path,
    text:
      frontmatter === ''
        ? '# Title\n'
        : `---\n${frontmatter}\n---\n\n# Title\n`,
  })

describe('building the manifest', () => {
  it('indexes every document and keeps its issues, attributed to the file', () => {
    const manifest = buildManifest([
      source('ES/Go/20260101-x/uno.md', '---\ntag: typo\n---\n\n# Uno\n'),
      source('ES/Go/20260101-x/dos.md', '# Dos\n'),
    ])

    expect(manifest.articles).toHaveLength(2)
    expect(manifest.issues).toHaveLength(1)
    expect(manifest.issues[0].source).toBe('ES/Go/20260101-x/uno.md')
    expect(manifest.issues[0].field).toBe('tag')
  })

  it('leaves drafts out unless they are asked for', () => {
    const sources = [
      source('a.md', '---\ndraft: true\n---\n\n# Borrador\n'),
      source('b.md', '# Publicado\n'),
    ]

    expect(buildManifest(sources).articles.map((a) => a.title)).toEqual([
      'Publicado',
    ])
    expect(
      buildManifest(sources, { includeDrafts: true }).articles.map(
        (a) => a.title,
      ),
    ).toEqual(['Borrador', 'Publicado'])
  })

  it('reports two documents that would share an id', () => {
    const manifest = buildManifest([
      source('ES/Go/x/uno.md', '# Uno\n'),
      source('/ES/Go/x/uno.md', '# Uno otra vez\n'),
    ])

    expect(manifest.issues.some((issue) => issue.severity === 'error')).toBe(
      true,
    )
    expect(manifest.issues.at(-1)?.message).toMatch(/share the id/)
  })

  it('orders by hand first, then newest, then title', () => {
    const ordered = sortArticles([
      article('ES/Go/20260101-x/sin-orden.md'),
      article('ES/Go/20260101-x/tercero.md', 'order: 3'),
      article('ES/Go/20260101-x/primero.md', 'order: 1'),
    ])

    expect(ordered.map((a) => a.id.split('/').pop())).toEqual([
      'primero',
      'tercero',
      'sin-orden',
    ])
  })

  it('orders by date, newest first, when there is no hand order', () => {
    const ordered = sortArticles([
      article('ES/Go/20200101-viejo/x.md'),
      article('ES/Go/20260101-nuevo/x.md'),
      article('ES/Go/20230101-medio/x.md'),
    ])

    expect(ordered.map((a) => a.date)).toEqual([
      '2026-01-01',
      '2023-01-01',
      '2020-01-01',
    ])
  })

  it('is fully determined even when two articles agree on everything', () => {
    const ordered = sortArticles([
      article('ES/Go/20260101-x/b.md'),
      article('ES/Go/20260101-x/a.md'),
    ])

    expect(ordered.map((a) => a.id.split('/').pop())).toEqual(['a', 'b'])
  })
})

describe('grouping', () => {
  const articles = [
    article('ES/Go/20260101-uno/uno.md', 'tags: [linux, go]'),
    article('ES/Go/20260102-dos/dos.md', 'tags: [linux]'),
    article('ES/AppImage/20260103-tres/tres.md', 'tags: [linux]'),
    article('EN/Go/20260104-four/four.md', 'tags: [Linux]'),
  ]

  it('counts every tag once, most used first', () => {
    const index = buildTagIndex(articles)

    expect(index[0]).toMatchObject({ tag: 'linux' })
    expect(index[0].articles).toHaveLength(4)
    expect(index[1]).toMatchObject({ tag: 'go' })
  })

  it('nests articles by the folders they live in', () => {
    const tree = buildSectionTree(articles)

    expect(tree.map((node) => node.name)).toEqual(['EN', 'ES'])
    const es = tree[1]

    expect(es.children.map((node) => node.name)).toEqual(['AppImage', 'Go'])
    expect(es.children[1].articles).toHaveLength(2)
    expect(es.children[1].path).toBe('ES/Go')
  })

  it('keeps a section that only exists to hold its children', () => {
    // `Inteligencia-Artificial` holds AI programs, not articles directly.
    const tree = buildSectionTree([
      article('ES/Inteligencia-Artificial/DeepSeek/20260831-x/uno.md'),
    ])
    const artificial = tree[0].children[0]

    expect(artificial.articles).toEqual([])
    expect(artificial.children[0].name).toBe('DeepSeek')
  })
})

describe('previous and next', () => {
  it('follows the manifest order', () => {
    const articles = ['a', 'b', 'c'].map((name) =>
      article(`ES/Go/20260101-x/${name}.md`),
    )
    const navigation = readNavigation(articles)

    expect(navigation[0]).toEqual({
      id: articles[0].id,
      previous: null,
      next: { id: articles[1].id, title: articles[1].title },
    })
    expect(navigation[1].previous?.id).toBe(articles[0].id)
    expect(navigation[2].next).toBeNull()
  })

  it('is empty for an empty library', () => {
    expect(readNavigation([])).toEqual([])
  })
})

describe('search', () => {
  const library = [
    article(
      'ES/AppImage/20260916-Que-es-una-AppImage/AppImage.md',
      'tags: [linux]',
    ),
    article(
      'ES/Audacity/20251225-normalizar/Normalizar-audio.md',
      'tags: [audio]',
    ),
    article(
      'ES/Firefox/20200617-Idiomas/Firefox-lang.md',
      'description: Guía de idiomas',
    ),
  ].map((entry, index) => ({
    ...entry,
    title: ['Qué es una AppImage', 'Normalizar audio', 'Firefox idiomas'][
      index
    ],
  }))

  it('finds an article by a word in its title', () => {
    const results = searchArticles(library, 'appimage')

    expect(results).toHaveLength(1)
    expect(results[0].article.title).toBe('Qué es una AppImage')
    expect(results[0].matchedIn).toContain('title')
  })

  it('ignores accents and case, because a Spanish library is typed both ways', () => {
    expect(searchArticles(library, 'gua')).toHaveLength(0)
    expect(searchArticles(library, 'GUÍA')[0].article.title).toBe(
      'Firefox idiomas',
    )
  })

  it('finds by tag', () => {
    expect(searchArticles(library, 'audio')[0].article.title).toBe(
      'Normalizar audio',
    )
  })

  it('requires every word, so a longer query narrows', () => {
    expect(searchArticles(library, 'firefox')).toHaveLength(1)
    expect(searchArticles(library, 'firefox idiomas')).toHaveLength(1)
    expect(searchArticles(library, 'firefox audacity')).toHaveLength(0)
  })

  it('ranks a title match above a body match', () => {
    const body = readArticle({
      path: 'ES/Go/x/otro.md',
      text: '# Otro\n\nAquí se habla de AppImage de pasada.\n',
    })
    const results = searchArticles([...library, body], 'appimage')

    expect(results[0].article.title).toBe('Qué es una AppImage')
    expect(results[1].article.title).toBe('Otro')
  })

  it('returns nothing for an empty query, rather than everything', () => {
    expect(searchArticles(library, '   ')).toEqual([])
  })

  it('honours a limit', () => {
    expect(searchArticles(library, 'linux audio', { limit: 1 })).toHaveLength(0)
    expect(searchArticles(library, 'e', { limit: 1 })).toHaveLength(1)
  })
})
