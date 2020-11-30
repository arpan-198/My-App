const express=require('express');
const { authCheck } = require('../api/authenticate.middleware');
const router=express.Router();

const userControlers=require('../api/controller/userAuth.controller')



router.post('/login',userControlers.PostLoginUser);
router.post('/signup',userControlers.PostSignupUser);
router.post('/token',userControlers.getToken);
router.delete('/logout',authCheck,userControlers.DeleteLogoutUser);


module.exports=router;