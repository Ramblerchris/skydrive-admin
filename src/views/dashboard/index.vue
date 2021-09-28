<template>
<el-card class="box-card"  v-loading="loading">
    <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">主机：{{HostName}} OS:{{os}}（V{{platformVersion}}）开机时间：{{bootTime}}</a></el-breadcrumb-item>
       </el-breadcrumb>
        <!-- <div class="home-container">
           <div  class="titleinfo"  >用户</div>
           <div   class="titleinfo"  >文件数</div>
       </div> -->
        <div class="home-container">
           <div class="viewcontent"><div ref="cpuView" class="chview"></div><span>CPU</span></div>
           <div class="viewcontent"><div ref="memView"  class="chview"></div><span>内存</span></div>
           <div class="viewcontent"><div ref="diskView"  class="chview"></div><span>磁盘</span></div>
       </div>
       <!-- <div class="home-container">
           <div ref="cpuViewlist" style="flex:1 ;width: 1000px;height:400px;"></div>
       </div> -->
      </div>
  </el-card>
</template>
<script>
import * as echarts from 'echarts'
import { getSystemInfo } from '@/api/sysinfo.js'
import utils from '@/utils/utils.js'
// import { number } from 'echarts'

export default {
  data () {
    return {
      HostName: '',
      bootTime: '',
      os: '',
      platformVersion: '',
      timeId: 0,
      startTime: null,
      cpuListData: [],
      endTime: null,
      cpuView: null,
      diskView: null,
      memView: null,
      cpuViewlist: null,
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
      },
      cpuOptionList: {
        // 只放核心部分配置
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        xAxis: [
          {
            // 设置类别
            type: 'time',
            // 固定x轴时间间隔
            interval: 1000,
            // 开始时间
            min: this.startTime,
            // 结束时间
            max: this.endTime,
            // x轴的字
            axisLabel: {
              show: true,
              showMinLabel: true,
              showMaxLabel: true,
              formatter: function (value, index) {
                // 格式化成时分秒
                const date = new Date(value)
                // const date = value
                const nowHours = utils.timeAdd0(date.getHours().toString())
                const nowMin = utils.timeAdd0(date.getMinutes().toString())
                const nowSeconds = utils.timeAdd0(date.getSeconds().toString())
                var texts = [nowHours, nowMin, nowSeconds]
                return texts.join(':')
              }
            }
          }
        ],
        // y轴样式
        yAxis: {
          // boundaryGap: [0, '100%'],
          // 字体颜色
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#303133'
            }
          }
        },
        // 数据系列，一个图表可能包含多个系列，每一个系列可能包含多个数据
        series: [
          {
            name: '测试',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: this.cpuListData
          }
        ]
      }
    }
  },
  created () {
    this.getListData(true)
    this.timeId = setInterval(() => {
      this.getListData()
    }, 2000)
    // this.startTime = new Date().getTime() - 60 * 1000
    // this.endTime = new Date().getTime()
    // const that = this
    // setInterval(function () {
    //   that.startTime = that.startTime + 1000
    //   that.endTime = that.endTime + 1000
    //   console.log('size------:', that.cpuListData)
    //   setTimeout(that.cpuViewlist.setOption({
    //     series: [{
    //       type: 'line',
    //       showSymbol: false,
    //       hoverAnimation: false,
    //       data: that.cpuListData
    //     }],
    //     xAxis: [{
    //       min: that.startTime,
    //       max: that.endTime
    //     }]
    //   }), 200)
    // }, 2000)
  },
  mounted () {
    this.cpuView = echarts.init(this.$refs.cpuView)
    this.diskView = echarts.init(this.$refs.diskView)
    this.memView = echarts.init(this.$refs.memView)
    // this.cpuViewlist = echarts.init(this.$refs.cpuViewlist)
    // this.cpuViewlist.setOption(this.cpuOptionList)
  },
  destroyed () {
    clearInterval(this.timeId)
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
          this.HostName = this.tableData.HostName
          this.os = this.tableData.hostInfo.os
          this.bootTime = utils.expretimeStr(this.tableData.hostInfo.bootTime * 1000)
          this.platformVersion = this.tableData.hostInfo.platformVersion
          this.setCpuInfo()
          this.setDiskInfo()
          this.setMemInfo()
        }).catch((error) => {
          this.loading = false
          console.log('error', error)
        })
    },
    setCpuInfo () {
      console.log('3333', typeof (this.tableData.CpuPercent))
      this.cpuOption.series[0].data[0].value = utils.isNumber(this.tableData.CpuPercent) ? this.tableData.CpuPercent.toFixed(2) : this.tableData.CpuPercent.toNumber().toFixed(2)
      this.cpuView.setOption(this.cpuOption, true)
      // const date = new Date()
      // const nowHours = utils.timeAdd0(date.getHours().toString())
      // const nowMin = utils.timeAdd0(date.getMinutes().toString())
      // const nowSeconds = utils.timeAdd0(date.getSeconds().toString())
      // var texts = [nowHours, nowMin, nowSeconds]
      // this.cpuListData.push({
      //   value: this.cpuOption.series[0].data[0].value,
      //   name: new Date().toString()
      // })
    },
    setMemInfo () {
      this.memOption.series[0].data[0].value = utils.isNumber(this.tableData.MemPercent) ? this.tableData.MemPercent.toFixed(2) : this.tableData.MemPercent.toNumber().toFixed(2)
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
      const diskPercent = utils.isNumber(this.tableData.DiskPercent) ? this.tableData.DiskPercent.toFixed(2) : this.tableData.DiskPercent.toNumber().toFixed(2)
      var usered = diskPercent * this.tableData.DiskTotal / 100
      var empty = this.tableData.DiskTotal - usered
      console.log('result222', this.tableData.DiskTotal)
      console.log('result111', usered + ' ' + empty)
      this.diskOption.series[0].data.push({
        value: usered,
        name: '已使用' + utils.formatDiskSize(usered)
      })
      this.diskOption.series[0].data.push({
        value: empty,
        name: '未使用' + utils.formatDiskSize(empty)
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
    .title {
      margin-top: 10px;
      flex:1 ;
      text-align: center;
      size: 30px;
      font-weight: 900;
    }
    .titleinfo {
      height: 100px;
      flex:1 ;
      text-align: center;
      size: 30px;
      font-weight: 900;
    }
    .viewcontent {
      flex:1 ;
    }
    .viewcontent span {
      flex:1 ;
      text-align: center;
      size: 30px;
      font-weight: 900;
    }
     .chview {
      flex:1 ;
      height: 400px;
    }
</style>
