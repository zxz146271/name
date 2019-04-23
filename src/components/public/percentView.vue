<template>
  <div class="percent-view">
    <p class="lg-title">2000.00</p>
    <p class="xs-title">近7条交易</p>
    <div class="percent-bottom">
      <div class="item">
        <p class="week">12%</p>
        <p class="day">周同比</p>
      </div>
      <div class="item">
        <p class="week">11%</p>
        <p class="day">日同比</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.percent-view{
  height: 300px;
  background-color:#FF7169;
  color: #fff;
  text-align: center;
  padding-top: 46px;
  &:hover{
    opacity: 0.9;
    .lg-title{
      transform: scale(1.1);
      transition: 0.5s ease-in-out
    }
  }
  .lg-title{
    font-size: 50px;
  }
  .xs-title{
    font-size: 14px;
    margin-bottom: 25px;
  }
  .percent-bottom{
    display: flex;
    height: 100px;
    margin-top: 69px;
    align-items: center;
    border-top: 1px solid rgba(255,255,255,0.3);
    position: relative;
    &::after{
      content: '';
      width: 1px;
      background: rgba(255,255,255,0.3);
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
    }
    .item{
      flex: 1;
      position: relative;
      .week{
        font-size: 24px;
        margin-bottom: 12px;
      }
      .day{
        font-size: 16px;
      }
    }
  }
}

</style>
