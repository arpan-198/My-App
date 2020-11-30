const mongoose=require('mongoose');


const user_auth = require('../../Schemas/UserSchema/user_auth.schema');
const user_file = require('../../Schemas/UserSchema/user_file.schema');






mongoose.connect('mongodb://localhost/my-app', {useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false,useCreateIndex : true})
.then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log(err);
})
    const user_auths=mongoose.model('user_auths',user_auth);

    const user_files=mongoose.model('user_files',user_file);
    
    module.exports={
        user_auths,
        user_files
    }