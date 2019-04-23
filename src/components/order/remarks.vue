<template>
  <div class="remarks">
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-input v-model="ruleForm.careId"  v-show="false"></el-input>
        <el-form-item  prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注" class="texta"></el-input>
        </el-form-item>
     </el-form>
      <div class="remarks-btn">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" class="ture" @click="submint('ruleForm')">确定</el-button>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        careId: '',
        remark: ''
      },
      rules: {
        remark: [
          { min: 0, max: 150, message: '长度在 0 到 150 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    careOrder () {
      this.initData()
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let params = {
        careId: this.careOrder.careId
      }
      this.$api.selectByCareId(params).then(res => {
        this.ruleForm = res.data
      })
    },
    cancel () {
      this.$emit('refresh')
    },
    cleanFrom () {
      this.initData()
    },
    submint (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        // 判断校验结果中是否存在false值s
        if (valid) {
          let params = {
            careId: this.ruleForm.careId,
            remark: this.ruleForm.remark.trim()
          }
          this.$api.editSaveCareOrder(params).then(res => {
            if (res.code === 0) {
              this.$refs[ruleForm].resetFields()
              this.$emit('refresh')
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$message.error('请按要求填写页面红色标注必填项')
        }
      })
    }
  },
  props: ['careOrder']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.remarks{
  padding: 10px 15px 0;

  .remarks-btn{
    margin-top: 30px;
    display: flex;
    justify-content: center;
    button{
      padding:15px 57px;
    }
    .ture{
         @include linear-grad;
          color:#fff;
          padding:16px 87px;
          border:0;
          &:hover{
            opacity: 0.9;
          }
      }
  }
}
</style>
