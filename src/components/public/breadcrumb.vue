<template>
  <div class="breadcrumb">
    <ul>
      <li v-for="(item, index) in breadcrumbList" :key="index">
        <router-link :to="item.path" v-if="item.path !== ''">{{item.title}}</router-link>
        <span v-else>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ['breadcrumbList']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.breadcrumb{
  ul{
    li{
      display: inline-block;
      background-color:$gray-color;
      margin-right: 8px;
      font-size:$xs-size;
      height:21px;
      line-height: 21px;
      color:$text-gray-color;
      position: relative;
      padding:0 8px 0 12px;
      a{
        color:$text-gray-color;
      }
      &::after{
        content: '';
        position: absolute;
        right: -16px;
        top: 0px;
        @include triangle-right(10px, 8px, $gray-color);
      }
      &::before{
        content: '';
        position: absolute;
        left: -2px;
        top: 0px;
        @include triangle-right(10px, 8px, #fff);
      }
    }
  }
}
</style>
