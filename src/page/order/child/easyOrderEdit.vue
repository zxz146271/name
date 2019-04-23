<template>
  <div class="add-order">
    <!-- <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb> -->
    <div class="process">
      <div class="process-item">
        <p class="order-num">
          <span class="num">订单号：<i>{{orderNum}}</i></span>
          <span class="note type1" v-if="state === '1'">待付款</span>
          <span class="note type1" v-else-if="state === '2'">待发货</span>
          <span class="note type3" v-else-if="state === '3'">已发货</span>
          <span class="note type2" v-else-if="state === '4'">已完成</span>
          <span class="note type5" v-else-if="state === '5'">退货中</span>
          <span class="note type4" v-else>已取消</span>
        </p>
        <div class="main-pro step2">
           <div class="more-info">
              <div class="info-tips">
              <div class="info-name">客户信息</div>
            </div>
            <el-form  :model="ruleForm" :rules="rules1" ref="ruleForm" label-width="120px" class="ruleForm">
              <el-row :gutter="24">
                <el-col :span="12" :offset="12">
                    <el-form-item label="客户姓名" prop="customerTrueName">
                      <el-input v-model="ruleForm.customerTrueName" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
            </el-form>
            <div class="info-tips">
              <div class="info-name">付款信息</div>
            </div>
            <el-form  :model="ruleForm" :rules="rules1" ref="ruleForm" label-width="120px" class="ruleForm">
                <el-row :gutter="24">
                  <el-col :span="12" :offset="12">
                    <el-form-item label="总金额" prop="totalMoney">
                      <el-input v-model="ruleForm.totalMoney" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :offset="12">
                    <el-form-item label="付款金额" prop="accountPaid">
                      <el-input v-model="ruleForm.accountPaid" :disabled="true"></el-input>
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
                      :file-list="ruleForm3.fileLists"
                      :before-upload="beforeAvatarUpload"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    </el-form-item>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-col>

                </el-row>
            </el-form>
            <div class="info-tips">
               <div class="info-name">收货人信息</div>
            </div>
            <el-form  :model="ruleForm" :rules="rules1" ref="ruleForm" label-width="120px" class="ruleForm">
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
                <el-col :span="12" :offset="12" >
                  <el-form-item label="收货地址" class="upload-item label-star">
                    <el-cascader
                      size="large"
                      :props="newprops"
                      :options="options"
                      v-model="areaSelected">
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
            <el-form  :model="ruleForm" :rules="rules1" ref="ruleForm" label-width="120px" class="ruleForm">
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
                    <el-select v-model="ruleForm.shoppingGuide" placeholder="请选择导购" >
                      <el-option  multiple='false' v-for="item in staffData" :key="item.staffId" :label="item.staffName" :value="item.staffId"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->
                 <el-col :span="12" :offset="12">
                  <el-form-item label="销售凭证号">
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
              <el-button type="primary" @click="submit('ruleForm')" :loading="loading">{{loading? '订单提交中' : '提交订单'}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
import search from '../../../components/public/search'
import orderCoupon from '../../../components/order/orderCoupon'
import orderReceipt from '../../../components/order/orderReceipt'
import { regionData } from 'chinaArea'
export default {
  data () {
    return {
      loading: false,
      imgShow: false,
      // 省市县
      options: regionData,
      // 提货方式
      deliveryModeList: [],
      dialogImageUrl: '',
      areaSelected: [],
      newprops: {
        value: 'label'
      },
      // 送货时间的禁用选择
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() <= Date.now() - 86400000
        }
      },
      couponShow: false,
      num1: 1,
      value1: '',
      isChangePrice: false,
      dialogVisible: false,
      isChangePercent: false,
      customContentShow: false,
      ruleForm: {
        totalMoney: '',
        accountPaid: '',
        orderId: '',
        consignee: '',
        consigneeMobile: '',
        districtAdcode: '',
        detailAddress: '',
        deliveryMode: '',
        reserDate: '',
        remarks: '',
        storeId: '',
        shoppingGuide: '',
        salesVoucherNum: '',
        isCustom: '',
        customContent: ''
      },
      ruleForm3: {
        name: '',
        type: [],
        fileLists: []
      },
      storevo: {
        state: '0'
      },
      storeData: [],
      staffData: [],
      imgType: false,
      imgSize: false,
      rules1: {
        consignee: [
          { required: true, message: '请输入收货人名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        reserDate: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        consigneeMobile: [
          { required: true, message: '请选择输入电话号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
        ],
        // areaSelected: [
        //   { required: true, message: '请选择收货人地址', trigger: 'change' }
        // ],
        detailAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        deliveryMode: [
          { required: true, message: '请选择送货方式', trigger: 'change' }
        ],
        remarks: [
          { min: 0, max: 150, message: '长度在 0 到 150 个字符之间', trigger: 'blur' }
        ],
        // storeId: [
        //   { required: true, message: '请选择购买门店', trigger: 'change' }
        // ],
        // shoppingGuide: [
        //   { required: true, message: '请选择开单人员', trigger: 'change' }
        // ]
        isCustom: [
          { required: true, message: '请选择是否定制', trigger: 'blur' }
        ],
        customContent: [
          { required: false, message: '请填写定制内容', trigger: 'blur' },
          { max: 200, message: '长度最大为200个字符', trigger: 'blur' }
        ]
      },
      orderNum: '',
      orderId: '',
      state: '',
      active: 0,
      breadcrumbList: [
        { title: '订单', path: '/order/easyOrderManage' },
        { title: '编辑订单', path: '' }
      ]
    }
  },
  created () {
    let body = document.querySelector('body')
    body.addEventListener('click', (e) => {
      if (e.target.id === 'toggler-btn' || e.target.id === 'toggler-icon') {
        this.couponShow = true
      } else {
        this.couponShow = false
      }
    }, false)
  },
  computed: {
    isPay () {
      return this.$route.query.isPay
    }
  },
  mounted () {
    this.getDeliveryModeList()
    this.initData()
    // this.getStstoreList()
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
    backEdit (value) {
      this.active = value
    },
    initData () {
      let params = {
        easyOrderId: this.$route.query.orderId
      }
      this.$api.selectByEasyOrderId(params).then(res => {
        this.areaSelected = JSON.parse(res.data.districtAdcode)
        let item = {}
        // let tempFullUrl = ''
        this.ruleForm = res.data
        this.orderId = res.data.orderId
        this.orderNum = res.data.orderNum
        this.state = res.data.state
        this.ruleForm.isCustom = res.data.isCustom.toString()
        if (this.ruleForm.isCustom === '0') {
          this.customContentShow = true
          this.rules1.customContent[0].required = true
        } else {
          this.customContentShow = false
          this.rules1.customContent[0].required = false
        }
        // this.getStStaffList(res.data.storeId)
        res.data.fileUrl.forEach(el => {
          // let param = {
          //   filePath: el.filePath
          // }
          // // 图片回显
          // this.$api.getFullPath(param).then(res => {
          //   tempFullUrl = res.data
          item = {
            url: el.filePath,
            name: el.filename,
            enclosureId: el.enclosureId
          }
          this.ruleForm3.fileLists.push(item)
          // })
        })
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
    changePrice () {
      this.isChangePrice = true
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
    cancelChangePrice () {
      this.isChangePrice = false
    },
    changePercent () {
      this.isChangePercent = true
    },
    cancelChangePercent () {
      this.isChangePercent = false
    },
    handleChange (value) {
    },
    useCoupon () {
      this.couponShow = true
    },
    submit (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        // 判断校验结果中是否存在false值
        if (valid) {
          if (this.ruleForm3.fileLists.length < 1) {
            this.$message.error('请至少上传一张订单图片')
            return
          }
          this.loading = true
          let area = []
          area = this.areaSelected.slice(0, 3)
          this.ruleForm.districtAdcode = JSON.stringify(area)
          let params = {
            orderId: this.orderId,
            consignee: this.ruleForm.consignee,
            consigneeMobile: this.ruleForm.consigneeMobile,
            districtAdcode: this.ruleForm.districtAdcode,
            detailAddress: this.ruleForm.detailAddress,
            deliveryMode: this.ruleForm.deliveryMode,
            reserDate: this.ruleForm.reserDate,
            // isInstall: this.ruleForm.isInstall,
            remarks: this.ruleForm.remarks,
            // storeId: this.ruleForm.storeId,
            // shoppingGuide: this.ruleForm.shoppingGuide,
            salesVoucherNum: this.ruleForm.salesVoucherNum,
            customContent: this.ruleForm.customContent,
            isCustom: this.ruleForm.isCustom

          }
          this.$api.stEastOrderEditSave(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.loading = false
              this.$router.push({ path: '/myStore/order/easyOrderManage' })
            } else {
              // 失败提示
              this.loading = false
              this.$message.error(res.msg)
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
      const isLt2M = file.size / 1024 / 1024 < 20
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
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
    //  文件上传成功后的回调
    fileUploadSuccess (file, fileList) {
      let thisFile = [
        {
          name: file.data.fileName,
          url: file.data.filePath,
          enclosureId: file.data.enclosureId
        }
      ]
      // this.ruleForm.fileLists 图片列表
      this.ruleForm3.fileLists = [...this.ruleForm3.fileLists, ...thisFile] // 数组合并
      this.imgShow = false
    },
    // 删除文件
    handleRemove (file, fileList) {
      let param = {
        id: ''
      }
      if (!file.enclosureId) {
        param.id = file.response.data.enclosureId
      } else {
        param.id = file.enclosureId
      }
      // let param = {
      //   id: file.response.data.enclosureId
      // }
      // 获取文件全路径
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile = fileList
          this.ruleForm3.fileLists.splice(this.ruleForm3.fileLists.findIndex(v => {
            return v.uid === this.deletFile.uid
          }), 1)
          this.deletFile = ''
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
  components: { breadCrumb, topTips, search, orderCoupon, orderReceipt }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.add-order {
  margin: 0 auto;
  padding-top: 106px;
  .process {
    margin-top: 20px;
    .process-item {
      margin-bottom: 10px;
      .circle {
        &.succ {
          background-color: #737685 !important;
          i {
            color: #fff;
            font-size: 16px;
          }
        }
      }
      .order-num {
        margin: 20px 0;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .num {
          font-size: 24px;
          font-weight: bold;
          margin-right: 20px;
          i {
            font-size: 22px;
          }
        }
        .note {
          font-size: $md-size;
          color: #fff;
          padding: 2px 6px;
          border-radius: 4px;
          &.type1 {
            background-color: $yello-color;
          }
          &.type2 {
            background-color: #44af7b;
          }
          &.type3 {
            background-color: #7180f1;
          }
          &.type4 {
            background-color: #b3b5ba;
          }
           &.type5{
            background-color: #f80a0a;
          }
        }
      }
      &.active {
        .top {
          .circle {
            background-color: $main-color;
            color: #fff;
          }
          .back-edit {
            padding: 8px;
            font-size: 16px;
          }
        }
      }
      &:last-child {
        .main-pro {
          &::after {
            display: none;
          }
        }
      }
      .main-pro {
        position: relative;
        &.step1 {
          padding: 80px 0 60px 40px;
        }
        &.step2 {
          padding: 20px 0 20px 00px;
          .order-submit {
            margin: 10px 0;
            text-align: center;
            button {
              padding: 15px 8px;
              width: 200px;
            }
          }
          .search {
            justify-content: center;
            margin-bottom: 20px;
          }
          .dis-afte {
            .black-color {
              font-weight: bold;
            }
            .change {
              span {
                color: $text-gray-color;
              }
            }
            .red-color {
              color: $main-color;
            }
            .price-op {
              display: flex;
              button {
                padding: 3px 8px;
              }
              input[type='text'] {
                border: 1px solid $input-border-color;
                height: 20px;
                border-radius: 4px;
                font-size: $xs-size;
                width: 80px;
                padding-left: 4px;
                margin-right: 4px;
              }
            }
          }
          .comm-summ {
            display: flex;
            justify-content: flex-end;
            padding-top: 10px;
            font-size: $md-size;
            .item {
              padding: 10px 0;
              label {
                width: 100px;
                text-align: right;
                display: inline-block;
                margin-right: 20px;
              }
            }
            .comm-right {
              padding: 0 40px;
              // text-align: right;
              border-left: 1px solid $border-color;
              position: relative;
              .blue-color {
                color: $blue-color;
              }
              .red-color {
                color: $main-color;
              }
            }
            .comm-left {
              padding: 0 40px;
            }
          }
          .info-tips {
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            border-top: 6px solid $gray-color;
            .info-name {
              font-size: $xlg-size;
              font-weight: bold;
            }
            button {
              padding: 4px 20px;
              border: 0;
              i {
                margin-right: 4px;
              }
            }
          }
          .img-view {
            width: 70px;
            height: 70px;
          }
          .comm-name {
            font-size: $md-size;
            font-weight: bold;
          }
          .comm-price {
            font-size: $xs-size;
            font-weight: bold;
          }
          .el-col-offset-12 {
            margin-right: 50%;
            margin-left: 0;
          }
        }
        .first-form {
          width: 470px;
          margin: 0 auto;
          .next-precess {
            padding-top: 22px;
            p {
              text-align: center;
              button {
                padding: 15px 8px;
                width: 200px;
              }
              &.title {
                font-size: $md-size;
                color: $text-gray-color;
                margin-top: 25px;
              }
            }
          }
        }
      }
      .top {
        display: flex;
        align-items: center;
        .circle {
          display: inline-block;
          width: 36px;
          height: 36px;
          line-height: 36px;
          border-radius: 50%;
          text-align: center;
          background-color: $gray-color;
          color: $text-main-color;
          font-size: $xs-size;
          margin: 0 20px;
        }
        .toptips {
          flex: 1;
        }
      }
    }
  }
}
</style>
