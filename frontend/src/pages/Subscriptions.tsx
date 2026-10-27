import { useLanguage } from '../context/LanguageContext'

export default function Subscriptions() {
  const { language } = useLanguage()

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        {language === 'es' ? '⚡ Suscripciones' : '⚡ Subscriptions'}
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">
          {language === 'es' ? 'Página de suscripciones - En construcción' : 'Subscriptions page - Under construction'}
        </p>
      </div>
    </div>
  )
}
