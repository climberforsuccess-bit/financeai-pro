'use client';
import { useLanguage } from '@/context/LanguageContext';
export default function RecommendationsPage() {
  const { t } = useLanguage();
  return <div style={{ padding: '40px' }}><h1>{t('recommendations')}</h1></div>;
}
