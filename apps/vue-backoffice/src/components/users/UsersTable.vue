<script setup lang="ts">
import type { User } from '@/types/users.types'
import LoadSpinner from '../LoadSpinner.vue'

const props = defineProps({
  users: {
    type: Array as () => User[] | undefined,
    required: true,
  },
})

const formatDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString()
}
</script>

<template>
  <div class="overflow-x-auto bg-stone-800 rounded-xl shadow p-4">
    <table class="min-w-full divide-y divide-stone-300">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left text-sm font-semibold text-stone-300">ID</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-stone-300">Email</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-stone-300">Role</th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-stone-300">Created At</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-stone-300">
        <template v-if="props.users">
          <tr v-for="user in props.users" :key="user.id" class="hover:bg-stone-500 transition">
            <td class="px-4 py-2 text-sm text-stone-300">{{ user.id }}</td>
            <td class="px-4 py-2 text-sm text-stone-300">{{ user.email }}</td>
            <td class="px-4 py-2 text-sm text-stone-300">
              <span
                class="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800': user.role === 'ADMIN',
                  'bg-blue-100 text-blue-800': user.role === 'USER',
                }"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-4 py-2 text-sm text-stone-300">
              {{ formatDate(user.createdAt) }}
            </td>
          </tr>
        </template>
        <tr v-else class="hover:bg-gray-50">
          <td class="px-4 py-4 text-center" colspan="3">
            <div class="flex justify-center items-center">
              <LoadSpinner :size="24" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
