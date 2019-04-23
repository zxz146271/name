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
              <el-col :span="24">
                <el-form-item label="选择月份" prop="monthStr" v-if="flag" >
                  <el-date-picker v-model="ruleForm.monthStr" type="month" placeholder="选择月">
                  </el-date-picker>
                </el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item label="选择周" prop="weekStr" v-if="flag2">
                    <el-date-picker
                      v-model="ruleForm.weekStr"
                      type="week"
                      format="yyyy 第 WW 周"
                      placeholder="选择周">
                    </el-date-picker>
                  </el-form-item>
              </el-col>
              <el-col :span="24" class="upload-item label-star">
                <el-form-item   v-for="item in storeData" :key="item.storeId" :label="item.storeName" >
                  <el-input v-model="item.memberNum"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="24" v-else>
                <el-form-item   v-for="item in staffData" :key="item.staffId" :label="item.staffName" >
                  <el-input v-model="item.memberNum"></el-input>
                </el-form-item>
              </el-col> -->
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
        monthStr: '',
        weekStr: '',
        roleName: '',
        isDefaultRole: '',
        expectationClient: '',
        type: ''
      },
      storevo: {
        state: '0'
      },
      staffvo: {
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
        expectationClient: [
          { required: true, message: '请输入期望值', trigger: 'blur' }
        ],
        weekStr: [
          { required: true, message: '请选择活动时间段', trigger: 'blur' }
        ],
        monthStr: [
          { required: true, message: '请选择活动时间段', trigger: 'blur' }
        ]
      },
      submint: true,
      storeData: [],
      // staffData: [],
      memberNum: []
    }
  },
  mounted () {
    this.getStstoreList()
    // this.getStStaffList()
  },
  methods: {
    cancel (formName) {
      this.$refs[formName].resetFields()
      this.$emit('refresh')
    },
    // 获取所有门店信息
    getStstoreList () {
      let params = {
        page: 1,
        limit: 0,
        storevo: this.storevo
      }
      this.$api.getStStoreList(params).then(res => {
        this.storeData = res.data
      })
    },
    // 店长进入获取所有导购
    // getStStaffList () {
    //   let params = {
    //     page: 1,
    //     limit: 0,
    //     staffvo: this.staffvo
    //   }
    //   this.$api.selectStaffByUser(params).then(res => {
    //     this.staffData = res.data
    //   })
    // },
    changeType (value) {
      if (value === '1') {
        this.flag = false
        this.flag2 = true
        // this.rules.month[0].required = false
        // this.rules.week[0].required = true
      } else {
        this.flag = true
        this.flag2 = false
        // this.rules.month[0].required = true
        // this.rules.week[0].required = false
      }
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // if (this.falg4) {
          this.storeData.forEach(el => {
            if (!el.memberNum) {
              this.flag5 = true
            }
            if (!/^[0-9]*$/.test(el.memberNum) || el.memberNum.length > 8) {
              this.flag6 = true
            }
            this.memberNum.push(el.storeId + '-' + el.memberNum)
            // el.memberNum = ''
          })
          // } else {
          //   this.staffData.forEach(el => {
          //     if (!el.memberNum) {
          //       this.flag5 = false
          //     }
          //     this.memberNum.push(el.staffId + '-' + el.memberNum)
          //     // el.memberNum = ''
          //   })
          // }
          if (this.flag5) {
            this.$message.error('请配置所有业绩')
            this.memberNum = []
            this.flag5 = false
          } else if (this.flag6) {
            this.$message.error('业绩配置只能为纯数字且长度必须在0-8位之间')
            this.memberNum = []
            this.flag6 = false
          } else {
            this.loading = true
            let params = {
              monthStr: this.ruleForm.monthStr,
              weekStr: this.ruleForm.weekStr,
              type: this.ruleForm.type,
              moneyNum: this.memberNum
            }
            if (this.submint) {
              this.$api.addSaveMoneyperformance(params).then(res => {
                this.submint = false
                if (res.code === 0) {
                  this.submint = true
                  this.memberNum = []
                  this.loading = false
                  this.getStstoreList()
                  this.$refs[formName].resetFields()
                  this.$emit('refresh')
                } else {
                  this.loading = false
                  this.submint = true
                  this.$message.error(res.msg)
                }
              })
            } else {
              this.$message.error('请勿重复提交')
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
