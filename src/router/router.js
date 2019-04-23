import Vue from 'vue'
import Router from 'vue-router'
// 登录
// const login = resolve => require.ensure([], () => resolve(require('../page/login/login')), 'login')
import login from '../page/login/login'
// 注册
const registered = resolve => require.ensure([], () => resolve(require('../page/login/registered')), 'registered')
// 密码找回
const recoverPwd = resolve => require.ensure([], () => resolve(require('../page/login/recoverPwd')), 'recoverPwd')
// 首页
const home = resolve => require.ensure([], () => resolve(require('../page/home/home')), 'home')
const myStore = resolve => require.ensure([], () => resolve(require('../page/myStore/myStore')), 'myStore')
const storeStaffManage = resolve => require.ensure([], () => resolve(require('../page/myStore/child/storeStaffManage')), 'storeStaffManage')
// 首页
const publicHome = resolve => require.ensure([], () => resolve(require('../page/home/publicHome')), 'publicHome')
// 移动端首页
// const mHome = resolve => require.ensure([], () => resolve(require('../page/home/mHome')), 'mHome')
// import home from '../page/home/home'
Vue.use(Router)
// 商品
// const commodity = resolve => require.ensure([], () => resolve(require('../page/commodity/commodity')), 'commodity')
const commManage = resolve => require.ensure([], () => resolve(require('../page/commodity/child/commManage')), 'commManage')
// const sortManage = resolve => require.ensure([], () => resolve(require('../page/commodity/child/sortManage')), 'sortManage')
const labelRoles = resolve => require.ensure([], () => resolve(require('../page/commodity/child/labelRoles')), 'labelRoles')
const brandsManage = resolve => require.ensure([], () => resolve(require('../page/commodity/child/brandsManage')), 'brandsManage')
const commEdit = resolve => require.ensure([], () => resolve(require('../page/commodity/child/commEdit')), 'commEdit')
// 客户中心
// const customer = resolve => require.ensure([], () => resolve(require('../page/customer/customer')), 'customer')
// const allCustomer = resolve => require.ensure([], () => resolve(require('../page/customer/child/allCustomer')), 'allCustomer')
// const customTag = resolve => require.ensure([], () => resolve(require('../page/customer/child/customTag')), 'customTag')
// const customSpeed = resolve => require.ensure([], () => resolve(require('../page/customer/child/customSpeed')), 'customSpeed')
// 订单
const order = resolve => require.ensure([], () => resolve(require('../page/order/order')), 'order')
const orderManage = resolve => require.ensure([], () => resolve(require('../page/order/child/orderManage')), 'orderManage')
const careManage = resolve => require.ensure([], () => resolve(require('../page/order/child/careManage')), 'careManage')
const orderDetail = resolve => require.ensure([], () => resolve(require('../page/order/child/orderDetail')), 'orderDetail')
const orderAdd = resolve => require.ensure([], () => resolve(require('../page/order/child/orderAdd')), 'orderAdd')
const shipDetail = resolve => require.ensure([], () => resolve(require('../page/order/child/shipDetail')), 'shipDetail')
const orderComplete = resolve => require.ensure([], () => resolve(require('../page/order/child/orderComplete')), 'orderComplete')
const orderRefund = resolve => require.ensure([], () => resolve(require('../page/order/child/orderRefund')), 'orderRefund')
const orderEdit = resolve => require.ensure([], () => resolve(require('../page/order/child/orderEdit')), 'orderEdit')
// 简化订单
const easyOrderManage = resolve => require.ensure([], () => resolve(require('../page/order/child/easyOrderManage')), 'easyOrderManage')
const easyOrderAdd = resolve => require.ensure([], () => resolve(require('../page/order/child/easyOrderAdd')), 'easyOrderAdd')
const easyShipDetail = resolve => require.ensure([], () => resolve(require('../page/order/child/easyShipDetail')), 'easyShipDetail')
const easyOrderEdit = resolve => require.ensure([], () => resolve(require('../page/order/child/easyOrderEdit')), 'easyOrderEdit')
// ERP对接快开单
const erpEasyOrderManage = resolve => require.ensure([], () => resolve(require('../page/order/child/erpEasyOrderManage')), 'erpEasyOrderManage')
// 在线订单
// const onlineOrders = resolve => require.ensure([], () => resolve(require('@/page/order/child/onlineOrders')), 'onlineOrders')
// 营销
const marketing = resolve => require.ensure([], () => resolve(require('../page/marketing/marketing')), 'marketing')
const storeMarket = resolve => require.ensure([], () => resolve(require('../page/marketing/storeMarket')), 'storeMarket')
const magicBox = resolve => require.ensure([], () => resolve(require('../page/marketing/magicBox')), 'magicBox')
// 魔盒服务 addSMSTemplate
const SMSTemplate = resolve => require.ensure([], () => resolve(require('../page/marketing/child/SMSTemplate')), 'SMSTemplate')
const addSMSTemplate = resolve => require.ensure([], () => resolve(require('../page/marketing/child/addSMSTemplate')), 'addSMSTemplate')
const storeBox = resolve => require.ensure([], () => resolve(require('../page/marketing/child/storeBox')), 'storeBox')
const boxManage = resolve => require.ensure([], () => resolve(require('../page/marketing/child/boxManage')), 'boxManage')
const SMSService = resolve => require.ensure([], () => resolve(require('../page/marketing/child/SMSService')), 'SMSService')
const SMSPush = resolve => require.ensure([], () => resolve(require('../page/marketing/child/SMSPush')), 'SMSPush')
const addSMSPush = resolve => require.ensure([], () => resolve(require('../page/marketing/child/addSMSPush')), 'addSMSPush')
// 营销活动-优惠券
const activityCoupon = resolve => require.ensure([], () => resolve(require('../page/marketing/child/activityCoupon')), 'activityCoupon')
// 营销活动-团购
const activityCollage = resolve => require.ensure([], () => resolve(require('../page/marketing/child/activityCollage')), 'activityCollage')
// 营销活动-联盟
const activityLeague = resolve => require.ensure([], () => resolve(require('../page/marketing/child/activityLeague')), 'activityLeague')
// 营销活动-秒商品
const activityGrab = resolve => require.ensure([], () => resolve(require('../page/marketing/child/activityGrab')), 'activityGrab')
// 营销-卡券核销
const writeOff = resolve => require.ensure([], () => resolve(require('../page/marketing/child/writeOff')), 'writeOff')
// 营销-卡卷核销详情
const writeOffDetail = resolve => require.ensure([], () => resolve(require('../page/marketing/child/writeOffDetail')), 'writeOffDetail')
// 营销-营销活动
// const markActivity = resolve => require.ensure([], () => resolve(require('../page/marketing/child/markActivity')), 'markActivity')
// 营销-营销活动-优惠券
const marketCoupon = resolve => require.ensure([], () => resolve(require('../page/marketing/child/marketCoupon')), 'marketCoupon')
// 营销-营销活动-秒商品
const marketPrefer = resolve => require.ensure([], () => resolve(require('../page/marketing/child/marketPrefer')), 'marketPrefer')
// 营销-营销活动-团购
const marketGroup = resolve => require.ensure([], () => resolve(require('../page/marketing/child/marketGroup')), 'marketGroup')
// 营销-营销活动-联盟
const marketLeague = resolve => require.ensure([], () => resolve(require('../page/marketing/child/marketLeague')), 'marketLeague')
// 营销-营销活动-优惠券-编辑
const marketDiscount = resolve => require.ensure([], () => resolve(require('../page/marketing/child/marketDiscount')), 'marketDiscount')
// 营销-营销活动-秒商品券-编辑
const marketRob = resolve => require.ensure([], () => resolve(require('../page/marketing/child/marketRob')), 'marketRob')
// 营销-营销活动-秒商品券-编辑
const marketCollage = resolve => require.ensure([], () => resolve(require('../page/marketing/child/marketCollage')), 'marketCollage')
// 营销-营销活动-联盟-编辑
const marketUnion = resolve => require.ensure([], () => resolve(require('../page/marketing/child/marketUnion')), 'marketUnion')
// 营销-营销活动-联盟-联盟活动券详情
const marketUnionDetails = resolve => require.ensure([], () => resolve(require('../page/marketing/child/marketUnionDetails')), 'marketUnionDetails')
// 营销-营销活动-联盟-新增联盟优惠券
const marketUnionDiscount = resolve => require.ensure([], () => resolve(require('../page/marketing/child/marketUnionDiscount')), 'marketUnionDiscount')
// 会员
const member = resolve => require.ensure([], () => resolve(require('../page/member/member')), 'member')
// 自定义标签
const customTag = resolve => require.ensure([], () => resolve(require('../page/member/child/customTag')), 'customTag')
// 自定义进度
const customSpeed = resolve => require.ensure([], () => resolve(require('../page/member/child/customSpeed')), 'customSpeed')
// 会员-会员管理
const memberAdministration = resolve => require.ensure([], () => resolve(require('../page/member/child/memberAdministration')), 'memberAdministration')
// 会员-多门店会员管理列表
const allMemberAdministration = resolve => require.ensure([], () => resolve(require('../page/member/child/allMemberAdministration')), 'allMemberAdministration')
// 会员-积分规则
const memberIntegral = resolve => require.ensure([], () => resolve(require('../page/member/child/memberIntegral')), 'memberIntegral')
// 会员-标签规则
const memberLabel = resolve => require.ensure([], () => resolve(require('../page/member/child/memberLabel')), 'memberLabel')
// 会员-会员关怀
const memberCare = resolve => require.ensure([], () => resolve(require('../page/member/child/memberCare')), 'memberCare')
// const memberCare = resolve => require.ensure([], () => resolve(require('../page/member/child/memberCare')), 'memberCare')
// 会员-会员管理-编辑
const memberEdit = resolve => require.ensure([], () => resolve(require('../page/member/child/memberEdit')), 'memberEdit')
// 会员-会员管理-新增
const memberAdd = resolve => require.ensure([], () => resolve(require('../page/member/child/memberAdd')), 'memberAdd')
// 会员-会员管理(已购客户管理)-详情
const memberAdministrationInfoDetail = resolve => require.ensure([], () => resolve(require('../page/member/child/memberAdministrationInfoDetail')), 'memberAdministrationInfoDetail')
// // 会员-潜客管理
const submemberManage = resolve => require.ensure([], () => resolve(require('../page/member/child/submemberManage')), 'submemberManage')
// // 会员-潜客管理-新增
const submemberAdd = resolve => require.ensure([], () => resolve(require('../page/member/child/submemberAdd')), 'submemberAdd')
// 会员-潜客管理-编辑
const submemberEdit = resolve => require.ensure([], () => resolve(require('../page/member/child/submemberEdit')), 'submemberEdit')
// 会员-潜客管理-详情
const submemberInfoDetail = resolve => require.ensure([], () => resolve(require('../page/member/child/submemberInfoDetail')), 'submemberInfoDetail')
// 登录
// 数据
const data = resolve => require.ensure([], () => resolve(require('../page/data/data')), 'data')
const allStoreData = resolve => require.ensure([], () => resolve(require('../page/data/allStoreData')), 'allStoreData')
const oneStoreData = resolve => require.ensure([], () => resolve(require('../page/data/oneStoreData')), 'oneStoreData')
// 数据-数据概况
const dataOverview = resolve => require.ensure([], () => resolve(require('../page/data/child/dataOverview')), 'dataOverview')
// 数据-会员分析
const analysisMember = resolve => require.ensure([], () => resolve(require('../page/data/child/analysisMember')), 'analysisMember')
// 数据-微店分析
const analysisStore = resolve => require.ensure([], () => resolve(require('../page/data/child/analysisStore')), 'analysisStore')
// 数据-商品分析
const analysisGoods = resolve => require.ensure([], () => resolve(require('../page/data/child/analysisGoods')), 'analysisGoods')
// 数据-单品分析
// const analysisShop = resolve => require.ensure([], () => resolve(require('../page/data/child/analysisShop')), 'analysisShop')
// 数据-交易分析
const analysisTrade = resolve => require.ensure([], () => resolve(require('../page/data/child/analysisTrade')), 'analysisTrade')

