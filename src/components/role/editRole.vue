<template>
 <div class="form-group">
    <div class="form-block">
        <div class="form-list">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="140px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24">
                <!-- <el-form-item label="角色id" prop="roleId" v-show="false">
                    <el-input v-model="id"></el-input>
                </el-form-item> -->
              </el-col>
              <el-col :span="24">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input v-model="ruleForm.roleName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="角色描述" prop="roleDescription">
                  <el-input v-model="ruleForm.roleDescription"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="24">
                <el-form-item label="是否预设" prop="isDefaultRole">
                  <el-radio-group v-model="ruleForm.isDefaultRole">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
    </div>
    <div class="opeartion">
      <div>
        <el-button class="submit_add" @click="cancel">
          取消
        </el-button>
        <el-button class="submit" @click="submit('ruleForm')">
          确定
        </el-button>
      </div>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        roleId: '',
        roleName: '',
        roleDescription: '',
        isDefaultRole: '',
        defaultRoleId: '',
        versionNo: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDescription: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
        isDefaultRole: [
          { required: true, message: '请选择是否预设角色', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.initData()
  },
  props: ['role'],
  watch: {
    role () {
      this.initData()
    }
  },
  methods: {
    initData () {
      let params = {
        roleId: this.role.roleId
      }
      this.$api.getRoleById(params).then(res => {
        this.ruleForm = res.data
      })
    },
    cancel () {
      this.$emit('refresh')
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            roleId: this.ruleForm.roleId,
            roleName: this.ruleForm.roleName,
            roleDescription: this.ruleForm.roleDescription,
            isDefaultRole: this.ruleForm.isDefaultRole,
            versionNo: this.ruleForm.versionNo
          }
          this.$api.editRole(params).then(res => {
            if (res.code === 0) {
              this.$emit('refresh')
            } else {
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
