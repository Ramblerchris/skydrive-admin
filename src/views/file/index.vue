<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <!-- <el-button  style="float: right; margin-left: 30px;padding: 3px 10px;" type="primary">刷新</el-button>
        <el-button style="float: right; margin-left: 30px;padding: 3px 10px;" type="primary">过滤</el-button> -->
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">全部文件</a></el-breadcrumb-item>
       </el-breadcrumb>
      </div>
       <el-form ref="form"  label-width="80px" size="mini" class="selecform" >
        <el-form-item label="文件类型">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">视频</el-radio>
            <el-radio :label="1">图片</el-radio>
          </el-radio-group>
        </el-form-item>
           <el-form-item label="文件状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">已删除</el-radio>
            <el-radio :label="1">未删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传时间">
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
            width="38">
          </el-table-column>
           <el-table-column prop="date"
          align="center" label="图" width="180">
          <template slot-scope="scope">
           <span  v-if="scope.row.type == 1">文件夹</span>
           <el-image  v-else
              style="width: 100px; height: 100px"
              :src="$store.getters.getImageUrlQ(scope.row.sha1)"
              :preview-src-list="[$store.getters.getImageUrl(scope.row.sha1)]"
              fit="contain"
              lazy>
            </el-image>
            <br>
            {{formatDiskSize(scope.row.size)}}
          </template>
        </el-table-column>
          <el-table-column
            label="ID"
            width="80">
             <template  slot-scope="scope" style="white-space: pre-wrap;text-align:center;">
               {{scope.row.id}}
            </template>
          </el-table-column>
          <el-table-column
            label="文件名称(SHA1)"
            width="200">
              <template  slot-scope="scope">
            {{scope.row.filename}}<br>({{scope.row.sha1}})
              </template>
          </el-table-column>
           <el-table-column
            label="创建时间"
            width="180">
             <template  slot-scope="scope">
            {{scope.row.createattimestr}}
             </template>
           </el-table-column>
          <el-table-column
            prop="path"
            label="文件路径"
            width="300">
          </el-table-column>
          <el-table-column
          fixed="right"
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getListData()
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
  .selecform {
    text-align: left;
  }
</style>
