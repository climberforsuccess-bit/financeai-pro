'use client'

import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="px-6 py-4 border-b border-slate-700">
        <Link href="/" className="text-blue-400">Back to Home</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

        <div className="text-slate-300 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Agreement to Terms</h2>
            <p>By using FinanceAI Pro, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Use License</h2>
            <p>Permission is granted to use this service for personal finance management only.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Disclaimer</h2>
            <p>FinanceAI Pro is provided as-is. We make no warranties about accuracy or availability.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Limitations</h2>
            <p>FinanceAI Pro shall not be liable for indirect or consequential damages.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. User Responsibilities</h2>
            <p>You are responsible for maintaining account security and all activities under your account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Modifications</h2>
            <p>We may revise these terms at any time without notice.</p>
          </section>

          <section>
            <p className="text-slate-400 mt-8 pt-8 border-t border-slate-700">
              Last updated: August 2024
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
