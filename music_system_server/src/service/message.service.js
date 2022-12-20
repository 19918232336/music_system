const Message = require('../model/Message.model')


class MessageService{

    //根据parents_id获取评论
    async getByParentsId(id){
        const res = await Message.findAll({where:{parents_id: id}})
        return res
    }

    // 删除评论
    async remove(id){
        console.log(id)
        const res =  await Message.destroy({where : {id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }

    // 删除评论
    async removeMessageByUserId(id){
        console.log(id)
        const res =  await Message.destroy({where : {user_id:id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }

    // 添加评论
    async create(message){
        const res = await Message.create( message )
        return res.dataValues
    }
}

module.exports = new MessageService()