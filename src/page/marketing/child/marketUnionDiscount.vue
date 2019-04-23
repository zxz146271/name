<!-- *************************************** 优惠券新增  编辑页面  ******************************************* -->
<template>
  <div class="comm-edit">
    <div class="top">
      <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb>
    </div>
    <div class="form-group">
      <div class="form-block">
        <top-tips :title="necessary"></top-tips>
        <div class="form-list">
          <el-form :model="stMarketingCouponInfo" :rules="rules" ref="stMarketingCouponInfo1" label-width="120px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="联盟优惠券名称" prop="couponName">
                  <el-input v-model="stMarketingCouponInfo.couponName"  placeholder="请输入优惠券名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发放总量" prop="totalAmount">
                  <el-input  v-model="stMarketingCouponInfo.totalAmount" placeholder="请输入发放总量"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="优惠方式" prop="preferentialWay">
                  <el-radio-group v-model="stMarketingCouponInfo.preferentialWay" @change="reduceMoneyAndPricing()">
                    <el-radio label="reduceMoney">直减</el-radio>
                    <el-radio label="pricing">折扣</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
             <el-col :span="12" v-show="pricingBut">
                <el-form-item label="折扣" prop="preferentialIntensity" >
                  <el-input v-model="stMarketingCouponInfo.preferentialIntensity" placeholder="如需折扣为80%,请输入80"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="reduceMoneyBut">
                <el-form-item label="直减金额" prop="lapseAmount" >
                  <el-input v-model="stMarketingCouponInfo.lapseAmount" placeholder="请输入直减金额"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="24" v-show="reduceMoneyBut">
                  <el-form-item label="使用门槛" prop="useThreshold" >
                    <el-radio-group  v-model="stMarketingCouponInfo.useThreshold"  @change="useThresholdBut()" >
                      <el-radio  label="noThreshold" >无门槛</el-radio>
                      <el-radio  label="satisfyMoney" >满足一定金额使用</el-radio>
                    </el-radio-group>
                  </el-form-item>
              </el-col>
              <el-col :span="12" v-show="satisfyMoneyOn">
                <el-form-item label="满足金额" prop="thresholdMoney">
                  <el-input v-model="stMarketingCouponInfo.thresholdMoney" placeholder="请输入满足金额"></el-input>
                </el-form-item>
              </el-col>
             <el-col :span="12">
                <el-form-item label="活动时间段" prop="getStartEndTime">
                  <div class="block"></div>
                  <el-date-picker  v-model="stMarketingCouponInfo.getStartEndTime" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
             </el-col>
               <el-col :span="12">
                <el-form-item label="使用时间段" prop="useStartEndTime">
                  <div class="block"></div>
                  <el-date-picker  v-model="stMarketingCouponInfo.useStartEndTime" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
             </el-col>
                <!--门店信息下拉框-->
              <el-col :span="12">
                 <el-form-item label="可选门店" prop="storeId">
                <el-select v-model="stMarketingCouponInfo.storeId" @change="selectStore">
                  <el-option  multiple='false' v-for="item in loadStoreTree" :key="item.id" :label="item.label" :value="item.id"></el-option>
                  </el-select>
              </el-form-item>
              </el-col>
             <!-- 使用范围下拉框  -->
                <el-col :span="24">
                <div class="radio-popup">
                  <p><font color="red">*</font>使用范围</p>
                  <div class="content">
                    <ul>
                      <li v-for="(item, index) in radioList" :key="index" v-bind:class= '{active:item.isActive}' @click="assignProduceClick(index)">
                        <span>
                          <i></i>
                          <input type="radio" name="radio">
                        </span>
                        <label>{{item.type}}</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-col>
              <!-- 显示已经选中的商品名字 -->
              <el-col :span="12" v-show="productsV_Show">
                <el-form-item :label="'已选中'+productsCount+'件商品'">
                  <li v-for="(item, index) in productsName" :key="index" >
                  {{item}}
                </li>
                </el-form-item>
              </el-col>
                     <!--门店信息下拉框-->
              <el-col :span="12"  v-show="storeTree" >
                 <el-form-item label="可用门店" prop="storeId">
                <el-select v-model="stMarketingCouponInfo.storeId" placeholder="请选择" >
                  <el-option  multiple='false' v-for="item in loadStoreTree" :key="item.id" :label="item.label" :value="item.id"></el-option>
                  </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="活动说明" prop="useExplanation">
                  <el-input type="textarea" v-model="stMarketingCouponInfo.useExplanation" placeholder="请输入活动说明"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="咨询电话" prop="consultingPhone">
                  <el-input v-model="stMarketingCouponInfo.consultingPhone" placeholder="请输入咨询电话"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12" :offset="12">
                  <el-form-item label="优惠券背景图片" prop="name" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: stMarketingCouponInfo.couponId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-success="fileUploadSuccess"
                      :limit= 1
                      :on-exceed = "outOfRange"
                      :file-list="ruleForm.fileLists"
                      :before-upload="beforeAvatarUpload"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="form-block">
        <top-tips :title="optional" ></top-tips>
          <div class="form-list">
          <el-form :model="stMarketingCouponInfo" :rules="rules" ref="stMarketingCouponInfo2" label-width="120px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="每人限领" prop="limitNumber">
                  <el-input v-model="stMarketingCouponInfo.limitNumber" placeholder="请输入每人限领"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="opeartion">
        <div>
          <el-button class="submit_add"  @click="cancel">
            取消
          </el-button>
          <el-button class="submit" @click="submit(['stMarketingCouponInfo1','stMarketingCouponInfo2'])">
            提交
          </el-button>
        </div>
      </div>
    </div>
    <!--  添加商品弹弹出框 -->
    <el-dialog
      :visible.sync="productsTree"
        width="35%"
        class="import-dialog"
        :before-close="closeDialog">
          <div slot="title" class="left-title">
            <span class="top">选择商品</span>
          </div>
          <div class="popup-search">
            <search @searchValue="searchValue"></search>
          </div>
        <!--  <div class="popup-checkbox">
            <el-checkbox @change="productsCheckAll" v-model="checked">全选</el-checkbox>
          </div> -->
          <div class="comm-list">
            <commodity-item @checkBokChange="checkBokChange" v-for="(item, index) in stMarketingProductsInfo" :key="index" :item="item"></commodity-item>
          </div>
          <div class="btns">
            <el-button @click="addProductsWinClose()">取消</el-button>
            <el-button type="primary" @click="addProductWinOk()">确定</el-button>
          </div>
  </el-dialog>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
