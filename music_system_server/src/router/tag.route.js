/*标签接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/tag'})

const {
    getTag,
    updateTagById,
    removeTagById,
    createTag
} = require('../controller/tag.controller')

// 获取标签信息
router.post('/', getTag)

// 修改标签
router.post('/update',updateTagById)

// 删除标签
router.post('/remove',removeTagById)

// 创建标签
router.post('/create',createTag)

module.exports = router