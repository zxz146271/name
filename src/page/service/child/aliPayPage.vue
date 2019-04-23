<template>
  <div></div>
</template>
<script>
import { getSession } from '../../../tool/Utils'
export default{
  data () {
    return {
      aliPayUrl: null
    }
  },
  created () {
    this.aliPayment()
  },
  methods: {
    aliPayment () {
      this.aliPayUrl = getSession('Alipay')
      // window.location.href = this.aliPayUrl
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
