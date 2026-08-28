'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function RecommendationsPage() {
  const { language } = useLanguage();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const content = {
    es: {
      title: 'Recomendaciones Inteligentes',
      subtitle: 'Basadas en tu análisis de gastos y patrones de consumo',
      ahorroTotal: 'Ahorro Potencial Total',
      recomendaciones: [
        {
          id: 'subscriptions',
          icon: '🎬',
          titulo: 'Auditoría de Suscripciones',
          descripcion: 'Encontramos 4 suscripciones que podrías cancelar',
          ahorro: '$47.99',
          detalle: 'Netflix ($15.99), Disney+ ($10.99), HBO Max ($9.99), Spotify Premium ($11.99 - considera el plan familiar)',
          accion: 'Revisar Suscripciones',
          prioridad: 'alta',
        },
        {
          id: 'dining',
          icon: '🍔',
          titulo: 'Reducir Gastos de Comida',
          descripcion: 'Tu gasto en restaurantes es 3x más que el promedio',
          ahorro: '$320/mes',
          detalle: 'Promedio de $1,280/mes en dining. Considera cocinar en casa 2 veces más por semana.',
          accion: 'Ver Detalles',
          prioridad: 'alta',
        },
        {
          id: 'grocery',
          icon: '🛒',
          titulo: 'Optimizar Compras de Supermercado',
          descripcion: 'Usa cashback en tarjetas de crédito específicas',
          ahorro: '$45-80/mes',
          detalle: 'Usa tu tarjeta con 3% cashback en supermercados. Gasto mensual: $600-800.',
          accion: 'Tarjetas Optimizadas',
          prioridad: 'media',
        },
        {
          id: 'utilities',
          icon: '⚡',
          titulo: 'Reducir Servicios Básicos',
          descripcion: 'Tu consumo de energía está por encima del promedio',
          ahorro: '$30-50/mes',
          detalle: 'Considera cambiar a energía verde o ajustar termostato. Consumo actual: $180/mes.',
          accion: 'Consejos de Ahorro',
          prioridad: 'media',
        },
        {
          id: 'cashback',
          icon: '💰',
          titulo: 'Maximizar Cashback',
          descripcion: 'Reorganiza tus tarjetas según categoría de gasto',
          ahorro: '$120-180/mes',
          detalle: 'Usa tarjeta A (5% dining), Tarjeta B (3% grocery), Tarjeta C (2% todo lo demás).',
          accion: 'Ver Estrategia',
          prioridad: 'media',
        },
        {
          id: 'insurance',
          icon: '🛡️',
          titulo: 'Revisar Seguros',
          descripcion: 'Posible consolidación de pólizas',
          ahorro: '$50-100/mes',
          detalle: 'Contacta a tu aseguradora para paquetes bundle o descuentos por cliente leal.',
          accion: 'Comparar Opciones',
          prioridad: 'baja',
        },
      ],
      cardStrategies: [
        {
          nombre: 'Tarjeta A',
          tipo: 'Premium Dining',
          beneficio: '5% en restaurantes',
          uso: 'Comida y bebida',
          estimado: '$64/mes',
        },
        {
          nombre: 'Tarjeta B',
          tipo: 'Grocery Master',
          beneficio: '3% supermercados',
          uso: 'Compras de alimentos',
          estimado: '$18-24/mes',
        },
        {
          nombre: 'Tarjeta C',
          tipo: 'General',
          beneficio: '2% todo lo demás',
          uso: 'Otros gastos',
          estimado: '$20-30/mes',
        },
      ],
      stats: [
        { label: 'Gastos Totales Este Mes', value: '$4,250' },
        { label: 'Potencial de Ahorro', value: '$612-658' },
        { label: 'Oportunidades de Optimización', value: '6' },
        { label: 'Cashback Estimado Mensual', value: '$102-118' },
      ],
    },
    en: {
      title: 'Smart Recommendations',
      subtitle: 'Based on your spending analysis and consumption patterns',
      ahorroTotal: 'Total Potential Savings',
      recomendaciones: [
        {
          id: 'subscriptions',
          icon: '🎬',
          titulo: 'Subscription Audit',
          descripcion: 'We found 4 subscriptions you could cancel',
          ahorro: '$47.99',
          detalle: 'Netflix ($15.99), Disney+ ($10.99), HBO Max ($9.99), Spotify Premium ($11.99 - consider family plan)',
          accion: 'Review Subscriptions',
          prioridad: 'alta',
        },
        {
          id: 'dining',
          icon: '🍔',
          titulo: 'Reduce Dining Expenses',
          descripcion: 'Your dining spending is 3x above average',
          ahorro: '$320/month',
          detalle: 'Average $1,280/month dining out. Try cooking at home 2x more per week.',
          accion: 'See Details',
          prioridad: 'alta',
        },
        {
          id: 'grocery',
          icon: '🛒',
          titulo: 'Optimize Grocery Shopping',
          descripcion: 'Use cashback on specific credit cards',
          ahorro: '$45-80/month',
          detalle: 'Use your 3% cashback card at grocery stores. Monthly spend: $600-800.',
          accion: 'Optimized Cards',
          prioridad: 'media',
        },
        {
          id: 'utilities',
          icon: '⚡',
          titulo: 'Reduce Utilities',
          descripcion: 'Your energy consumption is above average',
          ahorro: '$30-50/month',
          detalle: 'Switch to green energy or adjust thermostat. Current: $180/month.',
          accion: 'Savings Tips',
          prioridad: 'media',
        },
        {
          id: 'cashback',
          icon: '💰',
          titulo: 'Maximize Cashback',
          descripcion: 'Reorganize cards by spending category',
          ahorro: '$120-180/month',
          detalle: 'Card A (5% dining), Card B (3% grocery), Card C (2% everything else).',
          accion: 'View Strategy',
          prioridad: 'media',
        },
        {
          id: 'insurance',
          icon: '🛡️',
          titulo: 'Review Insurance',
          descripcion: 'Possible policy consolidation',
          ahorro: '$50-100/month',
          detalle: 'Contact insurer for bundle packages or loyalty discounts.',
          accion: 'Compare Options',
          prioridad: 'baja',
        },
      ],
      cardStrategies: [
        {
          nombre: 'Card A',
          tipo: 'Premium Dining',
          beneficio: '5% restaurants',
          uso: 'Food & Beverage',
          estimado: '$64/month',
        },
        {
          nombre: 'Card B',
          tipo: 'Grocery Master',
          beneficio: '3% groceries',
          uso: 'Food Shopping',
          estimado: '$18-24/month',
        },
        {
          nombre: 'Card C',
          tipo: 'General',
          beneficio: '2% everything else',
          uso: 'Other spending',
          estimado: '$20-30/month',
        },
      ],
      stats: [
        { label: 'Total Spending This Month', value: '$4,250' },
        { label: 'Savings Potential', value: '$612-658' },
        { label: 'Optimization Opportunities', value: '6' },
        { label: 'Estimated Monthly Cashback', value: '$102-118' },
      ],
    },
  };

  const curr = content[language as keyof typeof content];
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
        <h1 style={styles.title}>{curr.title}</h1>
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
        <h2 style={styles.sectionTitle}>💳 {language === 'es' ? 'Estrategia de Tarjetas' : 'Card Strategy'}</h2>
        <div style={styles.strategiesGrid}>
          {curr.cardStrategies.map((strategy, idx) => (
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
              <div style={styles.estimatedReturn}>
                {language === 'es' ? 'Retorno Estimado' : 'Estimated Return'}:
                <strong> {strategy.estimado}</strong>
              </div>
            </div>
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
            ? 'Implementa estas recomendaciones y comienza a ahorrar hoy.'
            : 'Implement these recommendations and start saving today.'}
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

  title: {
    fontSize: '32px',
    fontWeight: '800',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  } as React.CSSProperties,

  subtitle: {
    fontSize: '16px',
    color: '#94a3b8',
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
  } as React.CSSProperties,

  cardDesc: {
    fontSize: '13px',
    color: '#94a3b8',
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
  } as React.CSSProperties,

  usoLabel: {
    color: '#94a3b8',
  } as React.CSSProperties,

  estimatedReturn: {
    marginTop: '12px',
    fontSize: '12px',
    color: '#94a3b8',
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
