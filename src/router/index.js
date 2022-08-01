import {createRouter, createWebHistory} from 'vue-router'
import main from '@/page/Main'

const routes = [
    {
        path: '/',
        name: 'home',
        component: main,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
