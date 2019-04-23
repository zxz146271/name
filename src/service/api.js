import axios from 'axios'
import { getStore, removeStore } from '../tool/Utils'
import { Message } from 'element-ui'
import baseURL from '../plugins/ipConfig'
import router from '../router'
import qs from 'qs'
// axios 配置
axios.defaults.timeout = 1000000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'application/form-data'
axios.defaults.baseURL = 'http://127.0.0.1:8080/storeplatform-store-web/'
// 熊杰新地址
// axios.defaults.baseURL = 'http://139.224.8.78:8080/storeplatform-store-web/'
// axios.defaults.baseURL = 'http://192.168.138.236:8080/storeplatform-store-web/'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// POST传参序列化 拦截
axios.interceptors.request.use((config) => {
  let token = getStore('token')
  let storeId = getStore('storeIdWeb')
  let storeCode = getStore('storeCodeWeb')
  if (config.method === 'post' && !config.url.endsWith('store/stgoodsinfo/importGoods')) {
    config.data = qs.stringify(config.data)
  } else {
    config.data = config.data
  }
  if (config.method === 'get') {
    config.url += '?timestamp=' + Date.now()
  }
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  if (token) {
    config.headers['storeId'] = storeId
  }
  if (token) {
    config.headers['token'] = token
  }
  if (token) {
    config.headers['StoreCodeWeb'] = storeCode
  }
  // if (storeId) {
  //   config.headers['storeId'] = storeId
  // }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (!res) {
    return Promise.reject(res)
  }
  // console.log(window.location.hash)
  if (window.location.hash !== '#/' && window.location.hash !== '#/registered' && window.location.hash !== '#/recoverPwd') {
    if (res.data.code === 3) {
      Message.error('登录过期,请重新登录')
      setTimeout(function () {
        removeStore('token')
        removeStore('storeId')
        removeStore('distributorName')
        removeStore('storeName')
        // localStorage.clear()
        router.push({path: '/login'})
      }, 1000)
    }
  }
  return res
}, (error) => {
  return Promise.reject(error)
})

