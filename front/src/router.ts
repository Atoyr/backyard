import { createMemoryHistory, createRouter } from 'vue-router'
import TodosView from '@/pages/todos/index.vue'
import Dashboard from '@/pages/dashboard/index.vue'

const routes = [
  { path: '/', component: TodosView },
  { path: '/dashboard', component: Dashboard },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
