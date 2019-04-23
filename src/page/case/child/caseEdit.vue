  <template>
  <div class="comm-edit">
    <!-- <div class="top">
      <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb>
    </div> -->
    <div class="form-group">
      <div class="form-block">
        <top-tips :title="optional"></top-tips>
         <el-collapse-transition>
          <div class="form-list" >
            <el-form :model="stCaseBase" :rules="rules" ref="stCaseBase" label-width="120px" class="ruleForm">
              <el-row :gutter="24">
                <el-col :span="50" :offset="50">
                  <el-form-item label="案例封面" prop="photo" class="upload-item label-star">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: stCaseBase.caseId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-success="fileUploadSuccess"
                      :file-list="stCaseBase.fileLists"
                      :before-upload="beforeAvatarUpload"
                      :limit="1"
                      :on-exceed="outOfRange"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
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
                    <el-tooltip class="item" effect="dark" content="提示：图片尺寸为 1000 * 800,删除后，即使用系统默认图片" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible1">
                      <img width="100%" :src="stCaseBase.wechatSharePic" alt="">
                    </el-dialog>
                  </el-form-item>
                  <!-- <el-form-item label="H5分享图" prop="photo" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: stCaseBase.caseId + 'H5SharePic'}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview2"
                      :on-success="fileUploadSuccess2"
                      :file-list="stCaseBase.fileLists2"
                      :before-upload="beforeAvatarUpload"
                      :limit="1"
                      :on-exceed="outOfRange"
                      :on-remove="handleRemove2">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-tooltip class="item" effect="dark" content="提示：图片尺寸为 800 * 800,删除后，即使用系统默认图片" placement="right">
                      <i class="el-icon-question prompt-icon"></i>
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogVisible2">
                      <img width="100%" :src="dialogImageUrl2" alt="">
                    </el-dialog>
                  </el-form-item> -->
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="案例标题" prop="caseTitle">
                    <el-input v-model="stCaseBase.caseTitle"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="案例概述" prop="caseSummary">
                    <el-input v-model="stCaseBase.caseSummary" type="textarea"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="所在小区" prop="buildingArea">
                    <el-input v-model="stCaseBase.buildingArea"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="案例类型" prop="caseType">
                    <el-select v-model="stCaseBase.caseType" placeholder="请选择案例类型">
                      <el-option  multiple='false' v-for="item in caseTypeList" :key="item.classifyId" :label="item.classifyName" :value="item.classifyId"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <!-- <el-col :offset="12">
                  <el-form-item label="案例标签" prop="">
                    <div class="case-lable">
                      <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                      </el-tag>
                      <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                      >
                      </el-input>
                      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>

                    </div>
                  </el-form-item>
                </el-col> -->
                <el-col :span="12" :offset="12">
                  <el-form-item label="是否发布" prop="display">
                    <el-radio-group v-model="stCaseBase.display">
                      <el-radio label="0" >是</el-radio>
                      <el-radio label="1" >否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="案例说明" prop="caseContent">
                    <quill-editor :oldcontent="stCaseBase.caseContent" @newCont="newCont"></quill-editor>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-transition>
      </div>
      <div class="opeartion">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="submit('stCaseBase')" :loading="loading">
            {{loading? '提交中' : '提交'}}
          </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
