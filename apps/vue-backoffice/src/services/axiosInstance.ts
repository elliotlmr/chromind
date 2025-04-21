import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { useNotificationStore } from '@/stores/notifications'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor pour ajouter le token d'authentification dans les headers
axiosInstance.interceptors.request.use(
  (config) => {
    const auth = useAuthStore()
    if (auth.token) {
      config.headers['Authorization'] = `Bearer ${auth.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor pour gérer les erreurs globales (ex. redirection si non-autorisé)
axiosInstance.interceptors.response.use(
  (response) => response, // Si la réponse est OK, on continue
  (error) => {
    const auth = useAuthStore()
    const notifications = useNotificationStore()

    if (
      error.code === 'ERR_NETWORK' ||
      error.message.includes('Network Error') ||
      error.message.includes('ERR_CONNECTION_REFUSED')
    ) {
      notifications.createError('Le serveur ne répond pas. Veuillez réessayer plus tard.')
      router.push({ name: 'signin' })
    }

    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status

      if (status === 401 || status === 403) {
        // On déconnecte l'utilisateur et on le redirige vers la page de login
        notifications.createError('Accès non authorisé.')
        auth.logout()
        router.push({ name: 'signin' })
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
