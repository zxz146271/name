<template>
<div class="sign">
  <div class="black-groung"></div>
  <div class="main">
    <div class="top">
      <div class="logo" >
        <!-- <i class="iconfont icon-logo_bigzone1"></i> -->
        <a  href="https://www.muyusi.com/">
        <img src="../../assets/image/logo (1).png" alt=""></a>
      </div>
      <div class="menu">
        <!-- <p>免费注册</p> -->
        <span>服务热线</span>
        <i>400 668 4866</i>
      </div>
    </div>
    <div class="content">
      <div class="login">
        <div class="login-top">
          <!-- <i class="iconfont icon-logo_bigzone1"></i> -->
          <img src="../../assets/image/logo (2).png" alt="">
          <span>登录</span>
        </div>
        <div class="form-list" >
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="pwd">
                  <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" ref="password" onfocus="this.type='password'"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-button @click="login('ruleForm')" :loading="loading">{{loading? '登录中':'登录'}}</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="login-bottom">
          <router-link to="/recoverPwd" class="span">忘记密码？</router-link>
          <router-link to="/registered" class="span">免费注册</router-link>
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
import { setStore, getStore } from '../../tool/Utils'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      messageNoReadCount: 0,
      ruleForm: {
        name: '',
        pwd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.ruleForm.name = getStore('mobile')
  },
  mounted () {
    this.$refs.password.value = ''
  },
  methods: {
    ...mapActions(['setRouters']),
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let params = {
            mobile: this.ruleForm.name,
            passWord: this.ruleForm.pwd
          }
          setStore('token', '')
          this.$api.login(params).then(res => {
            if (res.code === 0) {
              setStore('mobile', this.ruleForm.name)
              setStore('storeIdWeb', res.data.loginUser.presupposedStoreId)
              setStore('token', res.data.token)
              setStore('roleCode', res.data.loginUser.roleCode)
              setStore('staffName', res.data.loginUser.staffName)
              setStore('distributorId', res.data.loginUser.distributorId)
              setStore('storeName', res.data.loginUser.presupposedStoreName)
              setStore('staffId', res.data.loginUser.staffId)
              setStore('staffCode', res.data.loginUser.staffCode)
              setStore('storeCodeWeb', res.data.loginUser.presupposedStoreCode)
              setStore('storeShareCode', res.data.loginUser.presupposedStoreShareId)
              setStore('isYunPhone', res.data.loginUser.isYunPhone)
              setStore('contractNo', res.data.loginUser.contractNo)
              setStore('distributorType', res.data.loginUser.distributorType)
              setStore('wechatUrl', res.data.loginUser.wechatUrl)
              this.$store.dispatch('setStoreId', res.data.loginUser.presupposedStoreId)
              this.$store.dispatch('setStoreName', res.data.loginUser.presupposedStoreName)
              this.$store.dispatch('setRouters').then(res => {
                this.$store.dispatch('setPerm')
                // this.loading = false
                this.$router.push({path: '/home'})
              })
              // this.getNotReadCount()
            } else if (res.code !== 3) {
              this.$message.error(res.msg)
              this.loading = false
            }
          })
        }
      })
    },
    goHome () {
      this.$router.push({path: '/'})
    },
    getNotReadCount (values) {
      this.$api.getNotReadCount().then(res => {
        this.messageNoReadCount = res.data
        if (res.data > 0) {
          this.$notify({
            title: '提示',
            message: '您收到' + res.data + '条新通知,请及时处理',
            duration: 0,
            position: 'bottom-right'
          })
          setStore('noReadCount', res.data)
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
    z-index: 3001;
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
        .el-button {
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
          padding-top: 12px;
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
            margin-top: 18px;
          }
        }
      }
      .copyright {
        display: flex;
        justify-content: center;
        padding: 25px 0 15px 0;
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
