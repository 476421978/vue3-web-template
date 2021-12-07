import { createStore } from 'vuex'

export default createStore({
  state: {
    stoUser: null
  },
  mutations: {
    SAVE_USER(state, data) {
      state.stoUser = data
    }
  },
  actions: {
    saveUser({ commit }, value) {
      commit('SAVE_USER', value)
    }
  },
  // 局部
  modules: {}
})
