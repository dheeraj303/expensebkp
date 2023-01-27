const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const auth=require('../middlewares/auth');
const Password = require('../models/password');
const uuid=require('uuid');
const { where } = require('sequelize');

function generatetoken(id,premium){
    return jwt.sign({userId:id,ispremium:premium},process.env.SECRETKEY);
}

exports.getusers=(req,res,next)=>{
    User.findAll().then((users)=>{
        res.json(users);
    })
    .catch(err=>console.log(err));
}


exports.postuser=(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    bcrypt.hash(password, 10, function(err, hash) {
        User.create({
            name:name,
            email:email,
            password:hash
        }).then((data)=>{
            // console.log(data);
            res.json([{"status":"1","message":"User Created Successfully"}]);
        }).catch(err=> res.json([{"status":"0","message":err}]));
    });
   
}

exports.login= async (req,res,next)=>{
    const {email,password}=req.body;
    User.findAll({where:{email}}).then((user)=>{
        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {
             if(err){
                res.status(500).json([{status:"0",message:"Something Went Wrong"}]); 
             }   
            if(result){
                const token= generatetoken(user[0].id,user[0].ispremiumuser);
                res.status(200).json([{status:"1",message:"User logged in Successfully",token:token}]);
            }else{
                res.status(400).json([{status:"0",message:"Password doesn't Match"}]);
            }  
                });
        }else{
                res.json([{status:"0",message:"User Not Exist"}]);
            }
            }).catch(err=>{
                res.json([{status:"0",message:err}]);
            })
}


exports.forgetpassword=(req,res,next)=>{
    const {email}=req.body;
    
    // console.log(email);
    User.findAll({where:{email}}).then((user)=>{
        if(user.length>0){
            const password_id=uuid.v4();
            Password.create({
                password_id:password_id,
                isActive:true,
                userid:user[0].id
            }).then((password)=>{
                const token= generatetoken(user[0].id,user[0].ispremiumuser);
                res.status(200).json([{status:"1",message:"Please change password ",token:token,password_id:password_id}]);
                // res.status(200).json([{status:"1",message:"Please change password ",link:""}]);
            })
           
        }
        else{
            res.status(400).json([{status:"0",message:"No such email found"}]);
        }

    })
}
exports.changepassword=(req,res,next)=>{
    const password_id=req.params.password_id;
    Password.findAll({where:{password_id:password_id}}).then((data)=>{
        // console.log(password);
        if((data[0].isActive)){
            // console.log(password[0]);
            const {id,password}=req.body;
            // console.log(id);
            bcrypt.hash(password, 10, function(err, hash) {
                User.update({
                    password:hash
                },
                {where:{id}}).then(()=>{
                    Password.update({isActive:false},{where:{id:data[0].id}})
                    res.status(200).json([{status:"1",message:"Password Updated"}]);
                }).catch(err=>{
                    res.status(400).json([{status:"0",message:"No such id found",err:err}]);
                })
            })
        }else{
            res.status(400).json([{status:"0",message:"Request Expired"}]);
        }
    }).catch(err=>{
        console.log(err);
        res.status(400).json([{status:"0",message:"Something went wrong",err:err}]);
        
    })
    // User.find({ where: { id: {id} } })

  

}