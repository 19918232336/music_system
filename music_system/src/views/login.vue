<template>
  <div class="login">
    <el-card :class="type=='isLogin' ? 'login-box' : 'register-box'">
      <!--注册-->
      <el-form v-if="type == 'isRegister'" ref="form" :model="form" label-width="80px">
        <el-form-item label="头像" :label-width="width">
          <upload
              :isOpen="isOpen"
              :type="'img'"
              :path="imgPath"
              :form="form"
              @getImgPath="getImgPath"
          ></upload>
        </el-form-item>
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn-group">
            <div class="left">
              <el-button type="primary" @click="toLogin">登录</el-button>
              <el-button @click="register">注册</el-button>
            </div>
            <div class="right">
              <el-button @click="cancel">取消</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>

      <!--登录-->
      <el-form v-else ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn-group">
            <div class="left">
              <el-button type="primary" @click="login">登录</el-button>
              <el-button @click="toRegister">注册</el-button>
            </div>
            <div class="right">
              <el-button @click="cancel">取消</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Upload from '@/components/upload'
import {
  apiLogin,
  apiRegister
} from '@/api/index.js'

export default {
  name: "login",
  components:{Upload},
  data(){
    return {
      form: {},
      type: 'isLogin',//类型： 登录：isLogin,注册：isRegister
      width: '100px',//标题宽度
      imgPath: 'http://localhost:8080/user/upload',//图片上传的路径
      isOpen: true,
    }
  },
  watch:{
    "$route.params.type": { //监听路由中传递type参数的变化
      handler: function(val, oldVal){
        console.log(val);
        this.type = val
      },
      // 深度观察监听
      deep: true
    },
    type(val){
      this.form = {}
    }
  },
  mounted() {
    this.type = this.$route.params.type
  },
  methods:{
    ...mapActions(['permissionsAction','isLoginAction']),
    //登录
    login(){
      console.log(this.form)
      let res = apiLogin(this.form)
      res.then(data => {
        console.log(data)
        if(data.code==0){

          let permissions = data.userInfo.permissions ? 'admin' : 'user'

          //将用户信息和token存入本地
          localStorage.setItem("userInfo",JSON.stringify(data.userInfo))
          localStorage.setItem("token",data.token);
          // console.log(localStorage.getItem("token"))
          // console.log(localStorage.getItem("userInfo"))

          //设置 vuex 里存储得数据
          this.permissionsAction(permissions)
          this.isLoginAction(true)

          if(permissions == 'admin'){ //如果是管理员权限
            this.$router.push('/admin/music') //跳转到 /admin/music
          }else{ //普通用户权限
            this.$router.push('/music') //跳转到 /music
          }

          this.$message.success('登录成功')

        }else if(data.code==1060){
          this.$message.error('账号密码错误')
        }else if(data.code==1061){
          this.$message.error('用户不存在')
        }
      })
    },
    //注册
    register(){
      this.form.permissions = false
      console.log(this.form)

      let res = apiRegister(this.form)
      res.then(data => {
        this.$message.success('注册成功,请登录')
        this.type = 'isLogin'
      })
    },
    //返回
    cancel(){
      this.$router.back()
    },
    //切换为注册状态
    toRegister(){
      this.type = 'isRegister'
    },
    //切换为登录状态
    toLogin(){
      this.type = 'isLogin'
    },
    //获取图片地址
    getImgPath(path){
      this.form.img = path
    },
  }
}
</script>

<style lang="less" scoped>
.login{
  width: 100%;
  position: relative;

  .login-box{
    width: 30%;
    height: 200px;
    padding: 20px;
    position: absolute;
    top: 30vh;
    right: 0;
    left:0;
    margin: auto;

    .btn-group{
      display: flex;

      .left{
        width: 50%;
      }

      .right{
        width:50%;
        display: flex;
        justify-content: right;
      }
    }
  }

  .register-box{
    width: 30%;
    padding: 20px;
    position: absolute;
    top: 20vh;
    right: 0;
    left:0;
    margin: auto;

    .btn-group{
      display: flex;

      .left{
        width: 50%;
      }

      .right{
        width:50%;
        display: flex;
        justify-content: right;
      }
    }
  }
}
</style>