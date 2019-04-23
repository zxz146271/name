<template>
  <div class="">
    <div class="title">短信余额</div>
    <div class="sms-info">
      <div class="sms-content">
        <div class="item">
          <span class="left">短信购买总量/条：</span><span class="right" style="color: #FD4343;font-weight:bold;">{{smsTotalNum}}</span>
        </div>
        <div class="item">
          <span class="left">可使用短信总量/条：</span><span class="right">{{smsSurplusNum}}</span>
        </div>
        <div class="item">
          <span class="left">已使用短信总量/条：</span><span class="right">{{smsTotalNum - smsSurplusNum}}</span>
        </div>
      </div>
    </div>
    <div class="record-title">
      <div class="toggle-btn" :class="{ 'active': active}" @click="buyRecord">购买记录</div>
      <div class="toggle-btn right" :class="{ 'active': !active}" @click="useRecord">使用记录</div>
    </div>
    <div class="label-role" v-show="active">
      <el-table
        :data="buyRecordList"
        style="width: 100%">
        <el-table-column
          prop="purchaseTime"
          label="购买时间"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="mealName"
          label="套餐名称"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="purchaseMealNum"
          label="套餐数量"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="smsTotalNum"
          label="短信总量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="mealAmount"
          label="金额/元"
          align="center">
        </el-table-column>
        <el-table-column label="门店"
          prop="storeName"
          align="center">
        </el-table-column>
      </el-table>
      <div class="pagin">
        <span class="total">共{{count1}}条数据</span>
        <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :page-sizes="[2, 5, 10, 20]"
          :current-page.sync="currentPage1"
          layout="sizes, prev, pager, next"
          :total="count1">
        </el-pagination>
     </div>
    </div>
    <div class="label-role" v-show="!active">
      <el-table
        :data="useRecordList"
        style="width: 100%">
        <el-table-column
          prop="phone"
          label="手机号码"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="sendTime"
          label="发送短信时间"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="successNum"
          label="成功发送次数"
          align="center">
        </el-table-column>
        <el-table-column
            prop="brand"
            label="手机类型"
            align="center">
          </el-table-column>
        <el-table-column label="门店"
            prop="storeName"
            align="center">
        </el-table-column>
        <el-table-column
            prop="boxMac"
            label="蘑盒Mac地址"
            align="center">
          </el-table-column>
      </el-table>
      <div class="pagin">
        <span class="total">共{{count2}}条数据</span>
        <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :page-sizes="[2, 5, 10, 20]"
          :current-page.sync="currentPage2"
          layout="sizes, prev, pager, next"
          :total="count2">
        </el-pagination>
     </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      smsTotalNum: 0,
      smsSurplusNum: 0,
      active: true,
      loading: false,
      buyRecordList: [],
      useRecordList: [],
      currentPage1: 1,
      pagesize1: 10,
      count1: 0,
      currentPage2: 1,
      pagesize2: 10,
      count2: 0
    }
  },
  mounted () {
    this.getOverSMS()
    this.getBuyRecord()
    this.getUseRecord()
  },
  methods: {
    getOverSMS () {
      this.$api.getOverSMS().then(res => {
        if (res.code === 0) {
          if (undefined !== res.data.smsTotalNum && res.data.smsTotalNum !== null && res.data.smsTotalNum !== '') {
            this.smsTotalNum = res.data.smsTotalNum
          }
          if (undefined !== res.data.smsSurplusNum && res.data.smsSurplusNum !== null && res.data.smsSurplusNum !== '') {
            this.smsSurplusNum = res.data.smsSurplusNum
          }
        }
      })
    },
    getBuyRecord () {
      let params = {
        page: this.currentPage1,
        limit: this.pagesize1
      }
      this.$api.getBuyRecord(params).then(res => {
        this.buyRecordList = res.data
        this.buyRecordList.forEach(item => {
          item.mealAmount = item.mealAmount / 100
        })
        this.count1 = res.count
      })
    },
    getUseRecord () {
      let params = {
        page: this.currentPage2,
        limit: this.pagesize2
      }
      this.$api.getUseRecord(params).then(res => {
        this.useRecordList = res.data
        this.count2 = res.count
      })
    },
    buyRecord () {
      this.active = true
    },
    useRecord () {
      this.active = false
    },
    handleSizeChange1 (pagesize) {
      this.pagesize1 = pagesize
      this.getBuyRecord()
    },
    handleCurrentChange1 (currentPage) {
      this.currentPage1 = currentPage
      this.getBuyRecord()
    },
    handleSizeChange2 (pagesize) {
      this.pagesize2 = pagesize
      this.getUseRecord()
    },
    handleCurrentChange2 (currentPage) {
      this.currentPage2 = currentPage
      this.getUseRecord()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.sms-info{
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 20px;
  .sms-content{
    background: url('../../../assets/image/serviceSMS.png') no-repeat;
    width: 580px;
    height: 145px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size:14px;
    color:rgba(51,51,51,1);
    .item{
      width: 100%;
    }
    div{
      margin: 10px 0;
    }
    .left{
      display: inline-block;
      width: 50%;
      text-align: right;
    }
    .right{
      margin-left: 20px;
    }
  }
}
.title{
  height:36px;
  background:rgba(244,244,244,1);
  border-radius:5px;
  line-height: 36px;
  font-size:14px;
  color:rgba(51,51,51,1);
  padding-left: 20px;
  margin-bottom: 20px;
}
.record-title{
  height:36px;
  background:rgba(244,244,244,1);
  border-radius:5px;
  font-size:14px;
  color:rgba(51,51,51,1);
  padding-left: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  .toggle-btn{
    cursor: pointer;
    padding: 0 10px;
  }
  .right{
    border-left:1px solid rgba(203,203,203,1);
  }
  .active{
    color: #FD4343;
  }
}
.label-role {
  margin: 0 auto;
  .edit,
  .delete {
    border: 0;
    background: none;
  }
  .edit {
    color: $main-color;
    &:hover {
      color: lighten($main-color, 12%);
    }
  }
  .delete {
    color: $table-text-color;
    &:hover {
      color: lighten($table-text-color, 12%);
    }
  }
}
</style>
