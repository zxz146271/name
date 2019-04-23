<!--********************************************             展示页引用组件               ************************************-->
<template>
  <div class="activity-box">
    <!-- 优惠券 -->
    <div class="box" v-if="data[0] && data[0].type =='0'">
      <el-table :data="data" :show-header="false" align="center">
        <el-table-column label="Name" prop="couponName" width="100" align="left"></el-table-column>
        <el-table-column prop="tag" label="标签" align="left" filter-placement="bottom-end">
          <template slot-scope="scope">
            <!-- 折扣券 -->
            <el-tag type="warning" disable-transitions v-if="scope.row.preferentialIntensity">
              <span>{{scope.row.preferentialIntensity / 10}}折</span>
            </el-tag>
            <!-- 减价券 -->
            <el-tag type="danger" disable-transitions v-else>
              <!-- 无门槛 -->
              <span v-if="scope.row.useThreshold == 'noThreshold'">{{scope.row.lapseAmount}}元无门槛券</span>
              <!-- 有门槛 -->
              <span v-else>满{{scope.row.thresholdMoney}}减{{scope.row.lapseAmount}}</span>
            </el-tag>
            <!-- Todo 联盟 item.unionType =='3' -->
          </template>
        </el-table-column>
        <el-table-column label="Date" prop="activityTime" align="center"></el-table-column>
        <el-table-column label="领券" prop="getQuantity" align="center" width="100">
          <template slot-scope="scope">
            <span class="textColor1" v-if="scope.row.preferentialIntensity">已领 {{scope.row.getQuantity}} 张</span>
            <span class="textColor2" v-else>已领 {{scope.row.getQuantity}} 张</span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="large" @click="viewDetail(scope.row.couponCode,scope.row.getStartTime,scope.row.getEndTime,scope.row.useStartTime,scope.row.useEndTime)">详情</el-button>
            <!-- <el-button size="large" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <div type="button" style="display:inline-block;">
              <el-popover trigger="hover" placement="bottom" offset="10">
                <div style="height:36px;line-height:36px;background:#F4F4F4;padding-left:10px;cursor: pointer;"
                    @click="getShareId(scope.row.couponId,scope.row.couponCode,scope.$index,scope.row.couponName,'qrcode','downloadLink','coupon')">
                    <img src="../../../static/image/download.png" alt="" style="margin-right:10px">
                    下载二维码</div>
                <div style="height:36px;line-height:36px;background:#F4F4F4;padding-left:10px;cursor: pointer;" @click="editMarketingCoupon(scope.$index, scope.row)">
                  <img src="../../../static/image/pause.png" alt="" style="margin-right:10px">
                  编辑</div>
                <div style="height:36px;line-height:36px;background:#F4F4F4;padding-left:10px;cursor: pointer;" @click="stopMarketingCoupon(scope.$index,scope.row)">
                  <img src="../../../static/image/pause.png" alt="" style="margin-right:10px">
                  停止投放</div>
                <div slot="reference" class="name-wrapper">
                  <el-button slot="reference">更多
                    <span class="el-icon-arrow-down"></span>
                  </el-button>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 秒杀 -->
    <div class="box" v-if="data[0] && data[0].type =='1'">
      <el-table :data="data" :show-header="false" align="center">
        <el-table-column label="秒杀" prop="seckillName" width="100" align="left"></el-table-column>
        <el-table-column prop="tag" label="标签" align="left" filter-placement="bottom-end">
          <template slot-scope="scope">
            <!-- 折扣券 -->
            <el-tag type="warning" disable-transitions v-if="scope.row.discountPrice">
              <span>秒杀价{{ scope.row.discountPrice }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Date" prop="activityTime" align="center"></el-table-column>
        <el-table-column label="领券" prop="getQuantity" align="center" width="100">
          <template slot-scope="scope">
            <span class="textColor1" v-if="scope.row.discountPrice">已领 {{scope.row.getQuantity}} 张</span>
            <span class="textColor2" v-else>已领 {{scope.row.getQuantity}} 张</span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="large" @click="robDetail(scope.row.seckillId,scope.row.getStartTime,scope.row.getEndTime,scope.row.useStartTime,scope.row.useEndTime,scope.row.totalAmount)">详情</el-button>
            <!-- <el-button size="large" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <div type="button" style="display:inline-block;">
              <el-popover trigger="hover" placement="bottom" offset="10">
                <div style="height:36px;line-height:36px;background:#F4F4F4;padding-left:10px;cursor: pointer;"
                    @click="getShareId(scope.row.seckillId,scope.row.seckillCode,scope.$index,scope.row.seckillName,'qrcode','downloadLink','seckill')">
                    <img src="../../../static/image/download.png" alt="" style="margin-right:10px">
                    下载二维码{{scope.row.couponCode}}</div>
                <div style="height:36px;line-height:36px;background:#F4F4F4;padding-left:10px;cursor: pointer;" @click="editMarketingSeckill(scope.$index, scope.row)">
                  <img src="../../../static/image/pause.png" alt="" style="margin-right:10px">
                  编辑</div>
                <div style="height:36px;line-height:36px;background:#F4F4F4;padding-left:10px;cursor: pointer;" @click="stopMarketingSeckill(scope.$index, scope.row)">
                  <img src="../../../static/image/pause.png" alt="" style="margin-right:10px">
                  停止投放</div>
                <div slot="reference" class="name-wrapper">
                  <el-button slot="reference">更多
                    <span class="el-icon-arrow-down"></span>
                  </el-button>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 团购 -->
    <div class="box" v-if="data[0] && data[0].activityType =='2'">
      <el-table :data="data" :show-header="false" align="center">
        <el-table-column label="团购" prop="groupBookingName" width="100" align="left"></el-table-column>
        <el-table-column prop="tag" label="标签" align="left" filter-placement="bottom-end">
          <template slot-scope="scope">
            <!-- 已团人数 -->
            <el-tag type="warning" disable-transitions v-if="scope.row.groupMoney">
              <span>已团{{ scope.row.joinPeopleNum }}人</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Date" prop="activityTime" align="center"></el-table-column>
        <el-table-column label="成团人数" prop="successfulPeople" align="center" width="100">
          <template slot-scope="scope">
            <span class="textColor1">{{ scope.row.successfulPeople }}人成团</span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="large" @click="groupBookingDetail(scope.row.groupBookingId)">详情</el-button>
            <!-- <el-button size="large" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <div type="button" style="display:inline-block;">
              <el-popover trigger="hover" placement="bottom" offset="10">
                <div style="height:36px;line-height:36px;background:#F4F4F4;padding-left:10px;cursor: pointer;"
                    @click="getShareId(scope.row.groupBookingId,scope.row.groupBookingCode,scope.$index,scope.row.groupBookingName,'qrcode','downloadLink','groupBooking')">
                    <img src="../../../static/image/download.png" alt="" style="margin-right:10px">
                    下载二维码</div>
                <div style="height:36px;line-height:36px;background:#F4F4F4;padding-left:10px;cursor: pointer;" @click="editMarketingGroup(scope.$index, scope.row)">
                  <img src="../../../static/image/pause.png" alt="" style="margin-right:10px">
                  编辑</div>
                <div style="height:36px;line-height:36px;background:#F4F4F4;padding-left:10px;cursor: pointer;" @click="stopMarketingGroup(scope.$index,scope.row)">
                  <img src="../../../static/image/pause.png" alt="" style="margin-right:10px">
                  停止投放</div>
                <div slot="reference" class="name-wrapper">
                  <el-button slot="reference">更多
                    <span class="el-icon-arrow-down"></span>
                  </el-button>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- todo 联盟 -->

  </div>
</template>
<script>
  // import QRCode from 'qrcodejs2'
  import QRCode from 'qrcode'
  import {
    mapGetters
  } from 'vuex'
  import {
    judgeButton,
    getStore
  } from '../../tool/Utils'
  export default {
    data() {
      return {
        count: 0,
        // 停用优惠券后 返回给父组件的值
        returnToParentValue1: true,
        pageText: '',
        QRcodeImg: ''
      }
    },
    props: ['data'],
    computed: {
      ...mapGetters(['powerButton'])
    },
    mounted() {
      this.getButton()
    },
    methods: {
      getShareId(Id, Code, type, downloadName, loadId, loadImgId, shareType) {
        let params = {
          associatedId: Id,
          type: shareType
        }
        this.$api.shareToPeople(params).then(res => {
          if (res.code === 0) {
            this.downloadCoupon(Code, type, downloadName, loadId, loadImgId, res.data)
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        })
      },
      getButton() {
        let pageButtons = document.getElementsByTagName('button')
        judgeButton(pageButtons, this.powerButton)
      },
      // 优惠券编辑页面
      editMarketingCoupon(index, row) {
                // 判断是否生效 生效则不允许修改
        if (row.state === '2') {
          this.$message({
            message: '活动已经结束,无法编辑',
            type: 'warning'
          })
          return false
        } else if (row.state === '1') {
          // this.$message({
          //   message: '活动已经开始,无法编辑',
          //   type: 'warning'
          // })
          // return false
          this.$router.push({
            path: '/marketing/storeMarket/marketDiscount',
            query: {
              couponCode: row.couponCode,
              productsId: row.couponScope,
              leagueId: row.leagueId,
              state: row.state
            }
          })
        } else {
          this.$router.push({
            path: '/marketing/storeMarket/marketDiscount',
            query: {
              couponCode: row.couponCode,
              productsId: row.couponScope,
              leagueId: row.leagueId
            }
          })
        }
      },
      editMarketingCouponUnion() {  //unionId
        // 判断是否生效 生效则不允许修改
        if (this.item.state === '2') {
          this.$message({
            message: '活动已经结束,无法编辑',
            type: 'warning'
          })
          return false
        } else if (this.item.state === '1') {
          this.$message({
            message: '活动已经开始,无法编辑',
            type: 'warning'
          })
          return false
        } else {
          this.$router.push({
            path: '/marketing/marketUnionDiscount',
            query: {
              unionCouponId: unionId,
              unionId: this.item.unionId,
              productsId: this.item.couponScope
            }
          })
        }
      },
      // 秒商品编辑页面
      editMarketingSeckill(index, row) {  //seckillId
        // 判断是否生效 生效则不允许修改
        if (row.state === '2') {
          this.$message({
            message: '活动已经结束,无法编辑',
            type: 'warning'
          })
          return false
        } else if (row.state === '1') {
          // this.$message({
          //   message: '活动已经开始,无法编辑',
          //   type: 'warning'
          // })
          this.$router.push({
            path: '/marketing/storeMarket/marketRob',
            query: {
              seckillId: row.seckillId,
              productsId: row.goodsId,
              leagueId: row.leagueId,
              state: row.state
            }
          })
          return false
        } else {
          this.$router.push({
            path: '/marketing/storeMarket/marketRob',
            query: {
              seckillId: row.seckillId,
              productsId: row.goodsId,
              leagueId: row.leagueId
            }
          })
        }
      },
      // 团购编辑页面
      editMarketingGroup(index,row) {  //groupBookingId
        // 判断是否生效 生效则不允许修改
        if (row.state === '2') {
          this.$message({
            message: '活动已经结束,无法编辑',
            type: 'warning'
          })
          return false
        } else if (row.state === '1') {
          // this.$message({
          //   message: '活动已经开始,无法编辑',
          //   type: 'warning'
          // })
          this.$router.push({
            path: '/marketing/storeMarket/marketCollage',
            query: {
              groupBookingId: row.groupBookingId,
              productsId: row.goodId,
              leagueId: row.leagueId,
              state: row.state
            }
          })
          return false
        } else {
          this.$router.push({
            path: '/marketing/storeMarket/marketCollage',
            query: {
              groupBookingId: row.groupBookingId,
              productsId: row.goodId,
              leagueId: row.leagueId
            }
          })
        }
      },
      // 联盟编辑页面
      editMarketingUnion(unionId, state) {
        // 判断是否生效 生效则不允许修改
        if (this.item.distributorId === null) {
          this.$message({
            message: '无权限修改当前联盟活动',
            type: 'warning'
          })
          return false
        } else if (state === '2') {
          this.$message({
            message: '活动已经结束,无法编辑',
            type: 'warning'
          })
          return false
        } else if (state === '1') {
          this.$message({
            message: '活动已经开始,无法编辑',
            type: 'warning'
          })
          return false
        } else {
          this.$router.push({
            path: '/marketing/storeMarket/marketUnion',
            query: {
              unionId: unionId
            }
          })
        }
      },
      // 优惠券 详情页面
      viewDetail(couponCode, getStartTime, getEndTime, useStartTime, useEndTime) {
        this.$router.push({
          path: '/marketing/storeMarket/marketCoupon',
          query: {
            couponCode: couponCode,
            getStartTime: getStartTime,
            getEndTime: getEndTime,
            useStartTime: useStartTime,
            useEndTime: useEndTime,
            pageType: 0
          }
        })
      },
      // 优惠券 详情页面
      viewDetailUnion(couponId, getStartTime, getEndTime, useStartTime, useEndTime) {
        this.$router.push({
          path: '/marketing/storeMarket/marketCoupon',
          query: {
            couponId: couponId,
            getStartTime: getStartTime,
            getEndTime: getEndTime,
            useStartTime: useStartTime,
            useEndTime: useEndTime,
            unionId: this.item.unionId,
            pageType: 1
          }
        })
      },
      // 优惠券下载二维码
      downloadCoupon(couponCode, type, downloadName, loadId, loadImgId, stShareCode) {
        var _this = this
        // 获取分享链接
        let storeCode = getStore('storeCodeWeb')
        let staffCode = getStore('staffCode')
        let wechatUrl = getStore('wechatUrl')
        this.count++
        if (type !== '') {
          if (type === 0) {
            this.pageText = wechatUrl+'/favourableActivityDetail?couponCode=' + couponCode + '&storeCode=' +
              storeCode + '&couponType=' + type + '&inviter=' + staffCode + '&isFromApp=1&stShareCode=' + stShareCode
          } else if (type === 1 || type === 2) {
            this.pageText = wechatUrl+'/shopDetail?goodsCode=' + this.item.goodsCode + '&storeCode=' + storeCode +
              '&inviter=' + staffCode + '&staffCode=' + staffCode + '&isFromApp=1&stShareCode=' + stShareCode
          } else {
            this.$message({
              message: '活动类型错误,二维码下载失败,请联系管理员',
              type: 'warning'
            })
            return false
          }
        } else {
          this.$message({
            message: '二维码下载失败,请联系管理员',
            type: 'warning'
          })
          return false
        }
        // let qrcode = new QRCode(loadId, {
        //   width: 200,
        //   height: 200,
        //   text: this.pageText,
        //   render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas
        // })
        QRCode.toDataURL(_this.pageText, {
          errorCorrectionLevel: 'L'
        }, function (err, url) {
          _this.QRcodeImg = url
        })
        // 获取base64的图片节点
        var t
        clearTimeout(t)
        t = setTimeout(function () {
          // var img = document.getElementById(loadId).getElementsByTagName('img')[0]
          // let url = ''
          // // 构建画布
          // var canvas = document.createElement('canvas')
          // canvas.width = 200
          // canvas.height = 200
          // canvas.getContext('2d').drawImage(img, 0, 0)
          // 构造url
          // url = canvas.toDataURL('image/png')
          if (_this.isIEOrEdge()) {
            _this.SaveAs5(downloadName, _this.QRcodeImg)
          } else {
            // 构造a标签并模拟点击
            var downloadLink = document.getElementById(loadImgId)
            downloadLink.setAttribute('href', _this.QRcodeImg)
            downloadLink.setAttribute('download', downloadName + '.png')
            downloadLink.click()
            // downloadLink.removeEventListener('click')
            // document.getElementById(loadId).innerHTML = ''
          }
          // this.$message.success('下载成功')
        }, 100)
      },
      isIEOrEdge() {
        var UA = navigator.userAgent
        /* eslint-disable */
        return (!!window.ActiveXObject ? true : false) || ('ActiveXObject' in window ? true : false) || (UA.indexOf(
          'Edge') !== -1 ? true : false)
      },
      SaveAs5(fileName, content) {
        var blob = this.base64Img2Blob(content)
        window.navigator.msSaveBlob(blob, fileName + '.png')
      },
      base64Img2Blob(code) {
        var parts = code.split(';base64,')
        var contentType = parts[0].split(':')[1]
        var raw = window.atob(parts[1])
        var rawLength = raw.length
        var uInt8Array = new Uint8Array(rawLength)
        for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i)
        }
        return new Blob([uInt8Array], {
          type: contentType
        })
      },
      // 秒杀 详情页面
      robDetail(seckillId, getStartTime, getEndTime, useStartTime, useEndTime, totalAmount) {
        this.$router.push({
          path: '/marketing/storeMarket/marketPrefer',
          query: {
            seckillId: seckillId,
            getStartTime: getStartTime,
            getEndTime: getEndTime,
            useStartTime: useStartTime,
            useEndTime: useEndTime,
            totalAmount: totalAmount
          }
        })
      },
      // 团购 详情页面
      groupBookingDetail(groupBookingId) {
        this.$router.push({
          path: '/marketing/storeMarket/marketGroup',
          query: {
            groupBookingId: groupBookingId
          }
        })
      },
      // 联盟详情页面
      unionDetail(unionId) {
        this.$router.push({
          path: '/marketing/marketLeague',
          query: {
            unionId: unionId
          }
        })
      },
      // 停用优惠券
      stopMarketingCoupon(index,row) { //id, version
        if (row.state === '2') {
          this.$message({
            message: '当前优惠券已停用',
            type: 'warning'
          })
          return
        }
        let params = {
          couponId: row.couponId,
          state: '2',
          versionNo: row.versionNo
        }
        this.$confirm('此操作将停止投放该优惠券, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.modifyStatusStMarketingCoupon(params).then(res => {
            if (res.code === 0) {
              this.$emit('returnToParentValue', this.returnToParentValue1)
              this.$message({
                message: '停用成功',
                type: 'success'
              })
              // 刷新页面
            } else {
              this.$message({
                message: '停用失败',
                type: 'warning'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停用'
          })
        })
      },
      // 停用秒商品
      stopMarketingSeckill(index,row) {  //id, version
        if (row.state === '2') {
          this.$message({
            message: '当前优惠券已停用',
            type: 'warning'
          })
          return
        }
        let params = {
          seckillId: row.seckillId,
          state: '2',
          versionNo: row.versionNo
        }
        this.$confirm('此操作将停止投放该活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.modifyStatusStMarketingSeckill(params).then(res => {
            if (res.code === 0) {
              // 加载方法
              this.$emit('returnToParentValue', this.returnToParentValue1)
              this.$message({
                message: '停用成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '停用失败',
                type: 'warning'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停用'
          })
        })
      },
      // 停用团购
      stopMarketingGroup(index, row) {
        if (row.state === '2') {
          this.$message({
            message: '当前活动已结束',
            type: 'warning'
          })
          return
        }
        let params = {
          groupBookingId: row.groupBookingId,
          state: '2',
          versionNo: row.versionNo
        }
        this.$confirm('此操作将停止投放该活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.modifyStatusByGroupId(params).then(res => {
            if (res.code === 0) {
              // 加载方法
              this.$emit('returnToParentValue', this.returnToParentValue1)
              this.$message({
                message: '停用成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '停用失败',
                type: 'warning'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停用'
          })
        })
      },
      // 停用联盟活动
      stopMarketingUnion(id, version) {
        if (this.item.distributorId === null) {
          this.$message({
            message: '无权限关闭当前联盟活动',
            type: 'warning'
          })
          return false
        } else if (this.item.state === '2') {
          this.$message({
            message: '当前活动已结束',
            type: 'warning'
          })
          return
        }
        let params = {
          unionId: id,
          state: '2',
          versionNo: version
        }
        this.$api.modifyStatusByUnionId(params).then(res => {
          if (res.code === 0) {
            // 加载方法
            this.$emit('returnToParentValue', this.returnToParentValue1)
            this.$message({
              message: '停用成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '停用失败',
              type: 'warning'
            })
          }
        })
      },
      // 发布联盟活动
      redistributionUnion(unionId, versionNo) {
        if (this.item.state === '2') {
          this.$message({
            message: '活动已经结束,无法发布',
            type: 'warning'
          })
          return false
        } else if (this.item.state === '1') {
          this.$message({
            message: '活动进行中,发布失败',
            type: 'warning'
          })
          return false
        } else if (this.item.distributorId === null) {
          this.$message({
            message: '无权限发布当前联盟活动',
            type: 'warning'
          })
          return false
        }
        let params = {
          unionId: unionId,
          state: '0',
          versionNo: versionNo
        }
        this.$api.modifyStatusByUnionId(params).then(res => {
          if (res.code === 0) {
            // 加载方法
            this.$emit('returnToParentValue', this.returnToParentValue1)
            this.$message({
              message: '发布成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '发布失败',
              type: 'warning'
            })
          }
        })
      },
      // // 重新发布联盟活动
      // redistributionUnionAgin (unionId, versionNo) {
      //   if (this.item.state === '2') {
      //     this.$message({
      //       message: '活动已经结束,无法发布',
      //       type: 'warning'
      //     })
      //     return false
      //   } else if (this.item.state === '1') {
      //     this.$message({
      //       message: '活动进行中,发布失败',
      //       type: 'warning'
      //     })
      //     return false
      //   } else if (this.item.distributorId === null) {
      //     this.$message({
      //       message: '无权限发布当前联盟活动',
      //       type: 'warning'
      //     })
      //     return false
      //   }
      //   let params = {
      //     unionId: unionId,
      //     state: '0',
      //     versionNo: versionNo
      //   }
      //   this.$api.modifyStatusByUnionId(params).then(res => {
      //     if (res.code === 0) {
      //       // 加载方法
      //       this.$emit('returnToParentValue', this.returnToParentValue1)
      //       this.$message({
      //         message: '发布成功',
      //         type: 'success'
      //       })
      //     } else {
      //       this.$message({
      //         message: '发布失败',
      //         type: 'warning'
      //       })
      //     }
      //   })
      // },
      // 管理我的联盟优惠券
      managementUnionCoupon(startTime, endTime, unionId) {
        this.$router.push({
          path: '/marketing/marketUnionDetails',
          query: {
            startTime: startTime,
            endTime: endTime,
            unionId: unionId
          }
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import '../../assets/style/mixins/var';
  @import '../../assets/style/components/icon';
  @import '../../assets/style/components/elbtn';

  .activity-box {
    width: 100%;

    .more-down {
      display: inline-block;
      width: 11px;
      height: 6px;
      background: url("../../../static/image/more-down.png") no-repeat;
      background-size: cover;
      background-position: center center;
      position: relative;
      top: -2px;
      margin-left: 4px;
    }

    .box {
      padding: 10px 7px;

      .content {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        padding: 0 14px;
        position: relative;

        .title {
          display: flex;
          align-items: flex-end;
          padding-top: 60px;

          p {
            color: $body-bg-color;
            font-size: $detail-price-big-size;
            margin-right: 10px;
          }

          span {
            color: $yello-color-bright;
            font-size: $xs-size;
          }
        }

        .center {
          margin-top: 10px;

          ul {
            li {
              font-size: $xs-size;
              display: flex;
              color: rgba(255, 255, 255, 0.7);
              line-height: 20px;

              p {
                min-width: 60px;
              }

              &:last-child {
                margin-top: 12px;

                span {
                  color: $yello-color-bright;
                }
              }
            }
          }
        }

        .line {
          width: 100%;
          height: 1px;
          border: 1px dashed rgba(255, 255, 255, 0.5);
          margin: 12px 0 0 0;
          position: relative;

          &:before {
            content: "";
            display: block;
            width: 10px;
            height: 10px;
            border-radius: 5px;
            background-color: $body-bg-color;
            opacity: 1;
            position: absolute;
            left: -20px;
            top: -5px;
          }

          &:after {
            content: "";
            display: block;
            width: 10px;
            height: 10px;
            border-radius: 5px;
            background-color: $body-bg-color;
            opacity: 1;
            position: absolute;
            right: -20px;
            top: -5px;
          }
        }

        .bottom {
          ul {
            display: flex;

            li {
              margin-right: 32px;
              text-align: center;
              font-size: $xs-size;
              padding: 16px 0;
              color: #fff;
              cursor: pointer;

              i {
                width: 16px;
                height: 16px;
                display: inline-block;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;
                margin-bottom: -3px;
              }

              .edit {
                background-image: url('../../assets/image/icon/edit@2x.png');
              }

              .download {
                background-image: url('../../assets/image/icon/download@2x.png');
              }

              .delivery {
                background-image: url('../../assets/image/icon/stop@2x.png');
              }

              .detail {
                background-image: url('../../assets/image/icon/check@2x.png');
              }

              .close {
                background-image: url('../../assets/image/icon/stop@2x.png');
              }

              .administration {
                background-image: url('../../assets/image/icon/manage@2x.png');
              }

              .release {
                background-image: url('../../assets/image/icon/upload@2x.png');
              }

              .join-in {
                background-image: url('../../assets/image/icon/ok@2x.png');
              }

              .refuse {
                background-image: url('../../assets/image/icon/reduce@2x.png');
              }

              img {
                width: 16px;
                margin-bottom: -3px;
              }

              span {
                white-space: nowrap;
              }
            }
          }
        }

        .picture {
          width: 180px;
          position: absolute;
          right: 0;
          top: 0;

          img {
            width: 100%;
          }
        }
      }
    }

    .discount {
      @include linear(134.4deg, rgba(230, 71, 91, 1), rgba(254, 136, 128, 1));
    }

    .rob {
      @include linear(134.4deg, rgba(96, 120, 234, 1), rgba(24, 231, 217, 1));
    }

    .group {
      @include linear(-135deg, rgba(126, 189, 190, 1), rgba(39, 164, 146, 1));
    }

    .union {
      @include linear(134.4deg, rgba(124, 150, 166, 1), rgba(181, 198, 204, 1));

      .center {
        margin-top: 10px;

        ul {
          li {
            font-size: $xs-size;
            display: flex;
            flex-wrap: wrap;
            color: rgba(255, 255, 255, 0.7);
            line-height: 20px;

            &:last-child {
              margin-top: 0px !important;

              span {
                color: rgba(255, 255, 255, 0.7) !important;
              }
            }
          }
        }
      }
    }

    .textColor1 {
      color: #E6A23C;
    }

    .textColor2 {
      color: #F56C6C;
    }
  }

</style>
