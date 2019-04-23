<!--********************************        团购活动展示页面                             *************************************-->
<template>
  <div class="comm-manage">
    <div class="right-view">
      <div class="top-search">
        <div class="search-left">
           <el-select v-model="type" placeholder="请选择" @change="chooseThis(type)">
          <el-option
            v-for="item in condition"
            :key="item.type"
            :label="item.title"
            :value="item.type">
          </el-option>
        </el-select>
        <search   @searchValue="searchValue"></search>
      </div>
        <div class="busi-btns">
          <el-button class="btn newcom-btn " @click="importCommodity ()"  data-code="7030001">+新活动</el-button>
        </div>
      </div>
     <div class="activity">
      <marketing-item  @returnToParentValue="returnToParentValue" :data="stMarketingVoList"></marketing-item>
     </div>
      <div class="pagin">
          <span class="total">共{{totalCount}}条数据</span>
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total="totalCount">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :visible.sync="importComm"
        width="35%"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">添加新活动</span>
          </div>
          <activity></activity>
  </el-dialog>
  </div>
  <!-- <div style="
    display:  flex;
    justify-content:  center;
    align-items: center;
    opacity: .5;
    font-size: 20px;">
    <h1>开发中···</h1>
  </div> -->
</template>
<script>
import { mapGetters } from 'vuex'
import search from '../../../components/public/search'
import activity from '../../../components/marketing/activity'
import marketingItem from '../../../components/marketing/marketingItem'
import { judgeButton } from '../../../tool/Utils'
// import index from 'vue'
export default{
  data () {
    return {
      importComm: false,
      active: 0,
      type: 1,
      condition: [
        {
          type: 0,
          title: '未开始的活动',
          isActive: false,
          num: ''
        },
        {
          type: 1,
          title: '进行中的活动',
          isActive: true,
          num: ''
        },
        {
          type: 2,
          title: '已结束的活动',
          isActive: false,
          num: ''
        },
        {
          type: 3,
          title: '全部活动',
          isActive: false,
          num: ''
        }
      ],
      marketingList: [
        {
          id: 1,
          type: '0'
        },
        {
          id: 2,
          type: '1'
        },
        {
          id: 3,
          type: '2'
        },
        {
          id: 4,
          type: '3'
        }
      ],
      // 初始化所有优惠券列表 (优惠券/秒商品/团购)
      stMarketingVoList: [],
      // 定义查询 参数
      searchValue1: '',
      // 定义一个优惠券type
      marketingType: '',
      // 团购搜索框值
      groupSeacherVal: null,
      totalCount: 0, // 默认数据总数
      currentPage: 1,
      pagesize: 10
    }
  },
  computed: {
    ...mapGetters(['powerButton', 'storeInfo', 'groupBuyChooseIndex'])
  },
  mounted () {
    this.getButton()
    this.chooseThis(this.groupBuyChooseIndex)
    this.type = this.groupBuyChooseIndex
  },
  created () {
  },
  methods: {
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    // 加载方法
    getStMarketingGropList (index) {
      let groupBooking = this.groupBuyChooseIndex
      if (this.groupBuyChooseIndex === 3) {
        groupBooking = null
      }
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        // 默认查询 正在进行的活动
        state: groupBooking,
        groupBookingName: this.groupSeacherVal
      }
      this.$api.getStMarketingGropList(params).then(res => {
        if (res.code === 0) {
          this.stMarketingVoList = res.data
          this.totalCount = res.count
          this.stMarketingVoList.forEach(item => {
            let getStartTime = item.getStartTime;
            let getStartTimeArr = getStartTime.split(":");
            let getStartTimeArr1 = getStartTimeArr.pop();
            let startTime = getStartTimeArr.join(":");

            let getEndTime = item.getEndTime;
            let getEndTimeArr = getEndTime.split(":");
            let getEndTimeArr1 = getEndTimeArr.pop();
            let endTime = getEndTimeArr.join(":");
            let str = startTime + " 至 " + endTime;
            item["activityTime"] = str;
          });
        } else if (res.code === 1) {
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    chooseThis (index) {
      this.$store.dispatch('setGroupBuyChooseIndex', index)
      if (index !== undefined) {
        for (let value of this.condition) {
          value.isActive = false
        }
        this.condition[index].isActive = true
        this.marketingState = index
        this.getStMarketingGropList(index)
      } else {
        this.getStMarketingGropList(1)
      }
    },
    importCommodity () {
      this.$router.push({path: '/marketing/storeMarket/marketCollage'})
    },
    handleClose () {
      this.importComm = false
    },
    // 关键词搜索查询条件
    searchValue (value) {
      this.groupSeacherVal = value
      this.getStMarketingGropList()
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getStMarketingGropList()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getStMarketingGropList()
    },
    returnToParentValue (value) {
      if (value) {
        // value为true 时 刷新页面
        this.getStMarketingGropList()
      }
    }
  },
  components: {search, activity, marketingItem}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.comm-manage{
  margin:0 auto;
  display: flex;
  padding-top: 126px;
  .left-view{
    border:1px solid $border-color;
    flex:0 0 156px;
    padding: 21px 0 10px 36px;
    height:120px;
    border-radius: 4px;
    ul{
      li{
        font-size:$xs-size;
        margin-bottom: 16px;
        cursor: pointer;
        position: relative;
        &:hover{
          color:$text-red-color;
        }
        &.active{
          color:$text-red-color;
          &::after{
            content: '';
            @include icon(14px,14px,'../../../assets/image/icon/icon-radio.png');
            position: absolute;
            left:-22px;
            top:1px;
          }
        }
      }
    }
  }
  .right-view{
    flex:1;
    // margin-left: 10px;
   .top-search{
      display: flex;
      justify-content: space-between;
      .search-left{
        display: flex;
        align-items: center;
        .search{
          margin-left: 15px;
        }
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
    .activity{
      width:100%;
      display:flex;
      flex-wrap:wrap;
      margin-top:12px;
    }
    .operate{
      border:1px solid $border-color;
      padding:6px 10px;
      margin-top: 20px;
      display: flex;
      border-radius: 4px;
      justify-content: space-between;
      font-size: $xs-size;
      .letf-op{
        display: flex;
        .comm-up{
          position: relative;
          margin-left: 25px;
          display: flex;
          align-items: center;
          span{
            margin-right: 18px;
            cursor: pointer;
            .iconfont{
              font-size: 14px;
              position: relative;
              top:1px;
              margin-right: 2px;
            }
            &:hover{
              color:$main-color;
            }
          }
        }
      }
      .right-op{
        .price{
          cursor: pointer;
          i{
            position: relative;
            top: 2px;
            margin-left: 4px;
            @include icon(9px,14px,'../../../assets/image/icon/icon-price-up.png')
          }
        }
      }
    }
  }
  .import-dialog{
    .left-title{
      position: absolute;
      color:#fff;
      left: 0;
      .bottom{
        position: absolute;
        width:90px;
        height:28px;
        left:0;
        z-index: 10;
        background-color: $main-color;
        &::after{
          content: '';
          @include triangle-right(14px,12px,$main-color);
          position: absolute;
          right:-24px;
        }
      }
      .top{
          position: relative;
          width:82px;
          height:28px;
          display: inline-block;
          background-color: $gray-color;
          line-height: 28px;
          text-align: center;
          color:$text-main-color;
          font-size: $xs-size;
          &::after{
            content: '';
            @include triangle-right(14px,12px,$gray-color);
            position: absolute;
            right:-24px;
          }
          &::before{
            content: '';
            position: absolute;
            left:0px;
            width: 4px;
            background-color: $main-color;
            height: 100%;
          }
        }
    }
  }
}
</style>
