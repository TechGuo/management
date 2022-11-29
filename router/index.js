import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        redirect: '/home'  // 重定向
      },
      {
        path: '/home',
        name: 'home',
        component: () => import("../views/home/index.vue")
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/index.vue')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/mall/index.vue')
      },
      {
        path: '/pageOne',
        name: 'pageOne',
        component: () => import('../views/pageOne/index')
      },
      {
        path: '/pageTwo',
        name: 'pageTwo',
        component: () => import('../views/pageTwo/index')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/login/index.vue")
  }

]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router