import * as types from './mutationTypes'
import * as actions from './action'
import * as getters from './getter'

const state = {
  allActivities: [],
};

const mutations = {
  [types.GET_ALL_ACTIVITIES] (state, data) {
    state.allActivities = data.activities;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
