import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  es: {
    'dashboard.title': 'Dashboard',
    'dashboard.totalDebt': 'Deuda Total',
    'dashboard.debts': 'deudas',
    'dashboard.activeSubscriptions': 'Suscripciones Activas',
    'dashboard.subscriptions': 'suscripciones',
    'dashboard.savings': 'Ahorros',
    'dashboard.totalIncome': 'Total ingreso',
    'dashboard.debtsSection': 'Deudas',
    'dashboard.recentTransactions': 'Transacciones Recientes',
    'dashboard.noDebts': 'No hay deudas registradas',
    'dashboard.noTransactions': 'No hay transacciones',
    'dashboard.name': 'Nombre',
    'dashboard.type': 'Tipo',
    'dashboard.balance': 'Balance',
    'dashboard.description': 'Descripción',
    'dashboard.amount': 'Monto',
    'dashboard.date': 'Fecha',
    'dashboard.loading': 'Cargando...',
    'dashboard.error': 'Error',
    'dashboard.noData': 'No hay datos',
    
    'transactions.title': 'Transacciones',
    'transactions.addNew': '+ Nueva Transacción',
    'transactions.description': 'Descripción',
    'transactions.amount': 'Monto',
    'transactions.category': 'Categoría',
    'transactions.date': 'Fecha',
    'transactions.paymentMethod': 'Método de Pago',
    'transactions.notes': 'Notas',
    'transactions.merchant': 'Comerciante',
    'transactions.type': 'Tipo',
    'transactions.income': 'Ingreso',
    'transactions.expense': 'Gasto',
    'transactions.all': 'Todos',
    'transactions.allCategories': 'Todas las categorías',
    'transactions.search': 'Buscar...',
    'transactions.actions': 'Acciones',
    'transactions.noTransactions': 'No hay transacciones',
    'transactions.editTitle': 'Editar Transacción',
    'transactions.newTitle': 'Nueva Transacción',
    'transactions.update': 'Actualizar',
    'transactions.incomeTotal': 'Ingresos',
    'transactions.expenseTotal': 'Gastos',
    
    'paymentMethod.creditCard': 'Tarjeta de Crédito',
    'paymentMethod.debitCard': 'Tarjeta de Débito',
    'paymentMethod.cash': 'Efectivo',
    'paymentMethod.transfer': 'Transferencia',
    'paymentMethod.check': 'Cheque',
    'paymentMethod.other': 'Otro',
    
    'category.food': 'Comida',
    'category.transport': 'Transporte',
    'category.utilities': 'Servicios',
    'category.entertainment': 'Entretenimiento',
    'category.health': 'Salud',
    'category.shopping': 'Compras',
    'category.education': 'Educación',
    'category.subscriptions': 'Suscripciones',
    'category.salary': 'Salario',
    'category.other': 'Otro',
    
    'debtType.credit_card': 'Tarjeta de Crédito',
    'debtType.personal_loan': 'Préstamo Personal',
    'debtType.student_loan': 'Préstamo de Estudiante',
    'debtType.mortgage': 'Hipoteca',
    'debtType.auto_loan': 'Préstamo de Auto',
    'debtType.medical': 'Deuda Médica',
    
    'debts.title': 'Deudas',
    'debts.addNew': '+ Agregar Deuda',
    'debts.creditor': 'Acreedor',
    'debts.balance': 'Saldo',
    'debts.interestRate': 'Tasa de Interés',
    'debts.dueDate': 'Fecha de Vencimiento',
    'debts.progress': 'Progreso',
    
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.add': 'Agregar',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.settings': 'Configuración',
  },
  en: {
    'dashboard.title': 'Dashboard',
    'dashboard.totalDebt': 'Total Debt',
    'dashboard.debts': 'debts',
    'dashboard.activeSubscriptions': 'Active Subscriptions',
    'dashboard.subscriptions': 'subscriptions',
    'dashboard.savings': 'Savings',
    'dashboard.totalIncome': 'Total income',
    'dashboard.debtsSection': 'Debts',
    'dashboard.recentTransactions': 'Recent Transactions',
    'dashboard.noDebts': 'No debts registered',
    'dashboard.noTransactions': 'No transactions',
    'dashboard.name': 'Name',
    'dashboard.type': 'Type',
    'dashboard.balance': 'Balance',
    'dashboard.description': 'Description',
    'dashboard.amount': 'Amount',
    'dashboard.date': 'Date',
    'dashboard.loading': 'Loading...',
    'dashboard.error': 'Error',
    'dashboard.noData': 'No data',
    
    'transactions.title': 'Transactions',
    'transactions.addNew': '+ New Transaction',
    'transactions.description': 'Description',
    'transactions.amount': 'Amount',
    'transactions.category': 'Category',
    'transactions.date': 'Date',
    'transactions.paymentMethod': 'Payment Method',
    'transactions.notes': 'Notes',
    'transactions.merchant': 'Merchant',
    'transactions.type': 'Type',
    'transactions.income': 'Income',
    'transactions.expense': 'Expense',
    'transactions.all': 'All',
    'transactions.allCategories': 'All categories',
    'transactions.search': 'Search...',
    'transactions.actions': 'Actions',
    'transactions.noTransactions': 'No transactions',
    'transactions.editTitle': 'Edit Transaction',
    'transactions.newTitle': 'New Transaction',
    'transactions.update': 'Update',
    'transactions.incomeTotal': 'Income',
    'transactions.expenseTotal': 'Expenses',
    
    'paymentMethod.creditCard': 'Credit Card',
    'paymentMethod.debitCard': 'Debit Card',
    'paymentMethod.cash': 'Cash',
    'paymentMethod.transfer': 'Transfer',
    'paymentMethod.check': 'Check',
    'paymentMethod.other': 'Other',
    
    'category.food': 'Food',
    'category.transport': 'Transport',
    'category.utilities': 'Utilities',
    'category.entertainment': 'Entertainment',
    'category.health': 'Health',
    'category.shopping': 'Shopping',
    'category.education': 'Education',
    'category.subscriptions': 'Subscriptions',
    'category.salary': 'Salary',
    'category.other': 'Other',
    
    'debtType.credit_card': 'Credit Card',
    'debtType.personal_loan': 'Personal Loan',
    'debtType.student_loan': 'Student Loan',
    'debtType.mortgage': 'Mortgage',
    'debtType.auto_loan': 'Auto Loan',
    'debtType.medical': 'Medical Debt',
    
    'debts.title': 'Debts',
    'debts.addNew': '+ Add Debt',
    'debts.creditor': 'Creditor',
    'debts.balance': 'Balance',
    'debts.interestRate': 'Interest Rate',
    'debts.dueDate': 'Due Date',
    'debts.progress': 'Progress',
    
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.settings': 'Settings',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved) setLanguage(saved)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key
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
