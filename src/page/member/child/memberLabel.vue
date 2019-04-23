<template>
  <div class="">
    <div class="content">
      <!-- <el-switch
          :width="60"
          @change="changeAllState()"
          v-model="text"
          active-text="商品"
          active-color="#6FADEC"
          inactive-text="会员">
        </el-switch> -->
      <div class="label-role">
        <el-table
        :data="tableData"
        style="width: 100%" class="header-nobg">
        <el-table-column
          prop="labName"
          label="标签名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="labRule"
          label="获取规则"
          align="center"
          width="250">
        </el-table-column>
        <el-table-column
          prop="labRuleValue"
          label="X值"
          align="center"
          width="100">
        </el-table-column>
          <el-table-column
          prop="state"
          label="状态"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="importEdit(scope.$index)"
                class="edit">编辑</el-button>
            <el-button
              size="mini"
              class="edit" @click="changeState(scope.$index)">{{scope.row.stateButton}}</el-button>
          </template>
        </el-table-column>
      </el-table>
       <div class="pagin">
          <span class="total">共{{count}}条数据</span>
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[2, 5, 10, 20]"
          :current-page.sync="currentPage"
          layout="sizes, prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
      </div>
  </div>
    <el-dialog
      :visible.sync="importNew"
        width="700px"
        @close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">标签修改</span>
          </div>
          <detail-rule :labelRulesDetail="labelRulesDetail" @reflash="reflash"></detail-rule>
    </el-dialog>
  </div>
</template>
<script>
import topTips from '../../../components/public/topTips'
import newRule from '../../../components/member/newRule'
import detailRule from '../../../components/member/detailRule'
export default{
  data () {
    return {
      text: false,
      importNew: false,
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      count: 0,
      labelRulesDetail: {},
      id: ''
    }
  },
  mounted () {
    this.getStLabelRulesList()
  },
  methods: {
    reflash () {
      this.importNew = false
      this.getStLabelRulesList()
    },
    getStLabelRulesList () {
      var _this = this
      let params = {
        page: this.currentPage,
        limit: this.pagesize
      }
      this.$api.getStLabelRulesList(params).then(res => {
        let dataList = res.data
        dataList.forEach(item => {
          if (item.state === '0') {
            item.state = '启用'
            item.stateButton = '停用'
          } else if (item.state === '1') {
            item.state = '停用'
            item.stateButton = '启用'
          }
        })
        _this.tableData = dataList
        _this.count = res.count
      })
    },
    // 修改状态
    changeState (index) {
      var _this = this
      let params = {}
      params.id = _this.tableData[index].id
      if (_this.tableData[index].state === '启用') {
        params.state = '1'
      } else if (_this.tableData[index].state === '停用') {
        params.state = '0'
      }
      this.$api.stLabelRulesEdit(params).then(res => {
        if (res.code === 0) {
          // 成功返回列表页面
          this.getStLabelRulesList()
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    // // 切换至商品标签规则
    // changeAllState () {
    //   var _this = this
    //   if (_this.text === true) {
    //     this.$router.push({path: '/store/labelRoles'})
    //   }
    // },
    handleSizeChange (pagesize) {
      this.pagesize = pagesize
      this.getStLabelRulesList()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getStLabelRulesList()
    },
    importEdit (index) {
      this.labelRulesDetail = this.tableData[index]
      if (this.labelRulesDetail.state === '启用') {
        this.$message.error('请先停用后再进行编辑操作')
      } else if (this.labelRulesDetail.state === '停用') {
        this.importNew = true
      }
    },
    handleClose () {
      this.importNew = false
    }
  },
  components: {topTips, newRule, detailRule}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.content{
    padding-top:30px;
    margin-bottom: 40px;
    .title{
      background-color: $child-nav-bg;
      height: 44px;
      padding: 11px 16px;
      display: flex;
      justify-content: space-between;
      i{
        color:$text-red-color;
        cursor: pointer;
        font-size: $md-size;
      }
    }
    .label-role{
      margin:0 auto;
      .edit, .delete{
        border: 0;
        background: none;
      }
      .edit{
        color:$main-color;
        &:hover{
          color:lighten($main-color, 12%)
        }
      }
      .delete{
        color:$table-text-color;
        &:hover{
          color:lighten($table-text-color, 12%)
        }
      }
    }
  }
  .opeartion{
      display: flex;
      justify-content: center;
      margin: 0 0 16px 0;
      button{
        padding:11px 27px;
      }
      .submit{
          @include linear-grad;
          color:#fff;
          border:0;
          &:hover{
            opacity: 0.9;
          }
      }
    }
</style>
