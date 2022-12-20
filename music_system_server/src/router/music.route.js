/*音乐接口路由*/
const Router = require('koa-router')

const router = new Router({prefix:'/music'})

const {
    uploadImg,
    uploadMusic,
    getAll, 
    getByName,
    getById,
    update,
    remove,
    create,
    getCount,
    getNew,
    getByTagId,
    getHotMusic
} = require('../controller/music.controller')

// 添加歌曲
router.post('/create',create)

// 上传封面
router.post('/uploadImg',uploadImg)

// 上传音乐
router.post('/uploadMusic',uploadMusic)

// 获取全部音乐
router.post('/',getAll)

// 根据歌名获取音乐
router.post('/getByName',getByName)

// 根据id获取音乐
router.post('/getById',getById)

// 修改音乐信息
router.post('/update',update)

// 删除音乐
router.post('/remove',remove)

// 获取数据总数
router.post('/count',getCount)

// 获取新歌列表
router.post('/new',getNew)

// 获取标签对应的音乐列表
router.post('/tag',getByTagId)

// 获取浏览量最高的8首歌
router.post('/hot',getHotMusic)

module.exports = router