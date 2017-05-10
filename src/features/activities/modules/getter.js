import {formateDateAsYMD} from '../../common/utils'
import { dateFormat } from 'vux'

/** 获取农事活动 **/
export const allActivities = (state) => {
  let list = state.allActivities || [];
  return list.map((actv) => {
    return {
      input: actv.activity_input,
      typeId: actv.activity_type_id,
      typeName: actv.activity_type_name,
      comment: actv.comment,
      cropId: actv.crop_id,
      cropName: actv.crop_name,
      // time: formateDateAsYMD(new Date(actv.time)),
      fields: actv.fields,
      images: actv.images,
      inputsName: actv.inputs_name,
      time: dateFormat(new Date(actv.time), 'YYYY-MM-DD'),
      who: actv.who
    };
  })
}
