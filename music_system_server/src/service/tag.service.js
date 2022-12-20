const Tag = require('../model/tag.model')

class TagService{

    //获取标签信息
    async getTagInfo(pageNum, pageSize){
        // return await Tag.findAll({
        //     where:{},
        //     attributes:['id','name']
        // })

        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }
        const count = await Tag.count()
        const {rows} = await Tag.findAndCountAll({offset: offset, limit:(pageSize * 1)}) //findAndCountAll合并了上面两个方法

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    // 根据id获取标签名
    async getTagById(id){
        let res = await Tag.findAll({
            where:{id},
            attributes:['name']
        })

        let {name} = res[0].dataValues
        console.log('标签名：',name)
        return name
    }

    // 修改标签信息
    async updateById(id,name){

        const res = await Tag.update({name}, {where: {id}})
        // console.log(res)
        return !!res[0]
    }

    // 删除标签
    async removeById(id){
        console.log(id)
        const whereOpt = {id}
        const res =  await Tag.destroy({where : {id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }

    // 添加标签
    async createTag(name){
        const res = await Tag.create( {name} )
        return res.dataValues
    }

    // 获取标签总数
    async getTagCount(){
        return await Tag.count()
    }
}

module.exports = new TagService()