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
            // data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 54.4, 54.4]
            data: [
              [Date.UTC(2018, 1, 7), 0.65],
              [Date.UTC(2018, 2, 7), 0.97],
              [Date.UTC(2018, 3, 7), 6.77]
            ]
          },
          {
            color: '#FD4343',
            name: '客单价'
            // data: [29.9, 71.5, 50.3, 129.2, 144.0, 156.0, 135.6, 36.5, 216.4, 14.1, 95.6, 54.4, 54.4, 54.4]
            // data: [
            // [Date.UTC(2018, 1, 7), 0.65],
            // [Date.UTC(2018, 1, 23), 0.77],
            // [Date.UTC(2018, 2, 8), 0.77],
            // [Date.UTC(2018, 2, 14), 0.79],
            // [Date.UTC(2018, 2, 24), 0.86],
            // [Date.UTC(2018, 3, 4), 0.8],
            // [Date.UTC(2018, 3, 18), 0.94],
            // [Date.UTC(2018, 3, 24), 0.9],
            // [Date.UTC(2018, 4, 16), 0.39],
            // [Date.UTC(2018, 9, 9), 0],
            // [Date.UTC(2018, 9, 14), 0.15],
            // [Date.UTC(2018, 10, 28), 0.35],
            // [Date.UTC(2018, 11, 12), 0.46],
            // [Date.UTC(2018, 11, 13), 0.59],
            // [Date.UTC(2018, 11, 19), 0.58],
            // [Date.UTC(2018, 11, 20), 0.62],
            // [Date.UTC(2018, 11, 21), 0]
            // ]
          }]
        }
      }
    }
  },
  // props: ['option'],
  // watch: {
  //   option () {
  //     HighCharts.chart(this.thisId, this.option)
  //   }
  // },
  // watch: {
  //   option () {
  //     HighCharts.chart('spid', this.splineData.data)
  //   }
  // },
  methods: {
    change () {
      this.$api.necessaryCount().then(res => {
        this.splineData.data.series[0].data.push([Date.UTC(2018, 4, 7), 1.65])
        this.splineData.data.series[0].data.push([Date.UTC(2018, 5, 7), 2.65])
        this.splineData.data.series[0].data.push([Date.UTC(2018, 6, 7), 3.65])
        this.splineData.data.series[0].data.push([Date.UTC(2018, 7, 7), 4.65])
        HighCharts.chart('spid', this.splineData.data)
      })
    },
    change1 () {
      this.$api.necessaryCount().then(res => {
        this.splineData.data.series[0].data.push([Date.UTC(2018, 8, 7), 1.65])
        this.splineData.data.series[0].data.push([Date.UTC(2018, 9, 7), 2.65])
        this.splineData.data.series[0].data.push([Date.UTC(2018, 10, 7), 3.65])
        this.splineData.data.series[0].data.push([Date.UTC(2018, 11, 7), 4.65])
        HighCharts.chart('spid', this.splineData.data)
      })
    }
  },
  // watch: {
  //   newValue (val, oldVal) {
  //     HighCharts.chart('spid', this.splineData.data)
  //   }
  // },
  // computed: {
  //   newValue () {
  //     return this.splineData.data.series[0].data
  //   }
  // },
  mounted () {
    this.change()
    // HighCharts.chart('spid', this.splineData.data)
  }
}
</script>
<style lang="scss" scoped>
.highchart{
  flex: 1;
}
</style>
