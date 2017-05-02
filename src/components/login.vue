<template>
  <div class="login">
    <header class="icon">
      <img src="../assets/ant.jpg" alt="爱农田">
    </header>
    <section>
      <group>
        <x-input name="mobile" v-model="mobile" type="tel" is-type="china-mobile" required title="手机号码"></x-input>
        <x-input name="password" v-model="password" type="password" is-type="is-password" required v-bind:min="6" v-bind:max="18"></x-input>
      </group>
      <x-button type="primary">登录</x-button>
    </section>
  </div>
</template>

<script>
  import { Group, XInput, XButton } from 'vux'
//  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      XInput, Group, XButton
    },
    data () {
      return {
        'is-password': (val) => {
          return val.length >= 6 && val.length <= 18
        }
      }
    }
  }
</script>
