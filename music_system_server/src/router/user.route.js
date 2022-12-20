/*用户接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/user'})

const {
    login,
    upload,
    getAllUserInfo,
    getUserInfoByUsername,
    updateUserById,
    removeUserById,
    createUser,
    getMusicIdById,
    createCollection,
    getCollectionList,
    removeCollection,
} = require('../controller/user.controller')

// 注册
router.post('/register',createUser)

// 上传用户头像
router.post('/upload',upload)

// 登录
router.post('/login',login)

// 获取全部用户信息
router.post('/',getAllUserInfo)

// 根据username获取用户信息
router.post('/getByUsername',getUserInfoByUsername)

// 修改用户信息
router.post('/update',updateUserById)

// 删除用户
router.post('/remove',removeUserById)

// 删除用户
router.post('/getMusicIdById',getMusicIdById)

// 收藏歌曲
router.post('/collection',createCollection)

// 获取收藏歌单
router.post('/getCollection',getCollectionList)

// 取消收藏
router.post('/removeCollection',removeCollection)

module.exports = router