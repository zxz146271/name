<template>
  <div class="box-manage">
    <div class="title">
      <div class="item">
        <div class="label">状态</div>
        <el-select v-model="type" placeholder="状态" @change="changeLableType(type)">
          <el-option
            v-for="item in condition"
            :key="item.type"
            :label="item.title"
            :value="item.type">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <div class="label">蘑盒</div>
        <el-select v-model="selectBox" placeholder="全部蘑盒" @change="changeBox(selectBox)" multiple>
          <el-option
            v-for="item in boxList"
            :key="item.boxName"
            :label="item.boxName"
            :value="item.boxId">
          </el-option>
        </el-select>
      </div>
      <div class="item right-item">
        <search @searchValue="searchValue" :load="loading" class="search"></search>
      </div>
      <div class="item">
        <div class="label">门店</div>
        <el-select v-model="store" placeholder="全部门店" @change="changeStore(store)" multiple>
          <el-option
            v-for="item in sotreList"
            :key="item.storeId"
            :label="item.storeName"
            :value="item.storeId">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <div class="label">时间</div>
        <el-date-picker
          v-model="dateTime"
          type="datetimerange"
          range-separator="~"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right" @change="changeTime">
        </el-date-picker>
      </div>
    </div>
    <div class="label-role">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="70">
      </el-table-column>
      <el-table-column
        prop="devMac"
        label="MAC地址"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="brand"
        label="手机型号"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="lasttime"
        label="获取时间"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号码"
          align="center"
          :formatter="formatVal"
          width="100">
        </el-table-column>
      <el-table-column
        prop="successCount"
        label="成功发送短信/次"
        align="center">
      </el-table-column>
      <el-table-column
        prop="boxName"
        label="蘑盒名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="storeName"
        label="门店"
        align="center">
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
</template>
<script>
import search from '../../../components/public/search'
export default {
  data () {
    return {
      sotreList: [],
      store: [],
      queryValue: '',
      dateTime: [],
      loading: false,
      importNew: false,
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      count: 0,
      labelRulesDetail: {},
      id: '',
      type: '',
      selectBox: [],
      boxList: [],
      condition: [
        {
          type: '',
          title: '全部'
        },
        {
          type: 'success',
          title: '发送短信成功'
        }
        // {
        //   type: '2',
        //   title: '发送短信失败'
        // }
      ]
    }
  },
  mounted () {
    this.getAllBox()
    this.getMyStoreList()
    this.findBoxMaxPhoneVoByPage()
  },
  methods: {
    formatVal (row, column, cellValue, index) {
      if (cellValue == null || cellValue == '') {
        cellValue = '一'
        return cellValue
        console.log(cellValue)
      }
    },
    getAllBox () {
      this.$api.getAllBox().then(res => {
        if (res.code === 0) {
          // let all = {
          //   boxId: '',
          //   boxName: '全部'
          // }
          // this.boxList = [all, ...res.data]
          this.boxList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getMyStoreList () {
      this.$api.findStoreListByUid().then(res => {
        if (res.code === 0) {
          // let all = {
          //   storeId: '',
          //   storeName: '全部'
          // }
          // this.sotreList = [all, ...res.data]
          this.sotreList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    findBoxMaxPhoneVoByPage () {
      let params = {
        storeId: this.store.join(','),
        page: this.currentPage,
        limit: this.pagesize,
        sendStatus: this.type,
        startDate: this.dateTime ? this.dateTime[0] : '',
        endDate: this.dateTime ? this.dateTime[1] : '',
        boxId: this.selectBox.join(','),
        queryValue: this.queryValue
      }
      this.$api.findBoxMaxPhoneVoByPage(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
          this.count = res.count
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    changeTime (value) {
      console.log(value)
      this.dateTime = value
      this.findBoxMaxPhoneVoByPage()
    },
    changeStore (val) {
      this.store = val
      this.findBoxMaxPhoneVoByPage()
    },
    addTml () {
      this.$router.push({path: '/marketing/magicBox/addSMSTemplate'})
    },
    // 改变标签类型
    changeLableType (index) {
      console.log(index)
      this.type = index
      this.findBoxMaxPhoneVoByPage()
    },
    changeBox (index) {
      this.selectBox = index
      console.log(this.selectBox.join(','))
      this.findBoxMaxPhoneVoByPage()
    },
    // 模糊查询
    searchValue (value) {
      this.loading = true
      this.queryValue = value
      this.findBoxMaxPhoneVoByPage()
    },
    handleSizeChange (pagesize) {
      this.pagesize = pagesize
      this.findBoxMaxPhoneVoByPage()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.findBoxMaxPhoneVoByPage()
    },
    deleteTpl (index) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消!'
        })
      })
    }
  },
  components: { search }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.title{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 0 30px 0;
    .item{
      margin-right: 54px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .label{
        font-size:14px;
        color:rgba(51,51,51,1);
        margin-right: 15px;
      }
    }
    .right-item{
      margin-right: 0;
      margin-left: 40px;
    }
    .search{
      width: 345px;
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
