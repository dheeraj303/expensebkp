const express=require('express');
const router=express.Router();
const expensecontroller=require('../controllers/expense');
const downloadcontroller=require('../controllers/download');
const auth=require('../middlewares/auth');

router.get('/get-expense',auth.authenticate,expensecontroller.getexpense);
router.get('/download-file',auth.authenticate,expensecontroller.download);
router.get('/recent-download',auth.authenticate,downloadcontroller.downloaddata)
router.post('/save',auth.authenticate,expensecontroller.postexpense);

module.exports=router;