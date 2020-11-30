const mongoose=require('mongoose');
const schema=mongoose.Schema;

const sch={
    id:{
        type:schema.Types.ObjectId,
        ref:"user_auths",
        unique : true
    },
    csvfile : []
}

const user_file=new schema(sch,{
    timestamps:true
});

module.exports=user_file;

