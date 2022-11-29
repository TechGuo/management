import Cookie from "js-cookie"


export default {
  state: {
    isCollapse: false,//控制菜单的展开还是收起
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      }
    ],
    menu: [],
    currentMenu: null
  },
  mutations: {
    collapseMenu(state) {
      // state = this.state修改菜单展开收起的方法
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      if (val.name !== 'home') {
        const index = state.tabsList.findIndex(item =>
          item.name === val.name
        )
        //if not exist
        if (index === -1) {
          state.tabsList.push(val);
        }
      } else {
        state.currentMenu = null
      }
    },
    closeTag(state, item) {
      //删除操作
      const index = state.tabsList.findIndex(val => item.name === val.name)
      state.tabsList.splice(index, 1)
    },
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    addMenu(state, router) {
      // 判断缓存中是否有数据
      if (!Cookie.get('menu')) return
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      // 组装动态路由的数据
      const menuArray = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            // console.log(item.url)
            item.component = () => import(`./views${item.path}/index.vue`)
            return item
          })
          menuArray.push(...item.children)
        } else {
          // console.log(item.url)
          item.component = () => import(`./views${item.path}/index.vue`)
          menuArray.push(item)
        }
      })
      // console.log(menuArray, 'menuArray')
      // 路由的动态添加
      menuArray.forEach(item => {
        router.addRoute('Main', item)
      })
    }

  }
}