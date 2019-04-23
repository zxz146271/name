<template>
    <div class="uploadContainer">
        <div class="label">{{this.label}}</div>
        <div class="noImg" v-if="!imgUrl">
            <el-upload
                v-if="type === 'upload'"
                class="addContainer"
                :show-file-list="showFiles"
                :action="$config().photoUploadUrl"
                :limit="1"
                :before-upload="beforeAvatarUpload"
                :on-exceed="outOfRange"
                :on-success="uploadAdd"
                :on-remove="delImg">
                <i class="el-icon-plus addIcon"></i>
            </el-upload>
            <div class="addContainer" v-if="type === 'text'" @click="addOne">
                <i class="el-icon-plus addIcon"></i>
            </div>
        </div>
        <div class="hasImg" v-else>
            <div class="imgBlock">
                <img class="roundImg" @click="showImg" :src="imgUrl" />
                <img class="delButton" @click="delImg" src="../../../static/image/shopDel.png" />
            </div>
            <div class="operation">
                <el-row class="text" v-if="type === 'text'">
                    <el-col :span="24">
                        {{this.goodName}}
                    </el-col>
                </el-row>
                <el-row class="button" v-if="type === 'upload'">
                    <el-upload
                        :show-file-list="showFiles"
                        :action="$config().photoUploadUrl"
                        :limit="1"
                        :before-upload="beforeAvatarUpload"
                        :on-exceed="outOfRange"
                        :on-success="uploadBtn"
                        :on-remove="delImg">
                        <el-button size="small">{{buttonText}}</el-button>
                    </el-upload>
                </el-row>
                <el-row class="operateIcon">
                    <el-col :span="12" class="operateBlock" v-if="order === 0">
                        <div class="title">升序</div>
                        <div class="icon">
                            <img class="rotateUp" src="../../../static/image/shopUndownload.png" />
                        </div>
                    </el-col>
                     <el-col :span="12" class="operateBlock" v-else>
                        <div class="title">升序</div>
                        <div class="icon" @click="orderInc">
                            <img class="rotateUp" src="../../../static/image/shopDownload.png" />
                        </div>
                    </el-col>
                    <el-col :span="12" class="operateBlock" v-if="order !== allLength - 1">
                        <div class="title">降序</div>
                        <div class="icon" @click="orderDesc">
                            <img src="../../../static/image/shopDownload.png" />
                        </div>
                    </el-col>
                    <el-col :span="12" class="operateBlock" v-else>
                        <div class="title">降序</div>
                        <div class="icon">
                            <img src="../../../static/image/shopUndownload.png" />
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="link">
                <el-popover
                    v-model="linkClick"
                    placement="bottom"
                    width="90"
                    trigger="click">
                    <ul class="pathLists">
                        <li :class="{'active': link === key}" v-for="(val, key) in pathLists" :key="key" @click="hideLists(val, key)">{{val}}</li>
                    </ul>
                    <el-row slot="reference" class="linkText" v-if="type === 'upload'" @click="showLists">
                        {{!link ? '添加链接' : '修改链接'}}
                        <i :class="!linkClick ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
                    </el-row>
                </el-popover>
                <el-row class="linkTag" v-if="pathLists[link]">
                    <el-tag type="danger" size="small" closable @close="delTag">{{pathLists[link]}}</el-tag>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import pathMap from './miniAppPathMap';
