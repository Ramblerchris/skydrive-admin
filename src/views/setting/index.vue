<template>
  <el-card class="box-card" >
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">系统设置</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="form"  label-width="80px" size="mini" class="selecform" >
      <el-form-item label="备份">
        <el-switch
          v-model="switchvalue"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="开启备份"
          inactive-text="关闭备份">
        </el-switch>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="getArticles(1)">确定</el-button>
          <el-button type="info" :disabled="loading"  @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>
<script>
export default {
  name: 'setting',
  data () {
    return {
      switchvalue: true
    }
  }
}
</script>
<style scoped>
  .selecform {
    text-align: left;
  }
</style>
