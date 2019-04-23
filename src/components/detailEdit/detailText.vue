<template>
    <div class="case-mainbox">
        <div class="box-case-show cases" @click="showEdit">
          
          <!-- 增加字段 --> <!-- 装添加的大内容的 -->
            <!-- <div class="cases">
                <el-row class="casebox" v-if="showinfor">
                  <el-col class="infor speinfor">案例详情区</el-col>
                  <el-col class="infor">插入下列组件，进行编辑</el-col>
                </el-row>
            </div> -->
          <!-- 结束增加字段 -->
            <div class="case-show"
                :style="
                'color:'+block.content.color+
                ';font-size:'+block.content.size+'px'+
                ';text-align:'+block.content.align+
                ';font-weight:'+block.content.weight"
                @click="clickContent"
                v-html="block.content.text.replace(/\r?\n/g, '<br />')"
                >
                <!-- {{block.type}} -->
                <!-- {{block.content.text}} -->
                <!-- 输入的文字 -->
            </div>
        </div>
        <!-- v-show="block.show"在下面的标签上 -->
        <div class="case-edit" >
           <!--  这个在上面的标签case-edit里面-->
            <div class="caseBox" v-if="showtext">
                <div class="casedetail">
                <div class="casetitle">文本</div>
                <div class="casetitle-bottom">
                    <div class="casetitle-txt">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="文本:" prop="desc" style="margin-left: 0;'">
                        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="block.content.text" resize="none" style="width:251px;">
                        </el-input>
                        </el-form-item>
                    </el-form>
                    </div>
                    <div class="casetitle-bot">
                    <div class="caseaize">
                        <span class="casetitler ">字体大小：</span>
                        <el-select v-model="block.content.size" filterable allow-create default-first-option placeholder="0" size="small"
                        style="width:66px;">
                        <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                        </el-select> &nbsp;px
                    </div>
                    <!-- class="spe-text" -->
                    <div class="textcolor">
                        <span class="casetitler">字体颜色：</span>
                        <div class="block spe-text">
                        <el-color-picker v-model="block.content.color" size="mini"></el-color-picker>
                        </div>
                    </div>
                    <div>
                        <span class="casetitler">字体加粗：</span>
                        <span class="overstriking spe-text" :style="block.content.weight == 'bold' ? 'color: #FE4343': 'color: #000'" @click="changeBlod">B</span>
                    </div>
                    <div>
                        <span class="casetitler">显示位置：</span>
                        <el-radio v-model="block.content.align" label="left" class="spe-text">居左</el-radio>
                        <el-radio v-model="block.content.align" label="center">居中</el-radio>
                        <el-radio v-model="block.content.align" label="right">居右</el-radio>
                    </div>
                    </div>
                </div>
                </div>
                <el-row class="light">
                <el-col :span="12">
                    <div class="grid-content bg-purple" @click="canceltext">取消</div>
                </el-col>
                <div class="cenline"></div>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light" @click="savetext">保存</div>
                </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "",
    data() {
      return {
        showtext:false,
        ruleForm: {
          desc: ''
          },
          rules: {
            desc: [
              { required: true, message: ' ', trigger: 'blur' }
            ]
          },
        options5: [{
          value: '12',
          label: '12'
        }, {
          value: '14',
          label: '14'
        }, {
          value: '16',
          label: '16'
        }, {
          value: '18',
          label: '18'
        }, {
          value: '20',
          label: '20'
        }, {
          value: '24',
          label: '24'
        }, {
          value: '28',
          label: '28'
        }, {
          value: '32',
          label: '32'
        }],
        value10: 0,
        mini: '100'
      };
    },
    components: {},
    props: [
      'block',
      "a"
    ],
    watch: {
      'block.content.text' (n) {
        this.block.content.text = this.block.content.text.replace(/ /g, '&nbsp;')
      }
    },
    mounted () {
      console.log(this.block)
    },
    methods: {
        changeBlod(){
            if(this.block.content.weight == 'normal'){
                this.block.content.weight = 'bold'
            } else {
                this.block.content.weight = 'normal'
            }
        },
        clickContent(){
            if(this.block.show){
                this.block.show = !this.block.show;
            }else{
                this.block.show = true;
            }
        },
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 点击保存消失
      savetext() {
        console.log(this.textarea);
        this.showtext=false;
      },
      // 点击取消
      canceltext(){
          // this.$emit("success", this.a);
      },
      showEdit () {
        this.$emit('showEdit')
      },
    }
  };

</script>

<style scoped>
/* 装内容的大盒子的高度固定 */
  .box-case-show{
      height: auto;
      overflow-Y: auto;
  }
  .case-show{
    padding: 8px 15px;
    line-height: 1.7;
    word-break:break-all;
  }
  .caseBox {
    width: 378px;
    height: 392px;
    position: absolute;
    left: 390px;
    top: 0px;
    border: 1px solid #E4E7ED;
    background: #FBFBFB;
  }

  .casedetail {
    padding: 13px 18px;
  }

  .casetitle {
    height: 32px;
    line-height: 32px;
    color: #FE4343;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px dashed #D9D9D9;
  }

  .casetitle-bottom {
    margin-top: 10px;
  }

  .casetitle-bot {
    padding-top: 130px;
  }

  .casetitle-txt {
    position: absolute;
    top: 57px;
    left: -9px;
  }

  .casetitler {
    width: 70px;
    height: 35px;
    line-height: 35px;
    text-align: right;
    color: #303133;
  }

  .sixbox {
    width: 20px;
    height: 18px;
    display: inline-block;
    color: #909399;
    border: 1px solid #D9D9D9;
  }

  .iptnum {
    width: 30px;
  }

  .light {
    width: 376px;
    height: 47px;
    line-height: 47px;
    border-top: 1px solid #E4E7ED;
    text-align: center;
    font-size: 16px;
    position: absolute;
    bottom: 0;
  }

  .bg-purple {
    color: #909399;
    cursor: pointer;
  }

  .bg-purple-light {
    color: #FE4343;
    cursor: pointer;
  }

  .el-textarea {
    margin-left: 11px;
  }

  .spe-text {
    margin-left: 5px;
  }

  .cenline {
    width: 1px;
    height: 29px;
    background: #E4E7ED;
    position: absolute;
    left: 195px;
    top: 8px;
  }

  .block {
    display: inline-block;
    position: absolute;
    top: 4px;
    left: 80px;
  }

  .textcolor {
    position: relative;
  }

  .overstriking {
    color: #303133;
    font-weight: bold;
    cursor: pointer;
  }

  .el-select {
    display: inline-block;
  }

  .caseaize {
    margin-bottom: 10px;
    color: #909399;
  }
  /* 增加字段 */
  .cases {
    min-height: 20px;
    /* border: 1px dashed #D9D9D9; */
    /* position: relative; */
  
  }
  .contains{
    display: block
  }
  
</style>
