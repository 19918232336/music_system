import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index"

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Index',
      component: () => import('../views/index.vue')

    },
    {
      path: '/music',
      name: 'Music',
      component: () => import('../views/music.vue')
    },
    {
      path: '/music/show/:id',
      name: 'MusicShow',
      component: () => import('../views/music-show.vue')
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('../views/news.vue')
    },
    {
      path: '/news/show/:id',
      name: 'NewsShow',
      component: () => import('../views/news-show.vue')
    },
    {
      path: '/message',
      name: 'Message',
      component: () => import('../views/message.vue')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/user.vue')
    },
    {
      path: '/login/:type',
      name: 'Login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/admin/music',
      name: 'AdminMusic',
      component: () => import('../views/admin/music.vue')
    },
    {
      path: '/admin/tag',
      name: 'AdminTag',
      component: () => import('../views/admin/tag.vue')
    },
    {
      path: '/admin/index',
      name: 'AdminIndex',
      component: () => import('../views/admin/index.vue')
    },
    {
      path: '/admin/message',
      name: 'AdminMessage',
      component: () => import('../views/admin/message.vue')
    },
    {
      path: '/admin/news',
      name: 'AdminNews',
      component: () => import('../views/admin/news.vue')
    },
    {
      path: '/admin/user',
      name: 'AdminUser',
      component: () => import('../views/admin/user.vue')
    },
    {
      path: '/admin/tag',
      name: 'AdminTag',
      component: () => import('../views/admin/tag.vue')
    },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

//路由拦截，对进入不同路由地址做判断
router.beforeEach((to, from, next) => {

  let adminRouterList = ['/admin/index','/admin/user','/admin/music','/admin/news','/admin/message','/admin/tag']
  let userRouterList = ['/','/user','/message','/news','/login/isLogin','/login/isRegister','/music']
  let newsReg = /^\/news\/show\/[0-9]{0,999}$/g
  let musicReg = /^\/music\/show\/[0-9]{0,999}$/g

  if(adminRouterList.indexOf(to.path) > -1){ //当访问上方定义 adminRouterList 数组中存在的这些路由地址时，判断用户是否登录，并且判断登录用户权限是否为管理员，满足就放行
    // console.log(store.state.isLogin)
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) //获取用户登录信息，未登录为null
    if(userInfo && userInfo.permissions){ //判断用户是否登录，并且登录用户权限是否为管理员
      next() //放行
    }else{
      next({ path: '/login/isLogin' }) //不满足跳转到登录页
    }
  }else if(userRouterList.indexOf(to.path) > -1 || newsReg.test(to.path) || musicReg.test(to.path)){ //进入普通页面，直接放行
    next()
  }else{ //进入没有定义的路由地址，跳转到首页
    next({ path: '/' })
  }
})

export default router
