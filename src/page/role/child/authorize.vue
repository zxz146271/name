<template>
  <div class="comm-Add">
    <div class="top">
      <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb>
    </div>
    <div class="form-group">
      <div class="form-block">
        <div class="form-list">
          <el-table
            ref="multipleTable"
            :data="serviceList"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              type="selection"
              prop="serviceId"
              width="55">
            </el-table-column>
            <el-table-column
              label="服务名称"
              align="center"
              prop="serviceName"
              >
              <template slot-scope="scope">{{ scope.row.serviceName }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="服务内容"
              align="serviceContent"
              >
              <template slot-scope="scope">{{ scope.row.serviceContent }}</template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="120"
              align="center"
              show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button size="mini" @click="authorize(scope.row)"  class="edit">授权</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
      <el-dialog
      :visible.sync="importNew"
        width="700px"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">权限选择</span>
          </div>
            <el-tree
              :data="menuTreeList"
              show-checkbox
              node-key="id"
              ref="tree"
              :default-checked-keys="defaultMenu">
            </el-tree>
              <div class="opeartion">
              <div>
                <el-button class="submit_add" @click="cancel()">
                  取消
                </el-button>
                <el-button class="submit" @click="commitRoleMemus()">
                  提交
                </el-button>
              </div>
              </div>
  </el-dialog>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
export default {
  components: { breadCrumb },
  data () {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      thisShow: false,
      importNew: false,
      roleId: '',
      serviceId: '',
      breadcrumbList: [
        { title: '角色管理', path: '/roleView' },
        { title: '角色服务', path: '' }
      ],
      necessary: {
        title: '角色服务',
        unfold: false
      },
      menuTreeList: [],
      serviceList: [],
      defaultMenu: [],
      authorMenus: [],
      multipleSelection: []
    }
  },
  mounted () {
    this.roleId = this.$route.params.roleId
    this.getAuthorServiceList()
  },
  methods: {
    getAuthorServiceList () {
      this.$api.getAuthorServiceList().then(res => {
        this.serviceList = res.data
      })
    },
    handleClose () {
      this.importNew = false
    },
    authorize (service) {
      this.importNew = true
      this.serviceId = service.serviceId
      let params = {
        roleId: this.roleId,
        serviceId: this.serviceId
      }
      this.$api.getServiceMenu(params).then(res => {
        this.menuTreeList = res.data.serviceMenuList
        this.defaultMenu = res.data.roleMenuList
      })
    },
    // 取消
    cancel () {
      this.$router.push({path: '/roleView/roleManage'})
    },
    commitRoleMemus () {
      let authorMenuList = this.$refs.tree.getCheckedNodes()
      if (authorMenuList !== '' && authorMenuList !== null && authorMenuList !== undefined) {
        for (var i = 0; i < authorMenuList.length; i++) {
          this.authorMenus.push(authorMenuList[i].id)
        }
      }
      let params = {
        roleId: this.roleId,
        serviceId: this.serviceId,
        authorMenuList: JSON.stringify(this.authorMenus)
      }
      this.$api.roleAuthor(params).then(res => {
        this.$router.push({path: '/roleView/roleManage'})
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.comm-Add {
  margin: 0 auto;
  padding-top: 106px;
  .top {
    .change-sort {
      text-align: center;
      margin-top: 16px;
      .sort {
        display: inline-block;
        margin: 0 8px;
        li {
          display: inline-block;
          &:nth-child(n + 2)::before {
            content: '>';
          }
        }
      }
      .change {
        padding: 5px 12px;
        color: $text-gray-color;
        &:hover {
          color: $main-color;
        }
      }
    }
  }
  .form-group {
    margin-top: 20px;
    .form-block {
      .people-detail {
        padding: 30px 0;
        ul {
          display: flex;
          li {
            flex: 1;
            margin-right: 5px;
            display: flex;
            font-size: $md-size;
            &:nth-child(1) {
              border-bottom: 2px solid $text-red-color;
              span {
                background-image: url('../../../assets/image/i-bg4@2x.png');
              }
              p {
                color: $text-red-color;
              }
            }
            &:nth-child(2) {
              border-bottom: 2px solid $yello-color;
              span {
                background-image: url('../../../assets/image/i-bg3@2x.png');
              }
              p {
                color: $yello-color;
              }
            }
            &:nth-child(3) {
              border-bottom: 2px solid $adorn-color-2;
              span {
                background-image: url('../../../assets/image/i-bg2@2x.png');
              }
              p {
                color: $adorn-color-2;
              }
            }
            &:nth-child(4) {
              border-bottom: 2px solid $blue-color;
              span {
                background-image: url('../../../assets/image/i-bg1@2x.png');
              }
              p {
                color: $blue-color;
              }
            }
            span {
              width: 75px;
              background-size: cover;
              background-repeat: no-repeat;
              padding: 3px 0 3px 10px;
              color: #fff;
            }
            p {
              line-height: 25px;
            }
          }
        }
      }
      .form-list {
        margin-top: 28px;
        .form-title {
          width: 200px;
          position: absolute;
          color: $text-adorn-color;
          font-size: $xs-size;
          right: -200px;
          top: 0;
          padding-left: 20px;
        }
        .el-col-12 {
          margin-right: 50%;
          .el-input-number {
            width: 100%;
            line-height: 34px;
            .el-input-number__increase {
              line-height: 17px;
            }
          }
        }
        .upload-item {
          .el-form-item__content {
            line-height: 0;
          }
        }
      }
    }

  }
}
.opeartion {
  display: flex;
  justify-content: center;
  margin: 50px 0 0 0;
  button {
    padding: 15px 57px;
  }
  .submit {
    @include linear-grad;
    color: #fff;
    padding: 16px 87px;
    border: 0;
    &:hover {
      opacity: 0.9;
    }
  }
}
// 用户图像样式
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
