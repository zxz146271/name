<template>
    <div class="com-item">
    <div class="left">
      <div class="com-img">
        <img :src="item.firstPictureUrl? item.firstPictureUrl:defaultImg" alt="" class="img-view">
        <!-- <div class="no-img" v-else>暂无商品图片</div> -->
         <el-button class="img-upload"  icon="el-icon-download" @click="getShareId(item.goodsId, 'goods', item.goodsName, 'qrcode', 'downloadLink',item.goodsCode)">下载二维码</el-button>
          <a id="downloadLink"></a>
          <div id="qrcode"  style="display: none;">
            <img :src="QRcodeImg" >
          </div>
      </div>
    </div>
    <div class="right">
      <div class="topic">
        <!-- <div class="ercode">
          <i class="iconfont icon-erweima"></i>
          <div class="ercode-detail">
            <div class="top">
              <div :id="item.goodsId"></div>
               <p class="comm-code">{{item.goodsCode}}</p>
            </div>
            <el-button type="primary" icon="el-icon-download" @click="downLoaadQrCode(item.goodsId, item.goodsName)">下载</el-button>
            <div class="download" @click="downLoaadQrCode(item.goodsId, item.goodsName)">
               <a :id="item.goodsId + '1'"></a>
               <i class="iconfont icon-icon-"></i>下载
             </div>
          </div>
           <i class="ercode-tr"></i>
        </div> -->
        <!-- 商品名称规范写法 -->
        <!-- {{item.goodsName}} | ({{item.storeName}}在售) -->
        <div class="name">{{item.goodsName}}</div>
      </div>
      <el-row>
        <el-col :span="6" class="elcol">
          <el-row>
            <p v-if="item.goodsCode" class="line-com">商品编号: {{item.goodsCode}}</p>
            <p v-if="item.categoryName" class="line-com">品类：{{item.categoryName}}</p>
            <!-- <p class="line-com">标签：222222222</p> -->
          </el-row>
           
        </el-col>
        <el-col :span="6" class="elcol">
          <p  class="line-com">货号：{{item.artNo}}</p>
          <p v-if="item.goodsModel"  class="line-com">型号：{{item.goodsModel}}</p>
        </el-col>
        <el-col :span="6" class="elcol">
          <p v-if="item.brandName"  class="line-com">品牌：{{item.brandName}}</p>
           <p class="black line-com">商品售价：{{item.goodsMsrp == 0 ? '到店详询' : item.goodsMsrp+'元'}}</p>
          <!-- <p v-if="item.goodsMsrp"  class="line-com">微店销售价：{{item.goodsMsrp}}</p> -->
          <!-- <p  class="line-com">当前门店数量：90个</p> -->
        </el-col>
      </el-row>
      <!-- <div class="com-info">
        
        
       
        <p v-if="item.artNo">
         
          
        </p>
        <p class="type-list">
          
          
        </p>
      </div> -->
      <!--<div class="change-price">
        <div class="price-view">
          <span>本店售价：</span>
          <span class="money">￥3000.00</span>
        </div>
      </div>-->
      <!-- 注释 -->
      <!-- <div class="change-price" v-if="item.pricingMode ==='定价'">
        <div class="price-view">
          <span class="black">建议零售价：￥{{item.goodsMsrp}}</span>
        </div>
      </div>
      <div class="change-price" v-else>
        <div class="price-view">
          <span class="black">到店详询</span>
        </div>
      </div> -->
      <!-- 注释 -->
       <div class="comm-label">
        <!-- <span class="label">滞销
          <i class="el-icon-delete"></i>
        </span>
        <span class="label">旧品
          <i class="el-icon-delete"></i>
        </span>
        <span class="label">主推货
          <i class="el-icon-delete"></i>
        </span> v-for="(item, index) in stGoodsInfoList" :key="index" :item="item"-->

        <!-- <span class="label"  v-for="(name, index) in item.labelList" :key="index">{{name}}
          <i class="el-icon-delete" @click="deleteLaber(name)" v-if="name !== '热销' && name !== '滞销' && name !== '热门' && name !== '新品'"></i>
        </span> -->

        <!-- <template v-for="name in item.labelList"  :class="label">{{name}}</template> -->
        <div class="add-label">
          <!-- <span class="add-btn" @click="addLable" v-show ="!isAddLabel" data-code="8010007">+ 添加</span> -->
          <span class="add-input" v-show ="isAddLabel">
            <input type="text" v-model="laberName">
            <el-button class="btn define" @click="saveLaber">确定</el-button>
            <el-button class="btn cancel" @click="cancelAddLabel">取消</el-button>
          </span>
        </div>
      </div>
    </div>
    <!-- <div class="add">
        <el-dialog
          :visible.sync="receivingDetail"
            width="448px"
            :before-close="handleClose2" class="import-dialog ">
              <div slot="title" class="center-title center-box">
                <span class="lookup-store">修改微店售价</span>
              </div>
            <storeCommodityltemprice @handleClose2="handleClose2" />
          </el-dialog> 
          
           <el-dialog
          :visible.sync="receivingDetail3"
            width="448px"
            :before-close="handleClose3" class="import-dialog" >
              <div slot="title" class="center-title center-box">
                <span class="lookup-store">修改数量</span>
              </div>
            <store-commodityltemnum @handleClose3="handleClose3" />
          </el-dialog> 
        <span type="text" @click="importReceivingRecords()" class="lookup">修改门店售价</span> | 
        <span type="text" @click="importReceivingRecords3()" class="lookup">修改数量</span>
    </div> -->
  </div>
