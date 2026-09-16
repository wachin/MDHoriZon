/**
 * The lazy Mermaid loader.
 *
 * Mermaid is enormous — it pulls d3, dagre, cytoscape and their layout engines — and most articles
 * contain no diagram at all. So it is loaded with a dynamic `import()`, which Vite turns into a
 * separate chunk: a document with no `mermaid` fence never downloads a byte of it. Measured, the
 * entry chunk grew by ~5 kB for this whole phase. `tests/lazy-loading.test.ts` guards that discipline
 * in source, so a static import cannot quietly undo it.
 *
 * ## The security options, and why each one is here
 *
 * - `securityLevel: 'strict'` makes Mermaid encode HTML in labels and drop click handlers and links.
 *   It is Mermaid's own boundary, and it is only the first of ours.
 * - `htmlLabels: false` keeps Mermaid from emitting `<foreignObject>`, which is how it embeds HTML
 *   inside SVG. Measured on all five diagram types in the golden document: none of them needs it.
 *   Dropping it is what lets `sanitize-svg.ts` forbid `foreignObject` outright.
 * - `suppressErrorRendering: true` stops Mermaid from injecting its own error graphic into the
 *   document. A malformed diagram must produce *our* feedback, in our container, not markup
 *   appended to `<body>` behind the component's back.
 * - `maxTextSize` and `maxEdges` bound the work an untrusted document can ask for.
 * - `startOnLoad: false`: this is a library, not a page script. Nothing renders until a component
 *   asks for it.
 * - `bindFunctions` is deliberately never called: it attaches the interactivity Mermaid computed,
 *   and a reading engine has no use for click handlers inside a diagram.
 *
 * Renders are serialised through one promise chain because `mermaid.initialize` sets process-wide
 * configuration: two diagrams rendering concurrently with different themes would race.
 */
import type { MermaidConfig } from 'mermaid'

/** The scheme the diagram is drawn for. Mermaid's `default` theme is its light one. */
export type DiagramTheme = 'light' | 'dark'

type Mermaid = (typeof import('mermaid'))['default']

let mermaidModule: Promise<Mermaid> | null = null

/** Serialises renders so a theme change cannot race a render already in flight. */
let renderQueue: Promise<unknown> = Promise.resolve()

let renderCount = 0

/** Loads Mermaid once per page, however many diagrams there are. */
async function loadMermaid(): Promise<Mermaid> {
  mermaidModule ??= import('mermaid').then((module) => module.default)

  return mermaidModule
}

function configuration(theme: DiagramTheme): MermaidConfig {
  return {
    startOnLoad: false,
    securityLevel: 'strict',
    htmlLabels: false,
    suppressErrorRendering: true,
    theme: theme === 'dark' ? 'dark' : 'default',
    // Bounds on untrusted input: a document must not be able to ask for unbounded layout work.
    maxTextSize: 50_000,
    maxEdges: 500,
    fontFamily: 'inherit',
  }
}

/**
 * Renders one diagram to an SVG string.
 *
 * Throws whatever Mermaid throws — its messages are aimed at the diagram author and are exactly what
 * the reader needs to see, e.g. `Parse error on line 3:`.
 */
export async function renderMermaid(
  code: string,
  theme: DiagramTheme,
): Promise<string> {
  const mermaid = await loadMermaid()

  const render = async (): Promise<string> => {
    mermaid.initialize(configuration(theme))
    renderCount += 1
    // Unique per render: Mermaid uses the id to build element ids inside the SVG, and two diagrams
    // sharing an id would collide in the document once both are inserted.
    const { svg } = await mermaid.render(
      `mdhorizon-diagram-${renderCount}`,
      code,
    )

    return svg
  }

  const queued = renderQueue.then(render, render)

  // Keep the chain alive even when this render rejects, so one malformed diagram cannot wedge every
  // diagram that follows it.
  renderQueue = queued.catch(() => undefined)

  return queued
}

/**
 * Validates one diagram without rendering it.
 *
 * Exposed because it is the honest way to test a document's diagrams: it runs the real parser with
 * the real configuration, but needs no layout engine, so it works in jsdom.
 * `tests/mermaid-fixture.test.ts` uses it to assert that every diagram in the golden document is
 * valid — except the two that are deliberately not.
 *
 * Rejects with Mermaid's own error, e.g. `Parse error on line 3:`.
 */
export async function parseMermaid(code: string): Promise<void> {
  const mermaid = await loadMermaid()

  mermaid.initialize(configuration('light'))
  await mermaid.parse(code)
}
