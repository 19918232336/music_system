/*资讯接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/news'})

const {
    getAll,
    getByTitle,
    update,
    remove,
    create,
    getById
} = require('../controller/news.controller')

// 添加资讯
router.post('/create',create)

// 获取全部资讯
router.post('/',getAll)

// 根据标题获取资讯信息
router.post('/getByTitle',getByTitle)

// 修改资讯
router.post('/update',update)

// 删除用户
router.post('/remove',remove)

// 根据id获取数据
router.post('/getById',getById)

module.exports = router