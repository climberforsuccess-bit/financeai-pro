'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const { login, loading, error, clearError, authenticated } = useAuth()
  const [email, setEmail] = useState('test@financeai.com')
  const [password, setPassword] = useState('TestPassword123!')
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState('')

  useEffect(() => {
    if (authenticated) {
      router.push('/dashboard')
    }
  }, [authenticated, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')
    clearError()

    if (!email || !password) {
      setLocalError('Email and password are required')
      return
    }

    const { error } = await login(email, password)
    if (error) {
      setLocalError(error)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>FinanceAI Pro</h1>
        <p style={styles.subtitle}>Gestiona tus finanzas inteligentemente</p>

        <form onSubmit={handleLogin} style={styles.form}>
          {(localError || error) && (
            <div style={styles.errorBox}>
              {localError || error}
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                disabled={loading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={styles.divider} />

        <p style={styles.signupText}>
          ¿No tienes cuenta? <Link href="/auth/signup" style={styles.link}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    padding: '20px',
  } as React.CSSProperties,
  card: {
    background: '#1e293b',
    borderRadius: '16px',
    padding: '40px',
    border: '1px solid #334155',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  } as React.CSSProperties,
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#0ea5e9',
    margin: '0 0 8px 0',
    textAlign: 'center',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    textAlign: 'center',
    margin: '0 0 32px 0',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  } as React.CSSProperties,
  errorBox: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#fca5a5',
    fontSize: '14px',
  } as React.CSSProperties,
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } as React.CSSProperties,
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#e2e8f0',
  } as React.CSSProperties,
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties,
  input: {
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#e2e8f0',
    outline: 'none',
    width: '100%',
  } as React.CSSProperties,
  eyeButton: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
  button: {
    background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    cursor: 'pointer',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    background: '#334155',
    margin: '24px 0',
  } as React.CSSProperties,
  signupText: {
    fontSize: '14px',
    color: '#94a3b8',
    textAlign: 'center',
    margin: 0,
  } as React.CSSProperties,
  link: {
    color: '#0ea5e9',
    textDecoration: 'none',
    fontWeight: '600',
  } as React.CSSProperties,
}
