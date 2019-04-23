<template>
  <div class="contains-box">
    <img src="../../../static/image/details.png" alt class="imag">
    <span class="positioning">{{creatArticles}}详情</span>
    <div class="bigbox">
      <!-- <div class="essential">
        <el-row class="elbox">
          <el-col class="infor">基本信息区</el-col>
          <el-col class="infor">固定样式、显{{creatArticles}}图，标题等信息</el-col>
        </el-row>
      </div> -->
      <div class="casesbox">
        <div class="casesbox-in">
          <div class="top-title">
            <el-row class="title-box">
              <el-col class="title">{{title || '无标题'}}</el-col>
              <el-col class="time">{{time}}</el-col>
            </el-row>
          </div>
          <div class="cases">
            <el-row class="casebox" v-if="showinfor==false?false:true">
              <!-- v-if="detailJson.blocks && detailJson.blocks.length > 0"  这句话在casebox标签内 -->
              <el-col class="infor speinfor">{{creatArticles}}详情区</el-col>
              <el-col class="infor">插入下列组件，进行编辑</el-col>
            </el-row>
            <div style="width:100%;height:10px;"></div>
            <detailCell ref="detailCell" v-for="(item,index) in detailJson.blocks" :a="index" :key="index"  :block="item"  :detailnum="detailnum" :besttype="item.type" v-on:success="success" @showInsert="showInsert" @showEdit="showEdit(item,index)" @insertChunk='chunk' @closeEdit="closeEdit"></detailCell>
          </div>
        </div>
      </div>
    </div>
    <div class="insert">
      <el-col class="insert-tit">组件</el-col>
      <el-row class="chunkpra">
        <el-col class="chunk">
          <span @click="chunk('text')">文本</span>
        </el-col>
        <el-col class="chunk">
          <span @click="chunk('image')">图片</span>
        </el-col>
        <el-col class="chunk">
          <span @click="chunk('video')">视频</span>
        </el-col>
      </el-row>
    </div>
    <edit  v-if="isShowEdit" :block="curEditItem" :index="curEditIndex" @textChange="textChange" @imageChange="imageChange" @closeEdit="closeEdit" @success="success" :uuid="uuId" @moveUp="moveUp" @moveDown="moveDown" @videoChange="videoChange"/>
    <insertEdit v-if="isShowInsert" @insertChunk="chunk"/>
  </div>
</template>

<script type="text/ecmascript-6">
import detailCell from "../../components/detailEdit/detailCell";
import edit from "../../components/detailEdit/edit";
import insertEdit from "../../components/detailEdit/insertEdit";

