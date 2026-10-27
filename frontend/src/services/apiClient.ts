import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

// Conecta directamente al backend en 3001
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token JWT de Supabase
apiClient.interceptors.request.use((config) => {
  const session = useAuthStore.getState().session
  const user = useAuthStore.getState().user
  
  console.log('=== API Request ===')
  console.log('Full URL:', `${config.baseURL}${config.url}`)
  console.log('Token:', session?.access_token ? 'EXISTS' : 'MISSING')
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('=== API Error ===')
    console.log('Status:', error.response?.status)
    console.log('URL:', error.config?.url)
    console.log('Data:', error.response?.data)
    
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
