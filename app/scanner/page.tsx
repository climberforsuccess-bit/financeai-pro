'use client'

import { useState, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useScanner } from '@/hooks/useScanner'

interface ScannedReceipt {
  id: string
  merchantName: string
  amount: number
  date: string
  time: string
  category: string
  imagePreview: string
  items?: string[]
}

export default function ScannerPage() {
  const { t, language } = useLanguage()
  const { processReceipt, loading, error, result } = useScanner()
  const [scannedReceipts, setScannedReceipts] = useState<ScannedReceipt[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files?.[0]) {
      await handleFileProcess(files[0])
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) {
      await handleFileProcess(file)
    }
  }

  const handleFileProcess = async (file: File) => {
    try {
      const data = await processReceipt(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const receipt: ScannedReceipt = {
          id: data.transaction.id,
          merchantName: data.extracted.vendor,
          amount: data.extracted.total,
          date: new Date(data.extracted.date).toLocaleDateString(language),
          time: new Date(data.extracted.date).toLocaleTimeString(language),
          category: data.extracted.category,
          imagePreview: e.target?.result as string,
          items: data.extracted.items,
        }
        setScannedReceipts([receipt, ...scannedReceipts])
      }
      reader.readAsDataURL(file)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{t('receipt_scanner')}</h1>
          <p className="text-slate-400">{t('upload_receipt_to_extract_data')}</p>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer mb-8 ${
            dragActive
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-slate-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>

          <p className="text-white font-semibold mb-2">{t('drag_drop_or_click')}</p>
          <p className="text-slate-400 text-sm">{t('supported_formats')}: JPG, PNG</p>

          {loading && (
            <div className="mt-4">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
              <p className="text-blue-400 text-sm mt-2">{t('processing_receipt')}</p>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-8 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-sm">{t('error')}: {error}</p>
          </div>
        )}

        {/* Scanned Receipts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scannedReceipts.map((receipt) => (
            <div key={receipt.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden hover:border-slate-600 transition-all backdrop-blur-sm">
              {/* Image Preview */}
              {receipt.imagePreview && (
                <div className="w-full h-48 bg-slate-700/50 overflow-hidden">
                  <img
                    src={receipt.imagePreview}
                    alt={receipt.merchantName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Receipt Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{receipt.merchantName}</h3>
                    <p className="text-sm text-slate-400">{receipt.date} at {receipt.time}</p>
                  </div>
                  <span className="text-2xl font-bold text-emerald-400">${receipt.amount.toFixed(2)}</span>
                </div>

                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-700/50 text-slate-200 text-xs font-semibold">
                    {receipt.category}
                  </span>
                </div>

                {receipt.items && receipt.items.length > 0 && (
                  <div className="mb-3 pb-3 border-t border-slate-700">
                    <p className="text-xs text-slate-400 mb-2 font-semibold">{t('items')}:</p>
                    <div className="flex flex-wrap gap-1">
                      {receipt.items.slice(0, 3).map((item, idx) => (
                        <span key={idx} className="text-xs bg-slate-700/30 text-slate-300 px-2 py-1 rounded">
                          {item}
                        </span>
                      ))}
                      {receipt.items.length > 3 && (
                        <span className="text-xs text-slate-400">+{receipt.items.length - 3} {t('more')}</span>
                      )}
                    </div>
                  </div>
                )}

                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold rounded px-4 py-2 transition-all">
                  {t('view_transaction')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {scannedReceipts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-slate-400">{t('no_receipts_scanned_yet')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
