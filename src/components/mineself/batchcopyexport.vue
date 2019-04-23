<template>
   <div class="contains">
            <el-dialog
            title="批量复制/导入"
            :visible.sync="flag"
            width="400px"
            center
            :size="400" @click = "gotoback">
            <div class="line"></div>
            <div class="contains-list">
                <div class="lit-top cricle">
                    <span class="lit-box"></span>
                    <p class="lit-tit">内容编号保存到</p>
                </div>
                <div class="radio">
                    <el-radio v-model="radio" label="personal" @change="brandChange" class="radio-cou">我的内容库</el-radio>
                    <el-radio v-model="radio" label="store" @change="brandChange" class="radio-cou">品牌内容库</el-radio>
                </div>
                <div  class="brandWrapper">
                  <el-col class="brand" v-if="isShowBrand">
                    <span class="preserlist common">品牌系列:</span>
                    <el-cascader
                      expand-trigger="hover"
                      :options="brandList"
                      v-model="selectedBrandList"
                      @change="selectedBrand"
                      style="width:236px;display: inline-block;">
                    </el-cascader>
                  </el-col>
                </div>
                <div class="lit-top cricle">
                    <span class="lit-box"></span>
                    <p class="lit-tit">内容编号（最多可填写50个）</p>
                </div>
                <div class="lit-bottom">
                    <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入1个或最多50个内容编号（多个以回车换行隔开，一行一个）"
                        v-model="textarea">
                    </el-input>
                    <input name="" type="text" style="width:200px; height:20px;" />
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
               <el-button @click="gotoback" class="cancel">取消</el-button>
               <el-button type="primary" @click="confirm">开始导入</el-button>
            </span>
            </el-dialog>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      flag: false,
      radio: 'personal',
      textarea: '',
      isShowBrand: false,
      brandList: [], // 品牌列表
      selectedBrandList: [],
      brandId: '',
      temp: '',
      finalText: ''
    }
  },
  components: {},
  props: {
    importflag: Boolean
  },
  methods: {
    checkIds () {
      let flag = true
      if (this.textarea.length >= 32) {
        this.finalText = this.textarea.split('\n')
        this.finalText.forEach((element, index) => {
          if (element.length !== 32) {
            flag = false
          }
        })
      } else {
        flag = false
      }
      if (!flag) {
        this.$message.error('内容编号格式不正确!')
      }
      return flag
    },
    brandChange (v) {
      if (v === 'personal') {
        this.isShowBrand = false
      } else if (v === 'store') {
        this.isShowBrand = true
      }
    },
    setBrandValue (list) {
      for (let i = 0; i < list.length; i++) {
        let element = list[i]
        element.value = element.id
        if (element.hasOwnProperty('children')) {
          this.setBrandValue(element.children)
        }
      }
    },
    // 选择品牌
    selectedBrand (value) {
      this.brandId = value[value.length - 1]
    },
    // 获取品牌列表
    getBrandList () {
      this.$api.getContentBrandList().then(res => {
        if (res.code === 0) {
          this.brandList = res.data
          this.setBrandValue(this.brandList)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    gotoback () {
      this.textarea = ''
      this.selectedBrandList = []
      this.$emit('cancelimport', false)
    },
    confirm () {
      if (this.checkIds()) {
        let params = {
          contentIds: JSON.stringify(this.finalText),
          copyType: this.radio
        }
        this.$api.findRepeatContentById(params).then(res => {
          if (res.data !== null && res.data.length === 1) {
            this.confirmInformation(res.data[0].superiorContentId, true)
          } else if (res.data.length > 1) {
            this.confirmInformation(res.data.length.toString(), false)
          } else {
            this.confirmationCopy(true, this.selectedBrandList)
          }
        })
      }
    },
    confirmInformation (parameter, flag) {
      let selectedBrandLists = this.selectedBrandList
      let msg = ''
      if (flag) {
        msg = '编号为' + parameter + '内容已复制过,是否需要再次复制？'
      } else {
        msg = '共' + parameter + '个内容已复制过,是否需要再次复制这' + parameter + '个内容？'
      }
      this.$confirm(msg, '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '继续复制',
        cancelButtonText: '全部取消',
        type: 'warning',
        center: true,
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false
      })
        .then(() => {
          this.confirmationCopy(true, selectedBrandLists)
        })
        .catch(action => {
          // if (action === 'cancel') {
          //   this.$emit('confirmimport', false)
          //   this.$message({
          //     type: 'info',
          //     message: '取消所有复制'
          //   })
          // } else {
          this.confirmationCopy(false, selectedBrandLists)
          // }
        })
    },
    confirmationCopy (copyFlag, selectedBrandLists) {
      if (this.checkIds()) {
        let params = {
          contentIds: JSON.stringify(this.finalText),
          copyType: this.radio,
          copyFlag: copyFlag
        }
        if (this.radio === 'store' && selectedBrandLists.length > 0) {
          params.bandId = selectedBrandLists[selectedBrandLists.length - 1]
          params.allBrandId = JSON.stringify(selectedBrandLists)
          this.textarea = ''
        }else if(this.radio === 'store' && selectedBrandLists.length <= 0){
          this.$message.error("请选择品牌系列")
          return false
        }
        this.$api.copyToStore(params).then(res => {
          if (res.code === 0) {
            this.$emit('confirmimport', false, true, res.data)
          } else {
            this.$emit('confirmimport', false)
          }
        })
      }
      this.selectedBrandList = []
    }
  },
  mounted () {
    this.getBrandList()
    this.flag = this.$props.importflag ? true : false
  },
  watch: {
    flag (v) {
      if (v === false) {
        this.$emit('cancelimport', false)
      }
    },
    importflag (n) {
      this.flag = n ? true : false
    }
  }
}
</script>

<style lang="scss" scoped>
.line{
  width: 90%;
  position: absolute;
  left: 0;right: 0;
  margin: 0 auto;
  top: 60px;
  border-top:1px dashed #C0C4CC;
}
.contains-list{
    padding: 0 34px;
    .lit-top{
      display: flex;
      flex-direction: row;
      margin:0 0 14px;
      clear: both;
      .lit-box{
        display: inline-block;
        width:7px;
        height:7px;
        background:#AAAAAA;
        border-radius:50%;
        margin-top: 5px;
        margin-right:8px;
      }
    }
    .radio{
      margin-bottom:14px;
    }
}
.cancel{
   margin-right: 60px;
}
</style>
