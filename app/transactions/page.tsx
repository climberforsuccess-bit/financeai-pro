'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  card: string;
  icon: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2026-08-28',
    merchant: 'Amazon',
    category: 'Shopping',
    amount: -45.99,
    card: '•••• 4242',
    icon: '🛍️',
  },
  {
    id: '2',
    date: '2026-08-27',
    merchant: 'Starbucks',
    category: 'Food & Drink',
    amount: -5.50,
    card: '•••• 1234',
    icon: '☕',
  },
  {
    id: '3',
    date: '2026-08-26',
    merchant: 'Salary Deposit',
    category: 'Income',
    amount: 4200.00,
    card: '•••• 5678',
    icon: '💰',
  },
  {
    id: '4',
    date: '2026-08-25',
    merchant: 'Netflix',
    category: 'Subscriptions',
    amount: -14.99,
    card: '•••• 4242',
    icon: '📺',
  },
  {
    id: '5',
    date: '2026-08-24',
    merchant: 'Whole Foods',
    category: 'Groceries',
    amount: -87.32,
    card: '•••• 1234',
    icon: '🛒',
  },
  {
    id: '6',
    date: '2026-08-23',
    merchant: 'Uber',
    category: 'Transportation',
    amount: -18.50,
    card: '•••• 4242',
    icon: '🚗',
  },
  {
    id: '7',
    date: '2026-08-22',
    merchant: 'Gym Membership',
    category: 'Health',
    amount: -49.99,
    card: '•••• 1234',
    icon: '💪',
  },
  {
    id: '8',
    date: '2026-08-21',
    merchant: 'Restaurant',
    category: 'Dining',
    amount: -65.80,
    card: '•••• 5678',
    icon: '🍽️',
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export default function TransactionsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('08');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTransactions = mockTransactions.filter((tx) =>
    (tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    tx.date.includes(`${selectedYear}-${selectedMonth}`)
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const monthlyIncome = filteredTransactions
    .filter((tx) => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

  const monthlyExpenses = filteredTransactions
    .filter((tx) => tx.amount < 0)
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  if (!mounted) {
    return <div style={styles.loadingContainer}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.headerSection}>
        <div>
          <h1 style={styles.title}>{t('transactions')}</h1>
          <p style={styles.subtitle}>
            {t('month')}: August {selectedYear}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={styles.summaryGrid}>
        <SummaryCard
          icon="📈"
          label="Ingresos"
          value={`$${monthlyIncome.toFixed(2)}`}
          color="#10b981"
        />
        <SummaryCard
          icon="📉"
          label="Gastos"
          value={`$${monthlyExpenses.toFixed(2)}`}
          color="#ef4444"
        />
        <SummaryCard
          icon="💰"
          label="Balance"
          value={`$${(monthlyIncome - monthlyExpenses).toFixed(2)}`}
          color="#06b6d4"
        />
      </div>

      {/* Filters */}
      <div style={styles.filtersSection}>
        <input
          type="text"
          placeholder={t('search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={styles.selectInput}
        >
          {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m) => (
            <option key={m} value={m}>
              {new Date(`2026-${m}-01`).toLocaleDateString('es-ES', { month: 'long' })}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={styles.selectInput}
        >
          {['2024', '2025', '2026'].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <button style={{ ...styles.button, background: 'linear-gradient(135deg, #06b6d4, #0891b2)', color: '#fff' }}>
          📥 {t('exportPDF')}
        </button>
        <button style={{ ...styles.button, background: '#10b981', color: '#fff' }}>
          📊 {t('exportCSV')}
        </button>
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={{ ...styles.headerCell, textAlign: 'left' }}>{t('date')}</th>
              <th style={{ ...styles.headerCell, textAlign: 'left' }}>{t('merchant')}</th>
              <th style={{ ...styles.headerCell, textAlign: 'left' }}>{t('category')}</th>
              <th style={{ ...styles.headerCell, textAlign: 'left' }}>{t('card')}</th>
              <th style={{ ...styles.headerCell, textAlign: 'right' }}>{t('amount')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => (
                <tr key={tx.id} style={styles.tableRow}>
                  <td style={styles.cell}>{formatDate(tx.date)}</td>
                  <td style={{ ...styles.cell, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{tx.icon}</span> {tx.merchant}
                  </td>
                  <td style={{ ...styles.cell, color: '#94a3b8' }}>{tx.category}</td>
                  <td style={{ ...styles.cell, color: '#94a3b8', fontSize: '13px' }}>{tx.card}</td>
                  <td
                    style={{
                      ...styles.cell,
                      textAlign: 'right',
                      color: tx.amount > 0 ? '#10b981' : '#ef4444',
                      fontWeight: '700',
                    }}
                  >
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ ...styles.cell, textAlign: 'center', color: '#94a3b8' }}>
                  {t('noTransactions')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.paginationContainer}>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{ ...styles.paginationButton, opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            ← Anterior
          </button>
          <span style={styles.pageInfo}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{ ...styles.paginationButton, opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div style={{ ...styles.summaryCard, borderTopColor: color }}>
      <div style={styles.summaryIcon}>{icon}</div>
      <div style={styles.summaryLabel}>{label}</div>
      <div style={{ ...styles.summaryValue, color }}>{value}</div>
    </div>
  );
}

const styles = {
  loadingContainer: {
    padding: '40px',
    textAlign: 'center' as const,
    color: '#94a3b8',
  },

  container: {
    padding: '32px',
    maxWidth: '1400px',
    margin: '0 auto',
  } as React.CSSProperties,

  headerSection: {
    marginBottom: '32px',
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

  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  } as React.CSSProperties,

  summaryCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderTop: '3px solid',
    borderRadius: '12px',
    padding: '20px',
  } as React.CSSProperties,

  summaryIcon: {
    fontSize: '24px',
    marginBottom: '8px',
  } as React.CSSProperties,

  summaryLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
  } as React.CSSProperties,

  summaryValue: {
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  } as React.CSSProperties,

  filtersSection: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  } as React.CSSProperties,

  searchInput: {
    flex: 1,
    minWidth: '250px',
    padding: '10px 14px',
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '14px',
  } as React.CSSProperties,

  selectInput: {
    padding: '10px 14px',
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '14px',
    cursor: 'pointer',
  } as React.CSSProperties,

  button: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,

  tableWrapper: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '24px',
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

  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    marginTop: '24px',
  } as React.CSSProperties,

  paginationButton: {
    padding: '8px 16px',
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#e2e8f0',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,

  pageInfo: {
    color: '#94a3b8',
    fontSize: '14px',
    fontWeight: '600',
  } as React.CSSProperties,
};
