# MDHoriZon

A Markdown rendering engine for web (GitHub Pages) and mobile (Android/iOS) via Capacitor. Built with React, TypeScript, and a unified/remark/rehype plugin pipeline.

Replicates the reading experience of AI assistants like DeepSeek Chat: tables with horizontal touch scrolling, syntax-highlighted code blocks with copy button, KaTeX math formulas, and Mermaid diagrams.

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite |
| Markdown | `react-markdown` + `remark-gfm` |
| Math | `remark-math` + `rehype-katex` |
| Code | `rehype-highlight` + `highlight.js` |
| Diagrams | `mermaid` (lazy loaded) |
| Mobile | Capacitor 7 |
| CI/CD | GitHub Actions |
| Deploy | GitHub Pages |

## Features

- GitHub Flavored Markdown (tables, strikethrough, tasklists)
- KaTeX math rendering (inline and display)
- Syntax-highlighted code blocks with copy button
- Mermaid diagram support (lazy loaded)
- Horizontal touch-scrolling tables
- Light/dark theme system
- Auto-generated table of contents
- Android/iOS apps via Capacitor
- Automatic deployment via GitHub Actions

## Getting Started

```bash
# Clone the repository
git clone https://github.com/user/MDHoriZon.git
cd MDHoriZon

# Install dependencies
npm install

# Start development server
npm run dev
```

## Build

```bash
# Web build
npm run build

# Android (requires Capacitor setup)
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
```

## Project Structure

```
src/
├── components/
│   ├── MarkdownRenderer.tsx
│   ├── CodeBlock.tsx
│   ├── TableWrapper.tsx
│   ├── MermaidDiagram.tsx
│   └── TableOfContents.tsx
├── styles/
│   ├── markdown.css
│   └── themes.css
├── App.tsx
└── main.tsx
```

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full development plan.

## License

[GPLv3](LICENSE)
