<!--********************************************          团购新增编辑页面                  ************************************-->
<template>
  <div class="comm-edit">
    <div class="top">
    </div>
    <div class="form-group">
      <div class="form-block">
        <top-tips :title="necessary"></top-tips>
        <div class="form-list">
          <el-form :model="StMarketingGroupBookingInfo" :rules="rules" ref="StMarketingGroupBookingInfo" label-width="120px" class="ruleForm">
            <el-row :gutter="24">
               <el-col :span="12">
                <el-form-item label="当前门店" >
                  <div class="block" style="font-weigth:blod" >
                     {{storeName}}
                  </div>
                </el-form-item>
             </el-col>
              <el-col :span="12">
                <el-form-item label="团购名称" prop="groupBookingName">
                  <el-input v-model="StMarketingGroupBookingInfo.groupBookingName" placeholder="请输入团购名称" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
               <!---=========================================新增代码 start 2018/10/20=========================================-->
              <el-col>
                <el-form-item label="是否参加联盟活动" prop="isRelateLeague" class="label-star">
                  <el-radio-group v-model="StMarketingGroupBookingInfo.isRelateLeague" @change="isJionAllianceAct()">
                    <el-radio :disabled="activeState == 1 ? true : false" label="N">不参加</el-radio>
                    <el-radio :disabled="activeState == 1 ? true : false" label="Y">参加</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-show="chooseAllianceAct">
                <el-form-item label="选择联盟活动" prop="leagueId">
                    <el-button @click="activeState == 1 ? '' : chooseAct()">选择</el-button>
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
                  <el-table class="marketDiscount" :data="allianceActInfo" max-height ="250" align="center" style="margin-top:15px">
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
                <div  v-if =" this.leagueName!= ''" style="margin-left:29px;margin-top:10px">
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
               <el-form-item v-show="leagueAct_date" label="联盟活动时间" prop="pageStartEndTime">
                  <div class="block"></div>
                  <el-date-picker  :disabled=flag v-model="StMarketingGroupBookingInfo.pageStartEndTime" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item v-show="activity_date" label="活动时间" prop="pageStartEndTime">
                  <div class="block"></div>
                  <el-date-picker :disabled="activeState == 1 ? true : false"  v-model="StMarketingGroupBookingInfo.pageStartEndTime" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
             </el-col>
             <!--uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 修改代码 end 2018/10/22uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu-->
               <!-- <el-col :span="12">
                <el-form-item label="活动时间" prop="pageStartEndTime">
                  <div class="block"></div>
                  <el-date-picker  v-model="StMarketingGroupBookingInfo.pageStartEndTime" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
             </el-col> -->
               <el-col :span="12">
                <el-form-item label="开始展示日期" prop="showTime">
                  <div class="block"></div>
                    <el-date-picker
                      :disabled="activeState == 1 ? true : false"
                      v-model="StMarketingGroupBookingInfo.showTime"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
             </el-col>
              <el-col :span="24">
                <el-form-item label="团购商品" prop="pageGoodsId">
                    <el-button @click="activeState == 1 ? '' : assignProduceClick()" >选择商品</el-button>
                </el-form-item>
              </el-col>
                <!-- 显示已经选中的商品名字 -->
              <el-col :span="12" v-show="productsV_Show" >
                <!-- <el-form-item :label="'已选中'+productsCount+'件商品:'" prop="totalAmount"> -->
                      <el-form-item :label="'已选中商品:'" prop="totalAmount">
                  <li >
                  {{this.productsName}}
                </li>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="建议零售价" ><font color="red">{{this.goodsMsrp}}</font> 元</el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="支付方式" prop="payType">
                  <el-radio-group v-model="StMarketingGroupBookingInfo.payType" @change="payTypeChange">
                    <el-radio :disabled="activeState == 1 ? true : false" label="deposit">定金</el-radio>
                    <el-radio :disabled="activeState == 1 ? true : false" label="all">全款</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="团款总价" prop="groupMoney">
                  <el-input v-model="StMarketingGroupBookingInfo.groupMoney" placeholder="请输入团款总价" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="定金金额" prop="deposit" v-if="depositIsShow">
                  <el-input v-model="StMarketingGroupBookingInfo.deposit"  :placeholder="depositDisShowMsg" :disabled="depositDisShow || activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="尾款金额" ><font color="red">{{balance}}</font>元</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="活动说明" prop="useExplanation">
                  <el-input type="textarea" rows="10" v-model="StMarketingGroupBookingInfo.useExplanation"  placeholder="请输入活动说明" :disabled="activeState == 1 ? true : false" ></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12" :offset="12">
                  <el-form-item label="活动图片" prop="name" class="upload-item label-star">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: StMarketingGroupBookingInfo.groupBookingId}"
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
               <el-col :span="12" :offset="12">
                  <el-form-item label="活动说明图片" prop="name" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: instructionsId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview1"
                      :on-success="fileUploadSuccess1"
                      :limit= 1
                      :on-exceed = "outOfRange"
                      :file-list="ruleForm1.fileLists"
                      :before-upload="beforeAvatarUpload1"
                      :on-remove="handleRemove1">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible1">
                      <img width="100%" :src="dialogImageUrl1" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
               <el-col :span="12" :offset="12">
                  <el-form-item label="小程序分享图片" prop="name" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview2"
                      :on-success="fileUploadSuccess2"
                      :limit= 1
                      :on-exceed = "outOfRange"
                      :file-list="fileLists2"
                      :before-upload="beforeAvatarUpload"
                      :on-remove="handleRemove2">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-tooltip class="item" effect="dark" content="提示：图片尺寸为 1000 * 800删除后，即使用系统默认图片" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible2">
                      <img width="100%" :src="dialogImageUrl2" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12" :offset="12">
                  <el-form-item label="H5分享图片" prop="name" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: StMarketingGroupBookingInfo.groupBookingId + 'H5SharePic'}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview3"
                      :on-success="fileUploadSuccess3"
                      :limit= 1
                      :on-exceed = "outOfRange"
                      :file-list="ruleForm.fileLists2"
                      :before-upload="beforeAvatarUpload"
                      :on-remove="handleRemove3">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-tooltip class="item" effect="dark" content="提示：图片尺寸为 1000 * 800删除后，即使用系统默认图片" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col> -->
            </el-row>
          </el-form>
        </div>
      </div>
      <!-- 团购规则 -->
      <div class="form-block">
        <top-tips :title="optional" ></top-tips>
          <div class="form-list">
          <el-form :model="StMarketingGroupBookingInfo" :rules="rules" ref="StMarketingGroupBookingInfo1" label-width="130px" class="ruleForm">
            <el-row :gutter="24">
                  <el-col :span="12">
                <el-form-item label="满n人团购成功" prop="successfulPeople" >
                  <el-input v-model="StMarketingGroupBookingInfo.successfulPeople" placeholder="请输入团购人数" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="12">
                <el-form-item label="每人最多购买数量" prop="everyoneBuyMax" >
                  <el-input v-model="StMarketingGroupBookingInfo.everyoneBuyMax" placeholder="请输入每人最多购买数量" :disabled="activeState == 1 ? true : false"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="是否限定团购总人数" prop="whetherLimitPeople">
                  <el-radio-group v-model="StMarketingGroupBookingInfo.whetherLimitPeople"  @change="islimitPeopleChange">
                    <el-radio :disabled="activeState == 1 ? true : false" label="0">是</el-radio>
                    <el-radio :disabled="activeState == 1 ? true : false" label="1">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
                <el-col :span="12">
                <el-form-item label="团购总人数" prop="limitPeopleNum" v-if="limitPeopleShow" >
                  <el-input v-model="StMarketingGroupBookingInfo.limitPeopleNum" placeholder="请输入团购总人数" @blur="limitPeopleNumChange" :disabled="activeState == 1 ? true : false"></el-input>
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
          <el-button class="submit" @click="save(['StMarketingGroupBookingInfo','StMarketingGroupBookingInfo1'])">
            提交
          </el-button>
        </div>
      </div>
    </div>
       <!--  添加商品弹弹出框 -->
    <el-dialog
      :visible.sync="chooseProducts"
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
            <el-button type="primary" @click="addProductWinOk('StMarketingGroupBookingInfo')">确定</el-button>
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
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogImageUrl: '',
      dialogImageUrl1: '',
      dialogImageUrl2: '',
      thisShow: false,
      num8: 1,
      necessary: {
        title: '团购-基础信息',
        unfold: false
      },
      optional: {
        title: '团购规则',
        unfold: false
      },
      depositIsShow: false,
      activeState: '',
      rules: {
        groupBookingName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { max: 20, message: '长度不大于20 个字符', trigger: 'blur' }
        ],
        // 活动开始时间
        pageStartEndTime: [
          { required: true, message: '请选择活动时间段', trigger: 'blur' }
        ],
        // 展示时间
        showTime: [
          { required: true, message: '请选择活动开始展示时间', trigger: 'blur' }
        ],
        // 商品id
        pageGoodsId: [{ required: false, message: '请选择商品', trigger: 'blur' }
        ],
        // 支付方式
        payType: [
          { required: true, message: '请选择支付方式', trigger: 'blur' }
        ],
        // 团购价
        groupMoney: [
          { required: true, message: '请填写团款金额', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '团款金额为数字且最多保留两位小数', trigger: 'blur' },
          { max: 8, message: '金额最大为 8 个字符', trigger: 'blur' },
          { pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, message: '团款金额必须大于0', trigger: 'blur' }
        ],
        // 定金
        deposit: [
          { required: false, message: '请填写定金金额', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '定金金额为数字且只能保留两位小数', trigger: 'blur' },
          { max: 8, message: '金额最大为 8 个字符', trigger: 'blur' },
          { pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, message: '定金金额必须大于0', trigger: 'blur' }
        ],
        // 团购成功人数
        successfulPeople: [
          { required: true, message: '只能输入大于0的整数', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' },
          { max: 10, message: '输入最多10个字符', trigger: 'blur' },
          { pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, message: '团购成功人数必须大于0', trigger: 'blur' }
        ],
        // 每人最多允许购买数量
        everyoneBuyMax: [
          { required: true, message: '请填写每人最多允许购买数量', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' },
          { max: 10, message: '输入最多10个字符', trigger: 'blur' },
          { pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, message: '限购数必须大于0', trigger: 'blur' }
        ],
        // 是否限制参团人数
        whetherLimitPeople: [
          { required: true, message: '请选择是否限制参团人数', trigger: 'blur' }
        ],
        // 参团总人数
        limitPeopleNum: [
          { required: false, message: '请填写团购总人数', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' },
          { max: 10, message: '输入最多10个字符', trigger: 'blur' },
          { pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, message: '参团总人数必须大于0', trigger: 'blur' }
        ],
        useExplanation: [
          { min: 0, max: 1000, message: '长度在 0 到 1000 个字符', trigger: 'blur' }
        ]
      },
      // 定义商品隐藏属性名
      chooseProducts: false,
      // 声明一个  商品  的对象
      stMarketingProductsInfo: {},
      // 选中的商品名称
      productsName: '',
      // 商品定价
      goodsMsrp: 0,
      // 选中的商品数量
      productsCount: 0,
      // 商品定价方式
      pricingMode: '',
      // 商品数量显示文本控制
      productsV_Show: false,
      // 商品查询框
      productsSearchValue: null,
      // 团购对象
      StMarketingGroupBookingInfo: { },
      pageGoodsId: '',
      // 当前表单选择的商品id
      thisFormHasProducts: '',
      ruleForm: {
        name: '',
        type: [],
        fileLists: [],
        fileLists2: []
      },
      ruleForm1: {
        name: '',
        type: [],
        fileLists: []
      },
      fileLists2: [],
      // 是否限制人数
      limitPeopleShow: false,
      // 尾款金额
      balance: 0,
      // 活动说明图片关联ID
      instructionsId: '',
      depositDisShow: true,
      depositDisShowMsg: '请先输入团款价',
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
      flag: true
      // ------- date:2018-10-20
    // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 新增代码 end 2018/10/22aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    }
  },
  computed: {
    ...mapGetters(['powerButton', 'storeName', 'storeId'])
  },
  mounted () {
    this.activeState = this.$route.query.state
    //  获取团购信息
    this.getStMarketingGroupById()
  },
  created () {
    this.getStGoodsInfoList()
    // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 start 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
    this.getAllianceActInfoList()
    // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 end 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
  },
  watch: {
    'StMarketingGroupBookingInfo.deposit' () {
      var reg = new RegExp('([0]*)([1-9]+[0-9]+)', 'g')
      this.StMarketingGroupBookingInfo.deposit.toString().replace(reg, '$2')
      if (this.StMarketingGroupBookingInfo.deposit !== '' && this.StMarketingGroupBookingInfo.deposit !== 0) {
        if (this.StMarketingGroupBookingInfo.groupMoney !== null && this.StMarketingGroupBookingInfo.deposit - this.StMarketingGroupBookingInfo.groupMoney >= 0) {
          this.$message.error('定金金额不得大于团款额')
          this.StMarketingGroupBookingInfo.deposit = 0
        }
        this.balance = this.StMarketingGroupBookingInfo.groupMoney - this.StMarketingGroupBookingInfo.deposit
        this.balance = Number(this.balance).toFixed(2)
        this.balance = !isNaN(this.balance) ? this.balance : 0
      }
    },
    'StMarketingGroupBookingInfo.groupMoney' () {
      // 判断团款价不得大于商品原价
      if (this.goodsMsrp <= this.StMarketingGroupBookingInfo.groupMoney && this.goodsMsrp !== 0 && this.pricingMode === '定价') {
        this.$message.error('团购总价不能大于等于建议零售价')
        this.StMarketingGroupBookingInfo.groupMoney = 0
      }
      if (this.StMarketingGroupBookingInfo.deposit !== '' && this.StMarketingGroupBookingInfo.deposit !== 0) {
        this.balance = this.StMarketingGroupBookingInfo.groupMoney - this.StMarketingGroupBookingInfo.deposit
        this.balance = Number(this.balance).toFixed(2)
        this.balance = !isNaN(this.balance) ? this.balance : 0
      }
      if (this.StMarketingGroupBookingInfo.groupMoney !== '' && this.StMarketingGroupBookingInfo.groupMoney !== null) {
        this.depositDisShow = false
        this.depositDisShowMsg = '请输入定金金额'
      } else {
        this.depositDisShow = true
        this.depositDisShowMsg = '请先输入团款价'
      }
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
      console.log(this.radio + this.leagueName)
    },
    // 参与联盟活动点击事件
    isJionAllianceAct () {
      // 不参加
      if (this.StMarketingGroupBookingInfo.isRelateLeague === 'N') {
        this.chooseAllianceAct = false
        this.allianceAct_Show = false
        if (this.league_Name != null && this.activity_date === false) {
          this.StMarketingGroupBookingInfo.pageStartEndTime = null
        }
        this.leagueAct_date = false
        this.activity_date = true
        // 参加
      } else if (this.StMarketingGroupBookingInfo.isRelateLeague === 'Y') {
        this.isRelate_League = 'Y'
        this.chooseAllianceAct = true
        if (this.league_Name != null && this.activity_date === false) {
          this.StMarketingGroupBookingInfo.pageStartEndTime = null
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
      this.StMarketingGroupBookingInfo.pageStartEndTime = [new Date(this.actStart_Time), new Date(this.actEnd_Time)]
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
    limitPeopleNumChange () {
      // 判断团款价不得大于商品原价
      if (this.StMarketingGroupBookingInfo.whetherLimitPeople === '0' && this.StMarketingGroupBookingInfo.successfulPeople !== null && this.StMarketingGroupBookingInfo.successfulPeople !== 0) {
        if (this.StMarketingGroupBookingInfo.limitPeopleNum - this.StMarketingGroupBookingInfo.successfulPeople < 0) {
          this.$message.error('团购总人数应不能小于满n人数量，否则会造成团购无法拼成')
          this.StMarketingGroupBookingInfo.limitPeopleNum = ''
        }
      }
    },
    // 获取团购详情
    getStMarketingGroupById () {
      let tempFullUrl = ''
      let item = {}
      let params = {
        groupBookingId: this.$route.query.groupBookingId
      }
      this.$api.getStMarketingGroupById(params).then(res => {
        this.StMarketingGroupBookingInfo = res.data
        // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 start 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        // 如果为空 设置为默认不参加
        if (this.StMarketingGroupBookingInfo.isRelateLeague === null) {
          this.StMarketingGroupBookingInfo.isRelateLeague = 'N'
        } else if (this.StMarketingGroupBookingInfo.isRelateLeague === 'N') {
          this.leagueAct_date = false
          this.activity_date = true
        } else if (this.StMarketingGroupBookingInfo.isRelateLeague === 'Y') {
          this.leagueAct_date = true
          this.chooseAllianceAct = true
          this.activity_date = false
        }
        //  新增代码 start 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        if (this.StMarketingGroupBookingInfo.leagueId != null && this.StMarketingGroupBookingInfo.leagueId !== '') {
          this.chooseAct(1)
          this.leagueName = this.StMarketingGroupBookingInfo.leagueName
          this.allianceAct_Show = true
        }
        // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 end 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        //  新增代码 end 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        // 活动说明图片
        if (this.StMarketingGroupBookingInfo.groupBookingId !== null) {
          this.instructionsId = this.StMarketingGroupBookingInfo.groupBookingId.substring(0, 25) + 'explain'
        }
        // 定金
        if (this.StMarketingGroupBookingInfo.deposit !== null) {
          this.StMarketingGroupBookingInfo.deposit = this.StMarketingGroupBookingInfo.deposit.toString()
        }
        // 团款金额
        if (this.StMarketingGroupBookingInfo.groupMoney !== null) {
          this.StMarketingGroupBookingInfo.groupMoney = this.StMarketingGroupBookingInfo.groupMoney.toString()
        }
        // 满n人成团
        if (this.StMarketingGroupBookingInfo.successfulPeople !== null) {
          this.StMarketingGroupBookingInfo.successfulPeople = this.StMarketingGroupBookingInfo.successfulPeople.toString()
        }
        // 团购总人数
        if (this.StMarketingGroupBookingInfo.limitPeopleNum !== null) {
          this.StMarketingGroupBookingInfo.limitPeopleNum = this.StMarketingGroupBookingInfo.limitPeopleNum.toString()
        }
        // 每人最多限买数量
        if (this.StMarketingGroupBookingInfo.everyoneBuyMax !== null) {
          this.StMarketingGroupBookingInfo.everyoneBuyMax = this.StMarketingGroupBookingInfo.everyoneBuyMax.toString()
        }
        if (this.StMarketingGroupBookingInfo.payType === null) {
          this.StMarketingGroupBookingInfo.payType = 'deposit'
          this.depositIsShow = true
          this.rules.deposit[0].required = true
          // 定金
        } else if (this.StMarketingGroupBookingInfo.payType === 'deposit') {
          this.depositIsShow = true
          this.rules.deposit[0].required = true
          // 全款
        } else {
          this.depositIsShow = false
        }
        if (this.StMarketingGroupBookingInfo.whetherLimitPeople === null) {
          // 限制
          this.StMarketingGroupBookingInfo.whetherLimitPeople = '1'
          this.limitPeopleShow = false
          this.rules.limitPeopleNum[0].required = false
        } else if (this.StMarketingGroupBookingInfo.whetherLimitPeople === 1) {
          this.StMarketingGroupBookingInfo.whetherLimitPeople = '1'
          this.limitPeopleShow = false
          // 全款
        } else {
          this.StMarketingGroupBookingInfo.whetherLimitPeople = '0'
          this.limitPeopleShow = true
          this.rules.limitPeopleNum[0].required = true
        }
        if (this.StMarketingGroupBookingInfo.goodsId != null && this.stMarketingProductsInfo.goodsId !== '') {
          this.assignProduceClick(1)
          this.productsV_Show = true
        }
        this.thisFormHasProducts = this.StMarketingGroupBookingInfo.goodsId
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
        // 获取文件全路径 活动说明
        if (res.data.explainFileUrl != null) {
          res.data.explainFileUrl.forEach(el => {
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
              this.ruleForm1.fileLists.push(item)
            })
          })
        }
        // 获取文件全路径 H5分享图片
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
              this.ruleForm.fileLists2.push(item)
            })
          })
        }
        // 回显微信分享图片
        if (res.data.wechatSharePic !== null && res.data.wechatSharePic !== '') {
          this.StMarketingGroupBookingInfo.wechatSharePic = res.data.wechatSharePic
          let item = [{
            url: this.StMarketingGroupBookingInfo.wechatSharePic,
            name: 'wechatSharePic',
            enclosureId: 'wechatSharePic'
          }]
          this.fileLists2 = item
        }
      })
    },
    cancel () {
      this.$router.push({path: '/marketing/storeMarket/activityCollage'})
    },
    // 支付方式选择
    payTypeChange () {
      // 需要定金
      if (this.StMarketingGroupBookingInfo.payType === 'deposit') {
        this.depositIsShow = true
        this.rules.deposit[0].required = true
        // 不需要定金
      } else if (this.StMarketingGroupBookingInfo.payType === 'all') {
        this.depositIsShow = false
        this.StMarketingGroupBookingInfo.deposit = null
        this.rules.deposit[0].required = false
      }
    },
    islimitPeopleChange () {
      // 需要限定团购人数
      if (this.StMarketingGroupBookingInfo.whetherLimitPeople === '0') {
        this.limitPeopleShow = true
        this.rules.limitPeopleNum[0].required = true
        // 不需要定金
      } else if (this.StMarketingGroupBookingInfo.whetherLimitPeople === '1') {
        this.limitPeopleShow = false
        this.StMarketingGroupBookingInfo.limitPeopleNum = null
        this.rules.limitPeopleNum[0].required = false
      }
    },
    // 选择商品按钮点击事件
    assignProduceClick (value) {
      if (value === 1) {
      } else {
        this.chooseProducts = true
      }
    },
    save (formName) {
      var _this = this
      // 保存表单校验结果
      let correctList = []
      for (var value of formName) {
        _this.$refs[value].validate(valid => {
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
        if (this.StMarketingGroupBookingInfo.isRelateLeague === 'Y') {
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
        // 设置参数
        let params = {
          // 团购ID
          groupBookingId: this.StMarketingGroupBookingInfo.groupBookingId,
          // 版本号
          versionNo: this.StMarketingGroupBookingInfo.versionNo,
          // 团购名称
          groupBookingName: this.StMarketingGroupBookingInfo.groupBookingName,
          // 商品ID
          goodId: this.pageGoodsId,
          // 活动开始时间
          startTimeStr: this.StMarketingGroupBookingInfo.pageStartEndTime[0],
          // 活动结束时间
          endTimeStr: this.StMarketingGroupBookingInfo.pageStartEndTime[1],
          //  活动展示时间
          showTimeStr: this.StMarketingGroupBookingInfo.showTime,
          // 团购支付方式
          payType: this.StMarketingGroupBookingInfo.payType,
          // 团款价
          groupMoney: this.StMarketingGroupBookingInfo.groupMoney,
          // 定金
          deposit: this.StMarketingGroupBookingInfo.deposit,
          // 活动说明
          useExplanation: this.StMarketingGroupBookingInfo.useExplanation,
          // 团购成功人数
          successfulPeople: this.StMarketingGroupBookingInfo.successfulPeople,
          // 每人限购上限制
          everyoneBuyMax: this.StMarketingGroupBookingInfo.everyoneBuyMax,
          // 是否限制团购人数
          whetherLimitPeople: this.StMarketingGroupBookingInfo.whetherLimitPeople,
          // 最大参加人数
          limitPeopleNum: this.StMarketingGroupBookingInfo.limitPeopleNum,
          // 小程序分享图
          wechatSharePic: this.StMarketingGroupBookingInfo.wechatSharePic,
          // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 start 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
          // 是否参加活动
          isRelateLeague: this.StMarketingGroupBookingInfo.isRelateLeague,
          // 关联活动ID
          leagueId: this.leagueId
          // uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 新增代码 end 2018/10/22 uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        }
        if (params.versionNo === '' || params.versionNo === null) {
          this.$api.marketingGroupAddSave(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.$router.push({ path: '/marketing/storeMarket/activityCollage' })
              this.$message.success(res.msg)
            } else {
              // 失败提示
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$api.marketingGroupEditSave(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.$router.push({ path: '/marketing/storeMarket/activityCollage' })
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
    showList (data) {
      if (data) {
        this.thisShow = data
      } else {
        this.thisShow = false
      }
    },
    // 加载商品列表
    getStGoodsInfoList () {
      let params = {
        goodsName: this.productsSearchValue,
        state: 0,
        storeId: this.storeInfo
      }
      this.$api.getStGoodsInfoAllList(params).then(res => {
        this.stMarketingProductsInfo = res.data
        this.clearAllProduct()
        if (res.data != null) {
          this.stMarketingProductsInfo.forEach(item => {
            item.choose = false
            if (this.$route.query.productsId === item.goodsId) {
              item.choose = true
              this.pageGoodsId = item.goodsId
              this.productsName = item.goodsName
              this.goodsMsrp = item.goodsMsrp
              this.pricingMode = item.pricingMode
              this.productsCount++
              this.productsV_Show = true
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
    // 选择商品弹窗关闭按钮
    addProductsWinClose () {
      this.chooseProducts = false
      this.clearAllProduct()
      this.productsV_Show = false
      this.stMarketingProductsInfo.forEach(item => {
        item.choose = false
      })
    },
    // 添加商品确认框
    addProductWinOk () {
      this.chooseProducts = false
      // 获取所有商品信息  用于判断是否选中
      this.clearAllProduct()
      this.stMarketingProductsInfo.forEach(item => {
        if (item.choose === true) {
          this.pageGoodsId = item.goodsId
          this.productsName = item.goodsName
          this.productsCount++
          this.goodsMsrp = item.goodsMsrp
          this.pricingMode = item.pricingMode
        }
        this.productsV_Show = true
      })
    },
    // 商品弹出框查询条件
    searchValue (value) {
      this.productsSearchValue = value
      this.getStGoodsInfoList()
    },
    clearAllProduct () {
      this.pageGoodsId = ''
      this.productsName = ''
      this.goodsMsrp = 0
      this.productsCount = 0
      this.pricingMode = ''
    },
    // 监听复选框选择事件
    checkBokChange (value) {
      this.clearAllProduct()
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
    // 文件上传相关
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件上传相关
    handlePictureCardPreview1 (file) {
      this.dialogImageUrl1 = file.url
      this.dialogVisible1 = true
    },
    // 小程序分享图上传
    handlePictureCardPreview2 (file) {
      this.dialogImageUrl2 = file.url
      this.dialogVisible2 = true
    },
    // H5分享图片上传
    handlePictureCardPreview3 (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
    //  文件上传成功后的回调
    fileUploadSuccess1 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      // this.ruleForm.fileLists 图片列表
      this.ruleForm1.fileLists = [...this.ruleForm1.fileLists, ...thisFile] // 数组合并
    },
    // 上传小程序分享图成功后的回调
    fileUploadSuccess2 (response, file, fileList) {
      this.StMarketingGroupBookingInfo.wechatSharePic = response.data.filePath
      let item = [{
        url: this.StMarketingGroupBookingInfo.wechatSharePic,
        name: 'wechatSharePic',
        enclosureId: 'wechatSharePic'
      }]
      this.fileLists2 = item
    },
    //  上传H5分享图片成功后的回调
    fileUploadSuccess3 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      // this.ruleForm.fileLists 图片列表
      this.ruleForm.fileLists2 = [...this.ruleForm.fileLists2, ...thisFile] // 数组合并
    },
    // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt20M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        type = false
        return type
      }
      if (!isLt20M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt20M && type
    }, // 删除文件
    beforeAvatarUpload1 (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt20M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        type = false
        return type
      }
      if (!isLt20M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt20M && type
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
    handleRemove1 (file, fileList) {
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
          this.ruleForm1.fileLists.splice(this.ruleForm1.fileLists.findIndex(v => {
            return v.uid === this.deletFile.uid
          }), 1)
          this.deletFile = ''
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    // 删除小程序分享图
    handleRemove2 (file, fileList) {
      this.StMarketingGroupBookingInfo.wechatSharePic = ''
      this.fileLists2 = []
    },
    // 删除H5分享图片
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
          this.ruleForm.fileLists2.splice(this.ruleForm.fileLists2.findIndex(v => {
            return v.uid === this.deletFile.uid
          }), 1)
          this.deletFile = ''
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    // 文件超出范围
    outOfRange () {
      this.$message.error('上传图片数量限制为1张')
    }
  },
  components: { breadCrumb, topTips, commodityItem, search }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.comm-edit {
  margin: 0 auto;
  padding-top: 106px;
  .top {
    .change-sort {
      text-align: center;
      margin-top: 16px;
      .sort {
        display: inline-block;
        margin: 0 8px;
        li {
          display: inline-block;
          &:nth-child(n + 2)::before {
            content: '>';
          }
        }
      }
      .change {
        padding: 5px 12px;
        color: $text-gray-color;
        &:hover {
          color: $main-color;
        }
      }
    }
  }
  .form-group {
    margin-top: 20px;
    .form-block {
      .form-list {
        margin-top: 28px;
        padding: 0 70px;
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
          margin-right: 50%;
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
      }
    }
    .opeartion {
      display: flex;
      justify-content: center;
      margin: 50px 0;
      button {
        padding: 15px 57px;
      }
      .submit {
        @include linear-grad;
        color: #fff;
        // padding: 16px 87px;
        border: 0;
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
    .popup-search{
    display: flex;
    justify-content: center;
  }
  .comm-list{
    max-height: 300px;
    overflow-y: auto;
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
