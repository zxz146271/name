<template>
  <div class="left-condition">
    <ul>
      <li v-for="(item, index) in condition" :key="index" :class="{active:item.path===$route.path}" @click="chooseThis(index)">
        {{item.title}}
        <el-badge :value="item.num" :max="99" class="badge" v-if="item.num!==''" :class="{zero:item.num===0}">
        </el-badge>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      thisIndex: 0
    }
  },
  methods: {
    chooseThis (index) {
      this.thisIndex = index
      this.$emit('chooseThis', index)
    }
  },
  props: ['condition']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.left-condition{
  ul{
    li{
      font-size:$xs-size;
      cursor: pointer;
      padding: 8px 0;
      position: relative;
      display: flex;
      &:hover{
        color:$text-red-color;
      }
      &.active{
        color:$text-red-color;
        &::after{
          content: '';
          @include icon(14px,14px,'../../assets/image/icon/icon-radio.png');
          position: absolute;
          left:-22px;
          top:9px;
        }
      }
      .badge{
        margin-left: 4px;
        position: relative;
        bottom:2px;
      }
    }
  }
}
</style>
