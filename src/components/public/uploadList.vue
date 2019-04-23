<template>
	<div class="img-list">
		<div class="img-content" v-for="(item,key) in imagelist" :key="key">
			<img :src="item.filePath">
			<div class="layer" v-if="key != 0">
        <img :src="viewImg" @click="handleFileEnlarge(item.filePath) " class="viewImg" alt=	"">
        <img :src="delImg" @click="handleFileRemove(item,key)" class="delImg" alt="">
        <div @click="setMain(item,key)" class="setMain">
          设为主图 
        </div>
			</div>
      <div class="layer" v-if="key == 0">
        <div class="main">
          主图
        </div>
			</div>
		</div>
		<!-- <div v-if="!pass && progress !== 0" class="img-content img-progress">
			<el-progress type="circle" :percentage="progress" :status="proStatus"></el-progress>
		</div> -->
		<div class="img-upload">
			<el-upload class="uploader" 
				accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
			  ref="upload"
        :multiple="true"
			  list-type="picture-card"
			  :show-file-list="false"
			  :action="$config().uploadUrl"
			  :data="{bid: uuId}"
			  :on-change="uploadOnChange"
			  :on-success="uploadOnSuccess"
			  :on-error="uploadOnError"
        :on-remove="handleRemove"
			  :on-progress="uploadOnProgress">
			  <i class="el-icon-plus"></i>
			</el-upload>
		</div>
		<el-dialog title="" :visible.sync="isEnlargeImage" size="large" :modal-append-to-body="false" top="8%" width="60%">
			<img @click="isEnlargeImage = false" style="width:100%;" :src="enlargeImage">
		</el-dialog>
	</div>
</template>

<script>
import viewImg from '../../../static/image/view.png'
import delImg from '../../../static/image/del.png'
export default{
  name: 'upload-list',
  
	data(){
		return {
      viewImg,
      delImg,
			progress: 0,//上传进度
			pass: null,//是否上传成功
			isEnlargeImage: false,//放大图片
			enlargeImage: '',//放大图片地址
			params: {
				action: this.$config().uploadUrl,
				data: {}
      },
      mainUrl:''
		}
  },
  props: ['imagelist','uuId'],
	computed: {
		proStatus(){//上传状态
			if(this.pass){
				return 'success'
			}else if(this.pass == false){
				return 'exception'
			}else{
				return ''
			}
		}
  },
  mounted () {
    this.getMainUrl()
    this.$emit('setMain',this.imagelist, this.mainUrl)
  },
	methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
      let params = {
        id:file.enclosureId
      }
      this.$api.deleteFileById(params).then(res => {})
    },
    getMainUrl () {
      this.mainUrl = ''
      console.log(this.imagelist)
      if (this.imagelist.length >0 ) {
        this.mainUrl = this.imagelist[0].filePath
      }
    },
    setMain (file,i) {
      if (this.imagelist.length > 2) {
        let tempFile = []
        let list = this.imagelist
        tempFile.push(file)
        list.splice(i,1)
        this.imagelist = tempFile.concat(list)
      }
      this.getMainUrl()
      this.$emit('setMain',this.imagelist, this.mainUrl)
    },
		uploadOnProgress(e,file){//开始上传
			this.progress = Math.floor(e.percent)
		},
		uploadOnChange(file){
			if(file.status == 'ready'){
				this.pass = null;
				this.progress = 0;
			}else if(file.status == 'fail'){
				this.$message.error("图片上传出错，请刷新重试！")
			}
		},
    uploadOnSuccess(e,file){//上传附件
      this.pass = true;
      console.log(file)
			this.imagelist.push({
        filePath: file.response.data.filePath,
				enclosureId: file.response.data.enclosureId,
				fileName: file.response.data.fileName,
      })
      console.log(this.imagelist)
		},
		uploadOnError(e,file){
			this.pass = false;
		},
		handleFileEnlarge(_url){//放大图片
			console.log(_url)
			if(_url){
				this.enlargeImage = _url;
				this.isEnlargeImage = !this.isEnlargeImage;
			}
		},
		handleFileRemove(file,i){//删除图片
			console.log(file,i)
			// if(!file.url){
			// 	return false;
			// }
			let that = this;
			this.$confirm('是否删除此附件？','提示',{
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				console.log("=====================")
				let id = file.enclosureId
				//可添加ajax
				console.log("图片ID---------------", id)
				this.$api.deleteFileById({id: file.enclosureId}).then(res => {
					console.log(res)
					if(res.code == 0){
						this.$message({
							type: 'success',
							message: '删除成功',
							onClose: () => {
								that.imagelist.splice(i,1)
								that.getMainUrl()
								that.$emit('setMain',that.imagelist, that.mainUrl)
							}
						})
					}else if(res.code == 1){
						this.$message.error(res.msg)
					}
				})
				// this.$message.success("删除成功")
				
			}).catch((meg) => console.log(meg))
		}
  }
}
</script>

<style>
*{
	box-sizing: border-box;
}
.img-list{
	overflow:hidden;
	width:100%;
}
.img-list .img-content{
	float:left;
	text-align:left;
	position:relative;
	display:inline-block;
	width:80px;
	height:80px;
  margin-right: 5px;
  margin-top: 5px;
	border:1px solid #d1dbe5;
	border-radius:4px;
	transition:all .3s;
	box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
.img-list .img-upload{
	float:left;
	width:100px;
  margin-top: 5px;
  margin-left: -10px;
	display:table;
	text-align:center;
}
.img-list .uploader{
	width:100%;
	display:table-cell;
	vertical-align:middle;
}
.img-list .img-progress{
	text-align:center;
	padding-top:50px;
}
.img-list .img-content img{
	display:block;
	width:100%;
	height:80px;
	margin:0 auto;
	border-radius:4px;
}
.img-list .img-content .name{
	margin-top:10px;
}
.img-list .img-content .name>div{
	width:90%;
	text-overflow:ellipsis;
	overflow:hidden;
	height:25px;
	line-height:25px;
}
.img-list .img-content:hover .del,
.img-list .img-content:hover .layer{
	opacity:1;
}
.img-list .img-content .del,
.img-list .img-content .layer{
	opacity:0;
	transition:all .3s;
  position: relative;
}
.img-list .img-content .del{
	position:absolute;
	bottom:10px;
	right:10px;
	color:#8492a6;
	cursor:pointer;
	font-size:1.1em;
}
.img-list .img-content .layer{
	position:absolute;
	left:0;
	right:0;
	top:0;
	height:80px;
	color:#fff;
	text-align:center;
	background-color:rgba(0,0,0,.4);
}
.img-list .img-content .layer i{
	font-size:18px;
	margin-top:40px;
}
.viewImg{
  position: absolute;
  display: block;
  width: 16px!important;
  height: 16px!important;
  top: 5px!important;
  left: 60px!important;
}
.delImg{
  position: absolute;
  display: block;
  width: 16px!important;
  height: 16px!important;
  top: 60px!important;
  left: 60px!important;
}
.setMain{
  position: absolute;
  width: 48px;
  height:18px;
  font-size:12px;
  font-family:Source Han Sans SC;
  font-weight:400;
  line-height:24px;
  color:rgba(255,255,255,1);
  opacity:1;
  top: 30px;
  left: 16px;
}
.main{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size:14px;
  font-family:Source Han Sans SC;
  font-weight:400;
  line-height:40px;
  color:rgba(255,255,255,1);
  opacity:1;
  text-align: center;
  position: absolute;
  left: 20px;
  top: 20px;
  background:rgba(0,0,0,0.6);
}
</style>