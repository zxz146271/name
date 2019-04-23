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
            <!-- <a :href="$config().downloadFile" download target="_blank"><img src="../../assets/image/icon/icon-filedown.png" alt="" class="icon-filedown"></a> -->
            <a href="/static/template/goodsExcel.xlsx" download="goodsExcel.xlsx"><img src="../../assets/image/icon/icon-filedown.png" alt="" class="icon-filedown"></a>
            <!-- <form method='get' :action="$config().downloadFile" ref="myform"><img src="../../assets/image/icon/icon-filedown.png" alt="" class="icon-filedown" @click="downloadFile"></form> -->
          </div>
          <p>商品信息模版下载</p>
        </div>
      </div>
      <div class="step-item fileup" v-show="active===1">
        <!-- <input id="upload" type="file" @change="importfxx(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" /> -->
        <el-upload
          class="upload-block"
          drag
          action=""
          :on-progress="upProgress"
          :before-upload= "beforeAvatarUpload">
          <div v-show="!isprogress">
            <i class="icon-fileup"></i>
            <div class="el-upload__text">
              <p class="up-tips">点击或将文件拖拽到这里上传</p>
              <p>支持扩展名：<span class="red-text">.xls .xslx</span></p>
            </div>
          </div>
          <div v-show="fileName">
            <p class="up-tips">{{fileName}}</p>
          </div>
        </el-upload>
      </div>
      <div class="step-item compass" v-show="active===2">
        <div class="failure-view" v-show="!isSuccess">
          <div class="failure-tips">
            <div class="left">
              <p> <i class="el-icon-warning"></i> 请注意！共{{ total }}条商品信息，成功导入{{ total-items.length }}条，失败{{ items.length }}条！</p>
              <p>请在下面查看导入失败的原因，并修改出错的商品信息重新上传即可</p>
            </div>
            <div class="right">
              <!-- <el-button class="view-btn" @click="backObtained">查看导入商品</el-button> -->
            </div>
          </div>
          <div class="failure-comm">
            <el-table :data="items" max-height="300">
              <el-table-column prop="num" label="报错行数" align="left"></el-table-column>
              <el-table-column prop="goodsName" label="商品名称" align="left"></el-table-column>
              <el-table-column prop="remarks" label="报错原因" align="left"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="success-view" v-show="isSuccess">
          <div>
            <div>
              <i class="el-icon-success"></i>
            </div>
            <p class="text-tips">{{ total }}个商品全部导入成功！</p>
            <!-- <el-button class="btn-view" @click="backObtained">查看导入商品</el-button> -->
          </div>
          </div>
      </div>
    </div>
    <div class="foot-tips">
      <div class="tips">
        <p v-show="active===0">若已有模板，可直接点击【下一步】，跳过此步骤</p>
        <p v-show="active===1">注意：只能上传一个文件</p>
        <p v-show="active===2&&isSuccess">提示：导入成功</p>
        <p v-show="active===2&&!isSuccess">建议：重新导入缺失商品</p>
      </div>
      <el-button @click="next" v-show="active!==2">下一步</el-button>
      <el-button @click="back" v-show="active===2">返回商品管理</el-button>
    </div>
  </div>
