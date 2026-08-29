'use client'

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="px-6 py-4 border-b border-slate-700">
        <Link href="/" className="text-blue-400">Back to Home</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="text-slate-300 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p>We collect your email, name, and financial data you provide:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Email address</li>
              <li>Financial transactions</li>
              <li>Card information</li>
              <li>Debt records</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. How We Use Data</h2>
            <p>We use your data to:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Provide financial management services</li>
              <li>Send important notices</li>
              <li>Improve our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Data Security</h2>
            <p>We use industry-standard encryption and Row Level Security to protect your data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Third-Party Services</h2>
            <p>We use Supabase for data storage and OpenAI for receipt processing.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Your Rights</h2>
            <p>You can request access, update, or delete your data anytime.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Contact Us</h2>
            <p>Email: support@financeai.pro</p>
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
