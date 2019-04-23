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
      <router-view class="main-cont" v-if="isRouterAlive"></router-view>
    </div>
  </div>
</template>
<script>
import leftCondition from '../../components/public/myStoreLeft'
import topNav from '../../components/public/topNav'
export default {
  data () {
    return {
      isRouterAlive: true,
      topArr: ['商品', '全部上架商品']
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  /* eslint-disable */
  computed: {
    topArr1 () {
      this.topArr = this.topArr.toString()
      return this.topArr
    }
  },
  created () {
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
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
  // width: 1156px;
  min-width: 800px;
  width: 100%;
  // margin: 0 auto;
}
.store-left{
  flex: 0 0 156px;
  border-radius: 6px;
}
.stroe-body{
  display: flex;
  // max-width: 1156px;
  min-width: 800px;
  width: 100%;
  // margin: 0 auto;
  .left-view {
    padding: 20px 0 10px 36px;
    border-radius: 6px;
    background: #F8F9FB;
  }
}
.commodity{
  // min-height: 100%;
  // max-width: 1156px;
  min-width: 800px;
  width: 100%;
  height: auto !important;
  height: 100%;
  // padding-top: 60px;
  margin: 0 auto 0px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  // padding-bottom: 40px;
  background: #fff;
  .main-cont{
    min-width: 800px;
    width: 100%;
    flex: 1;
    padding: 0 0 0 0;
  }
}
</style>
