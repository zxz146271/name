<template>
  <div class="service-bar">
    <div class="service-buy" @click="goService">服务购买</div>
    <el-tooltip class="item" effect="dark" content="电话咨询：400-668-4866" placement="left">
      <!-- <div class="listen"  @click="goHelp"><i class="el-icon-service"></i></div> -->
      <div class="service-buy service-phone" @click="goHelp">官方客服</div>
    </el-tooltip>
    <!-- <div class="qrcode">
      <i class="iconfont icon-erweima bar-qrcode"></i>
      <div class="qrcode-detail">
        <div id="store-code"></div>
      </div>
    </div> -->
    <div class="scroll"  @click="scrollTop"><i class="el-icon-download"></i></div>
  </div>
</template>
<script>
// import { getStore } from '../../tool/Utils'
// import QRCode from 'qrcodejs2'
export default{
  data () {
    return {
    }
  },
  mounted () {
    // this.createQrCode()
  },
  methods: {
    goService () {
      this.$router.push({path: '/service/serviceDetail'})
    },
    goHelp () {
      this.$router.push({path: '/help/helpCenter'})
    },
    scrollTop () {
      // 用 class="d_jump" 添加锚点
      let jump = document.querySelectorAll('.scroll-top-header')
      let total = jump[0].offsetTop
      let distance = document.documentElement.scrollTop || document.body.scrollTop
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50
      if (total > distance) {
        smoothDown()
      } else {
        let newTotal = distance - total
        step = newTotal / 50
        smoothUp()
      }
      function smoothDown () {
        if (distance < total) {
          distance += step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(smoothDown, 10)
        } else {
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      }
      function smoothUp () {
        if (distance > total) {
          distance -= step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(smoothUp, 10)
        } else {
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.service-bar{
  width: 50px;
  height:210px;
  position: fixed;
  right: 2%;
  top: 50%;
  margin-top: -105px;
  // background: #FE4145;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  z-index: 500;
  .scroll,
  .listen{
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
    &:hover{
      opacity: .8;
    }
  }
  .scroll{
    transform:rotate(180deg);
    color:black;
    width: 50px;
    padding: 0 10px;
    margin: 10px 0;
    background: #FFF;
    border-radius:8px;
    border:1px solid rgba(231,231,231,1);
    box-shadow:-2px -2px 4px rgba(0,0,0,0.2);
  }
  .service-buy{
    width: 50px;
    height: 50px;
    padding: 5px 10px;
    font-size: 15px;
    background: #1E6BE3;
    box-shadow:0px 3px 6px rgba(0,0,0,0.2);
    color: #fff;
    border-radius: 8px;
    margin: 10px 0;
    cursor: pointer;
    &:hover{
      opacity: .8;
    }
  }
  .service-phone{
    background:rgba(254,65,69,1);
    box-shadow:0px 3px 6px rgba(0,0,0,0.2);
  }
  .qrcode{
    position: relative;
    &:hover{
      .qrcode-detail{
        display: block;
      }
    }
    .bar-qrcode{
      width: 35px;
      height: 35px;
      color: #fff;
      font-size: 35px;
      cursor: pointer;
      &:hover{
        opacity: .8;
      }
    }
    .qrcode-detail{
      display: none;
      position: absolute;
      left: -225px;
      bottom: -75px;
      border:1px solid rgba(0,0,0,0.16);
      box-shadow: 0 6px 12px 0 rgba(0,0,0,0.2);
      padding: 15px;
      background: #fff;
      &::before{
        content: '';
        display: block;
        position: absolute;
        width:18px;
        height:18px;
        border:1px solid rgba(0, 0, 0, 1);
        background: #fff;
        transform: rotate(45deg);
        z-index: 10;
        border-right: 0;
        border-top: 0;
        border-radius: 4px;
        right: -9px;
        top: 98px;
        border-bottom: none;
        border-left: none;
      }
    }
  }
}
</style>
