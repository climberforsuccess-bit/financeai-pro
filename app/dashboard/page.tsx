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

  const transactions = [
    { category: '🍔 Alimentos', description: 'Whole Foods Market', date: '28 Ago', amount: '-$45.32', type: 'negative' },
    { category: '🚗 Transporte', description: 'Uber', date: '28 Ago', amount: '-$18.50', type: 'negative' },
    { category: '💼 Ingresos', description: 'Pago de Salario', date: '25 Ago', amount: '+$4,200.00', type: 'positive' },
    { category: '🎬 Entretenimiento', description: 'Netflix', date: '20 Ago', amount: '-$12.99', type: 'negative' },
    { category: '🏥 Salud', description: 'Farmacia CVS', date: '18 Ago', amount: '-$32.15', type: 'negative' },
  ];

  const today = new Date();
  const dateStr = today.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>{t('dashboard')}</h1>
          <p style={styles.dateText}>
            {dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}
          </p>
        </div>
        <div style={styles.badge}>📊 Agosto 2024</div>
      </div>

      {/* STATS GRID - Mantiene Cards existentes */}
      <div style={styles.statsGrid}>
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

      {/* MAIN GRID: Chart + Sidebar */}
      <div style={styles.mainGrid}>
        {/* Chart Section */}
        <div style={styles.chartContainer}>
          <IncomeExpenseChart />
        </div>

        {/* Sidebar Widgets */}
        <div style={styles.sidebar}>
          <SidebarWidget
            title="📊 Este Mes"
            items={[
              { label: 'Ahorrado', value: '$1,400.00' },
              { label: 'Variación', value: '+22%', highlighted: true },
            ]}
          />
          <SidebarWidget
            title="💳 Deuda Activa"
            items={[
              { label: 'Tarjetas', value: '3' },
              { label: 'Interés Promedio', value: '18.5%' },
            ]}
          />
          <SidebarWidget
            title="🎯 Objetivo Deuda"
            items={[
              { label: 'Método', value: 'Avalanche' },
              { label: 'Tiempo', value: '24 meses' },
            ]}
          />
        </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div style={styles.transactionsCard}>
        <div style={styles.txHeader}>
          <div>
            <h2 style={styles.txTitle}>{t('recentTransactions')}</h2>
            <p style={styles.txSubtitle}>Últimas 5 transacciones</p>
          </div>
          <a href="/transactions" style={styles.viewAllLink}>
            {t('viewAll')} →
          </a>
        </div>

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={{ ...styles.headerCell, textAlign: 'left' }}>Categoría</th>
              <th style={{ ...styles.headerCell, textAlign: 'left' }}>Descripción</th>
              <th style={{ ...styles.headerCell, textAlign: 'left' }}>Fecha</th>
              <th style={{ ...styles.headerCell, textAlign: 'right' }}>Monto</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx} style={styles.tableRow}>
                <td style={{ ...styles.cell, color: '#06b6d4', fontWeight: '600' }}>
                  {tx.category}
                </td>
                <td style={styles.cell}>{tx.description}</td>
                <td style={{ ...styles.cell, color: '#94a3b8', fontSize: '13px' }}>
                  {tx.date}
                </td>
                <td
                  style={{
                    ...styles.cell,
                    textAlign: 'right',
                    color: tx.type === 'positive' ? '#10b981' : '#ef4444',
                    fontWeight: '700',
                  }}
                >
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.txActions}>
          <button style={styles.btnPrimary}>{t('viewAll')} →</button>
          <button style={styles.btnSecondary}>📥 Descargar PDF</button>
        </div>
      </div>
    </div>
  );
}

function SidebarWidget({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: string; highlighted?: boolean }>;
}) {
  return (
    <div style={styles.sidebarCard}>
      <h3 style={styles.sidebarTitle}>{title}</h3>
      {items.map((item, idx) => (
        <div key={idx} style={styles.quickStat}>
          <span style={styles.quickLabel}>{item.label}</span>
          <span
            style={{
              ...styles.quickValue,
              color: item.highlighted ? '#10b981' : '#f1f5f9',
            }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: '32px',
    maxWidth: '1600px',
    margin: '0 auto',
  } as React.CSSProperties,

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '40px',
  } as React.CSSProperties,

  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: '4px',
    letterSpacing: '-0.5px',
  } as React.CSSProperties,

  dateText: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: '500',
  } as React.CSSProperties,

  badge: {
    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
    border: '1px solid rgba(6, 182, 212, 0.2)',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    color: '#06b6d4',
    fontWeight: '600',
  } as React.CSSProperties,

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  } as React.CSSProperties,

  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
    marginBottom: '32px',
  } as React.CSSProperties,

  chartContainer: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '24px',
  } as React.CSSProperties,

  sidebar: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },

  sidebarCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
  } as React.CSSProperties,

  sidebarTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '16px',
  } as React.CSSProperties,

  quickStat: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #1e293b',
  } as React.CSSProperties,

  quickLabel: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: '500',
  } as React.CSSProperties,

  quickValue: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#f1f5f9',
  } as React.CSSProperties,

  transactionsCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '24px',
  } as React.CSSProperties,

  txHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  } as React.CSSProperties,

  txTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: '4px',
  } as React.CSSProperties,

  txSubtitle: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '500',
  } as React.CSSProperties,

  viewAllLink: {
    fontSize: '14px',
    color: '#06b6d4',
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer',
  } as React.CSSProperties,

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  } as React.CSSProperties,

  tableHeader: {
    borderBottom: '1px solid #334155',
  } as React.CSSProperties,

  headerCell: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '12px 0',
  } as React.CSSProperties,

  tableRow: {
    borderBottom: '1px solid #1e293b',
    transition: 'background 0.2s ease',
  } as React.CSSProperties,

  cell: {
    padding: '12px 0',
    fontSize: '14px',
    color: '#e2e8f0',
  } as React.CSSProperties,

  txActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  } as React.CSSProperties,

  btnPrimary: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    color: 'white',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,

  btnSecondary: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #334155',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    background: 'transparent',
    color: '#94a3b8',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,
};
