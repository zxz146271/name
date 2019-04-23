<template>
  <div id="app" class="app" v-if="isRouterAlive">
    <el-container :class="$route.path != '/registered' && $route.path != '/login' && $route.path != '/recoverPwd' && $route.path != '/' && $route.path != '/mHome' ? 'app-container' : 'app-container app-container-login'" direction="vertical">
      <!-- 顶部 -->
      <x-header class="app-header" @messageCountent = "messageCountent"></x-header>
      <el-container class="app-smbox">
        <!-- 左边导航 -->
        <el-aside class="app-sider" v-if="showMenu">
          <el-col>
            <el-menu
              class="el-menu-vertical-demo"
              unique-opened
              background-color="#F8F9FB"
              text-color="#303133"
              active-text-color="#FD4343"
              style="border-right:none"
              @select="handleSelect"
              >
              <menuOne :sideItem="userinform.navDatas" :selectKey="selectKey" :openKey="openKey"></menuOne>
            </el-menu>
          </el-col>
        </el-aside>
        <!-- 内容区域 -->
        <el-container class="app-mainbox" direction="vertical">
          <!-- 面包屑导航 -->
          <!-- Todo -->
          <!-- <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-if="$route.path != '/home'" :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="openKey" v-for="(item,index) in $route.matched" :key="index" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb> -->
          <!-- 主要内容 -->
          <router-view class="app-main"></router-view>
          <!-- 底部 -->
          <x-footer :class="$route.matched[0] && $route.matched[0].path == '/data' ? 'app-footer app-footer-data' : 'app-footer'"></x-footer>
          <!-- <review-footer v-if="showReview" @closeReview="closeReview"></review-footer> -->
          <!-- <coupon-footer v-if="showCoupon" @closeCoupon="closeCoupon"></coupon-footer> -->
          <!-- <maintain-footer v-if="showMaintain" @closeMaintain="closeMaintain"></maintain-footer> -->
        </el-container>
      </el-container>
    </el-container>
    <!-- 消息弹出框 -->
    <!-- 下面这个是不是需要删了 Todo -->
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
import xHeader from './components/header/header'
import xFooter from './components/footer/footer'
import reviewFooter from './components/footer/footerReview'
import couponFooter from './components/footer/footerCoupon'
import maintainFooter from './components/footer/footerMaintain'
import serviceBar from './components/service/serviceBar'
import menuOne from './components/public/menuOne'
import datas from './../static/data.json'
export default {
  name: 'App',
  components: {xHeader, xFooter, serviceBar, reviewFooter, couponFooter, maintainFooter,menuOne},
  data () {
    return {
      index: '',
      selectKey: '',
      openKey:[],
      clickIndex: '',
      showReview: true,
      showCoupon: true,
      showMaintain: true,
      centerDialogVisible: false,
      isRouterAlive: true,
      isRouterAlive2: true,
      dialogData: {
        messageTitle: '',
        messageContent: '',
        createTime: ''
      },
      refreshQrCode: true,
      userinform: {},
      showMenu: false, //是否显示导航栏
    }
  },
  provide () {
    return {
      reloadAllPage: this.reload,
      reloadStoreTree: this.reloadStore,
      refreshQrCodeService: this.refreshQrCodeService
    }
  },
  watch: {
    userinform (val) {
      this.showMenu = true
    }
  },
  mounted () {
    this.userinform = datas;
  },
  methods: {
    handleSelect(key, path){
      this.selectKey = key;
      this.openKey = path;

    console.log('==========================123')
    console.log(this.$route.matched[0].path)
    },
    refreshQrCodeService () {
      this.refreshQrCode = false
      this.$nextTick(() => {
        this.refreshQrCode = true
      })
    },
    closeReview () {
      this.showReview = false
    },
    closeCoupon () {
      this.showCoupon = false
    },
    closeMaintain () {
      this.showMaintain = false
    },
    a () {
      this.centerDialogVisible = true
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    reloadStore () {
      this.isRouterAlive2 = false
      this.$nextTick(() => {
        this.isRouterAlive2 = true
      })
    },
    messageCountent (messageTitle, messageContent, createTime, value) {
      if (value) {
        this.centerDialogVisible = true
        this.dialogData.messageTitle = messageTitle
        this.dialogData.messageContent = messageContent
        this.dialogData.createTime = createTime
      }
    }
  }
}
</script>
<style lang="scss">
@import './assets/style/common.scss';
.app-container{
  width: 100%;
  height:100%;
  padding-top: 64px;
  position: relative;
  overflow: hidden;
}
.app-header{
  height:64px;
  position: fixed;
  top: 0;
  left: 0;
}
.app-smbox{
  width: 100%;
  height: 100%;
  padding-left: 244px;
  padding-right: 10px;
  position: relative;
  background: #F8F9FB;
}
.app-sider{
  width: 244px !important;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
}
.app-mainbox{
  width: 100%;
  height: 100%;
  padding: 20px 10px 0 10px;
  overflow-x: auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.app-main{
  min-width: 800px;
  width: 100%;
  height: auto;
  background-color: #fff;
}
.app-footer{
  min-width: 800px;
  width: 100%;
  background-color: #fff; 
}
.app-footer.app-footer-data {
  min-width: 952px;
}
.app-breadcrumb{
  background-color: #fff;
  padding: 20px;

}

.app-container.app-container-login{
  padding-top: 0;
  .app-header {
    display: none;
  }
  .app-sider {
    display: none;
  }
  .app-footer{
    display: none;
  }
  .app-smbox{
    padding-left: 0;
    padding: 0;
  }
  .app-mainbox{
    padding: 0;
  }
  .app-breadcrumb{
    display: none;
  }
}

.newFooter {
  height: 40px;
  padding: 0;
}
.first-li {
  &.active {
    background: rgba(0, 0, 0, 0.1);
  }
}

// 滚动条
::-webkit-scrollbar
{
    width:6px;
    height: 6px;
    padding: 10px;
}
::-webkit-scrollbar-track-piece
{
    width:6px;
    height: 6px;
}
::-webkit-scrollbar-thumb:vertical
{
    height: 5px;
    background-color: #e3e3e3;
    border-radius: 6px;
}
::-webkit-scrollbar-thumb:horizontal
{
    width: 5px;
    background-color: #e3e3e3;
    border-radius: 6px;
}

</style>
