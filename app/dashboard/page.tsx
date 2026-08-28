'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { IncomeExpenseChart } from '@/components/charts/IncomeExpenseChart';

export default function DashboardPage() {
  const { t } = useLanguage();

  const stats = {
    balance: '$12,450.50',
    monthlyIncome: '$4,200.00',
    monthlyExpenses: '$2,800.00',
    totalDebt: '$8,500.00',
    savings: '$3,150.50',
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: '#0ea5e9', marginBottom: '8px' }}>
          {t('dashboard')}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
      }}>
        <Card 
          title={t('totalBalance')}
          value={stats.balance}
          icon="💰"
          textColor="#10b981"
          bgColor="rgba(16, 185, 129, 0.1)"
        />
        <Card 
          title={t('monthlyIncome')}
          value={stats.monthlyIncome}
          icon="📈"
          textColor="#3b82f6"
          bgColor="rgba(59, 130, 246, 0.1)"
        />
        <Card 
          title={t('monthlyExpenses')}
          value={stats.monthlyExpenses}
          icon="📉"
          textColor="#f59e0b"
          bgColor="rgba(245, 158, 11, 0.1)"
        />
        <Card 
          title={t('totalDebt')}
          value={stats.totalDebt}
          icon="💳"
          textColor="#ef4444"
          bgColor="rgba(239, 68, 68, 0.1)"
        />
        <Card 
          title={t('savings')}
          value={stats.savings}
          icon="🏦"
          textColor="#8b5cf6"
          bgColor="rgba(139, 92, 246, 0.1)"
        />
      </div>

      {/* Chart */}
      <IncomeExpenseChart />

      {/* Section: Recent Transactions */}
      <div style={{ background: '#1e293b', borderRadius: '12px', padding: '20px', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#0ea5e9', fontSize: '18px', fontWeight: 'bold' }}>
            {t('recentTransactions')}
          </h2>
          <a href="/transactions" style={{ color: '#0ea5e9', fontSize: '14px', textDecoration: 'none' }}>
            {t('viewAll')} →
          </a>
        </div>
        <div style={{ color: '#94a3b8', textAlign: 'center', padding: '40px 20px' }}>
          {t('noTransactions')}
        </div>
      </div>
    </div>
  );
}
