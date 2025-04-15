<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number
    color?: string
  }>(),
  {
    size: 32,
    color: '#3b82f6', // Tailwind blue-500
  },
)
</script>

<template>
  <div
    class="animate-spin rounded-full border-4 border-t-transparent"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px',
      borderColor: props.color,
      borderTopColor: 'transparent',
    }"
  />
</template>
