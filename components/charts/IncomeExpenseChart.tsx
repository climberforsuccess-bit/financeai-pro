'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Ene', income: 4200, expenses: 2100 },
  { month: 'Feb', income: 4200, expenses: 2350 },
  { month: 'Mar', income: 4200, expenses: 1950 },
  { month: 'Abr', income: 4200, expenses: 2800 },
  { month: 'May', income: 4200, expenses: 2200 },
  { month: 'Jun', income: 4200, expenses: 2500 },
  { month: 'Jul', income: 4200, expenses: 2100 },
  { month: 'Ago', income: 4200, expenses: 2800 },
];

export function IncomeExpenseChart() {
  return (
    <div style={{
      background: '#1e293b',
      borderRadius: '12px',
      border: '1px solid #334155',
      padding: '20px',
      marginBottom: '40px',
    }}>
      <h2 style={{ color: '#0ea5e9', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
        Ingresos vs Gastos
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
          <Bar dataKey="income" fill="#10b981" name="Ingresos" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expenses" fill="#ef4444" name="Gastos" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
