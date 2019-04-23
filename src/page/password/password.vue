<template>
  <div class="main">
  <div class="order">
    <div class="fix-header">
      <x-header></x-header>
      <!-- <child-nav :navList="navList"></child-nav> -->
    </div>
    <div class="main-cont">
      <p>修改密码</p>
      <div class="content">
        <div class="form-group">
          <div class="form-block">
            <div class="form-list">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="老密码" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="新密码" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="确认密码" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="opeartion">
            <div>
              <el-button class="submit">
                确定修改
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <x-footer></x-footer>
  </div>
</template>
<script>
import xHeader from '../../components/header/header'
import childNav from '../../components/public/childNav'
import xFooter from '../../components/footer/footer'
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  components: {xHeader, childNav, xFooter}
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
