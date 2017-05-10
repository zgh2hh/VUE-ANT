<template>
  <div id="history">
    <x-header :left-options='{"showBack": true, "backText": "历史数据"}' class="header"></x-header>
    <group>
      <selector title="监测点" placeholder="请选择监测点" v-model="pengNo" :options="pengs" @on-change="_changeSite"></selector>
      <selector title="类别" placeholder="请选择类别" v-model="type" :options="types" @on-change="_changeType"></selector>
    </group>
    <div class="echarts">
      <IEcharts :option="bar" :loading="loading" ></IEcharts>
    </div>
  </div>
</template>

<script>
  import {XHeader, Selector, Group} from 'vux'
  import {mapActions, mapGetters} from 'vuex'
  import IEcharts from 'vue-echarts-v3/src/full.vue';

  export default {
    name: 'history',
    components: {
      XHeader, Selector, Group, IEcharts
    },
    data: function () {
      return {
        pengNo: 21,
        type: 'pH',
        loading: true
      }
    },
    computed: {
      ...mapGetters(['subTypes', 'pengList', 'history', 'Params']),
      bar: function(){
        return {
          title: {
            text: this.type
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: this.history.x
          },
          yAxis: {},
          series: [{
            name: this.type,
            type: 'line',
            data: this.history.y,
            tooltip: {
              position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = {top: 60};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
              },
              formatter: '{c0}<br/>{b1}: {c1}'
            }
          }]
        };
      },
      pengs: function(){
        let rs = [];
        for (var i = 0; i < this.pengList.length; i++) {
          rs.push({
            key: this.pengList[i].peng_no + '',
            value: this.pengList[i].peng_name
          });
        }
        return rs;
      },
      types: function(){
        var rs = [];
        for (var i = 0; i < this.subTypes.length; i++) {
          rs.push({
            key: this.subTypes[i].peng_type,
            value: this.subTypes[i].sensor_name
          });
        }
        return rs;
      }
  },
  methods: {
  ...mapActions(['getSubTypes', 'getPengList', 'getHistoryData']),
    initData: async function () {
      let promises = [];
      if (!this.subTypes || this.subTypes.length == 0) {
        promises.push(this.getSubTypes());
      }
      if (!this.pengList || this.pengList.length == 0) {
        promises.push(this.getPengList());
      }

      let results = await Promise.all(promises);
      console.log(results);
    },
    _changeSite: function(val){
      if(val == this.pengNo){
        return;
      }
      let that = this;
      this.loading = true;
      this.getHistoryData({
        peng_type: this.type,
        peng_no: val,
        crop_id: ''
      }).then(function(){
        that.loading = false;
      });
    },
    _changeType: function(val){
      if(val == this.type){
        return;
      }
      let that = this;
      this.loading = true;
      this.getHistoryData({
        peng_type: val,
        peng_no: this.pengNo,
        crop_id: ''
      }).then(function(){
        that.loading = false;
      });
    }
  },
  created: function () {
    this.initData();
  },
  beforeRouteEnter(to, from, next){
    let that = this;
    next(vm => {
        // 通过 `vm` 访问组件实例
      vm.pengNo = to.params.peng_no;
      vm.type = to.params.type;
      vm.getHistoryData({
        peng_type: vm.type,
        peng_no: vm.pengNo,
        crop_id: ''
      }).then(function(){
        vm.loading = false;
      });
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
    }*/
  }
  }
</script>
