<template>
  <div class="comm-Add">
    <!-- <div class="top">
      <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb>
    </div> -->
    <div class="form-group">
      <div class="form-block">
        <!-- <top-tips :title="necessary">:model="stMemberInfo"</top-tips> -->
        <div class="form-list" >
          <el-form  :rules="rules" :model="stMemberInfo" ref="stMemberInfo1" label-width="120px" class="stMemberInfo">
            <el-row :gutter="24">
              <el-col :span="18">
                <el-form-item label="手机号:" prop="mobile">
                  <!-- <el-input v-if="stMemberInfo.source === 'miniApp'" disabled v-model.number="stMemberInfo.mobile" value="12365498778"></el-input>
                  <el-input v-else v-model.number="stMemberInfo.mobile"></el-input> -->
                  <div>{{stMemberInfo.mobile}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="真实姓名:" prop="storeConsumerName">
                  <!-- <el-input v-if="stMemberInfo.source === 'miniApp'" disabled v-model="stMemberInfo.memberNameMini"></el-input>
                  <el-input v-else v-model="stMemberInfo.memberName"></el-input> -->
                  <el-input v-model="stMemberInfo.storeConsumerName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18" :offset="12">
                <el-form-item label="所属区域:">
                    <el-cascader
                      size="large"
                      :props="newprops"
                      :options="options"
                      v-model="areaSelected">
                    </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                  <el-form-item label="详细地址:" prop="detailAddress">
                  <el-input  v-model="stMemberInfo.storeConsumerAddress"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="18">
                  <el-form-item label="性别:" >
                    <el-radio-group v-model="stMemberInfo.storeConsumerSex">
                      <el-radio v-if="stMemberInfo.source === 'miniApp'" label="man">男</el-radio>
                      <el-radio v-if="stMemberInfo.source === 'miniApp'" label="woman">女</el-radio>
                      <el-radio v-if="stMemberInfo.source !== 'miniApp'" label="man">男</el-radio>
                      <el-radio v-if="stMemberInfo.source !== 'miniApp'" label="woman">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="生日:" prop="birthday">
                    <el-date-picker type="date" v-if="stMemberInfo.source === 'miniApp'" placeholder="选择日期" v-model="newBirthday" style="width: 100%;"></el-date-picker>
                    <el-date-picker type="date" v-else placeholder="选择日期" v-model="newBirthday" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="年龄段:" prop="ageGroup">
                      <el-select v-model="stMemberInfo.storeConsumerAgeGroup" placeholder="请选择  ">
                      <el-option label="0~19" value="0~19"></el-option>
                      <el-option label="20~29" value="20~29"></el-option>
                      <el-option label="30~39" value="30~39"></el-option>
                      <el-option label="40~49" value="40~49"></el-option>
                      <el-option label="50~59" value="50~59"></el-option>
                      <el-option label="60以上" value="60以上"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="微信号:" prop="wechatNumber">
                    <el-input v-model="stMemberInfo.storeWechatNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="QQ号:" prop="qqNumber">
                    <el-input v-model="stMemberInfo.storeConsumerQq"></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="18">
                  <el-form-item label="送货地址:" prop="deliveryAddress">
                    <el-input v-model="stMemberInfo.storeConsumerAddress"></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span="18">
                  <el-form-item label="备注:">
                    <el-input type="textarea" v-model="stMemberInfo.storeConsumerComment"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      
      <div class="opeartion">
        <div class="btnStyle">
          <el-button class="cancel" @click="cancel">取消</el-button>
          <el-button class="submit" @click="editData(['stMemberInfo1','stMemberInfo2'])" :loading="loading">{{loading? '提交中':'提交'}}</el-button>
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
      storeConsumerDistinct:[],
      newBirthday:'',
      newBirthdayData:'',
      params:'',
      loading: false,
      dialogVisible: false,
      dialogImageUrl: '',
      thisShow: false,
      num8: 1,
      breadcrumbList: [
        {title: '潜客管理', path: 'submemberManage'},
        {title: '创建潜客', path: ''}
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
        value: 'label',
        // value:"123"
      },
      areaSelected: [],
      stMemberInfo: {},
      //  {
      //   memberId: '',
      //   memberRegion: '',
      //   memberName: '',
      //   memberNameMini: '',
      //   mobile: '',
      //   detailAddress: '',
      //   realSex: '',
      //   birthdayStr: '',
      //   ageGroup: '',
      //   wechatNumber: '',
      //   remarks: '',
      //   source: '',
      //   memberCode: '',
      //   storeId: ''
      // },
      memberId: '',
      storeId: '',
      newBirthday: '',
      // ageGroupList: [],
      rules: {
          storeConsumerName: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ]
      }
    }
  },
  mounted () {
    this.initData()
  },
  watch:{
      newBirthday(nv){
        if(nv){
          this.newBirthdayData = this.getNowTime("yyyy-MM-dd",nv)
        }
      }
  },
  methods: {
    getNowTime(fmt,date){
        var o = {   
          "M+" : date.getMonth()+1,                 //月份   
          "d+" : date.getDate(),                    //日   
          "h+" : date.getHours(),                   //小时   
          "m+" : date.getMinutes(),                 //分   
          "s+" : date.getSeconds(),                 //秒   
          "q+" : Math.floor((date.getMonth()+3)/3), //季度   
          "S"  : date.getMilliseconds()             //毫秒   
        };   
        if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
        for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
        return fmt;  
    },
    showList (data) {
      if (data) {
        this.thisShow = data
      } else {
        this.thisShow = false
      }
    },
    cancel () {
      this.$router.push({path: '/myStore/member/submemberManage'})
    },
    initData () {
      this.memberId = this.$route.query.memberId
      this.storeId = this.$route.query.storeId
      this.getSubMemberInfo(this.memberId, this.storeId)
    },
    getSubMemberInfo (memberId, storeId) {
      var _this = this
      let params = {
        memberId: memberId,
        storeId: storeId
      }
      this.$api.getSubMemberInfo(params).then(res => {
        // this.stMemberInfo.memberId = res.data.memberId
        // this.stMemberInfo.memberName = res.data.memberName
        this.stMemberInfo = res.data
        this.newBirthday = res.data.storeConsumerBirthdayStr
        if (res.data.memberRegion !== undefined && res.data.memberRegion !== null && res.data.memberRegion !== '') {
          let areaSelectedTemp = JSON.parse(res.data.memberRegion)
          areaSelectedTemp.forEach(item => {
            this.areaSelected.push(item)
          })
        }
        // this.stMemberInfo.mobile = res.data.mobile
        // this.stMemberInfo.detailAddress = res.data.detailAddress
        // this.stMemberInfo.realSex = res.data.realSex
        // this.stMemberInfo.birthdayStr = res.data.birthdayStr
        // this.stMemberInfo.ageGroup = res.data.ageGroup
        // this.stMemberInfo.wechatNumber = res.data.wechatNumber
        // this.stMemberInfo.remarks = res.data.remarks
        // this.stMemberInfo.source = res.data.source
        console.log(this.stMemberInfo.source)
        console.log(res.data.memberName)
        if (_this.stMemberInfo.source === 'miniApp') {
          if (_this.checknum(res.data.memberName) && res.data.memberName.length === 4) {
            _this.stMemberInfo.memberNameMini = '尾号为' + res.data.memberName + '的客户'
          } else {
            _this.stMemberInfo.memberNameMini = res.data.memberName
          }
        }
        this.stMemberInfo.memberCode = res.data.memberCode
        this.stMemberInfo.storeId = res.data.storeId
      })
    },
    // 校验字符串是否为纯数字
    checknum (num) {
      var reg = new RegExp('^[0-9]*$')
      if (reg.test(num)) {
        return true
      }
      return false
    },
    uuid() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23];

            var uuid = s.join("");
            return uuid;
    },
    editData (formName) {
      // 全局上下文
      var context = this
      // 保存表单校验结果
      let correctList = []
      // for (var value of formName) {
      //   context.$refs[value].validate((valid) => {
      //     correctList.push(valid)
      //   })
      // }
      // 判断校验结果中是否存在false值
      if (correctList.indexOf(false) === -1) {
        this.loading = true
        let area = []
        area = this.areaSelected.slice(0, 3)
        this.stMemberInfo.storeConsumerDistinct = JSON.stringify(area)
        // context.params = context.stMemberInfo
        context.params = {
          storeConsumerBirthdayStr: context.stMemberInfo.storeConsumerBirthdayStr,
          memberId: context.stMemberInfo.memberId,
          // nikiName: this.stMemberInfo.nikiName,
          subId: context.stMemberInfo.subId,
          storeId: context.stMemberInfo.storeId,
          storeConsumerQq: context.stMemberInfo.storeConsumerQq,
          // storeWechatNumber:  context.stMemberInfo.storeWechatNumber,
          // inviter: this.stMemberInfo.inviter,
          memberCode: context.stMemberInfo.memberCode,
          storeConsumerDistinct: context.stMemberInfo.storeConsumerDistinct,
          storeConsumerName: context.stMemberInfo.storeConsumerName,
          mobile: context.stMemberInfo.mobile?context.stMemberInfo.mobile:'18621822899',
          // mobile: context.stMemberInfo.mobile?context.stMemberInfo.mobile:null,
          storeConsumerAddress: context.stMemberInfo.storeConsumerAddress,
          storeConsumerSex: context.stMemberInfo.storeConsumerSex,
          storeConsumerAgeGroup: context.stMemberInfo.storeConsumerAgeGroup,
          storeWechatNumber: context.stMemberInfo.storeWechatNumber,
          storeConsumerComment: context.stMemberInfo.storeConsumerComment
        }
        context.params.storeConsumerBirthdayStr = context.newBirthdayData
        if(context.stMemberInfo.storeConsumerName && context.stMemberInfo.storeConsumerName != ""){
          this.$api.subMemberEditSave(context.params).then(res => {
          if (res.code === 0) {
            // 成功返回列表页面
            this.$message.success(res.msg)
            this.$router.push({path: '/myStore/member/submemberManage'})
          } else {
            // 失败提示
            this.$message.error(res.msg)
          }
          this.loading = false
          })
        }else{
          this.loading = false
          this.$message.error('请输入真实姓名')
        }
        
      } else {
        this.$message.error('请按要求填写页面红色标注必填项')
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss">
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
        // padding: 0 70px;
        padding: 0 10px;
        .form-title{
          width: 200px;
          position:absolute;
          color: $text-adorn-color;
          font-size: $xs-size;
          right: -200px;
          top: 0;
          padding-left:20px;
        }
        .el-col-18{
          margin-right: 25%;
          .el-input-number{
            width:100%;
            line-height: 34px;
            .el-input-number__increase{
              line-height: 17px;
            }
          }
          .el-form-item {
            height: 50px;
            line-height: 50px;
            margin-bottom: 30px;
            
            .el-form-item /deep/ .el-input {
              height: 50px;
              line-height: 50px;
              .el-input__inner {
                height: 50px;
              }
            }
            .el-form-item__content {
              line-height: 50px; 
              .el-input {
                height: 50px;
                
              }
            }
            .el-form-item__label {
              line-height: 50px;
              height: 50px;
              padding: 0 20px 0 0;
              color: #303133;
            }
            .el-input__inner {
              line-height: 50px;
              height: 50px;
            }
            .el-form-item__error {
                  padding-top: 4px;
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
      justify-content: flex-start;
      // justify-content: center;
      // margin: 50px 0;
      margin: 80px 0;
      .btnStyle {
        margin-left: 175px;
      }
      button{
        padding:15px 57px;
      }
      .submit{
          @include linear-grad;
          color:#fff;
          // padding:16px 87px;
          padding:16px 77px;
          margin-left: 120px;
          border:0;
          &:hover{
            opacity: 0.9;
          }
      }
      .cancel{
        padding:16px 77px;
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