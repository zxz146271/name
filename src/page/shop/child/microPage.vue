<template>
  <div class="micropage">
    <!-- <div class="left-view">
      <left-condition :condition="condition"></left-condition>
    </div> -->
    <phone></phone>
    <div class="micropage-option">
      <p>双列商品模块</p>
      <div class="form-block">
        <div class="form-list">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="模块标题" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                  <p class="prompt">留空白则不显示标题</p>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="展示商品" prop="resource">
                  <el-radio-group v-model="ruleForm.resource">
                    <el-row :gutter="24">
                      <el-col :span="7">
                        <el-radio label="全部商品"></el-radio>
                      </el-col>
                      <el-col :span="10">
                        <el-radio label="按系列品牌筛选"></el-radio>
                      </el-col>
                      <el-col :span="7">
                        <el-radio label="按分类筛选"></el-radio>
                      </el-col>
                      <el-col :span="7">
                        <el-radio label="自选商品"></el-radio>
                      </el-col>
                    </el-row>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="选择系列品牌" prop="region">
                  <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
             <el-col :span="24">
                <el-form-item label="选择数量" prop="region">
                  <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
             <el-col :span="24">
                <el-form-item label="排列方式" prop="region">
                  <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="模块标题" prop="name">
                  <el-row :gutter="24">
                      <el-col :span="8">
                        <el-input v-model="ruleForm.name"></el-input>
                      </el-col>
                      <el-col :span="8">
                        <el-input v-model="ruleForm.name"></el-input>
                      </el-col>
                    </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="opeartion">
        <div>
          <el-button class="submit_add">
            取消
          </el-button>
          <el-button class="submit">
            发布
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import leftCondition from '../../../components/public/leftCondition'
import phone from '../../../components/shop/phone'
export default {
  data () {
    return {
      condition: [
        {
          type: 1,
          title: '微店首页设计  ',
          isActive: true,
          num: ''
        },
        {
          type: 2,
          title: '会员中心设计',
          isActive: false,
          num: ''
        },
        {
          type: 3,
          title: '店铺选择页设计',
          isActive: false,
          num: ''
        },
        {
          type: 4,
          title: '微积分商城首页',
          isActive: false,
          num: ''
        }
      ],
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
  computed: {
  },
  // 数据初始化方法
  mounted () {
  },
  methods: {
  },
  components: {leftCondition, phone}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.micropage {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .left-view {
    border: 1px solid $border-color;
    flex: 0 0 156px;
    padding: 10px 0 10px 36px;
    border-radius: 4px;
    height: 162px;
  }
  .micropage-option{
    width: 480px;
    border-radius: 4px;
    box-shadow: 0px 00px 5px rgba(0,0,0,0.3);
    border:1px solid $border-color;
    >p{
      padding: 14px 24px;
      font-size: $xlg-size;
      color:$text-main-color;
      font-weight: 700;
      background: $gray-color;
    }
      .form-list{
        margin-top:35px;
        padding: 0 60px 0 0;
        display: flex;
        justify-content: center;
      .form-title{
        width: 200px;
        position:absolute;
        color: $text-adorn-color;
        font-size: $xs-size;
        right: -200px;
        top: 0;
        padding-left:20px;
      }
      .prompt{
        font-size: $xs-size;
        color:$text-gray-color;
        line-height: 20px;
      }
      .el-col-24{
        .el-input-number{
          width:100%;
          line-height: 34px;
          .el-input-number__increase{
            line-height: 17px;
          }
        }
        .el-radio{
          margin-bottom: 5px;
        }
        .el-radio-group{
          padding-top: 10px;
        }
      }
      .upload-item{
        .el-form-item__content{
          line-height: 34px;
        }
      }
      .el-col-8{
        padding-left: 0!important;
      }
    }
    .opeartion{
      display: flex;
      justify-content: center;
      margin: 85px 0 50px 0;
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
</style>
