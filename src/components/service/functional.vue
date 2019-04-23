<template>
  <div class="functional">
    <h3>VIP功能包</h3>
    <div class="func-main">
      <ul>
        <li v-for="(item, index) in serviceList" :key="index"><i class="el-icon-circle-check service-icon"></i>{{item}}</li>
      </ul>
      <div class="btn">
        <div class="title">
          <span class="store-label">当前门店:</span>
          <!-- <el-select v-model="selectStore"  @change="chooseStore" placeholder="请选择">
            <el-option
              v-for="item in storeInfo.data"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select> -->
          <el-input
            v-model="selectStore"
            :disabled="true">
          </el-input>
        </div>
        <el-button class="pay-btn" @click="childclick('1')"  v-if="baseServiceList && baseServiceList.isOpen == 1 && baseServiceList.isRenew == 1">
          {{baseServiceList.servicePrice}}元/{{changeData(baseServiceList.billingMethod)}} 续费
        </el-button>
        <el-button class="has-pay-btn" @click="testClick"  v-else-if="baseServiceList && baseServiceList.isOpen == 1 && baseServiceList.isRenew == 2">
          已开通
        </el-button>
        <el-button class="pay-btn"  @click="childclick('1')"  v-else>
          {{baseServiceList.servicePrice}}元/{{changeData(baseServiceList.billingMethod)}} 开通
        </el-button>
        <p>原价：<s>5998元/年</s></p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { getStore } from '../../tool/Utils'
// import { getStore, setStore } from '../../tool/Utils'
export default{
  data () {
    return {
      loading: false,
      selectStore: '',
      payStoreId: '',
      baseServiceList: {},
      serviceList: ['商品管理', '已购客户管理', '微信小程序', '潜客管理', '店铺数据看板', '图片储存空间 (1GB)', '案例', '已购客户数据看版', '视频储存空间 (1个)', '订单管理', '微店数据看版', '400专属客服', '任务业绩管理', '交易数据看版', '优惠券']
    }
  },
  computed: {
    ...mapGetters(['storeInfo', 'storeId', 'storeName'])
  },
  created () {
    // 初始化加载 原型
    this.selectStore = getStore('storeName')
    this.payStoreId = getStore('storeIdWeb')
    this.getBaseServiceList(this.payStoreId)
    console.log('created=' + this.selectStore)
  },
  mounted () {
    this.selectStore = getStore('storeName')
    this.payStoreId = getStore('storeIdWeb')
    console.log('monted' + this.selectStore)
  },
  inject: ['reloadAllPage'],
  methods: {
    ...mapActions(['setRouters']),
    changeData (time) {
      if (time === 'year') {
        return '年'
      } else if (time === 'day') {
        return '天'
      } else if (time === 'month') {
        return '月'
      } else if (time === 'quarter') {
        return '季度'
      } else if (time === 'halfYear') {
        return '半年'
      } else if (time === 'frequency') {
        return '次'
      }
    },
    chooseStore (value) {
      this.payStoreId = value
      this.getBaseServiceList(value)
      // setStore('storeIdWeb', value)
      // this.$store.dispatch('setStoreId', value)
      // window.location.reload()
      // this.reloadAllPage()
    },
    testClick () {},
    getBaseServiceList (val) {
      let params = {
        serviceType: 'basic',
        storeId: val
      }
      this.$api.getServiceList(params).then(res => {
        this.baseServiceList = res.data[0]
      })
    },
    childclick (isUnit) {
      if (getStore('distributorId')) {
        let params = {
          distributorId: getStore('distributorId')
        }
        this.loading = true
        this.$api.getDistributor(params).then(res => {
          if (res.code === 0) {
            // this.getAuthorityService()
            this.$emit('payment', this.baseServiceList, isUnit)
          } else if (res.code === 11) {
            this.$message.error('该经销商信息未审核，请先补全信息。')
            this.loading = false
            this.$router.push({path: '/store/maintain'})
          } else if (res.code === 2) {
            this.loading = false
            this.$message.error('您的信息正在审核中，审核通过后才能购买服务。')
          } else if (res.code === 5) {
            this.$message.error(res.msg)
          } else if (res.code === 1) {
            this.$message.error('您的信息未通过审核，请重新提交信息。')
            this.loading = false
            this.$router.push({path: '/store/maintain'})
          }
        })
      }
    },
    // 开通免费服务
    getAuthorityService () {
      if (this.payStoreId) {
        let params = {
          serviceId: this.baseServiceList.serviceId,
          storeId: this.payStoreId,
          cycle: 1
        }
        this.$api.authorityService(params).then(res => {
          this.loading = false
          if (res.code === 0) {
            this.$message.success('开通成功！')
            this.getBaseServiceList()
            this.reloadAllPage()
          }
        })
      } else {
        this.loading = false
        this.$message.warning('您的账号还未开设门店！')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.functional{
  max-width: 100%;
  overflow-x: auto;
  padding: 20px;
  border: 1px solid #F1DADA;
  box-shadow: #F1DADA 0px 0px 3px 2px ;
  h3{
    margin-bottom: 20px;
  }
  .public-modular{
    width:300px;
    margin-right: 20px;
    border-radius: 8px;
    position: relative;
    margin-top: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center bottom;
    &::before{
      content:"";
      display: block;
      width: 70px;
      height: 35px;
      border-radius:35px 35px 0 0;
      position: absolute;
      top:-37px;
      left: 50%;
      margin-left: -35px;
      border-bottom:1px solid #fff!important;
    }
    &::after{
      content:"";
      display: block;
      width: 44px;
      height: 44px;
      position: absolute;
      top:-22px;
      left: 50%;
      margin-left: -22px;
      background-size: contain;
    }
    >p{
      font-size: 34px;
      text-align: center;
      padding: 35px 0 10px 0;
    }
  }
  .func-main{
    display: flex;
    ul{
      display: flex;
      flex-wrap: wrap;
      width: 600px;
      li{
        width: 33%;
        height: 40px;
        padding-left: 20px;
        line-height: 40px;
        .service-icon{
          margin-right: 10px;
          color: #FE4145;
          background: #fff;
          border-radius: 50%;
        }
      }
    }
    .btn{
      width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 40px;
      .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        .store-label{
          width: 100px;
        }
      }
      .pay-btn{
        background-image: linear-gradient(90deg, #E70020, #fd4343, #fe5e55);
        border: none;
        color: #fff;
        font-size: 16px;
        &:hover{
          opacity: 0.8;
        }
      }
      .has-pay-btn{
        background: rgb(126, 190, 174);
        border: none;
        color: #fff;
        font-size: 16px;
      }
      p{
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}
</style>
