<template>
  <div class="main-cont">
      <p>帮助中心</p>
      <div class="content">
        <div class="top">
          <div class="modular">
            <img src="../../../assets/image/images_1@2x.png">
            <p>电话咨询：400-668-4866</p>
          </div>
          <div class="modular" @click="problem">
            <img src="../../../assets/image/images_2@2x.png">
            <p>常见问题</p>
          </div>
        </div>
        <div class="table balck-th">
          <top-tips :title="necessary"></top-tips>
          <div class="label-role">
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="createTime"
              label="时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="problemDescription"
              label="问题"
              align="center">
            </el-table-column>
              <el-table-column
              prop="handleAdvice"
              label="反馈结果"
              align="center">
            </el-table-column>
          </el-table>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import search from '../../../components/public/search'
import topTips from '../../../components/public/topTips'
import {getStore} from '../../../tool/Utils'
export default {
  data () {
    return {
      necessary: {
        title: '我的问题历史',
        unfold: false
      },
      tableData: []
    }
  },
  // 数据初始化方法
  mounted () {
    this.getAfterSaleList()
  },
  methods: {
    // 获取登录用户
    getAfterSaleList () {
      let params1 = {
        distributorId: getStore('distributorId'),
        mobile: getStore('mobile')
      }
      this.$api.getAfterSaleList(params1).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
          this.tableData.forEach(item => {
            if (item.handleStatus === '0') {
              item.handleAdvice = '未处理'
            }
          })
        } else {
          this.$message.error('获取信息失败')
        }
      })
    },
    problem () {
      this.$router.push({path: '/help/helpProblem'})
    }
  },
  components: {search, topTips}
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
      .top{
        padding:0px 0 60px 0;
        display:flex;
        justify-content: center;
        .modular{
          width:370px;
          margin-right:12px;
          cursor: pointer;
          &:last-child{
            margin-right:0px;
            margin-left:12px;
          }
          img{
            width:100%;
          }
          p{
            text-align:center;
            font-size:$detail-size;
            color:$text-main-color;
            padding:26px 0 0 0;
          }
        }
      }
  }
}
</style>
