var baseURL = {
  basicApi: '',
  magicBoxApi: '',
  platformApi: ''
}
switch (process.env.srconfig) {
  case 'testdev': // 测试环境 - bigzone
    // 基础服务
    baseURL.basicApi = 'http://106.14.207.68:80'

    // baseURL.basicApi = 'http://192.168.99.111:8080'
    // baseURL.basicApi = 'http://139.224.8.78:8080'
    // baseURL.basicApi = 'http://101.132.157.87:8080'
    // 魔盒服务
    baseURL.magicBoxApi = 'http://139.196.98.142:8080'
    // 平台接口
    baseURL.platformApi = 'http://101.132.120.127:8080'
    break
  case 'testbz': // 测试环境 - 华泰
    // 基础服务
    // baseURL.basicApi = 'http://106.14.207.68:8080'
    // 魔盒服务
    // baseURL.magicBoxApi = 'http://139.196.98.142:8080'
    // 平台接口
    // baseURL.platformApi = 'http://101.132.120.127:8080'
    break
  case 'pro': // 生产环境
    // 基础服务
    baseURL.basicApi = 'http://storeserver.muyusi.com:1026'
    // 魔盒服务
    baseURL.magicBoxApi = 'http://magic-box-api.muyusi.com:1039'
    // 平台接口
    baseURL.platformApi = 'http://platformserver.muyusi.com:1024'
    break
  default: // 开发环境 开发时个字配置下面地址
    // 基础服务
    // baseURL.basicApi = 'http://192.168.100.216:8080'
    baseURL.basicApi = 'http://106.14.207.68:80'
    // baseURL.basicApi = 'http://192.168.100.216:8080'        //赖志成
    // baseURL.basicApi = 'http://106.15.219.167:80'
    // baseURL.basicApi = 'http://192.168.99.103:8080'
    // baseURL.basicApi = 'http://192.168.100.140:8080'
    // baseURL.basicApi = 'http://192.168.100.218:8080'
    // baseURL.basicApi = 'http://192.168.99.105:8080'
    // baseURL.basicApi = 'http://47.101.37.195:8099'0
    // baseURL.basicApi = 'http://106.15.219.167:80'
    // baseURL.basicApi = 'http://106.15.134.253:80'
    // baseURL.basicApi = 'http://101.132.195.0:8080'
    // baseURL.basicApi = 'http://101.132.195.0:8081'
    // baseURL.basicApi = 'http://192.168.100.172:8083' // 内容分发
    // baseURL.basicApi = 'http://192.168.100.96:8081' // 刘乐
    // baseURL.basicApi = 'http://127.0.0.1:8080' // 李鹤
    // baseURL.basicApi = 'http://192.168.100.218:8089'
    // baseURL.basicApi = 'http://106.14.207.68:80'
    // baseURL.basicApi = 'http://192.168.100.148:8085'
    // baseURL.basicApi = 'http://192.168.100.205:8082' // 熊杰

    baseURL.magicBoxApi = 'http://139.196.98.142:8080'
    // 平台接口
    // baseURL.platformApi = 'http://101.132.120.127:8080'
    baseURL.platformApi = 'http://101.132.195.0:8081'
    // baseURL.platformApi = 'http://192.168.100.96:8081' // 刘乐
    // baseURL.platformApi = 'http://127.0.0.1:8080' // 李鹤
    // baseURL.platformApi = 'http://192.168.99.106:8080'
    break
}
module.exports = baseURL
