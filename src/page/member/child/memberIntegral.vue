<template>
  <div class="administration balck-th">
    <div class="title">
      <span>是否启用积分功能</span>
      <div class="switch">
        <el-switch
          :width="60"
          @change="changeAllState()"
          v-model="text"
          active-text="开启"
          active-color="#6FADEC"
          inactive-text="关闭">
        </el-switch>
      </div>
    </div>
    <div class="content">
      <top-tips :title="necessary"></top-tips>
      <div class="label-role">
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="integralRule"
          label="规则"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="integralRuleValue"
          label="N值"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="integralValue"
          label="X值"
          align="100">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          align="center"
          width="150">
        </el-table-column>
          <el-table-column
          prop="userLimit"
          label="使用范围"
          align="center"
          width="150">
        </el-table-column>
          <el-table-column
          prop="remark"
          label="备注"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="importAdd(scope.$index,scope.row)"
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
        :before-close="handleClose" class="import-dialog">
          <purchase-points :integralRulesDetail="integralRulesDetail" @reflash="reflash"></purchase-points>
    </el-dialog>
  </div>
</template>
<script>
import topTips from '../../../components/public/topTips'
import purchasePoints from '../../../components/member/purchasePoints'
import titleTop from '../../../components/member/titleTop'
export default{
  data () {
    return {
      midlleValue: '',
      dateValue: '',
      text: true,
      importNew: false,
      integralTitle: {
        title: '1'
      },
      necessary: {
        title: '基础配置',
        unfold: false
      },
      optional: {
        title: '积分有效期',
        unfold: false
      },
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      count: 0,
      integralRulesDetail: {}
    }
  },
  mounted () {
    this.getStIntegralRulesList()
  },
  methods: {
    importAdd (index, row) {
      this.integralRulesDetail = this.tableData[index]
      this.importNew = true
    },
    handleClose () {
      this.importNew = false
    },
    handleSizeChange (pagesize) {
      this.pagesize = pagesize
      this.getStIntegralRulesList()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getStIntegralRulesList()
    },
    reflash () {
      this.importNew = false
      this.getStIntegralRulesList()
    },
    // 获取列表数据
    getStIntegralRulesList () {
      var _this = this
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        integralType: 'HY'
      }
      this.$api.getStIntegralRulesList(params).then(res => {
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
      this.$api.stIntegralRulesEdit(params).then(res => {
        if (res.code === 0) {
          // 成功返回列表页面
          this.getStIntegralRulesList()
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    // 是否启用积分功能
    changeAllState () {
      var _this = this
      let params = {}
      if (_this.text === false) {
        this.$confirm('确定关闭所有积分规则吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          params.state = '1'
          this.$api.stIntegralRulesEdit(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.getStIntegralRulesList()
            } else {
              // 失败提示
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          })
        })
      } else if (_this.text === true) {
        this.$confirm('确定开启所有积分规则吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          params.state = '0'
          this.$api.stIntegralRulesEdit(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.getStIntegralRulesList()
            } else {
              // 失败提示
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          })
        })
      }
    }
  },
  components: {topTips, purchasePoints, titleTop}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.administration{
  .title{
    background-color: $child-nav-bg;
    height: 44px;
    padding: 11px 16px;
    margin: 30px 0;
    text-align: center;
    font-weight: 700;
    font-size: $xlg-size;
    display: flex;
    justify-content: center;
    align-items: center;
    .switch{
      margin-left: 50px;
    }
  }
  .content{
    margin-bottom: 40px;
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

}
</style>
