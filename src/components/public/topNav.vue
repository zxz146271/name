<template>
  <div class="top-nav" v-if="storeInfo.data && storeInfo.data.length > 0">
    <ul>
      <!-- <li v-for="(item, index) in breadcrumbList" :key="index">
        <router-link :to="item.path" v-if="item.path !== ''">{{item.title}}</router-link>
        <span v-else>{{item.title}}</span>
      </li> -->
      <!-- <li class="store-name">
        <i></i>
        <span>{{PageStoreName}}</span> -->


        <!-- <div class="qrcode">
          <i class="iconfont icon-erweima bar-qrcode"></i>
          <div class="show-code">
            <div class="qrcode-detail">
              <div id="store-code" style="display: flex;">
                <img :src="QRcodeImg" >
              </div>
              <el-button type="danger" class="down-code" @click="downloadQR">下载店铺二维码</el-button>
              <a id="downloadLink"></a>
            </div>
          </div>
        </div> -->


        <!-- <el-button size="mini" round class="change-btn">切换</el-button> -->
        <!-- <el-dropdown trigger="click" @command="handleCommand" v-show="noStaff">
          <span class="el-dropdown-link">
            <el-button size="mini" round class="change-btn">切换</el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in loadStoreTree" :key="index" :command="item">{{item.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li> -->

      <!-- <li>
        <i class="el-icon-arrow-right next-icon"></i>{{topArr.split(',')[0]}}
      </li>
      <li v-if="topArr.split(',').length > 1">
        <i class="el-icon-arrow-right next-icon"></i>{{topArr.split(',')[1]}}
      </li> -->
      <li style="margin-left:10px;">
        <!-- <i class="el-icon-arrow-right next-icon"></i> -->
        {{$route.matched[1].name}}
      </li>
      <li v-if="$route.path == '/myStore/storeCommodity'">
        <i class="el-icon-arrow-right next-icon"></i>{{topArr.split(',')[1]}}
      </li>
      <li v-if="$route.matched.length > 2">
        <i class="el-icon-arrow-right next-icon"></i>{{$route.matched[2].name}}
      </li>
      <li v-if="$route.path == '/myStore/order/orderAdd'">
        <i class="el-icon-arrow-right next-icon"></i>新订单
      </li>
      <li v-if="$route.path == '/myStore/order/orderDetail' || $route.path == '/myStore/order/easyShipDetail'">
        <i class="el-icon-arrow-right next-icon"></i>订单详情
      </li>
      <li v-if="$route.path == '/myStore/order/orderEdit' || $route.path == '/myStore/order/easyOrderEdit'">
        <i class="el-icon-arrow-right next-icon"></i>订单编辑
      </li>
    </ul>
  </div>
