<template>
  <div class="">
    <div class="top">
      <!-- <div class="item">
        <div class="label">蘑盒</div>
        <el-select v-model="selectBox" placeholder="蘑盒名称" @change="changeBox(selectBox)">
          <el-option
            v-for="item in boxList"
            :key="item.boxName"
            :label="item.boxName"
            :value="item.boxId">
          </el-option>
        </el-select>
      </div> -->
      <div class="item">
        <div class="label">时间</div>
        <el-date-picker
          v-model="dateTime"
          type="daterange"
          range-separator="~"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right" @change="changeTime" style="width:380px;">
        </el-date-picker>
      </div>
      <div class="item">
        <search @searchValue="searchValue" :load="loading" class="search" :placeholder="placeholder"></search>
      </div>
      <div class="item">
        <div class="busi-btns">
          <el-button class="btn newcom-btn" @click="addTml">新增短信推送</el-button>
      </div>
      </div>
    </div>
    <!-- <div class="title">
      <div class="busi-btns">
          <el-button class="btn newcom-btn" @click="addTml">新增短信推送</el-button>
      </div>
    </div> -->
    <div class="label-role">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="labTypeName"
        type="index"
        label="序号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="templateName"
        label="选择模版"
        align="center">
      </el-table-column>
      <el-table-column
        prop="brands"
        label="选择设备类型"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="sendNum"
        label="发送短信数量"
        align="center">
      </el-table-column>
      <el-table-column
        prop="sendTime"
        label="发送短信时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="storeName"
        label="门店"
        align="center">
      </el-table-column>
      <el-table-column label="状态" align="center" prop="eventStatus">
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
      placeholder: '请输入短信模板名称搜索',
      queryValue: '',
      dateTime: [],
      boxList: [],
      selectBox: '',
      loading: false,
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      count: 0
    }
  },
  mounted () {
    this.getAllBox()
    this.getSMSSendList()
  },
  methods: {
    getAllBox () {
      this.$api.getAllBox().then(res => {
        if (res.code === 0) {
          this.boxList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeBox (index) {
      this.selectBox = index
      this.getSMSSendList()
    },
    changeTime (value) {
      this.dateTime = value
      this.getSMSSendList()
    },
    // 模糊查询
    searchValue (value) {
      this.loading = true
      this.queryValue = value
      this.getSMSSendList()
    },
    getSMSSendList () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        templateName: this.queryValue,
        startDate: this.dateTime? this.dateTime[0] : '',
        endDate: this.dateTime? this.dateTime[1] : ''
      }
      this.$api.getSMSSendList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
          this.tableData.forEach(item => {
            if (item.eventStatus === 'ready') {
              item.eventStatus = '未开始'
            } else if (item.eventStatus === 'start') {
              item.eventStatus = '已开始'
            } else if (item.eventStatus === 'pause') {
              item.eventStatus = '已暂停'
            } else if (item.eventStatus === 'finish') {
              item.eventStatus = '已结束'
            }
          })
          this.count = res.count
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    addTml () {
      this.$router.push({path: '/marketing/magicBox/addSMSPush'})
    },
    handleSizeChange (pagesize) {
      this.pagesize = pagesize
      this.getSMSSendList()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getSMSSendList()
    }
  },
  components: { search }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.top{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .item{
    display: flex;
    justify-content: center;
    align-items: center;
    .label{
      width: 40px;
      font-size:14px;
      color:rgba(51,51,51,1);
      text-align: center;
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
  .search{
    margin-left: 20px;
    width: 320px;
  }
}
.title{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px 0;
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
