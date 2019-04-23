<template>
   <div class="contains">
       <!-- <el-button type="text" @click="centerDialogVisible = true">复制</el-button> -->
        <el-dialog
            title="复制结果"
            :visible.sync="replicationflag1"
            width="400px"
            center
            :size="400">
            <div class="contains-list">
                <div class="lit-top">
                    <span class="lit-box"></span>
                    <p class="lit-tit">成功复制{{importResults.successCount}}个内容，失败{{importResults.failCount}}个内容</p>
                </div>
                <table class="gridtable">
                    <tr>
                        <th class="content1">内容名称</th>
                        <th class="content2">内容编号</th>
                        <th class="content2">复制结果</th>
                    </tr>
                    <tr v-for = "(item, index) in importResults.msgVoListo" :key = "index">
                        <td :class="item.importFlag == 'E' ? 'active': '' ">{{item.contentHeadline}}</td><td>{{item.contentId}}</td><td :class="item.importFlag == 'E' ? 'active': '' ">{{item.importMsg}}</td>
                    </tr>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="hidereplication">好 的</el-button>
            </span>
            </el-dialog>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      replicationflag1: false
    }
  },
  props: ['replicationflag', 'importResults'],
  watch: {
    centerDialogVisible (flag) {
      this.centerDialogVisible = flag
    }
  },
  methods: {
    hidereplication () {
      this.replicationflag1 = false
      this.$emit('hidereplication')
    }
  },
  mounted () {
    //   console.log("传过来的值------>", this.$prop)
    //   this.replicationflag1 = this.$prop.replicationflag
  }
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
    padding: 0 0 0 15px;
    color: #909399;
}
.lit-tit{
    height: 27px;
    line-height: 20px;
}
el-table{
    font-size: 100px;
}
.cell{
    text-align: center;
}
table.gridtable {
     font-family: verdana,arial,sans-serif;
     font-size:11px;
     color:#333333;
     border-width: 1px;
     border-color: #666666;
     border-collapse: collapse;
 }
 table.gridtable th {
     border-width: 1px;
     padding: 8px;
     border-style: solid;
     border-color: #D9D9D9;
     background-color: #F3F3F3;
     font-size: 12px;
 }
 table.gridtable td {
     border-width: 1px;
     padding: 8px;
     border-style: solid;
     border-color: #D9D9D9;
     background-color: #ffffff;
     text-align: center;
 }
 .content{
    width: 200px;
 }
 .content2{
     width: 150px;
 }
 .active{
     color: #FD4343;
 }
</style>
