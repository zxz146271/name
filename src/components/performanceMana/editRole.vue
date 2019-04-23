<template>
 <div class="form-group">
    <div class="form-block">
        <div class="form-list">
          <el-form :model="ruleForm" ref="member" :rules="rules" label-width="140px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24" v-if='showModle'>
                <el-form-item label="门店" prop="defaultRoleId" >
                  <el-input v-model="member.storeName"  :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-else>
                <el-form-item label="员工" prop="defaultRoleId" >
                  <el-input v-model="member.staffName"  :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="member.month">
                <el-form-item label="选择月份" prop="month" >
                  <el-date-picker v-model="ruleForm.month" type="month" placeholder="选择月">
                  </el-date-picker>
                </el-form-item>
               </el-col>
               <el-col :span="24" v-else>
                  <el-form-item label="选择周" prop="month" >
                    <el-date-picker
                      v-model="ruleForm.week"
                      type="week"
                      format="yyyy 第 WW 周"
                      placeholder="选择周">
                    </el-date-picker>
                  </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="期望带客数" prop="expectationClient">
                  <el-input v-model="ruleForm.expectationClient"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="24">
                <el-form-item label="实际带客数" prop="number">
                  <el-input v-model="ruleForm.actualCilent"  :disabled="true"></el-input>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
    </div>
    <div class="opeartion">
      <div>
        <el-button class="submit_add" @click="cancel('member')">
          取消
        </el-button>
        <el-button class="submit" @click="submit('member')" :loading="loading">
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
      showModle: true,
      performanceVo: {
        performanceId: '',
        expectationClient: '',
        monthStr: '',
        weekStr: ''
      },
      ruleForm: {},
      rules: {
        expectationClient: [
          { required: true, message: '请输入期望值', trigger: 'change' },
          { pattern: /^\d{0,8}$/, message: '必须为数字且长度在0-8位之间' }
        ],
        week: [
          { required: false, message: '请选择期望周', trigger: 'change' }
        ],
        month: [
          { required: false, message: '请选择期望月份', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    member () {
      this.initData()
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    change (value) {
    },
    cancel (formName) {
      this.$refs[formName].resetFields()
      this.$emit('refresh')
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.performanceVo.performanceId = this.ruleForm.performanceId
          this.performanceVo.expectationClient = this.ruleForm.expectationClient
          this.performanceVo.weekStr = this.ruleForm.week
          this.performanceVo.monthStr = this.ruleForm.month
          let params = this.performanceVo
          this.$api.editSaveMember(params).then(res => {
            if (res.code === 0) {
              this.loading = false
              this.$emit('refresh')
            } else {
              this.loading = false
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    initData () {
      let params = {
        performanceId: this.member.performanceId
      }
      this.$api.getmemberperfById(params).then(res => {
        if (res.data.level === 'distributor') {
          this.showModle = true
        } else {
          this.showModle = false
        }
        this.ruleForm = res.data
        if (res.data.week != null) {
          this.ruleForm.week = new Date(res.data.week)
        }
      })
    }
  },
  props: ['member']
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
