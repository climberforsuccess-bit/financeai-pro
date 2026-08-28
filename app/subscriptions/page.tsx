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
  },
];

export default function SubscriptionsPage() {
  const { t, language } = useLanguage();
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);

  const monthlyTotal = subscriptions
    .filter(s => s.billingCycle === 'monthly')
    .reduce((sum, s) => sum + s.amount, 0);

  const yearlyTotal = subscriptions
    .filter(s => s.billingCycle === 'yearly')
    .reduce((sum, s) => sum + s.amount / 12, 0);

  const totalMonthly = monthlyTotal + yearlyTotal;

  const handleCancel = (id: string) => {
    setSubscriptions(subscriptions.filter(s => s.id !== id));
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: '#0ea5e9', marginBottom: '8px' }}>
          {t('subscriptions')}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          {subscriptions.length} {subscriptions.length === 1 ? 'suscripción activa' : 'suscripciones activas'}
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
      }}>
        <Card 
          title="Monthly Subscriptions"
          value={`$${monthlyTotal.toFixed(2)}`}
          subtitle={`${subscriptions.filter(s => s.billingCycle === 'monthly').length} suscripciones`}
          icon="📅"
          textColor="#0ea5e9"
          bgColor="rgba(14, 165, 233, 0.1)"
        />
        <Card 
          title="Yearly Subscriptions"
          value={`$${yearlyTotal.toFixed(2)}/mes`}
          subtitle={`${subscriptions.filter(s => s.billingCycle === 'yearly').length} suscripciones`}
          icon="📆"
          textColor="#8b5cf6"
          bgColor="rgba(139, 92, 246, 0.1)"
        />
        <Card 
          title="Total Monthly Cost"
          value={`$${totalMonthly.toFixed(2)}`}
          subtitle={`${(totalMonthly * 12).toFixed(2)}/año`}
          icon="💰"
          textColor="#f59e0b"
          bgColor="rgba(245, 158, 11, 0.1)"
        />
      </div>

      {/* Subscriptions Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
      }}>
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            style={{
              background: '#1e293b',
              borderRadius: '12px',
              border: '1px solid #334155',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ fontSize: '32px' }}>{sub.icon}</div>
                <span style={{
                  background: 'rgba(14, 165, 233, 0.2)',
                  color: '#0ea5e9',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                }}>
                  {sub.billingCycle === 'monthly' ? 'Mensual' : 'Anual'}
                </span>
              </div>
              <div style={{ marginBottom: '4px' }}>
                <div style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: 'bold' }}>
                  {sub.name}
                </div>
                <div style={{ color: '#64748b', fontSize: '12px' }}>
                  {sub.category}
                </div>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid #334155', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Próximo pago</div>
                  <div style={{ color: '#0ea5e9', fontSize: '14px', fontWeight: 'bold' }}>
                    {new Date(sub.nextBillingDate).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Costo</div>
                  <div style={{ color: '#10b981', fontSize: '16px', fontWeight: 'bold' }}>
                    ${sub.amount.toFixed(2)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCancel(sub.id)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div style={{
        background: '#1e293b',
        borderRadius: '12px',
        border: '1px solid #334155',
        padding: '24px',
      }}>
        <h2 style={{ color: '#0ea5e9', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
          💡 Recomendaciones
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', color: '#3b82f6' }}>
            Detectamos que tienes 2 suscripciones de streaming. Considera consolidarlas para ahorrar $20/mes.
          </div>
          <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '6px', color: '#10b981' }}>
            Si cancelas Adobe Creative Cloud, ahorrarías $54.99/mes ($660/año).
          </div>
          <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '6px', color: '#f59e0b' }}>
            Tu gasto total en suscripciones es $274.46/mes. Esto es 9.8% de tus ingresos mensuales.
          </div>
        </div>
      </div>
    </div>
  );
}