</template>
<script>
// import QRCode from '../../../node_modules/qrcodejs2'
// import QRCode from 'qrcodejs2'
import QRCode from 'qrcode'
import {getStore} from '../../tool/Utils'
import defaultImg from '../../assets/image/image_placeholder.png'
// 试验
// import storeCommodityltemprice from './storeCommodityltemprice'
// import storeCommodityltemnum from './storeCommodityltemnum'
// import delivergoods from './delivergoods'
// import viewLogistics from './viewLogistics'
// 试验
export default {
    //试验
  // components:{
  //   storeCommodityltemprice,
  //   storeCommodityltemnum
  // },
  //试验
  data () {
    return {
      QRcodeImg: '',
      isChangePrice: false,
      isAddLabel: false,
      laberName: '',
      // receivingDetail: false,
      // receivingDetail3: false
    }
  },
  // 接收传过来的数组对象
  props: ['item'],
  mounted () {
    // if (!this.itemfirstPictureUrl){
    //   this.item.firstPictureUrl = '../../assets/image/image_placeholder.png'
    // }
    // this.createQrCode(this.item.goodsId)
  },
  methods: {
    // // 创建 二维码
    // createQrCode (goodsId) {
    //   // 获取门店ID 用户i
    
    //   let storeId = this.item.storeId
    //   let qrcode = new QRCode(goodsId, {
    //     width: 180,
    //     height: 180,
    //     text: 'https://wx.uhaya.com/examples/goods?id=' + goodsId + '&storeid=' + storeId + '&userid=' + userid + '&type=goods',
    //     render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas
    //   })
    //   console.log(qrcode)
    // },
    // // 下载二维码
    // downLoaadQrCode (goodsId, goodsName) {
    //   var img = document.getElementById(goodsId).getElementsByTagName('img')[0]
    //   let url = ''
    //   // 构建画布
    //   var canvas = document.createElement('canvas')
    //   canvas.width = 180
    //   canvas.height = 180
    //   canvas.getContext('2d').drawImage(img, 0, 0)
    //   // 构造url
    //   url = canvas.toDataURL('image/png')
    //   // 构造a标签并模拟点击
    //   var downloadLink = document.getElementById(goodsId + '1')
    //   downloadLink.setAttribute('href', url)
    //   downloadLink.setAttribute('download', goodsName + '.png')
    //   downloadLink.click()
    //   document.getElementById(goodsId).innerHTML = ''
    //   // this.$message.success('下载成功')
    //   this.createQrCode(goodsId)
    // },
    getShareId (goodsId, type, goodsName, loadId, loadImgId, goodeCode) {
      let params = {
        associatedId: goodsId,
        type: type
      }
      this.$api.shareToPeople(params).then(res => {
        if (res.code === 0) {
          this.downloadCoupon(goodsId, type, goodsName, loadId, loadImgId, res.data, goodeCode)
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    // 商品下载二维码
    downloadCoupon (goodsId, type, goodsName, loadId, loadImgId, stShareCode, goodeCode) {
      let _this = this
      let storeCode = getStore('storeCodeWeb')
     let wechatUrl = getStore('wechatUrl')
      _this.pageText = wechatUrl+'/shopDetail?goodsCode=' + goodeCode + '&storeCode=' + storeCode + '&inviter=' + staffCode + '&isFromApp=1&stShareCode=' + stShareCode
      QRCode.toDataURL(_this.pageText, { errorCorrectionLevel: 'L' }, function (err, url) {
        console.log(url)
        _this.QRcodeImg = url
      })
      // 获取base64的图片节点
      var t
      clearTimeout(t)
      t = setTimeout(function () {
        if (_this.isIEOrEdge()) {
          _this.SaveAs5(goodsName, _this.QRcodeImg)
        } else {
          // 构造a标签并模拟点击
          var downloadLink = document.getElementById(loadImgId)
          downloadLink.setAttribute('href', _this.QRcodeImg)
          downloadLink.setAttribute('download', goodsName + '.png')
          downloadLink.click()
          // document.getElementById(loadId).innerHTML = ''
        }
        // this.$message.success('下载成功')
      }, 100)
    },
    isIEOrEdge () {
      var UA = navigator.userAgent
      /* eslint-disable */
      return (!!window.ActiveXObject? true: false) || ('ActiveXObject' in window? true : false) || (UA.indexOf('Edge') !== -1? true: false)
    },
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
    },
    changePrice () {
      this.isChangePrice = true
    },
    cancelChangePrice () {
      this.isChangePrice = false
    },
    addLable () {
      this.isAddLabel = true
    },
    cancelAddLabel () {
      this.laberName = ''
      this.isAddLabel = false
    },
    // 编辑商品信息
    commEdit (goodsId) {
      this.$router.push({path: '/myStore/commEdit', query: {goodsId: goodsId}})
    },
    // 保存标签
    saveLaber () {
      if (this.laberName.trim() === '热销' || this.laberName.trim() === '滞销' || this.laberName.trim() === '热门' || this.laberName.trim() === '新品') {
        this.$message.error('此类标签无法手动创建')
      } else if (this.laberName.trim() === '') {
        this.$message.error('标签名称不能为空！')
      } else {
        let params = {
          labObjId: this.item.goodsId,
          labType: 'SP',
          labName: this.laberName,
          markType: 'DY',
          distributorId: this.item.distributorId,
          storeId: this.item.storeId
        }
        this.$api.stLabelAddSave(params).then(res => {
          if (res.code === 0) {
            // 成功返回列表页面
            this.laberName = ''
            this.$emit('reflash')
            this.cancelAddLabel()
          } else {
            // 失败提示
            this.laberName = ''
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 删除标签
    deleteLaber (labName) {
      let params = {
        labName: labName,
        labType: 'SP',
        labObjId: this.item.goodsId,
        storeId: this.item.storeId
      }
      this.$api.deleteStLabel(params).then(res => {
        if (res.code === 0) {
          // 成功返回列表页面
          this.laberName = ''
          this.$emit('reflash')
          this.cancelAddLabel()
        } else {
          // 失败提示
          this.laberName = ''
          this.$message.error(res.msg)
        }
      })
    },
    //试验
    //  importReceivingRecords () {
    //   this.receivingDetail = true
    //   console.log(this.receivingDetail);
    //   // this.submemberInfo = val
    // },
    // handleClose2 () {
    //   this.receivingDetail = false
    // },
    // importReceivingRecords3 () {
    //   this.receivingDetail3 = true
    //   console.log(this.receivingDetail3);
    //   // this.submemberInfo = val
    // },
    // handleClose3 () {
    //   this.receivingDetail3 = false
    // }
    // 两个弹窗结束-========
    //试验
  },

}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';

.com-item{
  margin-top: 24px;
  border:1px solid rgba(233,233,233,1);
  background-color: #FFFFFF;
  &:hover{
    background: $gray-color;
    .comm-opera{
      display: block;
    }
  }
  border-bottom:1px solid $border-color;
  display: flex;
  // padding: 18px 14px;
  position: relative;
  .comm-opera{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right:18px;
    display: none;
    button:nth-child(1){
      padding:7px;
      background-color:$main-color;
      border-color:$main-color;
      &:hover{
        background-color:lighten($main-color,6%);
        border-color:lighten($main-color,6%);
      }
      i{
        color:#fff;
      }
    }
    button:nth-child(2){
      padding:8px 12px;
      background-color:#DDE0E9;
      border-color:#DDE0E9;
      color:$text-main-color;
      &:hover{
        background-color:darken(#DDE0E9,6%);
        border-color:darken(#DDE0E9,6%);
      }
    }
    // display: none;
  }
  .left{
    position: relative;
    .comm-check{
      margin-top:34px;
    }
    .com-img{
      // margin-left:12px;
      text-align: center;
      .img-upload{
        width:100px;
        display: inline-block;
        padding:4px 0;
        margin-top: 4px;
        margin-left: 8px;
        position: absolute;
        bottom:10px;
        left: 20px;
        border:none;
        background-color: rgba(0,0,0,.5);
        color: #fff;
      }
      .img-upload:hover {
        background-color: rgba(0,0,0,1);

      }
      img{
        width:163px;
        height:163px;
        display: inherit;
      }
      .no-img{
        width:100px;
        height:100px;
        display: inherit;
        color: #A7AAB2;
        font-weight: 700;
        font-size: 16px;
        padding: 0 20px;
        border: 1px solid #A7AAB2;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .right{
    margin-left: 15px;
    .btn{
      padding:3px 8px;
      &.define{
        border-color: $main-color;
        color:$main-color;
      }
      &.cancel{
        border-color: $input-border-color;
        color:$text-main-color;
        margin-left: 4px;
      }
    }
    .topic{
      display: flex;
      .ercode{
        position: relative;
        width: 30px;
        &:hover{
          .ercode-detail{
            display: block;

          }
          .ercode-tr{
            display: inline;
          }
        }
      .icon-erweima{
        font-size: 22px;

      }
      .ercode-detail{
        display: none;
          width:204px;
          position: absolute;
          background: #fff;
          border:1px solid rgba(0,0,0,0.16);
          box-shadow: 0 6px 12px 0 rgba(0,0,0,0.2);
          z-index: 9;
          top: -120px;
          left: 30px;
          text-align: center;
          font-size: $xs-size;
          border-radius: 4px;
          .top{
            padding:14px 14px 0 14px;
          }
          .comm-code{
            color: $text-gray-color;
            margin-top: 4px;
          }
          img{
            width:163px;
            height:163px;
          }
          .download{
            border-top:1px solid $border-color;
            margin-top: 6px;
            padding: 8px 0;
            font-size: $xs-size;
            .iconfont{
              margin-right: 8px;
              font-size: 14px;
            }
          }
        }
          .ercode-tr{
            content: '';
            display: none;
            position: absolute;
            width:18px;
            height:18px;
            border:1px solid rgba(0, 0, 0, 0.16);
            background: #fff;
            transform: rotate(45deg);
            z-index: 10;
            border-right: 0;
            border-top: 0;
            border-radius: 4px;
          }
      }
      .name{
        font-size: $xlg-size;
        height: 50px;
        line-height: 60px;
        color: #000000;
        font-weight:600;
      }
    }
    .com-info{
      font-size: $xs-size;
      color:$text-gray-color;
      margin: 9px 0;
      p{
        margin: 4px 0;
      }
      p.type-list{
        span{
          margin-right: 12px;
        }
      }
    }
    .change-price{
      font-size:$xs-size;
      display:flex;
      .price-view{
        .num{
          color:$text-red-color;
          font-weight: bold;
        }
        .el-icon-edit{
          margin-left: 4px;
          cursor: pointer;
          &:hover{
            color:$main-color;
          }
        }
        .money{
          color:$text-red-color;
        }
        .black{
          color:$text-gray-color;
          margin-top: 4px;
          display: inline-block;
        }
      }
      .price-op{
        display: flex;
        margin-left: 4px;
        input[type='text']{
          border:1px solid $input-border-color;
          height:20px;
          border-radius: 4px;
          font-size: $xs-size;
          width:80px;
          padding-left:4px;
          margin-right: 4px;
        }
      }
    }
    .comm-label{
      font-size: $xs-size;
      margin-top: 14px;
      display: flex;
      .label{
        display: inline-block;
        border-radius: 4px;
        padding: 1px 6px;
        margin-right: 4px;
        &:hover{
          .el-icon-delete{
            display: inline-block;
          }
        }
        .el-icon-delete{
          display: none;
        }
        &:nth-child(n+1){
          color:#EB5C00;
          border:1px solid #EB5C00;
        }
        &:nth-child(n+2){
          color:#44AF7B;
          border:1px solid #44AF7B;
        }
        &:nth-child(n+3){
          color:#7180F1;
          border:1px solid #7180F1;
        }
      }
      .add-label{
        .add-btn{
          cursor: pointer;
          display: inline-block;
          border-radius: 4px;
          padding: 1px 6px;
          border:1px solid $input-border-color;
          color:$text-gray-color;
        }
        .add-input{
          input[type='text']{
            border:1px solid $input-border-color;
            height:20px;
            border-radius: 4px;
            font-size: $xs-size;
            width:80px;
            padding-left:4px;
            margin-right: 4px;
            padding-right: 14px;
          }
        }
      }
    }
  }
}
.add{
  position: absolute;
  right: 40px;
  top: 60px;
  color: #D8D8D8;
}
.lookup{
  color:#FD4343;
  border:none;
}
.lookup:hover{
  color:#f00;
  cursor:pointer;
}
.center-box{
  border-bottom: 1px dashed #C0C4CC;
  height: 42px;
  text-align: center;
}
.lookup-store{
  font-size:16px;
  font-weight:500;
  line-height:22px;
  color: #606266;
}
.elcol{
      width: 300px;
}
.line-com{
  height: 36px;
  line-height: 36px;
  color: #909399;
}
// .customWidth{
//   width: 200px;
// }
</style>
