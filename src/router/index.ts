import Vue from 'vue'
import VueRouter, { RawLocation }  from 'vue-router'
import Login from '../views/Login/index.vue'
import Home from '../views/Home/index.vue'
import store from '@/store'
import { generateRoutes } from './permission'

/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation) {
  return (<any>(routerPush.call(this, location))).catch((error: any)=> error)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login
  },
 
  // {
  //   path: '/',
  //   component: Home,
  //   redirect: '/dashboard',
  //   name: '',
  //   iconCls: 'el-icon-s-help',
  //   leaf: true,
  //   children: [
  //     {
  //       path: '/dashboard',
  //       name: '首页',
  //       component: () => import('../views/Dashboard/index.vue')
  //     }
  //   ]
  // }, 
  {
    path: '/',
    component: Home,
    name: '',
    redirect: '/goods',
    iconCls: 'el-icon-s-grid',
    leaf: true,
    children: [
      {
        name: '商品',
        path: '/goods',
        component: () => import('../views/Goods/index.vue'),
        meta: {
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-star-on',
    leaf: true,
    hidden: true,  // 路由是否在侧边导航栏中显示
    children: [
      {
        name: '404页面',
        path: '/404',
        component: () => import('../views/ErrorPage/404.vue')
      }
    ]
  }
]

const asyncRoutes = [
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-tickets',
    leaf: true,
    children: [
      {
        name: '订单',
        path: '/order',
        component: () => import('../views/Order/index.vue'), 
        meta: {
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-document-copy',
    leaf: true,
    children: [
      {
        name: '清单',
        path: '/inventory',
        component: () => import('../views/AdminTable/index.vue'),
        meta: {
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '公共字典',
    iconCls: 'el-icon-s-data',
    leaf: false,
    children: [
      {
        name: '申报口岸',
        iconCls: 'el-icon-help',
        path: '/exit',
        component: () => import('../views/Charts/index.vue'),
        meta: {
          roles: ['admin']
        }
      },
      {
        name: '单位字典',
        iconCls: 'el-icon-document',
        path: '/dict',
        component: () => import('../views/Icon/index.vue'),
        meta: {
          roles: ['admin', 'editor']
        }
      },
      {
        name: '国家字典',
        iconCls: 'el-icon-reading',
        path: '/country',
        component: () => import('../views/Country/index.vue'),
        meta: {
          roles: ['admin', 'editor']
        }
      },
      {
        name: '运输方式',
        iconCls: 'el-icon-reading',
        path: '/transport',
        component: () => import('../views/Order/index.vue'),
        meta: {
          roles: ['admin', 'editor']
        }
      }
    ]
  }, 
  {
    path: '*',
    redirect: '/404',  // 重定向到404页面
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

var flag = true  // 页面刷新标志
router.beforeEach((to, from, next) => {  
  if (to.path == '/login') {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('pass');
    store.dispatch('app/ResetRouter');  // 全局路由tag重置
    flag = true
  }
  let admin = <String>sessionStorage.getItem('name');
  if (!admin && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    // 该处进行动态路由生成（当页面刷新时或首次进入该系统时，生成路由）
    if (flag && to.path !== '/login') {
      flag = false
      router['options'].routes = routes
      let generateAsyncRoutes = generateRoutes(asyncRoutes, <string>sessionStorage.getItem('name'))  // 根据登录角色生成动态路由
      router.addRoutes(generateAsyncRoutes)
      router['options'].routes = router['options'].routes.concat(generateAsyncRoutes)
      next({ ...to, replace: true })  // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
    } else {
      // 以下部分为向全局变量中添加路由历史，形成tag标签
      if (to.path !== '/login') {
        let newPath = {
          name: to.name,
          path: to.fullPath
        }
        store.dispatch("app/AddRouter", newPath)  // 向全局变量中添加路由
      }
      next()
    }
  }
});

export default router
