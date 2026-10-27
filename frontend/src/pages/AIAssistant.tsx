import { useLanguage } from '../context/LanguageContext'

export default function AIAssistant() {
  const { language } = useLanguage()

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        {language === 'es' ? '🤖 Asistente IA' : '🤖 AI Assistant'}
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">
          {language === 'es' ? 'Página del asistente IA - En construcción' : 'AI Assistant page - Under construction'}
        </p>
      </div>
    </div>
  )
}
