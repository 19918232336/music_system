const fs = require('fs')
const path = require('path')

const {
    getAll,
    update,
    remove,
    create
} = require('../service/swiper.service')

class SwiperController{

    
    // 轮播图上传
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
                message: '轮播图上传成功',
                result: {
                    user_img: path.basename(file.filepath)
                },
            }
        }else{
            return ctx.app.emit('error',fileUploadError,ctx)
        }
    }
    
    async getAll(ctx,next){
        let res = await getAll()

        ctx.body = {
            code: 0,
            message: '获取轮播图信息成功',
            result: res
        }
    }

    async create(ctx,next){

        const { path } = ctx.request.body
        let res = await create(path)
        
        ctx.body = {
            code: 0,
            message: '创建轮播图成功',
            result: res
        }
    }

    async update(ctx,next){

        // const id = ctx.request.params.id
        const { id,path } = ctx.request.body
        // console.log(id,path) 

        let res = await update(id,path)


        ctx.body = {
            code: 0,
            message: '修改轮播图信息成功',
            result: res
        }
    }

    async remove(ctx,next){

        const { id } = ctx.request.body
        console.log(id)
        let res = await remove(id)

        ctx.body = {
            code: 0,
            message: '删除轮播图信息成功',
            result: res
        }
    }
}

module.exports = new SwiperController()