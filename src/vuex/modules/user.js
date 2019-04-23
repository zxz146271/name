// import * as types from '..pes'
// import api from '../..rvice/api'
// import {getStore} from '../../tool/Utils'
// import router from '../../router/index'
import api from '../../service/api'
import { routes } from '../../router/router'
const state = {
  isLoading: false,
  isDrawer: false,
  userInfo: '',
  userStates: '',
  perms: false, // 权限
  routers: routes, // 管理员免权限
  addRouters: [],
  powerButton: [],
  storeInfo: '',
  storeId: '',
  storeName: '',
  notReadCount: 0,
  // 优惠券初始化活动状态
  couponChooseIndex: 1,
  // 秒杀活动初始化活动状态
  seckillChooseIndex: 1,
  // 团购初始化活动状态
  groupBuyChooseIndex: 1,
  // 联盟活动初始化活动状态
  unionChoodeIndex: 1,
  // 联盟优惠券出示话活动状态
  unionCouponChooseIndex: 1,
  // 营销活动左侧工具栏
  marketingLeftIndex: 0
}
const getters = {
  addRouters: state => state.addRouters,
  powerButton: state => state.powerButton,
  storeInfo: state => state.storeInfo,
  storeId: state => state.storeId,
  storeName: state => state.storeName,
  notReadCount: state => state.notReadCount,
  couponChooseIndex: state => state.couponChooseIndex,
  seckillChooseIndex: state => state.seckillChooseIndex,
  groupBuyChooseIndex: state => state.groupBuyChooseIndex,
  unionChoodeIndex: state => state.unionChoodeIndex,
  unionCouponChooseIndex: state => state.unionCouponChooseIndex,
  marketingLeftIndex: state => state.marketingLeftIndex

}

// function getansycRoutes (tmpRoutes, perms) {
//   // 处理角色权限
//   const result = tmpRoutes.filter(route => {
//     if (perms.indexOf(route.meta.role) !== -1) {
//       if (route.children !== undefined) {
//         route.children = getansycRoutes(route.children, perms)
//       }
//       return true
//     }
//     return false
//   })
//   return result
// }

const mutations = {
  GET_POWERBUTTONS: (state, buttons) => {
    state.powerButton = buttons
  },
  SET_ROUTERS: (state, asRouters) => { // 筛选路由表
    // state.routers = routes.concat(asRouters)
    state.addRouters = asRouters
    // console.log(state.addRouters)
    // router.addRoutes(state.addRouters)
    // state.perms = true
  },
  SET_PERM: (state, bool) => {
    state.perms = bool
  },
  CLEAR_ROUTERS: (state) => { // 刷新路由表
    localStorage.clear()
    state.perms = false
    state.routers = routes // 管理员免权限
    state.addRouters = []
    window.location.reload()
  },
  GET_STROEINFO: (state, info) => {
    state.storeInfo = info
  },
  GET_STROEID: (state, info) => {
    state.storeId = info
  },
  GET_STROENAME: (state, info) => {
    state.storeName = info
  },
  GET_NOTREADCOUNT: (state, info) => {
    state.notReadCount = info
  },
  // 以下五个为营销活动状态记录
  GET_COUPONCHOOSEINDEX: (state, info) => {
    state.couponChooseIndex = info
  },
  GET_SECKILLCHOOSEINDEX: (state, info) => {
    state.seckillChooseIndex = info
  },
  GET_GROUPBUYCHOOSEINDEX: (state, info) => {
    state.groupBuyChooseIndex = info
  },
  GET_UNIONCHOODEINDEX: (state, info) => {
    state.unionChoodeIndex = info
  },
  GET_UNIONCOUPONCHOOSEINDEX: (state, info) => {
    state.unionCouponChooseIndex = info
  },
  GET_MARKETINGLEFTINDEX: (state, info) => {
    state.marketingLeftIndex = info
  }
}
const actions = {
  setRouters ({ commit }) {
    // 触发权限路由
    return new Promise(resolve => {
      api.getMenuList().then(res => {
        if (res.code === 0) {
          let perMenu = res.data
          commit('SET_ROUTERS', perMenu)
          // console.log(perMenu)
          // router.addRoutes(state.addRouters)
          resolve(state.addRouters)
        }
      }).catch((res) => {
        console.log(res)
      })

      // commit('SET_ROUTERS', ansycRoutes)
      // console.log(state.addRouters)
      // router.addRoutes(state.addRouters)
      // resolve(state.addRouters)
    })
  },
  setPerm ({ commit }) {
    commit('SET_PERM', false)
  },
  getButtons ({ commit }) {
    return new Promise(resolve => {
      api.getPowerButton().then(res => {
        commit('GET_POWERBUTTONS', res.data)
        resolve(state.powerButton)
      })
    })
  },
  clearRouters ({ commit }) {
    return new Promise(resolve => {
      commit('CLEAR_ROUTERS')
      resolve()
    })
  },
  setStoreInfo ({commit}, info) {
    commit('GET_STROEINFO', info)
  },
  setStoreId ({commit}, info) {
    return new Promise(resolve => {
      commit('GET_STROEID', info)
      resolve(info)
    })
  },
  setStoreName ({commit}, info) {
    return new Promise(resolve => {
      commit('GET_STROENAME', info)
      resolve(info)
    })
  },
  // 以下五个为营销活动状态
  setCouponChooseIndex ({commit}, info) {
    return new Promise(resolve => {
      commit('GET_COUPONCHOOSEINDEX', info)
      resolve(info)
    })
  },
  setSeckillChooseIndex ({commit}, info) {
    return new Promise(resolve => {
      commit('GET_SECKILLCHOOSEINDEX', info)
      resolve(info)
    })
  },
  setGroupBuyChooseIndex ({commit}, info) {
    return new Promise(resolve => {
      commit('GET_GROUPBUYCHOOSEINDEX', info)
      resolve(info)
    })
  },
  setUnionChoodeIndex ({commit}, info) {
    return new Promise(resolve => {
      commit('GET_UNIONCHOODEINDEX', info)
      resolve(info)
    })
  },
  setUnionCouponChooseIndex ({commit}, info) {
    return new Promise(resolve => {
      commit('GET_UNIONCOUPONCHOOSEINDEX', info)
      resolve(info)
    })
  },
  setMarketingLeftIndex ({commit}, info) {
    return new Promise(resolve => {
      commit('GET_MARKETINGLEFTINDEX', info)
      resolve(info)
    })
  },
  setNotReadCount ({commit}, info) {
    return new Promise(resolve => {
      commit('GET_MARKETINGLEFTINDEX', info)
      resolve(info)
    })
  }
}
export default {
  state,
  actions,
  getters,
  mutations
}
