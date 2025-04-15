<script setup lang="ts">
import LoadSpinner from '@/components/LoadSpinner.vue'

type EmotionTranslation = {
  id: string
  language: string
  name: string
}

type Emotion = {
  id: string
  color: string
  translations: EmotionTranslation[]
}

const props = defineProps({
  emotions: {
    type: Array as () => Emotion[] | undefined,
    required: true,
  },
})
</script>

<template>
  <div class="overflow-x-auto bg-stone-800 rounded-xl shadow p-4">
    <table class="min-w-full divide-y divide-stone-300">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left text-sm font-semibold text-stone-300">ID</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-stone-300">Color</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-stone-300">Translations</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-stone-300">
        <template v-if="props.emotions?.length">
          <tr
            v-for="emotion in props.emotions"
            :key="emotion.id"
            class="hover:bg-stone-500 transition"
          >
            <td class="px-4 py-2 text-sm text-stone-300">{{ emotion.id }}</td>
            <td class="px-4 py-2 text-sm text-stone-300">
              <span
                class="inline-block w-4 h-4 rounded-full"
                :style="{ backgroundColor: emotion.color }"
              />
              <span class="ml-2 text-xs text-stone-400">{{ emotion.color }}</span>
            </td>
            <td class="px-4 py-2 text-sm text-stone-300 space-y-1">
              <div
                v-for="translation in emotion.translations"
                :key="translation.id"
                class="text-xs text-stone-300"
              >
                <span class="font-medium uppercase text-stone-400"
                  >{{ translation.language }}:</span
                >
                <span>{{ translation.name }}</span>
              </div>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td class="px-4 py-4 text-center" colspan="3">
            <div class="flex justify-center items-center">
              <LoadSpinner :size="24" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
