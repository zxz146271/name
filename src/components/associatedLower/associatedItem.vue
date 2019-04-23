<template>
    <div class="content">
        <div class="category">
            <div class="itemSum">关联列表 (共126条)</div>
            <div class="associteBtn" @click="newLink">新增关联</div>
        </div>
        <div class="contentBox">
            <!-- <div class="contentItem"></div> -->
            <el-table :data="data" style="width: 100%;">
                <el-table-column prop="dealerName" label="关联经销商名称" align="center"></el-table-column>
                <el-table-column prop="storesInOpe" label="运营中的门店数量" align="center"></el-table-column>
                <el-table-column prop="type" label="分发类型" align="center"></el-table-column>
                <el-table-column prop="note" label="备注" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="importEdit(scope.row)" class="dissociated">解除关联</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pagin">
                <span class="demonstration">共{{ totalCount }}条数据</span>
                <span></span>
                <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-size="10" layout="jumper, prev, pager, next" :total='totalCount'>
                </el-pagination> -->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                    :page-size="10" layout="jumper, prev, pager, next" :total="allNum">
                </el-pagination>
            </div>
            <!-- 关联弹框 -->
            <el-dialog :visible.sync="submemberDetail" width="550px" :before-close="handleClose2" class="import-dialog">
                <!-- <div slot="title" class="left-title">
                        <span class="top">潜客详情</span>
                        </div> -->
                <div slot="title" class="center-title">
                    <span class="top">添加接待记录</span>
                </div>
                
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        data: Array
    },
    methods: {
        // 新增关联
        newLink() {
            this.$emit("newLink")
        }
    }
}
</script>
<style scoped>
.content {
    margin: 0 32px;
}
.category {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
}
.itemSum {
    height:24px;
    font-size:16px;
    font-weight:400;
    line-height:20px;
    color:#303133;
    text-align: left;
}
.associteBtn {
    width:94px;
    height:32px;
    line-height: 32px;
    border:1px solid #FE4343;
    border-radius:4px;
    color: #FE4343;
    font-size: 14px;
    text-indent: 30px;
    cursor: pointer;
    background: url('../../../static/image/tianjia_icon.png') no-repeat 8px 10px;
}
.contentBox {
    margin-top: 20px;
}
.dissociated {
    border: none;
    padding: 0;
    background: #fff;
    color: #FE4343;
}
</style>


