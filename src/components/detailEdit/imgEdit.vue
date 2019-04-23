<template>
  <div>
    <div class="caseimg" v-if="saveboxshow==true?true:false">
      <div class="casedetail">
        <div class="casetitle">图片</div>
          <div>
            <div class="shareimg">
              <span class="thelabeler"><span class="signal">* </span>图片：</span>
              <el-upload
                 class="avatar-uploader"
                 :action="$config().uploadUrl"
                 :data="{bid: uuId+'content'}"
                 :on-exceed="outOfRange"
                 :show-file-list="false"
                 :limit="1"
                 accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload">
                 <img v-if="imageUrl" :src="imageUrl" class="avatar">
                 <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader-iconner"></i>
              </el-upload>
            </div>
          </div>
        <div class="caseaize">
          <span class="casetitler ">圆角：</span>
          <el-select
            v-model="radius"
            filterable
            allow-create
            default-first-option
            placeholder="0"
            @change="radiusChange"
            style="width:66px;">
            <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select> &nbsp;px
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
import { getStore } from '../../tool/Utils';
export default {
  data() {
    return {
      top,
      bottom,
      form: {
          name: ''
      },
      saveboxshow:true,
      inputVisible: false,
      inputValue: '',
      imageUrl: '',
      value8: '',
      options5: [{
                  value: '2',
                  label: '2',
                  }, {
                  value: '5',
                  label: '5',
                  }, {
                  value: '10',
                  label: '10',
                  }, {
                  value: '15',
                  label: '15',
                  }, {
                  value: '20',
                  label: '20'
                  }],
      value10: 0,
      showimg:false,
      radius:'',
      uuId:''
    }
  },
  mounted () {
    this.type = this.block.type
    this.uuId = getStore('myUuid')
    this.imageUrl = this.block.content.image? this.block.content.image : ''
    this.radius = this.block.content.radius? this.block.content.radius : '0'
  },
  props:['block', 'index'],
  methods:{
    moveUp () {
      this.$emit('moveUp')
    },
    moveDown () {
      this.$emit('moveDown')
    },
    imageChange () {
      let img = {}
      img.image = this.imageUrl
      img.radius = this.radius
      console.log(img)
      this.$emit('imageChange', img)
    },
    radiusChange (v) {
      this.imageChange()
    },
    outOfRange () {
      this.$message.error('上传图片数量限制为1张')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = file.response.data.filePath
      this.imageChange()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('请上传JPEG或PNG或GIF格式的图片');
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    savebox(){
       if(this.imageUrl){
        this.$emit('closeEdit')
       }else{
          this.$message.error("请选择上传的图片")
          return false
       }
    },
    // 点击取消
    canceltext(){
        this.$emit("success", this.index);
    },
  }
}
</script>

<style scoped>
.thelabeler{
   margin-left: 3px;
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
     /* border-bottom: 1px dashed #D9D9D9; */
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
   .caseimg{
      width: 378px;
      height: 340px;
      position: absolute;
      left: 500px;
      top: 150px;
      border: 1px solid #E4E7ED;
      background: #FBFBFB;
   }
   .caseredio{
      width: 378px;
      height: 402px;
      position: absolute;
      left: 405px;
      top: 0;
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
      margin-right: 7px;
      margin-left: 34px;
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


</style>
