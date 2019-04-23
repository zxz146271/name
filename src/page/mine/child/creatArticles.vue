<template>
  <div class="container">
    <div class="contain-top">
      <minesearch :title="title"></minesearch>
      <div class="contans">
        <div class="contansbox">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item class="redItem" prop="headline">
               <span class="casetitble"><span style="color:#fd4343;">*&nbsp;</span>{{title}}：</span>
              <el-input v-model="form.headline" style="width:236px;display:inline-block" :placeholder="'请输入'+title"></el-input>
            </el-form-item>
            <el-form-item >
               <span class="infortitble" prop="summary">简介：</span>
              <el-input v-model="form.summary" style="width:236px;display:inline-block" placeholder="请输入简介" class="brief"></el-input>
            </el-form-item>
          </el-form>
          <div class="preserwrapper">

            <span class="preser">详情：</span>
            <detailContent :title="form.headline" :detailJson="detailJson" :creatArticles="creatArticles" :uuId="uuId" />
          </div>
          <div class="shareimg">
            <span class="thelabeler"><span style="color:#fd4343;">*&nbsp;</span>封面图：</span>
            <el-upload
              class="avatar-uploader"
              :action="$config().uploadUrl"
              :data="{bid: uuId}"
              list-type="picture-card"
              :on-exceed="outOfRange1"
              :on-preview="handlePictureCardPreview2"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload2"
              accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
              :limit="1"
              :file-list="fileList"
              :on-remove="handleRemove2">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible2">
              <img width="100%" :src="imageUrl2" alt="">
            </el-dialog>
          </div>

          <div class="shareimg">
            <span class="thelabeler thelabeler-share"><span>&nbsp;&nbsp;</span>分享图：</span>
            <el-upload
              class="avatar-uploader"
              :action="$config().uploadUrl"
              :data="{bid: uuId+'wechatSharePic'}"
              list-type="picture-card"
              :on-exceed="outOfRange1"
              :on-preview="handlePictureCardPreview"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
              :limit="1"
              :file-list="fileList2"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="imageUrl" alt="">
            </el-dialog>
          </div>

          <el-col class="saveto" v-if="!isEdit">
            <span class="preservation common">保存到：</span>
            <el-radio v-model="form.eelationType" @change="brandChange" label="personal">我的内容库</el-radio>
            <el-radio v-if = "roleCode != 'SHOPPING_GUIDE'" v-model="form.eelationType" @change="brandChange" label="store">品牌内容库</el-radio>
            <img v-if = "roleCode != 'SHOPPING_GUIDE'" src="/static/image/zhuyi-icon.png" alt class="iconpng">
            <span v-if = "roleCode != 'SHOPPING_GUIDE'" class="bush">保存到品牌内容库，需选择正确的品牌系列</span>
          </el-col>
          <el-col class="brand" v-if="isShowBrand && !isEdit">
            <span class="preserlist common"><span style="color:#fd4343;">*&nbsp;</span>品牌系列：</span>
            <el-cascader
              expand-trigger="hover"
              :options="brandList"
              v-model="selectedBrandList"
              @change="selectedBrand"
              style="width:236px;display: inline-block;">
            </el-cascader>
          </el-col>
          <el-col class="presebox saveto">
            <span class="prese common">是否共享：</span>
            <el-radio v-model="form.radio2" label="0">是</el-radio>
            <el-radio v-model="form.radio2" label="1">否</el-radio>
            <img src="/static/image/zhuyi-icon.png" alt class="iconpng">
            <span class="bush">允许复制则表示，其他用户可以通过内容编号复制此内容</span>
          </el-col>
        </div>
        <div class="bton">
          <el-button class="cancel" @click="cancel">取消</el-button>
          <el-button class="keep" @click="submit('form')">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import minesearch from '../../../components/public/mineSearch'
import allclass from '../../../components/header/allclass'
import detailContent from '../../../components/detailEdit/detailContent'
import {getStore, setStore} from '../../../tool/Utils'

