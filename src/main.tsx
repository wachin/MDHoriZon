import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// KaTeX ships its own stylesheet *and* its own web fonts. Without this import the maths renders as
// unstyled positioning markup. It is imported at the application entry, not from the rendering core,
// so that the core keeps no side-effectful imports of its own.
import 'katex/dist/katex.min.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
