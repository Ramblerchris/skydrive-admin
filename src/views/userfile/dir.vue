<template>
   <el-card class="box-card"  v-loading="loading">
    <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">文件夹</a></el-breadcrumb-item>
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
        <el-form-item label="筛选用户" >
           <el-checkbox v-model="checked">手机号</el-checkbox>
          <!-- v-model="input" -->
          <el-input style="width: 180px;  margin:0px 10px 0px" placeholder="请输入手机号"
          clearable='true'
          v-model="text"
          maxlength="12"
          show-word-limit></el-input>
                <el-checkbox style=" margin:0px 30px 0px; text-align: right;" v-model="checked">ID</el-checkbox>
          <!-- v-model="input" -->
          <el-input style="width: 60px;  margin:0px 10px 0px" placeholder="ID"
          clearable='true'
          v-model="number"></el-input>
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
  </el-card>
</template>
<script>
export default {
  name: 'dir'
}
</script>
<style scoped>
  .selecform {
    text-align: left;
  }
</style>
