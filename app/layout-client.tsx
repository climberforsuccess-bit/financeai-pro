'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'

export function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const { authenticated, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthPage, setIsAuthPage] = useState(false)

  useEffect(() => {
    const isAuth = pathname?.startsWith('/auth') ?? false
    setIsAuthPage(isAuth)

    if (loading) return

    if (!authenticated && !isAuth) {
      router.push('/auth/login')
    }

    if (authenticated && isAuth) {
      router.push('/dashboard')
    }
  }, [authenticated, loading, pathname, router])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration)
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error)
        })
    }

    let deferredPrompt: any
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      console.log('📱 Install prompt available')
    })

    window.addEventListener('appinstalled', () => {
      console.log('✅ PWA installed successfully')
      deferredPrompt = null
    })
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-slate-400 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthPage) {
    return <>{children}</>
  }

  if (authenticated) {
    return (
      <div className="flex h-screen bg-slate-950">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
