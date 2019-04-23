<template>
    <div class="case-edit" >
      <!--  这个在上面的标签case-edit里面-->
      <div class="caseBox" v-if="type === 'text'">
        <div class="casedetail">
        <div class="casetitle">文本</div>
        <div class="casetitle-bottom">
          <div class="casetitle-txt">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="文本:" prop="desc" style="margin-left: 0;'">
                <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="text" resize="none" style="width:251px;" @change="inputChange">
                </el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="casetitle-bot">
            <div class="caseaize">
              <span class="casetitler ">字体大小：</span>
              <el-select v-model="size" filterable allow-create default-first-option placeholder="0" size="small"
              style="width:66px;" @change="sizeChange">
              <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
              </el-select> &nbsp;px
            </div>
          <!-- class="spe-text" -->
            <div class="textcolor">
              <span class="casetitler">字体颜色：</span>
              <div class="block spe-text">
              <el-color-picker v-model="color" size="mini" @change="colorChange"></el-color-picker>
            </div>
          </div>
          <div>
            <span class="casetitler">字体加粗：</span>
            <span class="overstriking spe-text" :style="weight == 'bold' ? 'color: #FE4343': 'color: #000'" @click="changeBlod">B</span>
          </div>
          <div>
            <span class="casetitler">显示位置：</span>
            <el-radio v-model="align" label="left" class="spe-text" @change="alignChange">居左</el-radio>
            <el-radio v-model="align" label="center" @change="alignChange">居中</el-radio>
            <el-radio v-model="align" label="right" @change="alignChange">居右</el-radio>
          </div>
          <div class="posiotionWrapper">
            <span class="title">移动位置：</span>
            <div class="posiotion" @click="moveUp">
              <img :src="top" alt="">
              <span class="position-text">上移</span>
            </div>
            <div class="posiotion" @click="moveDown">
              <img :src="bottom" alt="">
              <span class="position-text">下移</span>
            </div>
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
</template>

<script>
import top from '../../../static/image/edit-top.png'
import bottom from '../../../static/image/edit-bottom.png'
export default {
  data () {
    return {
      top,
      bottom,
      type:'',
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
      text:'',
      size:'14',
      align: 'left',
      weight: 'normal',
      color:'#000000'
    }
  },
  watch: {
    text (v) {
      this.textChange()
    }
  },
  mounted () {
    this.type = this.block.type
    this.text = this.block.content.text
    this.size = this.block.content.size? this.block.content.size:'14'
    this.align = this.block.content.align? this.block.content.align:'left'
    this.weight = this.block.content.weight? this.block.content.weight:'normal'
    this.color = this.block.content.color? this.block.content.color:'#000000'
  },
  props:['block', 'index'],
  methods:{
    moveUp () {
      this.$emit('moveUp')
    },
    moveDown () {
      this.$emit('moveDown')
    },
    changeBlod(){
      if(this.weight == 'normal'){
        this.weight = 'bold'
      } else {
        this.weight = 'normal'
      }
      this.textChange()
    },
    sizeChange (val) {
      this.textChange()
    },
    alignChange (val) {
      this.textChange()
    },
    colorChange (val) {
      this.textChange()
    },
    inputChange (val) {
      this.textChange()
    },
    textChange () {
      let text = {}
      // this.text = this.text.replace(/ /g, '&nbsp;');
      console.log(this.text)
      text.text = this.text
      text.size = this.size
      text.align = this.align
      text.weight = this.weight
      text.color = this.color
      this.$emit('textChange',text)
    },
    clickContent(){
      if(this.block.show){
        this.block.show = !this.block.show;
      }else{
        this.block.show = true;
      }
    },
    // 点击保存消失
    savetext() {
      if(this.text){
        this.$emit('closeEdit')
      }else{
        this.$message.error("请输入添加的文本")
        return false
      }
    },
    // 点击取消
    canceltext(){
        this.$emit("success", this.index);
    },
  }
}
</script>

<style scoped>
/* 装内容的大盒子的高度固定 */
  .box-case-show{
      /* height: 440px; */
      margin-bottom: 10px;
      overflow-Y: auto;
  }
  .case-show{
    padding: 10px 20px 10px 24px;
  }
  .caseBox {
    width: 378px;
    height: 450px;
    position: absolute;
    left: 500px;
    top: 150px;
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
    /* border-bottom: 1px dashed #D9D9D9; */
  }
  .contains{
    display: block
  }
  .posiotionWrapper{
    height: 40px;
    display: flex;
  }
  .posiotionWrapper .title{
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    color: #303133;
  }
  .posiotion{
    display: flex;
    width: 50px;
    height: 40px;
    justify-content: space-around;
    align-items: center;
    margin-left: 5px;
    margin-right: 10px;
  }
  .posiotion img{
    width: 10px;
    height: 11px;
  }
  .posiotion-text{
    display: block;
    width:28px;
    height:20px;
    font-size:14px;
    font-family:Source Han Sans SC;
    font-weight:400;
    line-height:14px;
    color:rgba(48,49,51,1);
  }
  
</style>


  