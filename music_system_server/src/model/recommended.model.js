// 推荐歌单
const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
const Music = require('./music.model')

const Recommend = seq.define('recommend',{
    music_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '歌曲id',
    },
})

// 强制同步数据库,数据库中如果有表会删掉重新创建
// Recommend.sync({force: true})

// 关联recommend表和music表
Recommend.belongsTo(Music, {
    foreignKey: 'id',
    as: 'music_info', //起别名
})

module.exports = Recommend