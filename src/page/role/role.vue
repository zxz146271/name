<template>
  <div class="main">
  <div class="commodity">
    <div class="fix-header">
      <x-header></x-header>
    </div>
    <router-view class="main-cont"></router-view>
  </div>
    <x-footer></x-footer>
  </div>
</template>
<script>
import xHeader from '../../components/header/header'
import childNav from '../../components/public/childNav'
import xFooter from '../../components/footer/footer'
export default {
  data () {
    return {
    }
  },
  components: {xHeader, childNav, xFooter}
}
</script>
<style lang="scss" scoped>
.commodity{
  // min-height: 100%;
  height: auto !important;
  // height: 100%;
  margin: 0 auto -40px;
  // padding-bottom: 40px;
  .fix-header{
    position: fixed;
    left:0;
    right:0;
    top:0;
    z-index: 9;
  }
  .main-cont{
    width: 1000px;
    margin: 0 auto;
    padding-top: 106px;
  }
}
</style>
