import { describe, expect, it } from 'vitest'
import { sanitizeMermaidSvg } from './sanitize-svg'

/**
 * The Mermaid output boundary, tested with the constructs that would otherwise fetch, execute or
 * escape. Mermaid's SVG is produced in the browser and never passes through `rehype-sanitize`, so
 * this is the only thing standing between a document's diagram source and the DOM.
 *
 * The `xlink:href` and CSS cases are not hypothetical: both were measured surviving DOMPurify alone,
 * which is why the reference policy in `sanitize-svg.ts` exists.
 */

const render = async (svg: string): Promise<string> =>
  new XMLSerializer().serializeToString(await sanitizeMermaidSvg(svg))

/** A faithful sample of what Mermaid emits, including everything it needs to keep looking right. */
const MERMAID_LIKE = [
  '<svg id="g" width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">',
  '<style>#g .node rect{fill:#ECECFF;stroke:#9370DB}.edge{stroke:#333}</style>',
  '<defs>',
  '<marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">',
  '<path d="M0,0 L10,5 L0,10 z" fill="#333"/></marker>',
  '<pattern id="p" width="8" height="8"><rect width="4" height="4" fill="#f00"/></pattern>',
  '<clipPath id="c"><rect width="10" height="10"/></clipPath>',
  '<filter id="f"><feGaussianBlur stdDeviation="2"/></filter>',
  '</defs>',
  '<g class="node"><rect rx="5" style="fill:#ECECFF"></rect>',
  '<text x="2" y="4" style="font-family:monospace">Hello</text></g>',
  '<path class="edge" d="M0,0 L5,5" marker-end="url(#arrow)" stroke-width="2"></path>',
  '</svg>',
].join('')

