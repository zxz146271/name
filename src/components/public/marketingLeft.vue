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
      <el-collapse-item class="store-list" name="店铺活动">
        <template slot="title">
          <i class="list-icon store-icon"></i>店铺活动
        </template>
        <ul>
          <li :class="{active:item.path===$route.path}" v-for="(item, index) in storeMarket" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item>
      <!-- <el-collapse-item class="store-list no-child" name="联盟活动">
        <template slot="title">
          <router-link to="/marketing/activityLeague">
            <i class="list-icon"></i>联盟活动
          </router-link>
        </template>
        <ul>
          <li :class="{active:item.path===$route.path}" v-for="(item, index) in storeLeague" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item> -->
      <el-collapse-item class="store-list no-child" name="卡券核销">
        <template slot="title">
          <router-link to="/marketing/writeOff">
            <i class="list-icon writeOff-icon"></i>卡券核销
          </router-link>
        </template>
      </el-collapse-item>
    </el-collapse>
    <!-- <el-collapse accordion v-model="activeName" @change='changeNav'>
      <el-collapse-item class="store-list" name="蘑盒服务">
        <template slot="title">
          <i class="list-icon box-icon"></i>蘑盒服务
        </template>
        <ul>
          <li :class="{active:item.path===$route.path}" v-for="(item, index) in magicBox" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      activeName: '店铺活动',
      thisIndex: 0,
      storeMarket: [
        {
          title: '优惠券',
          path: '/marketing/storeMarket/activityCoupon',
          name: 'activityCoupon'
        },
        {
          title: '秒杀',
          path: '/marketing/storeMarket/activityGrab',
          name: 'activityGrab'
        },
        {
          title: '团购',
          path: '/marketing/storeMarket/activityCollage',
          name: 'activityCollage'
        }
        // {
        //   title: '活动导入',
        //   path: '/marketing/storeMarket/activityCollage',
        //   name: 'activityCollage'
        // }
      ],
      magicBox: [
        {
          title: '短信模版',
          path: '/marketing/magicBox/SMSTemplate',
          name: 'SMSTemplate'
        },
        {
          title: '门店蘑盒',
          path: '/marketing/magicBox/storeBox',
          name: 'storeBox'
        },
        {
          title: '蘑客管理',
          path: '/marketing/magicBox/boxManage',
          name: 'boxManage'
        },
        {
          title: '短信服务',
          path: '/marketing/magicBox/SMSService',
          name: 'SMSService'
        },
        {
          title: '短信推送',
          path: '/marketing/magicBox/SMSPush',
          name: 'addSMSPush'
        }
      ],
      navList: ['店铺活动', '优惠券']
    }
  },
  computed: {
    ...mapGetters(['marketingLeftIndex'])
  },
  mounted () {
    this.chooseThis(this.storeMarket[this.marketingLeftIndex], this.marketingLeftIndex)
    if (this.$route.path.indexOf('/storeMarket/') !== -1) {
      this.activeName = '店铺活动'
    } else if (this.$route.path.indexOf('/writeOff') !== -1) {
      this.activeName = '卡券核销'
    } else if (this.$route.path.indexOf('/magicBox/') !== -1) {
      this.activeName = '魔盒服务'
    }
  },
  created () {
    this.thisIndex = this.marketingLeftIndex
  },
  watch: {
    marketingLeftIndex (newVal, oldVal) {
      if (newVal !== oldVal) {
        // this.$forceUpdate()
      }
      // this.chooseThis(this.storeMarket[newVal], newVal)
    }
  },
  methods: {
    chooseThis (item, index) {
      // if (this.thisIndex === 4) {
      //   item = this.storeLeague[0]
      //   index = 0
      //   this.activeName = '联盟活动'
      // }
      this.thisIndex = index
      this.navList.length = 2
      this.navList[1] = item.title
      this.$emit('chooseList', this.navList)
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
  background: url('../../assets/image/slideicon/huodong_icon.png') no-repeat;
}
.writeOff-icon{
  background: url('../../assets/image/slideicon/kaquan_icon.png') no-repeat;
}
.box-icon{
  background: url('../../assets/image/slideicon/boxicon.png') no-repeat;
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
