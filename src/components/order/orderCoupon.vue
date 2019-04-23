<template>
  <div class="order-coupon">
    <div class="coupon-icon">
      <i class="el-icon-close coupon-icon-close" @click="closeCoupon"></i>
    </div>
    <p class="title">使用/修改优惠券</p>
    <div class="search"><el-input placeholder="输入优惠码搜索" v-model="searchValue"></el-input></div>
    <div class="coupon-list">
      <ul>
        <li v-for="(item,index) in couponList" :key="index" :class="{active:thisIndex === index}" @click.stop="chooseThis(index)">
          <div>
            <p>【名称】{{item.couponName}}</p>
            <!-- 直减无门槛时显示 -->
            <p class="red-color" v-if="item.preferentialWay === 'reduceMoney' && item.useThreshold === 'noThreshold' && item.useScope === 'assignProduce'">
              【部分商品直减券】直减{{item.lapseAmount}}
            </p>
             <p class="red-color" v-if="item.preferentialWay === 'reduceMoney' && item.useThreshold === 'noThreshold' && item.useScope === 'allProduce'">
              【全部商品直减券】直减{{item.lapseAmount}}
            </p>
             <!-- 部分商品直减有门槛时显示 -->
            <p class="red-color"  v-if="item.preferentialWay === 'reduceMoney' && item.useThreshold === 'satisfyMoney' && item.useScope === 'assignProduce'">
              【部分商品满减券】满{{item.thresholdMoney}}减{{item.lapseAmount}}
              </p>
                 <!-- 全部商品直减有门槛时显示 -->
            <p class="red-color"  v-if="item.preferentialWay === 'reduceMoney' && item.useThreshold === 'satisfyMoney'  && item.useScope === 'allProduce'">
              【全部商品满减券】满{{item.thresholdMoney}}减{{item.lapseAmount}}
              </p>
              <!-- 部分商品折扣券使用 -->
            <p class="red-color"  v-if="item.preferentialWay === 'pricing' && item.useScope === 'assignProduce'">
              【部分商品折扣券】{{item.preferentialIntensity * 0.1}}折
              </p>
                <!-- 全部商品折扣券使用 -->
            <p class="red-color"  v-if="item.preferentialWay === 'pricing' && item.useScope === 'allProduce'">
              【全部商品折扣券】{{item.preferentialIntensity * 0.1}} 折
              </p>
          </div>
          <div v-show="thisIndex === index" class="checked">
            <i class="el-icon-check"></i>
          </div>
        </li>
        <li v-if="noCoupon">
          <font color = 'red'  class="nouse-coupon"> {{noCouponMsg}}</font>
        </li>
      </ul>
    </div>
    <el-button type="primary" :disabled="noCoupon" class="btn-use" @click="useCoupon">使用优惠券</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchValue: '',
      couponList: [],
      thisIndex: '',
      copyCouponList: [],
      goodsList: [],
      noCoupon: false,
      noCouponMsg: ''
    }
  },
  watch: {
    searchValue: function (val, oldVal) {
      if (val.trim().length > 0) {
        this.couponList = this.couponList.filter(item => (~item.couponName.indexOf(val)))
      } else {
        this.couponList = this.copyCouponList
      }
    }
  },
  // 数据初始化方法
  mounted () {
    this.getMemberCoupon()
  },
  methods: {
    // 获取优惠券
    getMemberCoupon () {
      if (this.products.length === 0) {
        this.$message.error('请先选择购买商品')
        return
      }
      // 转换为jsondata
      let orderDetails = []
      this.products.forEach((item, index) => {
        let Detail = {
          // 商品id
          goodsId: item.goodsId,
          // 商品原件
          goodsMsrp: item.goodsMsrp,
          // 商品折扣价
          discountPrice: item.discountPrice,
          // 商品购买数量
          goodsNum: item.num
        }
        orderDetails.push(Detail)
      })
      let params = {
        // 商品数据
        jsonData: JSON.stringify(orderDetails),
        // 当前用户
        mobile: this.mobile
      }
      this.$api.getMemberCoupon(params).then(res => {
        if (res.code === 0 && res.data.length > 0) {
          console.log(res.data.length)
          this.couponList = res.data
          this.copyCouponList = res.data
        } else if (res.code === 0 && res.data.length === 0) {
          this.noCouponMsg = '当前订单无可用优惠券'
          this.noCoupon = true
        } else {
          this.noCouponMsg = res.msg
          this.noCoupon = true
        }
      })
    },
    chooseThis (index) {
      this.thisIndex = index
    },
    useCoupon () {
      this.$confirm('该优惠券在使用后会自动核销,请注意修改订单价格!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$emit('select-coupon', this.couponList[this.thisIndex])
      }).catch(() => {
        this.$emit('select-coupon', false)
        this.$message({
          type: 'info',
          message: '已取消使用优惠券'
        })
      })
      // this.couponInfo = false
    },
    closeCoupon () {
      this.$emit('close-coupon')
    }
  },
  props: ['products', 'mobile', 'discountPrice']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.order-coupon{
  height: 305px;
  width:305px;
  background: #fff;
  box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.2);
  border-radius: 4px;
  border:1px solid $border-color;
  position: absolute;
  bottom: 78px;
  z-index: 999;
  left: -4px;
  .coupon-icon{
    display: flex;
    justify-content: flex-end;
    .coupon-icon-close{
      padding: 5px 5px 0 5px;
      cursor: pointer;
    }
  }
  .title{
    padding:12px 0;
    text-align: center;
    font-size: $xlg-size;
    &::after{
      width: 22px;
      height:1px;
      content: '';
      background-color:#979797;
      display: inline-block;
      position: relative;
      top:-4px;
      left:8px;
    }
    &::before{
      width: 22px;
      height:1px;
      content: '';
      background-color:#979797;
      display: inline-block;
      position: relative;
      top:-4px;
      left:-8px;
    }
  }
  .search{
    padding: 0 10px;
  }
  .coupon-list{
    ul{
      margin-top: 6px;
      height: 168px;
      overflow-y: auto;
      li{
        padding: 6px 12px;
        border-bottom:1px solid $border-color;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: space-between;
        &:hover{
          background-color: $gray-color;
        }
        &.active{
          background-color: $gray-color;
          .checked{
            flex: 0 0 30px;
            color:$main-color;
            text-align: center;
            i{
              font-size: 18px;
              font-weight: 600;
            }
          }
        }
        p{
          padding: 2px 0;
          font-size: $xs-size;
          text-align: left;
          &.red-color{
            color:$main-color;
            font-size: $md-size;
          }
        }
      }
    }
  }
  .btn-use{
    width: 100%;
    border-radius:0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 15px 20px;
  }
  .nouse-coupon {
      padding: 41px;
  }
}
</style>
