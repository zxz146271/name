<template>
  <div class="comm-edit">
    <div class="form-group" v-if="stGoodsInfo">
      <div class="form-block">
        <top-tips :title="necessary"></top-tips>
        <div class="form-list">
          <!-- model绑定  rules验证规则-->
          <el-form :model="stGoodsInfo" :rules="rules" ref="stGoodsInfo" label-width="150px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="品类 :" prop="goodsName">
                  <el-cascader
                    placeholder='未选择分类'
                    :options='options'
                    filterable
                    separator=">"
                    :props="cascaderConfig"
                    change-on-select
                    v-model='selectedOptions'
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="ipt">
                <el-form-item label="商品名称 :" prop="goodsName">
                  <!-- <el-cascader
                    placeholder='请输入商品名称'
                    :options='brandOptions'
                    filterable
                    separator=">"
                    :props="cascaderConfig"
                    change-on-select
                    v-model='selectedBrandOptions'
                  ></el-cascader> -->

                    <el-input v-model="stGoodsInfo.goodsName" placeholder="商品名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
              <!-- <el-col :span="12">
                <el-form-item label="商品编号" prop="goodsCode">
                  <el-input v-model="stGoodsInfo.goodsCode" disabled></el-input>
                </el-form-item>
              </el-col> -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="品牌系列 :" prop="brandOptions" class="upload-item label-star">
                  <el-cascader
                    placeholder='未选择品牌系列'
                    :options='brandOptions'
                    filterable
                    separator=">"
                    :props="cascaderConfig"
                    change-on-select
                    v-model='selectedBrandOptions'
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="12" class="ipt">
                  <el-form-item label="单位 :" prop="unit">
                    <el-input v-model="stGoodsInfo.unit" placeholder="请输入单位"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>

            <el-row>
                  <el-col :span="24">
                    <el-form-item label="销售渠道" prop="distributionChannel">
                      <!-- {{distributionChannel}}  -->
                      <el-checkbox-group v-model="distributionChannel"> 
                        <el-checkbox label="门店销售" disabled></el-checkbox> 
                        <el-checkbox label="微店销售"></el-checkbox> 
                        <!-- <el-checkbox label="积分商城兑换"></el-checkbox>  -->
                      </el-checkbox-group> 
                    </el-form-item> 
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="定价方式" prop="pricingMode">
                      <el-radio-group v-model="stGoodsInfo.pricingMode">
                        <el-radio label="议价">到店详询</el-radio>
                        <el-radio label="定价">定价</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="12" v-if="stGoodsInfo.pricingMode =='定价'">
                <el-form-item label="建议零售价" prop="goodsMsrp">
                  <el-input v-model="stGoodsInfo.goodsMsrp" placeholder="请输入零售价"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
               <!-- <el-col :span="12" :offset="12" v-if="stGoodsInfo.pricingMode =='定价' && appFlag === true ">
                <el-form-item label="微店零售价" prop="appMsrp">
                  <el-input v-model="stGoodsInfo.appMsrp"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="12" v-if="stGoodsInfo.pricingMode =='定价' && appFlag === true ">
                <el-form-item label="是否支持线上下单" prop="isAppOrder">
                  <el-radio-group v-model="stGoodsInfo.isAppOrder">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
            <el-row>
              <el-col :span="12" :offset="12">
                <el-form-item label="上架状态" prop="state">
                  <el-radio-group v-model="stGoodsInfo.state">
                    <el-radio label="0">立即上架</el-radio>
                    <el-radio label="4">不上架</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <!-- 微店信息 -->
      <!-- <div class="form-block">
        <top-tips :title="sale" @showSale="showSale"></top-tips>
         <el-collapse-transition>
          <div class="form-list" v-show="thisSale">
            <el-form :model="stGoodsInfo" :rules="rules" ref="stGoodsInfo1" label-width="200px" class="ruleForm">
              <el-row :gutter="24">
                <el-col :span="24" :offset="12">
                  <el-form-item label="是否在微店销售：">
                    <el-radio-group v-model="stGoodsInfo.MicrosShop">
                      <el-radio label="0">否</el-radio>
                      <el-radio label="4">是</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="微店销售价：">
                    <el-input v-model="stGoodsInfo.goodsLPrice" placeholder="请输入微店销售价"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24" :offset="12">
                  <el-form-item label="允许门店修改销售价：">
                    <el-radio-group v-model="stGoodsInfo.modify">
                      <el-radio label="0">允许</el-radio>
                      <el-radio label="4">不允许</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                    <el-col :span="12">
                      <el-form-item label="限制销售数量：">
                        <el-radio-group v-model="stGoodsInfo.limit">
                          <el-radio label="0">否</el-radio>
                          <el-radio label="4">是</el-radio>
                        </el-radio-group>
                        
                        <span type="text" @click="importReceivingRecords()" class="lookup" v-if="judge == false?false:true">查看门店销售数量</span>

                      </el-form-item>
                    </el-col>
                    <el-col class="lookup" :span="12" @click="lookup">查看门店销售数量</el-col>
    
                      <el-dialog
                        :visible.sync="receivingDetail"
                          width="448px"
                          :before-close="handleClose2" class="import-dialog ">
                            <div slot="title" class="center-title center-box">
                              <span class="lookup-store">查看门店销售数量（合计数量60个）</span>
                            </div>
                          <commEditstorenumber @handleClose2="handleClose2" />
                        </el-dialog> 
                    <span type="text" @click="importReceivingRecords()" class="lookup">查看门店销售数量</span>
                    

                    <el-col :span="24" :offset="12">
                      <el-form-item label="允许门店修改数量：">
                        <el-radio-group v-model="stGoodsInfo.store">
                          <el-radio label="0">允许</el-radio>
                          <el-radio label="4">不允许</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                
             
              </el-row>
              <el-row :gutter="24" v-if="distributionChannel.indexOf('积分商城兑换') !== -1">
                <el-col :span="12" :offset="12">
                  <el-form-item label="积分兑换方式" prop="integralExchangeMethod">
                    <el-radio-group v-model="stGoodsInfo.integralExchangeMethod">
                      <el-radio label="积分兑换"></el-radio>
                      <el-radio label="积分+现金兑换"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所需积分" prop="needIntegral">
                    <el-input v-model="stGoodsInfo.needIntegral"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="stGoodsInfo.integralExchangeMethod == '积分+现金兑换'">
                  <el-form-item label="所需现金" prop="needCash">
                    <el-input v-model="stGoodsInfo.needCash"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-transition>
      </div> -->


      <!-- 选填信息 -->
      <div class="form-block">
        <top-tips :title="optional" @showList="showList"></top-tips>
         <el-collapse-transition>
          <div class="form-list" v-show="thisShow">
            <el-form :model="stGoodsInfo" :rules="rules" ref="stGoodsInfo1" label-width="150px" class="ruleForm">
              <el-row :gutter="24">
                  <!-- 其他 -->
                <el-col :span="24">
                  <el-form-item label="商品顶图 :" prop="name" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: stGoodsInfo.goodsId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-success="fileUploadSuccess"
                      :limit='5'
                      :disabled= "imgShow"
                      :on-exceed="outOfRange"
                      :file-list="ruleForm.fileLists"
                      :before-upload="beforeAvatarUpload"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-col class="el-icon-par">
                      <i class="el-icon-edit"></i>  
                      <span class="el-icon-chi">最多上传5张</span>
                    </el-col>
                  
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item class="el_text_tips">
                    <div class="imageTips">
                      <i class="el-icon-warning"></i>
                      <div slot="tip" class="el-image__tip">800px*800px，不超过2M</div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                <el-form-item label="分享图片 :" prop="wechatSharePic" class="upload-item">
                    <el-upload
                      :action="$config().photoUploadUrl"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview1"
                      :on-success="fileUploadSuccess1"
                      :before-upload="beforeAvatarUpload1"
                      :limit="1"
                      :on-exceed="outOfRange1"
                      :file-list="fileLists1"
                      :on-remove="handleRemove1">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <!-- <el-tooltip class="item" effect="dark" content="提示：图片尺寸为 1000 * 800删除后，即使用系统默认图片" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip> -->
                    <el-dialog :visible.sync="dialogVisible1">
                      <img width="100%" :src="stGoodsInfo.wechatSharePic" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="24">
                  <el-form-item label="H5分享图 :" prop="name" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: stGoodsInfo.goodsId + 'H5SharePic'}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview2"
                      :on-success="fileUploadSuccess2"
                      :limit='1'
                      :disabled= "imgShow"
                      :on-exceed="outOfRange2"
                      :file-list="ruleForm.fileLists2"
                      :before-upload="beforeAvatarUpload2"
                      :on-remove="handleRemove2">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col> -->
              <el-col :span="9">
                <el-form-item label="规格 :" prop="goodsSpecifications">
                  <el-input v-model="stGoodsInfo.goodsSpecifications" maxlength="100" placeholder="请输入规格参数" class="specifications"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="型号 :" prop="goodsModel">
                  <el-input v-model="stGoodsInfo.goodsModel" placeholder="请输入型号参数"  class="specifications"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="货号 :" prop="artNo">
                  <el-input v-model="stGoodsInfo.artNo" placeholder="请输入货号参数"  class="specifications"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="24">
                <el-form-item label="商品分类" prop="classifyId">
                  <el-cascader
                    placeholder='未选择商品分类'
                    :options='classifyOptions'
                    filterable
                    separator=">"
                    :props="cascaderConfig"
                    change-on-select
                    v-model='selectedClassifyOptions'
                  ></el-cascader>
                </el-form-item>
              </el-col> -->
              <el-col :span="9">
                <el-form-item label="功能 :" prop="goodsFunction">
                  <el-input v-model="stGoodsInfo.goodsFunction" placeholder="请输入功能参数"  class="specifications"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="材质 :" prop="materialQuality">
                  <el-input v-model="stGoodsInfo.materialQuality" placeholder="请输入材质"  class="specifications"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="空间 :" prop="goodsSpace">
                  <el-input v-model="stGoodsInfo.goodsSpace"  placeholder="请输入空间参数"  class="specifications"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="风格 :" prop="goodsStyle">
                  <el-input v-model="stGoodsInfo.goodsStyle" placeholder="请输入风格"  class="specifications"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="24">
                  <el-form-item label="规格 :" prop="remarks">
                    <el-input type="textarea" v-model="stGoodsInfo.remarks" placeholder="请输入规格参数" :autosize="{ minRows: 4, maxRows: 4}" class="specifications"></el-input>
                  </el-form-item>
                </el-col>
              <el-col :span="24">
                <el-form-item label="属性规格(即将停用) :" prop="attributeSpecification">
                  <quill-edit :oldspecification="stGoodsInfo.attributeSpecification" @newspecification="newspecification" ></quill-edit>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="24">
                <el-form-item label="视频上传" prop="name" class="upload-item">
                  <el-upload
                    :action="$config().uploadUrl"
                    :data="{bid: stGoodsInfo.goodsId}"
                    :on-success="fileUploadSuccess2"
                    :file-list="ruleForm.fileLists2"
                    :on-remove="handleRemove2">
                      <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col> -->
              <el-col :span="24">
                <el-form-item label="商品介绍 :" prop="microShopDetail">
                  <quill-editor :oldcontent="stGoodsInfo.microShopDetail" @newCont="newCont"></quill-editor>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="所需现金" prop="needCash">
                  <video src="movie.ogg" controls="controls">您的浏览器不支持 video 标签。</video>
                </el-form-item>
              </el-col> -->
              </el-row>
              <!-- <el-row :gutter="24" v-if="distributionChannel.indexOf('积分商城兑换') !== -1">
                <el-col :span="12" :offset="12">
                  <el-form-item label="积分兑换方式" prop="integralExchangeMethod">
                    <el-radio-group v-model="stGoodsInfo.integralExchangeMethod">
                      <el-radio label="积分兑换"></el-radio>
                      <el-radio label="积分+现金兑换"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所需积分" prop="needIntegral">
                    <el-input v-model="stGoodsInfo.needIntegral"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="stGoodsInfo.integralExchangeMethod == '积分+现金兑换'">
                  <el-form-item label="所需现金" prop="needCash">
                    <el-input v-model="stGoodsInfo.needCash"></el-input>
                  </el-form-item>
                </el-col>
              </el-row> -->
            </el-form>
          </div>
        </el-collapse-transition>
      </div>



      <div class="opeartion">
        <div>
          <el-button class="cancle" @click="cancle()">取消</el-button>
        </div>
        <div>
          <el-button class="submit_add" @click="submit('stGoodsInfo', 'stGoodsInfo1', 'add')" :disabled= "imgShow">
            提交并继续创建
          </el-button>
          <el-button class="submit" @click="submit('stGoodsInfo', 'stGoodsInfo1')" :loading="loading" :disabled= "imgShow">
            {{loading? '提交中' : '提交'}}
          </el-button>
        </div>
      </div>
    </div>
    <!-- <el-dialog
      :visible.sync="importComm"
        width="78%"
        height="500px"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">选择类品</span>
          </div>
          <cascade @closeDialog="closeDialog"></cascade>
  </el-dialog> -->
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
import cascade from '../../../components/commodity/cascade'
import quillEditor from '../../../components/public/quillEditor'
import quillEdit from '../../../components/public/quillEdit'
// 试验
// import commEditstorenumber from '../../../components/store/commEditstorenumber'
// 试验
export default {
  data () {
    return {
      fileLists1: [],
      imgShow: false,
      loading: false,
      newsContent: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogImageUrl: '',
      thisShow: true,
      thisSale: true,
      importComm: false,
      deletFile: {},
      receivingDetail: false,
      judge:true,
      // nowDate: '',
      // 列表声明一个空对象
      stGoodsInfo: {},
      breadcrumbList: [
        { title: '商品管理', path: '/commodity' },
        { title: '编辑商品', path: '' }
      ],
      necessary: {
        title: '必填信息',
        unfold: false
      },
      optional: {
        title: '选填信息',
        unfold: true
      },
      sale: {
        title: '微店销售信息',
        unfold: true
      },
      cascaderConfig: {
        label: 'label',
        value: 'id',
        children: 'children'
      },
      selectedOptions: [],
      options: [],
      imgType: false,
      imgSize: false,
      brandOptions: [],
      selectedBrandOptions: [],
      classifyOptions: [],
      selectedClassifyOptions: [],
      distributionChannel: ['门店销售'],
      appFlag: false,
      ruleForm: {
        name: '',
        type: [],
        fileLists: [],
        fileLists2: []
      },
      rules: {
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        goodsCode: [
          { required: true, message: '请输入商品编号', trigger: 'blur' }
        ],
        goodsPrice: [
          { required: true, message: '请输入建议零售价', trigger: 'blur' }
        ],
        goodsLPrice: [
          { required: true, message: '请输入微店销售价', trigger: 'blur' }
        ],
        // date1: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // brandOptions: [
        //   { required: true, message: '请选择品牌系列', trigger: 'change' }
        // ],
        unit: [
          { required: true, message: '请输入单位', trigger: 'blur' }
        ],
        // distributionChannel: [
        //   { required: true, message: '请选择销售渠道', trigger: 'change' }
        // ],
        pricingMode: [
          { required: true, message: '请选择定价方式', trigger: 'blur' }
        ],
        isAppOrder: [
          { required: true, message: '请选择是否支持线上下单', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择上架状态', trigger: 'blur' }
        ],
        MicrosShop: [
          { required: true, message: '请选择是否在微店', trigger: 'blur' }
        ],
        store: [
          { required: true, message: '请选择是否允许门店修改', trigger: 'blur' }
        ],
        limit: [
          { required: true, message: '限制销售数量', trigger: 'blur' }
        ],
        modify: [
          { required: true, message: '允许门店修改数量', trigger: 'blur' }
        ],
        goodsMsrp: [
          { required: true, message: '请输入建议零售价', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '金额必须为数字且只保留2位小数' }
        ],
        // appMsrp: [
        //   { required: true, message: '请输入建议零售价', trigger: 'blur' },
        //   { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '金额必须为数字且只保留2位小数' }
        // ],
        integralExchangeMethod: [
          { required: true, message: '请选择积分兑换方式', trigger: 'blur' }
        ],
        needIntegral: [
          { required: true, message: '请输入所需积分', trigger: 'blur' }
        ],
        needCash: [
          { required: true, message: '请输入所需现金', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // commSort: function () {
    //   let querySort = this.$route.query.sort
    //   if (querySort) {
    //     return querySort
    //   } else {
    //   }
    // }
  },
  created () {
    // this.nowDate = new Date().getTime()
  },
  // 数据初始化方法
  mounted () {
    this.$nextTick(function () {
      this.getStGoodsInfo('reset')
    })
  },
  methods: {
    // 编辑器内容
    newCont (value) {
      this.stGoodsInfo.microShopDetail = value
    },
    newspecification (value) {
      this.stGoodsInfo.attributeSpecification = value
    },
    // 获取商品信息详情
    getStGoodsInfo (isReset) {
      var params
      if (isReset === 'newReset') {
        params = {
          goodsId: ''
        }
      } else {
        params = {
          goodsId: this.$route.query.goodsId
        }
      }
      // var params = {
      //   goodsId: this.$route.query.goodsId
      // }
      if (this.$route.query.sort) {
        this.selectedOptions = this.$route.query.sort
      }
      this.getPfBaseGoodsCategoryList()
      this.getStGoodsBrandList()
      // this.getStGoodsclassifyList()
      this.$api.getStGoodsInfo(params).then(res => {
        this.stGoodsInfo = res.data
        // this.stGoodsInfo.goodsCode = this.nowDate
        if (this.stGoodsInfo.allCategoryId) {
          this.selectedOptions = JSON.parse(this.stGoodsInfo.allCategoryId)
        }
        if (this.stGoodsInfo.allBrandId) {
          this.selectedBrandOptions = JSON.parse(this.stGoodsInfo.allBrandId)
        }
        if (this.stGoodsInfo.allClassifyId) {
          this.selectedClassifyOptions = JSON.parse(this.stGoodsInfo.allClassifyId)
        }
        if (this.stGoodsInfo.distributionChannel) {
          this.distributionChannel = JSON.parse(this.stGoodsInfo.distributionChannel)
          // for (let index = 0; index < this.distributionChannel.length; index++) {
          //   if (this.distributionChannel[index] === '微店销售') {
          //     this.appFlag = true
          //   }
          // }
        }
        // 回显小程序分享图
        if (res.data.wechatSharePic !== null && res.data.wechatSharePic !== '') {
          this.stGoodsInfo.wechatSharePic = res.data.wechatSharePic
          let item = [{
            url: this.stGoodsInfo.wechatSharePic,
            name: 'wechatSharePic',
            enclosureId: 'wechatSharePic'
          }]
          this.fileLists1 = item
        }
        if (res.data.fileUrl != null) {
          let item = {}
          let tempFullUrl = ''
          res.data.fileUrl.forEach(el => {
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
        if (res.data.h5SharePic != null) {
          let item = {}
          let tempFullUrl2 = ''
          res.data.h5SharePic.forEach(el => {
            // let param = {
            //   filePath: el.filePath
            // }
            // // 获取文件全路径
            // this.$api.getFullPath(param).then(res => {
            //   tempFullUrl2 = res.data
              item = {
                url: el.filePath,
                name: el.filename,
                enclosureId: el.enclosureId
              }
              this.ruleForm.fileLists2.push(item)
            // })
          })
        }
      })
    },
    // changeTrench () {
    //   this.appFlag = false
    //   for (let index = 0; index < this.distributionChannel.length; index++) {
    //     if (this.distributionChannel[index] === '微店销售') {
    //       this.appFlag = true
    //     }
    //   }
    // },
    // 获取商品品类列表
    getPfBaseGoodsCategoryList () {
      let params = {}
      this.$api.getPfBaseGoodsCategoryList(params).then(res => {
        this.options = res.data
      })
    },
    // 获取品牌系列列表
    getStGoodsBrandList () {
      let params = {}
      this.$api.getStGoodsBrandList(params).then(res => {
        this.brandOptions = res.data
      })
    },
    // 获取商品分类列表
    // getStGoodsclassifyList () {
    //   let params = {}
    //   this.$api.getStGoodsclassifyList(params).then(res => {
    //     this.classifyOptions = res.data
    //   })
    // },
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
    // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload1 (file) {
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
      return isLt2M && type
    },
    // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload2 (file) {
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
      return isLt2M && type
    },
    outOfRange () {
      this.$message.error('上传图片数量限制为5张')
    },
    // 文件超出范围
    outOfRange1 () {
      this.$message.error('上传图片数量限制为1张')
    },
    // 文件超出范围
    outOfRange2 () {
      this.$message.error('上传图片数量限制为1张')
    },
    //  图片文件上传成功后的回调
    fileUploadSuccess (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      this.ruleForm.fileLists = [...this.ruleForm.fileLists, ...thisFile] // 数组合并
      this.imgShow = false
    },
    // 上传小程序分享图成功后的回调
    fileUploadSuccess1 (response, file, fileList) {
      this.stGoodsInfo.wechatSharePic = response.data.filePath
      let item = [{
        url: this.stGoodsInfo.wechatSharePic,
        name: 'wechatSharePic',
        enclosureId: 'wechatSharePic'
      }]
      this.fileLists1 = item
    },
    //  上传H5分享图片成功后的回调
    fileUploadSuccess2 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      this.ruleForm.fileLists2 = [...this.ruleForm.fileLists2, ...thisFile] // 数组合并
    },
    // 删除小程序分享图
    handleRemove1 (file, fileList) {
      this.stGoodsInfo.wechatSharePic = ''
      this.fileLists1 = []
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
    },
    // 删除H5分享图片
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
          this.deletFile = file
          this.ruleForm.fileLists2.splice(this.ruleForm.fileLists2.findIndex(v => {
            return v.uid === this.deletFile.uid
          }), 1)
          this.deletFile = {}
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    // 提交
    submit (item1, item2, item3) {
      let form1 = false
      let form2 = false
      this.$refs[item1].validate((valid) => {
        if (valid) {
          form1 = true
        }
      })
      this.$refs[item2].validate((valid) => {
        if (valid) {
          form2 = true
        }
      })
      if (form1 && form2) {
        if (this.selectedOptions.length > 0) {
          let sOptionsIndex = this.selectedOptions.length
          this.stGoodsInfo.categoryId = this.selectedOptions[sOptionsIndex - 1]
          this.stGoodsInfo.allCategoryId = JSON.stringify(this.selectedOptions)
        } else {
          this.$message.error('商品品类必须选择')
          return
        }
        if (this.selectedBrandOptions.length > 0) {
          let sOptionsIndex = this.selectedBrandOptions.length
          this.stGoodsInfo.brandId = this.selectedBrandOptions[sOptionsIndex - 1]
          this.stGoodsInfo.allBrandId = JSON.stringify(this.selectedBrandOptions)
        } else {
          this.$message.error('品牌系列必须选择')
          return
        }
        if (this.distributionChannel.length > 0) {
          this.stGoodsInfo.distributionChannel = JSON.stringify(this.distributionChannel)
        } else {
          this.$message.error('销售渠道必须选择')
          return
        }
        if (this.selectedClassifyOptions.length > 0) {
          let sOptionsIndex = this.selectedClassifyOptions.length
          this.stGoodsInfo.classifyId = this.selectedClassifyOptions[sOptionsIndex - 1]
          this.stGoodsInfo.allClassifyId = JSON.stringify(this.selectedClassifyOptions)
        }
        if (this.ruleForm.fileLists.length > 0) {
          this.stGoodsInfo.firstPictureUrl = this.ruleForm.fileLists[0].url
        }
        if (this.stGoodsInfo.pricingMode === '议价') {
          this.stGoodsInfo.goodsMsrp = '0'
          // this.stGoodsInfo.appMsrp = '0'
        }
        this.loading = true
        let params = this.stGoodsInfo
        if (arguments.length === 2) {
          if (this.stGoodsInfo.versionNo === 'save') {
            this.$api.saveStGoodsInfo(params).then(res => {
              if (res.code === 0) {
                this.loading = false
                this.$message.success(res.msg)
                if (item3) {
                  this.loading = false
                  this.$refs['ruleForm'].resetFields()
                } else {
                  this.loading = false
                  this.$router.push({path: '/store/commManage'})
                }
              } else {
                this.loading = false
                this.$message.error(res.msg)
              }
            })
          } else {
            this.$api.editStGoodsInfo(params).then(res => {
              if (res.code === 0) {
                this.loading = false
                this.$message.success('编辑成功')
                this.$router.push({path: '/store/commManage'})
              } else {
                this.loading = false
                this.$message.error(res.msg)
              }
            })
          }
        } else if (arguments.length === 3) {
          if (this.stGoodsInfo.versionNo === 'save') {
            this.$api.saveStGoodsInfo(params).then(res => {
              if (res.code === 0) {
                this.loading = false
                this.$message.success(res.msg)
                this.stGoodsInfo = {}
                this.selectedBrandOptions = []
                this.ruleForm.fileLists = []
                // this.ruleForm.fileLists2 = []
                this.getStGoodsInfo('newReset')
              } else {
                this.loading = false
                this.$message.error(res.msg)
              }
            })
          } else {
            this.$api.editStGoodsInfo(params).then(res => {
              if (res.code === 0) {
                this.loading = false
                this.$message.success('编辑成功')
                this.stGoodsInfo = {}
                this.selectedBrandOptions = []
                this.ruleForm.fileLists = []
                // this.ruleForm.fileLists2 = []
                this.getStGoodsInfo('newReset')
              } else {
                this.loading = false
                this.$message.error(res.msg)
              }
            })
          }
        }
      }
    },
    cancle () {
      this.$router.push({path: '/store/commManage'})
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreview1 (file) {
      this.dialogVisible1 = true
    },
    handlePictureCardPreview2 (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    showSale (data) {
      if (data) {
        this.thisSale = data
      } else {
        this.thisSale = false
      }
    },
    showList (data) {
      if (data) {
        this.thisShow = data
      } else {
        this.thisShow = false
      }
    },
    importCommodity () {
      this.importComm = true
    },
    handleClose () {
      this.importComm = false
    },
    closeDialog (value) {
      this.importComm = false
      // 选择的商品分类
    },
    importReceivingRecords () {
      this.receivingDetail = true
      console.log(this.receivingDetail);
      // this.submemberInfo = val
    },
    handleClose2 () {
      this.receivingDetail = false
    }
  },
  // components: { breadCrumb, topTips, cascade, quillEditor, quillEdit, commEditstorenumber}
  components: { breadCrumb, topTips, cascade, quillEditor, quillEdit}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
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
    // margin-top: 20px;
    .form-block {
      background-color: #fff;
      .form-list {
        margin-top: 28px;
        // padding: 0 70px;
        .upload-item {
          .el-form-item__content {
            line-height: 0;
          }
        }
        .el_text_tips {
          .el-form-item__content {
            .imageTips {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              height:18px;
              color:#B5B5B5;
              .el-icon-warning {
                font-size: 14px;
                position: relative;
                top: 2px;
                margin-right: 5px;
              }
              .el-image__tip {
                font-size:16px;
                font-weight:400;
                line-height:27px;
              }
            }
          }
        }
      }
    }
    .opeartion {
      display: flex;
      justify-content: space-between;
      margin: 50px 0;
      button {
        padding: 13px 40px;
      }
      .submit {
        @include linear-grad;
        color: #fff;
        padding: 14px 40px;
        border: 0;
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
  .import-dialog {
    .left-title {
      position: absolute;
      color: #fff;
      .bottom {
        position: absolute;
        width: 90px;
        height: 28px;
        left: 0;
        z-index: 10;
        background-color: $main-color;
        &::after {
          content: '';
          @include triangle-right(14px,12px,$main-color);
          position: absolute;
          right: -24px;
        }
      }
      .top {
        position: relative;
        width: 82px;
        height: 28px;
        display: inline-block;
        background-color: $gray-color;
        line-height: 28px;
        text-align: center;
        color: $text-main-color;
        font-size: $xs-size;
        &::after {
          content: '';
          @include triangle-right(14px,12px,$gray-color);
          position: absolute;
          right: -24px;
        }
        &::before {
          content: '';
          position: absolute;
          left: 0px;
          width: 4px;
          background-color: $main-color;
          height: 100%;
        }
      }
    }
  }
}
// hover变红色
.lookup{
  text-decoration:underline;
  color:#606266;
  border:none;
  margin-left: 44px;
}
.lookup:hover{
  color:#f00;
  cursor:pointer;
}

.el-dialog {
  min-width: 448px;
}
.lookup-store{
  font-size:16px;
  font-family:Source Han Sans SC;
  font-weight:500;
  line-height:22px;
  color: #606266;
  // margin-left: 40px;
}
.center-box{
  border-bottom: 1px dashed #C0C4CC;
  height: 42px;
  text-align: center;
}
.ipt{
  width: 600px;
}
.el-icon-edit{
  color: #B5B5B5;
  border: 1px solid #B5B5B5;
  border-radius: 50px;
  padding: 2px;
  font-size: 12px;
}
.el-icon-chi{
  color: #B5B5B5;
  font-size: 16px;
}
.el-icon-par{
  margin-top: 10px;
  margin-left: 10px;
}
.specifications{
  width: 50%;
}
</style>
