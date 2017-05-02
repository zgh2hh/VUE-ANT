<template>
  <div id="completeInfo">
    <x-header :left-options="{backText: '返回'}">完善信息</x-header>
    <div class="container">
      <group>
        <x-input label-width="10" name="farmName" ref="farmName" v-model.trim="farmName" required :min="2" :max="30" title="农场名称" placeholder="请输入农场名称" @on-change="_change"></x-input>
        <x-input label-width="10" name="owner" ref="owner" v-model.trim="owner" required :min="2" :max="30" title="农场主姓名" placeholder="请输入农场主姓名" @on-change="_change"></x-input>
        <x-input label-width="10" name="area" ref="area" v-model="area" type="number" required title="农场总面积" placeholder="请输入农场总面积" @on-change="_change"></x-input>
        <x-input label-width="10" name="password" ref="password" v-model="password" type="password" is-type="is-password" required title="密码" placeholder="请输入6-18位密码" :min="6" :max="18" @on-change="_change"></x-input>
        <x-input label-width="10" name="confirmPwd" ref="confirmPwd" v-model="confirmPwd" type="password" is-type="pwd-equal" required title="确认密码" placeholder="请重复密码" :min="6" :max="18" @on-change="_change"></x-input>
      </group>
      <x-button class="top-gap-big" text="注册" :disabled="!disable" @click.native="_register" type="primary">
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
        'pwd-equal': (val) => {
          if(val.length < 6 || val.length > 18){
            return {valid:false, msg:'长度必须在6-18之间'};
          }else if(val !== password){
            return {valid:false, msg:'与密码不一致'};
          }else {
            return {valid:true};
          }
        },
        disable: false,
        farmName: '',
        owner: '',
        area: '',
        password: '',
        confirmPwd: ''
      }
    },
    methods: {
      ...mapActions(['register']),
      _change (value) {
        this.disable = this.$refs.farmName.valid &&
          this.$refs.owner.valid &&
          this.$refs.area.valid &&
          this.$refs.password.valid &&
          this.$refs.confirmPwd.valid;
      },
      _register(){
        this.register({
          farmer_phone: this.registerPhone,
          farm_name: this.farmName,
          farmer: this.owner,
          area_size: this.area,
          new_pwd: this._encryptPwd(this.password),
          confirm_pwd: this._encryptPwd(this.confirmPwd)
        }).then((data) => {
          // 注册成功跳转到登录页面
          if(data.code === 20000){
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
    computed: {
      ...mapGetters([
          'registerPhone'
        ])
    }
  }
</script>
