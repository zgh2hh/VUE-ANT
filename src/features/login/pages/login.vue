<template>
  <div id="login" class="container">
      <div class="flex-center flex-middle site-box top-gap-big">
        <img src="../assets/ant.jpg" alt="爱农田" width="100" height="100">
      </div>
      <group class="weui_cells_form">
        <x-input label-width="10" name="mobile" ref="mobile" v-model.trim="mobile" type="tel" is-type="china-mobile" required title="手机号码" @on-change="_change"></x-input>
        <x-input label-width="10" name="password" ref="password" v-model="password" type="password" is-type="is-password" required title="密码" v-bind:min="6" v-bind:max="18" @on-change="_change"></x-input>
      </group>
      <x-button class="top-gap-big" text="登录" :show-loading="loading" :disabled="!disable" @click.native.prevent="_login" type="primary">
      </x-button>
      <flexbox class="top-gap">
        <flexbox-item>
          <router-link :to="{ path: 'validatePhone/1'}">
            <p class="register">注册账号</p>
          </router-link>
        </flexbox-item>
        <flexbox-item>
          <router-link :to="{ path: 'validatePhone/2'}">
            <p class="resetPwd">忘记密码?</p>
          </router-link>
        </flexbox-item>
      </flexbox>
  </div>
</template>

<script>
  import { Group, XInput, XButton, Flexbox, FlexboxItem } from 'vux'
  import { mapActions } from 'vuex'
  import JsSHA from 'jssha'

  export default {
    components: {
      XInput, Group, XButton, Flexbox, FlexboxItem
    },
    data () {
      return {
        'is-password': val => val.length >= 6 && val.length <= 18,
        disable: false,
        loading: false,
        mobile: '',
        password: ''
      }
    },
    methods: {
      ...mapActions(['login']),
      _change (value) {
        this.disable = this.$refs.mobile.valid && this.$refs.password.valid
      },
      _login () {
        let password = this.password;
        const shaObj = new JsSHA('SHA-512', 'TEXT');
        shaObj.update(password);
        const hash = shaObj.getHash('HEX');
        let params = {
          account: this.mobile,
          pwd: hash
        };

        this.login(params).then((result) => {
          if(result.code === 20000){
            this.$router.push('/fields')
          }
        });
      }
    }
  }
</script>
