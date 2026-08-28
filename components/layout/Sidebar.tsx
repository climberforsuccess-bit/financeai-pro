'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function Sidebar() {
  const { language, t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const clientName = 'Juan Pérez';
  const planName = language === 'es' ? 'Plan Pro' : 'Pro Plan';
  const clientInitial = clientName.charAt(0).toUpperCase();

  const menuItems = [
    { href: '/dashboard', label: t('dashboard'), icon: '📊' },
    { href: '/transactions', label: t('transactions'), icon: '💰' },
    { href: '/cards', label: t('myCards'), icon: '💳' },
    { href: '/debt-plan', label: t('debtPlan'), icon: '📉' },
    { href: '/subscriptions', label: t('subscriptions'), icon: '🔄' },
    { href: '/scanner', label: t('scannerReceipt'), icon: '📸' },
    { href: '/settings', label: t('settings'), icon: '⚙️' },
  ];

  return (
    <aside style={{
      width: isCollapsed ? '80px' : '250px',
      background: '#1e293b',
      borderRight: '1px solid #334155',
      padding: '20px',
      height: '100vh',
      overflowY: 'auto',
      transition: 'width 0.3s',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>💰</span>
            {!isCollapsed && <span style={{ color: '#0ea5e9', fontSize: '16px', fontWeight: 'bold' }}>FinanceAI Pro</span>}
          </div>
          {!isCollapsed && (
            <span style={{ color: '#64748b', fontSize: '11px', marginLeft: '34px' }}>
              by climberforsuccess
            </span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            fontSize: '18px',
            padding: 0,
          }}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav style={{ marginBottom: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li key={item.href} style={{ marginBottom: '10px' }}>
              <Link
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  color: '#94a3b8',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#334155';
                  e.currentTarget.style.color = '#0ea5e9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                {!isCollapsed && <span style={{ fontSize: '14px' }}>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ borderTop: '1px solid #334155', paddingTop: '20px', marginTop: 'auto' }}>
        {!isCollapsed ? (
          <div>
            <div style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}>
              {language === 'es' ? 'Cliente' : 'Client'}
            </div>
            <div style={{ color: '#0ea5e9', fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
              {clientName}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}>
              {language === 'es' ? 'Plan' : 'Plan'}
            </div>
            <div style={{ 
              display: 'inline-block',
              background: 'rgba(14, 165, 233, 0.1)',
              color: '#0ea5e9',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}>
              {planName}
            </div>
          </div>
        ) : (
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            background: 'rgba(14, 165, 233, 0.2)',
            borderRadius: '6px',
            color: '#0ea5e9',
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '0 auto',
            flexShrink: 0,
          }}>
            {clientInitial}
          </div>
        )}
      </div>
    </aside>
  );
}
