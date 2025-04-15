<template>
  <Sidebar />

  <main class="pl-80 w-screen max-w-screen min-h-screen flex justify-center">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import Sidebar from '@/components/layouts/SideBarMenu.vue'
</script>
