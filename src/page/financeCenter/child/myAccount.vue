<template>
<div>
  <div class="bind-phone"  v-if='bindYunPhone'>
    <div class="title">绑定手机号</div>
    <div class="content">
      <div class="form-msg">提现时，验证码会发送到该手机</div>
      <el-form  ref="ruleForm" class="ruleForm" label-position="right" label-width="80px" :rules="rules" :model="ruleForm">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="验证码" class="verify-code" prop="verificationCode">
              <div class="verify">
                <el-input  placeholder="验证码" autocomplete="off" v-model="ruleForm.verificationCode"></el-input>
                <el-button  v-if="isShow" @click="getCode" class="code-btn">获取验证码</el-button>
                <el-button disabled="disabled" v-else class="code-btn">{{veriSecond}}S</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-button class="submit" @click="submit('ruleForm')">绑定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
  <div v-else>
    <div class="my-account" v-if="!contractNo" >
      <div class="top-list">
        <div class="income">
          <div class="title">本月收入</div>
          <span class="money">￥{{moneyList.monthIncome}}</span>
        </div>
        <div class="overage" v-show="moneyShow">
          <div class="all">
            <span class="left-title">账户总额</span>
            <span class="money">￥{{moneyList.allAmount}}</span>
          </div>
          <div class="frost">
            <span class="left-title">冻结</span>
            <span class="money">￥{{moneyList.freezenAmount}}</span>
          </div>
          <div class="can-use">
            <span class="left-title">可提现</span>
            <span class="money">￥{{moneyList.canCarry}}</span>
            <span  class="to-take" @click="withDraw" v-if="isYunPhone">提现</span>
            <router-link :to="{name:'提现'}" class="to-take" v-if="!isYunPhone">提现</router-link>
          </div>
        </div>
      </div>
      <div class="record">
        <div class="record-title">
          <span class="title">本月交易记录</span>
          <el-form ref="form" label-width="80px" class="title-form">
            <div class="store">
              <span class="store-label">当前门店</span>
              <el-select v-model="selectStore"  @change="chooseStore" placeholder="请选择">
                <el-option
                  v-for="item in storeInfo.data"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <el-form-item label="付款时间">
              <el-date-picker
                v-model="dateTime"
                type="daterange"
                :clearable="true"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                >
              </el-date-picker>
            </el-form-item>
          </el-form>
        <el-button class="upload" @click="statisticsCount()">查询</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="serialNumber"
            label="交易流水号">
          </el-table-column>
          <el-table-column
            prop="orderNum"
            label="订单号">
          </el-table-column>
          <el-table-column
            prop="storeName"
            label="店铺">
          </el-table-column>
          <el-table-column
            prop="memberName"
            label="消费者">
          </el-table-column>
          <el-table-column
            prop="orderState"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="orderAmount"
            label="订单金额">
          </el-table-column>
          <el-table-column
            prop="orderCreateTime"
            label="下单时间">
          </el-table-column>
          <el-table-column
            prop="paymentTime"
            label="付款时间">
          </el-table-column>
        </el-table>
      <div class="pagin">
          <span class="total">共{{totalCount}}条数据</span>
              <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              layout="sizes, prev, pager, next"
              :page-sizes="[2, 5, 10, 20]"
              :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="no-sign" v-else>
      <div class="no-sign-content">
        <img src="../../../assets/image/no-sign.png" alt="">
        <p v-show="contractNoFlag">抱歉，您还未签约 <a :href="contractNoUrl" class="menber" target="view_window">《会员电子协议》</a></p>
        <p v-show="!contractNoFlag" @click="contractNoClick"  class="menber">抱歉，您还未签约<font >《会员电子协议》</font></p>
        <p>品牌资料配置-信息维护模块，法人及证照信息审核通过后，即可签约“会员电子协议”</p>
        <p>签约后，您的店铺可以进行在线交易，但每笔交易会收取0.6%的手续费</p>
        <p>客户在线下单的交易记录都会展示在这里,您也可以在这里提现</p>
      </div>
      <div class="bottom-msg" v-if="showBottom">
        <p>致亲爱的用户！</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您好，因平台升级，接入了在线支付功能，为了更好的保护您的账号安全，以及验证您账号的真实性及有效性，避免在交易过程中产生纠纷，所以请您补充完善法人及证照信息，并提交审核，审核通过后即可签约《会员电子协议》开通在线支付，谢谢！</p>
        <div class="close">
          <span @click="goBottom">立即前往</span>
          <span @click="closeBottom">暂不前往</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { setStore, getStore } from '../../../tool/Utils'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      showBottom: false,
      isShow: true,
      bindYunPhone: false,
      veriSecond: 60,
      isYunPhone: false,
      contractNo: true,
      OldDistributor: false,
      contractNoFlag: true,
      reviewState: false,
      selectStore: '',
      distributorType: '',
      dateTime: '',
      contractNoUrl: '',
      ruleForm: {},
      tableData: [],
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码必须为数字' }
        ]
      },
      // 金额相关
      moneyList: {
        // 月收入
        monthIncome: 0.00,
        // 账号总额
        allAmount: 0.00,
        // 冻结金额
        freezenAmount: 0.00,
        // 可提现
        canCarry:
        0.00
      },
      totalCount: 0,
      currentPage: 1,
      distributor: {},
      pagesize: 10,
      // 当前用户角色
      roleCode: '',
      moneyShow: false
    }
  },
  computed: {
    ...mapGetters(['storeInfo', 'storeId', 'storeName'])
  },
  created () {
    this.selectStore = getStore('storeName')
    this.payStoreId = getStore('storeIdWeb')
    this.distributorType = getStore('distributorType')
    this.roleCode = getStore('roleCode')
    this.changeMenuShow()
    this.getStoreDistributor()
    if (getStore('isYunPhone') === 'Y') {
      this.isYunPhone = false
    } else {
      this.isYunPhone = true
    }
    if (!getStore('contractNo')) {
      this.contractNo = true
    } else {
      this.contractNo = false
    }
  },
  methods: {
    changeMenuShow () {
      if (this.roleCode.indexOf('DISTRIBUTOR') >= 0) {
        this.moneyShow = true
      }
    },
    statisticsCount (value) {
      this.getFinanceCenterOrderList()
    },
    goBottom () {
      this.$router.push({path: '/store/maintain'})
    },
    closeBottom () {
      this.showBottom = false
    },
    chooseStore (value) {
      this.payStoreId = value
      this.getFinanceCenterOrderList()
    },
    // 获取签约电子会员协议
    getcontractNoUrl () {
      let params = {
        distributorType: this.distributorType
      }
      this.$api.getcontractNoUrl(params).then(res => {
        if (res.code === '0') {
          this.contractNoFlag = true
          this.contractNoUrl = res.data
        } else {
          this.contractNoFlag = false
        }
      })
    },
    // 获取列表详情
    getFinanceCenterOrderList () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        startDate: this.dateTime !== null && this.dateTime !== undefined && this.dateTime !== '' ? this.dateTime[0] : null,
        endDate: this.dateTime !== null && this.dateTime !== undefined && this.dateTime !== '' ? this.dateTime[1] : null,
        storeId: this.payStoreId
      }
      this.$api.getFinanceCenterOrderList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
          this.tableData.forEach(item => {
            if (item.orderState === 'PANYMENT_FAIL') {
              item.orderState = '交易关闭'
            } else if (item.orderState === 'PANYMENT_SUCCESS') {
              item.orderState = '交易成功'
            } else if (item.orderState === 'UNPAID') {
              item.orderState = '待付款'
            }
          })
          this.totalCount = res.count
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getUserAmountOfAccount () {
      this.$api.getUserAmountOfAccount().then(res => {
        if (res.code === 0 && res.data !== null) {
          if (res.data.allAmount !== null && res.data.allAmount !== '') {
            this.moneyList.allAmount = res.data.allAmount / 100
          }
          if (res.data.freezenAmount !== null && res.data.freezenAmount !== '') {
            this.moneyList.freezenAmount = res.data.freezenAmount / 100
          }
          this.moneyList.canCarry = (res.data.allAmount - res.data.freezenAmount) / 100
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    contractNoClick () {
      if (this.OldDistributor) {
        this.showBottom = true
      } else {
        if (this.distributor.reviewState === '3') {
          this.$message.error('请到品牌资料配置-信息维护页面完善法人及证照信息，并提交审核通过后，才能签约会员电子协议')
        } else if (this.distributor.reviewState === '2') {
          this.$message.error('您的资料正在审核，审核通过后可签约协议')
        } else if (this.distributor.reviewState === '1') {
          this.$message.error('您的资料审核未通过，请修改法人及证照信息后，重新提交审核')
        }
      }
    },
    // 关于提现是判断是否有手机
    withDraw () {
      this.bindYunPhone = true
    },
    getStoreDistributor () {
      let params1 = {
        distributorId: getStore('distributorId')
      }
      this.$api.getStoreDistributor(params1).then(res => {
        if (res.code === 0) {
          this.distributor = res.data
          if (res.data.isYunPhone === 'Y') {
            this.isYunPhone = false
          } else {
            this.isYunPhone = true
          }
          if (!res.data.contractNo) {
            this.contractNo = true
            if (this.distributor.isYunMember === '1' && this.distributor.reviewState === '0') {
              this.distributorType = this.distributor.distributorType
              this.getcontractNoUrl()
            } else {
              this.contractNoFlag = false
            }
          } else {
            this.contractNo = false
          }
          if (this.distributor.isYunMember === '0' && this.distributor.reviewState === '0') {
            this.OldDistributor = true
          }
          this.ruleForm.mobile = res.data.legalPhone
        } else {
          this.legalFlag = false
        }
        if (!this.contractNo) {
          // 获取账号信息
          if (this.moneyShow) {
            this.getUserAmountOfAccount()
          }
          // 获取订单列表
          this.getFinanceCenterOrderList()
          // 获取订单列表
          this.getMonthlyIncome()
        }
      })
    },
    // 发送验证码  绑定云手机
    getCode () {
      let _this = this
      _this.isShow = false
      let params = {
        mobile: this.ruleForm.mobile
      }
      this.$api.bindYunPhone(params).then(res => {
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
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getFinanceCenterOrderList()
    },
    // 获取本月销售额
    getMonthlyIncome () {
      this.$api.getTransactionDetails().then(res => {
        if (res.code === 0) {
          if (res.data !== null && res.data !== '') {
            this.moneyList.monthIncome = res.data / 100
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getFinanceCenterOrderList()
    },
    // 绑定云手机提交
    submit (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let params = {
            mobile: this.ruleForm.mobile,
            verificationCode: this.ruleForm.verificationCode
          }
          this.$api.saveYunPhone(params).then(res => {
            if (res.code === 0) {
              this.isYunPhone = false
              this.bindYunPhone = false
              setStore('isYunPhone', 'Y')
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$message.error('请按要求填写页面红色标注必填项')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.my-account{
  .top-list{
    height: 160px;
    border: 1px solid rgba(215, 215, 215, 1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
    font-size: 14px;
    .income{
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title{
        font-weight: 700;
        margin-bottom: 15px;
      }
    }
    .overage{
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid rgba(215, 215, 215, 1);
      >div{
        margin-bottom: 10px;
        width: 250px;
      }
      .left-title{
        display: inline-block;
        width: 100px;
        font-weight: 700;
        text-align: right;
        padding-right: 10px;
      }
      .to-take{
        cursor: pointer;
        color: #6699CC;
        text-decoration: underline;
        padding-left: 20px;
      }
    }
  }
  .record{
    margin-top: 20px;
    .record-title{
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      background: #F4F4F4;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .el-range-editor.el-input__inner{
        margin: 3px 10px 3px 0;
      }
      .title{
        margin-left: 20px;
      }
      .title-form{
        display: flex;
      }
      .store{
        display: flex;
        justify-content: center;
        align-items: center;
        .store-label{
          margin-right: 10px;
        }
      }
    }
    .upload{
      padding: 5px 12px;
      color: #fff;
      font-size: 12px;
      background: $blue-color;
      border: none;
      height: 22px;
      margin-left: 10px;
      margin: 9px 20px 0 0;
    }
  }
}
.no-sign{
  .no-sign-content{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img{
      margin: 30px 0;
    }
    p{
      width: 560px;
      font-size: 14px;
      color: #333333;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      .menber{
        color: #6699CC;
        text-decoration: underline;
      }
      font{
        text-decoration:underline;
        color: #6699CC;
      }
    }
  }
  .bottom-msg{
    margin: 20px auto;
    font-size: 14px;
    width: 650px;
    background-color: rgba(0, 0, 0, 1);
    color: #fff;
    padding: 20px;
    p{
      line-height: 30px;
    }
    .close{
      color: #6699CC;
      margin: 5px 0 5px;
      display: flex;
      justify-content: flex-end;
      span{
        text-decoration: underline;
        cursor: pointer;
        margin-left: 15px;
      }
    }
  }
}
.bind-phone{
  margin-top: 20px;
  border: 1px solid rgba(215, 215, 215, 1);
  .title{
    font-weight: 700;
    color: #868686;
    font-size: 14px;
    margin: 0 0 0 20px;
  }
  .content{
    width: 300px;
    margin: 0 auto;
    text-align: center;
    color: #868686;
    font-size: 14px;
    padding: 20px 0;
    .form-msg{
      margin: 10px 0;
    }
    .verify-code{
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
    .submit{
      width: 100%;
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
</style>
