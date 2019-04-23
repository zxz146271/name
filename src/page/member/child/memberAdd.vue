<template>
  <div class="comm-Add">
    <div class="top">
      <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb>
    </div>
    <div class="form-group">
      <div class="form-block">
        <top-tips :title="necessary"></top-tips>
        <div class="form-list" >
          <el-form :model="stMemberInfo" :rules="rules" ref="stMemberInfo1" label-width="120px" class="stMemberInfo">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="真实姓名" prop="memberName">
                  <el-input v-model="stMemberInfo.memberName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model.number="stMemberInfo.mobile"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="form-block">
        <top-tips :title="optional" @showList="showList"></top-tips>
          <div class="form-list" v-show="thisShow">
            <el-form  :model="stMemberInfo" :rules="rules" ref="stMemberInfo2" label-width="120px" class="stMemberInfo">
              <el-row :gutter="24">
                <el-col :span="12" :offset="12">
                <el-form-item label="所属区域">
                    <el-cascader
                      size="large"
                      :props="newprops"
                      :options="options"
                      v-model="areaSelected">
                    </el-cascader>
                </el-form-item>
              </el-col>
                <el-col :span="12">
                   <el-form-item label="详细地址" prop="detailAddress">
                    <el-input v-model="stMemberInfo.detailAddress"></el-input>
                  </el-form-item>
                </el-col>
               <el-col :span="24">
                  <el-form-item label="性别" >
                    <el-radio-group v-model="stMemberInfo.realSex">
                      <el-radio label="man">先生</el-radio>
                      <el-radio label="woman">女士</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="生日" prop="birthday">
                    <el-date-picker type="date" placeholder="选择日期" v-model="stMemberInfo.birthdayStr" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="年龄段" prop="ageGroup">
                  <el-select v-model="stMemberInfo.ageGroup" placeholder="请选择  ">
                  <el-option label="0~19" value="0~19"></el-option>
                  <el-option label="20~29" value="20~29"></el-option>
                  <el-option label="30~39" value="30~39"></el-option>
                  <el-option label="40~49" value="40~49"></el-option>
                  <el-option label="50~59" value="50~59"></el-option>
                  <el-option label="60以上" value="60以上"></el-option>
                </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="微信号" prop="wechatNumber">
                    <el-input v-model="stMemberInfo.wechatNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="备注">
                    <el-input type="textarea" v-model="stMemberInfo.remarks"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
      </div>
      <div class="opeartion">
        <div>
          <el-button class="cancel" @click="cancel">取消</el-button>
          <el-button class="submit" @click="saveData(['stMemberInfo1','stMemberInfo2'])">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
import { regionData } from 'chinaArea'
export default {
  components: {breadCrumb, topTips},
  data () {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      thisShow: false,
      num8: 1,
      breadcrumbList: [
        {title: '会员管理', path: '/member'},
        {title: '会员新增', path: ''}
      ],
      necessary: {
        title: '基础信息（必填）',
        unfold: false
      },
      optional: {
        title: '其他信息（选填）',
        unfold: true
      },
      // 省市区
      options: regionData,
      newprops: {
        value: 'label'
      },
      areaSelected: [],
      stMemberInfo: {
        memberId: '',
        nikiName: '',
        source: '',
        inviter: '',
        memberRegion: '',
        memberName: '',
        mobile: '',
        detailAddress: '',
        realSex: '',
        birthdayStr: '',
        ageGroup: '',
        wechatNumber: '',
        remarks: '',
        imageUrl: '',
        fileLists: []
      },
      fileLists: [],
      // ageGroupList: [],
      rules: {
        memberName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { max: 10, message: '姓名长度不能超过10', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
        ],
        detailAddress: [
          { max: 50, message: '详细地址不能超过50字', trigger: 'blur' }
        ],
        remarks: [
          { max: 200, message: '备注不能超过200字', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // this.initData()
  },
  methods: {
    // initData () {
    //   var _this = this
    //   _this.$api.stMemberInitAdd().then(res => {
    //     _this.ageGroupList = res.ageGroupList
    //   })
    // },
    showList (data) {
      if (data) {
        this.thisShow = data
      } else {
        this.thisShow = false
      }
    },
    cancel () {
      this.$router.push({path: '/myStore/member/memberAdministration'})
    },
    saveData (formName) {
      var _this = this
      // 保存表单校验结果
      let correctList = []
      for (var value of formName) {
        _this.$refs[value].validate((valid) => {
          correctList.push(valid)
        })
      }
      // 判断校验结果中是否存在false值
      if (correctList.indexOf(false) === -1) {
        let area = []
        area = this.areaSelected.slice(0, 3)
        this.stMemberInfo.memberRegion = JSON.stringify(area)
        let params = this.stMemberInfo
        this.$confirm('确定保存吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.stMemberAddSave(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.$router.push({path: '/myStore/member/memberAdministration'})
            } else {
              // 失败提示
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          })
        })
      } else {
        this.$message.error('请按要求填写页面红色标注必填项')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.comm-Add{
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
      .people-detail{
        padding: 30px 0;
        ul{
          display: flex;
          li{
            flex: 1;
            margin-right: 5px;
            display: flex;
            font-size: $md-size;
            &:nth-child(1){
              border-bottom:2px solid $text-red-color;
              span{
                background-image: url("../../../assets/image/i-bg4@2x.png");
              }
              p{
                color:$text-red-color;
              }
            }
            &:nth-child(2){
              border-bottom:2px solid $yello-color;
              span{
                background-image: url("../../../assets/image/i-bg3@2x.png");
              }
              p{
                color:$yello-color;
              }
            }
            &:nth-child(3){
              border-bottom:2px solid $adorn-color-2;
              span{
                background-image: url("../../../assets/image/i-bg2@2x.png");
              }
              p{
                color:$adorn-color-2;
              }
            }
            &:nth-child(4){
              border-bottom:2px solid $blue-color;
              span{
                background-image: url("../../../assets/image/i-bg1@2x.png");
              }
              p{
                color:$blue-color;
              }
            }
            span{
              width: 75px;
              background-size: cover;
              background-repeat: no-repeat;
              padding: 3px 0 3px 10px;
              color:#fff;
            }
            p{
              line-height: 25px;
            }
          }
        }
      }
      .form-list{
        margin-top: 28px;
        padding: 0 70px;
        .form-title{
          width: 200px;
          position:absolute;
          color: $text-adorn-color;
          font-size: $xs-size;
          right: -200px;
          top: 0;
          padding-left:20px;
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
      .cancel{
        padding:16px 87px;
      }
    }
  }
}
// 用户图像样式
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
