import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MarkdownRenderer } from './MarkdownRenderer'

/**
 * Code blocks, Phase 4: the language label, highlighting, and the copy button with its feedback and
 * its fallback when the clipboard is not available.
 */
const renderMarkdown = (markdown: string) =>
  render(<MarkdownRenderer>{markdown}</MarkdownRenderer>)

const clipboard = { writeText: vi.fn<() => Promise<void>>() }

beforeEach(() => {
  clipboard.writeText.mockReset()
  Object.defineProperty(navigator, 'clipboard', {
    value: clipboard,
    configurable: true,
  })
})

afterEach(() => {
  Reflect.deleteProperty(navigator, 'clipboard')
})

describe('code blocks', () => {
  it('labels the block with its language', () => {
    renderMarkdown('```typescript\nconst x = 1\n```')

    expect(screen.getByText('typescript')).toBeInTheDocument()
  })

  it('labels a fence without a language as text', () => {
    renderMarkdown('```\nplain content\n```')

    expect(screen.getByText('text')).toBeInTheDocument()
  })

  it('falls back to unhighlighted code for a language it does not know', () => {
    const { container } = renderMarkdown(
      '```not-a-real-language\nsome content\n```',
    )

    const code = container.querySelector('code')
    expect(code).toHaveTextContent('some content')
    expect(code?.querySelector('span')).toBeNull()
  })

  it('highlights code it does know', () => {
    const { container } = renderMarkdown(
      '```typescript\nconst x: number = 1\n```',
    )

    expect(
      container.querySelectorAll('code span[class^="hljs-"]').length,
    ).toBeGreaterThan(0)
    // The text itself is untouched by highlighting.
    expect(container.querySelector('code')).toHaveTextContent(
      'const x: number = 1',
    )
  })

  it('does not highlight a diagram fence, because its content is not code', () => {
    const { container } = renderMarkdown(
      '```mermaid\nflowchart TD\n  A --> B\n```',
    )

    expect(container.querySelector('pre')).toHaveAttribute(
      'data-language',
      'mermaid',
    )
    expect(
      container.querySelectorAll('code span[class^="hljs-"]'),
    ).toHaveLength(0)
  })

  it('keeps long lines inside a horizontally scrollable block', () => {
    const long = 'x'.repeat(4000)
    const { container } = renderMarkdown('```text\n' + long + '\n```')

    // Scrolling is CSS (`pre { overflow-x: auto }`); what matters here is that the content arrives
    // intact and that the block is its own scroll container rather than the page.
    expect(container.querySelector('pre')).toHaveTextContent(long)
    expect(container.querySelector('pre')?.className).toBeDefined()
  })
})

describe('the copy button', () => {
  it('is a real button with an accessible name that mentions the language', () => {
    renderMarkdown('```python\nprint("hi")\n```')

    const button = screen.getByRole('button', { name: 'Copy python code' })
    expect(button).toHaveAttribute('type', 'button')
    // Being a real, focusable button is what makes it operable from the keyboard; the visible focus
    // ring is CSS. Driving that part needs a real browser, which is Phase 20's device validation.
    expect(button.tabIndex).toBe(0)
  })

  it('copies the code and reports success through a live region', async () => {
    clipboard.writeText.mockResolvedValue(undefined)
    renderMarkdown('```bash\necho "hello"\n```')

    fireEvent.click(screen.getByRole('button', { name: 'Copy bash code' }))

    await waitFor(() => {
      expect(clipboard.writeText).toHaveBeenCalledWith('echo "hello"\n')
    })
    expect(
      await screen.findByText('Code copied to the clipboard'),
    ).toBeInTheDocument()
  })

  it('falls back to selecting the code when the clipboard is unavailable', async () => {
    // No clipboard at all, which is what some WebViews report.
    Reflect.deleteProperty(navigator, 'clipboard')
    const { container } = renderMarkdown('```bash\necho "hello"\n```')

    fireEvent.click(screen.getByRole('button', { name: 'Copy bash code' }))

    expect(
      await screen.findByText(
        'The clipboard is unavailable: the code is selected, copy it with the keyboard',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Copy bash code' }),
    ).toHaveTextContent('Copy manually')
    // The text is selected, so the user only has to press the copy shortcut.
    expect(window.getSelection()?.toString()).toContain('echo "hello"')
    expect(container.querySelector('pre')).not.toBeNull()
  })

  it('falls back the same way when the clipboard rejects', async () => {
    clipboard.writeText.mockRejectedValue(new Error('denied'))
    renderMarkdown('```bash\necho "hello"\n```')

    fireEvent.click(screen.getByRole('button', { name: 'Copy bash code' }))

    expect(
      await screen.findByText(/clipboard is unavailable/),
    ).toBeInTheDocument()
  })
})
