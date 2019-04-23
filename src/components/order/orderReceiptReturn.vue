<template>
  <div class="receipt">
    <div class="order-num">订单号：{{order.orderNum}}</div>
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
        <el-col :span="24">
          <el-form-item label="退款金额" prop="payment">
            <div class="all-item">
              <el-input v-model="ruleForm.payment"></el-input>&nbsp;&nbsp;
              <span class="spanStyle" @click="clickPayMent" v-show="ruleForm.payment != order.accountPaid">全部</span>
            </div>
             <font style="color: gray; font-size: 100%">*退款金额不能大于已收金额</font>
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
        <el-button type="primary" @click="submit('ruleForm')" :loading = "loading">{{loading?'退款中':'退款'}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        orderId: '',
        payment: '',
        remarks: ''
      },
      rules: {
        payment: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { pattern: /^(-)?[0-9]+(.[0-9]{1,2})?$/, message: '金额必须为数字且只能保留两位小数' }
        ],
        remarks: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { min: 2, max: 150, message: '长度在 2 到 150 个字符', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  watch: {
    order () {
    }
  },
  created () {
    this.ruleForm.payment = this.order.accountPaid
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
          if (this.ruleForm.payment > this.order.accountPaid) {
            this.$message.error('退款金额不能大于已收金额')
            return
          }
          if (this.order.accountPaid === 0) {
            if (this.ruleForm.payment < 0) {
              this.$message.error('暂未收款,本次退款不能为负数')
              return
            }
          }
          if (this.ruleForm.payment < 0) {
            this.$message.error('退款金额不能为负数')
            return
          }
          this.loading = true
          this.ruleForm.orderId = this.order.orderId
          let params = {
            orderId: this.ruleForm.orderId,
            payment: '-' + this.ruleForm.payment,
            remarks: this.ruleForm.remarks,
            moneyType: 'N'
          }
          this.$api.orderpaymentMoney(params).then(res => {
            // this.ruleForm.payment = ''
            this.ruleForm.remarks = ''
            if (res.code === 0) {
              this.ruleForm.payment = this.order.totalMoney - this.ruleForm.payment - this.order.accountPaid
              this.$emit('hideDialog')
              this.loading = false
              this.$message.success('退款成功')
            } else {
              // 失败提示
              this.$message.error('退款失败')
              this.loading = false
            }
          })
        } else {
          this.$message.error('请按要求填写页面红色标注必填项')
        }
      })
    }
  },
  props: ['order']
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
