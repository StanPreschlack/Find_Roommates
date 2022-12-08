import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"
import MakeProfile from "../views/MakeProfile.vue"
import Main from "../views/Main.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: "/make-profile",
      component: MakeProfile
    },
    {
      path: "/home",
      component: Main
    },
  ]
})

export default router
