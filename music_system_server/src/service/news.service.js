const News = require('../model/news.model')

class NewsService{

    //获取全部资讯
    async getAll(pageNum, pageSize){

        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }
        const count = await News.count()
        const {rows} = await News.findAndCountAll({offset: offset, limit:(pageSize * 1)}) //findAndCountAll合并了上面两个方法

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    async getById(pageNum, pageSize, id){

        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }

        const count = await News.count({
            where:{id}
        })
        const {rows} = await News.findAndCountAll({
            where: {id},
            offset: offset, limit:(pageSize * 1)
        })

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    async getByTitle(pageNum, pageSize, title){

        let offset = 0
        if(pageNum != 0){
            offset = (pageNum-1) * pageSize
        }

        const count = await News.count({
            where:{title}
        })
        const {rows} = await News.findAndCountAll({
            where: {title},
            offset: offset, limit:(pageSize * 1)
        })

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    // 修改资讯
    async update(id,news){

        console.log(news)
        const res = await News.update(news, {where: {id}})
        // console.log(res)
        return !!res[0]
    }

    // 删除资讯
    async remove(id){
        console.log(id)
        const whereOpt = {id}
        const res =  await News.destroy({where : {id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }

    // 添加资讯
    async create(news){
        const res = await News.create(news)
        return res.dataValues
    }
}

module.exports = new NewsService()