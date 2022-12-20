const UserMusic = require('../model/user_music.model')

class UserMusicService{

    //根据用户id获取音乐id
    async getByUserId(id){
        let res = await UserMusic.findAll({
            where:{'user_id':id},
            attributes:['music_id']
        })

        return res
    }

     // 删除信息
     async remove(music_id,user_id){
        const res =  await UserMusic.destroy({where : {'music_id':music_id , 'user_id':user_id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }

    // 根据音乐id删除信息
    async removeUserByMusicId(music_id){
        const res =  await UserMusic.destroy({where : {'music_id':music_id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }

    // 根据用户id删除信息
    async removeUserByUserId(user_id){
        const res =  await UserMusic.destroy({where : {'user_id':user_id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }


    // 添加数据
    async create(info){
        const res = await UserMusic.create( info )
        // return res.dataValues
    }
}

module.exports = new UserMusicService()