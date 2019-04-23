<template>
  <div class="footer-msg">
    <i class="close-foot el-icon-close" @click="close"></i>
    <div class="main">
      <div class="left">
          <img src="" alt="">
      </div>
      <div class="right">
        <p class="text1">免费获取VIP功能包</p>
        <p class="text2">15项超级功能包，原价4800，限时免费开通</p>
        <el-button round class="foot-btn" @click="go">免费获取</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    close () {
      this.$emit('closeReview')
    },
    go () {
      this.close()
      this.$router.push('/service/serviceDetail')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.footer-msg{
  width: 100%;
  height: 200px;
  position: fixed;
  bottom: 0;
  background: #7E7E7E;
  .close-foot{
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 40px;
    color: #fff;
    cursor: pointer;
  }
  .main{
    display: flex;
    justify-content: center;
    align-items: center;
    .left{
      width: 160px;
      height: 160px;
      background: #FC5752;
      border-radius: 30px;
      margin-right: 20px;
    }
    .right{
      color: #fff;
      .text1{
        font-size: 18px;
      }
      .text2{
        font-size: 14px;
        margin: 5px 0 20px;
      }
      .foot-btn{
        background: #FC5752;
        border: none;
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
</style>
