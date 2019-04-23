<template>
  <div class="top-tips" ref="topTips">
    <span>{{title.title}}</span>
    <div class="form">
      <el-form ref="form" label-width="80px" v-if="title.indicators == 'indicators'">
        <!-- <el-form-item label="对比对象">
          <el-select placeholder="请输入" v-model="form.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <el-form ref="form" label-width="80px" v-if="title.indicators == 'constitute'">
        <el-form-item label="统计指标">
          <el-select placeholder="请选择" v-model="form.constituteIndex">
            <el-option label="销售额" value="tradeCount"></el-option>
            <el-option label="客单价" value="perTicketSales"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form ref="form" label-width="80px" v-if="title.memAnalysis == 'memAnalysis'">
        <el-form-item label="显示指标">
          <el-select placeholder="请选择" v-model="form.analysisIndex">
            <el-option label="已购客户总数" value="memTotal"></el-option>
            <el-option label="已购客户增长数" value="memTodayAddNum"></el-option>
            <el-option label="活跃已购客户数" value="memActiveNum"></el-option>
            <el-option label="购买商品客户数" value="memNumBuyGoods"></el-option>
            <el-option label="已购客户增长率" value="memGrowthRate"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form ref="form" label-width="80px" v-if="title.memAnalysis == 'memAnalysisList'">
        <el-form-item label="显示指标">
          <el-select placeholder="请选择" v-model="form.analysisIndex">
            <el-option label="全部" value="all"></el-option>
            <el-option label="已购客户总数" value="memTotal"></el-option>
            <el-option label="已购客户增长数" value="memTodayAddNum"></el-option>
            <el-option label="活跃已购客户数" value="memActiveNum"></el-option>
            <el-option label="购买商品客户数" value="memNumBuyGoods"></el-option>
            <el-option label="已购客户增长率" value="memGrowthRate"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form ref="form" label-width="80px" v-if="title.memAttribute == 'memAttribute'">
        <el-form-item label="显示指标">
          <el-select placeholder="请选择" v-model="form.attributeIndex">
            <el-option label="地区(柱状图)" value="region"></el-option>
            <el-option label="年龄段(饼图)" value="age"></el-option>
            <el-option label="性别(饼图)" value="sex"></el-option>
            <el-option label="标签(柱状图)" value="lable"></el-option>
            <!-- <el-option label="终端(饼图)" value="client"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <el-form ref="form" label-width="80px" v-if="title.date == 'date'">
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateTime"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="~"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-button class="upload" v-if="title.title == '销售额'" @click="necessaryCount(form)">统计</el-button>
      <el-button class="upload" v-if="title.title == '交易趋势'" @click="necessaryCount(form)">统计</el-button>
      <el-button class="upload" v-if="title.title == '交易明细'" @click="detailedCount(form)">统计</el-button>
      <el-button class="upload" v-if="title.title == '交易构成'" @click="constituteCount(form)">统计</el-button>
      <el-button class="upload" v-if="title.title == '交易金额统计'" @click="statisticsCount(form)">统计</el-button>
      <el-button class="upload" v-if="title.title == '预计发货量'" @click="estimateCount(form)">统计</el-button>
      <el-button class="upload" v-if="title.title == '已购客户分析'" @click="analysisCount(form)">查询</el-button>
      <el-button class="upload" v-if="title.title == '已购客户属性'" @click="attributeCount(form)">查询</el-button>
      <el-button class="upload" v-if="title.title == '已购客户数据'" @click="detailCount(form)">查询</el-button>
      <el-button class="upload" v-if="title.title == '已购客户数据'" @click="exportExcel">导出</el-button>
      <!-- <el-button class="upload el-icon-upload" v-if="title.type == 'download'">下载</el-button> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dateTime: '',
      active: false,
      form: {
        region: '',
        constituteIndex: '',
        analysisIndex: '',
        attributeIndex: '',
        // days: '',
        page: 1,
        limit: 5,
        startDate: '',
        endDate: ''
      },
      pickerOptions2: {
        // {
        //   text: '最近一天',
        //   onClick (picker) {
        //     const end = new Date()
        //     const start = new Date()
        //     start.setTime(start.getTime() - 3600 * 1000 * 24)
        //     picker.$emit('pick', [start, end])
        //   }
        // },
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            var y2 = end.getFullYear()
            var y = start.getFullYear()
            var m2 = end.getMonth() + 1
            var m = start.getMonth() + 1
            m2 = m2 < 10 ? ('0' + m2) : m2
            m = m < 10 ? ('0' + m) : m
            var d2 = end.getDate()
            var d = start.getDate()
            d2 = d2 < 10 ? ('0' + d2) : d2
            d = d < 10 ? ('0' + d) : d
            var h2 = end.getHours()
            var h = start.getHours()
            h2 = h2 < 10 ? ('0' + h2) : h2
            h = h < 10 ? ('0' + h) : h
            var minute2 = end.getMinutes()
            var minute = start.getMinutes()
            minute2 = minute2 < 10 ? ('0' + minute2) : minute2
            minute = minute < 10 ? ('0' + minute) : minute
            var second2 = end.getSeconds()
            var second = start.getSeconds()
            second2 = second < 10 ? ('0' + second2) : second2
            second = second < 10 ? ('0' + second) : second
            picker.$emit('pick', [(y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second), (y2 + '-' + m2 + '-' + d2 + ' ' + h2 + ':' + minute2 + ':' + second2)])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            var y2 = end.getFullYear()
            var y = start.getFullYear()
            var m2 = end.getMonth() + 1
            var m = start.getMonth() + 1
            m2 = m2 < 10 ? ('0' + m2) : m2
            m = m < 10 ? ('0' + m) : m
            var d2 = end.getDate()
            var d = start.getDate()
            d2 = d2 < 10 ? ('0' + d2) : d2
            d = d < 10 ? ('0' + d) : d
            var h2 = end.getHours()
            var h = start.getHours()
            h2 = h2 < 10 ? ('0' + h2) : h2
            h = h < 10 ? ('0' + h) : h
            var minute2 = end.getMinutes()
            var minute = start.getMinutes()
            minute2 = minute2 < 10 ? ('0' + minute2) : minute2
            minute = minute < 10 ? ('0' + minute) : minute
            var second2 = end.getSeconds()
            var second = start.getSeconds()
            second2 = second < 10 ? ('0' + second2) : second2
            second = second < 10 ? ('0' + second) : second
            picker.$emit('pick', [(y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second), (y2 + '-' + m2 + '-' + d2 + ' ' + h2 + ':' + minute2 + ':' + second2)])
          }
        }]
      }
    }
  },
  methods: {
    unflod () {
      this.active = !this.active
      this.$emit('showList', this.active)
      this.$emit('thisRef', this.$refs.topTips, this.active)
    },
    exportExcel () {
      this.$emit('exportExcel')
    },
    // 交易趋势
    necessaryCount (value) {
      value.startDate = this.dateTime[0]
      value.endDate = this.dateTime[1]
      var flag = this.dateValidatetime()
      if (!flag) {
        return false
      }
      this.$emit('necessaryCount', value)
    },
    // 交易明细
    detailedCount (value) {
      value.startDate = this.dateTime[0]
      value.endDate = this.dateTime[1]
      value.page = 1
      value.limit = 5
      var flag = this.dateValidatetime()
      if (!flag) {
        return false
      }
      this.$emit('detailedCount', value)
    },
    // 交易构成
    constituteCount (value) {
      value.startDate = this.dateTime[0]
      value.endDate = this.dateTime[1]
      var flag = this.dateValidatetime()
      if (!flag) {
        return false
      }
      this.$emit('constituteCount', value)
    },
    // 交易金额统计
    statisticsCount (value) {
      var flag = this.dateValidatetime()
      if (!flag) {
        return false
      }
      value.startDate = this.dateTime[0]
      value.endDate = this.dateTime[1]
      this.$emit('statisticsCount', value)
    },
    // 预计发货量
    estimateCount (value) {
      var flag = this.dateValidatetime()
      if (!flag) {
        return false
      }
      value.startDate = this.dateTime[0]
      value.endDate = this.dateTime[1]
      this.$emit('estimateCount', value)
    },
    // 已购客户分析模块方法
    // 已购客户分析
    analysisCount (value) {
      var flag = this.dateValidate(value)
      if (flag) {
        value.startDate = this.dateTime[0]
        value.endDate = this.dateTime[1]
        this.$emit('analysisCount', value)
      }
    },
    // 已购客户属性
    attributeCount (value) {
      if (value.attributeIndex === undefined || value.attributeIndex === null || value.attributeIndex === '') {
        this.$message.error('请选择显示指标')
        return
      }
      this.$emit('attributeCount', value)
    },
    // 已购客户数据明细
    detailCount (value) {
      var flag = this.dateValidate(value)
      if (flag) {
        value.startDate = this.dateTime[0]
        value.endDate = this.dateTime[1]
        this.$emit('detailCount', value)
      }
    },
    // 数据校验
    dateValidate (value) {
      if (value.analysisIndex === undefined || value.analysisIndex === null || value.analysisIndex === '') {
        this.$message.error('请选择显示指标')
        return false
      }
      var flag = this.dateValidatetime()
      if (!flag) {
        return false
      }
      return true
    },
    dateValidatetime () {
      if (this.dateTime === undefined || this.dateTime === null || this.dateTime.length < 2) {
        this.$message.error('请选择开始日期和结束日期')
        return false
      }
      // 校验结束时间不能大于当前时间
      var endDateStr = this.dateTime[1].replace(/-/g, '/')
      var endDate = new Date(endDateStr)
      var nowDate = new Date()
      if (endDate > nowDate) {
        this.$message.error('结束时间不能大于当前时间')
        return false
      }
      return true
    }
  },
  props: ['title']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.top-tips{
  background-color: $gray-color;
  height:44px;
  padding:11px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .small-title{
    margin-left: 15px;
    font-size: $xs-size;
    color: $text-red-color;
  }
  .unfold{
    border:0;
    background-color: $gray-color;
    font-size: $xs-size;
    cursor: pointer;
    color:$text-gray-color;
    &:hover{
      color:$main-color;
    }
    i{
      margin-right: 4px;
    }
  }
  .fright{
    float: right;
    &.edit{
      position: relative;
      bottom: 9px;
    }
  }
  .form{
    display: flex;
    align-items: center;
    .el-select{
      margin-right: 10px;
      width: 150px;
    }
    .el-form-item{
      margin: 0;
    }
    .upload{
      padding: 5px 12px;
      color: #fff;
      font-size: 12px;
      background: $blue-color;
      border: none;
      height: 22px;
      margin-left: 10px;
    }
  }
}
</style>
