'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';

interface Debt {
  id: string;
  name: string;
  type: 'mortgage' | 'autoLoan' | 'creditCard' | 'personalLoan' | 'other';
  balance: number;
  interestRate: number;
  minimumPayment: number;
  icon: string;
}

const mockDebts: Debt[] = [
  {
    id: '1',
    name: 'Chase Visa Card',
    type: 'creditCard',
    balance: 3450.00,
    interestRate: 18.5,
    minimumPayment: 100,
    icon: '💳',
  },
  {
    id: '2',
    name: 'Car Loan',
    type: 'autoLoan',
    balance: 15000.00,
    interestRate: 4.2,
    minimumPayment: 350,
    icon: '🚗',
  },
  {
    id: '3',
    name: 'Home Mortgage',
    type: 'mortgage',
    balance: 250000.00,
    interestRate: 3.5,
    minimumPayment: 1500,
    icon: '🏠',
  },
  {
    id: '4',
    name: 'Personal Loan',
    type: 'personalLoan',
    balance: 5000.00,
    interestRate: 8.5,
    minimumPayment: 150,
    icon: '📊',
  },
];

export default function DebtPlanPage() {
  const { t } = useLanguage();
  const [selectedStrategy, setSelectedStrategy] = useState<'avalanche' | 'snowball' | 'consolidation' | 'hybrid'>('avalanche');

  const totalDebt = mockDebts.reduce((sum, d) => sum + d.balance, 0);
  const totalMonthlyPayment = mockDebts.reduce((sum, d) => sum + d.minimumPayment, 0);
  const highestRate = Math.max(...mockDebts.map(d => d.interestRate));

  const strategies = [
    { id: 'avalanche', label: t('avalanche'), description: 'Pagar deudas con mayor tasa de interés primero' },
    { id: 'snowball', label: t('snowball'), description: 'Pagar deudas con menor balance primero' },
    { id: 'consolidation', label: t('consolidation'), description: 'Consolidar todas las deudas en una' },
    { id: 'hybrid', label: t('hybrid'), description: 'Combinación de estrategias' },
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1400px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '32px', color: '#0ea5e9' }}>
            {t('debtPlan')}
          </h1>
          <button style={{
            padding: '10px 20px',
            background: '#0ea5e9',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>
            + {t('addDebt')}
          </button>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          {mockDebts.length} deudas activas
        </p>
      </div>

      {/* Overview Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
      }}>
        <Card 
          title={t('totalDebtAmount')}
          value={`$${totalDebt.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
          icon="💰"
          textColor="#ef4444"
          bgColor="rgba(239, 68, 68, 0.1)"
        />
        <Card 
          title={t('monthlyPayment')}
          value={`$${totalMonthlyPayment.toFixed(2)}`}
          icon="📈"
          textColor="#f59e0b"
          bgColor="rgba(245, 158, 11, 0.1)"
        />
        <Card 
          title="Highest Interest Rate"
          value={`${highestRate}%`}
          icon="📊"
          textColor="#ef4444"
          bgColor="rgba(239, 68, 68, 0.1)"
        />
        <Card 
          title={t('estimatedPayoffTime')}
          value="4.5 años"
          icon="⏱️"
          textColor="#3b82f6"
          bgColor="rgba(59, 130, 246, 0.1)"
        />
      </div>

      {/* Strategy Selection */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#0ea5e9', fontSize: '20px', marginBottom: '16px', fontWeight: 'bold' }}>
          {t('debtStrategy')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {strategies.map((strategy) => (
            <button
              key={strategy.id}
              onClick={() => setSelectedStrategy(strategy.id as any)}
              style={{
                padding: '16px',
                background: selectedStrategy === strategy.id ? '#0ea5e9' : '#1e293b',
                border: selectedStrategy === strategy.id ? 'none' : '1px solid #334155',
                borderRadius: '8px',
                color: selectedStrategy === strategy.id ? '#fff' : '#94a3b8',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (selectedStrategy !== strategy.id) {
                  e.currentTarget.style.background = '#334155';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedStrategy !== strategy.id) {
                  e.currentTarget.style.background = '#1e293b';
                }
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {strategy.label}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                {strategy.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Debts List */}
      <div style={{
        background: '#1e293b',
        borderRadius: '12px',
        border: '1px solid #334155',
        overflow: 'hidden',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
        }}>
          <thead>
            <tr style={{ background: '#0f172a', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '600' }}>
                {t('debtType')}
              </th>
              <th style={{ padding: '16px', textAlign: 'right', color: '#94a3b8', fontWeight: '600' }}>
                {t('balance')}
              </th>
              <th style={{ padding: '16px', textAlign: 'right', color: '#94a3b8', fontWeight: '600' }}>
                {t('interestRate')}
              </th>
              <th style={{ padding: '16px', textAlign: 'right', color: '#94a3b8', fontWeight: '600' }}>
                {t('monthlyPayment')}
              </th>
              <th style={{ padding: '16px', textAlign: 'center', color: '#94a3b8', fontWeight: '600' }}>
                Payoff Time
              </th>
            </tr>
          </thead>
          <tbody>
            {mockDebts.map((debt) => (
              <tr key={debt.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '16px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{debt.icon}</span> {debt.name}
                </td>
                <td style={{ padding: '16px', color: '#ef4444', textAlign: 'right', fontWeight: 'bold' }}>
                  ${debt.balance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </td>
                <td style={{ padding: '16px', color: '#f59e0b', textAlign: 'right' }}>
                  {debt.interestRate}%
                </td>
                <td style={{ padding: '16px', color: '#3b82f6', textAlign: 'right' }}>
                  ${debt.minimumPayment.toFixed(2)}
                </td>
                <td style={{ padding: '16px', color: '#64748b', textAlign: 'center' }}>
                  {Math.ceil(debt.balance / debt.minimumPayment / 12)} años
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
