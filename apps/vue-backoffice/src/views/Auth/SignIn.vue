<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { signin } from '@/services/authService';

const email = ref('');
const password = ref('');
const auth = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
    try {
        const data = await signin(email.value, password.value);
        auth.login(data.access_token);
        router.push('/dashboard');
    } catch (err) {
        console.log(err);
    }
};
</script>

<template>
    <div class="flex items-center justify-center w-full max-w-sm">
        <form @submit.prevent="handleLogin" class="border-1 p-6 rounded-md shadow w-full flex flex-col gap-4">
            <input v-model="email" placeholder="Email" class="mb-3 w-full p-2 border rounded-sm" />
            <input v-model="password" placeholder="Password" type="password"
                class="mb-3 w-full p-2 border rounded-sm" />
            <button class="bg-stone-700 hover:bg-stone-600 transition cursor-pointer text-white w-full py-2 rounded"
                type="submit">Login</button>
        </form>
    </div>
</template>