<template>
  <div>
    <div class="addSpeed" @click="unusedSubmember">新增跟进进度</div>
    <el-dialog :visible.sync="importNew" width="30%" center>
      <div style="text-align:center;color:#333333;">新增跟进进度名称</div>
      <div style="text-align:center;margin:30px;color:#333333;">
        <span>跟进进度名称：</span>
        <el-input v-model="form.name" @input="getInputNum" autocomplete="off" class="speedSty" maxlength="8"
          placeholder="请输入跟进进度名称,最多8个字"></el-input>
        <span style="position:absolute;top:175px;right:65px;color: #909399;margin-right: 5px;">还可以输入{{allNum}}个字</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="getAddMemberFollowState">确 定</el-button>
      </span>
    </el-dialog>
    <div class="tagSty">
      <div class="custPubileSty speedTitle">
        <p>进度名称</p>
        <p>操作</p>
      </div>
      <!-- <div class="custPubileSty speedD">
                <span v-show="!isEdit">{{ node.followState }}</span>
                <div class="edit" v-show="isEdit">
                    <input type="text" @click.stop="() =>{}" v-model="node.label">
                    <el-button class="btn define" @click.stop="define(node,data)">确定</el-button>
                    <el-button class="btn cancel" @click.stop="cancel(node,data)">取消</el-button>
                </div>
                <div>
                    <p>下降</p>
                    <p @click.stop="edit(node,data)">编辑</p>
                    <p>删除</p>
                </div>
            </div> -->
      <!-- <div class="custPubileSty speedD">
                <span v-show="!isEdit">{{ node.followState }}</span>
                <div class="edit" v-show="isEdit">
                    <input type="text" @click.stop="() =>{}" v-model="node.label">
                    <el-button class="btn define" @click.stop="define(node,data)">确定</el-button>
                    <el-button class="btn cancel" @click.stop="cancel(node,data)">取消</el-button>
                </div>
                <div>
                    <p>上升</p>
                    <p>下降</p>
                    <p>编辑</p>
                    <p>删除</p>
                </div>
            </div> -->
      <div class="custPubileSty speedD" v-for="(item,index) in node" :key="index">
        <span v-show="!isEdit">{{ item.label }}</span>
        <span v-show="isEdit&&numIndex != index">{{ item.label }}</span>
        <div style="align-items:center;" class="edit" v-show="isEdit&&numIndex == index">
          <input maxlength="8" @input="getInpNum(index)" type="text" @click.stop="() =>{}" v-model="item.label">
          <el-button style="height:28px" class="btn define" @click.stop="define(item)">确定</el-button>
          <el-button style="height:28px" class="btn cancel" @click.stop="cancel">取消</el-button>
          <span style="color: #909399;margin-left: 10px;">最多输入8个字，还可以输入{{inpNum}}个字</span>
        </div>
        <div>
          <p v-if="index != 0" @click="upData(index)">上升</p>
          <p v-if="index != node.length -1" @click="downData(index)">下降</p>
          <!-- <p @click="edit(index)">编辑</p> -->
          <p @click="edit(item,index)">编辑</p>
          <p @click="getDeleteFollowState(index)">删除</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inpNum: 8,
        allNum: 8,
        importNew: false,
        isEdit: false,
        form: {
          name: '',
        },
        node: {
          id: "6279b462baa74e16b4c2b12ee0f54042",
          label: "正在跟进",
        },
        label: '',
        newIds: [],
        numIndex: ''
      }
    },
    mounted() {
      this.getFindFollowStatePage()
    },
    methods: {
      getInputNum() {
        var num = this.form.name.length
        this.allNum = 8 - num
      },
      getInpNum(index) {
        var num = this.node[index].label.length
        this.inpNum = 8 - num
      },
      getUpdateFollowState(index) {
        // let updata ={
        //     followStateId: this.node[index].id,
        //     followStateContext: '85555'
        // }
        // this.$api.getUpdateFollowState(updata).then(res=>{
        //     this.getFindFollowStatePage()
        // })
      },
      getDeleteFollowState(index) {
        let detail = {
          followStateId: this.node[index].id
        }
        console.log('this.node[index].id', detail);
        this.$api.getDeleteFollowState(detail).then(res => {
          if (res.code == 0) {
            this.$message.success('删除成功')
            this.getFindFollowStatePage()
            this.isEdit = false
          } else {
            this.$message.error('删除失败')
            this.isEdit = false
          }
        })
      },
      upData(index) {
        let a = [];
        for (let i = 0; i < this.node.length; i++) {
          a.push(this.node[i].id)
        }
        console.log('indexindexindexindexindex', index);
        // let b = JSON.stringify(a);
        let c = a.splice(index, 1).join('')
        let d = a.splice(index - 1, 0, c)
        let e = JSON.stringify(a);
        let List = {
          ids: e,
          pageNum: 1,
          pageSize: 10
        }

        this.$api.getUpdateFollowStateOrder(List).then(res => {
          if (res.code == 0) {
            this.$message.success('上升成功')
            this.getFindFollowStatePage()
            this.isEdit = false
          } else {
            this.$message.error('上升失败')
            this.isEdit = false
          }
        })
      },
      downData(index) {
        let a = [];
        for (var i = 0; i < this.node.length; i++) {
          a.push(this.node[i].id)
        }
        console.log('indexindexindexindexindex', index);
        let c = a.splice(index, 1).join('')
        let d = a.splice(index + 1, 0, c)
        let e = JSON.stringify(a);
        let List = {
          ids: e,
          pageNum: 1,
          pageSize: 10
        }
        this.$api.getUpdateFollowStateOrder(List).then(res => {
          if (res.code == 0) {
            this.$message.success('下降成功')
            this.getFindFollowStatePage()
            this.isEdit = false
          } else {
            this.$message.error('下降失败')
            this.isEdit = false
          }
        })
      },
      getFindFollowStatePage() {
        let storeIdWeb = localStorage.getItem('storeIdWeb')
        let pages = {
          pageNum: 1,
          pageSize: 10,
          storeId: storeIdWeb
        }
        this.$api.getFindFollowStatePage(pages).then(res => {
          this.node = res.data
        })
      },
      getAddMemberFollowState() {
        console.log('进度名称============》' + this.form.name )
        if (this.form.name == ""|| this.form.name.trim()  == null || this.form.name.trim() === "") {
            this.$message.error('创建的进度名称不可为空,请重新命名')
            return;
        }
        this.allNum = 8 - this.form.name.length
        let followState = {
          followState: this.form.name
        }
        let flag = 0;
        for (let i = 0; i < this.node.length; i++) {
          console.log('11111111111', this.node[i].followState);
          if (this.form.name == this.node[i].followState) {
            this.$message.error('创建的进度名称已存在,请重新命名')
            flag = 1;
            return;
          } else if (this.form.name == "") {
            this.$message.error('创建的进度名称不可为空,请重新命名')
            flag = 1;
            return;
          }
        }
        if (flag == 0) {
          this.$api.getAddMemberFollowState(followState).then(res => {
            if (res.code == 0) {
              this.$message.success('添加成功')
              this.getFindFollowStatePage()
              this.form.name = ""
            } else {
              this.$message.error('添加失败')
              this.getFindFollowStatePage()
              this.form.name = ""
            }
            this.importNew = false
          })
        }
        // let followState = '55555'
        // this.$api.getAddMemberFollowState(followState).then(res=>{
        //     if(res.code == 0){
        //         this.$message.success('添加成功')
        //         this.getFindFollowStatePage()
        //     }else{
        //         this.$message.error('添加失败')
        //     }
        //     this.form.name = ""
        // })
        // this.importNew = false
      },
      unusedSubmember() {
        this.importNew = true,
        this.isEdit = false
      },
      handleClose() {
        this.importNew = false
        this.form.name = ""
        this.allNum = 8
      },
      edit(node, index) {
        this.inpNum = 8 - this.node[index].label.length
        this.isEdit = true
        this.numIndex = index
        console.log(this.numIndex);
      },
      cancel() {
        // console.log('this.$routethis.$route',this.$route);
        this.inpNum = 8
        this.isEdit = false
        this.form.name = ""
        this.getFindFollowStatePage()
        // if (this.$route.path === '/store/brandsManage') {
        //     const parent = node.parent
        //     const children = parent.data.children || parent.data
        //     let temp = 0
        //     children.forEach(el => {
        //     if (el.label === data.label) {
        //         temp += 1
        //     }
        //     })
        //     if (temp >= 2) {
        //     this.$message.error('同级目录下已存在相同品牌名称,请重新修改')
        //     } else {
        //     this.isEdit = false
        //     }
        // } else {
        //     this.isEdit = false
        // }
      },
      define(node) {
        this.inpNum = 8
        console.log('nodenodenode', node);
        let updata = {
          followStateId: node.id,
          followStateContext: node.label
        }
        let flag = 0;
        for (let i = 0; i < this.node.length; i++) {
          console.log('11111111111', this.node[i].followState);
          if (node.label == this.node[i].followState) {
            this.$message.error('创建的进度名称已存在,请重新命名')
            flag = 1;
            return;
          } else if (node.label == "") {
            this.$message.error('创建的标签名称不可为空,请重新命名')
            flag = 1;
            return;
          }
        }
        if (flag == 0) {
          this.$api.getUpdateFollowState(updata).then(res => {
            if (res.code == 0) {
              this.$message.success('编辑成功')
              this.getFindFollowStatePage()
              this.isEdit = false
            } else {
              this.$message.error('编辑失败')
              this.isEdit = false
            }
          })
        }

      }

    }
  }

