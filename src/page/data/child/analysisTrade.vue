<template>
<div class="analysis">
  <div class="data-chart">
      <top-data :title="necessary" @necessaryCount= 'necessaryCount'></top-data>
      <high-chart-spid ref="necessaryChild" ></high-chart-spid>
  </div>
  <div class="data-chart" v-show="dealType">
    <top-data :title="constitute" @constituteCount= 'constituteCount'></top-data>
    <high-chart-const ref="constituteCountChild"></high-chart-const>
  </div>
  <div class="data-chart">
    <top-data :title="detailed" @detailedCount = 'detailedCount'></top-data>
    <div class="balck-th">
        <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="订单日期"
          prop="createTime"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="订单号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="totalMoney"
          align="center"
          label="销售额">
        </el-table-column>
        <!-- <el-table-column
          prop="accountPaid"
          label="客单价"
          align="center">
        </el-table-column> -->
        <el-table-column
          prop="orderType"
          label="客户来源"
          align="center">
        </el-table-column>
        <el-table-column
          prop="storeName"
          label="门店"
          width="100"
          align="center">
        </el-table-column>
      </el-table>
    </div>
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
  <div class="data-chart">
    <top-data :title="statistics" @statisticsCount = 'statisticsCount'></top-data>
    <high-chart-stat ref="statisticsChild"></high-chart-stat>
  </div>
  <div class="data-chart">
      <top-data :title="estimate" @estimateCount = 'estimateCount'></top-data>
      <high-chart-estima ref="estimateChild"></high-chart-estima>
  </div>
</div>
</template>

<script>
import topList from '../../../components/data/topList'
import highchartLine from '../../../components/public/highchartLine'
import highChartSpid from '../../../components/charts/highChartSpid'
import highChartConst from '../../../components/charts/highChartConst'
import highChartStat from '../../../components/charts/highChartStat'
import highChartEstima from '../../../components/charts/highChartEstima'
import highChart from '../../../components/public/highChart'
import percentView from '../../../components/public/percentView'
import topData from '../../../components/data/topData'

export default {
  data () {
    return {
      totalCount: 0, // 默认数据总数
      dealType: true, // 默认交易构成存在
      currentPage: 1,
      pagesize: 10,
      necessary: {
        title: '交易趋势',
        date: 'date',
        indicators: 'necessary'
      },
      detailed: {
        title: '交易明细',
        date: 'date',
        indicators: 'detailed',
        type: 'download'
      },
      constitute: {
        title: '交易构成',
        date: 'date',
        indicators: 'constitute',
        contrast: 'contrast'
      },
      statistics: {
        title: '交易金额统计',
        date: 'date'
      },
      estimate: {
        title: '预计发货量',
        date: 'date'
      },
      tableData: [
        {
          ranking: '1',
          store: '微信旗舰店',
          money: '500'
        },
        {
          ranking: '1',
          store: '微信旗舰店',
          money: '500'
        },
        {
          ranking: '1',
          store: '微信旗舰店',
          money: '500'
        }
      ],
      // 交易明细
      tableData3: []
    }
  },
  created () {
    this.detailedCount()
  },
  // 数据初始化方法
  mounted () {
    // this.necessaryCount()
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size
      this.detailedCount()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.detailedCount()
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    getData () {
      // this.estimateData.series[0].data = [0, 0, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5]
      // this.splineData.data.xAxis.categories = ['10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8', '10.9']
    },
    // 交易趋势
    necessaryCount (value) {
      // 触发子组件方法
      this.$refs.necessaryChild.change(value)
    },
    // 交易明细
    detailedCount (value) {
      // var temp = {
      //   date: '2018.04.01',
      //   number: 'DS2354541515615615',
      //   money: '￥32,567.00',
      //   price: '￥500.00',
      //   source: '微信推荐',
      //   store: '微店'
      // }
      // this.tableData3.push(temp)
      // 判断选择数据分析方式(单门店/多门店)
      let url = window.location.href
      if (url.indexOf('/oneStoreData/') !== -1) {
        this.dealType = false
      }
      let params = {}
      if (value) {
        params = {
          page: this.currentPage,
          limit: this.pagesize,
          startDate: value.startDate,
          endDate: value.endDate,
          isAllStore: this.$route.path
        }
      } else {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        params = {
          page: this.currentPage,
          limit: this.pagesize,
          startDate: this.formatDate(start),
          endDate: this.formatDate(end),
          isAllStore: this.$route.path
        }
      }
      this.$api.getDetailedCount(params).then(res => {
        this.tableData3 = []
        this.totalCount = res.count
        res.data.forEach((item, index) => {
          this.tableData3.push(item)
        })
      })
      // this.$message.error('交易明细')
    },
    // 交易构成
    constituteCount (value) {
      // 触发子组件方法
      this.$refs.constituteCountChild.change(value)
    },
    // 交易金额统计
    statisticsCount (value) {
      // 触发子组件方法
      this.$refs.statisticsChild.change(value)
    },
    // 预计发货量
    estimateCount (value) {
      // 触发子组件方法
      this.$refs.estimateChild.change(value)
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
  components: {topList, highchartLine, highChart, percentView, topData, highChartSpid, highChartConst, highChartStat, highChartEstima}
}
</script>
<style lang="scss" scoped>
.analysis{
  .data-chart{
    margin-bottom: 40px;
  }
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
}
</style>
