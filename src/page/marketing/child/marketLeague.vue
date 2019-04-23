<template>
  <div class="coupon">
    <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb>
    <div class="coupon-info">
      <div class="banner">
        <span>联盟名称:{{this.StMarketingUnionInfo.unionName}}</span>
        <p>活动时间：{{this.StMarketingUnionInfo.startTime}}~{{this.StMarketingUnionInfo.endTime}}</p>
         <p>活动地点: {{this.StMarketingUnionInfo.unionAddress}}</p>
        <p>活动说明: {{this.StMarketingUnionInfo.activityDescription}}</p>
        <div class="back"></div>
      </div>
      <div class="basic-info">
        <div class="info-cont">
          <div class="table-title">
            <span>联盟参与者</span>
          </div>
          <el-table
            :data="StdistributoList"
            style="width: 100%">
            <el-table-column
             label="序号"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="手机号"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="distributorName"
              align="center"
              label="经销商名称">
            </el-table-column>
            <!-- <el-table-column
              prop="state"
              align="center"
              label="状态">
            </el-table-column> -->
            <!-- <el-table-column
              prop="operation"
              align="center"
              label="操作">
            </el-table-column> -->
          </el-table>
        </div>
        <div class="info-cont">
          <div class="table-title">
            <span>所有优惠券</span>
          </div>
          <el-table
            :data="AllCouponList"
            style="width: 100%">
            <el-table-column
             label="序号"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="couponName"
              label="优惠券"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="useExplanation"
              align="center"
              label="优惠券详情">
            </el-table-column>
            <el-table-column
              prop="distributorName"
              align="center"
              label="经销商名称">
            </el-table-column>
            <el-table-column
              prop="distributorMobile"
              align="center"
              label="经销商手机号">
            </el-table-column>
          </el-table>
        </div>
        <div class="info-cont">
          <div class="table-title">
            <span>活动数据</span>
          </div>
          <el-table
            :data="tableData3"
            style="width: 100%">
            <el-table-column
              prop="operator"
              label="经营商"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="toker"
              label="拓客数量"
              align="center"
              width="180">
            </el-table-column>
            <!-- <el-table-column
              prop="receive"
              align="center"
              label="优惠券领取量">
            </el-table-column> -->
            <el-table-column
              prop="writeOff"
              align="center"
              label="优惠券核销量">
            </el-table-column>
            <el-table-column
              prop="num"
              align="center"
              label="成交笔数">
            </el-table-column>
          </el-table>
        </div>
                <div class="info-cont">
          <div class="table-title">
            <span>明细数据</span>
            <el-button class="upload el-icon-upload" @click="exportExcel">下载</el-button>
          </div>
          <el-table
            :data="tableData3"
            style="width: 100%">
            <el-table-column
              prop="operator"
              label="成交订单号"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="toker"
              label="成交经销商"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="writeOff"
              align="center"
              label="引流经销商">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import {exportJsonExcel} from '../../../vendor/Export2Excel'
export default {
  data () {
    return {
      breadcrumbList: [
        {title: '联盟活动', path: '/marketing/activityLeague?pageChooseIndex=' + this.$route.query.pageChooseIndex},
        {title: '联盟数据', path: ''}
      ],
      optional: [
        {
          title: '基础配置',
          unfold: false
        },
        {
          title: '优惠券数据',
          unfold: false
        },
        {
          title: '领取列表',
          unfold: false
        }
      ],
      tableData3: [{
        operator: '1',
        toker: ' ',
        receive: '',
        writeOff: '12',
        num: '12345678910'
      }, {
        operator: '1',
        toker: ' ',
        receive: '',
        writeOff: '12',
        num: '12345678910'
      }, {
        operator: '1',
        toker: ' ',
        receive: '',
        writeOff: '12',
        num: '12345678910'
      }, {
        operator: '1',
        toker: ' ',
        receive: '',
        writeOff: '12',
        num: '12345678910'
      }],
      // 初始化联盟对象
      StMarketingUnionInfo: {},
      // 初始化经销商信息
      StdistributoList: [],
      // 初始化所有优惠券数据
      AllCouponList: []
    }
  },
  mounted () {
    // 初始化优惠券数据
    this.getStMarketingUnionById()
    // 初始化 优惠券列表数据
    this.getAllCouponDataByUnionId()
  },
  methods: {
    // 初始化查询联盟基本详情
    getStMarketingUnionById () {
      let params = {
        unionId: this.$route.query.unionId
      }
      this.$api.getStMarketingUnionById(params).then(res => {
        this.StMarketingUnionInfo = res.data
        if (this.StMarketingUnionInfo.receiveEndTime != null) {
          this.StMarketingUnionInfo.receiveEndTimeStr = this.StMarketingUnionInfo.receiveEndTime
        }
        if (this.StMarketingUnionInfo.associatedDistributorId != null) {
          this.StMarketingUnionInfo.associatedDistributorId.forEach(item => {
            this.AllDealers(item)
          })
        }
      })
    },
    // 根据手机号 获取经销商信息
    AllDealers (mobile1) {
      let params = {
        mobile: mobile1
      }
      this.$api.getMarketingUnionDistributorByMobile(params).then(res => {
        if (res.data) {
          this.StdistributoList.push(res.data)
        } else {
          this.$message.error('无效的电话号码')
        }
      })
    },
    // 初始化查询联盟基本详情
    getAllCouponDataByUnionId () {
      let params = {
        unionId: this.$route.query.unionId
      }
      this.$api.getAllCouponDataByUnionId(params).then(res => {
        this.AllCouponList = res.data
      })
    },
    // 表格导出
    exportExcel () {
      // this.$emit('exportExcel')
      const tHeader = ['序号', '会员姓名']
      const filterVal = ['distributorName', 'couponName']
      const data = this.formatJson(filterVal, this.AllCouponList)
      exportJsonExcel(tHeader, data, '联盟活动明细数据')
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  },
  components: {breadCrumb}
}

</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.coupon{
  margin:0 auto;
  padding-top: 106px;
  .coupon-info{
    padding-top:30px;
    .banner{
      width:100%;
      height: 145px;
      @include linear(135deg,rgba(88,99,128,1),rgba(185,195,212,1));
      padding: 32px 0 0 35px;
      color:#fff;
      position: relative;
      border-radius: 4px;
      span{
        font-size:$detail-size;
        display: block;
        margin-bottom: 15px;
      }
      p{
        margin-bottom: 10px;
        font-size: $xs-size;
      }
      .back{
        width: 170px;
        height: 100%;
        position: absolute;
        right: 40px;
        top:0;
        background-image: url("../../../assets/image/activity_lian.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position:center center;
      }
    }
    .basic-info{
      .info-cont{
        padding: 20px 0;
        .table-title{
          padding: 20px 0 15px 0;
          font-weight: 700;
          font-size: $md-size;
          color:$text-main-color;
          display: flex;
          justify-content: space-between;
          .upload{
            padding: 5px 12px;
            color: #fff;
            font-size: $xs-size;
            background: $blue-color;
            border: none;
            span{
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
