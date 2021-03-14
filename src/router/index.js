import { createRouter, createWebHistory } from 'vue-router'
import ExerciseList from '../views/exercise/ExerciseList.vue'
import Create from '../views/exercise/Create.vue'
import Login from '../views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'ExerciseList',
        component: ExerciseList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/exercices',
        name: 'ExerciseList',
        component: ExerciseList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/exercices/creation',
        name: 'Exercise.create',
        component: Create,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/connexion',
        name: 'Login',
        component: Login,
        meta: {
            guest: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('user_token') == null) {
            next({
                path: '/connexion',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if ((user.isAdmin || user.isCoach || user.isUser) && !user.exclude) {
                next()
            } else {
                next({
                    path: '/connexion',
                    params: {
                        nextUrl: to.fullPath
                    }
                })
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('user_token') == null) {
            console.log(localStorage.getItem('user_token'));
            next()
        }
        else {
            //ici
            next({
                path: '/exercices',
                params: {
                    nextUrl: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})

/*router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('user_token') == null) {
            next({
                path: '/connexion',
                params: {
                    nextUrl: to.fullPath
                }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))

            if ((user.isAdmin || user.isCoach || user.isUser) && !user.isExclude) {
                next()
            } else {
                next({
                    path: '/connexion',
                    params: {
                        nextUrl: to.fullPath
                    }
                })
            }

        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('user_token') == null) {
            next()
        } else {
            next({ path: '/exercices' })
        }
    } else {
        next()
    }
})*/

export default router
