<template>
  <div class="administration">
    <div class="title">
      <search @searchValue="searchValue" :load="loading"></search>
      <div class="busi-btns">
        <!-- <el-button class="btn import-btn" @click="importCommodity">导入会员</el-button>-->
        <!-- <el-button class="btn newcom-btn" @click="add">新增已购客户</el-button> -->
      </div>
    </div>
    <div class="info-cont">
      <el-table :data="dataListS" style="width:100%">
        <el-table-column prop="memberName" label="头像" width="150" align="center">
          <template slot-scope="scope">
            <div class="portrait">
              <!-- <span style="font-size:15px;">{{scope.row.memberName}}</span> -->
              <img :src="scope.row.headPortrait" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="basicInfo" label="基础信息" width="120" align="left">
          <template slot-scope="scope">
            <p class="name">{{scope.row.storeConsumerName?scope.row.storeConsumerName:'暂无姓名'}}</p>
            <p class="text">{{scope.row.mobile}}</p>
            <p class="text">地址:{{scope.row.storeConsumerAddress}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="source" width="110" align="center" label="来源">
        </el-table-column>
        <!-- <el-table-column
          prop="integral"
          align="center"
          width="150"
          label="剩余积分">
        </el-table-column> -->
        <el-table-column prop="inviterView" align="center" width="150" label="邀请人">
        </el-table-column>
        <el-table-column prop="labelList" align="center" width="220" label="标签">
          <template slot-scope="scope">
            <el-tag :type="scope.row.labelList === '急需维护' ? 'danger' : 'info'" disable-transitions>{{scope.row.labelList[0]}}</el-tag>
            <!-- <el-tag :key="tag" v-for="tag in scope.row.labelList" closable :disable-transitions="false" @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
              @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">新增</el-button> -->
          </template>
        </el-table-column>
        <el-table-column prop="memberId" width="230" align="center" label="操作">
          <template slot-scope="scope">
            <div class="comm-opera">
              <el-button icon="el-icon-edit" @click="editData(scope.row)" circle></el-button>
              <!-- <el-button round @click="getDetail(scope.row)">详情</el-button> -->
              <el-button round @click="importInfoDetail(scope.row)">详情</el-button>
              <!-- <el-button circle @click="gotoOrderList(scope.row.mobile)">订单</el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagin">
        <span class="total">共{{count}}条数据</span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[2, 5, 10, 20]"
          :current-page.sync="currentPage" layout="sizes, prev, pager, next" :total="count">
        </el-pagination>
      </div> -->
      <div class="pagination">
        <span class="total">共{{totalCount}}条数据</span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="10" layout="jumper, prev, pager, next" :total='totalCount'>
      </el-pagination>
        <!-- <div class="jump">
          <span>跳转</span>
          <input type="text" value="1">
          <span>页</span>
          <button>确定</button>
        </div> -->
        <!-- <div class="pageSize">
          <button class="left"><img src="../../../../static/image/left_3x.png"></button>
          <a href="javaScript:void(0)">1</a>
          <a href="javaScript:void(0)">2</a>
          <a href="javaScript:void(0)">3</a>
          <a href="javaScript:void(0)">4</a>
          <a href="javaScript:void(0)">5</a>
          <a href="javaScript:void(0)">…</a>
          <a href="javaScript:void(0)">45</a>
          <button class="right"><img src="../../../../static/image/right_3x.png"></button>
        </div> -->
      </div>
    </div>
    <el-dialog :visible.sync="importMember" width="78%" :before-close="handleClose" class="import-dialog">
      <div slot="title" class="left-title">
        <span class="top">导入已购客户</span>
      </div>
      <steps :active="active"></steps>
    </el-dialog>
    <el-dialog :visible.sync="memberDetail" width="700px" :before-close="handleClose" class="import-dialog">
      <div slot="title" class="left-title">
        <span class="top">已购客户详情</span>
      </div>
      <member-detail :stMemberDetail="stMemberDetail"></member-detail>
    </el-dialog>
    <el-dialog :visible.sync="importNew" width="700px" :before-close="handleClose" class="import-dialog">
      <div slot="title" class="left-title">
        <span class="top">新会员</span>
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
  export default {
    components: {
      search,
      memberDetail,
      newMember,
      steps
    },
    data() {
      return {
        totalCount: 11,
        newDataList:'',
        inputVisible: false,
        inputValue: '',
        dataListS: [],
        loading: false,
        importMember: false,
        memberDetail: false,
        active: 0,
        importNew: false,
        // tableData: [{
        //   memberName: '张小芳',
        //   basicInfo: [{
        //     name: '程大苟',
        //     mobile: 15949682559,
        //     detailAddress: 'fddsisiisss'
        //   }],
        //   source: '蘑鱼丝小程序',
        //   inviterView: '王大顶',
        //   labName: '急需维护',
        // },
        // {
        //   memberName: '张小芳',
        //   basicInfo: [{
        //     name: '程大苟',
        //     mobile: 15949682559,
        //     detailAddress: 'fddsisiisss'
        //   }],
        //   source: '蘑鱼丝小程序',
        //   inviterView: '王大顶',
        //   labName: '---',
        // }],
        count: 0,
        searchParam: '',
        stMemberDetail: {},
        source: '',
        currentPage: 1,
        pagesize: 10
      }
    },
    mounted() {
      this.getStMemberList()
    },
    watch:{
      dataListS(nv){
        this.newDataList = nv
      }
    },
    methods: {
      filterTag(value, row) {
        return row.labName === value;
      },
      // 潜客详情 potentialCustomerDetail
      importInfoDetail(val) {
        this.$router.push({
          path: '/myStore/member/memberAdministrationInfoDetail',
          query: {
            memberId: val.memberId,
            storeId: val.storeId
          }
        })
      },
      // 查看详情数据
      getDetail(val) {
        this.memberDetail = true
        var _this = this
        let params = {
          memberId: val.memberId,
          storeId: val.storeId
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
            _this.stMemberDetail.source = '微信小程序'
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
          if (res.data.memberRegion !== undefined && res.data.memberRegion !== null && res.data.memberRegion !== '') {
            let areaSelected = JSON.parse(res.data.memberRegion)
            let tempStr = ''
            areaSelected.forEach(item => {
              tempStr = tempStr + item
            })
            _this.stMemberDetail.memberRegion = tempStr
          }
        })
      },
      importAdd() {
        this.importNew = true
      },
      handleClose() {
        this.memberDetail = false
        this.importNew = false
        this.importMember = false
        this.active = 0
      },
      add() {
        this.$router.push({
          path: '/myStore/member/memberAdd'
        })
      },
      // 跳到订单列表
      gotoOrderList(mobile) {
        // 会员电话(设置跳转订单、快开单、需要关怀订单列表)
        // localStorage.setItem('order_Id', mobile)
        // this.$router.push({path: '/myStore/order/orderManage', query: {orderId: mobile }})
        // 判断跳转至标准订单还是快开单
        var order = {
          orderId: mobile,
          state: '',
          rank: 'defualdesc'
        }
        // 设置标准订单参数
        let params = {
          page: this.currentPage,
          limit: this.pagesize,
          order: order
        }
        // 暂存查询结果
        var orderCount = 0
        var easyOrderCount = 0
        this.$api.getStStoreOrderList(params).then(res => {
          if (res.code === 0) {
            orderCount = res.count
          } else {
            this.$message.error(res.msg)
          }
          // 设置快开单参数
          var easyOrder = {
            orderId: mobile,
            state: '',
            rank: ''
          }
          let easyParams = {
            page: this.currentPage,
            limit: this.pagesize,
            order: easyOrder
          }
          this.$api.geteasyOrderList(easyParams).then(res => {
            if (res.code === 0) {
              easyOrderCount = res.count
              // 判断跳转
              if (easyOrderCount > 0 && orderCount === 0) {
                // 无标准订单且有快开单时跳转至快开单
                localStorage.setItem('order_Id', mobile)
                this.$router.push({
                  path: '/myStore/order/easyOrderManage',
                  query: {
                    orderId: mobile
                  }
                })
              } else {
                localStorage.setItem('order_Id', mobile)
                this.$router.push({
                  path: '/myStore/order/orderManage',
                  query: {
                    orderId: mobile
                  }
                })
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        })
      },
      // 获取订单信息列表
      getStStoreOrderList(value) {
        let params = {
          page: this.currentPage,
          limit: this.pagesize,
          order: this.order
        }
        this.$api.getStStoreOrderList(params).then(res => {
          if (res.code === 0) {
            this.count = res.count
            // this.tableData = res.data
          }
        })
      },
      // 获取快开单订单
      geteasyOrderList() {
        var _this = this
        let params = {
          page: this.currentPage,
          limit: this.pagesize,
          order: this.order,
          orderId: this.$route.query.orderId
        }
        this.$api.geteasyOrderList(params).then(res => {
          if (res.code === 0) {
            // _this.tableData = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      editData(val) {
        this.$router.push({
          path: '/myStore/member/memberEdit',
          query: {
            memberId: val.memberId,
            storeId: val.storeId
          }
        })
      },
      // 导入会员
      importCommodity() {
        this.importMember = true
      },
      // 模糊查询
      searchValue(value) {
        this.currentPage = 1
        this.loading = true
        this.getStMemberList(value)
      },
      handleSizeChange(pagesize) {
        this.pagesize = pagesize
        this.getStMemberList()
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
        this.getStMemberList()
      },
      // 分页和模糊查询方法
      getStMemberList(value) {
        var _this = this
        let params = {
          page: this.currentPage,
          limit: this.pagesize,
          searchParam: value
        }
        this.$api.getStMemberList(params).then(res => {
          this.loading = false
          this.dataListS = res.data
          let dataList = res.data
          this.totalCount = res.data.length
          if(dataList){
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
            item.isAddLabel = false
            item.laberName = ''
          })
          }
          
          // _this.tableData = dataList
          _this.count = res.count
        })
      },
      // 手动添加标签
      addLable(index, row) {
        this.tableData[index].isAddLabel = true
      },
      cancelAddLabel(index) {
        this.tableData[index].laberName = ''
        this.tableData[index].isAddLabel = false
      },
      // 保存标签
      saveLaber(index, row) {
        let laberName = this.tableData[index].laberName
        if (laberName.trim() === '新会员' || laberName.trim() === 'vip') {
          this.$message.error('此类系统生成标签无法手动创建')
        } else if (laberName.trim() === '') {
          this.$message.error('标签名称不能为空！')
        } else {
          let params = {
            labObjId: row.subId,
            labType: 'HY',
            labName: laberName,
            markType: 'DY',
            distributorId: row.distributorId,
            storeId: row.storeId
          }
          this.$api.stLabelAddSave(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.tableData[index].laberName = ''
              this.getStMemberList()
              this.cancelAddLabel(index)
            } else {
              // 失败提示
              this.tableData[index].laberName = ''
              this.$message.error(res.msg)
            }
          })
        }
      },
      // 删除标签
      deleteLaber(labName, index, row) {
        let params = {
          labName: labName,
          labType: 'HY',
          labObjId: row.subId,
          storeId: ''
        }
        this.$api.deleteStLabel(params).then(res => {
          if (res.code === 0) {
            // 成功返回列表页面
            this.tableData[index].laberName = ''
            this.getStMemberList()
            // this.cancelAddLabel()
          } else {
            // 失败提示
            this.tableData[index].laberName = ''
            this.$message.error(res.msg)
          }
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import '../../../assets/style/mixins/var';
  @import '../../../assets/style/components/icon';
  @import '../../../assets/style/components/elbtn';

  .administration {
    .title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 0 30px 0;

      >span {
        font-weight: 700;
        font-size: $md-size;
        color: $text-main-color;
      }

      .busi-btns {
        .btn {
          padding: 9px 20px;

          &.newcom-btn {
            margin-left: 0px;
            background: $blue-color;
            border-color: $blue-color;
            color: #FFF;

            &:focus,
            &:hover {
              background: lighten($blue-color, 6%);
              border-color: lighten($blue-color, 6%);
            }
          }

          &.import-btn {
            background: $yello-color;
            border-color: $yello-color;
            color: #FFF;

            &:focus,
            &:hover {
              background: lighten($yello-color, 6%);
              border-color: lighten($yello-color, 6%);
            }
          }
        }
      }
    }

    .info-cont {
      .portrait {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        cursor: pointer;
        line-height: 80px;
        background-color: rgb(223, 215, 216);

        span {
          width: 80px;
          height: 80px;
        }
      }

      img {
        width: 100%;
        height: 100%;
      }

      p {
        text-align: left;
      }

      .name {
        font-size: $md-size;
        color: $text-main-color;
      }

      .text {
        color: $text-adorn-color;
        font-size: $xs-size;
      }

      .comm-label {
        font-size: $xs-size;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        .label {
          display: inline-block;
          border-radius: 4px;
          padding: 1px 6px;
          margin-right: 4px;
          line-height: 16px;

          &:hover {
            .el-icon-delete {
              display: inline-block;
            }
          }

          .el-icon-delete {
            display: none;
          }

          &:nth-child(n+1) {
            color: #EB5C00;
            border: 1px solid #EB5C00;
          }

          &:nth-child(n+2) {
            color: #44AF7B;
            border: 1px solid #44AF7B;
          }

          &:nth-child(n+3) {
            color: #7180F1;
            border: 1px solid #7180F1;
          }
        }
      }

      .comm-opera {
        button {
          padding: 7px;
          background-color: $main-color;
          border-color: $main-color;
          color: #fff;

          // display: none;
          &:hover {
            background-color: lighten($main-color, 6%);
            border-color: lighten($main-color, 6%);
          }

          i {
            color: #fff;
          }
        }
      }

      .el-tag+.el-tag {
        margin-left: 10px;
      }

      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }

      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }

      .pagination {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #737685;
        margin: 150px 0 80px;

        .total {
          float: left;
        }

        .jump {
          float: left;
          height: 30px;
          margin-left: 67px;

          input {
            width: 52px;
            height: 28px;
            background: #FFFFFF;
            border: 1px solid #E0E0E0;
            border-radius: 4px;
            text-align: center;
            margin-left: 4px;
            margin-right: 6px;
          }

          button {
            width: 46px;
            height: 28px;
            background: #F7F7F7;
            border-radius: 4px;
            color: #737685;
            margin-left: 20px;
          }
        }

        .pageSize {
          float: left;
          margin-left: 340px;

          .left,
          .right {
            width: 30px;
            height: 30px;
            background: #F7F7F7;
            border-radius: 4px;

            img {
              width: 6px;
              height: 10px;
            }
          }

          a:nth-of-type(1) {
            margin-left: 16px;
          }

          a {
            display: inline-block;
            width: 7px;
            height: 30px;
            margin-right: 23px;
          }

          a:nth-of-type(6) {
            width: 12px;
          }
        }
      }
    }

    .add-label {
      height: 21px;

      .add-input {
        input[type='text'] {
          border: 1px solid $input-border-color;
          height: 20px;
          border-radius: 4px;
          font-size: $xs-size;
          width: 80px;
          padding-left: 4px;
          margin-right: 4px;
          padding-right: 14px;
        }
      }
    }
  }

</style>
