<template>
    <div>
      <textEdit v-if="type==='text'" :block="block" @textChange="textChange" @closeEdit="closeEdit" @success="success" @moveUp="moveUp" :index="index" @moveDown="moveDown"/>
      <imgEdit v-if="type==='image'" :block="block" :uuId="uuId" @imageChange="imageChange" @closeEdit="closeEdit" @success="success" @moveUp="moveUp" :index="index" @moveDown="moveDown"/>
      <videoEdit v-if="type==='video'" @videoChange="videoChange" @closeEdit="closeEdit" @success="success" :block="block"  :uuId="uuId" @moveUp="moveUp" :index="index" @moveDown="moveDown" :coverUrl="coverUrl" :mp4="mp4" :poster="poster"/>
    </div>
</template>

<script>
import textEdit from '../detailEdit/textEdit'
import imgEdit from '../detailEdit/imgEdit'
import videoEdit from '../detailEdit/videoEdit'
export default {
  data () {
    return {
      type:'',
      coverUrl: '',
      mp4: '',
      poster: ''
    }
  },
  mounted () {
    this.type = this.block.type
    this.coverUrl = this.block.coverUrl
    this.mp4 = this.block.content.mp4
    this.poster = this.block.content.poster
  },
  methods: {
    videoChange (c, m, p) {
      this.block.coverUrl = c
      this.block.content.mp4 = m
      this.block.content.poster = p
      let obj = this.block
      this.$emit('videoChange', obj, this.index)
    },
    moveUp () {
      this.$emit('moveUp', this.index)
    },
    moveDown () {
      this.$emit('moveDown', this.index)
    },
    textChange (v) {
      this.$emit('textChange',v,this.index)
    },
    imageChange (v) {
      this.$emit('imageChange', v,this.index)
    },
    closeEdit () {
      this.$emit('closeEdit')
    },
    success (v) {
      this.$emit('success',v)
    }
  },
  props:['block','index', 'uuId'],
  components:{textEdit, imgEdit, videoEdit}
}
</script>

<style>

</style>
