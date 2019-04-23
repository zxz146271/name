<template>
<div class="tree-item">
    <div class="left-label">
      <span v-show="!isEdit">{{ node.label }}</span>
      <div class="edit" v-show="isEdit">
        <input type="text" @click.stop="() =>{}" v-model="data.label">
        <el-button class="btn define" @click.stop="define(node,data)">确定</el-button>
        <el-button class="btn cancel" @click.stop="cancel(node,data)">取消</el-button>
      </div>
    </div>
    <div class="operate-btns">
        <el-button icon="el-icon-edit" class="icon" @click.stop="edit(node,data)" circle v-if=" node.label!='全部品牌' "></el-button>
        <el-button icon="el-icon-delete" class="icon" @click.stop="remove(node,data)" circle v-if=" node.label!='全部品牌' "></el-button>
        <el-button  class="node"  @click="append(data)">{{node.label=='全部品牌'? '增加品牌':'增加子系列'}}</el-button>
        <el-button  class="node third-node"  @click="prompt">增加子系列</el-button>
    </div>
    </div>
  <!-- <div class="custom-tree-node" slot-scope="{ node, data }">
  </div> -->
</template>
<script>

export default {
  data () {
    return {
      isEdit: false
    }
  },
  methods: {
    prompt () {
      this.$message.warning('品牌系列最大只能支持三级')
    },
    edit (node, data) {
      this.isEdit = true
    },
    append (data) {
      this.$emit('appendTree', data)
    },
    remove (node, data) {
      this.$emit('deleteTree', {node, data})
    },
    cancel (node, data) {
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
      }
    },
    define (node, data) {
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
          this.$emit('editTree', data)
        }
      } else {
        this.isEdit = false
        this.$emit('editTree', data)
      }
    }
  },
  props: ['node', 'data']
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
  .operate-btns{
    display: block;
    button{
      padding:7px;
      background-color:$main-color;
      border-color:$main-color;
      height: 28px;
      &.third-node{
        display: none;
      }
      &.node{
        background:rgba(239,239,239,1);
        border:1px solid rgba(221,221,221,1);
        border-radius: 13px;
        color:rgba(102,102,102,1);
        padding: 5px;
        position: relative;
        top:1px;
      }
      &.icon{
        background:rgba(239,239,239,1);
        border:1px solid rgba(221,221,221,1);
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
