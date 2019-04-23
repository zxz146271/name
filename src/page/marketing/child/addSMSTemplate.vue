<template>
  <div class="add-tmp">
    <div class="title">新增短信模板</div>
    <el-form ref="form" :model="form" label-width="80px" class="form" :rules="rules">
      <el-form-item label="模版名称" prop="templateName">
        <el-input v-model="form.templateName"></el-input>
      </el-form-item>
      <el-form-item label="头部内容" prop="start">
        <el-input v-model="form.start"></el-input>
      </el-form-item>
      <el-form-item label="尾部内容" prop="end">
        <el-input v-model="form.end" disabled></el-input>
      </el-form-item>
      <el-form-item label="模版内容" prop="templateContent">
        <el-input type="textarea" v-model="form.templateContent" rows="8" maxlength="70"></el-input>
        <div class="enter-src" @click="enterSrc">插入链接</div>
      </el-form-item>
      <el-form-item>
        <div class="add-btn">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="enterDialog"
      v-if="enterDialog"
      title="插入链接"
      :before-close="closeDialog" class="enter-dialog" width="720px">
        <div class="enter-content">
          <el-menu
           class="left-menu"
           @select="selectMenu"
            default-active="1">
            <el-menu-item index="1">
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">活动</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">案例</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title">商品</span>
            </el-menu-item>
          </el-menu>
          <div class="toggle-menu" v-if="listSRC.length > 0 || listSRC1">
            <div class="menu-lists">
              <div class="menu-list" v-if="onMenu == 1">
                <el-radio-group v-model="radio1" @change="change1">
                  <el-radio :label="item" v-for="item in listSRC" :key="item.index" >
                    <div class="radio-content">
                      <img :src="item.photoUrl" alt="" style="width:449px;height:120px;">
                      <p>{{item.storeName}}</p>
                    </div>
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="menu-list" v-if="onMenu == 2">
                <el-radio-group v-model="radio1" @change="change1">
                  <el-radio :label="item" v-for="item in listSRC" :key="item.index" >
                    <div class="radio-content">
                      <img :src="item.activityImgUrl" alt="" style="width:449px;height:120px;">
                      <p>{{item.couponName}}</p>
                    </div>
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="menu-list" v-if="onMenu == 3">
                <el-radio-group v-model="radio1" @change="change1">
                  <el-radio :label="item" v-for="item in listSRC" :key="item.index" >
                    <div class="radio-content">
                      <img :src="item.photoUrl" alt="" style="width:449px;height:120px;">
                      <p>{{item.caseTitle}}</p>
                    </div>
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="menu-list4" v-if="onMenu == 4">
                <el-radio-group v-model="radio1" @change="change1">
                  <el-radio :label="item" v-for="item in listSRC" :key="item.index" >
                    <div class="radio-content4">
                      <img :src="item.firstPictureUrl" >
                      <p>{{item.goodsName}}</p>
                    </div>
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="dialog-btns">
              <el-button @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="submitLink()">确认</el-button>
            </div>
          </div>
          <div v-else class="no-info">
            暂无信息
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import {getStore} from '../../../tool/Utils'
export default {
  data () {
    return {
      listSRC1: {},
      listSRC: [],
      radio1: '',
      form: {
        templateName: '',
        templateContent: '',
        start: '',
        end: '回T退订'
      },
      resetForm: {
        templateName: '',
        templateContent: '',
        start: '',
        end: '回T退订'
      },
      storevo: {
        state: '0',
        storeName: '',
        mobile: '',
        sotreCode: '',
        sotreAddress: ''
      },
      enterDialog: false,
      radio: '1',
      onMenu: '1',
      rules: {
        templateName: [
          { required: true, message: '请输入模版名称', trigger: 'blur' }
        ],
        templateContent: [
          { required: true, message: '请输入模版内容', trigger: 'blur' }
          // { min: 1, max: 70, message: '长度在 1 到 70 个字符', trigger: 'blur' }
        ],
        start: [
          { required: true, message: '请输入头部内容', trigger: 'blur' }
        ]
      },
      shareType: '',
      shareId: '',
      urlCode: '',
      shareCode: '',
      couponType: '',
      storeCode: getStore('storeCodeWeb'),
      staffCode: getStore('staffCode')
    }
  },
  mounted () {
    this.getSRCList()
  },
  methods: {
    getSRCList () {
      let params = {
        // page: 1,
        // limit: 10,
        // storevo: this.storevo
        storeId: getStore('storeIdWeb')
      }
      this.$api.stStoregetDetailByIdForBox(params).then(res => {
        this.listSRC = [res.data]
      })
    },
    change1 (val) {
      console.log(val)
      if (this.onMenu === '1') {
        this.shareId = val.storeId
        this.urlCode = val.storeCode
      } else if (this.onMenu === '2') {
        this.shareId = val.couponId
        this.urlCode = val.couponCode
        this.couponType = val.couponType
      } else if (this.onMenu === '3') {
        this.shareId = val.caseId
        this.urlCode = val.caseCode
      } else if (this.onMenu === '4') {
        this.shareId = val.goodsId
        this.urlCode = val.goodsCode
      }
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let allLength = this.form.templateContent.length + this.form.start.length + this.form.end.length
          if (allLength > 70) {
            this.$message.warning('短信字符数不能超过70个字')
          } else {
            this.$api.addSMSTem(this.form).then(res => {
              if (res.code === 0) {
                this.$router.push({path: '/marketing/magicBox/SMSTemplate'})
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        }
      })
    },
    cancel () {
      this.form.templateName = ''
      this.form.templateContent = ''
      this.form.start = ''
    },
    enterSrc () {
      this.enterDialog = true
      this.getSRCList()
    },
    closeDialog () {
      this.onMenu = 1
      this.enterDialog = false
      this.radio1 = ''
    },
    selectMenu (index) {
      this.onMenu = index
      this.radio1 = ''
      console.log(this.shareId)
      if (this.onMenu === '1') {
        let params = {
          // page:1,
          // limit:10,
          // storevo: this.storevo
          storeId: getStore('storeIdWeb')
        }
        this.$api.stStoregetDetailByIdForBox(params).then(res => {
          this.listSRC = [res.data]
        })
      } else if (this.onMenu === '2') {
        let params = {
          page: 1,
          limit: 30
        }
        this.$api.getAllActivityForBox(params).then(res => {
          this.listSRC = res.data
          console.log(this.listSRC)
        })
      } else if (this.onMenu === '3') {
        let params = {
          page: 1,
          limit: 30,
          searchParam: ''
        }
        this.$api.getCaseBaseList(params).then(res => {
          this.listSRC = res.data
        })
      } else if (this.onMenu === '4') {
        let params = {
          page: 1,
          limit: 30,
          state: 1
        }
        this.$api.findGoogsImg(params).then(res => {
          this.listSRC = res.data
        })
      }
    },
    getUrl (jumpUrl) {
      let params = {
        jumpUrl: jumpUrl
      }
      this.$api.addSMSLink(params).then(res => {
        var ress = JSON.parse(res.data)
        console.log(ress.url)
        this.form.templateContent = this.form.templateContent + '(' + ress.url + ')'
        this.closeDialog()
      })
    },
    submitLink () {
      let jumpUrl = ''
      let wechatUrl = getStore('wechatUrl')
      if (this.onMenu === '1') {
        let shareType = 'store'
        let params = {
          associatedId: this.shareId,
          type: shareType
        }
        this.$api.shareToPeople(params).then(res => {
          if (res.code === 0) {
            this.shareCode = res.data
          }
          jumpUrl = wechatUrl+'/home?shoreCode=' + this.urlCode + '&isFromApp=1&' + 'stShareCode=' + this.shareCode
          this.getUrl(jumpUrl)
        })
      } else if (this.onMenu === '2') {
        let shareType = ''
        if (this.couponType === 0) {
          shareType = 'coupon'
        } else if (this.couponType === 0) {
          shareType = 'seckill'
        }
        let params = {
          associatedId: this.shareId,
          type: shareType
        }
        this.$api.shareToPeople(params).then(res => {
          if (res.code === 0) {
            this.shareCode = res.data
          }
          jumpUrl = wechatUrl+'/favourableActivityDetail?couponCode=' + this.urlCode + '&storeCode=' + this.storeCode + '&couponType=' + this.couponType + '&inviter=' + this.staffCode + '&isFromApp=1&stShareCode=' + this.shareCode
          this.getUrl(jumpUrl)
        })
      } else if (this.onMenu === '3') {
        let shareType = 'case'
        let params = {
          associatedId: this.shareId,
          type: shareType
        }
        this.$api.shareToPeople(params).then(res => {
          if (res.code === 0) {
            this.shareCode = res.data
          }
          jumpUrl = wechatUrl+'/caseDetail?caseCode=' + this.urlCode + '&storeCode=' + this.storeCode + '&staffCode=' + this.staffCode + '&isFromApp=1&stShareCode=' + this.shareCode
          this.getUrl(jumpUrl)
        })
      } else if (this.onMenu === '4') {
        let shareType = 'goods'
        let params = {
          associatedId: this.shareId,
          type: shareType
        }
        this.$api.shareToPeople(params).then(res => {
          if (res.code === 0) {
            this.shareCode = res.data
          }
          jumpUrl = wechatUrl+'/shopDetail?goodsCode=' + this.urlCode + '&storeCode=' + this.storeCode + '&inviter=' + this.staffCode + '&isFromApp=1&stShareCode=' + this.shareCode
          this.getUrl(jumpUrl)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.add-tmp{
  .title{
    height:36px;
    background:rgba(244,244,244,1);
    border-radius:5px;
    line-height: 36px;
    font-size:14px;
    color:rgba(51,51,51,1);
    padding-left: 20px;
  }
  .form{
    width: 620px;
    padding: 40px 0 0 100px;
    .add-btn{
      display: flex;
      justify-content: flex-end;
    }
    .enter-src{
      font-size:14px;
      line-height:17px;
      color:rgba(253,67,67,1);
      padding: 6px 0;
      cursor: pointer;
    }
  }
}
.enter-content{
  display: flex;
  justify-content: flex-start;
  .left-menu{
    flex: 0 0 140px;
    border: none;
    background:rgba(244,244,244,1);
    .el-menu-item{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .el-menu-item.is-active{
      background:rgba(253,67,67,1);
      color: #fff;
    }
  }
  .toggle-menu{
    .menu-lists{
      height: 420px;
      overflow-x: hidden;
      margin-bottom: 15px;
    }
    width: 100%;
    max-height: 500px;
    padding-bottom: 30px;
    .menu-list{
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 400px;
      .el-radio{
        padding: 0 0 10px 30px;
        display: flex;
        align-items: center;
      }
      .el-radio+.el-radio{
        margin: 0;
      }
      .radio-content{
        position: relative;
        img{
          margin-left: 20px;
        }
        p{
          position: absolute;
          left: 50%;
          top: 50%;
          color: #fff;
          transform: translate(-50%, -50%);
          width: 449px;
          height: 100%;
          background: rgba(0,0,0,0.5);
          margin-left: 10px;
          text-align: center;
          line-height: 122px;
        }
      }
      .radio-content4{
        display: flex;
        flex-wrap: wrap;
        width: 30%;
        position: relative;
        img{
          width: 120px;
          height: 120px;
          margin-left: 20px;
        }
        p{
          position: absolute;
          left: 50%;
          top: 50%;
          color: #fff;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          margin-left: 20px;
          text-align: center;
          line-height: 122px;
        }
      }
    }
    .menu-list4{
      display: flex;
      flex-wrap: wrap;
      // width: 30%;
      .el-radio-group{
        display: flex;
        flex-wrap: wrap;
        .el-radio__input{
          position: absolute;
          top: 60px;
        }
        .radio-content4{
          position: relative;
          img{
            width: 120px;
            height: 120px;
            margin-left: 20px;
          }
          p{
            position: absolute;
            left: 50%;
            top: 50%;
            color: #fff;
            transform: translate(-50%, -50%);
            width: 120px;
            height: 100%;
            background: rgba(0,0,0,0.5);
            margin-left: 10px;
            text-align: center;
            line-height: 122px;
          }
        }
      }
    }
    .dialog-btns{
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
    }
  }
  .no-info{
    width: 100%;
    text-align: center;
    margin-top: 100px;
  }
  .dialog-btns{
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
  }
}
</style>
