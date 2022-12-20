const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
const Tag = require('../model/tag.model')
const Music = require('../model/music.model')

const MusicTag = seq.define('music_tag',{
    tag_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '标签id',
    },
    music_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '歌曲id',
    },
})

MusicTag.associate = function(){}

// 强制同步数据库,数据库中如果有表会删掉重新创建
// MusicTag.sync({force: true}) 


// // 关联music_tag表和tag表
// musicTag.belongsTo(Tag, {
//     foreignKey: 'tag_id',
//     as: 'tag_info', //起别名
// })

// // 关联music_tag表和music表
// musicTag.belongsTo(Music, {
//     foreignKey: 'music_id',
//     as: 'music_info', //起别名
// })

// MusicTag.associate = function(){
//     MusicTag.belongsTo(Music, {
//         foreignKey: 'music_id',
//     });
//     MusicTag.belongsTo(Tag, {
//         foreignKey: 'tag_id', 
//     });
// }

module.exports = MusicTag