'use client';

import { useEffect } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error);
        });
    }

    // Handle install prompt
    let deferredPrompt: any;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      console.log('📱 Install prompt available');
    });

    // Handle app installed
    window.addEventListener('appinstalled', () => {
      console.log('✅ PWA installed successfully');
      deferredPrompt = null;
    });
  }, []);

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content="Gestiona tus finanzas personales con inteligencia artificial" />
        <meta name="theme-color" content="#0088FF" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FinanceAI Pro" />
        
        {/* PWA Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/file.svg" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%2300EEFF'/><stop offset='100%' style='stop-color:%230088FF'/></linearGradient></defs><rect width='180' height='180' fill='%230b121e'/><circle cx='90' cy='90' r='85' fill='url(%23g)' opacity='0.15'/><circle cx='90' cy='90' r='85' fill='none' stroke='url(%23g)' stroke-width='3'/><text x='90' y='108' font-family='Arial' font-weight='800' font-size='60' fill='url(%23g)' text-anchor='middle'>F</text></svg>" />
        
        {/* Splash Screens */}
        <link rel="apple-touch-startup-image" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 540 720'><rect fill='%230b121e' width='540' height='720'/><text x='270' y='360' font-size='60' fill='%2300EEFF' text-anchor='middle' font-weight='bold'>FinanceAI Pro</text></svg>" />
        
        <title>FinanceAI Pro - Finanzas con IA</title>
      </head>
      <body>
        <LanguageProvider>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <TopBar />
            <div style={{ display: 'flex', flex: 1 }}>
              <Sidebar />
              <main
                style={{
                  marginLeft: '0',
                  width: '100%',
                  minHeight: 'calc(100vh - 57px)',
                  overflowY: 'auto',
                  paddingBottom: 'env(safe-area-inset-bottom)',
                }}
              >
                {children}
              </main>
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
