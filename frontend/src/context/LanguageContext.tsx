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
    'transactions.addTransaction': 'Agregar transacción',
    'transactions.transactionsFound': 'transacciones encontradas',
    'transactions.confirmDelete': '¿Estás seguro de que quieres eliminar esta transacción?',
    'transactions.loading': 'Cargando transacciones...',
    'transactions.categories.food': 'Comida',
    'transactions.categories.transport': 'Transporte',
    'transactions.categories.utilities': 'Servicios',
    'transactions.categories.entertainment': 'Entretenimiento',
    'transactions.categories.other': 'Otro',
    
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
    'debtType.other': 'Otra',
    
    'debtNames.carro': 'Auto',
    'debtNames.prestamo': 'Préstamo',
    'debtNames.casa': 'Casa',
    'debtNames.tarjeta': 'Tarjeta',
    'debtNames.otro': 'Otro',
    
    'debts.title': 'Deudas',
    'debts.addDebt': 'Agregar Deuda',
    'debts.name': 'Nombre',
    'debts.type': 'Tipo',
    'debts.balance': 'Saldo',
    'debts.interestRate': 'Tasa de Interés',
    'debts.status': 'Estado',
    'debts.status.active': 'Activa',
    'debts.status.paid': 'Pagada',
    'debts.status.inactive': 'Inactiva',
    'debts.addNew': '+ Agregar Deuda',
    'debts.creditor': 'Acreedor',
    'debts.dueDate': 'Fecha de Vencimiento',
    'debts.progress': 'Progreso',
    'debts.loading': 'Cargando deudas...',
    'debts.error': 'Error al cargar deudas',
    'debts.noDebts': 'No hay deudas registradas',
    
    'cards.title': 'Mis Tarjetas',
    'cards.subtitle': 'Gestiona todas tus tarjetas de crédito y débito',
    'cards.addCard': 'Agregar tarjeta',
    'cards.editCard': 'Editar tarjeta',
    'cards.tabAll': 'Todas',
    'cards.tabCredit': 'Crédito',
    'cards.tabDebit': 'Débito',
    'cards.card': 'tarjeta',
    'cards.cardName': 'Nombre de tarjeta',
    'cards.bank': 'Banco',
    'cards.limit': 'Límite',
    'cards.balance': 'Saldo',
    'cards.apr': 'APR',
    'cards.color': 'Color',
    'cards.loading': 'Cargando tarjetas...',
    'cards.error': 'Error al cargar tarjetas',
    'cards.noCards': 'Sin tarjetas',
    'cards.confirmDelete': '¿Estás seguro de que quieres eliminar esta tarjeta?',
    
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.add': 'Agregar',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.settings': 'Configuración',
    'common.saving': 'Guardando...',
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
    'transactions.addTransaction': 'Add transaction',
    'transactions.transactionsFound': 'transactions found',
    'transactions.confirmDelete': 'Are you sure you want to delete this transaction?',
    'transactions.loading': 'Loading transactions...',
    'transactions.categories.food': 'Food',
    'transactions.categories.transport': 'Transport',
    'transactions.categories.utilities': 'Utilities',
    'transactions.categories.entertainment': 'Entertainment',
    'transactions.categories.other': 'Other',
    
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
    'debtType.other': 'Other',
    
    'debtNames.carro': 'Auto',
    'debtNames.prestamo': 'Loan',
    'debtNames.casa': 'Home',
    'debtNames.tarjeta': 'Card',
    'debtNames.otro': 'Other',
    
    'debts.title': 'Debts',
    'debts.addDebt': 'Add Debt',
    'debts.name': 'Name',
    'debts.type': 'Type',
    'debts.balance': 'Balance',
    'debts.interestRate': 'Interest Rate',
    'debts.status': 'Status',
    'debts.status.active': 'Active',
    'debts.status.paid': 'Paid',
    'debts.status.inactive': 'Inactive',
    'debts.addNew': '+ Add Debt',
    'debts.creditor': 'Creditor',
    'debts.dueDate': 'Due Date',
    'debts.progress': 'Progress',
    'debts.loading': 'Loading debts...',
    'debts.error': 'Error loading debts',
    'debts.noDebts': 'No debts registered',
    
    'cards.title': 'My Cards',
    'cards.subtitle': 'Manage all your credit and debit cards',
    'cards.addCard': 'Add Card',
    'cards.editCard': 'Edit Card',
    'cards.tabAll': 'All',
    'cards.tabCredit': 'Credit',
    'cards.tabDebit': 'Debit',
    'cards.card': 'card',
    'cards.cardName': 'Card Name',
    'cards.bank': 'Bank',
    'cards.limit': 'Limit',
    'cards.balance': 'Balance',
    'cards.apr': 'APR',
    'cards.color': 'Color',
    'cards.loading': 'Loading cards...',
    'cards.error': 'Error loading cards',
    'cards.noCards': 'No cards',
    'cards.confirmDelete': 'Are you sure you want to delete this card?',
    
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.settings': 'Settings',
    'common.saving': 'Saving...',
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
