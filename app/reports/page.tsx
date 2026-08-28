'use client';
import { useLanguage } from '@/context/LanguageContext';
export default function ReportsPage() {
  const { t } = useLanguage();
  return <div style={{ padding: '40px' }}><h1>{t('reports')}</h1></div>;
}
