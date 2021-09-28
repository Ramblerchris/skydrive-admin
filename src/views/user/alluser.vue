<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">所有用户</a></el-breadcrumb-item>
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
            width="80">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="用户名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
           <el-table-column
            prop="signup_at"
            label="注册时间">
          </el-table-column>
           <el-table-column
            prop="last_active"
            label="最后登录时间">
          </el-table-column>
           <el-table-column
            label="是否禁用">
            <template slot-scope="scope">
               {{scope.row.status == 1? '正常' : '禁用'}}
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
import { allUserList } from '@/api/user.js'
export default {
  name: 'allUser',
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
      allUserList({
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getListData()
    },
    changeSwitch (value) {
      console.log(value)
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
