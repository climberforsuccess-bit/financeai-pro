'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { IncomeExpenseChart } from '@/components/charts/IncomeExpenseChart';

export default function DashboardPage() {
  const { t, language } = useLanguage();

  const stats = {
    balance: '$12,450.50',
    monthlyIncome: '$4,200.00',
    monthlyExpenses: '$2,800.00',
    totalDebt: '$8,500.00',
    savings: '$3,150.50',
  };

  // Función para traducir fechas
  const getTranslatedDate = (spanishDate: string) => {
    if (language === 'en') {
      return spanishDate.replace('Ago', 'Aug');
    }
    return spanishDate;
  };

  const transactions = [
    { category: `🍔 ${t('food')}`, description: t('wholeFoodsMarket'), date: getTranslatedDate('28 Ago'), amount: '-$45.32', type: 'negative' },
    { category: `🚗 ${t('transport')}`, description: t('uber'), date: getTranslatedDate('28 Ago'), amount: '-$18.50', type: 'negative' },
    { category: `💼 ${t('income')}`, description: t('salaryPayment'), date: getTranslatedDate('25 Ago'), amount: '+$4,200.00', type: 'positive' },
    { category: `🎬 ${t('entertainment')}`, description: t('netflix'), date: getTranslatedDate('20 Ago'), amount: '-$12.99', type: 'negative' },
    { category: `🏥 ${t('health')}`, description: t('pharmacyCVS'), date: getTranslatedDate('18 Ago'), amount: '-$32.15', type: 'negative' },
  ];

  const today = new Date();
  const monthNames = {
    es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };

  const dayNames = {
    es: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  };

  const day = today.getDate();
  const month = monthNames[language][today.getMonth()];
  const year = today.getFullYear();
  const dayName = dayNames[language][today.getDay()];

  const dateStr = `${dayName}, ${day} ${t('may')} ${year}`;
  const monthLabel = language === 'es' ? monthNames.es[today.getMonth()].charAt(0).toUpperCase() + monthNames.es[today.getMonth()].slice(1) : monthNames.en[today.getMonth()];

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>{t('dashboard')}</h1>
          <p style={styles.dateText}>
            {dayName.charAt(0).toUpperCase() + dayName.slice(1)}, {day} de {month} de {year}
          </p>
        </div>
        <div style={styles.badge}>📊 {monthLabel} 2024</div>
      </div>

      {/* STATS GRID */}
      <div style={styles.statsGrid}>
        <Card 
          title={t('totalBalance')}
          value={stats.balance}
          icon="💰"
          textColor="#10b981"
          bgColor="rgba(16, 185, 129, 0.1)"
        />
        <Card 
          title={t('monthlyIncome')}
          value={stats.monthlyIncome}
          icon="📈"
          textColor="#3b82f6"
          bgColor="rgba(59, 130, 246, 0.1)"
        />
        <Card 
          title={t('monthlyExpenses')}
          value={stats.monthlyExpenses}
          icon="📉"
          textColor="#f59e0b"
          bgColor="rgba(245, 158, 11, 0.1)"
        />
        <Card 
          title={t('totalDebt')}
          value={stats.totalDebt}
          icon="💳"
          textColor="#ef4444"
          bgColor="rgba(239, 68, 68, 0.1)"
        />
        <Card 
          title={t('savings')}
          value={stats.savings}
          icon="🏦"
          textColor="#8b5cf6"
          bgColor="rgba(139, 92, 246, 0.1)"
        />
      </div>

      {/* MAIN GRID: Chart + Sidebar */}
      <div style={styles.mainGrid}>
        {/* Chart Section */}
        <div style={styles.chartContainer}>
          <IncomeExpenseChart />
        </div>

        {/* Sidebar Widgets */}
        <div style={styles.sidebar}>
          <SidebarWidget
            title={`📊 ${t('thisMonth')}`}
            items={[
              { label: t('saved'), value: '$1,400.00' },
              { label: t('variation'), value: '+22%', highlighted: true },
            ]}
          />
          <SidebarWidget
            title={`💳 ${t('activeDebt')}`}
            items={[
              { label: t('cards'), value: '3' },
              { label: t('averageInterest'), value: '18.5%' },
            ]}
          />
          <SidebarWidget
            title={`🎯 ${t('debtObjective')}`}
            items={[
              { label: t('method'), value: 'Avalanche' },
              { label: t('timeline'), value: `24 ${t('months')}` },
            ]}
          />
        </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div style={styles.transactionsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>{t('recentTransactions')}</h2>
          <a href="/transactions" style={styles.viewAllLink}>{t('viewAll')}</a>
        </div>
        <div style={styles.transactionsList}>
          {transactions.map((tx, idx) => (
            <div key={idx} style={styles.transactionItem}>
              <div style={styles.transactionLeft}>
                <div style={styles.categoryText}>{tx.category}</div>
                <div style={styles.descriptionText}>{tx.description}</div>
              </div>
              <div style={styles.transactionRight}>
                <div style={{ ...styles.amountText, color: tx.type === 'positive' ? '#10b981' : '#ef4444' }}>
                  {tx.amount}
                </div>
                <div style={styles.dateText}>{tx.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SidebarWidget({ title, items }: { title: string; items: Array<{ label: string; value: string; highlighted?: boolean }> }) {
  return (
    <div style={styles.sidebarWidget}>
      <h3 style={styles.widgetTitle}>{title}</h3>
      {items.map((item, idx) => (
        <div key={idx} style={styles.widgetItem}>
          <span style={styles.widgetLabel}>{item.label}</span>
          <span style={{ ...styles.widgetValue, fontWeight: item.highlighted ? '700' : '600', color: item.highlighted ? '#0ea5e9' : '#f1f5f9' }}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    maxWidth: '1400px',
    margin: '0 auto',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
  } as React.CSSProperties,
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: '8px',
  } as React.CSSProperties,
  dateText: {
    fontSize: '14px',
    color: '#94a3b8',
  } as React.CSSProperties,
  badge: {
    padding: '8px 16px',
    backgroundColor: 'rgba(15, 165, 233, 0.1)',
    border: '1px solid rgba(15, 165, 233, 0.3)',
    borderRadius: '8px',
    color: '#0ea5e9',
    fontSize: '12px',
    fontWeight: '600',
  } as React.CSSProperties,
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  } as React.CSSProperties,
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: '24px',
    marginBottom: '32px',
  } as React.CSSProperties,
  chartContainer: {
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: '24px',
    backdropFilter: 'blur(10px)',
  } as React.CSSProperties,
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } as React.CSSProperties,
  sidebarWidget: {
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: '16px',
    backdropFilter: 'blur(10px)',
  } as React.CSSProperties,
  widgetTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  widgetItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '8px',
  } as React.CSSProperties,
  widgetLabel: {
    fontSize: '12px',
    color: '#94a3b8',
  } as React.CSSProperties,
  widgetValue: {
    fontSize: '13px',
    color: '#f1f5f9',
  } as React.CSSProperties,
  transactionsSection: {
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: '24px',
    backdropFilter: 'blur(10px)',
  } as React.CSSProperties,
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#f1f5f9',
  } as React.CSSProperties,
  viewAllLink: {
    fontSize: '12px',
    color: '#0ea5e9',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s',
  } as React.CSSProperties,
  transactionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } as React.CSSProperties,
  transactionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  } as React.CSSProperties,
  transactionLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  } as React.CSSProperties,
  transactionRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  } as React.CSSProperties,
  categoryText: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#f1f5f9',
  } as React.CSSProperties,
  descriptionText: {
    fontSize: '12px',
    color: '#94a3b8',
  } as React.CSSProperties,
  amountText: {
    fontSize: '13px',
    fontWeight: '600',
  } as React.CSSProperties,
};
