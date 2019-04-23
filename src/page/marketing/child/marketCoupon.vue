<!--********************************************         优惠券领取人数据 (图表/table)                  ************************************-->
<template>
  <div class="coupon">
    <!-- <bread-crumb :breadcrumbList="breadcrumbList"  v-if="this.pageType ===0"></bread-crumb>
     <bread-crumb :breadcrumbList="breadcrumbList1"  v-if="this.pageType === 1"></bread-crumb> -->
    <div class="coupon-info">
      <div class="basic-info">
        <top-tips :title="optional[0]"></top-tips>
        <div class="info-cont">
          <!-- 引入  基础组件 -->
       <basic-config  :item = 'stMarketingCouponInfo'></basic-config>
        </div>
      </div>
      <div class="basic-info">
        <top-tips :title="optional[1]"></top-tips>
        <div class="info-cont">
          <div :id="splineData.id"></div>
          <!-- 获取领取的折线图-->
          <div :id="splineData1.id"></div>
          <!--获取使用的折线图 -->
          <div :id="splineData2.id"></div>
        </div>
      </div>
      <div class="basic-info">
        <top-tips :title="optional[2]"></top-tips>
        <div class="info-cont">
          <el-table
            :data="StCouponGetHistoryInfo"
            style="width: 100%">
            <el-table-column
              prop="createTime"
              label="日期"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="recipientName"
              label="姓名"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="wechatNikiName"
              label="微信昵称"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="mobileNum"
              label="电话"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              align="center"
              label="地址">
            </el-table-column>
            <el-table-column
              prop="useMode"
              align="center"
              label="是否使用">
            </el-table-column>
          </el-table>
           <div class="pagin">
          <span class="total">共{{totalCount}}条数据</span>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total="totalCount">
        </el-pagination>
      </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
