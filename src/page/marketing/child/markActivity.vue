<!--********************************                                     *************************************-->
<template>
  <div class="comm-manage">
    <div class="left-view">
      <ul>
        <li v-for="(item, index) in condition" :key="index" :class="{active:item.isActive}" @click="chooseThis(index)">
          {{item.title}}
        </li>
      </ul>
    </div>
    <div class="right-view">
      <div class="top-search">
        <!--  输入关键词搜索功能-->
        <search  @searchValue="searchValue"></search>
        <div class="busi-btns">
          <el-button class="btn newcom-btn " @click="importCommodity ()">+新活动</el-button>
        </div>
      </div>
     <div class="activity">
       <!-- 加载组件信息 -->
      <marketing-item v-for="(item, index) in stMarketingVoList" :key="index" :item="item"></marketing-item>
     </div>
      <div class="pagin">
          <span class="total">共{{count0}}条数据</span>
          <el-pagination
          :page-size="20"
          layout="prev, pager, next, jumper"
          :total=count0>
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
</template>
<script>
import search from '../../../components/public/search'
import activity from '../../../components/marketing/activity'
import marketingItem from '../../../components/marketing/marketingItem'
// import index from 'vue'
export default{
  data () {
    return {
      importComm: false,
      active: 0,
      condition: [
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
        }
      ],
      // 初始化所有优惠券列表 (优惠券/秒商品/团购)
      stMarketingVoList: {},
      count0: 0,
      // 定义查询 参数
      searchValue1: '',
      // 定义一个优惠券type
      marketingType: ''
    }
  },
  mounted () {
    // 初始化加载 原型
    this.getStMarketingCouponList(0)
  },
  methods: {
    // 关键词搜索查询条件
    searchValue (value) {
      this.searchValue1 = value
      if (value === '优惠券') {
        this.marketingType = '0'
      } else if (value === '秒杀') {
        this.marketingType = '1'
      } else if (value === '团购') {
        this.marketingType = '2'
      } else if (value === '联盟') {
        this.marketingType = '3'
      } else {
        this.marketingType = null
        this.$message({
          message: '请输入"优惠券","秒杀","团购","联盟"关键字查询',
          type: 'warning'
        })
      }
      this.getStMarketingCouponList(this.marketingState)
    },
    // 加载方法
    getStMarketingCouponList (index) {
      let params = {
        page: 1,
        limit: 20,
        type: this.marketingType,
        // 默认查询 正在进行的活动
        marketingState: index
        //  marketingName: this.searchValue1
      }
      this.$api.getStMarketingCouponList(params).then(res => {
        this.stMarketingVoList = res.data
        // 遍历数据  翻译字段
        this.stMarketingVoList.forEach(item => {
          if (item.useScope === 'allProduce') {
            item.useScope = '所有商品'
          } else if (item.useScope === 'assignProduce') {
            item.useScope = '指定商品可用'
          } else if (item.useScope === 'assignStore') {
            item.useScope = '指定门店可用'
          }
          if (item.state === '0') {
            item.state = '正常'
          } else if (item.state === '1') {
            item.state = '活动进行中'
          } else if (item.state === '2') {
            item.state = '活动已结束'
          }
        })
        this.count0 = res.count
      })
    },
    chooseThis (index) {
      for (let value of this.condition) {
        value.isActive = false
      }
      this.condition[index].isActive = true
      this.marketingState = index
      this.getStMarketingCouponList(index)
    },
    importCommodity () {
      this.importComm = true
    },
    handleClose () {
      this.importComm = false
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
    height:88px;
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
    margin-left: 10px;
    .top-search{
      display: flex;
      justify-content: space-between;
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
