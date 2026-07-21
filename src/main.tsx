import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { WatchedProvider } from './context/WatchedContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <WatchedProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WatchedProvider>
    </AuthProvider>
  </StrictMode>,
)
