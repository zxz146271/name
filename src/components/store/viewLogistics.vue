<template>
   <div class="price-revision">
       <el-row v-for="(item,index) in ordernumber" :key="index">
          <el-col :span="24" class="order-num">订单编号：{{item.num}}</el-col>
      </el-row>
      <el-row v-for="(item,index) in storeSales" :key="index">
          <el-col :span="12" class="pric-com">物流公司：{{item.title}}</el-col>
          <el-col :span="12" class="pric-com">物流单号：{{item.num}}</el-col>
      </el-row>
      <el-row v-for="(item,index) in selftips" :key="index">
          <el-col :span="24" class="pric-com">收货信息：{{item.title}}</el-col>
          <el-col :span="24" class="tips-modify pric-com">{{item.num}}</el-col>
          <el-col :span="24" class="tips-modify pric-com">{{item.tips}}</el-col>
      </el-row>
      <!-- 物流信息 -->
             <div class="logistics">
                
                <div class="logisitics-count">
                    <div class="count-list" :class="item.status=='2' || item.status=='0' ?'':'count-listspe'" v-for="(item,index) in loglist" :key="index">
                        <div class="count-bgc count-bgcspe"  v-if="item.status=='0'?true:false">
                            <i class="el-icon-check"></i>
                        </div>
                        <!-- 订单交易成功 -->
                        <div class="count-bgc" v-if="item.status=='2'?true:false">
                            <i class="mysfont mys-tijiao_icon count-icon"></i>
                        </div>
                        <!-- 订单支付成功 -->
                        <div class="count-spot" v-if="item.status=='1'?true:false"></div>
                        <div :class="item.status=='2' || item.status=='0' ?'count-on':'on'"></div>
                        <div class="count-num">
                            <div class="count-sign">
                                <p class="count-txtone count-inline">{{item.title}}</p>
                                <p class="count-txtspe count-inline">{{item.num}}</p>
                            </div>
                            <p class="count-txttwo">{{item.time}}</p>
                        </div>
                    </div>
                </div>
        </div>
      <!-- 物流信息 -->
      <el-row class="edit">
         <el-button :span="12" class="know" @click="contact">知道了</el-button>
      </el-row>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: ["receivingDetail5"],
   name: '',
   data() {
       return {
        ordernumber: [
            { title: '订单编号',num:'26496686896387989885'}
        ],
        storeSales: [
            { title: '顺丰',num:'325697534986316999'}
            ],
        selftips: [
            { title: '小花',num:'13659786397',tips:'上海市浦东新区地铁站方圆十里路左拐右转进去即可到达'}
        ],
        // 物流信息
        fastmail:[
               {
               tit:'韵达快递',
               number:'726548967359468564'
            }
           ],
           loglist:[
               {
                   title:'订单交易成功',
                   time:'2019-01-09 16:48:39',
                   num:'',
                   status:0
               },
               {
                   title:'已签收，在上海浦东新区快递公司进行派件，派件员：张大大；',
                   time:'2019-01-04 16:48:39',
                   num:'15617732654',
                   status:1
               },
               {
                   title:'【上海】已揽件',
                   time:'2019-01-04 16:48:39',
                   num:'',
                   status:1
               },
               {
                   title:'订单打包完成',
                   time:'2019-01-04 16:48:39',
                   num:'',
                   status:1
               },
               {
                   title:'订单分拣完成',
                   time:'2019-01-03 16:48:39',
                   num:'',
                   status:1
               },
               {
                   title:'订单支付成功',
                   time:'2019-01-02 16:48:39',
                   num:'',
                   status:2
               },
               {
                   title:'订单提交成功',
                   time:'2019-01-02 16:48:39',
                   num:'',
                   status:2
               }
           ]
        // 物流信息
       }
   },
  components: {},
   // 物流信息
  methods:{
        clickBtn(e){
        //   console.log(e)
        //   console.log(e.target.dataset.order)
            // var aaa = e.target.dataset.order;
            // console.log(aaa)
            var self = this;
            // console.log(self.aaa, "hahahah")
            console.log(self.fastmail[0].number)
            wx.setClipboardData({
                // data: self.aaa,
                data: self.fastmail[0].number,

                success(res) {
                    console.log(res)
                    wx.showToast({
                        title: '复制成功',
                    });
                }
                
                
            })
      },
      contact(){
          console.log("123");
          this.$emit('success',false);
        //   let receivingDetail6 = this.msg;
        //   this.receivingDetail6=false;
      }
  }
   // 物流信息
}
</script>

