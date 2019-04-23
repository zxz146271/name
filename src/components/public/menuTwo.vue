<template>
  <div>
    <div v-for="(item) in sideItem" :key="item.id" >
      <!-- 有展开 -->
      <el-submenu v-if="item.children" :index="item.id">
        <template slot="title">
          <span slot="title" :class="openKey[1] == item.id ? 'title red' :'title'">{{item.title}}</span>
        </template>
        <!-- 三级 -->
        <router-link :to="subItem.path" v-for="(subItem) in item.children" :key="subItem.id">
          <el-menu-item  :index="subItem.id">
            <span :class="selectKey == subItem.id ? 'currentPos anime' : 'currentPos'"></span>
            <span slot="title" class="title">{{subItem.title}}</span>
          </el-menu-item>
        </router-link>
      </el-submenu>
      <!-- 无展开 -->
      <router-link :to="item.path">
        <el-menu-item v-if="!item.children" :index="item.id">
          <span :class="selectKey == item.id ? 'currentPos anime' : 'currentPos'"></span>
          <span slot="title" class="title">{{item.title}}</span>
        </el-menu-item>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
        sideItem: Array,
        selectKey: String,
        openKey: Array,
    },
    methods: {}
  }
</script>

<style scoped>
.el-menu-item.is-active {
  font-weight: bold;
  color: #FE4343;
}
.currentPos {
  width:6px;
  height:20px;
  background:#FE4343;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%) translateX(-7px);
  transition: all ease 0.3s;
}
.currentPos.anime {
  transform: translateY(-50%) translateX(0);
}

.title {
  font-size: 14px;
}
.title.red{
  color:#FE4343;
  font-weight: bold;
}
</style>