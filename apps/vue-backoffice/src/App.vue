<script setup lang="ts">
import { RouterView } from 'vue-router'
import NotificationToaster from './components/layouts/NotificationToaster.vue';
</script>

<template>
  <RouterView />
  <NotificationToaster />
</template>