</template>
<script>
import topTips from './topTips'
export default {
  data () {
    return {
      isprogress: false,
      outdata: '',
      optional: {
        title: '导入失败的商品：',
        unfold: true
      },
      thisShow: false,
      isSuccess: true,
      active: this.activer,
      total: 0,
      file: '',
      fileName: '',
      items: []
    }
  },
  props: ['activer'],
  methods: {
    downloadFile () {
      // this.$refs.myform.submit()
      window.open(this.$config().downloadFile)
      // try {
      //   var elemIF = document.createElement('iframe')
      //   elemIF.src = this.$config().downloadFile
      //   elemIF.style.display = 'none'
      //   document.body.appendChild(elemIF)
      // } catch (e) {}
    },
    next () {
      if (this.active === 1) {
        if (this.file === '') {
          this.$message.error('请选择导入的文件')
        } else {
          this.importGoods(this.file)
          this.active++
        }
      } else {
        this.active++
      }
    },
    upProgress () {
      this.isprogress = true
    },
    back () {
      this.$emit('refresh')
      this.active = 0
    },
    backObtained () {
      // window.localStorage.setItem('storeState', '4')
      // this.$emit('refresh')
      // this.active = 0
      this.$root.$emit('handle')
    },
    initData () {
      this.active = 0
    },
    importGoods (file) {
      let fd = new window.FormData()
      fd.append('file', file)
      this.$api.importGoods(fd).then(res => {
        if (res.code === 0) {
          console.log(res.data.length)
          this.total = res.count
          if (res.data == null || res.data.length === 0) {
            this.isSuccess = true
          } else {
            this.items = res.data
            this.isSuccess = false
          }
        }
      })
    },
    cancel () {

    },
    // 验证上传文件
    beforeAvatarUpload (file) {
      this.fileName = file.name
      this.file = file
    }
  },
  components: { topTips }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.steps {
  margin-top: 30px;
  .foot-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    padding: 0 20px;
    .tips {
      p {
        font-size: $xs-size;
      }
    }
  }
  .step-list {
    height: 400px;
    padding: 40px 140px;
    display: flex;
    align-items: center;
    .step-item {
      height: 100%;
      flex: 1;
      text-align: center;
      .icon-filedown {
        cursor: pointer;
        width: 60px;
      }
      .item-bg {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        a {
          width: 100px;
          height: 100px;
          background-image: linear-gradient(
            180deg,
            rgba(218, 234, 245, 0.8),
            rgba(183, 211, 232, 1)
          );
          border-radius: 4px;
          img {
            margin-top: 26px;
          }
        }
      }
      p {
        font-size: $xs-size;
        color: $text-gray-color;
        text-align: center;
      }
      .upload-block {
        border: 1px dashed $main-color;
      }
      &.fileup {
        .icon-fileup {
          @include icon(63px, 50px, '../../assets/image/icon/icon-fileup.png');
        }
        .up-tips {
          color: $text-main-color;
        }
        .red-text {
          color: $main-color;
        }
      }
      &.filedown {
        display: flex;
        justify-content: center;
        align-items: center;
        .down-block {
          p {
            margin-top: 6px;
          }
        }
      }
      &.compass {
        .failure-view {
          .failure-tips {
            display: flex;
            justify-content: space-between;
            padding: 14px 20px;
            border: 1px solid #ffab00;
            border-radius: 4px;
            background-color: #fdf8f3;
            align-items: center;
            .left {
              position: relative;
              p {
                text-align: left;
                padding-left: 30px;
                &:nth-child(1) {
                  font-size: $xs-size;
                  color: $text-main-color;
                }
                .el-icon-warning {
                  font-size: 18px;
                  color: #ffab00;
                  position: absolute;
                  left: 0;
                  top: 5px;
                }
              }
            }
            .right {
              .view-btn {
                background: $yello-color;
                border-color: $yello-color;
                color: #fff;
                &:hover {
                  background: lighten($yello-color, 6%);
                  border-color: lighten($yello-color, 6%);
                }
              }
            }
          }
          .failure-comm {
            .top-tips {
              height: 30px;
              margin: 4px 0;
            }
          }
        }
        .success-view {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          .el-icon-success {
            font-size: 40px;
            color: $main-color;
          }
          .text-tips {
            margin: 20px 0;
            color: $text-main-color;
            font-size: $md-size;
          }
          .btn-view {
            border-color: #6fadec;
            color: #fff;
            background-color: #6fadec;
            padding: 8px 18px;
            &:hover {
              border-color: lighten(#6fadec, 6%);
              background-color: lighten(#6fadec, 6%);
            }
          }
        }
      }
    }
  }
}
</style>
