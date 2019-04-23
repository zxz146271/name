<template>
  <div class="container">
    <div class="content">
        <div class="item">
            <div class="grayPoint oneRow"></div>
            <div class="dealerNum oneRow">经销商手机号</div>
            <div class="inputAssocite">
                <el-input class="inputText" v-model="dealerInfo.distributorMobile" placeholder="请输入内容" :disabled="editDealer" v-on:input="dealerBlur(dealerInfo.distributorMobile)"></el-input>
                <div class="tips">
                    <div :class="isTips? 'tipsTxt showTips' : 'tipsTxt'" >{{ tipsStr }}</div>
                </div>
                <div class="associteStore">
                    <div class="title">请选择关联该经销商下的门店:</div>
                    <div class="storeList">
                        <!-- <el-checkbox-group v-model="storeInfo" @change="handleCheckedStoresChange"> -->
                            <el-row class="storeItems">
                                <el-col class="overText" v-for="(item,index) in dealerInfo.storeData" :key="index" >
                                    <el-checkbox  @change="storesChange(dealerInfo.storeData, index)" v-model="item.selected" :label="item.storeId">{{ item.storeName }}</el-checkbox>
                                </el-col>
                            </el-row>
                        <!-- </el-checkbox-group> -->
                    </div>
                </div>
                <div class="tips">
                    <div :class="storeTips? 'tipsTxt showTips' : 'tipsTxt'" >请至少选择一个门店</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="grayPoint twoRow"></div>
            <div class="dealerNum twoRow">经销商名称</div>
            <div class="inputAssocite">
                <el-input class="inputText" disabled maxlength=11 v-model="dealerInfo.distributorName" placeholder="请输入内容" v-on:input="phoneBlur(dealerInfo.distributorName)"></el-input>
                <div class="tips">
                    <div :class="phoneTips? 'tipsTxt showTips' : 'tipsTxt'" >请输入正确的经销商名称</div>
                </div>
            </div>
        </div>
        <div class="itemNote">
            <div class="grayPoint thRow"></div>
            <div class="dealerNum thRow">备注</div>
            <div class="inputAssocite">
                <el-input type="textarea" :rows="2" class="inputText" v-model="dealerInfo.remark" placeholder="备注" v-on:input="noteBlur(dealerInfo.remark)"></el-input>
                <div class="tips">
                    <div :class="noteTips? 'tipsTxt showTips' : 'tipsTxt'" >请输入备注</div>
                </div>
            </div>
        </div>
        <div class="dialogFooter">
            <el-button class="cancel" @click="cancel">取 消</el-button>
            <el-button class="sure" type="primary" @click="associte">关 联</el-button>
        </div>
    </div>
  </div>
