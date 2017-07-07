<template>
  <div id="map" >
    <v-map :zoom="zoom" :center="center" v-on:l-zoomend="_zoomEnd">
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      <v-polygon v-for="(field, index) in homeFieldList"
                 :key="field.field_id"
                 :lat-lngs="field.geometry | toArray"
                 :color="color"
                 :fillColor="color"
                 :weight="weight"
                 :fillOpacity="opacity">
      </v-polygon>
    </v-map>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  // 修复marker图标路径错误
  import L from 'leaflet';

//  L.Icon.Default.imagePath = '.';
  // OR
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  import Vue2Leaflet from 'vue2-leaflet';

  export default {
    name: 'example',
    components: {
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer' :Vue2Leaflet.TileLayer,
      'v-marker': Vue2Leaflet.Marker,
      'v-polygon': Vue2Leaflet.Polygon
    },
    data () {
      return {
        zoom: 13,
        center: L.latLng(31.015337, 118.326863),
        url:'http://mt3.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
        attribution:'&copy;<a href="#">安徽阡陌网络科技有限公司</a>',
        marker: L.latLng(31.152639, 118.328569),
        color: '#A28E8A',
        weight: 1,
        opacity: 0.4,
      }
    },
    computed: {
      ...mapGetters(['homeFieldList','Params'])
    },
    methods: {
      ...mapActions(['getHomeFieldList']),
      _zoomEnd(evt){
        console.log(evt, evt.target._zoom);
        this.zoom = evt.target._zoom;
        /*if(evt.target._zoom < 17){
          // 移除作物图层
          //TODO
          console.log("移除图层");
        } else {
          // 绘制作物图层
          console.log("绘制图层");
//          this.drawCrops(this.homeFieldList);
        }*/
      },
      drawCrops(fields) {
        fields.forEach(field => {
          let bounds = L.latLngBounds(field.geometry);
          let center = bounds.getCenter();
        });
      },
    },
    created() {
      this.getHomeFieldList();
    },
//    beforeRouteEnter(to, from, next){
//      let that = this;
//      next(vm => {
//        vm.getHomeFieldList();
//       })
//    },
    filters: {
      toArray: function (str) {
        if(!str){
          return [];
        }
        return JSON.parse(str);
      }
    }
  }
</script>
