<!-- ***********************************************  秒商品新增  编辑页面 ***************************************** -->
<template>
  <div class="comm-edit">
    <div class="top">
      <!-- <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb> -->
    </div>
    <div class="form-group">
      <div class="form-block">
        <top-tips :title="necessary"></top-tips>
        <div class="form-list">
          <el-form :model="stMarketingSeckillInfo" :rules="rules" ref="stMarketingSeckillInfo" label-width="140px" class="ruleForm">
            <el-row :gutter="24">
               <el-col :span="12">
                <el-form-item label="当前门店" >
                  <div class="block" style="font-weigth:blod" >
                     {{storeName}}
                  </div>
                </el-form-item>
             </el-col>
              <el-col :span="12">
                <el-form-item label="活动名称" prop="seckillName">
                  <el-input v-model="stMarketingSeckillInfo.seckillName" placeholder="请输入活动名称" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
              <!---=========================================新增代码 start 2018/10/20=========================================-->
              <el-col>
                <el-form-item label="是否参加联盟活动" prop="isRelateLeague" class="label-star">
                  <el-radio-group v-model="stMarketingSeckillInfo.isRelateLeague" @change="isJionAllianceAct()">
                    <el-radio label="N" :disabled="activeState == 1 ? true : false">不参加</el-radio>
                    <el-radio label="Y" :disabled="activeState == 1 ? true : false">参加</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-show="chooseAllianceAct">
                <el-form-item label="选择联盟活动" prop="leagueId">
                    <el-button @click="activeState == 1 ? '' : chooseAct() ">选择</el-button>
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
                  <P slot="title" class="dialog-title">
                      <span>选择联盟活动</span>
                    </P>
                    <div class="popup-search">
                      <search style="margin-top:-25px" @searchValue="searchActValue"></search>
                    </div>
                  <div style="padding:0 28px;">
                  <el-table class="marketDiscount" :data="allianceActInfo" align="center" max-height ="250" style="margin-top:15px">
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
                  <el-date-picker  :disabled=flag v-model="stMarketingSeckillInfo.getStartEndTime" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item v-show="activity_date" label="活动时间段" prop="getStartEndTime">
                  <div class="block"></div>
                  <el-date-picker :disabled="activeState == 1 ? true : false" v-model="stMarketingSeckillInfo.getStartEndTime" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
             </el-col>
             <!--uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 修改代码 end 2018/10/22uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu-->
               <el-col :span="12">
                <el-form-item label="使用时间段" prop="useStartEndTime">
                  <div class="block"></div>
                  <el-date-picker :disabled="activeState == 1 ? true : false" v-model="stMarketingSeckillInfo.useStartEndTime" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
             </el-col>
              <!--门店信息下拉框-->
              <!-- <el-col :span="12">
                 <el-form-item label="可选门店" prop="storeId">
                <el-select v-model="stMarketingSeckillInfo.storeId" @change="selectStore">
                  <el-option  multiple='false' v-for="item in loadStoreTree" :key="item.id" :label="item.label" :value="item.id"></el-option>
                  </el-select>
              </el-form-item>
              </el-col> -->
              <el-col :span="24">
                <el-form-item label="秒杀商品" prop="pageGoodsId">
                    <el-button @click="activeState == 1 ? '' : assignProduceClick()" >选择商品</el-button>
                </el-form-item>
              </el-col>
              <!-- 显示已经选中的商品名字 -->
              <el-col :span="12" v-show="productsV_Show">
                <!-- <el-form-item :label="'已选'+productsCount+'商品:'" prop="totalAmount"> -->
                  <el-form-item :label="'已选商品:'">
                  <li >
                  {{this.productsName}}
                </li>
                </el-form-item>
              </el-col>
                <!-- <el-col :span="12">
                  <el-form-item label="是否需要定金" prop="isNeedDeposit">
                  <el-radio-group v-model="stMarketingSeckillInfo.isNeedDeposit" @change="isNeedDepositChange">
                    <el-radio label="Y">是</el-radio>
                    <el-radio label="N">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
                  <el-col :span="12">
                <el-form-item label="定金" prop="deposit">
                  <el-input v-model="stMarketingSeckillInfo.deposit" placeholder="请输入定金" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
                 <el-col :span="12">
                <el-form-item label="秒杀价" prop="discountPrice">
                  <el-input v-model="stMarketingSeckillInfo.discountPrice" placeholder="请输入秒杀价格" :disabled="activeState == 1 ? true : false"></el-input>
                  <span class="form-title">原价：{{this.goodsMsrp}}元</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总数量" prop="totalAmount">
                  <el-input v-model="stMarketingSeckillInfo.totalAmount" placeholder="请输入总数量" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="每人限领" prop="limitNumber">
                  <el-input v-model="stMarketingSeckillInfo.limitNumber" placeholder="请输入每人限购" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
                  <el-col :span="12">
                <el-form-item label="活动说明" prop="useExplanation">
                  <el-input type="textarea" rows="10" v-model="stMarketingSeckillInfo.useExplanation" placeholder="请输入活动说明" :disabled="activeState == 1 ? true : false" ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="咨询电话" prop="consultingPhone" >
                  <el-input v-model="stMarketingSeckillInfo.consultingPhone" placeholder="请输入咨询电话"></el-input>
                </el-form-item>
              </el-col> -->
                <el-col :span="12" :offset="12">
                  <el-form-item label="活动图片" prop="name" class="upload-item label-star">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: stMarketingSeckillInfo.seckillId}"
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

                  <el-form-item label="小程序分享图" prop="wechatSharePic" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
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
                    <el-tooltip class="item" effect="dark" content="提示：图片尺寸为 1000 * 800删除后，即使用系统默认图片" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible1">
                      <img width="100%" :src="stMarketingSeckillInfo.wechatSharePic" alt="">
                    </el-dialog>
                  </el-form-item>

                  <!-- <el-form-item label="H5分享图" prop="name" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: seckillH5SharePic}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview3"
                      :on-success="fileUploadSuccess3"
                      :limit= 1
                      :on-exceed = "outOfRange"
                      :file-list="ruleForm3.fileLists"
                      :before-upload="beforeAvatarUpload"
                      :on-remove="handleRemove3">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-tooltip class="item" effect="dark" content="建议图片上传尺寸为 750 * 500 px" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible3">
                      <img width="100%" :src="dialogImageUrl3" alt="">
                    </el-dialog>
                  </el-form-item> -->
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
          <el-button class="submit"  @click="submit(['stMarketingSeckillInfo'])">
            提交
          </el-button>
        </div>
      </div>
    </div>
      <!--  添加商品弹弹出框 -->
    <el-dialog
      :visible.sync="productsBut"
        width="35%"
        class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">添加商品</span>
          </div>
          <div class="popup-search">
            <search @searchValue="searchValue"></search>
          </div>
          <div class="comm-list">
            <commodity-item  @checkBokChange="checkBokChange" v-for="(item, index) in stMarketingProductsInfo" :key="index" :item="item"></commodity-item>
          </div>
          <div class="btns">
            <el-button @click="addProductsWinClose()">取消</el-button>
            <el-button type="primary" @click="addProductWinOk('stMarketingSeckillInfo')">确定</el-button>
          </div>
  </el-dialog>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