export default {
  name: "",
  data() {
    return {
      label: '',
      showinfor: true,
      besttype:"",
      detailnum: false,
      isShowEdit: false, //展示编辑栏
      curEditItem: {}, //当前编辑
      curEditIndex: 0, //当前编辑Index
      isShowInsert: false, //上下插入
      insertIndex: 0, //插入index
      insertPosition: 0, //插入位置
      time: '2018-10-10',
    };
  },
  props: ["detailJson", "creatArticles", "uuId", "title"],
  components: {
    detailCell,
    edit,
    insertEdit
  },
  watch: {
    // 无编辑框时,显示提示
    'detailJson.blocks':function (val) {
      if (val.length<=0) {
        this.showinfor = true
      }
    },
    detailJson: {
      handler (newV, oldV) {
        if (newV.blocks.length >0) {
          console.log(newV)
           this.detailnum = true
           this.showinfor = false
        }
      },
      deep: true
    },
    uuId (v) {
      console.log(v)
    }
  },
  mounted () {
    this.time = this.getNowFormatDate()
  },
  methods: {
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
                console.log()
        return currentdate;
    },
    videoChange (v,i) {
      this.detailJson.blocks[i] = v
      console.log(this.detailJson.blocks[i])
    },
    moveUp (i) {
      if (i === 0) {
        return
      }
      let temp = this.detailJson.blocks[i]
      this.detailJson.blocks.splice(i,1)
      this.detailJson.blocks.splice(i-1, 0, temp)
      this.curEditItem = this.detailJson.blocks[i-1]
      this.showEdit(this.curEditItem,i-1)
    },
    moveDown (i) {
      if (i === this.detailJson.blocks.length-1) {
        return
      }
      let temp = this.detailJson.blocks[i]
      this.detailJson.blocks.splice(i,1)
      this.detailJson.blocks.splice(i+1, 0, temp)
      this.curEditItem = this.detailJson.blocks[i+1]
      this.showEdit(this.curEditItem,i+1)
    },
    showInsert (i,p) {
      this.isShowInsert = true
      this.insertIndex = i
      this.insertPosition = p
    },
    closeEdit () {
      this.isShowEdit = false
    },
    textChange (v,i) {
      this.detailJson.blocks[i].content = v
    },
    imageChange (v,i) {
      this.detailJson.blocks[i].content = v
    },
    showEdit (item,index) {
      this.isShowEdit = false
      this.curEditItem = item
      this.curEditIndex = index
      this.$nextTick(() => {
        this.isShowEdit = true
      })
      this.isShowInsert = false
    },
    chunk(type) {
      var self = this;
      self.type = type;
      if (type == "text") {
        let defaultText = { 
          type: "text",
          content: {
            text: "",
            color: "#000000",
            size: "14",
            align: "left",
            weight: "normal"
          }
        }
        let cursorIndex = 0
        if (this.insertPosition && this.insertPosition!=0) {
          if (this.insertPosition === -1) {
            cursorIndex = this.insertIndex
            this.detailJson.blocks.splice(this.insertIndex,0,defaultText)
          }else if (this.insertPosition === 1) {
            cursorIndex = this.insertIndex+1
            this.detailJson.blocks.splice(this.insertIndex+1,0,defaultText)
          }
        }else{
          this.detailJson.blocks.push(defaultText);
          cursorIndex = this.detailJson.blocks.length-1
        }
        console.log(cursorIndex)
        self.showinfor = false;
        self.showEdit(this.detailJson.blocks[cursorIndex],cursorIndex)
        self.detailnum = true;//点击文本-，让对应的组件出现
        // //点击文本，内容出现besttype变为text
        // self.besttype="text";
      }
      if (type == "image") {
        let defaultImage = {
          type: "image",
          content: {
            image: "",
            radius: "0"
          }
        }
        let cursorIndex = 0
        if (this.insertPosition && this.insertPosition!=0) {
          if (this.insertPosition === -1) {
            cursorIndex = this.insertIndex
            this.detailJson.blocks.splice(this.insertIndex,0,defaultImage)
          }else if (this.insertPosition === 1) {
            cursorIndex = this.insertIndex+1
            this.detailJson.blocks.splice(this.insertIndex+1,0,defaultImage)
          }
        }else{
          this.detailJson.blocks.push(defaultImage);
          cursorIndex = this.detailJson.blocks.length-1
        }
        self.showinfor = false;
        let index = this.detailJson.blocks.length-1
        self.showEdit(this.detailJson.blocks[cursorIndex],cursorIndex)
        self.detailnum = true;//点击图片-，让对应的组件出现
        // self.besttype="image";
      }
      if (type == "video") {
        let defaultVideo = {
          type: "video",
          status: "ready",
          coverUrl:'',
          content: {
            poster: "",
            mp4: ""
          }
        }
        let cursorIndex = 0
        if (this.insertPosition && this.insertPosition!=0) {
          if (this.insertPosition === -1) {
            cursorIndex = this.insertIndex
            this.detailJson.blocks.splice(this.insertIndex,0,defaultVideo)
          }else if (this.insertPosition === 1) {
            cursorIndex = this.insertIndex+1
            this.detailJson.blocks.splice(this.insertIndex+1,0,defaultVideo)
          }
        }else{
          this.detailJson.blocks.push(defaultVideo);
          cursorIndex = this.detailJson.blocks.length-1
        }
        self.showinfor = false;
        let index = this.detailJson.blocks.length-1
        self.showEdit(this.detailJson.blocks[cursorIndex],cursorIndex)
        self.detailnum = true;//点击视频-，让对应的组件出现
        // self.besttype="video";
      }
      console.log(this.detailJson);
    },
    success(res){
      // this.detailnum=res;
      console.log("关闭关闭------", res, this.detailJson)
      this.detailJson.blocks.splice(res,1);
      this.isShowEdit = false
      // this.detailJson.blocks.splice(res,0);
      console.log('res=',res)
      console.log(this.detailJson.blocks)

    }
  }
};
</script>