</script>

<style lang="scss" scoped>
  @import '../../../assets/style/mixins/var';

  .addSpeed {
    width: 137px;
    height: 34px;
    background: rgba(111, 173, 236, 1);
    opacity: 1;
    border-radius: 5px;
    color: #ffffff;
    line-height: 34px;
    text-align: center;
    font-size: 14px;
    float: right;
    margin: 10px 0 36px;
    cursor: pointer;
  }

  .tagSty {
    clear: both;
  }

  .custPubileSty {
    height: 60px;
    width: 100%;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 15px;
  }

  .speedTitle {
    background-color: #F8F8F8;
    color: #7E7E7E;
  }

  .speedD {
    color: #333333;
    border-bottom: 1px solid #E4E7EC;
  }

  .speedD div {
    display: flex;
  }

  .speedD div p {
    color: #FD4343;
    margin: 0 10px;
    cursor: pointer;
    font-weight: 400;
  }

  .speedSty {
    width: 280px;
  }

  .el-button--primary {
    margin-left: 30px;
  }

  // .edit{
  //     input[type='text']{
  //         border:1px solid $input-border-color;
  //         height:28px;
  //         border-radius: 4px;
  //         font-size: $xs-size;
  //         width:180px;
  //         padding-left:4px;
  //         margin-right: 4px;
  //     }
  //     .btn{
  //         padding:7px 12px;
  //         &.define{
  //         border-color: $main-color;
  //         color:#FFF;
  //         background-color: $main-color;
  //         }
  //         &.cancel{
  //         border-color: $input-border-color;
  //         color:$text-main-color;
  //         margin-left: 4px;
  //         }
  //     }
  // }
  .edit {
    input[type='text'] {
      border: 1px solid $input-border-color;
      height: 28px;
      border-radius: 4px;
      font-size: $xs-size;
      width: 180px;
      padding-left: 4px;
      margin-right: 4px;
    }

    .btn {
      padding: 7px 12px;

      &.define {
        border-color: $main-color;
        color: #FFF;
        background-color: $main-color;
      }

      &.cancel {
        border-color: $input-border-color;
        color: $text-main-color;
        margin-left: 4px;
      }
    }
  }

</style>
