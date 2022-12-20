// 轮播图
const {DataTypes} = require('sequelize')
const seq = require('../db/seq')

const Swiper = seq.define('swiper',{
    path:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '封面路径',
    },
})

// 强制同步数据库,数据库中如果有表会删掉重新创建
// Swiper.sync({force: true})

module.exports = Swiper