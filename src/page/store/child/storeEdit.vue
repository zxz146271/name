<template>
  <div class="comm-edit">
    <!-- <div class="top">
      <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb>
    </div> -->
    <div class="form-group">
      <div class="form-block">
        <top-tips :title="necessary"></top-tips>
        <div class="form-list">
          <!-- model绑定  rules验证规则-->
          <el-form :model="store" :rules="rules" ref="store" label-width="120px" class="ruleForm">
            <el-row :gutter="24">
              <el-col :span="12" :offset="12" v-show="false">
                <el-form-item label="门店ID" prop="storeId">
                  <el-input v-model="store.storeId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="12">
                <el-form-item label="门店名称" prop="storeName">
                  <el-input v-model="store.storeName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="12">
                <el-form-item label="门店电话" prop="mobile">
                  <el-input v-model="store.mobile"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="12">
               <el-form-item label="门店区域"  prop="areaSelected">
                    <el-cascader
                      size="large"
                      :props="newprops"
                      :options="options"
                      v-model="store.areaSelected">
                    </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="12">
                <el-form-item label="门店地址" prop="storeAddress">
                  <el-input v-model="store.storeAddress" type="textarea"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="12">
                <el-form-item label="门店简介" prop="storeIntroduction">
                  <el-input v-model="store.storeIntroduction" type="textarea"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="12">
                <el-form-item label="状态" prop="state">
                  <el-radio-group v-model="store.state">
                    <el-radio label="0">运营中</el-radio>
                    <el-radio label="1">停运</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="12" v-show="false">
                <el-form-item label="是否预设门店" prop="presupposed">
                  <el-radio-group v-model="store.presupposed">
                    <el-radio label="Y">是</el-radio>
                    <el-radio label="N">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="12">
                <el-form-item label="门店订单类型" prop="orderType">
                  <el-radio-group v-model="store.orderType">
                    <el-radio label="ORDER">标准订单</el-radio>
                    <el-radio label="EASY_ORDER">快开单</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12" :offset="12">
                <el-form-item label="是否隶属卖场" prop="bigStore">
                  <el-radio-group v-model="store.bigStore">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
                <el-col :span="12" :offset="12">
                  <el-form-item label="门店照片" class="upload-item label-star">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: store.storeId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-success="fileUploadSuccess"
                      :limit='1'
                      :on-exceed="outOfRange"
                      :file-list="ruleForm.fileLists"
                      :before-upload="beforeAvatarUpload"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item class="el_text_tips">
                    <div class="imageTips">
                      <i class="el-icon-warning"></i>
                      <div slot="tip" class="el-image__tip">图片比例：16:9  图片尺寸：690*420px，不超过2M</div>
                    </div>
                  </el-form-item>
                </el-col>
                 <el-col :span="12" :offset="12">
                  <el-form-item label="门店logo"  class="upload-item label-star">
                    <el-upload
                      :action="$config().uploadUrl"
                      :data="{bid: logoid}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview1"
                      :on-success="fileUploadSuccess1"
                      :limit='1'
                      :on-exceed="outOfRange1"
                      :file-list="ruleForm1.fileLists"
                      :before-upload="beforeAvatarUpload1"
                      :on-remove="handleRemove1">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="form-block">
        <top-tips :title="optional">
          <span slot="checkbox" @click="allCheck">
            <el-checkbox v-model="flag">全选</el-checkbox>
          </span>
        </top-tips>
          <div class="form-list tree-list">
            <el-tree :data="treeList" show-checkbox node-key="id"  ref="tree">
            </el-tree>
          </div>
      </div>
      <div class="opeartion">
        <div class="btns">
          <el-button class="cancle" @click="cancel">取消</el-button>
          <el-button class="submit" @click="editData('store')" :loading="loading">
            {{loading? '提交中' : '提交'}}
          </el-button>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="importComm"
        width="78%"
        height="500px"
        :before-close="handleClose" class="import-dialog">
          <div slot="title" class="left-title">
            <span class="top">选择类品</span>
          </div>
          <cascade @closeDialog="closeDialog"></cascade>
  </el-dialog>
  </div>
