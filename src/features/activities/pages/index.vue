<template>
  <div id="activities">
    <x-header :left-options='{"showBack": true}' class="header">农事活动</x-header>
    <scroller lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" ref="demo2" @on-pullup-loading="load2">
      <div class="container">
        <timeline>
          <timeline-item v-for="(item, index) in allActivities" :key="index">
            <div>
              <span class="title">{{`${item.typeName}.${item.cropName}`}}</span>
              <span class="time">{{item.time}}</span>
            </div>
            <divider>详情</divider>
            <p class="fields">
              {{item.fields && item.fields.join('、')}}
            </p>
            <p>
              {{item.who}} 在 上述田块 {{item.typeName}} {{item.input}}
            </p>
            <p v-if="item.images">
              <img :src="item.images" alt="农事活动" width="60" height="60">
            </p>
          </timeline-item>
        </timeline>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { Timeline, TimelineItem, XHeader, Divider, Scroller } from 'vux'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      Timeline, TimelineItem, XHeader, Divider, Scroller
    },
    data(){
      return {
        count: 1,
        step: 10,
        page: 1,
        limit: 10,
        pullupConfig2: {
          content: '上拉加载更多',
          downContent: '松开进行加载',
          upContent: '上拉加载更多',
          loadingContent: '加载中...'
        }
      }
    },
    methods: {
      ...mapActions(['getAllActivities']),
      initData: async function(page, limit){
        this.$vux.loading.show({
          text: '请稍候'
        });
        try {
          let results = await this.getAllActivities({
            page,
            limit
          });
          console.log(results);
        }catch (ex){
          console.log(ex)
        }finally {
          this.count += 1;
          this.$vux.loading.hide();
          // 加载完成
          this.$refs.demo2.donePullup();
          this.$refs.demo2.reset();
          if(this.allActivities.length < this.limit){
            // 数据已获取完，禁用
            this.$refs.demo2.disablePullup();
          }
        }
      },
      load2 () {
        /*setTimeout(() => {
          this.n2 += 10
          setTimeout(() => {
              this.$refs.demo2.donePullup()
          }, 100)
          if (this.n2 === 30) { // unload plugin
              setTimeout(() => {
                this.$refs.demo2.disablePullup()
            }, 100)
            }
          }, 2000)*/
        this.limit = this.step * this.count;
        this.initData(this.page, this.limit);
      }
    },
    computed: {
      ...mapGetters(['allActivities'])
    },
    created: function () {
      this.initData(this.page, this.limit);
    }
  }
</script>
