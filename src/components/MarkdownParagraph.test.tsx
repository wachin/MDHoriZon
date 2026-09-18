import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MarkdownRenderer } from './MarkdownRenderer'

/**
 * When a paragraph is a video and when it is a paragraph.
 *
 * This is the rule from [ADR 0010](../../docs/architecture/0010-media-and-embeds.md), tested through the
 * real pipeline: the decision is made on the sanitized tree, so these cases are what the renderer will
 * actually see — including the bare URL, which GFM turns into a link before our component looks at it.
 */

const VIDEO = 'https://youtu.be/G7ZqUvFMSes?si=Qpzhs52nIY8xvdHv'

const renderMarkdown = (markdown: string): HTMLElement => {
  const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>)
  const body = container.querySelector('.markdown-body')

  if (!(body instanceof HTMLElement)) {
    throw new Error('the renderer produced no .markdown-body element')
  }

  return body
}

describe('a paragraph that is a video', () => {
  it('becomes a player when the link stands alone', () => {
    const body = renderMarkdown(
      `[DeepSeek Harness: Tu propio Claude Code GRATIS](${VIDEO})`,
    )

    expect(body.querySelector('.markdown-video button')).not.toBeNull()
    expect(body.querySelector('p')).toBeNull()
    expect(body.querySelector('iframe')).toBeNull()
  })

  it('becomes a player when the URL is bare, which GFM turns into a link', () => {
    const body = renderMarkdown('https://youtu.be/G7ZqUvFMSes')

    expect(body.querySelector('.markdown-video button')).not.toBeNull()
  })

  it('keeps the link’s words as the control’s name', () => {
    const body = renderMarkdown(`[Google lanza el PROFESOR](${VIDEO})`)

    expect(body.querySelector('button')?.getAttribute('aria-label')).toBe(
      'Play video: Google lanza el PROFESOR',
    )
  })

  it('is still a video when the paragraph pads it with whitespace', () => {
    const body = renderMarkdown(`\n\n   ${VIDEO}   \n\n`)

    expect(body.querySelector('.markdown-video button')).not.toBeNull()
  })

  it('is a video inside a list item too', () => {
    const body = renderMarkdown(`- Mira esto:\n\n  ${VIDEO}\n`)

    expect(body.querySelector('li .markdown-video button')).not.toBeNull()
  })
})

describe('a paragraph that only mentions a video', () => {
  it('stays a paragraph when the link is inside a sentence', () => {
    const body = renderMarkdown(
      `Mira este vídeo sobre [DeepSeek Harness](${VIDEO}) y dime qué te parece.`,
    )

    expect(body.querySelector('.markdown-video')).toBeNull()
    expect(body.querySelector('p a')?.getAttribute('href')).toBe(VIDEO)
  })

  it('stays a paragraph when there are two links', () => {
    const body = renderMarkdown(
      `[uno](${VIDEO}) y [dos](https://example.test/)`,
    )

    expect(body.querySelector('.markdown-video')).toBeNull()
    expect(body.querySelectorAll('p a')).toHaveLength(2)
  })

  it('stays a paragraph when the link is wrapped in emphasis', () => {
    // The link must be the paragraph's own content; `**…**` around it means the author wrote emphasis,
    // and the rule is deliberately strict rather than clever.
    const body = renderMarkdown(`**[DeepSeek Harness](${VIDEO})**`)

    expect(body.querySelector('.markdown-video')).toBeNull()
    expect(body.querySelector('p strong a')).not.toBeNull()
  })

  it('stays a paragraph when the link is not a video', () => {
    const body = renderMarkdown('[GitHub](https://github.com/)')

    expect(body.querySelector('.markdown-video')).toBeNull()
    expect(body.querySelector('p a')).not.toBeNull()
  })

  it('stays a paragraph when the video is linked to another host', () => {
    const body = renderMarkdown('[Vimeo](https://vimeo.com/12345)')

    expect(body.querySelector('.markdown-video')).toBeNull()
  })

  it('leaves ordinary paragraphs alone', () => {
    const body = renderMarkdown('Solo texto, sin nada más.')

    expect(body.querySelector('p')?.textContent).toBe(
      'Solo texto, sin nada más.',
    )
  })
})
