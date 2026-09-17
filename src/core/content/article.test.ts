// @vitest-environment node
import { describe, expect, it } from 'vitest'
import {
  articleId,
  firstHeading,
  normalizeContentPath,
  readArticle,
} from './article'

/**
 * Reading one document out of the folder tree.
 *
 * Every path used here is copied from the real library, which is what makes these tests worth
 * something: the shapes are the ones the content actually has, including the ones that are not tidy
 * (spaces, accents, parentheses, parentheses inside folder names, three to five levels).
 */

const REAL_PATH =
  'ES/Android-Studio/20260414.2-Instalar-Android-Studio-en-MX-Linux-23/Android-Studio-en-MX-23.md'

describe('identity from the path', () => {
  it('normalises separators and redundant segments', () => {
    expect(normalizeContentPath('/ES//./Android-Studio/x.md')).toBe(
      'ES/Android-Studio/x.md',
    )
    expect(normalizeContentPath('ES\\Android-Studio\\x.md')).toBe(
      'ES/Android-Studio/x.md',
    )
  })

  it('derives the id from the path, without the Markdown extension', () => {
    expect(articleId(REAL_PATH)).toBe(
      'ES/Android-Studio/20260414.2-Instalar-Android-Studio-en-MX-Linux-23/Android-Studio-en-MX-23',
    )
    expect(articleId('a/b/document.markdown')).toBe('a/b/document')
    // An unusual name keeps its extension, so two documents cannot collide.
    expect(articleId('a/b/archive.md.txt')).toBe('a/b/archive.md.txt')
  })

  it('is stable: the same path always gives the same id', () => {
    expect(readArticle({ path: REAL_PATH, text: '' }).id).toBe(
      readArticle({ path: `/${REAL_PATH}`, text: '' }).id,
    )
  })
})

describe('the folder tree gives language, program, section and date', () => {
  it('reads all four from a real path', () => {
    const article = readArticle({
      path: REAL_PATH,
      text: '# Instalar Android Studio\n',
    })

    expect(article.language).toBe('es')
    expect(article.program).toBe('Android-Studio')
    expect(article.section).toBe(
      'ES/Android-Studio/20260414.2-Instalar-Android-Studio-en-MX-Linux-23',
    )
    expect(article.date).toBe('2026-04-14')
  })

  it('reads the date from the first eight digits, whatever follows them', () => {
    const dates: Array<[string, string]> = [
      ['ES/AppImage/20260916-Que-es-una-AppImage/x.md', '2026-09-16'],
      ['ES/Audacity/20251225.1-normalizar/x.md', '2025-12-25'],
      ['EN/JACK/20201005-Instalar/x.md', '2020-10-05'],
      ['ES/Gimp/20260423.2-El-menú-no-cierra,-ni-apaga/x.md', '2026-04-23'],
    ]

    for (const [path, expected] of dates) {
      expect(readArticle({ path, text: '' }).date, path).toBe(expected)
    }
  })

  it('searches the whole path for the date folder, so nesting does not lose it', () => {
    const article = readArticle({
      path: 'ES/Inteligencia-Artificial/DeepSeek/20260831-DeepSeek-Harness/x.md',
      text: '',
    })

    expect(article.program).toBe('Inteligencia-Artificial')
    expect(article.section).toBe(
      'ES/Inteligencia-Artificial/DeepSeek/20260831-DeepSeek-Harness',
    )
    expect(article.date).toBe('2026-08-31')
  })

  it('accepts an entry with no date folder, which the real library also has', () => {
    const article = readArticle({
      path: 'ES/Inteligencia-Artificial/hermes/Cómo-instalar-hermes-en-Termux-Android/x.md',
      text: '',
    })

    expect(article.date).toBeUndefined()
    expect(article.issues).toEqual([])
  })

  it('reports eight digits that are not a date instead of sorting on nonsense', () => {
    const article = readArticle({ path: 'ES/Go/20261345-typo/x.md', text: '' })

    expect(article.date).toBeUndefined()
    expect(article.issues[0].message).toMatch(/is not a date/)
  })

  it('lets frontmatter win over the folder, and says when they disagree', () => {
    const article = readArticle({
      path: 'ES/Go/20260101-hola/x.md',
      text: '---\ndate: 2026-02-02\n---\n\n# Hola\n',
    })

    expect(article.date).toBe('2026-02-02')
    expect(article.issues[0].message).toMatch(/the frontmatter wins/)
  })

  it('handles a document at the root, with no language or program', () => {
    const article = readArticle({ path: 'README.md', text: '# Hola\n' })

    expect(article.language).toBeUndefined()
    expect(article.program).toBeUndefined()
    expect(article.section).toBe('')
  })
})

describe('the title', () => {
  it('comes from the first heading', () => {
    expect(
      readArticle({ path: 'x.md', text: '# Qué es una AppImage\n\nText.\n' })
        .title,
    ).toBe('Qué es una AppImage')
  })

  it('prefers what the frontmatter declares', () => {
    const article = readArticle({
      path: 'x.md',
      text: '---\ntitle: Desde el frontmatter\n---\n\n# Desde el encabezado\n',
    })

    expect(article.title).toBe('Desde el frontmatter')
  })

  it('falls back to the file name, readable rather than raw', () => {
    expect(
      readArticle({
        path: 'ES/Go/20260101-x/Mi-guia_de-Go.md',
        text: 'Text.\n',
      }).title,
    ).toBe('Mi guia de Go')
  })

  it('does not mistake an example inside a code fence for the title', () => {
    const body = '```bash\n# not the title\n```\n\n# The real one\n'

    expect(firstHeading(body)).toBe('The real one')
    expect(readArticle({ path: 'x.md', text: body }).title).toBe('The real one')
  })

  it('ignores a heading that is only hashes', () => {
    expect(firstHeading('#\n\n# Real\n')).toBe('Real')
  })
})

describe('the cover', () => {
  it('is the first image, even with no alt text', () => {
    const article = readArticle({
      path: 'ES/AV-Linux/20260806-Konsole/x.md',
      text: '# Konsole\n\n![](images/Portada.jpg)\n\nText.\n',
    })

    expect(article.cover).toEqual({
      kind: 'image',
      src: 'images/Portada.jpg',
      alt: '',
    })
  })

  it('is the video when the video comes first', () => {
    const article = readArticle({
      path: 'ES/Google/20260917-Google-AI-Studio/Google-AI-Studio.md',
      text: '# Google AI Studio\n\n[Google lanza el PROFESOR](https://www.youtube.com/watch?v=4_fM3Nv8BB0)\n',
    })

    expect(article.cover?.kind).toBe('video')
    expect(article.cover?.thumbnail).toContain('4_fM3Nv8BB0')
  })

  it('is nothing when the document shows nothing, which the caller fills in', () => {
    expect(
      readArticle({
        path: 'ES/AppImage/20260916-x/AppImage.md',
        text: '# AppImage\n',
      }).cover,
    ).toBeNull()
  })

  it('is found in a legacy embed too, and the body is left renderable', () => {
    const article = readArticle({
      path: 'ES/JACK/20201005-Instalar-JACK/Instalar-JACK.md',
      text: '# JACK\n\n<iframe src="https://www.youtube.com/embed/kN_jFjBW21U" allowfullscreen></iframe>\n',
    })

    expect(article.cover?.videoId).toBe('kN_jFjBW21U')
    // The iframe is gone from the body, replaced by a link the renderer understands.
    expect(article.body).not.toContain('<iframe')
    expect(article.body).toContain(
      'https://www.youtube.com/watch?v=kN_jFjBW21U',
    )
  })
})
