<template>
    <div class="container">
        <mineSearch :title = "title" @searchValue = "searchValue"/>
        <div class="associatedList">
            <!-- <associatedItem :data="list" @newLink="newLinkHandle" /> -->
            <div class="content">
                <div class="category">
                    <div class="itemSum">关联列表 (共{{ totalCount }}条)</div>
                    <div class="associteBtn" @click="newLinkClick">新增关联</div>
                </div>
                <div class="contentBox">
                    <!-- <div class="contentItem"></div> -->
                    <el-table :data="list" style="width: 100%;">
                        <el-table-column prop="distributorName" label="关联经销商名称" align="center"></el-table-column>
                        <el-table-column prop="storeNum" label="运营中的门店数量" align="center"></el-table-column>
                        <el-table-column prop="issue" label="分发类型" align="center"></el-table-column>
                        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                        <el-table-column label="操作" align="center" width="200">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="edit(scope.row)" class="dissociated">编辑</el-button>
                                <el-button size="mini" @click="dissociatedHandle(scope.row)" class="dissociated">解除关联</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <div class="pagin">
                        <span class="demonstration">共{{ totalCount }}条数据</span>
                        <span></span>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :page-size="10" layout="jumper, prev, pager, next" :page-sizes="[2, 5, 10, 20]" :total='totalCount'>
                        </el-pagination>
                        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                            :page-size="10" layout="jumper, prev, pager, next" :total="allNum">
                        </el-pagination> -->
                    </div>
                    <!-- 新增关联弹框 -->
                    <el-dialog :visible.sync="bindDealer" title="新增关联" center width="480px" class="import-dialog associteBox" :before-close="handleClose">
                        <newLink @associte="associte" @cancel="cancel" :showTips="showTips" :bindDealer="bindDealer" ref="newLink" />
                    </el-dialog>
                    <!-- 编辑关联弹框 -->
                    <el-dialog :visible.sync="editDealer" title="新增关联" center width="480px" class="import-dialog associteBox" :before-close="handleClose1">
                        <newLink @associte="associte" @cancel="cancel" :showTips="showTips" :editDealer="editDealer" :dealerData="dealerData" :currDistributorId="distributorId" ref="newLink" />
                    </el-dialog>
                    <!-- 解除关联 -->
                    <el-dialog :visible.sync="dissociated" title="解除关联" center width="480px" class="import-dialog associteBox" :before-close="handleClose2">
                        <dissociated :item="currentAssociteItem" @dissociated="dissociatedEvent" @cancel="cancel" />
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mineSearch from '@/components/public/mineSearch'
import newLink from '../../../components/associatedLower/newLink'
import dissociated from '../../../components/associatedLower/dissociated'
// import associatedItem from '../../../components/associatedLower/associatedItem'
export default {
    data() {
        return {
            title: '关联下级',
            totalCount: 126,
            list: [
                {
                    dealerName: '语橡国际贸易公司',
                    storesInOpe: 1,
                    type: '内容',
                    note: '无'
                },
                {
                    dealerName: '苏梨家居贸易公司',
                    storesInOpe: 5,
                    type: '内容',
                    note: '无'
                },
                {
                    dealerName: 'CDB家居贸易公司',
                    storesInOpe: 6,
                    type: '内容',
                    note: '无'
                },
            ],
            newLink: false,
            bindDealer: false,
            editDealer: false,
            dissociated: false,
            showTips: false,
            searchContent: '',
            currentPage: 1,
            pagesize: 10,
            currentAssociteItem: '',    //当前点击的数据
            distributorId: '',
            dealerData: {},  // 点击编辑得到的数据
        }
    },
    components: {
        mineSearch,
        newLink,
        dissociated
    },
    mounted() {
        let params = {
            search: this.searchContent,
            page: this.currentPage,
            pageSize: this.pagesize
        }
        // 获取经销商信息list
        this.getDealerInfo(params);
    },
    methods: {
        getDealerInfo(params) {
            
            this.$api.getDealerInfoList(params).then(res => {
                if (res.code === 0) {
                    console.log(res)
                    this.list = res.data;
                    this.totalCount = res.count;
                } else {
                    // 失败提示
                    console.log("出错了");
                }
            })
        },
        // 搜索
        searchValue(data) {
            let params = {
                search: data,
                page: this.currentPage,
                pageSize: this.pagesize
            }
            // 获取经销商信息list
            this.getDealerInfo(params);
        },
        // 新增
        newLinkClick() {
            this.bindDealer = true;
        },
        // 关闭 新增关联-dialog
        handleClose() {
            this.bindDealer = false;
            this.editDealer = false;
            this.dissociated = false;
            if (this.$refs.newLink.isTips) {
                this.$refs.newLink.isTips = false;
            }
            if (this.$refs.newLink.storeTips) {
                this.$refs.newLink.storeTips = false;
            }
            if (this.$refs.newLink.phoneTips) {
                this.$refs.newLink.phoneTips = false;
            }
            if (this.$refs.newLink.noteTips) {
                this.$refs.newLink.noteTips = false;
            }
            if (this.$refs.newLink.dealerInfo.distributorName) {
                this.$refs.newLink.dealerInfo.distributorName = '';
            }
            if (this.$refs.newLink.dealerInfo.distributorMobile) {
                this.$refs.newLink.dealerInfo.distributorMobile = '';
            }
            if (this.$refs.newLink.dealerInfo.remark) {
                this.$refs.newLink.dealerInfo.remark = '';
            }
            if (this.$refs.newLink.dealerInfo.storeData) {
                this.$refs.newLink.dealerInfo.storeData = [];
            }
        },
        // 关闭 编辑关联-dialog
        handleClose1() {
            this.editDealer = false;
        },
        // 关闭 解除关联-dialog
        handleClose2() {
            this.dissociated = false;
        },
        // 编辑关联
        edit(val) {
            this.distributorId = val.distributorId;
            this.editDealer = true;
            // 通过经销商编号查询下属门店
            let params = {
                mobile: val.distributorMobile
            }
            this.$api.getDataByMobile(params).then(res => {
                if (res.code === 0 && res.data) {
                    this.dealerData = res.data;
                } else {
                    // 失败提示
                    console.log("没有数据！");
                }
            })
        },
        // 解除关联
        dissociatedHandle(val) {
            this.dissociated = true;
            this.currentAssociteItem = val;
        },
        // dialog 关联-新增
        associte() {
            this.bindDealer = false;
            this.editDealer = false;
            let params = {
                search: this.searchContent,
                page: this.currentPage,
                pageSize: this.pagesize
            }
            this.getDealerInfo(params);
        },
        // dialog 取消-新增
        cancel(val) {
            this.bindDealer = false
            this.editDealer = false
            this.dissociated = false
            
        },
        // dialog 关联-解除
        dissociatedEvent() {
            this.dissociated = false;
            let params = {
                search: this.searchContent,
                page: this.currentPage,
                pageSize: this.pagesize
            }
            this.getDealerInfo(params);
        },
        handleSizeChange: function (size) {
            this.pagesize = size
            let params = {
                search: this.searchContent,
                page: this.currentPage,
                pageSize: this.pagesize
            }
            this.getDealerInfo(params);
        },
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage
            let params = {
                search: this.searchContent,
                page: this.currentPage,
                pageSize: this.pagesize
            }
            this.getDealerInfo(params);
        },
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
    background: url('../../../../static/image/tianjia_icon.png') no-repeat 8px 10px;
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
.center-title {
    text-align: center;
    font-size: 16px;
    color: #606266;
    font-weight: 500;
}
.associteBox .el-dialog .el-dialog__body {
    padding-top: 0px;
}
</style>


