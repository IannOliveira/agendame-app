// Composables
import { createRouter, createWebHistory } from 'vue-router'
import {auth, redirectIfAuthenticated} from "@/router/guard";
import { useAuth } from "@/store/auth";


const routes = [
  {
    path: '/login',
    component: () => import('@/layouts/Auth.vue'),
    beforeEnter: redirectIfAuthenticated,
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/Login.vue')
      }
    ],
  },
  {
    path: '/cadastrar',
    component: () => import('@/layouts/Auth.vue'),
    children: [
      {
        path: '',
        name: 'cadastrar',
        component: () => import('@/views/Register.vue')
      }
    ],
  },
  {
    path: '/verificar-email',
    component: () => import('@/layouts/Auth.vue'),
    children: [
      {
        path: '',
        name: 'verifyEmail',
        component: () => import('@/views/VerifyEmail.vue')
      }
    ],
  },
  {
    path: '/esqueci-senha',
    component: () => import('@/layouts/Auth.vue'),
    children: [
      {
        path: '',
        name: 'forgotPassword',
        component: () => import('@/views/ForgotPassword.vue')
      }
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/Dashboard.vue'),
    beforeEnter: auth,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
    ],
  },
  {
        path: '/planos',
        name: 'plans',
        component: () => import('@/views/Plans.vue'),
  },
  {
    path: '/assinatura/sucesso',
    name: 'subscriptionSuccess',
    component: () => import('@/views/Subscription/Success.vue'),
  },
  {
    path: '/assinatura/cancelado',
    name: 'subscriptionCancel',
    component: () => import('@/views/Subscription/Cancel.vue'),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) =>{
  const authStore = useAuth()
  authStore.sanctum();
  next()
})
export default router
