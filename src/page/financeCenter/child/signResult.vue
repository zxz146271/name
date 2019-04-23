<template>
  <div class="content" v-if="isSucc">
    <img src="../../../assets/image/succ.png" alt="">
    <p class="succ">签约成功</p>
  </div>
  <div class="content" v-else>
    <img src="../../../assets/image/no-sign.png" alt="">
    <p class="error" >签约失败: {{message}}</p>
  </div>
</template>
<script>
import { setStore } from '../../../tool/Utils'
export default {
  data () {
    return {
      message: '',
      isSucc: true,
      rps: {},
      signedValue: {}
    }
  },
  created () {
    this.getUrlQuery()
  },
  methods: {
    getUrlQuery () {
      console.log('this.$route.query', this.$route.query)
      console.log('this.$route.query.rps', this.$route.query.rps)

      this.rps = JSON.parse(this.$route.query.rps)
      console.log('this.rps', this.rps)
      this.signedValue = this.rps.signedValue
      console.log('this.rps.signedValue', this.rps.signedValue)
      if (this.rps.status === 'error') {
        console.log('失败进来了', this.rps.status)
        this.isSucc = false
        console.log('失败原因', this.rps.message)
        this.message = this.rps.message
      } else {
        console.log('服务成功进来了')
        if (this.signedValue.result === 'OK') {
          console.log('签约成功')
          this.isSucc = true
          setStore('contractNo', '1112233')
        } else {
          console.log('签约失败进来了')
          this.isSucc = false
          console.log('失败原因', this.signedValue.message)
          this.message = this.rps.message
        }
      }
    }
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
  .succ{
    color: #339900;
    font-size: 14px;
  }
  .error{
    color: #FD4343;
    font-size: 14px;
  }
}
</style>
