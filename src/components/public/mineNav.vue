<template>
  <div class="mine-nav">
    <ul v-if = "$route.path != '/mine/coolKnorr' ">
      <li>
        {{$route.matched[0].name}}
      </li>
      <li>
        <span class="itc">/</span>{{$route.matched[1].name}} 
      </li>
      <li v-if="$route.matched.length > 2">
        <i class="el-icon-arrow-right next-icon"></i>{{$route.matched[2].name}}
      </li>
    </ul>
    
    <!-- <allclass :allClassType = "allClassType"></allclass> -->
  </div>
</template>
<script>
import search from "@/components/public/search";
import allclass from "@/components/header/allclass";
export default{
  data () {
    return {
        loading:false,
        allClassType:{typeClass:1,typeBtn:1}
    }
  },
  computed: {
        topArr1 () {
            this.topArr = this.topArr.toString()
            return this.topArr
        }
  },
  props: ['topArr', 'topName'],
  components: {
    search,
    allclass    
  },
  mounted() {
    //   console.log(this.$route.matched,this.$route.path);
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';

.mine-nav{
    padding:16px 32px 0 32px;
    ul{
        font-size: 14px;
        // color:rgba(0, 0, 0, 0.45);
        color:#606266;
        li{
            display: inline-block;
            .itc{
                margin:0 10px;
            }
        }
    } 
}
</style>
