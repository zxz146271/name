<template>
  <div class="main-cont">
    <!-- <div class="champion">
      <i></i>
      <span class="money">￥143,000</span>
      <span class="shop">微信旗舰店</span>
      <p>今日销售冠军</p>
    </div> -->
    <div>
      <!-- <percent-view class="list-item"></percent-view> -->
      <home-chart1 class="for-list"></home-chart1>
      <!-- <highchart-line :item="item" v-for="(item,index) in dataList" :key="index" class="list-item"></highchart-line> -->
    </div>
    <div class="data-chart">
        <top-data :title="necessary" @necessaryCount= 'necessaryCount'></top-data>
        <high-chart-spid ref="necessaryChild2" ></high-chart-spid>
    </div>
    <!-- <div class="data-chart">
      <top-data :title="shapetitle"></top-data>
      <high-chart :option="shapeData" ></high-chart>
    </div> -->
    <div class="data-chart">
      <goods-top-data :title="tabletitle" @goodsTopData= 'goodsTopData' ></goods-top-data>
      <div class="balck-th">
         <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            label="商品名称"
            prop="goodsName"
            align="center">
          </el-table-column>
          <el-table-column
            prop="visitCount"
            label="访问量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="visiterNum"
            align="center"
            label="访问人数">
          </el-table-column>
          <el-table-column
            prop="shareCount"
            label="分享次数"
            align="center">
            </el-table-column>
            <el-table-column
            prop="saleNum"
            label="销售量"
            align="center">
            </el-table-column>
          <!-- <el-table-column
            prop="saleTotal"
            label="销售金额"
            width="160"
            align="center">
          </el-table-column> -->
          <!-- <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="see"
                  class="edit">查看</el-button>
                </template>
          </el-table-column> -->
        </el-table>
        <div class="pagin">
          <span class="total">共{{totalCount}}条数据</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
          :total=totalCount>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goodsTopData from '../../../components/data/goodsTopData'
import highchartLine from '../../../components/public/highchartLine'
import highChart from '../../../components/public/highChart'
import percentView from '../../../components/public/percentView'
import topData from '../../../components/data/topData'
import highChartSpid from '../../../components/charts/highChartSpid'
import homeChart1 from '../../../components/charts/homeChart1'
export default {
  data () {
    return {
      necessary: {
        title: '交易趋势',
        indicators: 'necessary',
        date: 'date'
      },
      shapetitle: {
        title: '微店流量',
        indicators: 'indicators',
        date: 'date'
      },
      tabletitle: {
        title: '商品销售',
        indicators: 'indicators',
        date: 'date',
        type: 'download'
      },
      tableData: [],
      multipleSelection: [],
      dateTime: null,
      totalCount: 0, // 默认数据总数
      currentPage: 1,
      pagesize: 10,
      splineData: {
        id: 'spid',
        data: {
          chart: {
            type: 'areaspline'
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
          xAxis: {
            categories: ['10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8', '10.9', '10.10', '10.11', '10.12', '10.13', '10.14']
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
            color: '#FFE540',
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 54.4]
          },
          {
            color: '#FD4343',
            data: [29.9, 71.5, 50.3, 129.2, 144.0, 156.0, 135.6, 36.5, 216.4, 14.1, 95.6, 54.4, 54.4]
          }]
        }
      },
      shapeData: {
        id: 'shape',
        data: {
          chart: {
            type: 'column'
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
          xAxis: {
            categories: ['10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8']
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
            color: '#FF8B8B',
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
          },
          {
            color: '#92DBD7',
            data: [29.9, 71.5, 50.3, 129.2, 144.0, 156.0, 135.6]
          },
          {
            color: '#B3B5BA',
            data: [29.9, 91.5, 50.3, 69.2, 144.0, 136.0, 105.6]
          }]
        }
      },
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
          title: '近7天单价',
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
      ]}
  },
  computed: {
  },
  mounted () {
    this.getGoodsIndex(this.dateTime)
  },
  methods: {
    // 交易趋势
    necessaryCount (value) {
      // 触发子组件方法
      this.$refs.necessaryChild2.change(value)
    },
    goodsTopData (value) {
      this.dateTime = value
      this.getGoodsIndex(this.dateTime)
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getGoodsIndex(this.dateTime)
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getGoodsIndex(this.dateTime)
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    // 获取商品信息指标
    getGoodsIndex (dateTime) {
      if (dateTime != null) {
        let params = {
          startDate: dateTime[0],
          endDate: dateTime[1],
          page: this.currentPage,
          limit: this.pagesize,
          isAllStore: this.$route.path
        // jsonData: JSON.stringify(this.form.region)
        }
        this.$api.getGoodsIndexAnalysis(params).then(res => {
          this.tableData = res.data
          this.totalCount = res.count
        })
      } else {
        let params = {
          startDate: '',
          endDate: '',
          page: this.currentPage,
          limit: this.pagesize,
          isAllStore: this.$route.path
        // jsonData: JSON.stringify(this.from.region)
        }
        this.$api.getGoodsIndexAnalysis(params).then(res => {
          this.tableData = res.data
          this.totalCount = res.count
        })
      }
    }
  },
  components: {highchartLine, percentView, highChart, goodsTopData, topData, highChartSpid, homeChart1}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.champion{
  width: 386px;
  height: 275px;
  margin: 15px auto 0 auto;
  background-image: url("../../../assets/image/bg@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  text-align: center;
  overflow: hidden;
  >i{
    display: block;
    width: 56px;
    height: 60px;
    margin: 70px auto 0 auto;
    background-image: url("../../../assets/image/trophy@2x.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  >span{
    display: block;
  }
  .money{
    font-size: $md-size;
    color: $text-red-color;
    margin: 10px 0 5px 0;
  }
  .shop{
    font-size: $detail-price-big-size;
    color: $text-main-color;
    font-weight: 700;
  }
  >p{
    background: $main-color;
    color:#fff;
    font-size: $md-size;
    display: inline-block;
    border-radius: 4px;
    padding: 2px 10px;
    margin-top: 10px;
  }
}
.chart-list{
  display: flex;
  .list-item{
    width: 25%;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    padding-bottom: 4px;
    padding-top: 46px;
    height: 300px;
    margin-left:10px;
    &:first-child{
      margin-left: 0;
    }
  }
}
.data-chart{
  margin-top: 40px;
}
.balck-th{
  // padding-bottom:50px;
  .edit{
    border: 0;
    background: none;
    color: $text-red-color;
  }
}
</style>
