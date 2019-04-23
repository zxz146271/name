<template>
    <div>
        <div class="tab">
            <h2>{{title}}</h2>
            <search :load="loading" @searchValue="searchValue"></search>
        </div>
    </div>
</template>
<script>
import search from '@/components/public/search'
export default {
  data () {
    return {
      loading: false
    }
  },
  props: {
    title: String
  },
  components: {
    search
  },
  methods: {
    searchValue (data) {
      console.log('data -- >' + data)
      this.$emit('searchValue', data)
    }
  }
}
</script>
<style lang="scss" scoped>
.tab{
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   margin:0 32px 14px 10px;
   h2{
      margin-top: 12px;
      color:rgba(0,0,0,0.85);
      font-size: 20px;
      font-weight:500;
      line-height: 28px;
      padding-left: 20px;
   }
}
</style>
