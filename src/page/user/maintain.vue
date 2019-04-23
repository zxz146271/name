<template>
  <div class="main">
    <div class="order">
      <div class="main-cont">
        <div class="info-content">
          <div class="title">基本信息</div>
          <el-form label-position="right" label-width="100px" class="base-form" :model="Distributor" :rules="rules" ref="Distributor1">
            <el-form-item label="经销商类型" prop="state">
              <el-radio-group  @change="isCompany" v-model="Distributor.distributorType" disabled>
                <el-radio label="company">企业</el-radio>
                <el-radio label="personal">个人</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="经销商帐号" prop="mobile">
               <el-input v-model="Distributor.mobile" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="企业名称" prop="distributorName">
                <el-input v-model="Distributor.distributorName"></el-input>
            </el-form-item>
            <el-form-item label="主营类目" prop="mobile">
              <el-cascader
                size="large"
                placeholder='未选择经营类目'
                :options='mainOptions'
                filterable
                separator=">"
                :props="cascaderConfig"
                v-model='ruleForm.mainSelected'
              ></el-cascader>
            </el-form-item>
            <el-form-item label="门店数" prop="storeNumber">
                <el-input v-model="Distributor.storeNumber"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="eMail">
                <el-input v-model="Distributor.eMail"></el-input>
            </el-form-item>
            <el-form-item label="所在地区" prop="areaSelected">
               <el-cascader
                  size="large"
                  :props="newprops"
                  :options="options"
                  v-model="ruleForm.areaSelected">
               </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="detailAddress">
              <el-input type="textarea" v-model="Distributor.detailAddress"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="info-content">
          <div class="title">法人及证照信息</div>
          <div class="review">
            <div class="status" v-if="Distributor.reviewState === '3'"><span>待审核</span></div>
            <div class="status status-ing" v-if="Distributor.reviewState === '2'"><span>审核中</span></div>
            <div class="status status-no" v-if="Distributor.reviewState === '1'"><span>审核未通过</span></div>
            <div class="status status-pass" v-if="Distributor.reviewState === '0'"><span>审核通过</span></div>
          </div>
          <p class="title-msg">为保证申请能够顺利通过，请如实填写以下信息</p>
          <el-form label-position="right" label-width="180px" class="staff-info" :disabled="Distributor.reviewState === '0' && Distributor.isYunMember === '1'" v-if="showCompany" :model="Distributor" :rules="rules" ref="Distributor">
            <el-form-item label="法人姓名" prop="legalRepresentative">
              <el-input v-model="Distributor.legalRepresentative"></el-input>
            </el-form-item>
            <el-form-item label="法人手机号码"  prop="legalPhone">
             <el-input v-model="Distributor.legalPhone"></el-input>
            </el-form-item>
            <el-form-item label="法人身份证号码"  prop="legalRepresentativeNo">
             <el-input v-model="Distributor.legalRepresentativeNo"></el-input>
            </el-form-item>
            <el-form-item label="对公账户银行" prop="parentBankName"  class="upload-item label-star">
              <el-input :placeholder="bankplace"  v-model="Distributor.parentBankName" :disabled="bankType" >
                <el-select v-model="itemBankName" slot="prepend" placeholder="请选择" @change="selectChange" >
                  <el-option v-for="item in banklist" :key="item.value" :label="item.label" :value="item"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
             <el-form-item label="支行名称" v-if="!bankType" prop="bankName">
                <el-input v-model="Distributor.bankName" placeholder="例如：春申路支行"></el-input>
            </el-form-item>
            <el-form-item label="支付行号" v-if="!bankType" prop="unionBank">
                <el-input v-model="Distributor.unionBank"></el-input>
            </el-form-item>
            <el-form-item label="开户行所在省/市" v-if="!bankType"  class="upload-item label-star">
              <el-cascader
                size="large"
                  :props="newprops"
                  :options="options2"
                  v-model="ruleForm.despositBankAdcode">
              </el-cascader>
            </el-form-item>
            <el-form-item label="企业对公账户" prop="accountNo">
             <el-input v-model="Distributor.accountNo"></el-input>
            </el-form-item>
            <el-form-item label="认证类型"  prop="authType">
              <el-radio-group  @change="isOneCard" v-model="Distributor.authType">
                <el-radio label="2">一证</el-radio>
                <el-radio label="1">三证</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="统一社会信用代码" v-if="showOneCard" prop="distributorUsci">
              <el-input v-model="Distributor.distributorUsci"></el-input>
            </el-form-item>
            <el-form-item label="营业执照号" v-if="!showOneCard" prop="businessLicense">
              <el-input v-model="Distributor.businessLicense"></el-input>
            </el-form-item>
            <el-form-item label="组织机构代码" v-if="!showOneCard" prop="organizationCode">
              <el-input v-model="Distributor.organizationCode"></el-input>
            </el-form-item>
            <el-form-item label="税务登记证号" v-if="!showOneCard" prop="taxRegister">
              <el-input v-model="Distributor.taxRegister"></el-input>
            </el-form-item>
            <el-form-item label="营业执照" prop="name" class="upload-item label-star">
              <el-upload
                :action="$config().uploadUrl"
                :data="{bid: Distributor.distributorId}"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="fileUploadSuccess"
                :file-list="ruleForm.fileLists"
                :before-upload="beforeAvatarUpload"
                :limit= 1
                :disabled= "imgShow"
                :on-exceed="moreThanLimit"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="法人身份证正反面照片" prop="name" class="upload-item label-star"  :rules="rules" ref="Distributor">
              <el-upload
                :action="$config().uploadUrl"
                :data="{bid: Distributor.idCradUrlId}"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview2"
                :on-success="fileUploadSuccess2"
                :file-list="ruleForm.fileLists2"
                :before-upload="beforeAvatarUpload"
                :limit= 2
                :disabled= "imgShow"
                :on-exceed="moreThanLimit2"
                :on-remove="handleRemove2">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible2">
                <img width="100%" :src="dialogImageUrl2" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="开户许可证" prop="name" class="upload-item label-star">
              <el-upload
                :action="$config().uploadUrl"
                :data="{bid: Distributor.permitUrlId}"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview3"
                :on-success="fileUploadSuccess3"
                :file-list="ruleForm.fileLists3"
                :before-upload="beforeAvatarUpload"
                :limit= 1
                :disabled= "imgShow"
                :on-exceed="moreThanLimit3"
                :on-remove="handleRemove3">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible3">
                <img width="100%" :src="dialogImageUrl3" alt="">
              </el-dialog>
            </el-form-item>
          </el-form>
          <el-form label-position="right" label-width="150px" class="staff-info" :disabled="Distributor.reviewState === '0' && Distributor.isYunMember === '1'" :model="Distributor" :rules="rules" ref="Distributor" v-else>
            <el-form-item label="法人姓名" prop="legalRepresentative">
              <el-input v-model="Distributor.legalRepresentative"></el-input>
            </el-form-item>
            <!-- <el-form-item label="法人手机号码" prop="legalPhone">
              <el-input v-model="Distributor.legalPhone"></el-input>
            </el-form-item> -->
            <el-form-item label="法人身份证号码" prop="legalRepresentativeNo">
               <el-input v-model="Distributor.legalRepresentativeNo"></el-input>
            </el-form-item>
            <el-form-item label="法人身份证正反面照片" prop="name" class="upload-item label-star">
              <el-upload
                :action="$config().uploadUrl"
                :data="{bid: Distributor.idCradUrlId}"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview2"
                :on-success="fileUploadSuccess2"
                :file-list="ruleForm.fileLists2"
                :before-upload="beforeAvatarUpload"
                :limit= 2
                :disabled= "imgShow"
                :on-exceed="moreThanLimit2"
                :on-remove="handleRemove2">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible2">
                <img width="100%" :src="dialogImageUrl2" alt="">
              </el-dialog>
            </el-form-item>
          </el-form>
        </div>
        <div class="info-content">
          <div class="title">在线支付</div>
          <div class="review">
            <div class="status" v-if="!Distributor.contractNo"><span>未签约</span></div>
            <div class="status status-pass" v-if="Distributor.contractNo"><span>已签约</span></div>
          </div>
          <div class="sign">
            <p v-show="contractNoFlag"><a :href="contractNoUrl" class="menber" target="view_window">签约《会员电子协议》</a></p>
            <p v-show="!contractNoFlag" @click="contractNoClick"  class="menber"><font >签约《会员电子协议》</font></p>
            <p>法人及证照信息审核通过后，即可签约“会员电子协议”</p>
            <p>资料提交审核通过后，即可点击《会员电子协议》进行签约</p>
            <p>签约后，您的店铺可以进行在线交易，但每笔交易会收取0.6%的手续费</p>
          </div>
        </div>
        <div class="opeartion" v-if="Distributor.registerType == 'distributor_mdzc'">
          <el-alert
             v-show="Distributor.reviewState === '1' && Distributor.remark"
            :title="Distributor.remark"
            type="error"
            center
            show-icon class="alert-tpl">
          </el-alert>
          <div>
              <el-button class="submit_add" @click="submit('Distributor', 'Distributor1','false')" :loading="loading1" v-if="Distributor.reviewState === '0' && this.Distributor.isYunMember === '1'">
                {{loading1? '保存中':'保存'}}
              </el-button>
              <el-button class="submit" @click="submit('Distributor', 'Distributor1','true')" :loading="loading2"  v-else>
                {{loading2? '提交中':'提交审核'}}
              </el-button>
          </div>
          <div class="bottom-msg" v-if="showBottom">
            <p>致亲爱的用户！</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您好，因平台升级，接入了在线支付功能，为了更好的保护您的账号安全，以及验证您账号的真实性及有效性，避免在交易过程中产生纠纷，所以请您补充完善法人及证照信息，并提交审核，审核通过后即可签约《会员电子协议》开通在线支付，谢谢！</p>
            <div class="close"><span @click="closeBottom">关闭</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import topTips from '../../components/public/topTips'
