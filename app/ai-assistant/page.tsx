'use client'

export const dynamic = 'force-dynamic'

import { useState, useCallback, useMemo } from 'react'
import { useLanguage } from '@/context/LanguageContext'

// TYPE DEFINITIONS
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ContentLanguage {
  title: string
  subtitle: string
  placeholder: string
  send: string
  clear: string
  noMessages: string
  thinking: string
  errorMessage: string
}

export default function AIAssistantPage() {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // CONTENT
  const content: Record<string, ContentLanguage> = {
    es: {
      title: 'Asistente FinanceAI',
      subtitle: 'Tu asesor financiero personal con IA',
      placeholder: 'Pregunta sobre tus finanzas, presupuestos, inversiones...',
      send: 'Enviar',
      clear: 'Limpiar',
      noMessages: 'Comienza a conversar con tu asistente IA',
      thinking: 'Pensando...',
      errorMessage: 'Error al procesar tu pregunta. Intenta de nuevo.',
    },
    en: {
      title: 'FinanceAI Assistant',
      subtitle: 'Your personal AI financial advisor',
      placeholder: 'Ask about your finances, budgets, investments...',
      send: 'Send',
      clear: 'Clear',
      noMessages: 'Start chatting with your AI assistant',
      thinking: 'Thinking...',
      errorMessage: 'Error processing your question. Try again.',
    },
  }

  const curr = useMemo(
    () => content[language as keyof typeof content] || content.en,
    [language]
  )

  // HANDLERS
  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Simular respuesta IA (en producción, llamar a API real)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Entendido tu pregunta: "${input}". Esta es una respuesta de demostración. Integra tu API de IA aquí.`,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: curr.errorMessage,
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }, [input, curr.errorMessage])

  const handleClear = useCallback(() => {
    setMessages([])
    setInput('')
  }, [])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage]
  )

  return (
    <div style={styles.root}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>{curr.title}</h1>
        <p style={styles.subtitle}>{curr.subtitle}</p>
      </div>

      {/* CHAT CONTAINER */}
      <div style={styles.chatContainer}>
        {/* MESSAGES */}
        <div style={styles.messagesArea}>
          {messages.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>💬</div>
              <p style={styles.emptyText}>{curr.noMessages}</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  ...styles.messageWrapper,
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    ...styles.messageBubble,
                    background:
                      msg.role === 'user'
                        ? 'linear-gradient(135deg, #06b6d4, #0ea5e9)'
                        : '#1e293b',
                    borderLeftColor: msg.role === 'user' ? '#0ea5e9' : '#334155',
                  }}
                >
                  <p style={styles.messageContent}>{msg.content}</p>
                  <span style={styles.messageTime}>
                    {new Date(msg.timestamp).toLocaleTimeString(
                      language === 'es' ? 'es-ES' : 'en-US',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}
                  </span>
                </div>
              </div>
            ))
          )}

          {/* LOADING STATE */}
          {loading && (
            <div style={{ ...styles.messageWrapper, justifyContent: 'flex-start' }}>
              <div style={{ ...styles.messageBubble, background: '#1e293b' }}>
                <p style={styles.messageContent}>{curr.thinking}</p>
                <div style={styles.loadingDots}>
                  <span style={styles.dot}></span>
                  <span style={styles.dot}></span>
                  <span style={styles.dot}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <div style={styles.inputArea}>
          <div style={styles.inputWrapper}>
            <textarea
              style={styles.textarea}
              placeholder={curr.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              rows={3}
            />
            <div style={styles.buttonGroup}>
              <button
                style={styles.sendButton}
                onClick={handleSendMessage}
                disabled={!input.trim() || loading}
              >
                {curr.send} →
              </button>
              <button
                style={styles.clearButton}
                onClick={handleClear}
                disabled={messages.length === 0}
              >
                {curr.clear}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TIPS */}
      <div style={styles.tips}>
        <h3 style={styles.tipsTitle}>
          {language === 'es' ? '💡 Consejos' : '💡 Tips'}
        </h3>
        <ul style={styles.tipsList}>
          <li>
            {language === 'es'
              ? 'Pregunta sobre tus gastos, presupuestos y metas financieras'
              : 'Ask about your expenses, budgets and financial goals'}
          </li>
          <li>
            {language === 'es'
              ? 'Obtén recomendaciones personalizadas basadas en IA'
              : 'Get personalized AI-powered recommendations'}
          </li>
          <li>
            {language === 'es'
              ? 'Analiza tus transacciones y encuentra patrones de gasto'
              : 'Analyze your transactions and find spending patterns'}
          </li>
          <li>
            {language === 'es'
              ? 'Recibe consejos para optimizar tus finanzas'
              : 'Receive tips to optimize your finances'}
          </li>
        </ul>
      </div>
    </div>
  )
}

const styles = {
  root: {
    background: '#0f172a',
    color: '#e2e8f0',
    minHeight: '100vh',
    padding: '32px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  } as React.CSSProperties,

  header: {
    textAlign: 'center',
  } as React.CSSProperties,

  title: {
    fontSize: '32px',
    fontWeight: '800',
    margin: 0,
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  } as React.CSSProperties,

  subtitle: {
    fontSize: '16px',
    color: '#94a3b8',
    margin: 0,
  } as React.CSSProperties,

  chatContainer: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    height: '600px',
    overflow: 'hidden',
  } as React.CSSProperties,

  messagesArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } as React.CSSProperties,

  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  } as React.CSSProperties,

  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  } as React.CSSProperties,

  emptyText: {
    color: '#94a3b8',
    fontSize: '16px',
    textAlign: 'center',
    margin: 0,
  } as React.CSSProperties,

  messageWrapper: {
    display: 'flex',
    marginBottom: '8px',
  } as React.CSSProperties,

  messageBubble: {
    maxWidth: '70%',
    padding: '16px',
    borderRadius: '12px',
    borderLeft: '4px solid #334155',
  } as React.CSSProperties,

  messageContent: {
    margin: 0,
    marginBottom: '8px',
    fontSize: '14px',
    lineHeight: '1.6',
  } as React.CSSProperties,

  messageTime: {
    fontSize: '11px',
    opacity: 0.6,
  } as React.CSSProperties,

  loadingDots: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  } as React.CSSProperties,

  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#06b6d4',
    animation: 'pulse 1.4s infinite',
  } as React.CSSProperties,

  inputArea: {
    borderTop: '1px solid #334155',
    padding: '16px',
    background: '#0f172a',
  } as React.CSSProperties,

  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } as React.CSSProperties,

  textarea: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#e2e8f0',
    padding: '12px',
    fontFamily: 'inherit',
    fontSize: '14px',
    resize: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as React.CSSProperties,

  buttonGroup: {
    display: 'flex',
    gap: '12px',
  } as React.CSSProperties,

  sendButton: {
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    padding: '12px 24px',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
  } as React.CSSProperties,

  clearButton: {
    background: '#334155',
    border: 'none',
    borderRadius: '8px',
    color: '#e2e8f0',
    padding: '12px 24px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,

  tips: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '24px',
  } as React.CSSProperties,

  tipsTitle: {
    fontSize: '16px',
    fontWeight: '700',
    marginTop: 0,
    marginBottom: '16px',
  } as React.CSSProperties,

  tipsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '12px',
  } as React.CSSProperties,
}
