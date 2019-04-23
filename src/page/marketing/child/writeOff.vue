<template>
  <div class="write-off">
    <div class="sign">
      <img class="img" src="../../../assets/image/card/kaquan_img@3x.png" alt="">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="ruleForm">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="优惠码/手机号" prop="pageData">
              <el-input v-model="ruleForm.pageData"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="优惠码/手机号" prop="promotionCode">
              <el-input v-model="ruleForm.promotionCode" :disabled="ruleForm.phoneNumber.length>0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phoneNumber">
              <el-input v-model="ruleForm.phoneNumber"  :disabled="ruleForm.promotionCode.length>0"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
      <!-- <div class="sign-btn">
          <el-button class="submit" @click="detail('ruleForm')" :disabled="ruleForm.phoneNumber.length == 0 && ruleForm.promotionCode.length == 0" >
            核销优惠劵
          </el-button>
      </div> -->
        <div class="sign-btn">
          <el-button class="submit" @click="detail('ruleForm')" >
            核销优惠劵
          </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        phoneNumber: '',
        promotionCode: '',
        pageData: '',
      },
      rules: {
        pageData: [
          { required: true, message: '请填写手机号或优惠码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    detail (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断优惠码长度,长度为十一且全为数字则为手机号
          if (this.ruleForm.pageData.length === 11 && !isNaN(this.ruleForm.pageData)) {
            this.getCouponByPhone(this.ruleForm.pageData)
          } else {
            this.getCouponByCode(this.ruleForm.pageData)
          }
          // let promotionCode = this.ruleForm.promotionCode
          // let phoneNumber = this.ruleForm.phoneNumber
          // this.$router.push({path: '/marketing/writeOffDetail', query: {promotionCode: promotionCode, phoneNumber: phoneNumber}})
        }
      })
    },
    getCouponByPhone (phone) {
      let params = {
        phoneNumber: phone
      }
      this.$api.getConponByPhone(params).then(res => {
        if (res.data.length !== 0) {
          this.$router.push({path: '/marketing/writeOffDetail', query: {flag: true, phoneNumber: phone}})
        } else {
          this.$message.error('对不起,未找到相关卡券')
        }
      })
    },
    getCouponByCode (code) {
      let params = {
        promotionCode: code
      }
      this.$api.getConponByCode(params).then(res => {
        if (res.code === 1) {
          this.$message.error(res.msg)
        }
        if (res.data.length !== 0) {
          let params = code
          this.$router.push({path: '/marketing/writeOffDetail', query: {params: params, flag: false}})
        } else {
          this.$message.error('对不起,未找到相关卡券')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.write-off{
  margin: 0 auto;
  padding-top: 100px;
  height: 500px;
  position: relative;
  .el-col-12{
    margin-left: 25%;
    .el-input-number{
      width:100%;
      line-height: 34px;
      .el-input-number__increase{
        line-height: 17px;
      }
    }
  }
  .upload-item{
    .el-form-item__content{
      line-height: 0;
    }
  }
  .sign{
    width:100%;
    position: absolute;
    left: 0;
    top:5%;
    margin-top:-76px;
    padding: 0 70px;
    .img{
      width: 257px;
      height: 218px;
      display: block;
      margin: 30px auto; 
    }
    .sign-btn{
      position: relative;
      .submit{
        background:$main-color;
        border-radius: 4px;
        color:#fff;
        padding: 12px 30px;
        border: none;
        position: absolute;
        left: 50%;
        bottom:-36px;
      }
    }
  }
}
</style>
