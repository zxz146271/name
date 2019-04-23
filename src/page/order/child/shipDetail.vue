<template>
  <div class="order-detail">
    <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb>
    <p class="order-num">
      <span class="num">订单号：<i>2146787614</i></span>
      <span class="note type1" v-if="state === '1'">未收款</span>
      <span class="note type1" v-else-if="state === '2'">待发货</span>
      <span class="note type3" v-else-if="state === '3'">已发货</span>
      <span class="note type2" v-else-if="state === '4'">已完成</span>
      <span class="note type5" v-else-if="state === '5'">退货中</span>
      <span class="note type4" v-else>已关闭</span>
    </p>
    <div class="detail-list">
      <div class="detail-item">
        <top-tips :title="orderInfo"></top-tips>
          <div>
            <el-table
              :data="tableData1"
              style="width: 100%"
              class="header-nobg"
              >
              <el-table-column
                prop="info"
                label="客户信息"
              >
                <template slot-scope="scope">
                  <p>客户：<span class="black-color">张三</span></p>
                  <p>电话：<span class="black-color">18565896666</span></p>
                  <p>收货地址：<span class="black-color">西安市神州数码科技园12楼</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="way"
                label="应收金额"
                width="100px"
              >
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                width="200px"
                label="已收款">
              </el-table-column>
              <el-table-column
                prop="install"
                align="center"
                width="100px"
                label="未收款">
                <template slot-scope="scope">
                  <span class="red-color">￥1000.00</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </div>
      <div class="detail-item detail-cont">
        <el-table
          :data="tableData"
          style="width: 100%"
          class="header-nobg"
          >
          <el-table-column
            prop="img"
            label="图片"
            width="140">
            <template slot-scope="scope" >
              <img :src="scope.row.img" alt="" class="img-view">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称/编号/货号"
          >
            <template slot-scope="scope">
              <p class="comm-name">商品名称</p>
              <p class="comm-num">商品编号：5461349761321252</p>
              <p class="comm-num">货号：321346134</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            align="center"
            width="200px"
            label="购买量">
          </el-table-column>
          <el-table-column
            prop="price"
            align="center"
            width="200px"
            label="已发量">
          </el-table-column>
          <el-table-column
            prop="num"
            align="center"
            width="240px"
            label="代发量">
            <template slot-scope="scope">
              <div class="price-view">
                <span class="num red-color" v-show="!isChangePrice">3000</span>
                <i class="el-icon-edit-outline" v-show="!isChangePrice" @click="changePrice"></i>
              </div>
              <div class="price-op" v-show="isChangePrice">
                <input type="text">
                <el-button class="btn define">确定</el-button>
                <el-button class="btn cancel" @click="cancelChangePrice">取消</el-button>
              </div>
          </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="detail-item">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="ruleForm">
          <el-row :gutter="24">
            <el-col :span="12" :offset="12">
              <el-form-item label="发货日期" prop="name">
                <el-date-picker
                  v-model="ruleForm.date1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="12">
              <el-form-item label="发货人" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="btns">
          <el-button>取消</el-button>
          <el-button type="primary">发货</el-button>
        </div>
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
      value5: 5,
      value4: 4,
      value3: 3,
      value2: 2,
      value1: 1,
      isChangePrice: false,
      imgList: ['//static-oss.muyusi.com/back_pic/035abf491ceeb6b.jpg', '//static-oss.muyusi.com/back_pic/595ac31d93c7d82.jpg', '//static-oss.muyusi.com/back_pic/925ac2e63d4af5e.jpg', '//static-oss.muyusi.com/back_pic/435aa74d8c05855.jpg'],
      breadcrumbList: [
        {title: '订单管理', path: '/order/orderManage'},
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
      tableData: [{
        img: '//static-oss.muyusi.com/back_pic/595ac31d93c7d82.jpg',
        name: '王小虎',
        price: '￥130.00',
        num: 1
      }, {
        img: '//static-oss.muyusi.com/back_pic/595ac31d93c7d82.jpg',
        name: '王小虎',
        price: '￥130.00',
        num: 1
      }, {
        img: '//static-oss.muyusi.com/back_pic/595ac31d93c7d82.jpg',
        name: '王小虎',
        price: '￥130.00',
        num: 1
      }, {
        img: '//static-oss.muyusi.com/back_pic/595ac31d93c7d82.jpg',
        name: '王小虎',
        price: '￥130.00',
        num: 1
      }],
      tableData1: [{
        info: '',
        way: '￥4000.00',
        date: '￥3000.00',
        install: '￥1000.00',
        shop: '上海旗舰店',
        person: '张三'
      }],
      tableData2: [{
        info: '懒人沙发',
        way: '送货',
        date: '2018.4.19',
        install: '是',
        shop: '上海旗舰店',
        person: '张三'
      }, {
        info: '懒人沙发',
        way: '送货',
        date: '2018.4.19',
        install: '是',
        shop: '上海旗舰店',
        person: '张三'
      }],
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changePrice () {
      this.isChangePrice = true
    },
    cancelChangePrice () {
      this.isChangePrice = false
    }
  },
  components: {breadCrumb, topTips}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
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
