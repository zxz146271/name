<template>
  <div class="main-ser">
    <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb>
    <div class="top">
      <span>开票设置</span>
      <el-button class="el-button" @click="serviceHistory">开票历史记录</el-button>
    </div>
    <div class="content">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="纸质发票" name="first"  >
          <div class="form-group">
      <div class="form-block">
        <div class="form-list">
          <el-form :model="StDistributorDataInfo" :rules="rules" ref="StDistributorDataInfo" label-width="120px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="可选订单" prop="serviceName">
                    <el-checkbox-group v-model="invoiceData.serviceList" @change="checkboxChange">
                      <el-checkbox v-for="item in ServiceHistoryByDistributorInfo" :label="item.orderNum" :key="item.orderNum">{{item.serviceName}}</el-checkbox>
                   </el-checkbox-group>
              </el-form-item>
              </el-col>
              <el-col :span="24" v-if="oneCard">
                <el-form-item label="统一社会信用代码" prop="distributorUsci">
                  <el-input disabled="" v-model="StDistributorDataInfo.distributorUsci"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="threeCard">
                <el-form-item label="税务登记证号" prop="taxRegister">
                  <el-input disabled="" v-model="StDistributorDataInfo.taxRegister"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="公司名称" prop="distributorName">
                  <el-input disabled="" v-model="StDistributorDataInfo.distributorName"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="24">
                <el-form-item label="地址" prop="detailAddress">
                  <el-input disabled="" v-model="StDistributorDataInfo.detailAddress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="发票类型" prop="isVat">
                   <!-- <el-radio label="common">普通发票</el-radio>
                    <el-radio  label="added">增值税发票</el-radio> -->
                      <el-radio v-model="invoiceData.isVat" label="common">普通发票</el-radio>
                      <el-radio v-model="invoiceData.isVat" label="added">增值税发票</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="邮箱" prop="eMail">
                  <el-input disabled="" v-model="StDistributorDataInfo.eMail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="opeartion">
        <div>
          <el-button class="submit_add" @click="cancel">
            取消
          </el-button>
          <el-button class="submit" @click="addInvoiceData(['StDistributorDataInfo'])">
            提交
          </el-button>
        </div>
      </div>
    </div>
        </el-tab-pane>
        <!-- <el-tab-pane disabled="" label="电子发票" name="second">配置管理</el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
