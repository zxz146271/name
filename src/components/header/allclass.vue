<template>
  <div class="contain-category">
    <div class="tabBtn">全部类别：
      <el-button-group>
        <span
          :class="classState == '1' ? 'primary' : 'deafult'"
          @click="changeState('1')"
          class="btn"
        >全部</span>
        <span
          :class="classState == '2' ? 'primary' : 'deafult'"
          @click="changeState('2')"
          class="btn"
        >案例</span>
        <span
          :class="classState == '3' ? 'primary' : 'deafult'"
          @click="changeState('3')"
          class="btn"
        >文章</span>
        <span
          :class="classState == '4' ? 'primary' : 'deafult'"
          @click="changeState('4')"
          class="btn"
        >图册</span>
        <span
          :class="classState == '5' ? 'primary' : 'deafult'"
          @click="changeState('5')"
          class="btn"
        >全景图</span>
        <span
          :class="classState == '6' ? 'primary' : 'deafult'"
          @click="changeState('6')"
          class="btn"
        >小视频</span>
      </el-button-group>
    </div>
    <div class="tabadd">
      <el-dropdown trigger="click" v-if="allClassType.typeBtn == 1">
        <span class="el-dropdown-link">新增
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item,index) in datalist"
            :key="index"
            @click.native="selectPage(index)"
          >{{item.title}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-if="allClassType.typeBtn == 1" @click="gotoRecycle">回收站</el-button>
      <el-button v-if="allClassType.typeBtn == 1" @click="exportCode">批量导出内容编号</el-button>
      <el-button v-if="allClassType.typeBtn == 2" @click="gotoUnshelved">未上架的内容</el-button>
      <el-button v-if="allClassType.typeBtn == 3" @click="gotoback" type="primary">返回</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      classState: '1',
      flag: true,
      selected: 0,
      datalist: [
        {
          title: '新增案例'
        },
        {
          title: '新增文章'
        },
        {
          title: '新增图册'
        },
        {
          title: '新增全景图'
        },
        {
          title: '批量复制导入'
        }
      ]
    }
  },
  props: {
    allClassType: Object // {typeClass:1.我的内容库， 2.品牌内容库，3，微店内容管理(发现),typeBtn:1.新增，回收站，批量导出内容编号   2.未上架的内容  3.返回}
  },
  components: {},
  methods: {
    // 选择跳转页面
    selectPage (index) {
      console.log(index)
      let typeClass = this.$props.allClassType.typeClass
      console.log(typeClass)
      if (index === 0) {
        // 新增案例
        switch (typeClass) {
          case 1:
            this.$router.push({path: `/mine/countAllofme/caseDetail`, query: {typeClass: this.$props.allClassType.typeClass}})
            break
          case 2:
            this.$router.push({path: `/store/caseDetail`, query: {typeClass: this.$props.allClassType.typeClass}})
            break
          case 3:
            this.$router.push({path: `/myStore/caseDetail`, query: {typeClass: this.$props.allClassType.typeClass}})
            break
        }
      } else if (index === 1) {
        // 新增文章
        switch (typeClass) {
          case 1:
            this.$router.push({path: `/mine/countAllofme/creatArticles`, query: {typeClass: this.$props.allClassType.typeClass}})
            break
          case 2:
            this.$router.push({path: `/store/creatArticles`, query: {typeClass: this.$props.allClassType.typeClass}})
            break
          case 3:
            this.$router.push({path: `/myStore/creatArticles`, query: {typeClass: this.$props.allClassType.typeClass}})
            break
        }
      } else if (index === 2) {
        // 新增图册
        switch (typeClass) {
          case 1:
            this.$router.push({path: `/mine/countAllofme/creatPhotoAlbum`, query: {typeClass: this.$props.allClassType.typeClass}})
            break
          case 2:
            this.$router.push({path: `/store/creatPhotoAlbum`, query: {typeClass: this.$props.allClassType.typeClass}})
            break
          case 3:
            this.$router.push({path: `/myStore/creatPhotoAlbum`, query: {typeClass: this.$props.allClassType.typeClass}})
            break
        }
      } else if (index === 4) {
        // 批量复制导入
        this.$emit('importcode', true)
      } else if (index === 3) {
        // 新增全景图
        switch (typeClass) {
          case 1:
            this.$router.push({path: `/mine/countAllofme/creatPanorama`, query: {typeClass: this.$props.allClassType.typeClass}})
            break
          case 2:
            this.$router.push({path: `/store/creatPanorama`, query: {typeClass: this.$props.allClassType.typeClass}})
            break
          case 3:
            this.$router.push({path: `/myStore/creatPanorama`, query: {typeClass: this.$props.allClassType.typeClass}})
            break
        }
        // this.$router.push({path: `/mine/countAllofme/creatPanorama`, query: {typeClass: this.$props.allClassType.typeClass}})
      } else if (index === 4) {
        // 批量复制导入
        this.$emit('importcode', true)
      }
      console.log(
        '------------------',
        this.$props.allClassType.typeClass,
        index
      )
    },
    // 选择不同的内容类型
    changeState (res) {
      this.classState = res
      var contentType
      var mark
      switch (res) {
        case '1' :
          contentType = null
          mark = 'minivideo'
          break
        case '2' :
          contentType = 'case'
          break
        case '3' :
          contentType = 'article'
          break
        case '4' :
          contentType = 'atlas'
          break
        case '5' :
          contentType = 'panorama'
          break
        default :
          contentType = 'minivideo'
          break
      }
      this.$emit('changeContentType', contentType, mark)
    },
    newlist () {
      this.flag = !this.flag
    },
    classfiy (index) {
      this.selected = index
    },
    // 跳转到我的内容库未上架内容页面
    gotoUnshelved () {
      this.$router.push({ path: '/myStore/contentUnshelved' })
    },
    // 跳转到我的内容库回收站
    gotoRecycle () {
      let typeClass = this.$props.allClassType.typeClass
      if (typeClass === 1) {
        this.$router.push({ path: '/mine/countAllofme/contentRecycle' })
      } else if (typeClass === 2) {
        this.$router.push({ path: '/store/contentRecycle' })
      }
    },
    // 返回
    gotoback () {
      let typeClass = this.$props.allClassType.typeClass
      if (typeClass === 1) {
        this.$router.push({ path: '/mine/countAllofme' })
      } else if (typeClass === 2) {
        this.$router.push({ path: '/store/brandContent' })
      } else {
        this.$router.push({ path: '/myStore/storeDynamicManagement' })
      }
    },
    // 批量导出内容编号
    exportCode () {
      this.$emit('exportCode', true)
    }
  }
}
</script>

<style scoped>
.tabBtn {
  height: 40px;
  line-height: 40px;
}
.contain-category {
  display: flex;
  justify-content: space-between;
  margin: 0 32px;
  margin-bottom: 12px;
}
.el-button-group > .btn {
  margin-left: 20px;
  border-radius: 5px;
  border: none;
  width: 58px;
  height: 24px;
  line-height: 24px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}
/* .el-button-group>.btn:hover{
   background-color: none;
} */
.el-button-group > .primary {
  background-color: #fd4343;
  color: #fff;
  /* font-size: 100px; */
}
.el-button-group > .default {
  background-color: #fff;
}
.el-icon-caret-bottom {
  margin-left: 6px;
}

ul {
  width: 117px;
  height: 156px;
  border: 1px solid #d9d9d9;
  z-index: 3;
}
li {
  width: 100%;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
  margin-right: 2px;
  cursor: pointer;
  padding: 0;
}
.el-dropdown-menu__item:hover {
  background-color: #fd4343;
  color: #ffffff;
}
.el-dropdown-link:hover {
  color: #fd4343;
  border-color: #fd4343;
}
.el-dropdown-link {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
</style>
