<template>
 <div class="form-group">
    <div class="form-block">
        <div class="form-list">
          <el-form  :model="stLabelRules" :rules="rules" ref="stLabelRule" label-width="140px" class="stLabelRule">
            <el-row :gutter="24">
              <el-col :span="24">
                  <el-form-item label="标签名称" prop="labName">
                  <el-input v-model="stLabelRules.labName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                  <el-form-item label="标签规则" prop="labRule">
                  <el-input v-model="stLabelRules.labRule"></el-input>
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
        <el-button class="submit" @click="saveData(['stLabelRule'])">
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
      stLabelRules: {
        labName: '',
        labRule: '',
        labType: ''
      },
      rules: {
        labName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { max: 10, message: '标签规则长度不能超过10字符', trigger: 'blur' }
        ],
        labRule: [
          { required: true, message: '请输入标签规则', trigger: 'blur' },
          { max: 50, message: '标签规则长度不能超过50字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    cancel () {
      this.$emit('reflash')
    },
    saveData (formName) {
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
        _this.stLabelRules.labType = 'ZJ'
        let params = _this.stLabelRules
        this.$api.stLabelRulesAddSave(params).then(res => {
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
    },
    handleChange (value) {
    }
  },
  props: ['integral', 'effective']
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
