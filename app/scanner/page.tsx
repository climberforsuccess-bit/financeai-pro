'use client';

import { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface ScannedReceipt {
  id: string;
  merchantName: string;
  amount: number;
  date: string;
  time: string;
  lastFourDigits: string;
  category: string;
  imagePreview: string;
}

export default function ScannerPage() {
  const { t, language } = useLanguage();
  const [scannedReceipts, setScannedReceipts] = useState<ScannedReceipt[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsScanning(true);
      
      // Simular procesamiento de OCR
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const mockReceipt: ScannedReceipt = {
            id: Date.now().toString(),
            merchantName: 'Whole Foods Market',
            amount: 87.32,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString(),
            lastFourDigits: '4242',
            category: 'Groceries',
            imagePreview: e.target?.result as string,
          };
          
          setScannedReceipts([mockReceipt, ...scannedReceipts]);
          setIsScanning(false);
        };
        reader.readAsDataURL(file);
      }, 2000);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: '#0ea5e9', marginBottom: '8px' }}>
          {t('scannerReceipt')}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          {t('scanReceiptSubtitle')}
        </p>
      </div>

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: '2px dashed #0ea5e9',
          borderRadius: '12px',
          padding: '60px 40px',
          textAlign: 'center',
          cursor: 'pointer',
          background: 'rgba(14, 165, 233, 0.05)',
          transition: 'all 0.2s',
          marginBottom: '40px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(14, 165, 233, 0.1)';
          e.currentTarget.style.borderColor = '#06b6d4';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(14, 165, 233, 0.05)';
          e.currentTarget.style.borderColor = '#0ea5e9';
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        
        {isScanning ? (
          <div>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>⏳</div>
            <div style={{ color: '#0ea5e9', fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
              {t('processing')}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '14px' }}>
              {t('analyzingOCR')}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📸</div>
            <div style={{ color: '#0ea5e9', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
              {t('clickToUpload')}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '14px' }}>
              {t('dragOrUpload')}
            </div>
          </div>
        )}
      </div>

      {/* Scanned Receipts */}
      {scannedReceipts.length > 0 && (
        <div>
          <h2 style={{ color: '#0ea5e9', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
            {t('scannedReceipts')} ({scannedReceipts.length})
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {scannedReceipts.map((receipt) => (
              <div
                key={receipt.id}
                style={{
                  background: '#1e293b',
                  borderRadius: '12px',
                  border: '1px solid #334155',
                  overflow: 'hidden',
                }}
              >
                {/* Receipt Image Preview */}
                {receipt.imagePreview && (
                  <div style={{
                    width: '100%',
                    height: '160px',
                    background: '#0f172a',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={receipt.imagePreview}
                      alt="Receipt"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}

                {/* Receipt Details */}
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                      {receipt.merchantName}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '12px' }}>
                      {receipt.date} {t('at')} {receipt.time}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}>
                        {t('receiptAmount')}
                      </div>
                      <div style={{ color: '#10b981', fontSize: '18px', fontWeight: 'bold' }}>
                        ${receipt.amount.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}>
                        {t('receiptCard')}
                      </div>
                      <div style={{ color: '#0ea5e9', fontSize: '14px', fontWeight: 'bold' }}>
                        •••• {receipt.lastFourDigits}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button
                      style={{
                        padding: '10px 12px',
                        background: '#0ea5e9',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      {t('add')}
                    </button>
                    <button
                      onClick={() => setScannedReceipts(scannedReceipts.filter(r => r.id !== receipt.id))}
                      style={{
                        padding: '10px 12px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px',
                        color: '#ef4444',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      {t('discard')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      {scannedReceipts.length === 0 && (
        <div style={{
          background: '#1e293b',
          borderRadius: '12px',
          border: '1px solid #334155',
          padding: '24px',
        }}>
          <h3 style={{ color: '#0ea5e9', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
            ℹ️ {t('info')}
          </h3>
          <ul style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
            <li>✅ {t('supportsFormats')}</li>
            <li>✅ {t('extractsAutomatically')}</li>
            <li>✅ {t('detectsCardDigits')}</li>
            <li>✅ {t('assignsCategory')}</li>
            <li>✅ {t('addsTransaction')}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
