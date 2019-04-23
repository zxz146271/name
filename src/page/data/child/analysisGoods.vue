<template>
<div class="member">
  <goods-top-list></goods-top-list>
  <div class="data-chart">
    <goods-top-data :title="tabletitle" @goodsTopData= 'goodsTopData' ></goods-top-data>
    <div class="balck-th">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            label="商品名称"
            prop="goodsName"
            align="center">
          </el-table-column>
          <el-table-column
            prop="visitCount"
            label="访问量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="visiterNum"
            align="center"
            label="访问人数">
          </el-table-column>
          <el-table-column
            prop="shareCount"
            label="分享次数"
            align="center">
            </el-table-column>
            <el-table-column
            prop="saleNum"
            label="销售量"
            align="center">
            </el-table-column>
          <!-- <el-table-column
            prop="saleTotal"
            label="销售金额"
            width="160"
            align="center">
          </el-table-column> -->
          <!-- <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="see"
                  class="edit">查看</el-button>
                </template>
          </el-table-column> -->
        </el-table>
        <div class="pagin">
          <span class="total">共{{totalCount}}条数据</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
          :total=totalCount>
          </el-pagination>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import goodsTopList from '../../../components/data/goodsTopList'
import goodsTopData from '../../../components/data/goodsTopData'

export default {
  name: 'analysisMember',
  data () {
    return {
      tabletitle: {
        title: '商品销售',
        date: 'date',
        indicators: 'indicators',
        type: 'download'
      },
      tableData: [],
      dateTime: null,
      totalCount: 0, // 默认数据总数
      currentPage: 1,
      pagesize: 10
    }
  },
  mounted () {
    this.getGoodsIndex(this.dateTime)
  },
  methods: {
    getGoodsIndex (dateTime) {
      if (dateTime != null) {
        let params = {
          startDate: dateTime[0],
          endDate: dateTime[1],
          page: this.currentPage,
          limit: this.pagesize,
          isAllStore: this.$route.path
          // jsonData: JSON.stringify(this.form.region)
        }
        this.$api.getGoodsIndexAnalysis(params).then(res => {
          this.tableData = res.data
          this.totalCount = res.count
        })
      } else {
        let params = {
          startDate: '',
          endDate: '',
          page: this.currentPage,
          limit: this.pagesize,
          isAllStore: this.$route.path
          // jsonData: JSON.stringify(this.from.region)
        }
        this.$api.getGoodsIndexAnalysis(params).then(res => {
          this.tableData = res.data
          this.totalCount = res.count
        })
      }
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getGoodsIndex(this.dateTime)
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getGoodsIndex(this.dateTime)
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    see () {
      this.$router.push({path: '/data/analysisShop'})
    },
    goodsTopData (value) {
      this.dateTime = value
      this.getGoodsIndex(this.dateTime)
    }
  },
  components: {goodsTopList, goodsTopData}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
 .data-chart{
    margin-top: 40px;
  }
  .balck-th{
    padding-bottom:50px;
    .edit{
      border: 0;
      background: none;
      color: $text-red-color;
    }
  }
</style>
