<template>
   <div class="popup">
        <div class="popup-box">
            <div class="popup-tit">
                
                <el-row class="popup-botbox" v-for="(item,index) in storeSales" :key="index">
                    <el-rol class="pop-box"></el-rol>
                    <el-col :span="24" class="pop-store"><div>门店名称:{{item.title}}</div></el-col>
                    <el-col :span="24" class="pop-store"><div class="popup-num">销售数量：{{item.num}}个</div></el-col>
                </el-row>
            </div>
            <el-row class="edit">
                <el-col>编辑</el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
   name: '',
   data() {
       return {
        storeSales: [
            { title: '门店1门店1门店1门店1门店1门店1门店1', num: "1" },
            { title: '门店2门店2门店2门店2门店2门店2门店2', num: "2" },
            { title: '门店3门店3门店3门店3门店3门店3门店3', num: "3" },
            { title: '门店4门店4门店4门店4门店4门店4门店4', num: "4" },
            { title: '门店55555555555555555', num: "5" },
            { title: '门店66666666666666666666', num: "6" },
            { title: '门店7777777777777777777777', num: "7" },
            { title: '门店88888888888888888888888', num: "8" }
        ],
        }
    },
  components: {}
}
</script>

<style scoped>
.popup{
  background-color:#fff;
  /* width:448px;
  height:525px; */
  color:#909399;
}
.popup-header{
  height:52px;
  line-height:52px;
  font-size:16px;
  font-family:Source Han Sans SC;
  font-weight:500;
  text-align:center;
  border-bottom:1px dashed #C0C4CC;
}
.popup-box{
  padding:0 14px;
}
.popup-botbox{
  margin-left:14px;
  margin-top:23px;
  font-size:14px;
}
.popup-num{
  margin-top:13px;
}
.edit{
  width:356px;
  height:35px;
  line-height:35px;
  border:1px solid rgba(253,67,67,1);
  opacity:1;
  border-radius:4px;
  text-align:center;
  color:#FD4343;
  margin-left:22%;
  cursor:pointer;
}
.popup-tit{
    height: 400px;
    overflow: auto;
    position: relative;
}
.pop-box{
    width: 7px;
    height: 7px;
    background-color: #AAAAAA;
    border-radius: 50%;
    display: block;
    position: absolute;
    top:9px;
    left: 10px;
}
.pop-store{
    margin-left: 30px;
}
</style>
