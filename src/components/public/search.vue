<template>
  <div class="search">
    <div class="search-in">
      <i class="icon-search"></i>
      <input type="text" v-model="searchValue" placeholder="输入关键词搜索" @keyup.enter="search">
      <el-button type="primary" class="search-btn" @click="search"  :loading="load">{{load? '搜索中':'搜索'}}</el-button>
    </div>
    <!-- <el-button class="advanced-search" v-if="btnTitle === undefined">高级搜索</el-button> -->
    <el-button class="advanced-search" v-if="btnTitle!== undefined">{{btnTitle}}</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    search () {
      this.$emit('searchValue', this.searchValue)
    }
  },
  props: ['btnTitle', 'load']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.search{
    display: flex;
  .search-in{
    position: relative;
    width:345px;
    .icon-search{
      @include icon(12px,12px,'../../assets/image/icon/icon-search.png');
      position: absolute;
      top: 41%;
      left:10px;
      transform: translateY(-50%)
    }
    input[type='text']{
      border:1px solid $input-border-color;
      height:32px;
      border-radius: 4px;
      padding: 0 50px 0 30px;
      font-size: $xs-size;
      width:100%;
      &:focus{
        border-color:$main-color;
      }
    }
    .search-btn{
      width: 85px;
      padding: 9px 15px;
      position: absolute;
      right: 0;
      top: 0px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .advanced-search{
    padding: 8px 20px;
    margin-left: 5px;
  }
}
</style>
