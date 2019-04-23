<template>
  <div class="mainer">
    <div class="mainer-box">
        <div class="header">
          <h3>数据概述</h3>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-select v-model="type"  style="width:112px" @change="chooseThis(type)">
                    <el-option v-for="item in options" :key="item.type" :label="item.label" :value="item.value"  >
                  </el-option>
                </el-select>
            </el-form-item>
          </el-form>
        </div>
        <!-- ECharts图表测试 -->
        <p id="main" ref = "main" :style="{width: '100%', height: '550px'}"></p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
var echarts = require("echarts");
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "",
  data() {
    return {
      new_userData:[],
      type: '近7天',
        //近七天
      options: [{
        type: 0,
        value: '7',
        label: '近7天',
        isActive: true,
      }, {
        type: 1,
        value: '15',
        label: '近15天',
        isActive: false,
      }, {
        type: 2,
        value: '30',
        label: '近30天',
        isActive: false,
      }],
      value4: '选项1',
      optionBar:{
        title: {},
        color:['#F2C874','#549BF8', '#FF719C', '#53D2D2'],
        textStyle:{   //文本
            color:"#000000",
            fontSize:16,
            fontFamily:"Source Han Sans SC",
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["  访客", "  潜客", "  意向客户", "  已购客户"],
          type: "scroll",
          bottom: 0,
          icon: "rect", 
          itemWidth:50,//访客图标宽度
          itemHeight:12,
          itemGap:74,
        },
        toolbox: {
          show: false,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            // data: this.chartDateList,[1,2,3]
            data: this.chartDateList,
            // offset:15,// x轴下面字体往下偏移
            axisLine:{   //x轴刻度线属性
                        lineStyle:{
                            color:'#B6B6B6',
                            width:1,//这里是为了突出显示加上的
                        }
                    },
            "axisTick":{       //x轴刻度线
              "show":false
            },
            axisLabel:{
                  //X轴刻度配置
                  interval:0//0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
              }
          }
        ],
        yAxis: [
          {
            type: "value",
            name:"（人）",      //单位
            "axisLine":{       //y轴
                "show":false
            },
            "axisTick":{       //y轴刻度线
              "show":false
            },
          }
        ],
        series: [
          {
            name: "  访客",
            type: "bar",
            barWidth : 6,
            data: [],
            markPoint: {
              data: [
              ]
            },
            markLine: {
              data: []
            }
          },
          {
            name: "  潜客",
            type: "bar",
            barWidth : 6,
            data: [],
            markPoint: {
              data: [
              ]
            },
            markLine: {
              data: []
            }
          },
          {
            name: "  意向客户",
            type: "bar",
            barWidth : 6,
            data: [],
            markPoint: {
              data: [
              ]
            },
            markLine: {
              data: []
            }
          },
          {
            name: "  已购客户",
            type: "bar",
            barWidth : 6,
            data: [],
            markPoint: {
              data: []
            },
            markLine: {
              data: []
            }
          }
        ]
      },
      chartDateList:[]
    }
  },
  components: {},
  computed: {},
  methods: {
    setChartDateList (n) {
      this.chartDateList = []
      this.chart = echarts.init(document.getElementById('main'))
      this.chart.setOption(this.optionBar)
      window.onresize = this.chart.resize;
    },
    // 选择第几天
    chooseThis (index) {
      this.distributionData(index)
    },
    //近七天
    distributionData (index) {
      let params = {
        nearlyDay: index
      }
      this.$api.distributionData(params).then(res => {
        let data = res.data;
        let xdata = []
        let buyerNum = []
        let intentionalNum = []
        let submemberNum = []
        let vistorNum = []
        data.forEach(e => {
          xdata.push(e.days)
          buyerNum.push(e.buyerNum)
          intentionalNum.push(e.intentionalNum)
          submemberNum.push(e.submemberNum)
          vistorNum.push(e.vistorNum)
        });
        Vue.set(this.optionBar.xAxis[0], `data`, xdata)
        Vue.set(this.optionBar.series[0], `data`, vistorNum)
        Vue.set(this.optionBar.series[1], `data`, submemberNum)
        Vue.set(this.optionBar.series[2], `data`, intentionalNum)
        Vue.set(this.optionBar.series[3], `data`, buyerNum)
        console.log("X-----------",data, xdata, this.optionBar.xAxis[0])
        this.new_userData = res.data
        this.setChartDateList()
      })
    }

  },
  mounted() {
    this.distributionData('7')
  }
}
  
// }
</script>

<style scoped>
canvas{
  width:670px;
}
.mainer{
  margin-bottom:34px;
}
/* 头部header */
.header{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    border-bottom: 1px solid #E9E9E9;
}
.header h3{
    height: 60px;
    line-height: 60px;
    font-size: 16px;
}
.header .demo-form-inline{
    padding-top: 10px;
    height: 60px;
    line-height: 60px;
}
/* 柱状图 */
</style>
