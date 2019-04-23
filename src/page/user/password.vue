<template>
  <div class="main">
  <div class="order">
    <div class="main-cont">
      <p>修改密码</p>
      <div class="content">
        <div class="form-group">
          <div class="form-block">
            <div class="form-list">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="老密码" prop="oldPwd">
                      <el-input v-model="ruleForm.oldPwd"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="新密码" prop="newPwd">
                      <el-input type="password" v-model="ruleForm.newPwd"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="确认密码" prop="newPwd2">
                      <el-input type="password" v-model="ruleForm.newPwd2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="opeartion">
            <div>
              <el-button class="submit" @click="editPassword('ruleForm')">确定修改</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import childNav from '../../components/public/childNav'
export default {
  data () {
    return {
      ruleForm: {
        oldPwd: '',
        newPwd: '',
        newPwd2: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入老密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'change' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        newPwd2: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    editPassword (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.newPwd !== this.ruleForm.newPwd2) {
            this.$message.error('两次输入的新密码不匹配,请重新输入！')
            return
          }
          let params = {
            oldPwd: this.ruleForm.oldPwd,
            newPwd: this.ruleForm.newPwd
          }
          this.$api.editPassword(params).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              // setStore('token', res.data.token)
              this.$router.push({path: '/login'})
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  },
  components: { childNav }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.order{
  min-height: 100%;
  height: auto !important;
  height: 100%;
  margin: 0 auto -40px;
  padding-bottom: 40px;
  .fix-header{
    position: fixed;
    left:0;
    right:0;
    top:0;
    z-index: 9;
  }
  .main-cont{
    width:1000px;
    padding-top: 66px;
    margin: 0 auto;
    >p{
      text-align: center;
      padding: 50px 0;
      color:$text-main-color;
      font-size: $detail-size;
      position: relative;
      &::before{
        content: "";
        display: block;
        width: 30px;
        height: 2px;
        background: $checkbox-border-color;
        position: absolute;
        top:50%;
        margin-top: -1px;
        left: 50%;
        margin-left: -80px;
      }
      &::after{
        content: "";
        display: block;
        width: 30px;
        height: 2px;
        background: $checkbox-border-color;
        position: absolute;
        top:50%;
        margin-top: -1px;
        right: 50%;
        margin-right: -80px;
      }
    }
    .content{
      border-radius: 4px;
      border:1px solid $border-color;
      padding: 75px 0 50px 0;
       .form-group{
        margin-top: 20px;
          .form-block{
            .form-list{
              margin-top: 28px;
              padding: 0 70px;
              .radio-popup{
                display: flex;
                margin-bottom: 18px;
                align-items: center;
                >p{
                  width: 120px;
                  text-align: right;
                  padding-right: 12px;
                  line-height: 40px;
                  font-size: $xs-size;
                  color:#606266;
                }
                .content{
                  ul{
                    display: flex;
                    li{
                      display: flex;
                      align-items: center;
                      span{
                        width: 14px;
                        height: 14px;
                        position: relative;
                        i{
                          width: 100%;
                          height: 100%;
                          border-radius: 50%;
                          border: 1px solid #dcdfe6;
                          position: absolute;
                          left: 0;
                          top:0;
                          z-index: 1;
                          &::after{
                            width: 4px;
                            height: 4px;
                            border-radius: 100%;
                            background-color: #fff;
                            content: "";
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%,-50%) scale(0);
                            transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
                          }
                        }
                        input{
                          width: 100%;
                          height: 100%;
                          position: absolute;
                          top:0;
                          left: 0;
                          z-index: 2;
                          opacity: 0;
                          cursor: pointer;
                        }
                      }
                      label{
                        font-size: $xs-size;
                        color:#606266;
                        padding-left: 10px;
                        margin-right: 30px;
                        cursor: pointer;
                      }
                    }
                    .active{
                      i{
                        background-color: $main-color;
                        border-color: $main-color;
                        &::after{
                          transform: translate(-50%,-50%) scale(1);
                        }
                      }
                      label{
                          color: $main-color!important;
                      }
                    }
                  }
                }
              }
              .el-col-12{
                margin-left: 25%;
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
                  line-height: 0;
                }
              }
            }
          }
          .opeartion{
            display: flex;
            justify-content: center;
            margin: 30px 0 50px 0;
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
      }
    }
  }
}
</style>
