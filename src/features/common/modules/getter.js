import {formateDateAsYMD} from '../../common/utils'
import { dateFormat } from 'vux'

/** 获取农事活动 **/
export const fieldActivities = (state) => {
  let list = state.activities || [];
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
