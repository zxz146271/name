<template>
    <div>
      <div class="insert" >
        <el-col class="insert-tit">组件</el-col>
        <el-row class="chunkpra">
          <el-col class="chunk" >
            <span @click="chunk('text')">文本</span>
          </el-col>
          <el-col class="chunk" >
            <span @click="chunk('image')">图片</span>
          </el-col>
          <!-- <el-col class="chunk" >
            <span @click="chunk('video')">视频</span>
          </el-col> -->
        </el-row>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {

  },
  props: ['index'],
  methods: {
    chunk(type) {
      this.$emit('insertChunk', type)
    },
  },
  props:['block','index', 'uuId'],
}
</script>

<style scoped>
/* 文本 */
.insert {
  width: 373px;
  height: 109px;
  background: #fbfbfb;
  border-right: 1px solid #d9d9d9;
  border: 1px solid #d9d9d9;
  position: relative;
  position: absolute;
  left: 500px;
  top: 200px;
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
.chunk span{
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
}

</style>
