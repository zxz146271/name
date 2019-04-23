<template>
  <div class="service">
    <div v-for="(item, index) in valueAddedServiceList" :key="index" :item="item" class="service-item">
      <div >
        <div class="public">
          <p>{{item.serviceName}}</p>
          <ul class="ul-list">
            <li v-for="(menuItem, menuIndex) in item.serviceMenus" :key="menuIndex">{{menuItem.menuName}}</li>
          </ul>
          <div class="btn">
            <el-button class="gray-color" v-if="item.authorizationState==='1'" @click="childclick(item,'0')">￥{{item.servicePrice}}元/{{changeData(item.billingMethod)}} 续费</el-button>
            <el-button class="blue-color" v-else @click="childclick(item,'0')">￥{{item.servicePrice}}元/{{changeData(item.billingMethod)}} 开通</el-button>
          </div>
        </div>
        <!-- <div class="bg-img">
          <img src="../../assets/image/service/box.png" alt="">
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getStore } from '../../tool/Utils'
export default{
  data () {
    return {
      valueAddedServiceList: []
    }
  },
  mounted () {
    // 初始化加载 原型
    this.getValueAddedServiceList()
  },
  methods: {
    changeData (time) {
      if (time === 'year') {
        return '年'
      } else if (time === 'day') {
        return '天'
      } else if (time === 'month') {
        return '月'
      } else if (time === 'quarter') {
        return '季度'
      } else if (time === 'halfYear') {
        return '半年'
      } else if (time === 'frequency') {
        return '次'
      }
    },
    getValueAddedServiceList () {
      let params = {
        serviceType: 'valueAdded',
        storeId: getStore('storeIdWeb')
      }
      this.$api.getServiceList(params).then(res => {
        this.valueAddedServiceList = res.data
      })
    },
    childclick (serviceItem, isUnit) {
      if (getStore('distributorId')) {
        let params = {
          distributorId: getStore('distributorId')
        }
        this.$api.getDistributor(params).then(res => {
          if (res.code === 0) {
            this.$emit('payment', serviceItem, isUnit)
          } else if (res.code === 11) {
            this.$message.error('该经销商信息未审核，请先补全信息。')
            this.$router.push({path: '/store/maintain'})
          } else if (res.code === 2) {
            this.$message.error('您的信息正在审核中，审核通过后才能购买服务。')
          } else if (res.code === 5) {
            this.$message.error(res.msg)
          } else if (res.code === 1) {
            this.$message.error('您的信息未通过审核，请重新提交信息。')
            this.loading = false
            this.$router.push({path: '/store/maintain'})
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.service{
  display: flex;
  max-width: 100%;
  // overflow-x: auto;
  flex-wrap: wrap;
  padding: 20px 0;
  .service-item{
    width:300px;
    height: 285px;
    margin-right: 48px;
    margin-bottom: 20px;
    position: relative;
    &:nth-child(3n+3){
      margin-right: 0;
    }
    .bg-img{
      position: absolute;
      bottom: 10px;
      left: 15px;
      z-index: 500;
    }
    .ul-list{
      flex: 1;
      max-height: 200px;
      overflow-y: auto;
    }
  }
  .public{
    flex:1;
    height: 285px;
    display: flex;
    position: absolute;
    z-index: 600;
    justify-content: space-between;
    flex-direction: column;
    color:#000000;
    border:1px solid rgba(253,67,67,1);
    border-radius:5px;
    box-shadow:0px 0px 8px rgba(253,67,67,0.2);
    >p{
      font-size:20px;
      width: 300px;
      text-align: center;
      padding:30px 0 12px 0;
    }
    ul{
      padding:10px 0;
      li{
        text-align: center;
        padding: 6px 20px;
        font-size: $md-size;
      }
    }
  }
  .btn{
    padding: 20px 50px;
    button{
      width: 100%;
      color:#fff;
      font-size: $xlg-size;
      border:1px solid rgba(253,67,67,1);
      background: rgba(253,67,67,1);
      &:hover{
        background: rgba(253,67,67,0.8);
      }
      span{
        font-size: $xs-size;
        opacity: 0.8;
      }
    }
  }
  .one{
    @include linear(135deg,rgba(88,99,128,1),rgba(185,195,212,1));
  }
  .two{
    @include linear(134.4deg,rgba(96,120,234,1),rgba(24,231,217,1));
    // margin: 0 5px;
    >p{
      span{
        border-radius: 4px ;
        background: $table-text-color;
        padding: 2px 5px;
        font-size: $xs-size;
        margin-left: 10px;
      }
    }
  }
  .three{
    @include linear(134.8deg,rgba(238,72,95,1),rgba(255,113,105,1));
  }
  .bottom{
    padding: 0 20px;
    text-align: center;
    position: relative;
    &::before{
      content:"";
      display: block;
      width: 290px;
      height: 1px;
      background: rgba(255,255,255,0.5);
      position: absolute;
      left: 0;
      right: 0;
      top:0;
      margin: 0 auto;
    }
    p{
      font-size: $xlg-size;
      padding: 15px 0 5px 0;
    }
    span{
      font-size: $md-size;
    }
  }
}
</style>
