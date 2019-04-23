<template>
 <div class="form-group">
    <div class="form-block">
        <div class="form-list">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="140px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="按周按月" prop="type">
                  <el-radio-group v-model="ruleForm.type" @change="changeType(ruleForm.type)">
                    <el-radio label="0" value="0">月</el-radio>
                    <el-radio label="1" value="1">周</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-show="ruleForm.type">
                <el-form-item label="选择月份" prop="index" v-if="flag" >
                  <el-select v-model="ruleForm.index" placeholder="请选择" @change="changeMonth(ruleForm.index)">
                    <el-option
                      v-for="(item, index) in monthData"
                      :key="index"
                      :label="item.monthStr"
                      :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-show="ruleForm.type">
                  <el-form-item label="选择周" prop="index" v-if="flag2"  >
                    <el-select v-model="ruleForm.index" placeholder="请选择" @change="changeWeek(ruleForm.index)" >
                      <el-option
                        v-for="(item, index) in weekData"
                        :key="index"
                        :label="item.weekTime"
                        :value="index" >
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="24" >
                <el-form-item label="老板的目标业绩" >
                  <el-input v-model="ruleForm.expectationClient" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" class="upload-item label-star">
                <el-form-item    v-for="item in staffData" :key="item.staffId" :label="item.staffName" >
                  <el-input v-model="item.memberNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
    </div>
    <div class="opeartion">
      <div>
        <el-button class="submit_add" @click="cancel('ruleForm')">
          取消
        </el-button>
        <el-button class="submit" @click="submit('ruleForm')" :loading="loading">
          {{loading? '提交中' : '提交'}}
        </el-button>
      </div>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      ruleForm: {
        storeId: '',
        month: '',
        week: '',
        expectationClient: 0,
        type: '',
        index: ''
      },
      storevo: {
        state: '0'
      },
      flag: true,
      flag2: false,
      flag5: false,
      flag6: false,
      showModle: true,
      rules: {
        type: [
          { required: true, message: '请选择统计周期', trigger: 'change' }
        ],
        index: [
          { required: true, message: '请选择配置时间段', trigger: 'blur' }
        ]
      },
      submint: true,
      staffData: [],
      memberNum: [],
      monthData: [],
      weekData: []
    }
  },
  mounted () {
    this.getStStaffList()
    this.getStStoreAdminList()
  },
  methods: {
    cancel (formName) {
      this.$refs[formName].resetFields()
      this.$emit('refresh')
    },
    // change (value) {
    //   this.expectationClient = value.expectationClient
    // },
    // 店长进入获取所有导购
    getStStaffList () {
      let params = {
        page: 1,
        limit: 0,
        staffvo: this.staffvo
      }
      this.$api.selectStaffByUser(params).then(res => {
        this.staffData = res.data
      })
    },
    changeWeek (value) {
      this.ruleForm.expectationClient = this.weekData[value].expectationClient
      this.ruleForm.week = this.weekData[value].week
    },
    changeMonth (value) {
      this.ruleForm.expectationClient = this.monthData[value].expectationClient
      this.ruleForm.month = this.monthData[value].month
    },
    getStStoreAdminList () {
      this.weekData = []
      this.monthData = []
      this.$api.getStStoreAdminMemberList().then(res => {
        if (res.data.perList.length > 0) {
          res.data.perList.forEach(el => {
            if (el.type === '0') {
              this.monthData.push(el)
            } else {
              this.weekData.push(el)
            }
          })
        } else {
          this.$message.error('经销商还未配置该门店业绩')
        }
      })
    },
    changeType (value) {
      // this.ruleForm.expectationClient = 0
      this.ruleForm.month = ''
      this.ruleForm.week = ''
      if (value === '1') {
        this.flag = false
        this.flag2 = true
      } else {
        this.flag = true
        this.flag2 = false
      }
    },
    submit (formName) {
      var count = 0
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.staffData.forEach(el => {
            if (el.memberNum) {
              count += parseInt(el.memberNum)
            } else {
              this.flag5 = true
            }
            if (!/^[0-9]*$/.test(el.memberNum) || el.memberNum.length > 8) {
              this.flag6 = true
            }
            this.memberNum.push(el.staffId + '-' + el.memberNum)
            // el.memberNum = ''
          })
          if (this.flag5) {
            this.$message.error('请配置所有业绩')
            this.memberNum = []
            this.flag5 = false
          } else if (this.flag6) {
            this.$message.error('业绩配置只能为纯数字且长度必须在0-8位之间')
            this.memberNum = []
            this.flag6 = false
          } else {
            if (count < this.ruleForm.expectationClient) {
              this.$message.error('业绩目标总和不能小于老板业绩目标值')
              this.memberNum = []
            } else {
              this.loading = true
              let params = {
                monthStr: this.ruleForm.month,
                weekStr: this.ruleForm.week,
                type: this.ruleForm.type,
                memberNum: this.memberNum
              }
              if (this.submint) {
                this.$api.addSaveperformance(params).then(res => {
                  this.submint = false
                  if (res.code === 0) {
                    this.submint = true
                    this.loading = false
                    this.memberNum = []
                    this.weekData = []
                    this.monthData = []
                    this.getStStaffList()
                    this.ruleForm.expectationClient = 0
                    this.$refs[formName].resetFields()
                    this.$emit('refresh')
                  } else {
                    this.submint = true
                    this.loading = false
                    this.weekData = []
                    this.monthData = []
                    this.$message.error(res.msg)
                  }
                })
              } else {
                this.$message.error('请勿重复提交')
              }
            }
          }
        } else {
          this.$message.error('请按要求填写页面红色标注必填项')
        }
      })
    }
  },
  props: ['falg4']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.form-list{
        margin-top:106px;
        padding: 0 120px;
        .form-title{
          width: 200px;
          position:absolute;
          color: $text-adorn-color;
          font-size: $xs-size;
          right: -200px;
          top: 0;
          padding-left:20px;
        }
        .el-col-24{
          .el-input-number{
            width:100%;
            line-height: 34px;
            .el-input-number__increase{
              line-height: 17px;
            }
          }
        }
        .upload-item{
          .el-form-item__content{
            line-height: 34px;
          }
        }
      }
    .opeartion{
      display: flex;
      justify-content: center;
      margin: 120px 0 50px 0;
      button{
        padding:15px 57px;
      }
      .submit{
          @include linear-grad;
          color:#fff;
          padding:16px 87px;
          border:0;
          &:hover{
            opacity: 0.9;
          }
      }
    }
</style>
