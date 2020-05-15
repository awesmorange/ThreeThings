// index.js
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations
})