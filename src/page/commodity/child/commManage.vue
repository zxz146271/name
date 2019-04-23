<template>
  <div class="comm-manage">
    <!-- <div class="left-view">
      <left-condition :condition="condition" @chooseThis="chooseThis"></left-condition>
    </div> -->
    <div class="right-view">
      <div class="top-search">
        <div class="tabType">
          <!-- <el-button-group>
            <el-button :type="typeState == '1' ? 'primary' : 'default'" @click="changeType('1')">全部上架商品</el-button>
            <el-button :type="typeState == '3' ? 'primary' : 'default'" @click="changeType('3')">微店上架商品</el-button>
            <el-button :type="typeState == '4' ? 'primary' : 'default'" @click="changeType('4')">已下架商品</el-button>
          </el-button-group> -->
          <el-button-group>
              
              <el-button :type="typeState == '1' ? 'primary' : 'deafult'" @click="changeState('1')" class="btn">上架商品</el-button>
              <!-- <el-button :type="typeState == '2' ? 'primary' : 'deafult'"  @click="changeState('2')" class="btn">微店商品</el-button> -->
              <el-button :type="typeState == '4' ? 'primary' : 'deafult'"  @click="changeState('4')" class="btn">下架商品</el-button>
            </el-button-group>
        </div>
        <search @searchValue="searchValue" :load="loading"></search>
        <div class="busi-btns">
          <el-button class="btn import-btn" @click="importCommodity" data-code="5010003">导入商品</el-button>
          <el-button class="btn newcom-btn" @click="newCommodity" data-code="5010002">新商品</el-button>
        </div>
      </div>
      <!-- <top-operate @allChoose="allChoose" :typeNum="type" :option="optionTop" @desc="desc" @asc="asc" @goodsDrop='goodsDrop'></top-operate> -->
      <div class="operate">
        <div class="item" v-if="$route.path === '/myStore/commManage' || '/store/commManage'">
          <div class="letf-op">
            <el-checkbox v-model="checkAllComm" v-show="page !== '6'">全选</el-checkbox>
            <div class="comm-up">
              <span class="up" @click="setGoodsDrop('up')" v-show="page === '4' || page === '5'"><i class="iconfont icon-icon_up" ></i>上架</span>
              <span class="down" @click="getActivityByGoodsId('down')" v-show="page !== '4' && page !== '6'"><i class="iconfont icon-icon_down"  ></i>下架</span>
            </div>
          </div>
          <div class="right-op">
            <span class="sort" @click="toggle">价格
              <i v-bind:class="{'up': isA}"></i>
              <i v-bind:class="{'down': !isA}"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="comm-list">
        <!-- stGoodsInfoList是后台传输过来的list  -->
        <commodity-item v-for="(item, index) in stGoodsInfoList" :key="index" :item="item" @reflash="reflash"></commodity-item>
      </div>
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
    <el-dialog
      :visible.sync="importComm"
      v-if="importComm"
        width="78%"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">导入商品</span>
          </div>
          <steps @refresh="refresh" :activer="active" ref="clean"></steps>
  </el-dialog>
  <el-dialog
      :visible.sync="addNewComm"
        width="78%"
        height="500px"
        v-if="addNewComm"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">选择品类</span>
          </div>
          <div class='casca'>
            <el-cascader
              placeholder=''
              :options='options'
              filterable
              separator=">"
              :props="cascaderConfig"
              change-on-select
              v-model='selectedOptions'
            ></el-cascader>
            <el-button type="primary" class="next-btn" @click="nextStep">下一步</el-button>
          </div>
          <!-- <cascade></cascade> -->
  </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import search from '../../../components/public/search'
