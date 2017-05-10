import {state as outerState,
  mutations as outerMutations,
  actions as outerActions,
  getters as outerGetters} from './modules/store';

const state = {
  session:(process.env.NODE_ENV == 'development' ? 'oAnmJxNOk4geid2KrRdZA3ZsUUWc' : ''),
  system:(/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) ? 'IOS' : 'Android')
}

const actions = {
  setSession:({ commit },data) => {
    commit('SESSION', data.amount)
  },
  clearSession:({ commit }) => {
    commit('CLEARSESSION')
  }
}

const getters = {
  Path:(state,getters,rootState) => {
    return rootState.route.path
  },
  Query:(state,getters,rootState) => {
    return rootState.route.query
  },
  Params:(state,getters,rootState) => {
    return rootState.route.params
  },
  System:(state,getters,rootState) => {
    return rootState.common.system
  }
}

const mutations = {
  'SESSION'(state, data) {
    state.session = data
  },
  'CLEARSESSION'(state, data) {
     localStorage.removeItem('token')
     state.token = null
  }
}

export default {
  state: {...state, ...outerState},
  mutations: {...mutations, ...outerMutations},
  actions: {...actions, ...outerActions},
  getters: {...getters, ...outerGetters}
}
