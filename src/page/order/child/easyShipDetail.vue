<template>
  <div class="order-detail">
    <!-- <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb> -->
    <p class="order-num">
      <span class="num">订单号：<i>{{orderNum}}</i></span>
      <span class="note type1" v-if="state === '1'">待付款</span>
      <span class="note type1" v-else-if="state === '2'">待发货</span>
      <span class="note type3" v-else-if="state === '3'">已发货</span>
      <span class="note type2" v-else-if="state === '4'">已完成</span>
      <span class="note type5" v-else-if="state === '5'">退货中</span>
      <span class="note type4" v-else>已取消</span>
    </p>
    <div class="detail-list">
      <div class="detail-item">
        <top-tips :title="orderInfo"></top-tips>
          <div>
            <el-table
              :data="tableData"
              style="width: 100%"
              class="header-nobg"
              >
              <el-table-column
                label="收货人信息"
              >
                <template slot-scope="scope">
                  <p>收货人：<span class="black-color">{{scope.row.consignee}}</span></p>
                  <p>电话：<span class="black-color">{{scope.row.consigneeMobile}}</span></p>
                  <p>收货地址：<span class="black-color">{{scope.row.districtAdcode}}{{scope.row.detailAddress}}</span></p>
                  <p>定制内容: <span class="black-color">{{scope.row.customContent !== null?scope.row.customContent:''}}</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="totalMoney"
                label="应收金额"
                width="150px">
              </el-table-column>
              <el-table-column
                prop="accountPaid"
                align="center"
                width="150px"
                label="已收款">
              </el-table-column>
              <el-table-column
                prop="nonPayment"
                align="center"
                width="150px"
                label="未收款">
                <template slot-scope="scope">
                  <span class="red-color">¥: {{tableData[0].nonPayment}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </div>
       <div class="detail-item">
         <top-tips :title="img"></top-tips>
         <ul class="detail-img" style="display: flex;">
           <el-row :gutter="24" style="width: 100%;">
            <el-col :span="8" v-for="(item, index) in imgList" :key="index">
              <img :src='item' title="点击图片放大查看" class="img-view2"  :key="item" @click="showImg = true" style="cursor: pointer">
              <div class="img-dialog" v-if="showImg" @click="showImg = false">
                <img :src="item" >
              </div>
            </el-col>
           </el-row>
         </ul>
         <!-- <el-table
          :data="imgList"
          style="width: 100%"
          class="header-nobg"
          >
           <el-table-column
                label="订单图片"
            >
             <template slot-scope="scope" v-for="item in imgList" >
              <img :src='item' alt="" class="img-view" :key="item">
             </template>
           </el-table-column>
       </el-table> -->
      </div>
      <div class="detail-item detail-cont">
        <top-tips :title="remark"></top-tips>
       <el-table
          style="width: 100%"
          class="header-nobg"
          :data="easyOrderRecords"
          >
            <el-table-column
                prop="operationTime"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="操作流程"
                width="480">
              </el-table-column>
       </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
export default {
  data () {
    return {
      showImg: false,
      isChangePrice: false,
      imgList: [],
      breadcrumbList: [
        {title: '订单管理', path: '/myStore/order/easyOrderManage'},
        {title: '订单详情', path: ''}
      ],
      optional: {
        title: '商品信息',
        unfold: false
      },
      personInfo: {
        title: '信息填写',
        unfold: false
      },
      orderInfo: {
        title: '订单信息',
        unfold: false
      },
      img: {
        title: '订单图片',
        unfold: false
      },
      remark: {
        title: '订单记录',
        unfold: false
      },
      ruleForm3: {
        name: '',
        type: [],
        fileLists: []
      },
      tableData: [],
      orderNum: '',
      state: '',
      easyOrderRecords: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    changePrice () {
      this.isChangePrice = true
    },
    cancelChangePrice () {
      this.isChangePrice = false
    },
    initData () {
      let params = {
        easyOrderId: this.$route.query.orderId
      }
      this.$api.selectByEasyOrderId(params).then(res => {
        JSON.parse(res.data.districtAdcode).forEach(el => {
          if (res.data.districtAdcode.indexOf('[') !== -1) {
            res.data.districtAdcode = ''
            res.data.districtAdcode = el
          } else {
            res.data.districtAdcode += el
          }
        })
        res.data.totalMoney = '¥: ' + res.data.totalMoney
        res.data.accountPaid = '¥: ' + res.data.accountPaid
        this.orderNum = res.data.orderNum
        this.state = res.data.state
        res.data.easyOrderRecords.forEach(el => {
          this.easyOrderRecords.push(el)
        })
        this.tableData.push(res.data)
        let item = {}
        let tempFullUrl = ''
        res.data.fileUrl.forEach(el => {
          let param = {
            filePath: el.filePath
          }
          // 图片回显
          this.$api.getFullPath(param).then(res => {
            tempFullUrl = res.data
            this.imgList.push(tempFullUrl)
            item = {
              url: tempFullUrl,
              name: el.filename,
              enclosureId: el.enclosureId
            }
            this.ruleForm3.fileLists.push(item)
          })
        })
      })
    }
  },
  components: {breadCrumb, topTips}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.img-dialog{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 9000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img{
    height: 90%;
    min-height: 700px;
  }
}
.order-detail{
  margin:0 auto;
  padding-top: 126px;
  .order-num{
    margin: 20px 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .num{
      font-size: 24px;
      font-weight: bold;
      margin-right: 20px;
      i{
        font-size: 22px;
      }
    }
    .note{
      font-size: $md-size;
      color:#fff;
      padding: 2px 6px;
      border-radius: 4px;
      &.type1{
        background-color: $yello-color;
      }
      &.type2{
        background-color: #44AF7B;
      }
      &.type3{
        background-color: #7180F1;
      }
      &.type4{
        background-color: #B3B5BA;
      }
      &.type5{
        background-color: #f80a0a;
      }
    }
  }
  .detail-list{
    .detail-item{
      &.detail-cont{
        border-top:6px solid $gray-color;
        border-bottom:6px solid $gray-color;
        // padding: 20px 0;
      }
      .btns{
        text-align: center;
        margin: 40px 0;
        button{
          padding:15px 20px;
          &:first-child{
            width:140px;
          }
          &:last-child{
            width:200px;
          }
        }
      }
      .el-col-offset-12 {
          margin-right: 50%;
          margin-left:0;
      }
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
      }
      .price-op{
        display: flex;
        margin-left: 4px;
        justify-content: center;
        input[type='text']{
          border:1px solid $input-border-color;
          height:20px;
          border-radius: 4px;
          font-size: $xs-size;
          width:60px;
          padding-left:4px;
          margin-right: 4px;
        }
        button{
          padding:3px 8px;
        }
      }
      margin-bottom: 40px;
      .img-view{
        img{
          width:70px;
          height:70px;
        }
      }
      .comm-name{
        font-size: $md-size;
        font-weight: bold;
      }
      .evalue{
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        .left{
          p{
            display: flex;
            padding: 5px 0;
            span{
              margin-right: 10px;
            }
          }
        }
        .right{
          ul{
            display: flex;
            li{
              margin-left: 10px;
              img{
                width:160px;
                height:160px;
              }
            }
          }
        }
      }
      .comm-num{
        color:$text-gray-color;
      }
      .dis-befo{
        color:$main-color;
        font-weight: bold;
      }
      .dis-afte{
        color:$text-gray-color;
      }
      .black-color{
        font-weight: bold;
      }
      .red-color{
        color:$main-color;
        font-weight: bold;
      }
      .origin{
        position: relative;
        color:$text-gray-color;
        &:after{
          content: '';
          position: absolute;
          left: 15%;
          right: 15%;
          height: 1px;
          background-color: #e0e0e0;
          top: 50%;
        }
      }
    }
  }
}
</style>
