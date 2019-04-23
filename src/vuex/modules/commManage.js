import * as types from '../types'
const state = {
  isAllChoose: false,
  commoditySort: ''
}
const actions = {
  updateChoose ({commit}, params) {
    commit(types.COMM_CHOOSE, params)
  },
  updateCommSort ({commit}, params) {
    commit(types.COMM_SORT, params)
  }
}
const getters = {
  isAllChoose: state => state.isAllChoose,
  commoditySort: state => state.commoditySort
}
const mutations = {
  [types.COMM_CHOOSE] (state, params) {
    state.isAllChoose = params
  },
  [types.COMM_SORT] (state, params) {
    state.commoditySort = params
  }
}
export default {
  state,
  actions,
  getters,
  mutations
}
