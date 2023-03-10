const Razorpay=require('razorpay');
const Order=require('../models/order');
// require('dotenv').config();


const purchasepremium=async (req,res)=>{
try{
    // console.log(process.env);
    var rzp=new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET
    })
    const amount=2500;
    rzp.orders.create({amount,currency:"INR"},(err,order)=>{
        if(err){
            throw new Error(err);
        }
        req.user.createOrder({orderid:order.id,status:"PENDING"}).then(()=>{
            return res.status(201).json({order,key_id:rzp.key_id});
        }).catch(err=>{
            throw new Error(err)
        })
    })
}catch(err){
    console.log(err);
    res.status(403).json({message:'something Really went wrong',error:err});
}
}

const updatetransactionstatus=(req,res)=>{
    try{
        const {payment_id,order_id}=req.body;
        Order.findOne({where:{orderid:order_id}}).then((order)=>{
            order.update({paymentid:payment_id,status:"SUCCESS"}).then(()=>{
                req.user.update({ispremiumuser:true}).then(()=>{
                    return res.status(202).json({status:"1",message:"Transaction Successful"})
                }).catch((err)=>{
                    throw new Error(err);
                }).catch((err)=>{
                    throw new Error(err);
                })
            }).catch((err)=>{
                throw new Error(err);
            })
        }).catch((err)=>{
            throw new Error(err);
        })
    }
    catch(err){
        res.status(403).json({message:'something Really went wrong',error:err});
    }
}

module.exports={
    purchasepremium,
    updatetransactionstatus
}