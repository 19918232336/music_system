const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
const Music = require('./music.model')
const MusicTag = require('./music_tag.model')

const Tag = seq.define('tag',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '标签名',
    },
})

Tag.associate = function(){
    Tag.belongsToMany(Music,{   
        through: MusicTag,
        foreignKey: 'tag_id',
        otherKey: 'music_id' 
    })
}

// 强制同步数据库,数据库中如果有表会删掉重新创建
// Tag.sync({force: true})

module.exports = Tag