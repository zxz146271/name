<template>
  <div class="comm-edit">
    <!-- <div class="top">
      <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb>
    </div> -->
    <div class="form-block">
      <top-tips :title="necessary"></top-tips>
    </div>
     <div class="info-cont">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
        label="单号"
        align="center">
          <template slot-scope="scope">
            <p class="odd">{{scope.row.orderNum}}</p>
            <span class="small">{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="reservationDate"
          label="送货/提货日期"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          label="收货信息">
          <template slot-scope="scope">
            <p>{{scope.row.consignee}} {{scope.row.consigneeMobile}}</p>
            <span>{{scope.row.provinceAdcode}}{{scope.row.detailAddress}} </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="总金额">
          <template slot-scope="scope">
            <p>¥ : {{scope.row.totalMoney}}</p>
            <span class="small">{{scope.row.moneyState}} / {{scope.row.careAppraise}}</span>
          </template>
        </el-table-column>
         <el-table-column
          align="center"
          label="备注"
          width="200">
          <template slot-scope="scope" >
            <span v-if="scope.row.careRemark != null && scope.row.careRemark.length > 11" >{{scope.row.careRemark.substring(0, 10)}}......</span>
            <span v-else>{{scope.row.careRemark}}</span>
            <div class="edit">
            <el-button icon="el-icon-edit" type="danger" circle  @click="importCommodity(scope.row)"></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagin">
          <span class="total">共 {{count}} 条订单</span>
           <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total=count>
          </el-pagination>
      </div>
    </div>
    <el-dialog
      :visible.sync="importComm"
        width="35%"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">添加备注</span>
          </div>
        <remarks :careOrder="careOrder" @refresh="refresh" ref="clean"></remarks>
  </el-dialog>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
import remarks from '../../../components/order/remarks'
export default {
  data () {
    return {
      count: 0,
      currentPage: 1,
      pagesize: 10,
      importComm: false,
      isDdit: false,
      breadcrumbList: [
        {title: '需要关怀的订单', path: '/order/careManage'}
      ],
      necessary: {
        title: '发货已7天订单',
        unfold: false,
        text: '列表中的产品只保留3天'
      },
      tableData: [],
      careOrder: {}
    }
  },
  // 数据初始化方法
  mounted () {
    this.getStCareOrderList()
  },
  methods: {
    importCommodity (value) {
      this.careOrder = value
      this.importComm = true
    },
    handleClose () {
      this.importComm = false
      this.$refs.clean.cleanFrom()
    },
    refresh () {
      this.importComm = false
      this.tableData = []
      this.getStCareOrderList()
    },
    getStCareOrderList () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize
      }
      this.$api.getStCareOrderList(params).then(res => {
        if (res.code === 0) {
          if (res.data) {
            this.count = res.count
            res.data.forEach(el => {
              var str = el.createTime.substring(0, 10)
              if (el.reservationDate) {
                var str1 = el.reservationDate.substring(0, 10)
              }
              el.createTime = str
              el.reservationDate = str1
              if (el.provinceAdcode) {
                JSON.parse(el.provinceAdcode).forEach(els => {
                  if (el.provinceAdcode.indexOf('[') !== -1) {
                    el.provinceAdcode = ''
                    el.provinceAdcode = els
                  } else {
                    el.provinceAdcode += els
                  }
                })
              }
              this.tableData.push(el)
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.tableData = []
      this.getStCareOrderList()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.tableData = []
      this.getStCareOrderList()
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    }

  },
  components: {breadCrumb, topTips, remarks}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
@import '../../../assets/style/components/elbtn';
.comm-edit{
  margin:0 auto;
  padding-top: 106px;
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
  .form-block{
    margin: 0 0 30px 0;
  }
  .info-cont{
    .odd{
      font-size: $md-size;
      font-weight: 700;
    }
    .small{
      color: $text-adorn-color;
    }
    .edit{
      &:hover{
        i{
          display: inline-block;
        }
      }
      i{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: $text-red-color;
        text-align: center;
        line-height: 20px;
        color: #fff;
        margin-left: 10px;
        cursor: pointer;
        display: none;
      }
    }
  }
  .import-dialog{
    .left-title{
      position: absolute;
      color:#fff;
      left: 0;
      .bottom{
        position: absolute;
        width:90px;
        height:28px;
        left:0;
        z-index: 10;
        background-color: $main-color;
        &::after{
          content: '';
          @include triangle-right(14px,12px,$main-color);
          position: absolute;
          right:-24px;
        }
      }
      .top{
          position: relative;
          width:82px;
          height:28px;
          display: inline-block;
          background-color: $gray-color;
          line-height: 28px;
          text-align: center;
          color:$text-main-color;
          font-size: $xs-size;
          &::after{
            content: '';
            @include triangle-right(14px,12px,$gray-color);
            position: absolute;
            right:-24px;
          }
          &::before{
            content: '';
            position: absolute;
            left:0px;
            width: 4px;
            background-color: $main-color;
            height: 100%;
          }
        }
    }
  }
}

</style>
