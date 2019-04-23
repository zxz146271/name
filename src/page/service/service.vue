<template>
    <router-view class="main-cont"></router-view>
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
.main-cont{
  width: 1000px;
  margin: 0 auto;
  padding-top: 66px;
}
</style>
