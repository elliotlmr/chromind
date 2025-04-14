<template>
    <Sidebar />

    <main class="pl-80 min-w-screen min-h-screen">
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import Sidebar from '@/components/layouts/SideBarMenu.vue';
</script>