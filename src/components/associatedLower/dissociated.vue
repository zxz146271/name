<template>
  <div class="container">
    <div class="content">
        <div class="item">
            <div class="grayPoint"></div>
            <div class="dealerNum">经销商名称</div>
            <div class="inputAssocite">
                {{ item.distributorName }}
            </div>
        </div>
        <div class="item">
            <div class="grayPoint"></div>
            <div class="dealerNum">经销商手机号</div>
            <div class="inputAssocite">
                {{ item.distributorMobile }}
            </div>
        </div>
        <div class="item">
            <div class="grayPoint"></div>
            <div class="dealerNum">门店数量</div>
            <div class="inputAssocite">
                {{ item.storeNum }}
            </div>
        </div>
        <div class="item">
            <div class="grayPoint"></div>
            <div class="dealerNum">分发类型</div>
            <div class="inputAssocite">
                {{ item.issue }}
            </div>
        </div>
        <div class="item">
            <div class="grayPoint"></div>
            <div class="dealerNum">备注</div>
            <div class="inputAssocite">
                {{ item.remark }}
            </div>
        </div>
        <div class="dialogFooter">
            <el-button class="cancel" @click="cancel">取 消</el-button>
            <el-button class="sure" type="primary" @click="dissociated">确 定</el-button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      associteData: {
            storesNum: 'MD20190130000017',
            bossPhone: '15618200360',
            storesCount: 10,
            distributionType: '内容',
            note: '目前有多个区域的门店（青浦区、浦东新区、闵行区、普陀区）'
        },
      storeInfo: {
          storeCode: ''
      },
      dealerInput: '',
      bossInput: '',
      input: '',
    }
  },
  props: {
      item: Object
  },
  methods: {
        handleCheckedStoresChange(value) {
            // let checkedCount = value.length;
            // this.checkAll = checkedCount === this.cities.length;
            // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        // dialog 关联-解除
        dissociated() {
            let params = {
                distributorId: this.item.distributorId
            }
            // 解除绑定
            this.$api.dissociatedDealerInfo(params).then(res => {
                if (res.code === 0) {
                    console.log(res)
                    this.$emit("dissociated");
                } else {
                    // 失败提示
                    console.log("出错了");
                }

            })
        },
        // dialog 取消
        cancel() {
            this.$emit("cancel", 'remove');
        }
  }
}
</script>
<style scoped>

.container {
    border-top: 1px dotted #C0C4CC;
    margin: 0 15px;
    /* height: 500px; */
}
.content {
    width: 100%;
    padding: 0 9px;
    box-sizing: border-box;
    /* margin-top: 20px; */
}
.item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
}   
.itemNote {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
}
.grayPoint {
    width:7px;
    height:7px;
    background:#AAAAAA;
    border-radius:50%;
    margin-right: 8px;
}
.grayPoint.oneRow {
    position: relative;
    top: -64px;
}
.grayPoint.thRow {
    position: relative;
    top: 9px;
}
.dealerNum {
    width: 90px;
    height:20px;
    text-align: left;
    font-size:14px;
    font-weight:400;
    line-height:20px;
    color:#909399;
}
.dealerNum.oneRow {
    position: relative;
    top: -65px;
}
.dealerNum.thRow {
    position: relative;
    top: 2px;
}
.inputAssocite {
    flex: 1;
}
.associteStore {
    width: 100%;
    height:119px;
    background:#F8F8F8;
    border-radius:4px;
    margin-top: 8px;
    padding: 7px 10px;
    box-sizing: border-box;
}
.title {
    height:20px;
    font-size:14px;
    font-weight:400;
    line-height:14px;
    color:#909399;
    text-align: left;
}
.dialogFooter {
    margin-top: 54px;
    display: flex;
    justify-content: flex-start;
    text-align: center;
}
.cancel {
    margin-left: 40%;
    transform: translateX(-50%);
}
</style>
