<script setup lang="ts">
import { useNotificationStore, type NotificationType } from '@/stores/notifications'
import BaseButton from '@/components/BaseButton.vue'
import CreatedAccounts from '@/components/dashboard/CreatedAccounts.vue'
import UsersCount from '@/components/dashboard/UsersCount.vue'
import EntriesDailySubmissions from '@/components/dashboard/EntriesDailySubmissions.vue'

const notifications = useNotificationStore()

const handleNotification = (type: NotificationType) => {
  notifications.create(type, `This is a ${type} notification`)
}
</script>

<template>
  <div class="flex flex-col w-full min-h-screen max-w-7xl p-4 gap-4">
    <h1 class="text-stone-300 text-4xl">Dashboard :</h1>
    <div class="flex flex-row h-100 w-full max-w-full gap-4 relative">
      <UsersCount />
      <CreatedAccounts />
    </div>
    <EntriesDailySubmissions />
    <div class="flex flex-row w-full mt-auto mb-0 justify-between">
      <BaseButton @click="handleNotification('error')" variant="error">Error</BaseButton>
      <BaseButton @click="handleNotification('warning')" variant="warning">Warning</BaseButton>
      <BaseButton @click="handleNotification('info')" variant="info">Info</BaseButton>
      <BaseButton @click="handleNotification('success')" variant="success">Success</BaseButton>
    </div>
  </div>
</template>
