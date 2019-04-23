<template>
<div class="member">
  <top-list></top-list>
  <div class="data-chart">
      <top-data :title="necessary" @analysisCount= 'analysisCount'></top-data>
      <highChartMemAnalysis ref="analysisChild" ></highChartMemAnalysis>
  </div>
  <div class="data-chart">
    <top-data :title="shapetitle" @attributeCount= 'attributeCount'></top-data>
      <highChartMemAttribute ref="attributeChild" :chartType="chartType" ></highChartMemAttribute>
  </div>
  <div class="data-chart">
    <top-data :title="tabletitle" @detailCount= 'detailCount' @exportExcel="exportExcel"></top-data>
    <div class="balck-th">
        <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="日期"
          prop="date"
          align="center">
        </el-table-column>
        <el-table-column
          prop="memCount"
          label="已购客户总数"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="memAdd"
          align="center"
          label="新增已购客户数">
        </el-table-column>
        <el-table-column
          prop="memActive"
          label="活跃已购客户数"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="memBuyGoods"
          label="购买商品已购客户数"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="memGrowthRate"
          label="已购客户增长率（%）"
          width="150"
          align="center">
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pagin">
          <span class="total">共{{totalCount}}条数据</span>
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="sizes, prev, pager, next"
          :page-sizes="[2, 5, 10, 20]"
          :total=totalCount>
        </el-pagination>
    </div> -->
  </div>
</div>
</template>

