'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const translations: Record<Language, Record<string, string>> = {
  es: {
    dashboard: 'Dashboard',
    transactions: 'Transacciones',
    myCards: 'Mis Tarjetas',
    debtPlan: 'Salir de Deudas',
    subscriptions: 'Suscripciones',
    recommendations: 'Recomendaciones',
    aiAssistant: 'Asistente IA',
    reports: 'Reportes',
    settings: 'Configuración',
    scannerReceipt: 'Escanear Recibo',
    totalBalance: 'Balance Total',
    monthlyIncome: 'Ingresos Mensuales',
    monthlyExpenses: 'Gastos Mensuales',
    totalDebt: 'Deuda Total',
    savings: 'Ahorros',
    recentTransactions: 'Transacciones Recientes',
    addCard: 'Agregar Tarjeta',
    viewAll: 'Ver Todo',
    noTransactions: 'Sin transacciones',
    date: 'Fecha',
    merchant: 'Comercio',
    category: 'Categoría',
    amount: 'Monto',
    card: 'Tarjeta',
    exportPDF: 'Exportar PDF',
    exportCSV: 'Exportar CSV',
    search: 'Buscar',
    filter: 'Filtrar',
    month: 'Mes',
    year: 'Año',
    cardName: 'Nombre de Tarjeta',
    bank: 'Banco',
    type: 'Tipo',
    balance: 'Balance',
    limit: 'Límite',
    paymentDueDate: 'Fecha de Pago',
    debit: 'Débito',
    credit: 'Crédito',
    personal: 'Personal',
    business: 'Negocio',
    apr: 'APR',
    noCards: 'Sin tarjetas',
    totalDebtAmount: 'Deuda Total',
    debtStrategy: 'Estrategia de Pago',
    estimatedPayoffTime: 'Tiempo Estimado de Pago',
    monthlyPayment: 'Pago Mensual',
    interestRate: 'Tasa de Interés',
    debtType: 'Tipo de Deuda',
    mortgage: 'Hipoteca',
    autoLoan: 'Préstamo de Auto',
    creditCard: 'Tarjeta de Crédito',
    personalLoan: 'Préstamo Personal',
    other: 'Otro',
    avalanche: 'Avalanche',
    snowball: 'Snowball',
    consolidation: 'Consolidación',
    hybrid: 'Híbrido',
    addDebt: 'Agregar Deuda',
    thisMonth: 'Este Mes',
    saved: 'Ahorrado',
    variation: 'Variación',
    food: 'Alimentos',
    transport: 'Transporte',
    income: 'Ingresos',
    entertainment: 'Entretenimiento',
    health: 'Salud',
    salaryPayment: 'Pago de Salario',
    wholeFoodsMarket: 'Whole Foods Market',
    uber: 'Uber',
    netflix: 'Netflix',
    pharmacyCVS: 'Farmacia CVS',
    incomeVsExpenses: 'Ingresos vs Gastos',
    january: 'Ene',
    february: 'Feb',
    march: 'Mar',
    april: 'Abr',
    may: 'May',
    expenses: 'Gastos',
    activeDebt: 'Deuda Activa',
    cards: 'Tarjetas',
    averageInterest: 'Interés Promedio',
    debtObjective: 'Objetivo de Deuda',
    method: 'Método',
    timeline: 'Tiempo',
    months: 'meses',
  },
  en: {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    myCards: 'My Cards',
    debtPlan: 'Debt Plan',
    subscriptions: 'Subscriptions',
    recommendations: 'Recommendations',
    aiAssistant: 'AI Assistant',
    reports: 'Reports',
    settings: 'Settings',
    scannerReceipt: 'Scan Receipt',
    totalBalance: 'Total Balance',
    monthlyIncome: 'Monthly Income',
    monthlyExpenses: 'Monthly Expenses',
    totalDebt: 'Total Debt',
    savings: 'Savings',
    recentTransactions: 'Recent Transactions',
    addCard: 'Add Card',
    viewAll: 'View All',
    noTransactions: 'No transactions',
    date: 'Date',
    merchant: 'Merchant',
    category: 'Category',
    amount: 'Amount',
    card: 'Card',
    exportPDF: 'Export PDF',
    exportCSV: 'Export CSV',
    search: 'Search',
    filter: 'Filter',
    month: 'Month',
    year: 'Year',
    cardName: 'Card Name',
    bank: 'Bank',
    type: 'Type',
    balance: 'Balance',
    limit: 'Limit',
    paymentDueDate: 'Payment Due Date',
    debit: 'Debit',
    credit: 'Credit',
    personal: 'Personal',
    business: 'Business',
    apr: 'APR',
    noCards: 'No cards',
    totalDebtAmount: 'Total Debt',
    debtStrategy: 'Payment Strategy',
    estimatedPayoffTime: 'Estimated Payoff Time',
    monthlyPayment: 'Monthly Payment',
    interestRate: 'Interest Rate',
    debtType: 'Debt Type',
    mortgage: 'Mortgage',
    autoLoan: 'Auto Loan',
    creditCard: 'Credit Card',
    personalLoan: 'Personal Loan',
    other: 'Other',
    avalanche: 'Avalanche',
    snowball: 'Snowball',
    consolidation: 'Consolidation',
    hybrid: 'Hybrid',
    addDebt: 'Add Debt',
    thisMonth: 'This Month',
    saved: 'Saved',
    variation: 'Variation',
    food: 'Food',
    transport: 'Transport',
    income: 'Income',
    entertainment: 'Entertainment',
    health: 'Health',
    salaryPayment: 'Salary Payment',
    wholeFoodsMarket: 'Whole Foods Market',
    uber: 'Uber',
    netflix: 'Netflix',
    pharmacyCVS: 'Pharmacy CVS',
    incomeVsExpenses: 'Income vs Expenses',
    january: 'Jan',
    february: 'Feb',
    march: 'Mar',
    april: 'Apr',
    may: 'May',
    expenses: 'Expenses',
    activeDebt: 'Active Debt',
    cards: 'Cards',
    averageInterest: 'Average Interest',
    debtObjective: 'Debt Objective',
    method: 'Method',
    timeline: 'Timeline',
    months: 'months',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('financeai-lang') as Language | null;
      if (saved && ['es', 'en'].includes(saved)) {
        setLanguageState(saved);
      }
    } catch {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('financeai-lang', lang);
    } catch {}
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  if (!mounted) return <>{children}</>;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    return {
      language: 'es',
      setLanguage: () => {},
      t: (key: string) => key,
    };
  }
  
  return context;
};
