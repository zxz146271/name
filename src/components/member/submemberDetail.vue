<template>
  <div class="detail">
    <div class="content">
      <el-form label-width="120px" :rules="rules" :model="contents" ref="contents">
        <el-row :gutter="24">
          <el-col :span="22">
            <el-form-item label="接待时间:" prop="choseTime" id="receptionTime">
              <!-- <el-input placeholder="请输入时间" v-model="inputTime"></el-input> -->
              <el-date-picker v-model="contents.choseTime" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="接待状态:" prop="value">
              <el-select placeholder="未接待" v-model="contents.value" value-key="label">
                <el-option v-for="item in contents.options" :label="item.label" :key="item.id" :value="item.label"></el-option>
                <!-- <el-option label="正在接待" value="正在接待"></el-option>
                <el-option label="已接待" value="已接待"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="22">
            <el-form-item style="padding-bottom:5px;" label="接待详情:" prop="textareaValue">
              <el-input type="textarea" placeholder="请输入内容,最多255个字" @input="getInputNum" maxlength="255" v-model="contents.textareaValue"></el-input>
            </el-form-item>
              <span style="position:absolute;top:175px;right:65px;color: #909399;margin-right: 5px;">还可以输入{{allNum}}个字</span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="opeartion">
      <div class="btnStyle">
        <el-button class="cancel" v-if="stMemberInfo" @click="cancel()">取消</el-button>
        <el-button class="cancel" v-else @click="getCloseMember()">取消</el-button>
        <el-button class="submit" :disable="subBtnDisable" @click="editData('contents')">
          {{ loading?"提交中":'提交'}}
        </el-button>
      </div>
    </div>
  </div>

