<template>
  <div id="history">
    <x-header :left-options='{"showBack": true, "backText": "历史数据"}' class="header"></x-header>
    <group>
      <selector title="监测点" placeholder="请选择监测点" v-model="pengNo"  :options="getPengs()"></selector>
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
        pengNo: '',
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
            key: this.pengList[i].peng_no + '',
            value: this.pengList[i].peng_name
          });
        }
        return rs;
      },
      initData: async function(){
        let results = await Promise.all(
          [this.getSubTypes(),
            this.getPengList()
          ]);
        console.log(results);
      }
    },
    created: function () {
      /*if(!this.subTypes || this.subTypes.length == 0){
        this.getSubTypes();
      }
      if(!this.pengList || this.pengList.length == 0){
        this.getPengList();
      }*/
      this.initData();
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm.pengNo = to.params.peng_no;
        vm.type = to.params.type;
      });
    },
    watch: {
      /*pengNo: function (val, oldVal) {
        this.getHistoryData({
         peng_type: this.type,
         peng_no: val,
         crop_id: ''
         });
      },
      type: function (val, oldVal) {
        this.getHistoryData({
          peng_type: val,
          peng_no: this.pengNo,
          crop_id: ''
        });
      },*/
    }
  }
</script>
