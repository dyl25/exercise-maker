import { createRouter, createWebHistory } from 'vue-router'
import ExerciseList from '../views/exercise/ExerciseList.vue'
import Create from '../views/exercise/Create.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'ExerciseList',
    component: ExerciseList
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/exercices',
    name: 'ExerciseList',
    component: ExerciseList
  },
  {
    path: '/exercices/creation',
    name: 'Exercise.create',
    component: Create
  },
  {
    path: '/connexion',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
