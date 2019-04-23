<template>
  <div class="receipt">
    <div class="order-num">订单号: {{order.orderNum}}</div>
    <div class="money">
      <ul>
        <li>
          <p>应收金额</p>
          <p class="num">￥{{order.totalMoney}}</p>
        </li>
        <li>
          <p>已收金额</p>
          <p class="num">￥{{order.accountPaid}}</p>
        </li>
        <li>
          <p>未付金额</p>
          <p class="num red">￥{{order.nonPayment}}</p>
        </li>
      </ul>
    </div>
    <div class="receipt-form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="ruleForm">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="订单ID" prop="staffId" v-show="false" >
              <el-input v-model="order.orderId"></el-input>
            </el-form-item>
          </el-col>
        <el-col :span="24" v-if="orderJSON.title === '收款'">
          <el-form-item label= "收款金额" prop="payment">
            <el-input v-model="ruleForm.payment"></el-input>
            <font style="color: gray; font-size: 100%">*收款金额不能大于未付金额</font>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-else>
          <el-form-item label= "退款金额" prop="payment">
            <div class="all-item">
              <el-input v-model="ruleForm.payment"></el-input>&nbsp;&nbsp;
              <span class="spanStyle" @click="clickPayMent" v-show="ruleForm.payment != order.accountPaid">全部</span>
            </div>
            <font style="color: gray; font-size: 100%">*退款金额不能大于已付金额</font>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <div class="btns">
        <el-button @click="cancel('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submit('ruleForm')" :loading="loading">{{loading ? orderJSON.title  + '中' : '确定' + orderJSON.title}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      ruleForm: {
        orderId: '',
        payment: '',
        remarks: ''
      },
      rules: {
        payment: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '金额必须为数字且只能保留两位小数' }
        ],
        remarks: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { min: 2, max: 150, message: '长度在 2 到 150 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    order () {
    }
  },
  created () {
    if (this.orderJSON.title === '收款') {
      this.ruleForm.payment = this.order.nonPayment
    } else {
      this.ruleForm.payment = this.order.accountPaid
    }
  },
  methods: {
    cancel (ruleForm) {
      this.$refs[ruleForm].resetFields()
      this.$emit('hideDialog')
    },
    clickPayMent () {
      this.ruleForm.payment = this.order.accountPaid
    },
    submit (ruleForm) {
      // 保存表单校验结果
      this.$refs[ruleForm].validate((valid) => {
        // 判断校验结果中是否存在false值
        if (valid) {
          let moneyType = 'Y'
          if (this.orderJSON.title === '收款') {
            if (this.ruleForm.payment > this.order.nonPayment) {
              this.$message.error('付款金额不得大于未付款金额')
              return
            }
            if (this.order.accountPaid === 0) {
              if (this.ruleForm.payment <= 0) {
                this.$message.error('暂未收款,本次付款不能为0')
                return
              }
            }
            moneyType = 'Y'
          } else {
            if (this.ruleForm.payment > this.order.accountPaid) {
              this.$message.error('退款金额不得大于已付款金额')
              return
            }
            if (this.ruleForm.payment <= 0) {
              this.$message.error('暂未收款,本次付款不能为0')
              return
            }
            moneyType = 'N'
            // this.ruleForm.payment = 0 - this.ruleForm.payment
          }
          this.ruleForm.orderId = this.order.orderId
          let payments = this.ruleForm.payment
          if (moneyType === 'N') {
            payments = 0 - this.ruleForm.payment
          }
          this.loading = true
          let params = {
            orderId: this.ruleForm.orderId,
            payment: payments,
            remarks: this.ruleForm.remarks,
            moneyType: moneyType
          }
          this.$api.paymentMoney(params).then(res => {
            // this.ruleForm.payment = ''
            this.ruleForm.remarks = ''
            if (res.code === 0) {
              this.$message({
                message: this.orderJSON.title + '成功',
                type: 'success'
              })
              this.loading = false
              this.ruleForm.payment = this.order.totalMoney - this.ruleForm.payment - this.order.accountPaid
              this.$emit('hideDialog')
            } else {
              // 失败提示
              this.loading = false
              this.$message.error(this.orderJSON.title + '失败')
            }
          })
        } else {
          this.$message.error('请按要求填写页面红色标注必填项')
        }
      })
    }
  },
  props: ['order', 'orderJSON']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.receipt{
  .order-num{
    font-size: 24px;
    text-align: center;
  }
  .money{
    background-color: $gray-color;
    padding: 40px 0;
    margin-top: 22px;
    ul{
      text-align: center;
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
            font-weight: bold;
            &.red{
              color:$main-color;
            }
          }
        }
      }
    }
  }
  .receipt-form{
    width:50%;
    margin: 20px auto;
  }
  .btns{
    text-align: center;
    margin-top: 20px;
    button{
      padding:15px 20px;
      width: 40%;
    }
  }
  .spanStyle{
    cursor: pointer;
    color: blue;
    white-space: nowrap;  /*强制span不换行*/
    display: inline-block;  /*将span当做块级元素对待*/
  }
  .all-item{
    display: flex;
    justify-content: flex-start;
    align-items: center
  }
}
</style>
