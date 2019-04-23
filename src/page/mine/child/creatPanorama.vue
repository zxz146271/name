<template>
    <div class="photoAlbumDetail">
        <el-form ref="form" :model="panoramaInfo" label-width="120px" :rules="rules">
            <el-form-item label="全景图标题：" prop="title">
                <el-input v-model="panoramaInfo.title" style="width:236px;" placeholder="请输入全景图标题"></el-input>
            </el-form-item>
            <el-form-item label="简介：" prop="brief">
                <el-input v-model="panoramaInfo.brief" style="width:236px;" placeholder="请输入简介"></el-input>
            </el-form-item>
            <el-form-item label="创建方式：">
                <el-radio-group v-model="panoramaInfo.createWay" @change = "selectCreateWay">
                    <el-radio v-for = "(item,index) in createWayOptions" :key = "index" :label="index">{{item.name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 上传全景图 -->
            <div class="panorama" v-if = "panoramaInfo.createWay == 0">
                <span class="thelabeler"><span style="color:#fd4343;">*&nbsp;</span>全景图:</span>
                <el-form-item>
                    <el-upload
                        :action="$config().uploadUrl"
                        :data="{bid: uuId}"
                        list-type="picture-card"
                        :limit="1"
                        :on-exceed="outOfRange"
                        :on-preview="handlePictureCardPreview"
                        :on-success="handleAvatarSuccess"
                        :file-list="fileList"
                        accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </div>

            <!-- 从酷家乐选择 -->

            <div class="cool" v-if = "panoramaInfo.createWay == 1">
                <span class="thelabeler"><span style="color:#fd4343;">*&nbsp;</span>从酷家乐选择:</span>
                <el-form-item>
                  <el-button @click="chooseCool" v-if="chooseFlag">选择</el-button>
                  <div class="cool-box" v-else>
                    <div class="cool-imgBox">
                      <div class="cool-img" @mouseover="showDel" @mouseout="hideDel">
                        <img :src="panoramaInfo.coolImg ? panoramaInfo.coolImg : panoramaInfo.photoUrl" alt="">
                        <em class="el-icon-error" v-if="delImgFlag" @click="delCoolData"></em>
                      </div>
                      <el-button @click="chooseCool">更换选择</el-button>
                    </div>
                    <div class="cool-text">
                      <p>标题:{{cool.roomName ? cool.roomName : panoramaInfo.panoTitle}}</p>
                      <p>ID:{{cool.picId ? cool.picId : panoramaInfo.panoId}}</p>
                    </div>
                  </div>
                </el-form-item>
                <!-- <el-form-item label="分享图：">
                    <el-upload
                        :action="$config().uploadUrl"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview2"
                        :on-remove="handleRemove2">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible2">
                    <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <p><img src="/static/image/zhuyi-icon.png" alt=""><span>最多上传5张</span></p>
                </el-form-item> -->
            </div>
            <div>
              <el-form-item label="分享图：">
                    <el-upload
                        :action="$config().uploadUrl"
                        :data="{bid: uuId+'wechatSharePic'}"
                        list-type="picture-card"
                        :limit="1"
                        :on-exceed="outOfRange"
                        :on-preview="handlePictureCardPreview1"
                        :on-success="handleAvatarSuccess2"
                        :file-list="fileList2"
                        accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                        :on-remove="handleRemove1">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible1">
                    <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <!-- <p><img src="/static/image/zhuyi-icon.png" alt=""><span>最多上传5张</span></p> -->
                </el-form-item>
            </div>

            <el-form-item label="保存到：" v-if="!isEdit">
                <el-radio-group v-model="panoramaInfo.saveWay" @change="relationTypeChange">
                  <el-radio v-model="panoramaInfo.saveWay" label="personal">我的内容库</el-radio>
                  <el-radio v-if = "roleCode != 'SHOPPING_GUIDE'" v-model="panoramaInfo.saveWay" label="store">品牌内容库</el-radio>
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

            <el-form-item style="margin-top:60px;margin-left:0;display:flex;justify-content: space-between;">
                <el-button class="cancel" @click="cancel">取消</el-button>
                <el-button type="primary" style="margin-left:120px;" @click="savePanoramaInfo('form')">保存</el-button>
            </el-form-item>
        </el-form>
        <div class="choosePanorama" v-if="coolFlag">
          <panorama  @goBack="goBack" @getCoolImg = "getCoolImg"/>
        </div>
        
    </div>
</template>
<script>
import {getStore, setStore} from '../../../tool/Utils'
import panorama from '../../../components/mineself/panorama'


export default {
  components: { panorama },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      coolFlag: false,
      panoramaInfo: {
        title: '',
        brief: '',
        createWay: 0,
        saveWay: 'personal',
        copyWay: '0',
        state: 0,
        coolImg: '',
        panoLink: '',
        panoId: '',
        panoTitle: ''
      },
      createWayOptions: [
        {name: '上传全景图', value: 'oneself', checked: true}, 
        {name: '从酷家乐选择', value: 'cool', checked: false}
      ], // ['上传全景图', '从酷家乐上传'],
      saveWayOptions: [{label: '我的内容库', value: 'personal'}, {label: '品牌内容库', value: 'store'}],
      copyWayOptions: [{label: '是', value: '0'}, {label: '否', value: '1'}],
      rules: {
        title: [
          { required: true, message: '请输入全景图标题', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        brief: [
          { required: false, message: '请输入简介', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ]
      },
      uuId: '',
      imageUrl: '',
      imageUrl2: '',
      isShowBrand: false,
      isEdit: false,
      brandList: [], // 品牌列表
      fileList2: [],
      fileList: [],
      photoUrl: [],
      selectedBrandList: [],
      roleCode: '',
      delImgFlag: false,
      cool:{},
      chooseFlag: true
    }
  },
  mounted () {
    this.getRoleCode()
    this.getBrandList()
    if (this.$route.query.contentId) {
      this.isEdit = true
      this.getPanoramaInfo()
    } else {
      this.uuId = this.getUuid()
    }
    if (this.$route.query.typeClass === 1) {
      this.panoramaInfo.saveWay = 'personal'
    } else {
      this.panoramaInfo.saveWay = 'store'
      this.isShowBrand = true
    }
  },
  methods: {
    chooseCool() {
      this.coolFlag = true
    },
    setInfo () {
      this.panoramaInfo.title = this.panoramaInfo.headline
      this.panoramaInfo.brief = this.panoramaInfo.summary
      this.panoramaInfo.copyWay = this.panoramaInfo.ifShare
      this.panoramaInfo.saveWay = this.panoramaInfo.eelationType
      this.uuId = this.panoramaInfo.contentId
      // this.panoramaInfo.createWay = 0
      this.panoramaInfo.wechatSharePic.forEach((el, index) => {
        let item = {
          url: el.filePath,
          name: el.fileName,
          enclosureId: el.enclosureId
        }
        this.fileList2.push(item)
      })
      this.panoramaInfo.photoFile.forEach(el => {
        let item = {
          url: el.filePath,
          fileName: el.fileName,
          enclosureId: el.enclosureId
        }
        this.fileList.push(item)
        this.photoUrl.push(item)
      })
    },
    // 接收到的酷家乐的图片和全景图链接
    getCoolImg(item) {
      this.$set(this.panoramaInfo, `coolImg`, item.img)
      this.$set(this.panoramaInfo, `panoLink`, item.panoLink)
      this.$set(this.panoramaInfo, `panoTitle`, item.roomName)
      this.$set(this.panoramaInfo, `panoId`, item.picId)  
      console.log(this.panoramaInfo)    
      this.cool = item
      this.coolFlag = false
      this.chooseFlag = false
    },
    setData () {
      let obj = {}
      obj.headline = this.panoramaInfo.title
      if (!this.panoramaInfo.title) {
        this.$message.error('全景图标题为必填字段')
        return false
      } else if (this.panoramaInfo.title.length > 20 || this.panoramaInfo.title.length < 2) {
        this.$message.error('全景图标题为2-20个字符')
        return false
      }
      obj.summary = this.panoramaInfo.brief
      
      if(this.panoramaInfo.brief.length > 31 ) {
        this.$message.error('全景图简介不能超过30个字符')
        return false
      }
      if(this.panoramaInfo.createWay == 0){
        if (this.photoUrl.length === 0) {
          this.$message.error('请上传全景图图片')
          return false
        }
        obj.photoUrl = this.photoUrl[0].url
        obj.createWay = 'oneself'
      }else if(this.panoramaInfo.createWay == 1){
        if(this.panoramaInfo.coolImg.length < 0){
          this.$message.error('请从酷家乐选择全景图')
          return false
        }
        obj.photoUrl = this.panoramaInfo.coolImg
        obj.panoLink = this.panoramaInfo.panoLink
        obj.panoId = this.panoramaInfo.panoId
        obj.panoTitle = this.panoramaInfo.panoTitle
        obj.createWay = 'cool'
      }
      
      obj.eelationType = this.panoramaInfo.saveWay
      obj.contentType = 'panorama'
      if (this.panoramaInfo.saveWay === 'store' && !this.isEdit) {
        if (!this.brandId) {
          this.$message.error('请选择品牌系列')
          return false
        }
        obj.brandId = this.brandId[this.brandId.length - 1]
        obj.allBrandId = JSON.stringify(this.brandId)
      }
      obj.ifShare = this.panoramaInfo.copyWay
      obj.contentId = this.uuId
      return obj
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
    getPanoramaInfo () {
      let params = {
        contentId: this.$route.query.contentId
      }
      this.$api.getContentById(params).then(resq => {
        this.panoramaInfo = resq.data
        if(resq.data.createWay == 'cool'){
          this.$set(this.createWayOptions[0], `checked`, false)
          this.$set(this.createWayOptions[1], `checked`, true)
          this.$set(this.panoramaInfo, `createWay`, 1)
          this.chooseFlag = false
        }else{
          this.$set(this.createWayOptions[0], `checked`, true)
          this.$set(this.createWayOptions[1], `checked`, false)
          this.$set(this.panoramaInfo, `createWay`, 0)
        }
        this.setInfo()
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
      let params = {
        id: file.enclosureId
      }
      this.$api.deleteFileById(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.imageUrl = ''
          this.photoUrl = []
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove1 (file, fileList) {
      let params = {
        id: file.enclosureId
      }
      this.$api.deleteFileById(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)

          // 要删除的文件
          this.imageUrl2 = ''
        } else {
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
    handleAvatarSuccess (res, file) {
      let thisFile = [{
        name: file.response.data.fileName,
        url: file.response.data.filePath,
        enclosureId: file.response.data.enclosureId
      }]
      this.photoUrl = thisFile
      this.fileList = thisFile
    },
    handleAvatarSuccess2 (res, file) {
      this.imageUrl2 = file.response.data.filePath
      let thisFile = [{
        name: file.response.data.fileName,
        url: file.response.data.filePath,
        enclosureId: file.response.data.enclosureId
      }]
      this.fileList2 = thisFile
    },
    // 选择创建方式
    selectCreateWay () {
      console.log("创建方式", this.panoramaInfo.createWay)
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
        if (this.panoramaInfo !== null && this.panoramaInfo.state === '1') {
          this.$router.push({path: '/mine/countAllofme/contentRecycle'})
        } else {
          this.$router.push({path: '/mine/countAllofme'})
        }
      } else if (this.$route.query.typeClass === 2) {
        if (this.panoramaInfo !== null && this.panoramaInfo.state === '1') {
          this.$router.push({path: '/store/contentRecycle'})
        } else {
          this.$router.push({path: '/store/brandContent'})
        }
      } else {
        this.$router.push({path: '/myStore/storeDynamicManagement'})
      }
    },
    savePanoramaInfo (form) {
      let params = this.setData()
      console.log(params)
      this.$refs[form].validate((valid) => {
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
            this.$router.push({path: '/mine/countAllofme'})
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
    getRoleCode () {
      let roleCode = getStore('roleCode')
      this.roleCode = roleCode
    },
    // 从酷家乐选择
    goBack() {
      this.coolFlag = false
    },
    showDel() {
      this.delImgFlag = true
    },
    hideDel() {
      this.delImgFlag = false
    },
    delCoolData() {
      this.$set(this.panoramaInfo, `coolImg`, '')
      this.$set(this.panoramaInfo, `panoLink`, '')
      this.$set(this.panoramaInfo, `panoTitle`, '')
      this.$set(this.panoramaInfo, `panoId`, '')
      this.cool = {}
      this.chooseFlag = true
    }
  }
}
</script>

<style lang="scss" scoped>
.photoAlbumDetail{
    padding: 23px 26px 23px 26px;
    position: relative;
    .panorama{
      position: relative;
    }
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
        .cool-box{
          display: flex;
          flex-direction: row;
          .cool-imgBox{
            margin-right:15px;
            .cool-img{
              width: 80px;
              height: 80px;
              position: relative;
              margin-bottom:10px;
              img{
                width: 100%;
                height: 100%;
                border-radius: 4px;
              }
              em{
                width: 15px;
                height: 15px;
                display: block;
                position: absolute;
                top:-7px;
                right:-7px;
                cursor: pointer;
              }
            }
          }
          .cool-text{
            color: #303133;
            font-size:14px;
            font-weight: 400;
            display: flex;
            flex-direction: column;
            p{
              margin: 5px 0;
            }
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
    .thelabeler{
      display: inline-block;
      position: absolute;
      width: 98px;
      font-size: 14px;
      margin-right: 10px;
      line-height: 23px;
      text-align: right;
      color:#606266;
    }
    .choosePanorama{
      width: 100%;
      height: 100%;
      overflow: auto;
      position: absolute;
      left: 0;
      top: 0;
      background: #fff;
    }
}
</style>
