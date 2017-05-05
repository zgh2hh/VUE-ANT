<template>
  <div id="fieldInfo">
    <x-header :left-options='{"showBack": true}' class="header">田块信息</x-header>
    <div class="container">
        <img :src="fieldInfo.pic" style="width:100%;display:block;" height="150">
        <div class="content">
          <span>{{fieldInfo.fieldName}}</span>
          <span>{{`${fieldInfo.area}亩`}}</span>
          <span>{{fieldInfo.userName}}</span>
        </div>
        <group>
          <cell title="传感器" is-link :link="{path:'/sensors'}" ></cell>
        </group>
        <div class="weather">
          <p>气象</p>
          <Flexbox wrap="wrap" :gutter="0" justify="center">
            <FlexboxItem :span="1/3" v-for='(weather, i) in monitor.weather' :key="weather.peng_type">
              <x-circle :percent="weather.value | convert" :stroke-width="5" stroke-color="#04BE02">
                <span>{{weather.title}}</span><br>
                <span>{{weather.value}}</span>
              </x-circle>
            </FlexboxItem>
          </Flexbox>
        </div>
      <div class="water">
        <p>水质</p>
        <Flexbox wrap="wrap" :gutter="0" justify="center">
          <FlexboxItem :span="1/3" v-for='(water, i) in monitor.water' :key="water.peng_type">
            <!--<x-circle :percent="water.value | convert" :stroke-width="5" stroke-color="#04BE02">
              <span>{{water.title}}</span><br>
              <span>{{water.value}}</span>
            </x-circle>-->
            <Gauge :label="water.title"
                   :value="water.value | convert"
                   :min="water.min_value | convert"
                   :max="water.max_value | convert"
                   :alert-min="water.min_alert_value | convert"
                   :alert-max="water.max_alert_value | convert"
                   :peng-name="water.title"
                   field-name="一号水质监测点">

            </Gauge>
          </FlexboxItem>
        </Flexbox>
      </div>
      <div class="trace">
        <p>追溯</p>
        <Flexbox justify="center">
          <FlexboxItem :span="1/2">
            <router-link class="link" to="/trace/1">水稻</router-link>
          </FlexboxItem>
          <FlexboxItem :span="1/2">
            <router-link class="link" to="/trace/2">虾</router-link>
          </FlexboxItem>
        </Flexbox>
      </div>
      <group>
        <cell title="农事活动" is-link></cell>
      </group>
      <div class="activity" v-for="(activity,i) in fieldActivities" :key="i">
        <Flexbox justify="center">
          <FlexboxItem :span="1/2">
            {{activity.typeName}}.{{activity.cropName}}
          </FlexboxItem>
          <FlexboxItem :span="1/2">
            {{activity.time}}
          </FlexboxItem>
        </Flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader, Flexbox, FlexboxItem, Group, Cell, XCircle } from 'vux'
  import Gauge from '../../../components/gauge.vue'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      XHeader, Flexbox, FlexboxItem, Group, Cell, XCircle, Gauge
    },
    data () {
      return {
        percent1: 50
      }
    },
    methods: {
      ...mapActions(['getFieldInfo', 'getMonitorData', 'getFieldActivities'])
  },
    computed:{
    ...mapGetters(['fieldInfo', 'fieldActivities', 'monitor', 'Params'])
  },
   created: function () {
    this.getFieldInfo({
      field_id: this.Params.id
    });

    this.getFieldActivities({
      field_id: this.Params.id,
      page:1,
      limit:10
    });

    this.getMonitorData({
      field_id: this.Params.id
    });
  },
  filters: {
    convert: function(obj) {
      return parseFloat(obj);
    }
  }

  }
</script>
