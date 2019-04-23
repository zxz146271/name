<template>
    <div class="storeDynamicManafement">
        <mineSearch :title = "title" @searchValue = "searchValue"/>
        <div class="allclass">
            <allclass :allClassType = "allClassType" @changeContentType = "changeContentType"></allclass>
        </div>
        <div class="content">
            <conentItem :conent = "conent" :contype = 'contype' :allClassType = "allClassType" @del = "del" @addTag = "addTag" @delTag = "delTag"></conentItem>
        </div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total=count>
        </el-pagination>
    </div>
</template>

<script>
import allclass from '../../../components/header/allclass'
import conentItem from '../../../components/conent/conentItem'
import mineSearch from '@/components/public/mineSearch'
export default {
  data () {
    return {
      allClassType: {typeClass: 3, typeBtn: 3}, // [1.我的内容库， 2.品牌内容库，3，微店内容管理(发现),1.新增，回收站，批量导出内容编号   2.未上架的内容  3.返回]
      contype: [1, 2], // [1.上下架、 2.复制到品牌、编辑、删除, 1.复制到品牌、2.编辑、3.放回原处]
      title: '未上架内容',
      currentPage: 1, // 当前所在页
      pagesize: 10,
      count: 0, // 总数
      // 列表声明一个空对象
      headline: '',
      contentType: '',
      state: '1',
      conent: []
    }
  },
  components: {
    mineSearch, conentItem, allclass },
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
        recycleState: '0'
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
    // 添加标签
    addTag () {
      this.getContentList()
    },
    // 删除成功
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
    margin-top: 24px;
}
</style>
