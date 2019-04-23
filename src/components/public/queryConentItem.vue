<template>
    <div class="contentWrap">
        <div class="con_item" v-if="contentData && contentData.length>0" v-for="(item, index) in contentData" :key ='index'>
            <!-- <div>{{item.contentType}}</div> -->
            <template class="radioBox">
                <el-radio v-model="selectRadio" @change.native="getCurrentRow(item)" :label="index">&nbsp;</el-radio>
            </template>
            <img :src="item.photoUrl" class="img" alt="">
            <div class="content">
                <div class="title"> {{item.contentType | contentType }}{{item.headline}}</div>
                <div class="code">内容编号：{{item.contentId}}</div>
                <div class="source">来源：{{item.sourceType | sourceType }}{{item.source}}</div>
            </div>
            <div class="tagWrapper labelTag">标签:
                <div class="tag">
                    <el-tag
                        :key="tag.labName"
                        v-for="tag in item.labelList"
                        closable
                        type="warning"
                        :disable-transitions="false"
                        @close="handleClose(tag.id)">
                        {{tag.labName}}
                    </el-tag>
                    <!-- <el-input
                        class="input-new-tag"
                        v-if="inputVisible[index]"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        >
                    </el-input> -->
                    <!-- <el-button v-else style="margin-left:0;" class="button-new-tag" size="small">+ 添加</el-button> -->
                </div>
            </div>
            <div class="dateWrapper">
                <div class="date">创建时间：{{item.createTime | time }}</div>
                <div class="date">修改时间：{{item.modifyTime | time }}</div>
            </div>
        </div>
        <div class="noData" v-else><img src="/static/image/kong_img@3x.png" alt=""></div>
    </div>
</template>

<script>
import {getStore, setStore, removeStore} from '../../tool/Utils'
export default {
    data() {
        return {
            datas: [],
            selectRadio: ''
            // radio: ''
        }
    },
    props: {
        contentData: Array,
        contentType: String,
        radio: String
    },
    wacth: {
        contentData(nv) {
            this.datas = nv;
            console.log("监听数据======================", nv)
        },
        radio(n){
            this.selectRadio = n
        }
    },
    mounted() {
        this.selectRadio = this.radio
    },
    methods: {
        getCurrentRow(item) {
            this.$emit("getCurrentRow",item)
        },
        handleClose (tag) {
            let params = {id: tag}
            this.$api.deleteTag(params).then(res => {
                if (res.code === 0) {
                    this.$emit('delTag')
                    this.$message.success(res.msg)
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
    },
    filters: {
        contentType (v) {
            switch (v) {
                case 'case':
                return '【案例】'
                case 'article':
                return '【文章】'
                case 'atlas':
                return '【图册】'
                case 'panorama':
                return '【全景图】'
                default:
                return '【小视频】'
            }
        },
        sourceType (v) {
            switch (v) {
                case 'personal':
                return '【个人】'
                case 'store':
                return '【经销商】'
                default:
                return '【其它】'
            }
        },
        time (str) {
            if (str) {
                let time = str.substring(0, str.length - 3)
                return time
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.contentWrap {
    height: 340px;
    overflow: auto;
    .con_item{
        position: relative;
        width: 100%;
        height: 125px;
        display: flex;
        //   margin-top: 24px;
        margin-bottom: 10px;
        // border:1px solid rgba(233,233,233,1);
        .el-radio {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 20px;
        }
        .img{
            width: 125px;
            height: 125px;
            display: block;
            min-width: 125px;
        }
        .content{
            width: 31%;
            height: 125px;
            margin: 0 15px;
            .title{
                width: 100%;
                margin-top: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height:24px;
                font-size:16px;
                font-family:Source Han Sans SC;
                font-weight:500;
                line-height:24px;
                color:rgba(0,0,0,0.85);
            }
            .code{
                width: 100%;
                margin-top: 10px;
                height:20px;
                font-size:14px;
                font-family:Source Han Sans SC;
                font-weight:400;
                line-height:22px;
                color:rgba(0,0,0,0.45);
                opacity:1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .source{
                width: 100%;
                margin-top: 8px;
                height:20px;
                font-size:14px;
                font-family:Source Han Sans SC;
                font-weight:400;
                line-height:22px;
                color:rgba(0,0,0,0.45);
                opacity:1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .dateWrapper{
            // width: 200px;
            height: 125px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            padding-left: 40px;
            box-sizing: border-box;
            .date{
                width:200px;
                height:20px;
                font-size:12px;
                font-family:Source Han Sans SC;
                font-weight:400;
                line-height:22px;
                color:rgba(0,0,0,0.45);
                margin-top: 8px;
            }
            &>.date:nth-child(1){
                margin-top: 15px;
            }
        }
        .actionContent{
            position: absolute;
            right:32px;
            flex: 1;
            // margin: 0px 32px;
            height: 163px;
            display: flex;
            align-items: center;
            justify-content: center;
            .txt{
                cursor: pointer;
            }
            .action{
                cursor: pointer;
                padding: 0 8px;
                height:20px;
                font-size:14px;
                font-family:Source Han Sans SC;
                font-weight:400;
                line-height:22px;
                color:rgba(253,67,67,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .hasBorder{
            border-right: 1px solid rgba(216,216,216,1);
            }
            img{
                width: 24px;
                height: 22px;
                margin-right: 10px;
                cursor: pointer;
            }
        }
        .tagWrapper{
            position: absolute;
            bottom:0px;
            left: 187px;
            display: flex;
            flex-direction: row;
            line-height: 32px;
            font-size:14px;
            color:rgba(0, 0, 0, 0.45);
            .tag{
                margin-left:10px;
            }
            .el-tag + .el-tag {
                margin-left: 10px;
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
        }
    }
}
/* .con_item {
    position: relative;
    width: 100%;
    height: 163px;
    display: flex;
    margin-top: 24px;
    border:1px solid rgba(233,233,233,1);
}
.img {
    width: 163px;
    height: 163px;
    display: block;
    min-width: 163px;
}
.content {
    width: 31%;
    height: 163px;
    margin: 0 24px;
}
.title {
    width: 100%;
    margin-top: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height:24px;
    font-size:16px;
    font-family:Source Han Sans SC;
    font-weight:500;
    line-height:24px;
    color:rgba(0,0,0,0.85);
}
.code {
    width: 100%;
    margin-top: 16px;
    height:20px;
    font-size:14px;
    font-family:Source Han Sans SC;
    font-weight:400;
    line-height:22px;
    color:rgba(0,0,0,0.45);
    opacity:1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.source {
    width: 100%;
    margin-top: 8px;
    height:20px;
    font-size:14px;
    font-family:Source Han Sans SC;
    font-weight:400;
    line-height:22px;
    color:rgba(0,0,0,0.45);
    opacity:1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
} */
</style>
