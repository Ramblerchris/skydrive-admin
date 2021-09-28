<template>
  <el-card class="box-card" >
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">测试页面</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'testpage'
}
</script>
<style scoped>
</style>
