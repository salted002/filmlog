import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { WatchedProvider } from './context/WatchedContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { WishProvider } from './context/WishContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <WatchedProvider>
        <WishProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WishProvider>
      </WatchedProvider>
    </AuthProvider>
  </StrictMode>,
)
