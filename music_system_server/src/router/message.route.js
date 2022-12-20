/*音乐接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/message'})

const {
    getAll, 
    remove,
    create,
} = require('../controller/message.controller')

// 添加评论
router.post('/create',create)

// 获取全部音乐
router.post('/',getAll)

// 删除音乐
router.post('/remove',remove)

module.exports = router