<template>
    <div class="storeContentBox">
        <byTypeQuery @changeContentType = "changeContentType" />
        <div v-if="contentData.length !== 0">
            <div class="content">
                <queryConentItem v-if="contentData" :contentData="contentData" :contentType="contentType" :radio="radio" @getCurrentRow="getCurrentRow" />
            </div>
            <div class="dialog-footer">
            <el-button @click="clickCancel">取 消</el-button>
            <el-button type="primary" @click="clickSubmit">提 交</el-button>
            </div> 
        </div>
        <div v-else class="nullList">
            你没有选择的数据
        </div>
    </div>
</template>

<script>
import byTypeQuery from '@/components/public/byTypeQuery'
import queryConentItem from '@/components/public/queryConentItem'
export default {
    data() {
        return {
            contentType: '',
            currentPage: 1, // 当前所在页
            pagesize: 100,
            count: 0, // 总数
            headline: '',
            state: '0',
            contentData: [],
            item: {},
            radio: ''
        }
    },
    components: {
        byTypeQuery,
        queryConentItem
    },
    mounted () {
        this.getContentList()
    },
    methods: {
        // 获取内容列表
        getContentList () {
            let params = {
                page: this.currentPage,
                limit: this.pagesize,
                state: this.state,
                contentType: this.contentType,
                headline: this.headline
            }
            this.$api.getAccountContentList(params).then(res => {
                if (res.code === 0) {
                    this.contentData = res.data
                } else {
                    this.$message.error(res.msg)
                }
                // this.loading = false
            })
        },
        // 根据内容类型查询呢列表
        changeContentType (data) {
            this.headline = ''
            this.currentPage = 1
            this.contentType = data
            // this.loading = true
            console.log(this.contentType)
            this.getContentList()
        },
        getCurrentRow (item) {
            this.item = item;
        },
        // 取消
        clickCancel () {
            this.$emit("clickCancel")
        },
        // 提交
        clickSubmit () {
            this.$emit("clickSubmit",this.item)
        }
    }
}
</script>

<style>
.el-dialog__body {
    padding: 0;
}
.content{
    width: 100%;
    overflow: hidden;
}
.dialog-footer {
    height: 84px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.nullList{
    color: orange;
    text-align: center;
}
</style>
