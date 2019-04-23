<template>
  <div class="commodity">
    <div class="stroe-body">
      <!-- <div class="store-left">
        <div class="left-view">
          <left-condition @chooseItem="chooseItem" @chooseList="chooseList" :Obtained="Obtained"></left-condition>
        </div>
      </div> -->
      <div class="main-cont">
        <store-nav :topArr="topArr1" :topName="topName"></store-nav>
        <router-view class="main-content" v-if="isRouterAlive" @topName="setTopName" ></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import leftCondition from '../../components/public/financeLeft'
import storeNav from '../../components/public/financeNav'
export default {
  data () {
    return {
      Obtained: '',
      isRouterAlive: true,
      topArr: ['门店', '正常门店'],
      topName: ''
    }
  },
  provide () {
    return {
      reloadStore: this.reload
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
    setTopName (data) {
      if (data == '4') {
        this.Obtained = data
      }
      if (this.$route.path == '/store/commManage') {
        this.allShop.forEach(element => {
          if (element.type == data) {
            this.topName = element.title
          }
        })
      }
      if (this.$route.path == '/store/storeManage') {
        this.condition.forEach(element => {
          if (element.type == data) {
            this.topName = element.title
          }
        })
      }
    },
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
  components: {leftCondition, storeNav}
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.store-left{
  flex: 0 0 156px;
  border-radius: 6px;
  padding-top: 20px;
}
.stroe-body{
  display: flex;
  // width: 1156px;
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
  margin: 0 auto 0;
  // padding-bottom: 40px;
  padding-top: 10px;
  padding-left: 10px;
  background: #fff;
  .main-cont{
    min-width: 800px;
    flex: 1;
    padding: 0px 0px 0;
    .main-content{
      padding: 20px 0 0 0;
    }
  }
}
</style>
