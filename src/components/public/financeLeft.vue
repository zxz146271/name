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
      <el-collapse-item class="store-list" name="财务中心">
        <template slot="title">
          <i class="list-icon performance-icon"></i>财务管理
        </template>
        <ul>
          <li :class="{active:item.path===$route.path}" v-for="(item, index) in financeCenter" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { setStore } from '../../tool/Utils'
export default {
  data () {
    return {
      activeName: '财务中心',
      thisIndex: 0,
      financeCenter: [
        {
          title: '我的账户',
          path: '/financeCenter/myAccount',
          name: 'myAccount'
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
