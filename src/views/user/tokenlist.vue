<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">认证管理</a></el-breadcrumb-item>
       </el-breadcrumb>
      </div>
        <el-table
        v-loading="loading"
          :data="tableData"
          style="width: 100%">
            <el-table-column
      type="index"
      width="50">
    </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            width="50">
          </el-table-column>
          <el-table-column
            prop="uid"
            label="用户ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="180">
          </el-table-column>
           <el-table-column
            prop="utoken"
            label="token">
          </el-table-column>
           <el-table-column
            label="过期时间">
            <template slot-scope="scope">
               {{expretimeStr(scope.row.expretime)}}
            </template>
          </el-table-column>
           <el-table-column
            label="是否过期">
            <template slot-scope="scope">
               {{scope.row.expretime.valueOf()>currentTime? '正常' : '过期'}}
            </template>
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
        @size-change="handleSizeChange"
         @current-change="selectCurrentPage"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        :total="total">
       </el-pagination>
  </el-card>
</template>
<script>
import { allAllUserTokenList } from '@/api/user.js'
import utils from '@/utils/utils.js'
export default {
  name: 'tokenlist',
  data () {
    return {
      tableData: [],
      total: 0,
      pageSize: 10,
      loading: false,
      currentTime: 0
    }
  },
  created () {
    console.log('comment ')
    this.getListData()
  },
  methods: {
    getListData (page = 1) {
      this.loading = true
      allAllUserTokenList({
        pageSize: this.pageSize,
        pageNo: page
      })
        .then((result) => {
          this.loading = false
          console.log('result', result)
          this.currentTime = (new Date()).getTime()
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getListData()
    },
    changeSwitch (value) {
      console.log(value)
    },
    expretimeStr (datetime) {
      return utils.expretimeStr(datetime)
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
