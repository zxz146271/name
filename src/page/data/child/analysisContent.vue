<template>
  <div class="main">
    <p class="heading">内容分发数据</p>
    <div class="colorbox"></div>
    <div class="column-box">
      <!-- 柱状图组件 histoGram-->
      <histo-gram></histo-gram>
      <div class="colorbigbox"></div>
      <div class="column-table">
        <div class="contentNum">
          <span class="content-number">内容浏览数据（共{{count}}条）</span>
          <div class="block">
            <el-date-picker
              v-model="contentDate"
              size="mini"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              prefix-icon="el-icon-date"
              range-separator="~"
              @change = "selectContentDate"
            ></el-date-picker>
          </div>
        </div>
        <el-table
          :data="userList"
          style="width: 100%;"
        >
          <el-table-column
            align="center"
            fit="true"
            prop="headline"
            label="名称"
            height="540"
          ></el-table-column>
         <el-table-column align="center" prop="content_type" label="类别">
            <template slot-scope="scope">
              <span v-if = "scope.row.content_type == 'article'">文章</span>
              <span v-if = "scope.row.content_type == 'panorama'">全景图</span>
              <span v-if = "scope.row.content_type == 'atlas'">图册</span>
              <span v-if = "scope.row.content_type == 'case'">案例</span>
             </template>
         </el-table-column>
          <el-table-column align="center" prop="sumShareNum" label="分享次数">
            <template slot-scope="scope">
              <span>{{scope.row.sumShareNum ? scope.row.sumShareNum : 0}}</span>
             </template>
          </el-table-column>
          <el-table-column align="center" prop="vistorNum" label="访客"></el-table-column>
          <el-table-column align="center" prop="submemberNum" label="潜客"></el-table-column>
          <el-table-column align="center" prop="intentionalNum" label="意向客户"></el-table-column>
          <el-table-column align="center" prop="buyerNum" label="已购客户"></el-table-column>
          <el-table-column align="center" prop="avgStayTime" label="平均访问时长" :formatter="timeLong"></el-table-column>
          <!-- <el-table-column align="center" prop="founder" label="创建人"></el-table-column> -->
        </el-table>
      </div>
      <div class="column-pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 10, 20, 30, 50]"
          :page-size="pagesize"
          layout="  prev, pager, next,sizes, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </div>
    <div class="colorbigbox"></div>
    <!-- 扇形图组件 渠道浏览量-->
    <div class="chart">
      <fan-chart></fan-chart>
    </div>
    <div class="colorbigbox"></div>
    <!--  访客详情 S -->
    <div class="browse-box">
      <div class="browse">
        <div>
          <span>访客详情</span>
          <el-button-group> 
            <el-button :type="typeState == '' ? 'primary' : 'deafult'"  @click="changeState('')" class="btn">全部</el-button>
            <el-button :type="typeState == '3' ? 'primary' : 'deafult'"  @click="changeState('3')" class="btn">访客</el-button>
            <el-button :type="typeState == '4' ? 'primary' : 'deafult'"  @click="changeState('4')" class="btn">意向客户</el-button>
            <el-button :type="typeState == '2' ? 'primary' : 'deafult'"  @click="changeState('2')" class="btn">潜客</el-button>
            <el-button :type="typeState == '0' ? 'primary' : 'deafult'"  @click="changeState('0')" class="btn">已购客户</el-button>
          </el-button-group>
        </div>
        
        <div class="form-box">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="visterStoreId" style="width:112px" @change = "chooseStore">
                <el-option
                  v-for="(item,index) in store"
                  :label="item.storeName"
                  :value="item.storeId"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="block">
            <el-date-picker
              v-model="visterDate"
              size="large"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              prefix-icon="el-icon-date"
              range-separator="~"
              @change = "selectVisterDate"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="column-table Visitor-table">
          <el-table :data="VisitoruserList" style="width: 100%;">
          <el-table-column align="center" prop="niki_name" label="访客姓名"  height="540"></el-table-column>
          <el-table-column align="center" prop="mobile" label="联系电话">
            <template slot-scope="scope">
              <span>{{scope.row.mobile ? scope.row.mobile.replace(/^(\d{3})\d+(\d{4})$/,"$1****$2"):"无"}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="consumer_type" label="访客类型" width="100">
            <template slot-scope="scope">
              <div class="cell-box">
                <span :class="scope.row.consumer_type == 0 ? 'purchased common' : ''" v-if="scope.row.consumer_type == 0"></span>
                <span :class="scope.row.consumer_type == 1 || scope.row.consumer_type == 2 ? 'sneak common' : ''" v-if="scope.row.consumer_type == 1 || scope.row.consumer_type == 2"></span>
                <span :class="scope.row.consumer_type == 3 ? 'visitor common' : ''" v-if="scope.row.consumer_type == 3"></span>
                <span :class="scope.row.consumer_type == 4 ? 'customer common' : ''" v-if="scope.row.consumer_type == 4"></span>
                <span class="guest-text" v-if="scope.row.consumer_type == 0">{{scope.row.consumer_type == 0 ? '已购客户':"无"}}</span>
                <span class="guest-text" v-if="scope.row.consumer_type == 1 || scope.row.consumer_type == 2">{{scope.row.consumer_type == 1 || scope.row.consumer_type == 2 ? '潜客':"无"}}</span>
                <span class="guest-text" v-if="scope.row.consumer_type == 3">{{scope.row.consumer_type == 3 ? '访客':"无"}}</span>
                <span class="guest-text" v-if="scope.row.consumer_type == 4">{{scope.row.consumer_type == 4 ? '意向客户':"无"}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="follow_state" label="跟进状态">
            <template slot-scope="scope">
              <span>{{scope.row.follow_state ? scope.row.follow_state : '暂无记录'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="lab_name" label="需求类型">
              <template slot-scope="scope">
                <span>{{scope.row.lab_name ? scope.row.lab_name : '暂无记录'}}</span>
              </template>
          </el-table-column>
          <el-table-column align="center" prop="staff_name" label="来源人"></el-table-column>
          <el-table-column align="center" prop="store_name" label="所属门店"></el-table-column>
          <el-table-column align="center" prop="pageNum" label="访问页面" width="80"></el-table-column>
          <el-table-column align="center" prop="sum_stay_time" label="停留时长" :formatter="timeLong"></el-table-column>
          <el-table-column align="center" prop="lastVicitTime" label="访问时间" width='160'></el-table-column>
          <!-- <el-table-column align="center" prop="from" label="来源渠道"></el-table-column> -->
        </el-table>
      </div>
      <div class="column-pages column-bars">
        <span class="bars">共{{Visitorcount}}条</span>
        <el-pagination
          @size-change="VisitorSizeChange"
          @current-change="VisitorCurrentChange"
          :current-page.sync="VisitorcurrentPage"
          :page-sizes="[3, 5, 10, 20, 30, 50]"
          :page-size="Visitorpagesize"
          layout="prev, pager, next,sizes, jumper"
          :total="Visitorcount"
        ></el-pagination>
      </div>
    </div>
    <div class="colorbigbox"></div>
    <!-- 分享人排名-->
    <div class="browse-box">
      <div class="browse">
        <span>分享人排名（共{{Sharecount}}条）</span>
        <div class="form-box">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="shareStoreId" style="width:130px" @change="chooseThis" >
                <el-option
                  v-for="(item,index) in share"
                  :label="item.storeName"
                  :value="item.storeId"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="block">
            <el-date-picker
              v-model="shareDate"
              size="large"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              prefix-icon="el-icon-date"
              range-separator="~"
              @change="selectShareDate"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="column-table">
          <el-table :data="ShareuserList"  style="width: 100%;"> 
          <el-table-column
            align="center"
            prop="wechat_photo"
            label="头像"
            height="54"
            line-height="53"
          >
            <template slot-scope="scope">
              <img
                :src="scope.row.wechat_photo"
                alt
                style="width: 50px;height: 50px;border-radius:50%;padding:0;    vertical-align: middle;"
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="staff_name" label="姓名"></el-table-column>
          <el-table-column align="center" prop="shareNum" label="分享次数"></el-table-column>
          <el-table-column align="center" prop="vistorNum" label="访客"></el-table-column>
          <el-table-column align="center" prop="submemberNum" label="潜客"></el-table-column>
          <el-table-column align="center" prop="intentionalNum" label="意向客户"></el-table-column>
          <el-table-column align="center" prop="buyerNum" label="已购客户"></el-table-column>
          <!-- <el-table-column align="center" prop="average" label="成交量"></el-table-column> -->
          <el-table-column align="center" prop="store_name" label="所属门店"></el-table-column>
        </el-table>
      </div>
      <div class="column-pages">
        <el-pagination
          @size-change="ShareSizeChange"
          @current-change="ShareCurrentChange"
          :current-page="SharecurrentPage"
          :page-sizes="[3, 5, 10, 20, 30, 50]"
          :page-size="Sharepagesize"
          layout="prev, pager, next, sizes, jumper"
          :total="Sharecount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import histoGram from "../../../components/verticalPhoto/histoGram"; //柱状图组件
import fanChart from "../../../components/verticalPhoto/fanChart"; //扇形图组件
// import formHeader from "../../../components/verticalPhoto/formHeader"; //扇形图组件
export default {
  name: "",
  data() {
    return {
      typeState: '',
      contentDate: '',
      shareDate: "", //时间范围
      visterDate: '',
      formTimes: {
        times: "", //近七天
        number: ""
      },
      //分页数据 （1）数据概述
      currentPage: 1, //初始页
      pagesize: 5, //每页的数据
      userList:[],
      count:0,
      //分页数据 （2）访客详情
      VisitorcurrentPage: 1,
      Visitorpagesize: 3,
      VisitoruserList: [],
      Visitorcount: 0,
      //分页数据 （3）分享人排名
      SharecurrentPage: 1,
      Sharepagesize: 3,
      ShareuserList: [],
      Sharecount:0,
      // 访客详情 门店
      store: [
        {
          storeId: '',
          storeName: '全部'
        }
      ],
      storeValue: "全部",
      options: [
        {
          value: "选项1",
          label: "近7天"
        },
        {
          value: "选项2",
          label: "近15天"
        },
        {
          value: "选项3",
          label: "近30天"
        }
      ],
      value4: "选项1",
      // 分享人排名 // share
      share: [{
        storeName: '全部',
        storeId: ''
      }],
      storeId: "",
      visterStoreId: '',
      shareStartTime: '',
      shareEndTime: '',
      visterStartTime: '',
      visterStartEnd: '',
      shareStoreId: '',
      contentSatrtTime: '',
      contentEndtime: '',
      consumerType :1
    };
  },
  components: {
    histoGram,
    fanChart
  },
  created() {
    // this.VisitorUserList(); //分页 访客详情
    // this.ShareUserList(); //分页 访客详情
  },
  mounted(){
      this.distributionId();
      this.distributionListData();
      this.distributionStaff();//来源人
  },
  methods: {
    // 访客详情条件
    changeState(stateid){
      if(stateid != this.typeState ){
        this.typeState = stateid;
        this.distributionInfo()
      }else{
        console.log("没有变化")
      }
    },
    selectShareDate (e) {
      if(e){
        this.shareStartTime = e[0]
        this.shareEndTime = e[1]
      }else{
        this.shareStartTime = ''
        this.shareEndTime = ''
      }
      this.distributionRank()
    },
    selectVisterDate (e) {
      if(e){
        this.visterStartTime = e[0]
        this.visterEndTime = e[1]
      }else{
        this.visterStartTime = ''
        this.visterEndTime = ''
      }
      this.distributionInfo()
    },
    selectContentDate (e) {
      if(e){
        this.contentSatrtTime = e[0]
        this.contentEndTime = e[1]
      }else{
        this.contentSatrtTime = ''
        this.contentEndTime = ''
      }
      this.distributionId()
    },
    timeLong (row) {
      let sum_stay_time = row.sum_stay_time ? row.sum_stay_time : row.avgStayTime
      let result
      if(sum_stay_time <= 0){
        result = '暂无记录'
      }else{
        let days = Math.floor(sum_stay_time / ( 60 * 60 * 24));
        let hours = Math.floor((sum_stay_time % ( 60 * 60 * 24)) / (60 * 60))
        let minutes = Math.floor((sum_stay_time % (60 * 60)) / 60)
        let seconds = Math.floor(sum_stay_time % 60)
        result = days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
      }
      return result
    },
    // 内容浏览数据
    distributionId () {
      let params = {
        startTime: this.contentSatrtTime,
        endTime: this.contentEndTime,
        page:this.currentPage,
        limit:this.pagesize
      }
      this.$api.distributionId(params).then(res => {
        this.userList = res.data;
        this.count = res.count;
      })
    },
    // 访客详情数据
     distributionInfo () {
      let params = {
        consumerType:this.typeState,
        page:this.VisitorcurrentPage,
        limit:this.Visitorpagesize,
        storeId: this.visterStoreId ? this.visterStoreId : '',
        startTime: this.visterStartTime ? this.visterStartTime : '',
        endTime: this.visterEndTime ? this.visterEndTime : ''
      }
      this.$api.distributionInfo(params).then(res => {
        this.VisitoruserList = res.data;
        this.Visitorcount = res.count;
      })
    },
    // 获取门店数据
    distributionRank () {
      let params = {
        page:this.SharecurrentPage,
        limit:this.Sharepagesize,
        storeId: this.shareStoreId,
        startTime: this.shareStartTime,
        endTime: this.shareEndTime
      }
      this.$api.distributionRank(params).then(res => {
        this.ShareuserList = res.data
        this.Sharecount = res.count
      })
    },
    //获取门店名称
    distributionListData () {
      let params = {
        nearlyDay: 2,
        page:1,
        limit:9999
      }
      this.$api.distributionListData(params).then(res => {
        this.share = [...this.share, ...res.data]
        this.store = [...this.store, ...res.data]
        this.distributionRank()
        this.distributionInfo() 
      })
    },
    //获取来源人
    distributionStaff (index) {
      // this.$api.distributionStaff().then(res => {
      //   this.store = [...this.store, ...res.data]
      //   this.distributionInfo()
      // })
    },
    //选择门店
    chooseThis(index){
      this.shareStoreId = index
      // this.SharecurrentPage = 1
      this.distributionRank()
    },
    //选择门店  访客详情
    chooseStore(index){
      this.visterStoreId = index      
      // this.VisitorCurrentChange = 1
      this.distributionInfo()
    },
    // 分页  数据概述
    handleSizeChange(size) {
      this.pagesize = size
      this.distributionId()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.distributionId()
    },
    // 分页  访客详情
    VisitorSizeChange(Visitorsize) {
      this.Visitorpagesize = Visitorsize
      this.distributionInfo()    
    },
    VisitorCurrentChange(currentPage) {
      this.VisitorcurrentPage = currentPage
      this.distributionInfo()
    },
    VisitorUserList() {
      // this.$http.get('').then(res => {  //这是从本地请求的数据接口，
      //     this.VisitoruserList = res.body
      // })
    },
    // 分页  分享人排名
    ShareSizeChange(Sharesize) {
      this.Sharepagesize = Sharesize
      this.distributionRank()
    },
    ShareCurrentChange(SharecurrentPage) {
      this.SharecurrentPage = SharecurrentPage
      this.distributionRank()
    },
    ShareUserList() {
      // this.$http.get('').then(res => {  //这是从本地请求的数据接口，
      //     this.ShareuserList = res.body
      // })
    }
  }
};
</script>

<style scoped>
/* 标题 */
.heading {
  font-size: 20px;
  color: #000000;
  margin-left: 37px;
  height:40px;
}
/* 颜色块 */
.colorbox{
  width:98%;
  height:14px;
  background:#F8F9FB;
}
.colorbigbox{
  width:98%;
  height:24px;
  background:#F8F9FB;
}
/* 柱状图 表格和分页 柱状图组件  */
.column-box {
  padding: 0 20px 28px 20px;
  margin-bottom: 20px;
}
.column-box .column-pages {
  margin-top: 34px;
}
/* 扇形图组件 渠道浏览量 */
.chart {
}
/* 访客详情 表格和分页 */
.browse {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #e9e9e9;
}
.browse span {
  height: 60px;
  line-height: 60px;
}
.browse .demo-form-inline {
  padding-top: 10px;
  height: 60px;
  line-height: 60px;
}

.el-table th,
.el-table tr {
  padding: 0;
  height: 100px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 100px;
}
/* 访客详情 */
.column-table .content-number{
  height: 60px;
  line-height: 60px;
  font-size: 16px;
}
.column-table .contentNum{
  display:flex;
  flex-direction:row;
  justify-content:space-between;
}
.form-box {
  display: flex;
  flex-direction: row;
  text-align:center;
}
/*   访客详情   访客类型  潜客   */
.common {
  display: block;
  margin: 9% 5% 0 9%;
  /* position: absolute;
  top: 32px;
  left: 23px; */
}
.sneak {
  width: 6px;
  height: 6px;
  background-color: #549bf8;
  border-radius: 50%;
}
/* 访客 */
.visitor {
  width: 6px;
  height: 6px;
  background-color: #f2c874;
  border-radius: 50%;
}
/* 意向客户 */
.customer {
  width: 6px;
  height: 6px;
  background-color: #ff719c;
  border-radius: 50%;
}
/* 已购客户 */
.purchased {
  width: 6px;
  height: 6px;
  background-color: #53d2d2;
  border-radius: 50%;
}
/* 客户图标 文字 */
.cell-box {
  text-align: left;
  display: flex;
  flex-direction: row;
  /* margin-left: 25px; */
}
.guest-text {
  text-align: left;
}
/* 时间范围  */
.el-range-editor.el-input__inner {
  width: 312px;
  margin-top: 12px;
}

/* 分享人排名 */
.browse-box {
  padding: 0 20px 18px 20px;
  /* background-color: pink; */
}
.browse-box .column-pages {
  margin-top: 32px;
}
.browse-box .column-bars{
  display: flex;
  justify-content: space-between;
}
.column-bars .bars{
  height: 32px;
  line-height: 32px;
  margin-left: 20px;
}
.el-button-group{
  margin-left: 15px;
}
.btn{
  display: flex;
  align-items: center;
  height: 34px;
  line-height: 4px;
}
</style>


 