<template>
  <div class="activity">
    <ul>
      <li class="volume" @click="discount" v-if="$route.path==='/marketing/storeMarket/activityCoupon'">
        <div class="logo"></div>
        <span>+ 优惠券</span>
      </li>
      <li class="rob" @click="rob" v-if="$route.path==='/marketing/storeMarket/activityGrab'">
        <div class="logo"></div>
        <span>+ 秒杀</span>
      </li>
      <li class="group" @click="collage" v-if="$route.path==='/marketing/storeMarket/activityCollage'">
        <div class="logo"></div>
        <span>+ 团购</span>
      </li>
      <li class="union"  @click="union" v-if="$route.path==='/marketing/activityLeague'">
        <div class="logo"></div>
        <span>+ 活动联盟</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    discount () {
      this.$router.push({path: '/marketing/storeMarket/marketDiscount'})
    },
    rob () {
      this.$router.push({path: '/marketing/storeMarket/marketRob'})
    },
    collage () {
      this.$router.push({path: '/marketing/storeMarket/marketCollage'})
    },
    union () {
      this.$router.push({path: '/marketing/marketUnion'})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.activity{
  width:100%;
  padding:0 30px;
  ul{
    li{
      margin-top:12px;
      padding:32px 0 32px 300px;
      position: relative;
      border-radius: 8px;
      color:#fff;
      font-size:$xlg-size;
      cursor: pointer;
      .logo{
        width:208px;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        position: absolute;
        top:0;
        left:30px;
      }
    }
    .volume{
      @include linear(134.4deg,rgba(230,71,91,1),rgba(254,136,128,1));
      .logo{
        background-image: url('../../assets/image/quan@2x.png');
      }
    }
    .rob{
      @include linear(134.4deg,rgba(96,120,234,1),rgba(24,231,217,1));
      .logo{
        background-image: url('../../assets/image/qiang@02x.png');
      }
    }
    .group{
      @include linear(-135deg,rgba(126,189,190,1),rgba(39,164,146,1));
      .logo{
        background-image: url('../../assets/image/tuan@02x.png');
      }
    }
    .union{
      @include linear(134.4deg,rgba(124,150,166,1),rgba(181,198,204,1));
      .logo{
        background-image: url('../../assets/image/lianmeng@02x.png');
      }
    }
  }
}
</style>
