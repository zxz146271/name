<template>
  <div class="data-list">
    <div class="list-item" v-if="$route.path.indexOf('analysisMember') != -1">
      <ul>
        <li class="data-num">
          <p class="top-num">{{member.memTotal}}</p>
          <p class="title"><i></i>已购客户总数</p>
        </li>
        <li class="data-num">
          <p class="top-num">{{member.memTodayAddNum}}</p>
          <p class="title"><i></i>今日新增已购客户总数</p>
        </li>
        <li class="data-num">
          <p class="top-num">{{member.memActiveNum}}</p>
          <p class="title"><i></i>今日活跃已购客户</p>
        </li>
        <li>
          <p class="info">
            <span>昨日新增已购客户数</span>
            <span>+{{member.memYesterdayAddNum}}</span>
          </p>
          <p class="info">
            <span>近7天新增已购客户数</span>
            <span>+{{member.memSevendayAddNum}}</span>
          </p>
          <p class="info">
            <span>近30天新增已购客户数</span>
            <span>+{{member.memThirtydayAddNum}}</span>
          </p>
        </li>
        <li >
          <p>已购客户标签</p>
          <p class="comm-label" v-for="(lable, index) in lableList" :key="index">
            <span class="label">{{lable}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="list-item"  v-if="$route.path.indexOf('analysisStore') != -1">
      <ul>
        <li class="data-num">
          <p class="top-num">888</p>
          <p class="title"><i></i>今日访客数</p>
        </li>
        <li class="data-num">
          <p class="top-num">888</p>
          <p class="title"><i></i>今日页面访问量</p>
        </li>
        <li class="data-num">
          <p class="top-num">888</p>
          <p class="title"><i></i>今日分享次数</p>
        </li>
        <li>
          <p class="info">
            <span>被访问商品数</span>
            <span>+23</span>
          </p>
          <p class="info">
            <span>商品访问人数</span>
            <span>+23</span>
          </p>
          <p class="info">
            <span>商品访问量</span>
            <span>+23</span>
          </p>
        </li>
        <li>
          <p>被访问最多的店</p>
          <p class="store-name">徐汇店</p>
        </li>
      </ul>
    </div>
    <div class="list-item commodity-item" v-if="$route.path.indexOf('analysisGoods') != -1">
      <ul>
        <li class="data-num">
          <p class="top-num">666</p>
          <p class="title"><i></i>在架商品数</p>
        </li>
        <li class="data-num">
          <p class="top-num">666</p>
          <p class="title"><i></i>已下架商品数</p>
        </li>
        <li>
          <p class="info">
            <span>被访问商品数</span>
            <span>+23</span>
          </p>
          <p class="info">
            <span>商品访问人数</span>
            <span>+23</span>
          </p>
          <p class="info">
            <span>商品访问量</span>
            <span>+23</span>
          </p>
        </li>
        <li class="data-num commodity" >
          <p class="title">付款商品数</p>
          <p class="top-num"><i></i>23</p>
        </li>
        <li class="heightchartline">
          <div id="line"></div>
        </li>
      </ul>
    </div>
    <div class="list-item single-product" v-if="$route.path.indexOf('analysisShop') != -1">
      <ul>
        <li class="data-num">
          <img src="../../assets/image/user-head.jpg">
        </li>
        <li class="information">
          <p class="title">人体工程学座椅AX2345型</p>
          <p class="info">
            <span>近7天访问量</span>
            <span>+23</span>
          </p>
          <p class="info">
            <span>近7天访问人数</span>
            <span>+23</span>
          </p>
          <p class="info">
            <span>近7天分享次数</span>
            <span>+23</span>
          </p>
        </li>
        <li class="heightchartline">
          <div id="line"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      member: {
        memTotal: 0,
        memTodayAddNum: 0,
        memYesterdayAddNum: 0,
        memSevendayAddNum: 0,
        memThirtydayAddNum: 0,
        memActiveNum: 0
      },
      lableList: []

    }
  },
  // 初始化加载方法
  mounted () {
    this.getMemberCountInitData()
  },
  methods: {
    // 获取已购客户分析数据
    getMemberCountInitData () {
      var _this = this
      let params = {
        searchParam: '',
        isAllStore: this.$route.path
      }
      this.$api.getMemberCountInitData(params).then(res => {
        _this.member = res.data
      })
      this.$api.getMemberLables(params).then(res => {
        _this.lableList = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.data-list{
  .list-item{
    ul{
      display: flex;
      >li{
        flex: 1;
        padding: 20px 14px;
        border-right: 1px solid $border-color;
        &:last-child{
          border-right: 0;
        }
        font-size: $xs-size;
        &.data-num{
          text-align: center;
          .top-num{
            font-size: 26px;
            color:$main-color;
            margin-bottom: 10px;
          }
        }
        &.commodity{
          width: 100px;
          text-align:left;
          border:none;
          .title{
            margin-bottom: 10px;
          }
        }
        &.heightchartline{
          flex: 2;
          padding: 0;
          #line{
            width: 240px;
            height: 130px;
            margin: 0 auto;
          }
        }
        .info{
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid $border-color;
          padding: 6px 0;
          span{
            &:nth-child(2){
              color:$blue-color
            }
          }
        }
        .store-name{
          color:$main-color;
          font-size: 28px;
          margin-top: 16px;
        }
        .comm-label{
          margin-top: 6px;
          .label{
            display: inline-block;
            border-radius: 4px;
            padding: 1px 6px;
            margin-right: 4px;
            margin-bottom: 4px;
            &:hover{
              .el-icon-delete{
                display: inline-block;
              }
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
      }
    }
  }
  .single-product{
    ul{
      li{
        border:none;
        .title{
          font-size: 26px;
          margin-bottom: 24px;
        }
        .info{
          width: 180px;
          span{
            &+span{
              color: $text-red-color!important;
            }
          }
        }
      }
      .information{
        flex: 2;
      }
      .data-num{
        img{
          width: 180px;
          height: 180px;
        }
      }
    }
  }
  // .commodity-item{
  //   li{
  //     &:nth-child(4){
  //       width: 100px;
  //     }
  //   }
  // }
}
</style>
