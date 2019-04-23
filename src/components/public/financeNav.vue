<template>
  <div class="top-nav">
    <ul>
      <li>
        <i class="el-icon-arrow-right next-icon"></i>{{$route.matched[0].name}}
      </li>
      <li v-if="$route.path == '/store/commManage' || $route.path == '/store/storeManage'">
        <!-- <i class="el-icon-arrow-right next-icon"></i>{{storeState == 4? '下架商品': topArr.split(',')[1]}} -->
        <i class="el-icon-arrow-right next-icon"></i>{{topName}}
      </li>
      <li v-if="$route.matched.length > 1">
        <i class="el-icon-arrow-right next-icon"></i>{{$route.matched[1].name}}
      </li>
    </ul>
  </div>
</template>
<script>
export default{
  data () {
    return {}
  },
  computed: {
    storeState: function () {
      return localStorage.getItem('storeState')
    }
  },
  props: ['topArr', 'topName']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.top-nav{
  height: 40px;
  line-height: 40px;
  background: #F4F4F4;
  border-radius: 10px;
  ul{
    display: flex;
    li{
      margin-left: 15px;
      font-size: 12px;
      color: #000;
      .next-icon{
        margin-right: 10px;
      }
    }
  }
}
</style>
