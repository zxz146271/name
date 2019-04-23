<template>
  <div class="commodity">
    <div class="top">
      <top-nav :topArr="topArr1"></top-nav>
    </div>
    <div class="stroe-body">
      <!-- <div class="store-left">
        <div class="left-view">
          <left-condition @chooseItem="chooseItem" @chooseList="chooseList"></left-condition>
        </div>
      </div> -->
      <router-view class="main-cont" v-if="marketView"></router-view>
    </div>
  </div>
</template>
<script>
import leftCondition from '../../components/public/marketingLeft'
import topNav from '../../components/public/topNav'
export default {
  data () {
    return {
      topArr: ['店铺活动', '优惠券'],
      marketView: true
    }
  },
  /* eslint-disable */
  computed: {
    topArr1 () {
      this.topArr = this.topArr.toString()
      return this.topArr
    }
  },
  provide () {
    return {
      reloadMarketPage: this.reload,
    }
  },
  methods: {
    reload () {
      this.marketView = false
      this.$nextTick(() => {
        this.marketView = true
      })
    },
    chooseItem (value) {
      this.topArr = value
    },
    chooseList (value) {
      this.topArr = value
    }
  },
  components: {leftCondition, topNav}
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.top{
  // width: 1356px;
  min-width: 800px;
  // margin: 0 auto;
}
.store-left{
  flex: 0 0 156px;
  border-radius: 6px;
}
.stroe-body{
  display: flex;
  // width: 1356px;
  min-width: 800px;
  // margin: 0 auto;
  .left-view {
    padding: 20px 0 10px 36px;
    border-radius: 6px;
    background: #F4F4F4;
  }
}
.commodity{
  // padding-top: 60px;
  min-width: 800px;
  // min-height: 100%;
  height: auto !important;
  height: 100%;
  margin: 0 auto -40px;
  // padding-bottom: 40px;
  background: #fff;
  padding-top: 10px;
  padding-left: 10px;
  .main-cont{
    flex: 1;
    min-width: 800px;
    // width: 1200px;
    padding: 0 0 0 0px;
  }
}
</style>
