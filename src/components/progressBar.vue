<template>
  <div class="progress-bar" :style="styleObject">
    <svg viewBox="0 0 140 12" preserveAspectRatio="xMinYMin meet"  xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="100" height="12"
            rx="1" ry="1"
            style="fill: #E6E6E6"/>
      <path :d="d"
            style="stroke:#11A166; stroke-width: 10; fill:#11A166; "/>
      <text x="101" y="9" font-size="6">{{`${value} (${percent})`}}</text>
    </svg>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        styleObject: {
          width: this.width
        }
      }
    },
    props: {
      width: {
        type: String,
        default: "100%"
      },
      value: {
        type: Number,
        required: true,
        default: 63
      },
      upperLimit: {
        type: Number,
        default: 100
      }
    },
    methods: {
      a: function () {

      }
    },
    computed: {
      percent: function () {
        let percent = ((this.value / this.upperLimit) * 100).toFixed(2);
        return `${percent}%`
      },
      d: function () {
        let percent = ((this.value / this.upperLimit) * 100).toFixed(2);
        return `M1,6.5 L${percent},6.5`;
      }
    }
  }
</script>
<style scoped lang="less">
  .progress-bar{
    position: relative;
    height: 100%;
  }
</style>
