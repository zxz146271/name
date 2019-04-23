<template>
 <div class="form-group">
    <div class="form-block">
        <div class="form-list">
          <el-form :model="integralRulesDetail" :rules="rules" ref="integralRulesDetail" label-width="140px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="积分规则：" prop="integralRule">
                  <span>{{integralRulesDetail.integralRule}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="N值" prop="integralRuleValue">
                  <el-input v-model="integralRulesDetail.integralRuleValue"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="X值" prop="integralValue">
                  <el-input v-model="integralRulesDetail.integralValue"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="积分有效期（天）" prop="integralLimit">
                  <el-input v-model="integralRulesDetail.integralLimit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
    </div>
    <div class="opeartion">
      <div>
        <el-button class="submit_add" @click="cancel">
          取消
        </el-button>
        <el-button class="submit" @click="editData(['integralRulesDetail'])">
          提交
        </el-button>
      </div>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      rules: {
        integralValue: [
          { required: true, message: 'X值不能为空', trigger: 'blur' },
          { max: 10, message: '长度不能大于10个字符', trigger: 'blur' }
        ],
        integralLimit: [
          { required: true, message: '积分有效期不能为空', trigger: 'blur' },
          { max: 10, message: '长度不能大于10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: ['integralRulesDetail'],
  methods: {
    handleChange (value) {
    },
    cancel () {
      this.$emit('reflash')
    },
    // 修改保存
    editData (formName) {
      var _this = this
      // 保存表单校验结果
      let correctList = []
      for (var value of formName) {
        _this.$refs[value].validate((valid) => {
          correctList.push(valid)
        })
      }
      // 判断校验结果中是否存在false值
      if (correctList.indexOf(false) === -1) {
        let params = {}
        params.id = this.integralRulesDetail.id
        params.integralRuleValue = this.integralRulesDetail.integralRuleValue
        params.integralValue = this.integralRulesDetail.integralValue
        params.integralLimit = this.integralRulesDetail.integralLimit
        this.$api.stIntegralRulesEdit(params).then(res => {
          if (res.code === 0) {
            // 成功返回列表页面
            this.$emit('reflash')
          } else {
            // 失败提示
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.error('请按要求填写页面红色标注必填项')
      }
    }
  }
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
