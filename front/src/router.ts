import { createWebHistory, createRouter } from 'vue-router'
import TodosView from '@/views/todos/index.vue'
import Dashboard from '@/views/dashboard/index.vue'

const routes = [
  { path: '/', component: TodosView },
  { path: '/dashboard', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
