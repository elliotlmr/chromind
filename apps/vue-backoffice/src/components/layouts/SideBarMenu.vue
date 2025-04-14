<script setup lang="ts">
import { routes } from '@/router';
import NavLink from '@/components/layouts/NavLink.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
    auth.logout();
    router.push('/login');
};
</script>

<template>
    <header
        class="flex flex-col items-center justify-between w-80 h-full p-4 fixed top-0 left-0 z-10 border-r-1 border-stone-500">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="48" height="48" />

        <nav class="flex flex-col items-center justify-start w-full h-full py-4 gap-4">
            <template v-for="route in routes" :key="route.name">
                <NavLink v-if="route.showNavigationMenu" :title="route.meta.title" :to="route.path" />
            </template>
        </nav>

        <button @click="logout"
            class="w-full p-2 rounded-sm cursor-pointer hover:bg-stone-700 transition">Logout</button>
    </header>
</template>