describe('the Mermaid SVG boundary', () => {
  it('keeps everything a real diagram needs to render', async () => {
    const clean = await render(MERMAID_LIKE)

    // Style, defs and paint servers are what make the diagram readable rather than black-on-black.
    for (const kept of [
      '<style',
      '#ECECFF',
      '<marker',
      '<pattern',
      '<clipPath',
      '<filter',
      'feGaussianBlur',
      'marker-end',
      'fill:#ECECFF',
      'font-family',
      '<text',
      'url(#arrow)',
    ]) {
      expect(clean, kept).toContain(kept)
    }
  })

  it('returns an element, not markup to be injected as a string', async () => {
    // This is what lets the component avoid `dangerouslySetInnerHTML` entirely.
    const element = await sanitizeMermaidSvg(MERMAID_LIKE)

    expect(element.tagName.toLowerCase()).toBe('svg')
    expect(element.querySelectorAll('path').length).toBeGreaterThan(0)
  })

  it('keeps the accessible role Mermaid gives a diagram', async () => {
    // Measured: DOMPurify's SVG profile keeps `aria-*` but strips `role`, which would leave every
    // diagram an anonymous graphic. This pins the fix.
    const clean = await sanitizeMermaidSvg(
      '<svg xmlns="http://www.w3.org/2000/svg" role="graphics-document document" aria-roledescription="flowchart-v2"><g/></svg>',
    )

    expect(clean.getAttribute('role')).toBe('graphics-document document')
    expect(clean.getAttribute('aria-roledescription')).toBe('flowchart-v2')
  })

  it('removes every way a diagram could execute script', async () => {
    const cases: Array<[string, string]> = [
      [
        'script element',
        '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script><rect/></svg>',
      ],
      [
        'onload on the root',
        '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"><rect/></svg>',
      ],
      [
        'onclick on a child',
        '<svg xmlns="http://www.w3.org/2000/svg"><rect onclick="alert(1)"/></svg>',
      ],
      [
        'onerror inside a foreignObject',
        '<svg xmlns="http://www.w3.org/2000/svg"><foreignObject><body xmlns="http://www.w3.org/1999/xhtml"><img src="x" onerror="alert(1)"></body></foreignObject></svg>',
      ],
      [
        'SMIL setting an href',
        '<svg xmlns="http://www.w3.org/2000/svg"><a><set attributeName="href" to="javascript:alert(1)"/><text>x</text></a></svg>',
      ],
      [
        'javascript: link',
        '<svg xmlns="http://www.w3.org/2000/svg"><a href="javascript:alert(1)"><text>x</text></a></svg>',
      ],
      [
        'data: image',
        '<svg xmlns="http://www.w3.org/2000/svg"><image href="data:image/svg+xml;base64,PHN2Zy8+"/></svg>',
      ],
    ]

    for (const [name, svg] of cases) {
      const clean = await render(svg)

      expect(clean, name).not.toMatch(
        /<script|on[a-z]+\s*=|javascript:|<foreignObject|<set\b/i,
      )
    }
  })

  it('removes every way a diagram could fetch from the network', async () => {
    // Each of these is a beacon: the reader's IP and the fact that they opened the article, sent to
    // whoever wrote it. The policy is deny-unless-proven-local, so only `#fragment` survives.
    const cases: Array<[string, string, RegExp]> = [
      [
        'xlink:href on an image',
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image xlink:href="http://evil.test/x.png"/></svg>',
        /evil\.test/,
      ],
      [
        'href on a use',
        '<svg xmlns="http://www.w3.org/2000/svg"><use href="http://evil.test/x.svg#a"/></svg>',
        /evil\.test/,
      ],
      [
        'href on an anchor',
        '<svg xmlns="http://www.w3.org/2000/svg"><a href="https://evil.test/"><text>x</text></a></svg>',
        /evil\.test/,
      ],
      [
        '@import in the stylesheet',
        '<svg xmlns="http://www.w3.org/2000/svg"><style>@import url(http://evil.test/x.css);</style><rect/></svg>',
        /evil\.test/,
      ],
      [
        'remote url() in the stylesheet',
        '<svg xmlns="http://www.w3.org/2000/svg"><style>.a{background:url(http://evil.test/x)}</style><rect/></svg>',
        /evil\.test/,
      ],
      [
        'remote url() in a style attribute',
        '<svg xmlns="http://www.w3.org/2000/svg"><rect style="background-image:url(http://evil.test/x)"/></svg>',
        /evil\.test/,
      ],
      [
        'remote paint server in fill',
        '<svg xmlns="http://www.w3.org/2000/svg"><path fill="url(http://evil.test/x)"/></svg>',
        /evil\.test/,
      ],
      [
        'protocol-relative url()',
        '<svg xmlns="http://www.w3.org/2000/svg"><style>.a{background:url(//evil.test/x)}</style><rect/></svg>',
        /evil\.test/,
      ],
      [
        'remote @font-face source',
        '<svg xmlns="http://www.w3.org/2000/svg"><style>@font-face{src:url("http://evil.test/f.woff2")}</style><rect/></svg>',
        /evil\.test/,
      ],
      [
        'data: url() in the stylesheet',
        '<svg xmlns="http://www.w3.org/2000/svg"><style>.a{background:url(data:text/css,x)}</style><rect/></svg>',
        /data:text/,
      ],
    ]

    for (const [name, svg, forbidden] of cases) {
      expect(await render(svg), name).not.toMatch(forbidden)
    }
  })

  it('keeps local paint servers and markers, which diagrams depend on', async () => {
    const svg = [
      '<svg xmlns="http://www.w3.org/2000/svg">',
      '<defs><marker id="m"><path d="M0,0"/></marker>',
      '<linearGradient id="grad"><stop offset="0"/></linearGradient></defs>',
      '<path fill="url(#grad)" marker-end="url(#m)" stroke="url( #grad )"/>',
      '<rect style="fill:url(#grad)"/>',
      '</svg>',
    ].join('')
    const clean = await render(svg)

    expect(clean).toContain('url(#grad)')
    expect(clean).toContain('url(#m)')
    // Whitespace inside the argument is still a local reference.
    expect(clean).toContain('url( #grad )')
  })

  it('refuses anything that is not an SVG document', async () => {
    await expect(
      sanitizeMermaidSvg('<div>not a diagram</div>'),
    ).rejects.toThrow(/no <svg>/)
    await expect(sanitizeMermaidSvg('')).rejects.toThrow(/no <svg>/)
  })

  it('never leaves the forbidden element set in place, whatever it is asked to clean', async () => {
    const clean = await render(
      '<svg xmlns="http://www.w3.org/2000/svg"><iframe src="http://evil.test"></iframe><audio src="http://evil.test/a.mp3"></audio><video src="http://evil.test/v.mp4"></video><rect/></svg>',
    )

    expect(clean).not.toMatch(/<(iframe|audio|video|script|foreignObject)\b/i)
    expect(clean).not.toMatch(/evil\.test/)
  })
})
