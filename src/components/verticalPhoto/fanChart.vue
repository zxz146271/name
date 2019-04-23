<template>
  <div class="mainer">
    <div class="header">
      <h3>渠道浏览量</h3>
      <el-date-picker
        v-model="selectDate"
        size="large"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        prefix-icon="el-icon-date"
        range-separator="~"
        @change="selectDateM">
      </el-date-picker>
    </div>
    <!-- ECharts图表测试 -->
    <div class="echart-box">
        <p id="cart" :style="{width:'100%',height:'260px'}"></p>
        <!-- 扇形图标注 -->
        <div class="pair-box">
            <div class="pair" v-for="(item,index) in pairList" :key="index">
                <div class="pair-circle" :style="{backgroundColor:item.pairColor}"></div>
                <span class="pair-article">{{item.pairTitle}}</span>
                <span class="pair-line"></span>
                <span class="pair-percent">{{item.pairPercent}}</span>
                <span class="pair-number">{{item.pairNumber}}</span>
            </div>
        </div>
        <!-- 月总计 -->
        <div class="month-box">
          <span class="monthTotal">月总计</span>
          <span class="monthNumber">{{monthTotal}}</span>
        </div>
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
      selectDate: '',
      pairColor:'#36CBCB',
      startTime: '',
      endTime: '',
      pairList:[
        {
          pairColor:'#36CBCB',
          pairTitle:'文章分享浏览数',
          pairPercent:'0%',
          pairNumber:'0'
        },
        {
          pairColor:'#549BF8',
          pairTitle:'图册分享浏览数',
          pairPercent:'0%',
          pairNumber:'0'
        },
        {
          pairColor:'#FF719C',
          pairTitle:'全景图分享浏览数',
          pairPercent:'0%',
          pairNumber:'0'
        },
        {
          pairColor:'#FACC14',
          pairTitle:'案例分享浏览数',
          pairPercent:'0%',
          pairNumber:'0'
        }
      ],
      monthTotal: 0,
      optionBar: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color:['#36CBCB', '#549BF8', '#FF719C','#FACC14'],
        legend: {
          orient: "vertical",
          // x: "left",
          left:460,    //图例距左宽度
          top:0,
          data: ["文章分享浏览数", "案例分享浏览数", "全景图分享浏览数", "图册分享浏览数"],
          icon: "circle",   //圆形
          itemWidth:8,     //图例大小
          itemHeight:8,
          itemGap:37,
        },
        series: [
          {
            name: "浏览量",
            type: "pie",
            radius: ["65%", "80%"],
            center: ['23%', '47%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [//此处可以修改扇形图中心位置说明，和右边指示name
              // { value: 335},
              // { value: 310},
              // { value: 234},
              // { value: 135}
            ]
          }
        ]
      }
    }
  },
  components: {},
  computed: {},
  methods: {
    markLine () {
      /*ECharts图表*/
      var myChart = echarts.init(document.getElementById("cart"))
      myChart.setOption(this.optionBar);
      window.onresize = myChart.resize;
    },
    getData () {
      let params = {
        startTime: this.startTime,
        endTime: this.endTime
      }
      this.$api.distributionType(params).then(res => {
        let arr = []
        this.monthTotal = res.data[0].totalNum
        if(res.code == 0){
          let data = res.data
          if(data[0].totalNum != 0){
            data.forEach(element => {
              arr.push({value: element.articleNum, name: '文章分享'})
              arr.push({value: element.atlasNum, name: '图册分享'})              
              arr.push({value: element.panoramaNum, name: '全景图分享'})
              arr.push({value: element.caseNum, name: '案例分享'})

            })
            arr.forEach((e, i, a) => {
              let circle = Number(a[i].value / this.monthTotal)*10000
              // console.log(Number(a[i].value / this.monthTotal)*10000, Math.floor(circle)/10, Math.ceil(circle)/10, Math.round(circle)/10)
              let prent = Math.round(circle)/100 + '%'
              Vue.set(this.pairList[i], `pairPercent`, prent) 
              Vue.set(this.pairList[i], `pairNumber`, a[i].value)
            })
          }else{
            arr.push({value: 0})
            arr.push({value: 0})
            arr.push({value: 0})
            arr.push({value: 0})
            arr.forEach((e, i, a) => {
              let prent = '0%'
              Vue.set(this.pairList[i], `pairPercent`, prent)
              Vue.set(this.pairList[i], `pairNumber`, a[i].value)
            })
          }
        }else{
          this.$message.error(res.msg)
        }
        Vue.set(this.optionBar.series[0], `data`, arr)
        this.markLine()
      })
    },
    selectDateM (e) {
      if(e){
        this.startTime = e[0]
        this.endTime = e[1]
      }else{
        this.startTime = ''
        this.endTime = ''
      }
      this.getData()
    }
  },
  mounted () {
    this.getData()
  }
};
</script>

<style scoped>
/* 总 */
.mainer{
  padding: 24px 32px 0;
  position: relative;
}
.header{
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  /* margin:0 0 24px 0; */
}
.header h3{
  font-size: 16px;
}

/* 扇形图标注 */
.echart-box{
    position:relative;
}
.pair-box{
  position: absolute;
  top: -15px;
  left: 500px;
}
.pair{
  font-size: 16px;
  color: rgba(0,0,0,0.85);
  margin-top: 38px;
}
.pair .pair-circle{
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.pair .pair-article{
  padding: 0 8px;
  width:144px;
  display:inline-block;
}
.pair .pair-line{
  display: inline-block;
  width: 1px;
  height: 10px;
  background-color: rgba(0,0,0,0.45);
}
.pair .pair-percent{
  color: rgba(0,0,0,0.45);
  margin: 0 21px 0 16px;
}
/* 月总计 */
.month-box{
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 98px;
  /* left: 204px; */
  left: 21%;
  text-align: center;
}
.month-box .monthTotal{
  color: #8C8C8C;
  font-size: 14px;
}
.month-box .monthNumber{
  color: #000;
  font-size: 20px;
  font-weight: 500;
}
</style>
