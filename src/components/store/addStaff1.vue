<template>
  <div class="comm-edit">
    <div class="form-group">
      <div class="form-block">
         <div class="form-list">
          <el-form :model="staff" :rules="rules" ref="staff" label-width="120px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="员工ID" prop="staffId" v-show="false" >
                  <el-input v-model="staff.staffId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="员工姓名" prop="staffName">
                  <el-input v-model="staff.staffName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="staff.mobile" :plain="true"  :disabled=flag3></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="微信号" prop="weChat">
                  <el-input v-model="staff.weChat" :plain="true" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="角色" prop="roleCodes">
                  <el-checkbox-group v-model="staff.roleCodes">
                    <el-row :gutter="24">
                       <el-col :span="8" v-for="(item,index) in roleData" :key="index" :item="item">
                         <el-checkbox  :label="item.roleCode" v-if="item.roleCode !== 'ADMIN' && item.roleCode !== 'PLANNING' && item.roleCode !== 'STORE_MANAGER'">{{item.roleName}}</el-checkbox>
                         <el-checkbox  :label="item.roleCode" v-else disabled>{{item.roleName}}</el-checkbox>
                       </el-col>
                    </el-row>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="24" >
                <el-form-item label="门店" v-if="flag2">
                  <el-select v-model='staff.storeId'  placeholder="请选择" >
                    <el-option  multiple='false' v-for="item in storeData" :key="item.storeId" :label="item.storeName" :value="item.storeId"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item v-else>
              </el-form-item>
              </el-col> -->
             <el-col :span="24">
                 <el-form-item label="状态"  prop="state">
                  <el-radio-group v-model="staff.state">
                    <el-radio label="0">正常</el-radio>
                    <el-radio label="1">离职</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="opeartion">
        <div>
          <el-button class="submit_add" @click="cancel('staff')">
            取消
          </el-button>
          <el-button class="submit" @click="submit('staff')" :loading="loading">
            {{loading? '提交中':'提交'}}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import breadCrumb from '../../components/public/breadcrumb'
import topTips from '../../components/public/topTips'
export default {
  data () {
    return {
      loading: false,
      staff: {
        staffName: '',
        mobile: '',
        delivery: false,
        state: '0',
        storeId: '',
        staffId: '',
        staffCode: '',
        weChat: '',
        distributorId: '',
        roleList: [],
        roleCodes: []
      },
      storeData: [],
      roleData: [],
      flag: true,
      rules: {
        staffName: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请选择输入电话号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
        ],
        roleCodes: [
          { type: 'array', required: true, message: '请至少选择一个员工角色', trigger: 'change' }
        ],
        state: [
          { required: true, message: '请选择员工状态', trigger: 'change' }
        ],
        weChat: [
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'change' }
        ]

      },
      roleList: [],
      flag2: true,
      flag3: false,
      storevo: {
        state: ''
      },
      role: {
        state: '0'
      }
    }
  },
  created () {
    this.getStRoleList()
    this.getStStoreList()
    if (this.type === 'change') {
      this.initData()
    }
  },
  watch: {
    staffID () {
      this.initData()
    },
    'staff.mobile' () {
      if (this.staff.mobile.length === 11) {
        this.findMobile(this.staff.mobile)
      }
    }
  },
  methods: {
    // 查询所有角色信息
    getStRoleList () {
      var _this = this
      let params = {
        page: 1,
        limit: 0,
        stStaffRole: this.role
      }
      this.$api.getStRoleList(params).then(res => {
        _this.roleData = res.data
      })
    },
    // 关闭 编辑取消上次编辑信息
    cleanFrom () {
      this.$refs['staff'].resetFields()
      this.staff.weChat = ''
    },
    // 选择角色
    // chang () {
    //   // if (value === '企划' || value === '公众号运维' || value === '管理员') {
    //   //   this.flag2 = false
    //   // } else {
    //   //   this.flag2 = true
    //   // }
    //   for (let index = 0; index < this.staff.roleCodes.length; index++) {
    //     if (this.staff.roleCodes[index] === 'STORE_MANAGER' || this.staff.roleCodes[index] === 'SHOPPING_GUIDE') {
    //       this.flag2 = true
    //       return
    //     }
    //     this.staff.storeId = ''
    //     this.flag2 = false
    //   }
    // },
    // 查询所有门店信息
    getStStoreList () {
      let params = {
        page: 1,
        limit: 0,
        storevo: this.storevo
      }
      this.$api.getStStoreList(params).then(res => {
        this.storeData = res.data
      })
    },
    // 根据员工id查询员工信息
    initData () {
      let params = {
        staffId: this.staffID.staffId
      }
      this.$api.stStaffgetDetailById(params).then(res => {
        this.staff = res.data
        this.roleList = []
        this.flag3 = true
        var roleCodes = res.data.roleCode.split(',')
        roleCodes.forEach(element => {
          this.staff.roleCodes.push(element)
        })
      })
    },
    // 保存新增员工
    submit (staff) {
      // 保存表单校验结果
      this.$refs[staff].validate((valid) => {
        // 判断校验结果中是否存在false值
        if (valid) {
          this.loading = true
          let params = {
            staffId: this.staff.staffId,
            staffName: this.staff.staffName,
            mobile: this.staff.mobile,
            state: this.staff.state,
            roleCodes: this.staff.roleCodes,
            // storeId: this.staff.storeId,
            weChat: this.staff.weChat,
            distributorId: this.staff.distributorId,
            staffCode: this.staff.staffCode
          }
          if (this.staff.staffId === null || this.staff.staffId === '') {
            if (this.flag) {
              this.loading = false
              this.$message.error('该手机号已存在,请重新输入')
            } else {
              this.$api.addSaveStStaff(params).then(res => {
                if (res.code === 0) {
                  // 成功返回列表页面
                  this.$refs[staff].resetFields()
                  this.staff.weChat = ''
                  this.loading = false
                  this.$emit('refresh')
                  this.$message({
                    message: '新增员工成功',
                    type: 'success'
                  })
                } else {
                  // 失败提示
                  this.loading = false
                  this.$message.error(res.msg)
                  this.$refs[staff].resetField()
                }
              })
            }
          } else {
            this.$api.editSaveStStaff(params).then(res => {
              if (res.code === 0) {
                // 成功返回列表页面
                this.loading = false
                this.$emit('refresh')
                this.staff.weChat = ''
                this.$message({
                  message: '修改员工成功',
                  type: 'success'
                })
              } else {
                // 失败提示
                this.loading = false
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          this.$message.error('请按要求填写页面红色标注必填项')
        }
      })
    },
    // 取消新增
    cancel (staff) {
      // this.$refs[staff].resetFields()
      this.staff.staffName = ''
      this.staff.mobile = ''
      this.staff.roleCodes = []
      this.staff.storeId = ''
      this.staff.weChat = ''
      this.$emit('cancel')
    },
    findMobile (mobile) {
      if (this.staffID == null) {
        let params = {
          mobile: mobile
        }
        this.$api.findMobile(params).then(res => {
          if (res.code === 0) {
            this.flag = true
            this.$message.error('该手机号已存在,请重新输入')
          } else {
            // 失败提示
            this.flag = false
          }
        })
      }
    }
  },
  props: ['staffID', 'type'],
  components: {breadCrumb, topTips}
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.form-list{
  margin-top:35px;
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
.el-row{
  .el-row{
    margin-left: 0!important;
    .el-col-8{
      padding-left: 0!important;
    }
  }
}
</style>
