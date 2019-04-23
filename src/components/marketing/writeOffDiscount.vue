<template>
  <div>
    <div class="discountNone" v-if="item.isEmpty">

    </div>
    <div class="discount " v-else  :class="getBackColor()">
      <div class="header">{{header}}</div>
      <div class="content">
        <div class="conponName">{{couponName}}</div>
        <div class="storeName">
          <div class="text">门店: {{storeName}}</div>
          <div class="btn" v-if="this.item.useMode != 'has_used'" @click="writeOffAction()">核销</div>
        </div>
        <div class="text">{{activityRules}}</div>
        <div class="text">兑换时间:{{exchangeTime}}</div>
        <div class="showDetail" @click="showDetail()">查看详情 ></div>
        <img  v-if="this.item.useMode === 'has_used'" class="hasWriteOff" src="../../assets/image/card/yihexiao_icon@2x.png" alt="">
      </div>
      <div class="writeOffDialog" v-if="isShowWriteOff">
        <div class="writeOffModel">
          <img :src="writeOffImg" alt="">
          <div class="text">{{writeOffText}}</div>
          <div class="btnWrapper" >
            <el-button v-if="writeOffState==0"  @click="closeWriteOffDialog">取消</el-button>
            <el-button v-if="writeOffState==0" type="primary" @click="checkout">确定</el-button>
            <el-button v-if="writeOffState==1||writeOffState==2" type="primary" @click="closeWriteOffDialog()">好的</el-button>
          </div>
        </div>
      </div>
      <div class="detailDialog" v-if="isShowDetail">
        <div class="detailModel">
            <div class="title">卡券活动说明详情</div>
            <div class="coontent">
              <div class="item textOverFlow">
                使用门槛：{{usingThreshold}}
              </div>
              <div class="item textOverFlow">
                使用范围：{{usingRange}}
              </div>
              <div class="item textOverFlow">
                咨询电话：{{storePhone}}
              </div>
              <div class="item">
                活动说明：{{directionsForUse}}
              </div>
            </div>
            <div class="bottom">
              <el-button   type="primary" @click="isShowDetail=false">好的已了解</el-button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import imgAsk from '../../assets/image/card/writeOffAsk.png'
import imgSuc from '../../assets/image/card/writeOffSuc.png'
import imgErr from '../../assets/image/card/writeOffErr.png'

