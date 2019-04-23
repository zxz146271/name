<template>
  <div class="add-sms-push">
    <div class="step">
      <div class="step-item step1">
        <img src="../../../assets/image/step/step_on1.png" v-show="onStep1" alt="">
        <p :class="{'on-step': onStep1}">第一步：选择短信推送人</p>
      </div>
      <div class="step-item step2">
        <img src="../../../assets/image/step/step_on2.png" v-show="onStep2" alt="">
        <p :class="{'on-step': onStep2}">第二步：选择短信模板</p>
      </div>
      <div class="step-item step3">
        <img src="../../../assets/image/step/step_on3.png" v-show="onStep3" alt="">
        <p :class="{'on-step': onStep3}">第三步：发送短信</p>
      </div>
      <div class="step-item step4">
        <img src="../../../assets/image/step/step_on4.png" v-show="onStep4" alt="">
        <p :class="{'on-step': onStep4}">第四步：完成</p>
      </div>
    </div>
    <div class="step-main">
      <div class="step-main1" v-show="stepMain1">
        <el-form ref="form1" :model="selectUser" label-width="80px" class="form" :rules="rules1">
          <el-form-item label="蘑盒" prop="region">
            <el-select v-model="selectUser.region" placeholder="请选择蘑盒" multiple>
              <el-option
                v-for="item in boxList"
                :key="item.boxName"
                :label="item.boxName"
                :value="item.entityId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" prop="date">
              <el-date-picker type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
               v-model="selectUser.date" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="手机型号" prop="region1">
            <el-select v-model="selectUser.region1" placeholder="请选择手机型号" multiple>
              <el-option
                v-for="item in phoneType"
                :key="item.type"
                :label="item.type"
                :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="add-btn">
          <el-button type="primary" class="next" @click="toStep2">下一步</el-button>
        </div>
      </div>
      <div class="step-main2" v-show="stepMain2">
        <div class="left">
          <div class="title">预览短信内容</div>
          <p class="content">{{selectTmpItem? selectTmpItem.start : ''}}{{selectTmpItem? selectTmpItem.templateContent : ''}}{{selectTmpItem? selectTmpItem.end : ''}}</p>
          <p class="prompt">输入不超过70汉字，按照1条短信计费，若超出70字，按照2条短信计费</p>
        </div>
        <div class="right">
          <div class="top">
            <div class="title">选择短信模板</div>
            <!-- <el-button icon="el-icon-plus" @click="goSMStmp">新增短信模板</el-button> -->
          </div>
          <el-radio-group v-model="selectTmpItem" @change="selectItem" v-if="tableData.length>0">
            <el-radio :label="item" v-for="(item, index) in tableData" :key="index" >
              <span class="name">{{item.templateName}} </span>
              <span class="content-SMS">{{item.start}}{{item.templateContent}}{{item.end}}</span>
            </el-radio>
          </el-radio-group>
          <div v-else style="height:170px;line-height:170px;text-align:center;">暂无模版</div>
          <div class="pagin">
                <!-- <span class="total">共{{count}}条数据</span> -->
              <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[2, 5, 10, 20]"
              :current-page.sync="currentPage"
              layout="sizes, prev, pager, next"
              :total="count">
            </el-pagination>
          </div>
        </div>
        <div class="to-step3">
          <div class="add-btn">
            <el-button type="primary" class="next" @click="toStep3">下一步</el-button>
            <div class="return" @click="returnStep1">返回上一步</div>
          </div>
        </div>
      </div>
      <div class="step-main3" v-show="stepMain3">
        <div class="top-info">
          <div class="left">
            <div class="num">{{customerNum}}</div>
            <p>选中蘑客量/个</p>
          </div>
          <div class="center"></div>
          <div class="right">
            <div class="num">{{smsSurplusNum}}</div>
            <p>短信余量/条</p>
          </div>
        </div>
        <el-form  :model="sendSMS" label-width="80px" ref="form3" :rules="rules3">
          <el-form-item label="发送数量" prop="amount" class="sms-amount">
            <el-input placeholder="请输入数量" v-model="sendSMS.amount">
              <template slot="append">条</template>
            </el-input>
          </el-form-item>
          <el-form-item label="发送时间" prop="sendType">
            <el-radio-group v-model="sendSMS.sendType" @change="seletSendType">
              <el-radio label="now">立即发送</el-radio>
              <el-radio label="timing">定时发送</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发送时间" v-if="sendSMS.sendType == 'timing'" prop="date">
              <el-date-picker prefix-icon="el-icon-date" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="sendSMS.date" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form>
        <div class="to-step4">
          <div class="add-btn">
            <el-button type="primary" class="next" @click="toStep4">下一步</el-button>
            <div class="return" @click="returnStep2">返回上一步</div>
          </div>
        </div>
      </div>
      <div class="step-main4" v-show="stepMain4">
        <div class="complete">
          <img src="../../../assets/image/sendsucc.png" alt="">
          <p>短信推送已完成！</p>
        </div>
      </div>
      <el-dialog
        :visible.sync="marginVisible"
        width="30%">
        <div class="dialog-content">
          <img src="../../../assets/image/tishi.png" alt="">
          <p>您购买的短信余量不足哦，请前去购买~</p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectTmpItem: {},
      marginVisible: false,
      sendSMS: {
        amount: '',
        sendType: 'now',
        date: ''
      },
      radio: true,
      onStep1: true,
      onStep2: false,
      onStep3: false,
      onStep4: false,
      stepMain1: true,
      stepMain2: false,
      stepMain3: false,
      stepMain4: false,
      selectUser: {
        region: '',
        date: '',
        region1: []
      },
      currentPage: 1,
      pagesize: 10,
      count: 0,
      boxList: [],
      smsSurplusNum: 0,
      customerNum: 0,
      phoneType: [
        {
          type: '小米'
        },
        {
          type: '苹果'
        },
        {
          type: '华为'
        },
        {
          type: '其他'
        }
      ],
      tableData: [],
      currentRow: null,
      rules1: {
        region: [
          { required: true, message: '请选择蘑盒', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        region1: [
          { required: true, message: '请选择手机型号', trigger: 'blur' }
        ]
      },
      rules3: {
        amount: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '必须为数字' }
        ],
        sendType: [
          { required: true, message: '请选择发送方式', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择发送时间', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getBoxList()
    this.getSMSTplList()
    this.getOverSMS()
    // this.selectTmpItem = this.tableData[0]
    this.selectUser.date = [this.format(new Date().setTime(new Date().getTime() - 86400000 * 180 + 3600000 * 8)), this.format(new Date().setTime(new Date()))]
  },
  methods: {
    // 日期格式化
    format (time) {
      var date = new Date(time)
      var year = date.getFullYear()
      var month = date.getMonth() + 1 // 月份是从0开始的
      var day = date.getDate()
      var newTime = year + '-' +
                  month + '-' +
                  day
      return newTime
    },
    // 获取墨客
    getCustomerNum (param) {
      let params = {
        entityIds: param.region.join(','),
        brandStrs: param.region1.join(','),
        begin: param.date[0],
        end: param.date[1]
      }
      this.$api.getCustomerNum(params).then(res => {
        if (res.code === 0) {
          this.stepMain1 = false
          this.stepMain2 = true
          this.onStep2 = true
          this.customerNum = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 剩余短信条数
    getOverSMS () {
      this.$api.getOverSMS().then(res => {
        this.smsSurplusNum = res.data.smsSurplusNum
      })
    },
    // 获取所有魔盒
    getBoxList () {
      this.$api.getBoxList().then(res => {
        if (res.code === 0) {
          this.boxList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 通过当前登录用户信息获取门店所关联的短信模版分页信息
    getSMSTplList () {
      let params = {
        page: this.currentPage,
        limit: this.pagesize
      }
      this.$api.getSMSTplList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
          this.selectTmpItem = this.tableData[0]
          this.count = res.count
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 提交发送短信
    sendMessage () {
      let params = {
        rangeStartTime: this.selectUser.date[0],
        rangeEndTime: this.selectUser.date[1],
        brands: this.selectUser.region1.join(','),
        contentId: this.selectTmpItem.contentId,
        sendType: this.sendSMS.sendType,
        sendTime: this.sendSMS.date,
        entitys: this.selectUser.region.join(','),
        sendNum: this.sendSMS.amount
      }
      // console.log(JSON.stringify(params))
      this.$api.sendMessage(params).then(res => {
        if (res.code === 0) {
          this.stepMain3 = false
          this.stepMain4 = true
          this.onStep4 = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    goSMStmp () {
      this.$router.push({path: '/marketing/magicBox/addSMSTemplate'})
    },
    selectItem (val) {
      this.selectTmpItem = val
    },
    seletSendType (val) {
      this.sendSMS.sendType = val
      if (val === 'now') {
        this.sendSMS.date = ''
      }
      console.log(this.sendSMS.date)
    },
    toStep2 () {
      console.log(this.selectUser.date)
      this.$refs['form1'].validate((valid) => {
        if (valid) {
          this.getCustomerNum(this.selectUser)
        }
      })
    },
    toStep3 () {
      if (this.tableData.length > 0) {
        this.stepMain2 = false
        this.stepMain3 = true
        this.onStep3 = true
      } else {
        this.$message.warning('没有短信模版，请添加')
      }
    },
    toStep4 () {
      this.$refs['form3'].validate((valid) => {
        if (valid) {
          if (this.sendSMS.amount > 0) {
            if (this.sendSMS.amount > this.smsSurplusNum) {
              this.marginVisible = true
            } else if (this.sendSMS.amount <= this.smsSurplusNum && this.sendSMS.amount > this.customerNum) {
              this.$message.warning('短信数量超过蘑客数量')
            } else {
              if (this.sendSMS.sendType === 'timing') {
                let now = new Date().getTime()
                if (this.formatTime(this.sendSMS.date) > now) {
                  this.sendMessage()
                } else {
                  this.$message.warning('发送时间必须大于当前时间')
                }
              } else {
                this.sendMessage()
              }
            }
          } else {
            this.$message.warning('短信数量必须大于0')
          }
        }
      })
    },
    // 日期转时间戳
    formatTime (time) {
      let T = new Date(time)
      return T.getTime()
    },
    returnStep1 () {
      this.onStep2 = false
      this.stepMain1 = true
      this.stepMain2 = false
    },
    returnStep2 () {
      this.onStep3 = false
      this.stepMain2 = true
      this.stepMain3 = false
    },
    returnStep3 () {
      this.onStep4 = false
      this.stepMain3 = true
      this.stepMain4 = false
    },
    selectTmp (val) {
      this.currentRow = val
    },
    handleSizeChange (pagesize) {
      this.pagesize = pagesize
      this.getSMSTplList()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getSMSTplList()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/elcheckbox';
.add-sms-push{
  .step{
    display: flex;
    .step-item{
      width: 243px;
      height: 40px;
      position: relative;
      p{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 243px;
        text-align: center;
        transform: translate(-50%, -50%);
        font-size:16px;
        color:rgba(51,51,51,1);
      }
      .on-step{
        color: #fff;
      }
    }
    .step1{
      background: url('../../../assets/image/step/step1.png') no-repeat;
    }
    .step2{
      background: url('../../../assets/image/step/step2.png') no-repeat;
    }
    .step3{
      background: url('../../../assets/image/step/step3.png') no-repeat;
    }
    .step4{
      background: url('../../../assets/image/step/step4.png') no-repeat;
    }
  }
  .step-main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 31px;
    .add-btn{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-top: 85px;
      font-size: 16px;
      .next{
        width: 316px;
        height: 44px;
        font-size: 16px;
      }
      .return{
        color:rgba(153,153,153,1);
        margin-top: 20px;
        cursor: pointer;
      }
    }
    .step-main1{
      width: 480px;
      margin-top: 40px;
    }
    .step-main2{
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 100%;
      .left{
        width: 313px;
      }
      .title{
        font-size:18px;
        color:rgba(51,51,51,1);
      }
      .content{
        min-height: 200px;
        padding: 14px;
        background:rgba(247,247,247,1);
        border:1px solid rgba(220,223,230,1);
        border-radius:5px;
        font-size:14px;
        line-height:20px;
        color:rgba(51,51,51,1);
        margin: 20px 0 10px;
      }
      .prompt{
        font-size:12px;
        line-height:18px;
        color:rgba(153,153,153,1);
      }
      .right{
        flex: 1;
        margin-left: 20px;
        .top{
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .pagin{
          display: flex;
          justify-content: flex-end;
        }
        .el-radio+.el-radio{
          margin: 0;
        }
        .el-radio{
          width: 100%;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid rgba(228,231,236,1);
          font-size:14px;
          color:rgba(51,51,51,1);
          .el-radio__input{
            line-height: 40px;
            display: inline-block;
            height: 40px;
            vertical-align: text-bottom;
          }
          .name{
            display: inline-block;
            margin-left: 5px;
            margin-right: 20px;
            width: 130px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          .content-SMS{
            display: inline-block;
            width: 420px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
        }
      }
      .to-step3{
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
    .step-main3{
      width: 400px;
      padding-top: 30px;
      .top-info{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-bottom: 20px;
        .left{
          width: 49%;
        }
        .right{
          width: 49%;
          // border-left:1px solid rgba(180,180,180,1);
        }
        .center{
          width: 1px;
          height: 57px;
          background: rgba(180,180,180,1);
        }
        .num{
          font-size:28px;
          color:rgba(38,38,38,1);
          margin-bottom: 10px;
        }
        p{
          font-size:16px;
          color:rgba(51,51,51,1);
        }
      }
    }
    .step-main4{
      padding-top: 50px;
      .complete{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          margin-bottom: 20px;
        }
        p{
          font-size:14px;
          color:rgba(51,51,51,1);
        }
      }
    }
  }
}
.dialog-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    margin-bottom: 20px;
  }
  p{
    font-size:16px;
    color:rgba(0,0,0,1);
  }
}
</style>
