<template>
  <div class="sort-manage">
    <div class="top">
      <div class="opera">
        <!-- <el-checkbox class="comm-check">全选</el-checkbox> -->
        <!-- <el-button icon="" class="add"> <i class="iconfont icon-icon_addsbject1"></i> 添加</el-button> -->
        <!-- <el-button icon="el-icon-delete" class="delete" @click="batchDelete">删除</el-button> -->
      </div>
      <!-- <search @searchValue="searchValue"></search> -->
      <search  @searchValue="searchValue"></search>
    </div>
    <div class="coll-list">
      <!-- <el-tree :data="treeList"  show-checkbox @check-change="handleCheckChange" node-key="id"  ref="tree" @node-click="nodeClick" :expand-on-click-node="false" :default-expanded-keys="[1]"> -->
      <el-tree :data="treeList" node-key="id"  ref="tree" :filter-node-method="filterNode" :expand-on-click-node="false" :default-expanded-keys="[1]">
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <tree-list :node="node" :data="data" @appendTree="appendTree" @deleteTree="deleteTree" @editTree="editTree"></tree-list>
        </div>
      </el-tree>
    </div>
    <div class="pagin">
        <span class="total">共{{count}}条数据</span>
        <el-pagination
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
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
      classifyName: '',
      treeList: [],
      multipleSelection: []
    }
  },
  // 初始化运行调用方法
  mounted () {
    this.getStgoodsclassifyList()
  },
  methods: {
    // 添加商品分类
    appendTree (data) {
      let params = {
        parentId: data.id
      }
      this.$api.addClassify(params).then(res => {
        if (res.code === 0) {
          const newChild = { id: res.data, label: '分类', children: [] }
          if (!data.children) {
            this.$set(data, 'children', [])
          }
          data.children.push(newChild)
          // 成功提示
          this.$message.success('添加分类成功')
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    // 删除商品分类
    deleteTree (params) {
      if (params.data.id === '全部商品分类') {
        // 根节点不能删除
        this.$message.error('根节点不能删除')
      } else {
        let delDatas = []
        let delData = { classifyId: params.data.id, versionNo: '' }
        delDatas.push(delData)
        let param = {
          jsonData: JSON.stringify(delDatas)
        }
        const parent = params.node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === params.data.id)
        if (children[index].children) {
          if (children[index].children.length > 0) {
            this.$message.error('请先删除子分类')
          } else {
            this.$api.deleteClassifyById(param).then(res => {
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
          this.$api.deleteClassifyById(param).then(res => {
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
    // 编辑商品分类
    editTree (data) {
      let params = {
        classifyId: data.id,
        classifyName: data.label
      }
      this.$api.setClassifyName(params).then(res => {
        if (res.code === 0) {
          // 成功提示
          this.$message.success(res.msg)
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
      // const index = children.findIndex(d => d.id === params.data.id)
    },
    nodeClick (node) {
    },
    // 模糊查询
    searchValue (value) {
      // this.getStgoodsclassifyList(value)
      this.$refs.tree.filter(value)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getStgoodsclassifyList (value) {
      let params = {
        page: 1,
        limit: 20,
        classifyName: value
      }
      this.$api.getStgoodsclassifyList(params).then(res => {
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
      let delData = { classifyId: data.id, versionNo: '' }
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
    batchDelete (params) {
      let param = {
        jsonData: JSON.stringify(this.multipleSelection)
      }
      this.$api.deleteClassifyById(param).then(res => {
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
    justify-content: space-between;
    padding: 0 18px;
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
    margin-top: 36px;
    .custom-tree-node{
      flex:1;
    }
  }
}
</style>
