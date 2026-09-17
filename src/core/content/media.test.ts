// @vitest-environment node
import { describe, expect, it } from 'vitest'
import {
  firstMedia,
  rescueLegacyEmbeds,
  rescueLegacyImageSizes,
  rescueLegacyMarkup,
  videoCover,
  youTubeVideoId,
  visibleMarkdown,
} from './media'

/**
 * Covers and the videos behind them.
 *
 * The shapes here are taken from the real library, not invented: an empty-alt local image, a Blogger
 * URL, a link whose text is a sentence, and the legacy `<iframe>` an older export left behind.
 */

describe('recognising a video', () => {
  it('reads every shape a YouTube address comes in', () => {
    const cases: Array<[string, string]> = [
      ['https://www.youtube.com/watch?v=4_fM3Nv8BB0', '4_fM3Nv8BB0'],
      ['https://www.youtube.com/watch?v=DucB7993d1s&t=132s', 'DucB7993d1s'],
      ['https://youtu.be/Mz808YZL_RI?si=AQ7_OWM9O3BoI1NJ', 'Mz808YZL_RI'],
      ['https://www.youtube.com/embed/kN_jFjBW21U', 'kN_jFjBW21U'],
      ['https://www.youtube.com/shorts/abc123XYZ', 'abc123XYZ'],
    ]

    for (const [url, expected] of cases) {
      expect(youTubeVideoId(url), url).toBe(expected)
    }
  })

  it('refuses to guess at anything else', () => {
    for (const url of [
      'https://vimeo.com/12345',
      'https://example.com/watch?v=x',
      'https://www.youtube.com/',
      'images/Portada.jpg',
    ]) {
      expect(youTubeVideoId(url), url).toBeUndefined()
      expect(videoCover(url), url).toBeUndefined()
    }
  })

  it('gives a video a cover image without loading anything', () => {
    const cover = videoCover('https://www.youtube.com/watch?v=DucB7993d1s')

    expect(cover).toEqual({
      kind: 'video',
      src: 'https://www.youtube.com/watch?v=DucB7993d1s',
      videoId: 'DucB7993d1s',
      thumbnail: 'https://i.ytimg.com/vi/DucB7993d1s/hqdefault.jpg',
    })
  })
})

describe('finding the first media in a document', () => {
  it('takes an image with no alt text, which is how the real library writes covers', () => {
    const cover = firstMedia('Text.\n\n![](images/Portada.jpg)\n\nMore.\n')

    expect(cover).toEqual({ kind: 'image', src: 'images/Portada.jpg', alt: '' })
  })

  it('keeps the alt text when there is one', () => {
    expect(
      firstMedia('![Descarga FFmulticonverter](https://blogger.example/x.png)'),
    ).toEqual({
      kind: 'image',
      src: 'https://blogger.example/x.png',
      alt: 'Descarga FFmulticonverter',
    })
  })

  it('takes a video link whatever its text says', () => {
    // The real case: a sentence pointing at a video still means the video.
    const cover = firstMedia(
      '[Google lanza el PROFESOR con IA definitivo (y es gratis)](https://www.youtube.com/watch?v=4_fM3Nv8BB0)',
    )

    expect(cover?.kind).toBe('video')
    expect(cover?.videoId).toBe('4_fM3Nv8BB0')
  })

  it('takes a bare video URL', () => {
    expect(firstMedia('Mira: https://youtu.be/Mz808YZL_RI?si=x')).toMatchObject(
      {
        kind: 'video',
        videoId: 'Mz808YZL_RI',
      },
    )
  })

  it('picks whichever comes first, image or video', () => {
    const image = firstMedia(
      '![](images/a.png)\n\n[text](https://youtu.be/abcdef)',
    )
    const video = firstMedia(
      '[text](https://youtu.be/abcdef)\n\n![](images/a.png)',
    )

    expect(image?.kind).toBe('image')
    expect(video?.kind).toBe('video')
  })

  it('returns nothing when the document shows no media', () => {
    expect(firstMedia('# Title\n\nJust words.\n')).toBeUndefined()
  })

  it('ignores a link that is not a video', () => {
    expect(firstMedia('[GitHub](https://github.com/)')).toBeUndefined()
  })
})

