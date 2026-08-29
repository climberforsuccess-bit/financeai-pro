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

  // Dashboard
  welcome: { en: 'Welcome', es: 'Bienvenido' },
  total_balance: { en: 'Total Balance', es: 'Balance Total' },
  monthly_spending: { en: 'Monthly Spending', es: 'Gastos Mensuales' },
  upcoming_bills: { en: 'Upcoming Bills', es: 'Próximas Facturas' },
  financial_overview: { en: 'Financial Overview', es: 'Descripción Financiera' },
  manage_your_finances: { en: 'Manage your finances', es: 'Gestiona tus finanzas' },

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
  debt_plan: { en: 'Debt Plan', es: 'Plan de Deudas' },
  manage_your_debts: { en: 'Manage your debts', es: 'Gestiona tus deudas' },
  total_debt: { en: 'Total Debt', es: 'Deuda Total' },
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
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('language') as Language | null
    if (stored && (stored === 'en' || stored === 'es')) {
      setLanguage(stored)
    }
    setMounted(true)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  if (!mounted) return <>{children}</>

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
