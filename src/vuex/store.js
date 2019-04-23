import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import commManage from './modules/commManage'
import interactive from './modules/interactive'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    commManage,
    interactive
  }
})
