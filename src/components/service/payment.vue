<template>
  <div class="payment">
    <div class="money">
      <p><span>总额：</span>￥{{total}}</p>
    </div>
    <div class="date">
      <div class="content" v-if="!serviceItem.sms">
        <div class="title">
          <span class="store-label">当前门店:</span>
          <!-- <el-select v-model="selectStore"  @change="chooseStore" placeholder="请选择">
            <el-option
              v-for="item in storeInfo.data"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select> -->
          <span class="store">{{selectStore}}</span>
          <!-- <el-input
            v-model="selectStore"
            :disabled="true">
          </el-input> -->
        </div>
        <div class="title">
          <span  class="store-label">单价:</span>
          <span class="store">{{serviceItem.servicePrice}}元/{{oneData}}</span>
        </div>
        <ul v-if="isUnit == '0'">
          <li v-for="(item, index) in monthList" :key="index" :class="{active:item.isActive}" @click="monthToggle(index)">{{item.month}}</li>
          <!-- <el-input v-model="input" placeholder="请输入" @blur="inputMonthToggle"></el-input> -->
        </ul>
      </div>
      <div class="content" v-else>
        <div class="title">
          <span class="store-label">当前门店:</span>
          <span class="store">{{selectStore}}</span>
          <!-- <el-input
            v-model="selectStore"
            :disabled="true">
          </el-input> -->
        </div>
        <div class="title">
          <span class="store-label">短信数量:</span>
          <span class="store">{{serviceItem.mealNum * SMSNum}}条</span>
        </div>
        <div class="title">
          <span class="store-label">购买数量:</span>
          <el-input-number v-model="SMSNum" @change="handleChange" :min="1" size="mini"></el-input-number>
        </div>
      </div>
    </div>
    <div class="mode">
      <ul>
        <li v-for = "(item,index) in condition" :key="index" :class="{active:item.isActive}" @click="toggle(index)">
          <span class="el-icon-circle-check pay-check-icon" :class="{active:item.isActive}"></span>
          <i></i>
        </li>
      </ul>
      <div class="btn">
        <el-button @click="payment()">支付</el-button>
      </div>
      <el-dialog
        append-to-body
        :visible.sync="paymentVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closePayment"
        class="pay-dialog"
        width="30%">
        <div class="content-pay" v-if="isAliPay">
          <p class="pay-title">请您在新打开的页面上完成付款。</p>
          <div class="pay-main">
            <p>付款完成前请不要关闭此窗口。</p>
            <p>完成付款后请根据您的情况点击下面的按钮：</p>
          </div>
          <el-row class="pay-btn">
            <el-button type="warning" round size="mini" @click="hasPay">已完成付款</el-button>
            <!-- <el-button type="warning" round size="mini">付款遇到问题</el-button> -->
          </el-row>
          <!-- <p class="other-pay" @click="otherPay">返回选择其他支付方式</p> -->
        </div>
        <div v-else class="wxQRcode">
          <p class="QR-title">请使用微信扫一扫扫描二维码支付</p>
          <div class="QR-content">
            <div id="weChatCode" class="QRcode" ref="weChatCode"></div>
            <p class="QRtext">二维码有效时长为2小时, 请尽快支付</p>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import { setSession, getStore } from '../../tool/Utils'
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      SMSNum: 1,
      isSMS: false,
      selectStore: '',
      active: '',
      input: '',
      paymentType: 'Alipay',
      total: this.serviceItem.servicePrice || this.serviceItem.mealAmount / 100,
      cycle: 1,
      monthList: [{
        month: '1天',
        cycle: 1,
        isActive: true
      },
      {
        month: '2天',
        cycle: 2,
        isActive: false
      },
      {
        month: '3天',
        cycle: 3,
        isActive: false
      },
      {
        month: '6天',
        cycle: 6,
        isActive: false
      }],
      condition: [
        {
          type: 'Alipay',
          isActive: true
        },
        {
          type: 'WeChatpay',
          isActive: false
        }
      ],
      paymentVisible: false,
      payInter: null,
      stopPayInter: null,
      isAliPay: true,
      payStoreId: '',
      paymentOrderId: '',
      oneData: '天'
    }
  },
  computed: {
    ...mapGetters(['storeInfo', 'storeId', 'storeName']),
    newValue () {
      return this.serviceItem.billingMethod
    }
  },
  props: ['serviceItem', 'isUnit'],
  mounted () {
    this.selectStore = getStore('storeName')
    this.payStoreId = getStore('storeIdWeb')
    this.changeData()
  },
  watch: {
    newValue (val, oldVal) {
      this.changeData()
    }
  },
  inject: ['reloadAllPage'],
  methods: {
    handleChange (value) {
      this.SMSNum = value
      this.total = this.SMSNum * this.serviceItem.mealAmount / 100
    },
    changeData () {
      if (this.serviceItem.billingMethod === 'year') {
        this.oneData = '年'
        this.changeListData('年')
      } else if (this.serviceItem.billingMethod === 'day') {
        this.oneData = '天'
        this.changeListData('天')
      } else if (this.serviceItem.billingMethod === 'month') {
        this.oneData = '月'
        this.changeListData('月')
      } else if (this.serviceItem.billingMethod === 'quarter') {
        this.oneData = '季度'
        this.changeListData('季度')
      } else if (this.serviceItem.billingMethod === 'halfYear') {
        this.oneData = '半年'
        this.changeListData('半年')
      } else if (this.serviceItem.billingMethod === 'frequency') {
        this.oneData = '次'
        this.changeListData('次')
      }
    },
    changeListData (value) {
      let count = 1
      this.monthList.forEach(item => {
        if (count === 4) {
          item.month = 6 + value
        } else {
          item.month = count + value
        }
        count++
      })
    },
    toggle (index) {
      this.condition[index].isActive = true
      this.condition[1 - index].isActive = false
      this.paymentType = this.condition[index].type
    },
    chooseStore (value) {
      this.payStoreId = value
    },
    // 支付
    payment () {
      if (this.payStoreId) {
        if (this.serviceItem.sms) {
          this.buySMSService()
        } else {
          this.buyOtherService()
        }
      } else {
        this.$message.warning('您的账号还未开设门店！')
      }
    },
    // 购买短信服务
    buySMSService () {
      let params = {
        paymentType: this.paymentType,
        serviceId: this.serviceItem.mealId,
        cycle: this.SMSNum,
        storeId: this.payStoreId
      }
      if (this.paymentType === 'Alipay') {
        this.$emit('close-payment')
        this.isAliPay = true
        this.$api.buySMSAli(params).then(res => {
          if (res.data) {
            setSession('Alipay', res.data.payUrl)
            this.paymentOrderId = res.data.paymentOrderId
            window.location.href = res.data.payUrl
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.isAliPay = false
        this.openPayDialog()
        this.$api.buySMSWechat(params).then(res => {
          if (res.code === 0) {
            this.paymentOrderId = res.data.paymentOrderId
            let qrcode = new QRCode(document.getElementById('weChatCode'), {
              width: 250,
              height: 250,
              render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas
            })
            qrcode.clear()
            this.$nextTick(() => {
              qrcode.clear()
              qrcode.makeCode(res.data.payUrl)
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 购买增值服务
    buyOtherService () {
      let params = {
        paymentType: this.paymentType,
        serviceId: this.serviceItem.serviceId,
        cycle: this.cycle,
        storeId: this.payStoreId
      }
      if (this.paymentType === 'Alipay') {
        this.$emit('close-payment')
        this.isAliPay = true
        // this.openPayDialog()
        this.$api.aliAuthorityService(params).then(res => {
          // window.location.href = res.data
          if (res.data) {
            setSession('Alipay', res.data.payUrl)
            this.paymentOrderId = res.data.paymentOrderId
            // const {href} = this.$router.resolve({
            //   name: 'aliPayPage',
            //   params: {
            //     data: res.data.payUrl
            //   }
            // })
            // window.open(href, '_blank')
            window.location.href = res.data.payUrl
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.isAliPay = false
        this.openPayDialog()
        this.$api.wechaAuthorityService(params).then(res => {
          if (res.code === 0) {
            this.paymentOrderId = res.data.paymentOrderId
            let qrcode = new QRCode(document.getElementById('weChatCode'), {
              width: 250,
              height: 250,
              render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas
            })
            qrcode.clear()
            this.$nextTick(() => {
              qrcode.clear()
              qrcode.makeCode(res.data.payUrl)
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    openPayDialog () {
      this.paymentVisible = true
      this.payInter = setInterval(() => {
        if (this.paymentOrderId) {
          let params = {
            paymentOrderId: this.paymentOrderId
          }
          this.$api.getPayResult(params).then(res => {
            if (res.code === 0) {
              this.closePayment()
              this.$emit('close-payment')
              this.reloadAllPage()
              this.$message.success('支付成功！')
              this.$router.push({name: '支付结果', params: {paymentOrderId: res.data.paymentOrderId, amount: res.data.paymentAmount, payRes: 0}})
            }
          })
        }
      }, 2000)
      this.stopPayInter = setTimeout(() => {
        clearInterval(this.payInter)
      }, 1000 * 60 * 10)
    },
    inputMonthToggle () {
      this.total = Number(this.input) * this.serviceItem.servicePrice
      this.cycle = this.input
    },
    monthToggle (index) {
      for (let i = 0; i < this.monthList.length; i++) {
        this.monthList[i].isActive = false
      }
      this.input = ''
      this.monthList[index].isActive = true
      this.total = this.monthList[index].cycle * this.serviceItem.servicePrice
      this.cycle = this.monthList[index].cycle
    },
    hasPay () {
      this.closePayment()
    },
    otherPay () {
      this.closePayment()
    },
    closePayment () {
      clearInterval(this.payInter)
      if (!this.isAliPay) {
        document.getElementById('weChatCode').innerHTML = ''
      }
      this.paymentVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.payment{
  .money{
    padding: 0 0 10px 0;
    text-align: center;
    p{
      font-size: 44px;
      color: $text-red-color;
      margin-bottom: 10px;
      span{
        font-size: $md-size;
        color:$text-gray-color;
      }
    }
  }
  .date{
    padding: 22px 20px 35px 20px;
    >.content{
      border-radius: 8px;
      background: $gray-color;
      padding: 15px 15px 1px;
      .title{
        display: flex;
        justify-content: flex-start;
        margin-bottom: 12px;
        font-size: 16px;
        color: #3E3E3E;
        .store-label{
          width: 100px;
          margin-right: 20px;
          margin-left: 130px;
          line-height: 34px;
          text-align: right;
        }
        .store{
          line-height: 34px;
        }
      }
      >ul{
        display: flex;
        justify-content: center;
        padding: 2px 0 10px;
        li{
          margin: 0 10px;
          padding: 4px 21px;
          border: 1px solid $input-border-color;
          border-radius: 4px;
          font-size:$md-size;
          cursor: pointer;
        }
        .active{
          border-color:$main-color;
          color:$main-color;
          background: #FFF0F0;
        }
        .el-input{
          width: 90px;
        }
      }
    }
  }
  .mode{
    margin-bottom: 30px;
    display: flex;
    ul{
      display: flex;
      width: 548px;
      li{
        flex: 1;
        display: flex;
        justify-content: center;
        border-top:1px solid $border-color;
        padding: 12px 0;
        cursor: pointer;
        .pay-check-icon{
          line-height: 29px;
          font-size: 16px;
          padding-right: 7px;
          color: #FF7169;
          visibility: hidden;
        }
        .active{
          visibility: visible;
        }
        i{
          width: 80px;
          height: 28px;
          opacity: 0.6;
          background-image: url('../../assets/image/pay_zfb@2x.png');
          background-size: contain;
        }
        &:last-child{
          i{
            background-image: url('../../assets/image/pay_wei@2x.png');
          }
        }
      }
      .active{
        i{
          opacity: 1;
        }
      }
    }
    .btn{
      width: 200px;
      button{
        width: 100%;
        padding: 18px 0;
        color:#fff;
        background: $main-color;
        border: none;
        font-size: $detail-size;
        border-radius: 0;
      }
    }
  }
}
.pay-dialog{
  .content-pay{
    padding: 10px 15px;
    margin: 0 auto;
    .pay-title{
      font-size: 14px;
      padding: 5px 0;
      font-weight: bold;
    }
    .pay-main{
      font-size: 12px;
      padding: 5px 0;
      p{
        padding: 3px 0;
      }
    }
    .pay-btn{
      font-size: 12px;
      padding: 5px 0;
    }
    .other-pay{
      font-size: 14px;
      padding: 5px 0;
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
  }
  .wxQRcode{
    .QR-title{
      text-align: center;
    }
    .QR-content{
      .QRcode{
        margin: 0 auto;
        width: 250px;
        height: 250px;
      }
      .QRtext{
        text-align: center;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
