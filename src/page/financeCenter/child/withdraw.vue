<template>
  <div class="withdraw">
    <div class="withdraw-top">
      <div class="title">提现</div>
      <div class="content">
        <div class="can-take">
          <div class="label">可提现金额:</div>
          <span>￥{{canCarry}}</span>
        </div>
        <div class="take">
          <!-- <div class="label">本次提现</div> -->
    <!--  提现表单-->
        <div class="first-form">
            <el-form :model="TXform" :rules="rules1" ref="TXform" label-width="120px">
              <el-form-item label="本次提现：" prop="money">
                <el-input v-model="TXform.money" placeholder="本次提现" value=""></el-input>
              </el-form-item>
            </el-form>
               <div class="all-money" @click="allMoney">全部提现</div>
          </div>
          <!-- <el-input v-model="money" placeholder="请输入金额"></el-input> -->
        </div>
      </div>
    </div>
    <div class="withdraw-bank">
      <div class="title">提现至</div>
      <div class="content">
        <div class="bank-card-list" >
          <div class="bank-card-item"  @click="selectBankCard(bankInfo1, 0)" v-show="bindOne">
            <p class="name">{{bankInfo1.bankName}}</p>
            <p class="number">{{bankInfo1.bankCardNo}}</p>
            <img src="../../../assets/image/check.png"  v-if="0 == checkBank">
          </div>
          <div class="bank-card-item"  @click="selectBankCard(bankInfo2, 1)" v-show="bindTwo">
            <p class="name">{{bankInfo2.bankName}}</p>
            <p class="number">{{bankInfo2.bankCardNo}}</p>
            <img src="../../../assets/image/check.png"  v-if="1 == checkBank">
          </div>
          <div class="bank-card-item" v-if="bindNewBank">
            <p class="name">未绑定银行卡 <span @click="bindCard">绑定</span></p>
          </div>
        </div>
        <el-button class="submit" @click="extractWithdrawal(['TXform'])">
          提现
        </el-button>
        <el-dialog  :visible.sync="bindCardDialog"   :before-close="handleClose">
          <div slot="title" class="left-title">
            <span class="top">绑定银行卡</span>
          </div>
          <div class="bind-card-content" v-if="bindCardDialog">
            <div class="title">
              请如实填写以下信息，以保证银行卡能够顺利绑定，以免在提现过程中出现其他纠纷
              持卡人姓名, 身份证号均为提交审核材料时提交的法人相关信息, 且不可修改
            </div>
            <el-form label-position="right" label-width="130px" :rules="rules" ref="bankInfo" :model="bankInfo">
               <el-form-item label="持卡人姓名" prop="name">
               <el-input v-model="bankInfo.name"  :disabled="legalFlag"></el-input>
                <font style="color: gray; font-size: 100%" v-show="!legalFlag">*必须填写法人姓名</font>
              </el-form-item>
              <el-form-item label="身份证号码" prop="identityNo">
                <el-input v-model="bankInfo.identityNo"  :disabled="legalFlag"></el-input>
                 <font style="color: gray; font-size: 100%" v-show="!legalFlag">*必须填写法人身份证号</font>
              </el-form-item>
              <el-form-item label="银行名称" prop="selectBank">
                <el-input placeholder="请输入内容" v-model="bankInfo.selectBank"  :disabled="bankType" >
                  <el-select  slot="prepend" placeholder="请选择" @change="selectChange" v-model="selectBankName">
                    <el-option v-for="item in banklist" :key="item.value" :label="item.label" :value="item"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="支付行号" v-if="!bankType" prop="unionBank">
                <el-input v-model="bankInfo.unionBank"></el-input>
              </el-form-item>
              <el-form-item label="银行卡卡号" prop="carNo">
                <el-input v-model="bankInfo.carNo"></el-input>
              </el-form-item>
              <el-form-item label="银行预留手机号 " prop="phone">
               <el-input v-model="bankInfo.phone"></el-input>
              </el-form-item>
              <el-form-item label="验证码" class="verify-code" prop="verificationCode">
                <div class="verify">
                  <el-input  placeholder="验证码" autocomplete="off"  v-model="bankInfo.verificationCode"></el-input>
                  <el-button  v-if="isShow" @click="getCode" class="code-btn">获取验证码</el-button>
                  <el-button disabled="disabled" v-else class="code-btn">{{veriSecond}}S</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose()">取 消</el-button>
            <el-button @click="submintFormVisible('bankInfo')">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 提现验证码 -->
        <el-dialog  :visible.sync="verificationCodeDialog"   :before-close="PayHandleClose">
          <div slot="title" class="left-title">
            <span class="top">确认提现</span>
          </div>
          <div style="padding:0 300px 0 200px;">
            <span style="color: LightGrey">短信已发送至  {{yunMemberPhone}}</span>
            <el-form >
              <el-form-item label="请输入验证码"  prop="verificationCode">
                <div class="verify" style="text-align: center;">
                  <el-input  placeholder="验证码" autocomplete="off"  v-model="verificationCode"></el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="PayHandleClose()">取 消</el-button>
            <el-button type="primary" @click="confirmThePayment">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { getStore } from '../../../tool/Utils'
