import Vue from 'vue'
import axios from '@/config/http'
import * as types from './mutationTypes'
import {commonToast} from '../../common/toast'

/** 获取所有农事活动 **/
export const getAllActivities = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'api/activity/list',
      params: {
        ...params
      }
    }).then((res) => {
      commonToast(res);
      let result = res.data;
      if(result){
        commit(types.GET_ALL_ACTIVITIES, {
          activities: result.data
        });
      }
      resolve(result);
    }).catch((res)=>{
      reject(res);
    })
  })
}

