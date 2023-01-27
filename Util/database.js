const Sequelize=require('sequelize');
const sequelize=new Sequelize('Expensetracker','admin','Dhee1234',{
    dialect:'mysql',
    host:'database-1.czkx8kdwzhc4.ap-northeast-1.rds.amazonaws.com:3306'
});
module.exports=sequelize;