<template>
  <div class="add-order">
    <!-- <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb> -->
    <div class="process">
      <div class="process-item" :class="{active:active===0}">
        <div class="top">
          <span class="circle succ" v-if="active>0"><i class="el-icon-check"></i></span>
          <span class="circle" v-else>1</span>
          <top-tips :title="processFrist" class="toptips">
          <span slot="edit" v-show="active === 1">
            <el-button type="primary" class="back-edit" circle @click="backEdit(0)">
              <i class="el-icon-edit-outline"></i>
            </el-button>
          </span>
          </top-tips>
        </div>
        <div class="main-pro step1" v-show="active===0">
          <div class="first-form">
            <el-form :model="stStoreOrder" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="客户手机号：" prop="customerMobile">
                <el-input v-model="stStoreOrder.customerMobile" placeholder="请输入手机号" value=""></el-input>
                <span style="color: blue" v-show="flag">新用户</span>
              </el-form-item>
            </el-form>
            <div class="next-precess">
              <p>
                <el-button type="primary" @click="nextProcess(['ruleForm'])">下一步</el-button>
              </p>
              <p class="title">第一步操作完成后，可激活第二步操作</p>
            </div>
          </div>
        </div>
      </div>
      <div class="process-item" :class="{active:active===1}">
        <div class="top">
          <span class="circle succ" v-if="active>1"><i class="el-icon-check"></i></span>
          <span class="circle" v-else>2</span>
          <top-tips :title="processSec" class="toptips"></top-tips>
        </div>
        <div class="main-pro step2"  v-show="active===1">
          <!-- <blur-search :btnTitle="btnTitle" class="search"></blur-search> -->
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
                  <img :src="item.firstPictureUrl? item.firstPictureUrl:defaultImg" class="img-size" >
                  <!-- <div class="no-img" v-else>暂无商品图片</div> -->
                </div>
                <div class="shop-info">
                    <p class="info-item shop-name">{{item.goodsName}}</p>
                    <p class="info-item shop-id">商品编号: {{item.goodsCode}}</p>
                    <p class="info-item shop-num">货号: {{item.artNo}}</p>
                    <p class="info-item shop-price">价格：{{item.goodsMsrp}}</p>
                </div>
              </template>
            </el-autocomplete>
          </div>
          <div class="more-info">
            <div class="info-tips">
              <div class="info-name">商品信息</div>
              <div><el-button @click="deleteShop"> <i class="el-icon-delete"></i>删除</el-button></div>
            </div>
            <el-table
             v-loading="loading"
              :data="tableData"
              style="width: 100%"
              class="header-nobg"
              @select-all="handleSelectionChange"
              @select="handleSelectionChange"
              >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="img"
                label="图片"
                width="100">
                <template slot-scope="scope" >
                  <img :src="scope.row.firstPictureUrl" alt="" class="img-view">
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称/编号/货号"
                width="180px"
              >
                <template slot-scope="scope">
                  <p class="comm-name">{{scope.row.goodsName}}</p>
                  <p class="comm-num">商品编号：{{scope.row.goodsCode}}</p>
                  <p class="comm-num">货号：{{scope.row.artNo}}</p>
                   <p class="comm-price">定价方式：{{scope.row.pricingMode}}</p>
                  <p class="comm-price" v-if="scope.row.pricingMode === '定价'">单价：￥{{scope.row.goodsMsrp}}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="price"
                width="270px"
                label="折扣单价">
                <template slot-scope="scope">
                  <div class="dis-afte">
                    <div :class={change:scope.row.changePercent}>
                       <span class="black-color" v-if="scope.row.pricingMode === '定价'">折扣价：</span>
                       <span class="black-color" v-if="scope.row.pricingMode === '议价'">议价：</span>
                       <span>￥{{scope.row.discountPrice}}</span><i class="el-icon-edit-outline" v-show="!scope.row.changePercent" @click="changePercent(scope.$index)"></i>
                    </div>
                    <div class="price-op" v-show="scope.row.changePercent">
                      <span class="black-color"  v-if="scope.row.pricingMode === '议价'">议价：</span>
                      <span class="black-color"  v-if="scope.row.pricingMode === '定价'">折扣价：</span>
                      <input type="text" v-model.number="scope.row.discountPrice">
                      <el-button class="btn define" @click="changeDiscount(scope.$index)">确定</el-button>
                      <el-button class="btn cancel" @click="cancelChangePercent(scope.$index)">取消</el-button>
                    </div>
                  </div>
                   <div class="dis-afte" v-if="scope.row.pricingMode === '定价'" >
                    <div :class={change:isChangePrice}>
                       <span class="black-color">折扣率：</span> <span class="red-color">{{Math.floor((scope.row.discountPrice / scope.row.goodsMsrp ) * 1000) / 100}}折</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
                 <el-table-column
                prop="realPay"
                align="center"
                width="150px"
                label="商品总价">
              </el-table-column>
              <el-table-column
                prop="num"
                align="center"
                width="160px"
                label="数量">
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
                <!-- <p class="item"><label for="">运费：</label>0</p> -->
              </div>
              <div class="comm-right">
                <div class="item">
                  <div class="dis-afte">
                  <label>整单折扣价:</label>{{stStoreOrder.orderDiscountPrice}}<i class="el-icon-edit-outline" v-show="orderDiscountShow" @click="changeOrderShow" ></i>
                   <div class="price-op" v-show="!orderDiscountShow">
                      <span class="black-color">整单折扣价:</span>
                      <input type="text" v-model="stStoreOrder.orderDiscountPrice">
                      <el-button class="btn define" @click="changeAllOrderDiscount">确定</el-button>
                      <el-button class="btn cancel" @click="cancelAllOrderChangePercent">取消</el-button>
                    </div>
                    </div>
                </div>
                <p class="item"><label for="">整单折扣率:</label><span class="red-color">{{stStoreOrder.orderDiscountPrice !== 0 && stStoreOrder.orderDiscountPrice !== null && shopDiscount !== 0 && shopDiscount != null?Math.floor((stStoreOrder.orderDiscountPrice / shopDiscount) * 1000) / 100 :10}}折</span></p>
                 <p class="item">
                  <label for="">优惠券:</label><span class="blue-color">{{couponCard}}</span><i class="el-icon-edit-outline" @click="useCoupon"></i>
                </p>
                <p class="item"><label for="">应付总额:</label><span class="red-color">￥{{stStoreOrder.totalMoney}}</span></p>
                <order-coupon v-if="couponShow" :products="tableData" :mobile="stStoreOrder.customerMobile" :discountPrice="shopDiscount - stStoreOrder.orderDiscountPrice"
                @select-coupon="getSelectCoupon" @close-coupon="hideCoupon"></order-coupon>
              </div>
            </div>
              <div class="info-tips">
              <div class="info-name">客户信息</div>
            </div>
            <el-form  :model="stStoreOrder" :rules="rules1" ref="stStoreOrder2" label-width="120px" class="ruleForm">
              <el-row :gutter="24">
                <el-col :span="12" :offset="12">
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
                    <el-select v-model="stStoreOrder.deliveryMode" placeholder="请选择提货方式">
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
                <!-- <el-col :span="12" :offset="12">
                  <el-form-item label="是否安装" prop="isInstall">
                    <el-radio-group v-model="stStoreOrder.isInstall">
                      <el-radio label="安装"></el-radio>
                      <el-radio label="不安装"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col> -->
                <el-col :span="12" :offset="12">
                  <el-form-item label="备注" prop="remarks">
                    <el-input type="textarea" v-model="stStoreOrder.remarks"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="info-tips">
              <div class="info-name">其他信息</div>
            </div>
            <el-form :model="stStoreOrder" :rules="rules1" ref="stStoreOrder1" label-width="120px" class="ruleForm">
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
              <el-button type="primary" @click="submit(['stStoreOrder','stStoreOrder1','stStoreOrder2'])" :loading="loading">{{loading?'提交订单中':'提交订单'}}</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="process-item" :class="{active:active===2}">
        <div class="top">
          <span class="circle succ" v-if="active===2"><i class="el-icon-check"></i></span>
          <span class="circle" v-else>3</span>
          <top-tips :title="processThird" class="toptips"></top-tips>
        </div>
        <div class="main-pro step3"  v-show="active===2">
          <div class="suc-cont">
            <div class="title">
              <i class="iconfont icon-cion_comfirm"></i>订单{{stStoreOrder.orderNum}}已提交成功
            </div>
            <div class="info-view">
              <ul>
                <li>
                  <label for="">应付款：</label><div>￥{{stStoreOrder.totalMoney}}</div>
                </li>
                <li>
                  <label for="">本次实际付款：</label><div>￥{{stStoreOrder.accountPaid}}</div>
                </li>
                <li>
                  <label for="">收货人信息：</label>
                  <div class="user-info">
                    <p>{{stStoreOrder.consignee}} {{stStoreOrder.consigneeMobile}}</p>
                    <p>{{stStoreOrder.provinceAdcode}}{{stStoreOrder.detailAddress}}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="butns">
              <el-button @click="backOrder()"  data-code="6010007">返回订单</el-button>
              <el-button @click="editOrder(stStoreOrder.orderId)" data-code="6010006">修改订单</el-button>
              <el-button @click="showReceipt(stStoreOrder)"  data-code="6010002">收款</el-button>
              <!-- <el-button>打印</el-button> -->
            </div>
          </div>
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
// import blurSearch from '../../../components/public/blurSearch'
import orderCoupon from '../../../components/order/orderCoupon'
import orderReceipt from '../../../components/order/orderReceipt'
import { regionData } from 'chinaArea'
import { judgeButton } from '../../../tool/Utils'
import defaultImg from '../../../assets/image/image_placeholder.png'
export default {
  data () {
    return {
      newAllDiscount: null,
      orderDiscountShow: true,
      newDiscount: null,
      couponCard: '无',
      serchName: [],
      searchValue: '',
      chooseShop: [],
      // 省市县
      options: regionData,
      // 提货方式
      deliveryModeList: [],
      newprops: {
        value: 'label'
      },
      defaultImg,
      // 送货时间的禁用选择
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() <= Date.now() - 86400000
        }
      },
      areaSelected: [],
      couponShow: false,
      btnTitle: '全部商品',
      nums: 0,
      storeList: [],
      staffData: [],
      ruleForm: {
        customerMobile: '',
        storeId: ''
      },
      stStoreOrder: {
        orderDiscount: 10,
        orderDiscountPrice: 0.00,
        isCustom: '1'
      },
      order: {},
      value1: '',
      isChangePrice: false,
      isChangePercent: false,
      isShowReceipt: false,
      tableData: [],
      rules: {
        customerMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
        ]
      },
      stMemberInfo: {
        memberName: '',
        mobile: '',
        inviter: ''
      },
      ruleForm1: {
        totalMoney: '',
        accountPaid: '',
        orderId: '',
        consignee: '',
        consigneeMobile: '',
        districtAdcode: '',
        detailAddress: '',
        deliveryMode: '',
        reserDate: '',
        isInstall: '',
        remarks: '',
        salesVoucherNum: '',
        customContentShow: ''
      },
      flag: false,
      goodsFlag: false,
      goodsMessage: '',
      rules1: {
        consignee: [
          { required: true, message: '请输入收货人', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        consigneeMobile: [
          { required: true, message: '请选择输入电话号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
        ],
        areaSelected: [
          { required: false, message: '请选择收货地址', trigger: 'blur' }
        ],
        detailAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        // deliveryMode: [
        //   { required: true, message: '请选择提货方式', trigger: 'change' }
        // ],
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
        customerTrueName: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' },
          { max: 10, message: '长度最大为10个字符', trigger: 'blur' }
        ],
        salesVoucherNum: [
          { max: 20, message: '输入长度最大为20个字符', trigger: 'blur' }
        ]
      },
      processFrist: {
        title: '第一步：开始订单',
        unfold: false
      },
      processSec: {
        title: '第二步：填写信息，提交',
        unfold: false
      },
      processThird: {
        title: '第三步：提交反馈',
        unfold: false
      },
      active: 0,
      shopDiscount: 0.00,
      // 页面所选择的优惠券id
      pageCouponId: '',
      // 当前优惠券历史id
      pageCouponHistoryId: '',
      shopPrice: 0,
      loading: false,
      customContentShow: false,
      customerTrueNameDisabled: false
    }
  },
  // 数据初始化方法
  mounted () {
    this.getDeliveryModeList()
    this.getStStoreOrder()
    this.getButton()
  },
  watch: {
    'stStoreOrder.customerMobile' () {
      if (this.stStoreOrder.customerMobile) {
        if (this.stStoreOrder.customerMobile.length === 11) {
          this.findMobile(this.stStoreOrder.customerMobile)
        } else {
          this.flag = false
        }
      }
    }
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
        allPrice += item.num * (item.goodsMsrp * (item.discount / 10))
      })
      return allPrice
    },
    ...mapGetters(['powerButton'])
  },
  methods: {
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
    changeAllOrderDiscount () {
      var reg = /^[0-9]+(.[0-9]{1,2})?$/
      if (this.stStoreOrder.orderDiscountPrice > this.shopDiscount) {
        this.$message.error('折扣价必须小于订单总价')
        this.goodsFlag = true
        this.goodsMessage = '折扣价必须小于订单总价'
      } else if (!reg.test(this.stStoreOrder.orderDiscountPrice)) {
        this.$message.error('整单折扣价请输入两位小数')
        this.goodsFlag = true
        this.goodsMessage = '整单折扣价请输入两位小数'
      } else {
        this.orderDiscountShow = true
        // 设置整单折扣
        this.stStoreOrder.totalMoney = this.stStoreOrder.orderDiscountPrice
        this.goodsFlag = false
        this.goodsMessage = ''
      }
    },
    cancelAllOrderChangePercent () {
      this.newAllDiscount = null
      this.stStoreOrder.orderDiscountPrice = this.shopDiscount
      this.orderDiscountShow = true
    },
    changeOrderShow () {
      this.orderDiscountShow = !this.orderDiscountShow
    },
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    // 商品列表折扣变化
    changeDiscount (index) {
      var reg = /^[0-9]+(.[0-9]{1,2})?$/
      if (this.tableData[index].goodsMsrp < this.tableData[index].discountPrice && this.tableData[index].pricingMode === '定价') {
        this.tableData[index].discountPrice = this.tableData[index].goodsMsrp
        this.$message.error('折扣价不得大于原价')
        this.goodsFlag = true
        this.goodsMessage = '折扣价不得大于原价'
      } else if (this.tableData[index].discountPrice.toString().length > 8) {
        this.$message.error('价格输入不能超过8位字符')
        this.goodsFlag = true
        this.goodsMessage = '价格输入不能超过8位字符'
      } else if (!reg.test(this.tableData[index].discountPrice)) {
        this.$message.error('单品折扣价格请输入两位小数')
        this.goodsFlag = true
        this.goodsMessage = '单品折扣价格请输入两位小数'
      } else if (this.tableData[index].pricingMode === '议价' && this.tableData[index].discountPrice.toString().length === 0) {
        this.$message.error('议价商品,议价不能为空')
        this.goodsFlag = true
        this.goodsMessage = '议价商品,议价不能为空'
      } else if (this.tableData[index].pricingMode === '议价') {
        this.tableData[index].changePercent = false
        this.newDiscount = null
        // 执行订单总价计算
        let allPrice = 0.00
        let oldAllPrice = 0.00
        this.tableData.forEach((item, index) => {
          item.realPay = item.num * item.discountPrice
          allPrice += item.num * item.discountPrice
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
        this.goodsFlag = false
        this.goodsMessage = ''
      } else if (this.tableData[index].pricingMode === '定价') {
        this.tableData[index].changePercent = false
        this.newDiscount = null
        // 执行订单总价计算
        let allPrice = 0.00
        let oldAllPrice = 0.00
        this.tableData.forEach((item, index) => {
          item.realPay = item.num * item.discountPrice
          allPrice += item.num * item.discountPrice
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
        this.goodsFlag = false
      }
    },
    // 查询输入客户电话是否存在
    findMobile (value) {
      let params = {
        customerMobile: value
      }
      this.$api.findorderMemberMobile(params).then(res => {
        this.stStoreOrder.isCustom = '1'
        if (res.code === 0) {
          this.stStoreOrder.customerTrueName = res.data.memberName
          this.stStoreOrder.consignee = res.data.memberName
          this.stStoreOrder.consigneeMobile = res.data.mobile
          if (res.data.memberRegion !== null && res.data.memberRegion !== undefined && res.data.memberRegion !== '[]') {
            this.stStoreOrder.areaSelected = JSON.parse(res.data.memberRegion)
          }
          if (res.data.detailAddress !== null && res.data.detailAddress !== '') {
            this.stStoreOrder.detailAddress = res.data.detailAddress
          }
          this.flag = false
          this.customerTrueNameDisabled = true
        } else {
          this.stStoreOrder.customerTrueName = ''
          this.stStoreOrder.consignee = ''
          this.stStoreOrder.consigneeMobile = ''
          this.stStoreOrder.areaSelected = []
          this.stStoreOrder.detailAddress = ''
          this.flag = true
          this.customerTrueNameDisabled = false
        }
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
    handleSelectionChange (val, row) {
      this.chooseShop = val
      console.log(this.chooseShop)
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
    },
    allShops (results) {
      // this.querySearch()
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
    handleSelect (item) {
      this.couponShow = false
      if (this.tableData.indexOf(item) === -1) {
        this.tableData.push(item)
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
      }
    },
    handleIconClick (ev) {
    },
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
    // 获取订单信息详情
    getStStoreOrder () {
      let params = {
        orderId: this.$route.query.orderId
      }
      this.$api.getStStoreOrder(params).then(res => {
        this.stStoreOrder = res.data
      })
      // this.getDistributorStoreList()
      // this.getStGoodsInfoAllList()
    },
    getStGoodsInfoAllList (storeId) {
      let params = {
        state: '0'
      }
      this.$api.getStGoodsInfoAllList(params).then(res => {
        this.serchName = res.data
        this.serchName.forEach((item, index) => {
          item.discountPrice = item.goodsMsrp
        })
      })
    },
    submit (formName) {
      let _this = this
      let orderDetails = []
      let noMoneyCount = 0
      let correctList = []
      if (_this.tableData.length < 1) {
        this.$message.error('请至少选择一个商品')
        return false
      }
      if (this.goodsFlag) {
        this.$message.error(this.goodsMessage)
        return false
      }
      for (var value of formName) {
        _this.$refs[value].validate((valid) => {
          correctList.push(valid)
        })
      }
      _this.tableData.forEach((item, index) => {
        if (item.discountPrice === null || item.discountPrice === '' || item.discountPrice === 0) {
          noMoneyCount++
        }
        if (item.discountPrice.toString().length > 8) {
          this.goodsFlag = true
          this.goodsMessage = '价格输入不能超过8位字符'
          return false
        } else {
          this.goodsFlag = false
          this.goodsMessage = ''
        }
        let Detail = {
          goodsId: item.goodsId,
          goodsMsrp: item.goodsMsrp,
          discountPrice: item.discountPrice,
          goodsNum: item.num,
          realPay: item.realPay
        }
        orderDetails.push(Detail)
      })
      if (this.goodsFlag) {
        this.$message.error(this.goodsMessage)
        return false
      }
      if (noMoneyCount > 0) {
        this.$message.error('议价商品,价格不能为空,请修改价格后再次提交')
        return false
      }
      // 判断校验结果中是否存在false值
      if (correctList.indexOf(false) === -1) {
        if (this.areaSelected.length < 1) {
          this.$message.error('请选择收货地址')
          return
        }
        this.loading = true
        let area = []
        area = this.areaSelected.slice(0, 3)
        this.stStoreOrder.provinceAdcode = JSON.stringify(area)
        if (this.stStoreOrder.isCustom === '1') {
          this.stStoreOrder.customContent = ''
        }
        let params = {
          totalMoney: this.stStoreOrder.totalMoney,
          accountPaid: this.stStoreOrder.accountPaid,
          customerMobile: this.stStoreOrder.customerMobile,
          // storeId: this.stStoreOrder.storeId,
          // shoppingGuide: this.stStoreOrder.shoppingGuide,
          consignee: this.stStoreOrder.consignee,
          consigneeMobile: this.stStoreOrder.consigneeMobile,
          provinceAdcode: this.stStoreOrder.provinceAdcode,
          detailAddress: this.stStoreOrder.detailAddress,
          deliveryMode: this.stStoreOrder.deliveryMode,
          reserDate: this.stStoreOrder.reserDate,
          // isInstall: this.stStoreOrder.isInstall,
          remarks: this.stStoreOrder.remarks,
          salesVoucherNum: this.stStoreOrder.salesVoucherNum,
          jsonData: JSON.stringify(orderDetails),
          // 订单折扣
          // orderDiscount: this.stStoreOrder.orderDiscount,
          orderDiscount: this.shopDiscount,
          orderDiscountPrice: this.stStoreOrder.orderDiscountPrice,
          couponHistoryId: this.pageCouponHistoryId,
          couponId: this.pageCouponId,
          orderType: 'store',
          // 是否定制
          isCustom: this.stStoreOrder.isCustom,
          // 定制内容
          customContent: this.stStoreOrder.customContent,
          customerTrueName: this.stStoreOrder.customerTrueName
        }
        this.$api.saveStStoreOrder(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.active = 2
            JSON.parse(res.data.provinceAdcode).forEach(el => {
              if (res.data.provinceAdcode.indexOf('[') !== -1) {
                res.data.provinceAdcode = ''
                res.data.provinceAdcode = el
              } else {
                res.data.provinceAdcode += el
              }
            })
            this.stStoreOrder = res.data
            this.stStoreOrder.nonPayment = this.stStoreOrder.totalMoney
            // this.$router.push({path: '/myStore/order/orderManage'})
            this.loading = false
          } else {
            this.$message.error(res.msg)
            this.loading = false
          }
        })
      } else {
        this.$message.error('请按要求填写页面红色标注必填项')
      }
    },
    backOrder () {
      this.$router.push({ path: '/myStore/order/orderManage' })
    },
    editOrder (orderId) {
      this.$router.push({path: '/myStore/order/orderEdit', query: {orderId: orderId}})
    },
    nextProcess (formName) {
      if (this.stStoreOrder.customerMobile === null || this.stStoreOrder.customerMobile === '') {
        this.$message.error('请输入手机号码')
        return false
      }
      if (this.stStoreOrder.customerMobile.length !== 11) {
        this.$message.error('请输入正确手机号码')
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.active++ > 2) this.active = 0
        } else {
          return false
        }
      })
      // if (this.active++ > 2) this.active = 0
      this.getStGoodsInfoAllList(this.stStoreOrder.storeId)
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
      this.tableData[index].changePercent = true
    },
    cancelChangePercent (index) {
      this.tableData[index].changePercent = false
      this.tableData[index].discountPrice = this.tableData[index].goodsMsrp
    },
    // 数字选择框事件
    handleChange (value) {
      // 执行订单总价计算
      this.couponCard = '无'
      let allPrice = 0.00
      let oldAllPrice = 0.00
      // var reg = RegExp(//)
      this.tableData.forEach((item, index) => {
        // console.log('处理前: ' + item.num)
        if (item.num.toString().indexOf('.') !== -1) {
          console.log('处理前' + item.num)
          item.num = item.num.toString().split('.')[0]
          console.log('处理后' + item.num)
        }
        // item.num = Math.ceil(item.num)
        // console.log('处理后: ' + item.num)
        // tableData2.push(item)
        item.realPay = item.num * item.discountPrice
        allPrice += item.num * item.discountPrice
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
    },
    useCoupon () {
      this.couponShow = true
    },
    hideCoupon () {
      if (this.couponShow) {
        this.couponShow = false
      }
    },
    showReceipt (value) {
      this.isShowReceipt = true
      this.order = value
    },
    handleClose () {
      this.isShowReceipt = false
    },
    hideDialog () {
      this.isShowReceipt = false
      this.$router.push({path: '/myStore/order/orderManage'})
    }
  },
  components: {breadCrumb, topTips, orderCoupon, orderReceipt}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/elselect';
.add-order{
  margin:0 auto;
  padding-top: 106px;
  .process{
    margin-top: 20px;
    .process-item{
      margin-bottom: 10px;
      .circle{
        &.succ{
          background-color: #737685 !important;
          i{
            color:#fff;
            font-size: 16px;
          }
        }
      }
      &.active{
        .top{
          .circle{
            background-color: $main-color;
            color: #fff;
          }
          .back-edit{
            padding:8px;
            font-size: 16px;
          }
        }
      }
      &:last-child{
        .main-pro{
          &::after{
            display: none;
          }
        }
      }
      .main-pro{
        position: relative;
        &.step1{
          padding: 80px 0 60px 40px;
        }
        &.step2{
          padding: 20px 0 20px 80px;
          .order-submit{
            margin: 10px 0;
            text-align: center;
            button{
              padding: 15px 8px;
              width: 200px;
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
          .dis-afte{
            .black-color{
              font-weight: bold;
            }
            .change{
              span{
                color:$text-gray-color;
              }
            }
            .red-color{
              color:$main-color;
            }
            .price-op{
              display: flex;
              button{
                padding:3px 8px;
              }
              input[type='text']{
                border:1px solid $input-border-color;
                height:20px;
                border-radius: 4px;
                font-size: $xs-size;
                width:80px;
                padding-left:4px;
                margin-right: 4px;
              }
            }
          }
          .comm-summ{
            display: flex;
            justify-content: flex-end;
            padding-top:10px;
            font-size: $md-size;
            // .kehu{
            //   width: 330px;
            //   flex: 1;
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
            .item{
                padding: 10px 0;
                label{
                  width:90px;
                  text-align:right;
                  display: inline-block;
                  margin-right: 20px;
                }
              }
            .comm-right{
              .price-op{
                padding-left: 40px;
                >span{
                  font-weight: normal;
                }
              }
              padding:0;
              width: 300px;
              // text-align: right;
              border-left:1px solid $border-color;
              position: relative;
              .blue-color{
                color:$blue-color;
              }
              .red-color{
                color:$main-color;
              }
            }
            .comm-left{
              padding:0 35px;
            }
          }
          .info-tips{
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            border-top:6px solid $gray-color;
            .info-name{
              font-size: $xlg-size;
              font-weight: bold;
            }
            button{
              padding: 4px 20px;
              border: 0;
              i{
                margin-right: 4px;
              }
            }
          }
          .img-view{
            width:70px;
            height:70px;
          }
          .comm-name{
            font-size: $md-size;
            font-weight: bold;
          }
          .comm-price{
            font-size: $xs-size;
            font-weight: bold;
          }
          .el-col-offset-12{
            margin-right: 50%;
            margin-left: 0;
          }
        }
        &.step3{
          padding: 40px 0 40px 80px;
          .suc-cont{
            width:470px;
            margin: 0 auto;
            text-align: center;
            .title{
              color:$main-color;
              font-size: 24px;
              display: flex;
              justify-items: center;
              align-items: center;
              text-align: center;
             .icon-cion_comfirm{
               font-size: 50px;
               margin-right: 8px;
             }
            }
            .butns{
              margin: 20px 0;
            }
            .info-view{
              padding: 0 50px;
              ul{
                li{
                  font-size: $md-size;
                  text-align: left;
                  display: flex;
                  margin: 10px 0;
                  label{
                    color:$text-gray-color;
                    width: 100px;
                    text-align: right;
                    display: inline-block;
                    margin-right: 10px;
                  }
                  .user-info{
                    p{
                      margin-bottom: 10px;
                    }
                  }
                }
              }
            }
          }
        }
        &::after{
          content: '';
          position: absolute;
          width:2px;
          height:95%;
          top:5%;
          left: 38px;
          background-color: $border-color;
        }
        .first-form{
          width: 470px;
          margin: 0 auto;
          .next-precess{
            padding-top: 22px;
            p{
              text-align: center;
              button{
                padding: 15px 8px;
                width: 200px;
              }
              &.title{
                font-size: $md-size;
                color:$text-gray-color;
                margin-top: 25px;
              }
            }
          }
        }
      }
      .top{
        display: flex;
        align-items: center;
        .circle{
          display: inline-block;
          width:36px;
          height:36px;
          line-height:36px;
          border-radius: 50%;
          text-align: center;
          background-color: $gray-color;
          color:$text-main-color;
          font-size: $xs-size;
          margin: 0 20px;
        }
        .toptips{
          flex:1;
        }
      }
    }
  }
}
.my-autocomplete{
  ul{
     li{
      background-color: #fff;
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
        .no-img{
          width:80px;
          height:80px;
          display: inherit;
          color: #A7AAB2;
          font-weight: 700;
          font-size: 12px;
          border: 1px solid #A7AAB2;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .shop-info{
        display: inline-block;
        padding: 5px;
        .info-item{
          width: 260px;
          overflow: hidden;
          text-overflow:ellipsis;
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
