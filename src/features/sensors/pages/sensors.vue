<template>
  <div id="sensors">
    <x-header :left-options='{"showBack": true, "backText": "传感器"}' class="header"></x-header>
    <div class="container">
      <tab :line-width='2' active-color='#4BB7AA' v-model="index">
        <tab-item class="vux-center" key="0">水质</tab-item>
        <tab-item class="vux-center" key="1">天气</tab-item>
      </tab>
      <swiper v-model="index" height="300px" :show-dots="false">
        <swiper-item key="0">
          <div class="tab-swiper vux-center water-info">
            <div v-for="(w, i) in water" :key="i" class="water" v-on:click.stop.prevent="_toHistory(w.peng_no, w.peng_type)">
              <div>
                <span>{{w.peng_name}}</span><br>
                <span>{{w.field_name}}</span>
              </div>
              <progressBar :value="w.sensor_value | convert" :upperLimit="w.max_value"></progressBar>
            </div>
            <flexbox>
              <flexbox-item v-for="(type, i) in subTypes" :key="type.peng_type">
                <a href="javascript:void(0)"
                   @click.stop.prevent="_selectType(type)"
                   :style="_addClass(type.peng_type)"
                >
                  {{type.sensor_name}}
                </a>
              </flexbox-item>
            </flexbox>
          </div>
        </swiper-item>
        <swiper-item key="1">
          <div class="tab-swiper vux-center weather-info">
            <flexbox wrap="wrap" :gutter="0" justify="center">
              <flexbox-item :span="1/3" v-for='(we, i) in weather' :key="we.peng_type">
                <x-circle :percent="we.value | convert" :stroke-width="5" stroke-color="#04BE02">
                  <span>{{we.title}}</span><br>
                  <span>{{we.value}}</span>
                </x-circle>
              </flexbox-item>
            </flexbox>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { XHeader, Flexbox, FlexboxItem, Group, Tab, TabItem, Swiper, SwiperItem, XButton, XCircle } from 'vux'
  import { mapActions, mapGetters } from 'vuex'
  import progressBar from '../../../components/progressBar'

  export default {
    components: {
      XHeader, Flexbox, FlexboxItem, Group, Tab, TabItem, Swiper, SwiperItem, progressBar, XButton, XCircle
    },
    data () {
      return {
        index: 0,
        selectedType: 'PH',
        styleObject: {
          'background': '#11A166',
          'color': '#E4E4E4'
        }
      }
    },
    computed:{
      ...mapGetters(['subTypes', 'pengList', 'water', 'weather', 'Params'])
    },
    methods: {
      ...mapActions(['getSubTypes', 'getPengList', 'getWaterInfo', 'getWeatherInfo']),
      _selectType: function(type){
        console.log(type);
        this.selectedType = type.peng_type;
        this.getWaterInfo({
          peng_type: this.selectedType
        });
      },
      _addClass: function(peng_type){
        if(this.selectedType == peng_type){
          return this.styleObject
        }else{
          return ''
        }
      },
      _toHistory: function(type, peng_no){
        this.$router.push(`/sensors/history/${type}/${peng_no}`);
      }
    },
    created: function () {
      this.getSubTypes()
      this.getPengList()
      this.getWaterInfo({
        peng_type: 'PH'
      })
      this.getWeatherInfo()
    },
    filters: {
      convert: function(obj) {
        return parseFloat(obj);
      }
    }
  }
</script>
<style lang="less" scoped>
  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }
</style>
