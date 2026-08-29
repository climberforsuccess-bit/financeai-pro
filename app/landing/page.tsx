'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LandingPage() {
  const router = useRouter()
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: '📊',
      title: 'Smart Dashboard',
      description: 'Real-time overview of your finances at a glance'
    },
    {
      icon: '💳',
      title: 'Card Management',
      description: 'Track credit cards and utilization rates'
    },
    {
      icon: '🔄',
      title: 'Subscriptions',
      description: 'Monitor all your recurring charges'
    },
    {
      icon: '💰',
      title: 'Debt Planning',
      description: 'Strategic payoff plans with timeline projections'
    },
    {
      icon: '🎯',
      title: 'Goals Tracking',
      description: 'Set and achieve your savings targets'
    },
    {
      icon: '📸',
      title: 'Receipt Scanner',
      description: 'AI-powered OCR for instant transaction creation'
    }
  ]

  const handleGetStarted = () => {
    router.push('/auth/signup')
  }

  const handleSignIn = () => {
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-slate-700">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          FinanceAI Pro
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSignIn}
            className="px-6 py-2 text-slate-300 hover:text-white transition"
          >
            Sign In
          </button>
          <button
            onClick={handleGetStarted}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6">
          Your Personal Finance AI
        </h1>
        <p className="text-xl text-slate-300 mb-8">
          Smart money management with AI-powered insights. Track spending, manage debt, and achieve your financial goals.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Start Free Trial
          </button>
          <button
            onClick={handleSignIn}
            className="px-8 py-3 border border-slate-500 text-white hover:border-white transition rounded-lg"
          >
            Sign In
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredFeature(idx)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`p-6 rounded-lg border transition cursor-pointer ${
                hoveredFeature === idx
                  ? 'border-blue-500 bg-slate-700'
                  : 'border-slate-600 bg-slate-800'
              }`}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Simple Pricing
        </h2>
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-600">
          <h3 className="text-2xl font-bold text-white mb-4">Pro Plan</h3>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-bold text-white">$9.99</span>
            <span className="text-slate-400">/month</span>
          </div>
          <ul className="space-y-3 mb-8 text-slate-300">
            <li>✓ Unlimited transactions</li>
            <li>✓ AI recommendations</li>
            <li>✓ Receipt scanner</li>
            <li>✓ Debt strategies</li>
            <li>✓ Goal tracking</li>
            <li>✓ Export reports</li>
          </ul>
          <button
            onClick={handleGetStarted}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Start Free Trial
          </button>
          <p className="text-center text-slate-400 mt-4 text-sm">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Take Control?
        </h2>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
          Join thousands of users managing their finances smarter with FinanceAI Pro.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Get Started Free
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 px-6 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <p className="text-slate-400">© 2024 FinanceAI Pro. All rights reserved.</p>
          <div className="flex gap-6 text-slate-400">
            <Link href="/legal/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/legal/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/legal/cookies" className="hover:text-white transition">
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
