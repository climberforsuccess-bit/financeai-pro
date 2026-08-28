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
  const { language } = useLanguage();
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
      // TODO: Reemplazar con API real cuando esté lista
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
    // Filtrar por mes seleccionado
    const filtered = transactions.filter((t) =>
      t.date.startsWith(selectedMonth)
    );

    // Calcular totales
    const income = filtered
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = filtered
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;

    setTotals({ income, expense, balance });

    // Top categorías
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

    // Datos mensuales (últimos 6 meses)
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

  const exportPDF = () => {
    const filtered = transactions.filter((t) => t.date.startsWith(selectedMonth));
    let pdf = `%PDF-1.4\n`;
    pdf += `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
    pdf += `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;

    const content = `FinanceAI Pro - Monthly Report ${selectedMonth}\n\nTotal Income: $${totals.income.toFixed(2)}\nTotal Expense: $${totals.expense.toFixed(2)}\nBalance: $${totals.balance.toFixed(2)}\n\nTransactions:\n${filtered
      .map(
        (t) =>
          `${t.date} | ${t.description} | ${t.category} | ${t.type} | $${t.amount}`
      )
      .join('\n')}`;

    pdf += `3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n`;
    pdf += `4 0 obj\n<< /Length ${content.length} >>\nstream\nBT\n/F1 12 Tf\n50 750 Td\n(${content.replace(
      /[()]/g,
      ''
    )}) Tj\nET\nendstream\nendobj\n`;

    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${selectedMonth}.pdf`;
    a.click();
  };

  const content = {
    es: {
      title: 'Reportes',
      subtitle: 'Análisis detallado de tus finanzas',
      monthLabel: 'Período:',
      totalIncome: 'Ingresos Totales',
      totalExpense: 'Gastos Totales',
      balance: 'Saldo',
      transactions: 'Transacciones',
      topCategories: 'Categorías Principales',
      monthlyTrend: 'Tendencia Mensual',
      exportCSV: 'Descargar CSV',
      exportPDF: 'Descargar PDF',
      noData: 'Sin transacciones en este período',
    },
    en: {
      title: 'Reports',
      subtitle: 'Detailed analysis of your finances',
      monthLabel: 'Period:',
      totalIncome: 'Total Income',
      totalExpense: 'Total Expenses',
      balance: 'Balance',
      transactions: 'Transactions',
      topCategories: 'Top Categories',
      monthlyTrend: 'Monthly Trend',
      exportCSV: 'Download CSV',
      exportPDF: 'Download PDF',
      noData: 'No transactions in this period',
    },
  };

  const curr = content[language as keyof typeof content];

  if (loading) {
    return (
      <div style={styles.root}>
        <div style={styles.skeleton}></div>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>{curr.title}</h1>
          <p style={styles.subtitle}>{curr.subtitle}</p>
        </div>
        <div style={styles.controls}>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={styles.monthInput}
          />
          <button onClick={exportCSV} style={styles.exportBtn}>
            📥 {curr.exportCSV}
          </button>
          <button onClick={exportPDF} style={styles.exportBtn}>
            📄 {curr.exportPDF}
          </button>
        </div>
      </div>

      {/* KEY METRICS */}
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>{curr.totalIncome}</div>
          <div style={{ ...styles.metricValue, color: '#10b981' }}>
            ${totals.income.toFixed(2)}
          </div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>{curr.totalExpense}</div>
          <div style={{ ...styles.metricValue, color: '#ef4444' }}>
            ${totals.expense.toFixed(2)}
          </div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>{curr.balance}</div>
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
          <div style={styles.metricLabel}>{curr.transactions}</div>
          <div style={{ ...styles.metricValue, color: '#8b5cf6' }}>
            {transactions.filter((t) => t.date.startsWith(selectedMonth)).length}
          </div>
        </div>
      </div>

      {/* TOP CATEGORIES */}
      {topCategories.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📊 {curr.topCategories}</h2>
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

      {/* MONTHLY TREND */}
      {monthlyData.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📈 {curr.monthlyTrend}</h2>
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

      {/* RECENT TRANSACTIONS */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          💳 {curr.transactions} ({selectedMonth})
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

const styles = {
  root: {
    background: '#0f172a',
    color: '#e2e8f0',
    minHeight: '100vh',
    padding: '32px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as React.CSSProperties,

  skeleton: {
    height: '400px',
    background: 'linear-gradient(90deg, #1e293b, #334155, #1e293b)',
    backgroundSize: '200% 100%',
    animation: 'loading 1.5s infinite',
    borderRadius: '12px',
  } as React.CSSProperties,

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '20px',
  } as React.CSSProperties,

  title: {
    fontSize: '32px',
    fontWeight: '800',
    margin: 0,
    marginBottom: '4px',
  } as React.CSSProperties,

  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
  } as React.CSSProperties,

  controls: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
  } as React.CSSProperties,

  monthInput: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#e2e8f0',
    padding: '8px 12px',
    fontSize: '13px',
    fontWeight: '600',
  } as React.CSSProperties,

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
  } as React.CSSProperties,

  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  } as React.CSSProperties,

  metricCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
  } as React.CSSProperties,

  metricLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: '8px',
  } as React.CSSProperties,

  metricValue: {
    fontSize: '28px',
    fontWeight: '700',
  } as React.CSSProperties,

  section: {
    marginBottom: '32px',
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '16px',
  } as React.CSSProperties,

  categoriesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } as React.CSSProperties,

  categoryRow: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr 100px',
    alignItems: 'center',
    gap: '12px',
  } as React.CSSProperties,

  categoryLabel: {
    fontSize: '13px',
    fontWeight: '600',
  } as React.CSSProperties,

  categoryBar: {
    height: '8px',
    background: '#334155',
    borderRadius: '4px',
    overflow: 'hidden',
  } as React.CSSProperties,

  categoryBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #06b6d4, #0ea5e9)',
  } as React.CSSProperties,

  categoryAmount: {
    fontSize: '13px',
    fontWeight: '600',
    textAlign: 'right',
    color: '#ef4444',
  } as React.CSSProperties,

  monthlyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
  } as React.CSSProperties,

  monthlyCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px',
  } as React.CSSProperties,

  monthLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: '8px',
  } as React.CSSProperties,

  monthStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '11px',
  } as React.CSSProperties,

  monthStatRow: {
    display: 'flex',
    justifyContent: 'space-between',
  } as React.CSSProperties,

  transactionsTable: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } as React.CSSProperties,

  transactionRow: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,

  txInfo: {
    flex: 1,
  } as React.CSSProperties,

  txDesc: {
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '2px',
  } as React.CSSProperties,

  txCat: {
    fontSize: '11px',
    color: '#94a3b8',
  } as React.CSSProperties,

  txAmount: {
    fontSize: '13px',
    fontWeight: '700',
  } as React.CSSProperties,
};
