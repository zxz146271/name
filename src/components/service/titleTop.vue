<template>
  <div class="title-top">
    {{text.type}}
  </div>
</template>
<script>
export default{
  data () {
    return {
    }
  },
  methods: {
  },
  props: ['text']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.title-top{
  color: $text-main-color;
  font-size: $detail-price-big-size;
  font-weight: 700;
  margin-top:20px;
  padding:30px 0;
  text-align: center;
  position: relative;
  &::before{
    content:"";
    display: block;
    width: 50px;
    height: 1px;
    background: $input-border-color;
    position: absolute;
    top:50%;
    left:50%;
    margin-left: -130px;
  }
  &::after{
    content:"";
    display: block;
    width: 50px;
    height: 1px;
    background: $input-border-color;
    position: absolute;
    top:50%;
    right:50%;
    margin-right: -130px;
  }
}
</style>
