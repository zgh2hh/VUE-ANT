<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import "./config/common.less";
  @import "theme.less";
  @import "~leaflet/dist/leaflet.css";
  .leaflet-fake-icon-image-2x {
    background-image: url(../node_modules/leaflet/dist/images/marker-icon-2x.png);
  }
  .leaflet-fake-icon-shadow {
    background-image: url(../node_modules/leaflet/dist/images/marker-shadow.png);
  }
</style>
