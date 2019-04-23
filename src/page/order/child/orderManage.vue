<template>
  <div class="order-manage">
    <!-- <div class="left-view">
      <left-condition :condition="condition" @chooseThis="chooseThis"></left-condition>
    </div> -->
    <div class="right-view">
      <div class="top-search">
        <div class="serch-left">
          <el-select v-model="type" placeholder="请选择" @change="changeOrderType(type)">
            <el-option
              v-for="item in condition"
              :key="item.type"
              :label="item.title"
              :value="item.type">
            </el-option>
          </el-select>
          <search @searchValue="searchValue" :load="loading" class="search"></search>
        </div>
        <div class="busi-btns">
          <el-button class="btn import-btn" @click="addOrder" data-code="6010001" v-if="orderType == 'ORDER'">+新订单</el-button>
        </div>
      </div>
      <!-- <top-operate :option="optionTop" @exportExcel="exportExcel" @checkAll="checkAll" @desc="desc" @asc="asc" @defualdesc="defualdesc" @defualasc="defualasc"></top-operate> -->
      <div class="operate">
        <div class="item">
          <div class="letf-op">
            <el-checkbox v-model="checkAllOrder">全选</el-checkbox>
          </div>
          <div>
          <div class="middle-op">
            <span class="sort" @click="toggle">开始时间
              <i v-bind:class="{'up': isA}"></i>
              <i v-bind:class="{'down': !isA}"></i>
            </span>
            <span class="sort" @click="toggle2">送货时间
              <i v-bind:class="{'up': isB}"></i>
              <i v-bind:class="{'down': !isB}"></i>
            </span>
          </div>
          </div>
          <div class="right-op">
            <el-button class="import-btn" @click="exportExcel"><i class="el-icon-printer"></i> 导出</el-button>
          </div>
        </div>
      </div>
      <div class="comm-list">
        <!-- <commodity-item v-for="(item, index) in 6" :key="index"></commodity-item> -->
        <orderManage-item v-for="(item, index) in stStoreOrderList" :key="index" :item="item" @refresh1="refresh1" :orderType="orderType"></orderManage-item>
      </div>
      <div class="pagin">
          <span class="total">共{{totalCount}}条数据</span>
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
    <!-- <el-dialog
      :visible.sync="importComm"
        width="78%"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">导入商品</span>
          </div>
          <steps @refresh=refresh></steps>
    </el-dialog> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import search from '../../../components/public/search'
