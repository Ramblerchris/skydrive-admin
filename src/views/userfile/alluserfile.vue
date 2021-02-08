<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户文件管理</a></el-breadcrumb-item>
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
           <el-table-column prop="date"
          align="center" label="图" width="180">
          <template slot-scope="scope">
          <!--  <img v-if="scope.row.cover.type == 1"
                  style="width:100px;height:100px;"
                   :src="scope.row.cover.images[0]">
                  <img v-else style="width:100px;height:100px;" :src="defaulturl"> -->
                  <!-- {{":"+$store.getters.getImageUrl(scope.row.sha1)}} -->
           <span  v-if="scope.row.type == 1">文件夹</span>
           <el-image  v-else
              style="width: 100px; height: 100px"
              :src="$store.getters.getImageUrlQ(scope.row.sha1)"
              :preview-src-list="[$store.getters.getImageUrl(scope.row.sha1)]"
              fit="contain"
              lazy>
            </el-image>
          </template>
        </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            width="80">
          </el-table-column>
           <el-table-column
            label="文件类型"
            width="80">
            <template slot-scope="scope">
               {{scope.row.type == 1? '文件夹' : '文件'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="filename"
            label="文件名称"
            width="300">
          </el-table-column>
          <el-table-column
            prop="sha1"
            label="文件sha1"
            width="200">
          </el-table-column>
           <el-table-column
            prop="createattimestr"
            label="创建时间"
            width="200">
           </el-table-column>
           <el-table-column
            prop="updatattimestr"
            label="更新时间"
            width="200">
           </el-table-column>
            <el-table-column
            label="文件大小"
            width="100">
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
            width="120"
            >
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
import { getAllUserFile } from '@/api/userfile.js'
import utils from '@/utils/utils.js'
export default {
  name: 'alluserfile',
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
      getAllUserFile({
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
    },
    formatDiskSize (value) {
      if (utils.isNndeNull(value)) {
        return '--'
      }
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
