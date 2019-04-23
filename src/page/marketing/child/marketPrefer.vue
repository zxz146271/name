<!-- *****************************************  秒商品详情数据页面  ************************************************ -->
<template>
  <div class="coupon">
    <div class="coupon-info">
      <div class="basic-info">
        <top-tips :title="optional[0]"></top-tips>
        <div class="info-cont">
         <basic-config  :item = 'stMarketingSeckillInfo'></basic-config>
        </div>
      </div>
      <div class="basic-info">
        <top-tips :title="optional[1]"></top-tips>
        <!--  领取量/页面访问人数/完成抢购时间-->
        <rob-number :prop='TableInfoData'></rob-number>
        <div class="info-cont">
           <div :id="splineData1.id"></div>
          <div :id="splineData2.id"></div>
        </div>
      </div>
      <div class="basic-info">
        <top-tips :title="optional[2]"></top-tips>
        <div class="info-cont">
          <el-table :data="StCouponGetHistoryInfo"
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
          title: '活动数据',
          unfold: false
        },
        {
          title: '领取列表',
          unfold: false
        }
      ],
      splineData1: {
        id: 'spid1',
        data: {
          chart: {
            type: 'areaspline'
          },
          title: {
            text: '已领取',
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
      splineData2: {
        id: 'spid2',
        data: {
          chart: {
            type: 'areaspline'
          },
          title: {
            text: '已使用',
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
      // 定义秒商品优惠券  空的对象
      stMarketingSeckillInfo: [],
      // 初始化领取人历史表数据
      StCouponGetHistoryInfo: [],
      totalCount: 0,
      TableInfoData: {
        // 初始化 获取活动时长
        DurationTime: '',
        // 初始化领取数量
        CouponCountByIdInfo: '',
        // 初始化活动总量
        totalAmount: '',
        // 初始化页面访问人数
        PageAccessNumberl: 0
      },
      currentPage: 1,
      pagesize: 10
    }
  },
  mounted () {
    // 初始化 秒商品券信息
    this.getStMarketingSeckillById()
    // 初始化 领取人历史表数据
    this.getGetHistoryDataBySeckillId()
    // 初始化  获取秒商品完成抢购时间
    this.getDurationTime()
    // 初始化  优惠券领取数量
    this.getSeckillCountById()
    // 初始化优惠券领取使用折线图
    this.getSeckillGetAndUse()
    // 初始化优惠券领取使用折线图
    this.getSeckillGetAndUse2()
  },
  methods: {
    // 初始化优惠券信息
    getStMarketingSeckillById () {
      let params = {
        seckillId: this.$route.query.seckillId
      }
      this.$api.getStMarketingSeckillById(params).then(res => {
        this.stMarketingSeckillInfo = res.data
        this.TableInfoData.PageAccessNumberl = res.data.visitsCount
      })
    },
    // 初始化优惠券临取历史表数据
    getGetHistoryDataBySeckillId () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        seckillId: this.$route.query.seckillId
      }
      this.$api.getGetHistoryDataBySeckillId(params).then(res => {
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
        })
        this.totalCount = res.count
      })
    },
    // 初始化 秒商品 完成抢购时长
    getDurationTime () {
      let params = {
        seckillId: this.$route.query.seckillId,
        startTime: this.$route.query.startTime,
        endTime: this.$route.query.endTime
      }
      this.$api.getDurationTime(params).then(res => {
        if (res.data === null) {
          this.TableInfoData.DurationTime = '活动进行中'
        } else {
          this.TableInfoData.DurationTime = res.data
        }
      })
    },
    // 初始化优惠券领取数量
    getSeckillCountById () {
      let _this = this
      let params = {
        seckillId: this.$route.query.seckillId
      }
      this.$api.getSeckillCountById(params).then(res => {
        this.TableInfoData.CouponCountByIdInfo = res.data
        this.TableInfoData.totalAmount = _this.$route.query.totalAmount
      })
    },
    // 初始化秒商品   折线图
    getSeckillGetAndUse () {
      let params = {
        seckillId: this.$route.query.seckillId,
        startTime: this.$route.query.getStartTime,
        endTime: this.$route.query.getEndTime,
        useModel: ''
      }
      this.$api.getSeckillGetAndUse(params).then(res => {
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
            categories: res.data[0]
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
            data: res.data[1]
          }, {
            name: '已领取',
            color: '#4caf50',
            type: 'areaspline',
            marker: {
              radius: 5,
              type: 'circle'
            },
            //  data: res.data[2]
            data: []
          }]
        }
        HighCharts.chart(this.splineData1.id, this.splineData1.data)
      })
    },
    // 初始化秒商品   折线图
    getSeckillGetAndUse2 () {
      let params = {
        seckillId: this.$route.query.seckillId,
        startTime: this.$route.query.useStartTime,
        endTime: this.$route.query.useEndTime,
        useModel: 'has_used'
      }
      this.$api.getSeckillGetAndUse(params).then(res => {
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
            categories: res.data[0]
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
            data: res.data[1]
          }, {
            name: '已使用',
            color: '#4caf50',
            type: 'areaspline',
            marker: {
              radius: 5,
              type: 'circle'
            },
            //  data: res.data[2]
            data: []
          }]
        }
        HighCharts.chart(this.splineData2.id, this.splineData2.data)
      })
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getGetHistoryDataBySeckillId()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getGetHistoryDataBySeckillId()
    }
  },
  components: {breadCrumb, topTips, basicConfig, robNumber, highChart, HighCharts}
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
