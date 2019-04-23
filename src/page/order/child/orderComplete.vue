<template>
  <div class="order-detail">
    <!-- <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb> -->
    <p class="order-num">
      <span class="num">订单号：<i>{{orderDetialInfo.orderNum}}</i></span>
       <span v-if="no_send" class="note type1">未发货</span>
       <span v-if="part_send" class="note type1">部分发货</span>
       <span v-if="has_send" class="note type1">已发货</span>
    </p>
    <div class="detail-list">
      <div class="detail-item">
        <top-tips :title="orderInfo"></top-tips>
          <div>
            <el-table
              :data="tableData1"
              style="width: 100%"
              class="header-nobg"
              >
              <el-table-column
                prop="info"
                label="收货人信息"
              >
                <template slot-scope="scope">
                  <p>客户：<span class="black-color">{{orderDetialInfo.consignee}}</span></p>
                  <p>电话：<span class="black-color">{{orderDetialInfo.consigneeMobile}}</span></p>
                  <p>收货地址：<span class="black-color">{{areaSelected}}</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="totalMoney"
                label="应收金额"
                width="100px"
              >
                <template slot-scope="scope">
                ￥{{orderDetialInfo.totalMoney}}
                </template>
              </el-table-column>
              <el-table-column
                prop="payment"
                align="center"
                width="200px"
                label="已收款">
                  <template slot-scope="scope">
                    ￥{{orderDetialInfo.paidMoney}}
                </template>
              </el-table-column>
              <el-table-column
                prop="undeliveredMoney"
                align="center"
                width="100px"
                label="未收款">
                <template slot-scope="scope">
                  <span class="red-color">￥{{orderDetialInfo.totalMoney - orderDetialInfo.paidMoney}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </div>
      <div class="detail-item detail-cont">
        <el-table
          :data="tableData"
          style="width: 100%"
          class="header-nobg"
          >
          <el-table-column
            prop="firstPictureUrl"
            label="图片"
            width="140">
            <template slot-scope="scope" >
              <img :src=scope.row.firstPictureUrl alt="" class="img-view">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称/编号/货号"
             width="250"
          >
            <template slot-scope="scope">
               <p class="comm-name">{{scope.row.goodsName}}</p>
              <p class="comm-num">商品编号：{{scope.row.goodsCode}}</p>
              <p class="comm-num">货号：{{scope.row.artNo}}</p>
              <p class="comm-price">单价：￥{{scope.row.goodsMsrp}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="goodsNum"
            align="center"
            width="200px"
            label="购买量">
          </el-table-column>
          <el-table-column
            prop="completeNum"
            align="center"
            width="200px"
            label="已发量">
          </el-table-column>
          <el-table-column
                prop="pageReturnNum"
                align="center"
                width="160px"
                label="发货数量">
                <template slot-scope="scope">
                  <el-input-number
                  v-model="scope.row.pageReturnNum"
                  :max ="scope.row.noSendNum"
                  :min="0">
                  </el-input-number>
                </template>
              </el-table-column>
        </el-table>
      </div>
      <div class="detail-item">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="ruleForm">
          <el-row :gutter="24">
            <el-col :span="12" :offset="12">
              <el-form-item label="发货日期" prop="sendDate">
                <el-date-picker
                  v-model="ruleForm.sendDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="12">
              <el-form-item label="发货人" prop="sendPeople">
                <el-input v-model="ruleForm.sendPeople"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="btns">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="sendSumit(['ruleForm'])" :loading="loading">{{loading?'发货中':'发货'}}</el-button>
        </div>
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
      isChangePrice: false,
      areaSelected: '',
      imgList: [],
      // breadcrumbList: [
      //   {title: '订单管理', path: '/order/orderManage'},
      //   {title: '订单详情', path: ''}
      // ],
      optional: {
        title: '商品信息',
        unfold: false
      },
      personInfo: {
        title: '信息填写',
        unfold: false
      },
      orderInfo: {
        title: '订单信息',
        unfold: false
      },
      tableData: [{
        // 商品图片
        firstPictureUrl: '//static-oss.muyusi.com/back_pic/595ac31d93c7d82.jpg',
        name: '王小虎',
        price: '￥130.00',
        num: 1
      }],
      tableData1: [{
        totalMoney: 0,
        payment: 0,
        undeliveredMoney: 0
      }],
      tableData2: [{
        info: '懒人沙发',
        way: '送货',
        date: '2018.4.19',
        install: '是',
        shop: '上海旗舰店',
        person: '张三'
      }, {
        info: '懒人沙发',
        way: '送货',
        date: '2018.4.19',
        install: '是',
        shop: '上海旗舰店',
        person: '张三'
      }],
      ruleForm: {
        sendDate: '',
        sendPeople: ''
      },
      rules: {
        sendDate: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'blur' }
        ],
        sendPeople: [
          { required: true, message: '请填写发货人', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ]
      },
      // 订单明细(显示数据)
      orderDetail: {},
      // 定义商品选中的list,查询他的发货量
      productsListAboutSendNum: [],
      // 订单明细
      orderDetialInfo: {},
      no_send: false,
      part_send: false,
      has_send: false,
      loading: false
    }
  },
  created () {
  },
  mounted () {
    // 获取订单详情包括商品信息
    this.getStStoreOrder()
  },
  methods: {
    // 获取订单详情信息
    getStStoreOrder () {
      let params = {
        orderId: this.$route.query.orderVo.orderId
      }
      this.$api.getStStoreOrder(params).then(res => {
        if (res.data.provinceAdcode) {
          JSON.parse(res.data.provinceAdcode).forEach((item, index) => {
            this.areaSelected += item
          })
        }
        // if (res.data.provinceAdcode) {
        //   this.areaSelected = JSON.parse(res.data.provinceAdcode)
        // }
        if (res.data !== null) {
          this.orderDetialInfo = res.data
        }
        if (res.data.orderDetails !== null) {
          res.data.orderDetails.forEach(element => {
            element.noSendNum = element.goodsNum - element.completeNum
          })
        }
        this.tableData = res.data.orderDetails
        // 判断发货状态
        // if (res.data.allGoodsCount === res.data.sendGoodsCount) {
        //   // 发货量等于订单量  已发货
        //   this.has_send = true
        // } else if (res.data.allGoodsCount > res.data.sendGoodsCount && res.data.sendGoodsCount !== 0) {
        //   // 发货量小于订单量  部分发货
        //   this.part_send = true
        // } else if (res.data.sendGoodsCount === 0) {
        //   // 未发货
        //   this.no_send = true
        // }
      })
    },
    changePrice () {
      this.isChangePrice = true
    },
    cancelChangePrice () {
      this.isChangePrice = false
    },
    // 发货
    sendSumit (formName) {
      let sendOrderDetails = []
      var _this = this
      let correctList = []
      for (var value of formName) {
        _this.$refs[value].validate((valid) => {
          correctList.push(valid)
        })
      }
      // 判断校验结果中是否存在false值
      if (correctList.indexOf(false) === -1) {
        let productsAllCount = 0
        let productsSendCount = 0
        let orderSentState = false
        let Detail = {}
        // 组装商品对应的发货数组
        let sendCount = 0
        this.tableData.forEach(element => {
          productsAllCount++
          if (element.pageReturnNum === element.goodsNum - element.completeNum) {
            productsSendCount++
          }
          if (element.pageReturnNum !== 0) {
            Detail = {
              goodsId: element.goodsId,
              changeNum: element.pageReturnNum
            }
            sendCount += element.pageReturnNum
            sendOrderDetails.push(Detail)
          }
        })
        if (sendCount === 0) {
          this.$message.error('发货数量不能为0!')
          return false
        }
        if (productsAllCount !== 0 && productsAllCount === productsSendCount) {
          orderSentState = true
        }
        this.loading = true
        let params = {
          // 订单号
          orderId: this.orderDetialInfo.orderId,
          // 门店id
          storeId: this.orderDetialInfo.storeId,
          // 发货时间
          sendDate: this.ruleForm.sendDate,
          // 发货人
          sendPeople: this.ruleForm.sendPeople,
          // 商品详情list
          jsonData: JSON.stringify(sendOrderDetails),
          // 是否发货
          orderSentState: orderSentState
        }
        this.$api.ordershipments(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push({path: '/myStore/order/orderManage'})
            this.loading = false
          } else if (res.code === 1) {
            this.$router.push({path: '/myStore/order/orderManage'})
            this.$message.error(res.msg)
            this.loading = false
          }
        })
      } else {
        this.$message.error('请按要求填写页面红色标注必填项')
      }
    },
    quxiao () {
      this.$router.push({path: '/myStore/order/orderManage'})
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
      &.detail-cont{
        border-top:6px solid $gray-color;
        border-bottom:6px solid $gray-color;
        // padding: 20px 0;
      }
      .btns{
        text-align: center;
        margin: 40px 0;
        button{
          padding:15px 20px;
          &:first-child{
            width:140px;
          }
          &:last-child{
            width:200px;
          }
        }
      }
      .el-col-offset-12 {
          margin-right: 50%;
          margin-left:0;
      }
      .price-view{
        .num{
          color:$text-red-color;
          font-weight: bold;
        }
        .el-icon-edit{
          margin-left: 4px;
          cursor: pointer;
          &:hover{
            color:$main-color;
          }
        }
      }
      .price-op{
        display: flex;
        margin-left: 4px;
        justify-content: center;
        input[type='text']{
          border:1px solid $input-border-color;
          height:20px;
          border-radius: 4px;
          font-size: $xs-size;
          width:60px;
          padding-left:4px;
          margin-right: 4px;
        }
        button{
          padding:3px 8px;
        }
      }
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
        font-weight: bold;
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
    }
  }
}
</style>
