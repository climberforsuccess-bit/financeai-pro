'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingPage() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const content = {
    es: {
      nav: {
        features: 'Características',
        pricing: 'Precios',
        about: 'Acerca de',
        blog: 'Blog',
      },
      hero: {
        title: 'Toma el Control de tus Finanzas con IA',
        subtitle: 'Escanea recibos, gestiona deudas y recibe recomendaciones personalizadas. Todo en un solo lugar bajo tecnología avanzada.',
        cta: 'Empezar Gratis',
        stats: [
          { value: '10K+', label: 'Usuarios Activos' },
          { value: '$2M+', label: 'Deudas Gestionadas' },
          { value: '500+', label: 'Tarjetas Compatibles' },
        ],
      },
      features: {
        title: 'Características Principales',
        items: [
          {
            icon: '📸',
            title: 'Escáner de Recibos con IA',
            desc: 'Toma fotos a tus tickets y nuestra IA clasifica automáticamente monto, categoría y comercio.',
          },
          {
            icon: '💡',
            title: 'Recomendador Inteligente',
            desc: 'La IA analiza tus gastos y te dice exactamente qué tarjeta usar para maximizar cashback y puntos.',
          },
          {
            icon: '📈',
            title: 'Estrategia de Deudas',
            desc: 'Reduce el pago de intereses usando algoritmos que priorizan tus deudas automáticamente.',
          },
          {
            icon: '💳',
            title: 'Gestión de Suscripciones',
            desc: 'Detecta y controla todas tus suscripciones. Ahorra cientos de dólares identificando gastos innecesarios.',
          },
          {
            icon: '📊',
            title: 'Reportes Detallados',
            desc: 'Exporta análisis completos en PDF o CSV. Visualiza tendencias y patrones de gasto.',
          },
          {
            icon: '🎯',
            title: 'Metas de Ahorro',
            desc: 'Define objetivos financieros y recibe alertas personalizadas para mantener el rumbo.',
          },
        ],
      },
      pricing: {
        title: 'Planes Simples y Transparentes',
        plans: [
          {
            name: 'Free',
            price: '$0',
            period: '/mes',
            desc: 'Perfecto para comenzar',
            features: [
              '✓ Dashboard básico',
              '✓ 5 transacciones/mes',
              '✓ Categorización manual',
            ],
            cta: 'Empezar Ahora',
            highlight: false,
          },
          {
            name: 'Personal',
            price: '$9.99',
            period: '/mes',
            desc: 'Para usuarios individuales',
            features: [
              '✓ Dashboard completo',
              '✓ Transacciones ilimitadas',
              '✓ Escáner de Recibos IA',
              '✓ Recomendaciones básicas',
            ],
            cta: 'Suscribirse',
            highlight: false,
          },
          {
            name: 'Pro',
            price: '$19.99',
            period: '/mes',
            desc: 'Poder total de IA',
            features: [
              '✓ Todo de Personal',
              '✓ IA Avanzada (GPT-4o)',
              '✓ Análisis profundo de gastos',
              '✓ Exportación PDF/CSV',
              '✓ Prioridad en soporte',
            ],
            cta: 'Prueba Pro',
            highlight: true,
          },
          {
            name: 'Business',
            price: '$49.99',
            period: '/mes',
            desc: 'Para equipos y empresas',
            features: [
              '✓ Todo de Pro',
              '✓ 5 perfiles de usuario',
              '✓ API Access',
              '✓ Soporte 24/7',
              '✓ Integraciones personalizadas',
            ],
            cta: 'Contactar Ventas',
            highlight: false,
          },
        ],
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            q: '¿Es seguro conectar mis cuentas?',
            a: 'Sí, utilizamos encriptación de nivel bancario. Tus datos nunca se almacenan en servidor, solo se sincronizan en tiempo real.',
          },
          {
            q: '¿Puedo cancelar en cualquier momento?',
            a: 'Absolutamente. Sin contrato, sin compromiso. Cancela desde Configuración cuando quieras.',
          },
          {
            q: '¿El escáner funciona con fotos borrosas?',
            a: 'Sí, nuestro OCR con IA puede leer incluso recibos viejos o de baja calidad. Si algo no se detecta, lo editas manualmente.',
          },
          {
            q: '¿Qué bancos son compatibles?',
            a: 'Trabajamos con 500+ instituciones financieras en América Latina y USA. Ve la lista completa en Integraciones.',
          },
        ],
      },
      cta: {
        title: '¿Listo para Optimizar tus Finanzas?',
        desc: 'Únete a miles de usuarios que ya están ahorrando dinero con FinanceAI Pro.',
        button: 'Empezar Gratis Ahora',
      },
      footer: {
        company: 'FinanceAI Pro by Climberforsuccess',
        copyright: '© 2024-2026 Climberforsuccess LLC. Todos los derechos reservados.',
        links: [
          { label: 'Privacidad', href: '#' },
          { label: 'Términos', href: '#' },
          { label: 'Contacto', href: '#' },
          { label: 'Status', href: '#' },
        ],
      },
    },
    en: {
      nav: {
        features: 'Features',
        pricing: 'Pricing',
        about: 'About',
        blog: 'Blog',
      },
      hero: {
        title: 'Take Control of Your Finances with AI',
        subtitle: 'Scan receipts, manage debt, and get personalized recommendations. All in one place with cutting-edge technology.',
        cta: 'Start Free',
        stats: [
          { value: '10K+', label: 'Active Users' },
          { value: '$2M+', label: 'Debt Managed' },
          { value: '500+', label: 'Cards Compatible' },
        ],
      },
      features: {
        title: 'Core Features',
        items: [
          {
            icon: '📸',
            title: 'AI Receipt Scanner',
            desc: 'Take photos of receipts and our AI automatically classifies amount, category, and merchant.',
          },
          {
            icon: '💡',
            title: 'Smart Recommender',
            desc: 'AI analyzes your spending and tells you exactly which card to use to maximize cashback and points.',
          },
          {
            icon: '📈',
            title: 'Debt Strategy',
            desc: 'Reduce interest payments using algorithms that automatically prioritize your debts.',
          },
          {
            icon: '💳',
            title: 'Subscription Manager',
            desc: 'Detect and control all subscriptions. Save hundreds by identifying unnecessary expenses.',
          },
          {
            icon: '📊',
            title: 'Detailed Reports',
            desc: 'Export complete analysis in PDF or CSV. Visualize spending trends and patterns.',
          },
          {
            icon: '🎯',
            title: 'Savings Goals',
            desc: 'Set financial objectives and receive personalized alerts to stay on track.',
          },
        ],
      },
      pricing: {
        title: 'Simple and Transparent Pricing',
        plans: [
          {
            name: 'Free',
            price: '$0',
            period: '/month',
            desc: 'Perfect to get started',
            features: [
              '✓ Basic dashboard',
              '✓ 5 transactions/month',
              '✓ Manual categorization',
            ],
            cta: 'Start Now',
            highlight: false,
          },
          {
            name: 'Personal',
            price: '$9.99',
            period: '/month',
            desc: 'For individual users',
            features: [
              '✓ Full dashboard',
              '✓ Unlimited transactions',
              '✓ AI Receipt Scanner',
              '✓ Basic recommendations',
            ],
            cta: 'Subscribe',
            highlight: false,
          },
          {
            name: 'Pro',
            price: '$19.99',
            period: '/month',
            desc: 'Full AI Power',
            features: [
              '✓ Everything in Personal',
              '✓ Advanced AI (GPT-4o)',
              '✓ Deep spending analysis',
              '✓ PDF/CSV export',
              '✓ Priority support',
            ],
            cta: 'Try Pro',
            highlight: true,
          },
          {
            name: 'Business',
            price: '$49.99',
            period: '/month',
            desc: 'For teams & enterprises',
            features: [
              '✓ Everything in Pro',
              '✓ 5 user profiles',
              '✓ API Access',
              '✓ 24/7 Support',
              '✓ Custom integrations',
            ],
            cta: 'Contact Sales',
            highlight: false,
          },
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Is it safe to connect my accounts?',
            a: 'Yes, we use bank-level encryption. Your data is never stored on servers, only synced in real-time.',
          },
          {
            q: 'Can I cancel anytime?',
            a: 'Absolutely. No contract, no commitment. Cancel from Settings whenever you want.',
          },
          {
            q: 'Does the scanner work with blurry photos?',
            a: 'Yes, our AI OCR can read even old or low-quality receipts. If something isn\'t detected, you can edit it manually.',
          },
          {
            q: 'Which banks are compatible?',
            a: 'We work with 500+ financial institutions in Latin America and USA. See the complete list in Integrations.',
          },
        ],
      },
      cta: {
        title: 'Ready to Optimize Your Finances?',
        desc: 'Join thousands of users already saving money with FinanceAI Pro.',
        button: 'Start Free Today',
      },
      footer: {
        company: 'FinanceAI Pro by Climberforsuccess',
        copyright: '© 2024-2026 Climberforsuccess LLC. All rights reserved.',
        links: [
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Contact', href: '#' },
          { label: 'Status', href: '#' },
        ],
      },
    },
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <div style={styles.root}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>
            <span style={{ fontSize: '24px', marginRight: '8px' }}>📊</span>
            <span style={styles.logoText}>FinanceAI Pro</span>
          </div>

          <div style={styles.navLinks}>
            <a href="#features" style={styles.navLink}>
              {currentContent.nav.features}
            </a>
            <a href="#pricing" style={styles.navLink}>
              {currentContent.nav.pricing}
            </a>
            <a href="#faq" style={styles.navLink}>
              FAQ
            </a>
          </div>

          <div style={styles.navActions}>
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              style={styles.langButton}
            >
              {language === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}
            </button>
            <Link href="/dashboard">
              <button style={styles.ctaButton}>
                {currentContent.hero.cta}
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>{currentContent.hero.title}</h1>
          <p style={styles.heroSubtitle}>{currentContent.hero.subtitle}</p>

          <div style={styles.heroCTA}>
            <Link href="/dashboard">
              <button style={{ ...styles.ctaButton, ...styles.heroCtaButton }}>
                🚀 {currentContent.hero.cta}
              </button>
            </Link>
          </div>

          <div style={styles.statsGrid}>
            {currentContent.hero.stats.map((stat, idx) => (
              <div key={idx} style={styles.statCard}>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.features} id="features">
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>{currentContent.features.title}</h2>
          <div style={styles.featuresGrid}>
            {currentContent.features.items.map((feature, idx) => (
              <div key={idx} style={styles.featureCard}>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={styles.pricing} id="pricing">
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>{currentContent.pricing.title}</h2>
          <div style={styles.pricingGrid}>
            {currentContent.pricing.plans.map((plan, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.pricingCard,
                  ...(plan.highlight && styles.pricingCardHighlight),
                }}
              >
                {plan.highlight && <div style={styles.badge}>POPULAR</div>}
                <h3 style={styles.planName}>{plan.name}</h3>
                <p style={styles.planDesc}>{plan.desc}</p>
                <div style={styles.planPrice}>
                  <span style={styles.priceValue}>{plan.price}</span>
                  <span style={styles.pricePeriod}>{plan.period}</span>
                </div>
                <Link href="/dashboard">
                  <button
                    style={{
                      ...styles.planButton,
                      ...(plan.highlight && styles.planButtonHighlight),
                    }}
                  >
                    {plan.cta}
                  </button>
                </Link>
                <ul style={styles.planFeatures}>
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} style={styles.planFeature}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.faq} id="faq">
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>{currentContent.faq.title}</h2>
          <div style={styles.faqGrid}>
            {currentContent.faq.items.map((item, idx) => (
              <div key={idx} style={styles.faqItem}>
                <h4 style={styles.faqQ}>{item.q}</h4>
                <p style={styles.faqA}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={styles.finalCta}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.ctaTitle}>{currentContent.cta.title}</h2>
          <p style={styles.ctaDesc}>{currentContent.cta.desc}</p>
          <Link href="/dashboard">
            <button style={{ ...styles.ctaButton, ...styles.finalCtaButton }}>
              {currentContent.cta.button}
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerBrand}>
            <div style={styles.logo}>
              <span style={{ fontSize: '20px', marginRight: '8px' }}>📊</span>
              <span style={styles.logoText}>{currentContent.footer.company}</span>
            </div>
            <p style={styles.footerCopy}>{currentContent.footer.copyright}</p>
          </div>
          <div style={styles.footerLinks}>
            {currentContent.footer.links.map((link, idx) => (
              <a key={idx} href={link.href} style={styles.footerLink}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  root: {
    background: '#0f172a',
    color: '#e2e8f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    lineHeight: '1.6',
  } as React.CSSProperties,

  navbar: {
    background: 'linear-gradient(180deg, #0f172a 0%, rgba(15, 23, 42, 0.9) 100%)',
    borderBottom: '1px solid #334155',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(10px)',
  } as React.CSSProperties,

  navContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,

  logo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  } as React.CSSProperties,

  logoText: {
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as React.CSSProperties,

  navLinks: {
    display: 'flex',
    gap: '32px',
  } as React.CSSProperties,

  navLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.2s',
  } as React.CSSProperties,

  navActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  } as React.CSSProperties,

  langButton: {
    padding: '8px 12px',
    background: 'transparent',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#94a3b8',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,

  hero: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    padding: '120px 32px',
    textAlign: 'center',
  } as React.CSSProperties,

  heroContent: {
    maxWidth: '900px',
    margin: '0 auto',
  } as React.CSSProperties,

  heroTitle: {
    fontSize: '52px',
    fontWeight: '800',
    marginBottom: '24px',
    lineHeight: '1.2',
    letterSpacing: '-1px',
  } as React.CSSProperties,

  heroSubtitle: {
    fontSize: '18px',
    color: '#94a3b8',
    marginBottom: '32px',
    maxWidth: '700px',
    margin: '0 auto 32px',
  } as React.CSSProperties,

  heroCTA: {
    marginBottom: '60px',
  } as React.CSSProperties,

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
  } as React.CSSProperties,

  statCard: {
    background: 'rgba(6, 182, 212, 0.1)',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '24px 16px',
  } as React.CSSProperties,

  statValue: {
    fontSize: '32px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px',
  } as React.CSSProperties,

  statLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } as React.CSSProperties,

  features: {
    padding: '120px 32px',
    background: '#0f172a',
  } as React.CSSProperties,

  sectionContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: '40px',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: '64px',
    letterSpacing: '-0.5px',
  } as React.CSSProperties,

  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  } as React.CSSProperties,

  featureCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '32px 24px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,

  featureIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  } as React.CSSProperties,

  featureTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '12px',
  } as React.CSSProperties,

  featureDesc: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.6',
  } as React.CSSProperties,

  pricing: {
    padding: '120px 32px',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
  } as React.CSSProperties,

  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  } as React.CSSProperties,

  pricingCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '32px 24px',
    position: 'relative',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,

  pricingCardHighlight: {
    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
    borderColor: '#06b6d4',
    transform: 'scale(1.05)',
  } as React.CSSProperties,

  badge: {
    position: 'absolute',
    top: '-12px',
    left: '24px',
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    color: '#fff',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '700',
  } as React.CSSProperties,

  planName: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '8px',
  } as React.CSSProperties,

  planDesc: {
    fontSize: '13px',
    color: '#94a3b8',
    marginBottom: '16px',
  } as React.CSSProperties,

  planPrice: {
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '4px',
  } as React.CSSProperties,

  priceValue: {
    fontSize: '36px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as React.CSSProperties,

  pricePeriod: {
    fontSize: '14px',
    color: '#94a3b8',
  } as React.CSSProperties,

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
  } as React.CSSProperties,

  planButtonHighlight: {
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    border: 'none',
    color: '#0f172a',
  } as React.CSSProperties,

  planFeatures: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  } as React.CSSProperties,

  planFeature: {
    fontSize: '13px',
    color: '#94a3b8',
    marginBottom: '12px',
    textAlign: 'left' as const,
  } as React.CSSProperties,

  faq: {
    padding: '120px 32px',
    background: '#0f172a',
  } as React.CSSProperties,

  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '32px',
  } as React.CSSProperties,

  faqItem: {
    borderLeft: '2px solid #06b6d4',
    paddingLeft: '24px',
  } as React.CSSProperties,

  faqQ: {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#e2e8f0',
  } as React.CSSProperties,

  faqA: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.7',
  } as React.CSSProperties,

  finalCta: {
    padding: '120px 32px',
    background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
    textAlign: 'center',
  } as React.CSSProperties,

  ctaTitle: {
    fontSize: '40px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '16px',
  } as React.CSSProperties,

  ctaDesc: {
    fontSize: '16px',
    color: '#1e293b',
    marginBottom: '32px',
    maxWidth: '600px',
    margin: '0 auto 32px',
  } as React.CSSProperties,

  ctaButton: {
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,

  heroCtaButton: {
    padding: '14px 32px',
    fontSize: '16px',
  } as React.CSSProperties,

  finalCtaButton: {
    padding: '16px 40px',
    fontSize: '16px',
    background: '#0f172a',
    color: '#06b6d4',
  } as React.CSSProperties,

  footer: {
    background: '#0f172a',
    borderTop: '1px solid #334155',
    padding: '48px 32px',
  } as React.CSSProperties,

  footerContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
  } as React.CSSProperties,

  footerBrand: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  } as React.CSSProperties,

  footerCopy: {
    fontSize: '12px',
    color: '#64748b',
  } as React.CSSProperties,

  footerLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '24px',
    textAlign: 'right' as const,
  } as React.CSSProperties,

  footerLink: {
    fontSize: '14px',
    color: '#94a3b8',
    textDecoration: 'none',
    transition: 'color 0.2s',
  } as React.CSSProperties,
};
