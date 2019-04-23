<template>
<div>
  <div v-if="haveTitle">
    <span v-if="haveTitle.type === '0'">注册得积分</span>
    <span v-if="haveTitle.type === '1'">购买得积分</span>
    <span v-if="haveTitle.type === '2'">评论得积分</span>
  </div>
  <div v-if="dateTitle">
    <span v-if="dateTitle.name === '0'">积分有效期</span>
    <span v-if="dateTitle.name === '1'">积分保护期</span>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
  },
  props: ['haveTitle', 'dateTitle']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
div{
  display: inline-block;
}
</style>
