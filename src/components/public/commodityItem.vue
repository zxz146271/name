<template>
  <div class="com-item">
    <div class="left">
     <!-- <el-checkbox class="comm-check"  v-model="item.isChoose" >{{item.isChoose}}</el-checkbox> -->
     <el-checkbox class="comm-check" @change="checkboxchange(index)" :disabled="item.useState" v-model="item.choose"></el-checkbox>
    <div class="com-img">
        <img :src="item.firstPictureUrl? item.firstPictureUrl:defaultImg" alt="">
        <!-- <div class="no-img" v-else>暂无商品图片</div> -->
      </div>
    </div>
    <div class="right">
      <div class="topic">
        <!-- 商品名称规范写法 -->
        <div class="name">{{item.goodsName}}</div>
      </div>
      <div class="com-info">
        <p v-if="item.goodsCode">
          商品编号：{{item.goodsCode}}
        </p>
        <p v-if="item.artNo">
          货号：{{item.artNo}}
        </p>
        <p class="type-list">
          <span v-if="item.categoryName">品类：{{item.categoryName}}</span>
          <span v-if="item.brandName">品牌：{{item.brandName}}</span>
          <span v-if="item.goodsSpecifications">规格：{{item.goodsSpecifications}}</span>
          <span v-if="item.goodsModel">型号：{{item.goodsModel}}</span>
        </p>
      </div>
      <div class="change-price" v-if="item.pricingMode ==='定价'">
        <div class="price-view">
          <span class="black">建议零售价：</span>
          <span class="num" v-show="!isChangePrice">￥{{item.goodsMsrp}}</span>
          <!-- <i class="el-icon-edit" v-show="!isChangePrice && $route.path !== '/marketing/storeMarket/marketDiscount'&& $route.path !== '/marketing/storeMarket/marketRob' && item.state !== '6'" @click="changePrice"></i> -->
        </div>
        <div class="price-op" v-show="isChangePrice">
          <input type="text"  v-model="tempPrice">
          <el-button class="btn define" @click="saveChangePrice">确定</el-button>
          <el-button class="btn cancel" @click="cancelChangePrice">取消</el-button>
        </div>
      </div>
       <div class="change-price" v-else>
        <div class="price-view">
          <span class="black">到店详询</span>
        </div>
      </div>
      <div class="black-remarks" v-if="item.state === '6'"><font color = 'red'>备注：{{item.remarks}}</font></div>
    </div>
    <!-- <div class="comm-opera">
      <el-button icon="el-icon-edit" v-if="$route.path !== '/marketing/storeMarket/marketDiscount' && $route.path !== '/marketing/storeMarket/marketRob' && item.state !== '6'"  @click="commEdit(item.goodsId)" circle data-code="5010004" ></el-button>
      <el-button round @click="setGoodsDrop(item.goodsId,item.state)" v-if="item.state==='4' && item.state !== '6'" data-code="5010005">上架</el-button>
      <el-button round @click="setGoodsDrop(item.goodsId,item.state)" v-if="item.state!=='4' && $route.path !== '/marketing/storeMarket/marketDiscount' && $route.path !== '/marketing/storeMarket/marketRob' && item.state !== '6'" data-code="5010006">下架</el-button>
          <el-button round @click="setGoodsDrop(item.goodsId,item.state)" v-if="item.state==='4' && item.state !== '6'" data-code="5010005">上架</el-button>
      <el-button round @click="getActivityByGoodsId(item.goodsId,item.state)" v-if="item.state!=='4' && $route.path !== '/marketing/storeMarket/marketDiscount' && $route.path !== '/marketing/storeMarket/marketRob' && item.state !== '6'" data-code="5010006">下架</el-button>
    </div> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { judgeButton } from '../../tool/Utils'
