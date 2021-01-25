<template>
<el-card class="box-card"  v-loading="loading">
    <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">系统信息</a></el-breadcrumb-item>
       </el-breadcrumb>
        <div class="home-container">
        <div ref="main0" style="width: 600px;height:400px;"></div>
        <div ref="main1" style="width: 600px;height:400px;"></div>
        <div ref="main2" style="width: 600px;height:400px;"></div>
    </div>
      </div>
  </el-card>
</template>
<script>
import * as echarts from 'echarts'
import { getSystemInfo } from '@/api/sysinfo.js'
export default {
  name: 'allUser',
  data () {
    return {
      myChart1: null,
      tableData: {},
      loading: false,
      option: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [{
          name: 'Pressure',
          type: 'gauge',
          detail: {
            formatter: '{value}'
          },
          data: [{
            value: 0,
            name: 'CPU'
          }]
        }]
      }
    }
  },
  created () {
    console.log('comment ')
    this.getListData()
    setInterval(() => {
      this.getListData()
    }, 2000)
  },
  mounted () {
    this.myChart1 = echarts.init(this.$refs.main0)
  },
  methods: {
    getListData (init) {
      if (init) {
        this.loading = true
      }
      getSystemInfo()
        .then((result) => {
          this.loading = false
          console.log('result', result)
          this.tableData = result.data.data
          this.option.series[0].data[0].value = this.tableData.CpuPercent.toNumber().toFixed(2)
          console.log('result111', this.tableData.CpuPercent)
          // 基于准备好的dom，初始化echarts实例
          // 指定图表的配置项和数据
          // 使用刚指定的配置项和数据显示图表。
          this.myChart1.setOption(this.option, true)
        }).catch((error) => {
          this.loading = false
          console.log('error', error)
        })
    }
  }
}
</script>
<style scoped>
    .home-container {
        background: white;
    }
</style>