describe('rescuing a legacy embed', () => {
  it('turns an old iframe into the link an author would write today', () => {
    const html =
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/kN_jFjBW21U" title="YouTube video player" frameborder="0" allowfullscreen></iframe>'

    expect(rescueLegacyEmbeds(`Before.\n\n${html}\n\nAfter.`)).toBe(
      'Before.\n\n[https://www.youtube.com/watch?v=kN_jFjBW21U](https://www.youtube.com/watch?v=kN_jFjBW21U)\n\nAfter.',
    )
  })

  it('handles the multi-line form an export produces', () => {
    const html =
      '<iframe width="560" height="315"\n  src="https://www.youtube.com/embed/kN_jFjBW21U"\n  title="YouTube video player"\n  allowfullscreen>\n</iframe>'

    expect(rescueLegacyEmbeds(html)).toContain(
      '[https://www.youtube.com/watch?v=kN_jFjBW21U]',
    )
  })

  it('leaves any other raw HTML exactly as it was', () => {
    // The sanitization policy deals with that; this function only understands video players.
    const other = '<div class="note"><span>Hola</span></div>'

    expect(rescueLegacyEmbeds(other)).toBe(other)
  })

  it('gives a rescued video a cover', () => {
    const cover = firstMedia(
      rescueLegacyEmbeds(
        '<iframe src="https://www.youtube.com/embed/DucB7993d1s"></iframe>',
      ),
    )

    expect(cover?.thumbnail).toBe(
      'https://i.ytimg.com/vi/DucB7993d1s/hqdefault.jpg',
    )
  })
})

describe('rescuing Blogger’s image size hints', () => {
  it('removes the hint that stops the image from being an image', () => {
    // Measured: with the space left in place the renderer emits the Markdown source as text and no
    // image at all, which is what happened to every entry exported this way.
    expect(
      rescueLegacyImageSizes(
        '![Portada](https://blogger.test/a/s1536/foto.jpg =650x)',
      ),
    ).toBe('![Portada](https://blogger.test/a/s1536/foto.jpg)')
  })

  it('handles the other shapes the export writes', () => {
    const cases: Array<[string, string]> = [
      ['![](u.jpg =650x450)', '![](u.jpg)'],
      ['![](u.jpg =s1600)', '![](u.jpg)'],
      ['![](u.jpg =w640-h480-c)', '![](u.jpg)'],
      ['![](u.jpg =650x-rw)', '![](u.jpg)'],
    ]

    for (const [input, expected] of cases) {
      expect(rescueLegacyImageSizes(input), input).toBe(expected)
    }
  })

  it('leaves a valid destination alone', () => {
    for (const untouched of [
      '![](u.jpg=s1600)',
      '![alt](u.jpg "A title")',
      '![alt](<u with space.jpg>)',
      '[texto](https://example.test/)',
    ]) {
      expect(rescueLegacyImageSizes(untouched), untouched).toBe(untouched)
    }
  })

  it('rescues an image that is also a link', () => {
    expect(
      rescueLegacyImageSizes('[![](u.jpg =650x)](https://example.test/)'),
    ).toBe('[![](u.jpg)](https://example.test/)')
  })

  it('rescues both legacy forms together', () => {
    const legacy =
      '<iframe src="https://www.youtube.com/embed/kN_jFjBW21U"></iframe>\n\n![a](u.jpg =650x)'
    const rescued = rescueLegacyMarkup(legacy)

    expect(rescued).not.toContain('<iframe')
    expect(rescued).not.toContain('=650x')
    expect(rescued).toContain('https://www.youtube.com/watch?v=kN_jFjBW21U')
  })
})

describe('ignoring what is only an example', () => {
  it('does not take a cover out of a fenced code block', () => {
    const body = '```markdown\n![ejemplo](images/x.png)\n```\n\nText only.\n'

    expect(visibleMarkdown(body)).not.toContain('images/x.png')
    expect(firstMedia(body)).toBeUndefined()
  })

  it('does not take a cover out of inline code', () => {
    // The real library documents its own syntax this way, and a cover from documentation about covers
    // is not a cover.
    expect(
      firstMedia('Escribe `![alt](images/x.png)` para insertar una imagen.'),
    ).toBeUndefined()
  })

  it('still finds the image that follows the example', () => {
    const body =
      'Ejemplo: `![alt](images/ejemplo.png)`\n\n![](images/Portada.jpg)\n'

    expect(firstMedia(body)?.src).toBe('images/Portada.jpg')
  })
})
