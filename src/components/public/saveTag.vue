<template>
<div class="tree-item">
    <div class="left-label">
      <span v-show="!isEdit">{{ node.label }}</span>
      <div class="edit" v-show="isEdit">
        <input @input="getInputNum" maxlength="5" type="text" @click.stop="() =>{}" v-model="data.label">
        <el-button class="btn define" @click.stop="define(node,data)">确定</el-button>
        <el-button class="btn cancel" @click.stop="cancel(node,data)">取消</el-button>
        <span style="color: #909399;margin-left: 10px;">最多输入5个字，还可以输入{{allNum}}个字</span>
      </div>
    </div>
    <div class="operate-btns">
        <el-button class="node"  @click="append(data)" v-if="data.type == 1">{{node.label=='全部品牌'? '增加品牌':'增加二类标签'}}</el-button>
        <el-button class="icon" @click.stop="edit(node,data)" v-if=" node.label!='全部品牌' ">编辑</el-button>
        <el-button class="icon" @click.stop="remove(node,data)" v-if=" node.label!='全部品牌' ">删除</el-button>
        <el-button class="node third-node"  @click="prompt">增加子系列</el-button>
    </div>
    </div>
  <!-- <div class="custom-tree-node" slot-scope="{ node, data }">
  </div> -->
</template>
<script>

export default {
  data () {
    return {
      allNum: 5,
      isEdit: false,
      newLabel: '',
      newTypeLabel:''
    }
  },
  methods: {
    getInputNum(){
      console.log('this.data.labelthis.data.label',this.data.label);
      var num = this.data.label.length
      this.allNum = 5 - num
    },
    prompt () {
      this.$message.warning('品牌系列最大只能支持三级')
    },
    edit (node, data) {
      this.isEdit = true
      this.allNum = 5 - this.data.label.length
    },
    append (data) {
      this.$emit('appendTree', data)
    },
    remove (node, data) {
      this.$emit('deleteTree', {node, data})
    },
    cancel (node, data) {
      this.allNum = 5
      console.log('datadatadata',data);
      if (this.$route.path === '/store/brandsManage') {
        const parent = node.parent
        const children = parent.data.children || parent.data
        let temp = 0
        children.forEach(el => {
          if (el.label === data.label) {
            temp += 1
          }
        })
        if (temp >= 2) {
          this.$message.error('同级目录下已存在相同品牌名称,请重新修改')
        } else {
          this.isEdit = false
        }
      } else {
        this.isEdit = false
        console.log('data.labNamedata.labNamedata.labName',data.labName);
        if(data.labName){
          data.label = data.labName
          if(this.newLabel){
            data.label = this.newLabel
          }
          // this.$emit('getUpdateLabelType', data)
          // console.log('data.labNamedata.labNamedata.labName',data.labName);
        }else if(data.labTypeName){
          data.label = data.labTypeName
          if(this.newTypeLabel){
            data.label = this.newTypeLabel
          }
          // this.$emit('getUpdateLabelType', data)
          console.log('data.labTypeName.labNamedata.labTypeName',data.labTypeName);
        }
      }
    },
    define (node, data) {
      this.allNum = 5
      if (data.type == 1) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        let temp = 0
        children.forEach(el => {
          if (el.label === data.label) {
            temp += 1
          }
        })
        if (temp >= 2) {
          this.$message.error('同级目录下已存在相同品牌名称,请重新修改')
        } else {
          this.$emit('getUpdateLabelType', data)
          this.newTypeLabel = data.label
          if(node.label != ""){
            this.isEdit = false
          }
          console.log('ata.labelata.label1111',node);
          console.log('走了第一个editTree');
        }
      } else {
        this.$emit('editTree', data)        
        if(data.label != ""){
        this.isEdit = false
        }
        this.newLabel = data.label
          console.log('走了第二个editTree');
      }
    }
  },
  props: ['node', 'data'],
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.tree-item{
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  .left-label{
    display: flex;
    margin-left: 24px;
    .edit{
      input[type='text']{
        border:1px solid $input-border-color;
        height:28px;
        border-radius: 4px;
        font-size: $xs-size;
        width:180px;
        padding-left:4px;
        margin-right: 4px;
      }
      .btn{
        padding:7px 12px;
        &.define{
          border-color: $main-color;
          color:#FFF;
          background-color: $main-color;
        }
        &.cancel{
          border-color: $input-border-color;
          color:$text-main-color;
          margin-left: 4px;
        }
      }
    }
  }
  .el-tree div:first-child {
    background-color: #cccccc;
  }
  .operate-btns{
    display: block;
    button{
      padding:7px;
      background-color:$main-color;
      border-color:$main-color;
      height: 28px;
      color: #303133;
      font-weight: 400;
      &.third-node{
        display: none;
      }
      &.node{
        background:rgba(255,255,255,1);
        border:1px solid rgba(221,221,221,1);
        border-radius: 3px;
        color:rgba(102,102,102,1);
        padding: 5px;
        position: relative;
        top:1px;
      }
      &.icon{
        background:rgba(255,255,255,1);
        border:1px solid rgba(221,221,221,1);
        border-radius: 3px;
      }
      &:hover{
        border:1px solid #fe5e55;
        background-color:#fe5e55;
        color: #fff;
      }
      i{
        color:#fff;
      }
    }
    .node{
      .iconfont{
        color: #fff;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
      }
    }
  }
}

// .el-tree-node__content:hover{
//   .operate-btns{
//     display: block;
//   }
// }
.right{
  margin-right: 20px;
  display: none;
  button{
    padding:7px;
    background-color:$main-color;
    border-color:$main-color;
    &:hover{
      background-color:lighten($main-color,6%);
      border-color:lighten($main-color,6%);
    }
    i{
      color:#fff;
    }
  }
  .node{
    padding:0;
    width:28px;
    height:29px;
    position: relative;
    top:6px;
    span{
      display: inline-block;
      width:100%;
      height:100%;
    }
  }
  .icon-node{
    @include icon(24px,24px,'../../assets/image/icon/icon-node.png')
  }
}
.parent-coll{
    border-top: 0;
    border-bottom:1px solid $border-color;

  .el-collapse{
    border-top: 0;
    border-bottom:0;
  }
  .el-coll{
    .item{
      padding:0 18px;
      justify-content: space-between;
      display: flex;
      &:hover{
        background-color:#E9EBF2;
        .right{
          display: block;
        }
      }
      .check{
        display: inline;
      }
      .label{
        margin-left: 32px;
        font-size:$md-size;
      }
    }
    .child-list{
      .el-coll{
        .item{
          padding-left: 40px;
        }
      }
    }
  }
}

</style>
