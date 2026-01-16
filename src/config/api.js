import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

console.log('🔗 API URL:', API_URL)

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000, // 10 segundos de timeout
})

// Add token to requests if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Handle responses
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message)
    
    // Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Solo redirigir si no estamos ya en login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    
    // Network error
    if (!error.response) {
      console.error('❌ Network Error: No se pudo conectar con el servidor')
      // Puedes mostrar un toast o notificación aquí
    }
    
    return Promise.reject(error)
  }
)

export default api

