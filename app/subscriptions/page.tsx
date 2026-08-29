'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';

interface Subscription {
  id: string;
  name: string;
  category: string;
  amount: number;
  billingCycle: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextBillingDate: string;
  icon: string;
  color: string;
  priority?: 'high' | 'medium' | 'low';
}

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    category: 'Entertainment',
    amount: 14.99,
    billingCycle: 'monthly',
    nextBillingDate: '2026-09-05',
    icon: '📺',
    color: '#e50914',
    priority: 'low',
  },
  {
    id: '2',
    name: 'Spotify Premium',
    category: 'Music',
    amount: 9.99,
    billingCycle: 'monthly',
    nextBillingDate: '2026-08-30',
    icon: '🎵',
    color: '#1DB954',
    priority: 'low',
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    category: 'Software',
    amount: 54.99,
    billingCycle: 'monthly',
    nextBillingDate: '2026-09-01',
    icon: '🎨',
    color: '#FF0000',
    priority: 'medium',
  },
  {
    id: '4',
    name: 'AWS',
    category: 'Cloud',
    amount: 125.50,
    billingCycle: 'monthly',
    nextBillingDate: '2026-09-10',
    icon: '☁️',
    color: '#FF9900',
    priority: 'high',
  },
  {
    id: '5',
    name: 'Microsoft 365',
    category: 'Productivity',
    amount: 69.99,
    billingCycle: 'yearly',
    nextBillingDate: '2027-03-15',
    icon: '📊',
    color: '#0078D4',
    priority: 'medium',
  },
];

const categories = [
  'All',
  'Entertainment',
  'Music',
  'Software',
  'Cloud',
  'Productivity',
];

