<template>
  <div id="fields">
    <x-header :left-options='{"showBack": false}' class="header">数字农田</x-header>
    <div class="container">
      <div class="top-gap item" v-for="(field, i) in fieldList" :key="field.id" v-on:click.stop.prevent="_fieldInfo(field)">
        <flexbox>
          <flexbox-item :span="1/4">
            <img :src="field.src" alt="" width="60" height="60">
          </flexbox-item>
          <flexbox-item :span="2/4">
            <span class="title">{{field.title}}</span>
          </flexbox-item>
          <flexbox-item>
            <span class="desc">{{field.desc}}</span>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader, Flexbox, FlexboxItem } from 'vux'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      XHeader, Flexbox, FlexboxItem
    },
    data () {
      return {
        type: '1',
        list: [{
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/component/cell'
        }, {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题二',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: {
            path: '/component/radio',
            replace: false
          }
        }],
        footer: {
          title: '查看更多',
          url: 'http://vux.li'
        }
      }
    },
    methods: {
      ...mapActions({
        getFields: 'getAllFields'
      }),
      _fieldInfo: function(field){
        this.$router.push(`fields/${field.id}`)
      }
    },
    computed:{
    ...mapGetters(['fieldList','Params'])
    },
    created: function () {
      let that = this;
      this.$vux.loading.show({
        text: '请稍候'
      });
      this.getFields().then(function(){
        that.$vux.loading.hide();
      })
    }
  }
</script>