import { regionData } from 'chinaArea'
import {provinceAndCityData} from 'chinaCity'
export default {
  data () {
    return {
      bankplace: '请输入内容',
      itemBankName: '',
      showBottom: false,
      bankType: true,
      showCompany: true,
      showOneCard: true,
      banklist: [
        {
          value: '工商银行',
          label: '工商银行',
          disable: true
        },
        {
          value: '建设银行',
          label: '建设银行',
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
          value: '兴业银行',
          label: '兴业银行',
          disable: true
        },
        {
          value: '华夏银行',
          label: '华夏银行',
          disable: true
        },
        {
          value: '',
          label: '其他',
          disable: false
        }
      ],
      loading1: false,
      loading2: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      contractNoFlag: false,
      dialogImageUrl: '',
      dialogImageUrl2: '',
      dialogImageUrl3: '',
      necessary: {
        title: '经销商维护信息',
        unfold: false
      },
      // 省市区
      options: regionData,
      options2: provinceAndCityData,
      // 经营类目
      mainOptions: [],
      temp: '',
      newprops: {
        value: 'label'
      },
      cascaderConfig: {
        label: 'label',
        value: 'id',
        children: 'children'
      },
      imgType: false,
      imgSize: false,
      ruleForm: {
        fileLists: [],
        fileLists2: [],
        fileLists3: [],
        mainSelected: [],
        areaSelected: [],
        despositBankAdcode: []
      },
      Distributor: {
        parentBankName: '',
        authType: '2',
        distributorType: 'company',
        distributorName: '',
        depositBank: '',
        areaSelected: [],
        mainSelected: [],
        despositBankAdcode: [],
        idCradUrlId: '',
        permitUrlId: '',
        distributorUsci: ''

      },
      StoreStaff: {},
      contractNoUrl: '',
      deletFile: {},
      deletFile2: {},
      deletFile3: {},
      imgShow: false,
      isLt2M: false,
      isJPG: false,
      rules: {
        distributorName: [
          { required: true, message: '请输入经销商名称', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
        distributorUsci: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
          { min: 9, max: 30, message: '长度在 9 到 30 个字符', trigger: 'blur' }
        ],
        businessLicense: [
          { required: true, message: '请输入营业执照号', trigger: 'blur' },
          { min: 9, max: 30, message: '长度在 9 到 30 个字符', trigger: 'blur' }
        ],
        organizationCode: [
          { required: true, message: '请输入组织机构代码 ', trigger: 'blur' },
          { min: 9, max: 30, message: '长度在 9 到 30 个字符', trigger: 'blur' }
        ],
        authType: [
          { required: true, message: '请选择认证类型', trigger: 'blur' }
        ],
        accountNo: [
          { required: true, message: '请输入对公账户银行', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '请输入支行名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        unionBank: [
          { required: true, message: '请输入支行行号', trigger: 'blur' },
          { pattern: /^\d{12}$/, message: '支行行号必须为数字且必须为12位', trigger: 'blur' }
        ],
        // despositBankAdcode: [
        //   { required: true, message: '请选择支行所在省市', trigger: 'blur' }
        // ],
        // parentBankName: [
        //   { required: true, message: '请选择银行名称', trigger: 'change' }
        // ],
        taxRegister: [
          { required: true, message: '请输入税务登记证', trigger: 'blur' },
          { min: 9, max: 30, message: '长度在 9 到 30 个字符', trigger: 'blur' }
        ],
        legalRepresentative: [
          { required: true, message: '请输入法定代表人', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        legalPhone: [
          { required: true, message: '请输入法定手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
        ],
        legalRepresentativeNo: [
          { required: true, message: '请输入法人身份证号', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '目前只支持中国居民身份证', trigger: 'blur' }
        ],
        detailAddress: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        storeNumber: [
          { required: true, message: '请输入门店数', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '门店数必须为数字' }
        ],
        eMail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message: '请输入正确邮箱格式' }
        ]
      }
    }
  },
  // 数据初始化方法
  mounted () {
    this.getstaff()
    this.getPfBaseMainCategoryList()
  },
  methods: {
    closeBottom () {
      this.showBottom = false
    },
    // 切换企业个人
    isCompany (value) {
      if (value === 'company') {
        this.showCompany = true
      } else {
        this.showCompany = false
      }
    },
    contractNoClick () {
      if (this.Distributor.isYunMember === '0' && this.Distributor.reviewState === '0') {
        this.showBottom = true
      }
      if (this.Distributor.registerType === 'distributor_mdzc') {
        if (this.Distributor.reviewState === '3') {
          this.$message.error('请完善法人及证照信息，并提交审核通过后，才能签约会员电子协议')
        } else if (this.Distributor.reviewState === '2') {
          this.$message.error('您的资料正在审核，审核通过后可签约协议')
        } else if (this.Distributor.reviewState === '1') {
          this.$message.error('您的资料审核未通过，请修改法人及证照信息后，重新提交审核')
        }
      }
      if (this.Distributor.contractNo) {
        this.$message.error('您已经完成签约,请勿重复签约')
      }
    },
    isOneCard (value) {
      if (value === '1') {
        this.showOneCard = false
        this.Distributor.distributorUsci = ''
      } else {
        this.showOneCard = true
        this.Distributor.businessLicense = ''
        this.Distributor.organizationCode = ''
        this.Distributor.taxRegister = ''
      }
    },
    // 获取签约电子会员协议
    getcontractNoUrl () {
      let params = {
        distributorType: this.Distributor.distributorType
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
    // 切换银行
    selectChange (item) {
      this.itemBankName = item.label
      this.Distributor.parentBankName = item.value
      this.bankType = item.disable
      if (this.bankType) {
        this.Distributor.unionBank = ''
        this.Distributor.bankName = ''
        this.ruleForm.despositBankAdcode = []
      } else {
        this.bankplace = '例如：上海银行'
      }
    },
    // 获取经营类目列表
    getPfBaseMainCategoryList () {
      let params = {}
      this.$api.getPfBaseMainCategoryList(params).then(res => {
        this.mainOptions = res.data
      })
    },
    moreThanLimit () {
      this.$message.error('营业执照图片上传数量限制为1张')
    },
    moreThanLimit3 () {
      this.$message.error('开户许可证图片上传数量限制为1张')
    },
    moreThanLimit2 () {
      this.$message.error('身份证正反面照片上传数量限制为2张')
    },
    // 获取登录用户
    getstaff () {
      let params = {}
      this.$api.getstaff(params).then(res => {
        if (res.code === 0) {
          this.StoreStaff = res.data
          let params1 = {
            distributorId: this.StoreStaff.distributorId
          }
          this.$api.getStoreDistributor(params1).then(res => {
            if (res.code === 0) {
              this.Distributor = res.data
              this.Distributor.idCradUrlId = res.data.distributorId.substring(0, 26) + 'IdCard'
              this.Distributor.permitUrlId = res.data.distributorId.substring(0, 26) + 'Permit'
              if (this.Distributor.mainCategory) {
                let params2 = {
                  categoryId: this.Distributor.mainCategory
                }
                // 根据经营类目id获取所有父节点经营类目
                this.$api.getParentCategoryList(params2).then(res => {
                  if (res.code === 0) {
                    this.ruleForm.mainSelected = res.data
                  }
                })
              }
              if (this.Distributor.storeNumber === 0) {
                this.Distributor.storeNumber = ''
              }
              console.log(this.Distributor.distributorType)
              if (this.Distributor.distributorType === 'personal') {
                this.showCompany = false
              } else {
                this.showCompany = true
                // 判断为一证 三证
                if (this.Distributor.authType === '1') {
                  this.showOneCard = false
                } else {
                  this.showOneCard = true
                }
                // 判断选择的银行
                if (this.Distributor.parentBankName === '工商银行' || this.Distributor.parentBankName === '建设银行' || this.Distributor.parentBankName === '招商银行' || this.Distributor.parentBankName === '平安银行' || this.Distributor.parentBankName === '兴业银行' || this.Distributor.parentBankName === '华夏银行') {
                  this.itemBankName = this.Distributor.parentBankName
                  this.bankType = true
                } else {
                  if (this.Distributor.parentBankName) {
                    this.itemBankName = '其他'
                    this.bankType = false
                  } else {
                    this.itemBankName = '-请选择-'
                    this.bankType = true
                  }
                }
                if (this.Distributor.bankName === 'NaN') {
                  this.Distributor.bankName = false
                }
                if (this.Distributor.bankName) {
                  this.Distributor.bankName = this.Distributor.bankName.substring(this.Distributor.parentBankName.length, this.Distributor.bankName.length)
                }
              }
              // 判断是否可以修改经销商照片
              if (this.Distributor.reviewState === '2') {
                this.imgShow = true
              }
              if (this.Distributor.reviewState === '3' || this.Distributor.reviewState === '1' || this.Distributor.reviewState === '0') {
                this.imgShow = false
              }
              // 判断是否生成的电子签约路径
              if (this.Distributor.reviewState === '0' && !this.Distributor.contractNo && this.Distributor.isYunMember === '1') {
                this.getcontractNoUrl()
              } else {
                this.contractNoFlag = false
              }
              if (this.Distributor.adcode) {
                let areaSelectedTemp = []
                areaSelectedTemp = JSON.parse(this.Distributor.adcode)
                areaSelectedTemp.forEach(item => {
                  this.ruleForm.areaSelected.push(item)
                })
              }
              if (this.Distributor.bankCityNo) {
                let despositBankAdcodeTemp = []
                despositBankAdcodeTemp = JSON.parse(this.Distributor.bankCityNo)
                despositBankAdcodeTemp.forEach(item => {
                  this.ruleForm.despositBankAdcode.push(item)
                })
              }
              if (this.Distributor.distributorUrl.length > 0) {
                let item = {}
                // let tempFullUrl = ''
                this.Distributor.distributorUrl.forEach(el => {
                  // let param = {
                  //   filePath: el.filePath
                  // }
                  // // 获取文件全路径
                  // this.$api.getFullPath(param).then(res => {
                  //   tempFullUrl = res.data
                  item = {
                    url: el.filePath,
                    name: el.filename,
                    enclosureId: el.enclosureId
                  }
                  this.ruleForm.fileLists.push(item)
                  // })
                })
              }
              // 开户许可证
              if (this.Distributor.bankSettlementUrl.length > 0) {
                let item = {}
                // let tempFullUrl = ''
                this.ruleForm.fileLists3 = []
                this.Distributor.bankSettlementUrl.forEach(el => {
                  // let param = {
                  //   filePath: el.filePath
                  // }
                  // // 获取文件全路径
                  // this.$api.getFullPath(param).then(res => {
                  //   tempFullUrl = res.data
                  item = {
                    url: el.filePath,
                    name: el.filename,
                    enclosureId: el.enclosureId
                  }
                  this.ruleForm.fileLists3.push(item)
                  // })
                })
              }
              // 经销商身份证照
              if (this.Distributor.distributorIdCardUrl.length > 0) {
                let item = {}
                // let tempFullUrl = ''
                this.Distributor.distributorIdCardUrl.forEach(el => {
                  // let param = {
                  //   filePath: el.filePath
                  // }
                  // // 获取文件全路径
                  // this.$api.getFullPath(param).then(res => {
                  //   tempFullUrl = res.data
                  item = {
                    url: el.filePath,
                    name: el.filename,
                    enclosureId: el.enclosureId
                  }
                  this.ruleForm.fileLists2.push(item)
                  // })
                })
                if (this.Distributor.storeNumber === 0 || this.Distributor.storeNumber === null) {
                  this.Distributor.storeNumber = ''
                }
              }
            } else {
              this.$message.error('获取信息失败')
            }
          })
        }
      })
    },
    // 提交
    submit (formName, formName2, verifyingSTR) {
      console.log(this.Distributor)
      this.$refs[formName2].validate((valid) => {
        if (valid) {
          if (this.ruleForm.mainSelected.length < 1) {
            this.$message.error('请选择经营类目')
            return
          }
          if (this.ruleForm.areaSelected.length < 1) {
            this.$message.error('请选择所在区域')
            return
          }
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // 将页面对象赋予参数传递给后台
              if (this.showCompany) {
                if (!this.Distributor.parentBankName) {
                  this.$message.error('请选择对公账户银行')
                  return
                }
              }
              if (this.showCompany && !this.bankType) {
                if (this.ruleForm.despositBankAdcode.length < 1) {
                  this.$message.error('开户行所在省/市')
                  return
                }
              }
              if (this.ruleForm.fileLists2.length < 2) {
                this.$message.error('请上传身份证正反面照片张')
                return
              }
              if (this.showCompany) {
                if (!this.ruleForm.fileLists.length > 0) {
                  this.$message.error('请上传一张营业执照')
                  return
                }
                if (!this.ruleForm.fileLists3.length > 0) {
                  this.$message.error('请上传一张许可证')
                  return
                }
              }
              let main = []
              main = this.ruleForm.mainSelected[this.ruleForm.mainSelected.length - 1]
              // 转化省市区类型
              let area = []
              area = this.ruleForm.areaSelected.slice(0, 3)
              this.Distributor.adcode = JSON.stringify(area)
              if (this.ruleForm.despositBankAdcode) {
                let bankarea = []
                bankarea = this.ruleForm.despositBankAdcode.slice(0, 3)
                this.Distributor.despositBankAdcode = JSON.stringify(bankarea)
              }
              if (this.Distributor.bankName) {
                this.Distributor.bankName = this.Distributor.parentBankName + this.Distributor.bankName
              }
              let params = {}
              if (this.showCompany) {
                params = {
                  mobile: this.Distributor.mobile,
                  distributorId: this.Distributor.distributorId, // 经销商id
                  distributorName: this.Distributor.distributorName, // 经销商名称
                  mainCategory: main, // 经销商经营类目
                  storeNumber: this.Distributor.storeNumber, // 经销商门店数
                  eMail: this.Distributor.eMail, // 经销商邮箱
                  adcode: this.Distributor.adcode, // 经销商省市县区
                  detailAddress: this.Distributor.detailAddress, // 经销商详细地址
                  legalRepresentative: this.Distributor.legalRepresentative, // 法人姓名
                  legalRepresentativeNo: this.Distributor.legalRepresentativeNo, // 法人身份证号
                  legalPhone: this.Distributor.legalPhone, // 法人手机号
                  parentBankName: this.Distributor.parentBankName, // 对公银行名称
                  bankName: this.Distributor.bankName, // 支行名称
                  unionBank: this.Distributor.unionBank, // 支付行号
                  despositBankAdcode: this.Distributor.despositBankAdcode, // 支付行所在省/市
                  accountNo: this.Distributor.accountNo, // 企业对公账户
                  authType: this.Distributor.authType, // 认证类型
                  distributorUsci: this.Distributor.distributorUsci, // 社会统一信用代码
                  businessLicense: this.Distributor.businessLicense, // 营业执照号
                  organizationCode: this.Distributor.organizationCode, // 组织机构代码
                  taxRegister: this.Distributor.taxRegister, // 事务登记证
                  verifyingSTR: verifyingSTR
                }
              } else {
                params = {
                  mobile: this.Distributor.mobile,
                  distributorId: this.Distributor.distributorId, // 经销商id
                  distributorName: this.Distributor.distributorName, // 经销商名称
                  mainCategory: main, // 经销商经营类目
                  storeNumber: this.Distributor.storeNumber, // 经销商门店数
                  eMail: this.Distributor.eMail, // 经销商邮箱
                  adcode: this.Distributor.adcode, // 经销商省市县区
                  detailAddress: this.Distributor.detailAddress, // 经销商详细地址
                  legalRepresentative: this.Distributor.legalRepresentative, // 法人姓名
                  legalRepresentativeNo: this.Distributor.legalRepresentativeNo, // 法人身份证号
                  // legalPhone: this.Distributor.legalPhone, // 法人手机号
                  verifyingSTR: verifyingSTR
                }
              }
              if (verifyingSTR === 'true') {
                this.loading2 = true
              } else {
                this.loading1 = true
              }
              this.$api.modifyDistributor(params).then(res => {
                if (res.code === 0) {
                  this.$message.success(res.msg)
                  this.getstaff()
                  this.ruleForm.fileLists = []
                  this.ruleForm.fileLists2 = []
                  this.getPfBaseMainCategoryList()
                } else {
                  this.$message.error(res.msg)
                }
                this.loading1 = false
                this.loading2 = false
              })
            } else {
              this.$message.error('请按要求填写页面红色标注必填项')
            }
          })
        } else {
          this.$message.error('请按要求填写页面红色标注必填项')
        }
      })
    },
    // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      this.isLt2M = file.size / 1024 / 1024 < 20
      this.isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!this.isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        type = false
        this.imgType = true
        return type
      }
      if (!this.isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
        this.imgSize = true
      }
      if (type && this.isLt2M) {
        this.$message.warning('若要上传多张图片，请在本张图片上传成功之后再上传下一张！')
        this.imgShow = true
      }
      return this.isLt2M && type
    },
    //  文件上传成功后的回调
    fileUploadSuccess (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      // this.ruleForm.fileLists 图片列表
      this.ruleForm.fileLists = [...this.ruleForm.fileLists, ...thisFile] // 数组合并
      this.imgShow = false
    },
    //  文件上传成功后的回调
    fileUploadSuccess2 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      // this.ruleForm.fileLists 图片列表
      this.ruleForm.fileLists2 = [...this.ruleForm.fileLists2, ...thisFile] // 数组合并
      this.imgShow = false
    },
    //  文件上传成功后的回调
    fileUploadSuccess3 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      // this.ruleForm.fileLists 图片列表
      this.ruleForm.fileLists3 = [...this.ruleForm.fileLists3, ...thisFile] // 数组合并
      this.imgShow = false
    },
    // 删除文件
    handleRemove (file, fileList) {
      let param = {
        id: file.enclosureId
      }
      // 删除文件
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile = file
          this.ruleForm.fileLists.splice(this.ruleForm.fileLists.findIndex(v => {
            return v.uid === this.deletFile.uid
          }), 1)
          this.deletFile = {}
        } else {
          if (this.imgType) {
            this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
            this.imgType = false
          } else if (this.imgSize) {
            this.$message.error('上传图片大小不能超过 20MB!')
            this.imgSize = false
          } else {
            // 失败提示
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 删除文件
    handleRemove2 (file, fileList) {
      let param = {
        id: file.enclosureId
      }
      // 删除文件
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile2 = file
          this.ruleForm.fileLists2.splice(this.ruleForm.fileLists2.findIndex(v => {
            return v.uid === this.deletFile2.uid
          }), 1)
          this.deletFile2 = {}
        } else {
          if (this.imgType) {
            this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
            this.imgType = false
          } else if (this.imgSize) {
            this.$message.error('上传图片大小不能超过 20MB!')
            this.imgSize = false
          } else {
            // 失败提示
            this.$message.error(res.msg)
          }
        }
      })
    },
    handleRemove3 (file, fileList) {
      let param = {
        id: file.enclosureId
      }
      // 删除文件
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile3 = file
          this.ruleForm.fileLists3.splice(this.ruleForm.fileLists3.findIndex(v => {
            return v.uid === this.deletFile3.uid
          }), 1)
          this.deletFile3 = {}
        } else {
          if (this.imgType) {
            this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
            this.imgType = false
          } else if (this.imgSize) {
            this.$message.error('上传图片大小不能超过 20MB!')
            this.imgSize = false
          } else {
            // 失败提示
            this.$message.error(res.msg)
          }
        }
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreview2 (file) {
      this.dialogImageUrl2 = file.url
      this.dialogVisible2 = true
    },
    handlePictureCardPreview3 (file) {
      this.dialogImageUrl3 = file.url
      this.dialogVisible3 = true
    },
    showList (data) {
      if (data) {
        this.thisShow = data
      } else {
        this.thisShow = false
      }
    },
    closeDialog (value) {
      this.importComm = false
      // 选择的商品分类
    }
  },
  components: {topTips}
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/elselect';
.main-cont{
  .info-content{
    border: 1px solid rgba(215, 215, 215, 1);
    margin-bottom: 20px;
    position: relative;
    .title{
      background: rgba(215, 215, 215, 1);
      height: 36px;
      line-height: 36px;
      font-weight: bold;
      padding-left: 30px;
      font-size: 14px;
    }
    .review{
      position: absolute;
      top: 10px;
      right: 10px;
      .status{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 4px solid #797979;
        font-size: 13px;
        color: #333333;
        text-align: center;
        font-weight: 400;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          width: 50px;
        }
      }
      .status-no{
        border-color: #fef0f0;
        color: #f56c6c;
      }
      .status-pass{
        border-color: #f0f9eb;
        color: #67c23a;
      }
      .status-ing{
        border-color: #fdf6ec;
        color: #e6a23c;
      }
    }
    .title-msg{
      text-align: center;
      color: #868686;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
    }
    .base-form{
      width: 500px;
      margin: 0 auto;
      .el-cascader{
        width: 400px;
      }
    }
    .staff-info{
      width: 600px;
      margin: 0 auto;
    }
    .sign{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      p{
        height: 30px;
        line-height: 30px;
        color: #868686;
        font-size: 14px;
        cursor: pointer;
        a{
          text-decoration:underline;
          color: #6699CC;
        }
        font{
          text-decoration:underline;
          color: #6699CC;
        }
      }
    }
  }
  .opeartion{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 30px 0 50px 0;
    .alert-tpl{
      width: 600px;
      margin-bottom: 10px;
    }
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
    .bottom-msg{
      margin-top: 20px;
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
        position: relative;
        margin: 5px 0 20px;
        span{
          position: absolute;
          right: 0;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}
.info-content{
  .el-select{
    width: 120px;
    .el-input .is-disabled .el-input__inner{
      cursor: pointer!important;
    }
  }
}
</style>
