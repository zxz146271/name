<template>
  <div class="content">
    <img src="../../../assets/image/succ.png" alt="">
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  created () {
    this.msg = this.$route.query.msg
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.content{
  border: 1px solid rgba(215, 215, 215, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0!important;
  img{
    margin: 0 0 20px 0;
  }
  p{
    color: #339900;
    font-size: 14px;
  }
}
</style>
