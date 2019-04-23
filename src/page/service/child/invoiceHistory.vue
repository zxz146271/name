<template>
  <div class="manage balck-th">
    <div class="title">
      <div class="top">
         <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb>
         </div>
      <!-- <search @searchValue="searchValue"></search> -->
    </div>
    <div class="top-manage">
      <span>所有发票</span>
      <div>
      </div>
    </div>
    <el-table
    v-loading="loading"
    ref="multipleTable"
    :data="serviceHistoryInfo"
    tooltip-effect="dark"
    style="width: 100%">
    <el-table-column
      label="时间"
      prop="applyDate"
      align="center"
      width="170">
    </el-table-column>
    <el-table-column
      prop="applyMoney"
      label="申请金额"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      prop="serviceList"
      align="center"
      width="180"
      label="对应订单">
    </el-table-column>
    <el-table-column
      prop="distributorName"
      label="发票抬头"
      align="center">
    </el-table-column>
     <el-table-column
      prop="isVat"
      label="发票类型"
      align="center">
    </el-table-column>
     <el-table-column
      prop="distributorAddress"
      label="收货地址"
      align="center"
      width="300">
    </el-table-column>
     <el-table-column
      prop="invoiceState"
      label="进度"
      align="center">
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
  </div>
</template>
<script>
import search from '../../../components/public/search'
import addRole from '../../../components/role/addRole'
import editRole from '../../../components/role/editRole'
import breadCrumb from '../../../components/public/breadcrumb'
export default{
  data () {
    return {
      breadcrumbList: [
        {title: '发票申请', path: '/service/serviceInvoices'},
        {title: '发票申请历史', path: ''}
      ],
      serviceHistoryInfo: [],
      totalCount: 0, // 默认数据总数
      currentPage: 1,
      pagesize: 10,
      loading: false
    }
  },
  mounted () {
    this.getInvoiceHistory()
  },
  methods: {
    // searchValue (val) {
    //   this.roleName = val
    //   this.getListData()
    // },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getListData()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getListData()
    },
    getInvoiceHistory () {
      this.loading = true
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        roleName: this.roleName
      }
      this.$api.getInvoiceHistory(params).then(res => {
        if (res.data != null) {
          this.serviceHistoryInfo = res.data
          this.serviceHistoryInfo.forEach(item => {
            if (item.invoiceState === '0') {
              item.invoiceState = '审核中'
            } else if (item.invoiceState === '1') {
              item.invoiceState = '已开票'
            }
            // 如果是纸质发票 将发票类型和地址合并
            if (item.isVat === 'common') {
              item.isVat = '普通发票'
            } else if (item.isVat === 'added') {
              item.isVat = '增值税发票'
            }
          })
          this.loading = false
          this.totalCount = res.count
        } else {
          this.loading = false
        }
      })
    }
  },
  components: {search, addRole, editRole, breadCrumb}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.manage{
  min-height: 100%;
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
  .top{
    .change-sort{
      text-align: center;
      margin-top: 16px;
      .sort{
        display: inline-block;
        margin:0 8px;
        li{
          display: inline-block;
          &:nth-child(n+2)::before{
            content: '>',
          }
        }
      }
      .change{
        padding:5px 12px;
        color:$text-gray-color;
        &:hover{
          color:$main-color;
        }
      }
    }
  }
}
</style>
