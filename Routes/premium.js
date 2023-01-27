const express=require('express');
const router=express.Router();
const premiumcontroller=require('../controllers/premium');
const auth=require('../middlewares/auth');

router.get('/get-leadership',auth.authenticate,premiumcontroller.leadership);
// router.post('/updatetransactionstatus',auth.authenticate,purchasecontroller.updatetransactionstatus);

module.exports=router;