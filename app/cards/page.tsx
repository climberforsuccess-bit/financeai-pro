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

  const creditCards = mockCards.filter((c) => c.type === 'credit');
  const totalCreditDebt = creditCards.reduce((sum, c) => sum + c.balance, 0);
  const totalCreditLimit = creditCards.reduce((sum, c) => sum + c.limit, 0);
  const utilizationRate = totalCreditLimit > 0 ? (totalCreditDebt / totalCreditLimit) * 100 : 0;

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.headerSection}>
        <div style={styles.headerTop}>
          <div>
            <h1 style={styles.title}>{t('myCards')}</h1>
            <p style={styles.subtitle}>
              {mockCards.length} {mockCards.length === 1 ? t('cards_singular') : t('cards_plural')}
            </p>
          </div>
          <button style={styles.addCardButton}>
            + {t('addCard')}
          </button>
        </div>
      </div>

      {/* SUMMARY STATS */}
      <div style={styles.statsGrid}>
        <StatCard
          icon="💳"
          label={t('totalCreditDebt')}
          value={`$${totalCreditDebt.toFixed(2)}`}
          color="#ef4444"
        />
        <StatCard
          icon="📊"
          label={t('totalLimit')}
          value={`$${totalCreditLimit.toFixed(2)}`}
          color="#94a3b8"
        />
        <StatCard
          icon="⚠️"
          label={t('utilization')}
          value={`${utilizationRate.toFixed(1)}%`}
          color={utilizationRate > 70 ? '#ef4444' : utilizationRate > 50 ? '#f59e0b' : '#10b981'}
        />
      </div>

      {/* CARDS GRID */}
      <div style={styles.cardsGridSection}>
        <h2 style={styles.sectionTitle}>{t('yourCards')}</h2>
        <div style={styles.cardsGrid}>
          {mockCards.map((card) => (
            <div key={card.id} style={styles.cardWrapper}>
              <CardDisplay
                name={card.name}
                bank={card.bank}
                lastDigits={card.lastDigits}
                balance={card.balance}
                limit={card.limit}
                color={card.color}
                type={card.type}
              />
              <div style={styles.cardActions}>
                <button style={styles.actionButton}>{t('edit')}</button>
                <button style={{ ...styles.actionButton, ...styles.actionButtonDanger }}>
                  {t('delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD DETAILS TABLE */}
      <div style={styles.tableSection}>
        <h2 style={styles.sectionTitle}>{t('cardDetails')}</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={{ ...styles.headerCell, textAlign: 'left' }}>
                  {t('cardName')}
                </th>
                <th style={{ ...styles.headerCell, textAlign: 'left' }}>
                  {t('bank')}
                </th>
                <th style={{ ...styles.headerCell, textAlign: 'left' }}>
                  {t('type')}
                </th>
                <th style={{ ...styles.headerCell, textAlign: 'right' }}>
                  {t('balance')}
                </th>
                <th style={{ ...styles.headerCell, textAlign: 'right' }}>
                  {t('limit')}
                </th>
                <th style={{ ...styles.headerCell, textAlign: 'right' }}>
                  {t('utilizationHeader')}
                </th>
              </tr>
            </thead>
            <tbody>
              {mockCards.map((card) => {
                const utilization = card.type === 'credit' ? (card.balance / card.limit) * 100 : 0;
                return (
                  <tr key={card.id} style={styles.tableRow}>
                    <td style={styles.cell}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '3px',
                            background: card.color,
                          }}
                        />
                        <span style={{ fontWeight: '600' }}>{card.name}</span>
                      </div>
                    </td>
                    <td style={{ ...styles.cell, color: '#94a3b8' }}>
                      {card.bank}
                    </td>
                    <td style={styles.cell}>
                      <span
                        style={{
                          display: 'inline-block',
                          background:
                            card.type === 'credit'
                              ? 'rgba(14, 165, 233, 0.2)'
                              : 'rgba(16, 185, 129, 0.2)',
                          color: card.type === 'credit' ? '#0ea5e9' : '#10b981',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        {card.type === 'credit' ? t('credit') : t('debit')}
                      </span>
                    </td>
                    <td style={{ ...styles.cell, textAlign: 'right', color: '#10b981', fontWeight: '700' }}>
                      ${card.balance.toFixed(2)}
                    </td>
                    <td style={{ ...styles.cell, textAlign: 'right', color: '#94a3b8' }}>
                      ${card.limit.toFixed(2)}
                    </td>
                    <td
                      style={{
                        ...styles.cell,
                        textAlign: 'right',
                        fontWeight: '700',
                        color:
                          utilization > 70
                            ? '#ef4444'
                            : utilization > 50
                            ? '#f59e0b'
                            : '#10b981',
                      }}
                    >
                      {utilization > 0 ? `${utilization.toFixed(1)}%` : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
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
    <div style={{ ...styles.statCard, borderTopColor: color }}>
      <div style={styles.statIcon}>{icon}</div>
      <div style={styles.statLabel}>{label}</div>
      <div style={{ ...styles.statValue, color }}>{value}</div>
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
    marginBottom: '8px',
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

  addCardButton: {
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

  statCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderTop: '3px solid',
    borderRadius: '12px',
    padding: '20px',
  } as React.CSSProperties,

  statIcon: {
    fontSize: '24px',
    marginBottom: '8px',
  } as React.CSSProperties,

  statLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
  } as React.CSSProperties,

  statValue: {
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  } as React.CSSProperties,

  cardsGridSection: {
    marginBottom: '40px',
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: '20px',
    letterSpacing: '-0.3px',
  } as React.CSSProperties,

  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  } as React.CSSProperties,

  cardWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },

  cardActions: {
    display: 'flex',
    gap: '8px',
  } as React.CSSProperties,

  actionButton: {
    flex: 1,
    padding: '8px 12px',
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#e2e8f0',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,

  actionButtonDanger: {
    borderColor: '#ef4444',
    color: '#ef4444',
  } as React.CSSProperties,

  tableSection: {
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
