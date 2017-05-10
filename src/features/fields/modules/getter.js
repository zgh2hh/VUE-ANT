import {formateDateAsYMD} from '../../common/utils'
import { dateFormat } from 'vux'

/** 田块 */
export const fieldList = (state) => {
  let list = state.fields.list || [];
  return list.map((field) => {
    return {
      id: field.field_id,
      src: field.thumbnail_url,
      title: field.field_name,
      desc: `${field.area_size}亩`,
      url: 'www.qmant.com'
    };
  })
}

/** 田块详情 **/
export const fieldInfo = (state) => state.detail.info

/** 获取传感器参数 **/
export const monitor = (state) => {
  return state.detail.monitor;
};
