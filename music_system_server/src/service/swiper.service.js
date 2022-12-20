const Swiper = require('../model/swiper.model')

class SwiperService{

    //获取全部轮播图信息
    async getAll(){

        return await Swiper.findAll({
            where:{},
            // attributes:['id','name']
        })
    }

    // 修改轮播图信息
    async update(id,path){

        const res = await Swiper.update({path}, {where: {id}})
        // console.log(res)
        return !!res[0]
    }

    // 删除轮播图
    async remove(id){
        console.log(id)
        const whereOpt = {id}
        const res =  await Swiper.destroy({where : {id}})
        return !!res //注意：这里返回的是0和1，而不是数组
    }

    // 添加轮播图
    async create(path){
        const res = await Swiper.create( {path} )
        return res.dataValues
    }
}

module.exports = new SwiperService()