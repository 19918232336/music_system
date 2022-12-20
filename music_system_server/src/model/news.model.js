const {DataTypes} = require('sequelize')
const seq = require('../db/seq')

const News = seq.define('news',{
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '资讯标题',
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '资讯内容',
    },
})

// 强制同步数据库,数据库中如果有表会删掉重新创建
// News.sync({force: true})

module.exports = News