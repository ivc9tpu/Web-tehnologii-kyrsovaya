import { createStore } from 'vuex'
import {basketModule} from './basketModule'
import { authModule } from './authModule'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    basket: basketModule,
    auth: authModule
  }
})
