  <template>
  <div class="comm-edit">
    <div class="form-group">
      <div class="form-block">
        <top-tips :title="optional"></top-tips>
         <el-collapse-transition>
          <div class="form-list" >
            <el-form :model="stDefinedSharePicture" :rules="rules" ref="stDefinedSharePicture" label-width="150px" class="ruleForm">
              <el-row :gutter="24">
                <el-col :span="50" :offset="50">
                  <el-form-item label="小程序首页分享图" prop="photo" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{pid: stDefinedSharePicture.sharePictureId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-success="fileUploadSuccess"
                      :file-list="stDefinedSharePicture.fileLists"
                      :before-upload="beforeAvatarUpload"
                      :limit="1"
                      :on-exceed="outOfRange"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-tooltip class="item" effect="dark" content="提示：图片尺寸为 1000 * 800删除后，即使用系统默认图片" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="50" :offset="50">
                  <el-form-item label="H5微商城首页分享图" prop="photo" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{pid: stDefinedSharePicture.sharePictureId1}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview1"
                      :on-success="fileUploadSuccess1"
                      :file-list="stDefinedSharePicture.fileLists1"
                      :before-upload="beforeAvatarUpload"
                      :limit="1"
                      :on-exceed="outOfRange"
                      :on-remove="handleRemove1">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-tooltip class="item" effect="dark" content="提示：图片尺寸为 800 * 800删除后，即使用系统默认图片" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible1">
                      <img width="100%" :src="dialogImageUrl1" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="50" :offset="50">
                  <el-form-item label="小程序电子名片分享图" prop="photo" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{pid: stDefinedSharePicture.sharePictureId2}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview2"
                      :on-success="fileUploadSuccess2"
                      :file-list="stDefinedSharePicture.fileLists2"
                      :before-upload="beforeAvatarUpload"
                      :limit="1"
                      :on-exceed="outOfRange"
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
              </el-row>
              <el-row :gutter="24">
                <el-col :span="50" :offset="50">
                  <el-form-item label="H5微商城电子名片分享图" prop="photo" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{pid: stDefinedSharePicture.sharePictureId3}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview3"
                      :on-success="fileUploadSuccess3"
                      :file-list="stDefinedSharePicture.fileLists3"
                      :before-upload="beforeAvatarUpload"
                      :limit="1"
                      :on-exceed="outOfRange"
                      :on-remove="handleRemove3">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-tooltip class="item" effect="dark" content="提示：图片尺寸为 800 * 800删除后，即使用系统默认图片" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible3">
                      <img width="100%" :src="dialogImageUrl3" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="50" :offset="50">
                  <el-form-item label="活动页面分享图" prop="photo" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{pid: stDefinedSharePicture.sharePictureId4}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview4"
                      :on-success="fileUploadSuccess4"
                      :file-list="stDefinedSharePicture.fileLists4"
                      :before-upload="beforeAvatarUpload"
                      :limit="1"
                      :on-exceed="outOfRange"
                      :on-remove="handleRemove4">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-tooltip class="item" effect="dark" content="提示：图片尺寸为 800 * 800删除后，即使用系统默认图片" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible4">
                      <img width="100%" :src="dialogImageUrl4" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
// 我觉得这个代码太恶心了，谁看到了在心情好的时候改一下。
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogImageUrl: '',
      dialogImageUrl1: '',
      dialogImageUrl2: '',
      dialogImageUrl3: '',
      dialogImageUrl4: '',
      thisShow: false,
      importComm: false,
      deletFile: '',
      breadcrumbList: [],
      optional: {
        title: '自定义分享图',
        unfold: false
      },
      stDefinedSharePicture: {
        pid: '',
        pictureType: '',
        sharePictureId: '',
        sharePictureId1: '',
        sharePictureId2: '',
        sharePictureId3: '',
        sharePictureId4: '',
        fileLists: [],
        fileLists1: [],
        fileLists2: [],
        fileLists3: [],
        fileLists4: [],
        photoUrl: ''
      },
      imgType: false,
      imgSize: false,
      caseTypeList: [],
      rules: {
      }
    }
  },
  computed: {
  },
  // 数据初始化方法
  mounted () {
    this.getSharePictureList()
  },
  methods: {
    // 获取案例信息详情
    getSharePictureList () {
      this.$api.getSharePictureList().then(res => {
        var dataList = res.data
        dataList.forEach(el => {
          if (el.pictureType === 'miniAppHome') {
            let item = {}
            item = {
              url: el.imgUrl,
              name: el.filename,
              enclosureId: el.enclosureId
            }
            this.stDefinedSharePicture.sharePictureId = el.sharePictureId
            this.stDefinedSharePicture.fileLists.push(item)
          } else if (el.pictureType === 'h5MallHome') {
            let item = {}
            item = {
              url: el.imgUrl,
              name: el.filename,
              enclosureId: el.enclosureId
            }
            this.stDefinedSharePicture.sharePictureId1 = el.sharePictureId
            this.stDefinedSharePicture.fileLists1.push(item)
          } else if (el.pictureType === 'miniAppVcard') {
            let item = {}
            item = {
              url: el.imgUrl,
              name: el.filename,
              enclosureId: el.enclosureId
            }
            this.stDefinedSharePicture.sharePictureId2 = el.sharePictureId
            this.stDefinedSharePicture.fileLists2.push(item)
          } else if (el.pictureType === 'h5MallVccard') {
            let item = {}
            item = {
              url: el.imgUrl,
              name: el.filename,
              enclosureId: el.enclosureId
            }
            this.stDefinedSharePicture.sharePictureId3 = el.sharePictureId
            this.stDefinedSharePicture.fileLists3.push(item)
          } else if(el.pictureType === 'activity'){
            let item = {}
            item = {
              url: el.imgUrl,
              name: el.filename,
              enclosureId: el.enclosureId
            }
            this.stDefinedSharePicture.sharePictureId4 = el.sharePictureId
            this.stDefinedSharePicture.fileLists4.push(item)
          }
        })
      })
    },
    // 上传分享图片
    uploadSharePic (params) {
      this.$api.uploadSharePicture(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 删除分享图片关系
    deleteSharePic (params) {
      this.$api.deleteSharePicture(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取全路径
    getFullPath (filePath) {
      let params = {
        filePath: filePath
      }
      return this.$api.getFullPath(params)
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
      return isLt2M && type
    },
    outOfRange () {
      this.$message.error('上传图片数量限制为1张')
    },
    fileUploadSuccess (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      this.stDefinedSharePicture.fileLists = [...this.stDefinedSharePicture.fileLists, ...thisFile] // 数组合并
      // 设置分享图片类型(小程序首页)
      this.stDefinedSharePicture.pictureType = 'miniAppHome'
      this.stDefinedSharePicture.pid = file.data.enclosureId
      this.stDefinedSharePicture.sharePictureId = this.getUuid()
      let params = {
        pid: this.stDefinedSharePicture.pid,
        pictureType: 'miniAppHome',
        sharePictureId: this.stDefinedSharePicture.sharePictureId
      }
      // 保存上传关系
      this.uploadSharePic(params)
    },
    fileUploadSuccess1 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      this.stDefinedSharePicture.fileLists1 = [...this.stDefinedSharePicture.fileLists1, ...thisFile] // 数组合并
      // 设置分享图片类型(小程序首页)
      this.stDefinedSharePicture.pictureType = 'h5MallHome'
      this.stDefinedSharePicture.pid = file.data.enclosureId
      this.stDefinedSharePicture.sharePictureId1 = this.getUuid()
      let params = {
        pid: this.stDefinedSharePicture.pid,
        pictureType: 'h5MallHome',
        sharePictureId: this.stDefinedSharePicture.sharePictureId1
      }
      // 保存上传关系
      this.uploadSharePic(params)
    },
    fileUploadSuccess2 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      this.stDefinedSharePicture.fileLists2 = [...this.stDefinedSharePicture.fileLists2, ...thisFile] // 数组合并
      // 设置分享图片类型(小程序首页)
      this.stDefinedSharePicture.pictureType = 'miniAppVcard'
      this.stDefinedSharePicture.pid = file.data.enclosureId
      this.stDefinedSharePicture.sharePictureId2 = this.getUuid()
      let params = {
        pid: this.stDefinedSharePicture.pid,
        pictureType: 'miniAppVcard',
        sharePictureId: this.stDefinedSharePicture.sharePictureId2
      }
      // 保存上传关系
      this.uploadSharePic(params)
    },
    fileUploadSuccess3 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      this.stDefinedSharePicture.fileLists3 = [...this.stDefinedSharePicture.fileLists3, ...thisFile] // 数组合并
      // 设置分享图片类型(小程序首页)
      this.stDefinedSharePicture.pictureType = 'h5MallVccard'
      this.stDefinedSharePicture.pid = file.data.enclosureId
      this.stDefinedSharePicture.sharePictureId3 = this.getUuid()
      let params = {
        pid: this.stDefinedSharePicture.pid,
        pictureType: 'h5MallVccard',
        sharePictureId: this.stDefinedSharePicture.sharePictureId3
      }
      // 保存上传关系
      this.uploadSharePic(params)
    },
    fileUploadSuccess4 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      this.stDefinedSharePicture.fileLists4 = [...this.stDefinedSharePicture.fileLists4, ...thisFile] // 数组合并
      // 设置分享图片类型(小程序首页)
      this.stDefinedSharePicture.pictureType = 'activity'
      this.stDefinedSharePicture.pid = file.data.enclosureId
      this.stDefinedSharePicture.sharePictureId4 = this.getUuid()
      let params = {
        pid: this.stDefinedSharePicture.pid,
        pictureType: 'activity',
        sharePictureId: this.stDefinedSharePicture.sharePictureId4
      }
      // 保存上传关系
      this.uploadSharePic(params)
    },
    // 删除文件
    handleRemove (file, fileList) {
      let param = {
        id: file.enclosureId
      }
      // 删除文件
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          let params = {
            sharePictureId: this.stDefinedSharePicture.sharePictureId
          }
          // 删除关系数据
          this.deleteSharePic(params)
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile = file
          this.stDefinedSharePicture.fileLists.splice(this.stDefinedSharePicture.fileLists.findIndex(v => {
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
    // 删除文件
    handleRemove1 (file, fileList) {
      let param = {
        id: file.enclosureId
      }
      // 删除文件
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          let params = {
            sharePictureId: this.stDefinedSharePicture.sharePictureId1
          }
          // 删除关系数据
          this.deleteSharePic(params)
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile = file
          this.stDefinedSharePicture.fileLists1.splice(this.stDefinedSharePicture.fileLists1.findIndex(v => {
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
    // 删除文件
    handleRemove2 (file, fileList) {
      let param = {
        id: file.enclosureId
      }
      // 删除文件
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          let params = {
            sharePictureId: this.stDefinedSharePicture.sharePictureId2
          }
          // 删除关系数据
          this.deleteSharePic(params)
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile = file
          this.stDefinedSharePicture.fileLists2.splice(this.stDefinedSharePicture.fileLists2.findIndex(v => {
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
    // 删除文件
    handleRemove3 (file, fileList) {
      let param = {
        id: file.enclosureId
      }
      // 删除文件
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          let params = {
            sharePictureId: this.stDefinedSharePicture.sharePictureId3
          }
          // 删除关系数据
          this.deleteSharePic(params)
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile = file
          this.stDefinedSharePicture.fileLists3.splice(this.stDefinedSharePicture.fileLists3.findIndex(v => {
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
    handleRemove4 (file, fileList) {
      let param = {
        id: file.enclosureId
      }
      // 删除文件
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          let params = {
            sharePictureId: this.stDefinedSharePicture.sharePictureId4
          }
          // 删除关系数据
          this.deleteSharePic(params)
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile = file
          this.stDefinedSharePicture.fileLists4.splice(this.stDefinedSharePicture.fileLists4.findIndex(v => {
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
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreview1 (file) {
      this.dialogImageUrl1 = file.url
      this.dialogVisible1 = true
    },
    handlePictureCardPreview2 (file) {
      this.dialogImageUrl2 = file.url
      this.dialogVisible2 = true
    },
    handlePictureCardPreview3 (file) {
      this.dialogImageUrl3 = file.url
      this.dialogVisible3 = true
    },
    handlePictureCardPreview4 (file) {
      this.dialogImageUrl4 = file.url
      this.dialogVisible4 = true
    },
    getUuid () {
      var d = new Date().getTime()
      var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    }
  },
  components: { breadCrumb, topTips }
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
    .case-lable{
      .el-tag + .el-tag {
        margin-left: 10px;
      }
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
    }
    .form-block {
      .form-list {
        margin-top: 28px;
        padding: 0 70px;
        .upload-item {
          .el-form-item__content {
            line-height: 0;
          }
        }
      }
    }
    .opeartion {
      text-align: center;
      margin: 40px 0;
      button{
        padding:15px 20px;
        &:first-child{
          width:140px;
        }
        &:last-child{
          width:200px;
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
</style>
