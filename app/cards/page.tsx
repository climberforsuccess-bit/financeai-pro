'use client';

import { useLanguage } from '@/context/LanguageContext';
import { CardDisplay } from '@/components/ui/cards/CardDisplay';

interface Card {
  id: string;
  name: string;
  bank: string;
  lastDigits: string;
  balance: number;
  limit: number;
  color: string;
  type: 'credit' | 'debit';
  apr?: number;
  paymentDueDate?: string;
}

const mockCards: Card[] = [
  {
    id: '1',
    name: 'Primary',
    bank: 'Chase Bank',
    lastDigits: '4242',
    balance: 2450.50,
    limit: 5000,
    color: '#0ea5e9',
    type: 'credit',
    apr: 18.5,
    paymentDueDate: '15',
  },
  {
    id: '2',
    name: 'Business',
    bank: 'Bank of America',
    lastDigits: '1234',
    balance: 8500.00,
    limit: 10000,
    color: '#10b981',
    type: 'credit',
    apr: 15.2,
    paymentDueDate: '20',
  },
  {
    id: '3',
    name: 'Debit Card',
    bank: 'Wells Fargo',
    lastDigits: '5678',
    balance: 1200.00,
    limit: 1200,
    color: '#8b5cf6',
    type: 'debit',
  },
];

export default function MyCardsPage() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '40px', maxWidth: '1400px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '32px', color: '#0ea5e9' }}>
            {t('myCards')}
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
            + {t('addCard')}
          </button>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          {mockCards.length} {mockCards.length === 1 ? 'tarjeta' : 'tarjetas'}
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
      }}>
        {mockCards.map((card) => (
          <CardDisplay
            key={card.id}
            name={card.name}
            bank={card.bank}
            lastDigits={card.lastDigits}
            balance={card.balance}
            limit={card.limit}
            color={card.color}
            type={card.type}
          />
        ))}
      </div>

      {/* Card Details Table */}
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
                {t('cardName')}
              </th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '600' }}>
                {t('bank')}
              </th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '600' }}>
                {t('type')}
              </th>
              <th style={{ padding: '16px', textAlign: 'right', color: '#94a3b8', fontWeight: '600' }}>
                {t('balance')}
              </th>
              <th style={{ padding: '16px', textAlign: 'right', color: '#94a3b8', fontWeight: '600' }}>
                {t('limit')}
              </th>
            </tr>
          </thead>
          <tbody>
            {mockCards.map((card) => (
              <tr key={card.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '16px', color: '#e2e8f0', fontWeight: '500' }}>
                  {card.name}
                </td>
                <td style={{ padding: '16px', color: '#94a3b8' }}>
                  {card.bank}
                </td>
                <td style={{ padding: '16px', color: '#94a3b8' }}>
                  <span style={{
                    display: 'inline-block',
                    background: card.type === 'credit' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: card.type === 'credit' ? '#0ea5e9' : '#10b981',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}>
                    {card.type === 'credit' ? t('credit') : t('debit')}
                  </span>
                </td>
                <td style={{ padding: '16px', color: '#10b981', textAlign: 'right', fontWeight: 'bold' }}>
                  ${card.balance.toFixed(2)}
                </td>
                <td style={{ padding: '16px', color: '#94a3b8', textAlign: 'right' }}>
                  ${card.limit.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
