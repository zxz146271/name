k<template>
    <div class="mhome">
        <div class="header">
            <swiper :options="swiperOption">
                <!-- <swiper-slide class="swiper-slide1" v-for="(item,index) in imgList" :key="index">
                    <div class="img-con">
                        <img :src="item" alt="">
                    </div>
                    <div class="banner-content">
                        <img src="../../assets/image/mobile/logo (1)@2x.png" alt="" class="logo">
                        <div class="banner-text">
                            <h2>无需开发，轻松上手</h2>
                            <h1>快速生成小程序</h1>
                            <p>咨询我们：400-668-4866</p>
                            <div class="download-btn">立即下载</div>
                        </div>
                    </div>
                </swiper-slide> -->
                <swiper-slide class="swiper-slide1">
                    <div class="img-con">
                        <img src="../../assets/image/mobile/banner_01@2x.png" alt="">
                    </div>
                    <div class="banner-content">
                        <img src="../../assets/image/mobile/logo (1)@2x.png" alt="" class="logo">
                        <div class="banner-text">
                            <h2>想赚钱，就用蘑鱼丝</h2>
                            <h1>用蘑鱼丝，立即打开您的专属线上店</h1>
                            <p>咨询我们：400-668-4866</p>
                            <a v-if="isIOS" class="download-btn" href="https://itunes.apple.com/cn/app/%E8%98%91%E9%B1%BC%E4%B8%9D/id1395155719?mt=8" target="_blank">立即下载</a>
                            <a v-else class="download-btn" href="http://url.cn/5KFB2tn" target="_blank">立即下载</a>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="swiper-slide1">
                    <div class="img-con">
                        <img src="../../assets/image/mobile/banner_02@2x.png" alt="">
                    </div>
                    <div class="banner-content">
                        <img src="../../assets/image/mobile/logo (1)@2x.png" alt="" class="logo">
                        <div class="banner-text">
                            <h2>无需开发，轻松上手</h2>
                            <h1>快速生成小程序</h1>
                            <p>咨询我们：400-668-4866</p>
                            <a v-if="isIOS" class="download-btn" href="https://itunes.apple.com/cn/app/%E8%98%91%E9%B1%BC%E4%B8%9D/id1395155719?mt=8" target="_blank">立即下载</a>
                            <a v-else class="download-btn" href="http://url.cn/5KFB2tn" target="_blank">立即下载</a>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="swiper-slide1">
                    <div class="img-con">
                        <img src="../../assets/image/mobile/banner_03@2x.png" alt="">
                    </div>
                    <div class="banner-content">
                        <img src="../../assets/image/mobile/logo (1)@2x.png" alt="" class="logo">
                        <div class="banner-text">
                            <h2>不多不多，我们只有100多种组合营销模式</h2>
                            <h1>蘑鱼丝组合营销矩阵，打破客户引流魔咒</h1>
                            <p>咨询我们：400-668-4866</p>
                            <a v-if="isIOS" class="download-btn" href="https://itunes.apple.com/cn/app/%E8%98%91%E9%B1%BC%E4%B8%9D/id1395155719?mt=8" target="_blank">立即下载</a>
                            <a v-else class="download-btn" href="http://url.cn/5KFB2tn" target="_blank">立即下载</a>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="swiper-slide1">
                    <div class="img-con">
                        <img src="../../assets/image/mobile/banner_04@2x.png" alt="">
                    </div>
                    <div class="banner-content">
                        <img src="../../assets/image/mobile/logo (1)@2x.png" alt="" class="logo">
                        <div class="banner-text">
                            <h2>家居行业新零售解决方案领航者</h2>
                            <h1>想赚钱，就用蘑鱼丝</h1>
                            <p>咨询我们：400-668-4866</p>
                            <a v-if="isIOS" class="download-btn" href="https://itunes.apple.com/cn/app/%E8%98%91%E9%B1%BC%E4%B8%9D/id1395155719?mt=8" target="_blank">立即下载</a>
                            <a v-else class="download-btn" href="http://url.cn/5KFB2tn" target="_blank">立即下载</a>
                        </div>
                    </div>
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination"  slot="pagination" id="top-pagination"></div>
            </swiper>
        </div>
        <div class="features">
            <div class="features-item" :class="{ 'mstore': index ==0, 'marketing': index ==1, 'store': index ==2}" v-for="(item,index) in featuresList" :key="index" >
                <h1>{{ item.introduceTitle }}</h1>
                <div v-html="item.introduceContent"></div>
                <img :src="item.filePath" alt="">
            </div>
        </div>
        <div class="program">
            <h1>解决方案</h1>
            <div class="program-list">
                <div class="program-item" v-for="(item,index) in solutionList" :key="index">
                    <img :src="item.filePath" alt="">
                    <div class="program-text" v-html="item.introduceContent"></div>
                </div>
            </div>
        </div>
        <div class="case">
            <swiper :options="swiperOption2">
                <swiper-slide class="swiper-slide2" v-for="(item,index) in caseList" :key="index">
                    <div class="logo">
                        <h1>{{ item.introduceTitle }}</h1>
                        <img :src="item.filePath" alt="">
                    </div>
                    <p>门店通过后台设置规则发放优惠券，通过小程序分享，客户登陆授权即可在线领取电子优惠券，线下体验手机扫一扫或输入客户手机号码直接核销。</p>
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination"  slot="pagination" id="case-pagination"></div>
            </swiper>
        </div>
        <footer class="footer">
            <div class="down-app-btn" v-if="isIOS" ><a href="https://itunes.apple.com/cn/app/%E8%98%91%E9%B1%BC%E4%B8%9D/id1395155719?mt=8" target="_blank">下载“蘑鱼丝”APP了解更多</a></div>
            <div class="down-app-btn" v-else><a href="http://url.cn/5KFB2tn" target="_blank">下载“蘑鱼丝”APP了解更多</a></div>
            <div class="down-app-btn tel-btn">咨询电话： <a href="tel:400-668-4866"> 400-668-4866</a></div>
            <div class="hr"></div>
            <div class="mys-info">
                <p>上海市闵行区闵虹路166弄2号楼501室</p>
                <p>Copyright @2018 big-zone.net All right</p>
            </div>
        </footer>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
