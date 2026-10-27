import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'

const locales = ['es', 'en']

export const metadata: Metadata = {
  title: 'FinanceAI Pro',
  description: 'Gestiona tus finanzas inteligentemente',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  return <>{children}</>
}
