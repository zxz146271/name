<!-- *************************************** 优惠券新增  编辑页面  ******************************************* -->
<template>
  <div class="comm-edit">
    <div class="form-group">
      <div class="form-block">
        <top-tips :title="necessary"></top-tips>
        <div class="form-list">
          <el-form :model="stMarketingCouponInfo" :rules="rules" ref="stMarketingCouponInfo1" label-width="120px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="当前门店" >
                  <div class="block" style="font-weigth:blod" >
                     {{storeName}}
                  </div>
                </el-form-item>
             </el-col>
              <el-col :span="12">
                <el-form-item label="优惠券名称" prop="couponName">
                  <el-input v-model="stMarketingCouponInfo.couponName"  placeholder="请输入优惠券名称" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发放总量" prop="totalAmount">
                  <el-input  v-model="stMarketingCouponInfo.totalAmount" placeholder="请输入发放总量" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="优惠方式" prop="preferentialWay">
                  <el-radio-group v-model="stMarketingCouponInfo.preferentialWay" @change="reduceMoneyAndPricing()">
                    <el-radio :disabled="activeState == 1 ? true : false" label="reduceMoney">直减</el-radio>
                    <el-radio :disabled="activeState == 1 ? true : false" label="pricing">折扣</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
             <el-col :span="12" v-show="pricingBut">
                <el-form-item label="折扣" prop="preferentialIntensity" >
                  <el-input type="number" v-model="stMarketingCouponInfo.preferentialIntensity" placeholder="如需折扣为80%,请输入80" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="reduceMoneyBut">
                <el-form-item label="直减金额" prop="lapseAmount" >
                  <el-input v-model="stMarketingCouponInfo.lapseAmount" placeholder="请输入直减金额" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="24" v-show="reduceMoneyBut">
                  <el-form-item label="使用门槛" prop="useThreshold" >
                    <el-radio-group  v-model="stMarketingCouponInfo.useThreshold"  @change="useThresholdBut()" >
                      <el-radio :disabled="activeState == 1 ? true : false"  label="noThreshold" >无门槛</el-radio>
                      <el-radio :disabled="activeState == 1 ? true : false"  label="satisfyMoney" >满足一定金额使用</el-radio>
                    </el-radio-group>
                  </el-form-item>
              </el-col>
              <el-col :span="12" v-show="satisfyMoneyOn">
                <el-form-item label="满足金额" prop="thresholdMoney">
                  <el-input v-model="stMarketingCouponInfo.thresholdMoney" placeholder="请输入满足金额" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
               <!---=========================================新增代码 start 2018/10/20=========================================-->
              <el-col>
                <el-form-item label="是否参加联盟活动" prop="isRelateLeague" class="label-star">
                  <el-radio-group v-model="stMarketingCouponInfo.isRelateLeague" @change="isJionAllianceAct()">
                    <el-radio :disabled="activeState == 1 ? true : false" label="N">不参加</el-radio>
                    <el-radio :disabled="activeState == 1 ? true : false" label="Y">参加</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-show="chooseAllianceAct">
                <el-form-item label="选择联盟活动" prop="leagueId">
                    <el-button @click="chooseAct()">选择</el-button>
                    <span v-show="allianceAct_Show">&nbsp;&nbsp;&nbsp;&nbsp;当前选择 :&nbsp;&nbsp;{{this.leagueName}}</span>
                </el-form-item>
              </el-col>
              <!-- 显示已经选中的活动名称 -->
              <!-- <el-col :span="12" v-show="allianceAct_Show">
                  <el-form-item :label="'已选联盟活动:'">
                  <li >
                  {{this.leagueName}}
                </li>
                </el-form-item>
              </el-col> -->
               <!--  选择联盟活动弹出框 -->
              <el-dialog
                :visible.sync="allianceActs"
                  width="35%"
                  tooltip-effect="dark"
                  class="import-dialog">
                  <p slot="title" class="dialog-title">
                      <span>选择联盟活动</span>
                    </p>
                    <div class="popup-search">
                      <search style="margin-top:-25px" @searchValue="searchActValue"></search>
                    </div>
                  <div style="padding:0 28px;">
                  <el-table class="marketDiscount" :data="allianceActInfo"  max-height ="250"  align="center" style="margin-top:15px">
                  <el-table-column  width="50" label="操作" >
                    <template slot-scope="scope">
                        <el-radio :label="scope.row.leagueId" v-model="radio" @click.native.prevent="clickitem(scope.row)">&nbsp;</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column property="leagueCode" label="ID" width="180" align="center" show-overflow-tooltip></el-table-column>
                  <el-table-column property="leagueName" label="联盟活动" width="100" align="center" show-overflow-tooltip></el-table-column>
                  <el-table-column property="" label="活动时间" width="280" align="center">
                    <template slot-scope="scope">
                    <span>{{scope.row.startTime}}~{{scope.row.endTime}}</span>
                    <span></span>
                  </template>
                  </el-table-column>
                </el-table>
                </div>
                <div  v-if =" this.leagueName!= ''"  style="margin-left:29px;margin-top:10px">
                  <p>当前选择:&nbsp;&nbsp;{{this.leagueName}}</p>
                    </div>
                <div align="center" slot="footer" class="dialog-footer">
                    <el-button @click="addAllianceActClose()">取消</el-button>
                    <el-button type="primary" @click="addAllianceActOk()">确定</el-button>
                    </div>
            </el-dialog>
              <!---=========================================新增代码 end 2018/10/20=========================================-->
               <!--uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 修改代码 start 2018/10/22uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu-->
             <el-col :span="12">
               <el-form-item v-show="leagueAct_date" label="联盟活动时间" prop="getStartEndTime">
                  <div class="block"></div>
                  <el-date-picker  :disabled="activeState == 1 ? true : false" v-model="stMarketingCouponInfo.getStartEndTime" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item v-show="activity_date" label="活动时间段" prop="getStartEndTime">
                  <div class="block"></div>
                  <el-date-picker :disabled="activeState == 1 ? true : false"  v-model="stMarketingCouponInfo.getStartEndTime" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
             </el-col>
             <!--uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 修改代码 end 2018/10/22uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu-->
               <el-col :span="12">
                <el-form-item label="使用时间段" prop="useStartEndTime">
                  <div class="block"></div>
                  <el-date-picker :disabled="activeState == 1 ? true : false" v-model="stMarketingCouponInfo.useStartEndTime" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
             </el-col>
             <!-- 使用范围下拉框  -->
                <el-col :span="24">
                <div class="radio-popup">
                  <p><font color="red">*</font>使用范围</p>
                  <div class="content">
                    <ul>
                      <li v-for="(item, index) in radioList" :key="index" v-bind:class= '{active:item.isActive}' @click="activeState == 1 ? '' : assignProduceClick(index)">
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
              <el-col :span="12">
                <el-form-item label="活动说明" prop="useExplanation">
                  <el-input type="textarea" rows="10" v-model="stMarketingCouponInfo.useExplanation"  placeholder="请输入活动说明" :disabled="activeState == 1 ? true : false" ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="咨询电话" prop="consultingPhone">
                  <el-input v-model="stMarketingCouponInfo.consultingPhone" placeholder="请输入咨询电话"></el-input>
                </el-form-item>
              </el-col> -->
                <el-col :span="12" :offset="12">
                  <el-form-item label="详情图片" prop="couponDetailPicture" class="upload-item">
                    <el-upload
                      :action="$config().photoUploadUrl"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview1"
                      :on-success="fileUploadSuccess1"
                      :before-upload="beforeAvatarUpload"
                      :limit="1"
                      :on-exceed="outOfRange"
                      :file-list="fileLists1"
                      :on-remove="handleRemove1">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-tooltip class="item" effect="dark" content="建议图片上传尺寸为 750 * 500 px" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible1">
                      <img width="100%" :src="stMarketingCouponInfo.couponDetailPicture" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <!-- 小程序分享图片 -->
                <el-col :span="12" :offset="12">
                  <el-form-item label="小程序分享图" prop="wechatSharePic" class="upload-item">
                    <el-upload
                      :action="$config().photoUploadUrl"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview2"
                      :on-success="fileUploadSuccess2"
                      :before-upload="beforeAvatarUpload"
                      :limit="1"
                      :on-exceed="outOfRange"
                      :file-list="fileLists2"
                      :on-remove="handleRemove2">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-tooltip class="item" effect="dark" content="提示：图片尺寸为 1000 * 800删除后，即使用系统默认图片" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible2">
                      <img width="100%" :src="stMarketingCouponInfo.wechatSharePic" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>

                <!-- H5分享图片 -->
                <!-- <el-col :span="12" :offset="12">
                  <el-form-item label="H5分享图" prop="h5SharePic" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: couponH5SharePic}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview3"
                      :on-success="fileUploadSuccess3"
                      :before-upload="beforeAvatarUpload"
                      :limit= 1
                      :on-exceed="outOfRange"
                      :file-list="ruleForm3.fileLists"
                      :on-remove="handleRemove3">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-tooltip class="item" effect="dark" content="建议图片上传尺寸为 750 * 500 px" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible3">
                      <img width="100%" :src="h5SharePicImg" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col> -->

                <el-col :span="12" :offset="12">
                  <el-form-item label="活动图片" prop="name" class="upload-item label-star">
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
                    <el-tooltip class="item" effect="dark" content="建议图片上传尺寸为 750 * 500 px" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
               <el-col :span="12">
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
                  <el-input v-model="stMarketingCouponInfo.limitNumber" placeholder="请输入每人限领数量" :disabled="activeState == 1 ? true : false"></el-input>
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
          <el-button class="submit" data-code="7010001" @click="submit(['stMarketingCouponInfo1','stMarketingCouponInfo2'])" :loading="loading">{{loading?'提交中':'提交'}}
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
import commodityItem from '../../../components/public/commodityItem'
import { judgeButton } from '../../../tool/Utils'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      fileLists1: [],
      fileLists2: [],
      fileLists3: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      isActive: false,
      importComm: false,
      dialogImageUrl: '',
      h5SharePicImg: '',
      couponDetailPicture: '',
      activeState:'',
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
      ruleForm3: {
        name: '',
        type: [],
        fileLists: []
      },
      rules: {
        // 活动名称验证
        couponName: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        // 活动说明验证
        useExplanation: [
          { min: 0, max: 1000, message: '长度在 0 到 1000 个字符', trigger: 'blur' }
        ],
        // 限制领取数量
        limitNumber: [
          { required: true, message: '请输入每人限领优惠券数量', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        // 发行总量
        totalAmount: [
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
          { required: true, message: '请输入总数量', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' }
        ],
        // 优惠方式
        preferentialWay: [
          { required: true, message: '请至少选择一种优惠方式', trigger: 'blur' }
        ],
        // 折扣
        preferentialIntensity: [
          { required: false, pattern: /^[0-9]*$/, message: '请填入数字,如所需为80%,请输入80', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        // 直减金额
        lapseAmount: [
          { required: false, message: '请填写直减金额', trigger: 'blur' },
          // { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '直减金额为数字且最多保留两位小数', trigger: 'blur' },
          { max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '金额请输入正整数且不能为0', trigger: 'blur' }
        ],
        // 满减
        thresholdMoney: [
          { required: false, message: '请填写满足金额', trigger: 'blur' },
          // { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '满足金额为数字且最多保留两位小数', trigger: 'blur' },
          { max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '金额请输入正整数且不能为0', trigger: 'blur' }
        ],
        // 活动开始时间
        getStartEndTime: [
          { required: true, message: '请选择活动时间段', trigger: 'blur' }
        ],
        // 使用时间
        useStartEndTime: [
          { required: true, message: '请选择使用时间段', trigger: 'blur' }
        ]
      },
      // 声明一个  优惠券  的对象
      stMarketingCouponInfo: {},
      // 声明一个  商品  的对象
      stMarketingProductsInfo: {},
      value4: '',
      // loadStoreTree: [],
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
      loading: false,
      imgType: false,
      imgSize: false,
      // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 新增代码 start 2018/10/20 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      // -------选择联盟活动 date:2018-10-20
      chooseAllianceAct: false,
      // 联盟活动对象
      allianceActInfo: {},
      allianceActs: false,
      allianceAct_Show: false,
      // 接收选中的商品ID
      leagueId: '',
      // 选中的商品名称
      leagueName: '',
      league_Name: '',
      // 选中的商品数量
      actCount: 0,
      multipleSelection: [],
      actSearchValue: null,
      actStart_Time: null,
      actEnd_Time: null,
      actStartTime: null,
      actEndTime: null,
      isRelate_League: 'N',
      leagueAct_date: false,
      activity_date: true,
      radio: '1',
      flag: true,
      // H5分享图业务id
      couponH5SharePic: ''
      // ------- date:2018-10-20
    // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 新增代码 end 2018/10/22aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    }
  },
  computed: {
    ...mapGetters(['powerButton', 'storeName', 'storeId', 'storeInfo'])
  },
  // 优惠券数据初始化方法
  mounted () {
    this.getStMarketingCouponByCode()
    this.getButton()
    this.activeState = this.$route.query.state
  },
  created () {
    this.getStGoodsInfoList()
    this.getAllianceActInfoList()
  },
  watch: {
    storeId (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getStGoodsInfoList()
      }
      // this.chooseThis(this.storeMarket[newVal], newVal)
    }
  },
  methods: {
    // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 start 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
    clickitem (e) {
      this.radio = e.leagueId
      this.leagueName = e.leagueName
      this.league_Name = e.leagueName
      this.actStart_Time = e.startTime
      this.actEnd_Time = e.endTime
    },
    // 参与联盟活动点击事件
    isJionAllianceAct () {
      // 不参加
      if (this.stMarketingCouponInfo.isRelateLeague === 'N') {
        this.chooseAllianceAct = false
        this.allianceAct_Show = false
        if (this.league_Name != null && this.activity_date === false) {
          this.stMarketingCouponInfo.getStartEndTime = null
        }
        this.leagueAct_date = false
        this.activity_date = true
        // 参加
      } else if (this.stMarketingCouponInfo.isRelateLeague === 'Y') {
        this.isRelate_League = 'Y'
        this.chooseAllianceAct = true
        if (this.league_Name != null && this.activity_date === false) {
          this.stMarketingCouponInfo.getStartEndTime = null
        }
      }
    },
    // 选择联盟活动
    chooseAct (value) {
      if (value === 1) {
      } else {
        this.allianceActs = true
      }
    },
    // 选择活动联盟窗口  取消按钮
    addAllianceActClose () {
      this.allianceActs = false
      // this.clearAllianceAct()
      this.getAllianceActInfoList()
    },
    // 添加活动联盟确认框
    addAllianceActOk () {
      this.allianceActs = false
      this.clearAllianceAct()
      this.leagueId = this.radio
      this.leagueName = this.league_Name
      this.actStartTime = this.actStart_Time
      this.actEndTime = this.actEnd_Time
      this.allianceAct_Show = true
      this.stMarketingCouponInfo.getStartEndTime = [new Date(this.actStart_Time), new Date(this.actEnd_Time)]
      this.leagueAct_date = true
      this.activity_date = false
    },
    // 加载联盟活动弹窗
    getAllianceActInfoList () {
      let params = {
        param: this.actSearchValue
      }
      this.$api.getMkAllianceActInfoList(params).then(res => {
        this.allianceActInfo = res.data
        if (this.allianceActInfo != null) {
          this.allianceActInfo.forEach(item => {
            item.choose = false
            if (this.$route.query.leagueId === item.leagueId) {
              item.choose = true
              this.leagueId = item.leagueId
              this.leagueName = item.leagueName
              // this.allianceAct_Show = true
              this.actCount++
            }
          })
        }
      })
    },
    clearAllianceAct () {
      this.leagueId = ''
      this.leagueName = ''
      this.actSearchValue = ''
    },
    // 联盟活动弹出框查询条件
    searchActValue (value) {
      this.actSearchValue = value
      this.getAllianceActInfoList()
    },
    // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 end 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
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
    },
    cancel () {
      this.$router.push({path: '/marketing/storeMarket/activityCoupon'})
    },
    // 查询条件
    searchValue (value) {
      this.productsSearchValue = value
      this.getStGoodsInfoList()
    },
    // 获取优惠券信息详情
    getStMarketingCouponByCode () {
      let tempFullUrl = ''
      let item = {}
      let params = {
        couponCode: this.$route.query.couponCode
        // useScope: this.$route.query.useScope
      }
      this.$api.getStMarketingCouponByCode(params).then(res => {
        this.stMarketingCouponInfo = res.data
        // H5分享图关联id
        this.couponH5SharePic = res.data.couponId + 'H5SharePic'
        // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 start 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        // 如果为空 设置为默认不参加
        if (this.stMarketingCouponInfo.isRelateLeague === null) {
          this.stMarketingCouponInfo.isRelateLeague = 'N'
        } else if (this.stMarketingCouponInfo.isRelateLeague === 'N') {
          this.leagueAct_date = false
          this.activity_date = true
        } else if (this.stMarketingCouponInfo.isRelateLeague === 'Y') {
          this.leagueAct_date = true
          this.activity_date = false
          this.chooseAllianceAct = true
        }
        if (this.stMarketingCouponInfo.leagueId != null && this.stMarketingCouponInfo.leagueId !== '') {
          this.chooseAct(1)
          this.leagueName = this.stMarketingCouponInfo.leagueName
          this.allianceAct_Show = true
        }
        // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 end 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
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
        // // 如果为空  设置默认全部商品
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
          }
        }
        // 判断使用范围 (全部商品/部分门店/部分商品)
        if (this.stMarketingCouponInfo.useScope === 'assignProduce') {
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
        // 回显H5分享图片
        if (res.data.h5SharePic != null) {
          res.data.h5SharePic.forEach(el => {
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
              this.ruleForm3.fileLists.push(item)
              console.log(this.ruleForm3)
            })
          })
        }
        // 回显详情图片
        if (res.data.couponDetailPicture !== null && res.data.couponDetailPicture !== '') {
          this.stMarketingCouponInfo.couponDetailPicture = res.data.couponDetailPicture
          let item = [{
            url: this.stMarketingCouponInfo.couponDetailPicture,
            name: 'couponDetailPicture',
            enclosureId: 'couponDetailPicture'
          }]
          this.fileLists1 = item
        }
        // 回显小程序分享图
        if (res.data.wechatSharePic !== null && res.data.wechatSharePic !== '') {
          this.stMarketingCouponInfo.wechatSharePic = res.data.wechatSharePic
          let item = [{
            url: this.stMarketingCouponInfo.wechatSharePic,
            name: 'wechatSharePic',
            enclosureId: 'wechatSharePic'
          }]
          this.fileLists2 = item
        }
      })
    },
    // 加载商品弹窗
    getStGoodsInfoList (value) {
      let params = {
        goodsName: this.productsSearchValue,
        state: 0
        // storeId: this.storeInfo
      }
      this.$api.getStGoodsInfoAllList(params).then(res => {
        this.stMarketingProductsInfo = res.data
        this.clearAllProduct()
        if (this.stMarketingProductsInfo != null) {
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
      } else if (index2 === 3) {
        this.storeTree = false
        this.productsV_Show = true
        this.stMarketingCouponInfo.useScope = 'assignProduce'
        this.getStGoodsInfoList()
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
        this.satisfyMoneyOn = false
      // 折扣
      } else if (this.stMarketingCouponInfo.preferentialWay === 'pricing') {
        this.reduceMoneyBut = false
        this.pricingBut = true
        this.rules.lapseAmount[0].required = false
        this.rules.preferentialIntensity[0].required = true
        this.satisfyMoneyOn = false
      }
    },
    // 无门槛-满足金额 选择
    useThresholdBut () {
      // 无门槛
      if (this.stMarketingCouponInfo.useThreshold === 'noThreshold') {
        this.satisfyMoneyOn = false
        this.rules.thresholdMoney[0].required = false
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
        // 判断是否上传了活动图片
        if (this.ruleForm.fileLists.length !== null && this.ruleForm.fileLists.length < 1) {
          this.$message({
            message: '创建活动必须选择一个活动图片',
            type: 'warning'
          })
          return false
        }
        // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 start 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        // =========================================新增代码start 2018/10/22 =====================================================
        // 判断参加联盟活动时是否选择了联盟活动
        if (this.stMarketingCouponInfo.isRelateLeague === 'Y') {
          if (this.leagueId === null || this.leagueId === '') {
            this.$message({
              message: '请选联盟活动',
              type: 'warning'
            })
            return
          }
        }
        // ===========================================新增代码end 2018/10/22 =====================================================
        // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 end 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        this.loading = true
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
          // consultingPhone: this.stMarketingCouponInfo.consultingPhone,
          // 限领取数量
          limitNumber: this.stMarketingCouponInfo.limitNumber,
          // 直减金额
          lapseAmount: this.stMarketingCouponInfo.lapseAmount,
          getStartTimeStr: this.stMarketingCouponInfo.getStartEndTime[0],
          // 生效  结束时间
          getEndTimeStr: this.stMarketingCouponInfo.getStartEndTime[1],
          // 使用时间
          useStartTimeStr: this.stMarketingCouponInfo.useStartEndTime[0],
          // 使用时间
          useEndTimeStr: this.stMarketingCouponInfo.useStartEndTime[1],
          // 指定商品 数组
          couponScope: this.productsId,
          // 优惠券ID
          couponId: this.stMarketingCouponInfo.couponId,
          // 优惠券Code
          couponCode: this.stMarketingCouponInfo.couponCode,
          // 指定门店 ID
          storeId: this.storeId,
          // 优惠券状态
          type: 0,
          state: 0,
          // 版本号
          versionNo: this.stMarketingCouponInfo.versionNo,
          // 折扣价
          discountPrice: this.stMarketingCouponInfo.discountPrice,
          // 详情图片地址
          couponDetailPicture: this.stMarketingCouponInfo.couponDetailPicture,
          // 小程序分享图地址
          wechatSharePic: this.stMarketingCouponInfo.wechatSharePic,
          // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 start 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
          // 是否参加活动
          isRelateLeague: this.stMarketingCouponInfo.isRelateLeague,
          // 关联活动ID
          leagueId: this.leagueId
          // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 end 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        }
        if (params.versionNo != null && params.versionNo != null) {
          this.$api.editSaveStMarketingSeckill(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.$router.push({path: '/marketing/storeMarket/activityCoupon'})
              this.$message.success(res.msg)
              this.loading = false
            } else {
              // 失败提示
              this.$message.error(res.msg)
              this.loading = false
            }
          })
        } else {
          this.$api.addStMarketingCoupon(params).then(res => {
            if (res.code === 0) {
            // 成功返回列表页面
              this.$router.push({path: '/marketing/storeMarket/activityCoupon'})
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
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreview1 (file) {
      this.dialogVisible1 = true
    },
    handlePictureCardPreview2 (file) {
      this.dialogVisible2 = true
    },
    handlePictureCardPreview3 (file) {
      this.h5SharePicImg = file.url
      console.log(this.h5SharePicImg)
      this.dialogVisible3 = true
    },
    // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt2M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        this.imgType = true
        type = false
        return type
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
        this.imgSize = true
      }
      return isLt2M && type
    },
    // 文件超出范围
    outOfRange () {
      this.$message.error('上传图片数量限制为1张')
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
    },
    // 上传详情图片成功后的回调
    fileUploadSuccess1 (response, file, fileList) {
      this.stMarketingCouponInfo.couponDetailPicture = response.data.filePath
      let item = [{
        url: this.stMarketingCouponInfo.couponDetailPicture,
        name: 'couponDetailPicture',
        enclosureId: 'couponDetailPicture'
      }]
      this.fileLists1 = item
    },
    // 上传小程序分享图成功后的回调
    fileUploadSuccess2 (response, file, fileList) {
      this.stMarketingCouponInfo.wechatSharePic = response.data.filePath
      let item = [{
        url: this.stMarketingCouponInfo.wechatSharePic,
        name: 'wechatSharePic',
        enclosureId: 'wechatSharePic'
      }]
      this.fileLists2 = item
    },
    //  H5分享成功后的回调
    fileUploadSuccess3 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      // this.ruleForm.fileLists 图片列表
      this.ruleForm3.fileLists = [...this.ruleForm3.fileLists, ...thisFile] // 数组合并
    },
    // 删除详情图片
    handleRemove1 (file, fileList) {
      this.stMarketingCouponInfo.couponDetailPicture = ''
      this.fileLists1 = []
    },
    // 删除小程序分享图
    handleRemove2 (file, fileList) {
      this.stMarketingCouponInfo.wechatSharePic = ''
      this.fileLists2 = []
    },
    // 删除文件
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
          if (this.imgType) {
            res.msg = '上传图片只能是 JPG/PNG/GIF 格式!'
            this.imgType = false
            return
          }
          if (this.imgSize) {
            res.msg = '上传图片大小不能超过 20MB!'
            this.imgSize = false
            return
          }
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    // 删除文件
    handleRemove3 (file, fileList) {
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
          this.ruleForm3.fileLists.splice(this.ruleForm3.fileLists.findIndex(v => {
            return v.uid === this.deletFile.uid
          }), 1)
          this.deletFile = ''
        } else {
          // 失败提示
          if (this.imgType) {
            res.msg = '上传图片只能是 JPG/PNG/GIF 格式!'
            this.imgType = false
            return
          }
          if (this.imgSize) {
            res.msg = '上传图片大小不能超过 20MB!'
            this.imgSize = false
            return
          }
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
        this.clearAllProduct()
        this.stMarketingProductsInfo.forEach(item => {
          if (item.choose === true) {
            this.productsId.push(item.goodsId)
            this.productsName.push(item.goodsName)
            this.productsCount++
          }
        })
      }
    },
    clearAllProduct () {
      this.productsId = []
      this.productsName = []
      this.productsCount = 0
      this.goodsMsrp = 0
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
    }
    // 门店选择
    // selectStore (value) {
    //   this.stMarketingCouponInfo.storeId = value
    //   this.getStGoodsInfoList(value)
    // }
  },
  components: {breadCrumb, topTips, search, commodityItem}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.prompt-icon{
    color: #999;
    font-size: 16px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    vertical-align: bottom;
    margin-left: 15px;
}
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
          // padding:16px 87px;
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
  .jianyi{
    font-size: 15px;
    padding-left: 55px;
  }
}
</style>
<!---=========================================新增样式代码 start 2018/10/20=========================================-->
<style>
.dialog-title{
  width: 100%;
  text-align: center;
  margin-top: 15px;
}
.marketDiscount .el-table__body-wrapper .el-table__body tbody .el-table__row td{
  border-bottom: none!important;
}
.marketDiscount .el-table__header-wrapper .el-table__header .has-gutter tr th{
  border-bottom: none!important;
  background-color: #fff;
}
.marketDiscount::before{
  content: none
}
.marketDiscount{
  -webkit-box-shadow:0 0 15px rgba(0, 0, 0, .1);
  -moz-box-shadow:0 0 15px rgba(0, 0, 0, .1);
  box-shadow:0 0 15px rgba(0, 0, 0, .1);
}
.marketDiscount .el-table td{
  border-bottom: none!important;
}
.marketDiscount .el-table th.is-leaf{
  border-bottom: none!important;
}
</style>
<!---=========================================新增样式代码 end 2018/10/20=========================================-->
