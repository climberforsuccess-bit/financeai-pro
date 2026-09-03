import type { Metadata } from 'next'
import { AuthProvider } from '@/context/AuthContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { LayoutClient } from './layout-client'
import './globals.css'

export const metadata: Metadata = {
  title: 'FinanceAI Pro - Gestión de Finanzas Inteligente',
  description: 'Plataforma de finanzas personales con IA. Gestiona presupuestos, deudas, tarjetas y más.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <LanguageProvider>
            <LayoutClient>
              {children}
            </LayoutClient>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