import quillEditor from '../../../components/public/quillEditor'
export default {
  data () {
    return {
      loading: false,
      lableList: [{name: '1'}, {name: '2'}],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogImageUrl: '',
      dialogImageUrl1: '',
      dialogImageUrl2: '',
      thisShow: false,
      importComm: false,
      deletFile: '',
      breadcrumbList: [],
      // dynamicTags: [],
      // inputVisible: false,
      // inputValue: '',
      optional: {
        title: '案例信息',
        unfold: false
      },
      fileLists1: [],
      stCaseBase: {
        caseTitle: '',
        caseSummary: '',
        caseType: '',
        display: '',
        caseContent: '',
        caseId: '',
        versionNo: '',
        fileLists: [],
        fileLists2: [],
        buildingArea: '',
        wechatSharePic: ''
        // jsonData: ''
      },
      imgType: false,
      imgSize: false,
      caseTypeList: [],
      rules: {
        caseTitle: [
          { required: true, message: '请输入案例标题', trigger: 'blur' },
          { max: 100, message: '标题长度不能超过100', trigger: 'blur' }
        ],
        caseSummary: [
          { required: true, message: '请输入案例概述', trigger: 'blur' },
          { max: 200, message: '标题长度不能超过200', trigger: 'blur' }
        ],
        buildingArea: [
          { max: 10, message: '小区名称不能超过10字符', trigger: 'blur' }
        ],
        caseType: [
          { required: true, message: '请选择案例类型', trigger: 'blur' }
        ],
        caseContent: [
          { required: true, message: '请输入案例说明', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  // 数据初始化方法
  mounted () {
    this.getStCaseBaseInfo()
  },
  methods: {
    newCont (cont) {
      this.stCaseBase.caseContent = cont
    },
    deleteLable (index) {
      this.lableList.splice(index, 1)
    },
    addLable () {
      this.lableList.push({name: ''})
    },
    // 获取案例信息详情
    getStCaseBaseInfo () {
      var caseId = this.$route.query.caseId
      if (caseId !== undefined && caseId != null && caseId !== '') {
        this.breadcrumbList = []
        this.breadcrumbList.push({ title: '案例管理', path: '/caseView' })
        this.breadcrumbList.push({ title: '编辑', path: '' })
      } else {
        this.breadcrumbList = []
        this.breadcrumbList.push({ title: '案例管理', path: '/caseView' })
        this.breadcrumbList.push({ title: '新增', path: '' })
      }
      let params = {
        caseId: caseId
      }
      this.$api.getStCaseBaseInfo(params).then(res => {
        this.stCaseBase.caseTitle = res.data.caseTitle
        this.stCaseBase.caseSummary = res.data.caseSummary
        this.stCaseBase.display = res.data.display
        this.stCaseBase.caseContent = res.data.caseContent
        this.stCaseBase.caseId = res.data.caseId
        this.stCaseBase.versionNo = res.data.versionNo
        this.stCaseBase.caseType = res.data.caseType
        this.caseTypeList = res.data.caseClassifies
        this.stCaseBase.buildingArea = res.data.buildingArea
        // this.dynamicTags = res.data.lableData
        // 回显小程序分享图
        if (res.data.wechatSharePic !== null && res.data.wechatSharePic !== '') {
          this.stCaseBase.wechatSharePic = res.data.wechatSharePic
          let item = [{
            url: this.stCaseBase.wechatSharePic,
            name: 'wechatSharePic',
            enclosureId: 'wechatSharePic'
          }]
          this.fileLists1 = item
        }
        // 回显H5分享图
        let h5Item = {}
        let h5TempFullUrl = ''
        res.data.h5ShareFile.forEach(el => {
          let param = {
            filePath: el.filePath
          }
          // 图片回显
          this.$api.getFullPath(param).then(res => {
            h5TempFullUrl = res.data
            h5Item = {
              url: h5TempFullUrl,
              name: el.filename,
              enclosureId: el.enclosureId
            }
            this.stCaseBase.fileLists2.push(h5Item)
            console.log(this.stCaseBase)
          })
        })
        // 回显案例封面
        let item = {}
        let tempFullUrl = ''
        res.data.photoFile.forEach(el => {
          let param = {
            filePath: el.filePath
          }
          // 图片回显
          this.$api.getFullPath(param).then(res => {
            tempFullUrl = res.data
            item = {
              url: tempFullUrl,
              name: el.filename,
              enclosureId: el.enclosureId
            }
            this.stCaseBase.fileLists.push(item)
          })
        })
      })
    },
    // 提交
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (this.stCaseBase.fileLists.length < 1) {
          this.$message.error('至少上传一张封面')
          return
        }
        if (valid) {
          this.loading = true
          // 将页面对象赋予参数传递给后台
          // this.stCaseBase.jsonData = JSON.stringify(this.dynamicTags)
          let params = this.stCaseBase
          if (params.versionNo) {
            this.$api.editStCaseBase(params).then(res => {
              if (res.code === 0) {
                this.loading = false
                this.$router.push({path: '/myStore/caseView/caseManage'})
              } else {
                this.loading = false
                this.$message.error(res.msg)
              }
            })
          } else {
            this.$api.saveStCaseBase(params).then(res => {
              if (res.code === 0) {
                this.loading = false
                this.$refs[formName].resetFields()
                this.$router.push({path: '/myStore/caseView/caseManage'})
              } else {
                this.loading = false
                this.$message.error(res.msg)
              }
            })
          }
        }
      })
    },
    cancel () {
      // this.$refs[formName].resetFields()
      this.$router.push({path: '/myStore/caseView/caseManage'})
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
      this.stCaseBase.fileLists = [...this.stCaseBase.fileLists, ...thisFile] // 数组合并
    },
    fileUploadSuccess2 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      this.stCaseBase.fileLists2 = [...this.stCaseBase.fileLists2, ...thisFile] // 数组合并
    },
    // 上传小程序分享图成功后的回调
    fileUploadSuccess1 (response, file, fileList) {
      this.stCaseBase.wechatSharePic = response.data.filePath
      let item = [{
        url: this.stCaseBase.wechatSharePic,
        name: 'wechatSharePic',
        enclosureId: 'wechatSharePic'
      }]
      this.fileLists1 = item
    },
    // 删除小程序分享图
    handleRemove1 (file, fileList) {
      this.stCaseBase.wechatSharePic = ''
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
          this.stCaseBase.fileLists.splice(this.stCaseBase.fileLists.findIndex(v => {
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
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile = file
          this.stCaseBase.fileLists2.splice(this.stCaseBase.fileLists2.findIndex(v => {
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
    }
    // handleClose (tag) {
    //   this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    // },
    // showInput () {
    //   this.inputVisible = true
    //   this.$nextTick(_ => {
    //     this.$refs.saveTagInput.$refs.input.focus()
    //   })
    // },
    // handleInputConfirm () {
    //   let inputValue = this.inputValue
    //   if (inputValue) {
    //     this.dynamicTags.push(inputValue)
    //   }
    //   this.inputVisible = false
    //   this.inputValue = ''
    // }
  },
  components: { breadCrumb, topTips, quillEditor }
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
