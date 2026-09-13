# ROADMAP.md

Repositorio para el desarrollo de un motor de renderizado Markdown con publicación web (GitHub Pages) y empaquetado móvil (Android/iOS) mediante Capacitor.

---

## 🎯 Visión del proyecto

Construir un sistema de renderizado de Markdown que replique la experiencia de lectura de asistentes como DeepSeek Chat: tablas con scroll horizontal táctil, bloques de código con resaltado y botón de copia, fórmulas matemáticas (KaTeX), diagramas Mermaid, y tipografía cuidada. El mismo núcleo de renderizado debe funcionar en navegador web y dentro de una app nativa Android/iOS sin duplicar lógica.

**Arquitectura objetivo:**

```
Markdown (.md)
  → unified / remark / rehype
    → HTML + CSS (KaTeX, highlight.js, Mermaid)
      → React (Web)
        → Capacitor → Android / iOS
```

---

## 📦 Stack tecnológico

| Capa | Tecnología | Versión de referencia |
|---|---|---|
| UI | React + TypeScript | React 19 |
| Build | Vite | Última estable |
| Markdown | `react-markdown` | 10.1.0 |
| GFM (tablas, tachado, tasklists) | `remark-gfm` | 4.0.1 |
| Matemáticas | `remark-math` + `rehype-katex` + `katex` | 6.0.0 / 7.0.1 |
| Resaltado de código | `rehype-highlight` + `highlight.js` | 7.0.2 |
| Diagramas | `mermaid` (lazy load) | Última estable |
| Móvil | Capacitor | 7 (requiere JDK 21) |
| CI/CD | GitHub Actions | — |
| Deploy web | GitHub Pages | — |

**Notas sobre versiones:** `react-markdown` ha alcanzado la versión 10.1.0 en 2026. `remark-gfm` se mantiene en 4.0.1. `rehype-katex` está en 7.0.1. `rehype-highlight` en 7.0.2. Capacitor 7 exige JDK 21 para compilar Android.

---

## 🗺️ Fases del desarrollo

### Fase 0 — Fundación del repositorio

- [ ] Crear repositorio en GitHub
- [ ] Inicializar proyecto con Vite + React + TypeScript
  ```bash
  npm create vite@latest . -- --template react-ts
  ```
- [ ] Configurar ESLint + Prettier
- [ ] Configurar `vite.config.ts` con `base` correcto para GitHub Pages
  - Para repositorio de proyecto (`usuario.github.io/mi-repo/`): `base: '/mi-repo/'`
  - Para repositorio raíz (`usuario.github.io`): `base: '/'`
- [ ] Añadir `.nojekyll` en la carpeta `public/` para evitar procesamiento Jekyll
- [ ] Crear estructura de carpetas inicial:
  ```
  src/
  ├── components/
  │   ├── MarkdownRenderer.tsx
  │   ├── CodeBlock.tsx
  │   ├── TableWrapper.tsx
  │   └── MermaidDiagram.tsx
  ├── styles/
  │   └── markdown.css
  └── content/
  ```

---

### Fase 1 — Motor de renderizado core

**Objetivo:** Un componente `MarkdownRenderer` que transforme cualquier Markdown (incluyendo GFM, matemáticas, código y Mermaid) en HTML fiel y legible.

- [ ] Instalar dependencias base:
  ```bash
  npm install react-markdown remark-gfm remark-math rehype-katex rehype-highlight katex
  npm install -D @types/react @types/react-dom
  ```
- [ ] Implementar `MarkdownRenderer.tsx` con el pipeline de plugins:
  ```tsx
  import ReactMarkdown from 'react-markdown';
  import remarkGfm from 'remark-gfm';
  import remarkMath from 'remark-math';
  import rehypeKatex from 'rehype-katex';
  import rehypeHighlight from 'rehype-highlight';
  import 'katex/dist/katex.min.css';
  import 'highlight.js/styles/github-dark.css';

  const MarkdownRenderer = ({ content }: { content: string }) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
      components={{
        table: ({ node, ...props }) => (
          <div className="table-wrapper"><table {...props} /></div>
        ),
        code: CodeBlock,
      }}
    >
      {content}
    </ReactMarkdown>
  );
  ```
- [ ] Implementar `TableWrapper` con CSS de scroll horizontal táctil:
  ```css
  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 1rem 0;
  }
  .table-wrapper table {
    min-width: 100%;
    border-collapse: collapse;
  }
  .table-wrapper th,
  .table-wrapper td {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    white-space: nowrap;
  }
  ```
- [ ] Implementar `CodeBlock` con:
  - Detección de lenguaje
  - Botón de copia al portapapeles
  - Header con nombre del lenguaje
  - Scroll horizontal para líneas largas (`pre { overflow-x: auto }`)
- [ ] Pruebas de renderizado con el documento `Paquetes esenciales de Linux para que funcione Freebuff AppImage.md`:
  - [ ] Encabezados, enlaces, tablas
  - [ ] Bloques de código Bash
  - [ ] Notas (`>`) y tablas de varias columnas
