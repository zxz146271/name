<template>
  <div>
    <div class="caseredio">
      <div class="casedetail">
        <div class="casetitle">视频</div>
          <div>
            <div class="shareredio">
              <span class="thelabeler"><span class="signal">* </span>视频：</span>
              <el-upload
                v-loading="avLoading"
                class="avatar-uploader"
                :action="$config().videoUpload"
                :data="{title: '', bid: uuId+'video'}"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-progress="uploadOnProgress"
                :before-upload="beforeAvatarUpload">
                <img v-if="coverUrl" :src="coverUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader-iconner"></i>
              </el-upload>
            </div>
            <!-- <div class="img-progress">
              <el-progress :percentage="progress"></el-progress>
            </div> -->
            <div class="shareredio">
              <span class="thelabeler"><span class="signal">* </span>封面图:</span>
              <el-upload
                class="avatar-uploader"
                :action="$config().uploadUrl"
                :data="{bid: uuId + 'videoPng'}"
                :show-file-list="false"
                accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                :limit="1"
                :on-success="handleAvatarSuccess2"
                :before-upload="beforeAvatarUpload2">
                <img v-if="poster" :src="poster" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader-iconner"></i>
              </el-upload>
            </div>
            <div class="posiotionWrapper">
              <span class="title">移动位置：</span>
              <div class="posiotion" @click="moveUp">
                <img :src="top" alt="">
                <span class="position-text">上移</span>
              </div>
              <div class="posiotion" @click="moveDown">
                <img :src="bottom" alt="">
                <span class="position-text">下移</span>
              </div>
            </div>
        </div>
      </div>
      <el-row class="light">
        <el-col :span="12"><div class="grid-content bg-purple" @click="canceltext">取消</div></el-col>
        <div class="cenline"></div>
        <el-col :span="12"><div class="grid-content bg-purple-light" @click="savebox">保存</div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import top from '../../../static/image/edit-top.png'
