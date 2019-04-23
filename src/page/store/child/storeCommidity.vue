<template>
  <div class="commodity">
    <div class="top-search">
      <div class="tabBtn">
        所属状态：
         <!-- <el-row>
          <el-col >所属状态</el-col> -->
          <!-- <el-col> -->
            <el-button-group>
              
              <el-button :type="typeState == '1' ? 'primary' : 'deafult'" @click="changeState('1')" class="btn">上架商品</el-button>
              <el-button :type="typeState == '2' ? 'primary' : 'deafult'"  @click="changeState('2')" class="btn">微店商品</el-button>
              <el-button :type="typeState == '4' ? 'primary' : 'deafult'"  @click="changeState('4')" class="btn">下架商品</el-button>
            </el-button-group>
          <!-- </el-col>
        </el-row> -->
      </div>
      <search @searchValue="searchValue" :load="loading"></search>

      <!-- <div class="busi-btns">
        <el-button class="btn newcom-btn" @click="newCommodity" data-code="5010002">新商品</el-button>
      </div> -->
    </div>
    <top-operate :option="optionTop" @desc="desc" @asc="asc" @tolertant="tolertant"></top-operate>
    <div class="content">
      <div class="title">
        <span>照片</span>
        <span>商品基础信息</span>
    </div>
    <store-commodity-item v-for="(item, index) in tableData" :key="index" :item="item" @reflash="reflash"></store-commodity-item>
    </div>
    <div class="pagin">
          <span class="total">共{{count}}条数据</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total=count>
          </el-pagination>
      </div>
      <el-dialog
        :visible.sync="addNewComm"
          width="200px"
          height="200px"
          center
          v-if="addNewComm"
           class="import-dialog">
            <div slot="title" class="left-title">
              <span class="top">提示</span>
            </div>
            <p class="main">
              仅「老板」和「管理员」可以创建商品，请联系「老板」或「管理员」创建。
            </p>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addNewComm = false" class="ok-btn">好的</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script>
import search from '../../../components/public/search'
import topOperate from '../../../components/store/storetopOperate'
import storeCommodityItem from '../../../components/store/storeCommodityItem'
import { getStore } from '../../../tool/Utils'
export default {
  data () {
    return {
      // storeid:,
      addNewComm: false,
      loading: false,
      optionTop: {
        type: '0'
      },
      tableData: [],
      storeData: [],
      count: 0,
      breadcrumbList: [
        { title: '门店管理', path: '/commodity' },
        { title: '新门店', path: '' }
      ],
      // 列表声明一个空对象
      goodsInfo: {
        goodsName: '',
        storeId: '',
        rank: 'default'
      },
      storevo: {
        state: '0'
      },
      currentPage: 1,
      pagesize: 10,
      typeState: "1",
    }
  },
  computed: {
  },
  // 数据初始化方法
  mounted () {
    this.getStMemberList()
    // this.getStStoreList()
  },
  methods: {
    newCommodity () {
      // this.addNewComm = true
      this.$router.push({name: '全部商品', params: {fromMyStore: true}})
    },
    // 根据姓名进行模糊搜素
    searchValue (value) {
      this.goodsInfo.goodsName = value
      this.currentPage = 1
      this.loading = true
      this.getStMemberList()
    },
    reflash () {
      this.getStMemberList()
    },
    changeState(stateid){
      if(stateid != this.typeState ){
        this.typeState = stateid;
        this.getStMemberList()
      }else{
        console.log("没有变化")
      }
      
    },
    getStMemberList () {
      console.log("1")
      var _this = this
      this.$emit('topName', this.typeState)
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        goodsName: this.goodsInfo.goodsName,
        rank: this.goodsInfo.rank,
        state: this.typeState,
        storeId: this.goodsInfo.storeId
      }
      this.$api.getStoreGoodInfoList(params).then(res => {
        console.log("4")
        if (res.code === 0) {
          console.log("5")
          _this.tableData = res.data
          _this.count = res.count
          this.loading = false
        } else {
          console.log("6")
          this.$message.error(res.msg)
          this.loading = false
        }
      })
    },
    // changeType (value) {
    //   this.goodsInfo.storeId = value
    //   this.getStMemberList()
    // },
    // getStStoreList () {
    //   let params = {
    //     page: 1,
    //     limit: 0,
    //     storevo: this.storevo
    //   }
    //   this.$api.getStStoreList(params).then(res => {
    //     this.storeData = res.data
    //   })
    // },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getStMemberList()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getStMemberList()
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    desc () {
      this.goodsInfo.rank = 'desc'
      this.getStMemberList()
    },
    asc () {
      this.goodsInfo.rank = 'asc'
      this.getStMemberList()
    },
    tolertant () {
      this.getStMemberList()
    }
  },
  components: {search, topOperate, storeCommodityItem}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.commodity {
  margin: 0 auto;
  padding-top: 106px;
  background: #fff;
  .top-search{
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
      }
    }
  }
  .title{
    display: flex;
    font-size: $xs-size;
    color:$text-main-color;
    background: $child-nav-bg;
    padding: 10px 0;
    border-bottom:1px solid $border-color;
    position: relative;
    .select-time{
      position: absolute;
      top: 5px;
      right: 5px;
    };
    span{
      font-weight: 700;
      line-height: 23px;
      &:nth-child(1){
        width: 122px;
        padding-left: 42px;
      }
      &:nth-child(2){
        padding-left: 15px;
      }
    }
  }
}
.import-dialog{
  .main{
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
  }
}
.el-button-group>.btn{
  margin-left: 20px;
  border-radius: 10px;
  border:none;
}
.el-button-group>.btn:nth-child(2) {
  border-radius: 10px;
}
</style>
