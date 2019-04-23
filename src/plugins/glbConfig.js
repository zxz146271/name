exports.install = function (Vue, options) {
  Vue.prototype.$config = function () {
    var config = {}
    let token = localStorage.getItem('token')
    switch (process.env.srconfig) {
      case 'testdev':
        // 文件上传地址
        config.uploadUrl = 'http://106.14.207.68:80/storeplatform-store-web/public/enclosure/fileUpload?token=' + token
        // 视频文件上传
        config.videoUpload = 'http://106.14.207.68:80/storeplatform-store-web/public/videoUpload/getUploadInfo?token=' + token
        // 导入模板下载
        config.downloadFile = 'http://106.14.207.68:80/storeplatform-store-web/store/stgoodsinfo/downloadFile?token=' + token
        // 案例封面上传
        config.photoUploadUrl = 'http://106.14.207.68:80/storeplatform-store-web/store/casebase/uploadPhoto?token=' + token
        // 微店预览
        config.MSUrl = 'http://101.132.157.87:8080/microShopPreview/index.html#/home?templateInfo='
        break
      case 'pro':
        // 文件上传地址
        config.uploadUrl = 'http://storeserver.muyusi.com:1026/storeplatform-store-web/public/enclosure/fileUpload?token=' + token
        // 视频文件上传
        config.videoUpload = 'http://storeserver.muyusi.com:1026/storeplatform-store-web/public/videoUpload/getUploadInfo?token=' + token
        // 导入模板下载
        config.downloadFile = 'http://storeserver.muyusi.com:1026/storeplatform-store-web/store/stgoodsinfo/downloadFile?token=' + token
        // 案例封面上传
        config.photoUploadUrl = 'http://storeserver.muyusi.com:1026/storeplatform-store-web/store/casebase/uploadPhoto?token=' + token
        // 微店预览
        config.MSUrl = 'http://shop.muyusi.com/microShopPreview/index.html#/home?templateInfo='
        break
      default: // 开发环境 开发时个字配置下面地址
        // 文件上传地址
        config.uploadUrl = 'http://106.14.207.68:80/storeplatform-store-web/public/enclosure/fileUpload?token=' + token
        // 视频上传
        config.videoUpload = 'http://106.14.207.68:80/storeplatform-store-web/public/videoUpload/getUploadInfo?token=' + token
        // 导入模板下载
        config.downloadFile = 'http://106.14.207.68:80/storeplatform-store-web/store/stgoodsinfo/downloadFile?token=' + token
        // 案例封面上传
        config.photoUploadUrl = 'http://106.14.207.68:80/storeplatform-store-web/store/casebase/uploadPhoto?token=' + token

        // // 文件上传地址
        // config.uploadUrl = 'http://127.0.0.1:8080/storeplatform-store-web/public/enclosure/fileUpload?token=' + token
        // // 视频上传
        // config.videoUpload = 'http://127.0.0.1:8080/storeplatform-store-web/public/videoUpload/getUploadInfo?token=' + token
        // // 导入模板下载
        // config.downloadFile = 'http://127.0.0.1:8080/storeplatform-store-web/store/stgoodsinfo/downloadFile?token=' + token
        // // 案例封面上传
        // config.photoUploadUrl = 'http://127.0.0.1:8080/storeplatform-store-web/store/casebase/uploadPhoto?token=' + token

        // 微店预览
        config.MSUrl = 'http://101.132.157.87:8080/microShopPreview/index.html#/home?templateInfo='
        break
    }
    return config
  }
}
