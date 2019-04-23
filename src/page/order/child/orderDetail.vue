<template>
  <div class="order-detail">
    <!-- <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb> -->
    <p class="order-num">
      <span class="num">订单号：<i>{{orderDetialInfo.orderNum}}</i></span>
      <!-- <span class="note type3">已完成</span> -->
    </p>
    <div class="detail-list">
      <div class="detail-item">
        <top-tips :title="optional" @thisRef="showList"></top-tips>
         <el-collapse-transition>
          <div class="detail-cont">
            <el-table
              :data="orderDetialInfo.orderDetails"
              style="width: 100%"
              class="header-nobg"
              >
              <el-table-column
                prop="firstPictureUrl"
                label="图片"
                width="140">
                <template slot-scope="scope" >
                  <img :src="scope.row.firstPictureUrl" alt="" class="img-view">
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称/编号/货号/定价方式"
              >
                <template slot-scope="scope">
                  <p class="comm-name">商品名称:{{scope.row.goodsName}}</p>
                  <p class="comm-num">商品编号：{{scope.row.goodsCode}}</p>
                  <p class="comm-num">货号：{{scope.row.artNo}}</p>
                  <p class="comm-num">定价方式:{{scope.row.pricingMode}}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="goodsMsrp"
                align="center"
                width="200px"
                label="单价">
              </el-table-column>
                <el-table-column
                prop="zheKou"
                align="center"
                width="100px"
                label="折扣">
              </el-table-column>
              <el-table-column
                prop="discountPrice"
                align="center"
                width="100px"
                label="折后">
                 </el-table-column>
                 <el-table-column
                prop="goodsNum"
                align="center"
                width="100px"
                label="数量">
              </el-table-column>
                <el-table-column
                prop="realPay"
                align="center"
                width="100px"
                label="总价">
              </el-table-column>
            </el-table>
            <div class="comm-summ">
              <div class="comm-left">
                <p>
                  <label for="">总件数：</label>{{allProductCount}}
                </p>
                 <p>
                  <label for="">原价总额：</label>￥{{oldAllMoney}}
                </p>
                <p>
                  <label for="">订单总额：</label>￥{{orderDetialInfo.orderDiscount}}
                </p>
                <!-- <p><label for="">运费：</label>￥0.00</p> -->
              </div>
              <div class="comm-right">
                <!-- <p>
                  <label for=""> 优惠券:</label>
                    <span class="blue-color">
                        <font color="red" >
                          <div v-for="(item, index) in couponCard" :key="index" class="coupon-list">
                            {{item}}
                          </div>
                        </font>
                      </span>
                </p> -->
                 <p class="item">
                    <label for="">优惠券:</label><span class="blue-color">
                      {{couponCardStr}}
                      </span>
                    <!-- <i class="el-icon-edit-outline" @click="useCoupon"></i> -->
                  </p>
                  <p>
                  <label for="">整单折扣价:</label><span class="red-color">￥{{orderDetialInfo.orderDiscountPrice}}</span>
                </p>
                <p>
                  <label for="">整单折扣:</label><span class="blue-color">{{Math.floor((orderDetialInfo.orderDiscountPrice / orderDetialInfo.orderDiscount ) * 1000) / 100}}折</span>
                </p>
                <p><label for="">应付总额:</label><span class="red-color">￥{{orderDetialInfo.totalMoney}}</span></p>
              </div>
            </div>
          </div>
         </el-collapse-transition>
      </div>
      <div class="detail-item">
         <top-tips :title="kehuInfo" @thisRef="showList"></top-tips>
        <div class="kehu">
           <div>姓名: {{orderDetialInfo.customerTrueName}}</div>
        </div>
        <top-tips :title="orderInfo" @thisRef="showList"></top-tips>
         <el-collapse-transition>
          <div>
            <el-table
              :data="tableData1"
              style="width: 100%"
              class="header-nobg"
              >
              <el-table-column
                prop="info"
                label="收货人信息"
                width="350px"
              >
                <template slot-scope="scope">
                  <p>姓名：<span class="black-color">{{orderDetialInfo.consignee}}</span></p>
                  <p>电话：<span class="black-color">{{orderDetialInfo.consigneeMobile}}</span></p>
                  <p>收货地址：<span class="black-color">{{areaSelected}}{{orderDetialInfo.detailAddress}}</span></p>
                  <p>定制内容:<span class="black-color">{{orderDetialInfo.customContent !== null?orderDetialInfo.customContent:''}}</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="deliveryMode"
                label="提货方式"
                width="150px"
              >  <template slot-scope="scope">
               <p><span class="black-color">{{orderDetialInfo.deliveryMode}}</span></p></template>
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                width="250px"
                label="提货日期">
                <template slot-scope="scope">
                  <p><span class="black-color">{{orderDetialInfo.reservationDate}}</span>
                  </p>
               </template>
              </el-table-column>
              <!-- <el-table-column
                prop="install"
                align="center"
                width="100px"
                label="是否安装">
                  <template slot-scope="scope">
                  <p><span class="black-color">{{orderDetialInfo.isInstall}}</span>
                  </p>
               </template>
              </el-table-column> -->
              <!-- <el-table-column
                prop="shop"
                align="center"
                width="250px"
                label="门店">
                  <template slot-scope="scope">
                  <p><span class="black-color">{{orderDetialInfo.storeName}}</span>
                  </p>
               </template>
              </el-table-column> -->
              <el-table-column
                prop="shoppingGuideName"
                align="center"
                width="200px"
                label="导购员">
                <template slot-scope="scope">
                  <p><span class="black-color">{{orderDetialInfo.shoppingGuideName}}</span>
                  </p>
               </template>
              </el-table-column>
            </el-table>
          </div>
         </el-collapse-transition>
      </div>
      <div class="detail-item">
        <top-tips :title="receiptInfo" @thisRef="showList"></top-tips>
         <el-collapse-transition>
          <div>
            <el-table
              :data="orderMoneys"
              style="width: 100%"
              class="header-nobg"
              >
              <el-table-column
                prop="createTime"
                label="收款时间"
              >
              </el-table-column>
              <el-table-column
                prop="totalMoney"
                label="订单总金额"
                width="100px"
              >
              </el-table-column>
              <el-table-column
                prop="payment"
                align="center"
                width="200px"
                label="收款金额">
              </el-table-column>
              <el-table-column
                prop="nonPayment"
                align="center"
                width="200px"
                label="未付款金额">
              </el-table-column>
              <el-table-column
                prop="creatorName"
                align="center"
                width="150px"
                label="收款人">
              </el-table-column>
            </el-table>
          </div>
         </el-collapse-transition>
      </div>
      <!-- <div class="detail-item">
        <top-tips :title="receiptReturnInfo" @thisRef="showList"></top-tips>
         <el-collapse-transition>
          <div>
            <el-table
              :data="orderMoneysReturn"
              style="width: 100%"
              class="header-nobg"
              >
              <el-table-column
                prop="createTime"
                 width="300px"
                label="退款时间"
              >
              </el-table-column>
              <el-table-column
                prop="totalMoney"
                label="订单总金额"
                width="200px"
              >
              </el-table-column>
              <el-table-column
                prop="payment"
                align="center"
                label="退款金额">
              </el-table-column>
              <el-table-column
                prop="creatorName"
                align="center"
                width="200px"
                label="退款人">
              </el-table-column>
            </el-table>
          </div>
         </el-collapse-transition>
      </div> -->
      <div class="detail-item">
        <top-tips :title="shipInfo" @thisRef="showList"></top-tips>
         <el-collapse-transition>
          <div>
            <el-table
              :data="orderDetialInfo.orderComplete"
              style="width: 100%"
              class="header-nobg"
              >
              <el-table-column
                prop="firstPictureUrl"
                label="图片"
                width="140">
                <template slot-scope="scope" >
                  <img :src="scope.row.firstPictureUrl" alt="" class="img-view">
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称/编号/货号"
                width="350px"
              >
                <template slot-scope="scope">
                  <p class="comm-name">商品名称: {{scope.row.goodsName}}</p>
                  <p class="comm-num">商品编号：{{scope.row.goodsCode}}</p>
                  <p class="comm-num">货号：{{scope.row.artNo}}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="completeTime"
                label="发货时间"
                width="155px"
              >
              </el-table-column>
              <el-table-column
                prop="completeMan"
                align="center"
                width="205px"
                label="发货人">
              </el-table-column>
                <el-table-column
                prop="completeNum"
                align="center"
                width="100px"
                label="发货数量">
              </el-table-column>
            </el-table>
          </div>
         </el-collapse-transition>
      </div>
      <div class="detail-item">
        <top-tips :title="refundInfo" @thisRef="showList">
          <span slot="refund"></span>
        </top-tips>
         <el-collapse-transition>
          <div>
            <el-table
              :data="orderDetialInfo.orderReturn"
              style="width: 100%"
              class="header-nobg"
              >
              <el-table-column
                prop="firstPictureUrl"
                label="图片"
                width="140">
                <template slot-scope="scope" >
                  <img :src="scope.row.firstPictureUrl" alt="" class="img-view">
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称/编号/货号"
                width="200px"
              >
                <template slot-scope="scope">
                  <p class="comm-name">商品名称: {{scope.row.goodsName}}</p>
                  <p class="comm-num">商品编号：{{scope.row.goodsCode}}</p>
                  <p class="comm-num">货号：{{scope.row.artNo}}</p>
                </template>
              </el-table-column>
               <el-table-column
                prop="createTime"
                label="退货时间"
                width="150px"
              >
              </el-table-column>
              <el-table-column
                prop="returnMan"
                align="center"
                width="150px"
                label="退货人">
              </el-table-column>
                <el-table-column
                prop="returnNum"
                align="center"
                width="100px"
                label="退货数量">
              </el-table-column>
              <el-table-column
                prop="price"
                align="center"
                width="200px"
                label="价格">
                <template slot-scope="scope">
                  <p>￥{{scope.row.discountPrice}}</p>
                  <p class="origin">
                    原价：￥{{scope.row.goodsMsrp}}
                  </p>
                </template>
              </el-table-column>
            </el-table>
            <div class="all-price">
              <span>数量：{{returnProducts}}</span>
              <span>总额：{{returnMoneyAll}}</span>
            </div>
          </div>
         </el-collapse-transition>
      </div>
      <div class="detail-item">
        <top-tips :title="orderState" @thisRef="showList"></top-tips>
         <el-collapse-transition>
          <div>
            <el-table
              :data="orderDetialInfo.orderRecords"
              style="width: 100%"
              class="header-nobg"
              >
              <el-table-column
                prop="createTime"
                label="时间"
              >
              </el-table-column>
              <el-table-column
                prop="dowaht"
                label="操作"
                width="200px"
              >
              </el-table-column>
              <el-table-column
                prop="remark"
                align="center"
                width="200px"
                label="备注">
              </el-table-column>
              <el-table-column
                prop="creatorName"
                align="center"
                width="200px"
                label="操作人">
              </el-table-column>
            </el-table>
          </div>
         </el-collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
