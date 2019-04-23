<template>
  <div class="">
    <div class="title">
      <div class="item">
        <div class="label">状态</div>
        <el-select v-model="type" placeholder="请选择" @change="changeLableType(type)" >
          <el-option
            v-for="item in condition"
            :key="item.type"
            :label="item.title"
            :value="item.type">
          </el-option>
        </el-select>
      </div>
      <!-- <div class="item">
        <div class="label">门店</div>
        <el-select v-model="store" placeholder="请选择" @change="changeStore(store)" >
          <el-option
            v-for="item in storeList"
            :key="item.type"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </div> -->
      <search @searchValue="searchValue" :load="loading" class="search"></search>
      <div class="busi-btns">
          <el-button class="btn newcom-btn" @click="addTml">新增短信模版</el-button>
      </div>
    </div>
    <div class="label-role">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="templateName"
        label="模版名称"
        align="left"
        show-overflow-tooltip
        width="150">
      </el-table-column>
      <el-table-column
        prop="templateContentAll"
        label="短信内容"
        align="left"
        show-overflow-tooltip
        width="150">
      </el-table-column>
      <el-table-column
            prop="storeName"
            label="门店"
            align="center"
            width="149">
      </el-table-column>
      <el-table-column
          prop="state"
          label="状态"
          align="center">
        </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" class="modify" icon="el-icon-edit" circle v-if="scope.row.state != '审核中'" @click="modifyTpl(scope.row)"></el-button>
          <el-button
              size="mini" v-if="scope.row.state != '审核中'"
              @click="deleteTpl(scope.row)"
              class="edit">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <div class="pagin">
          <span class="total">共{{count}}条数据</span>
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[2, 5, 10, 20]"
          :current-page.sync="currentPage"
          layout="sizes, prev, pager, next"
          :total="count">
        </el-pagination>
     </div>
     <el-dialog title="修改短信模板" :visible.sync="modifyDialog">
       <div class="modify-content">
         <el-form :model="modifyTmp" label-width="80px" :rules="rules" ref="form">
          <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="modifyTmp.templateName"></el-input>
          </el-form-item>
          <el-form-item label="头部内容" prop="start">
            <el-input v-model="modifyTmp.start"></el-input>
          </el-form-item>
          <el-form-item label="尾部内容" prop="end">
            <el-input v-model="modifyTmp.end" disabled></el-input>
          </el-form-item>
          <el-form-item label="短信内容" prop="templateContent">
            <el-input type="textarea" v-model="modifyTmp.templateContent" rows="8"></el-input>
            <div class="enter-src" @click="enterSrc">插入链接</div>
          </el-form-item>
        </el-form>
        <el-dialog
          :visible.sync="enterDialog"
          v-if="enterDialog"
          title="插入链接"
          custom-class="menu-dialog"
          :before-close="closeDialog" class="enter-dialog" append-to-body width="720px">
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
              <div class="toggle-menu" v-if="listSRC.length > 0">
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
                          <img :src="item.firstPictureUrl" alt="" >
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitModify">确认修改</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>
<script>
import {getStore} from '../../../tool/Utils'
import topTips from '../../../components/public/topTips'
import search from '../../../components/public/search'
// import { valid } from 'semver'
export default {
  data () {
    return {
      queryValue: '',
      store: '',
      storeList: [],
      modifyTmp: {},
      modifyDialog: false,
      loading: false,
      importNew: false,
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      count: 0,
      labelRulesDetail: {},
      id: '',
      type: '',
      condition: [
        {
          type: '',
          title: '全部',
          isActive: true
        },
        {
          type: '2',
          title: '审核中',
          isActive: true
        },
        {
          type: '3',
          title: '审核成功',
          isActive: true
        },
        {
          type: '4',
          title: '审核失败',
          isActive: true
        }
      ],
      rules: {
        templateName: [
          { required: true, message: '请输入模版名称', trigger: 'blur' }
        ],
        templateContent: [
          { required: true, message: '请输入短信内容', trigger: 'blur' }
        ],
        start: [
          { required: true, message: '请输入头部内容', trigger: 'blur' }
        ]
      },
      listSRC: [],
      enterDialog: false,
      radio1: '',
      onMenu: '1',
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
    this.getSMSTmp()
    this.getSMSList()
  },
  methods: {
    getSMSList () {
      let params = {
        // page:1,
        // limit:10,
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
    enterSrc () {
      this.onMenu = 1
      this.enterDialog = true
      this.getSMSList()
    },
    closeDialog () {
      this.enterDialog = false
      this.radio1 = ''
    },
    selectMenu (index) {
      this.onMenu = index
      this.radio1 = ''
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
        this.modifyTmp.templateContent = this.modifyTmp.templateContent + '(' + ress.url + ')'
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
    },
    // 查询短信模板
    getSMSTmp () {
      let params = {
        store: this.store,
        page: this.currentPage,
        limit: this.pagesize,
        state: this.type,
        templateName: this.queryValue
      }
      this.$api.getSMSTmp(params).then(res => {
        console.log(res)
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].state === '1') {
            res.data[i].state = '未审核'
          } else if (res.data[i].state === '2') {
            res.data[i].state = '审核中'
          } else if (res.data[i].state === '3') {
            res.data[i].state = '审核成功'
          } else if (res.data[i].state === '4') {
            res.data[i].state = '审核失败'
          }
        }
        this.tableData = res.data
        this.tableData.forEach(item => {
          let start = item.start || ''
          let end = item.end || ''
          item.templateContentAll = start + item.templateContent + end
        })
        this.count = res.count
        this.loading = false
      })
    },
    modifyTpl (item) {
      this.modifyDialog = true
      this.modifyTmp = item
    },
    cancel () {
      this.modifyDialog = false
      this.getSMSTmp()
    },
    reset () {
      this.modifyTmp.templateContent = ''
      this.modifyTmp.start = ''
      this.modifyTmp.end = ''
      this.modifyTmp.templateName = ''
    },
    // 修改短信模板提交
    submitModify () {
      // delete this.modifyTmp["storeName"]
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let allLength = this.modifyTmp.templateContent.length + this.modifyTmp.start.length + this.modifyTmp.end.length
          if (allLength > 70) {
            this.$message.warning('短信字符数不能超过70个字')
          } else {
            console.log(this.modifyTmp.createTime)
            let params = {
              templateId: this.modifyTmp.templateId,
              templateName: this.modifyTmp.templateName,
              start: this.modifyTmp.start,
              end: this.modifyTmp.end,
              templateContent: this.modifyTmp.templateContent,
              state: this.modifyTmp.state
            }
            this.$api.updateSMSTem(params).then(res => {
              this.cancel()
              this.getSMSTmp()
            })
          }
        }
      })
    },
    addTml () {
      this.$router.push({path: '/marketing/magicBox/addSMSTemplate'})
    },
    // 改变标签类型
    changeLableType (index) {
      console.log(index)
      this.type = index
      this.getSMSTmp()
    },
    changeStore (val) {
      this.store = val
      this.getSMSTmp()
    },
    // 模糊查询
    searchValue (value) {
      this.loading = true
      this.queryValue = value
      // this.getStLabelRulesList(value)
      this.getSMSTmp()
    },
    handleSizeChange (pagesize) {
      this.pagesize = pagesize
      this.getSMSTmp()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getSMSTmp()
    },
    // 删除短信模板
    deleteTpl (item) {
      // if(item.state=="未审批"){
      //   item.state="1";
      // }else if(item.state=="审批中"){
      //   item.state="2";
      // }else if(item.state=="审批成功"){
      //   item.state="3";
      // }else if(item.state=="审批失败"){
      //   item.state="4";
      // }
      console.log(item)
      let params = {
        templateId: item.templateId,
        state: item.state,
        templateContent: item.templateContent,
        contentId: item.contentId
      }
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteSMSTem(params).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.getSMSTmp()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消!'
        })
        this.getSMSTmp()
      })
    }
  },
  components: { topTips, search }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 30px 0;
    .item{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .label{
        margin-right: 15px;
        font-size:14px;
        color:rgba(51,51,51,1);
      }
    }
    .search{
      margin-left: 230px;
      width: 300px;
    }
    >span{
      font-weight: 700;
      font-size: $md-size;
      color:$text-main-color;
    }
    .busi-btns{
      .btn{
        padding:9px 20px;
        &.newcom-btn{
          margin-left: 0px;
          background:$blue-color;
          border-color:$blue-color;
          color:#FFF;
          &:focus,&:hover{
            background: lighten($blue-color,6%);
            border-color:lighten($blue-color,6%);
          }
        }
        &.import-btn{
          background: $yello-color;
          border-color:$yello-color;
          color:#FFF;
          &:focus,&:hover{
            background: lighten($yello-color,6%);
            border-color:lighten($yello-color,6%);
          }
        }
      }
    }
  }
.label-role {
  margin: 0 auto;
  .modify{
    width: 25px;
    height: 25px;
    padding: 0;
    background: rgba(244,244,244,1);
    border-color: rgba(244,244,244,1);
    color: #FD4343;
  }
  .edit {
    background: rgba(244,244,244,1);
    border-color: rgba(244,244,244,1);
    color: $main-color;
    &:hover {
      color: lighten($main-color, 12%);
    }
  }
  .delete {
    color: $table-text-color;
    &:hover {
      color: lighten($table-text-color, 12%);
    }
  }
}
.modify-content{
  width: 500px;
  margin: 0 auto;
}
.enter-src{
  font-size:14px;
  line-height:17px;
  color:rgba(253,67,67,1);
  padding: 6px 0;
  cursor: pointer;
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
    max-height: 500px;
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
      margin-bottom: 20px;
    }
  }
  .no-info{
    width: 100%;
    height: 500px;
    text-align: center;
    padding-top: 100px;
  }
}
</style>
