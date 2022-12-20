const Recommended = require('../model/recommended.model')
const Music = require('../model/music.model')

class RecommendedService{

    //获取推荐歌单
    async getAll(){
        let list = []
        let count = await Recommended.count()
        for(let i=1; i<=count; i++){
            let res = await Recommended.findAll({where:{id:i}})
            // console.log('idList:',res[0].dataValues)
            list.push(res[0].dataValues.music_id)
        }
        return list 
    }

    // 根据音乐id获取信息
    async getRecommendInfoByMusicId(id){

        let res = await Recommended.findAll({where:{music_id:id}})

        return res
    }

    // 修改推荐歌曲信息
    async update(id, music_id){

        const res = await Recommended.update({music_id}, {where: {id}})
        // console.log(res)
        return !!res[0]
    }
}

module.exports = new RecommendedService()