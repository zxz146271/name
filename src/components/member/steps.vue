<template>
  <div class="steps">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="下载模板"></el-step>
      <el-step title="上传文件"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <div class="step-list">
      <div class="step-item filedown" v-show="active===0">
        <div class="down-block">
          <div class="item-bg">
            <a href="http://"><img src="../../assets/image/icon/icon-filedown.png" alt="" class="icon-filedown"></a>
          </div>
          <p>已购客户信息模版下载</p>
        </div>
      </div>
      <div class="step-item fileup" v-show="active===1">
        <input id="upload" type="file" @change="importfxx(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        <!-- <el-upload
          class="upload-block"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-progress="upProgress"
          multiple>
          <div v-show="!isprogress">
            <i class="icon-fileup"></i>
            <div class="el-upload__text">
              <p class="up-tips">点击或将文件拖拽到这里上传</p>
              <p>支持扩展名：<span class="red-text">.xls .csv .xslx</span></p>
            </div>
          </div>
        </el-upload> -->
      </div>
      <div class="step-item compass" v-show="active===2">
        <div class="failure-view" v-show="!isSuccess">
          <div class="failure-tips">
            <div class="left">
              <p> <i class="el-icon-warning"></i> 请注意！共130条已购客户信息，成功导入128条，失败2条！</p>
              <p>请在下面查看导入失败的原因，并修改出错的已购客户信息重新上传即可</p>
            </div>
            <div class="right">
              <el-button class="view-btn">查看导入已购客户</el-button>
            </div>
          </div>
          <div class="failure-comm">
            <top-tips :title="optional" @showList="showList"></top-tips>
            <el-collapse-transition>
              1
            </el-collapse-transition>
          </div>
        </div>
        <div class="success-view" v-show="isSuccess">
          <div>
            <div>
              <i class="el-icon-success"></i>
            </div>
            <p class="text-tips">128个已购客户全部导入成功！</p>
            <el-button class="btn-view">查看导入已购客户</el-button>
          </div>
          </div>
      </div>
    </div>
    <div class="foot-tips">
      <div class="tips">
        <p v-show="active===0">若已有模板，可直接点击【下一步】，跳过此步骤</p>
        <p v-show="active===1">注意：只能上传一个文件</p>
        <p v-show="active===2&&isSuccess">提示：导入成功</p>
        <p v-show="active===2&&!isSuccess">建议：重新导入缺失已购客户</p>
      </div>
      <el-button @click="next" v-show="active!==2">下一步</el-button>
      <el-button @click="back" v-show="active===2">返回已购客户管理</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isprogress: false,
      optional: {
        title: '倒入失败的已购客户：',
        unfold: true
      },
      thisShow: false,
      isSuccess: true,
      importData: [],
      outdata: []
    }
  },
  props: ['active'],
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0
      if (this.active === 0) {
        this.checkData(this.outdata)
      }
    },
    upProgress () {
      this.isprogress = true
    },
    showList (data) {
      if (data) {
        this.thisShow = data
      } else {
        this.thisShow = false
      }
    },
    back () {
      this.$emit('refresh')
    },
    importfxx (obj) {
      // 通过DOM取文件数据
      var _this = this
      this.file = event.currentTarget.files[0]
      var rABS = false// 是否将文件读取为二进制字符串
      var f = this.file
      var reader = new FileReader()
      // if(!FileReader.prototype.readAsBinaryString){
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = ''
        var rABS = false// 是否将文件读取为二进制字符串
        var wb // 读取完成的数据
        var outdata
        var reader = new FileReader()
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          var XLSX = require('xlsx')
          if (rABS) {
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])// outdata就是你想要的东西
          _this.outdata = outdata
        }
        reader.readAsArrayBuffer(f)
      }
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    checkData (outdata) {
      var _this = this
      let stMemberInfo = {}
      outdata.forEach(item => {
        stMemberInfo.memberName = item.已购客户姓名
        stMemberInfo.mobile = item.电话
        stMemberInfo.realSex = item.性别
        stMemberInfo.birthdayStr = item.生日
        stMemberInfo.source = item.来源
        let params = stMemberInfo
        this.$api.stMemberInitAdd(params).then(res => {
          if (res.code === 0) {
            // 成功返回列表页面
            this.$router.push({path: '/myStore/member/memberAdministration'})
          } else {
            // 失败提示
            this.$message.error(res.msg)
          }
        })
        _this.importData.push(stMemberInfo)
      })
      // let params = _this.importData
      // this.$api.importMember(params).then(res => {
      //   if (res.code === 0) {
      //     // 成功返回列表页面
      //     this.$router.push({path: '/member'})
      //   } else {
      //     // 失败提示
      //     this.$message.error(res.msg)
      //   }
      // })
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.steps{
  margin-top: 30px;
  .foot-tips{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    padding: 0 20px;
    .tips{
      p{
        font-size: $xs-size;
      }
    }
  }
  .step-list{
    height: 300px;
    padding:40px 140px;
    display: flex;
    align-items: center;
    .step-item{
      height: 100%;
      flex: 1;
      text-align: center;
      .icon-filedown{
        width:60px;
      }
      .item-bg{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        a{
          width: 100px;
          height: 100px;
          background-image: linear-gradient(180deg,rgba(218, 234, 245, 0.8),rgba(183, 211, 232, 1));
          border-radius: 4px;
          img{
            margin-top: 26px;
          }
        }
      }
      p{
        font-size: $xs-size;
        color:$text-gray-color;
        text-align: center;
      }
      .upload-block{
        border:1px dashed $main-color;
      }
      &.fileup{
        .icon-fileup{
          @include icon(63px,50px, '../../assets/image/icon/icon-fileup.png')
        }
        .up-tips{
          color:$text-main-color;
        }
        .red-text{
          color:$main-color;
        }
      }
      &.filedown{
        display: flex;
        justify-content: center;
        align-items: center;
        .down-block{
          p{
            margin-top: 6px;
          }
        }
      }
      &.compass{
        .failure-view{
          .failure-tips{
            display: flex;
            justify-content: space-between;
            padding:14px 20px;
            border:1px solid #FFAB00;
            border-radius: 4px;
            background-color: #FDF8F3;
            align-items: center;
            .left{
              position: relative;
              p{
                text-align: left;
                padding-left:30px;
                &:nth-child(1){
                  font-size: $xs-size;
                  color:$text-main-color;
                }
                .el-icon-warning{
                  font-size: 18px;
                  color:#FFAB00;
                  position: absolute;
                  left: 0;
                  top: 5px;
                }
              }
            }
            .right{
              .view-btn{
                background: $yello-color;
                border-color: $yello-color;
                color: #FFF;
                &:hover{
                  background:lighten($yello-color, 6%);
                  border-color: lighten($yello-color, 6%);
                }
              }
            }
          }
          .failure-comm{
            .top-tips{
              height:30px;
              margin: 4px 0;
            }
          }
        }
        .success-view{
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          .el-icon-success{
            font-size: 40px;
            color:$main-color;
          }
          .text-tips{
            margin: 20px 0;
            color:$text-main-color;
            font-size: $md-size;
          }
          .btn-view{
            border-color:#6FADEC;
            color:#fff;
            background-color:#6FADEC;
            padding:8px 18px;
            &:hover{
              border-color:lighten(#6FADEC, 6%);
              background-color:lighten(#6FADEC, 6%);
            }
          }
        }
      }
    }
  }
}
</style>
