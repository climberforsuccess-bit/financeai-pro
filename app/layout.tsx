'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <TopBar />
            <div style={{ display: 'flex', flex: 1 }}>
              <Sidebar />
              <main style={{ marginLeft: '0', width: '100%', minHeight: 'calc(100vh - 57px)', overflowY: 'auto' }}>
                {children}
              </main>
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
