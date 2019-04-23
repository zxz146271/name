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
      <el-collapse-item class="store-list" name="单门店数据">
        <template slot="title">
          <i class="list-icon one-icon"></i>单门店数据
        </template>
        <ul>
          <li :class="{active:thisIndex === index}" v-for="(item, index) in oneStoreData" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="store-list" name="全部门店数据">
        <template slot="title">
          <i class="list-icon all-icon"></i>全部门店数据
        </template>
        <ul>
          <li :class="{active:thisIndex === index}" v-for="(item, index) in allStoreData" :key="index" @click="chooseThis(item, index)">
              <router-link :to="item.path">{{item.title}}</router-link>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: '单门店数据',
      thisIndex: 0,
      allStoreData: [
        {
          title: '数据概况',
          path: '/data/allStoreData/dataOverview',
          name: 'dataOverview'
        },
        {
          title: '已购客户分析',
          path: '/data/allStoreData/analysisMember',
          name: 'analysisMember'
        },
        // {
        //   title: '微店分析',
        //   path: '/data/allStoreData/analysisStore',
        //   name: 'analysisStore'
        // },
        {
          title: '商品分析',
          path: '/data/allStoreData/analysisGoods',
          name: 'analysisGoods'
        },
        {
          title: '交易分析',
          path: '/data/allStoreData/analysisTrade',
          name: 'analysisTrade'
        }
      ],
      oneStoreData: [
        {
          title: '数据概况',
          path: '/data/oneStoreData/dataOverview',
          name: 'dataOverview'
        },
        {
          title: '已购客户分析',
          path: '/data/oneStoreData/analysisMember',
          name: 'analysisMember'
        },
        // {
        //   title: '微店分析',
        //   path: '/data/oneStoreData/analysisStore',
        //   name: 'analysisStore'
        // },
        {
          title: '商品分析',
          path: '/data/oneStoreData/analysisGoods',
          name: 'analysisGoods'
        },
        {
          title: '交易分析',
          path: '/data/oneStoreData/analysisTrade',
          name: 'analysisTrade'
        }
      ],
      navList: ['全部门店数据', '数据概况']
    }
  },
  methods: {
    chooseThis (item, index) {
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
.one-icon{
  background: url('../../assets/image/slideicon/danshuju_icon.png') no-repeat;
}
.all-icon{
  background: url('../../assets/image/slideicon/quanshuju_icon.png') no-repeat;
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
