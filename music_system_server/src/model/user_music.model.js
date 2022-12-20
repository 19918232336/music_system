const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
const User = require('../model/user.model')
const Music = require('../model/music.model')

const UserMusic = seq.define('user_music',{
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id',
    },
    music_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '歌曲id',
    },
})

// 强制同步数据库,数据库中如果有表会删掉重新创建
// UserMusic.sync({force: true}) 

module.exports = UserMusic