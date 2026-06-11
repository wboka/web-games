import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'
import Landing from './pages/Landing.vue'
import DandelionGame from './games/dandelion/App.vue'

const routes = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/dandelion/',
    component: DandelionGame,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
