<template>
  <div class="care">
    <div class="title">
      <span>近30天过生日的人</span>
      <el-button class="upload el-icon-upload"  @click="exportExcel()">导出</el-button>
    </div>
    <div class="main">
      <ul>
        <li v-for="(item, index) in tableData" :key="index">
          <div class="content">
            <div class="portrait">
              <span style="font-size:30px;">{{item.memberName}}</span>
            </div>
            <div class="date">
              <p>{{item.birthdayStr}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import topOperate from '../../../components/public/topOperate'
import {exportJsonExcel} from '../../../vendor/Export2Excel'
export default{
  data () {
    return {
      tableData: [],
      count: 0,
      searchDays: 30,
      optionTop: {
        type: '1'
      }
    }
  },
  components: {topOperate},
  mounted () {
    this.getStMemberCareList()
  },
  methods: {
    // 模糊查询
    searchValue (value) {
      this.getStMemberCareList(value)
    },
    // 分页和模糊查询方法
    getStMemberCareList (value) {
      var _this = this
      let params = {
        page: 1,
        limit: 100,
        searchDays: 30
      }
      this.$api.getStMemberCareList(params).then(res => {
        _this.tableData = res.data
        _this.count = res.count
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 表格导出
    exportExcel () {
      // this.$emit('exportExcel')
      const tHeader = ['序号', '会员姓名', '性别', '生日', '电话']
      const filterVal = ['num', 'memberName', 'realSex', 'birthdayStr', 'mobile']
      const data = this.formatJson(filterVal, this.tableData)
      exportJsonExcel(tHeader, data, '会员生日表')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
.care{
  .title{
    margin: 40px 0 50px 0;
    background-color: $gray-color;
    height: 44px;
    padding: 11px 16px 11px 106px;
    position:relative;
    color:$child-nav-color;
    display: flex;
    justify-content: space-between;
    &::before{
      content:"";
      display: block;
      width: 80px;
      height: 80px;
      background-image: url('../../../assets/image/birthday-images@2x.png');
      background-repeat: no-repeat;
      background-size: contain;
      position: absolute;
      left: 15px;
      top:-29px;
    }
    .upload{
      padding: 5px 12px;
      color: #fff;
      font-size: 12px;
      background: $blue-color;
      border: none;
    }
  }
  .main{
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        width: 25%;
        padding: 30px 0;
        margin-bottom: 40px;
        cursor: pointer;
        .content{
          width: 120px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          text-align: center;
          &:before{
            content:"";
            display: block;
            width: 110px;
            height: 72px;
            background-image: url('../../../assets/image/hat@2x.png');
            background-repeat: no-repeat;
            background-size: contain;
            position: absolute;
            left: 0;
            right:0;
            margin: 0 auto;
            top:0;
          }
          .portrait{
            width: 100%;;
            height: 120px;
            border-radius: 50%;
            margin-top: 35px;
            overflow: hidden;
            line-height: 120px;
            img{
              width: 100%;
            }
            background-color:rgb(223, 215, 216);
          }
          .date{
            color: $text-main-color;
            p{
              margin: 12px 0 6px 0;
              padding-left: 22px;
              font-size:$xlg-size;
              position: relative;
              &:before{
                content:"";
                display: block;
                width: 17px;
                height: 19px;
                background-image: url('../../../assets/image/icon/edit_normal2@2x.png');
                background-repeat: no-repeat;
                background-size: contain;
                position: absolute;
                left: 20px;
                top:2px;
              }
            }
            span{
              font-size: $md-size;
            }
          }
        }
      }
    }
  }
}
</style>
