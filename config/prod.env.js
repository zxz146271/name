'use strict'
var buildtype = process.argv.slice(2)[0]
console.log('-----start build----' + buildtype)
var obj = {
  NODE_ENV: '"production"'
}
switch (buildtype) {
  case 'pro': //生产
    process.env.srconfig = 'pro'
    obj.srconfig = '"pro"'
    break;
  case 'testdev': //测试
    process.env.srconfig = 'testdev'
    obj.srconfig = '"testdev"'
    break;
  default:
    process.env.srconfig = ''
    obj.srconfig = '""'
    break;
}
module.exports = obj;
  // API_ROOT: '"http://101.132.120.127:8080"'
