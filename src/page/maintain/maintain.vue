<template>
  <div class="main">
  <div class="order">
    <div class="fix-header">
      <x-header></x-header>
      <!-- <child-nav :navList="navList"></child-nav> -->
    </div>
    <div class="main-cont">
      <top-tips class="title" :title="necessary"></top-tips>
      <div class="form-group">
          <div class="form-block">
            <div class="form-list">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="经销商名称" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="所在地区" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户电话" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="营业执照" prop="name" class="upload-item">
                      <!-- :data="{bid: stGoodsInfo.goodsId}" -->
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: stGoodsInfo.goodsId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-success="fileUploadSuccess"
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
                    <el-form-item label="注册号" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="法定代表人" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="公司名称" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="地址" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="opeartion">
            <div>
               <el-button class="submit_add">
                  保存
                </el-button>
                <el-button class="submit">
                  提交审核
                </el-button>
            </div>
          </div>
        </div>
    </div>
  </div>
    <x-footer></x-footer>
  </div>
</template>
<script>
import xHeader from '../../components/header/header'
import childNav from '../../components/public/childNav'
import xFooter from '../../components/footer/footer'
import topTips from '../../components/public/topTips'
export default {
  data () {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      necessary: {
        title: '经销商维护信息',
        unfold: false
      },
      selectedOptions: [],
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      // 列表声明一个空对象
      stGoodsInfo: ''
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
  // 数据初始化方法
  mounted () {
    this.getStGoodsInfo()
  },
  methods: {
    // 获取商品信息详情
    getStGoodsInfo () {
      let params = {
        goodsId: this.$route.query.goodsId
      }
      this.$api.getStGoodsInfo(params).then(res => {
        this.stGoodsInfo = res.data
      })
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
    //  文件上传成功后的回调
    fileUploadSuccess (file, fileList) {
      let thisFile = [{
        name: fileList.name,
        url: fileList.url
      }]
      // this.ruleForm.fileLists 图片列表
      this.ruleForm.fileLists = [...this.ruleForm.fileLists, ...thisFile] // 数组合并
    },
    // 删除文件
    handleRemove (file, fileList) {
      // 要删除的文件
      this.deletFile = fileList
      this.ruleForm.fileLists.splice(this.ruleForm.fileLists.findIndex(v => {
        return v.uid === this.deletFile.uid
      }), 1)
      this.deletFile = ''
    },
    // 提交
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将页面对象赋予参数传递给后台
          this.stGoodsInfo.teststr = ['a', 'b']
          let params = this.stGoodsInfo
          // let params = {
          //   goodsId: this.stGoodsInfo.goodsId,
          //   teststr: ['a', 'b']
          // }
          this.$api.editStGoodsInfo(params).then(res => {
            // if (res.code === 0) {
            //   this.$router.push({path: '/'})
            // } else {
            //   this.$message.error(res.msg)
            // }
          })
        }
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    showList (data) {
      if (data) {
        this.thisShow = data
      } else {
        this.thisShow = false
      }
    },
    closeDialog (value) {
      this.importComm = false
      // 选择的商品分类
    }
  },
  components: {xHeader, childNav, xFooter, topTips}
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.order{
  min-height: 100%;
  height: auto !important;
  height: 100%;
  margin: 0 auto -40px;
  padding-bottom: 40px;
  .fix-header{
    position: fixed;
    left:0;
    right:0;
    top:0;
    z-index: 9;
  }
  .main-cont{
    padding-top: 66px;
    margin: 0 auto;
    .title{
      margin:20px 0;
    }
    .form-group{
    margin-top: 20px;
      .form-block{
        .form-list{
          margin-top: 28px;
          padding: 0 70px;
          .radio-popup{
            display: flex;
            margin-bottom: 18px;
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
        margin: 30px 0 50px 0;
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
}
</style>
