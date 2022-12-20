<template>
  <div class="nav" >
    <!--普通用户-->
    <el-menu
      v-if="permissions != 'admin'"
      :default-active="$route.path"
      @select="handleSelect"
      class="el-menu-demo"
      mode="horizontal"
      >
      <el-menu-item index="/">畅享音乐平台</el-menu-item>
      <el-menu-item index="/music">在线音乐</el-menu-item>
      <el-menu-item index="/news">音乐资讯</el-menu-item>
      <el-menu-item index="/message">留言反馈</el-menu-item>
      <el-menu-item index="/user">个人中心</el-menu-item>
      <div v-if="!isLogin" class="user" @click="login">登录</div>
      <div v-else class="user-info">
        <div class="img">
          <img :src="userInfo.img"/>
        </div>
        <div class="username">{{ userInfo.username }}</div>
        <el-button type="text" class="logout" @click="logout">退出</el-button>
      </div>
    </el-menu>
    <!--管理员-->
    <el-menu
        v-else
        :default-active="$route.path"
        @select="handleSelect"
        class="el-menu-demo"
        mode="horizontal"
    >
      <el-menu-item index="/admin/music">歌曲管理</el-menu-item>
      <el-menu-item index="/admin/tag">标签管理</el-menu-item>
      <el-menu-item index="/admin/index">推荐管理</el-menu-item>
      <el-menu-item index="/admin/news">资讯管理</el-menu-item>
      <el-menu-item index="/admin/message">留言管理</el-menu-item>
      <el-menu-item index="/admin/user">用户及权限管理</el-menu-item>
      <div v-if="!isLogin" class="user" @click="login">登录</div>
      <div v-else class="user-info">
        <div class="img">
          <img :src="userInfo.img"/>
        </div>
        <div class="username">{{ userInfo.username }}</div>
        <el-button type="text" class="logout" @click="logout">退出</el-button>
      </div>
    </el-menu>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "navBar",
  data(){
    return {
      permissions: 'user', //当前用户权限
      isLogin: false, //用户是否登录
      activeIndex: '/', //当前选中菜单项
      userInfo:{}, //用户信息
    }
  },
  created(){
    if(localStorage.getItem('userInfo')){ //本地缓存中有用户信息，表示还在登录状态，就将isLogin设置为true
      this.isLogin = true
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if(this.userInfo.permissions){
        this.permissions = 'admin'
      }
    }
  },
  mounted() {
    //解决退出重新登录后用户信息没有更新的问题
    if(localStorage.getItem('userInfo')){ //本地缓存中有用户信息，表示还在登录状态，就将isLogin设置为true
      this.isLogin = true
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if(this.userInfo.permissions){
        this.permissions = 'admin'
      }
    }
  },
  watch:{
    "$store.state.permissions":{
      //深度监听，可监听到对象、数组的变化
      handler(val,oldVal) {
        this.permissions = val
        this.activeIndex = val == 'admin' ? '/admin/music' : '/'
        console.log(this.activeIndex)
      },
      deep: true, //true 深度监听
    },
    "$store.state.isLogin":{ // 监听 vuex 里面的 isLogin 属性值得改变
      handler(val,oldVal) {
        this.isLogin = val
        //解决退出重新登录后用户信息没有更新的问题
        if(localStorage.getItem('userInfo')){ //本地缓存中有用户信息，表示还在登录状态，就将isLogin设置为true
          this.isLogin = true
          this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
          if(this.userInfo.permissions){
            this.permissions = 'admin'
          }
        }
      },
      deep: true, //true 深度监听
    },
  },
  methods:{
    ...mapActions(['permissionsAction','isLoginAction']),
    //选择菜单项
    handleSelect(key){
      this.$router.push(key)
    },
    //登录
    login(){
      this.$router.push('/login/isLogin')
    },
    //退出登录
    logout(){
      this.permissionsAction('user')
      this.isLoginAction(false)
      this.isLogin = false //将登录状态改成false
      this.userInfo = {}
      // console.log()
      localStorage.removeItem('token') //清空本地缓存
      localStorage.removeItem('userInfo') //清空本地缓存
      this.$router.push('/')
      console.log(this.$store.state.permissions)
    }
  }
}
</script>

<style lang="less" scoped>
.nav{
  width:100%;
  position: relative;

  .el-menu-demo{
    display: flex;
    height: 100%;

    .user{
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 50px;
      height: 100%;
      cursor:pointer;
    }

    .user-info{
      display: flex;
      align-items: center;
      position: absolute;
      right: 50px;
      height: 100%;

      .img img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .username{
        margin: 0 30px 0 10px;
        text-align: center;
      }

      //.logout{
      //  color: #b3b4b5;
      //}
    }
  }
}
</style>