export default {
  data () {
    return {
      header: '',
      isShowWriteOff: false,
      writeOffImg: imgAsk,
      writeOffText: '真的要核销优惠券了哦~',
      writeOffState: 0, // 核销状态 0未核销  1核销成功  2核销失败
      isShowDetail: false,
      // 显示活动名称/商品名称
      couponName: '',
      // 展示门店名称
      storeName: '',
      // 活动规则
      activityRules: '',
      // 活动兑换时时间
      exchangeTime: '',
      // 详情活动说明
      usingThreshold: '无门槛',
      // 详情处使用-->>使用范围
      usingRange: '',
      // 咨询电话
      storePhone: '',
      // 活动说明
      directionsForUse: '',
      // 已核销图标显示
      iconSHow: false

    }
  },
  // 接收循环标签传过来的集合
  props: ['item'],
  inject: ['reloadMarketPage'],
  couponHistoryId: '',
  mounted () {
    // 图标显示
    if (this.item.useMode === 'has_used') {
      this.iconSHow = true
    } else {
      this.iconSHow = false
    }
    // 处理左侧文档显示
    switch (this.item.couponType) {
      case '0':
      // 判断是折扣券还是代金券  zhekou
        if (this.item.preferentialWay === 'pricing') {
          this.header = (this.item.preferentialIntensity / 10) + '折'
          // 判断活动规则
          this.activityRules = this.header + '      ' + (this.item.marketingCouponVo.useScope === 'allProduce' ? '全部商品可用' : '部分商品可用')
          // 详情处使用
          this.usingThreshold = '每人限领' + this.item.marketingCouponVo.limitNumber + '张'
        } else {
          this.header = Number(this.item.lapseAmount).toFixed(2) + '元'
          // 判断活动规则-->>无门槛
          if (this.item.marketingCouponVo.useThreshold === 'noThreshold') {
            this.activityRules = '直减' + this.item.marketingCouponVo.lapseAmount + '      ' + (this.item.marketingCouponVo.useScope === 'allProduce' ? '全部商品可用' : '部分商品可用')
            // 详情处使用
            this.usingThreshold = '每人限领' + this.item.marketingCouponVo.limitNumber + '张'
          } else {
            // 有门槛
            this.activityRules = '满' + this.item.marketingCouponVo.thresholdMoney + '可用      ' + (this.item.marketingCouponVo.useScope === 'allProduce' ? '全部商品可用' : '部分商品可用')
            // 详情处使用
            this.usingThreshold = '满' + this.item.marketingCouponVo.thresholdMoney + '可用      每人限领' + this.item.marketingCouponVo.limitNumber + '张'
          }
        }
        // 显示优惠券名称
        this.couponName = this.item.couponName
        // 展示门店名
        this.storeName = this.item.storeName
        // 展示活动兑换时间
        this.exchangeTime = this.item.marketingCouponVo.useStartTime.substring(0, 10) + '  至  ' + this.item.marketingCouponVo.useEndTime.substring(0, 10)
        // 详情处使用-->>使用范围
        this.usingRange = (this.item.marketingCouponVo.useScope === 'allProduce' ? '全部商品' : this.item.marketingCouponVo.productsName)
        // 详情处使用 -->>咨询电话
        this.storePhone = this.item.storePhone
        // 详情处使用 -->>活动说明
        this.directionsForUse = this.item.marketingCouponVo.useExplanation
        break
      case '1':
        // 显示活动名称
        this.couponName = this.item.seckillVo.productsName
        // 展示门店名
        this.storeName = this.item.storeName
        // 左侧显示
        this.header = '兑换券'
        // 活动规则展示
        this.activityRules = '定金' + this.item.seckillVo.deposit + '已付,全款' + this.item.seckillVo.discountPrice + '元'
        // 展示活动兑换时间
        this.exchangeTime = this.item.seckillVo.useStartTime.substring(0, 10) + '  至  ' + this.item.seckillVo.useEndTime.substring(0, 10)
        // 详情处使用使用范围
        this.usingThreshold = '每人限领' + this.item.seckillVo.limitNumber + '张'
        // 详情处使用-->>使用范围
        this.usingRange = this.item.seckillVo.productsName
        // 详情处使用 -->>咨询电话
        this.storePhone = this.item.storePhone
        // 详情处使用 -->>活动说明
        this.directionsForUse = this.item.seckillVo.useExplanation
        break
      case '2':
        if (this.item.ticketType === '0') {
          this.header = '团购活动兑换券'
        } else {
          this.header = '团购活动退款券'
        }
        // 显示团券商品名
        this.couponName = this.item.groupBookingVo.goodName
        // 展示门店名
        this.storeName = this.item.groupBookingVo.storeName
        if (this.item.groupBookingVo.payType === 'deposit') {
          // 活动规则展示
          this.activityRules = '定金' + this.item.groupBookingVo.deposit + '已付,全款' + this.item.groupBookingVo.groupMoney + '元'
        } else {
          // 活动规则展示
          this.activityRules = '已付全款' + this.item.groupBookingVo.groupMoney + '元'
        }
        // 展示活动兑换时间
        this.exchangeTime = '该活动无兑换期限'
        // 详情处使用使用范围
        this.usingThreshold = '每人限领' + this.item.groupBookingVo.everyoneBuyMax + '张'
        // 详情处使用-->>使用范围
        this.usingRange = this.item.groupBookingVo.goodName
        // 详情处使用 -->>咨询电话
        this.storePhone = this.item.storePhone
        // 详情处使用 -->>活动说明
        this.directionsForUse = this.item.groupBookingVo.useExplanation
        break
      default:
        break
    }
  },
  methods: {
    getBackColor () {
      let className = 'discount linearGradient0'
      if (this.item.useMode === 'has_used') {
        return 'discount hasUsed'
      }
      // if(this.item.couponType==0){
      //   className = 'discount linearGradient0'
      // }
      // if(this.item.couponType==1){
      //   className = 'discount linearGradient1'
      // }
      // if(this.item.couponType==2){
      //   className = 'discount linearGradient2'
      // }
      switch (this.item.couponType) {
        case '0':
          className = 'discount linearGradient0'
          break
        case '1':
          className = 'discount linearGradient1'
          break
        case '2':
          className = 'discount linearGradient2'
          break
      }
      return className
    },
    showDetail () {
      this.isShowDetail = true
    },
    writeOffAction () {
      this.getWriteOffModelInfo()
      // setTimeout(() => {
      //   this.isShowWriteOff = false
      // }, 1000);
    },
    closeWriteOffDialog () {
      this.isShowWriteOff = false
      this.writeOffState = 0
    },
    getWriteOffModelInfo (msg) {
      switch (this.writeOffState) {
        case 0:
          this.writeOffText = '真的要核销优惠券了哦~'
          this.writeOffImg = imgAsk
          break
        case 1:
          this.writeOffText = '卡券已核销成功了哦~'
          this.writeOffImg = imgSuc
          break
        case 2:
          this.writeOffText = msg
          this.writeOffImg = imgErr
          break
        default:
          break
      }
      this.isShowWriteOff = true
    },
    getHeader () {
      switch (this.item.couponType) {
        case '0':
          this.header = this.item
          break
        default:
          break
      }
    },
    checkout (code, type) {
      let params = {
        promotionCode: this.item.promotionCode,
        couponType: this.item.couponType
      }
      this.$api.checkoutConpon(params).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '核销成功!',
            type: 'success'
          })
          this.reloadMarketPage()
          this.writeOffState = 1
          this.getWriteOffModelInfo()
          // this.$router.push({path: '/marketing/writeOff'})
        } else {
          this.writeOffState = 2
          this.getWriteOffModelInfo(res.msg)
	  // this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.discountNone{
  width: 360px;
  height: 150px;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  border-radius: 10px;
  background-color: transparent;
}
.discount{
  width: 360px;
  height: 150px;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  border-radius: 10px;
  .header{
    width: 115px;
    height:100%;
    position: absolute;
    left: 0;
    top:0;
    z-index: 1;
    padding: 15px;
    border-right:1px dashed $border-color;
    font-size: 25px;
    font-weight: 400;
    color: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;;
  }
  .content{
    width: 100%;
    height: 100%;
    // background:#fff;
    border-radius: 10px;
    border:1px solid $border-color;
    position: relative;
    padding-left: 120px;
    padding-top: 22px;
    padding-right: 5px;
    .hasWriteOff{
      position: absolute;
      display: block;
      width: 50px;
      height: 50px;
      top: 10px;
      right: 10px;
    }
     &:before{
       content:"";
       display: block;
       width: 20px;
       height: 20px;
       border-radius: 50%;
       background: #fff;
       border:1px solid $border-color;
       position: absolute;
       top:-10px;
       left: 105px;
       z-index: 2;
    }
    &:after{
       content:"";
       display: block;
       width: 20px;
       height: 20px;
       border-radius: 50%;
       background: #fff;
       border:1px solid $border-color;
       position: absolute;
       bottom:-10px;
       left: 105px;
       z-index: 2;
    }
    .conponName{
      width: 100%;
      height:22px;
      font-size:17px;
      font-weight:400;
      line-height:22px;
      color:#fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }
    .storeName{
      width: 100%;
      height:25px;
      display: flex;
      justify-content: space-around;
      margin-bottom: 2px;
      .text{
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height:25px;
        font-size:11px;
        font-weight:400;
        line-height:25px;
        color:rgba(255,255,255,1);
      }
      .btn{
        width: 55px;
        height: 23px;
        margin-top: 1px;
        border-radius: 18px;
        background-color: #fff;
        color: #FD4343;
        text-align: center;
        line-height: 23px;
      }
    }
    .text{
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height:20px;
      font-size:11px;
      font-weight:400;
      line-height:20px;
      color:rgba(255,255,255,1);
    }
    .showDetail{
      width: 80px;
      height:20px;
      font-size:11px;
      font-weight:400;
      line-height:20px;
      color:rgba(255,255,255,1);
    }
  }
  .hover{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    .showDetail{
      width: 160px;
      height: 40px;
      border-radius: 23px;
      background-color: #FFFFFF;
      margin: auto;
      font-size:14px;
      font-weight:400;
      line-height:40px;
      text-align: center;
      margin-top: 55px;
      color:rgba(51,51,51,1);
    }
  }
}
.linearGradient0{
   background: -webkit-linear-gradient(left,#FE5E55,#E70020);
  background: -o-linear-gradient(right, #FE5E55,#E70020);
  background: -moz-linear-gradient(right,#FE5E55,#E70020);
  background: linear-gradient(to right, #FE5E55,#E70020);
}
.linearGradient1{
   background: -webkit-linear-gradient(left, #79C8FA , #5482EF);
  background: -o-linear-gradient(right, #79C8FA , #5482EF);
  background: -moz-linear-gradient(right, #79C8FA , #5482EF);
  background: linear-gradient(to right, #79C8FA , #5482EF);
}
.linearGradient2{
   background: -webkit-linear-gradient(left, #C86DD7 , #3023AE);
  background: -o-linear-gradient(right, #C86DD7 , #3023AE);
  background: -moz-linear-gradient(right, #C86DD7 , #3023AE);
  background: linear-gradient(to right, #C86DD7 , #3023AE);
}
.hasUsed{
  background-color: #CDCBCE;
}
.dialog{
  width: 100%;
  position: relative;
  img{
    width: 50px;
    height: 50px;
    position: absolute;
    top: -15px;
  }
}
.writeOffDialog{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 99999;
  .writeOffModel{
    width: 480px;
    height: 230px;
    background-color: #fff;
    margin: auto;
    margin-top: 20%;
    position: relative;
    padding-top: 85px;
    img{
      width: 50px;
      height: 50px;
      position: absolute;
      left: 215px;
      top: -15px;
    }
    .text{
      width: 100%;
      height: 26px;
      font-size:20px;
      font-weight:400;
      line-height: 26px;
      text-align: center;
    }
    .btnWrapper{
      width: 100%;
      height: 32px;
      margin-top: 62px;
      display: flex;
      justify-content: space-around;
    }
  }
}
.detailDialog{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 99999;
  .detailModel{
    width: 480px;
    background-color: #fff;
    margin: auto;
    margin-top: 20%;
    padding: 20px 48px;
    position: relative;
    .title{
      width: 100%;
      height: 18px;
      font-size: 14px;
      text-align: center;
      color: #333333;
      font-weight: bold;
      margin-bottom: 24px;
    }
    .content{
      width: 100%;
      .item{
        width: 100%;
        height: 18px;
        font-size: 12px;
        color: #333333;
        margin-bottom: 5px;
      }
    }
    .bottom{
      display: flex;
      justify-content: center;
      padding-top: 30px;
    }
  }
}
.textOverFlow{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
