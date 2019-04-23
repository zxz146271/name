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
        <li>
          <p>订单商品数量</p>
          <p class="num">{{order.allGoodsCount}}</p>
        </li>
        <li v-show="orderJSON.title === '完成订单'">
          <p>已发货商品数量</p>
          <p class="num">{{order.sendGoodsCount}}</p>
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
        <el-col :span="24" v-if="orderJSON.title === '变更价格'">
          <el-form-item label= "变更价格" prop="payment">
             <el-input v-model="ruleForm.payment"></el-input>
             <font style="color: gray; font-size: 100%; line-height: 16px">*变更总价,不可小于或等于0</font>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="orderJSON.title === '取消订单' && orderJSON.orderState != '1'">
          <el-form-item label= "退款金额" prop="payment">
            <div class="all-item">
              <el-input v-model="ruleForm.payment" ></el-input>&nbsp;&nbsp;
             <span class="spanStyle" @click="clickPayMent" v-show="ruleForm.payment != order.accountPaid">全部</span>
            </div>
             <font style="color: gray; font-size: 100%; line-height: 16px">*退款金额不可大于已收金额，所有商品将被记为退货，全部退款，订单将被取消。部分退款，订单已完成</font>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="(orderJSON.title === '取消订单' && orderJSON.orderState != '1') || orderJSON.title === '变更价格'">
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <div class="btns">
        <el-button @click="cancel('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submit('ruleForm')" :loading="loading">{{loading?  orderJSON.title +'中' : '确认' + orderJSON.title.substring(0, 2)}}</el-button>
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
          { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '金额必须为数字且只能保留2位小数' }
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
          if (this.orderJSON.title === '变更价格') {
            if (this.ruleForm.payment < this.order.accountPaid) {
              this.$message.error('修改总价不可以小于已付金额')
              return
            }
          } else if (this.orderJSON.title === '取消订单') {
            if (this.ruleForm.payment > this.order.accountPaid) {
              this.$message.error('退款金额不能大于已收金额')
              return
            }
          }
          this.ruleForm.orderId = this.order.orderId
          this.loading = true
          if (this.orderJSON.title === '变更价格') {
            let params = {
              orderId: this.ruleForm.orderId,
              totalMoney: this.ruleForm.payment,
              remarks: this.ruleForm.remarks
            }
            this.$api.editOrderTotalMoney(params).then(res => {
              this.ruleForm.remarks = ''
              if (res.code === 0) {
                this.$message({
                  message: this.orderJSON.title + '成功',
                  type: 'success'
                })
                this.loading = false
                this.$emit('hideDialog')
              } else {
                // 失败提示
                this.loading = false
                this.$message.error(this.orderJSON.title + '失败')
              }
            })
          } else if (this.orderJSON.title === '完成订单') {
            let params = {
              orderId: this.ruleForm.orderId
            }
            this.$api.orderconfirm(params).then(res => {
              if (res.code === 0) {
                this.$message({
                  message: '该订单已完成',
                  type: 'success'
                })
                this.loading = false
                this.$emit('hideDialog')
              } else if (res.code === 1) {
                this.loading = false
                this.$emit('hideDialog')
                this.$message.error('该订单完成失败')
              } else {
                this.loading = false
                this.$emit('hideDialog')
                this.$message.error(res.msg)
              }
            })
          } else if (this.orderJSON.title === '取消订单') {
            let params = {
              orderId: this.ruleForm.orderId,
              amountPaid: this.order.accountPaid,
              payment: 0 - this.ruleForm.payment,
              remarks: this.ruleForm.remarks,
              moneyType: 'N',
              state: this.order.state
            }
            this.$api.ordercolseAll(params).then(res => {
              if (res.code === 0) {
                this.$message({
                  message: '该订单确认已取消',
                  type: 'success'
                })
                this.loading = false
                this.$emit('hideDialog')
              } else if (res.code === 1) {
                this.loading = false
                this.$emit('hideDialog')
                this.$message.error('该订单确认已取消失败')
              } else {
                this.loading = false
                this.$emit('hideDialog')
                this.$message.error(res.msg)
              }
            })
          }
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
