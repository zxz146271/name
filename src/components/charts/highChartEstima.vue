<template>
  <div id="estimate" class="highchart" >
  </div>
</template>
<script>
import HighCharts from 'HighCharts'
export default {
  data () {
    return {
      // 预计发货量
      estimateData: {
        id: 'estimate',
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
            // categories: ['10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8', '10.9']
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
            color: '#7180F1',
            name: '预计发货订单数',
            data: []
          },
          {
            color: '#FF8B8B',
            name: '预计发货商品数',
            data: []
          }]
        }
      }
    }
  },
  methods: {
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
      this.$api.getCompleteOrders(params).then(res => {
        this.estimateData.data.series[0].data = []
        this.estimateData.data.series[1].data = []
        res.data.forEach((item, index) => {
          this.estimateData.data.series[0].data.push([new Date(item.tradeDate).getTime(), item.completeOrders])
          this.estimateData.data.series[1].data.push([new Date(item.tradeDate).getTime(), item.completeGoods])
        })
        HighCharts.chart('estimate', this.estimateData.data)
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
    this.change()
  }
}
</script>
<style lang="scss" scoped>
.highchart{
  flex: 1;
}
</style>
