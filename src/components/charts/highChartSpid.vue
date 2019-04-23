<template>
  <div id="spid" class="highchart" >
  </div>
</template>
<script>
import HighCharts from 'HighCharts'
export default {
  data () {
    return {
      splineData: {
        id: 'spid',
        data: {
          chart: {
            type: 'spline'
          },
          title: {
            text: '趋势图',
            align: 'left',
            style: {
              color: '#27292E',
              fontSize: '14px',
              fontWeight: '600'
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}:{point.y}</b><br>',
            pointFormat: '{point.x:%Y-%m-%d}'
          },
          xAxis: {
            type: 'datetime',
            labels: {
              format: '{value: %Y-%m-%d}'
            }
            // categories: ['10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8', '10.9', '10.10', '10.11', '10.12', '10.13', '10.14']
          },
          yAxis: {
            min: 0,
            title: {
              text: null
            }
          },
          plotOptions: {
            spline: {
              marker: {
                enabled: true
              }
            }
          },
          credits: {
            text: ''
          },
          series: [{
            color: '#FFE540',
            name: '销售额',
            data: []
          },
          {
            color: '#FD4343',
            name: '客单价',
            data: []
          }]
        }
      },
      homeSplineData: {
        id: 'spid',
        data: {
          chart: {
            type: 'spline'
          },
          title: {
            text: '趋势图',
            align: 'left',
            style: {
              color: '#27292E',
              fontSize: '14px',
              fontWeight: '600'
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}:{point.y}</b><br>',
            pointFormat: '{point.x:%Y-%m-%d}'
          },
          xAxis: {
            type: 'datetime',
            labels: {
              format: '{value: %Y-%m-%d}'
            }
            // categories: ['10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8', '10.9', '10.10', '10.11', '10.12', '10.13', '10.14']
          },
          yAxis: {
            min: 0,
            title: {
              text: null
            }
          },
          plotOptions: {
            spline: {
              marker: {
                enabled: true
              }
            }
          },
          credits: {
            text: ''
          },
          series: [{
            color: '#FFE540',
            name: '销售额',
            data: []
          }, {
            color: '#FD4343',
            name: '客单价',
            data: []
          }]
        }
      }
    }
  },
  methods: {
    // 交易趋势
    change (value) {
      let params = {}
      if (value) {
        params = {
          startDate: value.startDate,
          endDate: value.endDate,
          isAllStore: this.$route.path
        }
      } else {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        params = {
          startDate: this.formatDate(start),
          endDate: this.formatDate(end),
          isAllStore: this.$route.path
        }
      }
      this.$api.necessaryCount(params).then(res => {
        this.splineData.data.series[0].data = []
        this.splineData.data.series[1].data = []
        res.data.forEach((item, index) => {
          this.splineData.data.series[0].data.push([new Date(item.tradeDate).getTime(), item.tradeCount])
          this.splineData.data.series[1].data.push([new Date(item.tradeDate).getTime(), item.perTicketSales])
        })
        HighCharts.chart('spid', this.splineData.data)
      })
    },
    // 首页交易趋势
    homeChange (value) {
      let params = {}
      if (value) {
        params = {
          startDate: value.startDate,
          endDate: value.endDate,
          isAllStore: this.$route.path
        }
      } else {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        params = {
          startDate: this.formatDate(start),
          endDate: this.formatDate(end),
          isAllStore: this.$route.path
        }
      }
      this.$api.necessaryCount(params).then(res => {
        this.homeSplineData.data.series[0].data = []
        this.homeSplineData.data.series[1].data = []
        res.data.forEach((item, index) => {
          this.homeSplineData.data.series[0].data.push([new Date(item.tradeDate).getTime(), item.tradeCount])
          this.homeSplineData.data.series[1].data.push([new Date(item.tradeDate).getTime(), item.perTicketSales])
        })
        HighCharts.chart('spid', this.homeSplineData.data)
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
  },
  mounted () {
    if (this.$route.path === '/') {
      this.homeChange()
    } else {
      this.change()
    }
  }
}
</script>
<style lang="scss" scoped>
.highchart{
  flex: 1;
}
</style>
