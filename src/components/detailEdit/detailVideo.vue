<template>
  <div class="caseimgbox" @click="showEdit">
    <div class="casesimg">
        <!-- https://www.muyusi.com/website-static/images/image03.jpg -->
      <img :src="block.coverUrl" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  props: [
    'block'
  ],
  data() {
      return {
          form: {
              name: ''
          },
          inputVisible: false,
          inputValue: '',
          imageUrl: '',
          value8: '',
          props: [
              'block'
          ],
      }
  },
  mounted () {
    this.imageUrl = this.block.coverUrl
    console.log(this.imageUrl)
  },
  watch: {
    block (v) {
      console.log(v)
    }
  },
  components: {},
  methods:{
   // 上传视频
       handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      showEdit () {
        this.$emit('showEdit')
      },
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
      height: 392px;
      position: absolute;
      left: 405px;
      top: 0;
      border: 1px solid #E4E7ED;
   }
   .caseredio{
      width: 378px;
      height: 402px;
      position: absolute;
      left: 390px;
      top: 100px;
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
</style>