import bottom from '../../../static/image/edit-bottom.png'
import { getStore } from '../../tool/Utils'
export default {
  data () {
    return {
      avLoading: false,
      progress: 0,
      top,
      bottom,
      form: {
        name: ''
      },
      saveboxshow: true,
      inputVisible: false,
      inputValue: '',
      imageUrl: '',
      value8: '',
      options5: [{
        value: '10',
        label: '10'
      }, {
        value: '12',
        label: '12'
      }, {
        value: '14',
        label: '14'
      }, {
        value: '16',
        label: '16'
      }, {
        value: '18',
        label: '18'
      }, {
        value: '20',
        label: '20'
      }],
      value10: 0,
      showimg: false,
      uuId: '',
      upLoadCount: 0
    }
  },
  mounted () {
    this.uuId = getStore('myUuid')
  },
  props: ['coverUrl', 'mp4', 'poster', 'index'],
  methods: {
    getVideoInfo (o) {
      let params = o.data
      params.eelationId = this.uuId + 'video'
      this.$api.getVideoInfo(params).then(res => {
        this.coverUrl = res.data.coverUrl
        if (this.poster.length < 1) {
          this.poster = this.coverUrl
        }
        this.mp4 = res.data.filePath
        this.videoChange(o)
        this.avLoading = false
      })
    },
    videoChange (o) {
      if (this.coverUrl) {
        this.$emit('videoChange', this.coverUrl, this.mp4, this.poster)
      } else {
        if (this.upLoadCount > 1) {
          this.$message.error('图片上传失败,请重新上传')
          this.coverUrl = ''
          this.mp4 = ''
          this.poster = ''
          return
        }
        this.upLoadCount++
        this.getVideoInfo(o)
      }
    },
    moveUp () {
      this.$emit('moveUp')
    },
    moveDown () {
      this.$emit('moveDown')
    },
    uploadOnProgress (e, file) { // 开始上传
      this.progress = Math.floor(e.percent)
    },
    handleAvatarSuccess (res, file) {
      let self = this
      setTimeout(() => {
        self.getVideoInfo(res)
      }, 5000)
    },
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG = file.type === 'video/mp4' || file.type === 'video/rmvb' || file.type === 'video/avi'
      const isLt2M = file.size / 1024 / 1024 < 50

      if (!isJPG) {
        this.$message.error('视频格式不正确!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('视频大小不能超过 50MB!')
        return false
      }
      this.avLoading = true
      return isJPG && isLt2M
    },
    handleAvatarSuccess2 (res, file) {
      this.poster = file.response.data.filePath
      // this.videoChange()
    },
    beforeAvatarUpload2 (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('请上传jpg或png或gif格式图片')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    savebox () {
      if (!this.mp4) {
        this.$message.error('请上传视频')
        return
      }
      if (!this.poster) {
        this.$message.error('请上传封面图')
        return
      }
      this.$emit('closeEdit')
    },
    // 点击取消
    canceltext () {
      this.$emit('success', this.index)
    }
  }
}
</script>

<style scoped>
.thelabeler{
   margin-left: 8px;
   margin-right: 8px;
   position: absolute;
   top: 12px;
   left: 17px;
}
.prese{
   margin-left: 8px;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .el-tag{
     background-color:#FCF6EB;
     color: #E7A35E;
     border: 1px solid #F7E5C8;
  }
  .el-tag .el-icon-close{
     color: #000000
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
  .case{
     padding-left:40px;
     margin-bottom: 20px;
  }
  .el-icon-plus{
     border: 1px dashed #d9d9d9;
  }
  .avatar-upload .el-upload {
     width: 300px;
     height: 300px;
  }
  .avatar-uploader{
     display: inline-block;
     margin-left: 68px;
     margin-top: 15px;
  }
  .avatar-uploader .el-upload {
     width: 80px;
     height: 80px;
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
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar-uploader-iconner{
      width: 251px;
      height: 123px;
      line-height: 123px;
      text-align: center;
  }
  .avatar {
    width: 251px;
    height: 123px;
    display: block;
  }
  .shareimg{
     padding-left:24px;
     margin-bottom: 20px;
     position: relative;
  }
  .shareredio{
     padding-left:24px;
     position: relative;
  }
  .el-select{
     width: 236px;
     display: inline-block;
  }
  .el-icon-star-off{
     color: #B5B5B5;
     margin-left: 20px;
  }
  .bush{
     color: #B5B5B5;
     margin-left: 4px;
  }
  .imag{
     width: 376px;
     margin-left: 88px;
  }
  .bigbox{
      width: 374px;
      height: 603px;
      background-color: #F9F9F9;
      margin-left: 89px;
      margin-top: -7px;
      border:1px solid rgba(217,217,217,1);
      margin-bottom: 10px;
  }
  .essential{
     height: 120px;
     border-bottom: 1px dashed #D9D9D9;
  }
  .elbox{
     width: 260px;
     margin: 0 auto;
     text-align: center;
     color: #DCDCDC;
     padding-top: 35px;
  }
  .infor{
     height: 30px;
  }
  .cases{
     height: 180px;
     border-bottom: 1px dashed #D9D9D9;
     position: relative;
  }
  .casebox{
     width: 260px;
     margin: 0 auto;
     text-align: center;
     color: #DCDCDC;
     padding-top: 60px;
  }
  .speinfor{
     color: #262626;
  }
  .blank{
     height: 226px;
     border-bottom: 1px solid #D9D9D9;
  }
  .insert{
     height: 77px;
     background: #fff;
     border-right:1px solid #D9D9D9;
     border-bottom:1px solid #D9D9D9;
  }
  .insert-tit{
     height: 33px;
     line-height: 33px;
     margin-left: 25px;
     color: #262626;
  }
  .chunkpra{
     width: 100%;
     display: flex;
     justify-content:space-around;
     cursor: pointer;
  }
  .chunk{
      width: 97px;
      height: 30px;
      line-height: 30px;
      border: 1px dashed #E5E5E5;
      text-align: center;
      color: #666666;
      background-color: #F8F8F8;
  }
  .bton{
     width: 500px;
     margin: 0 auto;
  }
  .cancel{
     color: #000000;
  }
  .keep{
     background-color: #FD4343;
     color: #fff;
     margin-left: 143px;
     margin-bottom: 42px;
  }
   .keep:hover{
      background-color: #FD4343;
      color: #fff;
   }
   .casedetails{
      width: 378px;
      height: 490px;
      position: absolute;
      left: 405px;
      top: 0;
      border: 1px solid #E4E7ED;
   }
   .caseredio{
      width: 378px;
      height: 450px;
      position: absolute;
      left: 500px;
      top: 150px;
      border: 1px solid #E4E7ED;
   }
   .casedetail{
      padding: 13px 18px;
   }
   .casetitle{
      height: 32px;
      line-height: 32px;
      color: #FE4343;
      font-size: 16px;
      font-weight:500;
      border-bottom: 1px dashed #D9D9D9;
   }
   .casetitle-bottom{
      margin-top: 10px;
   }
   .casetitler{
      width: 70px;
      height: 30px;
      line-height: 30px;
      text-align: right;
      color: #303133;
   }
   .sixbox{
      width: 20px;
      height:18px ;
      display: inline-block;
      color: #909399;
      border: 1px solid #D9D9D9;
   }
   .iptnum{
      width: 30px;
   }
   .light{
      width: 376px;
      height: 47px;
      line-height: 47px;
      border-top: 1px solid #E4E7ED;
      text-align: center;
      font-size: 16px;
      position: absolute;
      bottom: 0;
   }
   .bg-purple{
      color: #909399;
      cursor: pointer;
   }
   .bg-purple-light{
      color: #FE4343;
      cursor: pointer;
   }
   el-input{
      display: inline-block;
   }
   .cenline{
      width: 1px;
      height: 29px;
      background: #E4E7ED;
      position: absolute;
      left: 195px;
      top: 8px;
   }
   .signal{
       color: #FE4343;
   }

    .casesimg{
      width: 375px;
      height: 180px;
   }
   .casesimg img{
      width: 370px;
      height: 180px;
   }
   .posiotionWrapper{
    height: 40px;
    display: flex;
  }
  .posiotionWrapper .title{
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    color: #303133;
  }
  .posiotion{
    display: flex;
    width: 50px;
    height: 40px;
    justify-content: space-around;
    align-items: center;
    margin-left: 5px;
    margin-right: 10px;
  }
  .posiotion img{
    width: 10px;
    height: 11px;
  }
  .posiotion-text{
    display: block;
    width:28px;
    height:20px;
    font-size:14px;
    font-family:Source Han Sans SC;
    font-weight:400;
    line-height:14px;
    color:rgba(48,49,51,1);
  }
  .img-progress{
    margin-left: 24px;
    margin-top: 10px;
  }
</style>
