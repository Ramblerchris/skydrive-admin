<template>
  <el-container class="layout-container">
    <el-aside class="aside"  width='auto'>
      <layoutaside style="height:100%;" :is-collapse="isCollapse"/>
    </el-aside >
    <el-container class="headermain">
      <el-header class="header" >
        <div class="headerleft">
          <i :class="{
            'el-icon-s-fold':isCollapse,
            'el-icon-s-unfold':!isCollapse}"
           v-on:click = "isCollapse = !isCollapse"></i>
         <span>XXX</span>
        </div>
       <el-dropdown trigger="click">
        <div class="headerright">
          <el-avatar size="medium" alt="头像" icon="el-icon-user-solid" src="$store.getters.getImageUrlQ(userinfo.photo_file_sha1)"></el-avatar>
          <!-- <img class="headericon" v-bind:src="$store.getters.getImageUrlQ(userinfo.photo_file_sha1)"/> -->
          <span>{{userinfo.admin_name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
       <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-setting" v-on:click.native="setting">设置</el-dropdown-item>
        <el-dropdown-item icon="el-icon-user" v-on:click.native="logout" >退出登录</el-dropdown-item>
       </el-dropdown-menu>
       </el-dropdown>
      </el-header>
      <el-main class="main" >
        <keep-alive >
          <router-view :key="key" />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import layoutaside from '@/components/aside.vue'
import { getUserinfo } from '@/api/user.js'
import GlobalBus from '@/utils/global-bus.js'
export default {
  name: 'Layout',
  components: {
    layoutaside
  },
  data () {
    return {
      isCollapse: false,
      userinfo: {}
    }
  },
  created () {
    this.getUserinfoRe()
    GlobalBus.$on('updateuser', (data) => {
      //  this.userinfo.name = data.name
      //  this.userinfo.photo = data.photo
    })
  },
  methods: {
    ...mapGetters(['getImageUrl']),
    getUserinfoRe () {
      getUserinfo()
        .then((result) => {
          console.log(' getUserinfo', result)
          this.userinfo = result.data.data
        }).catch((err) => {
          console.log(err)
        })
    },
    logout () {
      console.log('退出')
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // window.localStorage.removeItem('user')
        this.$store.commit('loginOut')
        this.$router.push({
          name: 'login'
        })
      }).catch(() => { })
    },
    setting () {
      console.log('setting')
      this.$router.push({
        name: 'setting'
      })
    }
  },
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>
<style scoped lang='less'>
  .layout-container {
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    .aside{
      background: white;
    }
    .headermain{
      .header{
        background: white;
        display: flex;
        flex-direction:row;
        // border-bottom: 0.2px solid #545c64;
        .headerleft {
          flex: 1;
          justify-content: flex-start;
          align-items: center;
          display: flex;
        }
        .headerleft > i{
         font-size: 20px;
         margin-left: 0px;
        }
        .headerleft > span{
         font-size: 18px;
         margin-left: 6px;
         }
        .headerright {
          flex: 1;
          justify-content: center;
          align-items: center;
          display: flex;
          height: 100%;
        }
        .headerright> img  {
          width: 28px;
          height: 28px;
          // background: url('./ic_gold_float_thereum.png');
          background-repeat: no-repeat;
          background-size: contain;
          border-radius: 50%;
        }
        .headerright> span  {
          margin-left: 12px;
          margin-right: 4px;
        }
      }
      .main{
        background: white;
      }
    }
  }
</style>
