const express=require('express');
const router=express.Router();
const multer=require('multer');
const authCheck=require('../api/authenticate.middleware').authCheck;
const uploadControlers=require('../api/controller/upload.controller')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      cb(null, "a")
    }
  })
  var upload = multer({ storage: storage })

router.post('/upload',[authCheck,upload.single('file')],uploadControlers.PostUploadUser);
router.get('/table',authCheck,uploadControlers.GETUploadUserFile);


module.exports=router;