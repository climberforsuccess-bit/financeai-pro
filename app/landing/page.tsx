'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LandingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#00CED1_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="flex justify-between items-center mb-20">
            <div className="text-2xl font-bold text-white">
              Finance<span className="text-cyan-400">AI</span>Pro
            </div>
            <div className="flex gap-4">
              <Link
                href="/auth/login"
                className="px-6 py-2 text-white hover:text-cyan-400 transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/auth/signup"
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
              >
                Registrarse
              </Link>
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Tu Dinero,
              <br />
              <span className="text-cyan-400">Inteligencia Artificial</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Gestiona tus finanzas personales con IA. Presupuestos inteligentes, estrategias de deuda y ahorros optimizados.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition transform hover:scale-105"
              >
                Comienza Gratis
              </Link>
              <button
                className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-500/10 transition"
              >
                Ver Demo
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                title: 'Análisis de Gastos',
                description: 'IA que entiende tus patrones de gasto y te da recomendaciones reales.',
                icon: '📊',
              },
              {
                title: 'Estrategia de Deuda',
                description: 'Calcula el mejor plan para salir de deudas y ahorra miles en intereses.',
                icon: '💳',
              },
              {
                title: 'Escaneo de Recibos',
                description: 'Fotografía recibos y categoriza gastos automáticamente con IA.',
                icon: '📸',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
