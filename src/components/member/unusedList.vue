<template>
  <div style="padding:0 20px;">
    <el-table
    :data="tableData"
    style="width: 100%"
    max-height="450">
    <el-table-column
      width="30">
    </el-table-column>
    <el-table-column
      prop="storeConsumerName"
      label="潜客姓名"
      width="270">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="联系电话"
      width="270">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click.native.prevent="checkSubmember(scope.row)" size="mini">认领</el-button>
      </template>
    </el-table-column>
  </el-table>
   <div class="pagin">
          <span class="total">共{{totalCount}}条数据</span>
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="sizes, prev, pager, next"
          :page-sizes="[2, 5, 10, 20]"
          :total=totalCount>
        </el-pagination>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      totalCount: 0, // 默认数据总数
      currentPage: 1,
      pagesize: 10
    }
  },
  mounted () {
    this.getListData()
  },
  methods: {
    getListData () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize
      }
      this.$api.getUnusedSubmember(params).then(res => {
        this.tableData = res.data
        this.totalCount = res.count
      })
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getListData()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getListData()
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    checkSubmember (val) {
      let params = {
        memberId: val.memberId,
        memberCode: val.memberCode,
        storeId: val.storeId
      }
      this.$api.checkSubmember(params).then(res => {
        if (res.code === 0) {
          this.getListData()
          this.$message({
            message: res.msg,
            type: 'success'
          })
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
