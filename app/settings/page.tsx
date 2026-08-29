'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const [currentPlan, setCurrentPlan] = useState('pro');
  const [email, setEmail] = useState('juan.perez@example.com');

  const plans = [
    {
      id: 'free',
      name: t('planFree'),
      price: '$0',
      features: [t('featureBasicDashboard'), t('featureLimitedTx'), t('featureNoAI')],
    },
    {
      id: 'personal',
      name: t('planPersonal'),
      price: '$9.99',
      features: [t('featureCompleteDashboard'), t('featureUnlimitedTx'), t('featureBasicAI'), t('featureScanReceipts')],
    },
    {
      id: 'pro',
      name: t('planPro'),
      price: '$19.99',
      features: [t('featureEverythingPersonal'), t('featureAdvancedAI'), t('featureExpenseAnalysis'), t('featureExportPDF')],
    },
    {
      id: 'business',
      name: t('planBusiness'),
      price: '$49.99',
      features: [t('featureEverythingPro'), t('featureMultiProfiles'), t('featurePrioritySupport'), t('featureAPIAccess')],
    },
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: '#0ea5e9', marginBottom: '8px' }}>
          {t('settingsTitle')}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          {t('manageAccount')}
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '40px',
        borderBottom: '1px solid #334155',
        paddingBottom: '20px',
      }}>
        <button style={{
          padding: '8px 16px',
          background: 'transparent',
          border: 'none',
          color: '#0ea5e9',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
          borderBottom: '2px solid #0ea5e9',
        }}>
          {t('accountTab')}
        </button>
        <button style={{
          padding: '8px 16px',
          background: 'transparent',
          border: 'none',
          color: '#94a3b8',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}>
          {t('notificationsTab')}
        </button>
        <button style={{
          padding: '8px 16px',
          background: 'transparent',
          border: 'none',
          color: '#94a3b8',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}>
          {t('privacyTab')}
        </button>
      </div>

      {/* Current Plan Section */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#0ea5e9', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          {t('currentPlan')}
        </h2>
        <div style={{
          background: '#1e293b',
          borderRadius: '12px',
          border: '2px solid #0ea5e9',
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '4px' }}>
              {t('yourCurrentPlan')}
            </div>
            <div style={{ color: '#0ea5e9', fontSize: '28px', fontWeight: 'bold' }}>
              {t('financeAIProPlan')}
            </div>
            <div style={{ color: '#64748b', fontSize: '12px', marginTop: '8px' }}>
              {t('renewalDate')}
            </div>
          </div>
          <button style={{
            padding: '12px 24px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '6px',
            color: '#ef4444',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>
            {t('cancelSubscription')}
          </button>
        </div>
      </div>

      {/* Plans Section */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#0ea5e9', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          {t('changePlan')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setCurrentPlan(plan.id)}
              style={{
                background: '#1e293b',
                borderRadius: '12px',
                border: currentPlan === plan.id ? '2px solid #0ea5e9' : '1px solid #334155',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (currentPlan !== plan.id) {
                  e.currentTarget.style.borderColor = '#0ea5e9';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPlan !== plan.id) {
                  e.currentTarget.style.borderColor = '#334155';
                }
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <div style={{ color: '#e2e8f0', fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
                  {plan.name}
                </div>
                <div style={{ color: '#0ea5e9', fontSize: '24px', fontWeight: 'bold' }}>
                  {plan.price}
                </div>
                <div style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>
                  {t('perMonth')}
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', display: 'flex', gap: '8px' }}>
                    <span>✓</span> {feature}
                  </li>
                ))}
              </ul>
              {currentPlan === plan.id && (
                <button
                  style={{
                    width: '100%',
                    marginTop: '16px',
                    padding: '10px 12px',
                    background: '#0ea5e9',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  {t('currentPlanButton')}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Language Section */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#0ea5e9', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          {t('language')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {['es', 'en'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang as 'es' | 'en')}
              style={{
                padding: '16px',
                background: language === lang ? '#0ea5e9' : '#1e293b',
                border: language === lang ? 'none' : '1px solid #334155',
                borderRadius: '8px',
                color: language === lang ? '#fff' : '#94a3b8',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {lang === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}
            </button>
          ))}
        </div>
      </div>

      {/* Account Section */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#0ea5e9', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          {t('accountSection')}
        </h2>
        <div style={{
          background: '#1e293b',
          borderRadius: '12px',
          border: '1px solid #334155',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
              {t('emailLabel')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '6px',
                color: '#e2e8f0',
                fontSize: '14px',
              }}
            />
          </div>
          <button style={{
            padding: '10px 20px',
            background: '#0ea5e9',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            alignSelf: 'flex-start',
          }}>
            {t('changePassword')}
          </button>
        </div>
      </div>

      {/* Legal Section */}
      <div style={{
        background: '#1e293b',
        borderRadius: '12px',
        border: '1px solid #334155',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        <h3 style={{ color: '#0ea5e9', fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
          {t('legalSection')}
        </h3>
        <a href="#" style={{ color: '#0ea5e9', textDecoration: 'none', fontSize: '14px' }}>
          📋 {t('termsOfService')}
        </a>
        <a href="#" style={{ color: '#0ea5e9', textDecoration: 'none', fontSize: '14px' }}>
          🔒 {t('privacyPolicy')}
        </a>
        <a href="#" style={{ color: '#0ea5e9', textDecoration: 'none', fontSize: '14px' }}>
          ⚖️ {t('legalTerms')}
        </a>
      </div>
    </div>
  );
}
