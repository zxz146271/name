<!--********************************************            优惠券展示页面                ************************************-->
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
              :value="item.type"
            ></el-option>
          </el-select>
          <search @searchValue="searchValue" :load="loading" class="search"></search>
        </div>
        <div class="busi-btns">
          <el-button class="btn newcom-btn" @click="importCommodity ()" data-code="7010001">+新活动</el-button>
        </div>
      </div>
      <div class="activity">
        <!-- 加载组件信息 -->
        <marketing-item @returnToParentValue="returnToParentValue" :data="stMarketingCouponVoList"></marketing-item>
      </div>
      <div class="pagin">
        <span class="total">共{{totalCount}}条数据</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="sizes, prev, pager, next"
          :page-sizes="[2, 5, 10, 20]"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      :visible.sync="importComm"
      width="35%"
      :before-close="handleClose"
      class="import-dialog"
    >
      <div slot="title" class="left-title">
        <span class="top">添加新活动</span>
      </div>
      <activity></activity>
    </el-dialog>
    <!-- 添加 -->
      <!-- <div class="content">
          <h2>我的内容库</h2>
          <search @searchValue="searchValue" :load="loading" class="search"></search>
      </div> -->
    <!-- 添加结束 -->
  </div>
  
</template>
<script>
import search from "../../../components/public/search";
import activity from "../../../components/marketing/activity";
import marketingItem from "../../../components/marketing/marketingItem";
import { judgeButton } from "../../../tool/Utils";
import { mapGetters } from "vuex";
// import index from 'vue'
export default {
  data() {
    return {
      loading: false,
      importComm: false,
      active: 0,
      type: 1,
      condition: [
        {
          type: 0,
          title: "未开始的活动",
          isActive: false,
          num: ""
        },
        {
          type: 1,
          title: "进行中的活动",
          isActive: true,
          num: ""
        },
        {
          type: 2,
          title: "已结束的活动",
          isActive: false,
          num: ""
        },
        {
          type: 3,
          title: "全部活动",
          isActive: false,
          num: ""
        }
      ],
      // 初始化  优惠券 数据
      stMarketingCouponVoList: [],
      totalCount: 0, // 默认数据总数
      currentPage: 1,
      pagesize: 10,
      couponSeacherVal: null
    };
  },
  computed: {
    ...mapGetters(["powerButton", "storeInfo", "couponChooseIndex"])
  },
  mounted() {
    // 初始化加载 原型
    this.getButton();
    this.chooseThis(this.couponChooseIndex);
    this.type = this.couponChooseIndex;
  },
  methods: {
    handleEdit(couponCode) {
      // 判断是否生效 生效则不允许修改
      if (this.item.state === '2') {
        this.$message({
          message: '活动已经结束,无法编辑',
          type: 'warning'
        })
        return false
      } else if (this.item.state === '1') {
        this.$message({
          message: '活动已经开始,无法编辑',
          type: 'warning'
        })
        return false
      } else {
        this.$router.push({path: '/marketing/storeMarket/marketDiscount', query: {couponCode: couponCode, productsId: this.item.couponScope, leagueId: this.item.leagueId}})
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    getButton() {
      let pageButtons = document.getElementsByTagName("button");
      judgeButton(pageButtons, this.powerButton);
    },
    // 关键词搜索查询条件
    searchValue(value) {
      this.couponSeacherVal = value;
      this.loading = true;
      this.getStMarketingCouponList();
    },
    // 初始化优惠券列表
    getStMarketingCouponList(values) {
      let state = null;
      if (this.couponChooseIndex === 3) {
        state = null;
      } else {
        state = this.couponChooseIndex;
      }
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        // 默认查询 正在进行的活动
        state: state,
        couponName: this.couponSeacherVal,
        type: 0
        // storeId: this.storeInfo
      };
      this.$api.getStMarketingCouponList(params).then(res => {
        // 遍历数据  翻译字段
        if (res.code === 0) {
          this.stMarketingCouponVoList = res.data;
          this.stMarketingCouponVoList.forEach(item => {
            if (item.useScope === "allProduce") {
              item.useScope = "所有商品";
            } else if (item.useScope === "assignProduce") {
              item.useScope = "指定商品可用";
            } else if (item.useScope === "assignStore") {
              item.useScope = "指定门店可用";
            }
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
          this.$message.error(res.msg);
        }
        this.loading = false;
        this.totalCount = res.count;
      });
    },
    chooseThis(index) {
      this.currentPage = 1;
      this.$store.dispatch("setCouponChooseIndex", index);
      if (index !== undefined) {
        for (let value of this.condition) {
          value.isActive = false;
        }
        this.condition[index].isActive = true;
        this.getStMarketingCouponList(index);
      } else {
        this.getStMarketingCouponList(1);
      }
    },
    importCommodity() {
      this.$router.push({
        path: "/marketing/storeMarket/marketDiscount"
      });
    },
    handleClose() {
      this.importComm = false;
    },
    returnToParentValue(value) {
      if (value) {
        // value为true 时 刷新页面
        this.getStMarketingCouponList();
      }
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.getStMarketingCouponList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getStMarketingCouponList();
    }
  },
  components: {
    search,
    activity,
    marketingItem
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/style/mixins/var";
@import "../../../assets/style/components/icon";

.comm-manage {
  margin: 0 auto;
  display: flex;
  padding-top: 126px;

  .left-view {
    border: 1px solid $border-color;
    flex: 0 0 156px;
    padding: 21px 0 10px 36px;
    height: 120px;
    border-radius: 4px;

    ul {
      li {
        font-size: $xs-size;
        margin-bottom: 16px;
        cursor: pointer;
        position: relative;

        &:hover {
          color: $text-red-color;
        }

        &.active {
          color: $text-red-color;

          &::after {
            content: "";
            @include icon(
              14px,
              14px,
              "../../../assets/image/icon/icon-radio.png"
            );
            position: absolute;
            left: -22px;
            top: 1px;
          }
        }
      }
    }
  }

  .right-view {
    flex: 1;
    width: 100%;
    min-width: 800px;
    // margin-left: 10px;
    .top-search {
      display: flex;
      justify-content: space-between;

      .search-left {
        display: flex;
        align-items: center;

        .search {
          margin-left: 15px;
        }
      }

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

    .activity {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .operate {
      border: 1px solid $border-color;
      padding: 6px 10px;
      margin-top: 20px;
      display: flex;
      border-radius: 4px;
      justify-content: space-between;
      font-size: $xs-size;

      .letf-op {
        display: flex;

        .comm-up {
          position: relative;
          margin-left: 25px;
          display: flex;
          align-items: center;

          span {
            margin-right: 18px;
            cursor: pointer;

            .iconfont {
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
        .price {
          cursor: pointer;

          i {
            position: relative;
            top: 2px;
            margin-left: 4px;
            @include icon(
              9px,
              14px,
              "../../../assets/image/icon/icon-price-up.png"
            );
          }
        }
      }
    }
  }

  .import-dialog {
    .left-title {
      position: absolute;
      color: #fff;
      left: 0;

      .bottom {
        position: absolute;
        width: 90px;
        height: 28px;
        left: 0;
        z-index: 10;
        background-color: $main-color;

        &::after {
          content: "";
          @include triangle-right(14px, 12px, $main-color);
          position: absolute;
          right: -24px;
        }
      }

      .top {
        position: relative;
        width: 82px;
        height: 28px;
        display: inline-block;
        background-color: $gray-color;
        line-height: 28px;
        text-align: center;
        color: $text-main-color;
        font-size: $xs-size;

        &::after {
          content: "";
          @include triangle-right(14px, 12px, $gray-color);
          position: absolute;
          right: -24px;
        }

        &::before {
          content: "";
          position: absolute;
          left: 0px;
          width: 4px;
          background-color: $main-color;
          height: 100%;
        }
      }
    }
  }
}
</style>
