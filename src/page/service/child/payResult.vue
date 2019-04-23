<template>
  <div class="pay-result" v-if="payRes == 0">
    <div class="pay-title">
      <i class="el-icon-success"></i>
      <span>支付成功</span>
    </div>
    <div class="pay-msg">
      <p>订单号: {{paymentOrderId}}</p>
      <p class="money">共计: {{amount}}元</p>
    </div>
    <div class="order-msg">
      <router-link to="/service/serviceDetail">
        查看订单
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
  <div class="pay-result" v-else>
    <div class="pay-title">
      <i class="el-icon-error error-icon"></i>
      <span>支付失败</span>
    </div>
    <div class="order-msg">
      <router-link to="/service/serviceDetail">
        返回重新购买
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
// import titleTop from '../../../components/service/titleTop'
// import functional from '../../../components/service/functional'
// import service from '../../../components/service/service'
// import payment from '../../../components/service/payment'
// import { judgeButton } from '../../../tool/Utils'
export default{
  data () {
    return {
      amount: null,
      paymentOrderId: '',
      payRes: null
    }
  },
  computed: {
    // ...mapGetters(['powerButton'])
  },
  created () {
    this.amount = this.$route.params.amount
    this.paymentOrderId = this.$route.params.paymentOrderId
    this.payRes = this.$route.params.payRes
  },
  methods: {
  },
  components: {}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.pay-result{
  min-height: 100%;
  .pay-title{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 100px 0 50px 0;
    font-size: 40px;
    i{
      color: $adorn-color-2;
      margin-right: 20px;
      font-size: 70px;
    }
    .error-icon{
      color: $text-red-color;
    }
  }
  .pay-msg{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0 50px 0;
    p{
      padding: 0 30px;
      font-size: 16px;
    }
    .money{
      border-left: 1px solid #666;
    }
  }
  .order-msg{
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    a{
      color: $blue-color;
    }
  }
}
</style>