<style scoped>
.contains-box{
  box-sizing: border-box;
  padding-left: 101px;
}
.top-title{
  width: 100%;
  background-color: #fff;
}
.top-title .title-box{
  display: flex;
  align-items: center;
  flex-direction:column; 
  
}
.top-title .title{
  width: 287px;
  font-size: 22px;
  line-height: 30px;
  font-weight: bold;
  text-align: center;
  color: #333;
  padding: 15px 15px 0;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  word-break: break-all; 
}
.top-title .time{
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  color: #999;
  padding-top: 8px;
  padding-bottom: 15px;
  }
/* //////////样式开始 */
.positioning {
  position: absolute;
  top: 30px;
  left: 242px;
  font-weight: 600;
  font-size: 18px;
}

.preservation {
  margin-left: 24px;
}

.presebox {
  padding: 23px 0;
}

.brand {
  padding-top: 23px;
}

.preser {
  margin-left: 8px;
  margin-right: 8px;
  position: absolute;
  top: 3px;
  left: 32px;
}

.preserlist {
  margin-left: 8px;
  margin-right: 8px;
}

.thelabeler {
  margin-left: 8px;
  margin-right: 8px;
  position: absolute;
  top: 12px;
  left: 17px;
}

.prese {
  margin-left: 8px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.el-tag {
  background-color: #fcf6eb;
  color: #e7a35e;
  border: 1px solid #f7e5c8;
}

.el-tag .el-icon-close {
  color: #000000;
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
.casesbox{
  width: 400px;
  padding-bottom: 35px;
  overflow-y: scroll;
}
.casesbox-in{
  width: 375px;
  height: auto;
  min-height: 400px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  background-color: #fff;
}
.cases {
  width: 100%;
  height: 400px;
  padding:10px 0 20px 0;
  /* border-bottom: 1px dashed #d9d9d9; */
  /* background-color: #fff; */
  /* overflow-y:scroll;
  overflow-x:visible; */
}

.el-icon-plus {
  border: 1px dashed #d9d9d9;
}


.uploadsimg {
  padding-left: 24px;
  margin-bottom: 20px;
  position: relative;
}

.shareredio {
  padding-left: 24px;
  position: relative;
}

.el-select {
  width: 236px;
  display: inline-block;
}

.el-icon-star-off {
  color: #b5b5b5;
  margin-left: 20px;
}

.bush {
  color: #b5b5b5;
  margin-left: 4px;
}

.imag {
  width: 375px;
  transform: scale(1.01)
  /* margin-left: 88px; */
}

.bigbox {
  width: 375px;
  /* min-height: 603px; */
  background-color: #f9f9f9;
  /* margin-left: 89px; */
  margin-top: -7px;
  /* border: 1px solid rgba(217, 217, 217, 1); */
  /* margin-bottom: 10px; */
  position: relative;
}

.essential {
  height: 120px;
  border-bottom: 1px dashed #d9d9d9;
}

.elbox {
  width: 260px;
  margin: 0 auto;
  text-align: center;
  color: #dcdcdc;
  padding-top: 35px;
}

.infor {
  height: 30px;
}
/* 点击文字等之后边框变红色 */
.casesactive {
  border-top: 1px dashed #fe4343;
  border-bottom: 1px dashed #fe4343;
}
.casebox {
  width: 260px;
  /* height: 180px; */
  margin: 0 auto;
  margin-bottom: 10px;
  text-align: center;
  color: #dcdcdc;
  padding-top: 60px;
}

.speinfor {
  color: #262626;
}

.blank {
  height: 226px;
  border-bottom: 1px solid #d9d9d9;
}
/* 文本 */
.insert {
  width: 375px;
  height: 77px;
  background: #fff;
  border: 1px solid #d9d9d9;
  /* position: absolute; */
  /* bottom: 0; */
}
.insert-tit {
  height: 33px;
  line-height: 33px;
  margin-left: 25px;
  color: #262626;
  font-size: 14px;
}
.chunkpra {
  width: 100%;
  display: flex;
  justify-content: space-around;
  cursor: pointer;
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
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
