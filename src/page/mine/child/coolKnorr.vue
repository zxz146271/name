<template>
    <div class="coolknorr">
        <div class="bound" v-if="coolInfo.isBinded == 'unbinded'">
            <h2>尚未绑定酷家乐账号</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="酷家乐邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="btn-bound" @click="bound('ruleForm')">绑定</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="bound" v-else>
            <h2>已绑定酷家乐账号</h2>
            <p><span>酷家乐邮箱:</span><span>{{coolInfo.email}}</span></p>
        </div>
        
    </div>
</template>
<script>
export default {
    data () {
        var checkEmail = (rule, value, callback) => {
            const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
            if (!value) {
                return callback(new Error('邮箱不能为空'))
            }
            setTimeout(() => {
                if (mailReg.test(value)) {
                    callback()
                } else {
                    callback(new Error('请输入正确的邮箱格式'))
                }
            }, 100)
        }
        return {
            rules: {
                email: [
                    { validator: checkEmail, trigger: 'blur' },
                ]
            },
            coolInfo: {},
            ruleForm:{
                email:'',
                avatar:'https://static-oss.muyusi.com/vueStatic/home2/no-avatar.png',
                stStaffBindKujialeId:''
            }
        }
    },
    mounted() {
        this.getBoundInfo()
    },
    methods: {
        bound(formName) {
            let params = this.ruleForm
            console.log(params)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.kujialeBinding(params).then(res => {
                        console.log("fanhui-----",res)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getBoundInfo(){
            this.$api.bindKujiale().then(res => {
                if (res.code === 0) {
                    this.coolInfo = res.data
                    this.ruleForm.stStaffBindKujialeId = res.data.id
                } 
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.coolknorr{
    padding: 0 32px;
    .bound{
        h2{
            font-size: 28px;
            color:rgba(0,0,0,0.85);
            font-weight:400;
            margin: 26px auto;
        }
        .demo-ruleForm{
            width: 50%;
        }
        .btn-bound{
            display: inline-block;
            padding: 0 30px;
            border:1px solid #D9D9D9;
            border-radius:4px;
            font-size:18px;
            color: #FE4343;
            margin-top: 25px;
            cursor: pointer;
            &.btn-bound:hover{
                background: #FE4343;
                color: #fff;
            }
        }
        p{
            font-size: 16px;
            color:rgba(0,0,0,0.85);
            font-weight: 400;
            margin-top: 30px;
        }
    }
}
</style>
