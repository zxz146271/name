<template>
  <div id="memAnalysis" class="highchart">
  </div>
</template>
<script>
import HighCharts from 'HighCharts'
export default {
  data () {
    return {
      // 已购客户分析
      memAnalysisData: {
        id: 'memAnalysis',
        data: {
          chart: {
            type: 'areaspline'
          },
          title: {
            text: '分析趋势图',
            align: 'left',
            style: {
              color: '#27292E',
              fontSize: '14px',
              fontWeight: '600'
            }
          },
          xAxis: {
            categories: ['10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8', '10.9']
          },
          yAxis: {
            min: 0,
            title: {
              text: null
            }
          },
          // legend: {
          //   enabled: false
          // },
          plotOptions: {
            series: {
              fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                  [0, 'rgba(255,255,255,0)'],
                  [1, 'rgba(255,255,255,0)']
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
            color: '#7180F1',
            name: '已购客户总数',
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5]
          }
          ]
        }
      }
    }
  },
  mounted () {
    this.initChange()
  },
  methods: {
    initChange () {
      var _this = this
      let params = {}
      // 默认查询最近一周已购客户总数
      params.index = 'memTotal'
      params.startDate = this.formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7))
      params.endDate = this.formatDate(new Date())
      params.isAllStore = this.$route.path
      _this.$api.getMemNumByTimeAndIndex(params).then(res => {
        _this.memAnalysisData.data.xAxis.categories = res.xList
        _this.memAnalysisData.data.series[0].name = '已购客户总数'
        _this.memAnalysisData.data.series[0].data = res.yList
        HighCharts.chart('memAnalysis', this.memAnalysisData.data)
      })
    },
    getData (value) {
      var _this = this
      let params = {}
      params.index = value.analysisIndex
      params.startDate = value.startDate
      params.endDate = value.endDate
      params.isAllStore = this.$route.path
      if (value.analysisIndex === 'memTodayAddNum') {
        _this.memAnalysisData.data.series[0].name = '已购客户增长数'
      } else if (value.analysisIndex === 'memTotal') {
        _this.memAnalysisData.data.series[0].name = '已购客户总数'
      } else if (value.analysisIndex === 'memActiveNum') {
        _this.memAnalysisData.data.series[0].name = '活跃已购客户数'
      } else if (value.analysisIndex === 'memNumBuyGoods') {
        _this.memAnalysisData.data.series[0].name = '购买商品已购客户数'
      } else if (value.analysisIndex === 'memGrowthRate') {
        _this.memAnalysisData.data.series[0].name = '已购客户增长率（%）'
      }
      this.$api.getMemNumByTimeAndIndex(params).then(res => {
        _this.memAnalysisData.data.xAxis.categories = res.xList
        _this.memAnalysisData.data.series[0].data = res.yList
        HighCharts.chart('memAnalysis', this.memAnalysisData.data)
      })
    },
    // 格式化时间Date===》yyyy-MM-dd HH:mm:ss
    formatDate (date) {
      var seperator1 = '-'
      var seperator2 = ':'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      var hour = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + hour + seperator2 + minutes + seperator2 + seconds
      return currentdate
    }
  }
}
</script>
<style lang="scss" scoped>
.highchart{
  flex: 1;
}
</style>