import search from '../../../components/public/search'
import commodityItem from '../../../components/commodity/commodityItem'
// import func from './vue-temp/vue-editor-bridge';
export default {
  data () {
    return {
      isActive: false,
      importComm: false,
      thisShow: false,
      num8: 1,
      radioList: [
        {
          type: '全部商品',
          isActive: false
        },
        {
          type: '部分商品',
          isActive: false
        }
      ],
      breadcrumbList: [
        // {title: '联盟活动', path: '/marketing/marketUnionDetails', query: {unionId: '666'}},
        {title: '联盟活动优惠券', path: '/marketing/marketUnionDetails?unionId=' + this.$route.query.unionId + '&startTime=' + this.$route.query.startTime + '&endTime=' + this.$route.query.endTime + '&pageChooseIndex=' + this.$route.query.pageChooseIndex},
        {title: '联盟优惠券', path: ''}
      ],
      necessary: {
        title: '基础配置',
        unfold: false
      },
      optional: {
        title: '领取规则',
        unfold: false
      },
      ruleForm: {
        name: '',
        type: [],
        fileLists: []
      },
      rules: {
        // 活动名称验证
        couponName: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ],
        // 活动说明验证
        useExplanation: [
          { required: false, message: '请输入优惠券活动说明', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ],
        // 限制领取数量
        limitNumber: [
          { required: true, message: '请输入每人限领优惠券数量', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        // 发行总量
        totalAmount: [
          { required: true, message: '请输入总数量', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        // 优惠方式
        preferentialWay: [
          { required: true, message: '请至少选择一种优惠方式', trigger: 'blur' }
        ],
        // 折扣
        preferentialIntensity: [
          { required: true, pattern: /^[0-9]*$/, message: '请填入数字,如所需为80%,请输入80', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        // 直减金额
        lapseAmount: [
          { required: false, message: '请填写直减金额', trigger: 'blur' },
          { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: '直减金额为数字', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        // 满减
        thresholdMoney: [
          { required: false, message: '请填写满足金额', trigger: 'blur' },
          { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: '满足金额为数字', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        // 活动开始时间
        getStartEndTime: [
          { required: true, message: '请选择活动时间段', trigger: 'blur' }
        ],
        // 使用时间
        useStartEndTime: [
          { required: true, message: '请选择使用时间段', trigger: 'blur' }
        ],
        // 门店下拉框
        storeId: [
          { required: true, message: '请选择生效门店', trigger: 'blur' }
        ],
        consultingPhone: [
          { min: 0, max: 13, message: '长度在 0 到 13 个字符', trigger: 'blur' }
        ]
      },
      // 声明一个  优惠券  的对象
      stMarketingCouponInfo: {
      },
      // 声明一个  商品  的对象
      stMarketingProductsInfo: {
        startEndTime: []
      },
      value4: '',
      loadStoreTree: [],
      isShow: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      productsTree: false,
      storeTree: false,
      // 直减--折扣单选
      reduceMoneyBut: false,
      pricingBut: false,
      // 无门槛使用--满足金额
      satisfyMoneyOn: false,
      // 接收选中的商品ID
      checkList: [],
      value: '',
      chooseIndex: 0,
      // 接收选中的商品ID
      productsId: [],
      // 选中的商品名称
      productsName: [],
      // 选中的商品数量
      productsCount: 0,
      // 商品数量显示文本控制
      productsV_Show: false,
      // 全选复选框值
      checked: false,
      // 商品弹出框 搜索框的值
      productsSearchValue: '',
      // 联盟传送过来的开始时间 结束时间
      receiveTime: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  // 优惠券数据初始化方法
  mounted () {
    this.getStMarketingCouponById()
    this.loadMarketingStoreTree()
  },
  created () {
    this.getStGoodsInfoList()
  },
  methods: {
    // 选择商品窗口  取消按钮
    addProductsWinClose () {
      this.productsTree = false
      this.clearAllProduct()
      this.productsV_Show = false
      this.stMarketingProductsInfo.forEach(item => {
        item.choose = false
      })
    },
    // 添加商品确认框
    addProductWinOk () {
      this.productsTree = false
      // 获取所有商品信息  用于判断是否选中
      this.clearAllProduct()
      this.stMarketingProductsInfo.forEach(item => {
        if (item.choose === true) {
          this.productsId.push(item.goodsId)
          this.productsName.push(item.goodsName)
          this.productsCount++
        }
      })
    },
    cancel () {
      this.$router.push({path: '/marketing/marketUnionDetails', query: {startTime: this.$route.query.startTime, endTime: this.$route.query.endTime, unionId: this.$route.query.unionId, pageChooseIndex: this.$route.query.pageChooseIndex}})
    },
    // 查询条件
    searchValue (value) {
      this.productsSearchValue = value
      this.getStGoodsInfoList()
    },
    // 获取优惠券信息详情
    getStMarketingCouponById () {
      let tempFullUrl = ''
      let item = {}
      let params = {
        couponId: this.$route.query.unionCouponId
      }
      this.$api.getStMarketingCouponById(params).then(res => {
        this.stMarketingCouponInfo = res.data
        // 总量
        if (this.stMarketingCouponInfo.totalAmount !== null) {
          this.stMarketingCouponInfo.totalAmount = this.stMarketingCouponInfo.totalAmount.toString()
        }
        // 折扣
        if (this.stMarketingCouponInfo.preferentialIntensity !== null) {
          this.stMarketingCouponInfo.preferentialIntensity = this.stMarketingCouponInfo.preferentialIntensity.toString()
        }
        // 限领
        if (this.stMarketingCouponInfo.limitNumber !== null) {
          this.stMarketingCouponInfo.limitNumber = this.stMarketingCouponInfo.limitNumber.toString()
        }
        // 直减金额
        if (this.stMarketingCouponInfo.lapseAmount !== null) {
          this.stMarketingCouponInfo.lapseAmount = this.stMarketingCouponInfo.lapseAmount.toString()
        }
        // 满足金额
        if (this.stMarketingCouponInfo.thresholdMoney !== null) {
          this.stMarketingCouponInfo.thresholdMoney = this.stMarketingCouponInfo.thresholdMoney.toString()
        }
        // 如果为空  设置默认打折
        if (this.stMarketingCouponInfo.preferentialWay === null) {
          this.stMarketingCouponInfo.preferentialWay = 'pricing'
          this.pricingBut = true
        }
        // 如果为空  设置默认无门槛
        if (this.stMarketingCouponInfo.useThreshold === null) {
          this.stMarketingCouponInfo.useThreshold = 'noThreshold'
        }
        // 如果为空  设置默认全部商品
        if (this.stMarketingCouponInfo.useScope === null) {
          this.assignProduceClick(0)
        }
        // 如优惠方式为折扣时 打开折扣
        if (this.stMarketingCouponInfo.preferentialWay === 'pricing') {
          this.pricingBut = true
          this.rules.lapseAmount[0].required = false
          this.rules.preferentialIntensity[0].required = true
        } else if (this.stMarketingCouponInfo.preferentialWay === 'reduceMoney') {
          this.reduceMoneyBut = true
          this.rules.lapseAmount[0].required = true
          this.rules.preferentialIntensity[0].required = false
          // 当直减的时候 判断有没有门槛,有
          if (this.stMarketingCouponInfo.useThreshold === 'satisfyMoney') {
            this.satisfyMoneyOn = true
            this.rules.preferentialIntensity[0].required = false
          }
        }
        // 判断使用范围 (全部商品/部分门店/部分商品)
        if (this.stMarketingCouponInfo.useScope === 'assignStore') {
          this.assignProduceClick(1)
        } else if (this.stMarketingCouponInfo.useScope === 'assignProduce') {
          this.assignProduceClick(3)
          // 遍历过来的商品ID
        } else if (this.stMarketingCouponInfo.useScope === 'allProduce') {
          this.assignProduceClick(0)
          // 遍历过来的商品ID
        }
        // 获取文件全路径
        if (res.data.fileUrl != null) {
          res.data.fileUrl.forEach(el => {
            let param = {
              filePath: el.filePath
            }
            // 获取文件全路径
            this.$api.getFullPath(param).then(res => {
              tempFullUrl = res.data
              item = {
                url: tempFullUrl,
                name: el.filename,
                enclosureId: el.enclosureId
              }
              this.ruleForm.fileLists.push(item)
            })
          })
        }
        if (this.stMarketingCouponInfo.startEndTime === null) {
          this.receiveTime.push(this.$route.query.startTime)
          this.receiveTime.push(this.$route.query.endTime)
          this.stMarketingCouponInfo.startEndTime = this.receiveTime
        }
      })
    },
    // 加载门店树信息
    loadMarketingStoreTree () {
      let params = {
        couponId: this.$route.query.couponId,
        useScope: this.$route.query.useScope
      }
      this.$api.loadMarketingStoreTree(params).then(res => {
        this.loadStoreTree = res.data
      })
    },
    // 加载商品弹窗
    getStGoodsInfoList () {
      if (this.stMarketingCouponInfo.storeId === null) {
        this.$message.error('请先选择门店')
        return false
      }
      let params = {
        goodsName: this.productsSearchValue,
        state: 0,
        storeId: this.stMarketingCouponInfo.storeId
      }
      this.$api.getStGoodsInfoAllList(params).then(res => {
        this.stMarketingProductsInfo = res.data
        if (this.stMarketingProductsInfo !== null) {
          this.stMarketingProductsInfo.forEach(item => {
            // 判断是否为已经参加过活动的商品
            if (this.$route.query.productsId) {
              if (this.$route.query.productsId.indexOf(item.goodsId) > -1) {
                item.choose = true
                this.productsId.push(item.goodsId)
                this.productsName.push(item.goodsName)
                this.productsCount++
              }
              this.productsV_Show = true
            } else {
              item.choose = false
            }
          })
        }
      })
    },
    // 使用范围下拉框
    assignProduceClick (index) {
      if (this.stMarketingCouponInfo.storeId === null && index !== 0 && index !== 3) {
        this.$message.error('请先选择门店')
        return false
      }
      let index2 = null
      if (index === 3) {
        index = 1
        index2 = 3
      }
      this.radioList[index].isActive = true
      for (let i = 0; i < this.radioList.length; i++) {
        if (index !== i) {
          this.radioList[i].isActive = false
        }
      }
      if (index === 0) {
        this.storeTree = false
        this.productsTree = false
        this.productsV_Show = false
        this.stMarketingCouponInfo.useScope = 'allProduce'
      } else if (index === 1 && index2 !== 3) {
        this.storeTree = false
        this.productsTree = true
        this.productsV_Show = true
        this.stMarketingCouponInfo.useScope = 'assignProduce'
        // this.getStGoodsInfoList(this.stMarketingCouponInfo.storeId)
      } else if (index2 === 3) {
        this.storeTree = false
        this.productsV_Show = true
        this.stMarketingCouponInfo.useScope = 'assignProduce'
        this.getStGoodsInfoList(this.stMarketingCouponInfo.storeId)
      }
    },
    // 直减---折扣按钮点击事件
    reduceMoneyAndPricing () {
      // 直减
      if (this.stMarketingCouponInfo.preferentialWay === 'reduceMoney') {
        this.reduceMoneyBut = true
        this.pricingBut = false
        this.rules.lapseAmount[0].required = true
        this.rules.preferentialIntensity[0].required = false
      // 折扣
      } else if (this.stMarketingCouponInfo.preferentialWay === 'pricing') {
        this.reduceMoneyBut = false
        this.pricingBut = true
        this.rules.lapseAmount[0].required = false
        this.rules.preferentialIntensity[0].required = true
      }
    },
    // 无门槛-满足金额 选择
    useThresholdBut () {
      // 无门槛
      if (this.stMarketingCouponInfo.useThreshold === 'noThreshold') {
        this.satisfyMoneyOn = false
      // 满足金额
      } else if (this.stMarketingCouponInfo.useThreshold === 'satisfyMoney') {
        this.satisfyMoneyOn = true
        this.rules.thresholdMoney[0].required = true
      }
    },
    // 提交
    submit (formName) {
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
        // 验证当使用范围为门店时  选择门店
        if (this.stMarketingCouponInfo.useScope === 'assignProduce') {
          if (this.productsCount === 0 || this.productsCount === '') {
            this.$message({
              message: '优惠券使用范围为商品时,请选择至少一个商品',
              type: 'warning'
            })
            return
          }
        }
        // 将页面对象赋予参数传递给后台
        let params = {
          // 优惠券名字
          couponName: this.stMarketingCouponInfo.couponName,
          // 发行量
          totalAmount: this.stMarketingCouponInfo.totalAmount,
          // 优惠方式
          preferentialWay: this.stMarketingCouponInfo.preferentialWay,
          // 优惠力度  折扣
          preferentialIntensity: this.stMarketingCouponInfo.preferentialIntensity,
          // 使用门槛
          useThreshold: this.stMarketingCouponInfo.useThreshold,
          // 门槛金额 (满足金额)
          thresholdMoney: this.stMarketingCouponInfo.thresholdMoney,
          // 使用范围
          useScope: this.stMarketingCouponInfo.useScope,
          // 活动说明
          useExplanation: this.stMarketingCouponInfo.useExplanation,
          // 咨询电话
          consultingPhone: this.stMarketingCouponInfo.consultingPhone,
          // 限领取数量
          limitNumber: this.stMarketingCouponInfo.limitNumber,
          // 直减金额
          lapseAmount: this.stMarketingCouponInfo.lapseAmount,
          pageStartTime: this.$route.query.startTime,
          // 生效  结束时间
          pageEndTime: this.$route.query.endTime,
          // 指定商品 数组
          couponScope: this.productsId,
          // 优惠券ID
          couponId: this.stMarketingCouponInfo.couponId,
          // 指定门店 ID
          storeId: this.stMarketingCouponInfo.storeId,
          // 版本号
          versionNo: this.stMarketingCouponInfo.versionNo,
          // 优惠券类型 联盟优惠券
          type: 4,
          // 优惠券状态
          state: 3
        }
        if (params.couponId != null && params.versionNo != null) {
          // 联盟优惠券
          this.$api.editSaveStMarketingSeckill(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.$router.push({path: '/marketing/marketUnionDetails', query: {startTime: this.$route.query.startTime, endTime: this.$route.query.endTime, unionId: this.$route.query.unionId, pageChooseIndex: this.$route.query.pageChooseIndex}})
              this.$message.success(res.msg)
            } else {
              // 失败提示
              this.$message.error(res.msg)
            }
          })
        } else {
          params.unionId = this.$route.query.unionId
          this.$api.addStMarketingCoupon(params).then(res => {
            if (res.code === 0) {
            // 成功返回列表页面
              this.$router.push({path: '/marketing/marketUnionDetails', query: {startTime: this.$route.query.startTime, endTime: this.$route.query.endTime, unionId: this.$route.query.unionId, pageChooseIndex: this.$route.query.pageChooseIndex}})
              this.$message.success(res.msg)
            } else {
              // 失败提示
              this.$message.error(res.msg)
            }
          })
        }
      } else {
        this.$message.error('请按要求填写页面红色标注必填项')
      }
    },
    // 文件上传
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件超出范围
    outOfRange () {
      this.$message.error('上传图片数量限制为1张')
    }, //  文件上传成功后的回调
    fileUploadSuccess (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      // this.ruleForm.fileLists 图片列表
      this.ruleForm.fileLists = [...this.ruleForm.fileLists, ...thisFile] // 数组合并
    }, // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt2M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        type = false
        return type
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt2M && type
    }, // 删除文件
    handleRemove (file, fileList) {
      let param = {
        id: file.enclosureId
      }
      // 获取文件全路径
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile = fileList
          this.ruleForm.fileLists.splice(this.ruleForm.fileLists.findIndex(v => {
            return v.uid === this.deletFile.uid
          }), 1)
          this.deletFile = ''
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    handleChange (value) {
    },
    showList (data) {
      if (data) {
        this.thisShow = data
      } else {
        this.thisShow = false
      }
    },
    // 子组件如果选项变更 则判断复选框选中状态
    checkBokChange (value) {
      if (value) {
        let proCount = 0
        let rescount = 0
        let rescount1 = 0
        this.stMarketingProductsInfo.forEach(item => {
          proCount++
          // 存在有一个为false  则设置全为true
          if (item.choose === false) {
            rescount++
          }
          if (item.choose === true) {
            rescount1++
          }
          if (rescount >= 0) {
            this.checked = false
          }
          if (proCount === rescount1) {
            this.checked = true
          }
        })
      }
    },
    clearAllProduct () {
      this.productsId = []
      this.productsName = []
      this.productsCount = 0
    },
    closeDialog () {
      this.productsTree = false
      // 获取所有商品信息  用于判断是否选中
      this.clearAllProduct()
      this.stMarketingProductsInfo.forEach(item => {
        if (item.choose === true) {
          this.productsId.push(item.goodsId)
          this.productsName.push(item.goodsName)
          this.productsCount++
        }
      })
    },
    // 门店选择
    selectStore (value) {
      this.stMarketingCouponInfo.storeId = value
      this.getStGoodsInfoList(value)
    }
  },
  components: {breadCrumb, topTips, search, commodityItem}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.comm-edit{
  margin:0 auto;
  padding-top: 106px;
  .comm-list{
    max-height: 300px;
    overflow-y: auto;
  }
  .top{
    .change-sort{
      text-align: center;
      margin-top: 16px;
      .sort{
        display: inline-block;
        margin:0 8px;
        li{
          display: inline-block;
          &:nth-child(n+2)::before{
            content: '>',
          }
        }
      }
      .change{
        padding:5px 12px;
        color:$text-gray-color;
        &:hover{
          color:$main-color;
        }
      }
    }
  }
  .form-group{
    margin-top: 20px;
    .form-block{
      .form-list{
        margin-top: 28px;
        padding: 0 70px;
        .radio-popup{
          display: flex;
          margin-bottom: 18px;
          align-items: center;
          >p{
            width: 120px;
            text-align: right;
            padding-right: 12px;
            line-height: 40px;
            font-size: $xs-size;
            color:#606266;
          }
          .content{
            ul{
              display: flex;
              li{
                display: flex;
                align-items: center;
                span{
                  width: 14px;
                  height: 14px;
                  position: relative;
                  i{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 1px solid #dcdfe6;
                    position: absolute;
                    left: 0;
                    top:0;
                    z-index: 1;
                    &::after{
                      width: 4px;
                      height: 4px;
                      border-radius: 100%;
                      background-color: #fff;
                      content: "";
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      transform: translate(-50%,-50%) scale(0);
                      transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
                    }
                  }
                  input{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top:0;
                    left: 0;
                    z-index: 2;
                    opacity: 0;
                    cursor: pointer;
                  }
                }
                label{
                  font-size: $xs-size;
                  color:#606266;
                  padding-left: 10px;
                  margin-right: 30px;
                  cursor: pointer;
                }
              }
              .active{
                i{
                  background-color: $main-color;
                  border-color: $main-color;
                  &::after{
                    transform: translate(-50%,-50%) scale(1);
                  }
                }
                label{
                    color: $main-color!important;
                }
              }
            }
          }
        }
        .el-col-12{
          margin-right: 50%;
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
      }
    }
  .opeartion{
      display: flex;
      justify-content: center;
      margin: 50px 0;
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
  .popup-search{
    display: flex;
    justify-content: center;
  }
  .popup-checkbox{
    border-bottom: 1px solid $border-color;
    padding: 4px 0 4px 14px;
  }
  .btns{
    display: flex;
    justify-content: center;
    margin-top: 15px;
    button{
      &:nth-child(1){
        padding: 15px 57px;
      }
      &:nth-child(2){
        padding: 16px 87px;
      }
    }
  }
}
</style>
