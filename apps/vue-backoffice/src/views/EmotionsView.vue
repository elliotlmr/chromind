<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axiosInstance from '@/services/axiosInstance'
import EmotionsTable from '@/components/emotions/EmotionsTable.vue'
import type { Emotion } from '@/types/emotions.types'
import EmotionCreateForm from '@/components/emotions/EmotionCreateForm.vue'

const emotions = ref<Emotion[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const API_URL = import.meta.env.VITE_API_URL

const fetchEmotions = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/emotions`)
    emotions.value = response.data
  } catch (err) {
    error.value = String(err) || 'Une erreur est survenue lors de la récupération des émotions'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchEmotions)
</script>

<template>
  <div class="flex flex-col w-full min-h-screen max-w-7xl p-4 gap-4">
    <h1 class="text-stone-300 text-4xl">Emotions :</h1>
    <EmotionsTable :emotions="emotions" />
    <EmotionCreateForm />
  </div>
</template>
