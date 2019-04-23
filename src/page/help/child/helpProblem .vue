<template>
  <div class="main-cont">
    <!-- <bread-crumb :breadcrumbList="breadcrumbList"></bread-crumb> -->
      <p>常见问题</p>
      <div class="content">
        <div class="search-box">
          <search @searchValue="searchValue"></search>
        </div>
        <div class="title">
          <span>常见问题：</span>
          <p>如何开单，如何设置自定义数据，上传图片失败</p>
        </div>
        <div class="problem-list">
          <ul>
             <li v-for='item in businessProblemInfo' :key="item">
              <div>
                <span>提问：</span>
                <p class="problem">{{item.problemTitle}}</p>
              </div>
              <div>
                <span>回答：</span>
                <p>{{item.problemContent}}</p>
              </div>
            </li>
             <div class="pagin">
            <span class="total">共{{totalCount}}条数据</span>
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total="totalCount">
        </el-pagination>
      </div>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import search from '../../../components/public/search'
import breadCrumb from '../../../components/public/breadcrumb'
export default {
  data () {
    return {
      breadcrumbList: [
        {title: '帮助中心', path: '/help'},
        {title: '常见问题', path: ''}
      ],
      // 初始化问题列表
      businessProblemInfo: {},
      totalCount: 0,
      searchValues: '',
      currentPage: 1,
      pagesize: 10
    }
  },
  mounted () {
    this.getBusinessProblemInfo()
  },
  methods: {
    getBusinessProblemInfo (value) {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        problemTitle: this.searchValues,
        state: 0
      }
      this.$api.getBusinessProblemInfo(params).then(res => {
        if (res.code === 0) {
          this.businessProblemInfo = res.data
        } else {
          this.$message.error(res.msg)
        }
        this.totalCount = res.count
      })
    },
    // 关键词搜索查询条件
    searchValue (value) {
      this.searchValues = value
      this.getBusinessProblemInfo()
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getBusinessProblemInfo()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getBusinessProblemInfo()
    }
  },
  components: {search, breadCrumb}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.main-cont{
    >p{
      text-align: center;
      padding: 30px 0;
      color:$text-main-color;
      font-size: $detail-size;
      position: relative;
      &::before{
        content: "";
        display: block;
        width: 30px;
        height: 2px;
        background: $checkbox-border-color;
        position: absolute;
        top:50%;
        margin-top: -1px;
        left: 50%;
        margin-left: -80px;
      }
      &::after{
        content: "";
        display: block;
        width: 30px;
        height: 2px;
        background: $checkbox-border-color;
        position: absolute;
        top:50%;
        margin-top: -1px;
        right: 50%;
        margin-right: -80px;
      }
    }
    .content{
      border-radius: 4px;
      border:1px solid $border-color;
      padding: 30px;
      .search-box{
        display: flex;
        justify-content: center;
      }
      .title{
        display: flex;
        font-size: $md-size;
        justify-content: center;
        padding: 10px 0 25px 0;
        margin-left: -65px;
        span{
          color: $text-main-color;
        }
        p{
          color: $text-red-color;
        }
      }
      .problem-list{
        ul{
          li{
            border-top:1px dashed $border-color;
            font-size: $md-size;
            padding: 16px 0;
            div{
              position: relative;
              span{
                position: absolute;
                left: 0;
                top:0;
              }
              p{
                padding-left: 50px;
              }
              .problem{
                color: $text-red-color;
              }
              &+div{
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
