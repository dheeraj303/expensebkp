const DownloadData=require('../models/downloaddata'); 
exports.downloaddata=(req,res)=>{
    if(req.user.ispremiumuser){
    try{
    DownloadData.findAll({where:{userId:req.user.id}})
    .then((data)=>{
        res.status(200).json({status:"1",data:data})
    })
    }
    catch(err){
        res.status(500).json({status:"0",err:err});
    }
    }else{
        res.status(401).json({status:"0",err:"Unauthorzed"});
    }
}