// 获取数据
// export function fetchData (url, params, method = 'get', ContentType, ResponseType) {
export function fetchData (url, params, method = 'get', extra) {
  return new Promise((resolve, reject) => {
    let config = {
      method: method,
      url: url,
      ...extra
    };
    method === 'get' ? config.params = params : config.data = params
    axios(config)
      .then(response => {
        if (response.data.state !== 200) {
          if (response.data.msg) {
          }
        }
        resolve(response.data)
      }, err => {
        console.log(err)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

export default {
  fileUpload (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/public/enclosure/fileUpload', params, 'post', {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
  },
  getCouponList (params) {
    return fetchData(baseURL.platformApi + '/storeplatform-platform-web/platform/role/getListData', params)
  },
  login (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/api/user/loginUser', params, 'post') // http://101.132.157.87:8080/storeplatform-front/login.html
  },
  // 获取全部主营类目列表
  getPfBaseMainCategoryList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/external/interface/getMainCategoryList', params)
  },
  // 根据主营类目id获取所有父节点主营类目
  getParentCategoryList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/getParentCategoryList', params)
  },
  // 发送验证码
  sendIdCode (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/external/interface/sendIdCode', params, 'post')
  },
  // 忘记密码
  forgetPassword (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/external/interface/forgetPassword', params, 'post')
  },
  // 修改密码
  editPassword (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/editPassword', params, 'post')
  },
  // 获取登录
  getstaff (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/getstaff', params)
  },
  // 获取登录
  getStaffByToken (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/getStaffByToken', params)
  },
  // 门店注册
  storeSaveDistributor (params) {
    return fetchData(baseURL.platformApi + '/storeplatform-platform-web/platform/pfbasedistributor/external/interface/storeSaveDistributor', params, 'post')
  },
  // 门店注册经销商手机号校验
  findDistributorMobile (params) {
    return fetchData(baseURL.platformApi + '/storeplatform-platform-web/platform/pfbasedistributor/external/interface/findDistributorMobile', params)
  },
  // 门店获取经销商信息
  getStoreDistributor (params) {
    return fetchData(baseURL.platformApi + '/storeplatform-platform-web/platform/pfbasedistributor/external/interface/getStoreDistributor', params)
  },
  // 门店维护经销商信息
  modifyDistributor (params) {
    return fetchData(baseURL.platformApi + '/storeplatform-platform-web/platform/pfbasedistributor/external/interface/modifyDistributor', params, 'post')
  },
  // 获取菜单列表
  getMenuList () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/api/user/userMenus', '', 'post')
  },
  // 获取按钮权限编码
  getPowerButton () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/api/user/powerButton', '', 'post')
  },
  // 获取售后服务问题
  getAfterSaleList (params) {
    return fetchData(baseURL.platformApi + '/storeplatform-platform-web/platform/pfbusinessaftersale/external/interface/afterSaleList', params)
  },
  // 商品品类列表
  getPfBaseGoodsCategoryList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsinfo/getCategoryList', params)
  },
  // 商品分类List
  getStGoodsclassifyList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsclassify/controlList', params)
  },
  // 商品分类列表
  getStgoodsclassifyList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsclassify/list', params)
  },
  // 新增商品分类
  addClassify (params) {
    // console.log(params)
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsclassify/save', params, 'post')
  },
  // 修改商品分类名称
  setClassifyName (params) {
    // console.log(params)
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsclassify/modify', params, 'post')
  },
  // 删除商品分类
  deleteClassifyById (params) {
    // console.log(params)
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsclassify/delete', params, 'post')
  },
  // 品牌系列list
  getStGoodsBrandList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsbrand/controlList', params)
  },
  // 品牌系列列表
  getStgoodsBrandList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsbrand/list', params)
  },
  // 新增品牌系列
  addBrand (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsbrand/save', params, 'post')
  },
  // 修改品牌系列名称
  setBrandName (params) {
    // console.log(params)
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsbrand/modify', params, 'post')
  },
  // 删除品牌系列
  deleteBrandById (params) {
    // console.log(params)
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsbrand/delete', params, 'post')
  },
  // 商品标签新增
  stLabelAddSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stLable/addSave', params, 'post')
  },
  // 商品标签删除
  stLabelDelete (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stLable/delete', params)
  },
  // 标签删除 (修改)
  deleteStLabel (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stLable/deleteStLabel', params)
  },
  // 会员-标签规则-列表
  getStLabelRulesList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/labelRules/list', params)
  },
  // 会员-标签规则-新增
  stLabelRulesAddSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/labelRules/addSave', params, 'post')
  },
  // 会员-标签规则-修改回显
  stLabelRulesDetail (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/labelRules/getDetailById', params)
  },
  // 会员-标签规则-修改
  stLabelRulesEdit (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/labelRules/editSave', params, 'post')
  },
  // 会员-积分规则-列表
  getStIntegralRulesList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/integralRules/list', params)
  },
  // 会员-积分规则-修改
  stIntegralRulesEdit (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/integralRules/editSave', params, 'post')
  },
  // 会员-会员管理-列表
  getStMemberList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/member/getListData', params)
  },
  // 会员-会员管理-新增
  stMemberAddSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/member/addSave', params, 'post')
  },
  // 会员-会员管理-新增初始化
  stMemberInitAdd (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/member/initAdd', params, 'post')
  },
  // 会员-会员管理-修改数据回显
  stMemberInitEdit (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/member/getDetailById', params)
  },
  // 会员-会员管理-修改保存数据
  stMemberEditSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/member/editSave', params, 'post')
  },
  // 会员-会员管理-老客户关怀列表
  getStMemberCareList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/member/getCareListData', params)
  },
  // 会员-会员管理-导入会员
  importMember (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/member/importMember', params, 'post')
  },
  // 商品信息列表
  getStGoodsInfoList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsinfo/list', params)
  },
  // 商品信息列表-----new
  getStAllGoodsInfoList (params) {
    return fetchData(baseURL.basicApi + '/store/stgoodsinfo/list', params)
  },
  // 获取商品信息列表 无分页参数
  getStGoodsInfoAllList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsinfo/getGoodsList', params)
  },
  // 根据Id获取商品信息详情
  getStGoodsInfo (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsinfo/getStGoodsInfo', params)
  },
  // 保存商品信息详情
  saveStGoodsInfo (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsinfo/save', params, 'post')
  },
  // 编辑商品信息详情
  editStGoodsInfo (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsinfo/modify', params, 'post')
  },
  // 商品上下架操作
  setGoodsDrop (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsinfo/modify', params, 'post')
  },
  // 根据DistributorId获取门店list
  getDistributorStoreList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/getDistributorStoreList', params)
  },
  // 订单信息列表
  getStStoreOrderList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/list', params)
  },
  // 根据Id获取订单信息详情
  getStStoreOrder (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/getStStoreOrder', params)
  },
  // 保存订单信息详情
  saveStStoreOrder (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/save', params, 'post')
  },
  // 编辑订单信息详情
  editStStoreOrder (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/modify', params, 'post')
  },
  // 门店下单获取优惠券
  getMemberCoupon (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/coupon/getCouponListByMobileAndProducts', params)
  },
  // 订单 - 付款
  orderpaymentMoney (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/paymentMoney', params, 'post')
  },
  // 订单 - 关闭订单
  ordercolseAll (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/shutOrder', params)
  },
  // 订单 - 取消退货
  ordercancel (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/cancelOrder', params)
  },
  // 订单 - 确认收货
  orderconfirm (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/confirmReceipt', params)
  },
  // 简单 - 发货
  ordershipments (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/shipments', params, 'post')
  },
  // 订单 - 退货
  orderreturnGood (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/salesReturn', params, 'post')
  },
  // 订单操作(退换货等)
  setOrderDrop (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/modify', params, 'post')
  },
  // 获取 优惠券   列表
  getStMarketingCouponList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/coupon/findCouponPage', params)
  },
  // 获取 团购   列表
  getStMarketingGropList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/groupBooking/findPage', params)
  },
  // 获取 团购   明细
  getStMarketingGroupById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/groupBooking/getDetailById', params)
  },
  // 获取 联盟   列表
  getStMarketingUnionList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/union/findPage', params)
  },
  // 联盟根据电话获取经销商
  getMarketingUnionDistributorByMobile (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/union/getDistributorByMobile', params)
  },
  // 加载门店树
  loadMarketingStoreTree (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/coupon/loadStoreTree', params)
  },
  // 添加 优惠券
  addStMarketingCoupon (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/coupon/addSave', params, 'post')
  },
  // 获取单个优惠券信息
  getStMarketingCouponByCode (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/coupon/getDetailByCode', params)
  },
  // 保存修改后的优惠券
  editSaveStMarketingSeckill (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/coupon/editSave', params, 'post')
  },
  // 修改 优惠券状态
  modifyStatusStMarketingCoupon (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/coupon/modifyStatus', params, 'post')
  },
  // 获取抢优惠列表
  getStMarketingSeckillList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/seckill/findSeckillPage', params)
  },
  // 获取 单个抢优惠信息
  getStMarketingSeckillById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/seckill/getDetailById', params)
  },
  // 新增 抢优惠信息
  addStMarketingSeckillList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/seckill/addSave', params, 'post')
  },
  // 保存修改后的抢优惠信息
  editSaveStMarketingSeckillList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/seckill/editSave', params, 'post')
  },
  // 修改 抢优惠状态
  modifyStatusStMarketingSeckill (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/seckill/modifyStatus', params, 'post')
  },
  // 根据 各种优惠券ID 获取已使用,已领取数量,未领取
  getPieChartDataById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/couponGetHistory/findPie', params)
  },
  // 根据 各种优惠券ID  获取领取人历史信息
  getGetHistoryDataById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/couponGetHistory/getListData', params)
  },
  // 根据 各种优惠券ID  获取领取人历史信息 (针对抢优惠)
  getGetHistoryDataBySeckillId (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/seckillGetHistory/getListData', params)
  },
  // 获取优惠券 领取 使用折线图
  getCouponGetAndUse (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/couponGetHistory/getCouponGetAndUse', params)
  },
  // 获取优惠券 领取 使用折线图  (针对抢优惠)
  getSeckillGetAndUse (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/seckillGetHistory/getSekillGetAndUse', params)
  },
  // 获取抢优惠完成抢购时间  (抢优惠)
  getDurationTime (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/seckillGetHistory/durationTime', params)
  },
  // 获取优惠券 领取数量
  getCouponCountById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/couponGetHistory/getCouponCountById', params)
  },
  // 获取优惠券 领取数量  (针对抢优惠)
  getSeckillCountById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/seckillGetHistory/getSeckillCountById', params)
  },
  // 停用团购活动
  modifyStatusByGroupId (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/groupBooking/modifyStatus', params, 'post')
  },
  // 营销活动-->>团购-->>获取领取人列表
  getGroupGetHistoryList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/groupBookingGet/findPage', params)
  },
  // 营销活动-->>团购-->>获取领取人折线图
  getGroupeBookingGetHighCharts (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/groupBookingGet/getLineChartData', params)
  },
  // 营销活动-->>团购-->>获取参团时间/领取量 折线图
  getGroupeGetHighCharts (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/groupParticpants/getGroupGetAndUse', params)
  },
  // 营销活动-->>联盟-->>获取单个联盟信息
  getStMarketingUnionById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/union/getDetailById', params)
  },
  // 营销活动-->>联盟-->>修改联盟信息
  marketingUnionEditSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/union/editSave', params, 'post')
  },
  // 获取当前登录用户ID
  getLoginUserId () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/couponGetHistory/getLoginUserId')
  },
  // 获取全路径
  getFullPath (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/public/enclosure/getFullPath', params, 'post')
  },
  // 删除文件
  deleteFile (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/public/enclosure/deleteFileById', params, 'post')
  },
  // 根据优惠码获取优惠券信息
  getConponByCode (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/couponCheck/getByPromotionCode', params)
  },
  // 根据手机号码获取优惠券信息
  getConponByPhone (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/couponCheck/getByPhoneNum', params)
  },
  // 核销优惠券
  checkoutConpon (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/couponCheck/checkout', params, 'post')
  },
  // 根据caseId获取案例详情
  getStCaseBaseInfo (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/casebase/getDetailById', params)
  },
  // 添加案例
  saveStCaseBase (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/casebase/addSave', params, 'post')
  },
  // 查询案例列表
  getCaseBaseList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/casebase/getListData', params)
  },
  // 修改案例
  editStCaseBase (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/casebase/editSave', params, 'post')
  },
  // 删除案例
  deleteStCaseBase (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/casebase/deleteById', params, 'post')
  },
  // 发布/撤回案例
  displayCaseBase (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/casebase/release', params, 'post')
  },
  // 查询案例类型列表
  getCaseClassifyList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/caseClassify/getListData', params)
  },
  // 添加案例类型
  addSaveclassify (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/caseClassify/addSave', params, 'post')
  },
  // 根据id查询类型
  getClassifyById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/caseClassify/getDetailById', params)
  },
  editClassify (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/caseClassify/editSave', params, 'post')
  },
  // 删除案例类型
  deleteClassify (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/caseClassify/deleteById', params, 'post')
  },
  // 停用案例类型
  disableClassify (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/caseClassify/disableClassify', params, 'post')
  },
  // 启用案例类型
  enableClassify (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/caseClassify/enableClassify', params, 'post')
  },
  // 查询角色列表
  getRoleList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staffRole/getListData', params)
  },
  // 添加角色
  addSaveRole (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staffRole/addSave', params, 'post')
  },
  // 根据id查询角色
  getRoleById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staffRole/getDetailById', params)
  },
  // 修改保存角色
  editRole (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staffRole/editSave', params, 'post')
  },
  // 删除角色
  deleteRole (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staffRole/deleteById', params, 'post')
  },
  // 停用角色
  disableRole (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staffRole/disableRole', params, 'post')
  },
  // 启用角色
  enableRole (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staffRole/enableRole', params, 'post')
  },
  // 获取角色可授权服务
  getAuthorServiceList () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staffRole/getAuthorServiceList')
  },
  // 获取角色可授权服务
  roleAuthor (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staffRole/roleAuthor', params, 'post')
  },
  // 获取服务菜单
  getServiceMenu (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staffRole/getAuthorServiceMenus', params)
  },
  // 门店- 门店管理 - 添加门店信息
  addSaveStStore (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/addSave', params, 'post')
  },
  // 门店- 门店管理 - 品牌系列列表
  getStStoreBrandList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/list', params)
  },
  // 门店- 门店管理 - 门店信息列表
  getStStoreList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/getListData', params)
  },
  getStOrderStoreList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/getListStoreData', params)
  },
  // 门店- 门店管理 - 开店
  storeOpen (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/openStore', params)
  },
  // 门店- 门店管理 - 关店
  storeStope (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/stopStore', params)
  },
  // 门店- 门店管理 - 根据StoreId查询某门店信息
  stStoregetDetailById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/getDetailById', params)
  },
  // 门店-门店管理- 修改保存
  stStoreEditSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/editSave', params, 'post')
  },
  // 门店- 员工管理 - 员工列表
  getStStaffList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/getListData', params)
  },
  // 门店- 角色管理 - 角色列表
  getStRoleList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/getRoleListData', params)
  },
  // 门店- 员工管理 - 添加员工
  addSaveStStaff (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/addSave', params, 'post')
  },
  // 门店- 员工管理 - 根据id查询员工
  stStaffgetDetailById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/getDetailById', params)
  },
  // 门店 -员工管理 - 修改保存有员工
  editSaveStStaff (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/editSave', params, 'post')
  },
  // 门店 - 门店商品管理 -商品列表查询
  getStoreGoodInfoList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/good/getListData', params)
  },
  // 门店 - 员工管理 - 员工添加校验
  findMobile (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/findMobile', params)
  },
  // 门店 - 员工管理 - 批量启用
  modifyopenstaff (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/batchEnable', params, 'post')
  },
  // 门店 - 员工管理 - 批量停用
  modifystopstaff (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/batchDisable', params, 'post')
  },
  // 门店 - 员工管理 - 根据门店id 查询所有的导购员
  getStStaffListByStore (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/selectStaffBySotreId', params)
  },
  // 门店 - 员工管理 - 根据登录人查询所导购
  selectStaffByUser (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/staff/selectStaffByUser', params)
  },
  // 简化订单 列表查询
  geteasyOrderList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/getListData', params)
  },
  // 简化订单 单个查询
  selectByEasyOrderId (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/selectById', params)
  },
  // 简化订单 - 确认收货
  confirm (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/confirmReceipt', params)
  },
  // 简化简单 - 发货
  shipments (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/shipments', params)
  },
  // 简化订单 - 退货
  returnGood (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/salesReturn', params)
  },
  // 简化订单 - 新增订单
  addEasyOrder (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/addSave', params, 'post')
  },
  // 简化订单 - 修改保存
  stEastOrderEditSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/editSave', params, 'post')
  },
  // 简化订单 - 付款
  paymentMoney (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/paymentMoney', params, 'post')
  },
  // 简化订单 - 关闭订单
  colseAll (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/shutOrder', params)
  },
  // 取消退货
  cancel (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/cancelOrder', params)
  },
  // 查询客户手机号
  findMemberMobile (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/findMemberMobile', params)
  },
  // 查询客户手机号
  findorderMemberMobile (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/findorderMemberMobile', params)
  },
  // 关怀订单
  getStCareOrderList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/careorder/getListData', params)
  },
  // 查看单个关怀订单
  selectByCareId (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/careorder/selectByCareId', params)
  },
  // 备注关怀订单
  editSaveCareOrder (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/careorder/editSave', params, 'post')
  },
  // 新增带客业绩
  addSaveperformance (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/performance/addMemberSave', params, 'post')
  },
  // 查询带客业绩 单门店
  getmemberperfById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/performance/selectById', params)
  },
  // 查询单门店员工带客业绩 (针对经销商看门店员工)
  getStaffPerformanceListData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/performance/appListDataByStore', params)
  },
  // 修改带客数业绩
  editSaveMember (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/performance/editSave', params, 'post')
  },
  // 新增订单量业绩
  addSaveOrderperformance (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/orderperformance/addOrderSave', params, 'post')
  },
  // 查询订单业绩 单门店
  getorderperfById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/orderperformance/selectById', params)
  },
  // 修改订单量业绩
  editSaveOrder (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/orderperformance/editSave', params, 'post')
  },
  // 新增营业额业绩
  addSaveMoneyperformance (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/moneyperformance/addMoneySave', params, 'post')
  },
  // 查询老板给门店配置的带客数
  getStStoreAdminMemberList () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/performance/appStoreMemberDataList')
  },
  // 查询老板给门店配置的订单数
  getStStoreAdminOrderList () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/orderperformance/appStoreMemberDataList')
  },
  // 查询老板给门店配置的营业额数
  getStStoreAdminMoneyList () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/moneyperformance/appStoreMemberDataList')
  },
  // 查询营业额 单门店
  getmoneyperfById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/moneyperformance/selectById', params)
  },
  // 修改营业额业绩
  editSaveMoney (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/moneyperformance/editSave', params, 'post')
  },
  // 查询带客业绩
  getPerformanceListData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/performance/getListData', params)
  },
  // 查询营业额业绩
  getMoneyPerformanceListData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/moneyperformance/getListData', params)
  },
  // 查询单个门店的营业额员工业绩
  getStaffMoneyPerformanceListData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/moneyperformance/appListDataByStore', params)
  },
  // 查询订单量业绩
  getOrderPerformanceListData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/orderperformance/getListData', params)
  },
  // 查询单个门店的员工业绩
  getStaffOrderPerformanceListData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/orderperformance/appListDataByStore', params)
  },
  // 团购新增
  marketingGroupAddSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/groupBooking/addSave', params, 'post')
  },
  // 团购修改
  marketingGroupEditSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/groupBooking/editSave', params, 'post')
  },
  // 营销活动-->>联盟-->>新增联盟
  marketingUnionAddSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/union/addSave', params, 'post')
  },
  // 营销活动--->>联盟--->>关闭联盟
  modifyStatusByUnionId (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/union/modifyStatus', params, 'post')
  },
  // 营销活动--->>联盟--->>获取当前联盟活动优惠券数据
  getAllCouponDataByUnionId (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/couponGetHistory/getAllCouponDataByUnionId', params)
  },
  // 查询所有品牌故事
  getBrandStoryList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/brandStory/getListData', params)
  },
  // 创建保存商品故事
  saveStBrandStory (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/brandStory/addSave', params, 'post')
  },
  // 根据id查询故事信息
  getStBrandStoryInfo (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/brandStory/getDetailById', params)
  },
  // 修改保存品牌故事
  editStBrandStory (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/brandStory/editSave', params, 'post')
  },
  // 发布品牌故事
  releaseBrandStory (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/brandStory/release', params, 'post')
  },
  // 撤回品牌故事
  revokeBrandStory (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/brandStory/revoke', params, 'post')
  },
  // 删除品牌故事
  deleteBrandStory (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/brandStory/deleteById', params, 'post')
  },
  // 获取服务列表接口
  getServiceList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/service/getServiceListByDistributor', params)
  },
  // 免费开通试用
  authorityService (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/service/authorityService', params, 'post')
  },
  // 支付宝服务购买
  aliAuthorityService (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/service/aliAuthorityService', params, 'post')
  },
  // 微信服务购买
  wechaAuthorityService (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/service/wechaAuthorityService', params, 'post')
  },
  // 获取支付结果
  getPayResult (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/service/getPayResult', params)
  },
  // 获取消息数目
  getNotReadCount (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/pushMessage/getNotReadCount', params)
  },
  // 获取所有未读消息
  pushMessageGetListData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/pushMessage/getListData', params)
  },
  // 忽略消息
  modifyState (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/pushMessage/modifyState', params, 'post')
  },
  // 获取潜客列表
  getSubMemberList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/submember/getListData', params)
  },
  // 获取全部客户列表
  getAllListData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/allMember/getAllListData', params)
  },
  // 导出全部客户信息excel表格
  exportGetAllListData () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/allMember/exportGetAllListData','', 'get',  {
        headers: {
          'token': getStore("token")
        },
        responseType: 'arraybuffer'
    })
  },
  // 新增保存潜客
  subMemberAddSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/submember/addSave', params, 'post')
  },
  // 编辑保存潜客
  subMemberEditSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/submember/editSave', params, 'post')
  },
  // 添加潜客接待
  subMemberEditAdd (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/submember/receptionSave', params, 'post')
  },
  // 潜客接待列表
  subMemberEditList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/submember/receptionList', params)
  },
  // 潜客行为列表
  getDetailAndBehaviorById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/submember/getDetailAndBehaviorById', params)
  },
  // 自定义客户标签
  getDetailCustomerLabel (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/consumer/label/getAllLabels', params)
  },
  // 添加客户进度
  getAddMemberFollowState (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/followState/addFollowState', params, 'post')
  },
  // 编辑客户进度
  getUpdateFollowState (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/followState/updateFollowState', params, 'post')
  },
  // 删除客户进度
  getDeleteFollowState (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/followState/deleteFollowState', params, 'post')
  },
  // 客户进度列表
  getFindFollowStatePage (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/followState/findFollowStatePage', params)
  },
  // 排序客户进度列表
  getUpdateFollowStateOrder (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/followState/updateFollowStateOrder', params, 'post')
  },
  // 添加自定义客户标签
  getAddCustomerLabel (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/consumer/label/addLabelType', params, 'post')
  },
  // 添加自定义客户二级标签
  getAddLabelSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/consumer/label/addLabelSave', params, 'post')
  },
  // 编辑自定义客户二级标签
  getUpdateLabelSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/consumer/label/updateLabelSave', params, 'post')
  },
  // 编辑自定义客户一级标签
  getUpdateLabelType (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/consumer/label/updateLabelType', params, 'post')
  },
  // 删除自定义客户一级标签
  getDeleteLabelType (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/consumer/label/deleteLabelType', params, 'post')
  },
  // 删除自定义客户二级标签
  getDeleteLabelSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/consumer/label/deleteLabelSave', params, 'post')
  },
  // 获取需求类型
  getRequestType (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/consumer/label/getRequestType', params)
  },
  // 获取来源人
  getStaffListData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/allMember/getStaffListData', params)
  },
  // 获取跟进状态
  getFollowStatus (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/consumer/label/getFollowStatus', params)
  },
  // 已购行为列表
  getDetailAlreadyBehaviorById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/member/getDetailAndBehaviorById', params)
  },
  // 已购客户接待列表
  MemberEditList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/member/receptionList', params)
  },
  // 添加已购客户接待
  MemberEditAdd (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/member/receptionSave', params, 'post')
  },
  // 编辑查询潜客
  getSubMemberInfo (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/submember/getDetailById', params)
  },
  // 转移潜客到未领用
  removeSubmember (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/submember/remove', params, 'post')
  },
  // 查询未认领潜客
  getUnusedSubmember (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/submember/getUnusedData', params)
  },
  // 认领潜客
  checkSubmember (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/submember/checkSubmember', params, 'post')
  },
  deleteCaseBasePhoto (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/casebase/deletePhoto', params, 'post')
  },
  // 相同店铺的员工
  getstaffData () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/submember/getStoreStaff')
  },
  removeSubmemberTo (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/submember/remove', params, 'post')
  },
  // 服务--->>购买历史
  getServiceHistoryByDistributorId (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/invoiceHistory/getServiceHistoryByDistributorId', params)
  },
  // 服务--->>经销商数据初始
  getDistributorDataInfo () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/invoiceHistory/getDistributorDataInfo')
  },
  // 服务--->>发票--->>开票申请
  addInvoiceData (param) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/invoice/addInvoiceData', param, 'post')
  },
  // 服务-->>发票-->>开票申请-->>开票历史
  getInvoiceHistory (param) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/invoice/getInvoiceHistory', param)
  },
  // 数据===会员分析===会员总数和新增数
  getMemberCountInitData (param) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/memberAnalysis/getCount', param)
  },
  // 数据===会员分析===会员标签名
  getMemberLables (param) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/memberAnalysis/getLableList', param)
  },
  // 数据===会员分析===会员分析（单指标）
  getMemNumByTimeAndIndex (param) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/memberAnalysis/getMemNumByTimeAndIndex', param)
  },
  // 数据===会员分析===会员分析(所有指标)
  getMemNumByTimeAndIndexAll (param) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/memberAnalysis/getMemNumByTimeAndIndexAll', param)
  },
  // 数据===会员分析===会员属性
  getMemNumByAttribute (param) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/memberAnalysis/getMemNumByAttribute', param)
  },
  // 价格修改
  changeGoodsPrice (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsinfo/modify', params, 'post')
  },
  // 批量上架商品
  goodsBatchUp (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsinfo/batchUp', params, 'post')
  },
  // 批量下架商品
  goodsBatchDown (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsinfo/batchDown', params, 'post')
  },
  // 首页统计
  getHomeCounts (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/analysisTrade/getHomeCounts', params)
  },
  // 首页同比统计
  getHomeCountsProportion (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/analysisTrade/getHomeCountsProportion', params)
  },
  // 交易趋势
  necessaryCount (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/analysisTrade/getTradingTrend', params)
  },
  // 交易金额统计
  getTradingMoney (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/analysisTrade/getTradingMoney', params)
  },
  // 预计发货量
  getCompleteOrders (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/analysisTrade/getCompleteOrders', params)
  },
  // 交易明细
  getDetailedCount (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/analysisTrade/getDetailedCount', params)
  },
  // 交易构成
  constituteCount (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/analysisTrade/getDealStructure', params)
  },
  // 交易金额统计
  statisticsCount (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/analysisTrade/getStatisticsCount', params)
  },
  // 预计发货量
  estimateCount (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/data/analysisTrade/getEstimateCount', params)
  },
  // 获取常见问题
  getBusinessProblemInfo (params) {
    return fetchData(baseURL.platformApi + '/storeplatform-platform-web/platform/problem/external/interface/findAllPage', params)
  },
  // 查询微店装修信息
  getStMicroShopInfo () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/microShop/getMicroShopInfo')
  },
  // 添加微店装修信息
  saveMicroShop (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/microShop/addSave', params, 'post')
  },
  // 修改微店装修信息
  editMicroShop (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/microShop/editSave', params, 'post')
  },
  // 获取轮播图
  getCarouselData(params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/banner/getListData', '', 'get');
  },
  // 保存轮播图
  saveCarouselData(params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/banner/putBanner', params, 'post');
  },
  // 查询自定义分享图片列表
  getSharePictureList () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/sharePictrue/list')
  },
  // 新增自定义分享图片
  uploadSharePicture (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/sharePictrue/uploadSharePicture', params, 'post')
  },
  // 删除自定义分享图片
  deleteSharePicture (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/sharePictrue/delete', params, 'post')
  },
  // 商品指标查询
  getGoodsIndexAnalysis (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stGoodsStatistic/goodsIndexAnalysis', params)
  },
  // 经销商商品分析
  getGoodsAnalysis (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stGoodsStatistic/getGoodsAnalysis', params)
  },
  // 获取商品折线图
  goodsAnalysisChart (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stGoodsStatistic/goodsAnalysisChart', params)
  },
  // 导入商品
  importGoods (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsinfo/importGoods', params, 'post')
  },
  // 获取经销商注册状态
  getDistributor (params) {
    return fetchData(baseURL.platformApi + '/storeplatform-platform-web/platform/pfbasedistributor/external/interface/checkDistributorIsReview', params)
  },
  // 获取标准订单还是快开单
  getOrderStyle (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/getStoreOrderType', params)
  },
  // 分享获取分享id
  shareToPeople (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/share/shareToPeople', params)
  },
  // 获取PC数据
  findHomeData () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/api/home/external/interface/getNavList')
  },
  // 获取PC数据
  findmHomeData () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/api/home/external/interface/getMobileNavList')
  },
  // 获门店基础服务数据
  getStoreServiceData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/service/getStoreServiceState', params)
  },
  // 获取签约电子协议路径
  getcontractNoUrl (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/finance/SignContractClient', params)
  },
  // 云商通绑定手机号(请求)
  bindYunPhone (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/finance/bindYunPhone', params)
  },
  // 云商通绑定手机号(确认)
  saveYunPhone (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/finance/saveYunPhone', params)
  },
  // 查询银行卡列表
  getBanksListData () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/finance/getBanksListData')
  },
  // 请求绑定银行卡
  bindYunBank (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/finance/applyBindBankCardClient', params, 'post')
  },
  saveYunBank (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/finance/bindBankCardClient', params, 'post')
  },
  // 获取当前经销商的账号金额信息
  getUserAmountOfAccount (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/allInPayMoney/queryBalance')
  },
  // 获取当前经销商的账号金额信息
  getFinanceCenterOrderList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/allInPayMoney/getOrderList', params)
  },
  // 申请提现
  extractWithdrawal (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web//store/allInPayMoney/extractWithdrawal', params)
  },
  // 确认支付
  confirmThePayment (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/allInPayMoney/confirmThePayment', params)
  },
  // 获取本月销售额
  getTransactionDetails (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/allInPayMoney/getTransactionDetails', params)
  },
  // 获取云商通会员信息
  getYunMemberInfo (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/allInPayMoney/getYunMemberInfo', params)
  },
  // 查询该商品是否参加活动
  getActivityByGoodsId (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stgoodsinfo/getActivityByGoodsId', params)
  },
  // 获取团购活动展示数据
  getGroupBookingShowData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/marketing/groupBookingGet/findShowData', params)
  },
  // 门店魔盒范围分页查询
  findPbMagicBoxRangeVoByPage (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/storebox/boxStoreScope/findPbMagicBoxRangeVoByPage', params)
  },
  // 订单变更价格
  editeasyOrderTotalMoneySave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/easyorder/editTotalMoney', params, 'post')
  },
  // 魔客分页查询
  findBoxMaxPhoneVoByPage (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/storebox/boxMaxPhone/findBoxMaxPhoneVoByPage', params)
  },
  // 通过经销商id获取开通服务的门店列表
  findStoreListByUid (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/storebox/boxStoreScope/findStoreListByUid', params)
  },
  // 魔盒绑定店铺
  boxSetStoreScope (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/storebox/boxStoreScope/boxSetStoreScope', params, 'post')
  },
  // 删除短信模板
  deleteSMSTem (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/sms/service/delete', params, 'post')
  },
  // 修改短信模板
  updateSMSTem (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/sms/service/update', params, 'post')
  },
  // 查询短信模板
  getSMSTmp (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/sms/service/select', params)
  },
  // 新增短信模板
  addSMSTem (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/sms/service/insert', params, 'post')
  },
  // 获取所有魔盒
  getAllBox (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/storebox/boxMaxPhone/findBoxNameList', params)
  },
  // 1、获取当前登录门店套餐余量信息
  getOverSMS (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/SmsEmal/smsEmalPurchase/findSmsEmalPurchaseInfo', params)
  },
  // 2、套餐购买记录分页查询
  getBuyRecord (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/SmsEmal/smsEmalPurchase/findSmsEmalPurchaseDetailPage', params)
  },
  // 3、短信使用记录接口
  getUseRecord (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/SmsEmal/smsEmalPurchase/findSendMessageHistoryDetailPage', params)
  },
  // 1、短信推送列表接口
  getSMSSendList (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/send/sendMessage/findSendMessagePage', params)
  },
  // 2、获取当前登录用户有权限的魔盒列表
  getBoxList (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/storebox/boxStoreScope/findBoxInfoVoByStoreId', params)
  },
  // 3、通过当前登录用户信息获取门店所关联的短信模版分页信息（审核通过）
  getSMSTplList (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/send/sendMessage/findTemplatePageByStoreId', params)
  },
  // 查询短信购买列表
  getSMSBuyList (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/box/service/getSmsEmaList', params)
  },
  // 购买短信套餐支付宝支付
  buySMSAli (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/box/service/aliPurchaseSmsEmal', params, 'post')
  },
  // 购买短信套餐威信支付
  buySMSWechat (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/box/service/wechatPurchaseSmsEmal', params, 'post')
  },
  // 获取选中墨客数量
  getCustomerNum (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/send/sendMessage/findSendMessageCustomerList', params)
  },
  // 发送短信方法
  sendMessage (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/send/sendMessage/doSendMessage', params, 'post')
  },
  // 短信模板插入链接
  addSMSLink (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/box/smsJump/getSmsJumpDomainName', params)
  },
  // 查询首页活动图片
  findHomeImg (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/box/smsJump/getSmsJumpDomainName', params)
  },
  // 查询全部上架商品图片
  findGoogsImg (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/good/getListData', params)
  },
  // 获取所有活动  磨盒插入链接使用
  getAllActivityForBox (params) {
    return fetchData(baseURL.magicBoxApi + '/magic-box-web/sms/service/getAllActivityForBox', params)
  },
  // 初始化提货方式下拉框
  initselect (params) {
    return fetchData(baseURL.platformApi + '/storeplatform-platform-web/api/dictionnaire/external/interface/initselect', params, 'post')
  },
  editOrderTotalMoney (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/ststoreorder/editTotalMoney', params, 'post')
  },
  // 蘑盒短信模板插入连接首页项 - 根据StoreId查询某门店信息
  stStoregetDetailByIdForBox (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/getDetailByIdForBox', params)
  },
  // 获取联盟活动信息列表 无分页参数 ---新增接口2018/10/20
  getMkAllianceActInfoList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/marketing/leagueActivity/getMkAllianceActList', params)
  },
  // 我的内容列表
  getStaffContentList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/consumer/list', params)
  },
  // 批量导出内容编号 --我的
  exportContentIds (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/consumer/export', params, 'POST')
  },
  // 修改我的内容状态
  updateContentState (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/consumer/deleted', params, 'POST')
  },
  // 获取门店内容库列表
  getStroeContentList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/store/list', params)
  },
  // 修改门店内容状态
  updateStoreContentState (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/store/updateSecycleBinState', params, 'POST')
  },
  // 获取品牌内容库列表
  getAccountContentList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/brand/list', params)
  },
  // 修改品牌内容状态
  updateAccountContentState (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/brand/deleted', params, 'POST')
  },

  // 通过经销商手机号查询下属门店
  getDataByMobile (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/factory/distributor/mobile', params)
  },

  // 通过distributorId查询下属门店
  getDataByDistributorId (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/factory/distributor/the', params)
  },
  // 通过distributorId绑定关联
  bindByDistributorId (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/factory/distributor/put', params, 'POST')
  },
  // 查询经销商列表
  getDealerInfoList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/factory/distributor/list', params)
  },
  // 解除经销商关联门店
  dissociatedDealerInfo (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/factory/distributor/deleted', params)
  },
  // 我的-新增
  mineConsumerAdd (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/consumer/add', params, 'POST')
  },
  // 我的-修改
  mineConsumerEdit (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/consumer/edit', params, 'POST')
  },
  // 复制内容-门店列表
  copyToStoreAllStore (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/selectAllStore', params)
  },
  // 复制内容-门店在售品牌
  copyToStoreBrandList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/storeBrandList', params)
  },
  // 复制内容-单内容复制
  copyToStore (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/consumer/copy', params, 'POST')
  },
  // 内容-详情
  getContentById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/consumer/getDetailById', params)
  },
  // 批量导出内容库内容编号  --- 品牌
  exportBrandContentIds (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/brand/export', params, 'POST')
  },
  // 品牌库新增
  mineBrandAdd (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/brand/add', params, 'POST')
  },
  // 品牌库修改
  mineBrandEdit (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/brand/edit', params, 'POST')
  },
  // 门店库新增
  mineStoreAdd (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/store/add', params, 'POST')
  },
  // 门店库修改
  mineStoreEdit (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/store/edit', params, 'POST')
  },
  //  创建图册中删除图册
  deleteFileById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/public/enclosure/deleteFileById', params, 'POST')
  },
  //  内容库添加标签
  addSave (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stLable/addSave', params, 'POST')
  },
  //  内容库删除标签
  deleteTag (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/stLable/delete', params)
  },
  getContentBrandList () {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/brandList')
  },
  // 内容分发数据（近七天）
  distributionData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/report/getReadContentByTypeAndDay', params)
  },
  // 内容分发数据（2）
  distributionId (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/report/getReadContentInfoById', params)
  },
  // 内容分发数据（3）
  distributionType (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/report/getContentByType', params)
  },
  // 访客详情数据
  distributionInfo (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/report/getConsumerInfo', params)
  },
  // 内容分发数据（5）
  distributionRank (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/report/getShareContentRank', params)
  },
  // 实例门店id名称select
  distributionListData (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/manage/getListData', params)
  },
  // 来源人
  distributionStaff (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/report/getStoreStaff', params)
  },
  // 获取视频地址
  getVideoInfo (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/public/videoUpload/getVideoInfo', params, 'POST')
  },
  // 确认复制到门店
  findRepeatContentById (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/content/consumer/findRepeatContentById', params)
  },
  bindKujiale (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/bind/kujiale/findInfo', params)
  },
  kujialeBinding (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/bind/kujiale/binding', params, 'POST')
  },
  coolDesignList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/bind/kujiale/design/list', params)
  },
  coolRenderpicList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/bind/kujiale/renderpic/list', params)
  },
  // 添加推荐商品（小程序首页）
  recommendGoods (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/recommendGoods/bathAdd', params, 'POST')
  },
  //  删除推荐商品（小程序首页）
  deleteRecommendGoods (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/recommendGoods/delete', params, 'POST')
  },
  //  获取推荐商品（小程序首页）
  recommendGoodsList (params) {
    return fetchData(baseURL.basicApi + '/storeplatform-store-web/store/recommendGoods/list', params)
  }
}