export default {
  data () {
    return {
      checkBank: '0',
      selectBankName: '',
      isShow: true,
      veriSecond: 60,
      bankType: false,
      bindNewBank: true,
      bindOne: false,
      bindTwo: false,
      bindCardDialog: false,
      legalFlag: true,
      moneyBank: '',
      yunMemberPhone: '',
      money: '',
      banklists: [],
      bankInfo1: {},
      bankInfo2: {},
      distributorType: '',
      banklist: [
        {
          value: '工商银行',
          label: '工商银行',
          disable: true
        },
        {
          value: '中国银行',
          label: '中国银行',
          disable: true
        },
        {
          value: '建设银行',
          label: '建设银行',
          disable: true
        },
        {
          value: '农业银行',
          label: '农业银行',
          disable: true
        },
        {
          value: '宁波银行',
          label: '宁波银行',
          disable: true
        },
        {
          value: '邮政银行',
          label: '邮政银行',
          disable: true
        },
        {
          value: '浦发银行',
          label: '浦发银行',
          disable: true
        },
        {
          value: '兴业银行',
          label: '兴业银行',
          disable: true
        },
        {
          value: '招商银行',
          label: '招商银行',
          disable: true
        },
        {
          value: '平安银行',
          label: '平安银行',
          disable: true
        },
        {
          value: '中信银行',
          label: '中信银行',
          disable: true
        },
        {
          value: '光大银行',
          label: '光大银行',
          disable: true
        },
        {
          value: '华夏银行',
          label: '华夏银行',
          disable: true
        },
        {
          value: '南京银行',
          label: '南京银行',
          disable: true
        },
        {
          value: '农信银行',
          label: '农信银行',
          disable: true
        },
        {
          value: '',
          label: '其他',
          disable: false
        }
      ],
      bankCardInfo: [{
        name: '招商',
        number: '6019 xxxx xxxx xxxx xxxx 6666'
      }, {
        name: '工商',
        number: '6019 xxxx xxxx xxxx xxxx 6666'
      }, {
        name: '建设',
        number: '6019 xxxx xxxx xxxx xxxx 6666'
      }],
      selectBank: 0,
      bankInfo: {
        selectBank: '',
        name: '',
        identityNo: ''
      },
      rules1: {
        money: [
          { required: true, message: '请输入本次提现金额', trigger: 'blur' },
          { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: '请输入数字', trigger: 'blur' },
          { min: 1, max: 10, message: '请输入正确的金额', trigger: 'blur' },
          { pattern: /^\d+(\.\d{1,2})?$/, message: '最小单位为分', trigger: 'blur' }
        ]
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
        ],
        carNo: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
          { pattern: /^([1-9]{1})(\d{15}|\d{18})$/, message: '银行卡号格式错误', trigger: 'blur' }
        ],
        unionBank: [
          { required: true, message: '请输入支付行号', trigger: 'blur' },
          { pattern: /^\d{12}$/, message: '支付行号必须为数字且不能超过12位', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字', trigger: 'blur' }
        ],
        identityNo: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '目前只支持中国居民身份证', trigger: 'blur' }
        ],
        selectBank: [
          { required: true, message: '请选择银行名称', trigger: 'change' }
        ]
      },
      // 可提现金额
      canCarry: 0.00,
      payMessageInfo: {
        verificationCode: '',
        bizOrderNo: ''
      },
      verificationCodeDialog: false,
      verificationCode: '',
      TXform: {
        money: 0.00
      }
    }
  },
  watch: {
    // 'money' () {
    //   if (this.money) {
    //     if (isNaN(this.money)) {
    //       this.$message.error('请输入数字')
    //       return false
    //     } else if (this.money === 0) {
    //       this.$message.error('提现金额不能为0')
    //       return false
    //     } else if (this.money > this.canCarry) {
    //       this.$message.error('提现金额不能大于余额')
    //       return false
    //     } else if (this.money.length > 7) {
    //       this.$message.error('金额输入长度不得超过七位数')
    //       return false
    //     }
    //   }
    // }
  },
  created () {
    this.distributorType = getStore('distributorType')
    this.getBanksListData()
    this.getStoreDistributor()
    // 获取提现金额
    this.getUserAmountOfAccount()
    this.getYunMemberInfo()
  },
  methods: {
    getUserAmountOfAccount () {
      this.$api.getUserAmountOfAccount().then(res => {
        if (res.code === 0 && res.data !== null) {
          if (res.data.allAmount !== null && res.data.freezenAmount !== null) {
            this.canCarry = (res.data.allAmount - res.data.freezenAmount) / 100
          } else {
            this.canCarry = 0.00
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 确认支付按钮点击
    confirmPay () {
      if (this.verificationCode === null) {
        this.$message.error('验证码不能为空')
      }
    },
    PayHandleClose () {
      this.verificationCodeDialog = false
    },
    // 获取云商通会员
    getYunMemberInfo () {
      let memberType = ''
      if (this.distributorType === 'personal') {
        memberType = '3'
      } else {
        memberType = '2'
      }
      let params = {
        memberType: memberType
      }
      this.$api.getYunMemberInfo(params).then(res => {
        if (res.code === 0) {
          var reg = /^(\d{3})\d{4}(\d{4})$/
          if (this.distributorType === 'personal') {
            this.yunMemberPhone = res.data.phone.replace(reg, '$1****$2')
          } else {
            this.yunMemberPhone = res.data.telephone.replace(reg, '$1****$2')
          }
        } else {
          this.yunMemberPhone = '138****8888'
        }
      })
    },
    // 申请提现
    extractWithdrawal (formName) {
      var _this = this
      let correctList = []
      for (var value of formName) {
        _this.$refs[value].validate((valid) => {
          correctList.push(valid)
        })
      }
      // 判断校验结果中是否存在false值
      if (correctList.indexOf(false) === -1) {
        // 判断提现金额
        if (this.TXform.money > this.canCarry) {
          this.$message.error('提现金额不能大于余额')
          return false
        }
        if (this.TXform.money === '0' || this.TXform.money === '0.0' || this.TXform.money === '0.00') {
          this.$message.error('提现金额不能为0')
          return false
        }
        if (this.moneyBank.replace(/ /g, '') === null || this.moneyBank.replace(/ /g, '') === '') {
          this.$message.error('请选择银行卡')
          return false
        }
        // this.verificationCodeDialog = true
        let params = {
          bankCard: this.moneyBank.replace(/ /g, ''),
          needMoney: this.TXform.money
        }
        this.$api.extractWithdrawal(params).then(res => {
          // 申请提现结果
          if (res.code === 0) {
            // 交易订单
            this.payMessageInfo.bizOrderNo = res.data.bizOrderNo
            this.verificationCodeDialog = true
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.error('请按要求填写页面红色标注必填项')
      }
    },
    // 确认支付
    confirmThePayment (verificationCode) {
      if (this.verificationCode === null) {
        this.$message.error('验证码不能为空')
      }
      let params = {
        bizOrderNo: this.payMessageInfo.bizOrderNo,
        verificationCode: this.verificationCode
      }
      this.$api.confirmThePayment(params).then(res => {
        // 请求成功且支付成功
        if (res.data.status === 'OK') {
          // 判断支付状态
          if (res.data.payStatus === 'success') {
            this.$router.push({path: '/financeCenter/withdrawSucc', query: {msg: '提现成功'}})
            this.TXform.money = 0.00
          } else if (res.data.payStatus === 'pending') {
            this.verificationCodeDialog = false
            this.$router.push({path: '/financeCenter/withdrawSucc', query: {msg: '提现操作成功,提现资金已冻结,资金将会在T+1个工作日到账'}})
            this.TXform.money = 0.00
          } else {
            this.verificationCodeDialog = false
            this.$message.error(res.data.payFailMessage)
            this.TXform.money = 0.00
          }
          // 请求失败
        } else {
          this.verificationCode = ''
          this.verificationCodeDialog = false
          this.$message.error(res.data.payFailMessage)
        }
      })
    },
    // 查询银行卡列表
    getBanksListData () {
      this.$api.getBanksListData().then(res => {
        if (res.code === 0) {
          this.banklists = res.data
          if (this.banklists.length > 0) {
            this.bankInfo1 = this.banklists[0]
            this.moneyBank = this.bankInfo1.bankCardNo
            this.bindOne = true
          }
          if (this.distributorType === 'company' && this.banklists.length === 2) {
            this.bindNewBank = false
            this.bindTwo = true
            this.bankInfo2 = this.banklists[1]
          }
          if (this.distributorType === 'personal' && this.banklists.length === 1) {
            this.bindNewBank = false
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 确定绑定银行卡
    submintFormVisible (bankInfo) {
      this.$refs[bankInfo].validate((valid) => {
        if (valid) {
          let params = {
            phone: this.bankInfo.phone,
            verificationCode: this.bankInfo.verificationCode
          }
          this.$api.saveYunBank(params).then(res => {
            if (res.code === 0) {
              this.handleClose()
              this.getBanksListData()
            } else {
              this.$message.error(res.msg)
              this.handleClose()
            }
          })
        } else {
          this.$message.error('请按要求填写页面红色标注必填项')
        }
      })
    },
    handleClose () {
      this.selectBankName = ''
      this.bindCardDialog = false
      this.isShow = true
      this.veriSecond = 60
      this.bankInfo = {}
      this.getStoreDistributor()
      clearInterval()
    },
    getStoreDistributor () {
      let params1 = {
        distributorId: getStore('distributorId')
      }
      this.$api.getStoreDistributor(params1).then(res => {
        if (res.code === 0) {
          this.bankInfo.name = res.data.legalRepresentative
          this.bankInfo.identityNo = res.data.legalRepresentativeNo
          this.legalFlag = true
        } else {
          this.legalFlag = false
        }
      })
    },
    getCode () {
      let _this = this
      _this.isShow = false
      let params = {
        carNo: this.bankInfo.carNo,
        phone: this.bankInfo.phone,
        name: this.bankInfo.name,
        identityNo: this.bankInfo.identityNo,
        unionBank: this.bankInfo.unionBank
      }
      this.$api.bindYunBank(params).then(res => {
        if (res.code === 0) {
        } else {
          this.$message.error(res.msg)
        }
      })
      let countDown = setInterval(function () {
        if (_this.veriSecond >= 1) {
          _this.veriSecond--
        } else {
          _this.isShow = true
          _this.veriSecond = 60
          clearInterval(countDown)
        }
      }, 1000)
    },
    // 切换银行
    selectChange (item) {
      this.selectBankName = item.label
      this.bankInfo.selectBank = item.value
      this.bankType = item.disable
      if (this.bankType) {
        this.bankInfo.unionBank = ''
      }
    },
    bindCard () {
      this.bindCardDialog = true
    },
    allMoney () {
      this.TXform.money = this.canCarry.toString()
    },
    // 切换银行卡
    selectBankCard (value, index) {
      this.checkBank = index
      this.selectBank = value
      this.moneyBank = value.bankCardNo
    },
    // 提现
    withdraw () {
      this.extractWithdrawal()
      // this.$router.push({path: '/financeCenter/withdrawSucc'})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
@import '../../../assets/style/components/elselect';
.withdraw{
  .withdraw-top{
    height: 165px;
    border: 1px solid rgba(215, 215, 215, 1);
    font-size: 14px;
    .title{
      font-weight: 1000;
      color: #868686;
      margin: 10px 0 0 20px;
    }
    .content{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      >div{
        width: 400px;
      }
      .can-take{
        margin: 10px 0 15px 0;
      }
      .take{
        display: flex;
        align-items: center;
        .el-input{
          width: 185px;
        }
        .first-form{
          .all-money{
            color: #6699CC;
            text-decoration: underline;
            cursor: pointer;
            margin-left: 170px;
          }
        }
      }
      .label{
        display: inline-block;
        width: 100px;
        color: #333333;
        text-align: right;
        margin-right: 10px;
      }
    }
  }
  .withdraw-bank{
    border: 1px solid rgba(215, 215, 215, 1);
    font-size: 14px;
    margin-top: 25px;
    .title{
      font-weight: 700;
      color: #868686;
      margin: 10px 0 0 20px;
    }
    .content{
      display: flex;
      flex-direction: column;
      align-items: center;
      .bank-card-list{
        display: flex;
        flex-wrap: wrap;
        width: 670px;
        margin: 20px auto;
        justify-content: space-between;
        .bank-card-item{
          width: 300px;
          height: 150px;
          color: #868686;
          border: 1px solid rgba(215, 215, 215, 1);
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          margin-bottom: 10px;
          cursor: pointer;
          .number{
            position: absolute;
            bottom: 5px;
            right: 15px;
          }
          img{
            position: absolute;
            top: 5px;
            right: 15px;
          }
          span{
            color: #6699CC;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
      .submit{
        width: 670px;
        margin-bottom: 20px;
        background-color: rgba(22, 155, 213, 1);
        color: #fff;
        height: 40px;
        border: none;
        &:hover{
          border: none;
        }
      }
    }
  }
}
.bind-card-content{
  width: 500px;
  margin: 0 auto;
  .title{
    color: #868686;
    font-size: 14px;
    text-align: center;
    font-weight: 500!important;
    margin: 10px auto!important;
    width: 400px;
  }
  .el-select{
    width: 120px;
  }
  .verify{
    display: flex;
    justify-content: center;
    align-items: center;
    .code-btn{
      height: 34px;
      padding: 9px 20px;
    }
  }
}
</style>
