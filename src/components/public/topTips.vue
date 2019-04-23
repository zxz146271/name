<template>
  <div class="top-tips" ref="topTips">
    <span>{{title.title}}
      <slot name="refund"></slot>
      <span class="small-title">{{title.text}}</span>
    </span>
    <span v-if="title.unfold" class="unfold fright" @click="unflod">
      <span v-if="active"><i class="el-icon-arrow-up"></i>收起</span>
      <span v-else><i class="el-icon-arrow-down"></i>展开</span>
    </span>
    <span class="fright edit"><slot name="edit"></slot></span>
    <span class="fright check edit"><slot name="checkbox"></slot></span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: false
    }
  },
  methods: {
    unflod () {
      this.active = !this.active
      this.$emit('showList', this.active)
      this.$emit('thisRef', this.$refs.topTips, this.active)
    }
  },
  props: ['title']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.top-tips{
  background-color: $gray-color;
  height:44px;
  padding:11px 16px;
  .small-title{
    margin-left: 15px;
    font-size: $xs-size;
    color: $text-red-color;
  }
  .unfold{
    border:0;
    background-color: $gray-color;
    font-size: $xs-size;
    cursor: pointer;
    color:$text-gray-color;
    &:hover{
      color:$main-color;
    }
    i{
      margin-right: 4px;
    }
  }
  .fright{
    float: right;
    &.edit{
      position: relative;
      bottom: 9px;
    }
    &.check{
      bottom: 2px;
    }
  }
}
</style>
