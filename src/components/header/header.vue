<template >
  <div class="header scroll-top-header">
    <!-- logo -->
    <div class="logo">
      <img src="../../../static/image/logo_img@2x.png" alt="">
    </div>
    <!-- 右边 -->
    <div class="user">
      <!-- 联系客服 -->
      <el-tooltip class="item" effect="dark" content="电话咨询：400-668-4866" placement="bottom">
        <p class="customerService" @click="goHelp">
          <i class="iconfont message">
            <img src="../../../static/image/kefu_icon@2x.png" alt="">
          </i>
        </p>
      </el-tooltip>
      <!-- 消息 -->
      <p class="icon-lb" @click="popup">
        <el-badge :value="notReadCount" :max="99">
          <i class="iconfont message">
            <img src="../../../static/image/xiaoxi_icon@2x.png" alt="">
          </i>
        </el-badge>
      </p>
      <!-- 门店二维码 -->
      <div class="qrcode">
        <i class="iconfont bar-qrcode">
          <img src="../../../static/image/erweima_icon@2x (1).png" alt="">
        </i>
        <!-- <i class="iconfont icon-erweima bar-qrcode"></i> -->
        <div class="show-code">
          <div class="qrcode-detail">
            <div id="store-code" style="display: flex;">
              <img :src="QRcodeImg" >
            </div>
            <el-button type="danger" class="down-code" @click="downloadQR">下载店铺二维码</el-button>
            <a id="downloadLink"></a>
          </div>
        </div>
      </div>
      <!--个人信息 -->
      <div class="store-select">
        <el-dropdown trigger="hover" @command="handleCommand">
          <span class="el-dropdown-link" style="display:flex;align-items: center;">
            <div class="user-info">
              <div class="text-ellipsis">
                <span class="textSize">{{userInfo.staffName}}</span>
                <div class="dropdownBtn">
                  <img src="../../../static/image/xiala_icon@2x.png" alt="">
                </div>
              </div>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown" class="userInfoOp">
            <ul>
              <li class="opItem1" @click="password"><i class="password"></i><span>修改密码</span></li>
              <li class="opItem2" @click="logout"><i class="logout"></i><span>注销</span></li>
            </ul>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="vline"></div>
        <!-- 门店状态 -->
        <el-dropdown trigger="hover" @command="handleCommand">
          <span class="el-dropdown-link" style="display:flex;align-items: center;">
            <div class="user-info">
              <div class="service">
                <span class="store-span">{{PageStoreName}}</span>
                <span class="service-time">{{ serviceDay ? '('+serviceOverDay+'天)' : serviceTXT}}</span>
              </div>
            </div>
            <div class="store-right-icon"></div>
            <div class="el-icon-caret-bottom"></div>
          </span>
          <el-dropdown-menu slot="dropdown" class="storeList" v-if = "loadStoreTree">
            <el-tooltip class="item" effect="dark" :content="item.label" placement="left"  v-for="(item, index) in loadStoreTree" :key="index">
              <el-dropdown-item  :command="item" class="dropmenu-store"
                >{{item.label}}</el-dropdown-item>
            </el-tooltip>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="vline2"></div>
        <!-- 服务购买按钮 -->
        <el-tooltip class="purchasingService" @click="goService" effect="dark" content="服务购买与续费" placement="bottom">
            <img src="../../../static/image/shangpin_icon@2x.png" alt="" @click="goService">
        </el-tooltip>
      </div>
      <!-- 通知弹窗 -->
      <div class="notice" :class="{active:isNotice}" style=" overflow:scroll"  ref="viewBox"  v-if="isNotice" v-clickoutside="closePopup">
        <div class="title">
          <div class="not-notified">
            <span>未读通知&nbsp;&nbsp;<font color="red">{{notReadCount}}</font></span>
           <!-- <el-button>历史通知</el-button> -->
          </div>
          <div class="option">
            <el-select v-model="messageReadState" @change="selectChange()">
              <el-option label="未读" value="no_read"></el-option>
              <el-option label="已读" value="has_read"></el-option>
              <el-option label="全部" value="9"></el-option>
            </el-select>
          </div>
        </div>
        <ul ref="msgBox">
          <li v-for='(item, index) in stPushMessageList' :key="index">
            <div class="content">
              <div class="modular" v-if="item.messageType === 'announcement'">
                <span>公告</span>
                <p>{{item.messageContent}}</p>
                <div class="btn">
                  <el-button @click="checkDetails('announcement',item.messageTitle,item.messageContent,item.createTime,item.messageId,item.versionNo,'has_read')">查看详情</el-button>
                  <el-button v-if="item.readState === 'no_read'" @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
              <div class="modular" v-if="item.messageType === 'unsoldProducts'">
                <span>商品通知 </span>
                <p>您的商品:<font color="red">{{item.messageContent}}</font>已滞销,请及时处理</p>
                <div class="btn">
                  <el-button @click="checkDetails('unsoldProducts',null,null,null,null,null,null)">查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
              <div class="modular" v-if="item.messageType === 'abnormalOrder'">
                <span>异常订单通知</span>
                <p>您的订单:<font color="red">{{item.dataSourceId}}</font>出现异常,请及时处理</p>
                <div class="btn">
                  <el-button @click="checkDetails('abnormalOrder',null,null,null,null,null,null)">查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
              <div class="modular" v-if="item.messageType === 'couponOver'">
                <span>活动到期通知</span>
                <p>您的优惠券活动:<font color="red">{{item.messageContent}}</font>已结束,请及时处理</p>
                <div class="btn">
                  <el-button @click="checkDetails('couponOver',null,null,null,null,null,null)">查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
              <div class="modular" v-if="item.messageType === 'seckillOver'">
                <span>活动到期通知</span>
                <p>您的秒杀活动:<font color="red">{{item.messageContent}}</font>已结束,请及时处理</p>
                <div class="btn">
                  <el-button @click="checkDetails('seckillOver',null,null,null,null,null,null)">查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
              <div class="modular" v-if="item.messageType === 'groupBookingOver'">
                <span>活动到期通知</span>
                <p>您的团购活动:<font color="red">{{item.messageContent}}</font>已结束,请及时处理</p>
                <div class="btn">
                  <el-button @click="checkDetails('groupBookingOver',null,null,null,null,null,null)">查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
              <div class="modular" v-if="item.messageType === 'uninoOver'">
                <span>活动到期通知</span>
                <p>您的联盟活动:<font color="red">{{item.messageContent}}</font>已结束,请及时处理</p>
                <div class="btn">
                  <el-button @click="checkDetails('uninoOver',null,null,null,null,null,null)">查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
              <div class="modular" v-if="item.messageType === 'serviceMessage'">
                <span>账号/服务通知</span>
                <p>您的<font color="red">{{item.messageTitle}}</font>门店的<font color="red">{{item.messageContent}}</font>已到期,请及时处理</p>
                <div class="btn">
                  <el-button @click="checkDetails('serviceMessage',null,null,null,null,null,null)">去续费</el-button>
                   <el-button v-if="item.readState === 'no_read'" @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
              <div class="modular" v-if="item.messageType === 'weChatMessage'">
                <span>微信第三方授权通知</span>
                <p>您的微信授权已到期,请及时处理</p>
                <div class="btn">
                  <el-button @click="checkDetails('weChatMessage',null,null,null,item.messageId,item.versionNo,'has_read')">查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
              <div class="modular" v-if="item.messageType === 'systemInforms'">
                <span>系统更新通知</span>
                <p>{{item.messageContent}}</p>
                <div class="btn">
                  <el-button @click="checkDetails('systemInforms',item.messageTitle,item.messageContent,item.createTime,item.messageId,item.versionNo,'has_read')">查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
               <div class="modular" v-if="item.messageType === 'OrderChange'">
                <span>快开单通知</span>
                <p>{{item.messageContent}}</p>
                <div class="btn">
                  <el-button @click="checkDetails('OrderChange',null,null,null,item.messageId,item.versionNo,'has_read', item.dataSourceId)">查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
              <div class="modular" v-if="item.messageType === 'normalOrderDetail'">
                <span>标准订单通知</span>
                <p>{{item.messageContent}}</p>
                <div class="btn">
                  <el-button @click="checkDetails('normalOrderDetail',null,null,null,item.messageId,item.versionNo,'has_read', item.dataSourceId)">查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
              <div class="modular" v-if="item.messageType === 'addCustomer'">
                <span>潜客通知</span>
                <p>{{item.messageContent}}</p>
                <div class="btn">
                  <el-button @click="checkDetails('addCustomer',null,null,null,item.messageId,item.versionNo,'has_read')">查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
              <div class="modular" v-if="item.messageType === 'OrderCareReminder'">
                <span>订单关怀通知</span>
                <p>您有新的订单关怀,请及时处理</p>
                <div class="btn">
                  <el-button @click="checkDetails('OrderCareReminder',null,null,null,item.messageId,item.versionNo,'has_read')">查看</el-button>
                  <el-button v-if="item.readState === 'no_read'"  @click="ignoreMessage(item.messageId,item.versionNo,'ignore')">忽略</el-button>
                </div>
              </div>
            </div>
          </li>
          <li id="moreMsg" class="more-msg" @click="getMoreMsg" >{{pageLimit - notReadCount >0?'已加载全部消息':'点击加载更多....'}}</li>
        </ul>
      </div>
    </div>
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
import { mapGetters } from 'vuex'
import {getStore, setStore, removeStore} from '../../tool/Utils'
import QRCoden from 'qrcode'

