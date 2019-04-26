import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routevuex: [],
    companyIdVuex: ''
  },
  getters: {
    getroute (state, getters, rootState) {
      return state.routevuex
    }
  },
  mutations: {
    setDatas (state, setobj) {
      state[setobj.name] = setobj.value
    }
  },
  actions: {

  }
})
