const Sequelize=require('sequelize');
const sequelize=require('../Util/database');
const Password=sequelize.define('password',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    password_id:{
        type:Sequelize.STRING,
        allowNull:false
    },
    isActive:Sequelize.BOOLEAN
})
module.exports=Password;