- [ ] Pruebas con casos extremos:
  - [ ] Fórmulas inline: `$E = mc^2$`
  - [ ] Fórmulas display: `$$ \int_0^\infty e^{-x} dx = 1 $$`
  - [ ] Diagrama Mermaid: ` ```mermaid graph TD ... ``` `
  - [ ] Tabla con 8+ columnas (verificar scroll horizontal)

---

### Fase 2 — Experiencia de lectura y pulido visual

- [ ] Sistema de temas (claro/oscuro) mediante variables CSS:
  - `--font-body`, `--font-mono`, `--border-color`, `--bg-code`
- [ ] Tipografía cuidada: tamaños de encabezado, line-height, márgenes verticales
- [ ] Lazy loading de Mermaid para reducir bundle inicial:
  ```tsx
  const MermaidDiagram = React.lazy(() => import('./MermaidDiagram'));
  ```
  Mermaid pesa aproximadamente 2.8 MB y debe cargarse solo cuando aparece un diagrama.
- [ ] Lazy loading de KaTeX (opcional, si el bundle lo justifica)
- [ ] Añadir tabla de contenidos (TOC) generada desde los encabezados
- [ ] Añadir enlaces ancla en encabezados
- [ ] Optimizar carga de fuentes KaTeX
- [ ] Pruebas en navegadores móviles reales (scroll táctil en tablas)

---

### Fase 3 — Publicación web en GitHub Pages

- [ ] Configurar workflow de GitHub Actions para despliegue automático:

  **`.github/workflows/deploy-pages.yml`**
  ```yaml
  name: Deploy a GitHub Pages
  on:
    push:
      branches: [main]
    workflow_dispatch:

  permissions:
    contents: read
    pages: write
    id-token: write

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: npm
        - run: npm ci
        - run: npm run build
        - uses: actions/upload-pages-artifact@v3
          with:
            path: ./dist

    deploy:
      needs: build
      runs-on: ubuntu-latest
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      steps:
        - id: deployment
          uses: actions/deploy-pages@v4
  ```
- [ ] Verificar despliegue en `https://usuario.github.io/repo/`
- [ ] Probar en móvil: abrir la URL, verificar scroll en tablas y código
- [ ] Añadir metadatos SEO básicos (`title`, `description`, `og:image`)

---

### Fase 4 — Empaquetado móvil con Capacitor

- [ ] Instalar Capacitor:
  ```bash
  npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
  npx cap init "Mi Blog" "com.miblog.app" --web-dir=dist
  ```
- [ ] Añadir plataforma Android:
  ```bash
  npm run build
  npx cap add android
  npx cap sync android
  ```
- [ ] Añadir plataforma iOS (si hay acceso a macOS):
  ```bash
  npx cap add ios
  npx cap sync ios
  ```
- [ ] Configurar `capacitor.config.ts`:
  - `webDir: 'dist'`
  - `server.androidScheme: 'https'`
  - `android.allowMixedContent: false`
- [ ] Ajustes específicos de Android:
  - Safe areas (`env(safe-area-inset-*)` en CSS)
  - Status bar (instalar `@capacitor/status-bar` si es necesario)
  - Back button (manejar navegación)
- [ ] Verificar que tablas, código, KaTeX y Mermaid se rendericen correctamente en el WebView
- [ ] Probar scroll táctil en tablas dentro de la app

---

### Fase 5 — CI/CD para Android (APK firmado)

- [ ] Generar keystore local:
  ```bash
  keytool -genkey -v -keystore release.jks -alias mi-alias -keyalg RSA -keysize 2048 -validity 10000
  ```
- [ ] Codificar keystore en base64 y guardar como secreto de GitHub:
  ```bash
  base64 release.jks > keystore.b64
  ```
- [ ] Configurar secretos en GitHub:
  - `KEYSTORE` (base64 del `.jks`)
  - `KEYSTORE_PASS`
  - `KEYSTORE_ALIAS`
  - `KEYSTORE_ALIAS_PASS`
- [ ] Crear workflow de build Android:

  **`.github/workflows/android-build.yml`**
  ```yaml
  name: Build Android APK
  on:
    push:
      tags: ['v*']
    workflow_dispatch:

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: npm
        - uses: actions/setup-java@v4
          with:
            distribution: temurin
            java-version: '21'   # Capacitor 7 requiere JDK 21
        - name: Install dependencies
          run: npm ci
        - name: Build web
          run: npm run build
        - name: Sync Capacitor
          run: npx cap sync android
        - name: Decode keystore
          env:
            KEYSTORE: ${{ secrets.KEYSTORE }}
          run: echo "$KEYSTORE" | base64 --decode > android/release.jks
        - name: Build signed APK
          run: |
            cd android
            ./gradlew assembleRelease \
              -Pandroid.injected.signing.store.file=$PWD/release.jks \
              -Pandroid.injected.signing.store.password=${{ secrets.KEYSTORE_PASS }} \
              -Pandroid.injected.signing.key.alias=${{ secrets.KEYSTORE_ALIAS }} \
              -Pandroid.injected.signing.key.password=${{ secrets.KEYSTORE_ALIAS_PASS }}
        - name: Upload APK
          uses: actions/upload-artifact@v4
          with:
            name: app-release
            path: android/app/build/outputs/apk/release/app-release.apk
  ```
