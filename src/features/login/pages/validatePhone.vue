<template>
  <div id="validatePhone">
    <x-header :left-options="{backText: ''}">验证手机号</x-header>
    <div class="container">
      <group>
        <x-input label-width="10" name="mobile" ref="mobile" v-model="mobile" type="tel" is-type="china-mobile" required title="手机号码" placeholder="请输入常用手机号" @on-change="_change"></x-input>
        <flexbox>
          <flexbox-item :span="3/4">
            <x-input label-width="10" name="code" ref="code" v-model="code" type="number" required title="验证码" placeholder="请输入6位验证码" v-bind:min="6" v-bind:max="6" @on-change="_change"></x-input>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <x-button class="get-code" :text="label" :disabled="!codeDisable" mini type="default" @click.native="_sendCode"></x-button>
          </flexbox-item>
        </flexbox>
      </group>
      <x-button class="top-gap-big" text="下一步" :disabled="!disable" @click.native.prevent="_next" type="primary">
      </x-button>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, XButton, XHeader, Flexbox, FlexboxItem } from 'vux'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      XInput, Group, XButton, XHeader, Flexbox, FlexboxItem
    },
    data () {
      return {
        codeDisable: false,
        disable: false,
        label: '获取验证码',
        mobile: '',
        code: ''
      }
    },
    methods: {
      ...mapActions(['sendCode', 'checkCaptcha']),
      _change (value) {
        this.codeDisable = this.$refs.mobile.valid;
        this.disable = this.$refs.mobile.valid && this.$refs.code.valid;
      },
      _sendCode(){
        let that = this;
        this.codeDisable = false;
        let i = 10;
        let interval = setInterval(function () {
          i = i - 1;
          that.label = `${i}秒`;
          if(i === 0){
            that.codeDisable = true;
            that.label = '获取验证码';
            clearInterval(interval);
          }
        }, 1000);
        this.sendCode({
          phone: this.mobile,
          op: parseInt(this.params.op)
        })
      },
      _next () {
        let op = parseInt(this.params.op);
        this.checkCaptcha({
          phone: this.mobile,
          code: this.code,
          op: op
        });
        this.$router.push(op == 1 ? '/completeInfo' : '/reset');
      }
    },
    computed: mapGetters({
      params:'Params'
    })
  }
</script>
