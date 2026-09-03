'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  balance: number;
  count: number;
}

export default function ReportsPage() {
  const { t } = useLanguage();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [topCategories, setTopCategories] = useState<Array<[string, number]>>([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      processData();
    }
  }, [transactions, selectedMonth]);

  const loadTransactions = async () => {
    try {
      const mockData: Transaction[] = [
        {
          id: '1',
          description: 'Salary',
          amount: 3500,
          type: 'income',
          category: 'Income',
          date: '2026-01-15',
        },
        {
          id: '2',
          description: 'Grocery Store',
          amount: 120.5,
          type: 'expense',
          category: 'Groceries',
          date: '2026-01-10',
        },
        {
          id: '3',
          description: 'Netflix',
          amount: 15.99,
          type: 'expense',
          category: 'Subscriptions',
          date: '2026-01-05',
        },
        {
          id: '4',
          description: 'Restaurant',
          amount: 65.3,
          type: 'expense',
          category: 'Dining',
          date: '2026-01-20',
        },
        {
          id: '5',
          description: 'Gas',
          amount: 50,
          type: 'expense',
          category: 'Transportation',
          date: '2026-01-18',
        },
        {
          id: '6',
          description: 'Freelance Work',
          amount: 800,
          type: 'income',
          category: 'Income',
          date: '2026-01-22',
        },
      ];
      setTransactions(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading transactions:', error);
      setLoading(false);
    }
  };

  const processData = () => {
    const filtered = transactions.filter((t) =>
      t.date.startsWith(selectedMonth)
    );

    const income = filtered
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = filtered
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;

    setTotals({ income, expense, balance });

    const cats: Record<string, number> = {};
    filtered
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        cats[t.category] = (cats[t.category] || 0) + t.amount;
      });

    const sorted = Object.entries(cats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    setTopCategories(sorted);

    const monthlyMap: Record<string, MonthlyData> = {};
    transactions.forEach((t) => {
      const month = t.date.slice(0, 7);
      if (!monthlyMap[month]) {
        monthlyMap[month] = { month, income: 0, expense: 0, balance: 0, count: 0 };
      }
      if (t.type === 'income') {
        monthlyMap[month].income += t.amount;
      } else {
        monthlyMap[month].expense += t.amount;
      }
      monthlyMap[month].balance = monthlyMap[month].income - monthlyMap[month].expense;
      monthlyMap[month].count += 1;
    });

    const monthly = Object.values(monthlyMap)
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6);
    setMonthlyData(monthly);
  };

  const exportCSV = () => {
    const filtered = transactions.filter((t) => t.date.startsWith(selectedMonth));
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = filtered.map((t) => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${selectedMonth}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div style={styles.root}>
        <div style={styles.skeleton}></div>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>{t('reports')}</h1>
          <p style={styles.subtitle}>{t('financial_analysis')}</p>
        </div>
        <div style={styles.controls}>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={styles.monthInput}
          />
          <button onClick={exportCSV} style={styles.exportBtn}>
            📥 {t('export_csv')}
          </button>
        </div>
      </div>

      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>{t('total_income')}</div>
          <div style={{ ...styles.metricValue, color: '#10b981' }}>
            ${totals.income.toFixed(2)}
          </div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>{t('total_expenses')}</div>
          <div style={{ ...styles.metricValue, color: '#ef4444' }}>
            ${totals.expense.toFixed(2)}
          </div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>{t('balance')}</div>
          <div
            style={{
              ...styles.metricValue,
              color: totals.balance >= 0 ? '#06b6d4' : '#f97316',
            }}
          >
            ${totals.balance.toFixed(2)}
          </div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>{t('transactions')}</div>
          <div style={{ ...styles.metricValue, color: '#8b5cf6' }}>
            {transactions.filter((t) => t.date.startsWith(selectedMonth)).length}
          </div>
        </div>
      </div>

      {topCategories.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📊 {t('top_categories')}</h2>
          <div style={styles.categoriesContainer}>
            {topCategories.map(([cat, amount], idx) => {
              const max = topCategories[0][1];
              const percentage = (amount / max) * 100;
              return (
                <div key={idx} style={styles.categoryRow}>
                  <div style={styles.categoryLabel}>{cat}</div>
                  <div style={styles.categoryBar}>
                    <div
                      style={{
                        ...styles.categoryBarFill,
                        width: `${percentage}%`,
                      }}
                    ></div>
                  </div>
                  <div style={styles.categoryAmount}>${amount.toFixed(2)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {monthlyData.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📈 {t('monthly_trend')}</h2>
          <div style={styles.monthlyGrid}>
            {monthlyData.map((data, idx) => (
              <div key={idx} style={styles.monthlyCard}>
                <div style={styles.monthLabel}>{data.month}</div>
                <div style={styles.monthStats}>
                  <div style={styles.monthStatRow}>
                    <span style={{ color: '#94a3b8' }}>In:</span>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>
                      ${data.income.toFixed(0)}
                    </span>
                  </div>
                  <div style={styles.monthStatRow}>
                    <span style={{ color: '#94a3b8' }}>Out:</span>
                    <span style={{ color: '#ef4444', fontWeight: '600' }}>
                      ${data.expense.toFixed(0)}
                    </span>
                  </div>
                  <div
                    style={{
                      ...styles.monthStatRow,
                      paddingTop: '8px',
                      borderTop: '1px solid #334155',
                      marginTop: '8px',
                    }}
                  >
                    <span style={{ color: '#94a3b8' }}>Net:</span>
                    <span
                      style={{
                        color: data.balance >= 0 ? '#06b6d4' : '#f97316',
                        fontWeight: '700',
                      }}
                    >
                      ${data.balance.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          💳 {t('transactions')} ({selectedMonth})
        </h2>
        <div style={styles.transactionsTable}>
          {transactions
            .filter((t) => t.date.startsWith(selectedMonth))
            .slice(0, 10)
            .map((tx, idx) => (
              <div key={idx} style={styles.transactionRow}>
                <div style={styles.txInfo}>
                  <div style={styles.txDesc}>{tx.description}</div>
                  <div style={styles.txCat}>{tx.category}</div>
                </div>
                <div
                  style={{
                    ...styles.txAmount,
                    color: tx.type === 'income' ? '#10b981' : '#ef4444',
                  }}
                >
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    background: '#0f172a',
    color: '#e2e8f0',
    minHeight: '100vh',
    padding: '32px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  skeleton: {
    height: '400px',
    background: 'linear-gradient(90deg, #1e293b, #334155, #1e293b)',
    backgroundSize: '200% 100%',
    borderRadius: '12px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    margin: 0,
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
  },
  controls: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  monthInput: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#e2e8f0',
    padding: '8px 12px',
    fontSize: '13px',
    fontWeight: '600',
  },
  exportBtn: {
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    border: 'none',
    borderRadius: '6px',
    color: '#0f172a',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  metricCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
  },
  metricLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  metricValue: {
    fontSize: '28px',
    fontWeight: '700',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '16px',
  },
  categoriesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  categoryRow: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr 100px',
    alignItems: 'center',
    gap: '12px',
  },
  categoryLabel: {
    fontSize: '13px',
    fontWeight: '600',
  },
  categoryBar: {
    height: '8px',
    background: '#334155',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  categoryBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #06b6d4, #0ea5e9)',
  },
  categoryAmount: {
    fontSize: '13px',
    fontWeight: '600',
    textAlign: 'right',
    color: '#ef4444',
  },
  monthlyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
  },
  monthlyCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px',
  },
  monthLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: '8px',
  },
  monthStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '11px',
  },
  monthStatRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  transactionsTable: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  transactionRow: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txInfo: {
    flex: 1,
  },
  txDesc: {
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '2px',
  },
  txCat: {
    fontSize: '11px',
    color: '#94a3b8',
  },
  txAmount: {
    fontSize: '13px',
    fontWeight: '700',
  },
};
