import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import SignIn from '@/views/Auth/SignIn.vue'
import SignUp from '@/views/Auth/SignUp.vue'
import AuthView from '@/views/Auth/AuthView.vue'
import UsersView from '@/views/UsersView.vue'
import EmotionsView from '@/views/EmotionsView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useAuthStore } from '@/stores/auth'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import { useNotificationStore } from '@/stores/notifications'

interface CustomJwtPayload extends JwtPayload {
  role: 'ADMIN' | 'USER'
}

export const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      title: 'Dashboard',
    },
    showNavigationMenu: true,
  },
  {
    path: 'users',
    name: 'users',
    component: UsersView,
    meta: {
      title: 'Users',
    },
    showNavigationMenu: true,
  },
  {
    path: 'emotions',
    name: 'emotions',
    component: EmotionsView,
    meta: {
      title: 'Emotions',
    },
    showNavigationMenu: true,
  },
  {
    path: ':pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'Emotions',
    },
    showNavigationMenu: false,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: DefaultLayout,
      children: routes,
      meta: {
        requiresAuth: true,
        // requiresAdmin: true,
      },
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      redirect: '/auth/signin',
      meta: {
        title: 'Authentication',
      },
      children: [
        { path: 'signin', name: 'signin', component: SignIn, meta: { title: 'SignIn' } },
        { path: 'signup', name: 'signup', component: SignUp, meta: { title: 'SignUp' } },
      ],
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const notifications = useNotificationStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    notifications.createError('Veuillez vous connecter pour accéder à cette page.')
    return next('/auth/signin')
  }

  if (to.meta.requiresAuth && auth.token) {
    const decoded: CustomJwtPayload = jwtDecode(auth.token)

    if (decoded.role !== 'ADMIN') {
      notifications.createError(
        'Accès refusé : seuls les administrateurs peuvent accéder au backoffice.',
      )
      auth.logout()
      return next('/auth/signin')
    }
  }

  // if (to.meta.requiresAdmin && !auth.isAdmin) {
  //   return next('/auth/signin')
  // }

  document.title = `Chromind Admin | ${to.meta.title}`

  next()
})
