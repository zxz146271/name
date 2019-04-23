<template>
  <div class="com-item">
    <div class="orderDetail">
      <div class="left">
        <el-checkbox class="comm-check" @change="checkboxchange"></el-checkbox>
        <div class="com-img">
          <img :src="item.firstPictureUrl? item.firstPictureUrl:defaultImg" alt class="img-view">
        </div>
      </div>
      <div class="right">
        <div class="topic">
          <!-- 商品名称规范写法 -->
          <div class="name">{{item.goodsName}}</div>
        </div>
        <div class="com-info">
          <p>{{ item.submitTime }}</p>
        </div>
      </div>
      <div class="deliveryTime">
        <div class="time">{{ item.deliveryTime }}</div>
      </div>
      <div class="consigneeInfo">
        <div class="consignee">{{ item.consignee }} : {{ item.moble }}</div>
        <div class="shippingAddress">{{ item.shippingAddress }}</div>
      </div>
      <div class="totalAmount">
        <div class="amunt">￥ {{ item.totalAmount }}</div>
        <div class="postage">含邮费：￥ {{ item.postage }}</div>
      </div>
      <div class="paidAmount">
        <div class="paidAmountText">￥ {{ item.paidAmount }}</div>
      </div>
      <div class="unPaidAmount">
        <div class="unPaidAmountText">￥ {{ item.unPaidAmount }}</div>
      </div>
    </div>
    <div class="orderStatus">
      <div class="unpaid">
        <div class="point"></div>
        <div class="text">待付款</div>
      </div>
      <div class="moreOperation">
        <div class="lookDetail">查看详情</div>
        <div class="lookDetail" @click="importReceivingRecords4()">发货</div>
        <div class="lookDetail" @click="importReceivingRecords5()">查看物流</div>
      </div>
    </div>
    <div class="add">
        <!-- 两个弹窗开始 -->
        <el-dialog
          :visible.sync="receivingDetail4"
            width="448px"
            :before-close="handleClose4" class="import-dialog ">
              <div slot="title" class="center-title center-box">
                <span class="lookup-store">发货</span>
              </div>
              <delivergoods @handleClose4="handleClose4" />
          </el-dialog> 

          <el-dialog
          :visible.sync="receivingDetail5"
            width="448px"
            :before-close="handleClose5" class="import-dialog " >
              <div slot="title" class="center-title center-box">
                <span class="lookup-store">查看物流</span>
              </div>
              <viewLogistics @handleClose5="handleClose5"  :receivingDetail5 = "receivingDetail5" v-on:success="success(false)"/>
          </el-dialog> 
        <!-- 两个弹窗结束 -->
    </div>
  </div>
