<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">文件管理</a></el-breadcrumb-item>
       </el-breadcrumb>
      </div>
        <el-table
        v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sha1"
            label="文件sha1">
          </el-table-column>
           <el-table-column
            prop="createattimestr"
            label="创建时间"
            width="220">
           </el-table-column>
            <el-table-column
            label="文件大小"
            width="180">
            <template  slot-scope="scope">
              {{formatDiskSize(scope.row.size)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="path"
            label="文件路径">
          </el-table-column>
           <el-table-column
            label="操作"
             width="120">
            <template  slot-scope="scope">
              <el-switch
              @change="changeSwitch"
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            </template>
          </el-table-column>
       </el-table>
        <el-pagination
        :disabled="loading"
        class="pagination"
        background
         @current-change="selectCurrentPage"
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :total="total">
       </el-pagination>
  </el-card>
</template>
<script>
import { getAllFileList } from '@/api/file.js'
import utils from '@/utils/utils.js'
export default {
  name: 'allfile',
  data () {
    return {
      tableData: [],
      total: 0,
      pageSize: 10,
      loading: false
    }
  },
  created () {
    console.log('comment ')
    this.getListData()
  },
  methods: {
    getListData (page = 1) {
      this.loading = true
      getAllFileList({
        pageSize: this.pageSize,
        pageNo: page
      })
        .then((result) => {
          this.loading = false
          console.log('result', result)
          this.tableData = result.data.data.list
          this.total = result.data.data.total
        }).catch((error) => {
          this.loading = false
          console.log('error', error)
        })
    },
    selectCurrentPage (page) {
      this.getListData(page)
    },
    changeSwitch (value) {
      console.log(value)
    },
    formatDiskSize (value) {
      return utils.formatDiskSize(value)
    }
  }
}
</script>
<style scoped>
 .pagination{
    margin-top: 30px;
    text-align: right;
  }
</style>
