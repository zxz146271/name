<template>
  <div class="add-order" @click="hideCoupon">
    <!-- <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb> -->
    <div class="process">
      <div class="process-item" :class="{active:active===0}">
        <div class="top">
          <span class="circle succ" v-if="active>0"><i class="el-icon-check"></i></span>
          <span class="circle" v-else>1</span>
          <top-tips :title="processFrist" class="toptips">
          <span slot="edit" v-show="active === 1">
            <el-button type="primary" class="back-edit" circle @click="backEdit(0)">
              <i class="el-icon-edit-outline"></i>
            </el-button>
          </span>
          </top-tips>
        </div>
        <div class="main-pro step1" v-show="active===0">
          <div class="first-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
              <el-form-item label="客户手机号：" prop="customerMobile">
                <el-input v-model="ruleForm.customerMobile" placeholder="请输入手机号"></el-input>
                <span style="color: blue" v-show="flag">新用户</span>
              </el-form-item>
              <!-- <el-form-item label="开单日期" prop="orderDate">
              <el-date-picker
                v-model="ruleForm.orderDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              </el-form-item> -->
            </el-form>
            <div class="next-precess">
              <p>
                <el-button type="primary" @click="nextProcess('ruleForm1')">下一步</el-button>
              </p>
              <p class="title">第一步操作完成后，可激活第二步操作</p>
            </div>
          </div>
        </div>
      </div>
      <div class="process-item" :class="{active:active===1}">
        <div class="top">
          <span class="circle succ" v-if="active>1"><i class="el-icon-check"></i></span>
          <span class="circle" v-else>2</span>
          <top-tips :title="processSec" class="toptips"></top-tips>
        </div>
        <div class="main-pro step2"  v-show="active===1">
          <div class="more-info">
             <div class="info-tips">
              <div class="info-name">客户信息</div>
            </div>
            <el-form  :model="ruleForm" :rules="rules1" ref="ruleForm2" label-width="120px" class="ruleForm">
              <el-row :gutter="24">
                <el-col :span="12" :offset="12">
                    <el-form-item label="客户姓名" prop="customerTrueName">
                      <el-input v-model="ruleForm.customerTrueName" :disabled="this.customerTrueNameDisabled"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
            </el-form>
            <div class="info-tips">
              <div class="info-name">付款信息</div>
            </div>
            <el-form  :model="ruleForm" :rules="rules1" ref="ruleForm3" label-width="120px" class="ruleForm">
              <el-row :gutter="24">
                  <el-col :span="12" :offset="12">
                    <el-form-item label="总金额" prop="totalMoney">
                      <el-input v-model="ruleForm.totalMoney"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :offset="12">
                    <el-form-item label="本次付款金额" prop="accountPaid">
                      <el-input v-model="ruleForm.accountPaid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :offset="12">
                    <el-form-item label="订单图片" prop="picture" class="upload-item label-star">
                      <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: ruleForm.orderId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-success="fileUploadSuccess"
                      :limit='3'
                      :on-exceed="outOfRange"
                      :disabled= "imgShow"
                      :file-list="ruleForm2.fileLists"
                      :before-upload="beforeAvatarUpload"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
            <div class="info-tips">
              <div class="info-name">收货人信息</div>
            </div>
            <el-form :model="ruleForm"  :rules="rules1" ref="ruleForm4" label-width="120px" class="ruleForm">
              <el-row :gutter="24">
                <el-col :span="12" :offset="12">
                  <el-form-item label="收货人" prop="consignee">
                    <el-input v-model="ruleForm.consignee"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="收货人电话" prop="consigneeMobile">
                    <el-input v-model="ruleForm.consigneeMobile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="收货地址" class="upload-item label-star">
                    <el-cascader
                      size="large"
                      :props="newprops"
                      :options="options"
                      v-model="ruleForm.areaSelected">
                    </el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="详细地址" prop="detailAddress">
                    <el-input type="textarea" v-model="ruleForm.detailAddress"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="提货方式" prop="deliveryMode">
                    <el-select v-model="ruleForm.deliveryMode" placeholder="请选择提货方式">
                      <el-option v-for="(item,index) in deliveryModeList" :key="index" :label="item.dname" :value="item.dcode"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="提货日期" prop="reserDate">
                  <el-date-picker
                    v-model="ruleForm.reserDate"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12" :offset="12">
                  <el-form-item label="是否安装" prop="isInstall">
                    <el-radio-group v-model="ruleForm.isInstall">
                      <el-radio value="Y" label="安装"></el-radio>
                      <el-radio value="N" label="不安装"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col> -->
                <el-col :span="12" :offset="12">
                  <el-form-item label="备注" prop="remarks">
                    <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="info-tips">
              <div class="info-name">其他信息</div>
            </div>
            <el-form  :model="ruleForm" :rules="rules1" ref="ruleForm5" label-width="120px" class="ruleForm">
               <el-row :gutter="24">
                <!-- <el-col :span="12" :offset="12">
                  <el-form-item label="门店" prop="storeId">
                    <el-select v-model="ruleForm.storeId" placeholder="请选择门店"  @change="changeStore(ruleForm.storeId)"  >
                      <el-option  multiple='false' v-for="item in storeData" :key="item.storeId" :label="item.storeName" :value="item.storeId"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="开单员" prop="shoppingGuide">
                    <el-select v-model="ruleForm.shoppingGuide" placeholder="请选择导购">
                      <el-option  multiple='false' v-for="item in staffData" :key="item.staffId" :label="item.staffName" :value="item.staffId"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->
                 <el-col :span="12" :offset="12">
                  <el-form-item label="销售凭证号" >
                    <el-input v-model="ruleForm.salesVoucherNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                   <el-form-item label="是否定制" prop="isCustom">
                  <el-radio-group v-model="ruleForm.isCustom" @change="isCustomChange">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12" v-show="customContentShow">
                  <el-form-item label="定制内容" prop="customContent">
                    <el-input v-model="ruleForm.customContent"></el-input>
                  </el-form-item>
                </el-col>
               </el-row>
            </el-form>
            <div class="order-submit">
              <el-button type="primary" @click="submitOrder(['ruleForm5', 'ruleForm4', 'ruleForm3', 'ruleForm2'])" :loading="loading">{{loading? '订单提交中' : '提交订单'}}</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="process-item" :class="{active:active===2}">
        <div class="top">
          <span class="circle succ" v-if="active===2"><i class="el-icon-check"></i></span>
          <span class="circle" v-else>3</span>
          <top-tips :title="processThird" class="toptips"></top-tips>
        </div>
        <div class="main-pro step3"  v-show="active===2">
          <div class="suc-cont">
            <div class="title">
              <i class="iconfont icon-cion_comfirm"></i>订单{{eastOrder.orderNum}}已提交成功
            </div>
            <div class="info-view">
              <ul>
                <li>
                  <label for="">应付款：</label><div>￥{{eastOrder.totalMoney}}</div>
                </li>
                <li>
                  <label for="">本次实际付款：</label><div>￥{{eastOrder.accountPaid}}</div>
                </li>
                <li>
                  <label for="">收货人信息：</label>
                  <div class="user-info">
                    <p>{{eastOrder.consignee}} {{eastOrder.consigneeMobile}}</p>
                    <p>{{eastOrder.districtAdcode}}{{eastOrder.detailAddress}}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="butns">
              <el-button @click="backOrder()" data-code="6030006">返回订单</el-button>
              <el-button @click="editOrder(eastOrder.orderId)" data-code="6030005">修改订单</el-button>
              <el-button @click="showReceipt(eastOrder)" data-code="6030002">收款</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="isShowReceipt"
        width="78%"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">收款</span>
          </div>
          <order-receipt :order="order" @hideDialog='hideDialog' :orderJSON="orderJSON"></order-receipt>
  </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