export default {
    name: 'shop-upload',
    props: {
        label: { //标签描述
            type: String,
            default: ''
        },
        imgUrl: { //上传图片地址
            type: String,
            default: ''
        },
        order: { //顺序
            type: Number,
            default: 0
        },
        type: { //类型
            type: String,
            default: 'upload' //'text'
        },
        allLength: { //数据总长度
            type: Number,
            default: 0
        },
        goodName: { //商品名称
            type: String,
            default: ''
        },
        buttonText: { //上传按钮名称
            type: String,
            default: '点击上传'
        },
        link: { //超链接地址
            type: String,
            default: ''
        }
    },
    data() {
        /*[{
            label: '图片一',
            imgUrl: 'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=377818163,1111141501&fm=85&s=ECCA7A2B4CB225B35498150E010080A1',
            type: 'upload',
            goodName: '',
            buttonText: '更改图片',
            link: '/pages/...'
        }, {
            label: '推荐商品',
            imgUrl: 'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=377818163,1111141501&fm=85&s=ECCA7A2B4CB225B35498150E010080A1',
            type: 'text',
            goodName: '简约客厅系列沙发套装A'
        }, {
            label: '图片二',
            imgUrl: 'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=377818163,1111141501&fm=85&s=ECCA7A2B4CB225B35498150E010080A1',
            type: 'upload',
            goodName: '',
            buttonText: '更改图片',
            link: '/pages/...'
        }]*/
        return {
            showFiles: false,
            delImage: false,
            hasClickBtn: false,
            linkClick: false,
            pathLists: pathMap
        }
    },
    methods: {
        showImg() {
            this.$emit('show', {
                imgUrl: this.imgUrl
            })
        },
        delImg() {
            this.delImage = true;
            this.$emit('delete', {
                order: this.order
            });
        },
        addOne() {
            if (this.type === 'text') {
                this.$emit('add', {
                    order: this.order,
                    clickBtn: this.hasClickBtn
                });
            } else {
                this.$emit('add', {
                    order: this.order
                })
            }
        },
        orderInc() {
            this.$emit('increase', {
                order: this.order
            });
        },
        orderDesc() {
            this.$emit('decrease', {
                order: this.order
            });
        },
        outOfRange() {
            this.$message.error('上传图片数量限制为1张');
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
            console.log(response);
            const imgUrl = response.data.filePath;
            this.$emit('update', {
                order: this.order,
                imgUrl
            });
        },
        uploadAdd(response) {
            this.hasClickBtn = false;
            this.fileUploadSuccess(response);
            if (!this.delImage) {
                this.addOne();
            }
        },
        uploadBtn(response) {
            this.hasClickBtn = true;
            this.fileUploadSuccess(response);
        },
        showLists() {
            this.linkClick = true;
        },
        hideLists(val, key) {
            this.$emit('link', {
                order: this.order,
                link: key
            });
            this.linkClick = false;
        },
        delTag() {
            this.$emit('link', {
                order: this.order,
                link: ''
            });
        }
    }
}
</script>

<style lang="sass" scoped>
.uploadContainer
    display: flex
    align-items: center
    min-width: 300px
    height: 80px
    line-height: 80px
    margin-top: 20px
    .label
        width: 100px
        font-size: 14px
        color: #606266
    .noImg
        width: 80px
        height: 100%
        border: 1px dashed #333
        border-radius: 5px
        display: flex
        justify-content: center
        align-items: center
        .addContainer
            width: 100%
            height: 100%
            text-align: center
        .addIcon
            font-size: 20px
    .hasImg
        min-width: 220px
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        .imgBlock
            width: 80px
            height: 80px
            border-radius: 10px
            position: relative
            display: flex
            justify-content: center
            align-items: center
            .roundImg
                width: 100%
                height: 100%
                border-radius: 10px
                &:hover
                    cursor: pointer
            .delButton
                width: 17px
                height: 17px
                position: absolute
                right: -6px
                top: -6px
        .operation
            min-width: 140px
            height: 80px
            margin-left: 10px
            .text
                height: 20px
                line-height: 20px
                font-size: 14px
                color: #333333
            .button
                height: 20px
                line-height: 20px
                text-align: center
            .operateIcon
                height: 60px
                text-align: center
                display: flex
                font-size: 12px
                .operateBlock
                    display: flex
                    flex-direction: column
                    height: 60px
                    &.first
                        color: #D9D9D9
                    &:hover
                        cursor: pointer
                    .title
                        width: 100%
                        height: 40px
                        line-height: 50px
                    .icon
                        width: 100%
                        height: 20px
                        line-height: 20px
                        img
                            display: inline-block
                            width: 18px
                            height: 18px
                            &.rotateUp
                                transform: rotate(180deg)
        .link
            min-width: 140px
            height: 80px
            margin-left: 10px
            display: flex
            justify-content: flex-start
            .linkText
                position: relative
                height: 30px
                line-height: 30px
                color: #FE4343
                font-size: 13px
                cursor: pointer
            .linkTag
                margin-left: 10px
                height: 30px
                line-height: 30px
ul.pathLists
    list-style: none
    width: 100%
    text-align: center
    height: 100px
    overflow: auto
    li
        width: 100%
        height: 32px
        line-height: 32px
        font-size: 13px
        color: #A2A2A2
        &.active, &:hover
            color: #FD4343
            background-color: #FFF5F5
</style>