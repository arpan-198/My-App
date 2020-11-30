const csv = require('csvtojson');

const user_files=require('../db/database').user_files;






exports.PostUploadUser=async(req,res)=>{
    let file=req.file;
    if(!file){
        res.status(400).json({
            message : "Invalid File"
        })
    }
    let csvFilePath="upload/a"
    const jsonArray=await csv().fromFile(csvFilePath);

    await user_files.findOne({id : req.user},async(err,result)=>{
        if(err) throw err;
        if(result){
            await user_files.findByIdAndUpdate({_id : result._id},{csvfile : jsonArray},(err,result1)=>{
                if(err) throw err;
                res.status(200).json({
                    message : "Successfully Uploaded"
                })
            })
        }
        else{
            let newFile = new user_files({id : req.user,csvfile : jsonArray});
            await newFile.save((err,result2)=>{
                if(err) throw err;
                res.status(200).json({
                    message : "Successfully Uploaded"
                })
            })
        }
    })
}




exports.GETUploadUserFile=async(req,res)=>{
    user_files.findOne({id : req.user},{_id : 0 ,csvfile : 1},(err,result)=>{
        if(err) {
            res.status(400);
        }
        if(!result){
            res.status(400).json({
                message : "Data Is Empty"
            })
        }
        else{
            res.status(200).json({
                data : result
            })
        }
    })

}

