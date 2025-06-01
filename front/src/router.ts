import { createWebHistory, createRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import TodosView from '@/views/todos/index.vue'
import Dashboard from '@/views/dashboard/index.vue'
import Login from '@/views/login/index.vue'
import AuthCallback from '@/views/authCallback/index.vue'

const routes = [
  { path: '/', component: TodosView, meta: { requiresAuth: true } },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  {
    path: '/login',
    name: 'Login',
    component:  Login, 
    meta: { requiresGuest: true }
  },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallback,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ルートガード
router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()
  
  // 認証が必要なページ
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // ゲスト専用ページ（ログイン済みの場合はホームへ）
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/')
    return
  }
  
  next()
})

export default router
