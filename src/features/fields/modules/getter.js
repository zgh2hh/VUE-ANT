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

/** 获取农事活动 **/
export const fieldActivities = (state) => {
  let list = state.detail.activities || [];
  return list.map((actv) => {
    return {
      typeId: actv.activity_type_id,
      typeName: actv.activity_type_name,
      comment: actv.comment,
      cropId: actv.crop_id,
      cropName: actv.crop_name,
      // time: formateDateAsYMD(new Date(actv.time)),
      time: dateFormat(new Date(actv.time), 'YYYY-MM-DD HH'),
      who: actv.who
    };
  })
}

/** 获取传感器参数 **/
export const monitor = (state) => {
  return state.detail.monitor;
};
