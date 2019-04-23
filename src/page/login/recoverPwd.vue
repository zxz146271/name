<template>
<div class="sign">
  <div class="black-groung"></div>
  <div class="main">
    <div class="top">
      <div class="logo" @click="goHome">
        <!-- <i class="iconfont icon-logo_bigzone1"></i> -->
        <img src="../../assets/image/logo (1).png" alt="">
      </div>
      <div class="menu">
        <span>服务热线</span>
        <i>400 668 4866</i>
      </div>
    </div>
    <div class="content">
      <div class="login">
        <div class="login-top">
          <!-- <i class="iconfont icon-logo_bigzone1"></i> -->
          <img src="../../assets/image/logo (2).png" alt="">
          <span>找回密码</span>
        </div>
        <div class="form-list" >
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item prop="mobile">
                  <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="checkCode">
                  <div class="yanzheng">
                    <el-input v-model="ruleForm.checkCode"  placeholder="请输入验证码"></el-input>
                    <el-button @click="getVerification" v-if="isShow">验证码</el-button>
                    <el-button disabled="disabled" v-else>{{veriSecond}}S</el-button>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="newPwd">
                  <el-input type="text" v-model="ruleForm.newPwd" placeholder="请输入新密码" onfocus="this.type='password'"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-button class="submit" @click="editPassword('ruleForm')" :loading="loading">{{loading? '修改中':'确定'}}</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="login-bottom">
          <router-link to="/login" class="span">返回登录</router-link>
        </div>
      </div>
    </div>
    <div class="foot">
      <ul>
        <li>
          <p>售前热线</p>
        </li>
        <li>
          <p>公司文化</p>
          <p>合伙联系</p>
        </li>
        <li>
          <p>免费声明</p>
          <p>常见问题</p>
        </li>
        <li>
          <p>公司动态</p>
          <p>微信公众号</p>
        </li>
      </ul>
      <div class="copyright">
        <span>Copyright&nbsp;2018&nbsp;BigZone.&nbsp;All&nbsp;Rights&nbsp;Reserved&nbsp;<a href="http://www.miibeian.gov.cn" target="_blank">沪ICP备17013756号-4</a></span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
// import { setStore } from '../../tool/Utils'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      veriSecond: 60,
      isShow: true,
      ruleForm: {
        mobile: '',
        checkCode: '',
        newPwd: ''
      },
      randomNum: '',
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' }
        ],
        checkCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为6位短信验证码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度为 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  // 数据初始化方法
  mounted () {
    // this.getCode()
  },
  methods: {
    goHome () {
      this.$router.push({path: '/'})
    },
    getVerification () {
      if (this.ruleForm.mobile === '') {
        this.$message.error('请输入手机号')
      } else {
        let params = {
          mobile: this.ruleForm.mobile
        }
        this.$api.sendIdCode(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
        let _this = this
        _this.isShow = false
        let countDown = setInterval(function () {
          if (_this.veriSecond >= 1) {
            _this.veriSecond--
          } else {
            _this.isShow = true
            _this.veriSecond = 60
            clearInterval(countDown)
          }
        }, 1000)
      }
    },
    ...mapActions(['setRouters']),
    editPassword (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let params = {
            mobile: this.ruleForm.mobile,
            checkCode: this.ruleForm.checkCode,
            newPwd: this.ruleForm.newPwd
          }
          this.$api.forgetPassword(params).then(res => {
            if (res.code === 0) {
              this.$message.success('修改密码成功')
              // setStore('token', res.data.token)
              this.loading = false
              this.$router.push({path: '/login'})
            } else {
              this.$message.error(res.msg)
              this.loading = false
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.sign {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url('../../assets/image/sign-black.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .black-groung {
    width: 100%;
    height: 100%;
    background-image: url('../../assets/image/sign-black.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    position: absolute;
    left: 0;
    top: 0;
    filter: blur(20px);
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: rgba(43, 47, 51, 0.5);
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 2000;
    padding: 102px 0 186px 0;
    .login {
      width: 420px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      padding: 46px 32px 26px 32px;
      .login-top {
        text-align: center;
        img{
          height: 120px;
        }
        > i {
          font-size: 48px;
          color: $main-color;
        }
        span {
          font-size: $detail-price-big-size;
          color: $text-main-color;
          display: block;
          padding: 0 0 20px 0;
          text-align: left;
        }
      }
      .login-bottom {
        display: flex;
        justify-content: space-between;
        .span {
          color: $blue-color;
          font-size: $xs-size;
          cursor: pointer;
          padding-top: 20px;
        }
      }
      .form-list {
        .form-title {
          width: 200px;
          position: absolute;
          color: $text-adorn-color;
          font-size: $xs-size;
          right: -200px;
          top: 0;
          padding-left: 20px;
        }
        .blue-color{
          color:$blue-color;
        }
        .yanzheng{
          display: flex;
          justify-content: center;
          button{
            padding: 2px 14px;
            height: 34px;
            margin: 3px;
          }
        }
        .el-col-12 {
          .el-input-number {
            width: 100%;
            line-height: 34px;
            .el-input-number__increase {
              line-height: 17px;
            }
          }
        }
        .upload-item {
          .el-form-item__content {
            line-height: 0;
          }
        }
        .submit {
          width: 100%;
          padding: 12px 0;
          background: $main-color;
          border-radius: 4px;
          font-size: $md-size;
          color: #fff;
          border: none;
        }
      }
    }
  }
  .main {
    width: 1000px;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 0;
    z-index: 2;
    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 50px;
      color: #fff;
      z-index: 5000;
      position: absolute;
      left: 0;
      top: 0;
      .logo {
        img{
          height: 120px;
          cursor: pointer;
        }
        > i {
          font-size: 40px;
        }
      }
      .menu {
        display: flex;
        align-items: center;
        font-size: $xs-size;
        p {
          cursor: pointer;
        }
        span {
          margin: 0 5px 0 35px;
          cursor: pointer;
        }
        i {
          padding: 2px 5px;
          border-radius: 4px;
          background: $text-main-color;
        }
      }
    }
    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 3000;
      ul {
        display: flex;
        li {
          flex: 1;
          margin-right: 40px;
          color: rgba(255, 255, 255, 0.3);
          position: relative;
          cursor: pointer;
          &:last-child {
            margin-right: 0;
          }
          &::before {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: rgba(255, 255, 255, 0.3);
            position: absolute;
            top: 0;
            left: 0;
          }
          p {
            margin-top: 10px;
          }
        }
      }
      .copyright {
        display: flex;
        justify-content: center;
        padding: 15px 0 15px 0;
        span {
          margin-right: 15px;
          color: rgba(255, 255, 255, 0.3);
          font-size: $xs-size;
          a{
            color: rgba(255, 255, 255, 0.3);
          }
        }
      }
    }
  }
}
</style>
