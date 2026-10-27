'use client';

import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="border-b border-slate-700 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">FinanceAI Pro</h1>
          <div className="flex gap-4">
            <Link href="/auth/login" className="text-sm hover:text-blue-400">Login</Link>
            <Link href="/auth/signup" className="text-sm bg-blue-600 px-4 py-2 rounded">Sign Up</Link>
          </div>
        </div>
      </nav>
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">Control Total con IA</h2>
        <p className="text-xl text-slate-400 mb-8">Gestiona deudas, ahorra inteligentemente</p>
        <Link href="/auth/signup" className="inline-block px-8 py-3 bg-blue-600 rounded font-semibold">Comenzar Gratis</Link>
      </section>
    </div>
  );
}