import commodityItem from '../../../components/commodity/commodityItem'
import leftCondition from '../../../components/public/leftCondition'
import steps from '../../../components/public/steps'
import topOperate from '../../../components/public/topOperate'
import cascade from '../../../components/commodity/cascade'
import { judgeButton, getStore } from '../../../tool/Utils'
export default {
  data () {
    return {
      loading: false,
      checkAllComm: false,
      goodsName: '',
      importComm: false,
      addNewComm: false,
      flag: false,
      multipleSelection: [],
      active: 0,
      totalCount: 0, // 默认数据总数
      currentPage: 1,
      pagesize: 10,
      type: '0',
      isA: true,
      searchV: '',
      optionTop: {
      },
      condition: [
        {
          type: 1,
          title: '全部上架商品',
          isActive: true,
          num: ''
        },
        {
          type: 2,
          title: '门店上架商品',
          isActive: false,
          num: ''
        },
        {
          type: 3,
          title: '微店上架商品',
          isActive: false,
          num: ''
        },
        {
          type: 4,
          title: '积分兑换上架商品',
          isActive: false,
          num: ''
        },
        {
          type: 5,
          title: '已下架商品',
          isActive: false,
          num: ''
        },
        {
          type: 7,
          title: '滞销商品',
          isActive: false,
          num: ''
        },
        {
          type: 6,
          title: '违规商品',
          isActive: false,
          num: ''
        }
      ],
      // 列表声明一个空数组
      stGoodsInfoList: [],
      selectedOptions: [],
      cascaderConfig: {
        label: 'label',
        value: 'id',
        children: 'children'
      },
      rank: 'default',
      options: [],
      page: '',
      errorMsgs: [],
      typeState: '1'
    }
  },
  computed: {
    ...mapGetters(['powerButton']),
    itemsChoose () {
      let isAllSele = []
      this.stGoodsInfoList.forEach(item => {
        if (item.choose === false) {
          isAllSele.push(false)
        }
      })
      return isAllSele
    }
  },
  // 数据初始化方法
  mounted () {
    if (this.$route.params.fromMyStore) {
      this.newCommodity()
    }
  },
  created () {
    this.getStGoodsInfoList1()
    this.getButton()
  },
  watch: {
    checkAllComm () {
      this.checkAll(this.checkAllComm)
    },
    itemsChoose: {
      handler (newValue, oldValue) {
        if (newValue.length === 0 && this.stGoodsInfoList.length > 0) {
          this.checkAllComm = true
        } else if (newValue.length === this.stGoodsInfoList.length) {
          this.checkAllComm = false
        } else if (newValue.length !== 0 && newValue.length < this.stGoodsInfoList.length) {
          this.checkAllComm = false
        }
      },
      deep: true
    }
  },
  methods: {
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    // 模糊查询
    searchValue (value) {
      this.currentPage = 1
      this.loading = true
      this.searchV = value
      this.getStGoodsInfoList1()
    },
    reflash () {
      this.getStGoodsInfoList1()
    },
    changeType (storeState) {
      if (storeState !== this.typeState) {
        this.typeState = storeState
        this.getStGoodsInfoList1()
      } else {
        console.log('没有变化！')
      }
    },
    // 获取商品信息列表
    getStGoodsInfoList1 () {
      // let state = getStore('storeState')
      this.$emit('topName', this.typeState)
      this.page = this.typeState
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        goodsName: this.searchV,
        rank: this.rank,
        state: this.typeState
      }
      this.$api.getStGoodsInfoList(params).then(res => {
        if (res.code === 0) {
          res.data.forEach(function (goods) {
            goods.choose = false
          })
          this.totalCount = res.count
          this.stGoodsInfoList = res.data
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    getPfBaseGoodsCategoryList (value) {
      let params = {}
      this.$api.getPfBaseGoodsCategoryList(params).then(res => {
        this.options = res.data
      })
    },
    importCommodity () {
      this.importComm = true
      // this.$refs.clean.initData()
    },
    newCommodity () {
      this.addNewComm = true
      this.getPfBaseGoodsCategoryList()
      this.showList();
      // 试验
      // this.$emit('success',false);
    },
    showList () {
      setTimeout(function () {
        var e = document.createEvent('MouseEvents')
        e.initEvent('click', true, true)
        document.getElementsByClassName('el-cascader')[0].dispatchEvent(e)
      }, 10)
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getStGoodsInfoList1()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getStGoodsInfoList1()
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    nextStep () {
      let routePath = this.$route.path
      if (routePath === '/store/commManage') {
        this.$router.push({ path: '/store/commEdit', query: { sort: this.selectedOptions } })
      } else {
        this.$emit('closeDialog', this.selectedOptions)
      }
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 批量上架
    batchEnable () {
      let params = {
        jsonData: JSON.stringify(this.multipleSelection)
      }
      this.$api.batchEnableRole(params).then(res => {
        if (res.code === 0) {
          this.getListData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 批量下架
    batchDisable () {
      let params = {
        jsonData: JSON.stringify(this.multipleSelection)
      }
      this.$api.batchDisableRole(params).then(res => {
        if (res.code === 0) {
          this.getListData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleClose () {
      this.importComm = false
      this.addNewComm = false
      this.$refs.clean.initData()
    },
    toggle () {
      this.isA = !this.isA
      if (this.num) {
        this.num = false
        this.rank = 'desc'
      } else {
        this.num = true
        this.rank = 'asc'
      }
      this.getStGoodsInfoList1()
    },
    changeState(stateid){
      if(stateid != this.typeState ){
        this.typeState = stateid;
        this.getStGoodsInfoList1()
      }else{
        console.log("没有变化")
      }
      
    },
    // desc () {
    //   this.rank = 'desc'
    //   this.getStGoodsInfoList1()
    // },
    // asc () {
    //   this.rank = 'asc'
    //   this.getStGoodsInfoList1()
    // },
    // chooseThis (index) {
    //   this.type = index
    //   let params = {
    //     page: 1,
    //     limit: 20,
    //     state: this.type
    //   }
    //   this.$api.getStGoodsInfoList1(params).then(res => {
    //     this.totalCount = res.count
    //     this.stGoodsInfoList = res.data
    //   })
    // },
    refresh () {
      this.importComm = false
      this.getStGoodsInfoList1()
    },
    // allChoose (param) {
    //   if (param) {
    //     this.stGoodsInfoList.forEach(el => {
    //       el.choose = true
    //     })
    //   } else {
    //     this.stGoodsInfoList.forEach(el => {
    //       el.choose = false
    //     })
    //   }
    // },
    // 全选
    checkAll (param) {
      if (param) {
        this.stGoodsInfoList.forEach(el => {
          el.choose = true
        })
      } else if (this.itemsChoose.length === 0 && !param) {
        this.stGoodsInfoList.forEach(el => {
          el.choose = false
        })
      }
    }, // 下架商品前判断是否参加活动
    getActivityByGoodsId (param) {
      if (param === 'down') {
        var itemList = []
        this.stGoodsInfoList.forEach(el => {
          if (el.choose === true) {
            itemList.push(el.goodsId)
          }
        })
        let params = {
          jsonData: JSON.stringify(itemList)
        }
        this.$api.getActivityByGoodsId(params).then(res => {
          if (res.code === 0) {
            this.setGoodsDrop(param)
          } else {
            this.$message({
              message: res.data,
              type: 'warning',
              duration: 5000
            })
            // this.$message.error(res.data)
            // this.errorMsgs = res.data.split('#')
          }
        })
      }
    },
    setGoodsDrop (param) {
      var itemList = []
      this.stGoodsInfoList.forEach(el => {
        if (el.choose === true) {
          itemList.push(el.goodsId)
        }
      })
      if (itemList.length === 0) {
        this.$message.error('至少选择一个商品进行操作')
      } else {
        let params = {
          jsonData: JSON.stringify(itemList)
        }
        if (param === 'up') {
          this.$confirm('此操作将选择商品状态改为上架 , 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.goodsBatchUp(params).then(res => {
              if (res.code === 0) {
                this.$message({
                  message: '批量上架成功',
                  type: 'success'
                })
              } else {
                this.$message.error(res.msg)
              }
              this.getStGoodsInfoList1()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消启用操作'
            })
          })
        }
        if (param === 'down') {
          this.$confirm('此操作将选择商品状态改下架 , 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.goodsBatchDown(params).then(res => {
              if (res.code === 0) {
                this.$message({
                  message: '批量下架成功',
                  type: 'success'
                })
              } else {
                this.$message.error(res.msg)
              }
              this.getStGoodsInfoList1()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消启用操作'
            })
          })
        }
      }
    }
  },
  components: { search, commodityItem, steps, leftCondition, topOperate, cascade }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.comm-manage {
  margin: 0 auto;
  display: flex;
  padding-top: 126px;
  .left-view {
    border: 1px solid $border-color;
    flex: 0 0 156px;
    padding: 10px 0 10px 36px;
    height: 240px;
    border-radius: 4px;
  }
  .right-view {
    flex: 1;
    // margin-left: 10px;
    .top-search {
      display: flex;
      justify-content: space-between;
      .busi-btns {
        .btn {
          padding: 9px 20px;
          &.newcom-btn {
            margin-left: 0px;
            background: $blue-color;
            border-color: $blue-color;
            color: #fff;
            &:focus,
            &:hover {
              background: lighten($blue-color, 6%);
              border-color: lighten($blue-color, 6%);
            }
          }
          &.import-btn {
            background: $yello-color;
            border-color: $yello-color;
            color: #fff;
            &:focus,
            &:hover {
              background: lighten($yello-color, 6%);
              border-color: lighten($yello-color, 6%);
            }
          }
        }
      }
    }
  }
  .casca {
    text-align: center;
    height: 400px;
    .next-btn {
      width: 200px;
      padding: 15px 20px;
      position: absolute;
      bottom: 20px;
      right: 40px;
    }
  }
  .operate {
  border: 1px solid $border-color;
  padding: 6px 10px;
  margin: 20px 0 10px 0;
  border-radius: 4px;
  font-size: $xs-size;
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
        span {
          margin-right: 18px;
          cursor: pointer;
          i {
            font-size: 14px;
            position: relative;
            top: 1px;
            margin-right: 2px;
          }
          &:hover {
            color: $main-color;
          }
        }
      }
    }
    .right-op {
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
    .middle-op {
      span {
        margin: 0 10px;
      }
    }
    .sort {
      cursor: pointer;
      i.up {
        position: relative;
        top: 2px;
        margin-left: 4px;
        @include icon(9px,14px,'../../../assets/image/icon/icon-price-up.png');
      }
      i.down {
        position: relative;
        top: 2px;
        margin-left: 4px;
        @include icon(9px,14px,'../../../assets/image/icon/icon-price-down.png');
      }
    }
  }
}
}
.el-button-group>.btn{
  margin-left: 20px;
  border-radius: 10px;
  border:none;
}
</style>
