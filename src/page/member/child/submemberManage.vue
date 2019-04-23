<template>
  <div class="manage balck-th">
    <div class="title">
      <div style="display:flex;">
        <el-select v-model="value" placeholder="客户类型" @change="selectValue" class="selectSty">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value1" placeholder="来源人" @change="selectValue" class="selectSty">
          <el-option v-for="item in staffList" :key="item.staffId" :label="item.staffName" :value="item.staffId">
          </el-option>
        </el-select>
        <el-select v-model="value2" placeholder="跟进状态" @change="selectValue" class="selectSty">
          <el-option v-for="item in FollowStatus" :key="item.id" :label="item.followState" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="value3" placeholder="需求类型" @change="selectValue" class="selectSty">
          <el-option v-for="item in requestType" :key="item.id" :label="item.labName" :value="item.id">
          </el-option>
        </el-select>
        <el-button class="exportExcel" id="exportExcel" @click="exportHandle">导出Excel</el-button>
      </div>
      <search @searchValue="searchValue" :load="loading"></search>
      <!-- <div class="busi-btns"> -->
      <!-- <el-button class="btn newcom-btn" @click="importAdd" data-code='19000001'>+新潜客</el-button> -->
      <!-- <el-button class="btn newcom-btn" @click="unusedSubmember">未认领潜客</el-button> -->
      <!-- </div> -->
    </div>
    <!-- 全部转移暂时隐藏 -->
    <!-- <div class="operate">
      <div class="item">
        <div class="letf-op">
          <el-checkbox :indeterminate="isIndeterminate" @change="handleCheckAllChange" v-model="checkAllStaff">全部转移</el-checkbox>
        </div>
          <div :style="btnStatus ? '' : 'background-color:#eee;'" class="batchOperation" @click="batchOperation">全部转移</div>
      </div>
    </div> -->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-cell-style="thStyleObj" style="width: 100%;">
      <!-- 全部转移暂时隐藏 -->
      <!-- <el-table-column align="center" width="60">
        <template slot-scope="scope">
            <el-checkbox-group @change="handleCheckedChange" v-model="scope.row.isChooe">
              <el-checkbox ></el-checkbox>
            </el-checkbox-group>
        </template>
      </el-table-column> -->
      <el-table-column label="访客姓名" align="center">
          <template slot-scope="scope">
            {{scope.row.storeConsumerName ? scope.row.storeConsumerName : scope.row.nikiName ? scope.row.nikiName : scope.row.memberName ? scope.row.memberName : '未设置昵称'}}
          </template>
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话" align="center">
      </el-table-column>
      <el-table-column prop="consumerTypeInfo" label="访客类型" align="center">
      </el-table-column>
      <el-table-column prop="followState" label="跟进状态" align="center">
      </el-table-column>
      <el-table-column prop="labName" label="需求类型" align="center">
      </el-table-column>
      <el-table-column prop="inviterView" label="来源人" align="center">
      </el-table-column>
      <el-table-column prop="visitPageNum" label="最后一次访问页面" align="center">
      </el-table-column>
      <el-table-column prop="stayTime" label="最后一次停留时间" align="center">
      </el-table-column>
      <el-table-column prop="lastLoginTime" label="最后一次访问时间" align="center">
      </el-table-column>
      <!-- <el-table-column prop="labelList" align="center" width="90" label="标签" :filters="[{ text: '急需维系', value: '急需维系' }, { text: '---', value: '---' }]"
        :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag v-for="(tag, index) in scope.row.labelList" :key="index" :type="tag == '急需维系' ? 'danger' : 'info'" disable-transitions>{{!tag || tag == ''?'暂无标签':tag}}</el-tag>
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="source" width="120" align="center" label="来源">
      </el-table-column>
      <el-table-column prop="createTime" width="140" align="center" label="用户创建时间">
      </el-table-column>
      <el-table-column prop="lastLoginTime" width="140" align="center" label="最后一次登录时间">
      </el-table-column> -->
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="importEdit(scope.row)" class="edit">编辑</el-button>
          <!-- <el-button
            size="mini"
            @click="getSubMemberdetail(scope.row)"
          class="edit">详情</el-button> -->
          <el-button size="mini" @click="importInfoDetail(scope.row)" class="edit">详情</el-button>
          <el-button size="mini" @click="removeSubmember(scope.row)" class="edit">转移</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="pagin">
    <span class="total">共{{ totalCount }}条数据</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="sizes, prev, pager, next"
      :page-sizes="[2, 5, 10, 20]"
      :total=totalCount>
    </el-pagination>
  </div> -->
    <div class="pagin">
      <span class="demonstration">共{{ allNum }}条数据</span>
      <span></span>
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="10" layout="jumper, prev, pager, next" :total='totalCount'>
      </el-pagination> -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :page-size="10" layout="jumper, prev, pager, next" :total="allNum">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="importNew" width="700px" :before-close="handleClose" class="import-dialog">
      <div slot="title" class="left-title">
        <span class="top">未认领潜客</span>
      </div>
      <unused-list ref="find"></unused-list>
    </el-dialog>
    <el-dialog :visible.sync="submemberDetail" width="550px" :before-close="handleClose2" class="import-dialog">
      <!-- <div slot="title" class="left-title">
              <span class="top">潜客详情</span>
            </div> -->
      <div slot="title" class="center-title">
        <span class="top">添加接待记录</span>
      </div>
      <!-- <submember-detail :stsubmemberDetail="stsubmemberDetail"></submember-detail> -->
      <submember-detail></submember-detail>
    </el-dialog>
    <el-dialog :visible.sync="removeTo" width="700px" :before-close="handleClose3" class="import-dialog">
      <div slot="title" class="left-title">
        <span class="top">转移潜客</span>
      </div>
      <remove-to ref="clean" :submemberInfo="submemberInfo" @refresh="refresh"></remove-to>
    </el-dialog>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    judgeButton,
    getStore
  } from '../../../tool/Utils'
  import axios from "axios";
  import search from '../../../components/public/search'
  import unusedList from '../../../components/member/unusedList'
  import submemberDetail from '../../../components/member/submemberDetail'
  import removeTo from '../../../components/member/removeTo'
  import {
    log
  } from 'util';
  export default {
    data() {
      return {
        lastStayTime: [],
        trueNum: 0,
        isIndeterminate: false,
        allNum: 1,
        staffList: [],
        tableData: [],
        requestType: [],
        FollowStatus: [],
        index: 0,
        danger: true,
        loading: false,
        importNew: false,
        removeTo: false,
        submemberDetail: false,
        checkAllStaff: false,
        btnStatus: false,
        options: [{
            label: '客户类型',
            value: ''
          },
          {
            value: '0',
            label: '已购'
          }, {
            value: '1',
            label: '已认领潜客'
          }, {
            value: '2',
            label: '未认领潜客'
          }, {
            value: '3',
            label: '访客'
          }, {
            value: '4',
            label: '意向客户'
          }
        ],
        value: '',
        value1: '',
        value2: '',
        value3: '',
        submenber: {
          memberId: '',
          memberName: '',
          newVisit: '',
          mobile: '',
          state: '',
          creator: '',
          versionNo: '',
          receptionData: ''
        },
        totalCount: 0, // 默认数据总数
        currentPage: 1,
        pagesize: 10,
        submemberInfo: '',
        thStyleObj: {
          'height': '40px',
          'background': '#F4F4F4'
        },
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    },
    watch: {
      checkAllStaff() {
        this.checkAll(this.checkAllStaff)
      },
      itemsChoose: {
        handler(newValue, oldValue) {
          if (newValue.length === 0 && this.tableData.length > 0) {
            this.btnStatus = true;
            // this.checkAllStaff = true;
          } else if (newValue.length === this.tableData.length) {
            this.btnStatus = false;
            this.checkAllStaff = false
          } else if (newValue.length !== 0 && newValue.length < this.tableData.length) {
            this.btnStatus = true;
            this.checkAllStaff = false
          }
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters(['powerButton']),
      itemsChoose() {
        let isAllSele = []
        this.tableData.forEach(item => {
          if (item.isChooe === false) {
            isAllSele.push(false)
          }
        })
        return isAllSele
      }
    },
    mounted() {
      this.getListData();
      this.getButton();
      this.getRequestType();
      this.getFollowStatus();
    },
    methods: {
      // 导出Excel
      exportHandle() {
        this.$api.exportGetAllListData().then(res => {
          if (res) {
            let blob = new Blob([res], {
              type: `application/vnd.ms-excel;charset=utf-8` //设置文档格式
            });
            let objectUrl = URL.createObjectURL(blob);
            let link = document.createElement("a");
            let fname = `客户信息`; //下载文件的名字
            link.href = objectUrl;
            link.setAttribute("download", fname);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // 下载完成移除元素
            window.URL.revokeObjectURL(objectUrl); // 释放掉blob对象
          } else {
            this.$message({
              type: "error",
              message: "导出失败"
            });
          }
        })
      },
      handleCheckAllChange(val) {
        if (val) {
          this.trueNum = this.tableData.length
        } else {
          this.trueNum = 0
        }
      },
      handleCheckedChange(value) {
        if (value) {
          this.trueNum++
        } else {
          this.trueNum--
        }
        // let checkedCount = value.length;
        this.checkAllStaff = (this.trueNum === this.tableData.length);
        // this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableData.length;
      },
      getStStaffList() {
        let subMemberInfoVo = {
          page: 1,
          limit: 10,
          // staffvo: this.staffvo
        }
        this.$api.getStaffListData(subMemberInfoVo).then(res => {
          let allThing = {
            staffName: '来源人',
            staffId: ''
          }
          res.data.unshift(allThing)
          this.staffList = res.data
        })        
      },
      getRequestType() {
        this.$api.getRequestType().then(res => {
          if (res.code == 0) {
            let allThing = {
              labName: '需求类型',
              id: ''
            }
            res.data.unshift(allThing)
            this.requestType = res.data;
          }
        })
      },
      getFollowStatus() {
        this.$api.getFollowStatus().then(res => {
          if (res.code == 0) {
            let allThing = {
              followState: '跟进状态',
              id: ''
            }
            res.data.unshift(allThing)
            this.FollowStatus = res.data;
          }
        })
      },
      // selectStaffList(){
      //   console.log(this.value);
      //   let subMemberInfoVo = {
      //     page: this.currentPage,
      //     limit: this.pagesize,
      //     searchParam: this.searchParam,
      //     // subMemberInfoVo: {
      //     inviter: this.value,
      //     // },
      //     searchParam: "123",
      //     // inviter: 
      //   }
      //   this.$api.getAllListData(subMemberInfoVo).then(res => {
      //     let dataList = res.data
      //     this.tableData = dataList;
      //   })
      // },
      selectValue() {
        let subMemberInfoVo = {
          page: this.currentPage,
          limit: this.pagesize,
          searchParam: this.searchParam,
          consumerType: this.value,
          inviter: this.value1,
          followState: this.value2,
          requestType: this.value3,
        }
        this.$api.getAllListData(subMemberInfoVo).then(res => {
          let dataList = res.data
          this.getStayTime(dataList)
          this.loading = false
          dataList.forEach(item => {
            item.isChooe = false;
          })
          this.allNum = res.count
          this.totalCount = dataList.length
          this.tableData = dataList;
          this.btnStatus = false;
        })
        this.checkAllStaff = false
      },
      filterTag(value, row) {
        return row.labelList == value;
      },
      importAdd() {
        this.$router.push({
          path: '/myStore/member/submemberAdd'
        })
      },
      // 全选
      checkAll(param) {
        if (param) {
          this.tableData.forEach(el => {
            el.isChooe = true
          })
        } else if (this.itemsChoose.length === 0 && !param) {
          this.tableData.forEach(el => {
            el.isChooe = false
          })
        }
      },
      unusedSubmember() {
        this.importNew = true
        this.selectValue()
      },
      batchOperation() {
        if (this.btnStatus == true) {
          this.removeTo = true
          this.submemberInfo = val
        }
      },
      getButton() {
        let pageButtons = document.getElementsByTagName('button')
        judgeButton(pageButtons, this.powerButton)
      },
      handleClose() {
        this.importNew = false
        this.selectValue()
      },
      handleClose2() {
        this.submemberDetail = false
      },
      handleClose3() {
        this.removeTo = false
      },
      importEdit(val) {
        this.$router.push({
          path: '/myStore/member/submemberEdit',
          query: {
            memberId: val.memberId,
            storeId: val.storeId
          }
        })
      },
      // 潜客详情 potentialCustomerDetail
      importInfoDetail(val) {
        this.$router.push({
          path: '/myStore/member/submemberInfoDetail',
          query: {
            memberId: val.memberId,
            storeId: val.storeId
          }
        })
      },
      searchValue(val) {

        this.searchParam = val
        this.currentPage = 1
        this.loading = true
        this.selectValue()
      },
      handleSizeChange: function (size) {
        this.pagesize = size
        this.selectValue()
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
        this.selectValue()
      },
      current_change: function (currentPage) {
        this.currentPage = currentPage
      },
      getStayTime(data) {
        this.lastStayTime = [];
        for (let i = 0; i < data.length; i++) {
          let a = data[i].leaveTime;
          let b = data[i].lastLoginTime;
          let newData
          if(a && b){
            newData = (new Date(a.replace(/-/g,"/")) - new Date(b.replace(/-/g,"/"))) / 1000
          }

          this.lastStayTime.push(newData)
          data[i]['stayTime'] = this.lastStayTime[i]
          if (data[i]['stayTime'] && data[i]['stayTime'] < 60 && data[i]['stayTime'] > 0) {
            data[i]['stayTime'] = data[i]['stayTime'] + "秒"
          } else if(data[i]['stayTime'] && data[i]['stayTime'] >= 60 && data[i]['stayTime'] < 3600) {
            data[i]['stayTime'] = Math.floor(data[i]['stayTime'] % 3600 / 60) + '分' + data[i]['stayTime'] % 60 + '秒'
          } else if (data[i]['stayTime'] && data[i]['stayTime'] >= 3600) {
            data[i]['stayTime'] = Math.floor(data[i]['stayTime'] / 3600) + '小时' + Math.floor(data[i]['stayTime'] % 3600 / 60) + '分' + data[i]['stayTime'] % 60 + '秒'
          } else {
            data[i]['stayTime'] = '0秒'
          }
        }
      },
      getListData() {
        var _this = this
        let params = {
          page: this.currentPage,
          limit: this.pagesize,
          searchParam: this.searchParam
        }
        this.$api.getAllListData(params).then(res => {
          let dataList = res.data
          this.allNum = res.count
          this.btnStatus = false;
          this.checkAllStaff = false
          this.loading = false
          this.getStayTime(dataList)
          // for (let i = 0; i < dataList.length; i++) {
          //   let newData = (new Date(dataList[i].leaveTime) - new Date(dataList[i].lastLoginTime)) / 1000
          //   this.lastStayTime.push(newData)
          //   dataList[i]['stayTime'] = this.lastStayTime[i]
          //   if (dataList[i]['stayTime'] < 60) {
          //     dataList[i]['stayTime'] = dataList[i]['stayTime'] + "秒"
          //   } else {
          //     this.ldataList[i]['stayTime'] = Math.floor(dataList[i]['stayTime'] / 60) + '分' + dataList[i][
          //       'stayTime'
          //     ] % 60 + '秒'
          //   }
          // }
          console.log('this.stayTime', dataList);
          if (dataList) {
            this.totalCount = dataList.length
            this.getStStaffList()
            dataList.forEach(item => {
              item.isChooe = false;
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
                // if (_this.checknum(item.memberName) && item.memberName.length === 4) {
                // item.memberName = '尾号为' + item.memberName + '的客户'
                // item.nikiName = item.nikiName
                // }
              }
            })
          }
          // dataList.isChooe = false;
          this.tableData = dataList;
        })
      },
      // 校验字符串是否为纯数字
      checknum(num) {
        var reg = new RegExp('^[0-9]*$')
        if (reg.test(num)) {
          return true
        }
        return false
      },
      removeSubmember(val) {
        this.removeTo = true
        this.submemberInfo = val
        // let params = {
        //   memberId: val.memberId,
        //   staffId: ''
        // }
        // this.$api.removeSubmember(params).then(res => {
        //   if (res.code === 0) {
        //     this.getListData()
        //   } else {
        //     this.$message.error(res.msg)
        //   }
        // })
      },
      refresh() {
        this.removeTo = false
        this.selectValue()
      },
      getSubMemberdetail(val) {
        // 弹出接待记录弹层
        // this.submemberDetail = true
        // this.stsubmemberDetail = val
        var _this = this
        let params = {
          memberId: val.memberId,
          storeId: val.storeId
        }
        _this.$api.getSubMemberInfo(params).then(res => {
          _this.stsubmemberDetail = res.data
          if (_this.stsubmemberDetail.realSex === 'man') {
            _this.stsubmemberDetail.realSex = '男'
          } else if (_this.stsubmemberDetail.realSex === 'woman') {
            _this.stsubmemberDetail.realSex = '女'
          }
          if (_this.stsubmemberDetail.source === 'storeBuild') {
            _this.stsubmemberDetail.source = '门店自建'
          } else if (_this.stsubmemberDetail.source === 'marketActivity') {
            _this.stsubmemberDetail.source = '营销活动'
          } else if (_this.stsubmemberDetail.source === 'MicStoreReg') {
            _this.stsubmemberDetail.source = '微店注册'
          } else if (_this.stsubmemberDetail.source === 'miniApp') {
            _this.stsubmemberDetail.source = '微信小程序'
            if (_this.checknum(_this.stsubmemberDetail.memberName) && _this.stsubmemberDetail.memberName.length ===
              4) {
              _this.stsubmemberDetail.memberName = '尾号为' + _this.stsubmemberDetail.memberName + '的客户'
            }
          }
          if (_this.stsubmemberDetail.recordList !== null && _this.stsubmemberDetail.recordList.length > 0) {
            _this.stsubmemberDetail.receptionData = _this.stsubmemberDetail.recordList[0].createTime + ' ' + _this.stsubmemberDetail
              .recordList[0].receptionDetail
          } else {
            _this.stsubmemberDetail.receptionData = null
          }
          if (res.data.memberRegion !== undefined && res.data.memberRegion !== null && res.data.memberRegion !== '') {
            let areaSelectedTemp = JSON.parse(res.data.memberRegion)
            let tempStr = ''
            areaSelectedTemp.forEach(item => {
              tempStr = tempStr + item
            })
            _this.stsubmemberDetail.memberRegion = tempStr
          }
        })
      },
      // headerStyle({row,rowIndex}) {
      //   return 'table-th'
      // }
    },
    components: {
      search,
      unusedList,
      submemberDetail,
      removeTo
    }
  }

</script>
<style lang="scss">
  @import '../../../assets/style/mixins/var';
  @import '../../../assets/style/components/icon';

  .manage {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px 0;

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

    .top-manage {
      display: flex;
      justify-content: space-between;
      background-color: $child-nav-bg;
      height: 44px;
      padding: 11px 16px;

      >span {
        font-size: $xlg-size;
        color: $text-main-color;
      }

      div {
        span {
          display: inline-block;
          margin-left: 20px;
          font-size: $xs-size;
          color: $text-gray-color;
          padding-left: 20px;
          position: relative;
          cursor: pointer;
        }
      }
    }

    .edit,
    .delete {
      // border: 0;
      background: none;
      // color: $text-red-color;
      width: 45px;
      height: 24px;
      border: 1px solid rgba(193, 193, 193, 1);
      border-radius: 4px;
      line-height: 10px;
      padding: 0;
      text-align: center;
    }

    .enjoinClick {
      background-color: #eeeeee;
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

    .table-th {
      height: 40px;
      background: #E0E0E0;
    }

    .pagin {
      margin-top: 40px;
      margin-bottom: 30px;
    }

    .el-dialog {
      min-width: 550px;
    }

    .center-title {
      text-align: center;
    }
  }

  .selectSty {
    width: 120px;
    font-size: 14px;
    color: #333333;
    height: 33px;
    margin-right: 10px;
  }

  #exportExcel {
    width: 81px;
    height: 34px;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    text-align: center;
    line-height: 34px;
    font-size: 12px;
    font-weight: 400;
    color: #606266;
    padding: 0;
    &:hover {
      border-color: #dcdfe6;
      color: #606266;
    }
  }
  .el-input--suffix .el-input__inner {
    padding-right: 24px;
  }

  .batchOperation {
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #FD4343;
    color: #FFF;
    border-radius: 5px;
    font-size: 12px;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .operate {
    border-radius: 4px;
    font-size: $xs-size;
    padding-left: 20px;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .letf-op {
        display: flex;

        .el-checkbox {
          &:nth-child(2) {
            margin-left: 25px;
          }
        }

        .comm-up {
          position: relative;
          margin-left: 25px;
          display: flex;
          align-items: center;

          button {
            margin-right: 18px;
            cursor: pointer;
            background-color: #fff;
            display: flex;
            align-items: center;

            i {
              display: inline-block;
              width: 15px;
              height: 15px;
              margin-right: 5px;
            }

            .enable {
              background: url('../../../assets/image/icon/enable.png') no-repeat;
              background-size: contain;
            }

            .disable {
              background: url('../../../assets/image/icon/disable.png') no-repeat;
              background-size: contain;
            }

            &:hover {
              color: $main-color;
            }
          }
        }
      }

      .right-op {
        .up {
          cursor: pointer;
        }

        button {
          padding: 5px 10px;

          &.history-btn {
            border: 0;
          }

          &.import-btn {
            border-color: $blue-color;
            background-color: $blue-color;
            color: #fff;

            &:hover {
              border-color: lighten($blue-color, 6%);
              background-color: lighten($blue-color, 6%);
            }
          }
        }
      }
    }
  }

</style>
