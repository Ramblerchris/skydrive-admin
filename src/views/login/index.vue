<template>
   <div class="container">
       <vue-particles
       style=" width:100% ;height:100%; position:absolute;"
        color="#dedede"
        :particle-opacity="0.7"
        :particles-number="30"
        shape-type="circle"
        :particle-size="4"
        lines-color="#dedede"
        :lines-width="1"
        :line-linked="true"
        :line-opacity="0.4"
        :lines-distance="150"
        :move-speed="3"
        :hover-effect="true"
        hover-mode="grab"
        :click-effect="true"
        click-mode="push"/>
      <div class='login-container'>
        <div class="login-logo">XXX管理系统</div>
        <!-- 表单验证： :rules="rules"  prop='mobile'  对应的是v-model='user.mobile' 中的mobile-->
        <el-form
        class='login-form'
        ref='form'
        :model='user'
        :rules='rules'
        v-loading='isShowLoading' >
          <el-form-item  prop='phone' >
            <el-input v-model='user.phone' placeholder='请输入账号'></el-input>
          </el-form-item>
          <el-form-item  prop='password' >
            <el-input v-model='user.password' placeholder='请输入密码' ></el-input>
          </el-form-item>
          <!-- <el-form-item prop='isagree'>
            <el-checkbox v-model='user.isagree' type='boolean' >请阅读用户隐私协议和用户协议</el-checkbox>
          </el-form-item> -->
          <el-form-item>
            <el-button type='primary' style='width:100%' :loading='isShowLoading' @click="onLogin('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>
<script>
import { login } from '@/api/user.js'
export default {
  name: 'login',
  data () {
    return {
      user: {
        phone: '15038267031',
        password: '123456'
      },
      isShowLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { pattern: /^1[3|5|6|7|8|9]\d{9}$/, message: '必须为手机号', trigger: 'change' },
          { min: 3, max: 11, message: '账号格式错误，长度在3-11位', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
        //  自定义验证规则
        //  isagree: [
        //   {
        //     type: 'boolean',
        //     validator: (rule, value, callback) => {
        //       console.log('isAgree', value)
        //       if (value) {
        //         callback()
        //       } else {
        //         callback(new Error('请勾选用户隐私协议'))
        //       }
        //     },
        //     trigger: 'change'
        //   }
        //  ]
      }
    }
  },
  methods: {
    onLogin (form) {
      this.$refs[form].validate((validate, error) => {
        console.log(validate)
        if (!validate) {
          for (const key in error) {
            this.$message.error(error[key][0].message)
          }
          return
        }
        this.doLogin()
      })
    },
    doLogin () {
      this.isShowLoading = true
      console.log('dologin')
      login({
        phone: this.user.phone,
        password: this.user.password
      })
        .then((result) => {
          this.isShowLoading = false
          console.log('aaaaa', result)
          if (result.data.code === 100) {
            this.$message({
              type: 'success',
              message: '登录成功!'
            })
            this.$store.commit('saveToken', result.data.data)
            this.$router.push({
              name: 'main'
            })
          } else {
            this.$message.error(result.message)
          }
        }).catch(() => {
          this.isShowLoading = false
          this.$message.error('登录失败，请检查服务器')
        })
    }
  }
}
</script>
<style scoped lang='less'>
.container{
      position:fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: url('../../assets/login_bg.jpg');
      background-size: cover;
    .login-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .login-logo{
        font-size: 32px;
        font-weight: 500;
        line-height: 100px;
        color: rgba(255, 255, 255, 0.801)
      }
      .login-form {
        text-align: left;
        width: 300px;
        background: white;
        padding: 30px;
        box-shadow: 2px 2px 2px 10px #fff ;
        border-radius: 2px;
      }
    }
  }
</style>
