import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use( VueRouter );


// 创建一个路由对象
let router = new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/',
            // name: 'Main',
            component: () => import('@/views/home/index.vue'),
            children: [
                {
                    path: '',
                    name: 'Product',
                    component: () => import('@/views/product/index.vue'),
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login/index.vue')
        }
    ]
})

export default router;