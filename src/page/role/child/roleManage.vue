<template>
  <div class="manage balck-th">
    <div class="title">
      <span>角色管理</span>
      <search @searchValue="searchValue"></search>
      <div class="busi-btns">
          <el-button class="btn newcom-btn" @click="importAdd" data-code='17000002'>+新角色</el-button>
        </div>
    </div>
    <div class="top-manage">
      <span>所有角色</span>
      <div>
      </div>
    </div>
    <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%">
    <el-table-column
      label="角色名称"
      prop="roleName"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="roleDescription"
      label="角色描述"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="state"
      align="center"
      width="120"
      label="状态">
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
      width="300"
      align="center">
       <template slot-scope="scope">
            <el-button
              size="mini"
              @click="importEdit(scope.row)"
              class="edit" data-code='17000003'>编辑</el-button>
            <el-button
              size="mini"
              @click="deleteRole(scope.row)"
             class="edit" data-code='17000004'>删除</el-button>
             <el-button size="mini" @click="disableRole(scope.row)" v-if="scope.row.state == '启用'" class="edit" data-code='17000006'>停用</el-button>
             <el-button size="mini" @click="enableRole(scope.row)" v-if="scope.row.state == '停用'" class="edit" data-code='17000005'>启用</el-button>
             <el-button size="mini" @click="authorize(scope.row)"  class="edit" data-code='17000006'>授权</el-button>
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
        :before-close="handleClose" class="import-dialog" >
          <div slot="title" class="left-title">
            <span class="top">新角色</span>
          </div>
        <add-role @refresh="refresh" ref="clean"></add-role>
  </el-dialog>
  <el-dialog
      :visible.sync="importNew2"
        width="700px"
        :before-close="handleClose2" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">编辑角色</span>
          </div>
        <edit-role :role='role' @refresh="refresh" ></edit-role>
  </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { judgeButton } from '../../../tool/Utils'
import search from '../../../components/public/search'
import addRole from '../../../components/role/addRole'
import editRole from '../../../components/role/editRole'
export default{
  data () {
    return {
      importNew: false,
      importNew2: false,
      tableData3: [],
      multipleSelection: [],
      stStaffRole: {
        roleId: '',
        roleName: '',
        createTime: '',
        roleDescription: '',
        state: '',
        creator: '',
        versionNo: ''
      },
      roleId: '',
      roleName: '',
      role: '',
      totalCount: 0, // 默认数据总数
      currentPage: 1,
      pagesize: 10
    }
  },
  computed: {
    ...mapGetters(['powerButton'])
  },
  mounted () {
    this.getListData()
    this.getButton()
  },
  methods: {
    importAdd () {
      this.importNew = true
    },
    searchValue (val) {
      this.roleName = val
      this.getListData()
    },
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    importEdit (value) {
      this.role = value
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
    // 授权
    authorize (value) {
      this.$router.push({name: '角色授权页面', params: {roleId: value.roleId}})
    },
    getListData () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        roleName: this.roleName
      }
      this.$api.getRoleList(params).then(res => {
        this.tableData3 = res.data
        this.totalCount = res.count
      })
    },
    refresh () {
      this.importNew = false
      this.importNew2 = false
      this.getListData()
    },
    deleteRole (value) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          roleId: value.roleId,
          versionNo: value.versionNo
        }
        this.$api.deleteRole(params).then(res => {
          if (res.code === 0) {
            this.getListData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
      })
    },
    disableRole (value) {
      let params = {
        roleId: value.roleId,
        versionNo: value.versionNo
      }
      this.$api.disableRole(params).then(res => {
        if (res.code === 0) {
          this.getListData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    enableRole (value) {
      let params = {
        roleId: value.roleId,
        versionNo: value.versionNo
      }
      this.$api.enableRole(params).then(res => {
        if (res.code === 0) {
          this.getListData()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  components: {search, addRole, editRole}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.manage{
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
