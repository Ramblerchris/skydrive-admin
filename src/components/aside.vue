<template>
  <el-menu
    class="el-menu-aside el-menu-vertical-demo"
    :collapse="isCollapse"
    :default-active="$route.path"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
  <!-- router 开启路由模式 -->
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">数据统计</span>
    </el-menu-item>
    <el-menu-item index="/allfile" >
      <i class="el-icon-document"></i>
      <span slot="title">全部文件</span>
    </el-menu-item>
      <el-submenu  index="/alluser">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <!-- <el-menu-item-group>
          <el-menu-item index="1-1">所有用户</el-menu-item>
          <el-menu-item index="1-2">认证管理</el-menu-item>
          <el-menu-item index="1-2">登录日志</el-menu-item>
        </el-menu-item-group> -->
        <el-menu-item class="level-2" index="/alluser">所有用户</el-menu-item>
        <el-menu-item class="level-2" index="/tokenlist">认证管理</el-menu-item>
        <el-menu-item class="level-2" index="/loginlog">登录日志</el-menu-item>
    </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户文件</span>
        </template>
          <el-menu-item index="/dir">文件夹管理</el-menu-item>
          <el-menu-item index="/deletefile">已删除列表</el-menu-item>
          <el-menu-item index="/publishshare">共享文件夹</el-menu-item>
    </el-submenu>
     <el-submenu  >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>影视管理</span>
        </template>
          <el-menu-item index="112-1">新增电影</el-menu-item>
          <el-menu-item index="112-2">新增剧集</el-menu-item>
          <el-menu-item index="112-2">推荐管理</el-menu-item>
    </el-submenu>
     <el-menu-item index="/setting">
      <i class="el-icon-s-comment"></i>
      <span slot="title">系统设置</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'layoutaside',
  props: ['is-collapse'],
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped lang="less">
    .el-menu-aside{
         text-align: left;
        // height: 100%;
        // background: rgb(99, 99, 99);
        // el-menu-item {
        //     vertical-align: middle;
        //     font-size: 18px;
        // }
        // span{
        //     font-size: 14px;
        //     padding-top: 10px;
        // }
    }
    .level-2{
        font-size: 13px;
    }
    //  防止抖动
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 148px;
      min-height: 400px;
    }
</style>
