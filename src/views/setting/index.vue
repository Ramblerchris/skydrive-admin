<template>
    <el-card class="box-card"  v-loading="loading">
    <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">系统设置</a></el-breadcrumb-item>
       </el-breadcrumb>
      </div>
  </el-card>
</template>
<script>
export default {
  name: 'setting'
}
</script>
<style scoped>
</style>
