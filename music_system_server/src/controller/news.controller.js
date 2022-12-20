const fs = require('fs')
const path = require('path')

const {
    getAll,
    getByTitle,
    getById,
    update,
    remove,
    create
} = require('../service/news.service')

class newsController{

    async create(ctx,next){
        const { title, content } = ctx.request.body
        let newsInfo = {
            title,
            content
        }
        let res = await create(newsInfo)
        ctx.body = {
            code: 0,
            message: '添加资讯成功',
            result: res
        }
    }

    async getAll(ctx,next){
        const {pageNum, pageSize} = ctx.request.body
        let res = await getAll(pageNum, pageSize)

        ctx.body = {
            code: 0,
            message: '获取全部资讯成功',
            result: res
        }
    }

    async getById(ctx,next){
        const {pageNum, pageSize, id} = ctx.request.body

        console.log(pageNum, pageSize, id)
        let res = await getById(pageNum, pageSize, id)

        ctx.body = {
            code: 0,
            message: '获取资讯成功',
            result: res
        }
    }

    async getByTitle(ctx,next){
        const {pageNum, pageSize, title} = ctx.request.body

        console.log(pageNum, pageSize, title)
        let res = await getByTitle(pageNum, pageSize, title)

        ctx.body = {
            code: 0,
            message: '获取资讯成功',
            result: res
        }
    }

    async update(ctx,next){

        // const id = ctx.request.params.id
        const { id,title,content } = ctx.request.body

        let obj = {}
        title && Object.assign(obj, {title})
        content && Object.assign(obj, {content})

        let res = await update(id,obj)

        ctx.body = {
            code: 0,
            message: '修改资讯成功',
            result: res
        }
    }

    async remove(ctx,next){

        const { id } = ctx.request.body
        console.log(id)
        let res = await remove(id)

        ctx.body = {
            code: 0,
            message: '删除资讯成功',
            result: res
        }
    }
}

module.exports = new newsController()