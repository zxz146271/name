<template>
  <div class="child-nav">
    <ul>
      <li v-for="(item, index) in navList" :key="index" :class="{active: $route.name === item.name}">
        <router-link :to="item.path">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default{
  data () {
    return {}
  },
  props: ['navList']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.child-nav{
    background: $child-nav-bg;
  ul{
    height:40px;
    width:500px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    li{
      line-height: 40px;
      text-align: center;
      display: inline-block;
      position: relative;
      margin: 0 20px;
      &:hover{
        a{
          color:$main-color;
        }
      }
      &.active{
        a{
          color:$main-color;
        }
        &::after{
          @include active-line;
        }
      }
      a{
        font-size:$xs-size;
        color:$child-nav-color;
        display: inline-block;
        position: relative;
        bottom: 2px;
      }
    }
  }
}
</style>
