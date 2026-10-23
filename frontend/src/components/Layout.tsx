import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import {
  LayoutDashboard,
  CreditCard,
  TrendingDown,
  Target,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  MessageSquare
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CreditCard, label: 'Transacciones', path: '/transactions' },
    { icon: TrendingDown, label: 'Deudas', path: '/debts' },
    { icon: Target, label: 'Metas', path: '/goals' },
    { icon: CreditCard, label: 'Tarjetas', path: '/cards' },
    { icon: Zap, label: 'Suscripciones', path: '/subscriptions' },
    { icon: FileText, label: 'Reportes', path: '/reports' },
    { icon: MessageSquare, label: 'Asistente IA', path: '/ai-assistant' },
    { icon: Settings, label: 'Configuración', path: '/settings' }
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } bg-slate-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-2xl font-bold">FAI</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg transition text-sm"
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="border-t border-slate-700 p-4">
          {sidebarOpen ? (
            <div className="mb-4">
              <p className="text-sm text-slate-400">Usuario</p>
              <p className="font-semibold text-white truncate">{user?.email}</p>
            </div>
          ) : null}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Salir</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Hola, {user?.full_name || user?.email}</h2>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold">
                {(user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
