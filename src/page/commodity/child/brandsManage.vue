<template>
  <div class="sort-manage">
    <div class="top">
      <search v-model="filterText" @searchValue="searchValue"></search>
    </div>
    <div class="coll-list">
      <!-- <el-tree :data="treeList"  show-checkbox node-key="id"  ref="tree" @node-click="nodeClick" :expand-on-click-node="false" :default-expanded-keys="[1]"> -->
      <el-tree :data="treeList" node-key="id"  ref="tree" :filter-node-method="filterNode" :expand-on-click-node="false" default-expand-all>
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <tree-list :node="node" :data="data" @appendTree="appendTree" @deleteTree="deleteTree" @editTree="editTree(node,data)"></tree-list>
        </div>
      </el-tree>
    </div>
    <!-- <div class="pagin">
        <span class="total">共{{count}}条数据</span>
        <span></span>
        <el-pagination
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
import search from '../../../components/public/search'
import treeList from '../../../components/public/treeList'
export default {
  data () {
    return {
      filterText: '',
      count: 0,
      brandName: '',
      treeList: [],
      multipleSelection: []
    }
  },
  // 初始化运行调用方法
  mounted () {
    this.getStgoodsBrandList()
  },
  methods: {
    appendTree (data) {
      let temp = 1
      if (data.children) {
        temp += data.children.length
      }
      let params = {
        parentId: data.id,
        brandName: '品牌' + temp
      }
      this.$api.addBrand(params).then(res => {
        if (res.code === 0) {
          const newChild = { id: res.data, label: '品牌' + temp, children: [] }
          if (!data.children) {
            this.$set(data, 'children', [])
          }
          data.children.push(newChild)
          // 成功提示
          this.$message.success('添加品牌成功')
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    deleteTree (params) {
      if (params.data.label === '全部品牌') {
        // 根节点不能删除
        this.$message.error('根节点不能删除')
      } else {
        let delDatas = []
        let delData = { brandId: params.data.id, versionNo: '' }
        delDatas.push(delData)
        let param = {
          jsonData: JSON.stringify(delDatas)
        }
        const parent = params.node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === params.data.id)
        if (children[index].children) {
          if (children[index].children.length > 0) {
            this.$message.error('请先删除子品牌')
          } else {
            this.$api.deleteBrandById(param).then(res => {
              if (res.code === 0) {
                children.splice(index, 1)
                // 成功提示
                this.$message.success('删除成功')
              } else {
                // 失败提示
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          this.$api.deleteBrandById(param).then(res => {
            if (res.code === 0) {
              children.splice(index, 1)
              // 成功提示
              this.$message.success('删除成功')
            } else {
              // 失败提示
              this.$message.error(res.msg)
            }
          })
        }
      }
    },
    // 编辑品牌系列
    editTree (node, data) {
      let params = {
        brandId: data.id,
        brandName: data.label
      }
      this.$api.setBrandName(params).then(res => {
        if (res.code === 0) {
          // 成功提示
          this.$message.success('修改成功')
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    nodeClick (node) {
    },
    // 模糊查询
    searchValue (value) {
      // this.getStgoodsBrandList(value)
      this.$refs.tree.filter(value)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getStgoodsBrandList (value) {
      let params = {
        page: 1,
        limit: 20,
        brandName: value
      }
      this.$api.getStgoodsBrandList(params).then(res => {
        this.count = res.count
        this.treeList = res.data
      })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleCheckChange (data, checked, indeterminate) {
      let delData = { brandId: data.id, versionNo: '' }
      if (checked) {
        this.multipleSelection.push(delData)
      } else {
        for (let index = 0; index < this.multipleSelection.length; index++) {
          const element = this.multipleSelection[index]
          if (element.classifyId === delData.classifyId) {
            this.multipleSelection.splice(index, 1)
          }
        }
      }
    },
    // 批量删除
    batchDelete () {
      let param = {
        jsonData: JSON.stringify(this.multipleSelection)
      }
      this.$api.deleteBrandById(param).then(res => {
        if (res.code === 0) {
          // 成功提示
          this.$message.success('删除成功')
          this.getStgoodsclassifyList()
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    }
  },
  components: {search, treeList}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.sort-manage{
  margin:0 auto;
  padding-top: 126px;
  .top{
    display: flex;
    flex:1;
    justify-content: flex-start;
    padding: 0 18px;
    margin-bottom: 10px;
    .opera{
      display: flex;
      .comm-check{
        margin-top: 6px;
        margin-right: 20px;
      }
      .add{
        border:0;
        padding:0px;
        margin-right: 20px;
        color:$text-main-color;
        .icon-icon_addsbject1{
          margin-right: 2px;
        }
      }
      .delete{
        border:0;
        color:$main-color;
        padding:0px;
      }
    }
  }
  .coll-list{
    .custom-tree-node{
      flex:1;
    }
  }
}
</style>
