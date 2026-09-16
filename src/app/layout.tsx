import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FinanceAI Pro V2.0',
  description: 'Premium AI-powered personal finance platform for LATAM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
