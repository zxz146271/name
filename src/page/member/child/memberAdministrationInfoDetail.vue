<template>
  <div class="comm-Add">
    <div class="form-group">
      <div class="form-block">
        <div class="form-list">
          <div class="handRecord">
            <div slot="title" class="left-title">
              <span class="top">手工记录</span>
            </div>
            <div class="recordContent">
              <ul class="infoContent">
                <li class="oneRow">
                  <span>{{stMemberInfoDetail.storeConsumerName?stMemberInfoDetail.storeConsumerName:'暂无'}}</span>
                  <span>{{stMemberInfoDetail.mobile?stMemberInfoDetail.mobile:'暂无'}}</span>
                </li>
                <li class="secRow">
                  <span class="wechatNum">微信号：{{stMemberInfoDetail.storeWechatNumber?stMemberInfoDetail.storeWechatNumber:'暂无'}}</span>
                  <span class="wechatNum">QQ号：{{stMemberInfoDetail.storeConsumerQq?stMemberInfoDetail.storeConsumerQq:'暂无'}}</span>
                  <span class="wechatNum">所属区域：{{stMemberInfoDetail.storeConsumerDistinct == null
                    ?'暂无':stMemberInfoDetail.storeConsumerDistinct.replace(/"/g,'').replace(/,/g,'').replace(/\[/g,'').replace(/\]/g,'')}}</span>
                </li>
                <li class="thirdRow">
                  <span class="wechatNum">性别：{{!stMemberInfoDetail.storeConsumerSex?'未知':stMemberInfoDetail.storeConsumerSex ==
                    'woman'?'女':'男'}}</span>
                  <span class="wechatNum">生日：{{stMemberInfoDetail.storeConsumerBirthdayStr?stMemberInfoDetail.storeConsumerBirthdayStr:'暂无'}}</span>
                  <span class="wechatNum">年龄段：{{stMemberInfoDetail.storeConsumerAgeGroup?stMemberInfoDetail.storeConsumerAgeGroup:'暂无'}}</span>
                </li>
                <li><span>详细地址：{{stMemberInfoDetail.storeConsumerAddress?stMemberInfoDetail.storeConsumerAddress:'暂无'}}</span></li>
                <!-- <li><span>送货地址：{{stMemberInfoDetail.storeConsumerAddress?stMemberInfoDetail.storeConsumerAddress:'暂无'}}</span></li> -->
                <li><span>备注：{{stMemberInfoDetail.storeConsumerComment?stMemberInfoDetail.storeConsumerComment:'暂无'}}</span></li>
                <li class="line"></li>
                <li class="receivingRecords"><span>接待记录:</span></li>
                <li class="nineRow" v-for="(item,index) in recordList" :key="index">
                  <span style="width: 5px;display: inline-block;" v-if="item.purchaseTime && item.receptionDetail">{{index+1}}</span>
                  <span>{{item.purchaseTime}}</span>
                  <span  class="receptionState">{{item.receptionDetail}}</span>
                </li>
                <li class="receivingRecordsAdd" @click="importReceivingRecords()">
                  <span class="addColor">添加接待记录</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="systemRecord">
            <div slot="title" class="left-title">
              <span class="top">系统记录</span>
            </div>
            <div class="recordContent1">
              <div class="userPortrait">
                <img class="headPortrait" :src="stMemberInfoDetail.wechatPhoto">
                <div class="nikiName">
                  <span class="title">{{stMemberInfoDetail.wechatNikiName?stMemberInfoDetail.wechatNikiName:'暂无姓名'}}</span>
                  <img class="genderImage" v-if="stMemberInfoDetail.storeConsumerSex == 'woman'" src="/static/image/Shapewoman@2x.png">
                  <img class="genderImage" v-else src="/static/image/male-icon.png">
                </div>

              </div>
              <ul class="infoContent1">
                <li class="oneRow">
                  <span>用户创建时间：{{stMemberInfoDetail.createTime}}</span>
                  <span>最后一次登陆时间：{{stMemberInfoDetail.lasttimeVicitTime}}</span>
                  <span>最后一次登陆客户端：{{stMemberInfoDetail.source == "miniApp"?'微信小程序':"H5"}}</span>
                </li>
                <li class="secRow">
                  <span>最后一次用户停留时长：{{lastStayTime}}</span>
                  <span>累计停留时长：{{allTime}}</span>
                </li>
                <li class="line"></li>
                <li class="userBehavior"><span>用户行为：</span></li>
                <li class="fiveRow" v-for="(item ,index) in alreadyBehavior" :key="index">
                  <span>{{index +1}}</span>
                  <span>{{item.createTime}}</span>
                  <span class="behaviorObject">{{item.behaviorObject}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="otherInfo">
            <div slot="title" class="left-title">
              <span class="top">其他信息</span>
            </div>
            <div class="recordContent2">
              <ul class="infoContent2">
                <li class="oneRow">
                  <span>消费者填写的真实姓名：{{stMemberInfoDetail.memberName?stMemberInfoDetail.memberName:'暂无姓名'}}</span>
                </li>
                <li class="secRow">
                  <span>消费者填写的生日：{{stMemberInfoDetail.birthdayStr?stMemberInfoDetail.birthdayStr:'暂无'}}</span>
                </li>
                <li class="line"></li>
                <!-- <li class="userBehavior"><span>消费者填写的收货信息：</span></li>
                <li class="fiveRow">
                  <span>姓名：{{stMemberInfoDetail.storeConsumerName?stMemberInfoDetail.storeConsumerName:'暂无姓名'}}</span>
                  <span>号码：{{stMemberInfoDetail.mobile?stMemberInfoDetail.mobile:'暂无'}}</span>
                </li>
                <li class="sixRow">
                  <span>地址：{{stMemberInfoDetail.detailAddress?stMemberInfoDetail.detailAddress:'暂无'}}</span>
                </li>
                <li class="sixRow">
                  <span>默认地址：{{stMemberInfoDetail.detailAddress?stMemberInfoDetail.detailAddress:'暂无'}}</span>
                </li> -->
              </ul>
            </div>
          </div>
          <el-dialog :visible.sync="receivingDetail" width="550px" :before-close="handleCloseMember" class="import-dialog">
            <div slot="title" class="center-title">
              <span class="top">添加接待记录</span>
            </div>
            <submember-detail :memberList="memberList" @getMemberList="getMemberList" @handleCloseMember="handleCloseMember"
              :stMemberInfoDetail="stMemberInfoDetail"></submember-detail>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import breadCrumb from '../../../components/public/breadcrumb'
  import topTips from '../../../components/public/topTips'
  import submemberDetail from '../../../components/member/submemberDetail'
  import {
    regionData
  } from 'chinaArea'
  export default {
    components: {
      breadCrumb,
      topTips,
      submemberDetail
    },
    data() {
      return {
        memberList: "",
        recordList: '',
        loading: false,
        dialogVisible: false,
        receivingDetail: false,
        dialogImageUrl: '',
        thisShow: false,
        num8: 1,
        breadcrumbList: [{
            title: '潜客管理',
            path: 'submemberManage'
          },
          {
            title: '创建潜客',
            path: ''
          }
        ],
        necessary: {
          title: '基础信息（必填）',
          unfold: false
        },
        optional: {
          title: '其他信息（选填）',
          unfold: true
        },
        // 省市区
        options: regionData,
        newprops: {
          value: 'label'
        },
        areaSelected: [],
        // stMemberInfoDetail: {
        //   memberId: '',
        //   memberRegion: '',
        //   memberName: '',
        //   memberNameMini: '',
        //   mobile: '',
        //   detailAddress: '',
        //   realSex: '',
        //   birthdayStr: '',
        //   ageGroup: '',
        //   wechatNumber: '',
        //   remarks: '',
        //   source: '',
        //   memberCode: '',
        //   storeId: ''
        // },
        stMemberInfoDetail: '',
        memberId: '',
        storeId: '',
        lastStayTime: '',
        getDetailAlreadyBehavior: '',
        alreadyBehavior: '',
        allTime: 0,
        everyTime: [],
        // ageGroupList: [],
        rules: {
          memberName: [{
              required: true,
              message: '请输入真实姓名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 5,
              message: '长度在 2 到 5 个字符',
              trigger: 'blur'
            }
          ],
          mobile: [{
              required: true,
              message: '请输入手机号码',
              trigger: 'blur'
            },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '目前只支持中国大陆的手机号码',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    watch: {
      stMemberInfoDetail(nv) {
        this.newSubId = nv
        this.memberList = {
          page: 1,
          limit: 10000,
          // subId: this.stMemberInfo.subId,
          memberId: this.newSubId.subId,
          subMemberInfoVo: {}
        }
        this.subMemberList = {
          page: 1,
          limit: 10000,
          // subId: this.stMemberInfo.subId,
          memberId: this.newSubId.subId,
          subMemberInfoVo: {}
        }
        this.getMemberList(this.subMemberList)
        this.getDetailAlreadyBehavior = {
          memberId: this.newSubId.memberId,
          storeId: this.newSubId.storeId,
          pageSize: 10,
          pageNum: 1
        }
        this.getDetailAlreadyBehaviorById(this.getDetailAlreadyBehavior)

      }
    },
    mounted() {
      this.initData()
      // this.lastStayTime = new Date(this.alreadyBehavior[0].leaveTime) - new Date(this.alreadyBehavior[0].createTime)
      // this.lastStayTime = this.alreadyBehavior
    },
    methods: {
      getDetailAlreadyBehaviorById(b) {
        this.$api.getDetailAlreadyBehaviorById(b).then(res => {
          this.alreadyBehavior = res.data.behaviorList.data
          this.lastStayTime = (new Date(this.alreadyBehavior[0].leaveTime) - new Date(this.alreadyBehavior[0].createTime)) /
            1000
          if (this.lastStayTime < 60) {
            this.lastStayTime = this.lastStayTime + "秒"
          } else {
            this.lastStayTime = Math.floor(this.lastStayTime / 60) + '分' + this.lastStayTime % 60 + '秒'
          }
          for(var i = 0; i < this.alreadyBehavior.length; i++ ){
             this.everyTime.push((new Date(this.alreadyBehavior[i].leaveTime) - new Date(this.alreadyBehavior[i].createTime)) /
            1000)
          }
          for(var j = 0;j < this.everyTime.length;j++){
            this.allTime += this.everyTime[j]
          }
          if(this.allTime < 60){
            this.allTime = this.allTime + "秒"
          }else{
            this.allTime = Math.floor(this.allTime / 60) + '分' + this.allTime % 60 + '秒'
          }
        })
      },
      getMemberList(a) {
        this.$api.MemberEditList(a).then(res => {
          this.recordList = res.data
        })
      },
      importReceivingRecords() {
        this.receivingDetail = true
        // this.submemberInfo = val
      },
      handleCloseMember() {
        this.receivingDetail = false
      },
      showList(data) {
        if (data) {
          this.thisShow = data
        } else {
          this.thisShow = false
        }
      },
      cancel() {
        this.$router.push({
          path: '/myStore/member/submemberManage'
        })
      },
      initData() {
        this.memberId = this.$route.query.memberId
        this.storeId = this.$route.query.storeId
        this.getSubMemberInfo(this.memberId, this.storeId)
      },
      getSubMemberInfo(memberId, storeId) {
        var _this = this
        let params = {
          memberId: memberId,
          storeId: storeId
        }
        this.$api.getSubMemberInfo(params).then(res => {
          this.stMemberInfoDetail = res.data
          // this.stMemberInfoDetail.memberId = res.data.memberId
          // this.stMemberInfoDetail.memberName = res.data.memberName
          if (res.data.memberRegion !== undefined && res.data.memberRegion !== null && res.data.memberRegion !== '') {
            let areaSelectedTemp = JSON.parse(res.data.memberRegion)
            areaSelectedTemp.forEach(item => {
              this.areaSelected.push(item)
            })
          }
          // this.stMemberInfoDetail.mobile = res.data.mobile
          // this.stMemberInfoDetail.detailAddress = res.data.detailAddress
          // this.stMemberInfoDetail.realSex = res.data.realSex
          // this.stMemberInfoDetail.birthdayStr = res.data.birthdayStr
          // this.stMemberInfoDetail.ageGroup = res.data.ageGroup
          // this.stMemberInfoDetail.wechatNumber = res.data.wechatNumber
          // this.stMemberInfoDetail.remarks = res.data.remarks
          // this.stMemberInfoDetail.source = res.data.source
          console.log(this.stMemberInfoDetail.source)
          console.log(res.data.memberName)
          if (_this.stMemberInfoDetail.source === 'miniApp') {
            if (_this.checknum(res.data.memberName) && res.data.memberName.length === 4) {
              _this.stMemberInfoDetail.memberNameMini = '尾号为' + res.data.memberName + '的客户'
            } else {
              _this.stMemberInfoDetail.memberNameMini = res.data.memberName
            }
          }
          this.stMemberInfoDetail.memberCode = res.data.memberCode
          this.stMemberInfoDetail.storeId = res.data.storeId
        })
      },
      // 校验字符串是否为纯数字
      checknum(num) {
        var reg = new RegExp('^[0-9]*$')
        if (reg.test(num)) {
          return true
        }
        return false
      },
      editData(formName) {
        // 全局上下文
        var context = this
        // 保存表单校验结果
        let correctList = []
        for (var value of formName) {
          context.$refs[value].validate((valid) => {
            correctList.push(valid)
          })
        }
        // 判断校验结果中是否存在false值
        if (correctList.indexOf(false) === -1) {
          this.loading = true
          let area = []
          area = this.areaSelected.slice(0, 3)
          this.stMemberInfoDetail.memberRegion = JSON.stringify(area)
          let params = this.stMemberInfoDetail
          this.$api.subMemberEditSave(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.$router.push({
                path: '/myStore/member/submemberManage'
              })
            } else {
              // 失败提示
              this.$message.error(res.msg)
            }
            this.loading = false
          })
        } else {
          this.$message.error('请按要求填写页面红色标注必填项')
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import '../../../assets/style/mixins/var';

  .comm-Add {
    margin: 0 auto;
    padding-top: 106px;

    .form-group {
      margin-top: 20px;

      .form-block {
        .form-list {
          margin-top: 28px;
          padding: 0 0 100px;

          .handRecord {
            // height: 30px;
            position: relative;
            overflow: hidden;

            .left-title {
              position: absolute;
              left: 0;
              color: #fff;

              .top {
                position: relative;
                width: 100px;
                height: 28px;
                display: inline-block;
                background-color: #F3F4F8;
                line-height: 28px;
                text-align: center;
                color: #27292E;
                font-size: 14px;
              }

              .top::before {
                content: '';
                position: absolute;
                left: 0px;
                width: 4px;
                background-color: #fd4343;
                height: 100%;
              }

              .top::after {
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                margin-left: 2px;
                vertical-align: middle;
                border-width: 14px 12px;
                font-size: 0;
                border-style: solid;
                border-color: transparent transparent transparent #F3F4F8;
                position: absolute;
                right: -24px;
              }
            }

            .recordContent {
              width: 100%;
              // height: 200px;
              margin-top: 30px;
              padding-top: 10px;
              padding-left: 113px;
              font-size: 0;
              // border-style: solid;
              border-color: transparent transparent transparent #F3F4F8;
              // position: absolute;
              // right: -24px;
            }
          }
          .recordContent {
            width: 100%;
            // height: 200px;
            margin-top: 30px;
            padding-top: 10px;
            padding-left: 113px;
            font-size: 0;
            .infoContent {
              position: relative;
              padding-bottom: 15px;
            }
            .infoContent li span {
              height: 30px;
              line-height: 30px;
              display: inline-block;
              font-size: 14px;
              color: #333333;
              text-align: center;
            }
            .infoContent .oneRow span {
              font-size: 16px;
              font-weight: bold;
            }
            .infoContent .oneRow span:nth-of-type(2) {
              margin-left: 46px;
            }
            .wechatNum{
              width: 33%;
              display: inline-block;
              text-align: left!important;
              margin-left: 0!important;
            }
            .infoContent .secRow span:nth-of-type(2),
            .infoContent .secRow span:nth-of-type(3), {
              margin-left: 184px;
            }
            .infoContent .thirdRow span:nth-of-type(2) {
              margin-left: 217px;
            }
            .infoContent .thirdRow span:nth-of-type(3) {
              margin-left: 141px;
            }
            .infoContent .line {
              padding: 4px 0;
              margin-bottom: 4px;
              border-bottom: 1px solid #E0E0E0;
            }
            .infoContent .receivingRecords span{
              font-weight: 600;
            }
            .receptionState {
              margin-left: 30px;
            }
            
            .infoContent .nineRow span:nth-of-type(2),
            .infoContent .tenRow span:nth-of-type(2) {
              margin-left: 30px;
            }
            .infoContent .receivingRecordsAdd {
              width:120px;
              height:29px;
              line-height: 29px;
              border:1px solid #FD4343;
              border-radius:4px;
              padding-left: 29px;
              background: url(../../../../static/image/tianjia_icon.png) no-repeat 6px 8px;
              position: absolute;
              top: 175px;
              right: 3px;
              .addColor{
                color: #FD4343;
              }
              &:hover {
                cursor: pointer;
              }

              .infoContent li span {
                height: 30px;
                line-height: 30px;
                display: inline-block;
                font-size: 14px;
                color: #333333;
                text-align: center;
              }

              .infoContent .oneRow span {
                font-size: 16px;
                font-weight: bold;
              }

              .infoContent .oneRow span:nth-of-type(2) {
                margin-left: 46px;
              }

              .infoContent .secRow span:nth-of-type(2),
              .infoContent .secRow span:nth-of-type(3),
                {
                margin-left: 184px;
              }

              .infoContent .thirdRow span:nth-of-type(2) {
                margin-left: 240px;
              }

              .infoContent .thirdRow span:nth-of-type(3) {
                margin-left: 220px;
              }

              .infoContent .line {
                padding: 4px 0;
                margin-bottom: 4px;
                border-bottom: 1px solid #E0E0E0;
              }

              .infoContent .receivingRecords span {
                font-weight: 600;
              }

              .receptionState {
                margin-left: 30px;
              }

              .infoContent .nineRow span:nth-of-type(2),
              .infoContent .tenRow span:nth-of-type(2) {
                margin-left: 30px;
              }

              .infoContent .receivingRecordsAdd {
                width: 120px;
                height: 29px;
                line-height: 29px;
                border: 1px solid #FD4343;
                border-radius: 4px;
                padding-left: 29px;
                background: url(../../../../static/image/tianjia_icon.png) no-repeat 6px 8px;
                position: absolute;
                top: 200px;
                right: 3px;

                &:hover {
                  cursor: pointer;
                }

                span {
                  height: 29px;
                  color: #FD4343;
                }
              }
            }
          }

          .systemRecord {
            margin-top: 10px;
            position: relative;
            overflow: hidden;

            .left-title {
              position: absolute;
              left: 0;
              color: #fff;

              .top {
                position: relative;
                width: 100px;
                height: 28px;
                display: inline-block;
                background-color: #F3F4F8;
                line-height: 28px;
                text-align: center;
                color: #27292E;
                font-size: 14px;
              }

              .top::before {
                content: '';
                position: absolute;
                left: 0px;
                width: 4px;
                background-color: #fd4343;
                height: 100%;
              }

              .top::after {
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                margin-left: 2px;
                vertical-align: middle;
                border-width: 14px 12px;
                font-size: 0;
                border-style: solid;
                border-color: transparent transparent transparent #F3F4F8;
                position: absolute;
                right: -24px;
              }
            }

            .recordContent1 {
              width: 100%;
              // height: 200px;
              margin-top: 30px;
              padding-top: 10px;
              padding-left: 113px;
              font-size: 0;

              .userPortrait {
                // width: 200px;
                height: 50px;
                margin-bottom: 10px;
                position: relative;

                .headPortrait {
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  position: absolute;
                  top: 0;
                  left: 0;
                }

                .nikiName {
                  height: 50px;
                  line-height: 50px;
                  margin-left: 65px;

                  span {
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 600;
                  }

                  .genderImage {
                    margin-left: 10px;
                    width: 12px;
                  }
                }
              }

              .infoContent1 {
                position: relative;
                font-size: 0;
              }

              .infoContent1 li span {
                height: 30px;
                line-height: 30px;
                display: inline-block;
                font-size: 14px;
                color: #333333;
                text-align: center;
              }

              .infoContent1 .oneRow span:nth-of-type(1),
              .infoContent1 .secRow span:nth-of-type(1) {
                width: 295px;
                text-align: left;
              }

              .infoContent1 .oneRow span:nth-of-type(2),
              .infoContent1 .secRow span:nth-of-type(2) {
                width: 309px;
                text-align: left;
              }

              .infoContent1 .line {
                padding: 4px 0;
                margin-bottom: 4px;
                border-bottom: 1px solid #E0E0E0;
              }

              .infoContent1 .userBehavior span {
                font-weight: 600;
              }

              .behaviorObject {
                margin-left: 30px;
              }

              .infoContent1 .fiveRow span:nth-of-type(1),
              .infoContent1 .sixRow span:nth-of-type(1) {
                width: 45px;
                text-align: left;
              }
            }
          }

          .otherInfo {
            margin-top: 10px;
            position: relative;
            overflow: hidden;

            .left-title {
              position: absolute;
              left: 0;
              color: #fff;

              .top {
                position: relative;
                width: 100px;
                height: 28px;
                display: inline-block;
                background-color: #F3F4F8;
                line-height: 28px;
                text-align: center;
                color: #27292E;
                font-size: 14px;
              }

              .top::before {
                content: '';
                position: absolute;
                left: 0px;
                width: 4px;
                background-color: #fd4343;
                height: 100%;
              }

              .top::after {
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                margin-left: 2px;
                vertical-align: middle;
                border-width: 14px 12px;
                font-size: 0;
                border-style: solid;
                border-color: transparent transparent transparent #F3F4F8;
                position: absolute;
                right: -24px;
              }
            }

            .recordContent2 {
              width: 100%;
              // height: 200px;
              margin-top: 30px;
              padding-top: 10px;
              padding-left: 113px;
              font-size: 0;

              .infoContent2 {
                position: relative;
                font-size: 0;
              }

              .infoContent2 li span {
                height: 30px;
                line-height: 30px;
                display: inline-block;
                font-size: 14px;
                color: #333333;
                // text-align: center;
              }

              .infoContent2 .oneRow span:nth-of-type(1),
              .infoContent2 .secRow span:nth-of-type(1) {
                width: 295px;
                text-align: left;
              }

              .infoContent2 .oneRow span:nth-of-type(2),
              .infoContent2 .secRow span:nth-of-type(2) {
                width: 309px;
                text-align: left;
              }

              .infoContent2 .line {
                padding: 4px 0;
                margin-bottom: 4px;
                border-bottom: 1px solid #E0E0E0;
              }

              .infoContent2 .userBehavior span {
                font-weight: 600;
              }

              .infoContent2 .fiveRow span:nth-of-type(1) {
                width: 292px;
              }
            }
          }

          .el-dialog {
            min-width: 550px;
          }

          .center-title {
            text-align: center;
          }
        }
      }
    }
  }

</style>
