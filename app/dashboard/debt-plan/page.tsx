'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function DebtPlanPage() {
  const { t } = useLanguage()

  return (
    <div className="p-8 bg-slate-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">{t('debtPlan')}</h1>
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <p className="text-slate-400">{t('underConstruction') || 'Funcionalidad en construcción'}</p>
      </div>
    </div>
  )
}
