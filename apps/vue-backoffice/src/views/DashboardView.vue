<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axiosInstance from '@/services/axiosInstance';

const emotions = ref<undefined[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const API_URL = import.meta.env.VITE_API_URL

const fetchEmotions = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/emotions`);
    emotions.value = response.data;
  } catch (err) {
    error.value = String(err) || 'Une erreur est survenue lors de la récupération des émotions';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchEmotions);
</script>

<template>
  <main>
    <p>hey</p>
  </main>
</template>
