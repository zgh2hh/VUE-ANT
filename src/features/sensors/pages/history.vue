<template>
  <div id="history">
    <x-header :left-options='{"showBack": true, "backText": "历史数据"}' class="header"></x-header>
    <group>
      <selector title="监测点" placeholder="请选择监测点" v-model="peng" :options="getPengs()"></selector>
      <selector title="类别" placeholder="请选择类别" v-model="type" :options="getTypes()"></selector>
    </group>
  </div>
</template>

<script>
  import { XHeader, Selector, Group } from 'vux'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'history',
    components: {
      XHeader, Selector, Group
    },
    data: function () {
      return {
        peng: '',
        type: '',
        list1: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
      }
    },
    computed:{
      ...mapGetters(['subTypes', 'pengList', 'history', 'Params']),
    },
    methods: {
      ...mapActions(['getSubTypes', 'getPengList', 'getHistoryData']),
      getTypes: function(){
        var rs = [];
        for(var i = 0; i < this.subTypes.length; i++){
          rs.push({
            key: this.subTypes[i].peng_type,
            value: this.subTypes[i].sensor_name
          });
        }
        return rs;
      },
      getPengs: function(){
        var rs = [];
        for(var i = 0; i < this.pengList.length; i++){
          rs.push({
            key: this.pengList[i].peng_no,
            value: this.pengList[i].peng_name
          });
        }
        return rs;
      }
    },
    created: function () {
      if(!this.subTypes || this.subTypes.length == 0){
        this.getSubTypes();
      }
      if(!this.pengList || this.pengList.length == 0){
        this.getPengList();
      }
      /*this.getHistoryData({
        peng_type: 'PH',
        peng_no: 21,
        crop_id: ''
      });*/
    },
    watch: {
      history: function(){

      }
    }
  }
</script>
