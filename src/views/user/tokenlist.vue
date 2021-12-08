<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">认证管理</a></el-breadcrumb-item>
       </el-breadcrumb>
      </div>
       <el-form ref="form"  label-width="60px" size="mini" class="selecform" >
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">过期</el-radio>
            <el-radio :label="1">未过期</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" >
          <!-- v-model="input" -->
          <el-input style="width:300px;" placeholder="请输入手机号"
          clearable='true'
          v-model="text"
          maxlength="12"
          show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="datarange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="getArticles(1)">筛选</el-button>
          <el-button type="info" :disabled="loading"  @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
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
            label="tokenID/用户ID"
            width="120">
             <template slot-scope="scope">
                {{scope.row.id}} / {{scope.row.uid}}
             </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号/token"
            width="300">
             <template slot-scope="scope">
                {{scope.row.phone}}<br>
                 {{scope.row.utoken}}<br>
             </template>
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
  .selecform {
    text-align: left;
  }
</style>
