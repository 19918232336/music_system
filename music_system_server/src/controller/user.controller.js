const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

const { 
    fileUploadError, 
    unSupportedFileType, 
} = require('../constants/err.type')

const {
    getAllUserInfo,
    getUserInfoByUsername,
    updateById,
    removeById,
    createUser
} = require('../service/user.service')

const {
    getByUserId,
    create,
    remove,
} = require('../service/user_music.service')

const {
    getById,
} = require('../service/music.service')

const {
    removeUserByUserId
} = require('../service/user_music.service')


const {
    removeMessageByUserId
} = require('../service/message.service')

class userController{

    async login(ctx,next){

        // 拿到前端发送请求中传的用户名和密码
        const { username,password } = ctx.request.body
        console.log(username,password)

        // 根据用户名获取数据库中的用户信息
        let res = await getUserInfoByUsername(1,200,username)
        console.log(res.list)

        let message = '', code = 0, userInfo = {}, token = ''

        // 判断返回的数组中是否有内容，有证明有用户，没有证明用户未注册
        if(res.list.length>0){

            // 获取数组中的用户信息的密码，这个用户对应的真正密码
            let realPassword = res.list[0].dataValues.password
            console.log('realPassword:',realPassword)

            // 前端发送过来的密码和数据库中拿到的密码相同，则登录成功
            if(password == realPassword){
                message = '登录成功'

                // 设置用户信息
                userInfo = {
                    permissions: res.list[0].dataValues.permissions, //用户权限
                    username: res.list[0].dataValues.username, //用户名
                    img: res.list[0].dataValues.img, //用户头像地址
                    id: res.list[0].dataValues.id //用户id
                }

                // 设置token值
                token = jwt.sign(res.list[0].dataValues, JWT_SECRET, {expiresIn: '1d'}) //1d表示 token 1天后过期，10表示10秒后过期
            }else{
                code = 1061
                message = '密码错误'
            }
        }else{
            code = 1060
            message = '账号不存在'
        }

        // 响应给前端的响应内容
        ctx.body = {
            code,
            message,
            token,
            userInfo
        }
    }

    // 用户头像上传
    async upload(ctx, next){
        // console.log(ctx.request.files.file) //file这个属性要与上传图片请求当中的key相同
        const {file} = ctx.request.files
        console.log(file)
        const fileType = ['image/jpeg','image/png']
        if(file){
            if(!fileType.includes(file.mimetype)){
                console.error('上传文件格式不支持')
                return ctx.app.emit('error',unSupportedFileType)
            }
            ctx.body = {
                code: 0,
                message: '用户头像上传成功',
                result: {
                    user_img: path.basename(file.filepath)
                },
            }
        }else{
            return ctx.app.emit('error',fileUploadError,ctx)
        }
    }

    async createUser(ctx,next){
        const { username,password,img,permissions } = ctx.request.body
        let userInfo = {
            username,
            password,
            img,
            permissions
        }
        let res = await createUser(userInfo)
        ctx.body = {
            code: 0,
            message: '注册成功',
            result: res
        }
    }

    async getAllUserInfo(ctx,next){
        const {pageNum, pageSize} = ctx.request.body
        let res = await getAllUserInfo(pageNum, pageSize)

        ctx.body = {
            code: 0,
            message: '获取用户信息成功',
            result: res
        }
    }

    async getUserInfoByUsername(ctx,next){
        const {pageNum, pageSize, username} = ctx.request.body

        let res = await getUserInfoByUsername(pageNum, pageSize, username)

        ctx.body = {
            code: 0,
            message: '获取用户信息成功',
            result: res
        }
    }

    async updateUserById(ctx,next){

        // const id = ctx.request.params.id
        const { id,username,password,permissions,img } = ctx.request.body

        let obj = {}
        permissions && Object.assign(obj, {permissions})
        img && Object.assign(obj, {img})
        username && Object.assign(obj, {username})
        password && Object.assign(obj, {password})
        

        console.log('获取到的参数：',obj)

        let res = await updateById(id,obj)

        ctx.body = {
            code: 0,
            message: '修改用户信息成功',
            result: res
        }
    }

    async removeUserById(ctx,next){

        const { id } = ctx.request.body
        console.log(id)

        // 先删除user-music关联表中的关联数据
        await removeUserByUserId(id)

        // 再删除用户评论的内容
        await removeMessageByUserId(id)

        // 再删除user表中的数据
        let res = await removeById(id)

        ctx.body = {
            code: 0,
            message: '删除用户信息成功',
            result: res
        }
    }

    // 根据用户id获取收藏音乐列表
    async getMusicIdById(ctx){
        const { id } = ctx.request.body
        let res = await getByUserId(id)
        let list = []
        res.forEach(item => {
            list.push(item.dataValues.music_id)
        })
        // console.log('id列表：',list)

        ctx.body = {
            code: 0,
            message: '获取id列表成功',
            result: list
        } 
    }

    // 添加收藏歌单
    async createCollection(ctx){
        const { music_id, user_id } = ctx.request.body
        let info = {
            music_id,
            user_id
        }

        let res = await create(info)
        console.log(res)

        ctx.body = {
            code: 0,
            message: '收藏歌曲成功',
            result: res
        } 
    }

    // 获取收藏歌单
    async getCollectionList(ctx){
        const { user_id } = ctx.request.body
        // 根据用户id获取收藏歌单
        let res = await getByUserId(user_id)
        // console.log(res)

        let list = []
        // 循环遍历，取出数据库中获取到内容中的
        for(let i=0; i< res.length; i++){
            let music_id = res[i].dataValues.music_id
            let user_info = await getById(music_id)
            console.log(user_info[0].dataValues)
            list.push(user_info[0].dataValues)
        }

        ctx.body = {
            code: 0,
            message: '获取收藏歌单成功',
            result: list
        }
    }

    async removeCollection(ctx){
        const { music_id, user_id } = ctx.request.body

        let res = remove(music_id,user_id)
        
        ctx.body = {
            code: 0,
            message: '取消收藏成功',
            result: res
        }
    }
}

module.exports = new userController()