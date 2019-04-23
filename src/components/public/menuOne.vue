<template>
  <div>
    <div v-for="(item) in sideItem" :key="item.id" >
      <!-- 有展开 -->
      <el-submenu v-if="item.children" :index="item.id">
        <template slot="title">
          <span class="typeIcon">
            <img :src="openKey[0] == item.id ? item.activeSrc : item.src" alt="">
          </span>
          <span slot="title" :class="openKey[0] == item.id ? 'title red' :'title'">{{item.title}}</span>
        </template>
         <menuTwo :sideItem="item.children" :selectKey="selectKey" :openKey="openKey"></menuTwo>
      </el-submenu>
      <!-- 无展开 -->
      <router-link :to="item.path" >
        <el-menu-item v-if="!item.children" :index="item.id">
          <span :class="selectKey == item.id ? 'currentPos anime' : 'currentPos'"></span>
          <span class="typeIcon">
            <img :src="selectKey == item.id ? item.activeSrc : item.src" alt="">
          </span>
          <span slot="title" class="title">{{item.title}}</span>
        </el-menu-item>
      </router-link>
    </div>
  </div>
</template>

<script>
  import menuTwo from './menuTwo'
  export default {
    components: {menuTwo},
    props: {
        sideItem: Array,
        selectKey: String,
        openKey: Array
    },
    methods: {
    }
  }
</script>

<style scoped>
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
.typeIcon {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-left: 4px;
  margin-right: 6px;
  position: relative;
}
.typeIcon img {
  width: 100%;
  height: 100%;
  display: block;
}
.title {
  font-size: 14px;
}
.title.red{
  color:#FE4343;
  font-weight: bold;
}
</style>