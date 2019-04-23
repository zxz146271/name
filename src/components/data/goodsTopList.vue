<template>
  <div class="data-list">
    <div class="list-item commodity-item" v-if="$route.path.indexOf('analysisGoods') != -1">
      <ul>
        <li class="data-num">
          <p class="top-num">{{this.stGoodsAnalysis.upCount}}</p>
          <p class="title"><i></i>在架商品数</p>
        </li>
        <li class="data-num">
          <p class="top-num">{{this.stGoodsAnalysis.downCount}}</p>
          <p class="title"><i></i>已下架商品数</p>
        </li>
        <li>
          <p class="info">
            <span>被访问商品数</span>
            <span>+{{this.stGoodsAnalysis.goodsVisitedCount}}</span>
          </p>
          <p class="info">
            <span>商品访问人数</span>
            <span>+{{this.stGoodsAnalysis.timeVisitorCount}}</span>
          </p>
          <p class="info">
            <span>商品访问量</span>
            <span>+{{this.stGoodsAnalysis.goodsVisitNum}}</span>
          </p>
        </li>
        <li class="data-num commodity" >
          <p class="title">付款商品数</p>
          <p class="top-num"><i></i>{{this.stGoodsAnalysis.paidGoodsCount}}</p>
        </li>
        <li class="heightchartline">
          <div id="line"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import HighCharts from 'HighCharts'
export default {
  data () {
    return {
      stGoodsAnalysis: {
        upCount: '0',
        downCount: '0',
        goodsVisitedCount: '0',
        timeVisitorCount: '0',
        goodsVisitNum: '0',
        paidGoodsCount: '0'
      },
      chartData: [21, 0, 0, 0, 0, 0, 0]
    }
  },
  methods: {
    // 获取商品分析数据
    getGoodsAnalysis () {
      var context = this
      let pramas = {
        isAllStore: this.$route.path
      }
      this.$api.getGoodsAnalysis(pramas).then(res => {
        context.stGoodsAnalysis = res.data
      })
    },
    // 获取折线图数据
    getGoodsChart () {
      let pramas = {
        isAllStore: this.$route.path
      }
      this.$api.goodsAnalysisChart(pramas).then(res => {
        this.chartData = res.data
        HighCharts.chart('line', {
          title: {
            text: null
          },
          chart: {
            height: '140',
            backgroundColor: '#fff'
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
                // linearGradient: {
                //   x1: 0,
                //   y1: 0,
                //   x2: 0,
                //   y2: 1
                // },
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
            },
            series: {
              pointStart: 1
            }
          },
          credits: {
            text: ''
          },
          series: [{
            type: 'area',
            name: '付款商品数',
            pointStart: new Date().setTime(new Date().getTime() - 86400000 * 6 + 3600000 * 8),
            pointInterval: 24 * 3600 * 1000,
            data: this.chartData,
            color: '#FD4343',
            marker: {
              radius: 5
            }
          }]
        })
      })
    }
  },
  mounted () {
    this.getGoodsChart()
    this.getGoodsAnalysis()
    // HighCharts.chart('line', {
    //   title: {
    //     text: null
    //   },
    //   chart: {
    //     height: '140',
    //     backgroundColor: '#fff'
    //   },
    //   subtitle: {
    //     text: null
    //   },
    //   legend: {
    //     enabled: false
    //   },
    //   yAxis: {
    //     min: 0,
    //     labels: {
    //       enabled: false
    //     },
    //     title: {
    //       text: null
    //     },
    //     gridLineWidth: 0,
    //     showFirstLabel: false
    //   },
    //   xAxis: {
    //     labels: {
    //       enabled: false
    //     },
    //     tickWidth: 0,
    //     lineWidth: 0,
    //     showFirstLabel: false
    //   },
    //   tooltip: {
    //   },
    //   plotOptions: {
    //     area: {
    //       fillColor: {
    //         // linearGradient: {
    //         //   x1: 0,
    //         //   y1: 0,
    //         //   x2: 0,
    //         //   y2: 1
    //         // },
    //         stops: [
    //           [0, 'rgba(255,255,255,0.8)'],
    //           [1, 'rgba(255,255,255,0)']
    //         ]
    //       },
    //       marker: {
    //         radius: 2
    //       },
    //       lineWidth: 1,
    //       states: {
    //         hover: {
    //           lineWidth: 1
    //         }
    //       },
    //       threshold: null
    //     }
    //   },
    //   credits: {
    //     text: ''
    //   },
    //   series: [{
    //     type: 'area',
    //     name: 's',
    //     data: this.chartData,
    //     color: '#FD4343',
    //     marker: {
    //       radius: 5
    //     }
    //   }]
    // })
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.data-list{
  .list-item{
    ul{
      display: flex;
      >li{
        flex: 1;
        padding: 20px 14px;
        border-right: 1px solid $border-color;
        &:last-child{
          border-right: 0;
        }
        font-size: $xs-size;
        &.data-num{
          text-align: center;
          .top-num{
            font-size: 26px;
            color:$main-color;
            margin-bottom: 10px;
          }
        }
        &.commodity{
          width: 100px;
          text-align:left;
          border:none;
          .title{
            margin-bottom: 10px;
          }
        }
        &.heightchartline{
          flex: 2;
          padding: 0;
          #line{
            width: 240px;
            height: 130px;
            margin: 0 auto;
          }
        }
        .info{
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid $border-color;
          padding: 6px 0;
          span{
            &:nth-child(2){
              color:$blue-color
            }
          }
        }
        .store-name{
          color:$main-color;
          font-size: 28px;
          margin-top: 16px;
        }
        .comm-label{
          margin-top: 6px;
          .label{
            display: inline-block;
            border-radius: 4px;
            padding: 1px 6px;
            margin-right: 4px;
            margin-bottom: 4px;
            &:hover{
              .el-icon-delete{
                display: inline-block;
              }
            }
            &:nth-child(n+1){
              color:#EB5C00;
              border:1px solid #EB5C00;
            }
            &:nth-child(n+2){
              color:#44AF7B;
              border:1px solid #44AF7B;
            }
            &:nth-child(n+3){
              color:#7180F1;
              border:1px solid #7180F1;
            }
          }
        }
      }
    }
  }
  .single-product{
    ul{
      li{
        border:none;
        .title{
          font-size: 26px;
          margin-bottom: 24px;
        }
        .info{
          width: 180px;
          span{
            &+span{
              color: $text-red-color!important;
            }
          }
        }
      }
      .information{
        flex: 2;
      }
      .data-num{
        img{
          width: 180px;
          height: 180px;
        }
      }
    }
  }
  // .commodity-item{
  //   li{
  //     &:nth-child(4){
  //       width: 100px;
  //     }
  //   }
  // }
}
</style>
