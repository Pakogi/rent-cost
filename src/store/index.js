import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  // TODO process.env.NODE_ENV
  strict: process.env.NODE_ENV !== 'production'
})
