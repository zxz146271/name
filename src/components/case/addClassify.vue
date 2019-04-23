<template>
 <div class="form-group">
    <div class="form-block">
        <div class="form-list">
          <el-form :model="ruleForm" ref="ruleForm" label-width="140px" :rules="rules" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="类型名称" prop="classifyName">
                  <el-input v-model="ruleForm.classifyName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="是否启用" prop="state">
                  <el-radio-group v-model="ruleForm.state">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                  </el-radio-group>
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
        classifyName: '',
        state: ''
      },
      rules: {
        classifyName: [
          { required: true, message: '请输入案例标题', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    cancel (formName) {
      this.$refs[formName].resetFields()
      this.$emit('refresh')
    },
    cleanFrom () {
      this.$refs['ruleForm'].resetFields()
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let params = {
            classifyName: this.ruleForm.classifyName,
            state: this.ruleForm.state
          }
          this.$api.addSaveclassify(params).then(res => {
            if (res.code === 0) {
              this.$refs[formName].resetFields()
              this.loading = false
              this.$emit('refresh')
            } else {
              this.loading = false
              this.$message.error(res.msg)
            }
          })
        }
      })
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
