const Expense=require('../models/expense')
const AWS=require('aws-sdk');

const uploadToS3=(data,filename)=>{
    const BUCKET_NAME=process.env.BUCKETNAME;
    const IAM_USER_KEY=process.env.IAMUSERKEY;
    const IAM_USER_SECRET=process.env.IAMUSERSECRET;
    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
        // Bucket:BUCKET_NAME
    });

        var params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
       return new Promise((resolve,rej)=>{
        s3bucket.upload(params,(err,s3response)=>{
            if(err){
                // console.log("Something went wrong", err)
                rej(err);
            }else{
                // console.log('success',s3response);
                resolve(s3response.Location);
            }
        })
       })
      


}
module.exports={
    uploadToS3
}