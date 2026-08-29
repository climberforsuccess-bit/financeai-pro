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

interface StrategyInfo {
  id: string;
  label: string;
  description: string;
  advantage: string;
  disadvantage: string;
  timeToPayoff: string;
  totalInterest: string;
  icon: string;
}

const strategies: StrategyInfo[] = [
  {
    id: 'avalanche',
    label: 'Avalanche',
    description: 'Pagar deudas con mayor tasa de interés primero',
    advantage: 'Menor interés total pagado',
    disadvantage: 'Menos motivación inicial',
    timeToPayoff: '4.2 años',
    totalInterest: '$12,450',
    icon: '⛏️',
  },
  {
    id: 'snowball',
    label: 'Snowball',
    description: 'Pagar deudas con menor balance primero',
    advantage: 'Motivación rápida con victorias pequeñas',
    disadvantage: 'Más interés total',
    timeToPayoff: '4.8 años',
    totalInterest: '$14,200',
    icon: '⛄',
  },
  {
    id: 'consolidation',
    label: 'Consolidation',
    description: 'Consolidar todas las deudas en una',
    advantage: 'Un único pago mensual',
    disadvantage: 'Puede aumentar interés',
    timeToPayoff: '5.1 años',
    totalInterest: '$15,800',
    icon: '🔗',
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    description: 'Combinación óptima de estrategias',
    advantage: 'Balance entre velocidad y motivación',
    disadvantage: 'Requiere más disciplina',
    timeToPayoff: '4.5 años',
    totalInterest: '$13,100',
    icon: '⚡',
  },
];

