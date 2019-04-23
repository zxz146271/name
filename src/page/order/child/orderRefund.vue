<template>
  <div class="order-detail">
    <!-- <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb> -->
    <p class="order-num">
      <span class="num">订单号：<i>{{orderDetailInfo.orderNum}}</i></span>
      <!-- <span class="note type2">已付款（全额）</span> -->
    </p>
    <div class="detail-list">
      <div class="detail-item">
        <!-- <top-tips :title="orderInfo"></top-tips> -->
        <div class="info-tips">
          <div class="info-name">选择退货商品</div>
        </div>
          <div>
            <el-table
              v-loading="loading"
              :data="tableData"
              style="width: 100%"
              class="header-nobg"
              >
              <!-- <el-table-column
                type="selection"
                width="55">
              </el-table-column> -->
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
              >
                <template slot-scope="scope">
                  <p class="comm-name">{{scope.row.goodsName}}</p>
                  <p class="comm-num">商品编号：{{scope.row.goodsCode}}</p>
                  <p class="comm-price">单价：￥{{scope.row.goodsMsrp}}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="goodsMsrp"
                width="70px"
                label="单价">
              </el-table-column>
              <el-table-column
                prop="discountPrice"
                width="70px"
                label="折扣价">
              </el-table-column>
              <el-table-column
                prop="goodsNum"
                align="center"
                width="100px"
                label="购买量">
              </el-table-column>
              <el-table-column
                prop="completeNum"
                width="100px"
                label="已发量">
              </el-table-column>
               <el-table-column
                prop="returnNum"
                width="100px"
                label="已退数量">
              </el-table-column>
              <el-table-column
                prop="returnNum"
                align="center"
                width="150px"
                label="退货数量">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.pageReturnNum" @change="handleChange" :min="0" :max="scope.row.completeNum - scope.row.returnNum"></el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </div>
      <div class="detail-item">
        <div class="info-tips">
          <div class="info-name">退货信息</div>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="120px" class="ruleForm">
          <el-row :gutter="24">
            <el-col :span="12" :offset="12">
              <el-form-item label="退货日期" prop="returnTime">
                <el-date-picker
                  v-model="ruleForm.returnTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="12">
              <el-form-item label="退款状态" prop="returnState">
                <el-select v-model="ruleForm.returnState" placeholder="请选择退款状态">
                  <el-option label="已退款" value="has_return"></el-option>
                  <el-option label="待退款" value="no_return"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="12">
              <el-form-item label="退货人员" prop="returnMan">
               <el-input v-model="ruleForm.returnMan"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="12">
              <el-form-item label="退货原因" prop="returnRemark">
                <el-input v-model="ruleForm.returnRemark" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="detail-item">
        <div class="info-tips">
          <div class="info-name">退款信息</div>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="ruleForm">
          <el-row :gutter="24">
            <el-col :span="12" :offset="12">
              <el-form-item label="退款金额" prop="returnMoney">
                <el-input v-model="ruleForm.returnMoney"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="12">
              <el-form-item label="退款方式" prop="returnWay">
                 <el-select v-model="ruleForm.returnWay" placeholder="请选择退款方式">
                  <el-option label="现金" value="cash"></el-option>
                  <el-option label="银行卡" value="bankCard"></el-option>
                  <el-option label="支付宝" value="Alipay"></el-option>
                  <el-option label="微信" value="WeChatpay"></el-option>
                  <el-option label="其他" value="other"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="12">
              <el-form-item label="退款流水号" prop="returnNumber">
                <el-input v-model="ruleForm.returnNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="money">
          <ul>
            <li>
              <p>订单总价</p>
              <p class="num">￥{{orderDetailInfo.totalMoney}}</p>
            </li>
            <li>
              <p>退款金额</p>
              <p class="num">￥{{ruleForm.returnMoney}}</p>
            </li>
             <li>
              <p>退货后应付</p>
              <p class="num">￥{{orderDetailInfo.totalMoney - ruleForm.returnMoney}}</p>
            </li>
            <li>
              <p>客户实付</p>
              <p class="num red">￥{{orderDetailInfo.accountPaid}}</p>
            </li>
          </ul>
          <span class="warning_tip" v-show="orderDetailInfo.accountPaid > (orderDetailInfo.totalMoney - ruleForm.returnMoney)">实付已大于应付金额,请在【订单列表】中为客户【退款】</span>
        </div>
        <div class="btns">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="returnProducts(['ruleForm1', 'ruleForm'])" :loading="loading">{{loading?'提交中':'提交'}}</el-button>
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
      imgList: ['//static-oss.muyusi.com/back_pic/035abf491ceeb6b.jpg'],
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
        img: '//static-oss.muyusi.com/back_pic/595ac31d93c7d82.jpg',
        name: '王小虎',
        price: '￥130.00',
        num: 1
      }],
      // 退货Vo类
      ruleForm: {
        // 退退货时间
        returnTime: '',
        // 退款状态
        returnState: '',
        // 退款人
        returnMan: '',
        // 退款原因
        returnRemark: '',
        // 退款金额
        returnMoney: '',
        // 退款方式
        returnWay: '',
        // 退款流水号
        returnNumber: ''
      },
      rules: {
        returnTime: [
          { type: 'date', required: true, message: '请选择退货时间', trigger: 'blur' }
        ],
        returnState: [
          { required: true, message: '请选择退货状态', trigger: 'blur' }
        ],
        returnMan: [
          { required: true, message: '请填写退货人', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        returnRemark: [
          { required: true, message: '请填写退货原因', trigger: 'blur' },
          { min: 2, max: 150, message: '长度在 2 到 150 个字符', trigger: 'blur' }
        ],
        returnMoney: [
          { required: true, message: '请填写退货金额', trigger: 'blur' },
          { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: '退货金额为数字', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        returnWay: [
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        returnNumber: [
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ]
      },
      // 订单明细
      orderDetailInfo: {},
      loading: false
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
        this.orderDetailInfo = res.data
        // 限领
        if (res.data.orderDetails !== null) {
          res.data.orderDetails.forEach(element => {
            element.pageReturnNum = 0
          })
        }
        this.tableData = res.data.orderDetails
      })
    },
    handleChange (value) {
      // 遍历对象 查询退款金额
      // this.ruleForm.returnMoney = 0.00
      // this.orderDetailInfo.orderDetails.forEach(element => {
      //   if (element.pageReturnNum !== 0) {
      //     this.ruleForm.returnMoney += (element.pageReturnNum * element.discountPrice)
      //   }
      // })
      // this.ruleForm.returnMoney = this.ruleForm.returnMoney.toString()
    },
    // 发货
    returnProducts (formName) {
      var totalPurchaseNum = 0
      var totalReturnNum = 0
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
        // 组装商品对应的发货数组
        let Detail = {}
        let returnCount = 0
        this.tableData.forEach(element => {
          totalPurchaseNum = totalPurchaseNum + element.goodsNum
          totalReturnNum = totalReturnNum + element.pageReturnNum + element.returnNum
          productsAllCount++
          if (element.pageReturnNum === element.goodsNum - element.returnNum) {
            productsSendCount++
          }
          if (element.pageReturnNum !== 0) {
            returnCount++
            Detail = {
              goodsId: element.goodsId,
              changeNum: element.pageReturnNum
            }
            sendOrderDetails.push(Detail)
          }
        })
        if (totalPurchaseNum === totalReturnNum) {
          this.$message.error('您选择了全部商品退货，请直接在【订单中】进行【取消订单】操作!')
          return false
        }
        if (productsAllCount !== 0 && productsAllCount === productsSendCount) {
          orderSentState = true
        }
        if (returnCount === 0) {
          this.$message.error('请选择退货数量!')
          return false
        }
        this.loading = true
        let params = {
          // 门店id
          storeId: this.orderDetailInfo.storeId,
          orderId: this.orderDetailInfo.orderId,
          // 退退货时间
          returnTimeStr: this.ruleForm.returnTime,
          // 退款状态
          returnState: this.ruleForm.returnState,
          // 退款人
          returnMan: this.ruleForm.returnMan,
          // 退款原因
          returnRemark: this.ruleForm.returnRemark,
          // 退款金额
          returnMoney: this.ruleForm.returnMoney,
          // 退款方式
          returnWay: this.ruleForm.returnWay,
          // 退款流水号
          returnNumber: this.ruleForm.returnNumber,
          // 商品详情list
          jsonData: JSON.stringify(sendOrderDetails),
          orderSentState: orderSentState
        }
        this.$api.orderreturnGood(params).then(res => {
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
    // 取消
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
  .warning_tip {
    display:block;
    margin-top:15px;
    font-size:13px;
    margin-left:40px;
    color:#FFC125;
  }
  .money{
    background-color: $gray-color;
    /**padding: 40px 0;**/
    margin-top: 22px;
    ul{
      /**text-align: center;**/
      li{
        width:150px;
        text-align: center;
        display: inline-block;
        position: relative;
        height: 44px;
        &::after{
          content: '';
          width: 2px;
          height: 100%;
          background-color: $border-color;
          display: inline-block;
          position: absolute;
          right:0;
          top:9px;
        }
        p{
          margin: 4px 0;
          &.num{
            /**font-weight: bold;**/
            &.red{
              color:$main-color;
            }
          }
        }
      }
    }
  }
  .detail-list{
    .detail-item{
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
