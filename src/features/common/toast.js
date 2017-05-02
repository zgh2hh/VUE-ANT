import Vue from 'vue'

export const commonToast = function (res) {
  if(res.data){
    Vue.$vux.toast.show({
      type: res.data.code === 20000 ? 'success' : 'warn',
      text: res.data.message,
      time: 2000,
      position: 'middle'
    });
  }else {
    Vue.$vux.toast.show({
      type: res.code === 20000 ? 'success' : 'warn',
      text: res.message,
      time: 2000,
      position: 'middle'
    });
  }
}
