<template>
  <!-- <div class="comm-manage administration">
    <div class="right-view">
      <div class="top-search">
        <search @searchValue="searchValue"></search>
        <div class="busi-btns">
          <el-button class="btn newcom-btn" @click="addStore" data-code="10010002" ref="clean">新微店</el-button>
        </div>
      </div>
      <div class="order-detail">
        <div class="detail-item">
          <el-table
            :data="tableData"
            style="width: 100%"
            >
            <el-table-column
              prop="img"
              label="图片"
              width="110">
              <template slot-scope="scope" >
                <img :src='scope.row.photoUrl' alt="" class="img-view">
                <div class="store-state" v-if="scope.row.state === '0'">
                  <span class="type1">运营中</span>
                </div>
                <div class="store-state" v-else>
                  <span class="type2">停运</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              width="300px"
              label="店铺基础信息"
            >
              <template slot-scope="scope">
                <div class="store-info">
                  <p class="title">{{scope.row.storeName}}</p>
                  <div class="info">
                    <p>门店编号：{{scope.row.storeCode}}</p>
                    <p>门店电话: {{scope.row.mobile}}</p>
                    <p>创建时间：{{scope.row.createTime}}</p>
                    <p>店铺地址：{{scope.row.storeRegion+scope.row.storeAddress}}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              align="center"
              width="300px"
              label="经营品牌">
              <template slot-scope="scope" >
                <div v-for="(item, index) in scope.row.brandName" :key="index" :item="item" v-if="index <= 2" class="brand-list">
                  <span>{{item}},</span>
                </div>
                <div  v-if="scope.row.brandName !== null && scope.row.brandName.length > 2" class="brand-list">
                  <span>......共{{scope.row.brandNum}}个品牌</span><span v-if="scope.row.seriesNum !== null && scope.row.seriesNum !== 0">{{scope.row.seriesNum}}个系列</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="num"
              align="center"
              width="140px"
              label="操作"
              >
              <template slot-scope="scope">
                <div class="comm-opera">
                  <el-button icon="el-icon-edit" circle  @click="editData(scope.row.storeId)" data-code="10010003"></el-button>
                  <el-button round v-if="scope.row.state === '1'" type="success" @click="OpenStore('0',scope.row.storeId)"  data-code="10010004" >开店</el-button>
                  <el-button round v-else type="danger"  @click="StopStore('1',scope.row.storeId)"  data-code="10010005">关店</el-button>
                </div>
            </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="pagin">
          <span class="total">共 {{count}} 家门店</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total=count>
        </el-pagination>
      </div>
    </div>
  </div> -->
  <div style="
    display:  flex;
    justify-content:  center;
    align-items: center;
    opacity: .5;
    font-size: 20px;">
    <h1>开发中···</h1>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import search from '../../../components/public/search'
