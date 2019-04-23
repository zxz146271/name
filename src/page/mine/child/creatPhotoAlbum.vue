<template>
    <div class="photoAlbumDetail">
        <el-form ref="form" :model="panoramaInfo" :rules="rules" label-width="120px">
            <el-form-item label="图册名称：" prop = "title">
                <el-input v-model="panoramaInfo.title" style="width:236px;" placeholder="请输入图册标题"></el-input>
            </el-form-item>
            <el-form-item label="简介：" prop = "brief">
                <el-input v-model="panoramaInfo.brief" style="width:236px;" placeholder="请输入简介"></el-input>
            </el-form-item>
            <div class="panorama">
              <span class="preser preser-text"><span style="color:#f56c6c;">*</span>上传图片(最多  50张)：</span>
                <el-form-item>
                   <!-- label="上传图片(最多50张)：" -->
                  <div v-if = "template == '6' && panoramaInfo.saveWay == 'store'">
                    <LinkItem  :imgLinks="imgLinks" v-for="(item, index) in imgLinks" :key = "index" :order = "index" :uuId="uuId" :item="item"                   
                      @fileUploadSuccess="fileUploadSuccess"
                      @cenShowMask = "cenShowMask"
                      @leaShowMask = "leaShowMask"
                      @showLink = "showLink"
                      @delLink = "delLink"
                      @delImg = "delImg"
                    />
                  </div>
                  <uploadList v-else  @setMain="setMain" :imagelist='imglist' :uuId="uuId"/>

                </el-form-item>
                <el-form-item label="分享图：">
                    <el-upload
                        :action="$config().uploadUrl"
                        :data="{bid: uuId+'wechatSharePic'}"
                        list-type="picture-card"
                        :file-list="fileList2"
                        :on-preview="handlePictureCardPreview1"
                        :on-remove="handleRemove1"
                        :on-success="handleAvatarSuccess"
                        :limit="1"
                        accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible1">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </div>
            <!-- <el-form-item label="保存到：" v-if="!isEdit"> -->
            <el-form-item label="保存到：">
                <el-radio-group v-model="panoramaInfo.saveWay" @change="relationTypeChange">
                    <el-radio   label="personal" >我的内容库</el-radio>
                    <el-radio v-if = "roleCode != 'SHOPPING_GUIDE'" label="store">品牌内容库</el-radio>
                    <!-- <el-radio v-for = "(item, index) in saveWayOptions" :key = "index" :label="item.value" >{{item.label}}</el-radio> -->
                </el-radio-group>
                <p v-if = "roleCode != 'SHOPPING_GUIDE'"><img src="/static/image/zhuyi-icon.png" alt=""><span>保存到品牌内容库，需选择正确的品牌系列</span></p>
            </el-form-item>
            <el-form-item label="品牌系列：" v-if="isShowBrand && !isEdit">
                <el-cascader
                  expand-trigger="hover"
                  :options="brandList"
                  v-model="selectedBrandList"
                  @change="selectedBrand"
                  style="width:236px;display: inline-block;">
                </el-cascader>
            </el-form-item>
            <el-form-item label="是否允许复制：">
                <el-radio-group v-model="panoramaInfo.copyWay">
                    <el-radio v-for = "(item, index) in copyWayOptions" :key = "index" :label="item.value"> {{item.label}}</el-radio>
                </el-radio-group>
                <p><img src="/static/image/zhuyi-icon.png" alt=""><span>允许复制则表示，其他用户可以通过内容编号复制此内容</span></p>
            </el-form-item>
            <!-- <el-form-item label="关联商品:">
                  <el-select v-model="checkedGoods" multiple multiple-limit = "20" placeholder="请选择">
                    <el-option
                      v-for="item in associatedGoods"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                <p><img src="/static/image/zhuyi-icon.png" alt=""><span>允许复制则表示，其他用户可以通过内容编号复制此内容</span></p>
            </el-form-item> -->
            <el-form-item style="margin-top:60px;margin-left:0;display:flex;justify-content: space-between;">
                <el-button class="cancel" @click="cancel">取消</el-button>
                <el-button type="primary" style="margin-left:120px;" @click="savePanoramaInfo('form')">保存</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
          title="选择商品"
          :visible.sync="centerDialogVisible"
          width="30%"
          >
          <div class="radioGroup">
            <allGoods :goodsList="goodsList" @chooseGoods="chooseGoods"/>
          </div>
          <span slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">提 交</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
