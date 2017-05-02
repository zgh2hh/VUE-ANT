import * as types from './mutationTypes'
import * as actions from './action'
import * as getters from './getter'

const state = {
  fields: {
    total: {
      area: 0,//田块总面积
      count: 0//田块总数目
    },
    list: []
  },
  detail: {
    info: {
      pic: '',
      fieldName: '',
      area: 0,
      userName: '',
      weatherMonitor: '',
      waterMonitor: ''
    },
    activities: [],
    monitor: {
      water: [],
      weather: []
    }
  }
};

const mutations = {
  [types.GET_FIELDS] (state, data) {
    state.fields.total.area = data.area;
    state.fields.total.count = data.count;
    state.fields.list = data.list;
  },
  [types.GET_FIELD_INFO] (state, data) {
    state.detail.info.pic = data.pic;
    state.detail.info.fieldName = data.fieldName;
    state.detail.info.area = data.area;
    state.detail.info.userName = data.userName;
    state.detail.info.weatherMonitor = data.weatherMonitor;
    state.detail.info.waterMonitor = data.waterMonitor;
  },
  [types.GET_FIELD_ACTIVITIES] (state, data){
    state.detail.activities = data.activities;
  },
  [types.GET_MONITOR_DATA] (state, data){
    state.detail.monitor.water = data.waterMonitor;
    state.detail.monitor.weather = data.weatherMonitor;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
