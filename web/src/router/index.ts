import { createRouter, createWebHistory } from 'vue-router'
import Landing from "../views/Landing.vue"
import MakeProfile from "../views/MakeProfile.vue"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Landing
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/make-profile",
      component: MakeProfile
    },
    {
      path: "/home",
      component: Home
    },
  ]
})

export default router
