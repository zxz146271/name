<template>
  <div class="operate">
    <div class="item" v-if="$route.path === '/myStore/order/orderManage'">
      <div class="letf-op">
        <el-checkbox v-model="checkAll">全选</el-checkbox>
      </div>
      <div>
      <div class="middle-op">
        <span class="sort" @click="toggle">开始时间
          <i v-bind:class="{'up': isA}"></i>
          <i v-bind:class="{'down': !isA}"></i>
        </span>
        <span class="sort" @click="toggle2">送货时间
          <i v-bind:class="{'up': isB}"></i>
          <i v-bind:class="{'down': !isB}"></i>
        </span>
      </div>
      </div>
      <div class="right-op">
        <el-button class="import-btn" @click="exportExcel"><i class="el-icon-printer"></i> 导出</el-button>
      </div>
    </div>
    <div class="item" v-if="$route.path === '/myStore/order/easyOrderManage'">
      <div class="letf-op">
        <el-checkbox v-model="checkAll">全选</el-checkbox>
      </div>
      <div>
      <div class="middle-op">
        <span class="sort" @click="toggle">开始时间
          <i v-bind:class="{'up': isA}"></i>
          <i v-bind:class="{'down': !isA}"></i>
        </span>
        <span class="sort" @click="toggle2">送货时间
          <i v-bind:class="{'up': isB}"></i>
          <i v-bind:class="{'down': !isB}"></i>
        </span>
      </div>
      </div>
      <div class="right-op">
        <el-button class="import-btn" @click="exportExcel"><i class="el-icon-printer"></i> 导出</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// import {exportJsonExcel} from '../../vendor/Export2Excel'
export default {
  data () {
    return {
      allChoose: false,
      checkAll: false,
      isA: false,
      num: true,
      isB: true
    }
  },
  watch: {
    allChoose () {
      // this.$store.dispatch('updateChoose', this.allChoose)
      this.$emit('allChoose', this.allChoose)
    },
    checkAll () {
      this.$emit('checkAll', this.checkAll)
    }
  },
  methods: {
    // formatJson (filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => v[j]))
    // },
    exportExcel () {
      this.$emit('exportExcel')
      // const tHeader = ['商品名称', '商品货号', '售价', '库存', '销量', '分享']
      // const filterVal = ['name', 'number', 'salePrice', 'stocknums', 'salesnums', 'sharenums']
      // const list = this.list
      // const data = this.formatJson(filterVal, list)
      // exportJsonExcel(tHeader, data, '商品管理列表')
    },
    toggle () {
      this.isA = !this.isA
      if (this.num) {
        this.num = false
        this.$emit('defualdesc')
      } else {
        this.num = true
        this.$emit('defualasc')
      }
    },
    toggle2 () {
      this.isB = !this.isB
      if (this.num) {
        this.num = false
        this.$emit('desc')
      } else {
        this.num = true
        this.$emit('asc')
      }
    }
  },
  props: ['option', 'flag2']
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
@import '../../assets/style/components/icon';
.operate {
  border: 1px solid $border-color;
  padding: 6px 10px;
  margin: 20px 0 10px 0;
  border-radius: 4px;
  font-size: $xs-size;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .letf-op {
      display: flex;
      .el-checkbox {
        &:nth-child(2) {
          margin-left: 25px;
        }
      }
      .comm-up {
        position: relative;
        margin-left: 25px;
        display: flex;
        align-items: center;
        span {
          margin-right: 18px;
          cursor: pointer;
          i {
            font-size: 14px;
            position: relative;
            top: 1px;
            margin-right: 2px;
          }
          &:hover {
            color: $main-color;
          }
        }
      }
    }
    .right-op {
      button {
        padding: 5px 10px;
        &.history-btn {
          border: 0;
        }
        &.import-btn {
          border-color: $blue-color;
          background-color: $blue-color;
          color: #fff;
          &:hover {
            border-color: lighten($blue-color, 6%);
            background-color: lighten($blue-color, 6%);
          }
        }
      }
    }
    .middle-op {
      span {
        margin: 0 10px;
      }
    }
    .sort {
      cursor: pointer;
      i.up {
        position: relative;
        top: 2px;
        margin-left: 4px;
        @include icon(9px,14px,'../../assets/image/icon/icon-price-up.png');
      }
      i.down {
        position: relative;
        top: 2px;
        margin-left: 4px;
        @include icon(9px,14px,'../../assets/image/icon/icon-price-down.png');
      }
    }
  }
}
</style>
