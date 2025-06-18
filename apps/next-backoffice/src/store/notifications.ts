import { create } from 'zustand'

export type Notification = {
  id: string
  message: string
  type: 'error' | 'success' | 'info'
  duration?: number
}

type NotificationStore = {
  notifications: Notification[]
  push: (n: Omit<Notification, 'id'>) => void
  remove: (id: string) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  push: (n) => {
    const id = crypto.randomUUID()
    set((state) => ({
      notifications: [...state.notifications, { ...n, id }],
    }))
    // Auto remove after duration
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((notif) => notif.id !== id),
      }))
    }, n.duration || 3000)
  },
  remove: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notif) => notif.id !== id),
    })),
}))
