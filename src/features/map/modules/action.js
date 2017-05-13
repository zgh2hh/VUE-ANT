/**
 * Created by zgh2hh on 17-5-13.
 */

import Vue from 'vue'
import axios from '@/config/http'
import * as types from './mutationTypes'
import {commonToast} from '../../common/toast'

/** 获取所有田块列表 **/
export const getHomeFieldList = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'api/home/fieldlist',
      params: {
        ...params
      }
    }).then((res) => {
      let result = res.data;
      if(result){
        commit(types.GET_HOME_FIELD_LIST, {
          fieldList: result.data
        });
      }
      resolve(result.data);
    }).catch((res)=>{
      reject(res);
    })
  })
}