</template>
<script>
import { setStore, getStore } from '../../tool/Utils'
import { mapGetters } from 'vuex'
// import QRCode from 'qrcodejs2'
import QRCoden from 'qrcode'
export default{
  data () {
    return {
      storeList: [],
      navList: [],
      PageStoreName: '',
      loadStoreTree: [],
      noStaff: true,
      arr: [],
      infoOK: false,
      QRcodeImg: ''
    }
  },
  computed: {
    ...mapGetters(['storeInfo', 'storeId', 'storeName'])
  },
  watch: {
    storeInfo () {
      return this.storeInfo
    },
    infoOK (newVal) {
      if (newVal) {
        this.createQrCode()
      }
    }
  },
  mounted () {
    this.createQrCode()
    setTimeout(() => {
      this.initializeSelect()
      // this.createQrCode()
      this.infoOK = true
    }, 500)
  },
  inject: ['reloadAllPage', 'reloadStoreTree', 'refreshQrCodeService'],
  methods: {
    // 加载门店树信息
    initializeSelect () {
      // 判断经销商或员工
      let storeInfo = this.storeInfo
      if (storeInfo.msg === 'staff') {
        this.noStaff = false
        this.loadStoreTree = storeInfo.data
        this.pageStoreId = storeInfo.data[0].id
        this.PageStoreName = storeInfo.data[0].label
      } else if (storeInfo.msg === 'account') {
        this.loadStoreTree = storeInfo.data
        if (this.storeId !== null && this.storeId !== '') {
          this.pageStoreId = this.storeId
          this.PageStoreName = this.storeName
        } else {
          storeInfo.data.forEach(item => {
            if (item.isChoose === true) {
              this.pageStoreId = item.id
              this.PageStoreName = item.label
              setStore('storeIdWeb', this.pageStoreId)
              setStore('storeName', this.PageStoreName)
              setStore('storeShareId', item.shareId)
              setStore('storeCodeWeb', item.storeCode)
              setStore('storeShareCode', item.shareCode)
              this.$store.dispatch('setStoreId', this.pageStoreId)
              this.$store.dispatch('setStoreName', this.PageStoreName)
            }
          })
        }
      } else {
        this.noStaff = false
        this.pageStoreId = this.storeId
        this.PageStoreName = this.storeName
      }
    },
    handleCommand (command) {
      this.PageStoreName = command.label
      this.pageStoreId = command.id
      setStore('storeIdWeb', this.pageStoreId)
      setStore('storeName', this.PageStoreName)
      setStore('storeShareId', command.shareId)
      setStore('storeCodeWeb', command.storeCode)
      setStore('storeShareCode', command.shareCode)
      this.$store.dispatch('setStoreId', this.pageStoreId)
      this.$store.dispatch('setStoreName', this.PageStoreName)
      this.arr = this.$route.path.toString().split('/')
      this.$router.push('/' + this.arr[1] + '/')
      this.arr = []
      this.reloadAllPage()
      // this.reloadStoreTree()
      this.refreshQrCodeService()
    },
    // 创建 二维码
    createQrCode () {
      let _this = this
      // 获取门店ID 用户id
      let storeCode = getStore('storeCodeWeb')
      let staffCode = getStore('staffCode')
      // let staffCode = getStore('staffCode')
      let storeShareCode = getStore('storeShareCode')
       let wechatUrl = getStore('wechatUrl')
      let text = wechatUrl+'/home?storeCode=' + storeCode + '&inviter=' + staffCode + '&isFromApp=1&stShareCode=' + storeShareCode
      QRCoden.toDataURL(text, { errorCorrectionLevel: 'L' }, function (err, url) {
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
          canvas.width = 200
          canvas.height = 200
          canvas.getContext('2d').drawImage(img, 0, 0)
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
    isIEOrEdge () {
      var UA = navigator.userAgent
      /* eslint-disable */
      return (!!window.ActiveXObject? true: false) || ('ActiveXObject' in window? true : false) || (UA.indexOf('Edge') !== -1? true: false)
    },
    /* eslint-disable */
    SaveAs5 (fileName, content) {
      var blob = this.base64Img2Blob(content)
      window.navigator.msSaveBlob(blob, fileName + '.png')
    },
    base64Img2Blob (code) {
      var parts = code.split(';base64,')
      var contentType = parts[0].split(':')[1]
      var raw = window.atob(parts[1])
      var rawLength = raw.length
      var uInt8Array = new Uint8Array(rawLength)
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], {type: contentType})
    }
  },
  props: ['topArr']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
@import '../../assets/style/components/elbtn';
.top-nav{
  height: 40px;
  line-height: 40px;
  background: #F4F4F4;
  border-radius: 10px;
  margin: 15px 0;
  ul{
    display: flex;
    .store-name{
      display: flex;
      align-items: center;
      >i{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../../assets/image/slideicon/dianpu_icon.png') no-repeat;
        margin: 0 10px;
      }
      span{
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
      .change-btn{
        margin: 0 10px;
      }
    }
    li{
      font-size: 12px;
      color: #000;
      .next-icon{
        margin: 0 10px;
      }
    }
  }
  .qrcode{
    position: relative;
    &:hover{
      .show-code{
        display: block;
      }
    }
    .bar-qrcode{
      width: 25px;
      height: 40px;
      color: #999;
      font-size: 24px;
      cursor: pointer;
      display: inline-block;
      line-height: 40px;
      vertical-align: bottom;
      &:hover{
        opacity: .8;
      }
    }
    .show-code{
      display: none;
    }
    .qrcode-detail{
      display: flex;
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
}
</style>