<style scoped>
.revision-box{
   position: absolute;
   left: 10px;
   top: 17px;
}
.price-revision{
   padding: 0 34px;
   /* background-color: #F9F9F9; */
}
.revision-title{
   /* margin-bottom: 8px; */
   height: 50px;
   line-height: 50px;
   margin-left: 30px;
   color: #909399;
}
.revision-box{
   width: 7px;
   height: 7px;
   background-color: #AAAAAA;
   border-radius: 50%;
}
.edit{
   margin-top: 34px;
   margin-left: 260px;
}
.edit .edit-cancel{
   width:80px;
   height:35px;
   line-height: 35px;
   border:1px solid #C0C4CC;
   border-radius:4px;
   color: #C0C4CC;
   text-align: center;
   margin-left: 114px;
   cursor: pointer;
}
.edit .edit-binding{
   width:80px;
   height:35px;
   line-height: 35px;
   background:rgba(253,67,67,1);
   border-radius:4px;
   color: #fff;
   text-align: center;
   margin-right: 114px;
   margin-left: 60px;
   cursor: pointer;
}
.tips-modify{
    margin-left: 88px;
}
.order-num{
    height: 50px;
    line-height: 20px;
}
.pric-com{
    height: 35px;
}
/* 物流信息============== */
.logisitics-top{
    margin: 10px 0;
    background-color: #fff;
    position: relative;
}
.logisitics-bgc{
    background: #4A95F0;
    width: 29px;
    height: 29px;
    border-radius: 50%;
    position: relative;
    position: absolute;
    top: 20px;
    left: 16px;
    right: 12px;
}
.mys-wuliu_icon{
    color: #fff;
    font-size: 13px;
    position: absolute;
    left: 22%;
    top: 18%;
}
.logisitics-text{
    display: flex;
    flex-direction: column;
}
.logisitics-txt{
    font-size: 14px;
    color: #313234;
    font-family: Source Han Sans SC;
}
.logisitics-text{
    padding: 0 0 0 57px;
}
.logisitics-text p{
    height:24px;
    font-size:14px;
    font-family:Source Han Sans SC;
    font-weight:400;
    line-height:20px;
    color:rgba(49,50,52,1);
}
.logisitics-copytext{
    display: flex;

}
.logisitics-text .logisitics-txtone{
    width:182px;
    margin-top: 10px;
}
.logisitics-text .logisitics-txttwo{
    margin-top: 4px;
    margin-bottom: 10px;
}
.logisitics-copy{
    color: #FD4343;
    font-size:12px;
    font-family:Source Han Sans SC;
    position: absolute;
    top: 40px;
    right: 10px;
}
.logisitics-count{
    padding-left: 10px;
    padding-top: 10px;
    background-color: #F9F9F9;
}
.count-txt{
    width:64px;
    height:24px;
    font-size:16px;
    font-family:Source Han Sans SC;
    font-weight:700;
    line-height:35px;
    color:rgba(0,0,0,1);
}
.count-list{
    margin-left: 22px;
    display: flex;
    position: relative;
}
.count-spot{
    width: 6px;
    height: 6px;
    background-color: #B8B8B8;
    border-radius: 50%;
    z-index: 2;
    position: absolute;
    left: -1px;
    top: 17px;
}
.count-listspe{
    margin-left: 34px;
}
.count-distance{
    margin-top: 14px;
}
.count-bgc{
    border: 1px solid #B8B8B8;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    z-index: 2;
    position: relative;
    margin-left:1px;
    margin-top: 10px;
}
.count-bgcspe{
    background-color: rgba(255,255,255,1);
    border: 1px solid #FD4343;
    box-sizing: border-box;
    margin-left:3px;
    margin-top: 10px;
}
.count-icon{
    color: #B8B8B8;
    font-size: 11px;
    margin-left: 25%;
    margin-top: 10%;
}
.count-iconspe{
    color:#FD4343;
    position: absolute;
    left: -2px;
    font-size:10px;
}
.count-num{
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-bottom: 20px;
}
.count-spec{
    margin-bottom: 35px;
}
.count-num text{
    font-size:12px;
    font-family:Source Han Sans SC;
    font-weight:400;
    line-height:18px;
}
.count-sign{
    line-height: 30px;
}
.count-num .count-txtone{
    color:rgba(48,49,51,1);
}
.count-txtspe{
    color:rgba(253,67,67,1);
}
.count-txtone{
    color: #303133;
    height: 40px;
    line-height: 40px;
}
.count-txttwo{
    color: #909399;
    height: 20px;
    line-height: 20px;
}
/* 物流 */
/* 物流线 */
.on{
  background: #F0F0F0;
  height: 100%;
  width: 1px;
  position: absolute;
  left: 1px;
  top: 17px;
}
.count-on{
    background: #F0F0F0;
    height: 100%;
    width: 1px;
    position: absolute;
    left: 13px;
    top: 20px;
}
.on-spe{
    left: 13px;;
}
/* 物流信息============== */
.know{
    text-align: center;
    cursor: pointer;
}
.el-icon-check{
    color: #f00;
    position: absolute;
    top: 2px;
    left: 1px;
}
</style>
                         