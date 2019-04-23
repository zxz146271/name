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
      <el-collapse-item class="store-list no-child" name="品牌系列">
        <template slot="title">
          <router-link to="/store/brandsManage" class="link-to">
            <i class="list-icon brands-icon"></i>品牌系列
          </router-link>
        </template>
      </el-collapse-item>
      <el-collapse-item class="store-list" name="门店">
        <template slot="title">
          <router-link to="/store/storeManage" class="link-to">
            <i class="list-icon store-icon"></i>门店
          </router-link>
        </template>
        <ul>
          <li :class="{active:thisIndex === index}" v-for="(item, index) in condition" :key="index" @click="chooseStore(item, index)">{{item.title}}</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="store-list no-child" name="全部员工">
        <template slot="title">
          <router-link to="/store/staffManage" class="link-to">
            <i class="list-icon staff-icon"></i>全部员工
          </router-link>
        </template>
      </el-collapse-item>
      <el-collapse-item class="store-list no-child" name="全部已购客户">
        <template slot="title">
          <router-link to="/store/allMemberAdministration" class="link-to">
            <i class="list-icon allMember-icon"></i>全部已购客户
          </router-link>
        </template>
      </el-collapse-item>
      <el-collapse-item class="store-list" name="业绩">
        <template slot="title">
          <i class="list-icon performance-icon"></i>业绩
        </template>
        <ul>
          <li :class="{active:item.path===$route.path}" v-for="(item, index) in performance" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="store-list" name="全部商品">
        <template slot="title">
          <router-link to="/store/commManage" class="link-to">
            <i class="list-icon comm-icon"></i>全部商品
          </router-link>
        </template>
        <ul>
          <li :class="{active:thisIndex === index}" v-for="(item, index) in allShop" :key="index" @click="chooseShop(item, index)">{{item.title}}</li>
        </ul>
      </el-collapse-item>
      <!-- <el-collapse-item class="store-list no-child" name="全部微店">
        <template slot="title">
          <router-link to="/store/mStoreManage" class="link-to">
            <i class="list-icon"></i>全部微店
          </router-link>
        </template>
      </el-collapse-item> -->
      <el-collapse-item class="store-list no-child" name="标签规则">
        <template slot="title">
          <router-link to="/store/labelRoles" class="link-to">
            <i class="list-icon label-icon"></i>标签规则
          </router-link>
        </template>
      </el-collapse-item>
      <el-collapse-item class="store-list no-child" name="信息维护">
        <template slot="title">
          <router-link to="/store/maintain" class="link-to">
            <i class="list-icon maintain-icon"></i>信息维护
          </router-link>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { setStore } from '../../tool/Utils'
export default {
  data () {
    return {
      activeName: '品牌系列',
      thisIndex: 0,
      condition: [
        {
          type: 0,
          title: '正常门店',
          isActive: true,
          num: ''
        },
        {
          type: 1,
          title: '已关闭门店',
          isActive: false,
          num: ''
        }
      ],
      performance: [
        {
          title: '带客数业绩',
          path: '/store/performance/performanceMana',
          name: 'performanceMana'
        },
        {
          title: '订单量业绩',
          path: '/store/performance/performanceView',
          name: 'performanceView'
        },
        {
          title: '成交金额业绩',
          path: '/store/performance/performanceMoney',
          name: 'performanceMoney'
        }
      ],
      allShop: [
        {
          type: 1,
          title: '全部上架商品',
          isActive: true,
          num: ''
        },
        {
          type: 3,
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
      shop: [
        // {
        //   title: '微店概况',
        //   path: '/store/survey',
        //   name: 'survey'
        // },
        // {
        //   title: '微页面',
        //   path: '/store/microPage',
        //   name: 'microPage'
        // },
        // {
        //   title: '公众号管理',
        //   path: '/store/publicNumber',
        //   name: 'publicNumber'
        // }
      ],
      brandStoryView: [
        {
          title: '联盟',
          path: '/marketing/activityLeague',
          name: 'activityLeague'
        }
      ],
      navList: ['门店', '正常门店']
    }
  },
  created () {
    this.$root.$on('handle', () => {
      var item = this.allShop[2]
      this.chooseShop(item, '2')
    })
  },
  mounted () {
    if (this.$route.path === '/store/commManage') {
      this.activeName = '全部商品'
    } else if (this.$route.path === '/store/storeManage') {
      this.activeName = '门店'
    } else if (this.$route.path.indexOf('/performance/') !== -1) {
      this.activeName = '业绩'
    } else if (this.$route.path === '/store/staffManage') {
      this.activeName = '全部员工'
    } else if (this.$route.path === '/store/allMemberAdministration') {
      this.activeName = '全部已购客户'
    } else if (this.$route.path === '/store/labelRoles') {
      this.activeName = '标签规则'
    } else if (this.$route.path === '/store/maintain') {
      this.activeName = '信息维护'
    }
  },
  inject: ['reloadStore'],
  methods: {
    choose (index) {
      var item = this.allShop[2]
      this.chooseShop(item, '2')
    },
    chooseThis (item, index) {
      this.thisIndex = index
      this.navList.length = 2
      this.navList[1] = item.title
      this.$emit('chooseList', this.navList)
    },
    chooseStore (item, index) {
      this.thisIndex = index
      this.navList.length = 2
      this.navList[1] = item.title
      this.$emit('chooseList', this.navList)
      setStore('storeState3', item.type)
      this.$router.push({path: '/store/storeManage'})
      this.reloadStore()
    },
    chooseShop (item, index) {
      this.thisIndex = index
      this.navList.length = 2
      this.navList[1] = item.title
      this.$emit('chooseList', this.navList)
      this.$emit('chooseState', item.type)
      setStore('storeState', item.type)
      this.$router.push({path: '/store/commManage'})
      this.reloadStore()
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
.brands-icon{
  background: url('../../assets/image/slideicon/pinpai_icon.png') no-repeat;
}
.store-icon{
  background: url('../../assets/image/slideicon/mendian_icon.png') no-repeat;
}
.staff-icon{
  background: url('../../assets/image/slideicon/yuangong_icon.png') no-repeat;
}
.allMember-icon{
  background: url('../../assets/image/slideicon/huiyuan_icon.png') no-repeat;
}
.comm-icon{
  background: url('../../assets/image/slideicon/shangpin_icon.png') no-repeat;
}
.label-icon{
  background: url('../../assets/image/slideicon/biaoqian_icon.png') no-repeat;
}
.maintain-icon{
  background: url('../../assets/image/slideicon/xinxiweihu_icon.png') no-repeat;
}
.performance-icon{
  background: url('../../assets/image/slideicon/yeji_icon.png') no-repeat;
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
