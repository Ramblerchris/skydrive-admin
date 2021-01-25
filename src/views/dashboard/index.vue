<template>
<el-card class="box-card"  v-loading="loading">
    <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">系统信息</a></el-breadcrumb-item>
       </el-breadcrumb>
        <div class="home-container">
           <div ref="cpuView" style="width: 400px;height:400px;"></div>
           <div ref="memView" style="width: 400px;height:400px;"></div>
           <div ref="diskView" style="width: 400px;height:400px;"></div>
       </div>
      </div>
  </el-card>
</template>
<script>
import * as echarts from 'echarts'
import { getSystemInfo } from '@/api/sysinfo.js'
import utils from '@/utils/utils.js'

export default {
  name: 'allUser',
  data () {
    return {
      cpuView: null,
      diskView: null,
      memView: null,
      tableData: {},
      loading: false,
      cpuOption: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [{
          name: 'Pressure',
          type: 'gauge',
          radius: '60%',
          detail: {
            formatter: '{value}'
          },
          data: [{
            value: 0,
            name: 'CPU'
          }]
        }]
      },
      diskOption: {
        // title: {
        //   text: '硬盘使用',
        //   subtext: '硬盘使用',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left'
        // },
        series: [{
          name: '硬盘使用',
          type: 'pie',
          radius: '58%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
        ]
      },
      memOption: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [{
          name: 'Pressure',
          type: 'gauge',
          radius: '60%',
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
    this.getListData(true)
    setInterval(() => {
      this.getListData()
    }, 2000)
  },
  mounted () {
    this.cpuView = echarts.init(this.$refs.cpuView)
    this.diskView = echarts.init(this.$refs.diskView)
    this.memView = echarts.init(this.$refs.memView)
  },
  methods: {
    getListData (init) {
      if (init) {
        this.loading = true
      }
      getSystemInfo()
        .then((result) => {
          this.loading = false
          // console.log('result', result)
          this.tableData = result.data.data
          this.setCpuInfo()
          this.setDiskInfo()
          this.setMemInfo()
        }).catch((error) => {
          this.loading = false
          console.log('error', error)
        })
    },
    setCpuInfo () {
      this.cpuOption.series[0].data[0].value = this.tableData.CpuPercent.toNumber().toFixed(2)
      this.cpuView.setOption(this.cpuOption, true)
    },
    setMemInfo () {
      this.memOption.series[0].data[0].value = this.tableData.MemPercent.toNumber().toFixed(2)
      if (utils.isNndeNull(this.tableData.MemTotal)) {
        this.memOption.series[0].data[0].name = '--'
      } else {
        this.memOption.series[0].data[0].name = utils.formatDiskSize(this.tableData.MemTotal)
      }
      this.memView.setOption(this.memOption, true)
    },
    setDiskInfo () {
      if (this.diskOption.series[0].data) {
        this.diskOption.series[0].data.length = 0
      }
      var usered = this.tableData.DiskPercent.toNumber().toFixed(2) * this.tableData.DiskTotal / 100
      var empty = this.tableData.DiskTotal - usered
      console.log('result222', this.tableData.DiskTotal)
      console.log('result111', usered + ' ' + empty)
      this.diskOption.series[0].data.push({
        value: usered,
        name: '已使用'
      })
      this.diskOption.series[0].data.push({
        value: empty,
        name: '未使用'
      })
      this.diskView.setOption(this.diskOption, true)
    }
  }
}
</script>
<style scoped>
    .home-container {
        background: white;
        display: flex;
    }
</style>
