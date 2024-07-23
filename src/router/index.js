import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/Index.vue'
import Login from '../pages/Login.vue'
import Story from '../pages/Story.vue'
import About from '../pages/About.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes : [
        {
            path: '/',
            name: 'Home',
            component: Index
        },
        {
            path:'/login',
            name: 'Login',
            component: Login
        },
        {
            path:'/story',
            name: 'Story',
            component: Story
        },
        {
            path:'/about',
            name: '/about',
            component: About
        }
    ]
})

export default router