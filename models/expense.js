const Sequelize=require('sequelize');
const sequelize=require('../Util/database');
const Expense=sequelize.define('expenses',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    desc:{
        type:Sequelize.STRING,
        allowNull:false
    },
    type:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
module.exports=Expense;