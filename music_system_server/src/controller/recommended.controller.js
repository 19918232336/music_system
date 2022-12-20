const fs = require('fs')
const path = require('path')

const {
    getAll,
    update,
} = require('../service/recommended.service')

const {
    getById,
} = require('../service/music.service')

class SwiperController{
    
    async getAll(ctx,next){

        try{
            // 获取音乐id列表
            let list = await getAll()
            console.log('推荐：',list)            

            // 根据音乐id列表获取歌曲信息
            let resList = []
            for(let i=0; i<list.length; i++){
                let res = await getById(list[i])
                // console.log('res',res[0].dataValues)
                resList.push(res[0].dataValues)
            }

            ctx.body = {
                code: 0,
                message: '获取推荐歌单成功',
                result: resList
            }
            
        }catch(err){
            ctx.body = {
                code: 500,
                message: '获取推荐歌单失败，推荐歌曲被删除！',
                result: ''
            }
        }
    
    }

    async update(ctx,next){

        // const id = ctx.request.params.id
        const { id, music_id } = ctx.request.body

        let res = await update(id,music_id)

        ctx.body = {
            code: 0,
            message: '推荐歌曲修改成功',
            result: res
        }
    }
}

module.exports = new SwiperController()