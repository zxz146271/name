<template>
  <div class="chart-list">
    <div class="percent-view list-item">
      <p class="lg-title">{{trandVo.money}}</p>
      <p class="xs-title">近7天交易</p>
      <div class="percent-bottom">
        <div class="item">
          <p class="week">{{trandVo.week}}%</p>
          <p class="day">周同比</p>
        </div>
        <div class="item">
          <p class="week">{{trandVo.day}}%</p>
          <p class="day">日同比</p>
        </div>
      </div>
    </div>
    <div class="hi-chart" :style="{background:item.option.background}" v-for="(item, index) in dataList" :key="index">
      <p class="lg-title">{{item.num}}</p>
      <p class="xs-title">{{item.title}}</p>
      <div :id="item.id"></div>
  </div>
  </div>
</template>
<script>
import HighCharts from 'HighCharts'
export default {
  // 验证类型
  data () {
    return {
      // 近7天交易
      trandVo: {
        money: 0,
        week: 0,
        day: 0
      },
      // 近7天付款客户
      completeOrders: 0,
      // 近7天客单价
      perTicketSales: 0,
      // 近7天销售额
      tradeCount: 0,
      // 近7天订单数
      tradeOrders: 0,
      // 近7天购买件数
      completeGoods: 0,
      dataList: [
        {
          title: '近7天付款客户',
          num: '160',
          option: {
            data: [2, 6, 8, 26, 9, 12, 8],
            background: '#7C96A6'
          },
          id: 'chart1'
        },
        {
          title: '近7天客单价',
          num: '￥750.00',
          option: {
            data: [2, 6, 26, 3, 9, 12, 4],
            background: '#51C5DA'
          },
          id: 'chart2'
        },
        {
          title: '近7天购买件数',
          num: '34',
          option: {
            data: [2, 6, 31, 3, 9, 12, 0],
            background: '#7EBEAE'
          },
          id: 'chart3'
        }
      ]
    }
  },
  // props: ['item'],
  methods: {
    getHomeCountsProportion () {
      let params = {
        isAllStore: this.$route.path
      }
      this.$api.getHomeCountsProportion(params).then(res => {
        this.trandVo.week = 0
        this.trandVo.day = 0
        // 周同比
        if (res.data.perTicketSales > 0) {
          this.trandVo.week = (res.data.perTicketSales).toFixed(2)
        } else {
          this.trandVo.week = res.data.perTicketSales
        }
        // 日同比
        if (res.data.tradeCount > 0) {
          this.trandVo.day = (res.data.tradeCount).toFixed(2)
        } else {
          this.trandVo.day = res.data.tradeCount
        }
      })
    },
    // 获取首页统计
    getHomeCounts () {
      let params = {
        isAllStore: this.$route.path
      }
      this.$api.getHomeCounts(params).then(res => {
        this.dataList[0].option.data = []
        this.dataList[1].option.data = []
        this.dataList[2].option.data = []
        this.trandVo.money = 0
        res.data.forEach((item, index) => {
          // 近7天交易额
          this.trandVo.money += item.tradingMoney
          // 近7天付款客户
          this.completeOrders += item.completeOrders
          // 近7天销售额
          this.tradeCount += item.tradeCount
          // 近7天订单数
          this.tradeOrders += item.tradeOrders
          // 近7天购买件数
          this.completeGoods += item.completeGoods
          this.dataList[0].option.data.push(item.completeOrders)
          this.dataList[1].option.data.push(item.perTicketSales)
          this.dataList[2].option.data.push(item.completeGoods)
        })
        if (this.tradeCount > 0) {
          this.perTicketSales = (this.tradeCount / this.tradeOrders).toFixed(2)
          if (this.perTicketSales >= 10000 && this.perTicketSales < 10000 * 10000) {
            this.perTicketSales = (this.perTicketSales / 10000).toFixed(2) + '万'
          } else if (this.perTicketSales >= 0 && this.perTicketSales < 10000) {
            this.perTicketSales = this.perTicketSales + '元'
          } else if (this.perTicketSales >= 10000 * 10000) {
            this.perTicketSales = (this.perTicketSales / (10000 * 10000)).toFixed(2) + '亿'
          }
        }
        if (this.trandVo.money > 0) {
          this.trandVo.money = this.trandVo.money.toFixed(2)
          if (this.trandVo.money >= 10000 && this.trandVo.money < 10000 * 10000) {
            this.trandVo.money = (this.trandVo.money / 10000).toFixed(2) + '万'
          } else if (this.trandVo.money >= 0 && this.trandVo.money < 10000) {
            this.trandVo.money = this.trandVo.money + '元'
          } else if (this.trandVo.money >= 10000 * 10000) {
            this.trandVo.money = (this.trandVo.money / (10000 * 10000)).toFixed(2) + '亿'
          }
        }
        this.dataList[0].num = this.completeOrders
        this.dataList[1].num = this.perTicketSales
        this.dataList[2].num = this.completeGoods
        this.makeChart1()
        this.makeChart2()
        this.makeChart3()
      })
    },
    makeChart1 () {
      HighCharts.chart(this.dataList[0].id, {
        title: {
          text: null
        },
        chart: {
          height: '140',
          backgroundColor: this.dataList[0].option.background
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
          showFirstLabel: false,
          type: 'datetime'
        },
        tooltip: {
          xDateFormat: '%Y-%m-%d',
          shared: true
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
          name: '数量',
          pointStart: new Date().setTime(new Date().getTime() - 86400000 * 6 + 3600000 * 8),
          pointInterval: 24 * 3600 * 1000,
          data: this.dataList[0].option.data,
          color: '#fff',
          marker: {
            radius: 5
          }
        }]
      })
    },
    makeChart2 () {
      HighCharts.chart(this.dataList[1].id, {
        title: {
          text: null
        },
        chart: {
          height: '140',
          backgroundColor: this.dataList[1].option.background
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
          showFirstLabel: false,
          type: 'datetime'
        },
        tooltip: {
          xDateFormat: '%Y-%m-%d',
          pointFormat: '{point.y:.2f} 元',
          shared: true
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
          name: '客单价',
          pointStart: new Date().setTime(new Date().getTime() - 86400000 * 6 + 3600000 * 8),
          pointInterval: 24 * 3600 * 1000,
          data: this.dataList[1].option.data,
          color: '#fff',
          marker: {
            radius: 5
          }
        }]
      })
    },
    makeChart3 () {
      HighCharts.chart(this.dataList[2].id, {
        title: {
          text: null
        },
        chart: {
          height: '140',
          backgroundColor: this.dataList[2].option.background
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
          showFirstLabel: false,
          type: 'datetime'
        },
        tooltip: {
          xDateFormat: '%Y-%m-%d',
          shared: true
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
          name: '购买件数',
          pointStart: new Date().setTime(new Date().getTime() - 86400000 * 6 + 3600000 * 8),
          pointInterval: 24 * 3600 * 1000,
          data: this.dataList[2].option.data,
          color: '#fff',
          marker: {
            radius: 5
          }
        }]
      })
    },
    // 格式化时间Date===》yyyy-MM-dd HH:mm:ss
    formatDate (date) {
      /* eslint-disable */
      var y = date.getFullYear();  
      var m = date.getMonth() + 1;  
      m = m < 10 ? '0' + m : m;  
      var d = date.getDate();  
      d = d < 10 ? ('0' + d) : d;  
      return y + '-' + m + '-' + d;  
    }
  },
  mounted () {
    this.getHomeCounts()
    this.getHomeCountsProportion()
  }
}
</script>
<style lang="scss">
.chart-list {
  display: flex;
  .list-item{
    width: 25%;
  }
  .percent-view{
    height: 300px;
    background-color:#FF7169;
    color: #fff;
    text-align: center;
    padding-top: 46px;
    &:hover{
      opacity: 0.9;
      .lg-title{
        transform: scale(1.1);
        transition: 0.5s ease-in-out
      }
    }
    .lg-title{
      font-size: 45px;
    }
    .xs-title{
      font-size: 14px;
      margin-bottom: 25px;
    }
    .percent-bottom{
      display: flex;
      height: 100px;
      margin-top: 69px;
      align-items: center;
      border-top: 1px solid rgba(255,255,255,0.3);
      position: relative;
      &::after{
        content: '';
        width: 1px;
        background: rgba(255,255,255,0.3);
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
      }
      .item{
        flex: 1;
        position: relative;
        .week{
          font-size: 16px;
          margin-bottom: 12px;
        }
        .day{
          font-size: 16px;
        }
      }
    }
  }
}
.hi-chart{
  width: 25%;
  padding-top: 46px;
  &:hover{
    opacity: 0.9;
    .lg-title{
      transform: scale(1.1);
      transition: 0.5s ease-in-out
    }
  }
  p{
    color: #fff;
    text-align: center;
  }
  .lg-title{
    font-size: 45px;
  }
  .xs-title{
    font-size: 14px;
    margin-bottom: 25px;
  }
}
</style>
