<script setup lang="ts">
import { ref } from 'vue'
import axios from '@/services/axiosInstance'
import { useNotificationStore } from '@/stores/notifications'

const color = ref('#')
const translations = ref([{ language: '', name: '' }])

const addTranslation = () => {
  translations.value.push({ language: '', name: '' })
}

const removeTranslation = (index: number) => {
  translations.value.splice(index, 1)
}

const notificationStore = useNotificationStore()

const handleSubmit = async () => {
  try {
    const payload = {
      color: color.value,
      translations: translations.value.filter((t) => t.language && t.name),
    }

    if (!payload.color || payload.translations.length === 0) {
      notificationStore.createError('Color and at least one translation are required !')
      return
    }

    await axios.post('/emotions', payload)

    notificationStore.createSuccess('Emotion created successfully !')
    color.value = '#'
    translations.value = [{ language: '', name: '' }]
  } catch (err) {
    console.log(err)
    notificationStore.createError('Error creating emotion !')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-stone-800 p-6 rounded-xl shadow space-y-4">
    <h2 class="text-xl font-semibold text-stone-100">Create a new Emotion</h2>

    <!-- Color Picker -->
    <div>
      <label class="block text-sm font-medium text-stone-300 mb-1">Color (hex)</label>
      <div class="flex items-center gap-2">
        <input v-model="color" type="color" class="w-10 h-10 border-none rounded cursor-pointer" />
        <input
          v-model="color"
          type="text"
          class="w-full rounded-sm px-3 py-2 text-stone-300 border-1"
          placeholder="#FF5733"
        />
      </div>
    </div>

    <!-- Translations -->
    <div>
      <label class="block text-sm font-medium text-stone-300 mb-2">Translations</label>
      <div class="space-y-2">
        <div
          v-for="(t, index) in translations"
          :key="index"
          class="flex gap-2 items-center hover:bg-stone-700 p-2 rounded transition"
        >
          <input
            v-model="t.language"
            type="text"
            placeholder="Language (e.g. en, fr)"
            class="w-1/3 rounded-sm px-3 py-2 text-stone-300 border-1"
          />
          <input
            v-model="t.name"
            type="text"
            placeholder="Emotion name"
            class="w-2/3 rounded-sm px-3 py-2 text-stone-300 border-1"
          />
          <button
            type="button"
            @click="removeTranslation(index)"
            class="text-red-500 hover:text-red-300 text-sm w-8"
          >
            ✕
          </button>
        </div>
      </div>
      <button
        type="button"
        @click="addTranslation"
        class="mt-2 text-xs text-blue-400 hover:underline cursor-pointer"
      >
        + Add translation
      </button>
    </div>

    <!-- Submit -->
    <button
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
    >
      Create Emotion
    </button>
  </form>
</template>
