<template>
    <div class="conent" >
        <div class="con_item" v-if = "conent && conent.length>0" v-for = "(item, index) in conent" :key = 'index'>
          <img :src="item.photoUrl" class="img" alt="">
          <div class="content">
            <div class="title"> {{item.contentType | contentType }}{{item.headline}}</div>
            <div class="code">内容编号：{{item.contentId}}</div>
            <div class="source">来源：{{item.sourceType | sourceType}}{{item.source}}</div>
          </div>
          <div class="tagWrapper labelTag">
              标签:
              <div class="tag">
                <el-tag
                    :key="tag.labName"
                    v-for="tag in item.labelList"
                    closable
                    type="warning"
                    :disable-transitions="false"
                    @close="handleClose(tag.id)">
                    {{tag.labName}}
                </el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible[index]"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(index, item.contentId)"
                    >
                </el-input>
                <el-button v-else style="margin-left:0;" class="button-new-tag" size="small" @click="showInput(index)">+ 添加</el-button>
              </div>
            </div>
          <div class="dateWrapper">
            <div class="date">创建时间：{{item.createTime | time}}</div>
            <div class="date">修改时间：{{item.modifyTime | time}}</div>
            <div class="date" v-if = "allClassType.typeClass == 3">查看人数：{{item.watchPeopleNum}}</div>
          </div>
          <div class="actionContent" v-if = "contype[0] == 1 && contype[1] == 1" @click="del(item.contentId)">
            <img src="/static/image/down.png" alt="">
            <span class="txt" >在当前门店下架</span>
          </div>
          <div class="actionContent" v-if = "contype[0] == 1 && contype[1] == 2" @click="del(item.contentId)">
              <img src="/static/image/up.png" alt="">
              <span class="txt" >在当前门店上架</span>
          </div>
          <div class="actionContent" v-if = "contype[0] == 2 && contype[1] == 1 && item.contentType != 'minivideo'">
            <span class="action hasBorder" @click="copytoStore(item)">复制到品牌</span>
            <span class="action hasBorder" @click="edit(item)">编辑</span>
            <span class="action"  @click="del(item.contentId)">删除</span>
          </div>
          <div class="actionContent" v-if = "contype[0] == 2 && contype[1] == 1 && item.contentType == 'minivideo'">
            <span class="action hasBorder" @click="copytoStore(item)">复制到品牌</span>
            <span class="action"  @click="del(item.contentId)">删除</span>
          </div>
          <div class="actionContent" v-if = "contype[0] == 2 && contype[1] == 2 && item.contentType != 'minivideo'">
            <span class="action hasBorder" @click="edit(item)">编辑</span>
            <span class="action" @click="del(item.contentId)">删除</span>
          </div>
          <div class="actionContent" v-if = "contype[0] == 2 && contype[1] == 2 && item.contentType == 'minivideo'">
            <span class="action" @click="del(item.contentId)">删除</span>
          </div>
          <div class="actionContent" v-if = "contype[0] == 2 && contype[1] == 3">
            <span class="action hasBorder" @click="edit(item)">编辑</span>
            <span class="action"  @click="del(item.contentId)">放回原处</span>
          </div>
        </div>
        <div class="noData" v-else><img src="/static/image/kong_img@3x.png" alt=""></div>
    </div>
</template>
<script>
import {getStore, setStore, removeStore} from '../../tool/Utils'

