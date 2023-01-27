const express=require('express');
const router=express.Router();
const purchasecontroller=require('../controllers/purchase');
const auth=require('../middlewares/auth');

router.get('/premiummembership',auth.authenticate,purchasecontroller.purchasepremium);
router.post('/updatetransactionstatus',auth.authenticate,purchasecontroller.updatetransactionstatus);

module.exports=router;