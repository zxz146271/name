<template >
  <div class="order-list" >
     <!-- 代收款 -->
    <div class="order-item type0" v-if="'1' === item.state">
      <div class="top-info">
        <div class="item flex_170">
          <el-checkbox class="comm-check" v-model="item.isChooe" ></el-checkbox>
          <div class="mg-left">
            <p class="serial"><router-link :to="{path:'/myStore/order/easyShipDetail', query: {orderId: item.orderId}}">{{item.orderNum}}</router-link></p>
            <p class="gray-color">{{item.orderTime}}</p>
            <p class="gray-color">门店 : {{item.storeName}}</p>
            <p class="gray-color">开单人 : {{item.staffName}}</p>
            <p class="gray-color">销售凭证号 : {{item.salesVoucherNum}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">送货／提货日期：</p>
            <p>{{item.reservationDate}}</p>
          </div>
        </div>
        <div class="item">
          <div>
            <p class="title">收货信息：</p>
            <div>
              <p>{{item.consignee}}  {{item.consigneeMobile}}</p>
              <p>{{item.districtAdcode}}{{item.detailAddress}}</p>
            </div>
          </div>
        </div>
        <div class="item flex_100">
          <div>
            <p class="title">总金额：</p>
            <p>¥{{item.totalMoney}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">已交付金额：</p>
            <p class="blue-color">¥{{item.accountPaid}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">未交付金额：</p>
            <p class="red-color">¥{{item.nonPayment}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-op">
        <div><span class="note">待付款</span>
        </div>
        <div>
          <el-button class="butn" @click="lookorder(item.orderId)" data-code="6030006"> <i class="el-icon-edit-outline"></i>查看</el-button>
          <el-button class="butn" @click="orderEdit(item.orderId)" data-code="6030005"> <i class="el-icon-edit-outline"></i> 编辑</el-button>
          <el-button class="butn" @click="showReceipt(item)" data-code="6030002"> <i class="iconfont icon-receipt"></i>收款</el-button>
          <!-- <el-button class="butn" @click="shipments(item)" data-code="6030003" > <i class="iconfont icon-shipments"></i>发货</el-button> -->
          <!-- <el-button class="butn"> <i class="iconfont icon-print"></i>打印</el-button> -->
          <el-button class="butn" @click="colseAll(item)"  data-code="6030008" > <i class="iconfont el-icon-circle-close-outline"></i>取消订单</el-button>
        </div>
      </div>
    </div>
    <!-- 代发货 -->
    <div class="order-item type1" v-if="'2' === item.state">
      <div class="top-info">
        <div class="item flex_170">
          <el-checkbox class="comm-check" v-model="item.isChooe" ></el-checkbox>
          <div class="mg-left">
            <p class="serial"><router-link :to="{path:'/myStore/order/easyShipDetail', query: {orderId: item.orderId}}">{{item.orderNum}}</router-link></p>
            <p class="gray-color">{{item.orderTime}}</p>
            <p class="gray-color">门店 : {{item.storeName}}</p>
            <p class="gray-color">开单人 : {{item.staffName}}</p>
            <p class="gray-color">销售凭证号 : {{item.salesVoucherNum}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">送货／提货日期：</p>
            <p>{{item.reservationDate}}</p>
          </div>
        </div>
        <div class="item">
          <div>
            <p class="title">收货信息：</p>
            <div>
              <p>{{item.consignee}}  {{item.consigneeMobile}}</p>
              <p>{{item.districtAdcode}}{{item.detailAddress}}</p>
            </div>
          </div>
        </div>
        <div class="item flex_100">
          <div>
            <p class="title">总金额：</p>
            <p>¥{{item.totalMoney}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">已交付金额：</p>
            <p class="blue-color">¥{{item.accountPaid}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">未交付金额：</p>
            <p class="red-color">¥{{item.nonPayment}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-op">
        <div><span class="note" >待发货</span>
        </div>
        <div>
          <el-button class="butn" @click="lookorder(item.orderId)" data-code="6030006"> <i class="el-icon-edit-outline"></i>查看</el-button>
          <el-button class="butn" @click="orderEdit(item.orderId)" data-code="6030005"> <i class="el-icon-edit-outline"></i> 编辑</el-button>
          <el-button class="butn" @click="showReceipt(item)"  v-show="item.nonPayment != '0'" data-code="6030002"> <i class="iconfont icon-receipt"></i>收款</el-button>
          <el-button class="butn" @click="showRefund(item)"   v-show="item.accountPaid != '0'" data-code="6030002"> <i class="iconfont icon-receipt"></i>退款</el-button>
          <el-button class="butn" @click="shipments(item)" data-code="6030003" > <i class="iconfont icon-shipments"></i>发货</el-button>
          <!-- <el-button class="butn"> <i class="iconfont icon-print"></i>打印</el-button> -->
          <el-button class="butn" @click="colse(item)"  data-code="6030008" > <i class="iconfont el-icon-circle-close-outline"></i>取消订单</el-button>
        </div>
      </div>
    </div>
     <!-- 已发货 -->
    <div class="order-item type2" v-if="'3' === item.state">
      <div class="top-info">
        <div class="item flex_170">
          <el-checkbox class="comm-check" v-model="item.isChooe" ></el-checkbox>
          <div class="mg-left">
            <p class="serial"><router-link :to="{path:'/myStore/order/easyShipDetail', query: {orderId: item.orderId}}">{{item.orderNum}}</router-link></p>
            <p class="gray-color">{{item.orderTime}}</p>
            <p class="gray-color">门店 : {{item.storeName}}</p>
            <p class="gray-color">开单人 : {{item.staffName}}</p>
            <p class="gray-color">销售凭证号 : {{item.salesVoucherNum}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">送货／提货日期：</p>
            <p>{{item.reservationDate}}</p>
          </div>
        </div>
        <div class="item">
          <div>
            <p class="title">收货信息：</p>
            <div>
              <p>{{item.consignee}}  {{item.consigneeMobile}}</p>
              <p>{{item.districtAdcode}}{{item.detailAddress}}</p>
            </div>
          </div>
        </div>
        <div class="item flex_100">
          <div>
            <p class="title">总金额：</p>
            <p>¥{{item.totalMoney}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">已交付金额：</p>
            <p class="blue-color">¥{{item.accountPaid}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">未交付金额：</p>
            <p class="red-color">¥{{item.nonPayment}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-op">
        <div>
        <span class="note" >已发货</span>
        </div>
        <div>
          <el-button class="butn"  @click="lookorder(item.orderId)" data-code="6030006"><i class="el-icon-edit-outline"></i>查看</el-button>
          <el-button class="butn" @click="showReceipt(item)" v-show="item.nonPayment != '0'" data-code="6030002"><i class="iconfont icon-receipt"></i>收款</el-button>
          <el-button class="butn" @click="showRefund(item)"  v-show="item.accountPaid > '0'" data-code="6030002"> <i class="iconfont icon-receipt"></i>退款</el-button>
          <!-- <el-button class="butn"> <i class="iconfont icon-print"></i>打印</el-button> -->
          <!-- <el-button class="butn" @click="returnGood(item.orderId)" data-code="6030005" > <i class="iconfont icon-Refund"></i>退货</el-button> -->
          <el-button class="butn" @click="editTotalMoney(item)"  v-show="item.accountPaid > '0'" data-code="6030004"> <i class="iconfont icon-receipt"></i>变更价格</el-button>
          <el-button class="butn btn-type2" @click="confirm(item)" data-code="6030007" > <i class="el-icon-edit"></i>完成订单</el-button>
          <el-button class="butn" @click="colse(item)"  data-code="6030008" > <i class="iconfont el-icon-circle-close-outline"></i>取消订单</el-button>
        </div>
      </div>
    </div>
     <!-- 已完成 -->
    <div class="order-item type3" v-if="'4' === item.state">
      <div class="top-info">
        <div class="item flex_170">
          <el-checkbox class="comm-check" v-model="item.isChooe" ></el-checkbox>
          <div class="mg-left">
            <p class="serial"><router-link :to="{path:'/myStore/order/easyShipDetail', query: {orderId: item.orderId}}">{{item.orderNum}}</router-link></p>
            <p class="gray-color">{{item.orderTime}}</p>
            <p class="gray-color">门店 : {{item.storeName}}</p>
            <p class="gray-color">开单人 : {{item.staffName}}</p>
            <p class="gray-color">销售凭证号 : {{item.salesVoucherNum}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">送货／提货日期：</p>
            <p>{{item.reservationDate}}</p>
          </div>
        </div>
        <div class="item">
          <div>
            <p class="title">收货信息：</p>
            <div>
              <p>{{item.consignee}}  {{item.consigneeMobile}}</p>
              <p>{{item.districtAdcode}}{{item.detailAddress}}</p>
            </div>
          </div>
        </div>
        <div class="item flex_100">
          <div>
            <p class="title">总金额：</p>
            <p>¥{{item.totalMoney}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">已交付金额：</p>
            <p class="blue-color">¥{{item.accountPaid}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">未交付金额：</p>
            <p class="red-color">¥{{item.nonPayment}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-op">
        <div>
        <span class="note">已完成</span>
        </div>
        <div>
          <el-button class="butn"  @click="lookorder(item.orderId)" data-code="6030006"> <i class="el-icon-edit-outline"></i>查看</el-button>
          <el-button class="butn" @click="showReceipt(item)"  v-show="item.nonPayment != '0'" data-code="6030002"> <i class="iconfont icon-receipt"></i>收款</el-button>
          <el-button class="butn" @click="showRefund(item)"  v-show="item.accountPaid > '0'" data-code="6030002"> <i class="iconfont icon-receipt"></i>退款</el-button>
          <!-- <el-button class="butn" @click="returnGood(item.orderId)" data-code="6030005" > <i class="iconfont icon-Refund"></i>退货</el-button> -->
          <el-button class="butn" @click="editTotalMoney(item)"  v-show="item.accountPaid > '0'" data-code="6030004"> <i class="iconfont icon-receipt"></i>变更价格</el-button>
          <!-- <el-button class="butn"> <i class="iconfont icon-print"></i>打印</el-button> -->
          <!-- <el-button class="butn" @click="returnGood(item.orderId)" data-code="6030005" > <i class="iconfont icon-Refund"></i>退货</el-button> -->
          <el-button class="butn" @click="colseAll(item)"  data-code="6030008" > <i class="iconfont el-icon-circle-close-outline"></i>取消订单</el-button>
        </div>
      </div>
    </div>
     <!-- 退货中
    <div class="order-item type4" v-if="'5' === item.state">
      <div class="top-info">
        <div class="item flex_170">
          <el-checkbox class="comm-check" v-model="item.isChooe" ></el-checkbox>
          <div class="mg-left">
            <p class="serial"><router-link :to="{path:'/myStore/order/easyShipDetail', query: {orderId: item.orderId}}">{{item.orderNum}}</router-link></p>
            <p class="gray-color">{{item.orderTime}}</p>
            <p class="gray-color">门店 : {{item.storeName}}</p>
            <p class="gray-color">开单人 : {{item.staffName}}</p>
            <p class="gray-color">销售凭证号 : {{item.salesVoucherNum}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">送货／提货日期：</p>
            <p>{{item.reservationDate}}</p>
          </div>
        </div>
        <div class="item">
          <div>
            <p class="title">收货信息：</p>
            <div>
              <p>{{item.consignee}}  {{item.consigneeMobile}}</p>
              <p>{{item.districtAdcode}}{{item.detailAddress}}</p>
            </div>
          </div>
        </div>
        <div class="item flex_100">
          <div>
            <p class="title">总金额：</p>
            <p>¥{{item.totalMoney}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">已交付金额：</p>
            <p class="blue-color">¥{{item.accountPaid}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">未交付金额：</p>
            <p class="red-color">¥{{item.nonPayment}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-op">
        <div>
        <span class="note" >退货中</span>
        </div>
        <div>
          <el-button class="butn" @click="lookorder(item.orderId)" data-code="6030007"> <i class="el-icon-edit-outline"></i>查看</el-button>
           <el-button class="butn" @click="showReceipt(item)"  v-show="item.nonPayment != '0'" data-code="6030002"> <i class="iconfont icon-receipt"></i>收款</el-button>
            <el-button class="butn"> <i class="iconfont icon-print"></i>打印</el-button>
          <el-button class="butn" @click="cancel(item.orderId)" data-code="6030011"> <i class="iconfont icon-Refund"></i>取消退货</el-button>
          <el-button class="butn" @click="colseAll(item.orderId)"  data-code="6030009" > <i class="iconfont el-icon-circle-close-outline"></i>关闭订单</el-button>
        </div>
      </div>
    </div> -->
    <!--已关闭-->
    <div class="order-item type5" v-if="'6' === item.state">
      <div class="top-info">
        <div class="item flex_170" >
          <el-checkbox class="comm-check" v-model="item.isChooe"></el-checkbox>
          <div class="mg-left">
            <p class="serial"><router-link :to="{path:'/myStore/order/easyShipDetail', query: {orderId: item.orderId}}">{{item.orderNum}}</router-link></p>
            <p class="gray-color">{{item.orderTime}}</p>
            <p class="gray-color">门店 : {{item.storeName}}</p>
            <p class="gray-color">开单人 : {{item.staffName}}</p>
            <p class="gray-color">销售凭证号 : {{item.salesVoucherNum}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">送货／提货日期：</p>
            <p>{{item.reservationDate}}</p>
          </div>
        </div>
        <div class="item">
          <div>
            <p class="title">收货信息：</p>
            <div>
              <p>{{item.consignee}}  {{item.consigneeMobile}}</p>
              <p>{{item.districtAdcode}}{{item.detailAddress}}</p>
            </div>
          </div>
        </div>
        <div class="item flex_100">
          <div>
            <p class="title">总金额：</p>
            <p>¥{{item.totalMoney}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">已交付金额：</p>
            <p class="blue-color">¥{{item.accountPaid}}</p>
          </div>
        </div>
        <div class="item flex_120">
          <div>
            <p class="title">未交付金额：</p>
            <p class="red-color">¥{{item.nonPayment}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-op">
        <div>
        <span class="note" >已取消</span>
        </div>
        <div>
          <el-button class="butn" @click="lookorder(item.orderId)" data-code="6030006"> <i class="el-icon-edit-outline"></i>查看</el-button>
          <!-- <el-button class="butn"> <i class="iconfont icon-print"></i>打印</el-button> -->
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="isShowReceipt"
        width="78%"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">{{orderJSON.title}}</span>
          </div>
          <order-receipt :order="order" @hideDialog='hideDialog' :orderJSON='orderJSON' v-if="isShowReceipt"></order-receipt>
  </el-dialog>
  <el-dialog
      :visible.sync="isShowEdit"
        width="78%"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">{{orderJSON.title}}</span>
          </div>
          <order-edit :order="order" @hideDialog='hideDialog' :orderJSON='orderJSON' v-if="isShowEdit"></order-edit>
  </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import orderReceipt from './easyOrderReceipt'
import orderEdit from './easyOrderEdit'
import { judgeButton } from '../../tool/Utils'
export default {
  data () {
    return {
      isShowReceipt: false,
      isShowEdit: false,
      orderId: '',
      order: {},
      orderJSON: {
        title: ''
      }
    }
  },
  computed: {
    ...mapGetters(['powerButton'])
  },
  // 数据初始化方法
  mounted () {
    this.getButton()
  },
  methods: {
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    orderEdit (orderId) {
      this.$router.push({path: '/myStore/order/easyOrderEdit', query: {orderId: orderId}})
    },
    // 收款弹窗
    showReceipt (value) {
      this.isShowReceipt = true
      this.order = value
      this.orderJSON.title = '收款'
      this.orderJSON.inpitTitle = '收款金额'
    },
    // 退款弹窗
    showRefund (value) {
      this.isShowReceipt = true
      this.order = value
      this.orderJSON.title = '退款'
      this.orderJSON.inpitTitle = '退款金额'
    },
    // 变更价格弹窗
    editTotalMoney (value) {
      this.isShowEdit = true
      this.order = value
      this.orderJSON.title = '变更价格'
      this.orderJSON.inpitTitle = '变更价格'
    },
    handleClose () {
      this.isShowReceipt = false
      this.isShowEdit = false
      this.$router.push({path: '/myStore/order/easyOrderManage'})
    },
    hideDialog () {
      this.isShowReceipt = false
      this.isShowEdit = false
      this.$emit('refresh')
      // this.$router.push({path: '/myStore/order/easyOrderManage'})
    },
    lookorder (orderId) {
      this.$router.push({path: '/myStore/order/easyShipDetail', query: {orderId: orderId}})
    },
    // 完成订单弹窗
    confirm (value) {
      if (value.nonPayment !== 0) {
        this.$confirm('该订单还未全额付款, 是否继续完成订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isShowEdit = true
          this.order = value
          this.orderJSON.title = '完成订单'
          this.orderJSON.inpitTitle = '完成订单'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消完成订单'
          })
        })
      } else {
        this.$confirm('确认是否要进行确认收货操作, 是否继续完成订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isShowEdit = true
          this.order = value
          this.orderJSON.title = '完成订单'
          this.orderJSON.inpitTitle = '完成订单'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消订单收货'
          })
        })
      }
    },
    // 发货
    shipments (value) {
      if (value.nonPayment === 0) {
        this.$confirm('该操作将进行发货, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            orderId: value.orderId
          }
          this.$api.shipments(params).then(res => {
            if (res.code === 0) {
              this.$message({
                message: '该订单确认发货成功',
                type: 'success'
              })
              this.$emit('refresh')
            } else if (res.code === 1) {
              this.$message.error('该订单发货失败')
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发货'
          })
        })
      } else {
        this.$confirm('该订单还未全额付款, 是否继续发货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            orderId: value.orderId
          }
          this.$api.shipments(params).then(res => {
            if (res.code === 0) {
              this.$message({
                message: '该订单确认发货成功',
                type: 'success'
              })
              this.$emit('refresh')
            } else if (res.code === 1) {
              this.$message.error('该订单发货失败')
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发货'
          })
        })
      }
    },
    // // 退货
    // returnGood (value) {
    //   this.$confirm('确认是否要进行退货操作, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     let params = {
    //       orderId: value
    //     }
    //     this.$api.returnGood(params).then(res => {
    //       if (res.code === 0) {
    //         this.$message({
    //           message: '该订单已进行退货',
    //           type: 'success'
    //         })
    //         this.$emit('refresh')
    //       } else if (res.code === 1) {
    //         this.$message.error('该订单退货失败')
    //       } else {
    //         this.$message.error(res.msg)
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消退货'
    //     })
    //   })
    // },
    // 取消订单弹窗
    colseAll (value) {
      this.$confirm('确认是否要进行关闭订单操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.orderJSON.title = '取消订单'
        this.isShowEdit = true
        this.order = value
        this.orderJSON.title = '取消订单'
        this.orderJSON.inpitTitle = '取消订单'
        this.orderJSON.orderState = value.state
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消关闭订单'
        })
      })
    },
    // 取消订单弹窗
    // colseFinish (value) {
    //   if (value.nonPayment !== 0) {
    //     this.$confirm('该订单还未全额付款, 是否继续关闭?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       let params = {
    //         orderId: value.orderId
    //       }
    //       this.$api.colseAll(params).then(res => {
    //         if (res.code === 0) {
    //           this.$message({
    //             message: '该订单确认已关闭',
    //             type: 'success'
    //           })
    //           this.$emit('refresh')
    //         } else if (res.code === 1) {
    //           this.$message.error('该订单确认已关闭失败')
    //         } else {
    //           this.$message.error(res.msg)
    //         }
    //       })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消关闭订单'
    //       })
    //     })
    //   } else {
    //     let params = {
    //       orderId: value.orderId
    //     }
    //     this.$api.colseAll(params).then(res => {
    //       if (res.code === 0) {
    //         this.$message({
    //           message: '该订单确认已关闭',
    //           type: 'success'
    //         })
    //         this.$emit('refresh')
    //       } else if (res.code === 1) {
    //         this.$message.error('该订单确认已关闭失败')
    //       } else {
    //         this.$message.error(res.msg)
    //       }
    //     })
    //   }
    // },
    // 关闭订单
    colse (value) {
      this.$confirm('该订单已在进行中, 是否继续取消订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isShowEdit = true
        this.order = value
        this.orderJSON.title = '取消订单'
        this.orderJSON.inpitTitle = '取消订单'
        this.orderJSON.orderState = value.state
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消关闭订单'
        })
      })
    }
    // // 取消退货
    // cancel (value) {
    //   this.$confirm('确认是否要进行取消退货操作, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     let params = {
    //       orderId: value
    //     }
    //     this.$api.cancel(params).then(res => {
    //       if (res.code === 0) {
    //         this.$message({
    //           message: '该订单已取消退货',
    //           type: 'success'
    //         })
    //         this.$emit('refresh')
    //       } else if (res.code === 1) {
    //         this.$message.error('该订单取消失败')
    //       } else {
    //         this.$message.error(res.msg)
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消操作'
    //     })
    //   })
    // }
  },
  props: ['item', 'orderType'],
  components: {orderReceipt, orderEdit}
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.order-list{
  .order-item{
    border:1px solid $border-color;
    margin-bottom: 10px;
    &:hover{
      background-color:rgba(243,244,248,1);
    }
    .top-info{
      display: flex;
      border-bottom:1px dashed $border-color;
      .item{
        display: flex;
        padding: 10px 12px;
        font-size: $xs-size;
        border-right:1px dashed $border-color;
        &:last-child{
          border-right:0;
        }
        .comm-check{
          margin-top: 8px;
        }
        p{
          margin: 8px 0;
        }
        .serial{
          color:$table-text-color;
          font-size: $xlg-size;
          font-weight: bold;
          &:hover{
            a{
              color:$main-color;
            }
          }
        }
        .title{
          font-weight: bold;
        }
        .gray-color{
          color:$adorn-color-4;
        }
        .mg-left{
          margin-left: 12px;
        }
        &.flex_100{
          flex: 0 0 100px;
        }
        &.flex_120{
          flex: 0 0 122px;
        }
        &.flex_170{
          flex: 0 0 170px;
        }
        .blue-color{
          color:$blue-color;
        }
        .red-color{
          color:$main-color;
        }

      }
    }
    .bottom-op{
      display: flex;
      justify-content: space-between;
      padding: 18px 12px;
      i{
        margin-right: 4px;
      }
      .iconfont{
        font-size: 14px;
        position: relative;
        top:1px;
      }
      .butn{
        padding:4px 8px;
        background-color:#fff;
        border-color:#fff;
        &.btn-type2{
          border-color:$main-color;
          background-color: $main-color;
          color:#fff;
          &:hover{
            border-color:lighten($main-color,6%);
            background-color: lighten($main-color,6%);
          }
        }
      }
      .note{
        // background: $yello-color;
        font-size: $xs-size;
        color:#fff;
        padding: 2px 6px;
        border-radius: 4px;
      }
    }
    &.type0{
      .bottom-op{
        .note{
          background-color: #f81717;
        }
      }
    }
    &.type1{
      .bottom-op{
        .note{
          background-color: $yello-color;
        }
      }
    }
    &.type2{
      .bottom-op{
        .note{
          background-color: #44AF7B;
        }
      }
    }
    &.type3{
      .bottom-op{
        .note{
          background-color: #7180F1;
        }
      }
    }
    &.type4{
      .bottom-op{
        .note{
          background-color: #B3B5BA;
        }
      }
    }
    &.type5{
      .bottom-op{
        .note{
          background-color: #beecd9f3;
        }
      }
    }
  }
}
</style>
