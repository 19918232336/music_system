const MusicTag = require('../model/music_tag.model')

class MusicTagService{

    //根据音乐id获取标签id
    async getByMusicId(id){
        let res = await MusicTag.findAll({
            where:{'music_id':id},
            attributes:['tag_id']
        })

        let {tag_id} = res[0].dataValues
        console.log('标签id:',tag_id)
        return tag_id
    }

    //根据标签id获取音乐id
    async getByTagId(id){
        return await MusicTag.findAll({
            where:{'tag_id':id},
            attributes:['music_id']
        })
    }

    // 根据音乐id修改标签id
    async updateByMusicId(music_id,tag_id){
        const res = await MusicTag.update({tag_id}, {where: {music_id}})
        // console.log(res)
        return !!res[0]
    }

    // 根据标签id修改视频id
    async updateByTagId(tag_id,music_id){
        const res = await MusicTag.update({music_id}, {where: {tag_id}})
        // console.log(res)
        return !!res[0]
    }

    // 根据音乐id删除信息
    async removeByMusicId(id){
        console.log(id)
        const res =  await MusicTag.destroy({where : {'music_id':id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }

    // 根据标签id删除信息
    async removeByTagId(id){
        console.log(id)
        const res =  await MusicTag.destroy({where : {'tag_id':id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }

    // 添加数据
    async createTag(info){
        const res = await MusicTag.create( info )
        // return res.dataValues
    }
}

module.exports = new MusicTagService()