// 内容分发数据
const analysisContent = resolve => require.ensure([], () => resolve(require('../page/data/child/analysisContent')), 'analysisContent')

// 案例管理
const caseView = resolve => require.ensure([], () => resolve(require('../page/case/case')), 'case')
const caseManage = resolve => require.ensure([], () => resolve(require('../page/case/child/caseManage')), 'caseManage')
const caseEdit = resolve => require.ensure([], () => resolve(require('../page/case/child/caseEdit')), 'caseEdit')
const caseTypeManage = resolve => require.ensure([], () => resolve(require('../page/case/child/caseTypeManage')), 'caseTypeManage')
// 门店
const store = resolve => require.ensure([], () => resolve(require('../page/store/store')), 'store')
const storeManage = resolve => require.ensure([], () => resolve(require('../page/store/child/storeManage')), 'storeManage')
const mStoreManage = resolve => require.ensure([], () => resolve(require('../page/store/child/mStoreManage')), 'mStoreManage')
const storeCommidity = resolve => require.ensure([], () => resolve(require('../page/store/child/storeCommidity')), 'storeCommidity')
const staffManage = resolve => require.ensure([], () => resolve(require('../page/store/child/staffManage')), 'staffManage')
const storeAdd = resolve => require.ensure([], () => resolve(require('../page/store/child/storeAdd')), 'storeAdd')
const storeEdit = resolve => require.ensure([], () => resolve(require('@/page/store/child/storeEdit')), 'storeEdit')
// 微店内容管理(发现)
const storeDynamicManagement = resolve => require.ensure([], () => resolve(require('../page/myStore/child/storeDynamicManagement')), 'storeDynamicManagement')

