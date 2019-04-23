<template>
   <div class="container">
      <div class="tab">
         <h2>回收站</h2>
         <search :load="loading" @searchValue = "searchValue"></search>
      </div>
      <div class="classtype">
         <allclass :allClassType = "allClassType" @changeContentType = "changeContentType"></allclass>
      </div>
      <div class="content">
         <contentItem :conent = "conent" :contype = "contype" :allClassType = "allClassType"  @del = "del"  @addTag = 'addTag' @delTag = 'delTag' ></contentItem>
      </div>

      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total="count">
        </el-pagination>

    </div>
</template>
<script type="text/ecmascript-6">
import search from '../../../components/public/search'
import allclass from '../../../components/header/allclass'
import contentItem from '../../../components/conent/conentItem'

export default {
  data () {
    return {
      copyflag: false,
      pagesize: 10,
      currentPage: 1, // 当前所在页
      count: 0, // 总数
      loading: false,
      // 列表声明一个空对象
      headline: '',
      contentType: '',
      state: '1',
      allClassType: { typeClass: 2, typeBtn: 3 },
      input: '',
      radio: '1',
      form: {
        name: ''
      },
      contype: [2, 3],
      conent: []
    }
  },
  components: {
    search,
    allclass,
    contentItem
  },
  mounted () {
    this.getContentList()
  },
  methods: {
    // 查询回收站内容列表
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
    // 放回原处
    del (contentId) {
      let params = {
        contentId: contentId,
        recycleState: '0'
      }
      this.$api.updateContentState(params).then(res => {
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
    },
    // 添加标签刷新页面
    addTag () {
      this.getContentList()
    },
    // 删除标签刷新页面
    delTag () {
      this.getContentList()
    }
  }
}
</script>

<style scoped lang="scss">
.container{
   .tab{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin:0 32px 14px 32px;
      h2{
         margin-top: 12px;
         color:rgba(0,0,0,0.85);
         font-size: 20px;
         font-weight: 400;
         line-height: 28px;
      }
   }
}
</style>
