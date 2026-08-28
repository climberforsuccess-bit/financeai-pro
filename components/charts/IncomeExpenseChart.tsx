'use client';

import { useLanguage } from '@/context/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function IncomeExpenseChart() {
  const { t, language } = useLanguage();

  // Meses traducidos
  const monthLabels = {
    es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  };

  const data = [
    { month: monthLabels[language][0], income: 4200, expenses: 2100 },
    { month: monthLabels[language][1], income: 4200, expenses: 2350 },
    { month: monthLabels[language][2], income: 4200, expenses: 1950 },
    { month: monthLabels[language][3], income: 4200, expenses: 2800 },
    { month: monthLabels[language][4], income: 4200, expenses: 2200 },
    { month: monthLabels[language][5], income: 4200, expenses: 2500 },
    { month: monthLabels[language][6], income: 4200, expenses: 2100 },
    { month: monthLabels[language][7], income: 4200, expenses: 2800 },
  ];

  return (
    <div style={{
      background: '#1e293b',
      borderRadius: '12px',
      border: '1px solid #334155',
      padding: '20px',
      marginBottom: '40px',
    }}>
      <h2 style={{ color: '#0ea5e9', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
        {t('incomeVsExpenses')}
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