<script>
import topList from '../../../components/data/topList'
import highchartLine from '../../../components/public/highchartLine'
import percentView from '../../../components/public/percentView'
import topData from '../../../components/data/topData'
import highChartMemAnalysis from '../../../components/charts/highChartMemAnalysis'
import highChartMemAttribute from '../../../components/charts/highChartMemAttribute'
import {exportJsonExcel} from '../../../vendor/Export2Excel'
export default {
  components: {topList, highchartLine, percentView, topData, highChartMemAnalysis, highChartMemAttribute},
  name: 'analysisMember',
  data () {
    return {
      totalCount: 0, // 默认数据总数
      currentPage: 1,
      pagesize: 10,
      chartType: 'columnChart',
      necessary: {
        title: '已购客户分析',
        memAnalysis: 'memAnalysis',
        // day: 'day',
        date: 'date'
      },
      shapetitle: {
        title: '已购客户属性',
        memAttribute: 'memAttribute'
        // day: 'day',
        // date: 'date'
      },
      tabletitle: {
        title: '已购客户数据',
        memAnalysis: 'memAnalysisList',
        // day: 'day',
        type: 'download',
        date: 'date'
      },
      tableData: []
    }
  },
  // 数据初始化方法
  mounted () {
    this.getInitData()
  },
  methods: {
    getInitData (value) {
      var _this = this
      var pramas = {}
      if (value === undefined || value === null || value === '') {
        // 初始化查询最近七天
        pramas.startDate = this.formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7))
        pramas.endDate = this.formatDate(new Date())
        pramas.isAllStore = this.$route.path
        _this.$api.getMemNumByTimeAndIndexAll(pramas).then(res => {
          _this.tableData = []
          var i = 0
          while (i < res.xList.length) {
            let obj = {}
            obj.date = res.xList[i]
            obj.memCount = res.yList[i].memTotal
            obj.memAdd = res.yList[i].memTodayAddNum
            obj.memActive = res.yList[i].memActiveNum
            obj.memBuyGoods = res.yList[i].memNumBuyGoods
            obj.memGrowthRate = res.yList[i].memGrothRate
            i = i + 1
            _this.tableData.push(obj)
          }
        })
      } else if (value.analysisIndex === 'all') {
        // 查询全部指标条件
        pramas.startDate = value.startDate
        pramas.endDate = value.endDate
        pramas.isAllStore = this.$route.path
        _this.$api.getMemNumByTimeAndIndexAll(pramas).then(res => {
          _this.tableData = []
          var i = 0
          while (i < res.xList.length) {
            let obj = {}
            obj.date = res.xList[i]
            obj.memCount = res.yList[i].memTotal
            obj.memAdd = res.yList[i].memTodayAddNum
            obj.memActive = res.yList[i].memActiveNum
            obj.memBuyGoods = res.yList[i].memNumBuyGoods
            obj.memGrowthRate = res.yList[i].memGrothRate
            i = i + 1
            _this.tableData.push(obj)
          }
        })
      } else {
        // 查询单个指标条件
        pramas.index = value.analysisIndex
        pramas.startDate = value.startDate
        pramas.endDate = value.endDate
        pramas.isAllStore = this.$route.path
      }
      // 不同指标查询结果组装
      if (pramas.index === 'memTotal') {
        // 默认查询最近一周已购客户总数
        _this.$api.getMemNumByTimeAndIndex(pramas).then(res => {
          _this.tableData = []
          var i = 0
          while (i < res.xList.length) {
            let obj = {}
            obj.date = res.xList[i]
            obj.memCount = res.yList[i]
            i = i + 1
            _this.tableData.push(obj)
          }
        })
      } else if (pramas.index === 'memTodayAddNum') {
        // 默认查询最近一周已购客户总数
        _this.$api.getMemNumByTimeAndIndex(pramas).then(res => {
          _this.tableData = []
          var i = 0
          while (i < res.xList.length) {
            let obj = {}
            obj.date = res.xList[i]
            obj.memAdd = res.yList[i]
            i = i + 1
            _this.tableData.push(obj)
          }
        })
      } else if (pramas.index === 'memActiveNum') {
        // 查询已购客户增长数
        _this.$api.getMemNumByTimeAndIndex(pramas).then(res => {
          _this.tableData = []
          var i = 0
          while (i < res.xList.length) {
            let obj = {}
            obj.date = res.xList[i]
            obj.memActive = res.yList[i]
            i = i + 1
            _this.tableData.push(obj)
          }
        })
      } else if (pramas.index === 'memNumBuyGoods') {
        // 查询已购客户活跃数
        _this.$api.getMemNumByTimeAndIndex(pramas).then(res => {
          _this.tableData = []
          var i = 0
          while (i < res.xList.length) {
            let obj = {}
            obj.date = res.xList[i]
            obj.memBuyGoods = res.yList[i]
            i = i + 1
            _this.tableData.push(obj)
          }
        })
      } else if (pramas.index === 'memGrowthRate') {
        // 查询已购客户增长数
        _this.$api.getMemNumByTimeAndIndex(pramas).then(res => {
          _this.tableData = []
          var i = 0
          while (i < res.xList.length) {
            let obj = {}
            obj.date = res.xList[i]
            obj.memGrowthRate = res.yList[i]
            i = i + 1
            _this.tableData.push(obj)
          }
        })
      }
    },
    // 分页回调函数
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getInitData()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getInitData()
    },
    //  已购客户分析查询
    analysisCount (value) {
      // 触发子组件方法
      this.$refs.analysisChild.getData(value)
    },
    // 已购客户属性查询
    attributeCount (value) {
      if (value.attributeIndex === 'sex' || value.attributeIndex === 'age') {
        this.chartType = 'pieChart'
      } else {
        this.chartType = 'columnChart'
      }
      // 触发子组件方法
      value.chartType = this.chartType
      this.$refs.attributeChild.getData(value)
    },
    // 已购客户数据查询
    detailCount (value) {
      this.getInitData(value)
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 报表导出
    exportExcel () {
      // this.$emit('exportExcel')
      const tHeader = ['日期', '已购客户总数', '新增已购客户数', '活跃已购客户数', '购买商品已购客户数', '已购客户增长率（%）']
      const filterVal = ['date', 'memCount', 'memAdd', 'memActive', 'memBuyGoods', 'memGrowthRate']
      const data = this.formatJson(filterVal, this.tableData)
      exportJsonExcel(tHeader, data, '已购客户数据明细')
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
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.member{
  .data-chart{
    margin-top: 40px;
    .upload{
      padding: 5px 12px;
      color: #fff;
      font-size: 12px;
      background: $blue-color;
      border: none;
      height: 22px;
      margin-left: 93.5%;
    }
  }
}
</style>
