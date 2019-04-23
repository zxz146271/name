<template>
  <div class="phone">
    <div class="content">
      <div class="bannner">
        <img src="../../assets/image/sign-black.jpg" alt="">
      </div>
      <div class="list">
        <p>模块标题</p>
        <ul>
          <li>
            <div class="box">
              <img  src="../../assets/image/user-head.jpg" alt="">
              <span>商品名称</span>
            </div>
          </li>
          <li>
            <div class="box">
              <img  src="../../assets/image/user-head.jpg" alt="">
              <span>商品名称</span>
            </div>
          </li>
          <li>
            <div class="box">
              <img  src="../../assets/image/user-head.jpg" alt="">
              <span>商品名称</span>
            </div>
          </li>
          <li>
            <div class="box">
              <img  src="../../assets/image/user-head.jpg" alt="">
              <span>商品名称</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default{

}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.phone{
    width: 310px;
    height: 630px;
    background-image: url("../../assets/image/iPhonebox@2x.png");
    background-size: cover;
    background-position: center center;
    .content{
      width: 260px;
      height: 470px;
      margin: 83px auto 0 auto;
      background: #fff;
      overflow-y:auto;
      .bannner{
        width: 100%;
        height: 134px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .list{
        >p{
          font-size: $xs-size;
          color:$text-main-color;
          font-weight: 700;
          padding: 10px 6px;
        }
        ul{
          display: flex;
          margin-top: -5px;
          flex-wrap: wrap;
          li{
            width: 50%;
            padding: 5px;
            .box{
              text-align: center;
              span{
                font-size: $xs-size;
                color:$text-main-color;
              }
              img{
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>
