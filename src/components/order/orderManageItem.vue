<template>
  <div class="order-list">
    <!-- 代收款 -->
    <div class="order-item type1" v-if="'1' === item.state">
      <div class="top-info">
        <div class="item flex_170">
          <el-checkbox class="comm-check"  v-model="item.isChooe"></el-checkbox>
          <div class="mg-left">
            <!-- <p class="serial"><router-link :to="{path:'/myStore/order/shipDetail'}">{{item.orderNum}}</router-link></p> -->
            <p class="serial">{{item.orderNum}}</p>
            <p class="gray-color">{{item.createTime}}</p>
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
              <p>{{item.consignee}}:{{item.consigneeMobile}}</p>
              <p>{{item.provinceAdcode}}{{item.detailAddress}}</p>
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
        <div class="item flex_100">
          <div>
            <p class="title">未交付金额：</p>
              <p class="red-color">¥{{item.nonPayment === null?0:item.nonPayment}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-op">
        <div class="state-shop">
          <div ><span class="note">待付款</span></div>
          <!-- <div v-if="no_receive_money"><span class="note">未收款</span></div>
          <div v-if="part_receive_money"><span class="note">部分收款</span></div>
          <div v-if="wait_send"><span class="note">待发货</span></div>
          <div v-if="part_send"><span class="note">部分发货</span></div>
          <div v-if="has_send"><span class="note">已发货</span></div>
          <div v-if="part_return"><span class="note">部分退货</span></div>
          <div v-if="has_return"><span class="note">已发货</span></div> -->
        </div>
        <div>
          <el-button class="butn"  @click="lookorder(item.orderId)" data-code="6010007"> <i class="el-icon-edit-outline"></i>查看</el-button>
          <el-button class="butn" @click="orderEdit(item.orderId, item.orderNum)" data-code="6010006"> <i class="el-icon-edit-outline"></i>编辑</el-button>
          <el-button class="butn" @click="showReceipt(item)" v-show="item.nonPayment != '0'" data-code="6010002"> <i class="iconfont icon-receipt"></i>收款</el-button>
          <!-- <el-button class="butn" v-if="fahuoshow" @click="shipments(item)" data-code="6010003"> <i class="iconfont icon-shipments"></i>发货</el-button> -->
          <!-- <el-button class="butn"> <i class="iconfont icon-print"></i>打印</el-button> -->
          <el-button class="butn" @click="colseAll(item)" data-code="6010009"> <i class="iconfont el-icon-circle-close-outline"></i>取消订单</el-button>
        </div>
      </div>
    </div>
    <!-- 待发货 -->
    <div class="order-item type2" v-if="'2' === item.state">
      <div class="top-info">
        <div class="item flex_170">
          <el-checkbox class="comm-check"  v-model="item.isChooe"></el-checkbox>
          <div class="mg-left">
            <!-- <p class="serial"><router-link :to="{path:'/myStore/order/shipDetail'}">{{item.orderNum}}</router-link></p> -->
            <p class="serial">{{item.orderNum}}</p>
            <p class="gray-color">{{item.createTime}}</p>
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
              <p>{{item.consignee}}:{{item.consigneeMobile}}</p>
              <p>{{item.provinceAdcode}}{{item.detailAddress}}</p>
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
        <div class="item flex_100">
          <div>
            <p class="title">未交付金额：</p>
              <p class="red-color">¥{{item.nonPayment === null?0:item.nonPayment}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-op">
        <div class="state-shop">
          <div ><span class="note">待发货</span></div>
          <!-- <div v-if="no_receive_money"><span class="note">未收款</span></div>
          <div v-if="part_receive_money"><span class="note">部分收款</span></div>
          <div v-if="wait_send"><span class="note">待发货</span></div>
          <div v-if="part_send"><span class="note">部分发货</span></div>
          <div v-if="has_send"><span class="note">已发货</span></div>
          <div v-if="part_return"><span class="note">部分退货</span></div>
          <div v-if="has_return"><span class="note">已发货</span></div> -->
        </div>
        <div>
          <el-button class="butn"  @click="lookorder(item.orderId)" data-code="6010007"> <i class="el-icon-edit-outline"></i>查看</el-button>
          <el-button class="butn" @click="orderEdit(item.orderId, item.orderNum)" data-code="6010006"> <i class="el-icon-edit-outline"></i>编辑</el-button>
          <el-button class="butn" @click="showReceipt(item)" v-show="item.nonPayment != '0'"  data-code="6010002"> <i class="iconfont icon-receipt"></i>收款</el-button>
          <el-button class="butn" @click="showReceiptReturn(item)" v-show="item.accountPaid > 0" data-code="6010002"> <i class="iconfont icon-receipt"></i>退款</el-button>
          <el-button class="butn" v-if="fahuoshow" @click="shipments(item)" data-code="6010003"> <i class="iconfont icon-shipments"></i>发货</el-button>
          <!-- <el-button class="butn"> <i class="iconfont icon-print"></i>打印</el-button> -->
          <el-button class="butn" @click="colse(item)" data-code="6010009"> <i class="iconfont el-icon-circle-close-outline"></i>取消订单</el-button>
        </div>
      </div>
    </div>
    <!-- 已发货 -->
    <div class="order-item type3" v-if="'3' === item.state">
      <div class="top-info">
        <div class="item flex_170">
          <el-checkbox class="comm-check"  v-model="item.isChooe"></el-checkbox>
          <div class="mg-left">
            <!-- <p class="serial"><router-link :to="{path:'/myStore/order/shipDetail'}">{{item.orderNum}}</router-link></p> -->
            <p class="serial">{{item.orderNum}}</p>
            <p class="gray-color">{{item.createTime}}</p>
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
              <p>{{item.consignee}}:{{item.consigneeMobile}}</p>
              <p>{{item.provinceAdcode}}{{item.detailAddress}}</p>
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
        <div class="item flex_100">
          <div>
            <p class="title">未交付金额：</p>
            <p class="red-color">¥{{item.nonPayment === null?0:item.nonPayment}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-op">
        <div class="state-shop">
          <div><span class="note">已发货</span></div>
          <!-- <div v-if="no_receive_money"><span class="note">未收款</span></div>
          <div v-if="part_receive_money"><span class="note">部分收款</span></div>
          <div v-if="wait_send"><span class="note">待发货</span></div>
          <div v-if="part_send"><span class="note">部分发货</span></div>
          <div v-if="has_send"><span class="note">已发货</span></div>
          <div v-if="part_return"><span class="note">部分退货</span></div>
          <div v-if="has_return"><span class="note">已发货</span></div> -->
        </div>
        <div>
          <el-button class="butn"  @click="lookorder(item.orderId)" data-code="6010007"> <i class="el-icon-edit-outline"></i>查看</el-button>
          <!-- <el-button class="butn" @click="orderEdit(item.orderId, item.orderNum)" data-code="6010006"> <i class="el-icon-edit-outline"></i>编辑</el-button> -->
          <el-button class="butn" @click="showReceipt(item)" v-show="item.nonPayment != '0'"  data-code="6010002"> <i class="iconfont icon-receipt"></i>收款</el-button>
          <el-button class="butn" @click="showReceiptReturn(item)" v-show="item.accountPaid > 0" data-code="6010002"> <i class="iconfont icon-receipt"></i>退款</el-button>
          <el-button class="butn" v-if="fahuoshow" @click="shipments(item)" data-code="6010003"> <i class="iconfont icon-shipments"></i>发货</el-button>
          <el-button class="butn" v-if="tuihuoshow" @click="returnGood(item.orderId)"  data-code="6010005"> <i class="iconfont icon-Refund"></i>退货</el-button>
          <el-button class="butn" @click="editTotalMoney(item)"  v-show="item.accountPaid > '0'" data-code="6030004"> <i class="iconfont icon-receipt"></i>变更价格</el-button>
          <el-button class="butn" @click="colse(item)" data-code="6010009"> <i class="iconfont el-icon-circle-close-outline"></i>取消订单</el-button>
          <el-button class="butn btn-type2" @click="confirm(item)"  data-code="6010008"> <i class="el-icon-edit"></i>完成订单</el-button>
        </div>
      </div>
    </div>
    <!-- 已完成 -->
    <div class="order-item type4" v-if="'4' === item.state">
      <div class="top-info">
        <div class="item flex_170">
          <el-checkbox class="comm-check"  v-model="item.isChooe"></el-checkbox>
          <div class="mg-left">
            <!-- <p class="serial"><router-link :to="{path:'/myStore/order/shipDetail'}">{{item.orderNum}}</router-link></p> -->
            <p class="serial">{{item.orderNum}}</p>
            <p class="gray-color">{{item.createTime}}</p>
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
              <p>{{item.consignee}}:{{item.consigneeMobile}}</p>
              <p>{{item.provinceAdcode}}{{item.detailAddress}}</p>
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
        <div class="item flex_100">
          <div>
            <p class="title">未交付金额：</p>
             <p class="red-color">¥{{item.nonPayment === null?0:item.nonPayment}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-op">
          <div class="state-shop">
          <div><span class="note">已完成</span></div>
          <!-- <div v-if="no_receive_money"><span class="note">未收款</span></div>
          <div v-if="part_receive_money"><span class="note">部分收款</span></div>
          <div v-if="wait_send"><span class="note">待发货</span></div>
          <div v-if="part_send"><span class="note">部分发货</span></div>
          <div v-if="has_send"><span class="note">已发货</span></div>
          <div v-if="part_return"><span class="note">部分退货</span></div>
          <div v-if="has_return"><span class="note">已发货</span></div> -->
        </div>
        <div>
          <el-button class="butn"  @click="lookorder(item.orderId)" data-code="6010007"> <i class="el-icon-edit-outline"></i>查看</el-button>
          <el-button class="butn" @click="showReceipt(item)"  v-show="item.nonPayment != '0'"  data-code="6010002"> <i class="iconfont icon-receipt"></i>收款</el-button>
          <el-button class="butn" @click="showReceiptReturn(item)" data-code="6010002"> <i class="iconfont icon-receipt"></i>退款</el-button>
          <el-button class="butn" v-if="tuihuoshow" @click="returnGood(item.orderId)" data-code="6010005"> <i class="iconfont icon-Refund"></i>退货</el-button>
          <el-button class="butn" @click="editTotalMoney(item)"  v-show="item.accountPaid > '0'" data-code="6030004"> <i class="iconfont icon-receipt"></i>变更价格</el-button>
          <el-button class="butn" @click="colseAll(item)" data-code="6010009"> <i class="iconfont el-icon-circle-close-outline"></i>取消订单</el-button>
        </div>
      </div>
    </div>
    <!-- 退货中 -->
    <div class="order-item type5" v-if="'5' === item.state">
      <div class="top-info">
        <div class="item flex_170">
          <el-checkbox class="comm-check"  v-model="item.isChooe"></el-checkbox>
          <div class="mg-left">
            <!-- <p class="serial"><router-link :to="{path:'/myStore/order/shipDetail'}">{{item.orderNum}}</router-link></p> -->
            <p class="serial">{{item.orderNum}}</p>
            <p class="gray-color">{{item.createTime}}</p>
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
              <p>{{item.consignee}}:{{item.consigneeMobile}}</p>
              <p>{{item.provinceAdcode}}{{item.detailAddress}}</p>
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
        <div class="item flex_100">
          <div>
            <p class="title">未交付金额：</p>
              <p class="red-color">¥{{item.nonPayment === null?0:item.nonPayment}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-op">
        <div class="state-shop">
          <div><span class="note">退货中</span></div>
          <!-- <div v-if="no_receive_money"><span class="note">未收款</span></div>
          <div v-if="part_receive_money"><span class="note">部分收款</span></div>
          <div v-if="wait_send"><span class="note">待发货</span></div>
          <div v-if="part_send"><span class="note">部分发货</span></div>
          <div v-if="has_send"><span class="note">已发货</span></div>
          <div v-if="part_return"><span class="note">部分退货</span></div>
          <div v-if="has_return"><span class="note">已发货</span></div> -->
        </div>
        <div>
          <el-button class="butn" @click="lookorder(item.orderId)" data-code="6010007"> <i class="el-icon-edit-outline"></i>查看</el-button>
          <el-button class="butn" @click="showReceipt(item)"  v-show="item.nonPayment != '0'"  data-code="6010002"> <i class="iconfont icon-receipt"></i>收款</el-button>
          <!-- <el-button class="butn" @click="showReceiptReturn(item)" data-code="6010002"> <i class="iconfont icon-receipt"></i>退款</el-button> -->
          <el-button class="butn" v-if="tuihuoshow" @click="returnGood(item.orderId)" data-code="6010005"> <i class="iconfont icon-Refund"></i>退货</el-button>
         <!-- <el-button class="butn"> <i class="iconfont icon-print"></i>打印</el-button> -->
          <!-- <el-button class="butn" @click="cancel(item.orderId)"  data-code="6010009"> <i class="iconfont icon-Refund"></i>取消退货</el-button> -->
          <el-button class="butn" @click="colse(item.orderId)" data-code="6010009"> <i class="iconfont el-icon-circle-close-outline"></i>关闭订单</el-button>
        </div>
      </div>
    </div>
    <!-- 已关闭 -->
    <div class="order-item type6" v-if="'6' === item.state">
      <div class="top-info">
        <div class="item flex_170">
          <el-checkbox class="comm-check"  v-model="item.isChooe"></el-checkbox>
          <div class="mg-left">
            <!-- <p class="serial"><router-link :to="{path:'/myStore/order/shipDetail'}">{{item.orderNum}}</router-link></p> -->
            <p class="serial">{{item.orderNum}}</p>
            <p class="gray-color">{{item.createTime}}</p>
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
              <p>{{item.consignee}}:{{item.consigneeMobile}}</p>
              <p>{{item.provinceAdcode}}{{item.detailAddress}}</p>
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
        <div class="item flex_100">
          <div>
            <p class="title">未交付金额：</p>
              <p class="red-color">¥{{item.nonPayment === null?0:item.nonPayment}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-op">
          <div class="state-shop">
          <div><span class="note">已取消</span></div>
          <!-- <div v-if="no_receive_money"><span class="note">未收款</span></div>
          <div v-if="part_receive_money"><span class="note">部分收款</span></div>
          <div v-if="wait_send"><span class="note">待发货</span></div>
          <div v-if="part_send"><span class="note">部分发货</span></div>
          <div v-if="has_send"><span class="note">已发货</span></div>
          <div v-if="part_return"><span class="note">部分退货</span></div>
          <div v-if="has_return"><span class="note">已发货</span></div> -->
        </div>
        <div>
           <el-button class="butn" @click="lookorder(item.orderId)" data-code="6010007"> <i class="el-icon-edit-outline"></i>查看</el-button>
          <!-- <el-button class="butn"> <i class="iconfont icon-print"></i>打印</el-button> -->
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="isShowReceipt"
        width="78%"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">收款</span>
          </div>
          <order-receipt :order="order" @hideDialog='hideDialog' ></order-receipt>
    </el-dialog>
    <!-- 退款按钮 -->
    <el-dialog
      :visible.sync="isShowReceiptReturn"
        width="78%"
        :before-close="handleCloseReturn" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">退款</span>
          </div>
          <order-receipt-return :order="order" @hideDialog='hideDialogReturn' ></order-receipt-return>
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
import orderReceipt from './orderReceipt'
import orderReceiptReturn from './orderReceiptReturn'
import orderEdit from './orderEdit'
import { judgeButton } from '../../tool/Utils'
export default {
  data () {
    return {
      isShowReceipt: false,
      orderId: '',
      order: {},
      // 等待发货
      wait_send: false,
      // 部分发货
      part_send: false,
      // 已发货
      has_send: false,
      // 部分退货
      part_return: false,
      // 已退货
      has_return: false,
      // 为付款
      no_receive_money: false,
      // 部分收款
      part_receive_money: false,
      pageDate: {},
      // 发货按钮
      fahuoshow: true,
      // 退货按钮
      tuihuoshow: true,
      // 退款按钮
      isShowReceiptReturn: false,
      isShowEdit: false,
      orderJSON: {
        title: ''
      }
    }
  },
  computed: {
    ...mapGetters(['powerButton'])
  },
  created () {
    this.pageDate = this.item
  },
  // 接收传过来的数组对象
  // 数据初始化方法
  mounted () {
    this.getButton()
    this.changeState()
  },
  props: ['item', 'orderType'],
  methods: {
    // 改变左下角状态
    changeState () {
      // 判断付款金额
      if (this.pageDate.nonPayment === this.pageDate.totalMoney) {
        // 未付款
        this.no_receive_money = true
      } else if (this.pageDate.nonPayment !== 0) {
        this.part_receive_money = true
      }
      // 判断发货状态
      if (this.pageDate.allGoodsCount === this.pageDate.sendGoodsCount) {
        // 发货量等于订单量  已发货
        this.has_send = true
        this.fahuoshow = false
      } else if (this.pageDate.allGoodsCount > this.pageDate.sendGoodsCount && this.pageDate.sendGoodsCount !== 0) {
        // 发货量小于订单量  部分发货
        this.part_send = true
      } else if (this.pageDate.sendGoodsCount === 0) {
        // 未发货
        this.wait_send = true
      }
      if (this.pageDate.returnGoodsCount === this.pageDate.sendGoodsCount) {
        // 订单量与退货量相同
        this.has_return = true
        this.tuihuoshow = false
      } else if (this.pageDate.allGoodsCount > this.pageDate.returnGoodsCount && this.pageDate.returnGoodsCount !== 0) {
        this.part_return = true
      }
    },
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    orderEdit (orderId, orderNum) {
      this.$router.push({path: '/myStore/order/orderEdit', query: {orderId: orderId, orderNum: orderNum, isPay: 'yes'}})
    },
    // 收款弹窗
    showReceipt (value) {
      this.isShowReceipt = true
      this.order = value
    },
    // 退款弹窗
    showReceiptReturn (value) {
      this.isShowReceiptReturn = true
      this.order = value
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
      this.$router.push({path: '/myStore/order/orderManage'})
    },
    hideDialog () {
      this.isShowReceipt = false
      this.isShowEdit = false
      this.$emit('refresh1')
    },
    handleCloseReturn () {
      this.isShowReceiptReturn = false
      this.$router.push({path: '/myStore/order/orderManage'})
    },
    hideDialogReturn () {
      this.isShowReceiptReturn = false
      this.$emit('refresh1')
    },
    // 查看
    lookorder (orderId) {
      // this.$router.push({path: '/myStore/order/orderDetail', query: {orderId: orderId}})
      // this.$router.push({path: '/myStore/order/orderRefund', query: {orderId: orderId}})
      this.$router.push({path: '/myStore/order/orderDetail', query: {orderId: orderId}})
    },
    // 发货
    shipments (value) {
      if (value.nonPayment === 0) {
        this.$confirm('确认进行发货操作, 是否继续发货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({path: '/myStore/order/orderComplete', query: {orderVo: value}})
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
          this.$router.push({path: '/myStore/order/orderComplete', query: {orderVo: value}})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发货'
          })
        })
      }
    },
    // 退货
    returnGood (orderId) {
      this.$confirm('确认进行退货操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({path: '/myStore/order/orderRefund', query: {orderId: orderId}})
        // let params = {
        //   orderId: orderId
        // }
        // this.$api.orderreturnGood(params).then(res => {
        //   if (res.code === 0) {
        //     this.$message({
        //       message: '该订单已进行退货',
        //       type: 'success'
        //     })
        //     this.$emit('refresh1')
        //   } else {
        //     this.$message.error('该订单退货失败')
        //   }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退货'
        })
      })
    },
    // 取消退货
    cancel (value) {
      this.$confirm('确认进行取消退货操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          orderId: value
        }
        this.$api.ordercancel(params).then(res => {
          if (res.code === 0) {
            this.$message({
              message: '该订单已取消退货',
              type: 'success'
            })
            this.$emit('refresh1')
          } else if (res.code === 1) {
            this.$message.error('该订单取消退货失败')
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
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
    // 取消订单
    colseAll (value) {
      this.$confirm('确认是否要进行取消订单操作, 是否继续?', '提示', {
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
          message: '已取消取消订单'
        })
      })
    },
    // 对于已完成流程的订单关闭  确认其是否付完所有款项
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
    //       this.$api.ordercolseAll(params).then(res => {
    //         if (res.code === 0) {
    //           this.$message({
    //             message: '该订单确认已关闭',
    //             type: 'success'
    //           })
    //           this.$emit('refresh1')
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
    //     this.$confirm('确认进行关闭订单操作, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       let params = {
    //         orderId: value.orderId
    //       }
    //       this.$api.ordercolseAll(params).then(res => {
    //         if (res.code === 0) {
    //           this.$message({
    //             message: '该订单确认已关闭',
    //             type: 'success'
    //           })
    //           this.$emit('refresh1')
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
    //   }
    // },
    // 取消订单
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消取消订单'
        })
      })
    }
  },
  components: { orderReceipt, orderReceiptReturn, orderEdit }
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
      .state-shop{
        display: flex;
        >div{
          margin-right: 15px;
        }
      }
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
     &.type1{
      .bottom-op{
        .note{
          background-color: #f81717;
        }
      }
    }
    &.type2{
      .bottom-op{
        .note{
          background-color: $yello-color;
        }
      }
    }
    &.type3{
      .bottom-op{
        .note{
          background-color: #44AF7B;
        }
      }
    }
    &.type4{
      .bottom-op{
        .note{
          background-color: #7180F1;
        }
      }
    }
    &.type5{
      .bottom-op{
        .note{
          background-color: #B3B5BA;
        }
      }
    }
    &.type6{
      .bottom-op{
        .note{
          background-color: #beecd9f3;
        }
      }
    }
  }
}
</style>