export default {
  data () {
    return {
      value5: 5,
      value4: 4,
      value3: 3,
      value2: 2,
      value1: 1,
      allPrice: 0.0,
      oldAllMoney: 0.00,
      imgList: ['//static-oss.muyusi.com/back_pic/035abf491ceeb6b.jpg', '//static-oss.muyusi.com/back_pic/595ac31d93c7d82.jpg', '//static-oss.muyusi.com/back_pic/925ac2e63d4af5e.jpg','//static-oss.muyusi.com/back_pic/925ac2e63d4af5e.jpg', '//static-oss.muyusi.com/back_pic/435aa74d8c05855.jpg'],
      // breadcrumbList: [
      //   {title: '订单管理', path: '/order/orderManage'},
      //   {title: '订单详情', path: ''}
      // ],
      optional: {
        title: '商品信息',
        unfold: true
      },
      kehuInfo: {
        title: '客户信息',
        unfold: true
      },
      orderInfo: {
        title: '订单信息',
        unfold: true
      },
      receiptInfo: {
        title: '收款信息',
        unfold: true
      },
      receiptReturnInfo: {
        title: '退款信息',
        unfold: true
      },
      shipInfo: {
        title: '发货信息',
        unfold: true
      },
      refundInfo: {
        title: '退货信息',
        unfold: true
      },
      evaluetion: {
        title: '评价',
        unfold: true
      },
      orderState: {
        title: '订单状态记录',
        unfold: true
      },
      tableData: [{
        img: '//static-oss.muyusi.com/back_pic/595ac31d93c7d82.jpg',
        name: '王小虎',
        price: '￥130.00',
        num: 1
      }],
      tableData1: [{
        info: '',
        way: '',
        date: '',
        install: '',
        shop: '',
        person: ''
      }],
      tableData2: [{
        info: '懒人沙发',
        way: '送货',
        date: '2018.4.19',
        install: '是',
        shop: '上海旗舰店',
        person: '张三'
      }],
      // 订单详情页面
      orderDetialInfo: {},
      // 总件数
      allProductCount: 0,
      areaSelected: '',
      // 退货总量
      returnProducts: 0,
      // 退货总金额
      returnMoneyAll: 0.0,
      couponCard: [],
      customerTrueNameDisabled: true,
      couponCardStr: '',
      orderMoneysReturn: [],
      orderMoneys: []
    }
  },
  mounted () {
  // 获取订单详情包括商品信息
    this.getStStoreOrder()
  },
  methods: {
    // 获取订单详情信息
    getStStoreOrder () {
      let params = {
        orderId: this.$route.query.orderId
      }
      this.$api.getStStoreOrder(params).then(res => {
        if (res.data.provinceAdcode) {
          JSON.parse(res.data.provinceAdcode).forEach((item, index) => {
            this.areaSelected += item
          })
        }
        if (res.data !== null) {
          this.orderDetialInfo = res.data
          if (this.orderDetialInfo.reservationDate && this.orderDetialInfo.reservationDate.length > 10) {
            this.orderDetialInfo.reservationDate = this.orderDetialInfo.reservationDate.substring(0, 10)
          }
          if (this.orderDetialInfo.orderComplete !== null) {
            this.orderDetialInfo.orderComplete.forEach(el => {
              if (el.completeTime && el.completeTime.length > 10) {
                el.completeTime = el.completeTime.substring(0, 10)
              }
            })
          }
          if (this.orderDetialInfo.deliveryMode) {
            if (this.orderDetialInfo.deliveryMode === '1') {
              this.orderDetialInfo.deliveryMode = '自提'
            } else if (this.orderDetialInfo.deliveryMode === '2') {
              this.orderDetialInfo.deliveryMode = '送货安装'
            } else if (this.orderDetialInfo.deliveryMode === '3') {
              this.orderDetialInfo.deliveryMode = '送货不安装'
            } else if (this.orderDetialInfo.deliveryMode === '4') {
              this.orderDetialInfo.deliveryMode = '只安装'
            }
          }
          // 遍历收款信息
          // this.orderDetialInfo.orderMoneys.forEach(el => {
          //   // 退款
          //   if (el.payment < 0) {
          //     this.orderMoneysReturn.push(el)
          //   } else {
          //     this.orderMoneys.push(el)
          //   }
          // })
          this.orderMoneys = this.orderDetialInfo.orderMoneys
        }
        res.data.orderDetails.forEach(element => {
          // 如果为议价则无折扣
          if (element.pricingMode === '议价') {
            element.zheKou = '10折'
            element.goodsMsrp = element.discountPrice
          } else {
            element.zheKou = Math.floor((element.discountPrice / element.goodsMsrp) * 1000) / 100 + '折'
          }
          // 合计总价
          this.allProductCount += element.goodsNum
        })
        if (res.data.orderReturn !== null) {
          res.data.orderReturn.forEach(element => {
            // 合计 退货数量
            this.returnProducts += element.returnNum
            // 合计 退货金额
            this.returnMoneyAll += (element.discountPrice * element.returnNum)
            if (element.createTime != null && element.createTime.length > 10) {
              element.createTime = element.createTime.substring(0, 10)
            }
          })
        }
        res.data.orderDetails.forEach((item, index) => {
          if (item.goodsMsrp !== null && item.goodsMsrp !== '') {
            this.oldAllMoney += item.goodsNum * item.goodsMsrp
          } else {
            this.oldAllMoney += item.goodsNum * item.discountPrice
          }
        })
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
      })
    },
    showList (ref, isflod) {
      ref.nextElementSibling.style.display = !isflod ? 'block' : 'none'
    }
  },
  components: {breadCrumb, topTips}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.order-detail{
  margin:0 auto;
  padding-top: 126px;
  .order-num{
    margin: 20px 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .num{
      font-size: 24px;
      font-weight: bold;
      margin-right: 20px;
      i{
        font-size: 22px;
      }
    }
    .note{
      font-size: $md-size;
      color:#fff;
      padding: 2px 6px;
      border-radius: 4px;
      &.type1{
        background-color: $yello-color;
      }
      &.type2{
        background-color: #44AF7B;
      }
      &.type3{
        background-color: #7180F1;
      }
      &.type4{
        background-color: #B3B5BA;
      }
    }
  }
  .detail-list{
    .detail-item{
      margin-bottom: 40px;
      .img-view{
        img{
          width:70px;
          height:70px;
        }
      }
      .comm-name{
        font-size: $md-size;
        font-weight: bold;
      }
      .evalue{
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        .left{
          p{
            display: flex;
            padding: 5px 0;
            span{
              margin-right: 10px;
            }
          }
        }
        .right{
          ul{
            display: flex;
            li{
              margin-left: 10px;
              img{
                width:160px;
                height:160px;
              }
            }
          }
        }
      }
      .comm-num{
        color:$text-gray-color;
      }
      .dis-befo{
        color:$main-color;
        font-weight: bold;
      }
      .dis-afte{
        color:$text-gray-color;
      }
      .black-color{
        font-weight: bold;
      }
      .red-color{
        color:$main-color;
      }
      .origin{
        position: relative;
        color:$text-gray-color;
        &:after{
          content: '';
          position: absolute;
          left: 15%;
          right: 15%;
          height: 1px;
          background-color: #e0e0e0;
          top: 50%;
        }
      }
      .all-price{
        display: flex;
        justify-content: flex-end;
        font-size: $md-size;
        padding:10px 0;
        span{
          margin: 0 20px;
        }
      }
      .info-de{
        display: flex;
        padding: 20px 10px;
        background-color: $pink-bg;
        border:1px solid $pink-color;
        font-size: $xs-size;
        div{
          flex:1;
          p{
            padding: 5px 0;
            label{
              width:80px;
              text-align: right;
              display: inline-block;
            }
            span{
              color:$main-color;
              margin-left: 10px;
            }
          }
        }
      }
      .comm-summ{
        display: flex;
        justify-content: flex-end;
        padding-top:10px;
        font-size: $md-size;
        div{
          padding:0 40px;
          p{
            padding: 10px 0;
            label{
              width:100px;
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
              width: 360px;
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
              .coupon-list{
                padding-left: 65px;
              }
        }
      }
      .kehu{
          font-size: 16px;
          padding: 2px 18px 11px 19px;
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
    }
  }
}
</style>