export default {
  data () {
    return {
      imgList: [],
      contentMap: [],
      featuresList: [],
      solutionList: [],
      caseList: [],
      swiperOption: {
        pagination: {
          el: '#top-pagination',
          clickable: true
        },
        // swiper configs 所有的配置同swiper官方api配置
        // loop: true,
        autoplay: true,
        speed: 400,
        autoHeight: true
      },
      swiperOption2: {
        pagination: {
          el: '#case-pagination',
          clickable: true
        },
        autoHeight: true,
        slidesPerView: 'auto',
        spaceBetween: 10,
        centeredSlides: true,
        isIOS: true
      }
    }
  },
  mounted () {
    this.findData()
  },
  created () {
    this.isIOS = /iPhone|iPod/i.test(navigator.userAgent)
  },
  methods: {
    findData () {
      this.$api.findmHomeData().then(res => {
        if (res.code === 0) {
          this.imgList = res.data.imgList
          this.contentMap = res.data.contentMap
          for (var i in this.contentMap) {
            if (i === '1') {
              this.featuresList = this.contentMap[i]
            }
            if (i === '2') {
              this.solutionList = this.contentMap[i]
            }
            if (i === '3') {
              this.caseList = this.contentMap[i]
            }
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.mhome{
    width: 100%;
}
/* 官网头部 */
.header{
    display: flex;
    justify-content: center;
    align-items: center;
}
.swiper-slide1{
    width: 100%;
    height: auto;
    position: relative;
}
.banner-content{
    position: absolute;
    top: 0;
    width: 100%;
}
.img-con img{
    width: 100%;
}
/* .slide-img1{
    height: 240px;
    background: url('../../assets/image/mobile/banner－01@2x.png') no-repeat center center;
    background-size: contain;
}
.slide-img2{
    height: 240px;
    background: url('../../assets/image/mobile/banner_02@2x.png') no-repeat center center;
    background-size: contain;
}
.slide-img3{
    height: 240px;
    background: url('../../assets/image/mobile/banner_03@2x.png') no-repeat center center;
    background-size: contain;
}
.slide-img4{
    height: 240px;
    background: url('../../assets/image/mobile/banner_04@2x.png') no-repeat center center;
    background-size: contain;
} */
.swiper-slide1 img.logo{
    width: 57px;
    margin: 20px 0 0 25px;
}
.banner-text{
    color: #fff;
    text-align: center;
    margin-top: 20px;
}
.banner-text h2{
    height:22px;
    font-size:16px;
    line-height:22px;
    font-weight: normal;
}
.banner-text h1{
    height:28px;
    font-size:20px;
    line-height:28px;
    font-weight: normal;
    margin: 5px 0;
}
.banner-text p{
    height:20px;
    font-size:14px;
    line-height:20px;
}
.banner-text .download-btn{
    display: block;
    color: #fff;
    width:110px;
    height:36px;
    line-height: 36px;
    background:rgba(39,139,255,1);
    border-radius:18px;
    margin: 15px auto 0;
    font-size:16px;
}
/* 功能部分 */
.features{
    width: 100%;
}
.features .features-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 0;
}
.features .features-item h1{
    font-size:20px;
    color:rgba(25,25,25,1);
    line-height:28px;
    font-weight: normal;
}
.features .features-item div{
    width:336px;
    font-size:14px;
    color:rgba(122,122,122,1);
    line-height:25px;
    padding: 15px 0;
}
.features .features-item img{
    width: 375px;
}
.features .marketing{
    background:rgba(243,243,243,1);
}
.features .marketing img{
    width: 320px;
}
.features .store img{
    width: 320px;
}
/* 解决方案 */
.program{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(243,243,243,1);
    padding: 30px 0;
}
.program h1{
    height:25px;
    font-size:18px;
    color:rgba(25,25,25,1);
    line-height:25px;
    font-weight: normal;
    margin: 5px 0 5px 0;
}
.program .program-list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.program .program-list .program-item{
    width: 357px;
    display: flex;
    align-items: center;
    margin-top: 15px;
    padding: 15px 10px;
    background: #fff;
}
.program .program-list .program-item img{
    width: 119px;
}
.program .program-list .program-item .program-text{
    margin-left: 20px;
    height: 119px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size:14px;
    color:rgba(122,122,122,1);
}
.program .program-list .program-item .program-text p span{
    height:20px;
    font-size:14px;
    color:rgba(122,122,122,1);
    line-height:20px;
}
/* 案例 */
.case{
    width: 100%;
    height: 202px;
    background: url('../../assets/image/mobile/bg_01@2x.png') no-repeat;
    background-size: cover;
    padding: 25px 0 0 0;
    overflow: hidden;
}
.case .swiper-slide2{
    width: 300px;
    height:130px;
    background:rgba(255,255,255,1);
}
.case .swiper-slide .logo{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.case .swiper-slide .logo img{
    width: 97px;
    height: 49px;
}
.case .swiper-slide .logo h1{
    height:20px;
    font-size:14px;
    color:rgba(25,25,25,1);
    line-height:20px;
    font-weight: bold;
    margin: 0 0 5px 14px;
}
.case .swiper-slide p{
    font-size:11px;
    color:rgba(122,122,122,1);
    line-height:20px;
    margin: 0 14px;
}
#case-banner{
    overflow: visible;
}
/* #case-pagination{
    bottom: -35px;
}
#case-pagination .swiper-pagination-bullet{
    width:18px;
    height:2px;
    background:rgba(255,255,255,0.5);
    opacity: 1;
    border-radius: unset;
}
#case-pagination .swiper-pagination-bullet-active{
    background:rgba(255,255,255,1);
} */
/* 底部 */
.footer{
    width: 100%;
    background:rgba(55,61,68,1);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 0 20px 0;
}
.footer .down-app-btn{
    width:189px;
    height:33px;
    text-align: center;
    line-height: 33px;
    border-radius:17px;
    border:1px solid rgba(255,255,255,1);
    font-size:14px;
}
.footer .down-app-btn a{
    color: #fff;
}
.tel-btn{
    margin-top: 20px;
}
.footer .hr{
    width:319px;
    height:1px;
    background:  rgba(255,255,255,0.25);
    margin: 15px 0;
}
.footer .mys-info p{
    height:17px;
    font-size:12px;
    color:rgba(255,255,255,1);
    line-height:17px;
    margin-bottom: 10px;
}
</style>
