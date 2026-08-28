'use client';
import { useLanguage } from '@/context/LanguageContext';
export default function AIAssistantPage() {
  const { t } = useLanguage();
  return <div style={{ padding: '40px' }}><h1>{t('aiAssistant')}</h1></div>;
}
