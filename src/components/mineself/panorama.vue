<template>
    <div class="panorama-box">
        <div class="operate">
            <h2>从酷家乐选择</h2>
            <span @click="goBack">返回</span>
        </div>
        <div class="conent">
            <div class="con_item" v-for = "(item, index) in content" :key = "index" @click="selectpanorama(index, item.designId)">
                <div class="head_img">
                    <img :src="item.coverPic" alt="">
                    <!-- <span>含{{item.imgnum}}张</span> -->
                </div>
                <p class="title">{{item.name}}</p>
                <p class="id">ID:{{item.designId}}</p>
                <div class="note">
                    <!-- <span>方案含{{item.imgnum}}张全景图</span> -->
                    <span @click="selectpanorama(index, item.designId)" :class="item.checked ? 'active' : ''">选择一张全景图<em></em></span>
                </div>
            </div>
        </div>
        <!-- 选择全景图 -->
        <el-dialog
            title="选择全景图"
            :visible.sync="centerDialogVisible"
            width="400px"
            center
            :size="400">
            <div class="contains-list">
               <div class="lit-top">
                    <p class="lit-tit">主题主题</p>
                </div>
                <div class="goods">
                    <div class="goodslist" v-for="(item, index) in DoorImg.data" :key="index">
                        <div class="boximg"><img :src="item.img" alt=""></div>
                        <el-row class="boxtit">
                            <el-col :span="24" class="eltit">房间名称：{{item.roomName}}</el-col>
                            <el-col :span="24" class="eltit">渲染图ID：{{item.picId}}</el-col>
                            <el-col :span="24" class="eltit">全景图链接:{{item.panoLink}}</el-col>
                        </el-row>
                        <el-button :class="item.checked ? 'btn cur' : 'btn'" @click = "selectedimg(index, item)" >选择此图</el-button>
                    </div>

                </div>
            </div>
            <span slot="footer" class="dialog-footer">
               <el-button @click="centerDialogVisible = false" class="cancel">返 回</el-button>
            </span>
        </el-dialog>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count">
        </el-pagination>
    </div>
