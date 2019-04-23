<template>
  <div class="">
    <div class="title">授权蘑盒</div>
    <div class="label-role">
      <el-table
      :data="tableData"
      style="width: 980px">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="boxName"
        label="蘑盒名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="storeName"
        label="已授权门店"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" align="center" v-if="roleCode.indexOf('DISTRIBUTOR') != -1">
        <template slot-scope="scope">
            <el-button
                size="mini"
                @click="scopeUse(scope.row)"
                  class="edit">使用范围</el-button>
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
    <el-dialog
      :visible.sync="scopeDialog"
      v-if="scopeDialog"
      title="使用范围"
      top="32vh"
      :before-close="closeDialog" class="scope-dialog">
        <div class="content-scope">
          <el-form ref="form">
            <el-form-item class="store-list">
              <el-checkbox-group v-model="selectStore" @change="chooseStore">
                <el-checkbox :label="item.storeId" name="type" v-for="item in storeList" :key="item.storeId" class="check-item">{{item.storeName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button @click="resetForm" class="scope-btn">重置</el-button>
              <el-button type="primary" @click="onSubmit" class="scope-btn">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
    </el-dialog>
    </div>
  </div>
</template>
<script>
import {getStore} from '../../../tool/Utils'
export default {
  data () {
    return {
      roleCode: '',
      selectStore: [],
      recetSelectStore: [],
      selectBoxId: '',
      storeList: [],
      tableData: [],
      scopeDialog: false,
      count: 0,
      currentPage: 1,
      pagesize: 10
    }
  },
  mounted () {
    this.roleCode = getStore('roleCode')
    this.findPbMagicBoxRangeVoByPage()
  },
  methods: {
    findPbMagicBoxRangeVoByPage () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize
      }
      this.$api.findPbMagicBoxRangeVoByPage(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
          this.count = res.count
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    findStoreListByUid () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize
      }
      this.$api.findStoreListByUid(params).then(res => {
        if (res.code === 0) {
          this.storeList = res.data
          // this.selectStore = item
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    scopeUse (item) {
      this.scopeDialog = true
      this.selectStore = item.storeIds.split(',')
      this.recetSelectStore = item.storeIds.split(',')
      this.selectBoxId = item.boxId
      this.findStoreListByUid()
    },
    chooseStore (val) {
      this.selectStore = val
    },
    closeDialog () {
      this.scopeDialog = false
      this.findPbMagicBoxRangeVoByPage()
    },
    onSubmit () {
      if (this.selectStore.length === 0) {
        this.$message.error('请至少选择一家门店')
      } else {
        let params = {
          storeIds: this.selectStore.join(','),
          boxId: this.selectBoxId
        }
        this.$api.boxSetStoreScope(params).then(res => {
          if (res.code === 0) {
            // this.$refs[formName].resetFields()
            this.closeDialog()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    resetForm () {
      this.selectStore = this.recetSelectStore
    },
    handleSizeChange (pagesize) {
      this.pagesize = pagesize
      this.findPbMagicBoxRangeVoByPage()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.findPbMagicBoxRangeVoByPage()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.scope-dialog{
  .content-scope{
    .el-form{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .el-checkbox-group{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }
      .store-list{
        height: 150px;
        overflow-y: auto;
        width: 100%;
        padding: 0 40px;
        .check-item{
          height: 30px;
        }
      }
    }
    .scope-btn{
      width: 75px;
      height: 32px;
      padding: 9px 20px;
      margin-bottom: 7px;
    }
  }
}
.title{
  height:36px;
  background:rgba(244,244,244,1);
  border-radius:5px;
  line-height: 36px;
  font-size:14px;
  color:rgba(51,51,51,1);
  padding-left: 20px;
  margin-bottom: 20px;
}
.label-role {
  margin: 0 auto;
  .edit,
  .delete {
    border: 0;
    background: none;
    width: 100px;
    background:rgba(244,244,244,1);
    border-radius:3px;
    height: 32px;
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
