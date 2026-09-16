import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MarkdownRenderer } from './MarkdownRenderer'

/**
 * Phase 5: mathematics.
 *
 * The pipeline renders with KaTeX's `htmlAndMathml` output, so every formula produces two layers:
 * the HTML layer that paints it and the MathML layer that assistive technology reads. Both are
 * asserted here, because both were nearly lost silently — the sanitizer first stripped the classes
 * and styles (formulas rendered but laid out wrong) and then the whole MathML tree (formulas
 * rendered as the concatenated text `E=mc2E = mc^2`).
 */

const renderMarkdown = (markdown: string): HTMLElement => {
  const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>)
  const body = container.querySelector('.markdown-body')

  if (!(body instanceof HTMLElement)) {
    throw new Error('the renderer produced no .markdown-body element')
  }

  return body
}

/** Fails with the rendered markup in the message, so a regression says what it actually produced. */
const expectFound = (body: HTMLElement, selector: string): Element => {
  const found = body.querySelector(selector)

  if (found === null) {
    throw new Error(`expected ${selector} in: ${body.innerHTML.slice(0, 600)}`)
  }

  return found
}

describe('mathematics', () => {
  it('renders inline math in place, without disturbing the surrounding prose', () => {
    const body = renderMarkdown('before $E = mc^2$ after')

    expect(body.querySelectorAll('.katex')).toHaveLength(1)
    // The prose survives on both sides of the formula.
    expect(body.textContent).toContain('before')
    expect(body.textContent).toContain('after')
    expect(body.querySelector('p')?.firstChild?.textContent).toBe('before ')
    expect(expectFound(body, '.katex-mathml')).toBeDefined()
  })

  it('renders display math as a block outside the paragraph flow', () => {
    const body = renderMarkdown('$$\n\\frac{a}{b}\n$$')

    const display = expectFound(body, '.katex-display')

    expect(display.querySelector('.katex')).not.toBeNull()
    // Display maths replaces the paragraph entirely: it is a block of its own, not a paragraph with
    // a formula in it.
    expect(body.querySelector('p')).toBeNull()
  })

  it('keeps the KaTeX layout classes the sanitizer used to strip', () => {
    const body = renderMarkdown('$$\n\\frac{a}{b}\n$$')

    // These are exactly the classes that vanished when `className` was not allowed on `span`: the
    // markup still existed, so only a class-level assertion can catch the regression.
    for (const className of [
      'katex',
      'katex-html',
      'base',
      'strut',
      'mord',
      'mopen',
      'nulldelimiter',
      'mfrac',
      'vlist-t',
      'vlist-t2',
      'vlist-r',
      'vlist',
      'pstrut',
      'frac-line',
      'mclose',
    ]) {
      expect(
        body.querySelectorAll(`.${className}`).length,
        className,
      ).toBeGreaterThan(0)
    }
  })

  it('keeps the bounded inline styles KaTeX positions glyphs with', () => {
    const body = renderMarkdown('$$\n\\frac{a}{b}\n$$')

    // The fraction bar is a bordered empty span, and the radical's tail is sized inline. Without
    // these declarations the formula renders — as a pile of unpositioned glyphs.
    expect(expectFound(body, '.frac-line').getAttribute('style')).toContain(
      'border-bottom-width',
    )
    expect(expectFound(body, '.strut').getAttribute('style')).toContain(
      'height',
    )

    const radical = renderMarkdown('$\\sqrt{2}$')
    const hideTail = expectFound(radical, '.hide-tail')

    expect(hideTail.getAttribute('style')).toContain('min-width')
  })

  it('keeps the MathML layer, and hides only the visual layer from assistive technology', () => {
    const body = renderMarkdown('$E = mc^2$')

    const mathml = expectFound(body, '.katex-mathml')
    const visual = expectFound(body, '.katex-html')

    expect(mathml.querySelector('math')).not.toBeNull()
    expect(mathml.querySelector('semantics')).not.toBeNull()
    // The TeX source travels with the formula, which is how a screen reader announces it.
    const annotation = expectFound(body, 'annotation')

    expect(annotation.getAttribute('encoding')).toBe('application/x-tex')
    expect(annotation.textContent).toBe('E = mc^2')
    // The visual layer is the decoration; it must not be announced as well.
    expect(visual.getAttribute('aria-hidden')).toBe('true')
    expect(mathml.getAttribute('aria-hidden')).toBeNull()
  })

  it('keeps the MathML presentation attributes KaTeX emits', () => {
    expect(
      expectFound(renderMarkdown('$\\mathbb{R}$'), 'mi').getAttribute(
        'mathvariant',
      ),
    ).toBe('double-struck')
    expect(
      expectFound(renderMarkdown('$\\cancel{x}$'), 'menclose').getAttribute(
        'notation',
      ),
    ).toBe('updiagonalstrike')
    expect(
      expectFound(
        renderMarkdown('$\\left(\\frac{a}{b}\\right)$'),
        'mo',
      ).getAttribute('fence'),
    ).toBe('true')
    expect(
      expectFound(renderMarkdown('$\\color{red}{x}$'), 'mstyle').getAttribute(
        'mathcolor',
      ),
    ).toBe('red')
    expect(
      expectFound(renderMarkdown('$$\n\\frac{a}{b}\n$$'), 'math').getAttribute(
        'display',
      ),
    ).toBe('block')
  })

  it('keeps the SVG KaTeX draws radicals and cancels with', () => {
    const radical = renderMarkdown('$\\sqrt{2}$')

    expect(expectFound(radical, 'svg').getAttribute('viewBox')).toBe(
      '0 0 400000 1080',
    )
    expect(expectFound(radical, 'path').getAttribute('d')).not.toBe('')

    const cancelled = renderMarkdown('$\\cancel{x}$')
    const line = expectFound(cancelled, 'line')

    expect(line.getAttribute('x1')).toBe('0')
    expect(line.getAttribute('stroke-width')).toBe('0.046em')
    // Nothing in this vocabulary may navigate or fetch.
    for (const element of cancelled.querySelectorAll('svg, path, line')) {
      expect(element.getAttribute('href')).toBeNull()
    }
  })

  it('renders the constructs the golden document relies on', () => {
    const cases: Array<[string, string, string]> = [
      ['$\\frac{a}{b}$', '.mfrac', 'a fraction'],
      ['$x_i^{n+1}$', '.msupsub', 'a subscript and superscript'],
      ['$\\sqrt{2}$', 'path', 'a radical'],
      ['$\\sqrt[3]{x}$', 'mroot', 'an indexed radical'],
      ['$\\sum_{n=1}^{\\infty}$', '.mop', 'a summation'],
      ['$\\prod_{i=1}^{n} i$', '.mop', 'a product'],
      ['$\\int_0^\\infty$', '.mop', 'an integral'],
      [
        '$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$',
        'mtable',
        'a matrix',
      ],
      [
        '$\\begin{aligned} a &= b \\\\ c &= d \\end{aligned}$',
        'mtable',
        'an alignment',
      ],
      [
        '$\\begin{cases} 1 & x>0 \\\\ 0 & x\\le 0 \\end{cases}$',
        'mtable',
        'cases',
      ],
      ['$\\left(\\frac{a}{b}\\right)$', '.delimsizing', 'stretchy delimiters'],
      ['$\\overbrace{x+y}^{s}$', '.katex', 'an overbrace'],
      ['$\\overline{z}$', '.overline-line', 'an overline'],
      ['$\\widehat{ABC}$', '.katex', 'a wide accent'],
      [
        '$\\text{rate} = \\frac{\\Delta x}{\\Delta t}$',
        '.mord',
        'text inside math',
      ],
      ['$\\mathbb{R}$', '.mathbb', 'blackboard bold'],
      ['$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$', '.mop', 'a limit'],
      ['$\\cancel{x}$', 'line', 'a cancellation'],
      ['$\\boxed{x}$', 'menclose', 'a box'],
      ['$\\color{red}{x}$', '.mord', 'a colour'],
      [
        '$\\begin{array}{c|c} a & b \\end{array}$',
        '.vertical-separator',
        'a vertical rule',
      ],
      ['$\\underbrace{x+y}_{s}$', '.katex', 'an underbrace'],
      [
        '$\\displaystyle\\int_{-\\infty}^{\\infty} e^{-x^{2}}\\,\\mathrm{d}x = \\sqrt{\\pi}$',
        '.katex',
        'a long formula',
      ],
    ]

    for (const [markdown, selector, description] of cases) {
      const body = renderMarkdown(markdown)

      expect(body.querySelector('.katex-error'), description).toBeNull()
      expect(
        body.querySelector(selector),
        `${description} (${markdown}) produced: ${body.innerHTML.slice(0, 300)}`,
      ).not.toBeNull()
    }
  })

  it('renders the Greek letters and operators as glyphs, not source', () => {
    const body = renderMarkdown('$\\alpha \\beta \\Gamma \\Omega \\pm \\infty$')

    // The visual layer paints the glyphs…
    const visual = expectFound(body, '.katex-html')

    for (const glyph of ['α', 'β', 'Γ', 'Ω', '±', '∞']) {
      expect(visual.textContent, glyph).toContain(glyph)
    }
    expect(visual.textContent).not.toContain('\\alpha')
    // …while the TeX source survives in the MathML annotation, which is what a screen reader is
    // given instead of a stream of glyph names.
    expect(expectFound(body, 'annotation').textContent).toBe(
      '\\alpha \\beta \\Gamma \\Omega \\pm \\infty',
    )
  })

  it('renders math inside lists, blockquotes and table cells', () => {
    const list = renderMarkdown('- Inline math in a list item: $E = mc^2$.')
    const quote = renderMarkdown('> Quoted $a^2 + b^2 = c^2$ formula.')
    const table = renderMarkdown('| Formula |\n| --- |\n| $\\frac{a}{b}$ |')

    expect(list.querySelector('li .katex')).not.toBeNull()
    expect(quote.querySelector('blockquote .katex')).not.toBeNull()
    expect(table.querySelector('td .katex')).not.toBeNull()
  })

  it('does not mistake currency for a formula', () => {
    // `$` is money far more often than it is maths. remark-math requires the closing `$` not to be
    // preceded by whitespace, which is what keeps this sentence out of the maths pipeline.
    const body = renderMarkdown('It costs $5 and $10 today, not $20.')

    expect(body.querySelector('.katex')).toBeNull()
    expect(body.textContent).toBe('It costs $5 and $10 today, not $20.')
  })

  it('degrades gracefully on invalid math instead of failing the document', () => {
    const body = renderMarkdown('before\n\n$\\notarealcommand{x}$\n\nafter\n')

    // KaTeX renders the offending command in its error colour and keeps going; the document must
    // survive with the paragraphs on both sides intact. A reading engine degrades, it does not fail.
    expect(body.textContent).toContain('before')
    expect(body.textContent).toContain('after')
    expect(body.textContent).toContain('\\notarealcommand')
    const errored = body.querySelector('.katex [style*="color"]')

    expect(
      errored?.getAttribute('style'),
      body.innerHTML.slice(0, 600),
    ).toContain('rgb(204, 0, 0)')
  })

  it('gives an unclosed formula back as text rather than swallowing the rest', () => {
    const body = renderMarkdown('An unclosed $formula that never ends.')

    expect(body.querySelector('.katex')).toBeNull()
    expect(body.textContent).toBe('An unclosed $formula that never ends.')
  })

  it('never lets a formula introduce a link, even though KaTeX can typeset one', () => {
    // `trust: false` is the plugin-level lock; the schema's URL policy is the second one.
    const body = renderMarkdown('$\\href{javascript:alert(1)}{x}$')

    expect(body.querySelectorAll('a')).toHaveLength(0)
    expect(body.querySelectorAll('[href]')).toHaveLength(0)
    expect(body.querySelectorAll('[xlink\\:href]')).toHaveLength(0)
  })

  it('never lets a document produce math or SVG markup from raw HTML', () => {
    // Layer 1 of the sanitization policy: raw HTML never reaches the tree, so the Phase 5 widening
    // is reachable only from our own plugins. This is what makes that widening safe.
    const body = renderMarkdown(
      '<math><mi>x</mi><script>alert(1)</script></math>\n\n<svg onload="alert(1)"><path d="M0 0"/></svg>\n\n<menclose notation="box">y</menclose>',
    )

    expect(body.querySelectorAll('math')).toHaveLength(0)
    expect(body.querySelectorAll('svg')).toHaveLength(0)
    expect(body.querySelectorAll('path')).toHaveLength(0)
    expect(body.querySelectorAll('menclose')).toHaveLength(0)
    expect(body.querySelectorAll('script')).toHaveLength(0)
    expect(body.querySelectorAll('[onload]')).toHaveLength(0)
  })
})
