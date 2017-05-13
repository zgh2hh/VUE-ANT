<template>
  <div id="map" >
    <v-map :zoom="zoom" :center="center">
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      <v-marker :lat-lng="marker"></v-marker>
    </v-map>
  </div>
</template>

<script>
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
      'v-marker': Vue2Leaflet.Marker
    },
    data () {
      return {
        zoom:13,
        center: L.latLng(47.413220, -1.219482),
        url:'http://mt3.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
        attribution:'&copy;<a href="#">安徽阡陌网络科技有限公司</a>',
        marker: L.latLng(47.413220, -1.219482),
      }
    }
  }
</script>
