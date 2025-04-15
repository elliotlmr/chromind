<script setup lang="ts">
import { useNotificationStore } from '@/stores/notifications'

const store = useNotificationStore()

function capitalizeSafe(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-4 pointer-events-none">
    <div
      v-for="notification in store.notifications"
      :key="notification.id"
      class="px-4 py-3 rounded-lg shadow-lg text-white w-80 animate-fade-in-down bg-stone-900 border-1"
      :class="{
        'border-green-500': notification.type === 'success',
        'border-red-500': notification.type === 'error',
        'border-blue-500': notification.type === 'info',
        'border-yellow-500': notification.type === 'warning',
      }"
    >
      <p :class="{
        'text-green-500': notification.type === 'success',
        'text-red-500': notification.type === 'error',
        'text-blue-500': notification.type === 'info',
        'text-yellow-500': notification.type === 'warning',
      }">{{capitalizeSafe(notification.type)}} :</p>
      <p>{{ notification.message }}</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.3s ease-out;
}
</style>