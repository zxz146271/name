<template>
<div class="micro-shop">
  <top-list></top-list>
  <div class="data-chart">
      <top-data :title="necessary"></top-data>
      <high-chart :option="splineData" ></high-chart>
  </div>
  <div class="data-chart">
    <top-data :title="shapetitle"></top-data>
    <high-chart :option="shapeData" ></high-chart>
  </div>
  <div class="data-chart">
    <top-data :title="tabletitle"></top-data>
    <div class="balck-th">
        <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="日期"
          prop="date"
          align="center">
        </el-table-column>
        <el-table-column
          prop="member"
          label="会员总数"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="add"
          align="center"
          label="新增会员数">
        </el-table-column>
        <el-table-column
          prop="active"
          label="活跃会员数"
          width="150"
          align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</div>
</template>

<script>
import topList from '../../../components/data/topList'
import highchartLine from '../../../components/public/highchartLine'
import highChart from '../../../components/public/highChart'
import percentView from '../../../components/public/percentView'
import topData from '../../../components/data/topData'

export default {
  name: 'analysisMember',
  data () {
    return {
      necessary: {
        title: '微店流量',
        indicators: 'indicators',
        date: 'date'
      },
      shapetitle: {
        title: '微店数据',
        indicators: 'indicators',
        date: 'date'
      },
      tabletitle: {
        title: '会员数据明显',
        indicators: 'indicators',
        date: 'date',
        type: 'download'
      },
      splineData: {
        id: 'spid',
        data: {
          chart: {
            type: 'column'
          },
          title: {
            text: '趋势图',
            align: 'left',
            style: {
              color: '#27292E',
              fontSize: '14px',
              fontWeight: '600'
            }
          },
          xAxis: {
            categories: ['10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8']
          },
          yAxis: {
            min: 0,
            title: {
              text: null
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                  [0, 'rgba(255,255,255,0)'],
                  [1, 'rgba(255,255,255,0)']
                ]
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              }
            }
          },
          credits: {
            text: ''
          },
          series: [{
            color: '#FF8B8B',
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0]
          },
          {
            color: '#92DBD7',
            data: [29.9, 71.5, 50.3, 129.2, 144.0, 156.0]
          },
          {
            color: '#B3B5BA',
            data: [29.9, 91.5, 50.3, 69.2, 144.0, 136.0]
          }]
        }
      },
      tableData3: [{
        date: '2018.04.01',
        member: '1276',
        add: '32',
        active: '675'
      },
      {
        date: '2018.04.01',
        member: '1276',
        add: '32',
        active: '675'
      },
      {
        date: '2018.04.01',
        member: '1276',
        add: '32',
        active: '675'
      }],
      shapeData: {
        id: 'shape',
        data: {
          chart: {
            type: 'column'
          },
          title: {
            text: '趋势图',
            align: 'left',
            style: {
              color: '#27292E',
              fontSize: '14px',
              fontWeight: '600'
            }
          },
          xAxis: {
            categories: ['上海', '南京', '武汉', '深圳', '北京', '重庆', '济南', '杭州', '成都']
          },
          yAxis: {
            min: 0,
            title: {
              text: null
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                  [0, 'rgba(255,255,255,0)'],
                  [1, 'rgba(255,255,255,0)']
                ]
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              }
            }
          },
          credits: {
            text: ''
          },
          series: [{
            color: '#FF8B8B',
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 80, 90]
          }]
        }
      }
    }
  },
  components: {topList, highchartLine, highChart, percentView, topData}
}
</script>
<style lang="scss" scoped>
.micro-shop{
  .data-chart{
    margin-top: 40px;
  }
}
</style>
