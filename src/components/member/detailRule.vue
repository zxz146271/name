<template>
 <div class="form-group">
    <div class="form-block">
        <div class="form-list">
          <el-form  :model="labelRulesDetail" :rules="rules" ref="stLabelRule" label-width="140px" class="stLabelRule">
            <el-row :gutter="24">
              <el-col :span="24">
                  <el-form-item label="标签名称：" prop="labName">
                  <span>{{labelRulesDetail.labName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="标签规则：" prop="labRule">
                  <span>{{labelRulesDetail.labRule}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="X值：" prop="labRuleValue">
                  <el-input v-model="labelRulesDetail.labRuleValue"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
    </div>
    <div class="opeartion">
      <div>
        <el-button class="cancel" @click="cancel">
          取消
        </el-button>
        <el-button class="submit" @click="editData(['stLabelRule'])" :loading="loading">
          {{loading? '修改中':'修改'}}
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
      rules: {
        labRuleValue: [
          { required: true, message: '请输入满足标签规则的阈值', trigger: 'blur' },
          { pattern: /^[0-9]{0,8}$/, message: '标签规则阈值必须为数字且不能超过8字符' }
        ]
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('reflash')
    },
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
        this.loading = true
        let params = {}
        params.id = this.labelRulesDetail.id
        params.labRuleValue = this.labelRulesDetail.labRuleValue
        this.$api.stLabelRulesEdit(params).then(res => {
          if (res.code === 0) {
            // 成功返回列表页面
            this.$emit('reflash')
          } else {
            // 失败提示
            this.$message.error(res.msg)
          }
          this.loading = false
        })
      } else {
        this.$message.error('请按要求填写页面红色标注必填项')
      }
    },
    handleChange (value) {
    }
  },
  props: ['labelRulesDetail']
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
      .cancel{
        padding:16px 87px;
      }
    }
</style>
