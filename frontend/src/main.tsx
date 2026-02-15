import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initGA } from './analytics'

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-TCL6Z7C9HM'
initGA(measurementId)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
