import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MarkdownRenderer } from './MarkdownRenderer'

const renderMarkdown = (markdown: string) =>
  render(<MarkdownRenderer>{markdown}</MarkdownRenderer>)

describe('MarkdownRenderer', () => {
  describe('headings', () => {
    it('gives a heading a deterministic id and a link to its own section', () => {
      renderMarkdown('# Hello, World!')

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveAttribute('id', 'hello-world')
      expect(within(heading).getByRole('link')).toHaveAttribute(
        'href',
        '#hello-world',
      )
    })

    it('gives duplicate headings distinct ids', () => {
      const { container } = renderMarkdown('## Duplicate\n\n## Duplicate')

      expect(container.querySelector('#duplicate')).not.toBeNull()
      expect(container.querySelector('#duplicate-1')).not.toBeNull()
    })
  })

  describe('GitHub Flavored Markdown', () => {
    it('renders tables', () => {
      renderMarkdown('| Name | Type |\n|---|---|\n| Markdown | Content |')

      const table = screen.getByRole('table')
      expect(
        within(table).getByRole('columnheader', { name: 'Name' }),
      ).toBeInTheDocument()
      expect(
        within(table).getByRole('cell', { name: 'Markdown' }),
      ).toBeInTheDocument()
    })

    it('wraps a table in a focusable region so it can be scrolled from the keyboard', () => {
      const { container } = renderMarkdown('| A |\n|---|\n| 1 |')

      const region = container.querySelector('.markdown-table-scroll')
      expect(region).not.toBeNull()
      expect(region).toHaveAttribute('tabindex', '0')
      expect(region).toHaveAttribute('role', 'region')
    })

    it('renders task lists as disabled checkboxes', () => {
      renderMarkdown('- [x] completed\n- [ ] pending')

      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes).toHaveLength(2)
      expect(checkboxes[0]).toBeChecked()
      expect(checkboxes[1]).not.toBeChecked()
      for (const checkbox of checkboxes) expect(checkbox).toBeDisabled()
    })

    it('renders strikethrough and autolinks', () => {
      const { container } = renderMarkdown('~~gone~~ and https://example.com')

      expect(container.querySelector('del')).toHaveTextContent('gone')
      expect(
        screen.getByRole('link', { name: 'https://example.com' }),
      ).toHaveAttribute('href', 'https://example.com')
    })
  })

  describe('basic Markdown', () => {
    it('renders paragraphs', () => {
      renderMarkdown('First paragraph.\n\nSecond paragraph.')

      expect(screen.getByText('First paragraph.')).toBeInTheDocument()
      expect(screen.getByText('Second paragraph.')).toBeInTheDocument()
    })

    it('renders emphasis and strong text', () => {
      const { container } = renderMarkdown(
        '*italic* and **bold** and ***both***',
      )

      expect(container.querySelector('em')).toHaveTextContent('italic')
      expect(container.querySelector('strong')).toHaveTextContent('bold')
    })

    it('renders ordered and unordered lists', () => {
      const { container } = renderMarkdown(
        '1. First\n2. Second\n\n- Bullet\n- Another',
      )

      expect(
        [...container.querySelectorAll('ol > li')].map((li) => li.textContent),
      ).toEqual(['First', 'Second'])
      expect(container.querySelectorAll('ul > li')).toHaveLength(2)
    })

    it('renders blockquotes, including nested ones', () => {
      const { container } = renderMarkdown('> Outer\n>\n> > Inner')

      const quotes = container.querySelectorAll('blockquote')
      expect(quotes.length).toBe(2)
      expect(quotes[0]).toHaveTextContent('Outer')
      expect(quotes[1]).toHaveTextContent('Inner')
    })

    it('renders horizontal rules', () => {
      expect(
        renderMarkdown('before\n\n---\n\nafter').container.querySelectorAll(
          'hr',
        ),
      ).toHaveLength(1)
    })

    it('renders inline code without touching its contents', () => {
      const { container } = renderMarkdown('Use `npm test` and `**not bold**`')

      const code = [...container.querySelectorAll('code')].map(
        (element) => element.textContent,
      )
      expect(code).toEqual(['npm test', '**not bold**'])
    })
  })

  describe('code', () => {
    it('keeps the language of a fenced code block', () => {
      const { container } = renderMarkdown('```ts\nconst x: number = 1\n```')

      const pre = container.querySelector('pre')
      expect(pre).toHaveAttribute('data-language', 'ts')
      expect(pre).toHaveTextContent('const x: number = 1')
    })

    it('renders a fence without a language', () => {
      const { container } = renderMarkdown('```\nplain\n```')

      expect(container.querySelector('pre')).not.toHaveAttribute(
        'data-language',
      )
    })
  })

  describe('images', () => {
    it('keeps relative image sources and their alternative text', () => {
      renderMarkdown('![Relative image](../assets/example.png)')

      const image = screen.getByAltText('Relative image')
      expect(image).toHaveAttribute('src', '../assets/example.png')
      expect(image).toHaveAttribute('loading', 'lazy')
    })

    it('gives a decorative image an explicit empty alt', () => {
      const { container } = renderMarkdown('![](../assets/example.png)')

      expect(container.querySelector('img')).toHaveAttribute('alt', '')
    })
  })

  describe('links', () => {
    it('leaves relative links and in-page anchors alone', () => {
      const { container } = renderMarkdown(
        '[Article](../articles/example.md) and [Anchor](#top)',
      )

      const relative = container.querySelector(
        'a[href="../articles/example.md"]',
      )
      expect(relative).not.toBeNull()
      expect(relative).not.toHaveAttribute('target')
      expect(container.querySelector('a[href="#top"]')).not.toBeNull()
    })

    it('opens external links safely', () => {
      renderMarkdown('[GitHub](https://github.com/)')

      const link = screen.getByRole('link', { name: 'GitHub' })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  // The three layers of docs/architecture/0003-sanitization-policy.md.
  describe('sanitization', () => {
    it('never turns raw HTML from the document into elements (layer 1)', () => {
      const { container } = renderMarkdown(
        '<script>alert("unsafe")</script>\n\n<iframe src="https://example.com"></iframe>\n\n<div onclick="x()">block</div>',
      )

      expect(container.querySelector('script')).toBeNull()
      expect(container.querySelector('iframe')).toBeNull()
      expect(container.querySelector('div[onclick]')).toBeNull()
      expect(container).not.toHaveTextContent('unsafe')
    })

    it('drops unsafe URLs instead of rendering them (layer 3)', () => {
      const { container } = renderMarkdown(
        "[link](javascript:alert('unsafe'))\n\n![image](data:image/svg+xml,%3Csvg%3E)",
      )

      // The anchor may remain, but without an `href` it is not a link any more.
      expect(container.querySelector('a[href]')).toBeNull()
      expect(screen.queryByRole('link')).toBeNull()
      expect(container.querySelector('img[src]')).toBeNull()
    })

    it('keeps the text around inline HTML, because only the markup is dropped', () => {
      const { container } = renderMarkdown(
        'This is <strong>important</strong> text.',
      )

      expect(container.querySelector('strong')).toBeNull()
      expect(container).toHaveTextContent('This is important text.')
    })

    it('keeps a relative image source that the policy allows', () => {
      expect(
        renderMarkdown('![ok](./ok.png)').container.querySelector(
          'img[src="./ok.png"]',
        ),
      ).not.toBeNull()
    })
  })
})
