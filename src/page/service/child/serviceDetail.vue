<template>
  <div class="service-box">
    <title-top  :text="ability"></title-top>
    <functional @payment="payment"></functional>
    <title-top :text="SMSPackageTitle"></title-top>
    <SMSPackage @payment="payment"></SMSPackage>
    <title-top :text="service"></title-top>
    <service @payment="payment"></service>
    <div class="table balck-th">
      <div class="table-title">
        <span>购买历史</span>
        <el-button class="el-button" @click="ionvoices" data-code="10010001">发票申请</el-button>
      </div>
      <el-table
      :data="ServiceHistoryByDistributorInfo"
      style="width: 100%">
      <el-table-column
        prop="authorizationDate"
        label="时间"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="订单号"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="serviceName"
        align="center"
        label="购买项目">
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        align="center"
        label="实际支付费用">
      </el-table-column>
      <el-table-column
       prop="hasInvoice"
        align="center"
        label="是否开票"
        width="120">
      </el-table-column>
    </el-table>
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
    </div>
    <el-dialog
      :visible.sync="importComm"
        width="550px"
        v-if="importComm"
        class="import-dialog">
          <payment :serviceItem="serviceItem" :isUnit="isUnit" @close-payment="handleClose"></payment>
  </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import titleTop from '../../../components/service/titleTop'
import functional from '../../../components/service/functional'
import service from '../../../components/service/service'
import SMSPackage from '../../../components/service/SMSPackage'
import payment from '../../../components/service/payment'
import { judgeButton, getStore } from '../../../tool/Utils'
export default{
  data () {
    return {
      importComm: false,
      serviceItem: [],
      isUnit: 'hh',
      ability: {
        type: '购买功能包'
      },
      service: {
        type: '增值服务包'
      },
      SMSPackageTitle: {
        type: '短信套餐包'
      },
      // 初始化当前经销商所购买的服务信息
      ServiceHistoryByDistributorInfo: [],
      // 信息总条数
      totalCount: 0,
      currentPage: 1,
      pagesize: 10
    }
  },
  computed: {
    ...mapGetters(['powerButton'])
  },
  mounted () {
    // 初始化加载 原型
    this.getServiceHistoryByDistributorId()
    this.getButton()
  },
  methods: {
    getButton () {
      let pageButtons = document.getElementsByTagName('button')
      judgeButton(pageButtons, this.powerButton)
    },
    // 加载方法
    getServiceHistoryByDistributorId (index) {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        storeId: getStore('storeIdWeb')
      }
      this.$api.getServiceHistoryByDistributorId(params).then(res => {
        if (res.code === 0) {
          this.ServiceHistoryByDistributorInfo = res.data
          this.totalCount = res.count
          this.ServiceHistoryByDistributorInfo.forEach(item => {
            if (item.hasInvoice === '0') {
              item.hasInvoice = '未开票'
            } else if (item.hasInvoice === '1') {
              item.hasInvoice = '审核中'
            } else if (item.hasInvoice === '2') {
              item.hasInvoice = '已开票'
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    ionvoices () {
      if (getStore('distributorType') === 'personal') {
        this.$message.error('您为个人用户,无法使用在线开票功能')
        return false
      } else {
        this.$router.push({path: '/service/serviceInvoices'})
      }
    },
    payment (value, param) {
      this.serviceItem = value
      this.isUnit = param
      this.importComm = true
    },
    handleClose () {
      this.importComm = false
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      this.getServiceHistoryByDistributorId()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getServiceHistoryByDistributorId()
    }
  },
  components: {titleTop, functional, service, payment, SMSPackage}
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
.table{
  padding: 50px 0;
  .table-title{
    background-color: $gray-color;
    font-size: $xlg-size;
    height: 44px;
    padding: 11px 16px;
    display: flex;
    justify-content: space-between;
    button{
      padding: 5px 12px;
      color: #fff;
      font-size: $xs-size;
      background: $blue-color;
      border: none;
    }
  }
.edit{
    border: 0;
    background: none;
    color:$main-color;
    &:hover{
      color:lighten($main-color, 12%)
    }
  }
}
</style>