import uploadList from '../../../components/public/uploadList'
import LinkItem from '../../../components/shop/LinkItem'
import allGoods from '../../../components/shop/allGoods'
import {getStore, setStore} from '../../../tool/Utils'

export default {
  data () {
    return {
      selectGood: {},
      template: '',
      centerDialogVisible: false,
      order: 0,
      goodsList: [],
      imgLinks: [],
      init: {
        goodsName: '',
        goodsCode: '',
        filePath: '',
        isShowMask: false,
        enclosureId: '' 
      },
      page: 1,
      limit: 10,
      imglist: [],
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      panoramaInfo: {
        title: '',
        brief: '',
        createWay: 0,
        brandSeries: '',
        saveWay: 'personal',
        copyWay: '0'
      },
      createWayOptions: ['上传全景图', '从酷家乐上传'],
      saveWayOptions: [{label: '我的内容库', value: 'personal'}, {label: '品牌内容库', value: 'store'}],
      copyWayOptions: [{label: '是', value: '0'}, {label: '否', value: '1'}],
      rules: {
        title: [
          { required: true, message: '请输入图册标题', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        brief: [
          { required: false, message: '请输入简介', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        brandSeries: [
          { required: true, message: '请输入品牌系列', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      },
      uuId: '',
      isShowBrand: false,
      brandList: [], // 品牌列表
      selectedBrandList: [],
      multiple: true,
      fileList: [],
      mainUrl: '',
      isEdit: false,
      fileList2: [],
      caseInfo: {
        state: 0
      },
      associatedGoods: [ // 关联商品列表
        {
          value: '商品1',
          name: '商品2'
        },
        {
          value: '商品1',
          name: '商品2'
        }
      ],
      checkedGoods: '', // 选中关联的商品
      roleCode: ''
    }
  },
  mounted () {
    this.getRoleCode()
    this.template = getStore('template')
    if (this.$route.query.contentId) {
      this.isEdit = true
    }
    if (!this.isEdit) {
      this.uuId = this.getUuid()
    } else {
      this.getCaseInfo()
    }
    // 默认保存到
    if (this.$route.query.typeClass === 1) {
      this.panoramaInfo.saveWay = 'personal'
    } else {
      this.panoramaInfo.saveWay = 'store'
      this.isShowBrand = true
    }
    this.imgLinks.push(this.init)
    this.getBrandList()
    this.getGoodsList()
  },
  methods: {
    fileUploadSuccess(data){
      let init = {
        enclosureId: "",
        filePath: "",
        goodsCode: "",
        goodsName: "",
        isShowMask: false
      }
      this.$set(this.imgLinks[data.order], `filePath`, data.filePath)
      this.$set(this.imgLinks[data.order], `enclosureId`, data.enclosureId)
      if(data.order < 49){
        this.imgLinks.push(init)
      }
    },
    cenShowMask(order){
      this.$set(this.imgLinks[order], `isShowMask`, true)
    },
    leaShowMask(order) {
      this.$set(this.imgLinks[order], `isShowMask`, false)
    },
    showLink(order){
      this.centerDialogVisible = true
      this.order = order
    },
    delImg(order) {
      this.imgLinks.splice(order, 1)
      this.$message.success('删除成功')
      if(this.imgLinks.length < 50){
        this.imgLinks.push(this.init)
      }
    },
    confirm() {
      if(this.selectGood.goodsCode){
        this.$set(this.imgLinks[this.order], `goodsCode`, this.selectGood.goodsCode)
        this.$set(this.imgLinks[this.order], `goodsName`, this.selectGood.goodsName)
        this.centerDialogVisible = false
      }else{
        this.$message.error('请选择链接的商品')
        return false
      }
    },
    delLink(order) {
      this.order = order
      this.$set(this.imgLinks[this.order], `goodsCode`, '')
      this.$set(this.imgLinks[this.order], `goodsName`, '')
    },
    chooseGoods(data) {
      this.selectGood = data
    },
    getGoodsList() {
      let params = {
        page: this.page,
        limit:  this.limit,
        state: 1
      }
      this.$api.getStGoodsInfoList(params).then(res => {
        if(res.code == 0){
          this.goodsList = res.data
        }
      })
    },
    setInfo () {
      this.panoramaInfo.title = this.caseInfo.headline
      this.panoramaInfo.brief = this.caseInfo.summary
      this.panoramaInfo.copyWay = this.caseInfo.ifShare
      this.panoramaInfo.saveWay = this.caseInfo.eelationType
      this.uuId = this.caseInfo.contentId
      this.caseInfo.wechatSharePic.forEach((el, index) => {
        let item = {
          url: el.filePath,
          name: el.filename,
          enclosureId: el.enclosureId
        }
        this.fileList2.push(item)
      })
      this.caseInfo.photoFile.forEach(el => {
        let item = {
          filePath: el.filePath,
          fileName: el.filename,
          enclosureId: el.enclosureId
        }
        this.imglist.push(item)
      })
    },
    creatImgLinks(imgLinks) {
      let params = []
      let obj = {}
      if(imgLinks.length < 1){
        this.$message.error('请上传图册内容')
        return false
      }
      let newImgLinks = imgLinks.splice(0, imgLinks.length-1)
      newImgLinks.forEach(temp => {
          obj = {
            filePath: temp.filePath,
            enclosureId: temp.enclosureId,
            goodsCode: temp.goodsCode
          }
          params.push(obj)
      })
      return params; 
    },
    setData () {
      let obj = {}
      obj.headline = this.panoramaInfo.title
      obj.summary = this.panoramaInfo.brief
      if (!this.panoramaInfo.title) {
        this.$message.error('图册标题为必填字段')
        return false
      } else if (this.panoramaInfo.title.length > 20 || this.panoramaInfo.title.length < 2) {
        this.$message.error('图册标题为2-20个字符')
        return false
      }
      if (this.panoramaInfo.brief.length > 31) {
        this.$message.error('图册简介不能超过30个字符')
        return false
      }
      obj.eelationType = this.panoramaInfo.saveWay
      obj.contentType = 'atlas'
      if(this.panoramaInfo.saveWay == 'personal'){
        if (this.imglist.length === 0) {
          this.$message.error('请上传图册图片')
          return false
        }
        if (this.mainUrl === null || this.mainUrl === '' || this.mainUrl === undefined) {
          this.mainUrl = this.imglist[0].filePath
        }
        obj.photoFileStr = JSON.stringify(this.imglist)
        obj.photoUrl = this.mainUrl
      }else{
        let imgsLinks = this.creatImgLinks(this.imgLinks);
        obj.photoFileStr = JSON.stringify(imgsLinks)
        obj.photoUrl = imgsLinks[0].filePath
      }
      obj.ifShare = this.panoramaInfo.copyWay
      obj.contentId = this.uuId
      if (this.panoramaInfo.saveWay === 'store' && !this.isEdit) {
        if (!this.brandId) {
          this.$message.error('请选择品牌系列')
          return false
        }
        obj.brandId = this.brandId[this.brandId.length - 1]
        obj.allBrandId = JSON.stringify(this.brandId)
      }
      return obj
    },
    getCaseInfo () {
      let params = {
        contentId: this.$route.query.contentId
      }
      this.$api.getContentById(params).then(res => {
        this.caseInfo = res.data
        this.imgLinks = res.data.photoFile
        this.imgLinks.push(this.init)
        this.setInfo()
      })
    },
    setMain (imageList, mainUrl) {
      if (imageList) {
        this.imglist = imageList
        this.mainUrl = mainUrl
      }
    },
    setBrandValue (list) {
      for (let i = 0; i < list.length; i++) {
        let element = list[i]
        element.value = element.id
        if (element.hasOwnProperty('children')) {
          this.setBrandValue(element.children)
        }
      }
    },
    // 获取商品
    // associatedGoods () {
    //   this.$api.getContentById(params).then(res => {
    //     this.associatedGoods = res.data
    //   })
    // },
    // 选择品牌
    selectedBrand (value) {
      this.brandId = value
      console.log(value)
    },
    // 获取品牌列表
    getBrandList () {
      this.$api.getContentBrandList().then(res => {
        if (res.code === 0) {
          this.brandList = res.data
          this.setBrandValue(this.brandList)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    relationTypeChange (v) {
      if (v === 'personal') {
        this.isShowBrand = false
        this.panoramaInfo.saveWay = 'personal'
      } else if (v === 'store') {
        this.isShowBrand = true
        this.panoramaInfo.saveWay = 'store'
      }
    },
    outOfRange () {
      this.$message.error('上传图片数量限制为1张')
    },
    getUuid () {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'
      var tempUuid = s.join('')
      let uuid = tempUuid.split('-').join('')
      return uuid
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess (res, file) {
      let thisFile = [{
        name: file.response.data.fileName,
        url: file.response.data.filePath,
        enclosureId: file.response.data.enclosureId
      }]
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.fileList2 = thisFile
    },
    handleRemove1 (file, fileList) {
      console.log(file, fileList)
      let params = {
        id: file.enclosureId
      }
      this.$api.deleteFileById(params).then(res => {
        if (res.code === 0) {
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.imageUrl = ''
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    handlePictureCardPreview1 (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove2 (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview2 (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 选择创建方式
    selectCreateWay () {
      console.log(this.panoramaInfo.createWay)
    },
    // 选择保存到
    selectSaveWay (e) {
      console.log(e)
    },
    // 是否允许复制
    selectCopyWay (e) {
      console.log(e, this.copyWay)
    },
    cancel () {
      if (this.$route.query.typeClass === 1) {
        if (this.caseInfo !== null && this.caseInfo.state === '1') {
          this.$router.push({path: '/mine/countAllofme/contentRecycle'})
        } else {
          this.$router.push({path: '/mine/countAllofme'})
        }
      } else if (this.$route.query.typeClass === 2) {
        if (this.caseInfo !== null && this.caseInfo.state === '1') {
          this.$router.push({path: '/store/contentRecycle'})
        } else {
          this.$router.push({path: '/store/brandContent'})
        }
      } else {
        this.$router.push({path: '/myStore/storeDynamicManagement'})
      }
    },
    savePanoramaInfo (formName) {
      let params = this.setData()
      this.$refs[formName].validate((valid) => {
        if (valid && params) {
          if (this.isEdit) {
            this.submitEditType(params)
          } else {
            this.submitAddType(params)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitAddType (params) {
      let typeClass = this.$route.query.typeClass
      // return ;
      if (typeClass === 1) {
        this.$api.mineConsumerAdd(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push({path: '/mine'})
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if (typeClass === 2) {
        this.$api.mineBrandAdd(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push({path: '/store/brandContent'})
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$api.mineStoreAdd(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push({path: '/myStore/storeDynamicManagement'})
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    submitEditType (params) {
      let typeClass = this.$route.query.typeClass
      if (typeClass === 1) {
        this.$api.mineConsumerEdit(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push({path: '/mine'})
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if (typeClass === 2) {
        this.$api.mineBrandEdit(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push({path: '/store/brandContent'})
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$api.mineStoreEdit(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push({path: '/myStore/storeDynamicManagement'})
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    getRoleCode () {
      let roleCode = getStore('roleCode')
      this.roleCode = roleCode
    }
  },
  components: {uploadList, LinkItem, allGoods}
}
</script>

<style lang="scss" scoped>
    .photoAlbumDetail{
        padding: 23px 26px 23px 26px;
        .el-form-item__content{
          margin-left: 0px;
            p{
                display: inline-block;
                font-size: 14px;
                color: #606266;
                img{
                    vertical-align: middle;
                    margin: -2px 10px 0 24px;
                }
            }
        }
        .cool{
            font{
                margin-left: 20px;
                span{
                    margin-left: 14px;
                    color: #303133;
                }
            }
        }

        .btn{
            width: 40%;
            margin: 124px auto 0;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
        .radioGroup{
          height: 400px;
          overflow: auto;
        }
    }
    .panorama{
      position: relative;
    }
    .preser {
      display: inline-block;
      position: absolute;
      width: 98px;
      margin-left: 35px;
      font-size: 14px;
      margin-right: 10px;
      line-height: 23px;
    }
    .preser-text{
      margin-left: 12px;
    }
</style>
