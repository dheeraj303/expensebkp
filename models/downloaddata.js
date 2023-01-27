const Sequelize=require('sequelize');
const sequelize=require('../Util/database');
const DownloadData=sequelize.define('downloaddata',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    fileurl:Sequelize.STRING,
    
 
})
module.exports=DownloadData;