<template>
  <div>
    <div class="coll-list">
      <div class="addSpeed" @click="unusedSubmember">新增用户标签</div>
      <el-dialog :visible.sync="importNew" width="30%" center>
        <div style="text-align:center;color:#333333;">新增用户标签名称</div>
        <div style="text-align:center;margin:30px;color:#333333;">
          <span>用户标签名称：</span>
          <el-input v-model="form.name" @input="getInputNum" autocomplete="off" maxlength="5" class="speedSty"
            placeholder="请输入用户标签名称，最多可输入5个字"></el-input>
          <span style="position:absolute;top:175px;right:65px;color: #909399;margin-right: 5px;">还可以输入{{allNum}}个字</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="getAddCustomerLabel">确 定</el-button>
        </span>
      </el-dialog>
      <!-- <el-tree :data="treeList"  show-checkbox node-key="id"  ref="tree" @node-click="nodeClick" :expand-on-click-node="false" :default-expanded-keys="[1]"> -->
      <el-tree style="clear:both;" :data="customerLabel" node-key="id" ref="tree" :filter-node-method="filterNode"
        :expand-on-click-node="false" default-expand-all>
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <save-tag @getUpdateLabelType="getUpdateLabelType" :node="node" :data="data" @appendTree="appendTree"
            @deleteTree="deleteTree" @editTree="editTree(node,data)"></save-tag>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
  import saveTag from '@/components/public/saveTag'
  export default {
    data() {
      return {
        allNum: 5,
        importNew: false,
        customerLabel: [],
        form: {
          name: '',
        },
      }
    },
    components: {
      saveTag
    },
    mounted() {
      this.getCustomerList();
    },
    methods: {
      getInputNum() {
        var num = this.form.name.length
        this.allNum = 5 - num
      },
      getUpdateLabelType(node, data) {
        let params = {
          id: node.id,
          labTypeName: node.label
        }
        console.log('nodenodenode', node);
        let flag = 0;
        console.log('node.children.label', node.label);
        if (node.label == "") {
          this.$message.error('创建的标签名称不可为空,请重新命名')
          flag = 1;
          return;
        }
        if (flag == 0) {
          this.$api.getUpdateLabelType(params).then(res => {
            if (res.code == 0) {
              this.$message.success('编辑成功')
            } else if (res.code != 0) {
              this.$message.error('编辑失败')
            }
          })
        }

      },
      // getDeleteLabelType(node, data){
      //     let params = {
      //         id: node.id,
      //     }
      //     this.$api.getDeleteLabelType(params).then(res=>{
      //         console.log('getUpdateLabelSavegetUpdateLabelSave',res);
      //     })
      // },
      unusedSubmember() {
        this.importNew = true
      },
      handleClose() {
        this.importNew = false
        this.form.name = ""
        this.allNum = 5
      },
      edit(node, data) {
        this.isEdit = true
      },
      getCustomerList() {
        this.$api.getDetailCustomerLabel().then(res => {
          if (res.code == 0) {
            res.data.forEach(item => {
              item.type = 1;
            });
            this.customerLabel = res.data
          }
        })
      },
      getAddCustomerLabel() {
        if (this.form.name == ""|| this.form.name.trim()  == null || this.form.name.trim() === "") {
            this.$message.error('创建的标签名称不可为空,请重新命名')
            return;
        }
        this.allNum = 5 - this.form.name.length
        let labName = {
          labTypeName: this.form.name
        }
        console.log('this.customerLabel.length', this.form.name);
        let flag = 0;
        for (let i = 0; i < this.customerLabel.length; i++) {
          console.log('11111111111', this.customerLabel[i].labTypeName);
          if (this.form.name == this.customerLabel[i].labTypeName) {
            this.$message.error('创建的标签名称已存在,请重新命名')
            flag = 1;
            return;
          }
        }
        if (flag == 0) {
          this.$api.getAddCustomerLabel(labName).then(res => {
            if (res.code == 0) {
              this.$message.success('添加成功')
              this.getCustomerList()
              this.form.name = ""
              this.importNew = false
            } else {
              this.$message.error('添加失败')
              this.importNew = false
              this.getCustomerList()
              this.form.name = ""
            }
          })
        }
        // for (let i = 0; i < this.customerLabel.length; i++) {
        // if(this.form.name != this.customerLabel[i].labTypeName){
        //       console.log('不等于');
        //     this.$api.getAddCustomerLabel(labName).then(res => {
        //       if (res.code == 0) {
        //         this.$message.success('添加成功')
        //         this.getCustomerList()
        //         this.form.name = ""
        //         this.importNew = false
        //       } else {
        //         this.$message.error('添加失败')
        //         this.importNew = false
        //         this.getCustomerList()
        //         this.form.name = ""
        //       }
        //     })
        //     return
        //   }
        // }

      },
      append() {
        console.log(12323);
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      appendTree(data) {
        let temp = 1
        if (data.children) {
          temp += data.children.length
        }
        let params = {
          labTypeId: data.id,
          labName: '标签' + temp
        }
        this.$api.getAddLabelSave(params).then(res => {
          if (res.code === 0) {
            const newChild = {
              id: res.data,
              label: '标签' + temp,
              children: []
            }
            if (!data.children) {
              this.$set(data, 'children', [])
            }
            data.children.push(newChild)
            this.getCustomerList();
            this.$message.success('添加标签成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      deleteTree(params) {
        if (params.data.label === '全部品牌') {
          // 根节点不能删除
          this.$message.error('根节点不能删除')
        } else {
          let delDatas = []
          let delData = {
            brandId: params.data.id,
            versionNo: ''
          }
          delDatas.push(delData)
          let param = {
            jsonData: JSON.stringify(delDatas)
          }
          const parent = params.node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.id === params.data.id)
          if (children[index].children) {
            if (children[index].children.length > 0) {
              this.$message.error('请先删除子品牌')
            } else {
              // this.$api.deleteBrandById(param).then(res => {
              // if (res.code === 0) {
              //     children.splice(index, 1)
              //     // 成功提示
              let param = {
                id: params.data.id,
              }
              this.$api.getDeleteLabelType(param).then(res => {
                if (res.code == 0) {
                  this.$message.success('删除成功')
                  this.getCustomerList()
                } else {
                  this.$message.error('删除失败')
                }
              })
              // console.log('字标签删除1');
              //     this.$message.success('删除成功')
              // } else {
              //     // 失败提示
              //     this.$message.error(res.msg)
              // console.log('字标签删除1');
              // }
              // })
              // }
            }
          } else {
            let param = {
              id: params.data.id,
            }
            this.$api.getDeleteLabelSave(param).then(res => {
              if (res.code === 0) {
                children.splice(index, 1)
                //成功提示
                console.log('字标签删除2');
                this.$message.success('删除成功')
              } else {
                // 失败提示
                this.$message.error(res.msg)
                console.log('字标签删除2');
              }
            })
          }
        }
      },
      // deleteTree (params) {
      //     if (params.data.label === '全部品牌') {
      //         // 根节点不能删除
      //         this.$message.error('根节点不能删除')
      //     } else {
      //         let delDatas = []
      //         let delData = { brandId: params.data.id, versionNo: '' }
      //         delDatas.push(delData)
      //         let param = {
      //         jsonData: JSON.stringify(delDatas)
      //         }
      //         const parent = params.node.parent
      //         const children = parent.data.children || parent.data
      //         const index = children.findIndex(d => d.id === params.data.id)
      //         if (children[index].children) {
      //         if (children[index].children.length > 0) {
      //             this.$message.error('请先删除子品牌')
      //         } else {
      //             this.$api.deleteBrandById(param).then(res => {
      //             if (res.code === 0) {
      //                 children.splice(index, 1)
      //                 // 成功提示
      //                 this.$message.success('删除成功')
      //             } else {
      //                 // 失败提示
      //                 this.$message.error(res.msg)
      //             }
      //             })
      //         }
      //         } else {
      //         this.$api.deleteBrandById(param).then(res => {
      //             if (res.code === 0) {
      //             children.splice(index, 1)
      //             // 成功提示
      //             this.$message.success('删除成功')
      //             } else {
      //             // 失败提示
      //             this.$message.error(res.msg)
      //             }
      //         })
      //         }
      //     }
      // },
      // 编辑标签系列
      editTree(node, data) {
        let params = {
          id: data.id,
          labName: node.data.label
        }
        let num = 0
        if (data.label == "") {
          this.$message.error('创建的标签名称不可为空,请重新命名')
          num = 1;
          return;
        }
        console.log('nodenodenode', data);
        if (num == 0) {
          this.$api.getUpdateLabelSave(params).then(res => {
            if (res.code == 0) {
              this.$message.success('编辑成功')
            } else {
              this.$message.error('编辑失败')
            }
          })
        }

      },
    }
  }

</script>

<style lang="scss" scoped>
  .coll-list {
    .custom-tree-node {
      flex: 1;
    }
  }

  .addSpeed {
    width: 137px;
    height: 34px;
    background: rgba(111, 173, 236, 1);
    // opacity:1;
    border-radius: 5px;
    color: #ffffff;
    line-height: 34px;
    text-align: center;
    font-size: 14px;
    float: right;
    margin: 10px 0 36px;
    cursor: pointer;
  }

  .speedSty {
    width: 280px;
  }

</style>
