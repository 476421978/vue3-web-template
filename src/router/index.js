import { createRouter, createWebHistory } from 'vue-router'
import AuthRouter from './auth'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "Index" */ '../views/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/index.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import(/* webpackChunkName: "403" */ '../views/empty/403.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/empty/404.vue')
  },
  {
    path: '/layout',
    name: 'Layout',
    redirect: '/layout/home',
    component: () => import(/* webpackChunkName: "Layout" */ '../views/layout.vue'),
    meta: {
      requireAuth: true
    },
    children: AuthRouter
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
