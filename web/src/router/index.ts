import { createRouter, createWebHistory } from 'vue-router'

// async components

const Landing = () => import( "../views/Landing.vue")
const Home = () => import("../views/Home.vue")
const Login = () => import("../views/Login.vue")

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
      path: "/home",
      component: Home
    },
  ]
})

export default router
