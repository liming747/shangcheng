import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const modulesA = {  
  state:{
    name:"yizeruier"
  },
  getters:{
    // rootstate
  },
  actions:{
   
  }
}
export default new Vuex.Store({
  state: {
    carlist:[]
  },
  mutations,
  getters,
   // 在actions里 context 表示 state
  actions,
  modules: {
    a:modulesA
  }
})
