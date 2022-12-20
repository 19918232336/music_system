const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const {
    getByParentsId,
    remove,
    create,
} = require('../service/message.service')

const {
    getById
} = require('../service/user.service')

class MessageController{

    // 创建评论
    async create(ctx,next){
        const { user_id,content,parents_id,reply_username } = ctx.request.body
        console.log('user_id:',user_id)
        let messageInfo = {
            user_id,
            content,
            parents_id,
            reply_username
        }
        let res = await create(messageInfo)
        console.log('添加数据：',res)

        ctx.body = {
            code: 0,
            message: '创建评论成功',
            result: res
        }
    }

    // 获取全部评论
    async getAll(ctx,next){
        // 获取所有的根评论
        let res = await getByParentsId(0)
        // console.log('获取评论内容:',res[0].dataValues)

        // 根据id找到所有的子评论,并插入到根评论的children属性中
        for(let i=0; i<res.length; i++){
            let id = res[i].dataValues.id
            let list = await getByParentsId(id)
            res[i].dataValues.children = []
            list.forEach(item => {
                res[i].dataValues.children.push(item.dataValues)
            })
            // console.log('子评论：',res[i].dataValues.children)

            //根据用户id获取用户信息,并插入到根评论的userInfo属性中
            let userInfo = await getById(res[i].dataValues.user_id)
            // console.log('用户信息：',userInfo[0].dataValues)
            res[i].dataValues.userInfo = userInfo[0].dataValues

            // 遍历children属性，给每个子评论添加用户信息
            if(res[i].dataValues.children.length>0){ //有子评论才进行用户信息获取
                console.log('长度：',res[i].dataValues.children.length)
                for(let j=0; j<res[i].dataValues.children.length; j++){
                    // console.log('每项数据用户id：',res[i].dataValues.children[j].user_id)
                    let user_id = res[i].dataValues.children[j].user_id
                    let childrenUserInfo = await getById(user_id)
                    // console.log('子评论的用户信息：', childrenUserInfo[0].dataValues)
                    res[i].dataValues.children[j].userInfo = childrenUserInfo[0].dataValues
                }
            }
        }

        // console.log('最终的返回结果：',res)
        ctx.body = {
            code: 0,
            message: '获取评论列表成功',
            result: res
        }
    }

    // 删除评论
    async remove(ctx,next){

        const { id } = ctx.request.body
        console.log(id)
        let res = await remove(id)

        let message = '删除评论失败'
        if(res){
            message = '删除评论成功'
        }

        ctx.body = {
            code: 0,
            message,
            result: res
        }
    }
}

module.exports = new MessageController()