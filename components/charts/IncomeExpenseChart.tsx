'use client';

import { useLanguage } from '@/context/LanguageContext';
import dynamic from 'next/dynamic';
import { useMemo, useState, useEffect } from 'react';

const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  date: string
}

interface IncomeExpenseChartProps {
  transactions: Transaction[]
}

export function IncomeExpenseChart({ transactions = [] }: IncomeExpenseChartProps) {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = useMemo(() => {
    const monthLabels = {
      es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };

    const lang = language || 'es';
    const monthData: Record<number, { income: number; expenses: number }> = {};

    // Inicializar últimos 8 meses
    for (let i = 7; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.getMonth();
      monthData[month] = { income: 0, expenses: 0 };
    }

    // Agregar transacciones reales
    transactions.forEach(tx => {
      const txDate = new Date(tx.date);
      const month = txDate.getMonth();
      if (monthData[month]) {
        if (tx.type === 'income') {
          monthData[month].income += tx.amount;
        } else {
          monthData[month].expenses += tx.amount;
        }
      }
    });

    // Convertir a array para gráfico
    return Object.entries(monthData).map(([month, data]) => ({
      month: monthLabels[lang][parseInt(month)],
      income: data.income,
      expenses: data.expenses,
    }));
  }, [transactions, language]);

  if (!mounted) return (
    <div style={{
      background: '#1e293b',
      borderRadius: '12px',
      border: '1px solid #334155',
      padding: '20px',
      height: '340px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#94a3b8',
    }}>
      Cargando gráfico...
    </div>
  );

  return (
    <div style={{
      background: '#1e293b',
      borderRadius: '12px',
      border: '1px solid #334155',
      padding: '20px',
      marginBottom: '40px',
    }}>
      <h2 style={{ color: '#0ea5e9', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
        {t('monthly_income')} vs {t('monthly_expenses')}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#e2e8f0',
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="income" fill="#10b981" name={t('income')} radius={[8, 8, 0, 0]} />
          <Bar dataKey="expenses" fill="#ef4444" name={t('expenses')} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
