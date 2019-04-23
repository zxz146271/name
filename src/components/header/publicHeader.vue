<template >
  <div class="header">
    <div class="main">
      <div class="logo">
        <!-- <i class="iconfont icon-logo_bigzone1"></i> -->
        <img src="../../assets/image/logo (2).png" alt="">
      </div>
      <ul class="nav">
        <li class="nav-list" v-for="(item, index) in headList" :key="index" @click="jump(index)"><a class="log-reg">{{item}}</a></li>
        <li>
          <a class="log-reg">服务热线： 400 668 4866</a>
        </li>
        <li class="btn"><router-link to="/login" class="log">登录</router-link></li>
        <li class="btn"><router-link to="/registered" class="reg">注册</router-link></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      headList: []
    }
  },
  mounted () {
    this.findNav()
  },
  methods: {
    findNav () {
      this.$api.findHomeData().then(res => {
        if (res.code === 0) {
          // this.headList = res.data.menuList
          this.headList = [ '功能', '解决方案', '案例' ]
        }
      })
    },
    jump (index) {
      // 用 class="d_jump" 添加锚点
      let jump = document.querySelectorAll('.d_jump')
      let total = jump[index].offsetTop
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
.header {
  height: 60px;
  justify-content: space-between;
  // @include linear-grad;
  background: #fff;
  .main{
    display: flex;
    flex: 1;
    width: 1000px;
    margin: 0 auto;
    // @media screen and (max-width: 480px) {
    //   width: 400px;
    // }
    .logo {
      flex: 0 0 150px;
      margin: 0 0 0 25px;
      img{
        height: 60px;
      }
      .iconfont {
        color: #fff;
        font-size: 48px;
      }
    }
    .nav {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #fff;
      font-size: 14px;
      .log-reg{
          padding: 0 20px;
          display: block;
          width: 100%;
          height: 60px;
          line-height: 60px;
          color: #000;
        }
      .nav-list{
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        &:hover{
          background: rgba(0, 0, 0, 0.1);
        }
        span{
          background-color: #27292E;
          border-radius: 3px;
          padding: 0 5px;
          margin: 0 5px;
        }
      }
      .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        a{
          display: block;
          height: 30px;
          width: 80px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #FD4343;
          color: #FD4343;
          margin: 0 10px;
        }
        .reg{
          color: #fff;
          background: #FD4343;
          border: 1px solid #FD4343;
        }
      }
    }
  }
}
</style>
