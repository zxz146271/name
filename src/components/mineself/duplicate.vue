<template>
   <div class="contains">
       <!-- <el-button type="text" @click="centerDialogVisible = true">复制到品牌</el-button> -->
            <el-dialog
            title="复制到品牌"
            :visible.sync="flag"
            width="400px"
            center
            :size="400"
            @close="cancel"
            >
            <el-row class="contains-copy">
                <el-col :span="24" class="countt">内容名称：{{item.headline}} </el-col>
                <el-col :span="24" class="count">内容编号：{{item.contentId}}</el-col>
            </el-row>
            <div class="contains-list">
                <!-- <div class="lit-top">
                        <span class="lit-box"></span>
                       <span class="lit-tit">选择复制的门店</span>
                        <el-select v-model="storeId" placeholder="请选择复制的门店" class="v-select" @change="selectStore">
                           <el-option
                              v-for="item in allStoreList"
                              :key="item.storeId"
                              :label="item.storeName"
                              :value="item.storeId"
                              >
                           </el-option>
                        </el-select>
                    </div> -->
                    <div class="lit-top">
                      <span class="lit-box"></span>
                      <span class="lit-tit">选择品牌系列</span>
                      <div>
                        <el-cascader
                        class="v-select"
                        expand-trigger="hover"
                        :options="allBrandList"
                        v-model="selectedBrandList"
                        @change="selectedBrand"
                        style="width:236px;display: inline-block;">
                      </el-cascader>
                      </div>
                    </div>
            </div>
            <span slot="footer" class="dialog-footer">
               <el-button class="cancel" @click="cancel">取 消</el-button>
               <el-button type="primary" @click="confirm">确 定</el-button>
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
      value: '',
      // allStoreList: [],
      allBrandList: [],
      brandList: [],
      storeId: '',
      selectedBrandList: []
    }
  },
  props: ['copyflag', 'item'],
  components: {},
  methods: {
    selectedBrand () {
      console.log(this.selectedBrandList)
    },
    // selectStore () {
    //   this.getCopyToStoreBrandList()
    // },
    // getCopyToStoreAllStore () {
    //   this.$api.copyToStoreAllStore({}).then(res => {
    //     this.allStoreList = res.data
    //   })
    // },
    getCopyToStoreBrandList () {
      this.$api.getContentBrandList().then(res => {
        this.allBrandList = res.data
        this.setBrandValue(this.allBrandList)
      })
    },
    setBrandValue (list) {
      for (let i = 0; i < list.length; i++) {
        let element = list[i]
        element.value = element.id
        element.label = element.label
        if (element.hasOwnProperty('children')) {
          this.setBrandValue(element.children)
        }
      }
    },
    cancel (data) {
      this.selectedBrandList = []
      this.$emit('cancelcopy', false)
    },
    confirm () {
      let arr = []
      arr.push(this.item.contentId)
      let params = {
        contentIds: JSON.stringify(arr),
        copyType: 'store'
      }
      this.$api.findRepeatContentById(params).then(res => {
        this.$emit('confirmcopy', false)
        if (res.data !== null && res.data.length === 1) {
          this.confirmInformation(this.item.contentId)
        } else {
          this.confirmationCopy(true, this.selectedBrandList)
        }
      })
    },
    confirmInformation (contentId) {
      let selectedBrandLists = this.selectedBrandList
      this.$confirm('编号为' + contentId + '内容已复制过,是否需要再次复制？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '继续复制',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.confirmationCopy(true, selectedBrandLists)
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: '取消复制'
          })
        })
    },
    confirmationCopy (copyflag, selectedBrandLists) {
      let arr = []
      arr.push(this.item.contentId)
      let params = {
        contentIds: JSON.stringify(arr),
        copyType: 'store',
        bandId: selectedBrandLists[selectedBrandLists.length - 1],
        allBrandId: JSON.stringify(selectedBrandLists),
        copyFlag: copyflag
      }
      this.$api.copyToStore(params).then(res => {
        if (res.code === 0) {
          if (res.data.msgVoListo[0].importFlag === 'E') {
            this.$message.error(res.data.msgVoListo[0].importMsg)
          } else {
            this.$message.success('复制成功')
          }
        } else {
          this.$message.error('复制失败')
        }
      })
      this.selectedBrandList = []
    }
  },
  computed: {
  },
  mounted () {
    this.getCopyToStoreBrandList()
    this.flag = this.$props.copyflag ? true : false
  },
  watch: {
    copyflag (n) {
      console.log('改变', n)
      this.flag = n ? true : false
    },
    item: {
      handler (newV, oldV) {
        console.log(newV)
        console.log(oldV)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.contains-copy{
    position: absolute;
    top: 58px;
    left: 35px;
    border-top:1px dashed #C0C4CC;
    width: 90%;
}
.count{
    height: 25px;
    line-height: 25px;
    color:#909399;
    font-size: 14px;
}
.countt{
    height: 40px;
    line-height: 40px;
    color:#909399;
    font-size: 14px;
}
.contains-list{
    padding: 38px 33px 0 33px;
}
.lit-top{
    margin: 24px 0 10px 0;
    position: relative;
}
.lit-box{
    display: inline-block;
    width:7px;
    height:7px;
    background:#AAAAAA;
    border-radius:50%;
    position: absolute;
    top: 6px;
}
.lit-tit{
    padding: 0 0 0 15px;
}
.v-select{
   margin-top: 10px;
   margin-left: 15px;
}
.cancel{
   margin-right: 60px;
}
</style>