export default function DebtPlanPage() {
  const { t } = useLanguage();
  const [selectedStrategy, setSelectedStrategy] = useState<'avalanche' | 'snowball' | 'consolidation' | 'hybrid'>('avalanche');

  const totalDebt = mockDebts.reduce((sum, d) => sum + d.balance, 0);
  const totalMonthlyPayment = mockDebts.reduce((sum, d) => sum + d.minimumPayment, 0);
  const highestRate = Math.max(...mockDebts.map((d) => d.interestRate));

  const currentStrategy = strategies.find((s) => s.id === selectedStrategy)!;

  // Sort debts based on strategy
  const sortedDebts = [...mockDebts].sort((a, b) => {
    if (selectedStrategy === 'avalanche') {
      return b.interestRate - a.interestRate;
    } else if (selectedStrategy === 'snowball') {
      return a.balance - b.balance;
    }
    return 0;
  });

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.headerSection}>
        <div style={styles.headerTop}>
          <div>
            <h1 style={styles.title}>{t('debtPlan')}</h1>
            <p style={styles.subtitle}>
              {mockDebts.length} {t('activeDebts')}
            </p>
          </div>
          <button style={styles.addDebtButton}>
            + {t('addDebt')}
          </button>
        </div>
      </div>

      {/* OVERVIEW STATS */}
      <div style={styles.statsGrid}>
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
          title={t('highestInterestRate')}
          value={`${highestRate}%`}
          icon="📊"
          textColor="#ef4444"
          bgColor="rgba(239, 68, 68, 0.1)"
        />
        <Card
          title={t('estimatedPayoffTime')}
          value={currentStrategy.timeToPayoff}
          icon="⏱️"
          textColor="#3b82f6"
          bgColor="rgba(59, 130, 246, 0.1)"
        />
      </div>

      {/* STRATEGY SELECTION */}
      <div style={styles.strategySection}>
        <h2 style={styles.sectionTitle}>{t('chooseStrategy')}</h2>
        <div style={styles.strategyGrid}>
          {strategies.map((strategy) => (
            <button
              key={strategy.id}
              onClick={() => setSelectedStrategy(strategy.id as any)}
              style={{
                ...styles.strategyButton,
                ...(selectedStrategy === strategy.id && styles.strategyButtonActive),
              }}
            >
              <div style={styles.strategyIcon}>{strategy.icon}</div>
              <div style={styles.strategyLabel}>{strategy.label}</div>
              <div style={styles.strategyDesc}>{strategy.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* STRATEGY DETAILS */}
      <div style={styles.strategyDetailsSection}>
        <h2 style={styles.sectionTitle}>{t('strategyDetails')} {currentStrategy.label}</h2>
        <div style={styles.strategyDetailsGrid}>
          <StrategyDetailCard
            icon="✨"
            title={t('advantage')}
            content={currentStrategy.advantage}
            color="#10b981"
          />
          <StrategyDetailCard
            icon="⚠️"
            title={t('disadvantage')}
            content={currentStrategy.disadvantage}
            color="#f59e0b"
          />
          <StrategyDetailCard
            icon="⏱️"
            title={t('timeToPayoff')}
            content={currentStrategy.timeToPayoff}
            color="#06b6d4"
          />
          <StrategyDetailCard
            icon="💸"
            title={t('totalEstimatedInterest')}
            content={currentStrategy.totalInterest}
            color="#ef4444"
          />
        </div>
      </div>

      {/* DEBTS TABLE - SORTED BY STRATEGY */}
      <div style={styles.debtsTableSection}>
        <h2 style={styles.sectionTitle}>
          {t('paymentOrder')} ({currentStrategy.label})
        </h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={{ ...styles.headerCell, textAlign: 'left' }}>{t('order')}</th>
                <th style={{ ...styles.headerCell, textAlign: 'left' }}>{t('debt')}</th>
                <th style={{ ...styles.headerCell, textAlign: 'right' }}>{t('balance')}</th>
                <th style={{ ...styles.headerCell, textAlign: 'right' }}>{t('rate')}</th>
                <th style={{ ...styles.headerCell, textAlign: 'right' }}>{t('monthlyPaymentHeader')}</th>
                <th style={{ ...styles.headerCell, textAlign: 'center' }}>{t('timeHeader')}</th>
              </tr>
            </thead>
            <tbody>
              {sortedDebts.map((debt, index) => (
                <tr key={debt.id} style={styles.tableRow}>
                  <td style={{ ...styles.cell, color: '#06b6d4', fontWeight: '700' }}>
                    #{index + 1}
                  </td>
                  <td style={styles.cell}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{debt.icon}</span>
                      <span style={{ fontWeight: '600' }}>{debt.name}</span>
                    </div>
                  </td>
                  <td
                    style={{
                      ...styles.cell,
                      textAlign: 'right',
                      color: '#ef4444',
                      fontWeight: '700',
                    }}
                  >
                    ${debt.balance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </td>
                  <td style={{ ...styles.cell, textAlign: 'right', color: '#f59e0b' }}>
                    {debt.interestRate}%
                  </td>
                  <td style={{ ...styles.cell, textAlign: 'right', color: '#3b82f6' }}>
                    ${debt.minimumPayment.toFixed(2)}
                  </td>
                  <td
                    style={{
                      ...styles.cell,
                      textAlign: 'center',
                      color: '#94a3b8',
                      fontSize: '13px',
                    }}
                  >
                    ~{Math.ceil(debt.balance / debt.minimumPayment / 12)} {t('years')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StrategyDetailCard({
  icon,
  title,
  content,
  color,
}: {
  icon: string;
  title: string;
  content: string;
  color: string;
}) {
  return (
    <div style={{ ...styles.detailCard, borderTopColor: color }}>
      <div style={styles.detailIcon}>{icon}</div>
      <div style={styles.detailTitle}>{title}</div>
      <div style={styles.detailContent}>{content}</div>
    </div>
  );
}

const styles = {
  container: {
    padding: '32px',
    maxWidth: '1600px',
    margin: '0 auto',
  } as React.CSSProperties,

  headerSection: {
    marginBottom: '40px',
  } as React.CSSProperties,

  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  } as React.CSSProperties,

  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: '4px',
    letterSpacing: '-0.5px',
  } as React.CSSProperties,

  subtitle: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: '500',
  } as React.CSSProperties,

  addDebtButton: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '40px',
  } as React.CSSProperties,

  strategySection: {
    marginBottom: '40px',
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: '20px',
    letterSpacing: '-0.3px',
  } as React.CSSProperties,

  strategyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  } as React.CSSProperties,

  strategyButton: {
    padding: '20px',
    background: '#1e293b',
    border: '2px solid #334155',
    borderRadius: '10px',
    color: '#94a3b8',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,

  strategyButtonActive: {
    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
    borderColor: '#06b6d4',
    color: '#06b6d4',
  } as React.CSSProperties,

  strategyIcon: {
    fontSize: '28px',
    marginBottom: '8px',
  } as React.CSSProperties,

  strategyLabel: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: '4px',
  } as React.CSSProperties,

  strategyDesc: {
    fontSize: '12px',
    color: '#94a3b8',
    lineHeight: '1.4',
  } as React.CSSProperties,

  strategyDetailsSection: {
    marginBottom: '40px',
  } as React.CSSProperties,

  strategyDetailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  } as React.CSSProperties,

  detailCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderTop: '3px solid',
    borderRadius: '10px',
    padding: '16px',
  } as React.CSSProperties,

  detailIcon: {
    fontSize: '24px',
    marginBottom: '8px',
  } as React.CSSProperties,

  detailTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
  } as React.CSSProperties,

  detailContent: {
    fontSize: '14px',
    color: '#e2e8f0',
    fontWeight: '600',
  } as React.CSSProperties,

  debtsTableSection: {
    marginBottom: '20px',
  } as React.CSSProperties,

  tableWrapper: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderRadius: '12px',
    overflow: 'hidden',
  } as React.CSSProperties,

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  } as React.CSSProperties,

  tableHeader: {
    background: '#0f172a',
    borderBottom: '1px solid #334155',
  } as React.CSSProperties,

  headerCell: {
    padding: '16px',
    color: '#94a3b8',
    fontWeight: '600',
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: '12px',
    letterSpacing: '0.5px',
  } as React.CSSProperties,

  tableRow: {
    borderBottom: '1px solid #334155',
    transition: 'background 0.2s ease',
  } as React.CSSProperties,

  cell: {
    padding: '14px 16px',
    color: '#e2e8f0',
  } as React.CSSProperties,
};
