'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function RecommendationsPage() {
  const { language } = useLanguage();
  const [country, setCountry] = useState<string>('US');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => {
    // Get country from localStorage (set in Settings)
    const savedCountry = localStorage.getItem('selectedCountry') || 'US';
    setCountry(savedCountry);
  }, []);

  // COUNTRY-SPECIFIC DATA
  const countryData = {
    US: {
      cards: [
        {
          nombre: 'Chase Sapphire Preferred',
          tipo: 'Premium Travel',
          beneficio: '3x points restaurants & travel',
          uso: 'Dining & flights',
          estimado: '$75-100/month',
          emisor: 'Chase',
        },
        {
          nombre: 'American Express Gold',
          tipo: 'Premium Dining',
          beneficio: '4x points restaurants & groceries',
          uso: 'Food & grocery',
          estimado: '$60-80/month',
          emisor: 'Amex',
        },
        {
          nombre: 'Capital One Venture X',
          tipo: 'General Travel',
          beneficio: '2x miles all purchases',
          uso: 'Everything else',
          estimado: '$40-60/month',
          emisor: 'Capital One',
        },
      ],
      banks: ['Chase', 'Bank of America', 'Wells Fargo', 'US Bank', 'American Express', 'Capital One', 'Discover'],
    },
    MX: {
      cards: [
        {
          nombre: 'Scotiabank Inverlat Oro',
          tipo: 'Premium General',
          beneficio: '5% cashback restaurants, 3% viajes',
          uso: 'Comida y viajes',
          estimado: '$80-120/month',
          emisor: 'Scotiabank',
        },
        {
          nombre: 'BBVA Bancomer Infinita',
          tipo: 'Premium Elite',
          beneficio: 'Puntos en todo, 1.5x premium',
          uso: 'Todos los gastos',
          estimado: '$100-150/month',
          emisor: 'BBVA',
        },
        {
          nombre: 'Santander Actinver',
          tipo: 'General',
          beneficio: '2% en supermercados, 1% general',
          uso: 'Compras diarias',
          estimado: '$30-50/month',
          emisor: 'Santander',
        },
      ],
      banks: ['BBVA Bancomer', 'Scotiabank', 'Santander', 'Citibanamex', 'HSBC', 'Banorte', 'Inbursa'],
    },
    ES: {
      cards: [
        {
          nombre: 'Caixabank Visa Oro',
          tipo: 'Premium General',
          beneficio: '1% cashback, seguros incluidos',
          uso: 'Gastos generales',
          estimado: '$40-60/month',
          emisor: 'CaixaBank',
        },
        {
          nombre: 'BBVA Visa Oro',
          tipo: 'Premium Travel',
          beneficio: '1.5x puntos viajes, 1% cashback',
          uso: 'Viajes y ocio',
          estimado: '$50-80/month',
          emisor: 'BBVA',
        },
        {
          nombre: 'Santander Preferente',
          tipo: 'General',
          beneficio: 'Puntos flexibles en todo',
          uso: 'Compras cotidianas',
          estimado: '$25-40/month',
          emisor: 'Santander',
        },
      ],
      banks: ['CaixaBank', 'BBVA', 'Santander', 'ING Direct', 'Openbank', 'Revolut', 'N26'],
    },
    AR: {
      cards: [
        {
          nombre: 'ICBC Visa Signature',
          tipo: 'Premium General',
          beneficio: 'Puntos en todo, 1.5x especiales',
          uso: 'Gastos en general',
          estimado: '400-600 ARS/month',
          emisor: 'ICBC',
        },
        {
          nombre: 'Banco Galicia Elegance',
          tipo: 'Premium Travel',
          beneficio: 'Millas aeroméxico, seguros viaje',
          uso: 'Viajes y premium',
          estimado: '500-750 ARS/month',
          emisor: 'Galicia',
        },
        {
          nombre: 'Banco Santander Activa',
          tipo: 'General',
          beneficio: '2% en supermercados locales',
          uso: 'Compras locales',
          estimado: '200-350 ARS/month',
          emisor: 'Santander',
        },
      ],
      banks: ['ICBC', 'Banco Galicia', 'Santander', 'Banco Nación', 'HSBC', 'Scotiabank', 'Brubank'],
    },
    CO: {
      cards: [
        {
          nombre: 'Banco de Bogotá Visa Platinum',
          tipo: 'Premium General',
          beneficio: 'Puntos en todo, viajes asegurados',
          uso: 'Gastos generales',
          estimado: '80,000-120,000 COP/month',
          emisor: 'Banco de Bogotá',
        },
        {
          nombre: 'BBVA Visa Oro',
          tipo: 'Premium Elite',
          beneficio: '1.5x puntos restaurantes y viajes',
          uso: 'Comida y viajes',
          estimado: '100,000-150,000 COP/month',
          emisor: 'BBVA',
        },
        {
          nombre: 'Scotiabank Inverlat',
          tipo: 'General',
          beneficio: 'Puntos en compras, seguros básicos',
          uso: 'Uso general',
          estimado: '50,000-80,000 COP/month',
          emisor: 'Scotiabank',
        },
      ],
      banks: ['Banco de Bogotá', 'BBVA Colombia', 'Scotiabank Colpatria', 'Banco Popular', 'Bancolombia', 'HSBC', 'Citibank'],
    },
  };

  const content = {
    es: {
      title: 'Recomendaciones Inteligentes',
      subtitle: 'Basadas en tu país y patrones de consumo',
      countryLabel: 'País Seleccionado:',
      ahorroTotal: 'Ahorro Potencial Total',
      recomendaciones: [
        {
          id: 'subscriptions',
          icon: '🎬',
          titulo: 'Auditoría de Suscripciones',
          descripcion: 'Encontramos 4 suscripciones que podrías cancelar',
          ahorro: '$47.99',
          detalle: 'Netflix, Disney+, HBO Max, Spotify Premium - considera planes familiares',
          accion: 'Revisar Suscripciones',
          prioridad: 'alta',
        },
        {
          id: 'dining',
          icon: '🍔',
          titulo: 'Optimizar Gastos de Comida',
          descripcion: 'Tu gasto en restaurantes es 3x más que el promedio',
          ahorro: '$320/mes',
          detalle: 'Usa tarjetas con cashback premium en restaurantes para maximizar retorno',
          accion: 'Ver Detalles',
          prioridad: 'alta',
        },
        {
          id: 'grocery',
          icon: '🛒',
          titulo: 'Supermercados con Cashback',
          descripcion: 'Usa tarjetas con beneficios en supermercados',
          ahorro: '$45-80/mes',
          detalle: 'Asigna tarjeta con cashback en supermercados para tus compras de alimentos',
          accion: 'Tarjetas Optimizadas',
          prioridad: 'media',
        },
        {
          id: 'utilities',
          icon: '⚡',
          titulo: 'Reducir Servicios Básicos',
          descripcion: 'Revisa tu consumo de energía y servicios',
          ahorro: '$30-50/mes',
          detalle: 'Consumo actual por encima del promedio - ajusta y ahorra',
          accion: 'Consejos de Ahorro',
          prioridad: 'media',
        },
        {
          id: 'cashback',
          icon: '💰',
          titulo: 'Estrategia de Cashback',
          descripcion: 'Reorganiza tarjetas según categoría de gasto',
          ahorro: '$120-180/mes',
          detalle: 'Cada tarjeta para su categoría específica: máximo retorno garantizado',
          accion: 'Ver Estrategia',
          prioridad: 'media',
        },
        {
          id: 'insurance',
          icon: '🛡️',
          titulo: 'Revisar Seguros',
          descripcion: 'Consolidación de pólizas disponible',
          ahorro: '$50-100/mes',
          detalle: 'Muchas tarjetas premium incluyen seguros - verifica beneficios incluidos',
          accion: 'Comparar',
          prioridad: 'baja',
        },
      ],
      stats: [
        { label: 'Gastos Totales Este Mes', value: '$4,250' },
        { label: 'Potencial de Ahorro', value: '$612-658' },
        { label: 'Oportunidades de Optimización', value: '6' },
        { label: 'Retorno Estimado Mensual', value: '$102-118' },
      ],
      sectionCardStrategy: 'Estrategia de Tarjetas Recomendada',
      sectionBanks: 'Bancos Disponibles en',
      cardStrategyNote: 'Estas tarjetas están optimizadas para tu país y ofrecen los mejores beneficios disponibles.',
      viewMore: 'Ver más tarjetas en Comparador',
    },
    en: {
      title: 'Smart Recommendations',
      subtitle: 'Based on your country and spending patterns',
      countryLabel: 'Selected Country:',
      ahorroTotal: 'Total Potential Savings',
      recomendaciones: [
        {
          id: 'subscriptions',
          icon: '🎬',
          titulo: 'Subscription Audit',
          descripcion: 'We found 4 subscriptions you could cancel',
          ahorro: '$47.99',
          detalle: 'Netflix, Disney+, HBO Max, Spotify Premium - consider family plans',
          accion: 'Review Subscriptions',
          prioridad: 'alta',
        },
        {
          id: 'dining',
          icon: '🍔',
          titulo: 'Optimize Dining Expenses',
          descripcion: 'Your dining spending is 3x above average',
          ahorro: '$320/month',
          detalle: 'Use premium cashback cards at restaurants to maximize rewards',
          accion: 'See Details',
          prioridad: 'alta',
        },
        {
          id: 'grocery',
          icon: '🛒',
          titulo: 'Grocery Shopping Rewards',
          descripcion: 'Use cards with grocery benefits',
          ahorro: '$45-80/month',
          detalle: 'Assign cashback card for grocery shopping to earn on essentials',
          accion: 'Optimized Cards',
          prioridad: 'media',
        },
        {
          id: 'utilities',
          icon: '⚡',
          titulo: 'Reduce Utilities',
          descripcion: 'Review your energy consumption',
          ahorro: '$30-50/month',
          detalle: 'Current usage above average - adjust and save',
          accion: 'Savings Tips',
          prioridad: 'media',
        },
        {
          id: 'cashback',
          icon: '💰',
          titulo: 'Cashback Strategy',
          descripcion: 'Organize cards by spending category',
          ahorro: '$120-180/month',
          detalle: 'Each card for its specific category: maximum returns guaranteed',
          accion: 'View Strategy',
          prioridad: 'media',
        },
        {
          id: 'insurance',
          icon: '🛡️',
          titulo: 'Review Insurance',
          descripcion: 'Policy consolidation available',
          ahorro: '$50-100/month',
          detalle: 'Many premium cards include insurance - check your benefits',
          accion: 'Compare',
          prioridad: 'baja',
        },
      ],
      stats: [
        { label: 'Total Spending This Month', value: '$4,250' },
        { label: 'Savings Potential', value: '$612-658' },
        { label: 'Optimization Opportunities', value: '6' },
        { label: 'Estimated Monthly Return', value: '$102-118' },
      ],
      sectionCardStrategy: 'Recommended Card Strategy',
      sectionBanks: 'Available Banks in',
      cardStrategyNote: 'These cards are optimized for your country and offer the best available benefits.',
      viewMore: 'View more cards in Comparator',
    },
  };

  const curr = content[language as keyof typeof content];
  const cards = (countryData[country as keyof typeof countryData] || countryData.US).cards;
  const banks = (countryData[country as keyof typeof countryData] || countryData.US).banks;

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return '#ef4444';
      case 'media':
        return '#f59e0b';
      case 'baja':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div style={styles.root}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <h1 style={styles.title}>{curr.title}</h1>
          <div style={styles.countryBadge}>
            {curr.countryLabel} <strong>{country}</strong>
          </div>
        </div>
        <p style={styles.subtitle}>{curr.subtitle}</p>
      </div>

      {/* STATS GRID */}
      <div style={styles.statsGrid}>
        {curr.stats.map((stat, idx) => (
          <div key={idx} style={styles.statCard}>
            <div style={styles.statLabel}>{stat.label}</div>
            <div style={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* RECOMENDACIONES */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>💡 {language === 'es' ? 'Recomendaciones Personalizadas' : 'Personalized Recommendations'}</h2>
        <div style={styles.cardsGrid}>
          {curr.recomendaciones.map((rec) => (
            <div
              key={rec.id}
              style={{
                ...styles.recommendationCard,
                borderLeftColor: getPriorityColor(rec.prioridad),
              }}
              onClick={() => setExpandedCard(expandedCard === rec.id ? null : rec.id)}
            >
              <div style={styles.cardHeader}>
                <div style={styles.cardIcon}>{rec.icon}</div>
                <div style={styles.cardInfo}>
                  <h3 style={styles.cardTitle}>{rec.titulo}</h3>
                  <p style={styles.cardDesc}>{rec.descripcion}</p>
                </div>
                <div style={styles.cardAhorro}>{rec.ahorro}</div>
              </div>

              {expandedCard === rec.id && (
                <div style={styles.cardExpanded}>
                  <p style={styles.cardDetalle}>{rec.detalle}</p>
                  <button style={styles.actionButton}>{rec.accion} →</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CARD STRATEGIES */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>💳 {curr.sectionCardStrategy}</h2>
        <p style={styles.cardStrategyNote}>{curr.cardStrategyNote}</p>
        <div style={styles.strategiesGrid}>
          {cards.map((strategy, idx) => (
            <div key={idx} style={styles.strategyCard}>
              <div style={styles.strategyHeader}>
                <h4 style={styles.strategyName}>{strategy.nombre}</h4>
                <span style={styles.strategyType}>{strategy.tipo}</span>
              </div>
              <div style={styles.strategyBenefit}>
                <span style={styles.benefitLabel}>{language === 'es' ? 'Beneficio' : 'Benefit'}:</span>
                <span style={styles.benefitValue}>{strategy.beneficio}</span>
              </div>
              <div style={styles.strategyUso}>
                <span style={styles.usoLabel}>{language === 'es' ? 'Usar en' : 'Use for'}:</span>
                <span>{strategy.uso}</span>
              </div>
              <div style={styles.emisor}>
                <span style={styles.emisorLabel}>{language === 'es' ? 'Emisor' : 'Issuer'}:</span>
                <strong>{strategy.emisor}</strong>
              </div>
              <div style={styles.estimatedReturn}>
                {language === 'es' ? 'Retorno Estimado' : 'Estimated Return'}:
                <strong> {strategy.estimado}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AVAILABLE BANKS */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🏦 {curr.sectionBanks} {country}</h2>
        <div style={styles.banksContainer}>
          {banks.map((bank, idx) => (
            <span key={idx} style={styles.bankBadge}>
              {bank}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.ctaSection}>
        <h3 style={styles.ctaTitle}>
          {language === 'es'
            ? '¿Listo para optimizar tus gastos?'
            : 'Ready to optimize your spending?'}
        </h3>
        <p style={styles.ctaDesc}>
          {language === 'es'
            ? 'Las tarjetas recomendadas están disponibles en tu país. Implementa la estrategia hoy.'
            : 'The recommended cards are available in your country. Implement the strategy today.'}
        </p>
        <button style={styles.ctaButton}>
          {language === 'es' ? 'Empezar Ahora' : 'Get Started'} →
        </button>
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

  header: {
    marginBottom: '48px',
  } as React.CSSProperties,

  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  } as React.CSSProperties,

  title: {
    fontSize: '32px',
    fontWeight: '800',
    margin: 0,
    letterSpacing: '-0.5px',
  } as React.CSSProperties,

  countryBadge: {
    background: 'rgba(6, 182, 212, 0.1)',
    border: '1px solid #06b6d4',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '12px',
    color: '#06b6d4',
    fontWeight: '600',
  } as React.CSSProperties,

  subtitle: {
    fontSize: '16px',
    color: '#94a3b8',
    margin: 0,
  } as React.CSSProperties,

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '48px',
  } as React.CSSProperties,

  statCard: {
    background: 'linear-gradient(135deg, #1e293b, #0f172a)',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
  } as React.CSSProperties,

  statLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: '8px',
  } as React.CSSProperties,

  statValue: {
    fontSize: '24px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as React.CSSProperties,

  section: {
    marginBottom: '64px',
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '24px',
    letterSpacing: '-0.3px',
  } as React.CSSProperties,

  cardStrategyNote: {
    fontSize: '13px',
    color: '#94a3b8',
    marginBottom: '20px',
    fontStyle: 'italic',
  } as React.CSSProperties,

  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '16px',
  } as React.CSSProperties,

  recommendationCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderLeft: '4px solid #ef4444',
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,

  cardHeader: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  } as React.CSSProperties,

  cardIcon: {
    fontSize: '28px',
    minWidth: '40px',
  } as React.CSSProperties,

  cardInfo: {
    flex: 1,
  } as React.CSSProperties,

  cardTitle: {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '4px',
    margin: 0,
  } as React.CSSProperties,

  cardDesc: {
    fontSize: '13px',
    color: '#94a3b8',
    margin: 0,
  } as React.CSSProperties,

  cardAhorro: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#10b981',
    minWidth: '80px',
    textAlign: 'right',
  } as React.CSSProperties,

  cardExpanded: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #334155',
  } as React.CSSProperties,

  cardDetalle: {
    fontSize: '13px',
    color: '#cbd5e1',
    marginBottom: '12px',
    lineHeight: '1.6',
    margin: 0,
  } as React.CSSProperties,

  actionButton: {
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,

  strategiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
  } as React.CSSProperties,

  strategyCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
  } as React.CSSProperties,

  strategyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  } as React.CSSProperties,

  strategyName: {
    fontSize: '16px',
    fontWeight: '700',
    margin: 0,
  } as React.CSSProperties,

  strategyType: {
    fontSize: '11px',
    background: 'rgba(6, 182, 212, 0.1)',
    color: '#06b6d4',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: '600',
  } as React.CSSProperties,

  strategyBenefit: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #334155',
  } as React.CSSProperties,

  benefitLabel: {
    color: '#94a3b8',
    fontSize: '13px',
  } as React.CSSProperties,

  benefitValue: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#10b981',
  } as React.CSSProperties,

  strategyUso: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    fontSize: '13px',
    color: '#cbd5e1',
    borderBottom: '1px solid #334155',
  } as React.CSSProperties,

  usoLabel: {
    color: '#94a3b8',
  } as React.CSSProperties,

  emisor: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    fontSize: '13px',
    color: '#cbd5e1',
    borderBottom: '1px solid #334155',
  } as React.CSSProperties,

  emisorLabel: {
    color: '#94a3b8',
  } as React.CSSProperties,

  estimatedReturn: {
    marginTop: '12px',
    fontSize: '12px',
    color: '#94a3b8',
  } as React.CSSProperties,

  banksContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  } as React.CSSProperties,

  bankBadge: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#cbd5e1',
  } as React.CSSProperties,

  ctaSection: {
    background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
    borderRadius: '12px',
    padding: '48px',
    textAlign: 'center',
    color: '#0f172a',
  } as React.CSSProperties,

  ctaTitle: {
    fontSize: '28px',
    fontWeight: '800',
    marginBottom: '12px',
    margin: 0,
  } as React.CSSProperties,

  ctaDesc: {
    fontSize: '16px',
    marginBottom: '24px',
    opacity: 0.9,
  } as React.CSSProperties,

  ctaButton: {
    background: '#0f172a',
    color: '#06b6d4',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 28px',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,
};