import defaultImg from '../../assets/image/image_placeholder.png'
export default {
  data () {
    return {
      isChangePrice: false,
      isAddLabel: false,
      // 单次选择的数组
      checkList: [],
      chenkOne: [],
      tempPrice: '',
      laberName: '',
      defaultImg
    }
  },
  computed: {
    ...mapGetters(['powerButton'])
  },
  mounted () {
    // if (!this.itemfirstPictureUrl){
    //   this.item.firstPictureUrl = '../../assets/image/image_placeholder.png'
    // }
    this.getButton()
  },
  // 接收传过来的数组对象
  props: ['item', 'index'],
  methods: {
    // 下架商品前判断是否参加活动
    getActivityByGoodsId (goodsId, state) {
      if (state !== '4') {
        var itemList = []
        itemList.push(goodsId)
        let params = {
          jsonData: JSON.stringify(itemList)
        }
        this.$api.getActivityByGoodsId(params).then(res => {
          if (res.code === 0) {
            this.setGoodsDrop(goodsId, state)
          } else {
            this.$message({
              message: res.data,
              type: 'warning',
              duration: 5000
            })
          }
        })
      }
    },
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    changePrice () {
      this.isChangePrice = true
    },
    // 修改价格
    saveChangePrice () {
      let params = {
        goodsId: this.item.goodsId,
        goodsMsrp: this.tempPrice
      }
      this.$api.changeGoodsPrice(params).then(res => {
        if (res.code === 0) {
          this.item.goodsMsrp = this.tempPrice
          this.isChangePrice = false
        } else {
          this.$message.error('修改价格失败')
        }
      })
    },
    // 保存标签
    saveLaber () {
      let params = {
        labObjId: this.item.goodsId,
        labType: 'SP',
        labName: this.laberName,
        markType: 'DY',
        distributorId: this.item.distributorId
      }
      this.$api.stLabelAddSave(params).then(res => {
        if (res.code === 0) {
          // 成功返回列表页面
          this.$emit('reflash')
          this.cancelAddLabel()
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    // 删除标签
    deleteLaber (labName) {
      let params = {
        labName: labName,
        goodsId: this.item.goodsId
      }
      this.$api.deleteGoodsStLabel(params).then(res => {
        if (res.code === 0) {
          // 成功返回列表页面
          this.$emit('reflash')
          this.cancelAddLabel()
        } else {
          // 失败提示
          this.$message.error(res.msg)
        }
      })
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
      this.$router.push({ path: '/store/commEdit', query: { goodsId: goodsId } })
    },
    // 商品下架操作
    setGoodsDrop (goodsId, state) {
      let temp = ''
      let msg = ''
      if (state === '4') {
        temp = '0'
        msg = '商品上架'
      } else {
        temp = '4'
        msg = '商品下架'
      }
      this.$confirm('此操作将使' + msg + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          goodsId: goodsId,
          state: temp
        }
        this.$api.setGoodsDrop(params).then(res => {
          if (res.code === 0) {
            // 成功提示
            this.$message.success(msg + '成功')
            this.$emit('reflash')
          } else {
            // 失败提示
            this.$message.error(msg + '失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    checkboxchange () {
      this.$emit('checkBokChange', this.item.goodsId)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.com-item {
  &:hover {
    background: $gray-color;
    .comm-opera {
      display: block;
    }
  }
  border-bottom: 1px solid $border-color;
  display: flex;
  padding: 18px 14px;
  position: relative;
  .comm-opera {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 18px;
    button:nth-child(1) {
      padding: 7px;
      background-color: $main-color;
      border-color: $main-color;
      &:hover {
        background-color: lighten($main-color, 6%);
        border-color: lighten($main-color, 6%);
      }
      i {
        color: #fff;
      }
    }
    button:nth-child(2) {
      padding: 8px 12px;
      background-color: #dde0e9;
      border-color: #dde0e9;
      color: $text-main-color;
      &:hover {
        background-color: darken(#dde0e9, 6%);
        border-color: darken(#dde0e9, 6%);
      }
    }
    // display: none;
  }
  .left {
    display: flex;
    .comm-check {
      margin-top: 34px;
    }
    .com-img {
      margin-left: 12px;
      img {
        width: 100px;
        height: 100px;
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
        text-align: center;
      }
    }
  }
  .right {
    margin-left: 15px;
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
          content: '';
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
        font-size: $xlg-size;
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
      }
      .price-op {
        display: flex;
        margin-left: 4px;
        input[type='text'] {
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
          input[type='text'] {
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
    .black-remarks {
     font-size: 12px;
    }
  }
}
</style>
