<template>
  <div class="">
    <div class="title">
      <!-- <span>标签规则管理</span> -->
       <el-select v-model="type" placeholder="请选择" @change="changeLableType(type)">
          <el-option
            v-for="item in condition"
            :key="item.type"
            :label="item.title"
            :value="item.type">
          </el-option>
        </el-select>
      <search @searchValue="searchValue" :load="loading" class="search"></search>
      <!-- <div class="busi-btns">
          <el-button class="btn newcom-btn" @click="addLable">新标签</el-button>
      </div> -->
    </div>
    <div class="label-role">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="labTypeName"
        label="标签类别"
        align="center">
      </el-table-column>
      <el-table-column
        prop="labName"
        label="标签"
        align="center">
      </el-table-column>
      <el-table-column
        prop="labRule"
        label="规则"
        align="center">
      </el-table-column>
      <el-table-column
            prop="labRuleValue"
            label="X值"
            align="center">
      </el-table-column>
      <el-table-column
          prop="state"
          label="状态"
          align="center">
        </el-table-column>
      <el-table-column label="操作" align="center">
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
import search from '../../../components/public/search'
export default {
  data () {
    return {
      loading: false,
      importNew: false,
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      count: 0,
      labelRulesDetail: {},
      id: '',
      type: '',
      condition: [
        {
          type: '',
          title: '全部标签',
          isActive: true
          // num: 15
        },
        {
          type: 'SP',
          title: '商品标签',
          isActive: true
          // num: 15
        },
        {
          type: 'HY',
          title: '已购用户标签',
          isActive: false
          // num: 10
        },
        {
          type: 'QK',
          title: '潜客标签',
          isActive: false
          // num: 20
        }
      ]
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
    // 改变标签类型
    changeLableType (index) {
      if (index === '') {
        this.type = ''
      } else {
        this.type = index
      }
      this.getStLabelRulesList()
    },
    // 模糊查询
    searchValue (value) {
      this.loading = true
      this.getStLabelRulesList(value)
    },
    // 列表初始化查询
    getStLabelRulesList (value) {
      var _this = this
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        searchParam: value,
        type: this.type
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
          if (item.labType === 'SP') {
            item.labTypeName = '商品标签'
          } else if (item.labType === 'HY') {
            item.labTypeName = '已购用户标签'
          } else if (item.labType === 'QK') {
            item.labTypeName = '潜客标签'
          }
        })
        this.loading = false
        _this.tableData = dataList
        _this.count = res.count
      })
    },
    // 修改状态
    changeState (index) {
      var _this = this
      var params = {}
      params.id = _this.tableData[index].id
      if (_this.tableData[index].state === '启用') {
        this.$confirm('停用该标签规则后对应标签将被删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          params.state = '1'
          this.$api.stLabelRulesEdit(params).then(res => {
            this.getStLabelRulesList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          })
        })
      } else if (_this.tableData[index].state === '停用') {
        this.$confirm('确定启用该标签规则吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          params.state = '0'
          this.$api.stLabelRulesEdit(params).then(res => {
            this.getStLabelRulesList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          })
        })
      }
    },
    handleSizeChange (pagesize) {
      this.pagesize = pagesize
      this.getStLabelRulesList()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getStLabelRulesList()
    },
    importEdit (index) {
      var _this = this
      if (_this.tableData[index].state === '启用') {
        this.$message.error('请先停用后再进行编辑操作')
      } else {
        this.$confirm('标签规则修改后，该经销商下对应的所有门店标签将改变，确定编辑吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.labelRulesDetail = this.tableData[index]
          this.importNew = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          })
        })
      }
    },
    handleClose () {
      this.importNew = false
    }
  },
  components: { topTips, newRule, detailRule, search }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.title{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 30px 0;
    .search{
      margin-left: 15px;
    }
    >span{
      font-weight: 700;
      font-size: $md-size;
      color:$text-main-color;
    }
    .busi-btns{
      .btn{
        padding:9px 20px;
        &.newcom-btn{
          margin-left: 0px;
          background:$blue-color;
          border-color:$blue-color;
          color:#FFF;
          &:focus,&:hover{
            background: lighten($blue-color,6%);
            border-color:lighten($blue-color,6%);
          }
        }
        &.import-btn{
          background: $yello-color;
          border-color:$yello-color;
          color:#FFF;
          &:focus,&:hover{
            background: lighten($yello-color,6%);
            border-color:lighten($yello-color,6%);
          }
        }
      }
    }
  }
.label-role {
  margin: 0 auto;
  .edit,
  .delete {
    border: 0;
    background: none;
  }
  .edit {
    color: $main-color;
    &:hover {
      color: lighten($main-color, 12%);
    }
  }
  .delete {
    color: $table-text-color;
    &:hover {
      color: lighten($table-text-color, 12%);
    }
  }
}
</style>