export default function SubscriptionsPage() {
  const { t, language } = useLanguage();
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = selectedCategory === 'All'
    ? subscriptions
    : subscriptions.filter((s) => s.category === selectedCategory);

  const monthlyTotal = subscriptions
    .filter((s) => s.billingCycle === 'monthly')
    .reduce((sum, s) => sum + s.amount, 0);

  const yearlyMonthly = subscriptions
    .filter((s) => s.billingCycle === 'yearly')
    .reduce((sum, s) => sum + s.amount / 12, 0);

  const totalMonthly = monthlyTotal + yearlyMonthly;
  const totalYearly = totalMonthly * 12;

  // Potential savings (ejemplo: canceling entertainment)
  const entertainmentTotal = subscriptions
    .filter((s) => s.category === 'Entertainment')
    .reduce((sum, s) => sum + (s.billingCycle === 'monthly' ? s.amount : s.amount / 12), 0);

  const potentialSavings = entertainmentTotal * 12;

  // Sort by next billing date
  const sortedByBilling = [...filtered].sort(
    (a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime()
  );

  const handleCancel = (id: string) => {
    setSubscriptions(subscriptions.filter((s) => s.id !== id));
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.headerSection}>
        <div>
          <h1 style={styles.title}>{t('subscriptions')}</h1>
          <p style={styles.subtitle}>
            {subscriptions.length} {subscriptions.length === 1 ? t('subscription_singular') : t('subscription_plural')}
          </p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div style={styles.statsGrid}>
        <Card
          title={t('monthlyCost')}
          value={`$${totalMonthly.toFixed(2)}`}
          subtitle={`$${totalYearly.toFixed(2)}${t('yearlyTotal')}`}
          icon="📅"
          textColor="#0ea5e9"
          bgColor="rgba(14, 165, 233, 0.1)"
        />
        <Card
          title={t('activeSubscriptions')}
          value={subscriptions.length.toString()}
          subtitle={`${filtered.length} ${t('inCategory')} ${selectedCategory}`}
          icon="📊"
          textColor="#10b981"
          bgColor="rgba(16, 185, 129, 0.1)"
        />
        <Card
          title={t('potentialSavings')}
          value={`$${potentialSavings.toFixed(2)}`}
          subtitle={t('cancelEntertainment')}
          icon="💰"
          textColor="#f59e0b"
          bgColor="rgba(245, 158, 11, 0.1)"
        />
      </div>

      {/* FILTERS */}
      <div style={styles.filterSection}>
        <h3 style={styles.filterTitle}>{t('filterByCategory')}</h3>
        <div style={styles.filterButtons}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...styles.filterButton,
                ...(selectedCategory === cat && styles.filterButtonActive),
              }}
            >
              {cat === 'All' ? t('all') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* SUBSCRIPTIONS GRID */}
      <div style={styles.gridSection}>
        <h2 style={styles.sectionTitle}>{t('yourSubscriptions')}</h2>
        <div style={styles.subscriptionsGrid}>
          {filtered.length > 0 ? (
            filtered.map((sub) => (
              <div key={sub.id} style={styles.subscriptionCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.cardIcon}>{sub.icon}</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ ...styles.badge, ...styles.badgeCategory }}>
                      {sub.category}
                    </span>
                    <span
                      style={{
                        ...styles.badge,
                        color:
                          sub.billingCycle === 'monthly'
                            ? '#0ea5e9'
                            : '#8b5cf6',
                        background:
                          sub.billingCycle === 'monthly'
                            ? 'rgba(14, 165, 233, 0.2)'
                            : 'rgba(139, 92, 246, 0.2)',
                      }}
                    >
                      {sub.billingCycle === 'monthly' ? t('monthly') : t('yearly')}
                    </span>
                  </div>
                </div>

                <div style={styles.cardContent}>
                  <div style={styles.cardName}>{sub.name}</div>
                  <div style={styles.cardPrice}>${sub.amount.toFixed(2)}</div>
                </div>

                <div style={styles.cardFooter}>
                  <div style={styles.nextBilling}>
                    <div style={styles.nextBillingLabel}>{t('nextPayment')}</div>
                    <div style={styles.nextBillingDate}>
                      {new Date(sub.nextBillingDate).toLocaleDateString(
                        language === 'es' ? 'es-ES' : 'en-US',
                        { month: 'short', day: 'numeric' }
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCancel(sub.id)}
                    style={styles.cancelButton}
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>
              {t('noSubscriptionsCategory')}
            </div>
          )}
        </div>
      </div>

      {/* UPCOMING BILLING TABLE */}
      <div style={styles.tableSection}>
        <h2 style={styles.sectionTitle}>{t('upcomingPayments')}</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={{ ...styles.headerCell, textAlign: 'left' }}>
                  {t('subscription')}
                </th>
                <th style={{ ...styles.headerCell, textAlign: 'left' }}>
                  {t('category')}
                </th>
                <th style={{ ...styles.headerCell, textAlign: 'right' }}>
                  {t('amount')}
                </th>
                <th style={{ ...styles.headerCell, textAlign: 'right' }}>
                  {t('nextBillingDate')}
                </th>
                <th style={{ ...styles.headerCell, textAlign: 'center' }}>
                  {t('action')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedByBilling.map((sub) => {
                const daysUntilBilling = Math.ceil(
                  (new Date(sub.nextBillingDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                );
                return (
                  <tr key={sub.id} style={styles.tableRow}>
                    <td style={styles.cell}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{sub.icon}</span>
                        <span style={{ fontWeight: '600' }}>{sub.name}</span>
                      </div>
                    </td>
                    <td style={{ ...styles.cell, color: '#94a3b8' }}>
                      {sub.category}
                    </td>
                    <td
                      style={{
                        ...styles.cell,
                        textAlign: 'right',
                        color: '#10b981',
                        fontWeight: '700',
                      }}
                    >
                      ${sub.amount.toFixed(2)}
                    </td>
                    <td
                      style={{
                        ...styles.cell,
                        textAlign: 'right',
                        color:
                          daysUntilBilling <= 5
                            ? '#ef4444'
                            : daysUntilBilling <= 15
                            ? '#f59e0b'
                            : '#94a3b8',
                      }}
                    >
                      {t('in')} {daysUntilBilling} {t('days')}
                    </td>
                    <td style={{ ...styles.cell, textAlign: 'center' }}>
                      <button
                        onClick={() => handleCancel(sub.id)}
                        style={styles.miniCancelButton}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI RECOMMENDATIONS */}
      <div style={styles.recommendationsSection}>
        <h2 style={styles.sectionTitle}>💡 {t('aiRecommendations')}</h2>
        <div style={styles.recommendationsGrid}>
          <RecommendationCard
            icon="🎬"
            title={t('consolidateStreaming')}
            description={t('consolidateStreamingDesc')}
            savings="$240/año"
            color="#ef4444"
          />
          <RecommendationCard
            icon="🎨"
            title={t('adobeAlternative')}
            description={t('adobeAlternativeDesc')}
            savings="$660/año"
            color="#f59e0b"
          />
          <RecommendationCard
            icon="📊"
            title={t('optimalSpending')}
            description={t('optimalSpendingDesc').replace('{monthly}', `$${totalMonthly.toFixed(2)}`).replace('{percentage}', ((totalMonthly / 4200) * 100).toFixed(1))}
            savings={t('underControl')}
            color="#10b981"
          />
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({
  icon,
  title,
  description,
  savings,
  color,
}: {
  icon: string;
  title: string;
  description: string;
  savings: string;
  color: string;
}) {
  return (
    <div
      style={{
        ...styles.recommendationCard,
        borderLeftColor: color,
      }}
    >
      <div style={styles.recIcon}>{icon}</div>
      <div style={styles.recTitle}>{title}</div>
      <div style={styles.recDescription}>{description}</div>
      <div style={{ ...styles.recSavings, color }}>{savings}</div>
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

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '40px',
  } as React.CSSProperties,

  filterSection: {
    marginBottom: '40px',
  } as React.CSSProperties,

  filterTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '12px',
  } as React.CSSProperties,

  filterButtons: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  } as React.CSSProperties,

  filterButton: {
    padding: '8px 14px',
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '20px',
    color: '#94a3b8',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,

  filterButtonActive: {
    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    borderColor: '#06b6d4',
    color: '#fff',
  } as React.CSSProperties,

  gridSection: {
    marginBottom: '40px',
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: '20px',
    letterSpacing: '-0.3px',
  } as React.CSSProperties,

  subscriptionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  } as React.CSSProperties,

  subscriptionCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  } as React.CSSProperties,

  cardIcon: {
    fontSize: '28px',
  } as React.CSSProperties,

  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
  } as React.CSSProperties,

  badgeCategory: {
    background: 'rgba(94, 234, 212, 0.2)',
    color: '#2dd4bf',
  } as React.CSSProperties,

  cardContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },

  cardName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#e2e8f0',
  } as React.CSSProperties,

  cardPrice: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#10b981',
  } as React.CSSProperties,

  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid #334155',
  } as React.CSSProperties,

  nextBilling: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },

  nextBillingLabel: {
    fontSize: '11px',
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
  } as React.CSSProperties,

  nextBillingDate: {
    fontSize: '12px',
    color: '#06b6d4',
    fontWeight: '600',
  } as React.CSSProperties,

  cancelButton: {
    padding: '6px 12px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '4px',
    color: '#ef4444',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,

  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center' as const,
    padding: '40px',
    color: '#94a3b8',
  },

  tableSection: {
    marginBottom: '40px',
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
    padding: '14px 16px',
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: '12px',
    letterSpacing: '0.5px',
  } as React.CSSProperties,

  tableRow: {
    borderBottom: '1px solid #334155',
    transition: 'background 0.2s ease',
  } as React.CSSProperties,

  cell: {
    padding: '12px 16px',
    color: '#e2e8f0',
  } as React.CSSProperties,

  miniCancelButton: {
    width: '28px',
    height: '28px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '4px',
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,

  recommendationsSection: {
    marginBottom: '20px',
  } as React.CSSProperties,

  recommendationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
  } as React.CSSProperties,

  recommendationCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderLeft: '4px solid',
    borderRadius: '8px',
    padding: '16px',
  } as React.CSSProperties,

  recIcon: {
    fontSize: '24px',
    marginBottom: '8px',
  } as React.CSSProperties,

  recTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: '4px',
  } as React.CSSProperties,

  recDescription: {
    fontSize: '12px',
    color: '#94a3b8',
    marginBottom: '8px',
    lineHeight: '1.4',
  } as React.CSSProperties,

  recSavings: {
    fontSize: '13px',
    fontWeight: '700',
  } as React.CSSProperties,
};