export default {
  data () {
    return {
      creatArticles: '文章',
      title: '文章标题',
      loading: false,
      allClassType: { typeClass: 1, typeBtn: 1 },
      number: 1,
      num: 0,
      form: {
        headline: '', // 案例标题
        summary: '', // 概述
        eelationType: '', // 保存到
        brandId: '', // 品牌系列ID
        radio2: '0' // 是否共享
      },
      rules: {
        headline: [
          { required: true, message: '请输入案例标题', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        summary: [
          { required: false, message: '请输入简介', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      },
      inputVisible: false,
      inputValue: '',
      imageUrl: '',
      imageUrl2: '',
      tags: [
        { name: '床', type: 'warning' },
        { name: '沙发', type: 'warning' }
      ],
      value8: '',
      detailJson: {
        type: 'case',
        blocks: []
      },
      brandList: [], // 品牌列表
      selectedBrandList: [],
      uuId: '',
      articlesInfo: {},
      fileList2: [],
      fileList: [],
      photoUrl: [],
      dialogVisible: false,
      dialogVisible2: false,
      isShowBrand: false,
      isEdit: false,
      roleCode: ''
    }
  },
  components: {
    minesearch,
    allclass,
    detailContent
  },
  mounted () {
    this.getRoleCode()
    this.getBrandList()
    if (this.$route.query.contentId) {
      this.isEdit = true
      this.getArticlesInfo()
    } else {
      this.uuId = this.getUuid()
    }
    // 默认保存到
    if (this.$route.query.typeClass === 1) {
      this.form.eelationType = 'personal'
    } else {
      this.form.eelationType = 'store'
      this.isShowBrand = true
    }
  },
  methods: {
    setInfo () {
      this.form.headline = this.articlesInfo.headline
      this.form.summary = this.articlesInfo.summary
      this.form.eelationType = this.articlesInfo.eelationType
      this.form.radio2 = this.articlesInfo.ifShare
      this.detailJson = JSON.parse(this.articlesInfo.content)
      this.uuId = this.articlesInfo.contentId
      this.articlesInfo.wechatSharePic.forEach(el => {
        let item = {
          url: el.filePath,
          name: el.filename,
          enclosureId: el.enclosureId
        }
        this.fileList2.push(item)
      })
      this.articlesInfo.photoFile.forEach(el => {
        let item = {
          url: el.filePath,
          name: el.filename,
          enclosureId: el.enclosureId
        }
        this.fileList.push(item)
        this.photoUrl.push(item)
      })
    },
    setData () {
      let obj = {}
      obj.headline = this.form.headline
      if (!this.form.headline) {
        this.$message.error('文章标题为必填字段')
        return false
      } else if (this.form.headline.length > 20 || this.form.headline.length < 2) {
        this.$message.error('文章标题为2-20个字符')
        return false
      }
      obj.summary = this.form.summary
      if (this.form.summary.length > 31) {
        this.$message.error('文章简介不能超过30个字符')
        return false
      }
      obj.eelationType = this.form.eelationType
      obj.contentType = 'article'
      obj.content = JSON.stringify(this.detailJson)
      obj.ifShare = this.form.radio2
      obj.contentId = this.uuId
      if (obj.content.search('"type":"video"') !== -1) {
        obj.videoFlag = 1
      } else {
        obj.videoFlag = 0
      }
      if (this.photoUrl.length < 1) {
        this.$message.error('请上传封面图片')
        return false
      }
      obj.photoUrl = this.photoUrl[0].url
      if (this.form.eelationType === 'store' && !this.isEdit) {
        if (!this.brandId) {
          this.$message.error('请选择品牌系列')
          return false
        }
        obj.brandId = this.brandId[this.brandId.length - 1]
        obj.allBrandId = JSON.stringify(this.brandId)
      }
      return obj
    },
    cancel () {
      if (this.$route.query.typeClass === 1) {
        if (this.articlesInfo !== null && this.articlesInfo.state === '1') {
          this.$router.push({path: '/mine/countAllofme/contentRecycle'})
        } else {
          this.$router.push({path: '/mine/countAllofme'})
        }
      } else if (this.$route.query.typeClass === 2) {
        if (this.articlesInfo !== null && this.articlesInfo.state === '1') {
          this.$router.push({path: '/store/contentRecycle'})
        } else {
          this.$router.push({path: '/store/brandContent'})
        }
      } else {
        this.$router.push({path: '/myStore/storeDynamicManagement'})
      }
    },
    getArticlesInfo () {
      let params = {
        contentId: this.$route.query.contentId
      }
      this.$api.getContentById(params).then(res => {
        this.articlesInfo = res.data
        this.setInfo()
      })
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        let params = this.setData()
        if (valid && params) {
          if (this.$route.query.contentId) {
            this.submitEditType(params)
          } else {
            this.submitAddType(params)
          }
          return
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitAddType (params) {
      if (this.$route.query.typeClass === 1) {
        this.$api.mineConsumerAdd(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push({path: '/mine'})
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if (this.$route.query.typeClass === 2) {
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
            this.$router.push({path: '/mine/countAllofme'})
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
      console.log(uuid)
      return uuid
    },
    brandChange (v) {
      console.log(v)
      if (v === 'personal') {
        this.isShowBrand = false
        this.form.eelationType = 'personal'
      } else if (v === 'store') {
        this.isShowBrand = true
        this.form.eelationType = 'store'
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
    //  清除标签
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        var vote = {}
        vote.name = inputValue
        vote.type = 'warning'
        this.tags.push(vote)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleAvatarSuccess (res, file) {
      console.log(file)
      let thisFile = [{
        name: file.response.data.fileName,
        url: file.response.data.filePath,
        enclosureId: file.response.data.enclosureId
      }]
      this.imageUrl = URL.createObjectURL(file.raw)
      this.fileList2 = thisFile
    },
    handleAvatarSuccess2 (res, file) {
      let thisFile = [{
        name: file.response.data.fileName,
        url: file.response.data.filePath,
        enclosureId: file.response.data.enclosureId
      }]
      this.photoUrl = thisFile
      this.fileList = thisFile
      this.imageUrl2 = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('图片格式不正确')
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    beforeAvatarUpload2 (file) {
      console.log(this.uuId)
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('图片格式不正确')
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handlePictureCardPreview (file) {
      this.dialogVisible = true
    },
    handlePictureCardPreview2 (file) {
      this.dialogVisible2 = true
    },
    outOfRange1 () {
      this.$message.error('上传图片数量限制为1张')
    },
    handleRemove (file, fileList) {
      console.log(file)
      let param = {
        id: file.enclosureId
      }
      // 删除文件
      this.$api.deleteFile(param).then(res => {
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
    handleRemove2 (file, fileList) {
      let param = {
        id: file.enclosureId ? file.enclosureId : file.response.data.enclosureId
      }
      // 删除文件
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.imageUrl2 = ''
          this.photoUrl = []
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    getRoleCode () {
      let roleCode = getStore('roleCode')
      this.roleCode = roleCode
    }
  }
}
</script>

<style scoped>
/* 案例标题开始.el-form-item__label{color:red} */
/* 案例标题 */
.casetitble{
   display: inline-block;
   margin-left: -94px;
   margin-right:10px;
}
/* 简介 */
.infortitble{
   display: inline-block;
   margin-left: -57px;
   margin-right:10px;
}
.contansbox {
  color: #000;
}
.thelabel {
  width: 70px;
  display: inline-block;
  text-align: right;
  font-size: 14px;
  margin-right: 5px;
}
.el-tag {
  margin-right: 14px;
}
.case {
  margin-left: 10px;
  margin-bottom: 24px;
}
.preser {
  display: inline-block;
  position: absolute;
  margin-left: 17px;
  width: 70px;
  text-align: right;
  font-size: 14px;
  margin-right: 10px;
}
/* 案例标题结束 */
.search {
  margin-top: 15px;
}
.container {
  margin-bottom: 25px;
}
.contain-top {
  padding: 17px 32px;
}
.contain-tit {
  color: #a7a7a7;
  font-size: 14px;
}
.itc {
  margin: 0 12px;
}
h3 {
  color: #000000;
  font-size: 20px;
  line-height: 60px;
}
.contain-sear {
  display: flex;
  justify-content: space-between;
}

.contans {
  margin-top: 20px;
}
.contansbox {
  padding-left: 8px;
}
.preserwrapper {
  position: relative;
}
.chunkpra {
  width: 100%;
  display: flex;
  justify-content: space-around;
  cursor: pointer;
}
.chunk {
  width: 97px;
  height: 30px;
  line-height: 30px;
  border: 1px dashed #e5e5e5;
  text-align: center;
  color: #666666;
  background-color: #f8f8f8;
}
.bton {
  width: 500px;
  margin: 90px auto;
  padding-top: 62px;
  display: flex;
  justify-content:space-around;
}
.cancel {
  color: #000000;
}
.keep {
  background-color: #fd4343;
  color: #fff;
}
.keep:hover {
  background-color: #fd4343;
  color: #fff;
}
.casedetails {
  width: 378px;
  height: 392px;
  position: absolute;
  left: 405px;
  top: 0;
  border: 1px solid #e4e7ed;
}
.caseimg {
  width: 378px;
  height: 299px;
  position: absolute;
  left: 405px;
  top: 0;
  border: 1px solid #e4e7ed;
}
.caseredio {
  width: 378px;
  height: 402px;
  position: absolute;
  left: 405px;
  top: 0;
  border: 1px solid #e4e7ed;
}
.casedetail {
  padding: 13px 18px;
}
.casetitle {
  height: 32px;
  line-height: 32px;
  color: #fe4343;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px dashed #d9d9d9;
}
.casetitle-bottom {
  margin-top: 10px;
}
.casetitler {
  width: 70px;
  height: 30px;
  line-height: 30px;
  text-align: right;
  color: #303133;
}
.sixbox {
  width: 20px;
  height: 18px;
  display: inline-block;
  color: #909399;
  border: 1px solid #d9d9d9;
}
.iptnum {
  width: 30px;
}
.light {
  width: 376px;
  height: 47px;
  line-height: 47px;
  border-top: 1px solid #e4e7ed;
  text-align: center;
  font-size: 16px;
}
.bg-purple {
  color: #909399;
  cursor: pointer;
}
.bg-purple-light {
  color: #fe4343;
  cursor: pointer;
}
el-input {
  display: inline-block;
}
.cenline {
  width: 1px;
  height: 29px;
  background: #e4e7ed;
  position: absolute;
  left: 195px;
  top: 8px;
}
.iconpng {
  margin-left: 24px;
  vertical-align: middle;
  margin-top: -2px;
}
.showwords {
  padding: 10px 20px 0 20px;
  color: #303133;
  font-weight: bold;
}
/* 分享图 */
.thelabeler {
  font-size: 14px;
  position: relative;
  /* top: -40px; */
}
.thelabeler-share{
  margin-left: 2px;
}
.shareimg {
  margin-left: 20px;
}
.avatar-upload .el-upload {
  width: 300px;
  height: 300px;
}
.avatar-uploader {
  display: inline-block;
  margin-left: 11px;
  margin-top: 15px;
}
.avatar-uploader .el-upload {
  width: 80px;
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar-uploader-iconner {
  width: 251px;
  height: 123px;
  line-height: 123px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
/* 分享图结束 */
/* 共同span  */
.common {
  width: 81px;
  font-size: 14px;
  text-align: right;
  margin-right: 9px;
  margin-left: 10px;
  display: inline-block;
}
/* 品牌 */
.preserlist {
  margin-right: 9px;
  margin-left: 10px;
}

/* 保存 */
.saveto {
  height: 44px;
  line-height: 44px;
}
.preservation {
  margin-left: 10px;
  margin-right: 8px;
}
/* 感叹号说明 */
.bush {
  color: #b5b5b5;
  margin-left: 4px;
  font-size: 16px;
}
/* 添加标签时候的样式 */
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
