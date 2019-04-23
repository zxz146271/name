<template>
    <div class="linkItem">
        <div class="dialogBox">
            <div class="uploading">
                <div class="noImg" v-if = "!item.filePath">
                    <el-upload
                        :action="$config().uploadUrl"
                        list-type="picture-card"
                        accept="image/*"
                        :limit="imgLimit"
                        :multiple="isMultiple"
                        :data="{bid: uuId}"
                        :on-success="fileUploadSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-exceed="handleExceed"
                        :on-error="imgUploadError">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="hasImg" v-else  @mouseenter="cenShowMask" @mouseleave="leaShowMask">
                    <div class="imgBlock">
                        <img class="roundImg"  :src="item.filePath" />
                        <img class="successImg" src="/static/image/uploadSuccess_image.png" />
                    </div>
                    <div class="imgMask" v-if="item.isShowMask">
                        <div class="btnBox">
                            <img class="previewImg"  @click="previewImg" src="/static/image/preview_icon.png" />
                            <img class="delButton" @click="delImg(item.enclosureId)" src="/static/image/delete_icon.png" />
                        </div>
                    </div>
                </div>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImg" alt="">
                </el-dialog>
            </div>
            <div class="dialogue" v-if="!item.goodsCode">
                <el-button type="text" @click="showLink"  class="dialogBtn" >添加链接</el-button>
            </div>
            <div  class="iconBox" v-if="item.goodsCode">
                <img src="/static/image/load.png" alt=""  class="iconImage">
                <div class="couponTitle">{{item.goodsName}}</div>
                <i class="el-icon-circle-check"></i>
            </div>
            <div class="commonBox" v-if="item.goodsCode">
                <el-button class="common" @click="showLink">重选</el-button>
                <el-button class="common del" @click="delLink">删除</el-button>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return{
            dialogVisible: false,
            dialogImg: '',
            imgLimit: 1,
            isMultiple:true
        }
    },
    props: ['order','uuId', 'item'],
    methods:{
        delImg (enclosureId) {   //  删除图片
            let that = this;
			this.$confirm('是否删除此附件？','提示',{
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				//可添加ajax
				this.$api.deleteFileById({id: enclosureId}).then(res => {
					if(res.code == 0){
                        this.$emit("delImg", this.order)
					}else if(res.code == 1){
						this.$message.error(res.msg)
					}
				})
			}).catch((meg) => console.log(meg))
        },
        previewImg() {
            this.dialogVisible = true
            this.dialogImg = this.imgUrl
        },
        showLink() {
            this.$emit('showLink', this.order)
        },
        delLink() {
            this.$emit('delLink', this.order)
        },
        cenShowMask() {
            this.$emit('cenShowMask', this.order)
        },
        leaShowMask(){
            this.$emit('leaShowMask', this.order)
        },
        beforeAvatarUpload(file) {
            // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
            const isLt2M = file.size / 1024 / 1024 < 20;
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            let type = true;
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!');
                type = false;
                return type;
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 20MB!');
            }
            return isLt2M && type
        },
        fileUploadSuccess(response) {
            let fileInfo = {
                filePath: response.data.filePath,
				enclosureId: response.data.enclosureId,
                fileName: response.data.fileName,
                order: this.order
            }
            this.$emit("fileUploadSuccess",fileInfo)
        },
        handleExceed(files, fileList) {//图片上传超过数量限制
            this.$message.error('上传图片不能超过1张!');
        },
        imgUploadError(err, file, fileList){//图片上传失败调用
            console.log(err,"图片上传失败调用")
        }
    }

}
</script>
<style lang="scss" scoped>
.linkItem{
    .dialogBox{
        display: flex;
        height: 80px;
        margin-bottom: 17px;
        .uploading{
            .hasImg{
            width: 100%;
            height: 100%;
            position: relative;
            .imgBlock{
                position: relative;
                .successImg{
                width: 30px;
                position: absolute;
                right: 0;
                top: 0;
                }
                .roundImg{
                width: 80px;
                height: 80px;
                }
            }
            .imgMask{
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                position: absolute;
                left: 0;
                top: 0;
                .btnBox{
                display: inline-block;
                img{
                    width: 20px;
                    margin-top: 25px;
                    &:nth-child(1){
                    margin-left:15px;
                    margin-right:5px;
                    }
                }
                
                }
            }
            
            }
        }
        .dialogue{
            margin-left: 30px;
            display: flex;
            align-items: center;
            
            .dialogBtn{
                color: #FD4343;
                border: none;
                font-size: 15px;
                display: flex;
                align-items: center;
            }
            .el-radio-group{
                display: flex;
                flex-direction: column;
                .el-radio+.el-radio {
                    margin-left: 0px;
                }
            }
        }
        .iconBox{
            display: flex;
            align-items: center;
            margin-right: 31px;
            margin-left: 30px;
            .el-icon-circle-check{
                color: #67C23A
            }
            .iconImage{
                width: 14px;
                height: 14px;
            }
            .couponTitle{
                // width: 160px;
                font-size: 12px;
                color: #909399;
                line-height: 20px;
                margin-right: 11px;
                margin-left: 10px;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
                overflow:hidden;
                // text-align:center;
            }
            }
            .commonBox{
                display: flex;
                align-items: center;
            .common{
                font-size: 14px;
                color: #606266;
                width: 72px;
                // height: 30px;
                // line-height: 30px;
                border-radius:4px;
                background-color: #fff;
                border: 1px solid #E5E7EC;
                cursor: pointer;
            }
            .del{
                margin-left: 15px;
            }
        }
    }
}
</style>

