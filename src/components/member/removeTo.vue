<template>
  <div>
    <el-table
    :data="tableData"
    style="width: 100%"
    max-height="450">
    <el-table-column
      width="50">
    </el-table-column>
    <el-table-column
      prop="staffName"
      label=""
      width="230">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label=""
      width="230">
    </el-table-column>
    <el-table-column
      label="">
      <template slot-scope="scope">
        <el-button @click.native.prevent="removeSubmemberTo(scope.row)" size="mini">转移</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  props: ['submemberInfo'],
  mounted () {
    this.getListData()
  },
  watch: {
    submemberInfo () {
      this.getListData()
    }
  },
  methods: {
    getListData () {
      this.$api.getstaffData().then(res => {
        res.data.shift()
        this.tableData = res.data
      })
    },
    removeSubmemberTo (val) {
      let params = {
        memberId: this.submemberInfo.memberId,
        memberCode: this.submemberInfo.memberCode,
        storeId: this.submemberInfo.storeId,
        staffId: val.staffId
      }
      this.$api.removeSubmemberTo(params).then(res => {
        if (res.code === 0) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.$emit('refresh')
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.form-list{
        margin-top:106px;
        padding: 0 120px;
        .form-title{
          width: 200px;
          position:absolute;
          color: $text-adorn-color;
          font-size: $xs-size;
          right: -200px;
          top: 0;
          padding-left:20px;
        }
        .el-col-24{
          .el-input-number{
            width:100%;
            line-height: 34px;
            .el-input-number__increase{
              line-height: 17px;
            }
          }
        }
        .upload-item{
          .el-form-item__content{
            line-height: 34px;
          }
        }
      }
    .opeartion{
      display: flex;
      justify-content: center;
      margin: 120px 0 50px 0;
      button{
        padding:15px 57px;
      }
      .submit{
          @include linear-grad;
          color:#fff;
          padding:16px 87px;
          border:0;
          &:hover{
            opacity: 0.9;
          }
      }
    }
</style>
