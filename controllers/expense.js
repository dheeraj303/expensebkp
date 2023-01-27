const Expense=require('../models/expense')
const AWS=require('aws-sdk');
const s3upload=require('../service/s3upload');
const DownloadData=require('../models/downloaddata'); 
// const ITEMS_PER_PAGE=2;
exports.getexpense=(req,res,next)=>{

    const limit=(req.query.limit) ? parseInt(req.query.limit) : 2;
    const page=(req.query.page) ? parseInt(req.query.page) : 1;
    // console.log(limit);
    // console.log(page);
    Expense.findAndCountAll()
    .then((data) => {
        // let page = req.params.page;      // page number
        var pages = Math.ceil(data.count / limit);
         
   
    Expense.findAll({
            offset:(page-1)*limit,
            limit:limit
                 },{where:{userId:req.user.id}})   
                .then((expense)=>{
    
                      res.json({expense,pages:pages});
                 }).catch(err=>console.log(err));
     })
    .catch(err=>console.log(err));
}


exports.download=async (req,res,next)=>{
    if(req.user.ispremiumuser){
    try{
   let expense=await req.user.getExpenses();
   console.log(expense);
   const stringifyexpense=JSON.stringify(expense);
   const userId=req.user.id;
   const filename=`Expense${userId}/${new Date()}.txt`;
   const fileurl=await s3upload.uploadToS3(stringifyexpense,filename);
   DownloadData.create({fileurl:fileurl,userId:req.user.id}).then(()=>{
    res.json({fileurl,status:"1"});
   }).catch((err)=>{
    throw new Error(err);
   })
  
    }catch(err){
        res.json({fileurl:"",status:"0"});
    }}
    else{
        res.status(401).json({message:"Unauthorized",status:"0"});
    }
}

exports.postexpense=(req,res,next)=>{
    const userId=req.user.id;
    const expense=req.body.amount;
    const desc=req.body.desc;
    const type=req.body.type;
    console.log(userId);
    Expense.create({
        amount:expense,
        desc:desc,
        type:type,
        userId:userId
    }).then((data)=>{
        // console.log(data);
        res.json(data);
    }).catch(err=>console.log(err));
}



exports.getexpensebyid=(req,res,next)=>{
    const id=req.params.id;
    Expense.findByPk(id).then(expense=>{
        res.json(expense);
    }).catch(err=>console.log(err));
}

