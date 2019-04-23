<template>
  <div class="contains">
       <el-button type="text" @click="centerDialogVisible = true">选择全景图</el-button>
            <el-dialog
            title="选择全景图"
            :visible.sync="centerDialogVisible"
            width="400px"
            center
            :size="400">
            <div class="contains-list">
               <div class="lit-top">
                    <p class="lit-tit">方案名称方案名称方案名称</p>
                </div>
                <div class="goods">
                    <div class="goodslist">
                        <div class="boximg"></div>
                        <el-row class="boxtit" >
                            <el-col :span="24" class="eltit">房间名称：客厅</el-col>
                            <el-col :span="24" class="eltit">渲染图ID：Nc2018102500076</el-col>
                            <el-col :span="24" class="eltit">全景图链接:12373587498573498573984753984</el-col>
                        </el-row>
                        <el-button class="btn">选择此图</el-button>
                    </div>
                    <div class="goodslist">
                        <div class="boximg"></div>
                        <el-row class="boxtit" >
                            <el-col :span="24" class="eltit">房间名称：客厅</el-col>
                            <el-col :span="24" class="eltit">渲染图ID：Nc2018102500076</el-col>
                            <el-col :span="24" class="eltit">全景图链接:12373587498573498573984753984</el-col>
                        </el-row>
                        <el-button class="btn">选择此图</el-button>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
               <el-button @click="centerDialogVisible = false" class="cancel">返 回</el-button>
            </span>
            </el-dialog>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      centerDialogVisible: false
    }
  },
  components: {}
}
</script>

<style scoped>
.contains-list{
    padding: 25px 0 0 36px;
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
    color: #909399;
    height: 27px;
    line-height: 20px;
}
.boximg{
    width: 90px;
    height: 90px;
    position: absolute;
    background-color: aquamarine;
}
.boxtit{
    padding-left:92px;
    color: #606266;
    position: relative;
}
.eltit{
    width: 280px;
    padding: 1px 5px;
}
.goodslist{
    margin-bottom: 20px;
    position: relative;
}
.btn{
    position: absolute;
    top: 23px;
    right: 65px;
    z-index: 10;
    color: #FE4343;
}

</style>
