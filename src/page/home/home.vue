<template>
  <div class="home">
    <div class="top-news">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide>
              <a class="swiper-slide-a">
                <img class="swiper-slide-img" src="../../assets/image/banner/banner1.jpg">
              </a>
          </swiper-slide>
          <swiper-slide>
              <a class="swiper-slide-a">
                <img class="swiper-slide-img" src="../../assets/image/banner/banner2.jpg">
              </a>
          </swiper-slide>
          <swiper-slide>
              <a class="swiper-slide-a">
                <img class="swiper-slide-img" src="../../assets/image/banner/banner3.jpg">
              </a>
          </swiper-slide>
          <swiper-slide>
              <a class="swiper-slide-a">
                <img class="swiper-slide-img" src="../../assets/image/banner/banner4.jpg">
              </a>
          </swiper-slide>
          <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev el-icon-arrow-left" slot="button-prev"></div>
        <div class="swiper-button-next el-icon-arrow-right" slot="button-next"></div>
      </swiper>
    </div>
    <div class="main-cont">
      <div class="remind" v-if="showMessage">
        <div class="left">
          <i class="icon"></i>
          <span class="tit">智能提醒</span>
        </div>
        <div class="right">
          <swiper :options="swiperOption2" ref="mySwiper">
            <swiper-slide  v-for='(item, index) in stPushMessageList' :key="index">
              <div class="swiper-item"  v-if="item.messageType === 'announcement'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">公告</p>
                  <p>{{item.messageContent}}</p>
                </div>
                <div class="ignore">
                  <el-button @click="checkDetails('announcement',item.messageTitle,item.messageContent,item.createTime,item.messageId,item.versionNo,'has_read',null)" round>查看详情</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
              <div class="swiper-item" v-if="item.messageType === 'unsoldProducts'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">商品通知</p>
                  <p>您的商品:<font color="red">{{item.messageContent}}</font>已滞销,请及时处理</p>
                </div>
                <div class="ignore">
                  <el-button @click="checkDetails('unsoldProducts',null,null,null,null,null,null,null)" round>查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
              <div class="swiper-item" v-if="item.messageType === 'abnormalOrder'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">异常订单通知</p>
                  <p>您的订单:<font color="red">{{item.dataSourceId}}</font>出现异常,请及时处理</p>
                </div>
                <div class="ignore">
                  <el-button @click="checkDetails('abnormalOrder',null,null,null,null,null,null,null)" round>查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
              <div class="swiper-item" v-if="item.messageType === 'couponOver'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">活动到期通知</p>
                  <p>您的优惠券活动:<font color="red">{{item.messageContent}}</font>已结束,请及时处理</p>
                </div>
                <div class="ignore">
                  <el-button @click="checkDetails('couponOver',null,null,null,null,null,null,null)" round>查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
              <div class="swiper-item" v-if="item.messageType === 'seckillOver'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">活动到期通知</p>
                  <p>您的秒杀活动:<font color="red">{{item.messageContent}}</font>已结束,请及时处理</p>
                </div>
                <div class="ignore">
                  <el-button @click="checkDetails('seckillOver',null,null,null,null,null,null,null)" round>查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
              <div class="swiper-item" v-if="item.messageType === 'groupBookingOver'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">活动到期通知</p>
                  <p>您的团购活动:<font color="red">{{item.messageContent}}</font>已结束,请及时处理</p>
                </div>
                <div class="ignore">
                  <el-button @click="checkDetails('groupBookingOver',null,null,null,null,null,null,null)" round>查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
               <div class="swiper-item" v-if="item.messageType === 'uninoOver'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">活动到期通知</p>
                  <p>您的联盟活动:<font color="red">{{item.messageContent}}</font>已结束,请及时处理</p>
                </div>
                <div class="ignore">
                   <el-button @click="checkDetails('uninoOver',null,null,null,null,null,null,null)" round>查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
              <div class="swiper-item" v-if="item.messageType === 'serviceMessage'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">账号/服务通知</p>
                  <p>您的<font color="red">{{item.messageTitle}}</font>门店的<font color="red">{{item.messageContent}}</font>已到期,请及时处理</p>
                </div>
                <div class="ignore">
                    <el-button @click="checkDetails('serviceMessage',null,null,null,null,null,null,null)" round>去续费</el-button>
                    <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
              <div class="swiper-item" v-if="item.messageType === 'weChatMessage'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">微信第三方授权通知</p>
                  <p>您的微信授权已到期,请及时处理</p>
                </div>
                <div class="ignore">
                  <el-button @click="checkDetails('weChatMessage',null,null,null,item.messageId,item.versionNo,'has_read',null)" round>查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
               <div class="swiper-item" v-if="item.messageType === 'systemInforms'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">系统更新通知</p>
                  <p>{{item.messageContent}}</p>
                </div>
                <div class="ignore">
                  <el-button @click="checkDetails('systemInforms',item.messageTitle,item.messageContent,item.createTime,item.messageId,item.versionNo,'has_read',null)" round>查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
              <div class="swiper-item" v-if="item.messageType === 'OrderChange'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">快开单通知</p>
                  <p>{{item.messageContent}}</p>
                </div>
                <div class="ignore">
                  <el-button @click="checkDetails('OrderChange',null,null,null,item.messageId,item.versionNo,'has_read', item.dataSourceId)" round>查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
              <div class="swiper-item" v-if="item.messageType === 'normalOrderDetail'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">标准订单通知</p>
                  <p>{{item.messageContent}}</p>
                </div>
                <div class="ignore">
                  <el-button @click="checkDetails('normalOrderDetail',null,null,null,item.messageId,item.versionNo,'has_read', item.dataSourceId)" round>查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
              <div class="swiper-item" v-if="item.messageType === 'addCustomer'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">潜客通知</p>
                  <p>{{item.messageContent}}</p>
                </div>
                <div class="ignore">
                  <el-button @click="checkDetails('addCustomer',null,null,null,item.messageId,item.versionNo,'has_read', null)" round>查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
              <div class="swiper-item" v-if="item.messageType === 'OrderCareReminder'">
                <div class="news">
                  <span>最新</span>
                </div>
                <div class="text-in">
                  <p class="tips">订单关怀通知</p>
                  <p>您有新的订单关怀,请及时处理</p>
                </div>
                <div class="ignore">
                  <el-button @click="checkDetails('OrderCareReminder',null,null,null,item.messageId,item.versionNo,'has_read', null)" round>查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')" round>忽略</el-button>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
      </div>
      <!-- 常用功能 -->
      <div class="menu-list">
        <ul>
          <li v-for="(item,index) in dealer" :key="index" v-if="roleCode.indexOf('DISTRIBUTOR') != -1 || roleCode.indexOf('ADMIN') != -1">
            <p class="item-circle">
              <router-link :to="item.path">{{item.logo}}</router-link>
            </p>
          </li>
          <li v-for="(item,index) in storeManager" :key="index" v-if="roleCode.indexOf('SHOPPING_GUIDE') != -1 || roleCode.indexOf('STORE_MANAGER') != -1">
            <p class="item-circle">
              <router-link :to="item.path">{{item.logo}}</router-link>
            </p>
          </li>
        </ul>
      </div>
      <!-- <div class="chart-list">
        <home-chart1 class="for-list"></home-chart1>
      </div> -->
      <!-- <div class="sale-list">
        <top-data :title="necessary" @necessaryCount= 'necessaryCount'></top-data>
        <div class="chart-view">
          <high-chart-spid ref="necessaryChild1" ></high-chart-spid>
        </div>
      </div> -->
    </div>
      <!-- 消息弹出框 -->
  <el-dialog
          title="消息详情"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <span slot="footer" class="dialog-footer">
            <div>消息标题:{{dialogData.messageTitle}}</div>
            <div>消息内容:{{dialogData.messageContent}}</div>
            <div>发送时间:{{dialogData.createTime}}</div>
            <el-button @click="centerDialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
  </div>
