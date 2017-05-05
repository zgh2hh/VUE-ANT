import * as types from './mutationTypes'
import * as actions from './action'
import * as getters from './getter'

const state = {
  subTypes: [],
  pengList: [],
  water: [],
  weather: []
};

const mutations = {
  [types.GET_SUBTYPES] (state, data) {
    state.subTypes = data.subTypes;
  },
  [types.GET_PENG_LIST] (state, data) {
    state.pengList = data.pengList;
  },
  [types.GET_WATER_INFO] (state, data) {
    state.water = data.water;
  },
  [types.GET_WEATHER_INFO] (state, data) {
    state.weather = data.weather;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
