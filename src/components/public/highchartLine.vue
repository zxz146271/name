<template>
  <div class="hi-chart" :style="{background:item.option.background}">
    <p class="lg-title">{{item.num}}</p>
    <p class="xs-title">{{item.title}}</p>
    <div :id="item.id"></div>
  </div>
</template>
<script>
import HighCharts from 'HighCharts'
export default {
  // 验证类型
  data () {
    return {}
  },
  props: ['item'],
  mounted () {
    HighCharts.chart(this.item.id, {
      title: {
        text: null
      },
      chart: {
        height: '140',
        backgroundColor: this.item.option.background
      },
      subtitle: {
        text: null
      },
      legend: {
        enabled: false
      },
      yAxis: {
        min: 0,
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        gridLineWidth: 0,
        showFirstLabel: false
      },
      xAxis: {
        labels: {
          enabled: false
        },
        tickWidth: 0,
        lineWidth: 0,
        showFirstLabel: false
      },
      tooltip: {
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, 'rgba(255,255,255,0.8)'],
              [1, 'rgba(255,255,255,0)']
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      credits: {
        text: ''
      },
      series: [{
        type: 'area',
        name: 's',
        data: this.item.option.data,
        color: '#fff',
        marker: {
          radius: 5
        }
      }]
    })
  }
}
</script>
<style lang="scss">
.hi-chart{
  &:hover{
    opacity: 0.9;
    .lg-title{
      transform: scale(1.1);
      transition: 0.5s ease-in-out
    }
  }
  .lg-title{
    font-size: 50px;
  }
  .xs-title{
    font-size: 14px;
    margin-bottom: 25px;
  }
}
</style>
