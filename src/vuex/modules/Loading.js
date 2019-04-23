const state = {
  isLoading: false
}
const actions = {}
const getters = {
  isLoading: state => state.isLoading
}
const mutations = {
  updateLoadingStatus (state, promes) {
    state.isLoading = promes
  }
}
export default {
  state,
  actions,
  getters,
  mutations
}