- [ ] Probar build local antes de subir a CI:
  ```bash
  cd android && ./gradlew assembleDebug
  ```
- [ ] Verificar que el APK se genere y se pueda instalar en un dispositivo real

---

### Fase 6 — iOS (opcional, requiere macOS)

- [ ] Añadir plataforma iOS:
  ```bash
  npx cap add ios
  npx cap sync ios
  ```
- [ ] Configurar firma en Xcode (requiere cuenta de desarrollador Apple)
- [ ] Workflow de GitHub Actions para iOS (requiere runner macOS):
  ```yaml
  runs-on: macos-latest
  ```
- [ ] Generar IPA y distribuir vía TestFlight o Ad Hoc

---

### Fase 7 — Contenido y escalabilidad

- [ ] Sistema de carga de contenido:
  - [ ] Opción A: archivos `.md` en `src/docs/guides/` importados como strings
  - [ ] Opción B: fetch de archivos `.md` desde carpeta `docs/guides/`
  - [ ] Opción C: CMS headless (Sanity, Contentful) o GitHub como CMS
- [ ] Índice de artículos y navegación
- [ ] Búsqueda (opcional, con `fuse.js` o similar)
- [ ] PWA: service worker para funcionamiento offline
- [ ] Optimización de bundle: code splitting por artículo
- [ ] Añadir soporte para frontmatter (título, fecha, tags) mediante `gray-matter`

---

## 📁 Estructura del repositorio (objetivo final)

```
/
├── .github/
│   └── workflows/
│       ├── deploy-pages.yml
│       └── android-build.yml
├── src/
│   ├── components/
│   │   ├── MarkdownRenderer.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── TableWrapper.tsx
│   │   ├── MermaidDiagram.tsx
│   │   └── TableOfContents.tsx
│   ├── styles/
│   │   ├── markdown.css
│   │   └── themes.css
│   ├── docs/guides/
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── .nojekyll
├── android/          # generado por Capacitor
├── ios/              # generado por Capacitor
├── capacitor.config.ts
├── vite.config.ts
├── package.json
└── ROADMAP.md        # este archivo
```

---

## 🧪 Pruebas de renderizado (checklist de validación)

Usar el documento `Paquetes esenciales de Linux para que funcione Freebuff AppImage.md` como caso de prueba principal. Verificar:

- [ ] Encabezados `#`, `##`, `###` con jerarquía visual clara
- [ ] Texto en negrita, cursiva, código inline
- [ ] Enlaces que abren correctamente
- [ ] Bloques de código Bash con resaltado de sintaxis
- [ ] Botón de copia en bloques de código
- [ ] Tabla de 2 columnas (Git y GitHub)
- [ ] Tabla de 3 columnas (resumen)
- [ ] Notas con `>` (blockquotes)
- [ ] Listas ordenadas y no ordenadas
- [ ] Scroll horizontal en tablas (probar en móvil)
- [ ] Fórmulas KaTeX (añadir al documento de prueba)
- [ ] Diagrama Mermaid (añadir al documento de prueba)

---

## 📚 Referencias y proyectos de estudio

| Proyecto | Tecnología | Qué estudiar |
| --- | --- | --- |
| **MarkText for Android** | Vue + Vite + Capacitor + Muya | Renderizado web en WebView, integración con Capacitor |
| **Noteriv** | React + React Native | Arquitectura de código compartido web/móvil |
| **react-markdown** | React + unified | Pipeline de plugins, componentes custom |
| **@ootc/markdown** | React + Mermaid + KaTeX | Lazy loading de dependencias pesadas |

---

## 🔗 Enlaces útiles

- [react-markdown en GitHub](https://github.com/remarkjs/react-markdown)
- [remark-gfm](https://github.com/remarkjs/remark-gfm)
- [rehype-katex](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex)
- [rehype-highlight](https://github.com/rehypejs/rehype-highlight)
- [Capacitor documentation](https://capacitorjs.com/docs)
- [GitHub Actions para Pages](https://vite.dev/guide/static-deploy.html#github-pages)
- [Capacitor Android build desde CI](https://stackoverflow.com/questions/79418936)

---

## ✅ Hitos

| Hito | Descripción | Estado |
|---|---|---|
| **M1** | Renderizado web funcional con GFM, KaTeX, highlight y Mermaid | ⬜ |
| **M2** | Deploy automático en GitHub Pages | ⬜ |
| **M3** | APK de Android firmado generado por GitHub Actions | ⬜ |
| **M4** | App iOS (requiere macOS) | ⬜ |
| **M5** | Contenido cargado dinámicamente desde archivos `.md` | ⬜ |

---

*Última actualización: Septiembre 2026*
