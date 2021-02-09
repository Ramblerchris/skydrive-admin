<template>
    <div class="publishshare-container"><el-card class="box-card"  v-loading="loading">
    <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">共享</a></el-breadcrumb-item>
       </el-breadcrumb>
      </div>
  </el-card></div>
</template>
<script>
export default {
  name: 'publishshare'
}
</script>
<style scoped>
</style>
