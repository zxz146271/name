<template>
<div class="sign">
  <div class="back-ground"></div>
  <div class="black-groung">
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
            <span>注册</span>
          </div>
          <div class="form-list" >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
              <el-row :gutter="24">
                <el-col :span="24" class="form-height">
                  <el-form-item prop="mobile">
                    <el-input v-model="ruleForm.mobile" placeholder="手机号" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24" class="form-height">
                  <el-form-item prop="distributorName">
                    <el-input v-model="ruleForm.distributorName" placeholder="经销商名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24" class="form-height">
                <el-form-item label="经销商级别" prop="distributorType">
                  <el-radio-group v-model="ruleForm.distributorType">
                    <el-radio label="company">企业级</el-radio>
                    <el-radio label="personal">个人级</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
                <el-col :span="24" class="form-height">
                  <el-form-item prop="mainSelected">
                    <scascader :mainSelected="mainSelected" @selMain="selMain" />
                    <!-- <el-cascader
                      placeholder='未选择经营类目'
                      :options='mainOptions'
                      filterable
                      separator=">"
                      :props="cascaderConfig"
                      change-on-select
                      v-model='ruleForm.mainSelected'
                    ></el-cascader> -->
                  </el-form-item>
                </el-col>
                <el-col :span="24" class="form-height">
                  <el-form-item prop="areaSelected">
                    <el-cascader
                      size="large"
                      placeholder='未选择所在地区'
                      :props="newprops"
                      :options="options"
                      v-model="ruleForm.areaSelected">
                    </el-cascader>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="23" class="form-height">
                  <el-form-item prop="checkCode">
                    <div class="yanzheng">
                      <el-input v-model="ruleForm.checkCode" placeholder="验证码" autocomplete="off"></el-input>
                      <el-button @click="getVerification" v-if="isShow">获取验证码</el-button>
                      <el-button disabled="disabled" v-else>{{veriSecond}}S</el-button>
                    </div>
                  </el-form-item>
                </el-col> -->
                <el-col :span="24" class="form-height">
                  <el-form-item prop="passWord">
                    <el-input v-model="ruleForm.passWord" type="text" autocomplete="off" placeholder="请输入密码" onfocus="this.type='password'"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24" class="form-height">
                  <el-form-item prop="pwd">
                    <el-checkbox v-model="ruleForm.agreeChecked"></el-checkbox>
                    已阅读，同意蘑鱼丝产品及服务协议<a href="https://store-platform.oss-cn-shanghai.aliyuncs.com/moyusi.pdf"  class="blue-color" target="_blank">负责声明</a>
                  </el-form-item>
                </el-col>
                <el-col :span="24" class="form-height">
                  <el-button class="submit" @click="storeSaveDistributor('ruleForm')" :loading="loading">{{loading? '注册中':'注册'}}</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="login-bottom">
            <router-link to="/" class="span">返回首页</router-link>
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
          <span>Copyright&nbsp;2018&nbsp;BigZone.&nbsp;All&nbsp;Rights&nbsp;Reserved&nbsp; <a href="http://www.miibeian.gov.cn" target="_blank">沪ICP备17013756号-4</a></span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