import orderCoupon from '../../../components/order/orderCoupon'
import orderReceipt from '../../../components/order/easyOrderReceipt'
import { regionData } from 'chinaArea'
import { judgeButton } from '../../../tool/Utils'
export default {
  data () {
    return {
      loading: false,
      imgShow: false,
      // 省市县
      options: regionData,
      // 提货方式
      deliveryModeList: [],
      newprops: {
        value: 'label'
      },
      orderJSON: {
        title: ''
      },
      // 送货时间的禁用选择
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() <= Date.now() - 86400000
        }
      },
      // 定制内容
      customContentShow: false,
      // 客户名称是否修改
      customerTrueNameDisabled: false,
      // areaSelected: [],
      dialogImageUrl: '',
      couponShow: false,
      value1: '',
      isShowReceipt: false,
      ruleForm1: {
        customerMobile: ''
      },
      rules: {
        customerMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
        ]
      },
      ruleForm: {
        totalMoney: '',
        accountPaid: '',
        orderId: '',
        consignee: '',
        consigneeMobile: '',
        districtAdcode: '',
        areaSelected: [],
        detailAddress: '',
        deliveryMode: '',
        reserDate: '',
        remarks: '',
        orderType: 'store',
        salesVoucherNum: '',
        isCustom: '1',
        customContent: '',
        customerTrueName: ''
      },
      eastOrder: {
        orderId: '',
        totalMoney: '',
        nonPayment: '',
        accountPaid: '',
        consignee: '',
        consigneeMobile: '',
        districtAdcode: '',
        detailAddress: '',
        orderNum: ''
      },
      storeData: [],
      staffData: [],
      ruleForm2: {
        name: '',
        type: [],
        fileLists: []
      },
      storevo: {
        state: '0'
      },
      stMemberInfo: {
        memberName: '',
        mobile: '',
        detailAddress: '',
        inviter: ''
      },
      flag: false,
      imgType: false,
      imgSize: false,
      order: {},
      rules1: {
        consignee: [
          { required: true, message: '请输入收货人名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        reserDate: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        // areaSelected: [
        //   { required: true, message: '请选择收货人地址', trigger: 'change' }
        // ],
        consigneeMobile: [
          { required: true, message: '请选择输入电话号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
        ],
        totalMoney: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { min: 0, max: 8, message: '长度在 0 到 8 个字符', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '金额必须为数字且只允许保留两位小数' }
        ],
        accountPaid: [
          { min: 0, max: 8, message: '长度在 0 到 8 个字符', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '金额必须为数字且只允许保留两位小数' }
        ],
        detailAddress: [
          { required: true, message: '请输入收货人详细地址', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        deliveryMode: [
          { required: true, message: '请选择送货方式', trigger: 'change' }
        ],
        // storeId: [
        //   { required: true, message: '请选择购买门店', trigger: 'change' }
        // ],
        // shoppingGuide: [
        //   { required: true, message: '请选择开单人员', trigger: 'change' }
        // ],
        remarks: [
          { min: 0, max: 150, message: '长度在 0 到 150 个字符之间', trigger: 'blur' }
        ],
        isCustom: [
          { required: true, message: '请选择是否定制', trigger: 'blur' }
        ],
        customContent: [
          { required: false, message: '请填写定制内容', trigger: 'blur' },
          { max: 200, message: '长度最大为200个字符', trigger: 'blur' }
        ],
        customerTrueName: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' },
          { max: 10, message: '长度最大为10个字符', trigger: 'blur' }
        ]
      },
      processFrist: {
        title: '第一步：开始订单',
        unfold: false
      },
      processSec: {
        title: '第二步：填写信息，提交',
        unfold: false
      },
      processThird: {
        title: '第三步：提交反馈',
        unfold: false
      },
      active: 0,
      breadcrumbList: [
        {title: '订单', path: '/order/easyOrderManage'},
        {title: '添加新订单', path: ''}
      ]
    }
  },
  mounted () {
    this.getDeliveryModeList()
    this.getStstoreList()
    this.getButton()
  },
  computed: {
    ...mapGetters(['powerButton'])
  },
  watch: {
    'ruleForm.customerMobile' () {
      if (this.ruleForm.customerMobile) {
        if (this.ruleForm.customerMobile.length === 11) {
          this.findMobile(this.ruleForm.customerMobile)
        } else {
          this.flag = false
        }
      }
    }
  },
  methods: {
    // 获取提货方式
    getDeliveryModeList () {
      let params = {
        code: 'deliveryMode'
      }
      this.$api.initselect(params).then(res => {
        if (res.code === 0) {
          this.deliveryModeList = JSON.parse(res.data).details
        }
      })
    },
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    nextProcess (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.active++ > 2) this.active = 0
        } else {
          this.$message.error('请按要求填写页面红色标注必填项')
        }
      })
    },
    findMobile (value) {
      let params = {
        customerMobile: value
      }
      this.ruleForm.areaSelected = []
      this.$api.findMemberMobile(params).then(res => {
        if (res.code === 0) {
          console.log(res.data)
          this.ruleForm.customerTrueName = res.data.memberName
          this.ruleForm.consignee = res.data.memberName
          this.ruleForm.consigneeMobile = res.data.mobile
          if (res.data.memberRegion !== null && res.data.memberRegion !== undefined && res.data.memberRegion !== '[]') {
            this.ruleForm.areaSelected = JSON.parse(res.data.memberRegion)
          }
          if (res.data.detailAddress !== null && res.data.detailAddress !== undefined && res.data.detailAddress !== '') {
            this.ruleForm.detailAddress = res.data.detailAddress
          }
          this.flag = false
          this.customerTrueNameDisabled = true
        } else {
          // console.log(res.data)
          this.ruleForm.customerTrueName = ''
          this.ruleForm.consignee = ''
          this.ruleForm.consigneeMobile = ''
          var arrPic = []
          arrPic.forEach(el => {
            this.ruleForm.areaSelected.push(el)
          })
          this.ruleForm.detailAddress = ''
          this.flag = true
          this.customerTrueNameDisabled = false
        }
      }, err => {
        console.log(err)
      })
    },
    // 是否定制 0定制/1不定制
    isCustomChange (value) {
      if (value === '0') {
        this.customContentShow = true
        this.rules1.customContent[0].required = true
      } else {
        this.customContentShow = false
        this.rules1.customContent[0].required = false
      }
    },
    submitOrder (FromName) {
      let correctList = []
      for (var value of FromName) {
        this.$refs[value].validate((valid) => {
          correctList.push(valid)
        })
      }
      // 判断校验结果中是否存在false值
      if (correctList.indexOf(false) === -1) {
        if (this.ruleForm2.fileLists.length < 1) {
          this.$message.error('请上传至少上传一张订单图片')
          return
        }
        if (this.ruleForm.areaSelected.length < 1) {
          this.$message.error('请选择收货地址')
          return
        }
        this.loading = true

        this.ruleForm.districtAdcode = JSON.stringify(this.ruleForm.areaSelected.slice(0, 3))
        if (this.ruleForm.isCustom === '1') {
          this.ruleForm.customContent = ''
        }
        let params = this.ruleForm
        this.$api.addEasyOrder(params).then(res => {
          if (res.code === 0) {
            this.active = 2
            JSON.parse(res.data.districtAdcode).forEach(el => {
              if (res.data.districtAdcode.indexOf('[') !== -1) {
                res.data.districtAdcode = ''
                res.data.districtAdcode = el
              } else {
                res.data.districtAdcode += el
              }
            })
            this.eastOrder = res.data
            this.eastOrder.nonPayment = this.eastOrder.totalMoney - this.eastOrder.accountPaid
            this.loading = false
          } else {
            // 失败提示
            this.$message.error(res.msg)
            this.loading = false
          }
        })
      } else {
        this.$message.error('请按要求填写页面红色标注必填项')
      }
    },
    backEdit (value) {
      this.active = value
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 获取全路径
    getFullPath (filePath) {
      let params = {
        filePath: filePath
      }
      return this.$api.getFullPath(params)
    },
    getStstoreList () {
      let params = {
        page: 1,
        limit: 0,
        storevo: this.storevo
      }
      this.$api.getStOrderStoreList(params).then(res => {
        this.storeData = res.data
        this.ruleForm.orderId = res.orderId
      })
    },
    changeStore (value) {
      this.getStStaffList(value)
    },
    getStStaffList (value) {
      let params = {
        storeId: value
      }
      this.$api.getStStaffListByStore(params).then(res => {
        this.staffData = res.data
      })
    },
    handleChange (value) {
    },
    useCoupon () {
      this.couponShow = true
    },
    hideCoupon () {
      if (this.couponShow) {
        // this.couponShow = false
      } else {
        // this.couponShow = true
      }
    },
    backOrder () {
      this.$router.push({ path: '/myStore/order/easyOrderManage' })
    },
    editOrder (orderId) {
      this.$router.push({path: '/myStore/order/easyOrderEdit', query: {orderId: orderId}})
    },
    showReceipt (value) {
      this.isShowReceipt = true
      this.order = value
      this.orderJSON.title = '收款'
    },
    handleClose () {
      this.isShowReceipt = false
    },
    hideDialog () {
      this.isShowReceipt = false
      this.$router.push({path: '/myStore/order/easyOrderManage'})
    },
    // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt2M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        type = false
        this.imgType = true
        return type
      }
      if (!isLt2M) {
        this.imgSize = true
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      if (type && isLt2M) {
        this.$message.warning('若要上传多张图片，请在本张图片上传成功之后再上传下一张！')
        this.imgShow = true
      }
      return isLt2M && type
    },
    outOfRange () {
      this.$message.error('上传图片数量限制为3张')
    },
    //  图片文件上传成功后的回调
    fileUploadSuccess (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      this.ruleForm2.fileLists = [...this.ruleForm2.fileLists, ...thisFile] // 数组合并
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
          this.ruleForm2.fileLists.splice(this.ruleForm2.fileLists.findIndex(v => {
            return v.uid === this.deletFile.uid
          }), 1)
          this.deletFile = {}
        } else {
          // 失败提示
          if (this.imgType) {
            res.msg = '上传图片只能是 JPG/PNG/GIF 格式!'
            this.imgType = false
          }
          if (this.imgSize) {
            res.msg = '上传图片大小不能超过 20MB!'
            this.imgSize = false
          }
          this.$message.error(res.msg)
        }
      })
    }
  },
  components: {breadCrumb, topTips, orderCoupon, orderReceipt}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.add-order{
  margin:0 auto;
  padding-top: 106px;
  .process{
    .process-item{
      margin-bottom: 10px;
      .circle{
        &.succ{
          background-color: #737685 !important;
          i{
            color:#fff;
            font-size: 16px;
          }
        }
      }
      &.active{
        .top{
          .circle{
            background-color: $main-color;
            color: #fff;
          }
          .back-edit{
            padding:8px;
            font-size: 16px;
          }
        }
      }
      &:last-child{
        .main-pro{
          &::after{
            display: none;
          }
        }
      }
      .main-pro{
        position: relative;
        &.step1{
          padding: 80px 0 60px 40px;
        }
        &.step2{
          padding: 20px 0 20px 80px;
          .order-submit{
            margin: 10px 0;
            text-align: center;
            button{
              padding: 15px 8px;
              width: 200px;
            }
          }
          .search{
            justify-content: center;
            margin-bottom: 20px;
          }
          .dis-afte{
            .black-color{
              font-weight: bold;
            }
            .change{
              span{
                color:$text-gray-color;
              }
            }
            .red-color{
              color:$main-color;
            }
            .price-op{
              display: flex;
              button{
                padding:3px 8px;
              }
              input[type='text']{
                border:1px solid $input-border-color;
                height:20px;
                border-radius: 4px;
                font-size: $xs-size;
                width:80px;
                padding-left:4px;
                margin-right: 4px;
              }
            }
          }
          .comm-summ{
            display: flex;
            justify-content: flex-end;
            padding-top:10px;
            font-size: $md-size;
            .item{
                padding: 10px 0;
                label{
                  width:100px;
                  text-align:right;
                  display: inline-block;
                  margin-right: 20px;
                }
              }
            .comm-right{
              padding:0 40px;
              // text-align: right;
              border-left:1px solid $border-color;
              position: relative;
              .blue-color{
                color:$blue-color;
              }
              .red-color{
                color:$main-color;
              }
            }
            .comm-left{
              padding:0 40px;
            }
          }
          .info-tips{
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            border-top:6px solid $gray-color;
            .info-name{
              font-size: $xlg-size;
              font-weight: bold;
            }
            button{
              padding: 4px 20px;
              border: 0;
              i{
                margin-right: 4px;
              }
            }
          }
          .img-view{
            width:70px;
            height:70px;
          }
          .comm-name{
            font-size: $md-size;
            font-weight: bold;
          }
          .comm-price{
            font-size: $xs-size;
            font-weight: bold;
          }
          .el-col-offset-12{
            margin-right: 50%;
            margin-left: 0;
          }
        }
        &.step3{
          padding: 40px 0 40px 80px;
          .suc-cont{
            width:470px;
            margin: 0 auto;
            text-align: center;
            .title{
              color:$main-color;
              font-size: 24px;
              padding-left: 40px;
              display: flex;
              justify-items: center;
              align-items: center;
              text-align: center;
             .icon-cion_comfirm{
               font-size: 50px;
               margin-right: 8px;
             }
            }
            .butns{
              margin: 20px 0;
            }
            .info-view{
              ul{
                li{
                  font-size: $md-size;
                  text-align: left;
                  display: flex;
                  margin: 10px 0;
                  label{
                    color:$text-gray-color;
                    width: 100px;
                    text-align: right;
                    display: inline-block;
                  }
                  .user-info{
                    p{
                      margin-bottom: 10px;
                    }
                  }
                }
              }
            }
          }
        }
        &::after{
          content: '';
          position: absolute;
          width:2px;
          height:95%;
          top:5%;
          left: 38px;
          background-color: $border-color;
        }
        .first-form{
          width: 470px;
          margin: 0 auto;
          .next-precess{
            padding-top: 22px;
            p{
              text-align: center;
              button{
                padding: 15px 8px;
                width: 200px;
              }
              &.title{
                font-size: $md-size;
                color:$text-gray-color;
                margin-top: 25px;
              }
            }
          }
        }
      }
      .top{
        display: flex;
        align-items: center;
        .circle{
          display: inline-block;
          width:36px;
          height:36px;
          line-height:36px;
          border-radius: 50%;
          text-align: center;
          background-color: $gray-color;
          color:$text-main-color;
          font-size: $xs-size;
          margin: 0 20px;
        }
        .toptips{
          flex:1;
        }
      }
    }
  }
}
</style>
