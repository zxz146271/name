<template>
  <div class="administration">
    <div class="title">
      <search @searchValue="searchValue" :load="loading"></search>
      <div class="busi-btns">
          <el-button data-code='12010001' class="btn newcom-btn"  @click="importAdd" >新增案例</el-button>
        </div>
    </div>
     <div class="info-cont">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width:100%">
        <el-table-column
        label="案例图片"
        align="center">
          <template slot-scope="scope">
            <div class="portrait">
              <img :src= 'scope.row.photoUrl' alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="案例标题"
          align="left"
          prop="caseTitle">
        </el-table-column>
        <el-table-column
          prop="caseType"
          align="center"
          label="案例类型">
        </el-table-column>
        <el-table-column
          prop="buildingArea"
          align="center"
          label="所在小区">
        </el-table-column>
        <!-- <el-table-column
          prop="lableData"
          align="center"
          label="案例标签">
          <template slot-scope="scope">
            <div class="comm-label">
              <span class="label" v-for="(item, index) in scope.row.lableData" :key="index" >{{item}}</span>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="display"
          align="center"
          label="发布">
        </el-table-column>
        <el-table-column
              prop="num"
              align="center"
              label="操作"
              >
              <template slot-scope="scope">
                <div class="comm-opera">
                  <el-button icon="el-icon-edit" circle  @click="editData(scope.row)" data-code='12010002'></el-button>
                  <el-button icon="el-icon-delete" circle  @click="deleteData(scope.row)" data-code='12010004'></el-button>
                  <el-button round v-if="scope.row.display === '否'" type="success" @click="releaseCase('0',scope.row)" data-code='12010005'>发布</el-button>
                  <el-button round v-else type="danger"  @click="releaseCase('1',scope.row)" data-code='12010005'>撤回</el-button>
                </div>
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { judgeButton } from '../../../tool/Utils'
import search from '../../../components/public/search'
import memberDetail from '../../../components/member/memberDetail'
import newMember from '../../../components/member/newMember'
export default{
  data () {
    return {
      loading: false,
      tableData: [],
      caseTitle: '',
      searchParam: '',
      totalCount: 0, // 默认数据总数
      currentPage: 1,
      pagesize: 10
    }
  },
  computed: {
    ...mapGetters(['powerButton'])
  },
  mounted () {
    this.getListData()
    this.getButton()
  },
  methods: {
    handleClose () {
      this.importComm = false
      this.importNew = false
    },
    searchValue (value) {
      this.searchParam = value
      this.loading = true
      this.getListData()
    },
    importAdd () {
      this.$router.push({path: '/myStore/caseView/caseEdit'})
    },
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    editData (param) {
      this.$router.push({path: '/myStore/caseView/caseEdit', query: {caseId: param.caseId}})
    },
    deleteData (param) {
      if (param.display === '是') {
        this.$message.error('当前案例为发布状态,不可被删除')
        return
      }
      this.$confirm('此操作将永久删除该案例, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          caseId: param.caseId,
          versionNo: param.versionNo
        }
        this.$api.deleteStCaseBase(params).then(res => {
          if (res.code === 0) {
            this.getListData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
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
    releaseCase (value, param) {
      let params = {
        status: value,
        caseId: param.caseId,
        versionNo: param.versionNo
      }
      this.$api.displayCaseBase(params).then(res => {
        if (res.code === 0) {
          this.getListData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getListData () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        searchParam: this.searchParam
      }
      this.$api.getCaseBaseList(params).then(res => {
        this.loading = false
        this.tableData = res.data
        this.totalCount = res.count
      })
    }
  },
  components: {search, memberDetail, newMember}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.administration{
  padding-top: 106px;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    >span{
      font-weight: 700;
      font-size: $md-size;
      color:$text-main-color;
    }
    .busi-btns{
      .btn{
        padding:9px 20px;
        &.newcom-btn{
          margin-left: 0px;
          background:$blue-color;
          border-color:$blue-color;
          color:#FFF;
          &:focus,&:hover{
            background: lighten($blue-color,6%);
            border-color:lighten($blue-color,6%);
          }
        }
        &.import-btn{
          background: $yello-color;
          border-color:$yello-color;
          color:#FFF;
          &:focus,&:hover{
            background: lighten($yello-color,6%);
            border-color:lighten($yello-color,6%);
          }
        }
      }
    }
  }
  .info-cont{
    .portrait{
      width: 80px;
      height: 80px;
      overflow: hidden;
      margin: 0 auto;
    }
    img{
      width: 100%;
      height: 100%;
    }
    p{
      text-align: left;
    }
    .name{
      font-size: $md-size;
      color:$text-main-color;
    }
    .text{
      color:$text-adorn-color;
      font-size: $xs-size;
    }
     .comm-label{
      font-size: $xs-size;
      text-align: center;
      .label{
        display: inline-block;
        border-radius: 4px;
        padding: 1px 6px;
        margin-right: 4px;
        line-height: 16px;
        &:hover{
          .el-icon-delete{
            display: inline-block;
          }
        }
        .el-icon-delete{
          display: none;
        }
        &:nth-child(n+1){
          color:#EB5C00;
          border:1px solid #EB5C00;
        }
        &:nth-child(n+2){
          color:#44AF7B;
          border:1px solid #44AF7B;
        }
        &:nth-child(n+3){
          color:#7180F1;
          border:1px solid #7180F1;
        }
      }
    }
    .comm-opera{
      button:nth-child(1){
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
      button:nth-child(2){
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
      button:nth-child(3){
        padding:8px 12px;
        background-color:#DDE0E9;
        border-color:#DDE0E9;
        color:$text-main-color;
        &:hover{
          background-color:darken(#DDE0E9,6%);
          border-color:darken(#DDE0E9,6%);
        }
      }
    }
  }
}
</style>
