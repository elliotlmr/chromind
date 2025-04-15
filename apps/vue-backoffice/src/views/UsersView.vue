<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axiosInstance from '@/services/axiosInstance'
import UsersTable from '@/components/users/UsersTable.vue'

interface User {
  id: string
  email: string
  role: 'ADMIN' | 'USER'
  createdAt: string
}

const users = ref<User[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const API_URL = import.meta.env.VITE_API_URL

const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/users`)
    users.value = response.data
  } catch (err) {
    error.value = String(err) || 'Une erreur est survenue lors de la récupération des utilisateurs'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div class="flex flex-col w-full min-h-screen max-w-7xl p-4 gap-4">
    <h1 class="text-stone-300 text-4xl">Users :</h1>
    <UsersTable :users="users ?? undefined" />
  </div>
</template>
