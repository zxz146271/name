<template>
  <div class="manage balck-th">
    <div class="title">
      <search @searchValue="searchValue" :load="loading"></search>
      <div class="busi-btns">
        <el-button class="btn newcom-btn" @click="importAdd" data-code="20010001">+新业绩</el-button>
      </div>
    </div>
    <div class="top-manage">
      <span>带客业绩</span>
      <div class="select-time">
        <div>
          <el-select v-model="type" placeholder="请选择" @change="changeType(type)">
            <el-option label="按月" value="0"></el-option>
            <el-option label="按周" value="1"></el-option>
          </el-select>
        </div>
        <div>
          <el-date-picker v-model="week" type="week" format="yyyy 第 WW 周" placeholder="选择周" v-show="falg2" @change="changWeek(week)">
          </el-date-picker>
        </div>
        <div>
          <el-date-picker v-model="month" type="month" placeholder="选择月" v-show="falg" @change="changMonth(month)">
          </el-date-picker>
        </div>
      </div>
    </div>
    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
      <el-table-column label="门店名称" prop="storeName" align="center" width="120" v-if="falg4">
      </el-table-column>
      <el-table-column label="员工姓名" prop="staffName" align="center" width="120" v-else>
      </el-table-column>
      <el-table-column :prop="isVal==='0'? 'month': 'week'" :label="isVal==='0'? '按月统计': '按周统计'" align="center" width="120">
      </el-table-column>
      <el-table-column prop="expectationClient" align="center" label="带客数目标值">
      </el-table-column>
      <el-table-column prop="actualCilent" label="实际带客数" align="center">
      </el-table-column>
      <el-table-column label="操作" width="260" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="importEdit(scope.row)" class="edit" data-code="20010002">编辑</el-button>
          <el-button size="mini" @click="lookMember(scope.row)" class="edit" data-code="20010004" v-if="falg4">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="importNew" width="800px" :before-close="handleClose" class="import-dialog">
      <div slot="title" class="left-title">
        <span class="top">带客新业绩</span>
      </div>
      <add-member @refresh="refresh" :falg4="falg4" v-if="importNew"></add-member>
    </el-dialog>
    <el-dialog :visible.sync="importNewStore" width="800px" :before-close="handleClose" class="import-dialog">
      <div slot="title" class="left-title">
        <span class="top">带客新业绩</span>
      </div>
      <add-member-store @refresh="refresh" :falg4="falg4" v-if="importNewStore"></add-member-store>
    </el-dialog>
    <el-dialog :visible.sync="importNew2" width="700px" :before-close="handleClose" class="import-dialog">
      <div slot="title" class="left-title">
        <span class="top">编辑业绩</span>
      </div>
      <edit-role @refresh="refresh" :member="member"></edit-role>
    </el-dialog>
    <el-dialog :visible.sync="importNew3" width="700px" :before-close="handleClose" class="import-dialog">
      <div slot="title" class="left-title">
        <span class="top">查看详情</span>
      </div>
      <look-member @refresh="refresh" :member="member" :tableData="tableData"></look-member>
    </el-dialog>
    <div class="pagin">
      <span class="total">共 {{count}} 条数据</span>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
        layout="sizes, prev, pager, next" :page-sizes="[2, 5, 10, 20]" :total=count>
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import search from '../../../components/public/search'
  import addMember from '../../../components/performanceMana/addMember'
  import addMemberStore from '../../../components/performanceMana/addMemberStore'
  import lookMember from '../../../components/performanceMana/lookMember'
  import editRole from '../../../components/performanceMana/editRole'
  import {
    judgeButton
  } from '../../../tool/Utils'
  export default {
    data() {
      return {
        loading: false,
        importNewStore: false,
        importNew: false,
        importNew2: false,
        importNew3: false,
        tableData3: [],
        multipleSelection: [],
        member: {},
        type: '',
        isVal: '0',
        falg: true,
        falg2: false,
        falg4: true,
        month: '',
        week: '',
        sotrePerformanceVo: {
          storeName: '',
          staffName: '',
          type: '0',
          monthStr: '',
          weekStr: ''
        },
        memberPerformance: {
          storeId: '',
          month: '',
          week: '',
          type: ''
        },
        count: 0,
        currentPage: 1,
        pagesize: 10,
        tableData: []
      }
    },
    computed: {
      ...mapGetters(['powerButton'])
    },
    mounted() {
      this.getListData()
      this.getButton()
    },
    methods: {
      getButton() {
        let pageButtons = document.getElementsByTagName('button')
        judgeButton(pageButtons, this.powerButton)
      },
      importAdd() {
        if (this.falg4) {
          this.importNew = true
        } else {
          this.$api.getStStoreAdminMemberList().then(res => {
            if (res.data.perList.length > 0) {
              this.importNewStore = true
            } else {
              this.importNewStore = false
              this.$message.error('经销商还未配置该门店业绩')
            }
          })
        }
      },
      changeType(value) {
        if (value === '1') {
          this.falg = false
          this.falg2 = true
          this.isVal = '1'
          this.sotrePerformanceVo.type = '1'
          this.sotrePerformanceVo.monthStr = ''
          this.sotrePerformanceVo.weekStr = ''
          this.getListData()
          this.week = ''
          this.month = ''
        } else {
          this.falg = true
          this.falg2 = false
          this.isVal = '0'
          this.sotrePerformanceVo.type = '0'
          this.sotrePerformanceVo.monthStr = ''
          this.sotrePerformanceVo.weekStr = ''
          this.getListData()
          this.week = ''
          this.month = ''
        }
      },
      changMonth(value) {
        this.sotrePerformanceVo.monthStr = value
        this.getListData()
      },
      changWeek(value) {
        this.sotrePerformanceVo.weekStr = value
        this.getListData()
      },
      searchValue(val) {
        if (this.falg4) {
          this.sotrePerformanceVo.storeName = val
        } else {
          this.sotrePerformanceVo.staffName = val
        }
        this.currentPage = 1
        this.loading = true
        this.getListData()
      },
      importEdit(value) {
        this.member = value
        this.importNew2 = true
      },
      lookMember(value) {
        this.member = value
        this.memberPerformance.storeId = this.member.storeId
        this.memberPerformance.month = this.member.monthStr
        this.memberPerformance.week = this.member.weekStr
        this.memberPerformance.type = this.member.type
        let params = {
          page: 1,
          limit: 100,
          sotrePerformanceVo: this.memberPerformance
        }
        this.$api.getStaffPerformanceListData(params).then(res => {
          if (res.code === 0) {
            if (res.data.length === 0) {
              this.$message.error('该门店还没有配置当月业绩,请分配以后进行查看')
            } else {
              res.data.forEach(el => {
                this.tableData.push(el)
              })
              this.importNew3 = true
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      handleClose() {
        this.importNew = false
        this.importNew2 = false
        this.importNew3 = false
        this.importNewStore = false
        this.tableData = []
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      refresh() {
        this.importNew = false
        this.importNew2 = false
        this.importNewStore = false
        this.getListData()
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
      getListData() {
        let url = window.location.href
        if (url.indexOf('/store/') !== -1) {
          this.falg4 = true
        } else {
          this.falg4 = false
        }
        let params = {
          page: this.currentPage,
          limit: this.pagesize,
          sotrePerformanceVo: this.sotrePerformanceVo
        }
        this.$api.getPerformanceListData(params).then(res => {
          if (res.code === 0) {
            this.loading = false
            res.data.forEach(el => {
              if (el.month) {
                el.monthStr = el.month
                el.month = el.month.substring(0, 7)
              } else {
                el.weekStr = el.week
                el.week = el.weekTime
              }
            })
            if (res.data.length === 1 && res.data[0].type === null) {
              this.tableData3 = null
            } else {
              this.tableData3 = res.data
              this.count = res.count
            }
          } else {
            this.loading = false
            this.$message.error(res.msg)
          }
        })
      }
    },
    components: {
      search,
      addMember,
      addMemberStore,
      lookMember,
      editRole
    }
  }

</script>
<style lang="scss" scoped>
  @import '../../../assets/style/mixins/var';
  @import '../../../assets/style/components/icon';

  .manage {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0 15px;

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

      .select-time {
        display: flex;
        align-items: center;
      }

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
      border: 0;
      background: none;
      color: $text-red-color;
    }
  }

</style>
