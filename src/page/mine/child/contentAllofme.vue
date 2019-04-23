<template>
   <div class="container">
      <mineSearch :title = "title" @searchValue = "searchValue"/>
      <div class="classtype">
         <allclass :allClassType = "allClassType" @exportCode = "exportCode" @importcode = "importcode"  @changeContentType = "changeContentType"/>
      </div>
      <div class="content">
         <contentItem :conent = "conent" :contype = "contype" :contentType="contentType" :mark="mark"  :allClassType = "allClassType" @copytoStore = "copytoStore" @del = "del" @addTag = "addTag" @delTag = "delTag"/>
      </div>

      <!-- 复制到品牌 -->
      <duplicate :copyflag = "copyflag" :item="copyToStoreContent" @cancelcopy = "cancelcopy" @confirmcopy = "confirmcopy"/>
      <!-- 批量导出内容编号 -->
      <batchexport :exportflag = "exportflag" @cancelexport = "cancelexport" @confirmexport = "confirmexport"/>
      <!-- 导入 -->
      <batchcopyexport :importflag = "importflag" @cancelimport = "cancelimport" @confirmimport = "confirmimport"/>

      <!-- 导入结果提示 -->
      <!-- <replicationsuccess :replicationflag = "11111" :importResults = "2222" @hidereplication="hidereplication"/> -->

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
            <el-button type="primary" @click="hideReplication">好 的</el-button>
        </span>
        </el-dialog>
        <div class="pagin" style="display:flex; justify-content: flex-end;margin:32px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total="count">
          </el-pagination>
        </div>
        <div style="width:100%;height:50px;"></div>
    </div>
</template>
<script type="text/ecmascript-6">
import allclass from '../../../components/header/allclass'
import mineSearch from '../../../components/public/mineSearch'
import contentItem from '../../../components/conent/conentItem'

// 弹窗开始
import duplicate from '../../../components/mineself/duplicate'
import batchexport from '../../../components/mineself/batchexport'
import batchcopyexport from '../../../components/mineself/batchcopyexport'
import replicationsuccess from '../../../components/mineself/replicationsuccess'
import selectpanorama from '../../../components/mineself/selectpanorama'
import {exportJsonExcel} from '../../../vendor/Export2Excel'

// 弹窗结束
export default {
  data () {
    return {
      title: '我的内容库',
      pagesize: 10,
      currentPage: 1, // 当前所在页
      count: 0, // 总数
      importflag: false, // 导入
      copyflag: false, // 复制到品牌弹框
      exportflag: false, // 导出内容编号弹框
      replicationflag: false,
      // 列表声明一个空对象
      headline: '',
      contentType: '',
      state: '0',
      allClassType: {typeClass: 1, typeBtn: 1}, // [我的内容库，新增、回收站、批量导出]
      value: '',
      checkList: [],
      tableData: [],
      centerDialogVisible: false,
      loading: false,
      input: '',
      radio: '1',
      form: {
        name: ''
      },
      contype: [2, 1],
      conent: [],
      copyToStoreContent: {},
      importResults: {}, // 导入内容编号结果
      mark: ''
    }
  },
  components: {
    allclass,
    duplicate,
    mineSearch,
    batchcopyexport,
    contentItem,
    batchexport,
    replicationsuccess,
    selectpanorama
  },
  mounted () {
    this.getContentList()
    this.contentType = this.$route.query.index
  },
  inject: ['reloadAllPage'],
  methods: {
    hideReplication () {
      this.replicationflag = false
      this.reloadAllPage()
    },
    // 获取内容列表
    getContentList () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        state: this.state,
        contentType: this.contentType,
        headline: this.headline
      }
      this.$api.getStaffContentList(params).then(res => {
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
    changeContentType (data, mark) {
      this.headline = ''
      this.currentPage = 1
      this.contentType = data
      this.loading = true
      this.getContentList()
    },
    // 关键字查询内容
    searchValue (data) {
      this.headline = data
      this.currentPage = 1
      this.loading = true
      this.getContentList()
    },
    // 复制到品牌
    copytoStore (content) {
      this.copyToStoreContent = content
      this.copyflag = true
    },
    // 取消复制到品牌
    cancelcopy (flag) {
      this.copyflag = false
    },
    // 确认复制到品牌
    confirmcopy (flag) {
      this.copyflag = false
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
      this.$api.exportContentIds(params).then(res => {
        // console.log(res)
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
    // 添加标签
    addTag () {
      this.getContentList()
    },
    // 删除成功
    delTag () {
      this.getContentList()
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
    },
    // 确认导入
    confirmimport (flag, replicationflag, importResults) {
      this.importflag = false
      this.replicationflag = true
      this.importResults = importResults
      // console.log("导入结果--->", importResults)
      // alert('确认导入')
    },
    hidereplication () {
      this.replicationflag = false
    },
    del (contentId) {
      let params = {
        contentId: contentId,
        recycleState: '1'
      }
      this.$api.updateContentState(params).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
        } else {
          this.$message.error(res.msg)
        }
        this.headline = ''
        this.currentPage = 1
        this.getContentList()
      })
    },

    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    handleSizeChange (size) {
      this.pagesize = size
      this.getContentList()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getContentList()
    }
  }
}
</script>

<style scoped lang = "scss">
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
