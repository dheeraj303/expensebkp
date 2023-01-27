const { Router } = require('express');
const usercontroller=require('../controllers/user');
const express=require('express');
const router=express.Router();

router.get('/signup',usercontroller.getusers);
router.post('/signup',usercontroller.postuser);
router.post('/forget-password',usercontroller.forgetpassword);
router.post('/change-password/:password_id',usercontroller.changepassword);
router.post('/login',usercontroller.login);
module.exports=router;