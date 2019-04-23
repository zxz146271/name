<!--********************************************             详情页引用组件               ************************************-->
<template>
  <div class="basic-config">
    <div class="item marketCoupon"  v-if="$route.path.indexOf('marketCoupon') !==-1">
      <ul>
        <li>
          <label>优惠券名称：</label><span>{{item.couponName}}</span>
        </li>
        <li>
          <label>是否参加联盟：</label><span>{{item.isRelateLeague === 'Y'?'是':'否'}}</span>
        </li>
        <li v-if="item.isRelateLeague === 'Y'">
          <label>联盟名称：</label><span>{{item.leagueName}}</span>
        </li>
        <li>
          <label>发放总量：</label><span>{{item.totalAmount}}</span>
        </li>
        <li v-if="item.preferentialWay === 'reduceMoney'">
          <label>面值：</label><span>{{item.lapseAmount}}</span>
        </li>
         <li v-if="item.preferentialWay === 'reduceMoney'">
          <label>使用门槛：</label><span>{{item.useThreshold === 'noThreshold'?'无门槛':'满足一定金额使用'}}</span>
        </li>
         <li v-if="item.useThreshold === 'satisfyMoney'">
          <label>满足金额：</label><span>{{item.thresholdMoney}}</span>
        </li>
         <li >
          <label>优惠方式：</label><span >{{item.preferentialWay === 'pricing'?'折扣':'直减'}}</span>
        </li>
        <li v-if="item.preferentialWay === 'pricing'">
          <label>折扣：</label><span>{{item.preferentialIntensity}}%</span>
        </li>
        <li>
          <label>活动时间段：</label><span>{{item.getStartTime}} - {{item.getEndTime}}</span>
        </li>
          <li>
          <label>使用时间段：</label><span>{{item.useStartTime}} - {{item.useEndTime}}</span>
        </li>
        <li>
          <label>使用范围：</label><span>{{item.useScope}}</span>
        </li>
         <li  v-if="item.useScope === '指定商品可用'">
          <label>商品名称：</label><span>{{item.productsName}}</span>
        </li>
        <li>
          <label>活动说明：</label><span>{{item.useExplanation}}</span>
        </li>
        <!-- <li>
          <label>咨询电话：</label><span>{{item.consultingPhone}}</span>
        </li> -->
        <li>
          <label>每人限领：</label><span>{{item.limitNumber}}</span>
        </li>
      </ul>
      <div class="basic-config-img marketCouponImg"></div>
    </div>
    <div class="item marketPrefer" v-if="$route.path.indexOf('marketPrefer') !==-1">
      <div class="basic-config-img marketPreferImg"></div>
      <ul>
        <li>
          <label>活动名称：</label><span>{{item.seckillName}}</span>
        </li>
        <li>
          <label>是否参加联盟：</label><span>{{item.isRelateLeague === 'Y'?'是':'否'}}</span>
        </li>
        <li v-if="item.isRelateLeague === 'Y'">
          <label>联盟名称：</label><span>{{item.leagueName}}</span>
        </li>
        <li>
          <label>使用范围：</label><span>{{item.useScope === 'assignProduce'?'商品':'自定义'}}</span>
        </li>
        <li  v-if="item.useScope === 'user_defined'">
          <label>自定义：</label><span>{{item.seckillContent}}</span>
        </li>
         <li  v-if="item.useScope === 'assignProduce'">
          <label>商品名称：</label><span>{{item.productsName}}</span>
        </li>
        <li>
          <label>总数量：</label><span>{{item.totalAmount}}</span>
        </li>
        <li>
          <label>每人限领：</label><span>{{item.limitNumber}}</span>
        </li>
        <li>
          <label>活动时间段：</label><span>{{item.getStartTime}} - {{item.getEndTime}}</span>
        </li>
          <li>
          <label>使用时间段：</label><span>{{item.useStartTime}} - {{item.useEndTime}}</span>
        </li>
        <li>
          <label>活动说明：</label><span>{{item.useExplanation}}</span>
        </li>
        <!-- <li>
          <label>咨询电话：</label><span>{{item.consultingPhone}}</span>
        </li> -->
        <li>
          <label>秒杀价：</label><i>{{item.discountPrice}}</i><span>原价:{{item.productsOriginalPrice}}</span>
        </li>
      </ul>
    </div>
    <div class="item marketGroup" v-if="$route.path.indexOf('marketGroup') !==-1">
      <div class="basic-config-img marketGroupImg"></div>
      <ul>
        <li>
          <label>活动名称：</label><span>{{item.groupBookingName}}</span>
        </li>
        <li>
          <label>是否参加联盟：</label><span>{{item.isRelateLeague === 'Y'?'是':'否'}}</span>
        </li>
        <li v-if="item.isRelateLeague === 'Y'">
          <label>联盟名称：</label><span>{{item.leagueName}}</span>
        </li>
        <li>
          <label>活动时间段：</label><span>{{item.startTime}} - {{item.endTime}}</span>
        </li>
          <li>
          <label>活动展示时间：</label><span>{{item.showTime}}</span>
        </li>
        <li>
          <label>团购商品：</label><span>{{item.goodName}}</span>
        </li>
        <li>
          <label>折扣价：</label><i>{{item.groupMoney}}</i><span>原价:{{item.goodsMsrp}}</span>
        </li>
        <li>
          <label>支付方式：</label><span>{{item.payType === 'deposit'?'定金':'全款'}}</span>
        </li>
        <li v-if="item.payType === 'deposit'">
          <label>定金金额：</label><span>{{item.deposit}}</span>
        </li>
        <li>
          <label>活动说明：</label><span>{{item.useExplanation}}</span>
        </li>
        <li>
          <label>满（人数）：</label><span>{{item.successfulPeople}}</span>
        </li>
        <li>
          <label>每人限购数：</label><span>{{item.everyoneBuyMax}}</span>
        </li>
        <li>
          <label>是否限制团购总人数:</label><span>{{item.whetherLimitPeople === 0?'是':'否'}}</span>
        </li>
        <li v-if="item.whetherLimitPeople === 0">
          <label>团购总人数:</label><span>{{item.limitPeopleNum}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ['item']
}

</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.basic-config{
  font-size: $xs-size;
  flex:1;
  .item{
    position: relative;
    ul{
      li{
        padding:10px 0;
        label{
          width:160px;
          display: inline-block;
          text-align: right;
          margin-right: 16px;
        }
        span{
          color:$text-gray-color;
        }
        i{
          color: $text-red-color;
          margin-right:22px;
        }
      }
    }
    .basic-config-img{
      width: 315px;
      height: 200px;
      background-repeat:no-repeat;
      background-size: contain;
      position: absolute;
      right:75px;
      top:80px;
    }
    .marketCouponImg{
      background-image: url('../../assets/image/activity_juan@2x.png');
    }
    .marketPreferImg{
      background-image: url('../../assets/image/activity_qiang.png');
    }
    .marketGroupImg{
      background-image: url('../../assets/image/activity_tuan.png');
    }
  }
}
</style>
