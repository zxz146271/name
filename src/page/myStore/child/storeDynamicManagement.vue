<template>
    <div class="storeDynamicManafement">
        <mineSearch :title = "title" @searchValue = "searchValue"/>
        <allclass :allClassType = "allClassType" @importcode = "importcode" @changeContentType = "changeContentType"/>
        <div class="content">
            <conentItem :conent = "conent" :contype = 'contype' :allClassType = "allClassType" @del = "del" @addTag="addTag" @delTag="delTag"/>
        </div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total=count>
        </el-pagination>

      <batchcopyexport :importflag = "importflag" @cancelimport = "cancelimport" @confirmimport = "confirmimport" />
      <el-dialog
        title="复制结果"
        :visible.sync="replicationflag"
        width="400px"
        center
        :size="400">
        <div class="contains-list">
            <div class="lit-top">
                <span class="lit-box"></span>
                <p class="lit-tit">成功复制{{importResults.successCount}}个内容，失败{{importResults.failCount}}个内容</p>
            </div>
            <table class="gridtable">
                <tr>
                    <th class="content1">内容名称</th>
                    <th class="content2">内容编号</th>
                    <th class="content2">复制结果</th>
                </tr>
                <tr v-for = "(item, index) in importResults.msgVoListo" :key = "index">
                    <td :class="item.importFlag == 'E' ? 'active': '' ">{{item.contentHeadline}}</td><td>{{item.contentId}}</td><td :class="item.importFlag == 'E' ? 'active': '' ">{{item.importMsg}}</td>
                </tr>
            </table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="replicationflag = false">好 的</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import mineSearch from '@/components/public/mineSearch'
import allclass from '../../../components/header/allclass'
import conentItem from '../../../components/conent/conentItem'

// 弹窗开始
import batchexport from '../../../components/mineself/batchexport'
import batchcopyexport from '../../../components/mineself/batchcopyexport'
import replicationsuccess from '../../../components/mineself/replicationsuccess'

export default {
  data () {
    return {
      allClassType: { typeClass: 3, typeBtn: 2 }, // [1.我的内容库， 2.品牌内容库，3，微店内容管理(发现),1.新增，回收站，批量导出内容编号   2.未上架的内容  3.返回]
      contype: [1, 1],
      title: '微店内容管理(发现)',
      currentPage: 1, // 当前所在页
      pagesize: 10,
      count: 0, // 总数
      importflag: false,
      // 列表声明一个空对象
      headline: '',
      contentType: '',
      state: '0',
      conent: [],
      replicationflag: false,
      importResults: {}
    }
  },
  components: {
    conentItem,
    allclass,
    mineSearch,
    batchexport,
    batchcopyexport,
    replicationsuccess},
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
      this.$api.getStroeContentList(params).then(res => {
        if (res.code === 0) {
          this.conent = res.data
          this.count = res.count
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    // 根据内容类型查询呢列表
    changeContentType (data) {
      this.headline = ''
      this.currentPage = 1
      this.contentType = data
      this.loading = true
      console.log(this.contentType)
      this.getContentList()
    },
    // 关键字查询内容
    searchValue (data) {
      this.headline = data
      this.currentPage = 1
      this.loading = true
      this.getContentList()
    },
    del (contentId) {
      let params = {
        contentId: contentId,
        recycleState: '1'
      }
      this.$api.updateStoreContentState(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
        this.headline = ''
        this.currentPage = 1
        this.getContentList()
      })
    },
    handleSizeChange (size) {
      this.pagesize = size
      this.getContentList()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getContentList()
    },
    importcode (flag) {
      this.importflag = flag
    },
    cancelimport (flag) {
      this.importflag = false
    },
    confirmimport (flag, replicationflag, importResults) {
      this.importflag = false
      this.importResults = importResults
      this.replicationflag = replicationflag
    },
    addTag () {
      this.getContentList()
    },
    delTag () {
      this.getContentList()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination{
  padding: 20px 30px;
}
.content{
    width: 100%;
    overflow: hidden;
    margin-top: 24px;
}
.contains-list{
    padding: 0 36px;
    margin-top: 50px;
    height: 400px;
    overflow: auto;
}
.lit-top{
    width: 89%;
    margin: 24px 0 10px 0;
    position: relative;
    position: absolute;
    top: 30px;
    left: 30px;
    border-top:1px dashed #C0C4CC;
    padding: 20px 0 0 6px;
    z-index: 10;
}
.lit-bottom{
    margin: 24px 0 10px 0;
    position: relative;
    padding: 30px 0 0 0;
}
.lit-box{
    display: inline-block;
    width:7px;
    height:7px;
    background:#AAAAAA;
    border-radius:50%;
    position: absolute;
    top: 28px;
}
.litt-box{
    display: inline-block;
    width:7px;
    height:7px;
    background:#AAAAAA;
    border-radius:50%;
    position: absolute;
    top: 37px;
}
.lit-tit{
    padding: 0 0 0 15px;
    color: #909399;
}
.lit-tit{
    height: 27px;
    line-height: 20px;
}
el-table{
    font-size: 100px;
}
.cell{
    text-align: center;
}
table.gridtable {
     font-family: verdana,arial,sans-serif;
     font-size:11px;
     color:#333333;
     border-width: 1px;
     border-color: #666666;
     border-collapse: collapse;
 }
 table.gridtable th {
     border-width: 1px;
     padding: 8px;
     border-style: solid;
     border-color: #D9D9D9;
     background-color: #F3F3F3;
     font-size: 12px;
 }
 table.gridtable td {
     border-width: 1px;
     padding: 8px;
     border-style: solid;
     border-color: #D9D9D9;
     background-color: #ffffff;
     text-align: center;
 }
 .content1{
    width: 200px;
 }
 .content2{
     width: 150px;
 }
 .active{
     color: #FD4343;
 }
</style>
