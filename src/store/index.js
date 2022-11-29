import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
Vue.use(Vuex)
/* var state = {
  isCollapse: false
}
var mutations = {
  collapseMenu(state) {
    // state = this.state
    state.isCollapse = !state.isCollapse
  }
} */

export default new Vuex.Store({
  modules: {
    tab
  }

})