// import doughnutChart from '../../../components/public/doughnutChart'
// import lineChart from '../../../components/public/lineChart'
import basicConfig from '../../../components/marketing/basicConfig'
import highChart from '../../../components/public/highChart'
import HighCharts from 'HighCharts'
export default {
  name: 'coupon',
  data () {
    return {
      // breadcrumbList: [
      //   {title: '优惠券活动', path: '/marketing/activityCoupon?pageChooseIndex=' + this.$route.query.pageChooseIndex + '&pageStoreId=' + this.$route.query.pageStoreId},
      //   {title: '优惠券数据', path: ''}
      // ],
      // breadcrumbList1: [
      //   {title: '优惠券活动', path: '/marketing/marketUnionDetails?pageChooseIndex=' + this.$route.query.pageChooseIndex + '&unionId=' + this.$route.query.unionId},
      //   {title: '优惠券数据', path: ''}
      // ],
      splineData: {
        id: 'spid',
        data: {}
      },
      splineData1: {
        id: 'spid1',
        data: {
          chart: {
            type: 'areaspline'
          },
          title: {
            text: '领取/使用',
            align: 'left',
            style: {
              color: '#27292E',
              fontSize: '14px',
              fontWeight: '600'
            }
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            min: 0,
            title: {
              text: null
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                  [0, 'rgba(250,212,106,0.8)'],
                  [1, 'rgba(250,212,106,0)']
                ]
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              }
            }
          },
          credits: {
            text: ''
          },
          series: [{
            color: '#fd4343',
            type: 'line',
            data: []
          }, {
            color: '#4caf50',
            type: 'areaspline',
            marker: {
              radius: 5,
              type: 'circle'
            },
            data: []
          }]
        }
      },
      splineData2: {
        id: 'spid2',
        data: {
          chart: {
            type: 'areaspline'
          },
          title: {
            text: '使用',
            align: 'left',
            style: {
              color: '#27292E',
              fontSize: '14px',
              fontWeight: '600'
            }
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            min: 0,
            title: {
              text: null
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                  [0, 'rgba(250,212,106,0.8)'],
                  [1, 'rgba(250,212,106,0)']
                ]
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              }
            }
          },
          credits: {
            text: ''
          },
          series: [{
            color: '#fd4343',
            type: 'line',
            data: []
          }, {
            color: '#4caf50',
            type: 'areaspline',
            marker: {
              radius: 5,
              type: 'circle'
            },
            data: []
          }]
        }
      },
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
      doughnutData: {
        data: [2, 19, 3],
        backgroundColor: ['#769ece', '#4baae8', '#f0b24f'],
        label: ['未领取', '已领取', '已使用']
      },
      lineData: [
        {
          title: '数据1',
          data: [12, 42, 20, 5, 2, 3],
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          label: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
        },
        {
          title: '数据2',
          data: [5, 30, 10, 8, 4, 20],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          label: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
        }
      ],
      // 定义普通优惠券  空的对象
      stMarketingCouponInfo: {},
      // 初始化饼状图(未领取,已领取,已使用)
      PieChartData: [],
      // 初始化领取人历史表数据
      StCouponGetHistoryInfo: [],
      totalCount: 0,
      StgetCouponGetAndUse: [],
      StgetCouponGetAndUse2: [],
      HistoryAddress: [],
      currentPage: 1,
      pagesize: 10,
      pageType: ''
    }
  },
  created () {
    // 初始化 优惠券信息
    this.getStMarketingCouponByCode()
    // 初始化饼状图数据
    this.getPieChartDataById()
    // 初始化 领取人历史表数据
    this.getGetHistoryDataById()
    // 初始化折线图
    this.getCouponGetAndUse()
    // 初始化折线图
    this.getCouponGetAndUse2()
    this.pageType = this.$route.query.pageType
  },
  methods: {
    // 初始化优惠券信息
    getStMarketingCouponByCode () {
      let params = {
        couponCode: this.$route.query.couponCode
      }
      this.$api.getStMarketingCouponByCode(params).then(res => {
        this.stMarketingCouponInfo = res.data
        // 遍历数据  翻译字段
        if (this.stMarketingCouponInfo.useScope === 'allProduce') {
          this.stMarketingCouponInfo.useScope = '所有商品'
        } else if (this.stMarketingCouponInfo.useScope === 'assignProduce') {
          this.stMarketingCouponInfo.useScope = '指定商品可用'
        } else if (this.stMarketingCouponInfo.useScope === 'assignStore') {
          this.stMarketingCouponInfo.useScope = '指定门店可用'
        }
      })
    },
    // 初始化  饼状图数据
    getPieChartDataById () {
      var _this = this
      let params = {
        couponCode: _this.$route.query.couponCode
      }
      this.$api.getPieChartDataById(params).then(res => {
        this.splineData.data = {
          chart: {
            type: 'pie'
          },
          title: {
            text: null
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer'
            }
          },
          credits: {
            text: ''
          },
          series: [{
            name: '数量',
            color: '#fd4343',
            type: 'pie',
            innerSize: '60%',
            data: res.data
          }]
        }
        HighCharts.chart(this.splineData.id, this.splineData.data)
      })
    },
    // 初始化优惠券 折线图
    getCouponGetAndUse () {
      var _this = this
      let params = {
        couponCode: _this.$route.query.couponCode,
        startTime: _this.$route.query.getStartTime,
        endTime: _this.$route.query.getEndTime,
        useModel: 'no_used'
      }
      this.$api.getCouponGetAndUse(params).then(res => {
        if (res.data === null) {
          this.StgetCouponGetAndUse[0] = null
          this.StgetCouponGetAndUse[1] = null
          this.StgetCouponGetAndUse[2] = null
        } else {
          this.StgetCouponGetAndUse = res.data
        }
        this.splineData1.data = {
          chart: {
            type: 'areaspline'
          },
          title: {
            text: '已领取',
            align: 'left',
            style: {
              color: '#27292E',
              fontSize: '14px',
              fontWeight: '600'
            }
          },
          xAxis: {
            categories: this.StgetCouponGetAndUse[0]
          },
          yAxis: {
            min: 0,
            title: {
              text: null
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                  [0, 'rgba(250,212,106,0.8)'],
                  [1, 'rgba(250,212,106,0)']
                ]
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              }
            }
          },
          credits: {
            text: ''
          },
          series: [{
            name: '已领取',
            color: '#fd4343',
            type: 'line',
            data: this.StgetCouponGetAndUse[1]
          }]
        }
        HighCharts.chart(this.splineData.id, this.splineData.data)
        HighCharts.chart(this.splineData1.id, this.splineData1.data)
      })
    },
    // 初始化优惠券  使用折线图
    getCouponGetAndUse2 () {
      var _this = this
      let params = {
        couponCode: _this.$route.query.couponCode,
        startTime: _this.$route.query.useStartTime,
        endTime: _this.$route.query.useEndTime,
        useModel: 'has_used'
      }
      this.$api.getCouponGetAndUse(params).then(res => {
        if (res.data === null) {
          this.StgetCouponGetAndUse2[0] = null
          this.StgetCouponGetAndUse2[1] = null
          this.StgetCouponGetAndUse2[2] = null
        } else {
          this.StgetCouponGetAndUse2 = res.data
        }
        this.splineData2.data = {
          chart: {
            type: 'areaspline'
          },
          title: {
            text: '已使用',
            align: 'left',
            style: {
              color: '#27292E',
              fontSize: '14px',
              fontWeight: '600'
            }
          },
          xAxis: {
            categories: this.StgetCouponGetAndUse2[0]
          },
          yAxis: {
            min: 0,
            title: {
              text: null
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                  [0, 'rgba(250,212,106,0.8)'],
                  [1, 'rgba(250,212,106,0)']
                ]
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              }
            }
          },
          credits: {
            text: ''
          },
          series: [{
            name: '已使用',
            color: '#fd4343',
            type: 'line',
            data: this.StgetCouponGetAndUse2[2]
          }]
        }
        HighCharts.chart(this.splineData2.id, this.splineData2.data)
      })
    },
    // 初始化优惠券临取历史表数据
    getGetHistoryDataById () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        Id: this.$route.query.couponCode
      }
      this.$api.getGetHistoryDataById(params).then(res => {
        this.StCouponGetHistoryInfo = res.data
        // 翻译使用状态
        this.StCouponGetHistoryInfo.forEach(item => {
          if (item.useMode === 'has_used') {
            item.useMode = '已使用'
          } else if (item.useMode === 'no_used') {
            item.useMode = '未使用'
          } else {
            item.useMode = ''
          }
          // 翻译地址
          if (item.memberRegion != null && item.memberRegion !== '') {
            let areaSelectedTemp = JSON.parse(item.memberRegion)
            let aa = ''
            areaSelectedTemp.forEach(item => {
              aa = aa + item
            })
            if (item.detailAddress != null && aa !== '') {
              aa = aa + item.detailAddress
            }
            item.address = aa
          }
          // 翻译微信昵称
          if (item.wechatNikiName == null || item.wechatNikiName === '') {
            item.wechatNikiName = '--'
          }
        })
        this.totalCount = res.count
      })
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getGetHistoryDataById()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getGetHistoryDataById()
    }
  },
  components: {breadCrumb, topTips, basicConfig, highChart}
}

</script>
<style lang="scss" scoped>
.coupon{
  margin:0 auto;
  padding-top: 106px;
  .coupon-info{
    padding-top:30px;
    .basic-info{
      .info-cont{
        padding: 20px 0;
        .highpie{
          height: 240px;
        }
        .highpie1{
          height: 240px;
        }
      }
    }
  }
}
</style>
