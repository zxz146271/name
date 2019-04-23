<template>
  <div class="label-role">
    <el-table
    :data="childAllyInfo"
    style="width: 100%">
   <el-table-column
        label="序号"
        type="index"
        width="50">
   </el-table-column>
    <el-table-column
      prop="distributorId"
      label="序号"
      align="center"
      width="100"
      v-if = false
      >
    </el-table-column>
    <el-table-column
      prop="distributorName"
      label="经营商名称"
      align="center"
      width="200">
    </el-table-column>
    <el-table-column
      prop="mobile"
      align="center"
      width="300"
      label="手机号">
    </el-table-column>
    <el-table-column label="操作" align="center" v-if="childAllyInfo">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" class="edit">移除</el-button>
        <!-- <el-button
          size="mini"
          @click="handleDelete(scope.$index, scope.row)" class="delete">启用</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ['childAllyInfo'],
  methods: {
    handleEdit (index, row) {
      this.childAllyInfo.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.label-role{
  width:1000px;
  margin:0 auto;
  .el-table{
    margin-top: 16px;
  }
  .edit, .delete{
    border: 0;
    background: none;
  }
  .edit{
     color:$main-color;
    &:hover{
      color:lighten($main-color, 12%)
    }
  }
  .delete{
    color:$table-text-color;
    &:hover{
      color:lighten($table-text-color, 12%)
    }
  }
}
</style>