const clickoutside = {
  // 初始化指令
  bind (el, binding) {
    function documentHandler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update () { },
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
export default {
  data () {
    return {
      isNotice: false,
      selectStore: '',
      notReadCount: 0,
      stPushMessageList: [],
      messageReadState: 'no_read',
      centerDialogVisible: false,
      dialogData: {
        messageTitle: '',
        messageContent: '',
        messageCreateTime: ''
      },
      userInfo: {},
      pageLimit: 6,
      PageStoreName: '',
      pageStoreId: '',
      loadStoreTree: [],
      serviceOverDay: 0,
      serviceDay: false,
      serviceTXT: '',
      QRcodeImg: ''
    }
  },
  directives: {clickoutside}, // ？
  inject: ['reloadStoreTree', 'reloadAllPage', 'refreshQrCodeService'], // ？
  computed: {
    ...mapGetters(['addRouters', 'storeId', 'storeName', 'storeInfo'])
  },
  mounted () {
    this.loadMarketingStoreTree()
  },
  watch: {
    storeId (a, b) {
      console.log('aaaaaaaaaaaaaaaaaaaaa')
      console.log(a)
      this.loadMarketingStoreTree()
      this.getNotReadCount()
    }
  },
  methods: {
    goService () {
      this.$router.push({path: '/service/serviceDetail'})
    },
    goHelp () {
      this.$router.push({path: '/help/helpCenter'})
    },
    isIEOrEdge () {
      var UA = navigator.userAgent
      /* eslint-disable */
      return (!!window.ActiveXObject? true: false) || ('ActiveXObject' in window? true : false) || (UA.indexOf('Edge') !== -1? true: false)
    },
    // 创建 二维码
    createQrCode () {
      let _this = this
      // 获取门店ID 用户id
      let storeCode = getStore('storeCodeWeb')
      let staffCode = getStore('staffCode')
      let storeShareCode = getStore('storeShareCode')
      let wechatUrl = getStore('wechatUrl')
      let text = wechatUrl+'/home?storeCode=' + storeCode + '&inviter=' + staffCode + '&isFromApp=1&stShareCode=' + storeShareCode
      QRCoden.toDataURL(text, { errorCorrectionLevel: 'H' }, function (err, url) {
        console.log(url)
        _this.QRcodeImg = url
      })
    },
    // 下载二维码
    downloadQR () {
      // 获取base64的图片节点
      let _this = this
      var t
      if (_this.isIEOrEdge()) {
        // var downloadLink = document.getElementById('downloadLink')
        var src = document.getElementById('store-code').childNodes[0].src
        _this.SaveAs5(_this.PageStoreName, src)
      } else {
        clearTimeout(t)
        t = setTimeout(function () {
          var img = document.getElementById('store-code').getElementsByTagName('img')[0]
          let url = ''
          // 构建画布
          var canvas = document.createElement('canvas')
          canvas.width = 1000
          canvas.height = 1000
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
          // 构造url
          url = canvas.toDataURL('image/png')
          // 构造a标签并模拟点击
          var downloadLink = document.getElementById('downloadLink')
          downloadLink.setAttribute('href', url)
          downloadLink.setAttribute('download', _this.PageStoreName + '.png')
          downloadLink.click()
          // this.$message.success('下载成功')
        }, 1000)
      }
    },
    // 获取服务状态
    getStoreServiceData () {
      let storeIdWeb = getStore('storeIdWeb')
      let params = {
        storeId: storeIdWeb
      }
      this.$api.getStoreServiceData(params).then(res => {
        if (res.data && res.data !== null) {
          if (res.data.serviceType !== 'PROBATION') {
            this.serviceOverDay = res.data.endDay
            this.serviceDay = true
          } else {
            this.serviceTXT = '试用版'
            this.serviceDay = false
          }
        } else {
          this.serviceTXT = '无权限'
          this.serviceDay = false
        }
      })
    },
    // 门店下拉选择框
    handleCommand (command) {
      console.log("11111111111")
      console.log(command)
      this.PageStoreName = command.label
      this.pageStoreId = command.id
      setStore('storeIdWeb', this.pageStoreId)
      setStore('storeName', this.PageStoreName)
      setStore('storeShareCode', command.shareCode)
      setStore('storeCodeWeb', command.storeCode)
      this.$store.dispatch('setStoreId', this.pageStoreId)
      this.$store.dispatch('setStoreName', this.PageStoreName)
      this.reloadAllPage()
      this.refreshQrCodeService()
    },
    // 加载门店树信息
    loadMarketingStoreTree () {
      let params = {
        couponId: null
      }
      this.$api.loadMarketingStoreTree(params).then(res => {
        // 判断经销商或员工
        let count = 0
        this.loadStoreTree = res.data
        this.$store.dispatch('setStoreInfo', res)
        setStore('storeInfo', res)
        if (res.data && res.data.length === 1) {
          this.$store.dispatch('setStoreId', res.data[0].id)
          this.$store.dispatch('setStoreName', res.data[0].label)
          setStore('storeIdWeb', res.data[0].id)
          setStore('storeName', res.data[0].label)
          setStore('storeShareId', res.data[0].shareId)
          setStore('storeCodeWeb', res.data[0].storeCode)
        }
        if (res.code === 0 && this.storeInfo === null) {
          res.data.forEach(item => {
            if (item.isChoose === true) {
              this.$store.dispatch('setStoreId', item.id)
              this.$store.dispatch('setStoreName', item.label)
              // 设置默认值
              setStore('storeIdWeb', item.id)
              setStore('storeName', item.label)
              setStore('storeShareId', item.shareId)
              setStore('storeCodeWeb', item.storeCode)
              count++
            }
          })
          if (count === 0) {
            this.$store.dispatch('setStoreId', res.data[0].id)
            this.$store.dispatch('setStoreName', res.data[0].label)
            this.PageStoreName = res.data[0].id
            this.pageStoreId = res.data[0].label
            setStore('storeIdWeb', res.data[0].id)
            setStore('storeName', res.data[0].label)
            setStore('storeShareId', res.data[0].shareId)
            setStore('storeCodeWeb', res.data[0].storeCode)
          }
        }
        // 当前页面
        if (res.msg === 'staff') {
          this.pageStoreId = res.data[0].id
          this.PageStoreName = res.data[0].label
          setStore('storeIdWeb', res.data[0].id)
          setStore('storeName', res.data[0].label)
          setStore('storeShareId', res.data[0].shareId)
          setStore('storeCodeWeb', res.data[0].storeCode)
        } else if (res.msg === 'account') {
          if (this.storeId !== null && this.storeId !== '') {
            this.pageStoreId = this.storeId
            this.PageStoreName = this.storeName
            setStore('storeIdWeb', this.storeId)
            setStore('storeName', this.storeName)
          } else {
            res.data.forEach(item => {
              if (item.isChoose === true) {
                this.pageStoreId = item.id
                this.PageStoreName = item.label
                setStore('storeIdWeb', item.id)
                setStore('storeName', item.label)
                setStore('storeShareId', item.shareId)
                setStore('storeCodeWeb', item.storeCode)
              }
            })
          }
        } else {
          this.pageStoreId = this.storeId
          this.PageStoreName = this.storeName
          setStore('storeIdWeb', this.storeId)
          setStore('storeName', this.storeName)
        }
        this.userInfo.storeName = getStore('storeName')
        this.userInfo.staffName = getStore('staffName')
        this.createQrCode() // Todo 第一个接口调用完成之后，再执行此方法
        this.getStoreServiceData()
      })
    },
    getMoreMsg () {
      if (this.notReadCount > this.pageLimit) {
        this.pageLimit = this.pageLimit + 5
        this.pushMessageGetListData()
      } else {
        this.$message({
          message: '已经加载完所有消息',
          type: 'warning'
        })
      }
    },
    getNotReadCount (values) {
      let params = {
        source: 'store'
      }
      let self = this;
      this.$api.getNotReadCount(params).then(res => {
        console.log('-------------------')
          console.log(res)
        if (res.data !== null) {
          // Todo 这个setlocalstorage不知道干嘛的
          console.log('-------------------')
          console.log(res.data)
          setStore('noReadCount', res.data)
          self.notReadCount = getStore('noReadCount')
          console.log(self.notReadCount)
        }
      })
    },
    // 获取未读所有消息
    pushMessageGetListData () {
      let readPageData = this.messageReadState
      if (readPageData === '9') {
        readPageData = null
      }
      let params = {
        readState: readPageData,
        limit: this.pageLimit,
        page: 1,
        source: 'store'
      }
      this.$api.pushMessageGetListData(params).then(res => {
        this.stPushMessageList = res.data
        this.getNotReadCount()
      })
    },
    password () {
      this.$router.push({path: '/user/password'})
    },
    help () {
      this.$router.push({path: '/help'})
    },
    service () {
      this.$router.push({path: '/service'})
    },
    maintain () {
      this.$router.push({path: '/user/maintain'})
    },
    popup () {
      // this.pageLimit = 6
      this.isNotice = !this.isNotice
      this.pushMessageGetListData()
    },
    closePopup () {
      if (this.isNotice) {
        this.isNotice = false
      }
    },
    selectChange () {
      this.pushMessageGetListData()
    },
    ignoreMessage (messageId, versionNo, readState) {
      this.modifyState(messageId, versionNo, 'has_read')
    },
    checkDetails (type, messageTitle, messageContent, createTime, messageId, versionNo, readState, dataSourceId) {
      // 公告
      if (type === 'announcement') {
        this.$emit('messageCountent', messageTitle, messageContent, createTime, true)
        this.modifyState(messageId, versionNo, readState)
      } else if (type === 'unsoldProducts') { // 滞销商品
        this.$router.push({path: '/store/commManage?state=7'})
      } else if (type === 'abnormalOrder') { // 异常订单提醒
        this.$router.push({path: '/order/orderManage'})
      } else if (type === 'couponOver') { // 优惠券 活动到期通知
        this.$store.dispatch('setCouponChooseIndex', 2)
        this.$router.push({path: '/marketing/storeMarket/activityCoupon'})
      } else if (type === 'seckillOver') { // 秒商品 活动到期通知
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
        this.$emit('messageCountent', messageTitle, messageContent, createTime, true)
        this.modifyState(messageId, versionNo, readState)
      } else if (type === 'systemInforms') { // 系统更新提醒
        this.$emit('messageCountent', messageTitle, messageContent, createTime, true)
        this.modifyState(messageId, versionNo, readState)
      } else if (type === 'OrderCareReminder') { // 订单关怀提醒
        this.$router.push({path: '/order/careManage'})
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
      })
    },
    logout () {
      this.$confirm('确定要注销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeStore('token')
        removeStore('storeId')
        removeStore('storeName')
        // localStorage.clear()
        this.$router.push({path: '/login'})
      },() => {
        console.log('111');
      })
    }
  }
}
</script>





