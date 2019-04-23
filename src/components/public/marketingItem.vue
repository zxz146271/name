<template>
  <div class="activity-box">
    <div class="box" v-if="activity.type =='0'">
      <div class="content discount">
        <div class="title">
          <p>优惠券</p>
          <span>满减优惠券(满1000减100)</span>
        </div>
        <div class="center">
          <ul>
            <li>
              <p>投放总量：</p><span>1000</span>
            </li>
            <li>
              <p>生效日期：</p><span>2017.12.12 00:00 - 20180.01.30 00:00</span>
            </li>
            <li>
              <p>每人限额：</p><span>1张</span>
            </li>
            <li>
              <p>使用范围：</p><span>全部商品</span>
            </li>
             <li>
              <p>剩余数量：</p><span>1232</span>
            </li>
          </ul>
        </div>
        <div class="line">
        </div>
        <div class="bottom">
          <ul>
            <li>
              <i class="edit"></i>
              <span>编辑</span>
            </li>
            <li>
              <i class="download"></i>
              <span>下载</span>
            </li>
            <li>
              <i class="delivery"></i>
              <span>停止投放</span>
            </li>
            <li  @click="viewDetail">
              <i class="detail"></i>
              <span>查看详情</span>
            </li>
          </ul>
        </div>
        <div class="picture">
          <img src="static/image/juan.png">
        </div>
      </div>
    </div>
    <div class="box" v-if="activity.type =='1'">
      <div class="content rob">
        <div class="title">
          <p>秒杀</p>
          <span>秒杀活动</span>
        </div>
        <div class="center">
          <ul>
            <li>
              <p>投放总量：</p><span>1000</span>
            </li>
            <li>
              <p>秒杀时间：</p><span>2017.12.12 00:00 - 20180.01.30 00:00</span>
            </li>
            <li>
              <p>每人限额：</p><span>1张</span>
            </li>
            <li>
              <p>使用范围：</p><span>全部商品</span>
            </li>
             <li>
              <p>剩余数量：</p><span>1232</span>
            </li>
          </ul>
        </div>
        <div class="line">
        </div>
        <div class="bottom">
          <ul v-if="activity.type!=='3'">
            <li>
              <i class="edit"></i>
              <span>编辑</span>
            </li>
            <li>
              <i class="download"></i>
              <span>下载</span>
            </li>
            <li>
              <i class="delivery"></i>
              <span>停止投放</span>
            </li>
            <li  @click="viewDetail">
              <i class="detail"></i>
              <span>查看详情</span>
            </li>
          </ul>
        </div>
        <div class="picture">
          <img src="static/image/qiang@2x.png">
        </div>
      </div>
    </div>
    <div class="box" v-if="activity.type =='2'">
      <div class="content group">
        <div class="title">
          <p>团购</p>
          <span>团购活动</span>
        </div>
        <div class="center">
          <ul>
            <li>
              <p>生效日期</p><span>2017.12.12 00:00 - 20180.01.30 00:00</span>
            </li>
            <li>
              <p>定金</p><span>无需交定金</span>
            </li>
            <li>
              <p>商品名称：</p><span>商品</span>
            </li>
            <li>
              <p>团购规则：</p><span>满10人打9折</span>
            </li>
             <li>
              <p>当前参与人数：</p><span>1232</span>
            </li>
          </ul>
        </div>
        <div class="line">
        </div>
        <div class="bottom">
          <ul v-if="activity.type!=='3'">
            <li>
              <i class="edit"></i>
              <span>编辑</span>
            </li>
            <li>
              <i class="download"></i>
              <span>下载</span>
            </li>
            <li>
              <i class="delivery"></i>
              <span>停止投放</span>
            </li>
            <li  @click="viewDetail">
              <i class="detail"></i>
              <span>查看详情</span>
            </li>
          </ul>
        </div>
        <div class="picture">
          <img src="static/image/tuan@2x.png">
        </div>
      </div>
    </div>
    <div class="box" v-if="activity.type =='3'">
      <div class="content union">
        <div class="title">
          <p>联盟</p>
          <span>发起者/参与者</span>
        </div>
        <div class="center">
          <ul>
            <li>
              <p>生效日期：</p><span>2017.12.12 00:00 - 20180.01.30 00:00</span>
            </li>
            <li>
              <p>定金：</p><span>无需交定金</span>
            </li>
            <li>
              <p>商品名称：</p><span>商品</span>
            </li>
            <li>
              <p>团购规则：</p><span>满10人打9折</span>
            </li>
          </ul>
        </div>
        <div class="line">
        </div>
        <div class="bottom">
          <ul>
            <li>
              <i class="edit"></i>
              <span>编辑</span>
            </li>
            <li>
              <i class="detail"></i>
              <span>查看详情</span>
            </li>
            <li>
              <i class="close"></i>
              <span>关闭联盟</span>
            </li>
            <li>
              <i class="administration"></i>
              <span>管理</span>
            </li>
             <li>
               <i class="download"></i>
              <span>下载</span>
            </li>
            <li>
              <i class="release"></i>
              <span>重新发布</span>
            </li>
            <li>
              <i class="join-in"></i>
              <span>确定加入</span>
            </li>
            <li>
              <i class="refuse"></i>
              <span>拒绝</span>
            </li>
          </ul>
        </div>
        <div class="picture">
          <img src="static/image/lianmeng@2x.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: ['activity'],
  methods: {
    viewDetail () {
      this.$router.push({path: '/marketing/storeMarket/marketCoupon'})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
  .activity-box{
     width:50%;
  .box{
    padding:10px 7px;
    height:300px;
      .content{
        width:100%;
        height:100%;
       border-radius:10px;
       padding:0 14px;
       position:relative;
       .title{
         display:flex;
         align-items:flex-end;
         padding-top:60px;
         p{
           color:$body-bg-color;
           font-size:$detail-price-big-size;
           margin-right:10px;
         }
         span{
           color:$yello-color-bright;
           font-size:$xs-size;
         }
       }
       .center{
        margin-top:10px;
        ul{
          li{
            font-size:$xs-size;
            display:flex;
            color:rgba(255,255,255,0.7);
            line-height:20px;
            &:last-child{
             margin-top:12px;
             span{
               color:$yello-color-bright;
             }
            }
          }
        }
       }
       .line{
         width:100%;
         height:1px;
         border:1px dashed rgba(255,255,255,0.5);
         margin:12px 0 0 0;
         position:relative;
         &:before{
           content:"";
           display:block;
           width:10px;
           height:10px;
           border-radius:5px;
           background-color:$body-bg-color;
           opacity:1;
           position:absolute;
           left:-20px;
           top:-5px;
         }
          &:after{
           content:"";
           display:block;
           width:10px;
           height:10px;
           border-radius:5px;
           background-color:$body-bg-color;
           opacity:1;
           position:absolute;
           right:-20px;
           top:-5px;
         }
       }
       .bottom{
         ul{
           display:flex;
           flex-wrap:wrap;
           li{
             margin-right:36px;
             text-align:center;
             font-size:$xs-size;
             padding:16px 0 0 0;
             color:#fff;
             cursor: pointer;
             i{
               width:16px;
               height: 16px;
               display: inline-block;
               background-size: cover;
               background-repeat:no-repeat;
               background-position: center center;
               margin-bottom:-3px;
             }
             .edit{
               background-image: url('../../assets/image/icon/edit@2x.png');
             }
             .download{
               background-image: url('../../assets/image/icon/download@2x.png');
             }
             .delivery{
               background-image: url('../../assets/image/icon/stop@2x.png');
             }
             .detail{
               background-image: url('../../assets/image/icon/check@2x.png');
             }
              .close{
               background-image: url('../../assets/image/icon/stop@2x.png');
             }
              .administration{
               background-image: url('../../assets/image/icon/manage@2x.png');
             }
              .release{
               background-image: url('../../assets/image/icon/upload@2x.png');
             }
             .join-in{
               background-image: url('../../assets/image/icon/ok@2x.png');
             }
              .refuse{
               background-image: url('../../assets/image/icon/reduce@2x.png');
             }
              img{
                width:16px;
                margin-bottom:-3px;
                }
               span{
                white-space:nowrap;
               }
           }
         }
       }
       .picture{
         width:180px;
         position:absolute;
         right:0;
         top:0;
         img{
           width:100%;
         }
       }
    }
  }
  .discount{
    @include linear(134.4deg,rgba(230,71,91,1),rgba(254,136,128,1));
  }
  .rob{
    @include linear(134.4deg,rgba(96,120,234,1),rgba(24,231,217,1));
  }
  .group{
    @include linear(-135deg,rgba(126,189,190,1),rgba(39,164,146,1));
  }
  .union{
    @include linear(134.4deg,rgba(124,150,166,1),rgba(181,198,204,1));
       .center{
        margin-top:10px;
        ul{
          li{
            font-size:$xs-size;
            display:flex;
            flex-wrap:wrap;
            color:rgba(255,255,255,0.7);
            line-height:20px;
            &:last-child{
             margin-top:0px!important;
             span{
               color:rgba(255, 255, 255, 0.7)!important;
             }
            }
          }
        }
       }
    }
  }
</style>
