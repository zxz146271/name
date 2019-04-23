<template>
  <div class="order">
    <router-view class="main-box"></router-view>
  </div>
</template>
<script>
import childNav from '../../components/public/childNav'
export default {
  data () {
    return {
    }
  },
  components: {childNav}
}
</script>
<style lang="scss" scoped>
.order{
  min-width: 800px;
  padding-top: 60px;
  // min-height: 100%;
  height: auto !important;
  height: 100%;
  margin: 0 auto -40px;
  padding-bottom: 40px;
  padding-top: 10px;
  padding-left: 10px;
  background: #fff;
  .fix-header{
    position: fixed;
    left:0;
    right:0;
    top:0;
    z-index: 9;
  }
}
</style>
