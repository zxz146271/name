<!--********************************************      团购详情页面                      ************************************-->
<template>
  <div class="coupon">
    <div class="coupon-info">
      <div class="basic-info">
        <top-tips :title="optional[0]"></top-tips>
        <div class="info-cont">
          <!-- 团购详情列表 -->
          <basic-config :item = 'StMarketingGroupInfo'></basic-config>
        </div>
      </div>
      <div class="basic-info">
        <top-tips :title="optional[1]"></top-tips>
        <!--  领取量/页面访问人数/完成抢购时间-->
        <rob-number :prop='TableInfoData'></rob-number>
        <div class="info-cont">
           <div :id="splineData1.id"></div>
        </div>
      </div>
      <div class="basic-info">
        <top-tips :title="optional[2]"></top-tips>
        <div class="info-cont">
          <el-table
            :data="StGruopGetHistoryInfo"
            style="width: 100%">
            <el-table-column
              prop="consumerName"
              label="姓名"
              align="center"
              width="150">
            </el-table-column>
            <el-table-column
              prop="wechatNikiName"
              label="昵称"
              align="center"
              width="150">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="时间"
              align="center"
              width="150">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="手机"
              align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              align="center"
              width="250"
              label="地址">
            </el-table-column>
            <el-table-column
              prop="useMode"
              align="center"
              label="状态">
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
import robNumber from '../../../components/marketing/robNumber'
import highChart from '../../../components/public/highChart'
import HighCharts from 'HighCharts'
export default {
  data () {
    return {
      optional: [
        {
          title: '基础配置',
          unfold: false
        },
        {
          title: '团购-活动数据',
          unfold: false
        },
        {
          title: '领取列表',
          unfold: false
        }
      ],
      tableData: [{
        date: '2016-05-02',
        name: '158 98978 0098',
        num: '2',
        isUse: '使用'
      }, {
        date: '2016-05-02',
        name: '158 98978 0098',
        num: '2',
        isUse: '使用'
      }],
      splineData1: {
        id: 'spid1',
        data: {
          chart: {
            type: 'areaspline'
          },
          title: {
            text: '成团数/开团数',
            align: 'left',
            style: {
              color: '#27292E',
              fontSize: '14px',
              fontWeight: '1600'
            }
          },
          xAxis: {
            categories: [ ]
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
            data: [ ]
          }, {
            color: '#4caf50',
            type: 'areaspline',
            marker: {
              radius: 5,
              type: 'circle'
            },
            data: [ ]
          }]
        }
      },
      // 出示话团购对象
      StMarketingGroupInfo: {},
      // 团购活动  活动数据
      TableInfoData: {
        // 团购付款数
        succNum: 0,
        // 最少成功数
        minSucc: 0,
        // 初始化页面访问人数
        PageAccessNumberl: 0,
        // 头像
        photoList: [],
        // 活动状态
        groupBookingState: '',
        //  活动结果
        activityResults: '',
        // 展示消息
        showMsg: '',
        // 进度条样式展示
        progressBarShow: true,
        // 团购成功展示
        succPictureShow: false,
        // 人数百分比
        percentageOfNum: '100%',
        // 进度条标题
        percentageTitle: '',
        // 差多少人成团
        poorPepNum: 0
      },
      totalCount: 0,
      currentPage: 1,
      pagesize: 10,
      // 团购领取历史表
      StGruopGetHistoryInfo: [],
      // 折线图数据
      StgetCouponGetAndUse: []
    }
  },
  mounted () {
    // 初始化 优惠券信息
    this.getStMarketingGroupById()
    // 初始化 领取人历史表数据
    this.getGroupGetHistoryList()
    // // 初始化折线图
    this.getGroupeGetHighCharts()
    // 获取展示数据
    // this.getShowData()
  },
  methods: {
    // 组装展示数据
    assemblyShowData () {
      // 计算百分比
      if (this.TableInfoData.minSucc !== null && this.TableInfoData.succNum !== null) {
        if (this.TableInfoData.minSucc - this.TableInfoData.succNum >= 0) {
          // 计算比例
          this.TableInfoData.poorPepNum = this.TableInfoData.minSucc - this.TableInfoData.succNum
          this.TableInfoData.percentageOfNum = (this.TableInfoData.succNum / this.TableInfoData.minSucc) * 100 + '%'
        } else {
          this.TableInfoData.percentageOfNum = '100%'
        }
      }
      // 生成展示语句
      if (this.TableInfoData.activityResults === 1) {
        // 团购完成
        this.TableInfoData.showMsg = this.TableInfoData.succNum + '人团购成功'
        this.TableInfoData.succPictureShow = true
        this.TableInfoData.progressBarShow = false
        // 无人参团 团购失败
      } else if (this.TableInfoData.activityResults === 2 && this.TableInfoData.groupBookingState === '2' && this.TableInfoData.succNum === 0) {
        this.TableInfoData.showMsg = '团购未能成团'
        this.TableInfoData.succPictureShow = false
        this.TableInfoData.progressBarShow = true
      } else if (this.TableInfoData.activityResults === 2 && this.TableInfoData.groupBookingState === '2' && this.TableInfoData.succNum >= 0) {
        // 团购失败 人数不够
        this.TableInfoData.showMsg = '还差' + this.TableInfoData.poorPepNum + '成团'
        this.TableInfoData.succPictureShow = false
        this.TableInfoData.progressBarShow = true
      } else if (this.TableInfoData.activityResults === 0 && this.TableInfoData.groupBookingState === '1' && this.TableInfoData.succNum >= 0) {
        // 团购进行中 人数不够
        this.TableInfoData.showMsg = '还差' + this.TableInfoData.poorPepNum + '成团'
        this.TableInfoData.succPictureShow = false
        this.TableInfoData.progressBarShow = false
      }
      // 生成展示标题
      this.TableInfoData.percentageTitle = this.TableInfoData.minSucc + '人团'
    },
    // 获取展示数据
    getShowData () {
      let params = {
        groupBookingId: this.$route.query.groupBookingId
      }
      this.$api.getGroupBookingShowData(params).then(res => {
        if (res !== null) {
          this.TableInfoData.succNum = res.succNum
          this.TableInfoData.minSucc = res.succMinNum
          this.TableInfoData.PageAccessNumberl = res.activityTraffic
          if (res.joinConsumerInfo !== null && res.joinConsumerInfo.length > 0) {
            this.TableInfoData.photoList = res.joinConsumerInfo
          }
        }
        this.assemblyShowData()
      })
    },
    // 获取团购详情
    getStMarketingGroupById () {
      let params = {
        groupBookingId: this.$route.query.groupBookingId
      }
      this.$api.getStMarketingGroupById(params).then(res => {
        this.StMarketingGroupInfo = res.data
        this.TableInfoData.groupBookingState = res.data.state
        this.TableInfoData.activityResults = res.data.activityResults
        this.getShowData()
      })
    },
    // 初始化优惠券 折线图
    getGroupeGetHighCharts () {
      var _this = this
      let params = {
        groupBookingId: _this.$route.query.groupBookingId
      }
      this.$api.getGroupeBookingGetHighCharts(params).then(res => {
        if (res.data === null) {
          this.StgetCouponGetAndUse[0] = null
          this.StgetCouponGetAndUse[1] = null
        } else {
          this.StgetCouponGetAndUse = res.data
          console.log(this.StgetCouponGetAndUse)
        }
        this.splineData1.data = {
          chart: {
            type: 'areaspline'
          },
          title: {
            text: '参与人数/时间',
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
            name: '参与人数',
            color: '#fd4343',
            type: 'line',
            data: this.StgetCouponGetAndUse[1]
          }]
        }
        HighCharts.chart(this.splineData1.id, this.splineData1.data)
      })
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getGroupGetHistoryList()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getGroupGetHistoryList()
    },
    // 初始化  团购领取列表
    getGroupGetHistoryList () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        groupBookingId: this.$route.query.groupBookingId
      }
      this.$api.getGroupGetHistoryList(params).then(res => {
        this.StGruopGetHistoryInfo = res.data
        // 翻译使用状态
        if (this.StGruopGetHistoryInfo != null) {
          this.StGruopGetHistoryInfo.forEach(item => {
            // 翻译地址
            if (item.adcode != null && item.adcode !== '') {
              let areaSelectedTemp = JSON.parse(item.adcode)
              let aa = ''
              areaSelectedTemp.forEach(item => {
                aa = aa + item
              })
              if (item.detailAddress != null) {
                aa = aa + item.detailAddress
              }
              item.address = aa
            }
            // 翻译使用状态
            if (item.useMode != null && item.useMode !== '') {
              item.useMode = item.useMode === 'has_used' ? '已核销' : '未核销'
            }
          })
        }
        this.totalCount = res.count
      })
    }
  },
  components: {breadCrumb, topTips, basicConfig, robNumber, HighCharts, highChart}
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
      }
    }
  }
}
</style>
