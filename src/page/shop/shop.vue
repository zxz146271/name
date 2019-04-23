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
      navList: [{
        title: '会员管理',
        path: '/member/memberAdministration',
        name: 'memberAdministration'
      },
      {
        title: '积分规则',
        path: '/member/memberIntegral',
        name: 'memberIntegral'
      },
      {
        title: '标签规则',
        path: '/member/memberLabel',
        name: 'memberLabel'
      },
      {
        title: '老客户关怀',
        path: '/member/memberCare',
        name: 'memberCare'
      }]
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
  }
}
</style>
