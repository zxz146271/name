<!--********************************************        秒杀页面详情引用组件                    ************************************-->
<template>
<div class="box">
  <div class="rob" v-if="$route.path.indexOf('marketPrefer') !==-1">
    <div class="modular1 modular-public">
      <p>{{prop.CouponCountByIdInfo}}/{{prop.totalAmount}}</p>
      <span>领取量{{prop.CouponCountByIdInfo}}</span>
      <div class="back"></div>
    </div>
    <div class="modular2 modular-public">
      <p>{{prop.PageAccessNumberl}}</p>
      <span>页面访问人数</span>
      <div class="back"></div>
    </div>
    <div class="modular3 modular-public">
      <p>{{prop.DurationTime}}</p>
      <span>完成抢购时长</span>
      <div class="back"></div>
    </div>
  </div>
  <div class="rob" v-if="$route.path.indexOf('marketGroup') !==-1">
    <div class="modular4 modular-public">
      <p>{{prop.succNum}}/{{prop.minSucc}}</p>
      <span>团购付款数/团购最低数</span>
      <div class="back"></div>
    </div>
    <div class="modular5 modular-public">
      <p>{{prop.PageAccessNumberl}}</p>
      <span>页面访问人数</span>
      <div class="back"></div>
    </div>
    <div class="modular6">
      <div class="group-info">
        <div class="left">
          <p class="group-name">{{prop.minSucc}}人团</p>
          <p class="group-info" :class="{'succ-group': prop.succPictureShow}">{{prop.showMsg}}</p>
        </div>
        <div ></div>
        <div class="right" v-for="item in prop.photoList" :key="item">
          <img :src="item.wechatPhoto">
        </div>
      </div>
      <div class="progress">
        <div class="no-now" :style="{width: prop.percentageOfNum}" v-if="prop.progressBarShow"></div>
        <div class="now" :style="{width: prop.percentageOfNum}" v-else></div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  props: ['prop'],
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/_var';
.rob{
  padding:30px 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  .modular-public{
    flex: 1;
    text-align: center;
    color:#fff;
    padding: 0 8px;
    p{
      padding: 15px 0;
      font-size: $detail-price-big-size;
      position: relative;
      &:before{
        content:"";
        display: block;
        width:150px;
        height: 1px;
        border-top:1px dashed rgba(255,255,255,0.4);
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom:0;
      }
    }
    span{
      display: block;
      padding: 10px 0 5px 0;
      font-size: $xlg-size;
      color: rgba(255,255,255,0.8);
    }
    .back{
      width:100%;
      height: 24px;
      background-image: url("../../assets/image/date_bg@2x.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top center;
    }
  }
  .modular1{
    @include linear(134.8deg,rgba(238,72,95,1),rgba(255,113,105,1));
  }
  .modular2{
    @include linear(134.4deg,rgba(96,120,234,1),rgba(24,231,217,1));
    margin: 0 25px;
  }
  .modular3{
    @include linear(135deg,rgba(124,150,166,1),rgba(181,198,204,1));
  }
  .modular4{
    background:linear-gradient(135deg,rgba(238,72,95,1) 0%,rgba(255,113,105,1) 100%);
  }
  .modular5{
    background:linear-gradient(134deg,rgba(96,120,234,1) 0%,rgba(24,231,217,1) 100%);
     margin: 0 25px;
  }
  .modular6{
    width:317px;
    height:121px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(219,219,219,1);
    border-radius:4px;
    padding: 15px 12px 0;
    .group-info{
      display: flex;
      justify-content: space-between;
      .left{
        .group-name{
          font-size:18px;
          font-weight:bold;
          line-height:25px;
          color:rgba(0,0,0,1);
        }
        .group-info{
          font-size:16px;
          line-height:22px;
          color:rgba(140,140,140,1);
        }
        .succ-group{
          font-size:16px;
          line-height:22px;
          color:#FF8914;
        }
      }
      .right{
        display: flex;
        flex-direction: row-reverse;
        position: relative;
        img{
          position: absolute;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 3px solid #fff;
        }
        img:nth-child(2){
          right: 15px;
        }
        img:nth-child(3){
          right: 30px;
        }
        img:nth-child(4){
          right: 45px;
        }
        img:nth-child(5){
          right: 60px;
        }
      }
    }
    .progress{
      margin-top: 25px;
      width:285px;
      height:10px;
      background:rgba(235,235,235,1);
      border-radius:10px;
      .now{
        height:10px;
        background:rgba(255,137,20,1);
        border-radius:10px;
      }
      .no-now{
        height:10px;
        background:rgba(200,200,200,1);
        border-radius:10px;
      }
    }
  }
}
</style>
