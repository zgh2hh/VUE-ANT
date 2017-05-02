<template>
  <div class="donut">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="donut__svg">
      <!--<circle id="donut-graph-x" class="donut__svg__scrim" r="40" cy="50" cx="50" stroke-width="3" stroke="url(#baseLine)"
              fill="none" transform="rotate(-90 50 50)"/>-->
      <circle id="donut-graph" v-bind:style="styleObject" :r="radius" :cy="cy" :cx="cx" stroke-width="5" stroke="url(#purple)"
              stroke-linejoin="round" stroke-linecap="round" stroke-opacity="0.7" fill="none"  transform="rotate(-90 50 50)"/>

      <path id="lessNormal" stroke="#FFD600" stroke-width="1.2" stroke-opacity="0.5" :d="offset.less"></path>
      <path id="normal" stroke="#04BE02" stroke-width="1.2" stroke-opacity="0.5" :d="offset.normal"></path>
      <path id="moreNormal" stroke="#C23531" stroke-width="1.2" stroke-opacity="0.5" :d="offset.more"></path>
      <defs>
        <linearGradient id="purple" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#7a5bcf"/>
          <stop offset="100%" stop-color="#8A6FD5"/>
        </linearGradient>

        <!--<linearGradient id="baseLine"
                        x1="0%" y1="0%"
                        x2="100%" y2="0%"
                        spreadMethod="pad">
          <stop :offset="offset.min2Normal.offset" :stop-color="offset.min2Normal.color" stop-opacity="1"/>
          <stop :offset="offset.normal.offset" :stop-color="offset.normal.color" stop-opacity="1"/>
          <stop :offset="offset.normal2Max.offset" :stop-color="offset.normal2Max.color" stop-opacity="1"/>

        </linearGradient>-->
      </defs>

    </svg>
    <div class="donut_content">
      <span>
        {{label}}
      </span><br>
      <span>
        {{value}}
      </span>
    </div>
  </div>
</template>
<script>
  import {describeArc, polarToCartesian} from '../features/common/utils'

  export default {
    data() {
      return {
        cx: 50,
        cy: 50,
        radius: 46,
        offset: {
          less: '',
          normal: '',
          more: ''
        }
      }
    },
    props: {
      value: {
        type: Number,
        default: 82,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      min: {
        type: Number,
        default: 0,
        required: true
      },
      max: {
        type: Number,
        default: 0,
        required: true
      },
      alertMin: {
        type: Number,
        default: 0,
        required: true
      },
      alertMax: {
        type: Number,
        default: 0,
        required: true
      },
      pengName: {
        type: String,
        required: true
      },
      fieldName: {
        type: String,
        required: true
      }
    },
    methods: {
      computeOffsets: function () {
        this.offset = Object.assign({}, this.offset, {
          min2Normal: {
            offset: this.alertMin / (this.max - this.min),
            color: '#FFD600'
          },
          normal: {
            offset: this.alertMax / (this.max - this.min),
            color: '#04BE02'
          },
          normal2Max: {
            offset: 1,
            color: '#C23531'
          }
        });
        // 绘制小于正常值范围
        let lessEndAngleNum = this.alertMin / (this.max - this.min);
        let lessEndAngle = lessEndAngleNum * 360;
        let less = describeArc(this.cx, this.cy, this.radius, 1, 0, lessEndAngle);
        this.$set(this.offset, 'less', less);

        // 绘制正常值范围
        let normalAngleNum = this.alertMax / (this.max - this.min);
        let normalAngle = normalAngleNum * 360;
        let normal = describeArc(this.cx, this.cy, this.radius, 1, lessEndAngle, normalAngle);
        this.$set(this.offset, 'normal', normal);

        // 绘制大于正常值范围
        let moreEndAngleNum = this.max / (this.max - this.min);
        let moreEndAngle = moreEndAngleNum * 360;
        let more = describeArc(this.cx, this.cy, this.radius, 1, normalAngle, moreEndAngle);
        this.$set(this.offset, 'more', more);
      }
    },
    computed: {
      circumference: function () {
        return 2 * Math.PI * this.radius;
      },
      styleObject: function () {
        return {
          "stroke-dasharray": this.circumference,
          "stroke-dashoffset": this.circumference - ((this.value / (this.max - this.min)) * this.circumference),// 不是除以100
        }
      }
    },
    created: function () {
      this.computeOffsets();
    }
  }
</script>
<style lang="less">
  .donut {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .donut_content {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .donut__spic {
    position: absolute;
    top: 9px;
    font-size: 30px;
    line-height: 1em;
    content: "%";
    animation: donutTitleFadeRight 800ms 200ms cubic-bezier(.99, .01, .22, .94) forwards;
    opacity: 0;
    transform: translateY(-20px);
  }

  @keyframes donutTitleFadeLeft {
    from {
      opacity: 0;
      transform: translateX(0);
    }

    to {
      opacity: 1;
      transform: translateX(-10px);
    }
  }

  @keyframes donutTitleFadeRight {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

</style>
