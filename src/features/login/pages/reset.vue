<template>
  <div id="reset">
    <x-header :left-options="{backText: ''}">重置密码</x-header>
    <div class="container">
      <group>
        <x-input label-width="10" name="password" ref="password" v-model="password" type="password" is-type="is-password" required title="新密码" v-bind:min="6" v-bind:max="18" @on-change="_change"></x-input>
        <x-input label-width="10" name="rePassword" ref="rePassword" v-model="rePassword" type="password" :equal-with="password" required title="确认密码" @on-change="_change"></x-input>
      </group>
      <x-button class="top-gap-big" text="确定" :disabled="!disable" @click.native.prevent="_reset" type="primary">
      </x-button>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, XButton, XHeader } from 'vux'
  import { mapActions, mapGetters } from 'vuex'
  import jsSHA from 'jssha'

  export default {
    components: {
      XInput, Group, XButton, XHeader
    },
    data () {
      return {
        'is-password': val => val.length >= 6 && val.length <= 18,
        disable: false,
        password: '',
        rePassword: ''
      }
    },
    methods: {
      ...mapActions(['reset']),
      _change (value) {
        this.disable = this.$refs.password.valid && this.$refs.rePassword.valid;
      },
      _reset () {
        this.reset({
          pwd: this._encryptPwd(this.password),
          confirm_pwd: this._encryptPwd(this.rePassword),
          token: this.token
        }).then((result) => {
          if(result.code === 20000){
            this.$router.push('login');
          }
        })
      },
      // 密码加密
      _encryptPwd(pwd) {
        const shaObj = new jsSHA('SHA-512', 'TEXT');
        shaObj.update(pwd);
        const hash = shaObj.getHash('HEX');
        return hash;
      }
    },
    computed: mapGetters({
        token: 'forgetToken'
    })
  }
</script>
