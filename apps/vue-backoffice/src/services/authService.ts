import axios from 'axios'
import axiosInstance from './axiosInstance'

const API_URL = import.meta.env.VITE_API_URL

export async function signin(email: string, password: string) {
  try {
    const response = await axiosInstance.post(`${API_URL}/auth/signin`, {
      email,
      password,
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const nestError = error.response.data
      throw new Error(nestError.message || 'Erreur inconnue')
    }
    throw new Error('Erreur réseau ou serveur injoignable' + error)
  }
}
