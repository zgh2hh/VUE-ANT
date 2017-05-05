<template>
  <div id="sensors">
    <x-header :left-options='{"showBack": true}' class="header">传感器</x-header>
    <div class="container">
      <tab :line-width='2' active-color='#4BB7AA' v-model="index">
        <tab-item class="vux-center" key="0">水质</tab-item>
        <tab-item class="vux-center" key="1">天气</tab-item>
      </tab>
      <swiper v-model="index" height="300px" :show-dots="false">
        <swiper-item key="0">
          <div class="tab-swiper vux-center">
            水质 Container
            <!--<ul>
              <li v-for="(wh, i) in weather" :key="i">
                {{wh.title}} {{wh.translate_value}}
              </li>
            </ul>-->
            <progressBar></progressBar>
          </div>
        </swiper-item>
        <swiper-item key="1">
          <div class="tab-swiper vux-center">
            天气 Container
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { XHeader, Flexbox, FlexboxItem, Group, Tab, TabItem, Swiper, SwiperItem } from 'vux'
  import { mapActions, mapGetters } from 'vuex'
  import progressBar from '../../../components/progressBar'

  export default {
    components: {
      XHeader, Flexbox, FlexboxItem, Group, Tab, TabItem, Swiper, SwiperItem, progressBar
    },
    data () {
      return {
        index: 0
      }
    },
    computed:{
      ...mapGetters(['subTypes', 'pengList', 'water', 'weather', 'Params'])
    },
    methods: {
      ...mapActions(['getSubTypes', 'getPengList', 'getWaterInfo', 'getWeatherInfo']),
      onItemClick (index) {
        console.log('on item click:', index)
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
