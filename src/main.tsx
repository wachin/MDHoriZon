import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initialiseTheme } from './core/theme/store'
// The visual system first: every other stylesheet consumes its variables.
import './styles/theme.css'
// KaTeX ships its own stylesheet *and* its own web fonts. Without this import the maths renders as
// unstyled positioning markup. It is imported at the application entry, not from the rendering core,
// so that the core keeps no side-effectful imports of its own.
import 'katex/dist/katex.min.css'
import './index.css'
import App from './App.tsx'

// Before the first render: the theme is an attribute on `<html>`, so resolving it inside a component
// would paint the wrong one for a frame.
initialiseTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
