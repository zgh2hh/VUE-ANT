import * as types from './mutationTypes'
import * as actions from './action'
import * as getters from './getter'

const state = {
  activities: []
};

const mutations = {
  [types.GET_FIELD_ACTIVITIES] (state, data){
    state.activities = data.activities;
  }
};

export {
  state,
  mutations,
  actions,
  getters
}
