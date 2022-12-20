const {DataTypes} = require('sequelize')
const seq = require('../db/seq')

const User = seq.define('user',{
    img:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '头像地址',
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户名',
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: '密码',
    },
    permissions:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否为管理员',
    },
})

// 强制同步数据库,数据库中如果有表会删掉重新创建
// User.sync({force: true})

module.exports = User