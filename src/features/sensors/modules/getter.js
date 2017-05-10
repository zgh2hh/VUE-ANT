
/** 统计项子类明细 */
export const subTypes = (state) => state.subTypes
/** 获取所有监测点 **/
export const pengList = (state) => state.pengList
/** 获取所有水质信息 **/
export const water = (state) => state.water
/** 获取气息那个信息 **/
export const weather = (state) => state.weather
/** 获取历史信息 **/
export const history = (state) => {
  if(state.history &&  state.history.constructor == Array && state.history.length > 0){
    var x = [], y = [];
    state.history.forEach((ele) => {
      if(ele.value){
        x.push(ele.value[0]);
        y.push(ele.value[1]);
      }
    });
    return {x, y}
  }
  return state.history
}

