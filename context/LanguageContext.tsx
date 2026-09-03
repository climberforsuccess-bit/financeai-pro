'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'es'

interface Translations {
  [key: string]: {
    en: string
    es: string
  }
}

const translations: Translations = {
  // Navigation
  dashboard: { en: 'Dashboard', es: 'Panel de Control' },
  transactions: { en: 'Transactions', es: 'Transacciones' },
  cards: { en: 'Credit Cards', es: 'Tarjetas de Crédito' },
  subscriptions: { en: 'Subscriptions', es: 'Suscripciones' },
  debt_plan: { en: 'Debt Plan', es: 'Plan de Deudas' },
  recommendations: { en: 'Recommendations', es: 'Recomendaciones' },
  reports: { en: 'Reports', es: 'Reportes' },
  settings: { en: 'Settings', es: 'Configuración' },
  receipt_scanner: { en: 'Receipt Scanner', es: 'Escáner de Recibos' },

  // Common Actions
  add: { en: 'Add', es: 'Agregar' },
  save: { en: 'Save', es: 'Guardar' },
  delete: { en: 'Delete', es: 'Eliminar' },
  edit: { en: 'Edit', es: 'Editar' },
  cancel: { en: 'Cancel', es: 'Cancelar' },
  loading: { en: 'Loading...', es: 'Cargando...' },
  error: { en: 'Error', es: 'Error' },
  success: { en: 'Success', es: 'Éxito' },
  reload: { en: 'Reload', es: 'Recargar' },

  // Dashboard
  welcome: { en: 'Welcome', es: 'Bienvenido' },
  total_balance: { en: 'Total Balance', es: 'Balance Total' },
  monthly_spending: { en: 'Monthly Spending', es: 'Gastos Mensuales' },
  upcoming_bills: { en: 'Upcoming Bills', es: 'Próximas Facturas' },
  financial_overview: { en: 'Financial Overview', es: 'Descripción Financiera' },
  manage_your_finances: { en: 'Manage your finances', es: 'Gestiona tus finanzas' },
  total_cards: { en: 'Total Cards', es: 'Total de Tarjetas' },
  debts_count: { en: 'Debts', es: 'Deudas' },
  view_plan: { en: 'View Plan', es: 'Ver Plan' },
  this_month: { en: 'This Month', es: 'Este Mes' },
  avg_daily: { en: 'Daily Average', es: 'Promedio Diario' },
  view_all: { en: 'View All', es: 'Ver Todo' },
  today: { en: 'Today', es: 'Hoy' },
  monthly_income: { en: 'Monthly Income', es: 'Ingresos Mensuales' },
  monthly_expenses: { en: 'Monthly Expenses', es: 'Gastos Mensuales' },
  total_debt: { en: 'Total Debt', es: 'Deuda Total' },
  savings: { en: 'Savings', es: 'Ahorros' },
  recent_transactions: { en: 'Recent Transactions', es: 'Transacciones Recientes' },
  no_transactions: { en: 'No transactions recorded', es: 'No hay transacciones registradas' },
  quick_actions: { en: '⚡ Quick Actions', es: '⚡ Acciones Rápidas' },

  // Transactions
  amount: { en: 'Amount', es: 'Monto' },
  type: { en: 'Type', es: 'Tipo' },
  category: { en: 'Category', es: 'Categoría' },
  date: { en: 'Date', es: 'Fecha' },
  description: { en: 'Description', es: 'Descripción' },
  income: { en: 'Income', es: 'Ingreso' },
  expense: { en: 'Expense', es: 'Gasto' },
  transfer: { en: 'Transfer', es: 'Transferencia' },
  expenses: { en: 'Expenses', es: 'Gastos' },
  balance: { en: 'Balance', es: 'Balance' },
  add_transaction: { en: 'Add Transaction', es: 'Agregar Transacción' },

  // Cards
  credit_cards: { en: 'Credit Cards', es: 'Tarjetas de Crédito' },
  manage_your_cards: { en: 'Manage your cards', es: 'Gestiona tus tarjetas' },
  total_limit: { en: 'Total Limit', es: 'Límite Total' },
  total_used: { en: 'Total Used', es: 'Total Usado' },
  add_card: { en: 'Add Card', es: 'Agregar Tarjeta' },
  card_name: { en: 'Card Name', es: 'Nombre de la Tarjeta' },
  issuer: { en: 'Issuer', es: 'Emisor' },
  limit: { en: 'Limit', es: 'Límite' },
  used: { en: 'Used', es: 'Usado' },
  utilization: { en: 'Utilization', es: 'Utilización' },
  interest_rate: { en: 'Interest Rate', es: 'Tasa de Interés' },

  // Subscriptions
  manage_recurring_payments: { en: 'Manage recurring payments', es: 'Gestiona pagos recurrentes' },
  monthly_total: { en: 'Monthly Total', es: 'Total Mensual' },
  add_subscription: { en: 'Add Subscription', es: 'Agregar Suscripción' },
  service_name: { en: 'Service Name', es: 'Nombre del Servicio' },
  daily: { en: 'Daily', es: 'Diario' },
  weekly: { en: 'Weekly', es: 'Semanal' },
  monthly: { en: 'Monthly', es: 'Mensual' },
  yearly: { en: 'Yearly', es: 'Anual' },
  next_billing: { en: 'Next Billing', es: 'Próxima Facturación' },
  active: { en: 'Active', es: 'Activo' },
  paused: { en: 'Paused', es: 'En Pausa' },
  cancelled: { en: 'Cancelled', es: 'Cancelado' },

  // Debt Plan
  manage_your_debts: { en: 'Manage your debts', es: 'Gestiona tus deudas' },
  avg_interest_rate: { en: 'Avg Interest Rate', es: 'Tasa Promedio' },
  add_debt: { en: 'Add Debt', es: 'Agregar Deuda' },
  debt_name: { en: 'Debt Name', es: 'Nombre de la Deuda' },
  due_date: { en: 'Due Date', es: 'Fecha de Vencimiento' },

  // Scanner
  upload_receipt_to_extract_data: { en: 'Upload a receipt to extract transaction data', es: 'Sube un recibo para extraer datos de transacciones' },
  drag_drop_or_click: { en: 'Drag and drop or click to upload', es: 'Arrastra y suelta o haz clic para cargar' },
  supported_formats: { en: 'Supported formats', es: 'Formatos soportados' },
  processing_receipt: { en: 'Processing receipt...', es: 'Procesando recibo...' },
  no_receipts_scanned_yet: { en: 'No receipts scanned yet', es: 'Sin recibos escaneados aún' },
  view_transaction: { en: 'View Transaction', es: 'Ver Transacción' },
  more: { en: 'more', es: 'más' },
  extracted_data: { en: 'Extracted Data', es: 'Datos Extraídos' },
  transaction_saved: { en: 'Transaction Saved', es: 'Transacción Guardada' },
  transaction_id: { en: 'Transaction ID', es: 'ID de Transacción' },
  vendor: { en: 'Vendor', es: 'Vendedor' },
  items: { en: 'Items', es: 'Artículos' },
  duplicate_receipt_detected: { en: 'Duplicate receipt detected', es: 'Recibo duplicado detectado' },
  receipt_error: { en: 'Error processing receipt', es: 'Error al procesar recibo' },

  // Goals
  goals: { en: 'Goals', es: 'Objetivos' },
  add_goal: { en: 'Add Goal', es: 'Agregar Objetivo' },
  target_amount: { en: 'Target Amount', es: 'Monto Objetivo' },
  current_amount: { en: 'Current Amount', es: 'Monto Actual' },
  deadline: { en: 'Deadline', es: 'Fecha Límite' },
  progress: { en: 'Progress', es: 'Progreso' },

  // Settings
  language: { en: 'Language', es: 'Idioma' },
  theme: { en: 'Theme', es: 'Tema' },
  notifications: { en: 'Notifications', es: 'Notificaciones' },
  privacy: { en: 'Privacy', es: 'Privacidad' },
  logout: { en: 'Logout', es: 'Cerrar Sesión' },

  // Months
  january: { en: 'January', es: 'Enero' },
  february: { en: 'February', es: 'Febrero' },
  march: { en: 'March', es: 'Marzo' },
  april: { en: 'April', es: 'Abril' },
  may: { en: 'May', es: 'Mayo' },
  june: { en: 'June', es: 'Junio' },
  july: { en: 'July', es: 'Julio' },
  august: { en: 'August', es: 'Agosto' },
  september: { en: 'September', es: 'Septiembre' },
  october: { en: 'October', es: 'Octubre' },
  november: { en: 'November', es: 'Noviembre' },
  december: { en: 'December', es: 'Diciembre' },

  // Days
  monday: { en: 'Monday', es: 'Lunes' },
  tuesday: { en: 'Tuesday', es: 'Martes' },
  wednesday: { en: 'Wednesday', es: 'Miércoles' },
  thursday: { en: 'Thursday', es: 'Jueves' },
  friday: { en: 'Friday', es: 'Viernes' },
  saturday: { en: 'Saturday', es: 'Sábado' },
  sunday: { en: 'Sunday', es: 'Domingo' },

  // LATAM-specific (New for regional markets)
  select_country: { en: 'Select Country', es: 'Selecciona País' },
  select_currency: { en: 'Select Currency', es: 'Selecciona Moneda' },
  recommended_for_you: { en: 'Recommended for you', es: 'Recomendado para ti' },
  local_subscriptions: { en: 'Popular subscriptions in your country', es: 'Suscripciones populares en tu país' },
  optimize_spending: { en: 'Optimize your spending', es: 'Optimiza tus gastos' },
  smart_recommendations: { en: 'Get AI-powered recommendations', es: 'Obtén recomendaciones impulsadas por IA' },

  // LANDING PAGE KEYS (NEW)
  features: { en: 'Features', es: 'Características' },
  pricing: { en: 'Pricing', es: 'Precios' },
  about: { en: 'About', es: 'Acerca de' },
  blog: { en: 'Blog', es: 'Blog' },
  login: { en: 'Login', es: 'Iniciar Sesión' },
  signup: { en: 'Sign Up', es: 'Registrarse' },
  hero_title: { en: 'Take Control of Your Finances with AI', es: 'Toma el Control de tus Finanzas con IA' },
  hero_subtitle: { en: 'Scan receipts, manage debt, and get personalized recommendations. All in one place with advanced technology.', es: 'Escanea recibos, gestiona deudas y recibe recomendaciones personalizadas. Todo en un solo lugar bajo tecnología avanzada.' },
  get_started_free: { en: 'Get Started Free', es: 'Empezar Gratis' },
  key_features: { en: 'Key Features', es: 'Características Principales' },
  receipt_scanner_title: { en: 'AI Receipt Scanner', es: 'Escáner de Recibos con IA' },
  receipt_scanner_desc: { en: 'Take photos of your tickets and our AI automatically classifies amount, category, and merchant.', es: 'Toma fotos a tus tickets y nuestra IA clasifica automáticamente monto, categoría y comercio.' },
  ai_recommendations_title: { en: 'Smart Recommendations', es: 'Recomendador Inteligente' },
  ai_recommendations_desc: { en: 'AI analyzes your spending and tells you exactly which card to use to maximize cashback and points.', es: 'La IA analiza tus gastos y te dice exactamente qué tarjeta usar para maximizar cashback y puntos.' },
  debt_strategy_title: { en: 'Debt Strategy', es: 'Estrategia de Deudas' },
  debt_strategy_desc: { en: 'Reduce interest payments using algorithms that automatically prioritize your debts.', es: 'Reduce el pago de intereses usando algoritmos que priorizan tus deudas automáticamente.' },
  subscription_management_title: { en: 'Subscription Management', es: 'Gestión de Suscripciones' },
  subscription_management_desc: { en: 'Track and control all your subscriptions. Save hundreds by identifying unnecessary expenses.', es: 'Detecta y controla todas tus suscripciones. Ahorra cientos de dólares identificando gastos innecesarios.' },
  detailed_reports_title: { en: 'Detailed Reports', es: 'Reportes Detallados' },
  detailed_reports_desc: { en: 'Export complete analysis in PDF or CSV. Visualize spending trends and patterns.', es: 'Exporta análisis completos en PDF o CSV. Visualiza tendencias y patrones de gasto.' },
  savings_goals_title: { en: 'Savings Goals', es: 'Metas de Ahorro' },
  savings_goals_desc: { en: 'Set financial objectives and receive personalized alerts to stay on track.', es: 'Define objetivos financieros y recibe alertas personalizadas para mantener el rumbo.' },
  pricing_title: { en: 'Simple and Transparent Plans', es: 'Planes Simples y Transparentes' },
  plan_free: { en: 'Free', es: 'Free' },
  plan_personal: { en: 'Personal', es: 'Personal' },
  plan_pro: { en: 'Pro', es: 'Pro' },
  plan_business: { en: 'Business', es: 'Business' },
  price_free: { en: '0', es: '0' },
  price_personal: { en: '9.99', es: '9.99' },
  price_pro: { en: '19.99', es: '19.99' },
  price_business: { en: '49.99', es: '49.99' },
  per_month: { en: '/month', es: '/mes' },
  plan_free_desc: { en: 'Perfect to start', es: 'Perfecto para comenzar' },
  plan_personal_desc: { en: 'For individual users', es: 'Para usuarios individuales' },
  plan_pro_desc: { en: 'Full AI power', es: 'Poder total de IA' },
  plan_business_desc: { en: 'For teams and enterprises', es: 'Para equipos y empresas' },
  features_free: { en: '✓ Basic dashboard|✓ 5 transactions/month|✓ Manual categorization', es: '✓ Dashboard básico|✓ 5 transacciones/mes|✓ Categorización manual' },
  features_personal: { en: '✓ Full dashboard|✓ Unlimited transactions|✓ AI Receipt Scanner|✓ Basic recommendations', es: '✓ Dashboard completo|✓ Transacciones ilimitadas|✓ Escáner de Recibos IA|✓ Recomendaciones básicas' },
  features_pro: { en: '✓ Everything in Personal|✓ Premium Scanner|✓ Debt Analysis|✓ PDF/CSV Reports', es: '✓ Todo de Personal|✓ Escáner Premium|✓ Análisis de Deudas|✓ Reportes PDF/CSV' },
  features_business: { en: '✓ Everything in Pro|✓ Multiple users|✓ API Access|✓ Priority support', es: '✓ Todo de Pro|✓ Múltiples usuarios|✓ Acceso API|✓ Soporte prioritario' },
  subscribe: { en: 'Subscribe', es: 'Suscribirse' },
  ready_to_start: { en: 'Ready to Take Control of Your Finances?', es: '¿Listo para Controlar tus Finanzas?' },
  cta_description: { en: 'Join thousands of users already saving money and making better financial decisions.', es: 'Únete a miles de usuarios que ya están ahorrando dinero y tomando mejores decisiones financieras.' },
  terms: { en: 'Terms', es: 'Términos' },
  all_rights_reserved: { en: 'All rights reserved', es: 'Todos los derechos reservados' },

  // REPORTS PAGE KEYS (NEW)
  financial_analysis: { en: 'Detailed analysis of your finances', es: 'Análisis detallado de tus finanzas' },
  export_csv: { en: 'Download CSV', es: 'Descargar CSV' },
  export_pdf: { en: 'Download PDF', es: 'Descargar PDF' },
  total_income: { en: 'Total Income', es: 'Ingresos Totales' },
  total_expenses: { en: 'Total Expenses', es: 'Gastos Totales' },
  top_categories: { en: 'Top Categories', es: 'Categorías Principales' },
  monthly_trend: { en: 'Monthly Trend', es: 'Tendencia Mensual' },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    const stored = localStorage.getItem('language') as Language | null
    if (stored && (stored === 'en' || stored === 'es')) {
      setLanguage(stored)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
