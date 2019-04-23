<template>
  <div class="administration">
    <div class="title">
      <search @searchValue="searchValue" :load="loading"></search>
       <!-- <div class="busi-btns">
         <el-button class="btn import-btn" @click="importCommodity">导入会员</el-button>
          <el-button class="btn newcom-btn" @click="add">新增客户</el-button>
        </div> -->
    </div>
     <div class="info-cont">
      <el-table
        :data="tableData"
        style="width:100%">
        <el-table-column
        label="头像"
        width="150"
        align="center">
          <template slot-scope="scope">
            <div class="portrait">
              <span style="font-size:35px;">{{scope.row.firstName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="基础信息"
          align="left">
          <template slot-scope="scope">
            <p class="name">{{scope.row.memberName}}</p>
            <p class="text">{{scope.row.mobile}}</p>
            <p class="text">{{scope.row.detailAddress}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="source"
          width="100"
          align="center"
          label="来源">
        </el-table-column>
        <!-- <el-table-column
          prop="integral"
          align="center"
          width="150"
          label="剩余积分">
        </el-table-column> -->
        <el-table-column
          prop="inviterView"
          align="center"
          width="150"
          label="邀请人">
        </el-table-column>
         <el-table-column
          align="center"
          width="150"
          label="标签">
          <template slot-scope="scope">
             <div class="comm-label">
               <p class="comm-label" v-for="(item,index) in scope.row.labelList" :key="index">
                  <!-- <span class="label">{{item}}<i class="el-icon-delete"></i></span> -->
                  <span class="label">{{item}}</span>
               </p>
              <!-- <span class="label">VIP
                <i class="el-icon-delete"></i>
              </span>
              <span class="label">新会员
                <i class="el-icon-delete"></i>
              </span> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="memberId"
          width="150"
          align="center"
          label="操作">
          <template slot-scope="scope">
             <div class="comm-opera">
              <!-- <el-button icon="el-icon-edit" @click="editData(scope.row.memberId)" circle></el-button> -->
              <el-button round @click="getDetail(scope.row)">详情</el-button>
              <!-- <el-button circle @click="gotoOrderList(scope.row.mobile)">订单</el-button> -->
             </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagin">
          <span class="total">共{{count}}条数据</span>
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[2, 5, 10, 20]"
          :current-page.sync="currentPage"
          layout="sizes, prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :visible.sync="importMember"
        width="78%"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">导入已购客户</span>
          </div>
          <steps :active="active"></steps>
  </el-dialog>
    <el-dialog
      :visible.sync="memberDetail"
        width="700px"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">已购客户详情</span>
          </div>
        <member-detail :stMemberDetail="stMemberDetail"></member-detail>
    </el-dialog>
    <el-dialog
      :visible.sync="importNew"
        width="700px"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">新已购客户</span>
          </div>
        <new-member></new-member>
    </el-dialog>
  </div>
</template>
<script>
import search from '../../../components/public/search'
import memberDetail from '../../../components/member/memberDetail'
import newMember from '../../../components/member/newMember'
import steps from '../../../components/member/steps'
export default{
  components: {search, memberDetail, newMember, steps},
  data () {
    return {
      loading: false,
      importMember: false,
      memberDetail: false,
      active: 0,
      importNew: false,
      tableData: [],
      count: 0,
      searchParam: '',
      stMemberDetail: {
      },
      source: '',
      currentPage: 1,
      pagesize: 10
    }
  },
  mounted () {
    this.getStMemberList()
  },
  methods: {
    // 查看详情数据
    getDetail (row) {
      this.memberDetail = true
      var _this = this
      let params = {
        memberId: row.memberId,
        storeId: row.storeId
      }
      _this.$api.stMemberInitEdit(params).then(res => {
        _this.stMemberDetail = res.data
        if (_this.stMemberDetail.source === 'storeBuild') {
          _this.stMemberDetail.source = '门店自建'
        } else if (_this.stMemberDetail.source === 'marketActivity') {
          _this.stMemberDetail.source = '营销活动'
        } else if (_this.stMemberDetail.source === 'MicStoreReg') {
          _this.stMemberDetail.source = '微店注册'
        } else if (_this.stMemberDetail.source === 'miniApp') {
          _this.stMemberDetail.source = '微信小程序注册'
        }
        if (_this.stMemberDetail.realSex === 'man') {
          _this.stMemberDetail.realSex = '先生'
        } else if (_this.stMemberDetail.realSex === 'woman') {
          _this.stMemberDetail.realSex = '女士'
        }
        if (_this.stMemberDetail.memberName !== null && _this.stMemberDetail.memberName !== '') {
          let firstName = _this.stMemberDetail.memberName.substring(0, 1)
          _this.stMemberDetail.firstName = firstName
        } else {
          _this.stMemberDetail.firstName = ''
        }
        if (_this.stMemberDetail.source !== 'miniApp') {
          let areaSelected = JSON.parse(res.data.memberRegion)
          let tempStr = ''
          areaSelected.forEach(item => {
            tempStr = tempStr + item
          })
          _this.stMemberDetail.memberRegion = tempStr
        }
      })
    },
    importAdd () {
      this.importNew = true
    },
    handleClose () {
      this.memberDetail = false
      this.importNew = false
      this.importMember = false
      this.active = 0
    },
    add () {
      this.$router.push({path: '/myStore/member/memberAdd'})
    },
    // 跳到订单列表
    gotoOrderList (mobile) {
      // 会员电话(设置跳转订单、快开单、需要关怀订单列表)
      localStorage.setItem('order_Id', mobile)
      this.$router.push({path: '/myStore/order/orderManage', query: {orderId: mobile}})
    },
    editData (memberId) {
      var _this = this
      let params = {
        memberId: memberId
      }
      let obj = {}
      _this.$api.stMemberInitEdit(params).then(res => {
        obj = res.data
        if (obj.source === 'miniApp') {
          this.$message.error('来自微信小程序的已购客户不能修改，请重选！')
        } else {
          this.$router.push({path: '/myStore/member/memberEdit', query: {memberId: memberId}})
        }
      })
    },
    // 导入会员
    importCommodity () {
      this.importMember = true
    },
    // 模糊查询
    searchValue (value) {
      this.loading = true
      this.getStMemberList(value)
    },
    handleSizeChange (pagesize) {
      this.pagesize = pagesize
      this.getStMemberList()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getStMemberList()
    },
    // 分页和模糊查询方法
    getStMemberList (value) {
      var _this = this
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        searchParam: value
      }
      this.$api.getStMemberList(params).then(res => {
        let dataList = res.data
        dataList.forEach(item => {
          if (item.memberName !== null && item.memberName !== '') {
            let firstName = item.memberName.substring(0, 1)
            item.firstName = firstName
          } else {
            item.firstName = ''
          }
          if (item.source === 'storeBuild') {
            item.source = '门店自建'
          } else if (item.source === 'marketActivity') {
            item.source = '营销活动'
          } else if (item.source === 'MicStoreReg') {
            item.source = '微店注册'
          } else if (item.source === 'miniApp') {
            item.source = '微信小程序'
          }
        })
        _this.tableData = dataList
        _this.count = res.count
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.administration{
  .title{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 30px 0;
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
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto;
      cursor: pointer;
      line-height: 80px;
      background-color:rgb(223, 215, 216);
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
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
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
    button{
      padding:7px;
      color: #fff;
      background-color:$main-color;
      border-color:$main-color;
      // display: none;
      &:hover{
        background-color:lighten($main-color,6%);
        border-color:lighten($main-color,6%);
      }
      i{
        color:#fff;
      }
    }
    }
  }
  // .el-table--enable-row-hover .el-table__body tr:hover>td {
  //   .comm-opera{
  //     button{
  //       display: block;
  //     }
  //   }
  // }
}
</style>
