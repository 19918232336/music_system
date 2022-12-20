const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
const Tag = require('./tag.model')
const MusicTag = require('./music_tag.model')

const Music = seq.define('music',{
    img:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '封面地址',
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '歌名',
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '作者',
    },
    path:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '歌曲地址',
    },
    duration:{
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        comment: '时长',
    },
    duration:{
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        comment: '时长',
    },
    view:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '浏览量',
    }
})

Music.associate = function(){
    Music.belongsToMany(Tag,{   
        through: MusicTag,
        foreignKey: 'music_id',
        otherKey: 'tag_id' 
    })
}

// 强制同步数据库,数据库中如果有表会删掉重新创建
// Music.sync({force: true})

// Music.belongsTo(MusicTag, {
//     foreignKey: 'music_id',
//     as: 'tag_info',
// });

module.exports = Music