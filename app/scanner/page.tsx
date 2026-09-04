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
  const { processReceipt, loading, error, authenticated } = useScanner()
  const [scannedReceipts, setScannedReceipts] = useState<ScannedReceipt[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [processingError, setProcessingError] = useState<string | null>(null)
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
      setProcessingError(null)
      
      // Convert file to base64
      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageData = e.target?.result as string
        
        // Process receipt
        const data = await processReceipt(imageData)
        
        if (data) {
          const receipt: ScannedReceipt = {
            id: Math.random().toString(36).substr(2, 9),
            merchantName: data.merchant,
            amount: data.amount,
            date: new Date(data.date).toLocaleDateString(language),
            time: new Date(data.date).toLocaleTimeString(language),
            category: 'Expense',
            imagePreview: imageData,
            items: data.items,
          }
          setScannedReceipts([receipt, ...scannedReceipts])
        } else {
          setProcessingError(error || 'Failed to process receipt')
        }
      }
      reader.readAsDataURL(file)
    } catch (err: any) {
      setProcessingError(err.message || 'An error occurred')
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">Please log in to use the receipt scanner</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Receipt Scanner</h1>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-slate-600 hover:border-slate-500'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.heic"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-slate-300">
            <p className="text-lg mb-2">Drag and drop your receipt here</p>
            <p className="text-sm text-slate-400">or click to select (supports JPEG, PNG, HEIC)</p>
          </div>
        </div>

        {/* Error Display */}
        {(error || processingError) && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
            {error || processingError}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500 rounded-lg text-blue-200">
            Processing receipt...
          </div>
        )}

        {/* Scanned Receipts */}
        {scannedReceipts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Scanned Receipts</h2>
            <div className="grid gap-6">
              {scannedReceipts.map((receipt) => (
                <div key={receipt.id} className="bg-slate-800 rounded-lg p-6 text-white">
                  <div className="flex gap-6">
                    <img
                      src={receipt.imagePreview}
                      alt={receipt.merchantName}
                      className="w-32 h-32 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{receipt.merchantName}</h3>
                      <p className="text-2xl font-bold text-green-400 mb-2">${receipt.amount.toFixed(2)}</p>
                      <p className="text-sm text-slate-400">
                        {receipt.date} at {receipt.time}
                      </p>
                      {receipt.items && receipt.items.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold mb-2">Items:</p>
                          <ul className="text-sm text-slate-300 space-y-1">
                            {receipt.items.map((item, idx) => (
                              <li key={idx}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {scannedReceipts.length === 0 && !loading && (
          <div className="mt-12 text-center text-slate-400">
            <p>No receipts scanned yet. Start by uploading an image above.</p>
          </div>
        )}
      </div>
    </div>
  )
}
