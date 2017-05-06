import Vue from 'vue'
import axios from '@/config/http'
import * as types from './mutationTypes'
import {commonToast} from '../../common/toast'

/** 获取所有监测值子类 **/
export const getSubTypes = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'api/sensor/subtype',
      params: {
        ...params
      }
    }).then((res) => {
      commonToast(res);
      let result = res.data;
      if(result){
        commit(types.GET_SUBTYPES, {
          subTypes: result.data
        });
      }
      resolve(result);
    }).catch((res)=>{
      reject(res);
    })
  })
}

/** 获取所有监测点 **/
export const getPengList = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'api/sensor/penglist',
      params: {
        ...params
      }
    }).then((res) => {
      let result = res.data;
      if(result){
        commit(types.GET_PENG_LIST, {
          pengList: result.data
        });
      }
      resolve(result);
    }).catch((res) => {
      reject(res);
    })
  })
}

/** 获取所有水质信息 **/
export const getWaterInfo = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'api/sensor/water',
      params: {
        ...params
      }
    }).then((res) => {
      let result = res.data;
      if(result){
        commit(types.GET_WATER_INFO, {
          water: result.data
        });
      }
      resolve(result);
    }).catch((res) => {
      reject(res);
    })
  })
}

/** 获取所有气象信息 **/
export const getWeatherInfo = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'api/sensor/weather',
      params: {
        ...params
      }
    }).then((res) => {
      let result = res.data;
      if(result){
        commit(types.GET_WEATHER_INFO, {
          weather: result.data
        });
      }
      resolve(result);
    }).catch((res) => {
      reject(res);
    })
  })
}

/** 获取所有历史数据 **/
export const getHistoryData = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'api/sensor/history',
      params: {
        ...params
      }
    }).then((res) => {
      let result = res.data;
      if(result){
        commit(types.GET_HISTORY_DATA, {
          history: result.data
        });
      }
      resolve(result);
    }).catch((res) => {
      reject(res);
    })
  })
}
