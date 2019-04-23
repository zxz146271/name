<template>
  <div :id="option.id" class="highchart"></div>
</template>
<script>
import HighCharts from 'HighCharts'
export default {
  data () {
    return {}
  },
  props: ['option'],
  // watch: {
  //   option () {
  //     HighCharts.chart(this.thisId, this.option)
  //   }
  // },
  // watch: {
  //   // option (newVal, oldVal) {
  //   //   if (newVal.data.series[0].data !== oldVal.data.series[0].data) {
  //   //     HighCharts.chart(this.option.id, this.option.data)
  //   //   }
  //   // }
  //   newValue (val, oldVal) {
  //     HighCharts.chart(this.option.id, this.option.data).redraw()
  //   }
  // },
  // computed: {
  //   newValue () {
  //     return this.option.data.series[0].data
  //   }
  // },
  mounted () {
    HighCharts.chart(this.option.id, this.option.data)
  }
}
</script>
<style lang="scss" scoped>
.highchart{
  flex: 1;
}
</style>
