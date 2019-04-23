<template>
  <div class="administration">
    <div class="title">
      <search @searchValue="searchValue" :load="loading"></search>
      <div class="busi-btns">
          <el-button class="btn newcom-btn" @click="importAdd" data-code='12020001'>+新增类型</el-button>
        </div>
    </div>
    <el-table
    v-loading="loading"
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%">
    <el-table-column
      label="类型名称"
      prop="classifyName"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="state"
      align="center"
      label="是否启用">
    </el-table-column>
    <el-table-column
      prop="creator"
      label="创建人"
      align="center">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      align="center">
    </el-table-column>
    <el-table-column
      label="操作"
      width="260"
      align="center">
       <template slot-scope="scope">
            <el-button
              size="mini"
              @click="importEdit(scope.row)"
               class="edit" data-code='12020002'>编辑</el-button>
            <el-button
              size="mini"
              @click="deleteClassify(scope.row)"
             class="edit" data-code='12020004'>删除</el-button>
             <el-button size="mini" @click="disableClassify(scope.row)" v-if="scope.row.state == '是'" class="edit" data-code='12020006'>停用</el-button>
             <el-button size="mini" @click="enableClassify(scope.row)" v-if="scope.row.state == '否'" class="edit" data-code='12020005'>启用</el-button>
          </template>
    </el-table-column>
  </el-table>
  <div class="pagin">
          <span class="total">共{{ totalCount }}条数据</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total=totalCount>
        </el-pagination>
      </div>
  <el-dialog
      :visible.sync="importNew"
        width="700px"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">新类型</span>
          </div>
        <add-classify  @refresh="refresh" ref="clean"></add-classify>
  </el-dialog>
  <el-dialog
      :visible.sync="importNew2"
        width="700px"
        :before-close="handleClose2" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">编辑类型</span>
          </div>
        <edit-classify :classify='classify' @refresh="refresh" ></edit-classify>
  </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { judgeButton } from '../../../tool/Utils'
import search from '../../../components/public/search'
import addClassify from '../../../components/case/addClassify'
import editClassify from '../../../components/case/editClassify'
export default{
  data () {
    return {
      loading: false,
      tableData: [],
      importNew: false,
      importNew2: false,
      tableData3: [],
      multipleSelection: [],
      caseClassify: {
        classifyId: '',
        classifyName: '',
        createTime: '',
        state: '',
        creator: ''
      },
      classifyId: '',
      classifyName: '',
      classify: '',
      totalCount: 0, // 默认数据总数
      currentPage: 1,
      pagesize: 10
    }
  },
  mounted () {
    this.getListData()
    this.getButton()
  },
  computed: {
    ...mapGetters(['powerButton'])
  },
  methods: {
    searchValue (val) {
      this.classifyName = val
      this.loading = true
      this.getListData()
    },
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    importAdd () {
      this.importNew = true
    },
    importEdit (value) {
      this.classify = value
      this.importNew2 = true
    },
    handleClose () {
      this.importNew = false
      this.$refs.clean.cleanFrom()
    },
    handleClose2 () {
      this.importNew2 = false
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getListData()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getListData()
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getListData () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        classifyName: this.classifyName
      }
      this.$api.getCaseClassifyList(params).then(res => {
        this.loading = false
        this.tableData3 = res.data
        this.totalCount = res.count
      })
    },
    refresh () {
      this.importNew = false
      this.importNew2 = false
      this.getListData()
    },
    deleteClassify (value) {
      if (value.state === '否') {
        this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            classifyId: value.classifyId,
            versionNo: value.versionNo
          }
          this.$api.deleteClassify(params).then(res => {
            if (res.code === 0) {
              this.getListData()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
        })
      } else {
        this.$message.error('启用中的类型,无法删除')
      }
    },
    disableClassify (value) {
      let params = {
        classifyId: value.classifyId,
        versionNo: value.versionNo
      }
      this.$api.disableClassify(params).then(res => {
        if (res.code === 0) {
          this.getListData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    enableClassify (value) {
      let params = {
        classifyId: value.classifyId,
        versionNo: value.versionNo
      }
      this.$api.enableClassify(params).then(res => {
        if (res.code === 0) {
          this.getListData()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  components: {search, addClassify, editClassify}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.administration{
  padding-top: 106px;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
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
  .comm-opera{
    button{
      padding:7px;
      background-color:$main-color;
      border-color:$main-color;
      display: none;
      &:hover{
        background-color:lighten($main-color,6%);
        border-color:lighten($main-color,6%);
      }
      i{
        color:#fff;
      }
    }
  }
  .top-manage{
    display: flex;
    justify-content: space-between;
    background-color: $child-nav-bg;
    height: 44px;
    padding: 11px 16px;
    >span{
      font-size: $xlg-size;
      color: $text-main-color;
    }
    div{
      span{
        display: inline-block;
        margin-left: 20px;
        font-size: $xs-size;
        color: $text-gray-color;
        padding-left: 20px;
        position: relative;
        cursor: pointer;
      }
    }
  }
  .edit, .delete{
    border: 0;
    background: none;
    color: $text-red-color;
  }
}
</style>
