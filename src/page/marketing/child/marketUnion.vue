<template>
  <div class="comm-edit">
    <div class="top">
      <!-- <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb> -->
    </div>
    <div class="form-group">
      <div class="form-block">
        <top-tips :title="necessary"></top-tips>
        <div class="form-list">
          <el-form :model="StMarketingUnionInfo" :rules="rules" ref="StMarketingUnionInfo" label-width="120px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="联盟名称" prop="unionName">
                  <el-input v-model="StMarketingUnionInfo.unionName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="活动时间段" prop="startEndTimeStr">
                  <div class="block"></div>
                  <el-date-picker  v-model="StMarketingUnionInfo.startEndTimeStr" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
             </el-col>
               <el-col :span="12">
                <el-form-item label="活动地点" prop="unionAddress">
                  <el-input v-model="StMarketingUnionInfo.unionAddress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="活动说明" prop="activityDescription">
                  <el-input type="textarea" v-model="StMarketingUnionInfo.activityDescription"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12" :offset="12">
                  <el-form-item label="活动图片" prop="name" class="upload-item">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: StMarketingUnionInfo.unionId}"
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
              <el-col :span="12">
                <el-form-item>
                  <el-button class="ally-btn" @click="addAlly">邀请经销商</el-button>
                  <el-dialog :visible.sync="dialogAddAlly" class="dialog-ally" width="30%" @close="closeDialog">
                    <div slot="title" class="left-title">
                      <span class="top">邀请经销商</span>
                    </div>
                    <el-form :model="allyInfo" ref="allyInfo" label-width="100px" class="demo-ruleForm">
                      <el-form-item
                        label="手机号"
                        prop="mobile"
                        :rules="[{ required: true, message: '请输入手机号'}]">
                        <el-input type="tel" v-model.number="allyInfo.mobile" auto-complete="off" style="width: 80%"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button class="ally-send" @click="submitAlly('allyInfo')">确定邀请</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="form-block">
        <div class="form-list form-table">
          <market-table :child-ally-info="allAlly"></market-table>
        </div>
      </div>
      <div class="opeartion">
        <div>
          <el-button class="submit_add" @click="cancel">
            取消
          </el-button>
          <el-button class="submit" @click="save(['StMarketingUnionInfo'])">
            提交
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
import marketTable from '../../../components/marketing/marketTable'
export default {
  data () {
    return {
      dialogAddAlly: false,
      dialogVisible: false,
      dialogImageUrl: '',
      thisShow: false,
      num8: 1,
      startEndTime: [],
      // breadcrumbList: [
      //   {title: '营销活动', path: '/marketing/activityLeague?pageChooseIndex=' + this.$route.query.pageChooseIndex},
      //   {title: '联盟', path: ''}
      // ],
      necessary: {
        title: '联盟-基础信息',
        unfold: false
      },
      optional: {
        title: '邀请提醒',
        unfold: false
      },
      rules: {
        unionName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ],
        unionAddress: [
          { required: true, message: '请输入活动地址', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        startEndTimeStr: [
          { required: true, message: '请选择活动时间段', trigger: 'blur' }
        ],
        // 活动说明验证
        activityDescription: [
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ]
      },
      allyInfo: {
        mobile: ''
      },
      // 初始化联盟对象
      StMarketingUnionInfo: {},
      // 所有选中的经销商ID
      allAlly: [],
      // 所有的经销商
      associatedDistributorIdPage: [],
      ruleForm: {
        name: '',
        type: [],
        fileLists: []
      }
    }
  },
  mounted () {
    this.getStMarketingUnionById()
  },
  methods: {
    getStMarketingUnionById () {
      let tempFullUrl = ''
      let item = {}
      let params = {
        unionId: this.$route.query.unionId
      }
      this.$api.getStMarketingUnionById(params).then(res => {
        this.StMarketingUnionInfo = res.data
        if (this.StMarketingUnionInfo.receiveEndTime != null) {
          this.StMarketingUnionInfo.receiveEndTimeStr = this.StMarketingUnionInfo.receiveEndTime
        }
        if (this.StMarketingUnionInfo.associatedDistributorId != null) {
          this.StMarketingUnionInfo.associatedDistributorId.forEach(item => {
            if (item === this.StMarketingUnionInfo.loginDistributorMobil) {
            } else {
              this.AllDealers(item)
            }
          })
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
      })
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
          this.$message.error(res.msg)
        }
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
    handleChange (value) {
    },
    showList (data) {
      if (data) {
        this.thisShow = data
      } else {
        this.thisShow = false
      }
    },
    addAlly () {
      this.dialogAddAlly = true
    },
    submitAlly (formName) {
      this.$api.getMarketingUnionDistributorByMobile(this.allyInfo).then(res => {
        if (res.data) {
          this.allAlly.push(res.data)
        } else {
          this.$message.error('无效的电话号码')
        }
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogAddAlly = false
        } else {
          return false
        }
      })
    },
    // 编辑时 已选中的经销商回显使用
    AllDealers (mobile1) {
      let params = {
        mobile: mobile1
      }
      this.$api.getMarketingUnionDistributorByMobile(params).then(res => {
        if (res.data) {
          this.allAlly.push(res.data)
        } else {
          this.$message.error('无效的电话号码')
        }
      })
    },
    save (formName) {
      // 遍历table中的值.将id放入数组中
      this.allAlly.forEach(item => {
        this.associatedDistributorIdPage.push(item.distributorId)
      })
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
        // 设置参数
        let params = {
          // 联盟ID
          unionId: this.StMarketingUnionInfo.unionId,
          // 版本号
          versionNo: this.StMarketingUnionInfo.versionNo,
          // 联盟名称
          unionName: this.StMarketingUnionInfo.unionName,
          // 活动说明
          activityDescription: this.StMarketingUnionInfo.activityDescription,
          // 开始时间
          startTimeStr: this.StMarketingUnionInfo.startEndTimeStr[0],
          // 结束时间
          endTimeStr: this.StMarketingUnionInfo.startEndTimeStr[1],
          // 关联的所有经销商
          associatedDistributorId: this.associatedDistributorIdPage,
          // 联盟邀请结束时间
          receiveEndTimeStr: this.StMarketingUnionInfo.receiveEndTimeStr,
          // 活动地址
          unionAddress: this.StMarketingUnionInfo.unionAddress
        }
        if (params.versionNo == null || params.versionNo === '') {
          this.$api.marketingUnionAddSave(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.$router.push({ path: '/marketing/activityLeague', query: {pageChooseIndex: this.$route.query.pageChooseIndex} })
              this.$message.success(res.msg)
            } else {
              // 失败提示
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$api.marketingUnionEditSave(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.$router.push({ path: '/marketing/activityLeague', query: {pageChooseIndex: this.$route.query.pageChooseIndex} })
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
    closeDialog () {
      this.allyInfo.mobile = null
    },
    cancel () {
      this.$router.push({ path: '/marketing/activityLeague', query: {pageChooseIndex: this.$route.query.pageChooseIndex} })
    }
  },
  components: {breadCrumb, topTips, marketTable}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
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
        .el-col-12{
          margin-right: 50%;
          .ally-btn{
            background:$main-color;
            color:#fff;
            border:none;
            &:hover{
              opacity: 0.9;
            }
            .dialog-ally{
              width: 100%;
              .demo-ruleForm{
                .ally-send{
                  background:$main-color;
                  color:#fff;
                  border:none;
                  &:hover{
                    opacity: 0.9;
                  }
                }
              }
            }
          }
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
      .form-table{
        padding: 0;
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
          padding:16px 87px;
          border:0;
          &:hover{
            opacity: 0.9;
          }
      }
    }
  }
}
</style>
