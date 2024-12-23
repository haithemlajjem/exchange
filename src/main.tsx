import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App2 from './App.tsx'
// import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App2 />
    {/* <App /> */}
  </StrictMode>,
)
