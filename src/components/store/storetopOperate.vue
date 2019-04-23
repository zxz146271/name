<template>
  <div class="operate">
    <div class="item" v-if="$route.path === '/myStore/commManage'">
      <div class="letf-op">
        <el-checkbox v-model="allChoose">全选</el-checkbox>
        <div class="comm-up">
          <span class="up"><i class="iconfont icon-icon_up"></i>上架</span>
          <span class="down"><i class="iconfont icon-icon_down"></i>下架</span>
        </div>
      </div>
      <div class="right-op">
        <span class="sort">价格<i></i></span>
      </div>
    </div>
    <div class="item" v-if="$route.path === '/myStore/orderManage'">
      <div class="letf-op">
        <el-checkbox>全选</el-checkbox>
        <div class="comm-up">
          <span class="up"><i class="el-icon-edit-outline"></i>批量修改</span>
        </div>
      </div>
      <div>
      <div class="middle-op">
        <span class="sort">开始时间<i></i></span>
        <span class="sort">送货时间<i></i></span>
      </div>
      </div>
      <div class="right-op">
        <el-button class="history-btn"> <i class="el-icon-time"></i> 导出历史</el-button>
        <el-button class="import-btn" @click="exportExcel"><i class="el-icon-printer"></i> 导出</el-button>
      </div>
    </div>
    <div class="item" v-if="option.type === '0'">
      <div class="letf-op">
      </div>
      <div class="right-op">
        <!-- <span class="up" @click="tolertant" >默认排序</span>&nbsp;&nbsp;&nbsp; -->
        <span class="sort"  @click="toggle">价格
          <i v-bind:class="{'up': isA}"></i>
          <i v-bind:class="{'down': !isA}"></i>
        </span>
      </div>
    </div>
    <div class="item" v-if="option.type === '1'">
      <div class="letf-op">
        <el-checkbox  v-model="checkAll">全选</el-checkbox>
      </div>
      <div class="right-op">
        <div>
          <el-button  @click="batchEnable" type="success" data-code="10030004">启用</el-button>&nbsp;&nbsp;&nbsp;
          <el-button @click="batchDisable" type="danger" data-code="10030005">停用</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { judgeButton } from '../../tool/Utils'
export default {
  data () {
    return {
      allChoose: false,
      isA: true,
      num: true,
      checkAll: false,
      list: [
        {
          name: '韩版设计时尚风衣大',
          number: 'MPM00112',
          salePrice: '￥999.00',
          stocknums: 3423,
          salesnums: 3423,
          sharenums: 3423
        },
        {
          name: '韩版设计时尚风衣大',
          number: 'MPM00112',
          salePrice: '￥999.00',
          stocknums: 3423,
          salesnums: 3423,
          sharenums: 3423
        }
      ]
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
  computed: {
    ...mapGetters(['powerButton'])
  },
  mounted () {
    this.getButton()
  },
  methods: {
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
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
        this.$emit('desc')
      } else {
        this.num = true
        this.$emit('asc')
      }
    },
    tolertant () {
      this.$emit('tolertant')
    },
    batchEnable () {
      this.$confirm('此操作将员工状态改为在职 , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('enable')
        this.checkAll = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用操作'
        })
      })
    },
    batchDisable () {
      this.$confirm('此操作将员工状态改为离职, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('disable')
        this.checkAll = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用操作'
        })
      })
    }
  },
  props: ['option', 'staffTop']
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
      .up{
        cursor: pointer;
      }
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