<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.header-store-list{
  max-height:80vh;overflow-y:scroll;
}
.userInfoOp {
  width: 100px;
  // height:103px;
  background:#FFFFFF;
  border:1px solid #E4E7ED;
  box-shadow:0px 2px 12px rgba(0,0,0,0.06);
  text-align: center;
  .opItem1 {
    height: 36px;
    line-height: 36px;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      color: #FD4343;
      background:rgba(253,67,67,0.1);
    }
  }
  .opItem2 {
    height: 36px;
    line-height: 36px;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      color: #FD4343;
      background:rgba(253,67,67,0.1);
    }
  }
}
.storeList {
  width: 146px;
}
.header {
  position: fixed;
  z-index: 1000;
  left: 0;
  right: 0;
  display: flex;
  flex: 1;
  // height: 60px;
  height: 64px;
  justify-content: space-between;
  background: #F8F9FB;
  box-shadow:0px 3px 10px rgba(0,0,0,0.06);
  // @include linear-grad;
  .logo {
    flex: 0 0 150px;
    margin: 0px 0 0 25px;
    img{
      width: 70px;
      // height: 60px;
      height: 40px;
      margin-top: 12px;
      margin-left: 15px;
      cursor: pointer;
    }
    .iconfont {
      color: #fff;
      font-size: 48px;
    }
  }
  .nav {
    margin: 0;
    width: 1000px;
    .first-nav {
      display: flex;
      height: 100%;
      overflow: hidden;
      .first-li {
        line-height: 60px;
        width: 110px;
        text-align: center;
        font-weight: bold;
        // position: relative;
        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        &.active {
          background: rgba(0, 0, 0, 0.1);
        }
        a {
          color: $text-header-color;
          font-size: $md-size;
          display: inline-block;
          width: 100%;
        }
      }
      .second-nav {
        background: $child-nav-bg;
        position: absolute;
        left: 0;
        right: 0;
        top: 60px;
        z-index: -2;
        ul {
          height: 40px;
          width: 500px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 99;
          li {
            line-height: 40px;
            text-align: center;
            display: inline-block;
            position: relative;
            margin: 0 20px;
            font-size: $xs-size;
            &:hover {
              a {
                color: $main-color;
              }
            }
            &.active {
              a {
                color: $main-color;
              }
              &::after {
                @include active-line;
              }
            }
            a {
              font-size: $xs-size;
              color: $text-main-color;
              display: inline-block;
              position: relative;
              bottom: 2px;
            }
          }
        }
      }
    }
  }
  .user {
    flex: 0 0 600px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .customerService {
      display: inline-block;
      margin-top: 3px;
      margin-right: 20px;
      cursor: pointer;
      .message {
        display: block;
        width: 16px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .popover{
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #fff;
      .user-info{
        .text-ellipsis{
          color: #fff;
        }
        .service{
          font-size: 12px;
          border-radius: 7px;
          background: #fff;
          color: #E70020;
          text-align: center;
          width: max-content;
          height: 16px;
          line-height: 16px;
          padding: 0 5px;
        }
      }
    }
    .icon-lb {
      display: inline-block;
      margin-top: 3px;
      margin-right: 20px;
      cursor: pointer;
      .iconfont {
        color: #fff;
        font-size: 29px;
        position: relative;
        .icon-acount{
          position: absolute;
          display: inline-block;
          background-color: #FE4343;
          width: 20px;
          height: 20px;
          text-align: center;
          font-size: 12px;
          border-radius: 50%;
          top: -10px;
          right: -6px;
          font-weight: 500;
          line-height: 20px;
          color: #fff;
          transform: scale(0.5);
        }
        .icon-acount.big {
          width: 36px;
          border-radius:5px;
          right: -19px;
        }
      }
      .message {
        display: block;
        width: 16px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .qrcode{
      position: relative;
      margin-right: 15px;
      &:hover{
        .show-code{
          display: block;
        }
      }
      .bar-qrcode{
        width: 25px;
        height: 40px;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        display: inline-block;
        line-height: 40px;
        vertical-align: bottom;
        &:hover{
          opacity: .8;
        }
        img {
          width: 16px;
          height: 16px;
        }
      }
      .show-code{
        display: none;
      }
      .qrcode-detail{
        display: flex;
        overflow: hidden;
        flex-direction: column;
        position: absolute;
        z-index: 9999;
        left: -75px;
        bottom: -217px;
        border:1px solid rgba(0,0,0,0.16);
        box-shadow: 0 6px 12px 0 rgba(0,0,0,0.2);
        border-radius: 5px;
        // padding: 15px 15px 3px;
        background: #fff;
        &::before{
          content: '';
          display: block;
          position: absolute;
          width:18px;
          height:18px;
          border:1px solid rgba(0, 0, 0, 1);
          background: #fff;
          transform: rotate(45deg);
          z-index: 10;
          border-right: 0;
          border-top: 0;
          border-radius: 4px;
          top: -9px;
          left: 76px;
          border-bottom: none;
          border-left: none;
        }
      }
    }
    .store-select{
      margin-right: 20px;
      font-size: 0;
      .store-right-icon{
        background: url('../../assets/image/icon/headerup.png') no-repeat;
        width: 10px;
        height: 5px;
        margin-left: 5px;
      }
      .user-info{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        cursor: pointer;
        .text-ellipsis{
          height: 40px;
          line-height: 40px;
          color: #fff;
          font-size:0;
          font-weight: normal;
          .photo {
            display: inline-block;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin-right: 3px;
            background: #A6DBFF;
            position: relative;
            top: 6px;
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          .textSize {
            font-size:14px;
            color: #606266;
            margin-right: 4px;
          }
          .dropdownBtn {
            display: inline-block;
            width: 9px;
            height: 6px;
            position: relative;
            top: -2px;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }

        .service{
          display: flex;
          align-items: center;
          border-radius: 5px;
          .service-time{
            // color: #fff;
            color: #FE4343;
            font-size:14px;
            // background: #E70020;
            height: 20px;
            // border-radius: 0 7px 7px 0;
            // padding: 0 5px;
          }
        }
      }
      .vline {
        display: inline-block;
        width:0px;
        height:16px;
        border:1px solid #E1E1E1;
        margin: 0 15px;
        position: relative;
        top: 1px;
      }
      .vline2 {
        display: inline-block;
        width:1px;
        height:16px;
        background: #E1E1E1;
        margin: 0 15px;
        position: relative;
        top: 1px;
      }
      .purchasingService {
        display: inline-block;
        width: 15px;
        height: 15px;
        cursor: pointer;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .store-span{
        // color: #E70020;
        color: #606266;
        background: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        white-space: nowrap;
        text-align: center;
        font-weight: bold;
        font-size: 15px;
        border-radius: 7px 0 0 7px;
        padding: 0 5px;
        font-weight: normal;
      }
    }
    .activeColor{
      color: #fff;
    }
    .user-head {
      display: inline-block;
      position: relative;
      top: 1px;
      img {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        &:hover {
          box-shadow: 0 0 0 2px #fff;
        }
      }
    }
    .text-ellipsis{
      font-weight: bold;
      font-size: 15px;
      position: relative;
      top: -1px;
    }
    .active{
       transform:translateX(0px)!important;
    }
    .notice{
      width: 280px;
      position: fixed;
      top: 64px;
      right:0;
      height: 100%;
      box-shadow: -3px 0px 6px 0px rgba(0,0,0,0.1);
      background: $child-nav-bg;
      z-index: 5;
      transition: all 0.3s;
      transform:translateX(280px);
      .title{
        width: 100%;
        .not-notified{
          display: flex;
          justify-content: space-between;
          padding: 14px;
          background: #fff;
          border-bottom:1px solid $border-color;
          span{
            font-size: $xlg-size;
            color:$text-main-color;
            font-weight: 700;
          }
          .el-button{
            padding: 5px 15px;
            border:1px solid $border-color;
            background: $child-nav-bg;
            color:$text-red-color;
          }
        }
        .option{
          padding: 3px 0;
          font-size: $xlg-size;
          color:$text-main-color;
          border-bottom:1px solid $border-color;
          background: #fff;
          position: relative;
        }
      }
      .content{
        padding: 2px 14px 14px 14px;
        >.modular{
          background:rgba(255,255,255,1);
          box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
          border-radius: 4px ;
          margin-bottom: 14px;
          >span{
            display: inline-block;
            padding: 1px 12px;
            border-radius: 0px 4px 4px 0px ;
            background: $main-color;
            font-size: $xs-size;
            color: #fff;
            margin: 10px 0 0 0;
          }
          >p{
            padding: 10px 12px;
            font-size: $xs-size;
            color:$text-main-color;
          }
          .btn{
            display: flex;
            border-top:1px solid $border-color;
            .el-button{
              flex: 1;
              margin: 0;
              border: none;
              color:$text-gray-color;
              &+.el-button{
                border-left: 1px solid $border-color;
              }
            }
          }
        }
      }
    }
  }
}
.more-msg{
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 80px;
  cursor: pointer;
  color: $blue-color;
}
.menu-bottom{
  display: flex;
  justify-content: center;
  align-items: center;
  background:rgba(221,221,221,1);
  border-radius: 0 0 4px 4px;
  li{
    width: 80px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover{
      background:rgba(239,239,239,1);
    }
    .password{
      background: url('../../assets/image/icon/lock.png') no-repeat;
      background-size: contain;
      display: inline-block;
      width: 12px;
      height: 12px;
    }
    .logout{
      background: url('../../assets/image/icon/logout.png') no-repeat;
      background-size: contain;
      display: inline-block;
      width: 12px;
      height: 12px;
    }
    span{
      color:rgba(102,102,102,1);
      font-size:12px;
    }
  }
}
.dropmenu-store {
  background: #fff;
  text-align:center;
  color:#606266;
  line-height: 36px;
  font-size:14px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  white-space:nowrap;
}
.dropmenu-store:hover {
  background: rgba(253,67,67,0.1);
  color:#FD4343;
}
</style>