// 未上架内容
const contentUnshelved = resolve => require.ensure([], () => resolve(require('../page/myStore/child/contentUnshelved')), 'contentUnshelved')

// 品牌故事管理
// const brandStoryView = resolve => require.ensure([], () => resolve(require('../page/brandStory/brandStory')), 'brandStoryView')
const brandStoryEdit = resolve => require.ensure([], () => resolve(require('../page/brandStory/child/brandStoryEdit')), 'brandStoryEdit')
// const brandStoryManage = resolve => require.ensure([], () => resolve(require('../page/brandStory/child/brandStoryManage')), 'brandStoryManage')
// 角色管理
const roleView = resolve => require.ensure([], () => resolve(require('../page/role/role')), 'roleView')
const roleManage = resolve => require.ensure([], () => resolve(require('../page/role/child/roleManage')), 'roleManage')
const authorize = resolve => require.ensure([], () => resolve(require('../page/role/child/authorize')), 'authorize')
// 服务购买
const service = resolve => require.ensure([], () => resolve(require('@/page/service/service')), 'service')
const serviceDetail = resolve => require.ensure([], () => resolve(require('@/page/service/child/serviceDetail')), 'serviceDetail')
const serviceInvoices = resolve => require.ensure([], () => resolve(require('@/page/service/child/serviceInvoices')), 'serviceInvoices')
const invoiceHistory = resolve => require.ensure([], () => resolve(require('@/page/service/child/invoiceHistory')), 'invoiceHistory')
const aliPayPage = resolve => require.ensure([], () => resolve(require('@/page/service/child/aliPayPage')), 'aliPayPage')
const payResult = resolve => require.ensure([], () => resolve(require('@/page/service/child/payResult')), 'payResult')
// 修改密码
const password = resolve => require.ensure([], () => resolve(require('@/page/user/password')), 'password')

