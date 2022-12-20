/*轮播图接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/swiper'})

const {
    upload,
    getAll,
    update,
    remove,
    create
} = require('../controller/swiper.controller')

// 添加轮播图
router.post('/create',create)

// 上传轮播图
router.post('/upload',upload)

// 获取全部轮播图
router.post('/',getAll)

// 修改轮播图
router.post('/update',update)

// 删除轮播图
router.post('/remove',remove)

module.exports = router