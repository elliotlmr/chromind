<script lang="ts" setup>
import { RouterLink } from 'vue-router'

defineOptions({
    inheritAttrs: false,
})

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <RouterLink v-bind="$attrs" :to="props.to" v-slot="{ isActive, navigate }" class="w-full">
        <button @click="navigate" :class="isActive ? 'bg-stone-700' : 'bg-stone-800'"
            class="w-full p-2 rounded-sm cursor-pointer hover:bg-stone-700 transition">{{ props.title
            }}</button>
    </RouterLink>
</template>