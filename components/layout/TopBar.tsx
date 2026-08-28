'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export function TopBar() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{
      background: '#0f172a',
      borderBottom: '1px solid #334155',
      padding: '12px 40px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '20px',
    }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setLanguage('es')}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: language === 'es' ? '1px solid #0ea5e9' : '1px solid #334155',
            background: language === 'es' ? '#0f172a' : 'transparent',
            color: language === 'es' ? '#0ea5e9' : '#94a3b8',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            transition: 'all 0.2s',
          }}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: language === 'en' ? '1px solid #0ea5e9' : '1px solid #334155',
            background: language === 'en' ? '#0f172a' : 'transparent',
            color: language === 'en' ? '#0ea5e9' : '#94a3b8',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            transition: 'all 0.2s',
          }}
        >
          EN
        </button>
      </div>
    </div>
  );
}
