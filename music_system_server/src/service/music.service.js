const Music = require('../model/music.model')
const MusicTag = require('../model/music_tag.model')
const Tag = require('../model/tag.model')

class MusicService{

    //获取全部音乐
    async getAll(pageNum=1, pageSize=10){
        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }
        const {rows} = await Music.findAndCountAll({offset: offset, limit:(pageSize * 1)}) //findAndCountAll合并了上面两个方法
        const count = await Music.count({})

        console.log(count)
        
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    // 根据name获取音乐
    async getByName(pageNum, pageSize, name){

        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }
        
        const {count, rows} = await Music.findAndCountAll({
            where:{name},
            offset: offset, limit:(pageSize * 1),
        }) 

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    async getById(id){

        // 获取id对应的歌曲信息
        let musicList = await Music.findAll({
            // attributes: ['id','consignee','phone','address','is_default'],
            where: {id},
        })

        // let musicInfo = musicList[0].dataValues
        // console.log('歌曲信息：',musicInfo)

        return musicList
    }

    async getCount(){
        let count = await Music.count()
        return count
    }

    // 修改浏览量
    async addView(id){
        let res = await Music.findAll({
            attributes: ['view'],
            where: {id},
        })


        console.log('播放量：',res)
        let view = res[0].dataValues.view

        await Music.update({view: view+1}, {where: {id}})
    }

    // 修改音乐
    async update(id,music){

        const res = await Music.update(music, {where: {id}})
        // console.log(res)
        return !!res[0]
    }

    // 删除音乐
    async remove(id){
        console.log(id)
        const res =  await Music.destroy({where : {id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }

    // 添加音乐
    async create(music){
        const res = await Music.create( music )
        return res.dataValues
    }

    // 获取全部音乐
    async getNew(){
        return await Music.findAll()
    }
}

module.exports = new MusicService()