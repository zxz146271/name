<template>
  <div class="write-off">
    <div class="info">
      <div class="title" v-if="this.flag">
        手机号：<span>{{ phoneNum }}</span> 
      </div>
      <div class="title" v-if="this.flag">
        该会员有<span>{{  marketingCouponsLength }}</span>张卡券
      </div>
    </div>
    
    <div class="phone" v-if="!this.flag"></div>
    <div class="itemWrapper">
      <write-off-discount v-for="(item,index) in marketingCoupons" :key="index" :item="item"></write-off-discount>
    </div>
  </div>
</template>
<script>
import writeOffDiscount from '../../../components/marketing/writeOffDiscount'
export default {
  data () {
    return {
      marketingCoupons: [],
      isNumber: '',
      phoneNum: '',
      flag: false,
      promotionCode: '',
      marketingCouponsLength:0
    }
  },
  mounted () {
    this.promotionCode = this.$route.query.params
    this.flag = this.$route.query.flag
    this.phoneNum = this.$route.query.phoneNumber
    if (this.flag) {
      this.getConponByPhone()
    } else {
      this.getConponByCode()
    }
  },
  methods: {
    getConponByCode () {
      let params = {
        promotionCode: this.promotionCode
      }
      this.$api.getConponByCode(params).then(res => {
        this.marketingCoupons = res.data
        // this.marketingCoupons.forEach(item => {
        //   if (item.couponType === '0') {
        //     item.type = '0'
        //   } else if (item.couponType === '1') {
        //     item.type = '1'
        //   } else {
        //     item.useMode = 'N'
        //   }
        //   if (item.couponType === '0') {
        //     item.couponType = '优惠券'
        //   } else if (item.couponType === '1') {
        //     item.couponType = '兑换券'
        //   }
        // })
      })
    },
    getConponByPhone () {
      let params = {
        phoneNumber: this.phoneNum
      }
      this.$api.getConponByPhone(params).then(res => {
        this.marketingCoupons = res.data
        // this.marketingCoupons.forEach(item => {
        //   if (item.couponType === '0') {
        //     item.type = '0'
        //   } else if (item.couponType === '1') {
        //     item.type = '1'
        //   } else {
        //     item.useMode = 'N'
        //   }
        // })
        // this.marketingCoupons.forEach(item => {
        //   if (item.couponType === '0') {
        //     item.couponType = '优惠券'
        //   } else if (item.couponType === '1') {
        //     item.couponType = '兑换券'
        //   }
        // })
        this.marketingCouponsLength = this.marketingCoupons.length
        if(this.marketingCoupons.length%3==1){
          this.marketingCoupons.push({isEmpty:true})
          this.marketingCoupons.push({isEmpty:true})
          this.marketingCouponsLength = this.marketingCoupons.length-2
        }
        if(this.marketingCoupons.length%3==2){
          this.marketingCoupons.push({isEmpty:true})
          this.marketingCouponsLength = this.marketingCoupons.length-1
        }
      })
    }
  },
  components: {writeOffDiscount}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.write-off{
  height: 100%;
  margin: 0 auto;
  padding-top: 100px;
  .phone{
    display:flex;
    justify-content: center;
    align-items: center;
    padding-top:60px;
    span{
      color:$text-main-color;
      font-size: $md-size;
    }
    p{
      font-size: $md-size;
      color:$text-red-color;
      padding:0 10px;
    }
    i{
      font-size: $xs-size;
      color:$text-adorn-color;
      padding:4px 8px;
      border-radius: 4px;
      border:1px solid $border-color;
      cursor: pointer;
    }
  }
  .title{
    padding: 0px 0 12px 0;
    font-size: $detail-size;
    color:$text-main-color;
    span{
      color:$text-red-color;
    }
  }
  .itemWrapper{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
.info{
  margin-top: 26px;
  margin-bottom: 28px;
}
</style>