</template>
<script>
export default {
  data () {
    return {
        loading: false,
        centerDialogVisible: false,
        content: {}, //  酷家乐列表数据
        DoorImg:[], // 户型图列表
        current:1,  //  列表当前页数
        count: 0, // 列表总数
        pageSize: 100,  // 列表每页个数
        DoorCurrent: 1,
        DoorCount: 1000,
        DoorPageSize: 100,
        num: 0
    }
  },
  mounted(){
      this.getCool()
  },
  methods: {
    //   获取酷家乐数据
    getCool() {
        let params = {
            start: this.current,
              num: this.pageSize
        }
        this.$api.coolDesignList(params).then(res => {
            if (res.code === 0) {
                this.count = res.data.count
                this.content = res.data.result
            } else {
            
            }
        })
    },
    // 获取选择的户型图片
    getDoorImg(designId) {
        let params = {
            designId: designId,
            startTime: null,
            start: this.DoorCurrent,
            num: this.DoorPageSize
        }
        this.$api.coolRenderpicList(params).then(res => {
            if (res.code === 0) {
                this.DoorImg = res
            } else {
            
            }
        })
    },
    // 选择全景图弹框
    selectpanorama (index, designId) {
      this.centerDialogVisible = true
      this.content.forEach(item => {
          item.checked = false
      })
      this.content[index].checked = true
      this.num = index
      this.getDoorImg(designId)
    },
    // 确认选定图片
    selectedimg (index, item) {
        this.centerDialogVisible = false
        this.DoorImg.data.forEach(item => {
            item.checked = false
        })
        this.$set(this.DoorImg.data[index], `checked`, true)
        this.$emit('getCoolImg', item)
    },
    goBack() {
        this.$emit("goBack")
    },
    handleSizeChange(val) {
        this.pageSize = val
        this.getCool()
    },
    handleCurrentChange(val) {
        this.current = val
        this.getCool()
    }
  }
}
</script>
<style lang="scss" scoped>
.operate{
    padding:0 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 15px 0;
}
.operate h2{
    font-size: 20px;
    font-weight:400;
    line-height:32px;
}
.operate span{
    display: inline-block;
    padding: 0 25px;
    color: #FE4343;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    border-radius: 4px;
    border:1px solid rgba(217,217,217,1);
    cursor: pointer;
}
.search{
   margin-top: 15px;
}
.container{
   margin-bottom: 25px;
}
.contain-top{
   padding: 17px 32px;
}
.contain-tit{
   color: #A7A7A7;
   font-size: 14px;
}
.itc{
   margin: 0 12px;
}
h3{
   color: #000000;
   font-size: 20px;
   line-height: 60px;
}
.contain-sear{
   display: flex;
   justify-content: space-between;
}
.conent{
    margin:0 24px;
    overflow: hidden;
    display: flex;
    flex-wrap:wrap;
    justify-content:space-around;
    .con_item{
        width: 266px;
        height: 258px;
        overflow: hidden;
        padding-bottom:24px;
        margin-bottom:14px;
        border:1px solid rgba(233,233,233,1);
        -webkit-border-radius:2px;
        -moz-border-radius:2px;
        -ms-border-radius:2px;
        -o-border-radius:2px;
        border-radius:2px;
        .head_img{
            width: 266px;
            height: 160px;
            margin-bottom: 10px;
            overflow: hidden;
            text-align: center;
            position: relative;
            img{
                width: 100%;
            }
            span{
                position: absolute;
                right: 5px;
                bottom:5px;
                display: block;
                width: 73px;
                height: 26px;
                text-align: center;
                line-height: 26px;
                border:1px solid rgba(233,233,233,1);
                background:rgba(0, 0, 0, 0.5);
                -moz-border-radius:15px;
                -ms-border-radius:15px;
                -o-border-radius:15px;
                -webkit-border-radius:15px;
                border-radius:15px;
                color: #ffffff;
                font-size: 14px;
            }
        }
        p{
            padding-left:18px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            line-height: 24px;
            &.title{
                margin-right:10px;
                font-size: 16px;
                color: rgba(0, 0, 0, 0.85);
            }
            &.id{
                font-size: 14px;
                color: rgba(0, 0, 0, 0.45);
            }
        }
        .note{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 8px 10px 0 18px;
            font-size: 12px;
            color:rgba(0, 0, 0, 0.45);
            & span:nth-child(1){
                color: #262626;
                cursor: pointer;
            }
            & span:nth-child(2){
                color: #262626;
                cursor: pointer;
            }
            span.active{
                color: #FE4343;
            }
        }
    }
}
.contains-list{
    height: 450px;
    overflow: auto;
    padding: 25px 0 0 36px;
}
.lit-top{
    width: 89%;
    margin: 24px 0 10px 0;
    position: relative;
    position: absolute;
    top: 30px;
    left: 30px;
    border-top:1px dashed #C0C4CC;
    padding: 20px 0 0 6px;
    z-index: 10;
}
.lit-bottom{
    margin: 24px 0 10px 0;
    position: relative;
    padding: 30px 0 0 0;
}
.lit-box{
    display: inline-block;
    width:7px;
    height:7px;
    background:#AAAAAA;
    border-radius:50%;
    position: absolute;
    top: 28px;
}
.litt-box{
    display: inline-block;
    width:7px;
    height:7px;
    background:#AAAAAA;
    border-radius:50%;
    position: absolute;
    top: 37px;
}
.lit-tit{
    color: #909399;
    height: 27px;
    line-height: 20px;
}
.boximg{
    width: 90px;
    height: 90px;
    overflow: hidden;
    border-radius: 2px;
}
.boximg img{
    width: 100%;
    height: 100%;
} 
.boxtit{
    // padding-left:92px;
    width: 70%;
    color: #606266;
    position: relative;
}
.eltit{
    // width: 280px;
    padding: 1px 5px;
}
.goodslist{
    margin-bottom: 20px;
    position: relative;
    display: flex;
    flex-direction: row;
}
.btn{
    position: absolute;
    top: 23px;
    right: 36px;
    z-index: 10;
}
.btn:hover{
    color: #FE4343;
    border:1px solid #FE4343;
}
.cur{
    color: #FE4343;
    border:1px solid #FE4343;
}

</style>
