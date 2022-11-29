import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from '../router'
import store from './store/index.js'
import Axios from 'axios'
import '../api/mock'
import Cookie from 'js-cookie'

// import vueConfig from 'vue.config';

// import './src/less/index.less';

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token是否存在
  const token = Cookie.get('token')
  //token不存在说明当前用户是未登录，应该跳转至登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = Axios

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
