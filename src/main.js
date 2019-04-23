// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './vuex/store'
import router from './router/index'
import axios from 'axios'
import api from './service/api'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { getStore, setStore } from './tool/Utils'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import glbConfig from './plugins/glbConfig'
import echarts from "echarts"
Vue.use(glbConfig)
Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  // store.dispatch('setRouters')

  if (to.path.indexOf('/store/') !== -1 || to.path.indexOf('/financeCenter/') !== -1) {
    axios.defaults.headers.common['isAllStore'] = 'Y'
  } else {
    axios.defaults.headers.common['isAllStore'] = 'N'
  }
  // console.log(store.state.user.addRouters)
  if (to.path !== '/recoverPwd' && to.path !== '/registered' && to.path !== '/' && to.path !== '/mHome') {
    if (getStore('token') === null && to.path !== '/login') {
      next('/login')
    } else if (to.path !== '/login' && !store.state.user.perms) {
      // next()
      store.dispatch('getButtons')
      store.dispatch('setRouters').then((data) => {
      //   router.addRoutes(data)
      //   next({ ...to })
        let auth = store.state.user.addRouters
        function checkFirst (item, index, arr) {
          return item.path && item.path === to.matched[0].path ? item : ''
        }
        function checkSecond (item, index, arr) {
          return to.matched[1] && to.matched[1].path.indexOf(item.path) !== -1 ? item : ''
        }
        function checkThird (item, index, arr) {
          return to.matched[2] && to.matched[2].path.indexOf(item.path) !== -1 ? item : ''
        }
        // console.log(to)
        // console.log(auth)
        // console.log(auth.find(checkFirst))
        if (auth.find(checkFirst)) {
          if (!auth.find(checkFirst).storeAuthed) {
            next(false)
            ElementUI.Message.error('您没有该权限！')
          } else {
            if (auth.find(checkFirst).children && auth.find(checkFirst).children.find(checkSecond)) {
              if (!auth.find(checkFirst).children.find(checkSecond).storeAuthed) {
                next(false)
                ElementUI.Message.error('您没有该权限！')
              } else {
                if (auth.find(checkFirst).children.find(checkSecond).children && auth.find(checkFirst).children.find(checkSecond).children.find(checkThird)) {
                  if (!auth.find(checkFirst).children.find(checkSecond).children.find(checkThird).storeAuthed) {
                    next(false)
                    ElementUI.Message.error('您没有该权限！')
                  } else {
                    // setStore('menuId', auth.find(checkFirst).children.find(checkSecond).children.find(checkThird).id)
                    if (to.path.indexOf('/magicBox/') !== -1) {
                      axios.defaults.headers.common['menuId'] = auth.find(checkFirst).children.find(checkSecond).children.find(checkThird).id
                    } else {
                      axios.defaults.headers.common['menuId'] = ''
                    }
                    next()
                  }
                } else {
                  next()
                }
              }
            } else {
              next()
            }
          }
        } else {
          next()
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
  // next()
})
// Vue.mixin({
//   data () {
//     return {

//     }
//   },
//   created: function () {
//     // store.dispatch('getButtons').then(data => {
//     //   console.log(data)
//     // })
//     console.log(document.getElementsByTagName('button'))
//   }
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