import leftCondition from '../../../components/public/leftCondition'
// import steps from '../../../components/public/steps'
// import topOperate from '../../../components/order/orderTopOperate'
import orderManageItem from '../../../components/order/orderManageItem'
import {exportJsonExcel} from '../../../vendor/Export2Excel'
import { judgeButton, getStore } from '../../../tool/Utils'
export default{
  data () {
    return {
      loading: false,
      checkAllOrder: false,
      importComm: false,
      active: 0,
      optionTop: {
        type: '1'
      },
      order: {
        orderId: this.$route.query.orderId,
        state: '',
        rank: 'defualdesc'
      },
      list: [
        {
          name: '韩版设计时尚风衣大',
          number: 'MPM00112',
          salePrice: '￥999.00',
          stocknums: 3423,
          salesnums: 3423,
          sharenums: 3423
        }
      ],
      isA: false,
      num: true,
      isB: true,
      type: 0,
      condition: [
        {
          type: 0,
          title: '全部订单',
          isActive: true
          // num: 15
        },
        {
          type: 1,
          title: '待付款',
          isActive: false
          // num: 10
        },
        {
          type: 2,
          title: '待发货',
          isActive: false
          // num: 20
        },
        // {
        //   type: 4,
        //   title: '部分发货',
        //   isActive: false,
        //   num: 15
        // },
        {
          type: 3,
          title: '已发货',
          isActive: false
          // num: 0
        },
        {
          type: 4,
          title: '已完成',
          isActive: false
          // num: 8
        },
        // {
        //   type: 5,
        //   title: '退货中',
        //   isActive: false
        //   // num: 0
        // },
        {
          type: 6,
          title: '已取消',
          isActive: false
          // num: 6
        },
        {
          type: 7,
          title: '部分付款',
          isActive: false
          // num: 10
        },
        {
          type: 8,
          title: '部分发货',
          isActive: false
          // num: 10
        }
      ],
      totalCount: 0,
      currentPage: 1,
      pagesize: 10,
      // 列表声明一个空数组
      stStoreOrderList: [],
      tableData2: [],
      orderType: ''
    }
  },
  // 数据初始化方法
  mounted () {
    this.getStStoreOrderList()
    this.getButton()
  },
  watch: {
    checkAllOrder () {
      this.checkAll(this.checkAllOrder)
    },
    itemsChoose: {
      handler (newValue, oldValue) {
        if (newValue.length === 0 && this.stStoreOrderList.length > 0) {
          this.checkAllOrder = true
        } else if (newValue.length === this.stStoreOrderList.length) {
          this.checkAllOrder = false
        } else if (newValue.length !== 0 && newValue.length < this.stStoreOrderList.length) {
          this.checkAllOrder = false
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['powerButton']),
    itemsChoose () {
      let isAllSele = []
      this.stStoreOrderList.forEach(item => {
        if (item.isChooe === false) {
          isAllSele.push(false)
        }
      })
      return isAllSele
    }
  },
  created () {
    this.getOrderStyle()
  },
  methods: {
    getOrderStyle () {
      let storeId = getStore('storeIdWeb')
      let params = {
        storeId: storeId
      }
      this.$api.getOrderStyle(params).then(res => {
        if (res.code === 0) {
          this.orderType = res.data
        }
      })
    },
    // 模糊查询
    searchValue (value) {
      this.order.orderId = value
      this.currentPage = 1
      this.loading = true
      this.getStStoreOrderList()
    },
    changeOrderType (index) {
      if (index === 0) {
        this.order.state = ''
      } else {
        this.order.state = index + ''
      }
      this.getStStoreOrderList()
    },
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    refresh1 () {
      this.getStStoreOrderList()
    },
    toggle () {
      this.isA = !this.isA
      if (this.num) {
        this.num = false
        this.order.rank = 'defualdesc'
      } else {
        this.num = true
        this.order.rank = 'defualasc'
      }
      this.getStStoreOrderList()
    },
    toggle2 () {
      this.isB = !this.isB
      if (this.num) {
        this.num = false
        this.order.rank = 'desc'
      } else {
        this.num = true
        this.order.rank = 'asc'
      }
      this.getStStoreOrderList()
    },
    // refresh () {
    //   this.getStStoreOrderList()
    // },
    // 获取订单信息列表
    getStStoreOrderList (value) {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        order: this.order
      }
      this.$api.getStStoreOrderList(params).then(res => {
        if (res.code === 0) {
          this.loading = false
          this.totalCount = res.count
          res.data.forEach(function (order) {
            var str = order.createTime.substring(0, 10)
            if (order.reservationDate) {
              var str1 = order.reservationDate.substring(0, 10)
            }
            order.createTime = str
            order.reservationDate = str1
            if (order.provinceAdcode) {
              JSON.parse(order.provinceAdcode).forEach(el => {
                if (order.provinceAdcode.indexOf('[') !== -1) {
                  order.provinceAdcode = ''
                  order.provinceAdcode = el
                } else {
                  order.provinceAdcode += el
                }
              })
            }
            order.isChooe = false
            order.Address = order.provinceAdcode + order.detailAddress
            if (order.state === '1') {
              order.type = '待付款'
            } else if (order.state === '2') {
              order.type = '待发货'
            } else if (order.state === '3') {
              order.type = '已发货'
            } else if (order.state === '4') {
              order.type = '已完成'
            } else if (order.state === '5') {
              order.type = '退货中'
            } else {
              order.type = '已关闭'
            }
          })
          this.stStoreOrderList = res.data
        } else {
          this.loading = false
          this.$message.error(res.msg)
        }
      })
    },
    // 全选
    checkAll (param) {
      if (param) {
        this.stStoreOrderList.forEach(el => {
          el.isChooe = true
        })
      } else if (this.itemsChoose.length === 0 && !param) {
        this.stStoreOrderList.forEach(el => {
          el.isChooe = false
        })
      }
    },
    addOrder () {
      this.$router.push({path: '/myStore/order/orderAdd'})
    },
    handleClose () {
      this.importComm = false
    },
    // chooseThis (index) {
    //   if (index === 0) {
    //     this.order.state = ''
    //   } else {
    //     this.order.state = index + ''
    //   }
    //   this.getStStoreOrderList()
    // },
    // desc () {
    //   this.order.rank = 'desc'
    //   this.getStStoreOrderList()
    // },
    // asc () {
    //   this.order.rank = 'asc'
    //   this.getStStoreOrderList()
    // },
    // defualdesc () {
    //   this.order.rank = 'defualdesc'
    //   this.getStStoreOrderList()
    // },
    // defualasc () {
    //   this.order.rank = 'defualasc'
    //   this.getStStoreOrderList()
    // },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getStStoreOrderList()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getStStoreOrderList()
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 表格导出
    exportExcel () {
      this.$emit('exportExcel')
      const tHeader = ['订单号', '开单日期', '收货人', '收货人电话', '收货人地址', '收货日期', '总金额', '已交付金额', '未交付金额', '订单状态', '开单门店', '开单人']
      const filterVal = ['orderNum', 'createTime', 'consignee', 'consigneeMobile', 'Address', 'reservationDate', 'totalMoney', 'accountPaid', 'nonPayment', 'type', 'storeName', 'staffName']
      var flag = false
      this.stStoreOrderList.forEach(el => {
        if (el.isChooe) {
          flag = true
          this.tableData2.push(el)
        }
      })
      if (!flag) {
        this.$message.error('请至少选择一条订单信息进行导出')
      } else {
        const data = this.formatJson(filterVal, this.tableData2)
        exportJsonExcel(tHeader, data, '订单管理列表')
      }
    }
  },
  components: {search, orderManageItem, leftCondition}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.order-manage{
  margin:0 auto;
  display: flex;
  padding-top: 126px;
  .left-view{
    border:1px solid $border-color;
    flex:0 0 156px;
    padding: 21px 0 10px 36px;
    height:370px;
    border-radius: 4px;
  }
  .right-view{
    flex:1;
    // margin-left: 10px;
    .top-search{
      display: flex;
      justify-content: space-between;
      .serch-left{
        display: flex;
        align-items: center;
        .search{
          margin-left: 15px;
        }
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
  }
  .import-dialog{
    .left-title{
      position: absolute;
      left: 0;
      color:#fff;
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
        span {
          margin-right: 18px;
          cursor: pointer;
          i {
            font-size: 14px;
            position: relative;
            top: 1px;
            margin-right: 2px;
          }
          &:hover {
            color: $main-color;
          }
        }
      }
    }
    .right-op {
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
    .middle-op {
      span {
        margin: 0 10px;
      }
    }
    .sort {
      cursor: pointer;
      i.up {
        position: relative;
        top: 2px;
        margin-left: 4px;
        @include icon(9px,14px,'../../../assets/image/icon/icon-price-up.png');
      }
      i.down {
        position: relative;
        top: 2px;
        margin-left: 4px;
        @include icon(9px,14px,'../../../assets/image/icon/icon-price-down.png');
      }
    }
  }
}
}
</style>
