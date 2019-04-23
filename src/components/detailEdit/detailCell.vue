<template>
  <div
    class="contains"
    @mouseenter="containenter()"
    @mouseleave="containleave()"
    v-if="detailnum">
    <detailText v-if="besttype == 'text'?true:false" :block="block" @showEdit="showEdit"/>
    <detailimage v-if="besttype == 'image'?true:false" :block="block"  @showEdit="showEdit"/>
    <detailVideo v-if="besttype == 'video'?true:false" :block="block"  @showEdit="showEdit"/>
    <!-- {{besttype}} -->
    <!-- {{block.type}} -->
    <!-- &&block.content.text   &&block.content.image    &&block.content.poster   -->
    <!-- 下加号 -->
    <div class="plus-box topplus" v-if="plusshow == true?true:false" @click="assembly">
      <i class="el-icon-circle-plus"></i>
    </div>
    <!-- 叉号 :a="a" -->
    <div class="plus-box centerplus" v-if="plusshow == true?true:false">
      <i class="el-icon-error" @click="botplusclick"></i>
    </div>
    <!-- 上加号 -->
    <div class="plus-box botplus" v-if="plusshow == true?true:false">
      <i class="el-icon-circle-plus" @click="botaddplusclick"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import detailText from "../../components/detailEdit/detailText";
import detailimage from "../../components/detailEdit/detailImage";
import detailVideo from "../../components/detailEdit/detailVideo";
export default {
  props: ["a","b","block", "detailnum", "besttype"],
  name: "",
  data() {
    return {
      containborder: false,
      plusshow: false,
      position:'', //插入位置
    };
  },
  components: {
    detailText,
    detailimage,
    detailVideo
  },
  mounted () {
    console.log(this.block)
    console.log(this.detailnum)
  },
  watch: {
    block (v) {
      console.log(v)
    }
  },
  methods: {
    containenter() {
      this.plusshow = true;
    },
    containleave() {
      this.plusshow = false;
    },
    botplusclick() {
      this.$emit("success", this.a);
      // console.log("key=",this.a);
      // console.log("123");
    },
    botaddplusclick(){
      this.position = -1
      this.$emit('showInsert', this.a, this.position)
      this.$emit('closeEdit')
    },
    assembly(){
      this.position = 1
      this.$emit('showInsert', this.a, this.position)
      this.$emit('closeEdit')
    },
    showEdit () {
      this.$emit('showEdit',this.block,this.a)
    },
  }
};
</script>

<style scoped>
.contains {
  width: 373px;
  border: 1px dashed #d9d9d9;
  position: relative;
  -webkit-box-sizing: border-box;
  -ms-box-sizing:border-box;
  -ms-box-sizing:border-box;
  box-sizing: border-box;
}
.contain-border {
  border: 1px dashed #f00;
}
/* 当点击时，border出现 */
/* hover时候border变红色 并且出现两个加号一个叉号 */
.contains:hover{
  border: 1px dashed #f00;
}
.el-icon-circle-plus,
.el-icon-error {
  font-size: 21px;
  color: #fe4343;
}
.topplus {
  position: absolute;
  bottom: -11px;
  left: 171px;
  z-index: 100;
}
.centerplus {
  position: absolute;
  top: -11px;
  right: -10px;
  z-index: 100;
}
.botplus {
  position: absolute;
  top: -11px;
  left: 171px;
  z-index: 100;
  margin-bottom:30px;
}

/* 图标加号取消盒子的样式 */
.plus-box {
  width: 21px;
  height: 21px;
  background-color: #fff;
  border-radius: 50%;
}
/* 文本 */
.insert {
  width: 373px;
  height: 109px;
  background: #fbfbfb;
  border-right: 1px solid #d9d9d9;
  border: 1px solid #d9d9d9;
  position: relative;
  position: absolute;
  left: 398px;
  top: 0px;
  /* display: none; */
}
/* .insert {
  width: 373px;
  height: 77px;
  background: #fff;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
} */
.insert-tit {
  height: 45px;
  line-height: 45px;
  margin-left: 25px;
  color: #262626;
  font-size: 14px;
}
.chunkpra {
  width: 100%;
  display: flex;
  justify-content: space-around;
  cursor: pointer;
  margin-top: 10px;
}
.chunk {
  width: 97px;
  height: 30px;
  line-height: 30px;
  border: 1px dashed #e5e5e5;
  text-align: center;
  color: #666666;
  background-color: #f8f8f8;
  font-size: 14px;
}
</style>
