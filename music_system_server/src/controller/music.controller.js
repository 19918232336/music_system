const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const { 
    fileUploadError, 
    unSupportedFileType, 
} = require('../constants/err.type')

const {
    getAll,
    getByName,
    update,
    remove,
    create,
    getById,
    addView,
    getCount,
    getNew,
} = require('../service/music.service')

const {
    getByMusicId,
    updateByMusicId,
    createTag,
    getByTagId,
    removeByMusicId
} = require('../service/music_tag.service')

const {
    getTagById,
    updateById,
} = require('../service/tag.service')

const {
    removeUserByMusicId
} = require('../service/user_music.service')

const {
    getRecommendInfoByMusicId
} = require('../service/recommended.service')


class musicController{

    // 封面上传
    async uploadImg(ctx, next){
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
                message: '歌曲封面上传成功',
                result: {
                    user_img: path.basename(file.filepath)
                },
            }
        }else{
            return ctx.app.emit('error',fileUploadError,ctx)
        }
    }

    // 歌曲上传
    async uploadMusic(ctx, next){
        // console.log(ctx.request.files.file) //file这个属性要与上传图片请求当中的key相同
        const {file} = ctx.request.files
        console.log('file:',file)
        const fileType = ['audio/mpeg']
        if(file){
            if(!fileType.includes(file.mimetype)){
                console.error('上传文件格式不支持')
                return ctx.app.emit('error',unSupportedFileType)
            }
            ctx.body = {
                code: 0,
                message: '歌曲上传成功',
                result: {
                    music_path: path.basename(file.newFilename),
                    music_name:path.basename(file.originalFilename)
                },
            }
        }else{
            return ctx.app.emit('error',fileUploadError,ctx)
        }
    }

    // 创建歌曲
    async create(ctx,next){
        const { img,name,author,path,duration,view,tag_id } = ctx.request.body
        let musicInfo = {
            img,
            name,
            author,
            path,
            duration,
            view
        }
        let res = await create(musicInfo)
        console.log('添加数据：',res)

        // 添加标签绑定
        let info = {
            music_id: res.id,
            tag_id: tag_id
        }
        createTag(info)

        ctx.body = {
            code: 0,
            message: '添加歌曲成功',
            result: res
        }
    }

    // 获取所有歌曲
    async getAll(ctx,next){
        const {pageNum, pageSize} = ctx.request.body
        let res = await getAll(pageNum, pageSize)

        ctx.body = {
            code: 0,
            message: '获取歌曲列表成功',
            result: res
        }
    }

    // 根据歌名获取歌曲
    async getByName(ctx,next){
        const {pageNum, pageSize, name} = ctx.request.body
        console.log(pageNum,pageSize,name)

        let res = await getByName(pageNum, pageSize, name)

        ctx.body = {
            code: 0,
            message: '获取歌曲列表成功',
            result: res
        }
    }

    // 根据歌曲id获取歌曲
    async getById(ctx,next){
        const {id} = ctx.request.body

        // 获取歌曲信息
        let musicInfo = await getById(id)

        // 获取歌曲对应标签信息
        // 获取id对应的标签id
        let tag_id = await getByMusicId(id)
        console.log('标签id:',tag_id)

        // 根据标签id获取标签信息
        let tag_name = await getTagById(tag_id)
        console.log('标签名：',tag_name)

        let tagObj = {
            tag_id,
            tag_name
        }
        musicInfo[0].dataValues.tag_info = tagObj
        // console.log('歌曲信息：',musicInfo[0].dataValues)

        // 浏览量+1
        await addView(id)

        ctx.body = {
            code: 0,
            message: '获取歌曲列表成功',
            result: musicInfo[0].dataValues
        }
    }

    // 获取歌曲总数
    async getCount(ctx,next){
        // 获取数据总数
        let count = await getCount()
        console.log('音乐总数：',count)

        ctx.body = {
            code: 0,
            message: '获取歌曲总数成功',
            result: count
        }
    }

    // 修改歌曲信息
    async update(ctx,next){

        // const id = ctx.request.params.id
        const { id,img,name,author,path,duration,tag_id } = ctx.request.body

        let obj = {}
        img && Object.assign(obj, {img})
        name && Object.assign(obj, {name})
        author && Object.assign(obj, {author})
        path && Object.assign(obj, {path})
        duration && Object.assign(obj, {duration})

        let res = await update(id,obj)

        // 修改音乐对应标签
        if(tag_id){
            let res = await updateByMusicId(id,tag_id)
            console.log(res)
        }

        ctx.body = {
            code: 0,
            message: '修改歌曲信息成功',
            result: res
        }
    }

    // 删除歌曲
    async remove(ctx,next){

        const { id } = ctx.request.body
        console.log(id)
        
        // 判断推荐歌单是否有引用该歌曲
        let list = await getRecommendInfoByMusicId(id)

        if(list.length > 0){ //推荐歌单中对该歌曲有引用，不能删除,要先修改推荐歌单信息

            ctx.body = {
                code: 500,
                message: '推荐歌单中对该歌曲有引用，不能删除',
                result: ''
            }

        }else{
            
            // 先删除music和tag关联表中的关联数据
            await removeByMusicId(id)

            // 再删除music和user关联表中的关联数据
            await removeUserByMusicId(id)

            // 最后再删除music表中的数据
            let res = await remove(id)

            let message = '删除歌曲失败'
            if(res){
                message = '删除歌曲成功'
            }

            ctx.body = {
                code: 0,
                message,
                result: res
            }
        } 
    }

    // 获取新歌
    async getNew(ctx){
        // 获取全部歌曲的列表
        let list = await getNew() 
        // console.log(list)
        
        // 然后进行截取，获取列表的最后5条数据，返回给前端
        let newList = list.slice(list.length-5,list.length)
        // console.log(newList)

        let res = []
        newList.forEach(item => {
            res.push(item.dataValues)
        })

        ctx.body = {
            code: 0,
            message: '获取新歌列表成功',
            result: res,
        } 
    }

    //根据标签id获取音乐列表
    async getByTagId(ctx){
        const { id } = ctx.request.body
        // 获取到当前标签id下的所有音乐id列表
        let res = await getByTagId(id)
        console.log(res)

        let musicList = []
        // 循环遍历，根据音乐id获取对应的额音乐信息
        for(let i=0; i< res.length; i++){
            let id = res[i].dataValues.music_id
            let obj = await getById(id)
            // console.log('id对应歌曲：',obj[0].dataValues)
            musicList.push(obj[0].dataValues)
        }

        ctx.body = {
            code: 0,
            message: '获取标签对应歌曲列表成功',
            result: musicList,
        }
    }

    // 获取热门歌曲
    async getHotMusic(ctx){

        let pageNum = 1, pageSize = 9999
        let res = await getAll(pageNum, pageSize)

        console.log('遍历前：',res.list)

        // 根据每首歌曲的播放量对歌曲信息进行排序
        for(let i=0; i<res.list.length; i++){
            for(let j=0; j < res.list.length-i-1; j++){
                if( res.list[j].dataValues.view > res.list[j+1].dataValues.view ){ 
                    let temp = res.list[j+1]
                    res.list[j+1] = res.list[j]
                    res.list[j] = temp
                }
            }   
        }
        console.log('遍历完成后的数组：',res.list)

        let list = res.list.slice(0,8) //截取数组的前8项，获取播放量最高的前8首歌曲
        
        let resList = []
        
        list.forEach(item => {
            resList.push(item.dataValues)
        })

        ctx.body = {
            code: 0,
            message: '获取热门歌曲列表成功',
            result: resList,
        }
    }
}

module.exports = new musicController()