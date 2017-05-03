import Vue from 'vue'
import axios from '@/config/http'
import * as types from './mutationTypes'
import {commonToast} from '../../common/toast'

/** 用户登陆 */
export const login = ({commit}, params) => {
  Vue.$vux.loading.show({text: '请稍候'});
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'noa/login',
      params: {
        ...params
      }
    })
      .then((res) => {
        let result = res.data;
        if(result.code === 20000){
          commit(types.LOGIN, {
            username: params.account,
            userid: result.data.user_id
          });
        }
        Vue.$vux.loading.hide();
        resolve(result);
      })
      .catch((res) => {
        Vue.$vux.loading.hide();
        reject(res.data);
      })
  })
}

/** 发送短信验证码 **/
export const sendCode = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'noa/send/code',
      params: {
        ...params
      }
    }).then((res) => {
      commonToast(res);
      resolve(res.data);
    }).catch((res) => {
      commonToast(res);
      reject(res);
    })
  })
}

/** 验证code **/
export const checkCaptcha = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'noa/check_code',
      params: {
        ...params
      }
    }).then((res) => {
      commonToast(res);
      if(res.data.code === 20000){
        commit(types.CHECK_CODE, {
          phone: params.phone,
          code: params.code,
          op: params.op,
          token: res.data.token
        });
        resolve(res.data);
      }
    }).catch((res)=>{
      reject(res);
    })
  })
}

/** 完善信息 **/
export const register = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'noa/register',
      params: {
        ...params
      }
    }).then((res) => {
      commonToast(res);
      if(res.data.code === 20000){
        commit(types.REGISTER, {
          farmName: params.farm_name,
          owner: params.farmer,
          area: params.area_size
        });
        resolve(res.data);
      }
    }).catch((res)=>{
      reject(res);
    })
  })
}

/** 重置密码 **/
export const reset = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'noa/reset_pwd',
      params: {
        ...params
      }
    }).then((res) => {
      commonToast(res);
      commit(types.RESET, {
        result: res.data.code === 20000
      });
      resolve(res.data);
    }).catch((res)=>{
      reject(res);
    })
  })
}
