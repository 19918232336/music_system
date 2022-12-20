const {DataTypes} = require('sequelize')
const seq = require('../db/seq')

const Message = seq.define('message',{
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id',
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '评论内容',
    },
    parents_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '父级评论id',
    },
    reply_username:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '回复用户的用户名',
    },
})


// 强制同步数据库,数据库中如果有表会删掉重新创建
// Message.sync({force: true})

module.exports = Message