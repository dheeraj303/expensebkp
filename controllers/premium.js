
const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../Util/database');



const leadership=async (req,res)=>{
try{
    const userleaderboard=await User.findAll({
        attributes:[
            'id',
            'name',
            [sequelize.fn('sum',sequelize.col('expenses.amount')),'total']
        ],
        include:[
            {
                model:Expense,
                attributes:[]
            }
        ],
        group:['user.id'],
        order:[['total','desc']]
    });
    res.status(200).json(userleaderboard);

}catch(err){
    console.log(err);
    res.status(403).json({message:'something Really went wrong',error:err});
}
}



module.exports={
    leadership
 
}