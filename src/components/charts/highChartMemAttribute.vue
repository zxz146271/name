<template>
  <div>
    <div id="pieChartId" v-if ="chartType === 'pieChart'" class="highchart" >
    </div>
    <div id="columnChartId" v-if ="chartType === 'columnChart'" class="highchart" >
    </div>
  </div>
</template>
<script>
import HighCharts from 'HighCharts'
export default {
  data () {
    return {
      // 饼状图
      pieChartData: {
        id: 'pieChartId',
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
            text: '属性饼图',
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
            name: '数量',
            data: [
              ['五角场店', 21],
              ['微信店', 35],
              ['新街口店', 45],
              ['浦东店', 55],
              ['万达店', 89]
            ]
          }]
        }
      },
      // 柱状图
      columnChartData: {
        id: 'columnChartId',
        data: {
          chart: {
            type: 'column'
          },
          title: {
            text: '属性趋势图',
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
            name: '地区',
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5]
          }
          ]
        }
      }
    }
  },
  props: ['chartType'],
  mounted () {
    this.initChange()
  },
  methods: {
    initChange () {
      var _this = this
      let params = {}
      params.isAllStore = this.$route.path
      params.index = 'region'
      _this.$api.getMemNumByAttribute(params).then(res => {
        _this.columnChartData.data.series[0].name = '地区数量'
        _this.pieChartData.data.series[0].data = res.dataList
        _this.columnChartData.data.xAxis.categories = res.xList
        _this.columnChartData.data.series[0].data = res.yList
        HighCharts.chart('columnChartId', this.columnChartData.data)
      })
    },
    getData (value) {
      var _this = this
      let params = {}
      params.index = value.attributeIndex
      params.isAllStore = this.$route.path
      if (value.attributeIndex === 'region') {
        _this.columnChartData.data.series[0].name = '地区数量'
      } else if (value.attributeIndex === 'lable') {
        _this.columnChartData.data.series[0].name = '标签'
      } else if (value.attributeIndex === 'client') {
        _this.columnChartData.data.series[0].name = '终端'
      }
      this.$api.getMemNumByAttribute(params).then(res => {
        _this.pieChartData.data.series[0].data = res.dataList
        _this.columnChartData.data.xAxis.categories = res.xList
        _this.columnChartData.data.series[0].data = res.yList
        if (this.chartType === 'pieChart') {
          HighCharts.chart('pieChartId', this.pieChartData.data)
        } else {
          HighCharts.chart('columnChartId', this.columnChartData.data)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.highchart{
  flex: 1;
}
</style>
