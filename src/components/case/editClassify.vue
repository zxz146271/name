<template>
 <div class="form-group">
    <div class="form-block">
        <div class="form-list">
          <el-form :model="ruleForm" ref="ruleForm" label-width="140px" :rules="rules" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24">
                <!-- <el-form-item label="案例类型id" prop="classifyId" v-show="false">
                    <el-input v-model="id"></el-input>
                </el-form-item> -->
              </el-col>
              <el-col :span="24">
                <el-form-item label="类型名称" prop="classifyName">
                    <el-input v-model="ruleForm.classifyName"></el-input>
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
        classifyName: ''
      },
      rules: {
        classifyName: [
          { required: true, message: '请输入案例标题', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.initData()
  },
  props: ['classify'],
  watch: {
    classify () {
      this.initData()
    }
  },
  methods: {
    initData () {
      let params = {
        classifyId: this.classify.classifyId
      }
      this.$api.getClassifyById(params).then(res => {
        this.ruleForm = res.data
      })
    },
    cancel () {
      this.id = ''
      this.$emit('refresh')
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let params = {
            classifyName: this.ruleForm.classifyName,
            classifyId: this.ruleForm.classifyId,
            versionNo: this.ruleForm.versionNo,
            storeId: this.ruleForm.storeId
          }
          this.$api.editClassify(params).then(res => {
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
