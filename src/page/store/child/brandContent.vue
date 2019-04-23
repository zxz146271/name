<template>
    <div class="storeDynamicManafement">
        <mineSearch :title = "title" @searchValue = "searchValue"/>
        <allclass :allClassType = "allClassType" @exportCode = "exportCode" @importcode = "importcode"  @changeContentType = "changeContentType"/>
        <div class="content">
            <conentItem :conent = "conent" :contentType="contentType" :contype = 'contype' :allClassType = "allClassType"  @del = "del"  @addTag = "addTag" @delTag = "delTag"/>
        </div>
        <!-- 批量导出内容编号 -->
        <batchexport :exportflag = "exportflag" @cancelexport = "cancelexport" @confirmexport = "confirmexport"/>
        <!-- 导入 -->
        <batchcopyexport :importflag = "importflag" @cancelimport = "cancelimport" @confirmimport = "confirmimport"/>
        <!-- 导入结果 -->
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
          
      <div class="pagin" style="display:flex; justify-content: flex-end;margin:32px;">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[10, 20, 50, 100]"
            :total="count">
        </el-pagination>
      </div>
        <div style="width:100%;height:50px;"></div>
    </div>
</template>

<script>
import allclass from '../../../components/header/allclass'
import mineSearch from '@/components/public/mineSearch'
import conentItem from '../../../components/conent/conentItem'

// 弹窗开始
import batchexport from '../../../components/mineself/batchexport'
import batchcopyexport from '../../../components/mineself/batchcopyexport'
import replicationsuccess from '../../../components/mineself/replicationsuccess'
import {exportJsonExcel} from '../../../vendor/Export2Excel'
export default {
  data () {
    return {
      contype: [2, 2],
      allClassType: {typeClass: 2, typeBtn: 1},
      title: '品牌内容库',
      importflag: false, // 导入内容编号
      exportflag: false, // 导出内容编号弹框
      currentPage: 1, // 当前所在页
      pagesize: 10,
      count: 0, // 总数
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
    mineSearch,
    conentItem,
    allclass,
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
      this.$api.getAccountContentList(params).then(res => {
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
      this.$api.updateAccountContentState(params).then(res => {
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
    // 导出内容编号
    exportCode (copyflag) {
      this.exportflag = true
      console.log(copyflag)
    },
    // 取消导出内容编号
    cancelexport (flag) {
      this.exportflag = false
    },
    // 确认导出内容编号
    confirmexport (flag) {
      this.exportflag = false
      let params = {
        contentTypes: JSON.stringify(flag)
      }
      this.$api.exportBrandContentIds(params).then(res => {
        if (res.code === 0) {
          this.$emit('exportExcel')
          const tHeader = ['内容编号', '内容类型', '内容标题', '创建人', '修改时间']
          const filterVal = ['contentId', 'contentType', 'headline', 'source', 'modifyTime']
          if (res.data.length > 0) {
            const data = this.formatJson(filterVal, res.data)
            exportJsonExcel(tHeader, data, '内容编号列表')
          } else {
            this.$message.error('没有可被共享的内容码')
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 导入内容编号
    importcode (flag) {
      console.log('导入父组件', flag)
      this.importflag = true
    },
    // 取消导入
    cancelimport (flag) {
      this.importflag = false
      // alert('取消导入')
    },
    // 确认导入
    confirmimport (flag, replicationflag, importResults) {
      this.importflag = false
      this.replicationflag = true
      this.importResults = importResults

      // alert('确认导入')
    },
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    handleSizeChange (size) {
      this.pagesize = size;
      this.getContentList()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.getContentList()
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
.content{
    width: 100%;
    overflow: hidden;
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
