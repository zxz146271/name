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
      <router-view class="main-cont"></router-view>
    </div>
  </div>
</template>
<script>
import leftCondition from '../../components/public/dataLeft'
import topNav from '../../components/public/topNav'
export default {
  data () {
    return {
      topArr: ['全部门店数据', '数据概况']
    }
  },
  /* eslint-disable */
  computed: {
    topArr1 () {
      this.topArr = this.topArr.toString()
      return this.topArr
    }
  },
  methods: {
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
  // min-width: 800px;
  min-width: 952px;
}
.store-left{
  flex: 0 0 156px;
  border-radius: 6px;
}
.stroe-body{
  display: flex;
  min-width: 952px;
  width: 100%;
  .left-view {
    padding: 20px 0 10px 36px;
    border-radius: 6px;
    background: #F4F4F4;
  }
}
.commodity{
  // padding-top: 60px;
  // min-height: 100%;
  min-width: 952px;
  width: 100%;
  // min-width: 972px;
  height: auto !important;
  height: 100%;
  // margin: 0 auto -40px;
  // padding-bottom: 40px;
  padding-top: 10px;
  padding-left: 10px;
  background: #fff;
  .main-cont{
    min-width: 952px;
    width: 100%;
    flex: 1;
    padding: 0 0 0 0px;
  }
}
</style>
