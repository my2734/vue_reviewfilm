import { createRouter,createWebHistory } from "vue-router";

import MainLayout from '@/layout/MainLayout.vue'

import HomePage from '@/view/HomePage.vue'
import AboutPage from '@/view/AboutPage.vue'
import MovieDetail from '@/view/MovieDetail.vue'
import CommingSoon from '@/view/CommingSoon.vue'

import PostMovie from '@/view/PostMovie.vue'
import ListMovie from '@/view/ListMovie.vue'

import LoginPage from '@/view/LoginPage.vue'
import RegisterPage from '@/view/RegisterPage.vue'

const routes = [
    { 
        path: '/', 
        component: HomePage,
        name: 'home',
        meta: {
            layout: MainLayout
        }
    },
    {
        path: '/about',
        component: AboutPage,
        meta: {
            layout: MainLayout
        }
    },
    {
        path: '/movie-detail/:id',
        component: MovieDetail,
        name:"moviedetail",
        meta: {
            layout: MainLayout
        }
    },
    {
        path: '/comming-soon',
        component: CommingSoon,
        name:"commingsoon",
        meta: {
            layout: MainLayout
        }
    },
    {
        path: '/login',
        component: LoginPage,
        name:"login",
    },
    {
        path: '/register',
        component: RegisterPage,
        name:"register",
    },
    {
        path: '/post-movie',
        component: PostMovie,
        name:"postmovie",
        meta: {
            layout: MainLayout
        }
    },
    {
        path: '/update-movie/:id',
        component: PostMovie,
        name:"updatemovie",
        meta: {
            layout: MainLayout
        }
    },
    {
        path: '/list-movie',
        component: ListMovie,
        name: 'listmovie',
        meta: {
            layout: MainLayout
        }
    }
]
  
 
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes, // 
})
  
export default router
