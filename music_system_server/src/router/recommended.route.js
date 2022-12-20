/*推荐歌曲接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/recommended'})

const {
    getAll,
    update  
} = require('../controller/recommended.controller')

// 获取
router.post('/',getAll)

// 修改
router.post('/update',update)

module.exports = router