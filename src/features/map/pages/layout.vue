<template>
  <router-view></router-view>
</template>

<script>
import './map.less'
import modules from '../modules/store'
import store from '@/store'

store.registerModule('map', {
  ...modules
})
</script>