</template>
<script>
import { getStore } from '../../tool/Utils.js'
export default {
  data () {
    return {
    //   storeData: ['闵行万达店','浦东新区红星店','闵行大润发店','青浦区红星店','宝山区红星店'],
        storeData: [],
        storeInfo: [],
        isTips: '',
        storeTips: '',
        phoneTips: '',
        noteTips: '',
        distributorId: '',
        storeIds: [],
        data: {},
        dealerInfo: {
            distributorMobile: '',
            storeData: [],
            distributorName: '',
            remark: ''
        },
        num: 0,
        tipsStr: '',
        params: {
            distributorId: '',
            remark: '',
            storeIds: ''
        }
    }
  },
  props: {
      showTips: Boolean,
      currDistributorId: String,
      dealerData: Object,
      editDealer: Boolean,
      bindDealer: Boolean
  },
  watch: {
      showTips(nv) {
          this.isTips = nv;
          this.storeTips = nv;
          this.phoneTips = nv;
          this.noteTips = nv;
      },
      dealerData(nv) {
          this.dealerInfo = {
                distributorMobile: nv.distributorMobile,
                storeData: nv.list,
                distributorName: nv.distributorName,
                remark: nv.remark
          }
      },
  },
  mounted() {
      this.dealerInfo.storeData
  },
  methods: {
    dealerBlur(val) {
        let str = val.replace(/\s+/g,"");
        if (str.length == 0) {
            this.isTips = true;
            this.tipsStr = "请输入经销商手机号";
        } else {
            this.isTips = false;
            if (str.length == 11) {
                let params = {
                    mobile: str
                }
                this.getDataByMobile(params);
            }
        }
    },
    // 通过手机号查询下属门店列表
    getDataByMobile(params) {
        this.$api.getDataByMobile(params).then(res => {
            if (res.code === 0 && res.data) {
                this.distributorId = res.data.distributorId;
                this.dealerInfo.storeData = res.data.list;
                this.dealerInfo.distributorName = res.data.distributorName;
                this.dealerInfo.remark = res.data.remark;
            } else {
                // 失败提示
                console.log("没有数据！");
            }
        })
    },
    // 通过经销商编号查询下属门店
    getDataByDistributorId(params) {
        let self = this;
        this.$api.getDataByDistributorId(params).then(res => {
            if (res.code === 0 && res.data) {
                console.log("触发了么",res)
                this.dealerInfo.storeData = res.data.list;
                this.dealerInfo.distributorMobile = res.data.distributorMobile;
                this.dealerInfo.remark = res.data.remark;
            } else {
                // 失败提示
                console.log("没有数据！");
            }
        })
    },
    handleCheckedStoresChange(value) {
        this.storeIds = value;
        if ( value.length == 0 ) {
            this.storeTips = true;
        } else {
            this.storeTips = false;
        }
    },
    storesChange(val,index) {
        let arr = [];
        this.storeTips = true;
        val.forEach(element => {
            if (element.selected) {
                this.storeTips = false;
                arr.push(element.storeId);
                return;
            }
        });
        this.storeIds = arr;
    },
    phoneBlur(val) {
        if ( val.length == 0 ) {
            this.phoneTips = true;
        } else {
            this.phoneTips = false;
        }
    },
    noteBlur(val) {
        if ( val.length == 0 ) {
            this.noteTips = true;
        } else {
            this.noteTips = false;
        }
    },
    // dialog 关联
    associte() {
        if (this.bindDealer) {
            let params = {
                distributorId: this.distributorId,
                remark: this.dealerInfo.remark,
                storeIds: this.storeIds.join(",")
            }
            this.bindStoreList(params);
        } 
        if (this.editDealer) {
            let params = {
                distributorId: this.dealerData.distributorId,
                remark: this.dealerInfo.remark,
                storeIds: this.storeIds.join(",")
            }
            this.bindStoreList(params);
        }
        this.isTips = false;
        this.storeTips = false;
        this.phoneTips = false;
        this.noteTips = false;
        this.dealerInfo.distributorMobile = '';
        this.dealerInfo.storeData = '';
        this.dealerInfo.distributorName = '';
        this.dealerInfo.remark = '';
    },
    bindStoreList(params) {
        this.$api.bindByDistributorId(params).then(res => {
            if (res.code === 0) {
                this.$emit("associte");
            } else {
                // 失败提示
                console.log("出错了");
            }
        })
    },
    // dialog 取消
    cancel() {
        this.isTips = false;
        this.storeTips = false;
        this.phoneTips = false;
        this.noteTips = false;
        this.dealerInfo = {
            distributorMobile: '',
            storeData: [],
            distributorName: '',
            remark: ''
        },
        this.$emit("cancel", 'add');
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
    /* align-items: center; */
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
    top: 15px;
}
.grayPoint.twoRow {
    position: relative;
    top: 15px;
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
    top: 8px;
}
.dealerNum.twoRow {
    position: relative;
    top: 8px;
}
.dealerNum.thRow {
    position: relative;
    top: 2px;
}
.inputAssocite {
    flex: 1;
}
.inputText {
    z-index: 11;
}
.tips {
    color: #f56c6c;
    font-size: 12px;
    /* padding-top: 8px; */
    height: 20px;
    line-height: 20px;
    position: relative;
}
.tipsTxt {
    position: absolute;
    top: -30px;
    left: 0;
    transition: 0.5s;
    z-index: -1;
}
.showTips {
    top: 0;
    transition: 0.5s;
    z-index: 0;
}
.associteStore {
    width: 100%;
    /* height:119px; */
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
.storeList {
    z-index: 11;
}
.storeItems {
    display: flex;
    flex-wrap: wrap;
}
.overText {
    flex: 1;
    margin: 0 15px;
    /* overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap */
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
