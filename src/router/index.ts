import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/Index.vue'
import Login from '../pages/Login.vue'
import Story from '../pages/Story.vue'
import About from '../pages/About.vue'
import Signup from '../pages/Signup.vue'
import Profile from '../pages/Profile.vue'
import Energy from '../pages/Energy.vue'

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
            name: 'About',
            component: About
        },
        {
            path:'/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path:'/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/energy',
            name: 'Energy',
            component: Energy
        }

    ]

    

})

export default router