// import commodityItem from '../../../components/commodity/commodityItem'
import commodityItem from '../../../components/public/commodityItem'
import search from '../../../components/public/search'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      radioList: [
        {
          type: '商品',
          isActive: false
        }
      ],
      fileLists1: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible3: false,
      dialogImageUrl: '',
      dialogImageUrl3: '',
      thisShow: false,
      num8: 1,
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
      activeState: '',
      rules: {
        // 秒商品名称验证
        seckillName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
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
        // 优惠券自定义内容
        seckillContent: [
          { required: false, message: '请输入优惠券自定义内容', trigger: 'blur' }
        ],
        // 发行总数验证
        totalAmount: [
          { required: true, message: '请输入总数量', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        // 每人限领 验证
        limitNumber: [
          { required: true, message: '请输入每人限领优惠券数量', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        // 电话号码验证
        consultingPhone: [
          { min: 1, max: 13, message: '长度在 1 到 13 个字符', trigger: 'blur' }
        ],
        deposit: [
          { required: true, message: '请填写定金金额', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '定金金额为数字且最多保留两位小数', trigger: 'blur' },
          { min: 0, max: 8, message: '长度在 0 到 8 个字符', trigger: 'blur' }
        ],
        discountPrice: [
          { required: true, message: '请填写秒杀价', trigger: 'blur' },
          { max: 8, message: '长度在 0 到 8 个字符', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9][1-9]{1,2})?$/, message: '秒杀价金额大于0且最多保留两位小数', trigger: 'blur' }
        ],
        // 活动说明验证
        useExplanation: [
          { min: 0, max: 1000, message: '长度在 0 到 1000 个字符', trigger: 'blur' }
        ]
      },
      // 初始化一个秒商品对象
      stMarketingSeckillInfo: {},
      // 定义商品隐藏属性名
      productsBut: false,
      // 定义一个自定义文本框
      userDefinedBut: false,
      // 接收选中的商品ID
      productsId: '',
      // 选中的商品名称
      productsName: '',
      // 选中的商品数量
      productsCount: 0,
      // 商品数量显示文本控制
      productsV_Show: false,
      // 声明一个  商品  的对象
      stMarketingProductsInfo: {},
      // 商品查询框
      productsSearchValue: null,
      // 已经参加过活动的商品列表
      // hasUsedProductsList: [],
      // 当前表单选择的商品id
      thisFormHasProducts: '',
      thisFormHasProductsVersion: '',
      // depositIsShow: false,
      // 商品定价
      goodsMsrp: 0,
      loadStoreTree: [],
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
      // 秒杀微信分享图
      seckillH5SharePic: ''
      // ------- date:2018-10-20
    // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 新增代码 end 2018/10/22aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

    }
  },
  computed: {
    ...mapGetters(['powerButton', 'storeName', 'storeId'])
  },
  // 秒商品数据初始化
  mounted () {
    // this.loadMarketingStoreTree()
    // 获取单个秒信息
    this.getStMarketingSeckillById()
    this.activeState = this.$route.query.state
  },
  created () {
    this.getStGoodsInfoList()
    // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 start 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
    this.getAllianceActInfoList()
    // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 end 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
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
      if (this.stMarketingSeckillInfo.isRelateLeague === 'N') {
        this.chooseAllianceAct = false
        this.allianceAct_Show = false
        if (this.league_Name != null && this.activity_date === false) {
          this.stMarketingSeckillInfo.getStartEndTime = null
        }
        this.leagueAct_date = false
        this.activity_date = true
        // 参加
      } else if (this.stMarketingSeckillInfo.isRelateLeague === 'Y') {
        this.isRelate_League = 'Y'
        this.chooseAllianceAct = true
        if (this.league_Name != null && this.activity_date === false) {
          this.stMarketingSeckillInfo.getStartEndTime = null
        }
        // this.leagueAct_date = true
        // this.activity_date = false
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
      this.stMarketingSeckillInfo.getStartEndTime = [new Date(this.actStart_Time), new Date(this.actEnd_Time)]
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
    // 选择商品按钮点击事件
    assignProduceClick (value) {
      if (value === 1) {
      } else {
        this.productsBut = true
      }
    },
    // 添加商品确认框
    addProductWinOk () {
      this.productsBut = false
      // 获取所有商品信息  用于判断是否选中
      this.clearAllProduct()
      this.stMarketingProductsInfo.forEach(item => {
        if (item.choose === true) {
          this.productsId = item.goodsId
          this.productsName = item.goodsName
          this.productsCount++
          this.goodsMsrp = item.goodsMsrp
          this.productsV_Show = true
        }
      })
    },
    // 调用方法 查询内容
    getStMarketingSeckillById () {
      let tempFullUrl = ''
      let item = {}
      let params = {
        seckillId: this.$route.query.seckillId
      }
      this.$api.getStMarketingSeckillById(params).then(res => {
        this.stMarketingSeckillInfo = res.data
        this.seckillH5SharePic = res.data.seckillId + 'H5SharePic'
        // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 start 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        // 如果为空 设置为默认不参加
        if (this.stMarketingSeckillInfo.isRelateLeague === null) {
          this.stMarketingSeckillInfo.isRelateLeague = 'N'
        } else if (this.stMarketingSeckillInfo.isRelateLeague === 'N') {
          this.leagueAct_date = false
          this.activity_date = true
        } else if (this.stMarketingSeckillInfo.isRelateLeague === 'Y') {
          this.leagueAct_date = true
          this.chooseAllianceAct = true
          this.activity_date = false
        }
        // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 end 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        // 定金
        if (this.stMarketingSeckillInfo.deposit !== null) {
          this.stMarketingSeckillInfo.deposit = this.stMarketingSeckillInfo.deposit.toString()
        }
        // 折扣
        if (this.stMarketingSeckillInfo.discountPrice !== null) {
          this.stMarketingSeckillInfo.discountPrice = this.stMarketingSeckillInfo.discountPrice.toString()
        }
        // 总数量
        if (this.stMarketingSeckillInfo.totalAmount !== null) {
          this.stMarketingSeckillInfo.totalAmount = this.stMarketingSeckillInfo.totalAmount.toString()
        }
        // 限制领取
        if (this.stMarketingSeckillInfo.limitNumber !== null) {
          this.stMarketingSeckillInfo.limitNumber = this.stMarketingSeckillInfo.limitNumber.toString()
        }
        this.thisFormHasProducts = this.stMarketingSeckillInfo.goodsId
        this.thisFormHasProductsVersion = this.stMarketingSeckillInfo.versionNo
        if (this.stMarketingSeckillInfo.goodsId != null && this.stMarketingSeckillInfo.goodsId !== '') {
          this.assignProduceClick(1)
          this.productsV_Show = true
        }
        // if (this.stMarketingSeckillInfo.isNeedDeposit === null) {
        //   this.stMarketingSeckillInfo.isNeedDeposit = 'N'
        // } else if (this.stMarketingSeckillInfo.isNeedDeposit === 'Y') {
        //   this.depositIsShow = true
        //   this.rules.deposit[0].required = true
        // } else {
        //   this.depositIsShow = false
        // }
        // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 start 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        if (this.stMarketingSeckillInfo.leagueId != null && this.stMarketingSeckillInfo.leagueId !== '') {
          this.chooseAct(1)
          this.leagueName = this.stMarketingSeckillInfo.leagueName
          this.allianceAct_Show = true
        }
        // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 end 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        // 回显小程序分享图
        if (res.data.wechatSharePic !== null && res.data.wechatSharePic !== '') {
          this.stMarketingSeckillInfo.wechatSharePic = res.data.wechatSharePic
          let item = [{
            url: this.stMarketingSeckillInfo.wechatSharePic,
            name: 'wechatSharePic',
            enclosureId: 'wechatSharePic'
          }]
          this.fileLists1 = item
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
        // 获取H5图片全路径
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
            })
          })
        }
      })
    },
    // 加载商品弹窗
    getStGoodsInfoList () {
      let params = {
        goodsName: this.productsSearchValue,
        state: 0
        // storeId: this.storeId
      }
      this.$api.getStGoodsInfoAllList(params).then(res => {
        this.stMarketingProductsInfo = res.data
        this.clearAllProduct()
        if (this.stMarketingProductsInfo !== null) {
          this.stMarketingProductsInfo.forEach(item => {
            item.choose = false
            if (this.$route.query.productsId === item.goodsId) {
              item.choose = true
              this.productsId = item.goodsId
              this.productsName = item.goodsName
              this.goodsMsrp = item.goodsMsrp
              this.productsV_Show = true
              this.productsCount++
            }
            if (item.activityType === '1' || item.activityType === '2') {
              item.useState = true
            } else {
              item.useState = false
            }
            if (this.$route.query.productsId === item.goodsId) {
              item.useState = false
            }
          })
        }
      })
    },
    // 商品弹出框查询条件
    searchValue (value) {
      this.productsSearchValue = value
      this.getStGoodsInfoList()
    },
    // 选择商品弹窗关闭按钮
    addProductsWinClose () {
      this.productsBut = false
      this.clearAllProduct()
      // this.productsV_Show = false
      // this.stMarketingProductsInfo.forEach(item => {
      //   item.choose = false
      // })
      this.getStGoodsInfoList()
    },
    // 取消按钮
    cancel () {
      this.$router.push({path: '/marketing/storeMarket/activityGrab'})
    },
    // 监听复选框  设置单选
    checkBokChange (value) {
      this.stMarketingProductsInfo.forEach(item => {
        item.choose = false
        if (this.value !== null) {
          if (value.indexOf(item.goodsId) > -1) {
            item.choose = true
            this.pageGoodsId = item.goodsId
            this.productsName = item.goodsName
            this.productsCount++
          }
          this.productsV_Show = true
        }
      })
    },
    // 提交表单
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
        // 验证是否填写了 活动开始时间 结束时间
        if (_this.productsCount === 0) {
          this.$message({
            message: '请选择商品',
            type: 'warning'
          })
          return
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
        if (this.stMarketingSeckillInfo.isRelateLeague === 'Y') {
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
        // 将页面对象赋予参数传递给后台
        let params = {
          // 优惠券名字
          seckillName: this.stMarketingSeckillInfo.seckillName,
          getStartTimeStr: this.stMarketingSeckillInfo.getStartEndTime[0],
          // 生效  结束时间
          getEndTimeStr: this.stMarketingSeckillInfo.getStartEndTime[1],
          // 使用时间
          useStartTimeStr: this.stMarketingSeckillInfo.useStartEndTime[0],
          // 使用时间
          useEndTimeStr: this.stMarketingSeckillInfo.useStartEndTime[1],
          // 使用范围
          // useScope: this.stMarketingSeckillInfo.useScope,
          useScope: 'assignProduce',
          // 自定义优惠信息
          seckillContent: this.stMarketingSeckillInfo.seckillContent,
          // 发行量
          totalAmount: this.stMarketingSeckillInfo.totalAmount,
          // 限领取数量
          limitNumber: this.stMarketingSeckillInfo.limitNumber,
          // 活动说明
          useExplanation: this.stMarketingSeckillInfo.useExplanation,
          // 咨询电话
          consultingPhone: this.stMarketingSeckillInfo.consultingPhone,
          // 优惠券使用范围 (商品ID)
          goodsId: this.productsId,
          // 秒商品类型
          seckillType: 1,
          // 秒杀ID
          seckillId: this.stMarketingSeckillInfo.seckillId,
          // 版本号
          versionNo: this.stMarketingSeckillInfo.versionNo,
          // 秒杀价
          discountPrice: this.stMarketingSeckillInfo.discountPrice,
          // 指定门店 ID
          storeId: this.storeId,
          seckillCode: this.stMarketingSeckillInfo.seckillCode,
          // 是否需要定金
          // isNeedDeposit: this.stMarketingSeckillInfo.isNeedDeposit,
          isNeedDeposit: 'Y',
          // 指定门店 ID
          deposit: this.stMarketingSeckillInfo.deposit,
          // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 start 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
          // 是否参加活动
          isRelateLeague: this.stMarketingSeckillInfo.isRelateLeague,
          // 关联活动ID
          leagueId: this.leagueId,
          // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 end 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
          // 关联活动ID
          wechatSharePic: this.stMarketingSeckillInfo.wechatSharePic
        }
        if (params.versionNo != null && params.versionNo !== '') {
          this.$api.editSaveStMarketingSeckillList(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.$router.push({path: '/marketing/storeMarket/activityGrab'})
              this.$message.success(res.msg)
            } else {
              // 失败提示
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$api.addStMarketingSeckillList(params).then(res => {
            if (res.code === 0) {
            // 成功返回列表页面
              this.$router.push({path: '/marketing/storeMarket/activityGrab'})
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
    // 删除H5文件
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
    // 删除微信分享图片
    // 删除小程序分享图
    handleRemove1 (file, fileList) {
      this.stMarketingSeckillInfo.wechatSharePic = ''
      this.fileLists1 = []
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreview1 (file) {
      this.dialogVisible1 = true
    },
    handlePictureCardPreview3 (file) {
      this.dialogImageUrl3 = file.url
      this.dialogVisible3 = true
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
    clearAllProduct () {
      this.productsId = ''
      this.productsName = ''
      this.productsCount = 0
    },
    // 文件上传相关
    fileUploadSuccess (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      // this.ruleForm.fileLists 图片列表
      this.ruleForm.fileLists = [...this.ruleForm.fileLists, ...thisFile] // 数组合并
    },
    // H5分享图片
    fileUploadSuccess3 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      // this.ruleForm.fileLists 图片列表
      this.ruleForm3.fileLists = [...this.ruleForm3.fileLists, ...thisFile] // 数组合并
    },
    // 上传微信分享图片成功后的回调
    // 上传小程序分享图成功后的回调
    fileUploadSuccess1 (response, file, fileList) {
      this.stMarketingSeckillInfo.wechatSharePic = response.data.filePath
      let item = [{
        url: this.stMarketingSeckillInfo.wechatSharePic,
        name: 'wechatSharePic',
        enclosureId: 'wechatSharePic'
      }]
      this.fileLists1 = item
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
    // 门店选择
    selectStore (value) {
      this.stMarketingSeckillInfo.storeId = value
      // 获取已经使用的商品
      this.getStGoodsInfoList()
    },
    // 加载门店树信息
    loadMarketingStoreTree () {
      let params = {
        couponId: null
      }
      this.$api.loadMarketingStoreTree(params).then(res => {
        let resCount = 0
        res.data.forEach(item => {
          if (item.isChoose === true) {
            this.loadStoreTree = item.id
            this.stMarketingSeckillInfo.storeId = item.id
            resCount++
          }
        })
        if (resCount === 0) {
          this.loadStoreTree = res.data
        }
      })
    }
  },
  components: {breadCrumb, topTips, commodityItem, search}
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
        .form-title {
          width: 200px;
          position: absolute;
          color: $text-adorn-color;
          font-size: $xs-size;
          right: -200px;
          top: 0;
          padding-left: 20px;
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
    .popup-search{
    display: flex;
    justify-content: center;
  }
  .popup-checkbox{
    border-bottom: 1px solid $border-color;
    padding: 4px 0 4px 14px;
  }
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
  .comm-list{
    max-height: 300px;
    overflow-y: auto;
  }
    .popup-search{
    display: flex;
    justify-content: center;
  }
   .popup-checkbox{
    border-bottom: 1px solid $border-color;
    padding: 4px 0 4px 14px;
  }
  .jianyi{
    font-size: 15px;
    padding-left: 75px;
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
