<template>
  <div class="new">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="必填信息" name="first">
        <div class="form-group">
            <div class="form-block">
              <div class="form-list">
                <el-form  ref="ruleForm" label-width="140px" class="ruleForm"  :model="ruleForm" :rules="rules">
                  <el-row :gutter="24">
                    <el-col :span="24">
                      <el-form-item label="活动名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="活动名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="选填信息" name="second">
        <div class="form-group">
      <div class="form-block">
        <div class="form-list">
          <el-form ref="ruleForm" label-width="140px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24">
                  <el-form-item label="区域" prop="name">
                  <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="详情地址" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                  <el-form-item label="性别" prop="name">
                  <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
              </el-col>
             <el-col :span="24">
                <el-form-item label="生日" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                  <el-form-item label="年龄段" prop="name">
                  <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="微信号" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
      </el-tab-pane>
    </el-tabs>
    <div class="opeartion">
      <div>
        <el-button class="submit_add">
          取消
        </el-button>
        <el-button class="submit">
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
      activeName2: 'first',
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
  methods: {
    handleClick (tab, event) {
    },
    handleChange (value) {
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.new{
  margin-top:-46px;
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
}
</style>