</template>
<script>
import xHeader from '../../components/header/header'
import homeChart1 from '../../components/charts/homeChart1'
import {getStore, setStore} from '../../tool/Utils'
import topData from '../../components/data/topData'
import highChartSpid from '../../components/charts/highChartSpid'
// import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
  data () {
    return {
      id: 'thisid',
      spid: 'spid',
      dateTime: '',
      roleCode: '',
      dialogData: {
        messageTitle: '',
        messageContent: '',
        createTime: ''
      },
      centerDialogVisible: false,
      dealer: [
        {
          path: '/store/staffManage',
          logo: '全部员工管理'
        },
        {
          path: '/store/commManage',
          logo: '商品管理'
        },
        {
          path: '/data/allStoreData/dataOverview',
          logo: '数据概况'
        },
        {
          path: '/store/storeManage',
          logo: '门店'
        }
      ],
      storeManager: [
        {
          path: '/myStore/order/orderManage',
          logo: '标准订单'
        },
        {
          path: '/myStore/storeCommodity',
          logo: '门店商品'
        },
        {
          path: '/myStore/storeStaffManage',
          logo: '门店员工管理'
        },
        {
          path: '/myStore/member/memberAdministration',
          logo: '会员管理'
        },
        {
          path: '/marketing/writeOff',
          logo: '卡券核销'
        }
      ],
      necessary: {
        title: '销售额',
        date: 'date',
        indicators: 'necessary'
      },
      splineData: {
        id: 'spid',
        data: {
          chart: {
            type: 'spline'
          },
          title: {
            text: '趋势图',
            align: 'left',
            style: {
              color: '#27292E',
              fontSize: '14px',
              fontWeight: '600'
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}:{point.y}</b><br>',
            pointFormat: '{point.x:%Y-%m-%d}'
          },
          xAxis: {
            type: 'datetime',
            labels: {
              format: '{value: %Y-%m-%d}'
            }
            // categories: ['10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8', '10.9', '10.10', '10.11', '10.12', '10.13', '10.14']
          },
          yAxis: {
            min: 0,
            title: {
              text: null
            }
          },
          plotOptions: {
            spline: {
              marker: {
                enabled: true
              }
            }
          },
          credits: {
            text: ''
          },
          series: [{
            color: '#FFE540',
            name: '销售额',
            data: []
          },
          {
            color: '#FD4343',
            name: '客单价',
            data: []
          }]
        }
      },
      chooseDateList: [
        {
          dateName: '今日'
        },
        {
          dateName: '本周'
        },
        {
          dateName: '本月'
        },
        {
          dateName: '本年'
        }
      ],
      chooseDateIndex: 0,
      dataList: [
        {
          title: '近7天付款客户',
          num: '160',
          option: {
            data: [2, 6, 8, 26, 9, 12, 8],
            background: '#7C96A6'
          },
          id: 'chart1'
        },
        {
          title: '近7天客单价',
          num: '￥750.00',
          option: {
            data: [2, 6, 26, 3, 9, 12, 4],
            background: '#51C5DA'
          },
          id: 'chart2'
        },
        {
          title: '近7天购买件数',
          num: '34',
          option: {
            data: [2, 6, 31, 3, 9, 12, 0],
            background: '#7EBEAE'
          },
          id: 'chart3'
        }
      ],
      topSwiperOption: {
        spaceBetween: 30,
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      middleSwiperOption: {
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      topNews: [
        {
          imgSrc:
            '//static-oss.muyusi.com/back_pic/1556792adfbca83.jpg',
          url: ''
        },
        {
          imgSrc:
            '//static-oss.muyusi.com/back_pic/2357b2bc480bc98.jpg',
          url: ''
        },
        {
          imgSrc:
            '//static-oss.muyusi.com/back_pic/1658afeedc812b6.jpg',
          url: ''
        },
        {
          imgSrc:
            '//static-oss.muyusi.com/back_pic/8357a5ebfd572fd.jpeg',
          url: ''
        }
      ],
      activeIndex: 0,
      slideNum: 3,
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        loop: true,
        autoplay: true,
        speed: 400,
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        paginationClickable: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        scrollbar: '.swiper-scrollbar',
        mousewheelControl: true,
        observeParents: true,
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
      },
      swiperOption2: {
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      // 未读消息列表
      stPushMessageList: [],
      showMessage: true
    }
  },
  mounted () {
    this.pushMessageGetListData()
  },
  inject: ['reloadStoreTree', 'reloadAllPage'],
  created () {
    this.roleCode = getStore('roleCode')
  },
  methods: {
    // 获取消息列表
    pushMessageGetListData () {
      let params = {
        readState: 'no_read',
        limit: 3,
        page: 1,
        source: 'store'
      }
      this.$api.pushMessageGetListData(params).then(res => {
        this.stPushMessageList = res.data
        if (res.data !== null && res.count !== 0) {
          // this.reloadStoreTree()
        } else {
          this.showMessage = false
        }
      })
    },
    checkDetails (type, messageTitle, messageContent, createTime, messageId, versionNo, readState, dataSourceId) {
      // 公告
      if (type === 'announcement') {
        this.centerDialogVisible = true
        this.dialogData.messageTitle = messageTitle
        this.dialogData.messageContent = messageContent
        this.dialogData.createTime = createTime
        this.modifyState(messageId, versionNo, readState)
      } else if (type === 'unsoldProducts') { // 滞销商品
        this.$router.push({path: '/store/commManage?state=7'})
      } else if (type === 'abnormalOrder') { // 异常订单提醒
        this.$router.push({path: '/order/orderManage'})
      } else if (type === 'couponOver') { // 优惠券 活动到期通知
        this.$store.dispatch('setCouponChooseIndex', 2)
        this.$router.push({path: '/marketing/storeMarket/activityCoupon'})
      } else if (type === 'seckillOver') { // 秒杀 活动到期通知
        this.$store.dispatch('setSeckillChooseIndex', 2)
        this.$router.push({path: '/marketing/storeMarket/activityGrab'})
      } else if (type === 'groupBookingOver') { // 团购活动活动到期通知
        this.$store.dispatch('setGroupBuyChooseIndex', 2)
        this.$router.push({path: '/marketing/storeMarket/activityCollage'})
      } else if (type === 'uninoOver') { // 联盟 活动到期通知
        this.$store.dispatch('setUnionCouponChooseIndex', 2)
        this.$router.push({path: '/marketing/activityLeague'})
      } else if (type === 'serviceMessage') { // 账号/服务通知
        this.$router.push({path: '/service/serviceDetail'})
      } else if (type === 'weChatMessage') { // 微信第三方授权到期提醒
        this.centerDialogVisible = true
        this.centerDialogVisible = true
        this.dialogData.messageTitle = messageTitle
        this.dialogData.messageContent = messageContent
        this.dialogData.createTime = createTime
        this.modifyState(messageId, versionNo, readState)
      } else if (type === 'systemInforms') { // 系统更新提醒
        this.centerDialogVisible = true
        this.centerDialogVisible = true
        this.dialogData.messageTitle = messageTitle
        this.dialogData.messageContent = messageContent
        this.dialogData.createTime = createTime
        this.modifyState(messageId, versionNo, readState)
      } else if (type === 'OrderCareReminder') { // 订单关怀提醒
        this.$router.push({path: '/meStore/order/careManage'})
      } else if (type === 'OrderChange') {
        this.$router.push({path: '/myStore/order/easyShipDetail', query: {orderId: dataSourceId}})
        this.modifyState(messageId, versionNo, readState)
      } else if (type === 'addCustomer') {
        this.$router.push({path: '/myStore/member/submemberManage'})
        this.modifyState(messageId, versionNo, readState)
      } else if (type === 'normalOrderDetail') {
        this.$router.push({path: '/myStore/order/orderDetail', query: {orderId: dataSourceId}})
        this.modifyState(messageId, versionNo, readState)
      }
    },
    // 忽略消息
    modifyState (messageId, versionNo, readState) {
      let params = {
        messageId: messageId,
        versionNo: versionNo,
        readState: readState
      }
      this.$api.modifyState(params).then(res => {
        this.pushMessageGetListData()
        this.getNotReadCount()
        this.reloadAllPage()
      })
    },
    getNotReadCount (values) {
      let params = {
        source: 'store'
      }
      this.$api.getNotReadCount(params).then(res => {
        if (res.data !== null) {
          setStore('noReadCount', res.data)
          this.notReadCount = getStore('noReadCount')
        }
      })
    },
    // topSwiper () {
    //   return new Swiper('.topSwiper', this.topSwiperOption)
    // },
    // middleSwiper () {
    //   return new Swiper('.middleSwiper', this.middleSwiperOption)
    // },
    // 交易趋势
    necessaryCount (value) {
      // 触发子组件方法
      this.$refs.necessaryChild1.homeChange(value)
    },
    ignoreMessage (messageId, versionNo, readState) {
      this.modifyState(messageId, versionNo, 'has_read')
    },
    chooseDate (index) {
      this.chooseDateIndex = index
    }
  },
  components: {xHeader, topData, highChartSpid, homeChart1}
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.home {
  background: #fff;
  .top-news {
    width: 1000px;
    margin: 0 auto 0;
    // .swiper-container {
    // }
    .swiper-slide-a {
      width: 1000px;
      height: 390px;
      display: block;
    }
    .swiper-slide-img {
      width: 100%;
      height: 100%;
    }
    .swiper-button-next{
      background: none;
      font-size: 50px;
      right: 20px;
      color: #fff;
    }
    .swiper-button-prev{
      background: none;
      font-size: 50px;
      left: 10px;
      color: #fff;
    }
  }
  .main-cont {
    width: 1000px;
    margin: 0 auto;
    .remind {
      padding: 20px 0;
      border-bottom: 1px solid $border-color;
      .left {
        display: flex;
        width: 86px;
        height: 34px;
        float: left;
        align-items: center;
        border-right: 1px solid $border-color;
        padding: 0 6px;
        margin-top: 4px;
        .icon {
          width: 32px;
          height: 32px;
          display: inline-block;
          background: linear-gradient(
            135deg,
            rgba(76, 169, 225, 1),
            rgba(85, 221, 213, 1)
          );
          border-radius: 50%;
          margin-right: 6px;
        }
        .tit {
          font-size: $md-size;
          font-weight: bold;
          display: inline-block;
          width: 34px;
        }
      }
      .right {
        margin-left: 86px;
        padding-left: 10px;
        font-size: $md-size;
        .swiper-item {
          display: flex;
          cursor: pointer;
          .ignore {
            flex: 0 0 150px;
            display: flex;
            align-content: center;
            margin-right: 35px;
            span {
              width: 66px;
              height: 26px;
              line-height: 26px;
              text-align: center;
              font-size: $xs-size;
              color: #fff;
              border-radius: 20px;
              background: rgba(66, 69, 82, 0.3);
              display: inline-block;
            }
          }
          .news {
            span {
              display: inline-block;
              width: 40px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              color: #fff;
              position: relative;
              // @include linear-grad;
              margin: 0 10px;
              background: $main-color;
              font-size: $xs-size;
              &::after {
                content: '';
                position: absolute;
                left: -18px;
                @include triangle-left(10px, 8px, $main-color);
              }
            }
          }
          .text-in {
            flex: 1;
            .tips {
              font-weight: bold;
            }
          }
        }
      }
    }
    .menu-list {
      padding: 35px 0;
      ul {
        display: flex;
        li {
          flex: 1;
          margin-right: 30px;
          text-align: center;
          font-size: $xs-size;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .item-circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: rgba(255,113,105,1);
            margin-bottom: 12px;
            a {
              display: inline-block;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              color: $text-header-color;
              transition:all 1s;
              &:hover{
                border-radius: 50%;
                background-color: rgba(255,113,105,0.6);
                font-size: 18px;
              }
            }
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .chart-list {
      display: flex;
      .for-list{
          flex: 1;
        }
      .list-item {
        width: 25%;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        padding-bottom: 4px;
        padding-top: 46px;
        height: 300px;
        margin-left: 10px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
    .sale-list {
      margin-top: 50px;
      .top-tips {
        border-radius: 4px;
        background-color: $gray-color;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 14px;
        .l-title {
          font-size: $md-size;
          font-weight: bold;
        }
      }
      .r-choose {
        ul {
          display: inline-block;
          li {
            display: inline-block;
            font-size: $xs-size;
            margin: 0 10px;
            cursor: pointer;
            &.active {
              color: $main-color;
              font-weight: bold;
            }
          }
        }
      }
      .chart-view {
        position: relative;
        .rank-list {
          width: 220px;
          padding: 18px 14px 18px 4px;
          box-shadow: 0px 3px 6px 2px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          height: 300px;
          position: absolute;
          right: 0;
          top: 10px;
          background-color: #fff;
          .rank-title {
            text-align: center;
            position: relative;
            font-weight: bold;
            font-size: $md-size;
            margin-bottom: 20px;
            &::after {
              content: '';
              width: 24px;
              height: 1px;
              display: inline-block;
              background-color: $text-main-color;
              position: absolute;
              top: 50%;
              right: 20px;
            }
            &::before {
              content: '';
              width: 24px;
              height: 1px;
              display: inline-block;
              background-color: $text-main-color;
              position: absolute;
              top: 50%;
              left: 20px;
            }
          }
          .rank-ul {
            li {
              display: flex;
              font-size: $xs-size;
              justify-content: space-between;
              margin-top: 20px;
              .red-color {
                color: $main-color;
              }
              .rank-name {
                display: flex;
              }
              .left-arrow {
                position: relative;
                width: 20px;
                height: 16px;
                display: inline-block;
                background-color: $border-color;
                line-height: 16px;
                text-align: center;
                color: #27292e;
                font-size: 14px;
                margin-right: 10px;
                font-size: $xs-size;
                &::after {
                  content: '';
                  @include triangle-right(8px, 6px, $border-color);
                  position: absolute;
                  right: -12px;
                }
              }
              &:nth-child(1) {
                .left-arrow {
                  background-color: $main-color;
                  color: #fff;
                  &::after {
                    @include triangle-right(8px, 6px, $main-color);
                  }
                }
              }
              &:nth-child(2) {
                .left-arrow {
                  background-color: #ff8500;
                  color: #fff;
                  &::after {
                    @include triangle-right(8px, 6px, #ff8500);
                  }
                }
              }
              &:nth-child(3) {
                .left-arrow {
                  background-color: $adorn-color-2;
                  color: #fff;
                  &::after {
                    @include triangle-right(8px, 6px, $adorn-color-2);
                  }
                }
              }
            }
          }
          .view-more {
            font-size: $xs-size;
            color: $text-gray-color;
            text-align: center;
            margin-top: 15px;
          }
        }
      }
    }
  }
}
</style>