export default {
  data () {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: [],
      inputValue: ''
    }
  },
  props: {
    conent: Array,
    contype: Array, // [1.上下架、 2.复制到品牌、编辑、删除, 1.复制到品牌、2.编辑、3.放回原处]
    allClassType: Object,
    contentType: String
  },
  watch: {
    conent (ev) {
      // console.log("监听数据======================", ev)
    },
    allClassType (n) {
      this.allClassType = n
    },
    inputVisible (n) {
      this.inputVisible = n
    }
  },
  methods: {
    handleClose (tag) {
      let params = {id: tag}
      this.$api.deleteTag(params).then(res => {
        if (res.code === 0) {
          this.$emit('delTag')
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showInput (index) {
      this.$set(this.inputVisible, index, true)
      this.$nextTick(_ => {
        // this.$refs.saveTagInput.$refs.input.focus();
      })
    },
    handleInputConfirm (index, contentId) {
      let inputValue = this.inputValue
      if (inputValue) {
        if (inputValue.trim() === '' || inputValue.trim() === undefined || inputValue.length > 16) {
          this.$message.error('标签名称不符合规则')
          return
        }
        let params = {
          labObjId: contentId,
          labType: 'NR',
          labName: inputValue,
          markType: 'DY',
          distributorId: getStore('distributorId')
        }
        this.$api.addSave(params).then(res => {
          if (res.code === 0) {
            this.$emit('addTag')
            // this.$props.conent[index].labelList = [...this.$props.conent[index].labelList, {labName: inputValue}]
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.error('标签内容不能为空')
      }
      this.$set(this.inputVisible, index, false)
      this.inputValue = ''
    },
    edit (item) {
      let typeClass = this.$props.allClassType.typeClass
      if (typeClass === 1) {
        switch (item.contentType) {
          case 'case':
            this.$router.push({path: `/mine/countAllofme/editDetail`, query: {contentId: item.contentId, typeClass: typeClass}})
            break
          case 'article':
            this.$router.push({path: `/mine/countAllofme/editArticles`, query: {contentId: item.contentId, typeClass: typeClass}})
            break
          case 'atlas':
            this.$router.push({path: `/mine/countAllofme/editPhotoAlbum`, query: {contentId: item.contentId, typeClass: typeClass}})
            break
          default:
            this.$router.push({path: `/mine/countAllofme/editPanorama`, query: {contentId: item.contentId, typeClass: typeClass}})
            break
        }
      } else {
        switch (item.contentType) {
          case 'case':
            this.$router.push({path: `/store/editDetail`, query: {contentId: item.contentId, typeClass: typeClass}})
            break
          case 'article':
            this.$router.push({path: `/store/editArticles`, query: {contentId: item.contentId, typeClass: typeClass}})
            break
          case 'atlas':
            this.$router.push({path: `/store/editPhotoAlbum`, query: {contentId: item.contentId, typeClass: typeClass}})
            break
          default:
            this.$router.push({path: `/store/editPanorama`, query: {contentId: item.contentId, typeClass: typeClass}})
            break
        }
      }
    },
    copytoStore (item) {
      console.log(item)
      this.$emit('copytoStore', item)
    },
    del (cnotnetId) {
      this.$emit('del', cnotnetId)
    },
    setFlag () {
      let content = this.$props.conent
      let flags = []
      content.forEach(element => {
        flags.push(false)
      })
      this.inputVisible = flags
    }
  },
  mounted () {
    // console.log("内容-----------------", this.$props.contype)
    // this.contype = ['复制到品牌', '编辑', '删除']
    this.setFlag()
  },
  filters: {
    contentType (v) {
      switch (v) {
        case 'case':
          return '【案例】'
        case 'article':
          return '【文章】'
        case 'atlas':
          return '【图册】'
        case 'panorama':
          return '【全景图】'
        default:
          return '【小视频】'
      }
    },
    sourceType (v) {
      switch (v) {
        case 'personal':
          return '【个人】'
        case 'store':
          return '【经销商】'
        default:
          return '【其它】'
      }
    },
    time (str) {
      if (str) {
        let time = str.substring(0, str.length - 3)
        return time
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.conent{
    margin:0 32px;
    overflow: hidden;
    .con_item{
      position: relative;
      width: 100%;
      height: 163px;
      display: flex;
      margin-top: 24px;
      border:1px solid rgba(233,233,233,1);
      .img{
        width: 163px;
        height: 163px;
        display: block;
        min-width: 163px;
      }
      .content{
        width: 31%;
        height: 163px;
        margin: 0 24px;
        .title{
          width: 100%;
          margin-top: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height:24px;
          font-size:16px;
          font-family:Source Han Sans SC;
          font-weight:500;
          line-height:24px;
          color:rgba(0,0,0,0.85);
        }
        .code{
          width: 100%;
          margin-top: 16px;
          height:20px;
          font-size:14px;
          font-family:Source Han Sans SC;
          font-weight:400;
          line-height:22px;
          color:rgba(0,0,0,0.45);
          opacity:1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .source{
          width: 100%;
          margin-top: 8px;
          height:20px;
          font-size:14px;
          font-family:Source Han Sans SC;
          font-weight:400;
          line-height:22px;
          color:rgba(0,0,0,0.45);
          opacity:1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .dateWrapper{
        // width: 200px;
        height: 163px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding-left: 40px;
        box-sizing: border-box;
        .date{
          width:200px;
          height:20px;
          font-size:14px;
          font-family:Source Han Sans SC;
          font-weight:400;
          line-height:22px;
          color:rgba(0,0,0,0.45);
          margin-top: 8px;
        }
        &>.date:nth-child(1){
          margin-top: 15px;
        }
      }
      .actionContent{
        position: absolute;
        right:32px;
        flex: 1;
        // margin: 0px 32px;
        height: 163px;
        display: flex;
        align-items: center;
        justify-content: center;
        .txt{
          cursor: pointer;
        }
        .action{
          cursor: pointer;
          padding: 0 8px;
          height:20px;
          font-size:14px;
          font-family:Source Han Sans SC;
          font-weight:400;
          line-height:22px;
          color:rgba(253,67,67,1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hasBorder{
          border-right: 1px solid rgba(216,216,216,1);
        }
        img{
            width: 24px;
            height: 22px;
            margin-right: 10px;
            cursor: pointer;
        }
      }
      .tagWrapper{
        position: absolute;
        bottom:10px;
        left: 187px;
        display: flex;
        flex-direction: row;
        line-height: 32px;
        font-size:14px;
        color:rgba(0, 0, 0, 0.45);
        .tag{
          margin-left:10px;
        }
        .el-tag + .el-tag {
            margin-left: 10px;
        }
        .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
        }
      }
    }
    .noData{
      width: 100%;
      height: 100%;
      position: relative;
        image{
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: block;
          margin: auto;
        }
    }
}

</style>