</template>
<script>
  import {
    O_RDONLY
  } from 'constants';
  import api from '@/service/api';

  export default {
    data() {
      return {
        allNum: 255,
        // stMemberReceptionRecord:{},
        // label: '',
        receivingDetail: '',
        timeS: '',
        subBtnDisable: false,
        inputTime: '',
        contents: {
          textareaValue: '',
          choseTime: '',
          value: '',
          options: [{
          // id: '选项1',
          label: '未接待'
        }, 
        // {
        //   id: '选项2',
        //   label: '正在接待'
        // }, 
        {
          // id: '选项3',
          label: '已接待'
        }],
        },
        rules: {
          choseTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          value: [
            { required: true, message: '请选择接待类型', trigger: 'change' }
          ],
          textareaValue: [
            { required: true, message: '请填写接待详情', trigger: 'blur' }
          ]
        }
      }
    },
    // 接收传过来的数组对象
    // props: ['stsubmemberDetail'],
    props: {
      loading: Boolean,
      stMemberInfo: Object,
      stMemberInfoDetail: Object,
      subMemberList: Object,
      memberList: Object,
    },
    // mounted() {
    //   this.timeS = this.choseTime.split(".")[0]
    // },
    watch: {
      'contents.choseTime'(nv) {
        // this.timeS = this.choseTime.split(".")[0]
        if(nv){
          this.timeS = this.getNowTime("yyyy-MM-dd hh:mm:ss", nv)
        }
      }
    },
    methods: {
      getInputNum(){
        var num = this.contents.textareaValue.length
        this.allNum = 255 - num
      },
      getCloseMember() {
        this.$emit('handleCloseMember')
      },
      getRelist(a) {
        this.$emit('getSubMemberList', a)
      },
      getMemberRelist(a) {
        this.$emit('getMemberList', a)
      },
      getNowTime(fmt, date) {
        var o = {
          "M+": date.getMonth() + 1, //月份   
          "d+": date.getDate(), //日   
          "h+": date.getHours(), //小时   
          "m+": date.getMinutes(), //分   
          "s+": date.getSeconds(), //秒   
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
          "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      },
      // getNowTime(ns){
      //   var d = new Date(ns).getTime();
      //   var dformat = [ d.getFullYear(), d.getMonth() + 1, d.getDate() ].join('-') + ' ' + [ d.getHours(), d.getMinutes(), d.getSeconds() ].join(':');
      //   return dformat;
      // },
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
      editData(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (!valid) {
            this.subBtnDisable = true;
            setTimeout(() => {
              this.subBtnDisable = false;
            }, 2000);
            return;
          }
        // let stMemberReceptionRecord = {
        //   memberId: this.stMemberInfo.subId,
        //   createTime: this.inputTime,
        //   receptionState: this.value,
        //   textareaValue: this.textareaValue,
        //   receptionId: this.uuid()
        // }
        // this.timeS = this.choseTime.split(".")[0]
        // this.timeS = this.choseTime.replace(/T/,' ')
        if (this.stMemberInfo && this.timeS && this.contents.value && this.contents.textareaValue) {
          await api.subMemberEditAdd({
            memberId: this.stMemberInfo.subId,
            purchaseTimeStr: this.timeS,
            receptionState: this.contents.value,
            storeId: this.stMemberInfo.storeId,
            receptionDetail: this.contents.textareaValue,
            receptionId: this.uuid()
          }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              // 成功返回列表页面
              // this.$router.push({path: '/myStore/member/submemberInfoDetail'})
              this.$emit("handleClose2");
              this.getRelist(this.subMemberList)
              this.allNum = 255;
              this.contents.value = ''
              this.contents.choseTime = ''
              this.contents.textareaValue = ''
            } else {
              // 失败提示
              this.$message.error(res.msg)
              this.$emit("handleClose2");
            }
            this.loading = false
          })
        }
        // } else if(this.stMemberInfo && !this.timeS || !this.contents.value.label || !this.contents.textareaValue){
        //   this.$message.error('请输入必选项')
        // }

        if (this.stMemberInfoDetail && this.timeS && this.contents.value && this.contents.textareaValue) {
          await api.MemberEditAdd({
            memberId: this.stMemberInfoDetail.subId,
            storeId: this.stMemberInfoDetail.storeId,
            purchaseTimeStr: this.timeS,
            receptionState: this.contents.value,
            receptionDetail: this.contents.textareaValue,
            receptionId: this.uuid()
          }).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              // this.$router.push({path: '/myStore/member/submemberInfoDetail'})
              // this.$router.push({path: '/myStore/member/submemberManage'})
              this.$message.success(res.msg)
              // this.receivingDetail = false
              this.allNum = 255;
              this.getCloseMember()
              // this.$emit("handleClose2");
              // this.getRelist(this.subMemberList)
              this.getMemberRelist(this.memberList)
              this.contents.value = ''
              this.contents.choseTime = ''
              this.contents.textareaValue = ''
              // location.reload()
            } else{
              // 失败提示
              this.$message.error(res.msg)
              this.getCloseMember()
            }
            this.loading = false
          })
        } 
        // else if(this.stMemberInfoDetail && !this.timeS || !this.value.label || !this.contents.textareaValue) {
        //   this.$message.error('请输入必选项')
        // }
        });
  
        // this.$emit("editData",stMemberReceptionRecord);
      },
      cancel() {
        this.$emit("handleClose2");
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import '../../assets/style/mixins/var';

  .detail {
    padding: 0 30px 10px 30px;

    // display: flex;
    .content {
      .el-col-10 {
        margin-right: 8.333333%;
      }
    }

    .opeartion {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      margin: 30px 0 0;

      .btnStyle {
        margin-left: 220px;
      }

      button {
        padding: 10px 24px;
      }

      .submit {
        @include linear-grad;
        color: #fff;
        // padding:16px 87px;
        padding: 10px 24px;
        margin-left: 34px;
        border: 0;

        &:hover {
          opacity: 0.9;
        }
      }

      .cancel {
        padding: 10px 24px;
      }
    }
  }

</style>
