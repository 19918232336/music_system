const fs = require('fs')
const path = require('path')

const {
    getTagInfo,
    updateById,
    removeById,
    createTag,
    getTagCount
} = require('../service/tag.service')

const {
    getByTagId
} = require('../service/music_tag.service')

class tagController{

    async getTag(ctx,next){

        const { pageNum, pageSize } = ctx.request.body
        let res = await getTagInfo(pageNum, pageSize)

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

        // 先判断music_tag关联表中是否有歌曲和标签的绑定信息，有的话不能删除
        let infoList = await getByTagId(id)
        console.log('绑定信息列表：',infoList)
        if(infoList.length>0){

            ctx.body = {
                code: 500,
                message: '标签被引用，禁止删除,请先修改歌曲的引用标签',
                result: ''
            }

        }else{

            let res = false
            res = await removeById(id)
            ctx.body = {
                code: 0,
                message: '删除标签信息成功',
                result: res
            }

        }
    }
}

module.exports = new tagController()