import Vue from 'vue'
import axios from '@/config/http'
import * as types from './mutationTypes'

/**  获取农事活动 **/
export const getFieldActivities = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'api/field/activity',
      params: {
        ...params
      }
    }).then((res) => {
      let result = res.data;
      if(result){
        commit(types.GET_FIELD_ACTIVITIES, {
          activities: result.data
        })
      }
      resolve(result);
    }).catch((res) => {
      reject(res);
    })
  })
}
