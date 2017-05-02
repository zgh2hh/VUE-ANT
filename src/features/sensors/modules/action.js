import Vue from 'vue'
import axios from '@/config/http'
import * as types from './mutationTypes'
import {commonToast} from '../../common/toast'

/** 获取所有田块列表 **/
export const getAllFields = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'api/field/list',
      params: {
        ...params
      }
    }).then((res) => {
      commonToast(res);
      let result = res.data;
      if(result){
        commit(types.GET_FIELDS, {
          area: result.data.total_area,
          count: result.data.total_field,
          list: result.data.field_list
        });
      }
      resolve(result);
    }).catch((res)=>{
      reject(res);
    })
  })
}

/** 获取田块信息 **/
export const getFieldInfo = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'api/field/info',
      params: {
        ...params
      }
    }).then((res) => {
      let result = res.data;
      console.log(result);
      if(result){
        commit(types.GET_FIELD_INFO, {
          pic: result.data.thumbnail_url,
          fieldName: result.data.field_name,
          area: result.data.area_size,
          userName: result.data.user_name,
          weatherMonitor: result.data.weather_monitor_name,
          waterMonitor: result.data.water_monitor_name
        });
      }
      resolve(result);
    }).catch((res) => {
      reject(res);
    })
  })
}

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

/** 获取传感器数据 **/
export const getMonitorData = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'api/field/monitor',
      params: {
        ...params
      }
    }).then((res) => {
      let result = res.data;
      if(result){
        commit(types.GET_MONITOR_DATA, {
          waterMonitor: result.data.water_monitor,
          weatherMonitor: result.data.weather_monitor
        })
      }
      resolve(result);
    }).catch((res) => {
      reject(res);
    })
  })
}
