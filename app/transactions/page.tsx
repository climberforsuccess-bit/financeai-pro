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

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTransactions = mockTransactions.filter((tx) =>
    tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!mounted) {
    return <div style={{ padding: '40px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: '#0ea5e9', marginBottom: '8px' }}>
          {t('transactions')}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          {t('month')}: August {selectedYear}
        </p>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '30px',
        flexWrap: 'wrap',
      }}>
        <input
          type="text"
          placeholder={t('search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '250px',
            padding: '10px 14px',
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '6px',
            color: '#e2e8f0',
            fontSize: '14px',
          }}
        />
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{
            padding: '10px 14px',
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '6px',
            color: '#e2e8f0',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{
            padding: '10px 14px',
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '6px',
            color: '#e2e8f0',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          {['2024', '2025', '2026'].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <button
          style={{
            padding: '10px 20px',
            background: '#0ea5e9',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {t('exportPDF')}
        </button>
        <button
          style={{
            padding: '10px 20px',
            background: '#10b981',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {t('exportCSV')}
        </button>
      </div>

      {/* Table */}
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
                {t('date')}
              </th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '600' }}>
                {t('merchant')}
              </th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '600' }}>
                {t('category')}
              </th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '600' }}>
                {t('card')}
              </th>
              <th style={{ padding: '16px', textAlign: 'right', color: '#94a3b8', fontWeight: '600' }}>
                {t('amount')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '16px', color: '#e2e8f0' }}>
                  {formatDate(tx.date)}
                </td>
                <td style={{ padding: '16px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{tx.icon}</span> {tx.merchant}
                </td>
                <td style={{ padding: '16px', color: '#94a3b8' }}>
                  {tx.category}
                </td>
                <td style={{ padding: '16px', color: '#94a3b8' }}>
                  {tx.card}
                </td>
                <td style={{
                  padding: '16px',
                  textAlign: 'right',
                  color: tx.amount > 0 ? '#10b981' : '#ef4444',
                  fontWeight: 'bold',
                }}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
