<template>
  <div class="add-order">
    <!-- <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb> -->
    <div class="process">
      <div class="process-item">
        <p class="order-num">
          <span class="num">订单号：{{orderNum}}<i></i></span>
          <!-- <span class="note type1">未付款</span> -->
        </p>
          <div class="search">
              <el-autocomplete
                popper-class="my-autocomplete"
                class="auto-search"
                v-model="searchValue"
                :fetch-suggestions="querySearch"
                placeholder="请输入商品名称搜索"
                @select="handleSelect">
                <i
                  class="el-input__icon el-icon-search"
                  slot="prefix"
                  @click="handleIconClick">
                </i>
                <template slot-scope="{ item }">
                  <div class="img-box">
                    <img :src="item.firstPictureUrl" class="img-size">
                  </div>
                  <div class="shop-info">
                      <p class="info-item shop-name">{{item.goodsName}}</p>
                      <p class="info-item shop-id">商品编号: {{item.goodsCode}}</p>
                      <p class="info-item shop-num">货号: {{item.artNo}}</p>
                      <p class="info-item shop-num">定价方式: {{item.pricingMode}}</p>
                      <p class="info-item shop-price">价格：{{item.goodsMsrp}}</p>
                  </div>
                </template>
              </el-autocomplete>
            <!-- <el-button class="advanced-search" @click="allShops">{{btnTitle}}</el-button> -->
          </div>
        <div class="main-pro step2">
          <!-- <search :btnTitle="btnTitle" class="search"></search> -->
          <div class="more-info">
            <!-- {{isPay}} -->
            <div class="edit-type" v-if="isPay==='no'">
            </div>
            <div class="edit-type" v-else>
               <div class="info-tips">
                 <div class="info-name">商品信息</div>
                  <div  v-if="changeGoods"><el-button @click="deleteShop"> <i class="el-icon-delete"></i>删除</el-button></div>
                </div>
              <el-table
                :data="tableData"
                style="width: 100%"
                class="header-nobg"
                @select="handleSelectionChange"
                >
                <el-table-column
                    type="selection"
                    width="55"
                  >
                  </el-table-column>
                <el-table-column
                  prop="img"
                  label="图片"
                  width="140">
                  <template slot-scope="scope" >
                    <img :src="scope.row.firstPictureUrl" alt="" class="img-view">
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="名称/编号/货号/价格"
                  width="250px"
                >
                  <template slot-scope="scope">
                    <p class="comm-name">{{scope.row.goodsName}}</p>
                    <p class="comm-num">商品编号：{{scope.row.goodsCode}}</p>
                    <p class="comm-num">货号：{{scope.row.artNo}}</p>
                    <p class="comm-num">定价方式: {{scope.row.pricingMode}}</p>
                    <p class="comm-price" v-if="scope.row.pricingMode === '定价'">单价：￥{{scope.row.goodsMsrp}}</p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="price"
                  width="260px"
                  label="折扣单价">
                    <template slot-scope="scope">
                  <div class="dis-afte">
                    <div :class={change:scope.row.changePercent}>
                       <span class="black-color" v-if="scope.row.pricingMode === '定价'">折扣价：</span>
                       <span class="black-color" v-if="scope.row.pricingMode === '议价'">议价：</span>
                       <span>￥{{scope.row.discountPrice}}</span><i v-if="changeGoods" class="el-icon-edit-outline" v-show="!scope.row.changePercent" @click="changePercent(scope.$index)"></i>
                    </div>
                    <div class="price-op" v-show="scope.row.changePercent">
                      <span class="black-color" v-if="scope.row.pricingMode === '定价'">折扣价：</span>
                       <span class="black-color" v-if="scope.row.pricingMode === '议价'">议价：</span>
                      <input type="text" v-model.number="scope.row.discountPrice">
                      <el-button class="btn define" @click="changeDiscount(scope.$index)">确定</el-button>
                      <el-button class="btn cancel" @click="cancelChangePercent(scope.$index)">取消</el-button>
                    </div>
                  </div>
                   <div class="dis-afte" v-if="scope.row.pricingMode === '定价'">
                    <div :class={change:isChangePrice}>
                       <span class="black-color">折扣率：</span> <span class="red-color">{{Math.floor((scope.row.discountPrice / scope.row.goodsMsrp ) * 1000) /100}}折</span>
                    </div>
                  </div>
                </template>
                </el-table-column>
                  <el-table-column
                  prop="realPay"
                  align="center"
                  width="100px"
                  label="商品总价">
                </el-table-column>
                <el-table-column
                  prop="oldNum"
                  align="center"
                  width="200px"
                  label="订单数量"
                  v-if="!changeGoods">
                </el-table-column>
                 <el-table-column
                prop="num"
                align="center"
                width="200px"
                label="订单数量"
                v-if="changeGoods" >
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.num" @change="handleChange" :min="1" ></el-input-number>
                </template>
              </el-table-column>
              </el-table>
              <div class="comm-summ">
                <div class="comm-left">
                  <p class="item">
                    <label for="">总件数：</label>{{shopNums}}
                  </p>
                  <p class="item">
                  <label for="">原价总额：</label>￥{{shopPrice}}
                </p>
                 <p class="item">
                  <label for="">订单总价:</label><span class="blue-color">{{shopDiscount}}</span>
                 </p>
                  <!-- <p class="item">
                    <label for="">最近使用的优惠券:</label><span class="blue-color">
                      <div v-for="(item, index) in hasUsedCouponCard" :key="index" class="coupon-list">
                        {{item}}
                        </div>
                    </span>
                  </p> -->
                </div>
                <div class="comm-right">
                  <p class="item">
                    <label for="">优惠券:</label><span class="blue-color">
                      {{couponCardStr}}
                      </span>
                    <!-- <i class="el-icon-edit-outline" @click="useCoupon"></i> -->
                  </p>
                   <order-coupon v-if="couponShow" :products="tableData" :mobile="stStoreOrder.customerMobile" :discountPrice="shopDiscount - stStoreOrder.orderDiscountPrice"
                @select-coupon="getSelectCoupon" @close-coupon="hideCoupon"></order-coupon>
                  <div class="item">
                  <div class="dis-afte">
                  <label>整单折扣价:</label>{{stStoreOrder.orderDiscountPrice}}<i v-if="changeGoods" class="el-icon-edit-outline" v-show="orderDiscountShow" @click="changeOrderShow"></i>
                   <div class="price-op" v-show="!orderDiscountShow">
                      <span class="black-color">整单折扣价:</span>
                      <input type="text" v-model="stStoreOrder.orderDiscountPrice">
                      <el-button class="btn define" @click="changeAllOrderDiscount">确定</el-button>
                      <el-button class="btn cancel" @click="cancelAllOrderChangePercent">取消</el-button>
                    </div>
                    </div>
                </div>
                <p class="item"><label for="">整单折扣率:</label><span class="red-color">{{stStoreOrder.orderDiscountPrice !== null && stStoreOrder.orderDiscountPrice !== 0?Math.floor((stStoreOrder.orderDiscountPrice / shopDiscount) * 1000) / 100 :10}}折</span></p>
                <p class="item"><label for="">应付总额:</label><span class="red-color">￥{{stStoreOrder.totalMoney}}</span></p>
                </div>
              </div>
            </div>
             <div class="info-tips">
              <div class="info-name">客户信息</div>
            </div>
            <el-form  :model="stStoreOrder" :rules="rules1" ref="ruleForm" label-width="120px" class="ruleForm">
              <el-row :gutter="24">
                <el-col :span="12" :offset="12" class="upload-item label-star">
                    <el-form-item label="姓名" prop="customerTrueName">
                      <el-input v-model="stStoreOrder.customerTrueName" :disabled="this.customerTrueNameDisabled"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
            </el-form>
            <div class="info-tips">
              <div class="info-name">收货人信息</div>
            </div>
            <el-form :model="stStoreOrder" :rules="rules1" ref="stStoreOrder" label-width="120px" class="ruleForm">
              <el-row :gutter="24">
                <el-col :span="12" :offset="12">
                  <el-form-item label="收货人" prop="consignee">
                    <el-input v-model="stStoreOrder.consignee"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="收货人电话" prop="consigneeMobile">
                    <el-input v-model="stStoreOrder.consigneeMobile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="收货地址" prop="areaSelected">
                    <el-cascader
                      size="large"
                      :props="newprops"
                      :options="options"
                      v-model="areaSelected">
                    </el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="详细地址" prop="detailAddress">
                    <el-input type="textarea" v-model="stStoreOrder.detailAddress"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="提货方式" prop="deliveryMode">
                    <el-select v-model="stStoreOrder.deliveryMode" placeholder="请选择活动区域">
                      <el-option v-for="(item,index) in deliveryModeList" :key="index" :label="item.dname" :value="item.dcode"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="提货日期" prop="reserDate">
                  <el-date-picker
                    v-model="stStoreOrder.reserDate"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="备注" prop="remarks">
                    <el-input type="textarea" v-model="stStoreOrder.remarks"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="info-tips">
              <div class="info-name">门店信息</div>
            </div>
            <el-form :model="stStoreOrder" :rules="rules1" ref="stStoreOrder" label-width="120px" class="ruleForm">
               <el-row :gutter="24">
                 <el-col :span="12" :offset="12">
                  <el-form-item label="销售凭证号" prop="salesVoucherNum">
                    <el-input v-model="stStoreOrder.salesVoucherNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                   <el-form-item label="是否定制" prop="isCustom">
                  <el-radio-group v-model="stStoreOrder.isCustom" @change="isCustomChange">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12" v-show="customContentShow">
                  <el-form-item label="定制内容" prop="customContent">
                    <el-input v-model="stStoreOrder.customContent"></el-input>
                  </el-form-item>
                </el-col>
               </el-row>
            </el-form>
            <div class="order-submit">
              <el-button type="primary" @click="submit('stStoreOrder')" :loading="loading">{{loading?'提交订单中':'提交订单'}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
import search from '../../../components/public/search'
import orderCoupon from '../../../components/order/orderCoupon'
import orderReceipt from '../../../components/order/orderReceipt'
import { regionData } from 'chinaArea'
export default {
  data () {
    return {
      // 省市县
      newAllDiscount: null,
      // 提货方式
      deliveryModeList: [],
      orderDiscountShow: true,
      options: regionData,
      searchValue: '',
      newprops: {
        value: 'label'
      },
      // 送货时间的禁用选择
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() <= Date.now() - 86400000
        }
      },
      areaSelected: [],
      orderNum: '',
      stStoreOrder: {},
      couponShow: false,
      btnTitle: '全部商品',
      num1: 1,
      storeList: [],
      staffData: [],
      value1: '',
      isChangePrice: false,
      isChangePercent: false,
      tableData: [],
      changeGoods: false,
      chooseShop: [],
      newDiscount: null,
      goodsFlag: false,
      goodsMessage: '',
      shopPrice: 0,
      shopDiscount: 0.00,
      couponCard: '无',
      hasUsedCouponCard: [],
      // orderGoodsList: {
      //   firstPictureUrl: '',
      //   goodsName: '',
      //   goodsCode: '',
      //   artNo: '',
      //   goodsMsrp: 0.00,
      //   discountPrice: 0.00,
      //   num: 0
      // },
      rules1: {
        consignee: [
          { required: true, message: '请输入收货人', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        consigneeMobile: [
          { required: true, message: '请输入收货电话', trigger: 'change' },
          { pattern: /^1[3456789]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
        ],
        areaSelected: [
          { required: true, message: '请选择收货地址', trigger: 'blur' }
        ],
        detailAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        deliveryMode: [
          { required: true, message: '请选择提货方式', trigger: 'change' }
        ],
        reserDate: [
          { type: 'date', required: true, message: '请选择提货日期', trigger: 'change' }
        ],
        isCustom: [
          { required: true, message: '请选择是否定制', trigger: 'blur' }
        ],
        customContent: [
          { required: false, message: '请填写定制内容', trigger: 'blur' },
          { max: 200, message: '长度最大为200个字符', trigger: 'blur' }
        ],
        salesVoucherNum: [
          { max: 20, message: '输入长度最大为20个字符', trigger: 'blur' }
        ]
      },
      active: 0,
      pageCouponId: '',
      // 当前优惠券历史id
      pageCouponHistoryId: '',
      loading: false,
      customContentShow: false,
      couponCardStr: '',
      customerTrueNameDisabled: true
    }
  },
  created () {
    // let body = document.querySelector('body')
    // body.addEventListener('click', (e) => {
    //   if (e.target.id === 'toggler-btn' || e.target.id === 'toggler-icon') {
    //     this.couponShow = true
    //   } else {
    //     this.couponShow = false
    //   }
    // }, false)
    this.getStGoodsInfoAllList(this.stStoreOrder.storeId)
  },
  computed: {
    shopNums: function () {
      let _this = this
      _this.nums = 0
      _this.tableData.forEach((item, index) => {
        _this.nums += item.num
      })
      return _this.nums
    },
    changeOverPrice: function () {
      let _this = this
      let allPrice = 0.00
      _this.tableData.forEach((item, index) => {
        allPrice += item.num * item.goodsMsrp
      })
      return allPrice
    },
    isPay () {
      return this.$route.query.isPay
    },
    orderDiscountPrice: function () {
      let allPrice = 0.00
      allPrice = this.shopDiscount * (this.stStoreOrder.orderDiscount / 10)
      return allPrice
    }
  },
  // 数据初始化方法
  mounted () {
    this.getDeliveryModeList()
    this.getStStoreOrder()
  },
  methods: {
    // 获取提货方式
    getDeliveryModeList () {
      let params = {
        code: 'deliveryMode'
      }
      this.$api.initselect(params).then(res => {
        if (res.code === 0) {
          this.deliveryModeList = JSON.parse(res.data).details
        }
      })
    },
    // 是否定制 0定制/1不定制
    isCustomChange (value) {
      if (value === '0') {
        this.customContentShow = true
        this.rules1.customContent[0].required = true
      } else {
        this.customContentShow = false
        this.rules1.customContent[0].required = false
      }
    },
    // 商品折扣确定
    changeDiscount (index) {
      if (this.tableData[index].goodsMsrp < this.tableData[index].discountPrice && this.tableData[index].pricingMode === '定价') {
        this.$message.error('折扣价不得大于原价')
      } else if (this.tableData[index].discountPrice.toString().length > 8) {
        this.$message.error('价格输入不能超过8位字符')
      } else if (this.tableData[index].pricingMode === '议价' && this.tableData[index].discountPrice.toString().length === 0) {
        this.$message.error('议价商品,议价不能为空')
      } else if (this.tableData[index].pricingMode === '议价') {
        this.cancelChangePercent(index)
        this.newDiscount = null
        // 执行订单总价计算
        let allPrice = 0.00
        this.tableData.forEach((item, index) => {
          allPrice += item.num * item.discountPrice
        })
        this.stStoreOrder.totalMoney = allPrice
        this.shopDiscount = allPrice
      } else if (this.tableData[index].pricingMode === '定价') {
        this.cancelChangePercent(index)
        this.newDiscount = null
        // 执行订单总价计算
        let allPrice = 0.00
        this.tableData.forEach((item, index) => {
          allPrice += item.num * item.discountPrice
        })
        this.stStoreOrder.totalMoney = allPrice
        this.shopDiscount = allPrice
      }
    },
    changeAllOrderDiscount () {
      this.stStoreOrder.totalMoney = this.stStoreOrder.orderDiscountPrice
      if (this.stStoreOrder.totalMoney < this.shopDiscount) {
        this.orderDiscountShow = true
        // 设置整单折扣
        this.stStoreOrder.orderDiscount = (this.stStoreOrder.totalMoney / this.shopDiscount) * 10
      } else {
        this.$message.error('折扣价必须小于订单总价')
      }
    },
    cancelAllOrderChangePercent () {
      this.newAllDiscount = null
      this.orderDiscountShow = true
    },
    changeOrderShow () {
      this.orderDiscountShow = !this.orderDiscountShow
    },
    // 获取订单信息详情
    getStStoreOrder () {
      let params = {
        orderId: this.$route.query.orderId
      }
      this.$api.getStStoreOrder(params).then(res => {
        if (res.data.provinceAdcode) {
          this.areaSelected = JSON.parse(res.data.provinceAdcode)
        }
        this.stStoreOrder = res.data
        // 订单折扣价
        this.stStoreOrder.orderDiscount = (this.stStoreOrder.totalMoney / this.stStoreOrder.orderDiscountPrice) * 10
        this.orderNum = res.data.orderNum
        // this.getStStaffList(res.data.storeId)
        // 遍历赋值
        // 判断商品发货状态
        let sendGoodsCount = 0
        let allPrice = 0.00
        res.data.orderDetails.forEach((item, index) => {
          let orderGoodsList = {}
          orderGoodsList.firstPictureUrl = item.firstPictureUrl
          orderGoodsList.goodsName = item.goodsName
          orderGoodsList.goodsCode = item.goodsCode
          orderGoodsList.artNo = item.artNo
          orderGoodsList.goodsMsrp = item.goodsMsrp
          orderGoodsList.discountPrice = item.discountPrice
          orderGoodsList.num = item.goodsNum
          orderGoodsList.oldNum = item.goodsNum
          orderGoodsList.goodsId = item.goodsId
          orderGoodsList.discount = item.discountPrice / item.goodsMsrp * 10
          orderGoodsList.changePercent = false
          orderGoodsList.pricingMode = item.pricingMode
          orderGoodsList.realPay = item.realPay
          allPrice += item.goodsNum * item.discountPrice
          if (item.pricingMode === '议价') {
            orderGoodsList.goodsMsrp = item.discountPrice
          }
          this.tableData.push(orderGoodsList)
          if (item.completeNum > 0) {
            sendGoodsCount += item.completeNum
          }
        })
        // 订单总价
        this.shopDiscount = allPrice
        // 未发货 可修改商品
        if (sendGoodsCount === 0 && this.stStoreOrder.nonPayment === this.stStoreOrder.totalMoney) {
          // 可修改全部
          this.changeGoods = true
        } else {
          this.changeGoods = false
        }
        if (res.data.couponList !== null) {
          res.data.couponList.forEach((item, index) => {
            if (index >= 1) {
              return
            }
            if (item.preferentialWay === 'pricing' && item.useScope === 'allProduce') {
              // this.hasUsedCouponCard.push('0.' + item.preferentialIntensity + '折' + '【所有商品】')
              this.couponCardStr = item.preferentialIntensity * 0.1 + '折' + '【所有商品】'
            } else if (item.preferentialWay === 'pricing' && item.useScope === 'assignProduce') {
              // this.hasUsedCouponCard.push('0.' + item.preferentialIntensity + '折' + '【' + item.productsName + '】')
              this.couponCardStr = item.preferentialIntensity * 0.1 + '折' + '【' + item.productsName + '】'
            } else if (item.preferentialWay === 'reduceMoney' && item.useThreshold === 'satisfyMoney' && item.useScope === 'allProduce') {
              // this.hasUsedCouponCard.push('满' + item.thresholdMoney + '减' + item.lapseAmount + '【所有商品】')
              this.couponCardStr = '满' + item.thresholdMoney + '减' + item.lapseAmount + '【所有商品】'
            } else if (item.preferentialWay === 'reduceMoney' && item.useThreshold === 'satisfyMoney' && item.useScope === 'assignProduce') {
              // this.hasUsedCouponCard.push('满' + item.thresholdMoney + '减' + item.lapseAmount + '【' + item.productsName + '】')
              this.couponCardStr = '满' + item.thresholdMoney + '减' + item.lapseAmount + '【' + item.productsName + '】'
            } else if (item.preferentialWay === 'reduceMoney' && item.useThreshold === 'noThreshold' && item.useScope === 'allProduce') {
              // this.hasUsedCouponCard.push('直减' + item.lapseAmount + '【所有商品】')
              this.couponCardStr = '直减' + item.lapseAmount + '【所有商品】'
            } else if (item.preferentialWay === 'reduceMoney' && item.useThreshold === 'noThreshold' && item.useScope === 'assignProduce') {
              // this.hasUsedCouponCard.push('直减' + item.lapseAmount + '【' + item.productsName + '】')
              this.couponCardStr = '直减' + item.lapseAmount + '【' + item.productsName + '】'
            }
          })
        }
        if (this.stStoreOrder.isCustom !== null) {
          this.stStoreOrder.isCustom = res.data.isCustom.toString()
        } else {
          this.stStoreOrder.isCustom = '1'
        }
        if (this.stStoreOrder.isCustom === '0') {
          this.customContentShow = true
          this.rules1.customContent[0].required = true
        } else {
          this.customContentShow = false
          this.rules1.customContent[0].required = false
        }
      })
      // this.getDistributorStoreList()
    },
    getStGoodsInfoAllList (storeId) {
      let params = {
        state: '0'
      }
      this.$api.getStGoodsInfoAllList(params).then(res => {
        this.serchName = res.data
      })
    },
    getSelectCoupon (data) {
      if (data) {
        this.pageCouponId = data.couponId
        this.pageCouponHistoryId = data.couponHistoryId
        // 全部商品折扣券
        if (data.preferentialWay === 'pricing' && data.useScope === 'allProduce') {
          this.couponCard = data.preferentialIntensity * 0.1 + '折' + '【所有商品】'
        } else if (data.preferentialWay === 'pricing' && data.useScope === 'assignProduce') {
          this.couponCard = data.preferentialIntensity * 0.1 + '折' + '【' + data.productsName + '】'
        } else if (data.preferentialWay === 'reduceMoney' && data.useThreshold === 'satisfyMoney' && data.useScope === 'allProduce') {
          this.couponCard = '满' + data.thresholdMoney + '减' + data.lapseAmount + '【所有商品】'
        } else if (data.preferentialWay === 'reduceMoney' && data.useThreshold === 'satisfyMoney' && data.useScope === 'assignProduce') {
          this.couponCard = '满' + data.thresholdMoney + '减' + data.lapseAmount + '【' + data.productsName + '】'
        } else if (data.preferentialWay === 'reduceMoney' && data.useThreshold === 'noThreshold' && data.useScope === 'allProduce') {
          this.couponCard = '直减' + data.lapseAmount + '【所有商品】'
        } else if (data.preferentialWay === 'reduceMoney' && data.useThreshold === 'noThreshold' && data.useScope === 'assignProduce') {
          this.couponCard = '直减' + data.lapseAmount + '【' + data.productsName + '】'
        }
        this.couponShow = false
      } else {
        this.couponShow = false
      }
    },
    handleSelect (item) {
      let count = 0
      this.tableData.forEach((items, index) => {
        if (items.goodsId === item.goodsId) {
          count++
        }
      })
      if (count === 0) {
        let orderGoodsList = {}
        orderGoodsList.firstPictureUrl = item.firstPictureUrl
        orderGoodsList.goodsName = item.goodsName
        orderGoodsList.goodsCode = item.goodsCode
        orderGoodsList.artNo = item.artNo
        orderGoodsList.goodsMsrp = item.goodsMsrp
        orderGoodsList.discountPrice = item.goodsMsrp * item.discount / 10
        orderGoodsList.discount = item.discount
        orderGoodsList.num = item.num
        orderGoodsList.oldNum = item.num
        orderGoodsList.goodsId = item.goodsId
        orderGoodsList.pricingMode = item.pricingMode
        orderGoodsList.changePercent = false
        this.tableData.push(orderGoodsList)
      }
      let allPrice = 0.00
      let oldAllPrice = 0.00
      this.tableData.forEach((item, index) => {
        item.realPay = item.num * item.discountPrice
        allPrice += item.realPay
        if (item.goodsMsrp !== '' && item.goodsMsrp !== null) {
          oldAllPrice += item.num * item.goodsMsrp
        } else {
          oldAllPrice += item.num * item.discountPrice
        }
      })
      this.stStoreOrder.orderDiscountPrice = allPrice
      this.shopDiscount = allPrice
      this.stStoreOrder.totalMoney = allPrice
      this.shopPrice = oldAllPrice
      this.stStoreOrder.orderDiscount = 10
    },
    handleIconClick (ev) {
    },
    querySearch (queryString, cb) {
      var restaurants = this.serchName
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.goodsName.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    submit (formName) {
      let orderDetails = []
      let noMoneyCount = 0
      if (this.tableData.length < 1) {
        this.$message.error('请至少选择一个商品')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.areaSelected.length < 1) {
            this.$message.error('请选择收货地址')
            return
          }
          let area = []
          area = this.areaSelected.slice(0, 3)
          this.stStoreOrder.provinceAdcode = JSON.stringify(area)
          // 新增商品修改
          this.tableData.forEach((item, index) => {
            if (item.discountPrice.toString().length > 8) {
              this.$message.error('价格输入不能超过8位字符')
              return false
            }
            if (item.discountPrice === null || item.discountPrice === '' || item.discountPrice === 0) {
              noMoneyCount++
            }
            this.loading = true
            let Detail = {
              goodsId: item.goodsId,
              goodsMsrp: item.goodsMsrp,
              discountPrice: item.discountPrice,
              goodsNum: item.num,
              realPay: item.realPay
            }
            orderDetails.push(Detail)
          })
          if (noMoneyCount > 0) {
            this.$message.error('议价商品,价格不能为空,请修改价格后再次提交')
            return false
          }
          if (this.stStoreOrder.isCustom === '1') {
            this.stStoreOrder.customContent = ''
          }
          let params = {
            changeGoods: this.changeGoods,
            jsonData: JSON.stringify(orderDetails),
            // 订单总价
            totalMoney: this.stStoreOrder.totalMoney,
            // 订单商品打折价
            orderDiscountPrice: this.stStoreOrder.orderDiscountPrice,
            // 订单Id
            orderId: this.stStoreOrder.orderId,
            // 客户手机号
            // customerMobile: this.stStoreOrder.customerMobile,
            // storeId: this.stStoreOrder.storeId,
            // shoppingGuide: this.stStoreOrder.shoppingGuide,
            //  收件人
            consignee: this.stStoreOrder.consignee,
            // 收件人电话
            consigneeMobile: this.stStoreOrder.consigneeMobile,
            // 省市县Code
            provinceAdcode: this.stStoreOrder.provinceAdcode,
            // 详细地址
            detailAddress: this.stStoreOrder.detailAddress,
            // 提货方式
            deliveryMode: this.stStoreOrder.deliveryMode,
            // 预约日期
            reserDate: this.stStoreOrder.reserDate,
            // isInstall: this.stStoreOrder.isInstall,
            // 备注
            remarks: this.stStoreOrder.remarks,
            // 销售凭证号
            salesVoucherNum: this.stStoreOrder.salesVoucherNum,
            couponHistoryId: this.pageCouponHistoryId,
            couponId: this.pageCouponId,
            orderDiscount: this.shopDiscount,
            // 是否定制
            isCustom: this.stStoreOrder.isCustom,
            // 定制内容
            customContent: this.stStoreOrder.customContent,
            state: this.stStoreOrder.state,
            orderType: 'store'
          }
          this.$api.editStStoreOrder(params).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.$router.push({path: '/myStore/order/orderManage'})
              this.loading = false
            } else {
              this.$message.error(res.msg)
              this.loading = false
            }
          })
        }
      })
    },
    backEdit (value) {
      this.active = value
    },
    changePrice () {
      this.isChangePrice = true
    },
    cancelChangePrice () {
      this.isChangePrice = false
    },
    changePercent (index) {
      console.log(this.tableData[index].changePercent)
      this.tableData[index].changePercent = true
    },
    cancelChangePercent (index) {
      this.tableData[index].changePercent = false
    },
    // 数字选择框
    handleChange (value) {
      // 执行订单总价计算
      let allPrice = 0.00
      this.tableData.forEach((item, index) => {
        allPrice += item.num * item.discountPrice
        item.realPay = item.num * item.discountPrice
      })
      this.stStoreOrder.totalMoney = allPrice
      this.shopDiscount = allPrice
      this.stStoreOrder.orderDiscount = 10
      this.stStoreOrder.orderDiscountPrice = allPrice
    },
    useCoupon () {
      this.couponShow = true
    },
    hideCoupon () {
      if (this.couponShow) {
        this.couponShow = false
      }
    },
    handleSelectionChange (val, row) {
      this.chooseShop = val
    },
    deleteShop () {
      this.chooseShop.forEach((item, index) => {
        let ind = this.tableData.indexOf(item)
        if (ind > -1) {
          this.tableData.splice(ind, 1)
        }
      })
      // 重新执行操作
      let allPrice = 0.00
      let oldAllPrice = 0.00
      this.tableData.forEach((item, index) => {
        item.realPay = item.num * item.discountPrice
        allPrice += item.realPay
        if (item.goodsMsrp !== '' && item.goodsMsrp !== null) {
          oldAllPrice += item.num * item.goodsMsrp
        } else {
          oldAllPrice += item.num * item.discountPrice
        }
      })
      this.stStoreOrder.orderDiscountPrice = allPrice
      this.shopDiscount = allPrice
      this.shopPrice = oldAllPrice
      this.stStoreOrder.totalMoney = allPrice
      this.couponCard = ''
    }
  },
  components: { breadCrumb, topTips, search, orderCoupon, orderReceipt }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.add-order {
  margin: 0 auto;
  padding-top: 106px;
  .process {
    margin-top: 20px;
    .process-item {
      margin-bottom: 10px;
      .circle {
        &.succ {
          background-color: #737685 !important;
          i {
            color: #fff;
            font-size: 16px;
          }
        }
      }
     .search{
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            .auto-search{
              width: 400px;
              .el-input__inner{
                border: 1px solid #B3B5BA;
              }
              .el-icon-search{
                line-height: 34px;
              }
            }
            .advanced-search{
              height: 34px;
              margin-left: 5px;
              padding: 10px 20px;
            }
          }
      .order-num {
        margin: 20px 0;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .num {
          font-size: 24px;
          font-weight: bold;
          margin-right: 20px;
          i {
            font-size: 22px;
          }
        }
        .note {
          font-size: $md-size;
          color: #fff;
          padding: 2px 6px;
          border-radius: 4px;
          &.type1 {
            background-color: $yello-color;
          }
          &.type2 {
            background-color: #44af7b;
          }
          &.type3 {
            background-color: #7180f1;
          }
          &.type4 {
            background-color: #b3b5ba;
          }
        }
      }
      &.active {
        .top {
          .circle {
            background-color: $main-color;
            color: #fff;
          }
          .back-edit {
            padding: 8px;
            font-size: 16px;
          }
        }
      }
      &:last-child {
        .main-pro {
          &::after {
            display: none;
          }
        }
      }
      .main-pro {
        position: relative;
        &.step1 {
          padding: 80px 0 60px 40px;
        }
        &.step2 {
          padding: 20px 0 20px 00px;
          .order-submit {
            margin: 10px 0;
            text-align: center;
            button {
              padding: 15px 8px;
              width: 200px;
            }
          }
          // .search {
          //   justify-content: center;
          //   margin-bottom: 20px;
          // }
          .dis-afte {
            .black-color {
              font-weight: bold;
            }
            .change {
              span {
                color: $text-gray-color;
              }
            }
            .red-color {
              color: $main-color;
            }
            .price-op {
              display: flex;
              button {
                padding: 3px 8px;
              }
              input[type='text'] {
                border: 1px solid $input-border-color;
                height: 20px;
                border-radius: 4px;
                font-size: $xs-size;
                width: 80px;
                padding-left: 4px;
                margin-right: 4px;
              }
            }
          }
          .comm-summ {
            display: flex;
            justify-content: flex-end;
            padding-top: 10px;
            font-size: $md-size;
            // .kehu{
            //     width: 380px;
            //   .top{
            //     margin-top: 70px;
            //     padding: 0;
            //     .title{
            //       font-size: 16px;
            //       font-weight: bold;
            //       padding: 0;
            //     }
            //   }
            // }
            .item {
              padding: 10px 0;
              label {
                width: 116px;
                text-align: right;
                display: inline-block;
                margin-right: 20px;
              }
            }
            .comm-right {
              padding: 0;
              width: 300px;
              // text-align: right;
              border-left: 1px solid $border-color;
              position: relative;
              .price-op{
                padding-left: 40px;
                >span{
                  font-weight: normal;
                }
              }
              .blue-color {
                color: $blue-color;
              }
              .red-color {
                color: $main-color;
              }
            }
            .comm-left {
              padding: 0 40px;
            }
          }
          .info-tips {
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            border-top: 6px solid $gray-color;
            .info-name {
              font-size: $xlg-size;
              font-weight: bold;
            }
            button {
              padding: 4px 20px;
              border: 0;
              i {
                margin-right: 4px;
              }
            }
          }
          .img-view {
            width: 70px;
            height: 70px;
          }
          .comm-name {
            font-size: $md-size;
            font-weight: bold;
          }
          .comm-price {
            font-size: $xs-size;
            font-weight: bold;
          }
          .el-col-offset-12 {
            margin-right: 50%;
            margin-left: 0;
          }
        }
        .first-form {
          width: 470px;
          margin: 0 auto;
          .next-precess {
            padding-top: 22px;
            p {
              text-align: center;
              button {
                padding: 15px 8px;
                width: 200px;
              }
              &.title {
                font-size: $md-size;
                color: $text-gray-color;
                margin-top: 25px;
              }
            }
          }
        }
      }
      .top {
        display: flex;
        align-items: center;
        .circle {
          display: inline-block;
          width: 36px;
          height: 36px;
          line-height: 36px;
          border-radius: 50%;
          text-align: center;
          background-color: $gray-color;
          color: $text-main-color;
          font-size: $xs-size;
          margin: 0 20px;
        }
        .toptips {
          flex: 1;
        }
      }
    }
  }
}
.my-autocomplete{
  ul{
     li{
      background-color: rgb(58, 32, 32);
      border: 1px solid #000;
      &:hover{
        background-color: #F3F4F8;
      }
      .img-box{
        width: 90px;
        height: 90px;
        padding: 10px;
        display: inline-block;
        vertical-align: top;
        .img-size{
          width: 70px;
          height: 70px;
        }
      }
      .shop-info{
        display: inline-block;
        padding: 5px;
        .info-item{
          margin: 0 10px;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
        }
        .shop-name{
          font-size: 14px;
          font-weight: bold;
        }
        .shop-price{
          font-weight: bold;
        }
      }
    }
  }
}
</style>
