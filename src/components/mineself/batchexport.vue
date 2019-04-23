<template>
   <div class="contains">
       <!-- <el-button type="text" @click="centerDialogVisible = true">批量导出编号</el-button> -->
        <el-dialog
        title="批量导出内容编号"
        :visible.sync="flag"
        center
        :size="400">
        <div class="line"></div>
        <el-row class="contains-copy">
            <el-col :span="24" class="count">内容名称：内容名称内容名称内容名称</el-col>
        </el-row>
        <div class="btnbox">
            <el-checkbox-group v-model="checkList">
                <el-checkbox  label="case" class="btnlist">{{"全部案例"}}</el-checkbox>
                <el-checkbox  label="article" class="btnlist">{{"全部文章"}}</el-checkbox>
                <el-checkbox  label="atlas" class="btnlist">{{"全部图册"}}</el-checkbox>
                <el-checkbox  label="panorama" class="btnlist">{{"全部全景图"}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button class="cancel" @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">导 出</el-button>
        </span>
        </el-dialog>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      value: '',
      checkList: [],
      flag: false
    }
  },
  props: {
    exportflag: Boolean
  },
  components: {},
  methods: {
    cancel () {
      this.checkList = []
      this.$emit('cancelexport', false)
    },
    confirm () {
      if (this.checkList.length > 0) {
        this.$emit('confirmexport', this.checkList)
        this.checkList = []
      } else {
        this.$message.error('请选择导出内容类型')
      }
    }
  },
  mounted () {
    this.flag = this.$props.exportflag
  },
  watch: {
    flag (v) {
      if (v === false) {
        this.$emit('cancelexport', false)
      }
    },
    exportflag (n) {
      console.log('改变', n)
      this.flag = n ? true : false
    }
  }
}
</script>

<style scoped>
.line{
    border-top:1px dashed #C0C4CC;
    position: absolute;
    left: 0;
    right:0;
    margin: 0 auto;
    top: 58px;
    width: 93%;
}
.contains-copy{
    position: absolute;
    top: 58px;
    /* left: 35px; */
    padding:0 24px;
    /* width: 89%; */
}
.count{
    height: 45px;
    line-height: 45px;
    color:#909399;
    font-size: 14px;
}
.contains-list{
    padding: 30px;
}
.lit-top{
    margin: 24px 0 10px 0;
    position: relative;
}
.lit-box{
    display: inline-block;
    width:7px;
    height:7px;
    background:#AAAAAA;
    border-radius:50%;
    position: absolute;
    top: 6px;
}
.lit-tit{
    padding: 0 0 0 15px;
}
.v-select{
   margin-top: 10px;
   margin-left: 15px;
}
.cancel{
   margin-right: 60px;
}
.btnbox{
    margin-top: 30px;
    padding:0 24px;
}
.el-checkbox-group{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    justify-content:space-between;
}
.btnlist{
    /* margin-right: 86px;
    margin-bottom: 14px; */
    
}
</style>
