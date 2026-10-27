import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-full p-1">
      <button
        onClick={() => setLanguage('es')}
        className={`px-4 py-2 rounded-full font-semibold transition-all ${
          language === 'es'
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        🇪🇸 ES
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-full font-semibold transition-all ${
          language === 'en'
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        🇺🇸 EN
      </button>
    </div>
  )
}