import commodityItem from '../../../components/commodity/commodityItem'
import leftCondition from '../../../components/public/leftCondition'
import { judgeButton } from '../../../tool/Utils'
// import {}
// import index from 'vue'
export default {
  data () {
    return {
      importComm: false,
      addNewComm: false,
      active: 0,
      tableData: [],
      count: 0,
      address: '',
      condition: [
        {
          type: 0,
          title: '正常微店',
          isActive: true,
          num: ''
        },
        {
          type: 1,
          title: '已关闭微店',
          isActive: false,
          num: ''
        }
      ],
      storevo: {
        state: '0',
        storeName: '',
        mobile: '',
        sotreCode: '',
        sotreAddress: ''
      },
      currentPage: 1,
      pagesize: 10
    }
  },
  computed: {
    ...mapGetters(['powerButton'])
  },
  // 数据初始化方法
  mounted () {
    this.getListData()
    this.getButton()
  },
  methods: {
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    chooseThis (index) {
      this.storevo.state = index
      this.getListData()
    },
    // 添加新门店
    addStore () {
      this.$router.push({path: '/store/storeAdd'})
    },
    // 开店
    OpenStore (value, storeId) {
      this.$confirm('此操作将开启已经停业门店, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          status: value,
          storeId: storeId
        }
        this.$api.storeOpen(params).then(res => {
          if (res.code === 0) {
            // 成功返回列表页面
            this.$message({
              message: '开店成功',
              type: 'success'
            })
            this.getListData()
          } else {
            // 失败提示
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消开启门店'
        })
      })
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getListData()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getListData()
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    clean () {
      this.$refs.clean.FormName()
    },
    // 关店
    StopStore  (value, storeId) {
      this.$confirm('此操作将关闭正在营业门店, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          status: value,
          storeId: storeId
        }
        this.$api.storeStope(params).then(res => {
          if (res.code === 0) {
            // 成功返回列表页面
            this.$message({
              message: '关店成功',
              type: 'success'
            })
            this.getListData()
          } else {
            // 失败提示
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消关闭门店'
        })
      })
    },
    // 根据id查询某门店信息
    editData (storeId) {
      this.$router.push({path: '/store/storeEdit', query: {storeId: storeId}})
    },
    searchValue (value) {
      this.storevo.storeName = value
      this.getListData()
    },
    // 分页查询和模糊搜索
    getListData () {
      this.storevo.state = this.$route.query.state
      var _this = this
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        storevo: this.storevo
      }
      this.$api.getStStoreList(params).then(res => {
        res.data.forEach(function (store) {
          var str = store.createTime.substring(0, 10)
          store.createTime = str
          JSON.parse(store.storeRegion).forEach(el => {
            if (store.storeRegion.indexOf('[') !== -1) {
              store.storeRegion = ''
              store.storeRegion = el
            } else {
              store.storeRegion += el
            }
          })
        })
        _this.tableData = res.data
        _this.count = res.count
      })
    }
  },
  components: { search, commodityItem, leftCondition }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.comm-manage {
  margin: 0 auto;
  display: flex;
  padding-top: 126px;
  .left-view {
    border: 1px solid $border-color;
    flex: 0 0 156px;
    padding: 10px 0 10px 36px;
    height: 84px;
    border-radius: 4px;
  }
  .right-view {
    flex: 1;
    margin-left: 10px;
    .comm-opera{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right:18px;
      button:nth-child(1){
        padding:7px;
        background-color:$main-color;
        border-color:$main-color;
        &:hover{
          background-color:lighten($main-color,6%);
          border-color:lighten($main-color,6%);
        }
        i{
          color:#fff;
        }
      }
      button:nth-child(2){
        padding:8px 12px;
        background-color:#DDE0E9;
        border-color:#DDE0E9;
        color:$text-main-color;
        &:hover{
          background-color:darken(#DDE0E9,6%);
          border-color:darken(#DDE0E9,6%);
        }
      }
      // display: none;
    }
    .order-detail{
      margin-top: 20px;
      .detail-item{
        background: #fff;
        .store-state{
          text-align: center;
          span{
            font-size: $xs-size;
            color:#fff;
            border-radius: 4px;
            padding:2px 5px;
          }
          .type1{
            background-color:$main-color;
          }
          .type2{
            background-color:#424552;
          }
        }
        .store-info{
          .title{
            font-weight: bold;
          }
          .info{
            p{
              color: $text-gray-color;
            }
          }
        }
      }
    }
    //     .detail-item{
    //   .price-view{
    //     margin-bottom: 40px;
    //     .num{
    //       color:$text-red-color;
    //       font-weight: bold;
    //     }
    //     .el-icon-edit{
    //       margin-left: 4px;
    //       cursor: pointer;
    //       &:hover{
    //         color:$main-color;
    //       }
    //     }
    //   }
    //   .price-op{
    //     display: flex;
    //     margin-left: 4px;
    //     justify-content: center;
    //     input[type='text']{
    //       border:1px solid $input-border-color;
    //       height:20px;
    //       border-radius: 4px;
    //       font-size: $xs-size;
    //       width:60px;
    //       padding-left:4px;
    //       margin-right: 4px;
    //     }
    //     button{
    //       padding:3px 8px;
    //     }
    //   }

    //   .comm-name{
    //     font-size: $md-size;
    //     font-weight: bold;
    //   }
    //   .evalue{
    //     padding: 10px 20px;
    //     display: flex;
    //     justify-content: space-between;
    //     .left{
    //       p{
    //         display: flex;
    //         padding: 5px 0;
    //         span{
    //           margin-right: 10px;
    //         }
    //       }
    //     }
    //     .right{
    //       ul{
    //         display: flex;
    //         li{
    //           margin-left: 10px;
    //           img{
    //             width:160px;
    //             height:160px;
    //           }
    //         }
    //       }
    //     }
    //   }
    //   .comm-num{
    //     color:$text-gray-color;
    //   }
    //   .dis-befo{
    //     color:$main-color;
    //     font-weight: bold;
    //   }
    //   .dis-afte{
    //     color:$text-gray-color;
    //   }
    //   .black-color{
    //     font-weight: bold;
    //   }
    //   .red-color{
    //     color:$main-color;
    //     font-weight: bold;
    //   }
    //   .origin{
    //     position: relative;
    //     color:$text-gray-color;
    //     &:after{
    //       content: '';
    //       position: absolute;
    //       left: 15%;
    //       right: 15%;
    //       height: 1px;
    //       background-color: #e0e0e0;
    //       top: 50%;
    //     }
    //   }
    // }
    .top-search {
      display: flex;
      justify-content: space-between;
      .busi-btns {
        .btn {
          padding: 9px 20px;
          &.newcom-btn {
            margin-left: 0px;
            background: $blue-color;
            border-color: $blue-color;
            color: #fff;
            &:focus,
            &:hover {
              background: lighten($blue-color, 6%);
              border-color: lighten($blue-color, 6%);
            }
          }
          &.import-btn {
            background: $yello-color;
            border-color: $yello-color;
            color: #fff;
            &:focus,
            &:hover {
              background: lighten($yello-color, 6%);
              border-color: lighten($yello-color, 6%);
            }
          }
        }
      }
    }

  }
}
.brand-list{
  display: inline-block;
}
</style>
