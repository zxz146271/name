<template>
  <div class="comm-edit">
    <div class="top">
      <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb>
    </div>
    <div class="form-group">
      <div class="form-block">
        <top-tips :title="optional"></top-tips>
         <el-collapse-transition>
          <div class="form-list" >
            <el-form :model="StBrandStory" :rules="rules" ref="StBrandStory" label-width="120px" class="ruleForm">
              <el-row :gutter="24">
                <el-col :span="12" :offset="12">
                  <el-form-item label="品牌logo" prop="photo" class="upload-item">
                    <el-upload
                      :action="$config().photoUploadUrl"
                      :data="{bid: StBrandStory.storyId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-success="fileUploadSuccess"
                      :file-list="StBrandStory.fileLists"
                      :before-upload="beforeAvatarUpload"
                      :limit="1"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                  <el-form-item label="背景图片" prop="photo" class="upload-item">
                    <el-upload
                      :action="$config().photoUploadUrl"
                      :data="{bid: StBrandStory.storyId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview2"
                      :on-success="fileUploadSuccess2"
                      :file-list="StBrandStory.fileLists2"
                      :before-upload="beforeAvatarUpload2"
                      :limit="1"
                      :on-remove="handleRemove2">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible2">
                      <img width="100%" :src="dialogImageUrl2" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <el-col :span="15" :offset="12">
                  <el-form-item label="背景颜色" prop="colorStart" >
                    <el-color-picker v-model="StBrandStory.colorStart" size="mini"></el-color-picker>
                    <span>~</span>
                    <el-color-picker v-model="StBrandStory.colorEnd" size="mini"></el-color-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="故事标题" prop="storyTitle">
                    <el-input v-model="StBrandStory.storyTitle"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="故事概述" prop="storySummary">
                    <el-input v-model="StBrandStory.storySummary" type="textarea"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="所属品牌" prop="brandId">
                    <el-select v-model="StBrandStory.brandId" placeholder="请选择所属品牌">
                      <el-option  multiple='false' v-for="item in StBrandStory.stGoodsBrands" :key="item.brandId" :label="item.brandName" :value="item.brandId"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12" :offset="12">
                  <el-form-item label="是否发布" prop="state">
                    <el-radio-group v-model="StBrandStory.state">
                      <el-radio label="0" >是</el-radio>
                      <el-radio label="1" >否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="故事说明" prop="storyContent">
                    <quill-editor :oldcontent="StBrandStory.storyContent" @newCont="newCont"></quill-editor>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-transition>
      </div>
      <div class="opeartion">
          <el-button @click="cancel('StBrandStory')">取消</el-button>
          <el-button type="primary" @click="submit('StBrandStory')">
            提交
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
      dialogVisible: false,
      dialogVisible2: false,
      dialogImageUrl: '',
      dialogImageUrl2: '',
      thisShow: false,
      importComm: false,
      deletFile: '',
      breadcrumbList: [
        { title: '品牌故事管理', path: '/brandStoryView' },
        { title: '编辑', path: '' }
      ],
      optional: {
        title: '品牌故事信息',
        unfold: false
      },
      StBrandStory: {
        storyTitle: '',
        storySummary: '',
        brandId: '',
        state: '',
        storyContent: '',
        storyId: '',
        versionNo: '',
        stGoodsBrands: [],
        fileLists: [],
        fileLists2: [],
        logoUrl: '',
        colorStart: '',
        colorEnd: '',
        backgroundPicture: ''
      },
      rules: {
        storyTitle: [
          { required: true, message: '请输入故事标题', trigger: 'blur' },
          { max: 10, message: '标题长度不能超过10', trigger: 'blur' }
        ],
        storySummary: [
          { required: true, message: '请输入故事概述', trigger: 'blur' },
          { max: 50, message: '概述长度不能超过50', trigger: 'blur' }
        ],
        brandId: [
          { required: true, message: '请选择所属品牌', trigger: 'change' }
        ],
        storyContent: [
          { required: true, message: '请输入故事说明', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  // 数据初始化方法
  mounted () {
    this.getStBrandStoryInfo()
  },
  methods: {
    newCont (cont) {
      this.StBrandStory.storyContent = cont
    },
    // 获取案例信息详情
    getStBrandStoryInfo () {
      let params = {
        storyId: this.$route.query.storyId
      }
      this.$api.getStBrandStoryInfo(params).then(res => {
        this.StBrandStory = res.data
        if (res.data.logoUrl !== null && res.data.logoUrl !== '') {
          let item = {
            url: this.StBrandStory.logoUrl,
            name: 'logo',
            enclosureId: 'logo'
          }
          this.StBrandStory.fileLists = [item]
        }
        if (res.data.backgroundPicture !== null && res.data.backgroundPicture !== '') {
          let item = {
            url: this.StBrandStory.backgroundPicture,
            name: 'logo',
            enclosureId: 'logo'
          }
          this.StBrandStory.fileLists2 = [item]
        }
        // res.data.fileUrl.forEach(el => {
        //   let param = {
        //     filePath: el.filePath
        //   }
        //   this.$api.getFullPath(param).then(res => {
        //     tempFullUrl = res.data
        //     item = {
        //       url: tempFullUrl,
        //       name: el.filename,
        //       enclosureId: el.enclosureId
        //     }
        //     this.StBrandStory.fileLists.push(item)
        //   })
        // })
      })
    },
    // 提交
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将页面对象赋予参数传递给后台
          let params = {
            storyTitle: this.StBrandStory.storyTitle,
            storySummary: this.StBrandStory.storySummary,
            brandId: this.StBrandStory.brandId,
            state: this.StBrandStory.state,
            storyContent: this.StBrandStory.storyContent,
            storyId: this.StBrandStory.storyId,
            logoUrl: this.StBrandStory.logoUrl,
            versionNo: this.StBrandStory.versionNo,
            colorStart: this.StBrandStory.colorStart,
            colorEnd: this.StBrandStory.colorEnd,
            backgroundPicture: this.StBrandStory.backgroundPicture
          }
          if (params.versionNo) {
            this.$api.editStBrandStory(params).then(res => {
              if (res.code === 0) {
                this.$router.push({path: '/store/brandStoryManage'})
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            this.$api.saveStBrandStory(params).then(res => {
              if (res.code === 0) {
                this.$router.push({path: '/store/brandStoryManage'})
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        }
      })
    },
    cancel (formName) {
      // 清空表单
      // this.$refs[formName].resetFields()
      this.$router.push({path: '/store/brandStoryManage'})
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
        return type
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt2M && type
    },
    fileUploadSuccess (response, file, fileList) {
      this.StBrandStory.logoUrl = response.data.filePath
      let thisFile = [{
        name: fileList.name,
        url: fileList.url,
        enclosureId: fileList.enclosureId
      }]
      // this.StBrandStory.fileLists 图片列表
      this.StBrandStory.fileLists = [...this.StBrandStory.fileLists, ...thisFile] // 数组合并
    },
    // 删除文件
    handleRemove (file, fileList) {
      this.StBrandStory.logoUrl = ''
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreview2 (file) {
      this.dialogImageUrl2 = file.url
      this.dialogVisible2 = true
    },
    fileUploadSuccess2 (response, file, fileList) {
      this.StBrandStory.backgroundPicture = response.data.filePath
      let thisFile = [{
        name: fileList.name,
        url: fileList.url,
        enclosureId: fileList.enclosureId
      }]
      // this.StBrandStory.fileLists 图片列表
      this.StBrandStory.fileLists2 = [...this.StBrandStory.fileLists2, ...thisFile] // 数组合并
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
        return type
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt2M && type
    },
    // 删除文件
    handleRemove2 (file, fileList) {
      this.StBrandStory.backgroundPicture = ''
    }
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
    margin-top: 20px;
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