// import { setStore } from '../../tool/Utils'
import { mapActions } from 'vuex'
import { setStore } from '../../tool/Utils'
import { regionData } from 'chinaArea'
import scascader from '@/components/public/scascader'
export default {
  components: {scascader},
  data () {
    return {
      loading: false,
      veriSecond: 60,
      isShow: true,
      flag: true,
      randomNum: '',
      mainSelected:{
        placeholder: '未选择经营类目',
        mainOptions:[]
      },
      ruleForm: {
        mobile: '',
        distributorName: '',
        areaSelected: [],
        mainSelected: [],
        checkCode: '',
        passWord: '',
        agreeChecked: false,
        distributorType: 'company'
      },
      // 省市区
      options: regionData,
      // 主营类目
      mainOptions: [],
      newprops: {
        value: 'label'
      },
      cascaderConfig: {
        label: 'label',
        value: 'id',
        children: 'children'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' }
        ],
        distributorName: [
          { required: true, message: '请输入经销商名称', trigger: 'blur' },
          { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
        ],
        areaSelected: [
          { required: true, message: '请选择所在区域', trigger: 'blur' }
        ],
        mainSelected: [
          { required: true, message: '请选择经营类目', trigger: 'blur' }
        ],
        // checkCode: [
        //   { required: true, message: '请输入短信验证码', trigger: 'blur' },
        //   { min: 6, max: 6, message: '长度为6位短信验证码', trigger: 'blur' }
        // ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度为 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  // 数据初始化方法
  mounted () {
    this.getPfBaseMainCategoryList()
  },
  watch: {
    'ruleForm.mobile' () {
      if (this.ruleForm.mobile.length === 11) {
        this.findMobile(this.ruleForm.mobile)
      }
    }
  },
  methods: {
    goHome () {
      this.$router.push({path: '/'})
    },
    // 查询注册经销商手机号是否可用
    findMobile (mobile) {
      let params = {
        mobile: mobile
      }
      this.$api.findDistributorMobile(params).then(res => {
        if (res.code === 1) {
          this.flag = true
          this.$message.error('该手机号已存在,请重新输入')
        } else {
          this.flag = false
        }
      })
    },
    getVerification () {
      if (this.ruleForm.mobile === '') {
        this.$message.error('请输入手机号')
      } else {
        if (this.flag) {
          this.$message.error('该手机号已存在,请重新输入')
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
      }
    },
    ...mapActions(['setRouters']),
    // 获取主营类目列表
    getPfBaseMainCategoryList () {
      let params = {}
      this.$api.getPfBaseMainCategoryList(params).then(res => {
        this.mainOptions = res.data
        this.$set(this.mainSelected, `mainOptions`, res.data)
      })
    },
    selMain(mainSelected) {
      this.ruleForm.mainSelected = mainSelected
    },
    storeSaveDistributor (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (_this.ruleForm.agreeChecked === false) {
            _this.$message.error('请阅读平台负责声明，并勾选同意按钮！')
          } else {
            this.loading = true
            let area = []
            area = this.ruleForm.areaSelected.slice(0, 3)
            let main = []
            main = this.ruleForm.mainSelected[this.ruleForm.mainSelected.length - 1]
            let params = {
              mobile: this.ruleForm.mobile,
              distributorName: this.ruleForm.distributorName,
              checkCode: this.ruleForm.checkCode,
              adcode: JSON.stringify(area),
              mainCategory: main,
              passWord: this.ruleForm.passWord,
              distributorType: this.ruleForm.distributorType
            }
            this.$api.storeSaveDistributor(params).then(res => {
              if (res.code === 0) {
                // setStore('token', res.data.token)
                this.$message.success('注册成功')
                // this.loading = false
                // this.$router.push({path: '/login'})
                this.login()
              } else {
                this.$message.error(res.msg)
                this.loading = false
              }
            })
          }
        }
      })
    },
    login () {
      let params = {
        mobile: this.ruleForm.mobile,
        passWord: this.ruleForm.passWord
      }
      setStore('token', '')
      this.$api.login(params).then(res => {
        if (res.code === 0) {
          setStore('mobile', this.ruleForm.mobile)
          setStore('storeIdWeb', res.data.loginUser.presupposedStoreId)
          setStore('token', res.data.token)
          setStore('roleCode', res.data.loginUser.roleCode)
          setStore('staffName', res.data.loginUser.staffName)
          setStore('distributorId', res.data.loginUser.distributorId)
          setStore('storeName', res.data.loginUser.presupposedStoreName)
          setStore('staffId', res.data.loginUser.staffId)
          setStore('storeShareId', res.data.loginUser.presupposedStoreShareId)
          this.$store.dispatch('setStoreId', res.data.loginUser.presupposedStoreId)
          this.$store.dispatch('setStoreName', res.data.loginUser.presupposedStoreName)
          this.$store.dispatch('setRouters').then(res => {
            this.$store.dispatch('setPerm')
            this.$router.push({path: '/home'})
          })
          this.getNotReadCount()
        } else if (res.code !== 3) {
          this.$message.error(res.msg)
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
  min-height: 870px;
  background-image: url('../../assets/image/sign-black.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;
  .el-form-item{
    margin-bottom: 5px;
  }
  .black-groung {
    width: 100%;
    height: 100%;
    min-height: 870px;
    position: absolute;
    .main {
      width: 1000px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;
      .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 30px;
        color: #fff;
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
        width: 100%;
        ul {
          display: flex;
          li {
            flex: 1;
            margin-right: 40px;
            color: rgba(255, 255, 255, 0.3);
            // position: relative;
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
              // position: absolute;
              // top: 0;
              // left: 0;
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
      .content {
        width: 420px;
        display: flex;
        align-items: center;
        .login {
          width: 420px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          padding: 0 32px 25px 32px;
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
              padding: 0;
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
            }
          }
          .form-list {
            .form-height{
              margin-bottom: 5px;
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
      }
    }
  }
  .back-ground {
    width: 100%;
    height: 100%;
    min-height: 870px;
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
}
</style>
