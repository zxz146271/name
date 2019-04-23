<template>
  <div class="left-condition">
    <!-- <ul>
      <li v-for="(item, index) in condition" :key="index" :class="{active:thisIndex === index}" @click="chooseThis(index)">
        {{item.title}}
        <el-badge :value="item.num" :max="99" class="badge" v-if="item.num!==''" :class="{zero:item.num===0}">
        </el-badge>
      </li>
    </ul> -->
    <el-collapse accordion v-model="activeName" @change='changeNav'>
      <el-collapse-item class="store-list" name="门店商品">
        <template slot="title">
          <!-- <router-link to="/myStore/storeCommodity" class="link-to"> -->
            <i class="list-icon store-icon"></i>门店商品
          <!-- </router-link> -->
        </template>
        <ul>
          <li :class="{active:thisIndex===index}" v-for="(item, index) in condition" :key="index" @click="chooseShop(item, index)">{{item.title}}</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="store-list" name="订单">
        <template slot="title">
          <i class="list-icon order-icon"></i>订单
        </template>
        <ul>
          <li :class="{active:item.path===$route.path}" v-for="(item, index) in order" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item>
      <!-- <el-collapse-item class="store-list" name="客户中心">
        <template slot="title">
          <i class="list-icon order-icon"></i>客户中心
        </template>
        <ul>
          <li :class="{active:item.path===$route.path}" v-for="(item, index) in customerCenter" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item> -->
      <el-collapse-item class="store-list"  name="客户中心">
        <template slot="title">
          <i class="list-icon submember-icon"></i>客户中心
        </template>
        <ul>
          <li :class="{active:item.path===$route.path}" v-for="(item, index) in submember" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="store-list" name="微店展示">
        <template slot="title">
          <!-- <router-link to="/myStore/survey">
            <i class="list-icon shop-icon"></i>微店装修
          </router-link> -->
          <i class="list-icon shop-icon"></i>微店展示
        </template>
        <ul>
          <li :class="{active:item.path===$route.path}" v-for="(item, index) in shop" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="store-list" name="案例">
        <template slot="title">
          <i class="list-icon case-icon"></i>案例
        </template>
        <ul>
          <li :class="{active:item.path===$route.path}" v-for="(item, index) in caseView" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="store-list" name="业绩管理">
        <template slot="title">
          <i class="list-icon performance-icon"></i>业绩管理
        </template>
        <ul>
          <li :class="{active:item.path===$route.path}" v-for="(item, index) in performance" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="store-list no-child" name="员工管理">
        <template slot="title">
          <router-link to="/myStore/storeStaffManage" class="link-to">
            <i class="list-icon staff-icon "></i>员工管理
          </router-link>
        </template>
        <!-- <ul>
          <li :class="{active:item.path===$route.path}" v-for="(item, index) in shop" :key="index" @click="chooseThis(index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul> -->
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { setStore } from '../../tool/Utils'
export default {
  data () {
    return {
      activeName: '门店商品',
      thisIndex: 0,
      condition: [
        {
          type: 1,
          title: '全部上架商品',
          isActive: true,
          num: ''
        },
        {
          type: 2,
          title: '微店上架商品',
          isActive: false,
          num: ''
        },
        {
          type: 4,
          title: '已下架商品',
          isActive: false,
          num: ''
        },
        {
          type: 6,
          title: '违规商品',
          isActive: false,
          num: ''
        },
        {
          type: 7,
          title: '滞销商品',
          isActive: false,
          num: ''
        }
      ],
      order: [
        {
          title: '标准订单',
          path: '/myStore/order/orderManage',
          name: 'orderManage'
        },
        {
          title: '快开单',
          path: '/myStore/order/easyOrderManage',
          name: 'easyorderManage'
        },
        {
          title: '需要关怀的订单',
          path: '/myStore/order/careManage',
          name: 'careManage'
        },
        {
          title: 'ERP对接订单',
          path: '/myStore/order/erpEasyOrderManage',
          name: 'erpEasyOrderManage'
        }
      ],
      customerCenter: [
        {
          title: '全部客户',
          path: '/myStore/customer/allCustomer',
          name: 'allCustomer'
        },
        {
          title: '自定义客户标签',
          path: '/myStore/customer/customTag',
          name: 'customTag'
        },
        {
          title: '自定义跟进进度',
          path: '/myStore/customer/customSpeed',
          name: 'customSpeed'
        }
      ],
      submember: [
        {
          title: '全部客户',
          path: '/myStore/member/submemberManage',
          name: 'memberLabel'
        },
        {
          title: '自定义客户标签',
          path: '/myStore/member/customTag',
          name: 'customTag'
        },
        {
          title: '自定义跟进进度',
          path: '/myStore/member/customSpeed',
          name: 'customSpeed'
        },
      ],
      shop: [
        {
          title: '微店装修',
          path: '/myStore/shop/survey',
          name: 'survey'
        },
        // {
        //   title: '微页面',
        //   path: '/myStore/microPage',
        //   name: 'microPage'
        // },
        // {
        //   title: '公众号管理',
        //   path: '/myStore/publicNumber',
        //   name: 'publicNumber'
        // },
        {
          title: '自定义分享图',
          path: '/myStore/shop/sharePicture',
          name: 'sharePicture'
        }
      ],
      caseView: [
        {
          title: '案例类型管理',
          path: '/myStore/caseView/caseTypeManage',
          name: 'caseTypeManage'
        },
        {
          title: '案例库管理',
          path: '/myStore/caseView/caseManage',
          name: 'caseManage'
        }
      ],
      performance: [
        {
          title: '带客数业绩',
          path: '/myStore/performance/performanceMana',
          name: 'performanceMana'
        },
        {
          title: '订单量业绩',
          path: '/myStore/performance/performanceView',
          name: 'performanceView'
        },
        {
          title: '成交金额业绩',
          path: '/myStore/performance/performanceMoney',
          name: 'performanceMoney'
        }
      ],
      navList: ['商品', '全部上架商品','已上架商品'],
      saveList: []
    }
  },
  mounted () {
    if (this.$route.path === '/myStore/storeCommodity') {
      this.activeName = '门店商品'
    } else if (this.$route.path.indexOf('/myStore/member/') !== -1) {
      this.activeName = '客户中心'
    } else if (this.$route.path.indexOf('/myStore/order/') !== -1) {
      this.activeName = '订单'
    } else if (this.$route.path.indexOf('/myStore/shop/') !== -1) {
      this.activeName = '微店展示'
    } else if (this.$route.path.indexOf('/myStore/caseView/') !== -1) {
      this.activeName = '案例库'
    } else if (this.$route.path.indexOf('/myStore/performance/') !== -1) {
      this.activeName = '业绩管理'
    } else if (this.$route.path === '/myStore/storeStaffManage') {
      this.activeName = '员工管理'
    }
  },
  inject: ['reload'],
  methods: {
    chooseThis (item, index) {
      this.thisIndex = index
      this.navList.length = 2
      this.navList[1] = item.title
      this.$emit('chooseList', this.navList)
    },
    chooseShop (item, index) {
      this.thisIndex = index
      this.navList.length = 2
      this.navList[1] = item.title
      this.$emit('chooseList', this.navList)
      setStore('storeState1', item.type)
      this.$router.push({path: '/myStore/storeCommodity'})
      this.reload()
    },
    changeNav () {
      if (this.activeName) {
        this.thisIndex = -1
        this.navList.length = 1
        this.navList[0] = this.activeName
        this.$emit('chooseItem', this.navList)
      }
    }
  }
  // props: ['condition']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
@import '../../assets/style/components/el-collapse';
.list-icon{
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 15px;
  left: -25px;
}
.store-icon{
  background: url('../../assets/image/slideicon/dianpu_icon.png') no-repeat;
}
.order-icon{
  background: url('../../assets/image/slideicon/dingdan_icon.png') no-repeat;
}
.submember-icon{
  background: url('../../assets/image/slideicon/kehu_icon.png') no-repeat;
}
.shop-icon{
  background: url('../../assets/image/slideicon/zhuangxiu_icon.png') no-repeat;
}
.case-icon{
  background: url('../../assets/image/slideicon/anliku_icon.png') no-repeat;
}
.performance-icon{
  background: url('../../assets/image/slideicon/yejiguanli_icon.png') no-repeat;
}
.staff-icon{
  background: url('../../assets/image/slideicon/yuanggongguanli_icon.png') no-repeat;
}
.left-condition{
  .store-list{
    position: relative;
    ul{
      li{
        font-size:$xs-size;
        cursor: pointer;
        padding: 8px 0;
        position: relative;
        display: flex;
        background: #f4f4f4;
        &:hover{
          a{
            color:$text-red-color;
          }
          color:$text-red-color;
        }
        &.active{
          a{
            color:$text-red-color;
          }
          color:$text-red-color;
        }
        .badge{
          margin-left: 4px;
          position: relative;
          bottom:2px;
        }
      }
    }
  }
}
</style>
