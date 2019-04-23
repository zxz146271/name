<template>
  <div class="top-tips" ref="topTips">
    <span>{{title.title}}</span>
    <div class="form">
      <el-form ref="form" label-width="80px">
        <!-- <el-form-item label="显示指标">
          <el-select v-model="form.region" multiple collapse-tags style="margin-left: 2px" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <el-form ref="form" label-width="80px">
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="~"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right" @change="changeTime">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!-- <el-button class="upload el-icon-upload">下载</el-button> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dateTime: '',
      options: [{
        value: 'visiterNum',
        label: '访问人数'
      }, {
        value: 'visitCount',
        label: '访问量'
      }, {
        value: 'shareCount',
        label: '分享次数'
      }, {
        value: 'saleNum',
        label: '销售量'
      }, {
        value: 'saleTotal',
        label: '销售金额'
      }, {
        value: 'weiSaleNum',
        label: '微店销售量'
      }, {
        value: 'weiSaleTotal',
        label: '微店销售金额'
      }, {
        value: 'shopSaleNum',
        label: '实体店销售量'
      }, {
        value: 'shopSaleTotal',
        label: '实体店销售金额'
      }
      ],
      form: {
        region: [],
        startDate: '',
        endDate: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    changeTime () {
      let value = this.dateTime
      // value.regin = this.form.region
      this.$emit('goodsTopData', value)
    }
  },
  props: ['title']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/elcheckbox';
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
