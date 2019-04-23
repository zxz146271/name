<template>
  <div class="mine">
    <!-- <store-nav :topArr="topArr1" :topName="topName"></store-nav> -->
    <mineNav :topArr="topArr" :topName="topName"></mineNav>
    <router-view class="main-box"></router-view>
  </div>
</template>
<script>
import childNav from '../../components/public/childNav'
import mineNav from '../../components/public/mineNav'

export default {
  data () {
    return {
      topArr: ['我的', '我的内容库'],
      topName: '创建图册'
    }
  },
  components: {childNav, mineNav},
  computed: {
    topArr1 () {
      this.topArr = this.topArr.toString()
      return this.topArr
    }
  }
}
</script>
<style lang="scss" scoped>
.mine{
}
</style>
