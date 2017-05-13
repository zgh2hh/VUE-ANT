import * as types from './mutationTypes'
import * as actions from './action'
import * as getters from './getter'

const state = {
  homeFieldList: []
};

const mutations = {
  [types.GET_HOME_FIELD_LIST] (state, data) {
    state.homeFieldList = data.fieldList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