</template>
<script>
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
import cascade from '../../../components/commodity/cascade'
import { regionData } from 'chinaArea'
export default {
  data () {
    return {
      loading: false,
      // 省市县
      options: regionData,
      dialogVisible: false,
      dialogImageUrl: '',
      areaSelected: [],
      newprops: {
        value: 'label'
      },
      thisShow: false,
      importComm: false,
      breadcrumbList: [
        { title: '门店管理', path: '/commodity' },
        { title: '新门店', path: '' }
      ],
      necessary: {
        title: '基础信息',
        unfold: false
      },
      optional: {
        title: '门店销售商品',
        unfold: false
      },
      treeList: [],
      cascaderConfig: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      selectedOptions: [],
      rootid: [],
      logoid: '',
      imgType: false,
      imgSize: false,
      store: {
        storeId: '',
        storeName: '',
        mobile: '',
        storeRegion: '',
        photoUrl: '',
        storeAddress: '',
        storeIntroduction: '',
        state: '',
        orderType: '',
        brand: [],
        presupposed: '',
        bigStore: '',
        brandIds: [],
        areaSelected: [],
        delivery: false
      },
      flag: false,
      ruleForm: {
        name: '',
        type: [],
        fileLists: []
      },
      ruleForm1: {
        name: '',
        type: [],
        fileLists: []
      },
      rules: {
        storeName: [
          { required: true, message: '请输入门店名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        storeAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 3, max: 60, message: '长度在 3 到 60 个字符', trigger: 'blur' }
        ],
        areaSelected: [
          { required: true, message: '请选择门店区域', trigger: 'change' }
        ],
        state: [
          { required: true, message: '请选择门店状态', trigger: 'blur' }
        ],
        orderType: [
          { required: true, message: '请选择门店订单类型', trigger: 'blur' }
        ],
        storeIntroduction: [
          { max: 300, message: '字符长度需控制在300字之内', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入门店电话', trigger: 'blur' },
          { min: 7, max: 13, message: '长度在 7 到 13 个字符', trigger: 'blur' }
        ]
      }
      // 列表声明一个空对象
    }
  },
  computed: {
    // commSort: function () {
    //   let querySort = this.$route.query.sort
    //   if (querySort) {
    //     return querySort
    //   } else {
    //   }
    // }
  },
  // 数据初始化方法
  mounted () {
    this.initData()
    this.getStgoodsBrandList()
  },
  methods: {
    // 获取门店信息详情
    initData () {
      var _this = this
      let params = {
        storeId: _this.$route.query.storeId
      }
      _this.$api.stStoregetDetailById(params).then(res => {
        _this.logoid = res.data.storeId.substring(0, 28) + 'logo'
        _this.store = res.data
        let item = {}
        // let tempFullUrl = ''
        // let LogoUrl = ''
        _this.store.areaSelected = []
        this.areaSelected = JSON.parse(res.data.storeRegion)
        this.areaSelected.forEach(el => {
          _this.store.areaSelected.push(el)
        })
        this.$refs.tree.setCheckedKeys(res.data.brandIds)
        res.data.fileUrl.forEach(el => {
          // let param = {
          //   filePath: el.filePath
          // }
          // // 图片回显
          // this.$api.getFullPath(param).then(res => {
          //   tempFullUrl = res.data
          item = {
            url: el.filePath,
            name: el.filename,
            enclosureId: el.enclosureId
          }
          this.ruleForm.fileLists.push(item)
          // })
        })

        res.data.logoUrl.forEach(el => {
          // let param = {
          //   filePath: el.filePath
          // }
          // 图片回显
          // this.$api.getFullPath(param).then(res => {
          //   LogoUrl = res.data
          item = {
            url: el.filePath,
            name: el.filename,
            enclosureId: el.enclosureId
          }
          this.ruleForm1.fileLists.push(item)
          // })
        })
      })
    },
    // 商品全选
    allCheck () {
      if (!this.flag) {
        this.treeList.forEach(el => {
          this.rootid.push(el.id)
        })
        this.$refs.tree.setCheckedKeys(this.rootid)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreview1 (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    showList (data) {
      if (data) {
        this.thisShow = data
      } else {
        this.thisShow = false
      }
    },
    importCommodity () {
      this.importComm = true
    },
    handleClose () {
      this.importComm = false
    },
    closeDialog (value) {
      this.importComm = false
      // 选择的商品分类
    },
    // 获取全路径
    getFullPath (filePath) {
      let params = {
        filePath: filePath
      }
      return this.$api.getFullPath(params)
    },
    // 查询品牌分类
    getStgoodsBrandList () {
      let params = {
        page: 1,
        limit: 20
      }
      this.$api.getStStoreBrandList(params).then(res => {
        let item = {}
        this.count = res.count
        this.treeList = []
        res.data.forEach(el => {
          item = {
            label: el.label,
            id: el.id,
            children: el.children
          }
          this.treeList.push(item)
        })
      })
    },
    // 取消修改
    cancel () {
      this.$router.push({ path: '/store' })
    },
    // 保存修改
    editData (store) {
      this.$refs[store].validate((valid) => {
        // 判断校验结果中是否存在false值
        if (valid) {
          this.store.brandIds = []
          this.$refs.tree.getCheckedNodes().forEach(element => {
            this.store.brandIds.push(element.id)
          })
          let area = []
          this.areaSelected = []
          this.store.areaSelected.forEach(el => {
            this.areaSelected.push(el)
          })
          if (this.ruleForm.fileLists.length > 0) {
            this.store.photoUrl = this.ruleForm.fileLists[0].url
          } else {
            this.$message.error('请上传一张门店照片')
            return
          }
          // 判断是否上传品牌logo
          if (!this.ruleForm1.fileLists.length > 0) {
            this.$message.error('请上传一张门店LOGO')
            return
          }
          // 判断是否选择品牌
          if (!this.$refs.tree.getCheckedNodes().length > 0) {
            this.$message.error('请选择一个商品品牌或系列')
            return
          }
          this.loading = true
          area = this.areaSelected.slice(0, 3)
          this.store.storeRegion = JSON.stringify(area)
          let params = {
            brandIds: this.store.brandIds,
            state: this.store.state,
            orderType: this.store.orderType,
            mobile: this.store.mobile,
            distributorId: this.store.distributorId,
            creator: this.store.creator,
            storeAddress: this.store.storeAddress,
            storeIntroduction: this.store.storeIntroduction,
            storeName: this.store.storeName,
            versionNo: this.store.versionNo,
            deleted: this.store.deleted,
            storeRegion: this.store.storeRegion,
            storeCode: this.store.storeCode,
            storeId: this.store.storeId,
            presupposed: this.store.presupposed,
            // bigStore: this.store.bigStore,
            photoUrl: this.store.photoUrl
          }
          this.$api.stStoreEditSave(params).then(res => {
            if (res.code === 0) {
              // 成功返回列表页面
              this.loading = false
              this.$router.push({ path: '/store/storeManage' })
            } else {
              // 失败提示
              this.loading = false
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$message.error('请按要求填写页面红色标注必填项')
        }
      })
    },
    // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt2M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        this.imgType = true
        type = false
        return type
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
        this.imgSize = true
      }
      return isLt2M && type
    },
    outOfRange () {
      this.$message.error('上传图片数量限制为1张')
    },
    //  图片文件上传成功后的回调
    fileUploadSuccess (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      this.ruleForm.fileLists = [...this.ruleForm.fileLists, ...thisFile] // 数组合并
    },
    // 删除文件
    handleRemove (file, fileList) {
      let param = {
        id: file.enclosureId
      }
      // 删除文件
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile = file
          this.ruleForm.fileLists.splice(this.ruleForm.fileLists.findIndex(v => {
            return v.uid === this.deletFile.uid
          }), 1)
          this.deletFile = {}
        } else {
          if (this.imgType) {
            res.msg = '上传图片只能是 JPG/PNG/GIF 格式!'
            this.imgType = false
          }
          if (this.imgSize) {
            res.msg = '上传图片大小不能超过 20MB!'
            this.imgSize = false
          }
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    },
    // 获取全路径
    getFullPath1 (filePath) {
      let params = {
        filePath: filePath
      }
      return this.$api.getFullPath(params)
    },
    // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload1 (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt2M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        this.imgType = true
        type = false
        return type
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
        this.imgSize = true
      }
      return isLt2M && type
    },
    outOfRange1 () {
      this.$message.error('上传图片数量限制为1张')
    },
    //  图片文件上传成功后的回调
    fileUploadSuccess1 (file, fileList) {
      let thisFile = [{
        name: file.data.fileName,
        url: file.data.filePath,
        enclosureId: file.data.enclosureId
      }]
      this.ruleForm1.fileLists = [...this.ruleForm1.fileLists, ...thisFile] // 数组合并
    },
    // 删除文件
    handleRemove1 (file, fileList) {
      let param = {
        id: file.enclosureId
      }
      // 删除文件
      this.$api.deleteFile(param).then(res => {
        if (res.code === 0) {
          // 成功提示
          this.$message.success(res.msg)
          // 要删除的文件
          this.deletFile = file
          this.ruleForm1.fileLists.splice(this.ruleForm1.fileLists.findIndex(v => {
            return v.uid === this.deletFile.uid
          }), 1)
          this.deletFile = {}
        } else {
          if (this.imgType) {
            res.msg = '上传图片只能是 JPG/PNG/GIF 格式!'
            this.imgType = false
          }
          if (this.imgSize) {
            res.msg = '上传图片大小不能超过 20MB!'
            this.imgSize = false
          }
          // 失败提示
          this.$message.error(res.msg)
        }
      })
    }
  },
  components: { breadCrumb, topTips, cascade }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
@import '../../../assets/style/components/elbtn';
.comm-edit {
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
      .form-list {
        margin-top: 28px;
        padding: 0 70px;
        &.tree-list {
          padding: 0;
        }
        .upload-item {
          .el-form-item__content {
            line-height: 0;
          }
        }
        .el_text_tips {
          .el-form-item__content {
            .imageTips {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              height:18px;
              color:#B5B5B5;
              .el-icon-warning {
                font-size: 14px;
                position: relative;
                top: 2px;
                margin-right: 5px;
              }
              .el-image__tip {
                font-size:16px;
                font-weight:400;
                line-height:27px;
              }
            }
          }
        }
      }
    }
    .opeartion {
      display: flex;
      justify-content: space-between;
      margin: 50px 0;
      button {
        padding: 13px 40px;
      }
      .submit {
        @include linear-grad;
        color: #fff;
        padding: 14px 40px;
        border: 0;
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
  .import-dialog {
    .left-title {
      position: absolute;
      color: #fff;
      .bottom {
        position: absolute;
        width: 90px;
        height: 28px;
        left: 0;
        z-index: 10;
        background-color: $main-color;
        &::after {
          content: '';
          @include triangle-right(14px, 12px, $main-color);
          position: absolute;
          right: -24px;
        }
      }
      .top {
        position: relative;
        width: 82px;
        height: 28px;
        display: inline-block;
        background-color: $gray-color;
        line-height: 28px;
        text-align: center;
        color: $text-main-color;
        font-size: $xs-size;
        &::after {
          content: '';
          @include triangle-right(14px, 12px, $gray-color);
          position: absolute;
          right: -24px;
        }
        &::before {
          content: '';
          position: absolute;
          left: 0px;
          width: 4px;
          background-color: $main-color;
          height: 100%;
        }
      }
    }
  }
}
</style>
