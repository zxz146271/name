<template>
  <div class="commodity">
    <div class="top-search">
      <search @searchValue="searchValue" :load="loading"></search>
      <div class="busi-btns">
          <el-button class="btn newcom-btn" @click="addNewStaff" data-code="10030002">新员工</el-button>
      </div>
    </div>
    <!-- <top-operate :option="optionTop" @checkAll="checkAll" @enable="enable" @disable="disable"></top-operate> -->
    <div class="operate">
      <div class="item">
      <div class="letf-op">
        <el-checkbox  v-model="checkAllStaff">全选</el-checkbox>
        <div class="comm-up">
          <button class="btn up" data-code="10030004" @click="batchEnable"><i class="enable" ></i>启用</button>
          <button class="btn down" data-code="10030005" @click="batchDisable"><i class="disable"  ></i>停用</button>
        </div>
      </div>
      <!-- <div class="right-op">
        <div>
          <el-button  @click="batchEnable" type="success" data-code="10030004" :loading="startloading">{{startloading? "启用中" : '启用'}}</el-button>&nbsp;&nbsp;&nbsp;
          <el-button @click="batchDisable" type="danger" data-code="10030005" :loading="endloading">{{endloading? '停用中' : '停用'}}</el-button>
        </div>
      </div> -->
    </div>
    </div>
    <div class="content">
    <div class="manage">
       <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          align="center"
          width="60">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isChooe"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名/状态"
          align="center"
          width="120">
          <template slot-scope="scope">
            <p class="name">{{scope.row.staffName}}</p>
            <i class="state" v-if="scope.row.state === '0'">在职</i>
            <i class="state2" v-else >离职</i>
          </template>
        </el-table-column>
         <el-table-column
          prop="staffCode"
          label="员工编码"
          align="center"
          width="165">
          <template slot-scope="scope">
            <p class="name">{{scope.row.staffCode}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          align="center"
          width="130">
          <template slot-scope="scope">
            <p class="name">{{scope.row.mobile}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="store"
          label="所属门店"
          align="center">
          <template slot-scope="scope">
            <span class="name">{{scope.row.storeName}}</span><br/>
          </template>
        </el-table-column>
        <el-table-column
          prop="people"
          label="职位"
          align="center">
          <template slot-scope="scope">
            <span class="info"  v-if="scope.row.roleName">{{scope.row.roleName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="people"
          label="添加人"
          align="center"
          width="100">
          <template slot-scope="scope">
            <p class="name">{{scope.row.creator}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          align="center"
          width="130">
          <template slot-scope="scope">
            <p class="name">{{ scope.row.createTime }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="80">
          <template slot-scope="scope">
                <el-button icon="el-icon-edit" type="danger" circle  @click="editStaff(scope.row)" data-code="10030003"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    </div>
    <div class="pagin">
          <span class="total">共 {{count}} 名员工</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total=count>
          </el-pagination>
      </div>
     <el-dialog
    :visible.sync="showAddStaff"
      width="35%"
      :before-close="handleClose" class="import-dialog">
        <div slot="title" class="left-title">
          <span class="top">新员工</span>
        </div>
        <add-staff  @refresh="refresh" @cancel="cancel" ref="clean" v-if='showAddStaff'></add-staff>
    </el-dialog>
    <el-dialog
    :visible.sync="showEditStaff"
      width="35%"
      :before-close="handleClose2" class="import-dialog">
        <div slot="title" class="left-title">
          <span class="top">修改员工</span>
        </div>
          <add-staff :staffID="staffId" @refresh="refresh" @cancel="cancel" :type="change" v-if="showEditStaff"></add-staff>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import search from '../../../components/public/search'
import topOperate from '../../../components/store/storetopOperate'
import storeCommodityItem from '../../../components/store/storeCommodityItem'
import addStaff from '../../../components/store/addStaff'
import { judgeButton } from '../../../tool/Utils'
export default {
  data () {
    return {
      change: 'change',
      loading: false,
      startloading: false,
      endloading: false,
      checkAllStaff: false,
      showAddStaff: false,
      showEditStaff: false,
      optionTop: {
        type: '1'
      },
      staffId: '',
      count: 0,
      status: [],
      breadcrumbList: [
        { title: '门店管理', path: '/commodity' },
        { title: '新门店', path: '' }
      ],
      tableData: [],
      jsonData: '',
      // 列表声明一个空对象
      staffvo: {
        staffId: '',
        staffName: '',
        mobile: '',
        state: ''
      },
      currentPage: 1,
      pagesize: 10
    }
  },
  computed: {
    ...mapGetters(['powerButton']),
    itemsChoose () {
      let isAllSele = []
      this.tableData.forEach(item => {
        if (item.isChooe === false) {
          isAllSele.push(false)
        }
      })
      return isAllSele
    }
  },
  watch: {
    checkAllStaff () {
      this.checkAll(this.checkAllStaff)
    },
    itemsChoose: {
      handler (newValue, oldValue) {
        if (newValue.length === 0 && this.tableData.length > 0) {
          this.checkAllStaff = true
        } else if (newValue.length === this.tableData.length) {
          this.checkAllStaff = false
        } else if (newValue.length !== 0 && newValue.length < this.tableData.length) {
          this.checkAllStaff = false
        }
      },
      deep: true
    }
  },
  // 数据初始化方法
  mounted () {
    this.getStStaffList()
    this.getButton()
  },
  methods: {
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    editStaff (value) {
      this.showEditStaff = true
      console.log("...........", value);
      this.staffId = value
    },
    addNewStaff () {
      this.showAddStaff = true
    },
    handleClose () {
      this.showAddStaff = false
      this.$refs.clean.cleanFrom()
    },
    handleClose2 () {
      this.showEditStaff = false
    },
    // 根据姓名进行模糊搜素
    searchValue (value) {
      this.staffvo.staffName = value
      this.currentPage = 1
      this.loading = true
      this.getStStaffList()
    },
    // 关闭弹窗刷新页面
    refresh () {
      this.showAddStaff = false
      this.showEditStaff = false
      this.getStStaffList()
    },
    // 取消关闭
    cancel () {
      this.showAddStaff = false
      this.showEditStaff = false
      this.getStStaffList()
    },
    // 分页查询
    getStStaffList () {
      var _this = this
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        staffvo: this.staffvo
      }
      this.$api.getStStaffList(params).then(res => {
        if (res.code === 0) {
          res.data.forEach(function (staff) {
            var str = staff.createTime.substring(0, 10)
            staff.createTime = str
            staff.isChooe = false
          })
          _this.tableData = res.data
          _this.count = res.count
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getStStaffList()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getStStaffList()
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    // 全选
    checkAll (param) {
      if (param) {
        this.tableData.forEach(el => {
          el.isChooe = true
        })
      } else if (this.itemsChoose.length === 0 && !param) {
        this.tableData.forEach(el => {
          el.isChooe = false
        })
      }
    },
    // 批量启用
    batchEnable () {
      this.$confirm('此操作将员工状态改为在职 , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var flag = false
        this.tableData.forEach(el => {
          if (el.isChooe) {
            flag = true
            this.staffvo.staffId = el.staffId + ','
            this.jsonData += this.staffvo.staffId
          }
        })
        if (!flag) {
          this.$message.error('请至少选择一位员工进行启用')
        } else {
          this.startloading = true
          let params = {
            staffId: this.jsonData
          }
          this.$api.modifyopenstaff(params).then(res => {
            if (res.code === 0) {
              this.$message({
                message: '批量启用成功',
                type: 'success'
              })
              this.startloading = false
              this.getStStaffList()
            } else {
              this.startloading = false
              this.getStStaffList()
              this.$message.error(res.msg)
            }
            this.jsonData = ''
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用操作'
        })
      })
    },
    // 批量停用
    batchDisable () {
      this.$confirm('此操作将员工状态改为离职, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var flag = false
        this.tableData.forEach(el => {
          if (el.isChooe) {
            flag = true
            this.staffvo.staffId = el.staffId + ','
            this.jsonData += this.staffvo.staffId
          }
        })
        if (!flag) {
          this.$message.error('请至少选择一位员工进行停用')
        } else {
          this.endloading = true
          let params = {
            staffId: this.jsonData
          }
          this.$api.modifystopstaff(params).then(res => {
            if (res.code === 0) {
              this.$message({
                message: '批量停用成功',
                type: 'success'
              })
              this.endloading = false
              this.getStStaffList()
            } else {
              this.endloading = false
              this.getStStaffList()
              this.$message.error(res.msg)
            }
            this.jsonData = ''
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用操作'
        })
      })
    }
  },
  components: {search, topOperate, storeCommodityItem, addStaff}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.commodity {
  margin: 0 auto;
  padding-top: 106px;
  .top-search{
    display: flex;
    justify-content: space-between;
    .busi-btns {
        .btn {
          padding: 9px 20px;
          &.newcom-btn {
            margin-left: 0px;
            background: $blue-color;
            border-color: $blue-color;
            color: #fff;
            &:focus,
            &:hover {
              background: lighten($blue-color, 6%);
              border-color: lighten($blue-color, 6%);
            }
          }
          &.import-btn {
            background: $yello-color;
            border-color: $yello-color;
            color: #fff;
            &:focus,
            &:hover {
              background: lighten($yello-color, 6%);
              border-color: lighten($yello-color, 6%);
            }
          }
        }
    }
  }
  .portrait{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .name{
    color: $text-main-color;
    font-size: $xlg-size;
    margin-bottom: 10px;
  }
  .state{
    border-radius: 4px ;
    padding: 2px 6px;
    background: $main-color;
    color:#fff;
  }
  .state2{
    border-radius: 4px ;
    padding: 2px 6px;
    background-color:#424552;
    color:#fff;
  }
  .edit{
    border: 0;
    background: none;
    color: $text-red-color;
  }
  .title{
    display: flex;
    font-size: $xs-size;
    color:$text-main-color;
    background: $child-nav-bg;
    padding: 10px 0;
    border-bottom:1px solid $border-color;
    span{
      font-weight: 700;
      line-height: 23px;
      &:nth-child(1){
        width: 122px;
        padding-left: 42px;
      }
      &:nth-child(2){
        padding-left: 15px;
      }
    }
  }
}
.operate {
  border: 1px solid $border-color;
  padding: 6px 10px;
  margin: 20px 0 10px 0;
  border-radius: 4px;
  font-size: $xs-size;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .letf-op {
      display: flex;
      .el-checkbox {
        &:nth-child(2) {
          margin-left: 25px;
        }
      }
      .comm-up {
        position: relative;
        margin-left: 25px;
        display: flex;
        align-items: center;
        button {
          margin-right: 18px;
          cursor: pointer;
          background-color: #fff;
          display: flex;
          align-items: center;
          i {
            display: inline-block;
            width: 15px;
            height: 15px;
            margin-right: 5px;
          }
          .enable{
            background: url('../../../assets/image/icon/enable.png') no-repeat;
            background-size: contain;
          }
          .disable{
            background: url('../../../assets/image/icon/disable.png') no-repeat;
            background-size: contain;
          }
          &:hover {
            color: $main-color;
          }
        }
      }
    }
    .right-op {
      .up{
        cursor: pointer;
      }
      button {
        padding: 5px 10px;
        &.history-btn {
          border: 0;
        }
        &.import-btn {
          border-color: $blue-color;
          background-color: $blue-color;
          color: #fff;
          &:hover {
            border-color: lighten($blue-color, 6%);
            background-color: lighten($blue-color, 6%);
          }
        }
      }
    }
  }
}
</style>
