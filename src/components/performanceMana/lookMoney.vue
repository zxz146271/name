<template>
  <div class="detail">
    <!-- <div class="portrait">
      <img src="../../assets/image/user-head.jpg" alt="">
      <span style="font-size:35px;">{{stMemberDetail.firstName}}</span>
    </div> -->
    <div class="content">
      <p>门店 : {{money.storeName}}</p>
      <ul>
        <!-- <li>ID：{{stMemberDetail.memberId}}</li> -->
        <li v-if="money.month">日期：{{money.month}}</li>
        <li v-else>日期：{{money.weekTime}}</li>
        <li>总期望值：{{money.expectationMoney}}</li>
      </ul>
      <template>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="staffName"
            label="姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="expectationMoney"
            label="期望值"
            width="130">
          </el-table-column>
          <el-table-column
            prop="actualMoney"
            label="实际值"
            width="130">
          </el-table-column>
          <el-table-column
            prop="schedlueStr"
            label="完成度">
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // moneyPerformance: {
      //   storeId: '',
      //   month: '',
      //   week: '',
      //   type: ''
      // }
      // tableData: []
    }
  },
  // 接收传过来的数组对象
  props: ['money', 'tableData'],
  // watch: {
  //   money () {
  //     this.tableData = []
  //     this.getListData()
  //   }
  // },
  mounted () {
    // this.getListData()
  },
  methods: {
    // getListData () {
    //   this.moneyPerformance.storeId = this.money.storeId
    //   this.moneyPerformance.month = this.money.monthStr
    //   this.moneyPerformance.week = this.money.weekStr
    //   this.moneyPerformance.type = this.money.type
    //   let params = {
    //     page: 1,
    //     limit: 100,
    //     sotrePerformanceVo: this.moneyPerformance
    //   }
    //   this.$api.getStaffMoneyPerformanceListData(params).then(res => {
    //     if (res.code === 0) {
    //       if (res.data.length === 0) {
    //         this.$message.error('该门店还没有配置当月业绩,请分配以后进行查看')
    //       } else {
    //         res.data.forEach(el => {
    //           this.tableData.push(el)
    //         })
    //       }
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.detail{
  padding: 30px 42px;
  display: flex;
  .portrait{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .content{
    padding-left: 30px;
    font-size: $md-size;
    color: $child-nav-color;
    width: calc(100% - 80px);
    >p{
      font-weight: 700;
    }
    ul{
      padding: 12px 0;
      position: relative;
      &::before{
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: $border-color;
        position: absolute;
        left: 0;
        bottom: 0;
      }
      &:last-child:before{
        height: 0;
      }
      li{
        font-size: $xs-size;
      }
    }
  }
}
</style>