</template>
<script>
import delivergoods from '../store/delivergoods';
import viewLogistics from '../store/viewLogistics';
import { mapGetters } from "vuex";
import { judgeButton } from "../../tool/Utils";
export default {
  components: {
      delivergoods,
      viewLogistics
  },
  data() {
    return {
      isShowReceipt: false,
      orderId: "",
      order: {},
      // 等待发货
      wait_send: false,
      // 部分发货
      part_send: false,
      // 已发货
      has_send: false,
      // 部分退货
      part_return: false,
      // 已退货
      has_return: false,
      // 为付款
      no_receive_money: false,
      // 部分收款
      part_receive_money: false,
      pageDate: {},
      // 发货按钮
      fahuoshow: true,
      // 退货按钮
      tuihuoshow: true,
      // 退款按钮
      isShowReceiptReturn: false,
      isShowEdit: false,
      orderJSON: {
        title: ""
      },
      receivingDetail4: false,
      receivingDetail5: false
    };
  },
  computed: {
    ...mapGetters(["powerButton"])
  },
  created() {
    this.pageDate = this.item;
  },
  // 接收传过来的数组对象
  // 数据初始化方法
  mounted() {
    this.getButton();
    this.changeState();
  },
  props: ["item", "orderType"],
  methods: {
    // 两个弹窗开始-======
    importReceivingRecords4 () {
      this.receivingDetail4 = true
      console.log(this.receivingDetail4);
    },
    handleClose4 () {
      this.receivingDetail4 = false
    },
    importReceivingRecords5 () {
      this.receivingDetail5 = true
      console.log(this.receivingDetail5);
      // this.submemberInfo = val
    },
    handleClose5 () {
      this.receivingDetail5 = false
    },
    success(res){
      this.receivingDetail5 = res;
    }

  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/mixins/var";
@import "../../assets/style/components/icon";

.com-item {
  border: 1px solid #e1e1e1;
  //   display: flex;
  padding-top: 16px;
  position: relative;
  &:hover {
    background: $gray-color;

    .comm-opera {
      display: block;
    }
  }
  .orderDetail {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 14px;
    .left {
      display: flex;
      margin-left: 14px;
      .comm-check {
        margin-top: 34px;
      }

      .com-img {
        margin-left: 12px;
        text-align: center;

        .img-upload {
          width: 100px;
          display: inline-block;
          padding: 4px 0;
          margin-top: 4px;
        }

        img {
          width: 100px;
          height: 100px;
          display: inherit;
        }

        .no-img {
          width: 100px;
          height: 100px;
          display: inherit;
          color: #a7aab2;
          font-weight: 700;
          font-size: 16px;
          padding: 0 20px;
          border: 1px solid #a7aab2;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .right {
      margin-left: 15px;
      width: 14.2%;
      .btn {
        padding: 3px 8px;

        &.define {
          border-color: $main-color;
          color: $main-color;
        }

        &.cancel {
          border-color: $input-border-color;
          color: $text-main-color;
          margin-left: 4px;
        }
      }

      .topic {
        display: flex;
        .name {
          width: 160px;
        }
        .ercode {
          position: relative;
          width: 30px;

          &:hover {
            .ercode-detail {
              display: block;
            }

            .ercode-tr {
              display: inline;
            }
          }

          .icon-erweima {
            font-size: 22px;
          }

          .ercode-detail {
            display: none;
            width: 204px;
            position: absolute;
            background: #fff;
            border: 1px solid rgba(0, 0, 0, 0.16);
            box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
            z-index: 9;
            top: -120px;
            left: 30px;
            text-align: center;
            font-size: $xs-size;
            border-radius: 4px;

            .top {
              padding: 14px 14px 0 14px;
            }

            .comm-code {
              color: $text-gray-color;
              margin-top: 4px;
            }

            img {
              width: 175px;
              height: 175px;
            }

            .download {
              border-top: 1px solid $border-color;
              margin-top: 6px;
              padding: 8px 0;
              font-size: $xs-size;

              .iconfont {
                margin-right: 8px;
                font-size: 14px;
              }
            }
          }

          .ercode-tr {
            content: "";
            display: none;
            position: absolute;
            width: 18px;
            height: 18px;
            border: 1px solid rgba(0, 0, 0, 0.16);
            background: #fff;
            transform: rotate(45deg);
            z-index: 10;
            border-right: 0;
            border-top: 0;
            border-radius: 4px;
          }
        }

        .name {
          //   font-size: $xlg-size;
          font-size: 14px;
        }
      }

      .com-info {
        font-size: $xs-size;
        color: $text-gray-color;
        margin: 9px 0;

        p {
          margin: 4px 0;
        }

        p.type-list {
          span {
            margin-right: 12px;
          }
        }
      }

      .change-price {
        font-size: $xs-size;
        display: flex;

        .price-view {
          .num {
            color: $text-red-color;
            font-weight: bold;
          }

          .el-icon-edit {
            margin-left: 4px;
            cursor: pointer;

            &:hover {
              color: $main-color;
            }
          }

          .money {
            color: $text-red-color;
          }

          .black {
            color: $text-gray-color;
            margin-top: 4px;
            display: inline-block;
          }
        }

        .price-op {
          display: flex;
          margin-left: 4px;

          input[type="text"] {
            border: 1px solid $input-border-color;
            height: 20px;
            border-radius: 4px;
            font-size: $xs-size;
            width: 80px;
            padding-left: 4px;
            margin-right: 4px;
          }
        }
      }

      .comm-label {
        font-size: $xs-size;
        margin-top: 14px;
        display: flex;

        .label {
          display: inline-block;
          border-radius: 4px;
          padding: 1px 6px;
          margin-right: 4px;

          &:hover {
            .el-icon-delete {
              display: inline-block;
            }
          }

          .el-icon-delete {
            display: none;
          }

          &:nth-child(n + 1) {
            color: #eb5c00;
            border: 1px solid #eb5c00;
          }

          &:nth-child(n + 2) {
            color: #44af7b;
            border: 1px solid #44af7b;
          }

          &:nth-child(n + 3) {
            color: #7180f1;
            border: 1px solid #7180f1;
          }
        }

        .add-label {
          .add-btn {
            cursor: pointer;
            display: inline-block;
            border-radius: 4px;
            padding: 1px 6px;
            border: 1px solid $input-border-color;
            color: $text-gray-color;
          }

          .add-input {
            input[type="text"] {
              border: 1px solid $input-border-color;
              height: 20px;
              border-radius: 4px;
              font-size: $xs-size;
              width: 80px;
              padding-left: 4px;
              margin-right: 4px;
              padding-right: 14px;
            }
          }
        }
      }
    }
    .deliveryTime {
      margin-left: 14px;
      width: 14.2%;
      .time {
        font-size: 14px;
      }
    }
    .consigneeInfo {
      width: 16%;
      font-size: 14px;
    }
    .totalAmount {
      width: 10%;
      margin-left: 14px;
      font-size: 14px;
    }
    .paidAmount {
      width: 10%;
      margin-left: 14px;
      font-size: 14px;
    }
    .unPaidAmount {
      width: 10%;
      margin-left: 14px;
      font-size: 14px;
    }
  }
  .orderStatus {
    width: 100%;
    height: 48px;
    line-height: 48px;
    display: flex;
    justify-content: space-between;
    .unpaid {
      display: flex;
      justify-content: flex-start;
      color: #ffc44d;
      margin-left: 44px;
      .point {
        width: 8px;
        height: 8px;
        background: #ffc44d;
        border-radius: 50%;
        position: relative;
        top: 19px;
      }
      .text {
        font-size: 16px;
        font-weight: 500;
        margin-left: 12px;
      }
    }
    .moreOperation {
      display: flex;
      justify-content: flex-start;
      padding-top: 7px;
      box-sizing: border-box;
      .lookDetail {
        width: 93px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #ffffff;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        margin-right: 16px;
        cursor: pointer;
      }
    }
  }
  .add{
  position: absolute;
  right: 40px;
  top: 100px;
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
}
</style>
