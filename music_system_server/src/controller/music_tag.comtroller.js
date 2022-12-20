const fs = require('fs')
const path = require('path')

const {
    getByMusicId,
    getByTagId,
    updateByMusicId,
    updateByTagId,
    removeByMusicId,
    removeByTagId,
    createTag
} = require('../service/music_tag.service')

class tagController{

    async getByMusicId(ctx,next){

        const { music_id } = ctx.request.body
        let res = await getByMusicId(music_id)

        ctx.body = {
            code: 0,
            message: '获取标签信息成功',
            result: res
        }
    }

    async createTag(ctx,next){

        const { name } = ctx.request.body
        let res = await createTag(name)
        
        ctx.body = {
            code: 0,
            message: '创建标签成功',
            result: res
        }
    }

    async updateTagById(ctx,next){

        // const id = ctx.request.params.id
        const { id,name } = ctx.request.body
        let res = await updateById(id,name)

        ctx.body = {
            code: 0,
            message: '修改标签信息成功',
            result: res
        }
    }

    async removeTagById(ctx,next){

        const { id } = ctx.request.body
        console.log(id)
        let res = await removeById(id)

        ctx.body = {
            code: 0,
            message: '删除标签信息成功',
            result: res
        }
    }
}

module.exports = new tagController()