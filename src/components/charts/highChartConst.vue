<template>
  <div class="constitute">
      <div id="constitute" class="highchart" >
      </div>
      <div class="balck-th">
        <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="排名"
          prop="ranking"
          align="center">
        </el-table-column>
        <el-table-column
          prop="store"
          label="门店"
          align="center">
        </el-table-column>
        <el-table-column
          prop="money"
          align="center"
          label="销售额">
        </el-table-column>
        <el-table-column
          prop="perTicketSales"
          align="center"
          label="客单价">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import HighCharts from 'HighCharts'
export default {
  data () {
    return {
      // 交易构成
      constituteData: {
        id: 'constitute',
        data: {
          chart: {
            type: 'areaspline'
          },
          colors: [
            '#FD4343',
            '#FFCA00',
            '#86DEB3',
            '#737685',
            'rgb(0, 192, 255)'
          ],
          title: {
            text: '趋势图',
            align: 'left',
            style: {
              color: '#27292E',
              fontSize: '14px',
              fontWeight: '600'
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            pie: {
              cursor: 'pointer',
              dataLabels: {
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  // color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
              }
              // point: {
              //   events: {
              //     mouseOver: function (e) {
              //       chart.setTitle({
              //         text: e.target.name+ '\t'+ e.target.y + ' %'
              //       })
              //     }
              //   }
              // }
            }
          },
          credits: {
            text: ''
          },
          series: [{
            innerSize: '60%',
            type: 'pie',
            data: [
              ['五角场店', 26.8],
              ['微信店', 26.8],
              ['新街口店', 26.8],
              ['浦东店', 26.8],
              ['万达店', 26.8]
            ]
          }]
        }
      },
      tableData: [
        {
          ranking: '1',
          store: '微信旗舰店',
          money: '500',
          perTicketSales: 0
        }
      ]
    }
  },
  methods: {
    change (value) {
      let params = {}
      let temp = 'tradeCount'
      if (value) {
        params = {
          startDate: value.startDate,
          endDate: value.endDate,
          countType: value.constituteIndex
        }
        temp = value.constituteIndex
      } else {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        params = {
          startDate: this.formatDate(start),
          endDate: this.formatDate(end),
          countType: temp,
          isAllStore: this.$route.path
        }
      }
      this.$api.constituteCount(params).then(res => {
        this.constituteData.data.series[0].data = []
        this.tableData = []
        res.data.forEach((item, index) => {
          let tempData = {
            ranking: index + 1,
            store: item.tradeDate,
            money: item.tradeCount,
            perTicketSales: item.perTicketSales
          }
          this.tableData.push(tempData)
          if (temp === 'tradeCount') {
            this.constituteData.data.series[0].data.push([item.tradeDate, item.tradeCount])
          } else {
            this.constituteData.data.series[0].data.push([item.tradeDate, item.perTicketSales])
          }
        })
        HighCharts.chart('constitute', this.constituteData.data)
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
.constitute{
  display: flex;
  justify-content: flex-start;
  #constitute{
    width: 175px!important;
    height: 400px;
  }
  .balck-th{
    width: 349px;
  }
}
.highchart{
  flex: 1;
}
</style>
