import * as types from './mutationTypes'
import * as actions from './action'
import * as getters from './getter'

const state = {
  user: {
    username: '',
    userid: '',
    token: localStorage.getItem('token')
  },
  register: {
    phone: '',
    code: '',
    token: '',
    farmName: '',
    owner: '',
    area: ''
  },
  forget: {
    phone: '',
    code: false,
    token: '0bc59fa42ce6683a1617e2e05ceb1997',
    result: false
  },
  token: '0bc59fa42ce6683a1617e2e05ceb1997'
  // token: localStorage.getItem('token')
}

const mutations = {
  [types.LOGIN] (state, data) {
    state.user.username = data.username;
    state.user.userid = data.userid;
  },
  [types.USER_TOKEN] (state, data) {
    state.user.token = data
    localStorage.setItem('token', data)
  },
  [types.CHECK_CODE] (state, data) {
    if(data.op == 1){
      state.register.phone = data.phone;
      state.register.code = data.code;
      state.register.token = data.token;
    }else if(data.op == 2){
      state.forget.phone = data.phone;
      state.forget.code = data.code;
      state.forget.token = data.token;
    }

  },
  [types.REGISTER] (state, data) {
    state.register.farmName = data.farmName;
    state.register.owner = data.owner;
    state.register.area = data.area;
  },
  [types.RESET] (state, data) {
    state.forget.result = data.result;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
