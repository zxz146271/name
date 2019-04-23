<template>
  <div class="info-chart">
    <div class="chart-item" v-for="(item,index) in 4" :key="index">
      <p class="title">
        <span>水电费水电费</span>
        <span>16</span>
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.info-chart{
  display: flex;
  .chart-item{
    width:25%;
    margin-right: 14px;
    &:last-child{
      margin-right: 0;
    }
    .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
