import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home.vue'
import Layout from '@/layout/Layout'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                title: '主页'
            },
            component: Home
        },
        {
            path: '/error/404',
            meta: {
                title: '404'
            },
            name: '404',
            component: () => import('@/views/error/404')
        },
        {
            path: '/account/login',
            meta: {
                title: '欢迎登录'
            },
            name: 'Login',
            component: () => import('@/views/account/login')
        },
        // 注意，所有路由必须为本路由的子路由
        {
            path: '/:routeParameter',
            name: 'Clinic',
            component: Layout,
            redirect: { name: 'ClinicHome' },
            children: [
                {
                    path: 'index',
                    meta: {
                        title: '主页'
                    },
                    name: 'ClinicHome',
                    component: () => import('@/views/clinicHome')
                }
            ]
        },
        {
            path: '/:routeparameter/commodity/product',
            name: 'Product',
            meta: {
                title: '产品详情'
            },
            component: () => import('@/views/commodity/product')
        },
        {
            path: '*',
            redirect: '/error/404'
        }
    ]
})
