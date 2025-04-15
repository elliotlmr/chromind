<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { signin } from '@/services/authService';
import GradientCard from '@/components/GradientCard.vue';
import { useNotificationStore } from '@/stores/notifications';

const notifications = useNotificationStore();

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
        notifications.createError('Invalid email or password');
    }
};
</script>

<template>
    <GradientCard>
        <form @submit.prevent="handleLogin" class="p-6 rounded-sm w-full flex flex-col gap-6">
            <input v-model="email" placeholder="Email" class="mb-3 w-full p-2 border rounded-sm" />
            <input v-model="password" placeholder="Password" type="password"
                class="mb-3 w-full p-2 border rounded-sm" />
            <button class="bg-stone-700 hover:bg-stone-600 transition cursor-pointer text-white w-full py-2 rounded"
                type="submit">Login</button>
        </form>
    </GradientCard>
</template>