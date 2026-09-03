'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingPage() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>⚡</span>
            <span>FinanceAI Pro</span>
          </div>
          
          <div style={{ ...styles.navMenu, display: mobileMenuOpen ? 'flex' : 'none' }}>
            <a href="#features" style={styles.navLink}>{t('features')}</a>
            <a href="#pricing" style={styles.navLink}>{t('pricing')}</a>
            <a href="#about" style={styles.navLink}>{t('about')}</a>
          </div>

          <div style={styles.navRight}>
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              style={styles.langBtn}
            >
              {language === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={styles.mobileMenuBtn}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            {t('hero_title')}
          </h1>
          <p style={styles.heroDesc}>
            {t('hero_subtitle')}
          </p>
          <Link href="/auth/signup">
            <button style={{ ...styles.ctaButton, ...styles.heroCtaButton }}>
              {t('get_started_free')}
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.features} id="features">
        <h2 style={styles.sectionTitle}>{t('key_features')}</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>📸</span>
            <h3 style={styles.featureTitle}>{t('receipt_scanner')}</h3>
            <p style={styles.featureDesc}>{t('receipt_scanner_desc')}</p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>💡</span>
            <h3 style={styles.featureTitle}>{t('ai_recommendations')}</h3>
            <p style={styles.featureDesc}>{t('ai_recommendations_desc')}</p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>📈</span>
            <h3 style={styles.featureTitle}>{t('debt_strategy')}</h3>
            <p style={styles.featureDesc}>{t('debt_strategy_desc')}</p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>💳</span>
            <h3 style={styles.featureTitle}>{t('subscription_management')}</h3>
            <p style={styles.featureDesc}>{t('subscription_management_desc')}</p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>📊</span>
            <h3 style={styles.featureTitle}>{t('detailed_reports')}</h3>
            <p style={styles.featureDesc}>{t('detailed_reports_desc')}</p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🎯</span>
            <h3 style={styles.featureTitle}>{t('savings_goals')}</h3>
            <p style={styles.featureDesc}>{t('savings_goals_desc')}</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={styles.pricing} id="pricing">
        <h2 style={styles.sectionTitle}>{t('pricing_title')}</h2>
        <div style={styles.pricingGrid}>
          {['free', 'personal', 'pro', 'business'].map((plan) => (
            <div
              key={plan}
              style={{
                ...styles.pricingCard,
                ...(plan === 'pro' ? styles.pricingCardHighlight : {}),
              }}
            >
              <h3 style={styles.planName}>{t(`plan_${plan}`)}</h3>
              <div style={styles.planPrice}>
                ${t(`price_${plan}`)}
                <span style={styles.pricePeriod}>{t('per_month')}</span>
              </div>
              <p style={styles.planDesc}>{t(`plan_${plan}_desc`)}</p>
              <button style={{ ...styles.planButton, ...(plan === 'pro' ? styles.planButtonHighlight : {}) }}>
                {t('subscribe')}
              </button>
              <ul style={styles.planFeatures}>
                {t(`features_${plan}`).split('|').map((feat, idx) => (
                  <li key={idx} style={styles.planFeature}>{feat.trim()}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={styles.finalCta}>
        <h2 style={styles.ctaTitle}>{t('ready_to_start')}</h2>
        <p style={styles.ctaDesc}>{t('cta_description')}</p>
        <Link href="/auth/signup">
          <button style={{ ...styles.ctaButton, ...styles.finalCtaButton }}>
            {t('get_started_free')}
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerBrand}>
            <h3>FinanceAI Pro</h3>
            <p style={styles.footerCopy}>© 2024. {t('all_rights_reserved')}</p>
          </div>
          <div style={styles.footerLinks}>
            <a href="/auth/login" style={styles.footerLink}>{t('login')}</a>
            <a href="/auth/signup" style={styles.footerLink}>{t('signup')}</a>
            <a href="/terms" style={styles.footerLink}>{t('terms')}</a>
            <a href="/privacy" style={styles.footerLink}>{t('privacy')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: '#0f172a',
    color: '#e2e8f0',
    minHeight: '100vh',
  },
  navbar: {
    background: '#0f172a',
    borderBottom: '1px solid #334155',
    padding: '16px 32px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '20px',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoIcon: {
    fontSize: '24px',
  },
  navMenu: {
    display: 'flex',
    gap: '32px',
    flex: 1,
    justifyContent: 'center',
  },
  navLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  navRight: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  langBtn: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#06b6d4',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
  },
  mobileMenuBtn: {
    background: 'transparent',
    border: 'none',
    color: '#e2e8f0',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'none',
  },
  hero: {
    padding: '120px 32px',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroDesc: {
    fontSize: '16px',
    color: '#94a3b8',
    marginBottom: '32px',
    lineHeight: '1.6',
  },
  ctaButton: {
    padding: '14px 32px',
    fontSize: '16px',
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    border: 'none',
    borderRadius: '8px',
    color: '#0f172a',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  heroCtaButton: {
    padding: '14px 32px',
    fontSize: '16px',
  },
  features: {
    padding: '120px 32px',
    background: '#0f172a',
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: '60px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  featureCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '16px',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '12px',
  },
  featureDesc: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.6',
  },
  pricing: {
    padding: '120px 32px',
    background: '#0f172a',
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  pricingCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center' as const,
  },
  pricingCardHighlight: {
    border: '2px solid #06b6d4',
    background: '#1e293b',
  },
  planName: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '12px',
  },
  planPrice: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#06b6d4',
    marginBottom: '8px',
  },
  pricePeriod: {
    fontSize: '14px',
    color: '#94a3b8',
  },
  planDesc: {
    fontSize: '14px',
    color: '#94a3b8',
    marginBottom: '24px',
  },
  planButton: {
    width: '100%',
    padding: '12px 16px',
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#06b6d4',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '24px',
    transition: 'all 0.2s',
  },
  planButtonHighlight: {
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    border: 'none',
    color: '#0f172a',
  },
  planFeatures: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  planFeature: {
    fontSize: '13px',
    color: '#94a3b8',
    marginBottom: '12px',
    textAlign: 'left' as const,
  },
  finalCta: {
    padding: '120px 32px',
    background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '40px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '16px',
  },
  ctaDesc: {
    fontSize: '16px',
    color: '#1e293b',
    marginBottom: '32px',
    maxWidth: '600px',
    margin: '0 auto 32px',
  },
  finalCtaButton: {
    padding: '16px 40px',
    fontSize: '16px',
    background: '#0f172a',
    color: '#06b6d4',
  },
  footer: {
    background: '#0f172a',
    borderTop: '1px solid #334155',
    padding: '48px 32px',
  },
  footerContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
  },
  footerBrand: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  footerCopy: {
    fontSize: '12px',
    color: '#64748b',
  },
  footerLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '24px',
    textAlign: 'right' as const,
  },
  footerLink: {
    fontSize: '14px',
    color: '#94a3b8',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
};
