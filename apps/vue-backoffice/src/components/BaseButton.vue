<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  variant: 'error' | 'info' | 'warning' | 'success'
}>()

const variantClasses: Record<string, string> = {
  error: 'border-red-600 hover:bg-stone-600',
  info: 'border-blue-600 hover:bg-stone-600',
  warning: 'border-yellow-500 hover:bg-stone-600 text-black',
  success: 'border-green-600 hover:bg-stone-600',
}
</script>

<template>
    <button
      :class="[
        'px-4 py-2 rounded-sm font-medium text-white transition-colors duration-200 border-1 bg-stone-700 cursor-pointer min-w-32',
        variantClasses[props.variant],
      ]"
      v-bind="$attrs"
    >
      <slot />
    </button>
  </template>