// 我的
const mine = resolve => require.ensure([], () => resolve(require('@/page/mine/contentLibrary')), 'contentLibrary')
// 我的内容库
const countAllofme = resolve => require.ensure([], () => resolve(require('@/page/mine/child/contentAllofme')), 'contentAllofme')
// 酷家乐绑定
const coolKnorr = resolve => require.ensure([], () => resolve(require('@/page/mine/child/coolKnorr')), 'coolKnorr')
// 我的回收站
const contentRecycle = resolve => require.ensure([], () => resolve(require('@/page/mine/child/contentRecycle')), 'contentRecycle')
//  品牌内容回收站
const contentRecycleBrand = resolve => require.ensure([], () => resolve(require('@/page/store/child/contentRecycle')), 'contentRecycle')
// 创建全景图
// const panorama = resolve => require.ensure([], () => resolve(require('../page/mine/child/panorama')), 'panorama')

// 创建案例
const caseDetail = resolve => require.ensure([], () => resolve(require('../page/mine/child/caseDetail')), 'caseDetail')

// 创建文章
const creatArticles = resolve => require.ensure([], () => resolve(require('../page/mine/child/creatArticles.vue')), 'creatArticles')

// 创建图册，添加图册
const creatPhotoAlbum = resolve => require.ensure([], () => resolve(require('../page/mine/child/creatPhotoAlbum')), 'creatPhotoAlbum')

const creatPanorama = resolve => require.ensure([], () => resolve(require('../page/mine/child/creatPanorama')), 'creatPanorama')

// 信息维护
const maintain = resolve => require.ensure([], () => resolve(require('@/page/user/maintain')), 'maintain')

// 品牌内容库
const brandContent = resolve => require.ensure([], () => resolve(require('@/page/store/child/brandContent')), 'brandContent')

// 关联下级
const associatedLower = resolve => require.ensure([], () => resolve(require('@/page/store/child/associatedLower')), 'associatedLower')

// 帮助中心
const help = resolve => require.ensure([], () => resolve(require('@/page/help/help')), 'help')
const helpCenter = resolve => require.ensure([], () => resolve(require('@/page/help/child/helpCenter')), 'helpCenter')
const helpProblem = resolve => require.ensure([], () => resolve(require('@/page/help/child/helpProblem ')), 'helpProblem ')
// 微店
const shop = resolve => require.ensure([], () => resolve(require('@/page/shop/shop')), 'shop')
const survey = resolve => require.ensure([], () => resolve(require('@/page/shop/child/survey')), 'survey')
const microPage = resolve => require.ensure([], () => resolve(require('@/page/shop/child/microPage')), 'microPage')
const publicNumber = resolve => require.ensure([], () => resolve(require('@/page/shop/child/publicNumber')), 'publicNumber')
const sharePicture = resolve => require.ensure([], () => resolve(require('@/page/shop/child/sharePicture')), 'sharePicture')
const shopMember = resolve => require.ensure([], () => resolve(require('@/page/shop/child/shopMember')), 'shopMember')
const carousel = resolve => require.ensure([], () => resolve(require('@/page/shop/child/carousel')), 'carousel')
const recommendGoods = resolve => require.ensure([], () => resolve(require('@/page/shop/child/recommendGoods')), 'recommendGoods')
// // 消息管理
// const message = resolve => require.ensure([], () => resolve(require('@/page/message/message')), 'message')
// const messageMana = resolve => require.ensure([], () => resolve(require('@/page/message/child/messageMana')), 'messageMana')
// const messageView = resolve => require.ensure([], () => resolve(require('@/page/message/child/messageView')), 'messageView')

