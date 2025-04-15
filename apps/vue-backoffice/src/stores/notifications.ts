// stores/notifications.ts
import { defineStore } from 'pinia'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: number
  type: NotificationType
  message: string
  duration?: number
}

let nextId = 1

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as Notification[],
  }),

  actions: {
    create(type: NotificationType, message: string, duration = 5000) {
      const id = nextId++
      const notification: Notification = { id, type, message, duration }

      this.notifications.push(notification)

      setTimeout(() => {
        this.remove(id)
      }, duration)
    },

    createSuccess(message: string, duration?: number) {
      this.create('success', message, duration)
    },

    createError(message: string, duration?: number) {
      this.create('error', message, duration)
    },

    createInfo(message: string, duration?: number) {
      this.create('info', message, duration)
    },

    createWarning(message: string, duration?: number) {
      this.create('warning', message, duration)
    },

    remove(id: number) {
      this.notifications = this.notifications.filter((n) => n.id !== id)
    },
  },
})