export default{
  data () {
    return {
      activeName2: 'first',
      breadcrumbList: [
        {title: '服务购买', path: '/service'},
        {title: '开据发票', path: ''}
      ],
      invoiceData: {
        // 是否为增值税发票
        isVat: 'common',
        // 发票类型(纸/电子)
        invoiceType: 'paper',
        // 关联服务列表
        serviceList: []
      },
      rules: {
        distributorUsci: [
          { required: false, message: '您的社会统一信用代码信息不全,请联系平台处理', trigger: 'change' }
        ],
        taxRegister: [
          { required: false, message: '您的税务登记账号信息不全,请联系平台处理', trigger: 'change' }
        ],
        distributorName: [
          { required: true, message: '您的公司名称暂无,请联系平台处理', trigger: 'change' }
        ],
        detailAddress: [
          { required: true, message: '您的公司地址暂无,请联系平台处理', trigger: 'change' }
        ],
        serviceName: [
          { required: false, message: '请选择服务', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        isVat: [
          { required: false, message: '请选择发票类型', trigger: 'blur' }
        ]
      },
      // 获取当前经销商信息
      StDistributorDataInfo: {},
      // 获取当前经销商所购买的服务列表
      StServiceGetHistory: {},
      // 所有订单信息
      ServiceHistoryByDistributorInfo: [],
      oneCard: false,
      threeCard: false
    }
  },
  mounted () {
    // 获取经销商初始数据
    this.getDistributorDataInfo()
    // 获取所有订单信息
    this.getServiceHistoryByDistributorId()
  },
  methods: {
    getDistributorDataInfo () {
      this.$api.getDistributorDataInfo().then(res => {
        if (res.code === 0) {
          this.StDistributorDataInfo = res.data
          // 解析地址
          let address = ''
          JSON.parse(res.data.adcode).forEach(element => {
            address += element
          })
          this.StDistributorDataInfo.detailAddress = address + res.data.detailAddress
          // 判断显示一证还是三证
          if (this.StDistributorDataInfo.authType !== null) {
            // 一证
            if (this.StDistributorDataInfo.authType === '2') {
              this.rules.distributorUsci[0].required = true
              this.rules.taxRegister[0].required = false
              this.oneCard = true
            } else if (this.StDistributorDataInfo.authType === '1') {
              this.rules.taxRegister[0].required = true
              this.rules.distributorUsci[0].required = false
              this.threeCard = true
            } else {
              this.oneCard = true
            }
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    }, // 加载方法
    getServiceHistoryByDistributorId (index) {
      let params = {
        hasInvoice: 0
      }
      this.$api.getServiceHistoryByDistributorId(params).then(res => {
        if (res.code === 0) {
          this.ServiceHistoryByDistributorInfo = res.data
          this.ServiceHistoryByDistributorInfo.forEach(element => {
            element.serviceName = element.orderNum + '  ' + element.serviceName
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleClick (tab, event) {
    },
    cancel () {
      this.$router.push({ path: '/service/serviceDetail' })
    },
    // 复选框操作
    checkboxChange (value) {
      this.invoiceData.serviceList = value
    },
    // 新增发票信息
    addInvoiceData (formName) {
      // 保存表单校验结果
      var _this = this
      let correctList = []
      for (var value of formName) {
        _this.$refs[value].validate((valid) => {
          correctList.push(valid)
        })
      }
      // 判断校验结果中是否存在false值
      if (correctList.indexOf(false) === -1) {
        // 将页面对象赋予参数传递给后台
        let params = {
          // 是否为增值发票
          isVat: this.invoiceData.isVat,
          // 发票类型 (纸/电子)
          invoiceType: this.invoiceData.invoiceType,
          // 服务列表
          serviceList: this.invoiceData.serviceList
        }
        if (params.serviceList.length === 0) {
          this.$message.error('请至少选择一个订单开票')
          return false
        }
        this.$api.addInvoiceData(params).then(res => {
          if (res.code === 0) {
          // 成功返回列表页面
            this.$router.push({path: '/service/serviceDetail'})
            this.$message.success(res.msg)
          } else {
            // 失败提示
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.error('请按要求填写页面红色标注必填项')
      }
    },
    serviceHistory () {
      this.$router.push({path: '/service/invoiceHistory'})
    }
  },
  components: {breadCrumb}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.main-ser{
  min-height: 100%;
}
.top{
  background-color: $gray-color;
  font-size: $xlg-size;
  margin-top: 20px;
  height: 44px;
  padding: 11px 16px;
  display: flex;
  justify-content: space-between;
  >button{
    padding: 5px 12px;
    color: #fff;
    font-size: $xs-size;
    background: $blue-color;
    border: none;
    &:hover{
      color: #fff;
      background: $blue-color;
    }
  }
}
.content{
  border:1px solid $border-color;
  padding: 12px 0 40px 0;
  .form-list{
    margin-top:35px;
    padding: 0 291px;
    display: flex;
    justify-content: center;
    .form-title{
      width: 200px;
      position:absolute;
      color: $text-adorn-color;
      font-size: $xs-size;
      right: -200px;
      top: 0;
      padding-left:20px;
    }
    .upload-item{
      .el-form-item__content{
        line-height: 34px;
      }
    }
  }
  .opeartion{
    display: flex;
    justify-content: center;
    margin: 85px 0 50px 0;
    button{
      padding:15px 57px;
    }
    .submit{
      @include linear-grad;
      color:#fff;
      padding:16px 87px;
      border:0;
      &:hover{
        opacity: 0.9;
      }
    }
  }
}
</style>