// 业绩
const performance = resolve => require.ensure([], () => resolve(require('@/page/performance/performance')), 'performance')
const performanceMana = resolve => require.ensure([], () => resolve(require('@/page/performance/child/performanceMana')), 'performanceMana')
const performanceView = resolve => require.ensure([], () => resolve(require('@/page/performance/child/performanceView')), 'performanceView')
const performanceMoney = resolve => require.ensure([], () => resolve(require('@/page/performance/child/performanceMoney')), 'performanceMoney')
// 财务中心
const financeCenter = resolve => require.ensure([], () => resolve(require('@/page/financeCenter/financeCenter')), 'financeCenter')
const myAccount = resolve => require.ensure([], () => resolve(require('@/page/financeCenter/child/myAccount')), 'myAccount')
const withdraw = resolve => require.ensure([], () => resolve(require('@/page/financeCenter/child/withdraw')), 'withdraw')
const withdrawSucc = resolve => require.ensure([], () => resolve(require('@/page/financeCenter/child/withdrawSucc')), 'withdrawSucc')
const signResult = resolve => require.ensure([], () => resolve(require('@/page/financeCenter/child/signResult')), 'signResult')
/*
说明：
我们把router和导航拆掉了
router在下面
导航在data.json里面配置
*/
export const routes = [
  /* eslint-disable */
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: '首页',
    component: home,
    meta: {
      requireAuth: true,
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/recoverPwd',
    name: 'recoverPwd',
    component: recoverPwd
  },
  {
    path: '/registered',
    name: 'registered',
    component: registered
  },
  {
    path: '/user/password',
    name: 'password',
    component: password
  },
  {
    path: '/aliPayPage',
    name: 'aliPayPage',
    component: aliPayPage
  },
  //我的 countAllofme  mine contentLibrary
  {
    path: '/mine',
    name: '我的',
    component: mine,
    redirect: '/mine/countAllofme',
    meta: {
      requireAuth: true,
      keepAlive: false
    },
    children: [
      // {
      //   path: 'countAllofme/panorama',
      //   name: '创建全景图',
      //   component: panorama,
      // },
      {
        path: 'countAllofme',
        name: '我的内容库',
        component: countAllofme
      },
      {
        path: 'countAllofme/coolKnorr',
        name: '酷家乐绑定',
        component: coolKnorr
      },
      {
        path:'countAllofme/contentRecycle',
        name: '回收站',
        component: contentRecycle
      },
      {
        path:'countAllofme/caseDetail',
        name: '创建案例',
        component: caseDetail
      },
      {
        path:'countAllofme/creatArticles',
        name: '创建文章',
        component: creatArticles
      },
      {
        path: 'countAllofme/creatPhotoAlbum',
        name: '创建图册',
        component: creatPhotoAlbum
      },
      {
        path: 'countAllofme/creatPanorama',
        name: '创建全景图',
        component: creatPanorama
      },
      {
        path:'countAllofme/editDetail',
        name: '编辑案例',
        component: caseDetail
      },
      {
        path:'countAllofme/editArticles',
        name: '编辑文章',
        component: creatArticles
      },
      {
        path: 'countAllofme/editPhotoAlbum',
        name: '编辑图册',
        component: creatPhotoAlbum
      },
      {
        path: 'countAllofme/editPanorama',
        name: '编辑全景图',
        component: creatPanorama
      }
    ]
  },
  // 帮助中心
  {
    path: '/help',
    name: '帮助中心',
    component: help,
    redirect: '/help/helpCenter',
    meta: {
      requireAuth: true,
      keepAlive: false
    },
    children: [
      {
        path: 'helpCenter',
        name: '帮助中心',
        component: helpCenter,
      },
      {
        path: 'helpProblem',
        name: '常见问题',
        component: helpProblem,
      }
    ]
  },
  {
    path: '/myStore',
    name: '门店',
    component: myStore,
    redirect: '/myStore/storeCommodity',
    meta: {
      requireAuth: true,
      keepAlive: false
    },
    children: [
      {
        path: 'storeCommodity',
        name: '门店商品',
        component: storeCommidity,
      },
      // 订单
      {
        path: 'order',
        name: '订单',
        component: order,
        redirect: 'order/orderManage',
        meta: {
          requireAuth: true,
          keepAlive: false
        },
        children: [
          {
            path: 'orderManage',
            name: '标准订单',
            component: orderManage,
          },
          {
            path: 'careManage',
            name: '需要关怀的订单',
            component: careManage,
          },
          {
            path: 'easyOrderManage',
            name: '快开单',
            component: easyOrderManage,
          },
          {
            path: 'erpEasyOrderManage',
            name: 'ERP对接订单',
            component: erpEasyOrderManage,
          },
          {
            path: 'orderDetail',
            name: '标准订单',
            component: orderDetail,
          },
          {
            path: 'orderEdit',
            name: '标准订单',
            component: orderEdit,
          },
          {
            path: 'easyOrderEdit',
            name: '快开单',
            component: easyOrderEdit,
          },
          {
            path: 'shipDetail',
            name: '标准订单',
            component: shipDetail,
          },
          {
            path: 'easyShipDetail',
            name: '快开单',
            component: easyShipDetail,
          },
          {
            path: 'orderAdd',
            name: '标准订单',
            component: orderAdd,
          },
          {
            path: 'easyOrderAdd',
            name: '快开单',
            component: easyOrderAdd,
          },
          {
            path: 'orderComplete',
            name: '标准订单',
            component: orderComplete,
          },
          {
            path: 'orderRefund',
            name: '标准订单',
            component: orderRefund,
          },
          // {
          //   path: 'onlineOrders',
          //   name: '在线订单',
          //   component: onlineOrders,
          // },
        ]
      },
      // {
      //   path: 'customer',
      //   name: '客户中心',
      //   component: customer,
      //   redirect: 'customer/allCustomer',
      //   isMenu: true,
      //   meta: {
      //     requireAuth: true,
      //     keepAlive: false
      //   },
      //   children: [
      //     {
      //       path: 'allCustomer',
      //       name: '全部客户',
      //       component: allCustomer,
      //       isMenu: true
      //     },
      //     {
      //       path: 'customTag',
      //       name: '自定义客户标签',
      //       component: customTag,
      //       isMenu: true
      //     },
      //     {
      //       path: 'customSpeed',
      //       name: '自定义跟进进度',
      //       component: customSpeed,
      //       isMenu: true
      //     },
      //   ]
      // },
      // 会员 潜客 老客户
      {
        path: 'member',
        name: '客户中心',
        // name: '消费者中心',
        component: member,
        redirect: 'member/memberAdministration',
        isMenu: true,
        meta: {
          requireAuth: true,
          keepAlive: false
        },
        children: [
          {
            path: 'memberAdministration',
            name: '已购客户管理',
            component: memberAdministration,
          },
          {
            path: 'memberAdministrationInfoDetail',
            name: '已购客户管理详情',
            component: memberAdministrationInfoDetail,
          },
          {
            path: 'memberIntegral',
            name: '积分规则',
            component: memberIntegral,
          },
          {
            path: 'memberCare',
            name: '已购客户关怀',
            component: memberCare,
          },
          {
            path: 'customTag',
            name: '自定义客户标签',
            component: customTag,
          },
          {
            path: 'customSpeed',
            name: '自定义跟进进度',
            component: customSpeed,
          },
          {
            path: 'submemberManage',
            name: '全部客户',
            // name: '潜客管理',
            component: submemberManage,
          },
          {
            path: 'submemberAdd',
            name: '潜客管理新增',
            component: submemberAdd,
          },
          {
            path: 'submemberEdit',
            name: '潜客管理编辑',
            component: submemberEdit,
          },
          {
            path: 'submemberInfoDetail',
            name: '潜客管理详情',
            component: submemberInfoDetail,
          },
          {
            path: 'memberEdit',
            name: '已购客户编辑',
            component: memberEdit,
          },
          {
            path: 'memberAdd',
            name: '已购客户新增',
            component: memberAdd,
          }
        ]
      },
      // 微店
      {
        path: 'shop',
        name: '微店展示',
        component: shop,
        redirect: 'shop/survey',
        children: [
          {
            path: 'survey',
            name: '微店装修',
            component: survey,
          },
          {
            path: 'microPage',
            name: '微页面',
            component: microPage,
          },
          {
            path: 'publicNumber',
            name: '公众号管理',
            component: publicNumber,
          },
          {
            path: 'carousel',
            name: '首页轮播图',
            component: carousel
          },
          {
            path: 'recommendGoods',
            name: '展示推荐商品',
            component: recommendGoods
          },
          {
            path: 'sharePicture',
            name: '自定义分享图图片',
            component: sharePicture,
          },
          {
            path: 'shopMember',
            name: '微店管理页面',
            component: shopMember,
          },
        ]
      },
      // 案例
      {
        path: 'caseView',
        name: '案例',
        component: caseView,
        redirect: 'caseView/caseManage',
        children: [
          {
            path: 'caseManage',
            name: '案例管理',
            component: caseManage,
          },
          {
            path: 'caseEdit',
            name: '案例编辑',
            component: caseEdit,
          },
          {
            path: 'caseTypeManage',
            name: '案例类型管理',
            component: caseTypeManage,
          }
        ]
      },
      // 业绩
      {
        path: 'performance',
        name: '业绩',
        component: performance,
        redirect: 'performance/performanceMana',
        meta: {
          requireAuth: true,
          keepAlive: false
        },
        children: [
          {
            path: 'performanceMana',
            name: '带客数业绩',
            component: performanceMana,
          },
          {
            path: 'performanceView',
            name: '订单量业绩',
            component: performanceView,
          },
          {
            path: 'performanceMoney',
            name: '成交金额业绩',
            component: performanceMoney,
          }
        ]
      },
      // 门店员工管理
      {
        path: 'storeStaffManage',
        name: '员工管理',
        component: storeStaffManage,
      },
      // 微店内容管理(发现)
      {
        path: 'storeDynamicManagement',
        name: '微店内容管理(发现)',
        component: storeDynamicManagement
      },
      {
        path:'creatArticles',
        name: '创建文章',
        component: creatArticles
      },
      {
        path:'caseDetail',
        name: '创建案例',
        component: caseDetail
      },
      {
        path:'creatPhotoAlbum',
        name: '创建图册',
        component: creatPhotoAlbum
      },
      {
        path:'creatPanorama',
        name: '创建全景图',
        component: creatPanorama
      },
      {
        path:'contentUnshelved',
        name: '未上架内容',
        component: contentUnshelved
      }
    ]
  },
  // 促销活动
  {
    path: '/marketing',
    name: '促销活动',
    component: marketing,
    redirect: '/marketing/storeMarket/activityCoupon',
    meta: {
      requireAuth: true,
      keepAlive: false
    },
    children: [
      {
        path: 'storeMarket',
        name: '店铺活动',
        component: storeMarket,
        meta: {
          requireAuth: true,
          keepAlive: false
        },
        children: [
          {
            path: 'activityCoupon',
            name: '优惠券',
            component: activityCoupon,
          },
          {
            path: 'activityGrab',
            name: '秒杀',
            component: activityGrab,
          },
          {
            path: 'activityCollage',
            name: '团购',
            component: activityCollage,
          },
          {
            path: 'marketCoupon',
            name: '优惠券',
            component: marketCoupon,
          },
          {
            path: 'marketPrefer',
            name: '秒杀',
            component: marketPrefer,
          },
          {
            path: 'marketGroup',
            name: '团购',
            component: marketGroup,
          },
          {
            path: 'marketDiscount',
            name: '优惠券',
            component: marketDiscount,
          },
          {
            path: 'marketRob',
            name: '秒杀',
            component: marketRob,
          },
          {
            path: 'marketCollage',
            name: '团购',
            component: marketCollage,
          }
        ]
      },
      {
        path: 'magicBox',
        name: '蘑盒服务',
        component: magicBox,
        meta: {
          requireAuth: true,
          keepAlive: false
        },
        children: [
          {
            path: 'SMSTemplate',
            name: '短信模版',
            component: SMSTemplate,
          },
          {
            path: 'addSMSTemplate',
            name: '新增短信模版',
            component: addSMSTemplate,
          },
          {
            path: 'storeBox',
            name: '门店蘑盒',
            component: storeBox,
          },
          {
            path: 'boxManage',
            name: '蘑客管理',
            component: boxManage,
          },
          {
            path: 'SMSService',
            name: '短信服务',
            component: SMSService,
          },
          {
            path: 'SMSPush',
            name: '短信推送',
            component: SMSPush,
          },
          {
            path: 'addSMSPush',
            name: '新增短信推送',
            component: addSMSPush,
          }
        ]
      },
      {
        path: 'activityLeague',
        name: '联盟活动',
        component: activityLeague,
      },
      {
        path: 'marketLeague',
        name: '联盟活动',
        component: marketLeague,
      },
      {
        path: 'marketUnion',
        name: '联盟活动',
        component: marketUnion,
      },
      {
        path: 'marketUnionDetails',
        name: '联盟活动',
        component: marketUnionDetails,
      },
      {
        path: 'marketUnionDiscount',
        name: '联盟活动',
        component: marketUnionDiscount,
      },
      {
        path: 'writeOff',
        name: '卡券核销',
        component: writeOff,
      },
      {
        path: 'writeOffDetail',
        name: '卡券核销',
        component: writeOffDetail,
      }
    ]
  },
  // 数据
  {
    path: '/data',
    name: '数据分析',
    component: data,
    redirect: '/data/oneStoreData/dataOverview',
    meta: {
      requireAuth: true,
      keepAlive: false
    },
    children: [
      {
        path: 'allStoreData',
        name: '全部门店数据',
        component: allStoreData,
        meta: {
          requireAuth: true,
          keepAlive: false
        },
        children: [
          {
            path: 'dataOverview',
            name: '数据概况',
            component: dataOverview,
          },
          {
            path: 'analysisMember',
            name: '已购客户分析',
            component: analysisMember,
          },
          {
            path: 'analysisStore',
            name: '微店分析',
            component: analysisStore,
          },
          {
            path: 'analysisGoods',
            name: '商品分析',
            component: analysisGoods,
          },
          {
            path: 'analysisTrade',
            name: '交易分析',
            component: analysisTrade,
          }
        ]
      },
      {
        path: 'oneStoreData',
        name: '单门店数据',
        component: oneStoreData,
        meta: {
          requireAuth: true,
          keepAlive: false
        },
        children: [
          {
            path: 'dataOverview',
            name: '数据概况',
            component: dataOverview,
          },
          {
            path: 'analysisMember',
            name: '已购客户分析',
            component: analysisMember,
          },
          {
            path: 'analysisStore',
            name: '微店分析',
            component: analysisStore,
          },
          {
            path: 'analysisGoods',
            name: '商品分析',
            component: analysisGoods,
          },
          {
            path: 'analysisTrade',
            name: '交易分析',
            component: analysisTrade,
          },
          {
            path: 'analysisContent',
            name: '内容分发数据',
            component: analysisContent,
          }
        ]
      }

    ]
  },
  // 门店
  {
    path: '/store',
    name: '品牌资料配置',
    component: store,
    redirect: '/store/storeManage',
    meta: {
      requireAuth: true,
      keepAlive: false
    },
    children: [
      {
        path: 'storeManage',
        name: '门店',
        component: storeManage,
      },
      {
        path: 'staffManage',
        name: '全部员工',
        component: staffManage,
      },
      {
        path: 'storeAdd',
        name: '门店',
        component: storeAdd,
      },
      {
        path: 'storeEdit',
        name: '门店',
        component: storeEdit,
      },
      {
        path: 'brandContent',
        name: '品牌内容库',
        component: brandContent,
      },
      {
        path: 'associatedLower',
        name: '品牌内容库',
        component: associatedLower,
      },
      {
        path:'creatArticles',
        name: '创建文章',
        component: creatArticles
      },
      {
        path:'caseDetail',
        name: '创建案例',
        component: caseDetail
      },
      {
        path:'creatPhotoAlbum',
        name: '创建图册',
        component: creatPhotoAlbum
      },
      {
        path:'creatPanorama',
        name: '创建全景图',
        component: creatPanorama
      },
      {
        path: 'contentRecycle',
        name: '回收站',
        component: contentRecycleBrand
      },
      {
        path:'editArticles',
        name: '编辑文章',
        component: creatArticles
      },
      {
        path:'editDetail',
        name: '编辑案例',
        component: caseDetail
      },
      {
        path:'editPhotoAlbum',
        name: '编辑图册',
        component: creatPhotoAlbum
      },
      {
        path:'editPanorama',
        name: '编辑全景图',
        component: creatPanorama
      },

      // 业绩
      {
        path: 'performance',
        name: '业绩',
        component: performance,
        redirect: 'performance/performanceMana',
        meta: {
          requireAuth: true,
          keepAlive: false
        },
        children: [
          {
            path: 'performanceMana',
            name: '带客数业绩',
            component: performanceMana,
          },
          {
            path: 'performanceView',
            name: '订单量业绩',
            component: performanceView,
          },
          {
            path: 'performanceMoney',
            name: '成交金额业绩',
            component: performanceMoney,
          }
        ]
      },
      // 品牌故事
      {// 故事列表
        path: 'brandsManage',
        name: '品牌系列',
        component: brandsManage,
      },
      {// 故事编辑
        path: 'brandStoryEdit',
        name: '品牌系列',
        component: brandStoryEdit,
      },
      // 商品
      {
        path: 'commManage',
        name: '全部商品',
        component: commManage,
      },
      {
        path: 'commEdit',
        name: '全部商品',
        component: commEdit,
      },
      // 微店
      {
        path: 'mStoreManage',
        name: '全部微店',
        component: mStoreManage,
      },
      {
        path: 'survey',
        name: '微店概况',
        component: survey,
      },
      {
        path: 'microPage',
        name: '微页面',
        component: microPage,
      },
      {
        path: 'publicNumber',
        name: '公众号管理',
        component: publicNumber,
      },
      {
        path: 'shopMember',
        name: '微店管理页面',
        component: shopMember,
      },
      // 商品标签规则
      {
        path: 'labelRoles',
        name: '标签规则',
        component: labelRoles,
      },
      {
        path: 'memberLabel',
        name: '会员标签规则',
        component: memberLabel,
      },
      // 经销商信息
      {
        path: 'maintain',
        name: '信息维护',
        component: maintain,
      },
      {
        path: 'memberAdministration',
        name: '已购客户管理',
        component: memberAdministration,
      },
      {
        path: 'allMemberAdministration',
        name: '已购客户管理',
        component: allMemberAdministration,
      }
    ]
  },
  // // 角色
  {
    path: '/roleView',
    name: '角色',
    component: roleView,
    redirect: '/roleView/roleManage',
    children: [
      {
        path: 'roleManage',
        name: '角色管理页面',
        component: roleManage,
      },
      {
        path: 'authorize',
        name: '角色授权页面',
        component: authorize,
      }
    ]
  },
  // 服务购买
  {
    path: '/service',
    name: '服务购买',
    component: service,
    redirect: '/service/serviceDetail',
    children: [
      {
        path: 'serviceDetail',
        name: '服务详情页面',
        component: serviceDetail,
      },
      {
        path: 'serviceInvoices',
        name: '开票设置页面',
        component: serviceInvoices,
      },
      {
        path: 'invoiceHistory',
        name: 'invoiceHistory',
        component: invoiceHistory,
      },
      {
        path: 'payResult',
        name: '支付结果',
        component: payResult,
      }
    ]
  },
  // 财务中心
  {
    path: '/financeCenter',
    name: '财务管理',
    component: financeCenter,
    redirect: '/financeCenter/myAccount',
    children: [
      {
        path: 'myAccount',
        name: '我的账户',
        component: myAccount,
      },
      {
        path: 'withdraw',
        name: '提现',
        component: withdraw,
      },
      {
        path: 'withdrawSucc',
        name: '提现成功',
        component: withdrawSucc,
      },
      {
        path: 'signResult',
        name: '签约结果',
        component: signResult,
      }
    ]
  }
]
