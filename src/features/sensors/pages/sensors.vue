<template>
  <div id="sensors">
    <x-header :left-options='{"showBack": true}' class="header">传感器</x-header>
    <div class="container">
    </div>
  </div>
</template>

<script>
  import { XHeader, Flexbox, FlexboxItem, Group, Cell, XCircle } from 'vux'
  import Chart from '../../../components/chart.vue'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      XHeader, Flexbox, FlexboxItem, Group, Cell, XCircle, Chart
    },
    data () {
      return {
        percent1: 50
      }
    },
    methods: {
      ...mapActions(['getMonitorData'])
  },
  computed:{
  ...mapGetters(['monitor', 'Params'])
  },
  created: function () {

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
