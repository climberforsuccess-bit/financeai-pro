import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'
import { useAuthStore } from './stores/authStore'

// Inicializar auth cuando la app carga
useAuthStore.getState().initAuth()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)
