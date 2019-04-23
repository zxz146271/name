<template>
   <div class="price-revision">
      
      <el-row class="popup-botbox" v-for="(item,index) in storeSales" :key="index">
         <el-col class="revision-box" :span="1"></el-col>
         <el-col :span="23" class="revision-title"><div>{{item.title}}</div></el-col>
         <el-input :placeholder="item.tips"></el-input>
      </el-row>
      <el-row class="edit">
         <el-col :span="12" class="edit-cancel">取消</el-col>
         <el-col :span="12" class="edit-binding">绑定</el-col>
      </el-row>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
   name: '',
   data() {
       return {
          storeSales: [
            { title: '商品名称',tips:'请输入商品名称'},
            { title: '商品编号',tips:'请输入商品编号'},
            { title: '数量',tips:'请输入数量'}
        ],

       }
   },
  components: {}
}
</script>

<style scoped>
.revision-box{
   position: absolute;
   left: 10px;
   top: 17px;
}
.price-revision{
   padding: 0 34px;
}
.revision-title{
   /* margin-bottom: 8px; */
   height: 50px;
   line-height: 50px;
   margin-left: 30px;
   color: #909399;
}
.revision-box{
   width: 7px;
   height: 7px;
   background-color: #AAAAAA;
   border-radius: 50%;
}
.edit{
   margin-top: 34px;
}
.edit .edit-cancel{
   width:80px;
   height:35px;
   line-height: 35px;
   border:1px solid #C0C4CC;
   border-radius:4px;
   color: #C0C4CC;
   text-align: center;
   margin-left: 114px;
   cursor: pointer;
}
.edit .edit-binding{
   width:80px;
   height:35px;
   line-height: 35px;
   background:rgba(253,67,67,1);
   border-radius:4px;
   color: #fff;
   text-align: center;
   margin-right: 114px;
   margin-left: 60px;
   cursor: pointer;
}
</style>
